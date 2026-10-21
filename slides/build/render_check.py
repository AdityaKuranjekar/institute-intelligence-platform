"""Approximate renderer + layout checker for the generated PPTX (no PowerPoint/LibreOffice needed).
Draws shapes, images and wrapped text with the real Windows font metrics and reports text overflow and off-slide shapes.
Usage (from slides/build):  python render_check.py ../AlphaQ_CaseB_Round1.pptx out_dir [slide numbers...]
Hindi shaping is approximate (Pillow basic layout); everything else is faithful enough to judge spacing and overflow."""
import io
import json
import re
import sys
import zipfile
from pathlib import Path

from lxml import etree
from PIL import Image, ImageDraw, ImageFont

NS = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main", "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
EMU = 914400
DPI = 100
FONTS = Path("C:/Windows/Fonts")
FILES = {
    ("Calibri", False): "calibri.ttf", ("Calibri", True): "calibrib.ttf",
    ("Cambria", False): "cambria.ttc", ("Cambria", True): "cambriab.ttf",
    ("Nirmala UI", False): "NIRMALA.TTF", ("Nirmala UI", True): "NIRMALAB.TTF",
    ("Arial", False): "arial.ttf", ("Arial", True): "arialbd.ttf",
}
_font_cache = {}


def font(name, bold, size_pt):
    key = (name, bold, round(size_pt * 4))
    if key not in _font_cache:
        fn = FILES.get((name, bold)) or FILES[("Arial", bold)]
        _font_cache[key] = ImageFont.truetype(str(FONTS / fn), int(round(size_pt * DPI / 72)))
    return _font_cache[key]


def q(tag):
    pfx, name = tag.split(":")
    return "{%s}%s" % (NS[pfx], name)


def color_of(el, default=None):
    if el is None:
        return default
    c = el.find(".//a:srgbClr", NS)
    return "#" + c.get("val") if c is not None else default


def rel_targets(zf, part):
    relp = str(Path(part).parent / "_rels" / (Path(part).name + ".rels")).replace("\\", "/")
    out = {}
    if relp in zf.namelist():
        for r in etree.fromstring(zf.read(relp)):
            tgt = r.get("Target")
            base = str(Path(part).parent)
            full = str((Path(base) / tgt)).replace("\\", "/")
            full = re.sub(r"[^/]+/\.\./", "", full)
            out[r.get("Id")] = (full, r.get("Type"))
    return out


def xfrm_of(sp, layout_sp=None):
    x = sp.find(".//a:xfrm", NS)
    if x is None and layout_sp is not None:
        x = layout_sp.find(".//a:xfrm", NS)
    if x is None:
        return None
    off, ext = x.find("a:off", NS), x.find("a:ext", NS)
    return (int(off.get("x")) / EMU, int(off.get("y")) / EMU, int(ext.get("cx")) / EMU, int(ext.get("cy")) / EMU,
            x.get("flipH") == "1", x.get("flipV") == "1")


def para_runs(p, defaults):
    runs = []
    for node in p:
        if node.tag == q("a:r"):
            rpr = node.find("a:rPr", NS)
            t = node.find("a:t", NS).text or ""
            runs.append(style(t, rpr, defaults))
        elif node.tag == q("a:br"):
            runs.append(style("\n", node.find("a:rPr", NS), defaults))
    return runs


def style(t, rpr, d):
    s = dict(d)
    s["t"] = t
    if rpr is not None:
        if rpr.get("sz"):
            s["size"] = int(rpr.get("sz")) / 100
        if rpr.get("b") is not None:
            s["bold"] = rpr.get("b") == "1"
        if rpr.get("i") is not None:
            s["italic"] = rpr.get("i") == "1"
        c = color_of(rpr.find("a:solidFill", NS))
        if c:
            s["color"] = c
        lat = rpr.find("a:latin", NS)
        if lat is not None:
            s["face"] = lat.get("typeface")
    return s


def layout_text(paras, width_in, align_default="l"):
    """returns list of lines: (words[(text, run)], align, line_h_px, width_px) and spacing"""
    maxw = width_in * DPI
    lines = []
    for para in paras:
        runs, algn, lnspc, spc_after = para
        toks = []
        for r in runs:
            if r["t"] == "\n":
                toks.append(("\n", r))
                continue
            for w in re.findall(r"\S+|\s+", r["t"]):
                toks.append((w, r))
        cur, curw, plines = [], 0.0, []
        maxsz = max([r["size"] for r in runs] + [10]) if runs else 12
        for w, r in toks:
            if w == "\n":
                plines.append((cur, curw)); cur, curw = [], 0.0
                continue
            f = font(r["face"], r["bold"], r["size"])
            wpx = f.getlength(w)
            if w.isspace():
                if cur:
                    cur.append((w, r, wpx)); curw += wpx
                continue
            if curw + wpx > maxw and cur:
                while cur and cur[-1][0].isspace():
                    curw -= cur[-1][2]; cur.pop()
                plines.append((cur, curw)); cur, curw = [], 0.0
            cur.append((w, r, wpx)); curw += wpx
        while cur and cur[-1][0].isspace():
            curw -= cur[-1][2]; cur.pop()
        plines.append((cur, curw))
        for k, (ws, wpx) in enumerate(plines):
            lines.append({"words": ws, "w": wpx, "algn": algn, "h": maxsz * 1.2 * lnspc * DPI / 72,
                          "after": spc_after * DPI / 72 if k == len(plines) - 1 else 0})
    return lines


def parse_paras(txbody, defaults):
    paras = []
    for p in txbody.findall("a:p", NS):
        ppr = p.find("a:pPr", NS)
        algn = "l"
        lnspc = 1.0
        after = 0.0
        if ppr is not None:
            algn = {"ctr": "c", "r": "r", "l": "l", "just": "l"}.get(ppr.get("algn", "l"), "l")
            ls = ppr.find("a:lnSpc/a:spcPct", NS)
            if ls is not None:
                lnspc = int(ls.get("val")) / 100000
            sa = ppr.find("a:spcAft/a:spcPts", NS)
            if sa is not None:
                after = int(sa.get("val")) / 100
        end = p.find("a:endParaRPr", NS)
        runs = para_runs(p, defaults)
        if not runs and end is not None:
            runs = [style("", end, defaults)]
        paras.append((runs, algn, lnspc, after))
    return paras


def lst_defaults(sp):
    d = {"size": 18.0, "bold": False, "italic": False, "color": "#000000", "face": "Calibri"}
    lvl = sp.find(".//a:lstStyle/a:lvl1pPr/a:defRPr", NS) if sp is not None else None
    if lvl is not None:
        return style("", lvl, d)
    return d


def render(pptx, outdir, only=None):
    zf = zipfile.ZipFile(pptx)
    pres = etree.fromstring(zf.read("ppt/presentation.xml"))
    sz = pres.find("p:sldSz", NS)
    sw, sh = int(sz.get("cx")) / EMU, int(sz.get("cy")) / EMU
    rels = rel_targets(zf, "ppt/presentation.xml")
    slides = [rels[s.get("{%s}id" % NS["r"])][0] for s in pres.find("p:sldIdLst", NS)]
    Path(outdir).mkdir(parents=True, exist_ok=True)
    issues = []
    for si, spart in enumerate(slides, 1):
        if only and si not in only:
            continue
        root = etree.fromstring(zf.read(spart))
        srels = rel_targets(zf, spart)
        layout_part = next((v[0] for v in srels.values() if v[1].endswith("/slideLayout")), None)
        layout = etree.fromstring(zf.read(layout_part)) if layout_part else None
        W, H = int(sw * DPI), int(sh * DPI)
        bg = "#FFFFFF"
        for src in (root, layout):
            if src is not None:
                bgc = src.find(".//p:bg//a:srgbClr", NS)
                if bgc is not None:
                    bg = "#" + bgc.get("val"); break
        img = Image.new("RGB", (W, H), bg)
        d = ImageDraw.Draw(img)
        lrels = rel_targets(zf, layout_part) if layout_part else {}

        def draw_tree(tree, rels_, from_layout=False):
            layout_ph = {}
            if layout is not None and not from_layout:
                for lsp in layout.findall(".//p:sp", NS):
                    ph = lsp.find(".//p:nvPr/p:ph", NS)
                    if ph is not None:
                        layout_ph[(ph.get("type"), ph.get("idx"))] = lsp
            for el in tree.find(".//p:spTree", NS):
                if el.tag == q("p:pic"):
                    xf = xfrm_of(el)
                    emb = el.find(".//a:blip", NS).get("{%s}embed" % NS["r"])
                    data = zf.read(rels_[emb][0])
                    pim = Image.open(io.BytesIO(data)).convert("RGBA")
                    x, y, w, h = [int(v * DPI) for v in xf[:4]]
                    pim = pim.resize((max(1, w), max(1, h)))
                    img.paste(pim, (x, y), pim)
                    continue
                if el.tag not in (q("p:sp"), q("p:cxnSp")):
                    continue
                ph = el.find(".//p:nvPr/p:ph", NS)
                lsp = layout_ph.get((ph.get("type"), ph.get("idx"))) if ph is not None else None
                xf = xfrm_of(el, lsp)
                if xf is None:
                    continue
                x, y, w, h, fh, fv = xf
                if x < -0.01 or y < -0.01 or x + w > sw + 0.01 or y + h > sh + 0.01:
                    issues.append({"slide": si, "type": "off-slide", "at": [round(x, 2), round(y, 2), round(w, 2), round(h, 2)]})
                geom = el.find(".//a:prstGeom", NS)
                prst = geom.get("prst") if geom is not None else "rect"
                sppr = el.find("p:spPr", NS)
                fill = None
                if sppr is not None and sppr.find("a:solidFill", NS) is not None:
                    fill = color_of(sppr.find("a:solidFill", NS))
                ln = sppr.find("a:ln", NS) if sppr is not None else None
                lcol, lw, dash, arrow = None, 0, None, False
                if ln is not None and ln.find("a:noFill", NS) is None and ln.find("a:solidFill", NS) is not None:
                    lcol = color_of(ln.find("a:solidFill", NS))
                    lw = int(ln.get("w", "12700")) / 12700 * DPI / 72
                    dash = ln.find("a:prstDash", NS)
                    arrow = ln.find("a:tailEnd", NS) is not None and ln.find("a:tailEnd", NS).get("type") not in (None, "none")
                if (w <= 0 or h < 0) and prst != "line":
                    issues.append({'slide': si, 'type': 'zero-size shape', 'at': [x, y, w, h]})
                    continue
                box = [x * DPI, y * DPI, (x + w) * DPI, (y + max(h, 0.001)) * DPI]
                if prst == "line":
                    p0 = (box[2] if fh else box[0], box[3] if fv else box[1]); p1 = (box[0] if fh else box[2], box[1] if fv else box[3])
                    if lcol:
                        d.line([p0, p1], fill=lcol, width=max(1, int(lw)))
                        if arrow:
                            import math
                            ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0]); L = 9
                            d.polygon([p1, (p1[0] - L * math.cos(ang - 0.45), p1[1] - L * math.sin(ang - 0.45)), (p1[0] - L * math.cos(ang + 0.45), p1[1] - L * math.sin(ang + 0.45))], fill=lcol)
                elif prst == "ellipse":
                    d.ellipse(box, fill=fill, outline=lcol, width=int(lw) if lcol else 0)
                elif prst == "roundRect":
                    adj = geom.find(".//a:gd", NS)
                    rad = int(adj.get("fmla").split()[1]) / 100000 * min(w, h) * DPI if adj is not None else 0.1 * DPI
                    d.rounded_rectangle(box, radius=rad, fill=fill, outline=lcol, width=int(lw) if lcol else 0)
                elif prst in ("rect",):
                    d.rectangle(box, fill=fill, outline=lcol, width=int(lw) if lcol else 0)
                # text
                tb = el.find("p:txBody", NS)
                if tb is None:
                    continue
                paras_present = [p for p in tb.findall("a:p", NS) if p.findall("a:r", NS)]
                if not paras_present:
                    continue
                bp = tb.find("a:bodyPr", NS)
                ins = [int(bp.get(k, v)) / EMU for k, v in (("lIns", 91440), ("tIns", 45720), ("rIns", 91440), ("bIns", 45720))]
                anchor = bp.get("anchor", "t")
                defaults = lst_defaults(lsp if lsp is not None else None)
                paras = parse_paras(tb, defaults)
                avail_w = w - ins[0] - ins[2]
                lines = layout_text(paras, avail_w)
                total = sum(l["h"] + l["after"] for l in lines)
                avail_h = (h - ins[1] - ins[3]) * DPI
                nowrap = bp.get("wrap") == "none"
                snippet = "".join(r["t"] for r in paras[0][0])[:50]
                if total > avail_h + 2:
                    issues.append({"slide": si, "type": "text-overflow", "text": snippet, "need_in": round(total / DPI, 2), "have_in": round(avail_h / DPI, 2)})
                for ln_ in lines:
                    if ln_["w"] > avail_w * DPI + 3 and len(ln_["words"]) == 1:
                        issues.append({"slide": si, "type": "word-too-wide", "text": ln_["words"][0][0]})
                cy = y * DPI + ins[1] * DPI
                if anchor == "ctr":
                    cy += (avail_h - total) / 2
                elif anchor == "b":
                    cy += avail_h - total
                for ln_ in lines:
                    lx = x * DPI + ins[0] * DPI
                    if ln_["algn"] == "c":
                        lx += (avail_w * DPI - ln_["w"]) / 2
                    elif ln_["algn"] == "r":
                        lx += avail_w * DPI - ln_["w"]
                    for wtxt, r, wpx in ln_["words"]:
                        f = font(r["face"], r["bold"], r["size"])
                        d.text((lx, cy), wtxt, font=f, fill=r["color"])
                        lx += wpx
                    cy += ln_["h"] + ln_["after"]

        if layout is not None:
            draw_tree(layout, lrels, from_layout=True)
        draw_tree(root, srels)
        # slide number field from layout (not drawn by lxml pass); add simple number bottom right on content slides
        img.save(Path(outdir) / f"slide-{si:02d}.png")
    (Path(outdir) / "issues.json").write_text(json.dumps(issues, indent=1), encoding="utf-8")
    return issues


if __name__ == "__main__":
    pptx, out = sys.argv[1], sys.argv[2]
    only = set(int(a) for a in sys.argv[3:]) or None
    iss = render(pptx, out, only)
    print(len(iss), "issues")
    for i in iss:
        print(i)
