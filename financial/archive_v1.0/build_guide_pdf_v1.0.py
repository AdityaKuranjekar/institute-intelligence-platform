# -*- coding: utf-8 -*-
"""Builds DataMoat_Financial_Model_Explained.pdf: a plain-English guide to every tab, term and idea in
DataMoat_Financial_Model.xlsx, cross-referenced to the case brief (the PS).

Every number comes from guide_numbers.json (made by extract_numbers.py from the workbook) or from
../assumptions.csv, so nothing is typed by hand. To refresh after the model changes:
    python extract_numbers.py ; python build_guide_pdf.py
Needs: pip install reportlab openpyxl formulas      Fonts: Calibri + Cambria (ship with Windows/Office).
"""
import csv
import json
import os
import re
from collections import Counter

from reportlab.graphics.shapes import Drawing, Line, Polygon, Rect, String
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, CondPageBreak, Flowable, Frame, KeepTogether, NextPageTemplate,
                                PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle)
from reportlab.platypus.tableofcontents import TableOfContents

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "DataMoat_Financial_Model_Explained.pdf")
N = json.load(open(os.path.join(HERE, "guide_numbers.json"), encoding="utf-8"))
with open(os.path.join(HERE, "..", "assumptions.csv"), encoding="utf-8-sig") as f:
    A = {r["name"]: r for r in csv.DictReader(f)}

# ------------------------------------------------------------------ fonts
FD = "C:/Windows/Fonts/"
for name, file in [("Calibri", "calibri.ttf"), ("Calibri-Bold", "calibrib.ttf"), ("Calibri-Italic", "calibrii.ttf"),
                   ("Calibri-BoldItalic", "calibriz.ttf"), ("Cambria-Bold", "cambriab.ttf")]:
    pdfmetrics.registerFont(TTFont(name, FD + file))
pdfmetrics.registerFontFamily("Calibri", normal="Calibri", bold="Calibri-Bold", italic="Calibri-Italic",
                              boldItalic="Calibri-BoldItalic")
MONO = "Courier"
if os.path.exists(FD + "consola.ttf"):
    pdfmetrics.registerFont(TTFont("Consolas", FD + "consola.ttf"))
    MONO = "Consolas"

# ------------------------------------------------------------------ colours (deck design system)
NAVY = colors.HexColor("#0B2545")
INK = colors.HexColor("#1B2A41")
MUTED = colors.HexColor("#4F5D75")
TEAL = colors.HexColor("#0F8B8D")
TEALD = colors.HexColor("#0A6F71")
TEALT = colors.HexColor("#E3F2F2")
TINT = colors.HexColor("#F4F7FB")
LINE = colors.HexColor("#D5DEEA")
AMBER = colors.HexColor("#F2A900")
AMBERT = colors.HexColor("#FFF4D6")
AMBERD = colors.HexColor("#7A5200")
RED = colors.HexColor("#B3261E")
GREEN = colors.HexColor("#1B7F4F")
PSBG = colors.HexColor("#E8EDF6")
SOFT = colors.HexColor("#9FB3CF")
H = lambda c: "#" + c.hexval()[2:]  # noqa: E731  (colour -> '#rrggbb' for Paragraph markup)

PW, PH = A4
LM = RM = 18 * mm
W = PW - LM - RM


# ------------------------------------------------------------------ number helpers
def indian(n):
    n = int(round(n))
    neg, s = n < 0, str(abs(n))
    if len(s) > 3:
        head, tail, parts = s[:-3], s[-3:], []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        s = ",".join(parts + [tail])
    return ("-" if neg else "") + s


def inr(n, d=0):
    if d:
        return ("-" if n < 0 else "") + f"₹{abs(n):,.{d}f}"
    return ("-₹" if n < 0 else "₹") + indian(abs(n))


def lakh(n, d=2):
    return f"₹{n / 1e5:.{d}f} lakh"


def pct(x, d=1):
    return f"{x * 100:.{d}f}%"


def pct_s(x):
    v = x * 100
    return f"{v:.0f}%" if abs(v - round(v)) < 1e-9 else f"{v:.1f}%"


def xm(x, d=None):
    """Multiple with 1 decimal (2 below 1x). Pass d=2 for the PS's own figures such as 2.25x."""
    if d is None:
        d = 2 if abs(x) < 1 else 1
    return f"{x:.{d}f}x"


def num(x, d=1):
    return f"{x:.{d}f}"


def AB(name, col="base"):
    return float(A[name][col])


def afmt(name, col):
    v, kind = AB(name, col), A[name]["fmt"]
    if kind == "pct":
        return pct_s(v)
    if kind in ("inr", "inr2"):
        return inr(v, 2 if kind == "inr2" and v != int(v) else 0)
    if kind == "int":
        return indian(v)
    return num(v, 2)


R_ = lambda k, s="mid": N["roi"][k][s]  # noqa: E731
U_ = lambda k, s="mid": N["ue"][k][s]  # noqa: E731
S_ = lambda k, c: N["scen"][k][c]  # noqa: E731
CO = N["cogs"]
PR = N["pricing"]
SC = N["scale"]
GU = N["guide_ue"]
SE = N["season"]
VERSION = " · ".join(N["version"].split(" · ")[-2:])
N_INPUTS = len(A)
TYPES = Counter(r["type"] for r in A.values())
N_ERR = sum(1 for c in N["checks"] if c["type"] == "Error")
N_WARN = sum(1 for c in N["checks"] if c["type"] == "Warning")
FIRING = [c for c in N["checks"] if c["type"] == "Warning" and c["flag"] == 1]

# ------------------------------------------------------------------ paragraph styles
def PS(name, **kw):
    base = dict(fontName="Calibri", fontSize=10.3, leading=14.3, textColor=INK, spaceAfter=5)
    base.update(kw)
    return ParagraphStyle(name, **base)


BODY = PS("Body")
BODYS = PS("BodyS", fontSize=9.4, leading=12.8, spaceAfter=3)
BUL = PS("Bul", leftIndent=13, bulletIndent=3, spaceAfter=3)
BULS = PS("BulS", fontSize=9.4, leading=12.8, leftIndent=12, bulletIndent=2, spaceAfter=2)
H1 = PS("H1", fontName="Cambria-Bold", fontSize=24, leading=28, textColor=NAVY, spaceAfter=4)
EYEBROW = PS("Eyebrow", fontName="Calibri-Bold", fontSize=9.5, leading=12, textColor=TEALD, spaceAfter=2)
# Headings do not use keepWithNext: a heading glued to a long table drags the whole table to the next page and
# leaves a hole. finalize() below adds a "need this much room" check before each heading instead.
H2 = PS("H2", fontName="Cambria-Bold", fontSize=14, leading=18, textColor=NAVY, spaceBefore=8, spaceAfter=4)
H3 = PS("H3", fontName="Calibri-Bold", fontSize=11, leading=14, textColor=TEALD, spaceBefore=5, spaceAfter=2)
CAP = PS("Cap", fontName="Calibri-Italic", fontSize=8.6, leading=11, textColor=MUTED, spaceAfter=6)
CELL = PS("Cell", fontSize=9, leading=11.6, spaceAfter=0)
CELLB = PS("CellB", fontName="Calibri-Bold", fontSize=9, leading=11.6, spaceAfter=0, textColor=NAVY)
CELLR = PS("CellR", fontSize=9, leading=11.6, spaceAfter=0, alignment=2)
CELLH = PS("CellH", fontName="Calibri-Bold", fontSize=9, leading=11.6, spaceAfter=0, textColor=colors.white)
CELLHR = PS("CellHR", fontName="Calibri-Bold", fontSize=9, leading=11.6, spaceAfter=0, textColor=colors.white,
            alignment=2)
CALL = PS("Call", fontSize=9.4, leading=12.8, spaceAfter=3)
CALLT = PS("CallT", fontName="Calibri-Bold", fontSize=8.6, leading=11, spaceAfter=2)
CODE = PS("Code", fontName=MONO, fontSize=8.6, leading=11, spaceAfter=0)

DOC = None  # set below


# ------------------------------------------------------------------ flowables
class TocMark(Flowable):
    """Zero-size marker: adds a PDF bookmark/outline entry and a table-of-contents line."""

    def __init__(self, level, text):
        super().__init__()
        self.level, self.text = level, text

    def wrap(self, aw, ah):
        return 0, 0

    def draw(self):
        key = "toc_" + re.sub(r"\W+", "_", self.text)
        self.canv.bookmarkPage(key)
        self.canv.addOutlineEntry(self.text, key, self.level, closed=True if self.level == 0 else None)
        DOC.notify("TOCEntry", (self.level, self.text, DOC.page, key))


class SheetBanner(Flowable):
    """Looks like an Excel tab: the tab name on navy, with a one-line nickname."""

    def __init__(self, tab, tagline, order):
        super().__init__()
        self.tab, self.tagline, self.order = tab, tagline, order

    def wrap(self, aw, ah):
        self.w = aw
        return aw, 12 * mm

    def draw(self):
        c = self.canv
        c.setFillColor(NAVY)
        c.roundRect(0, 0, self.w, 12 * mm, 3 * mm, stroke=0, fill=1)
        c.setFillColor(TEAL)
        c.roundRect(0, 0, 3 * mm, 12 * mm, 1.5 * mm, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont("Calibri-Bold", 15)
        c.drawString(7 * mm, 4.1 * mm, self.tab)
        c.setFont("Calibri-Italic", 10.5)
        c.setFillColor(colors.HexColor("#BFE6E7"))
        c.drawRightString(self.w - 5 * mm, 4.4 * mm, self.tagline)
        c.setFont("Calibri", 7.5)
        c.setFillColor(SOFT)
        c.drawString(7 * mm, 9.2 * mm, f"TAB {self.order}")


def P(text, style=BODY):
    return Paragraph(text, style)


def bullets(items, style=BUL):
    return [Paragraph(t, style, bulletText="•") for t in items]


def numbered(items, style=BUL):
    return [Paragraph(t, style, bulletText=f"{i}.") for i, t in enumerate(items, 1)]


KINDS = {
    "plain": (TEALT, TEALD, "IN PLAIN ENGLISH"),
    "ps": (PSBG, NAVY, "FROM THE PS (the case brief)"),
    "ex": (TINT, MUTED, "WORKED EXAMPLE"),
    "warn": (AMBERT, AMBERD, "WATCH OUT"),
}


def callout(kind, body, title=None):
    bg, accent, label = KINDS[kind]
    bar = {"plain": TEAL, "ps": NAVY, "ex": SOFT, "warn": AMBER}[kind]
    inner = [Paragraph(f'<font color="{H(accent)}">{title or label}</font>', CALLT)]
    items = body if isinstance(body, list) else [body]
    for it in items:
        inner.append(Paragraph(it, CALL) if isinstance(it, str) else it)
    t = Table([["", inner]], colWidths=[2.2 * mm, W - 2.2 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), bar), ("BACKGROUND", (1, 0), (1, 0), bg),
        ("LEFTPADDING", (0, 0), (0, 0), 0), ("RIGHTPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 8), ("RIGHTPADDING", (1, 0), (1, 0), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return KeepTogether([t, Spacer(1, 6)])


def tbl(data, widths, header=True, right=(), first_bold=True, zebra=True, extra=None):
    rows = []
    for i, r in enumerate(data):
        row = []
        for j, c in enumerate(r):
            if isinstance(c, str):
                if header and i == 0:
                    st = CELLHR if j in right else CELLH
                elif j in right:
                    st = CELLR
                elif j == 0 and first_bold:
                    st = CELLB
                else:
                    st = CELL
                row.append(Paragraph(c, st))
            else:
                row.append(c)
        rows.append(row)
    t = Table(rows, colWidths=[w * mm for w in widths], repeatRows=1 if header else 0)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 5),
             ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 3.5),
             ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5), ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE)]
    if header:
        style.append(("BACKGROUND", (0, 0), (-1, 0), NAVY))
    if zebra:
        for i in range(2 if header else 1, len(rows), 2):
            style.append(("BACKGROUND", (0, i), (-1, i), TINT))
    if extra:
        style += extra
    t.setStyle(TableStyle(style))
    return t


def part_head(num, title, blurb, new_page=False):
    """Big parts start on a fresh page; short ones only if less than ~12 cm is left."""
    # "new page" = break unless the page is still empty (a plain PageBreak would leave a blank page when the previous
    # content filled its page exactly)
    return [CondPageBreak(PH - 38 * mm - 2 * mm) if new_page else CondPageBreak(120 * mm),
            TocMark(0, f"Part {num} · {title}"),
            Paragraph(f"PART {num}", EYEBROW), Paragraph(title, H1),
            Table([[""]], colWidths=[W], rowHeights=[1.4], style=[("BACKGROUND", (0, 0), (-1, -1), TEAL)]),
            Spacer(1, 7), Paragraph(blurb, BODY)]


def tab_head(order, tab, tagline, intro):
    return [CondPageBreak(55 * mm),
            KeepTogether([TocMark(1, f"Tab {order} · {tab}"), SheetBanner(tab, tagline, order), Spacer(1, 6),
                          Paragraph(intro, BODY)])]


def finalize(items):
    """Adds a room check before each H2/H3 heading, and keeps a heading with a chart that follows it."""
    out, i = [], 0
    while i < len(items):
        f = items[i]
        if isinstance(f, Paragraph) and f.style.name in ("H2", "H3"):
            nxt = items[i + 1] if i + 1 < len(items) else None
            if isinstance(nxt, Drawing):
                out.append(KeepTogether([f, nxt]))
                i += 2
                continue
            out.append(CondPageBreak((38 if f.style.name == "H2" else 30) * mm))
        out.append(f)
        i += 1
    return out


# ------------------------------------------------------------------ charts
def _arrow(d, x1, y, x2, col=SOFT):
    d.add(Line(x1, y, x2 - 5, y, strokeColor=col, strokeWidth=1.2))
    d.add(Polygon([x2, y, x2 - 6, y + 3.2, x2 - 6, y - 3.2], fillColor=col, strokeColor=col))


def workbook_map():
    wpt = W
    d = Drawing(wpt, 250)

    def box(x, y, w, h, title, sub, fill=TINT, edge=LINE, tc=NAVY, sc=MUTED):
        d.add(Rect(x, y, w, h, rx=5, ry=5, fillColor=fill, strokeColor=edge, strokeWidth=1))
        d.add(String(x + w / 2, y + h - 14, title, fontName="Calibri-Bold", fontSize=10.5, fillColor=tc,
                     textAnchor="middle"))
        for i, line in enumerate(sub):
            d.add(String(x + w / 2, y + h - 27 - i * 10.5, line, fontName="Calibri", fontSize=8.4,
                         fillColor=sc, textAnchor="middle"))

    cw, gap = 100, 31
    xs = [0, cw + gap, 2 * (cw + gap), 3 * (cw + gap)]
    heads = ["1 · INPUTS", "2 · BUILDING BLOCKS", "3 · THE TWO QUESTIONS", "4 · ANSWERS AND STRESS-TESTS"]
    for x, t in zip(xs, heads):
        d.add(String(x + cw / 2, 236, t, fontName="Calibri-Bold", fontSize=8.4, fillColor=TEALD,
                     textAnchor="middle"))
    box(xs[0], 130, cw, 92, "Assumptions", ["every number", "Bear / Base / Bull", "source + confidence"], fill=AMBERT,
        edge=AMBER)
    box(xs[0], 66, cw, 56, "Seasonality", ["busy and quiet months;", "also feeds both questions"], fill=AMBERT,
        edge=AMBER)
    box(xs[1], 148, cw, 74, "Pricing", ["list price, discounts,", "price actually collected"])
    box(xs[1], 66, cw, 74, "COGS_Build", ["cost to serve one", "student per month"])
    box(xs[2], 148, cw, 74, "Institute_ROI", ["the owner's report card:", "is it worth the price?"], fill=TEALT,
        edge=TEAL)
    box(xs[2], 66, cw, 74, "Unit_Econ", ["our payback:", "do we earn it back?"], fill=TEALT, edge=TEAL)
    box(xs[3], 168, cw, 54, "Cover", ["the headline answer", "and the scenario switch"], fill=NAVY, edge=NAVY,
        tc=colors.white, sc=colors.HexColor("#BFE6E7"))
    box(xs[3], 112, cw, 48, "Scenarios", ["Bear, Base, Bull", "side by side"])
    box(xs[3], 66, cw, 38, "Sensitivity", ["which dial matters"])
    _arrow(d, xs[0] + cw + 3, 185, xs[1] - 3)       # Assumptions -> Pricing
    _arrow(d, xs[0] + cw + 3, 136, xs[1] - 3)       # Assumptions -> COGS_Build
    _arrow(d, xs[1] + cw + 3, 185, xs[2] - 3)       # Pricing -> Institute_ROI
    _arrow(d, xs[1] + cw + 3, 103, xs[2] - 3)       # COGS_Build -> Unit_Econ
    for y in (195, 136, 85):
        _arrow(d, xs[2] + cw + 3, y, xs[3] - 3)
    d.add(Rect(0, 0, wpt, 52, rx=5, ry=5, fillColor=colors.white, strokeColor=LINE, strokeWidth=1))
    third = wpt / 3
    for i, (t, s) in enumerate([("Checks", f"the smoke alarm: {len(N['checks'])} automatic tests"),
                                ("Sources", "the receipts for every input"),
                                ("Engine (hidden)", "backstage copies for Scenarios and Sensitivity")]):
        d.add(String(third * i + third / 2, 31, t, fontName="Calibri-Bold", fontSize=10, fillColor=NAVY,
                     textAnchor="middle"))
        d.add(String(third * i + third / 2, 17, s, fontName="Calibri", fontSize=8.2, fillColor=MUTED,
                     textAnchor="middle"))
    d.add(String(wpt / 2, 57, "watches over everything above", fontName="Calibri-Italic", fontSize=7.8,
                 fillColor=MUTED, textAnchor="middle"))
    return d


def funnel_chart():
    cat, rec = R_("catchable"), R_("recall")
    act, rct = AB("ActionRate"), AB("InterventionSuccess")
    v0 = 100.0
    v1 = v0 * cat
    v2 = v1 * rec
    v3 = v2 * act
    v4 = v3 * rct
    rows = [("Students who would otherwise leave", v0, NAVY, False),
            (f"…minus those leaving in month 1 (no test data yet): {pct_s(cat)} left", v1, SOFT, False),
            (f"…that the model flags (recall {pct_s(rec)})", v2, SOFT, False),
            (f"…that the institute actually follows up ({pct_s(act)})", v3, SOFT, False),
            (f"…that outreach keeps (trial effect {pct_s(rct)})", v4, TEAL, True),
            ("For comparison, the PS example: a flat 25%", 25.0, AMBER, False)]
    rh = 24
    d = Drawing(W, rh * len(rows) + 8)
    lab_w, bar_x, bar_w = 232, 238, 190
    for i, (lab, v, col, bold) in enumerate(rows):
        y = rh * (len(rows) - 1 - i) + 6
        d.add(String(lab_w, y + 5, lab, fontName="Calibri-Bold" if bold else "Calibri", fontSize=9,
                     fillColor=NAVY if bold else INK, textAnchor="end"))
        d.add(Rect(bar_x, y, bar_w * v / 100.0, 13, fillColor=col, strokeColor=None))
        d.add(String(bar_x + bar_w * v / 100.0 + 5, y + 3.5, f"{v:.1f} of 100" if v < 99 else "100",
                     fontName="Calibri-Bold", fontSize=9, fillColor=NAVY))
    d.add(Line(0, rh + 3, W, rh + 3, strokeColor=LINE, strokeWidth=0.8))
    return d


def value_cost_chart():
    comp_v = [("Fees retained", R_("fees_retained"), TEAL), ("Staff time saved", R_("staff"), colors.HexColor("#7CC4C5")),
              ("Extra admissions (assumption)", R_("admissions"), AMBER)]
    comp_c = [("Platform fee", R_("platform_fee"), NAVY), ("GST not reclaimed", R_("gst"), colors.HexColor("#5B7AA6")),
              ("Mentor time", R_("mentor"), SOFT)]
    mx = max(sum(v for _, v, _ in comp_v), sum(v for _, v, _ in comp_c))
    d = Drawing(W, 128)
    x0, bw = 62, W - 62 - 70

    def bar(y, label, comps, total_lab):
        d.add(String(x0 - 6, y + 6, label, fontName="Calibri-Bold", fontSize=10, fillColor=NAVY, textAnchor="end"))
        x = x0
        for _, v, col in comps:
            w = bw * v / mx
            d.add(Rect(x, y, w, 20, fillColor=col, strokeColor=colors.white, strokeWidth=0.8))
            x += w
        d.add(String(x + 5, y + 6, total_lab, fontName="Calibri-Bold", fontSize=10, fillColor=NAVY))
        lx, ly = x0, y - 13
        for name, v, col in comps:
            d.add(Rect(lx, ly, 7, 7, fillColor=col, strokeColor=None))
            txt = f"{name} {inr(v)}"
            d.add(String(lx + 10, ly, txt, fontName="Calibri", fontSize=8.4, fillColor=INK))
            lx += 10 + stringWidth(txt, "Calibri", 8.4) + 14

    bar(88, "Value", comp_v, inr(R_("value")))
    bar(26, "Cost", comp_c, inr(R_("cost")))
    return d


def season_chart():
    idx, mo, ren = SE["index"], SE["months"], SE["renewal"]
    d = Drawing(W, 118)
    n = len(idx)
    slot = W / n
    for i in range(n):
        h = 70 * idx[i]
        x = i * slot + 6
        col = AMBER if ren[i] else TEAL
        d.add(Rect(x, 24, slot - 12, h, fillColor=col, strokeColor=None))
        d.add(String(x + (slot - 12) / 2, 28 + h, f"{idx[i]:.2f}", fontName="Calibri-Bold", fontSize=8.4,
                     fillColor=NAVY, textAnchor="middle"))
        d.add(String(x + (slot - 12) / 2, 10, mo[i], fontName="Calibri", fontSize=9, fillColor=INK,
                     textAnchor="middle"))
    d.add(Line(0, 24, W, 24, strokeColor=LINE, strokeWidth=0.8))
    d.add(Rect(W - 205, 106, 7, 7, fillColor=TEAL, strokeColor=None))
    d.add(String(W - 195, 106, "normal month", fontName="Calibri", fontSize=8.2, fillColor=MUTED))
    d.add(Rect(W - 120, 106, 7, 7, fillColor=AMBER, strokeColor=None))
    d.add(String(W - 110, 106, "renewal month", fontName="Calibri", fontSize=8.2, fillColor=MUTED))
    return d


SHORT = [("List price", "List price per student", "inr"), ("Annual fee", "Annual fee per student", "inr"),
         ("Mid-session dropout", "Dropout rate", "pct"),
         ("Share of students paying full fee upfront", "Share paying fully upfront", "pct"),
         ("Instalments per year", "Number of instalments", "int"),
         ("Dropout reduction among flagged", "Outreach effect (from trials)", "pct"),
         ("Model recall on minors", "Model recall on minors", "pct"),
         ("Months before the model can flag", "Months before first flag", "int"),
         ("Admissions uplift", "Extra admissions next session", "pct"),
         ("Share of institutes that reclaim", "Share reclaiming our GST", "pct"),
         ("Monthly logo churn", "Monthly churn (monthly payers)", "pct"),
         ("Non-renewal at session end", "Non-renewal at session end", "pct"),
         ("Pilot-to-paid conversion", "Pilot-to-paid conversion", "pct"),
         ("Pilots started per rep", "Pilots per rep per month", "int")]


def _short(name):
    for pre, lab, kind in SHORT:
        if name.startswith(pre):
            return lab, kind
    return name, "pct"


def _val(v, kind):
    return inr(v) if kind == "inr" else (indian(v) if kind == "int" else pct_s(v))


def tornado(metric, top, base, fmtx):
    lo_k, hi_k, sw_k = (("roi_bear", "roi_bull", "roi_swing") if metric == "roi" else ("lc_bear", "lc_bull", "lc_swing"))
    rows = sorted([r for r in N["tornado"] if (r[sw_k] or 0) > 1e-6], key=lambda r: -r[sw_k])[:top]
    lo = min(min(r[lo_k], r[hi_k]) for r in rows + [{"roi_bear": base, "roi_bull": base, "lc_bear": base,
                                                     "lc_bull": base}])
    hi = max(max(r[lo_k], r[hi_k]) for r in rows)
    lo, hi = min(lo, base) - 0.15 * (hi - lo), hi + 0.15 * (hi - lo)
    rh = 25
    d = Drawing(W, rh * len(rows) + 30)
    lab_w, bx, bw = 205, 215, W - 215 - 10

    def X(v):
        return bx + bw * (v - lo) / (hi - lo)

    for i, r in enumerate(rows):
        y = rh * (len(rows) - 1 - i) + 8
        lab, kind = _short(r["name"])
        d.add(String(lab_w, y + 9, lab, fontName="Calibri-Bold", fontSize=9, fillColor=NAVY, textAnchor="end"))
        d.add(String(lab_w, y - 1, f"{_val(r['bear_val'], kind)} (Bear)  to  {_val(r['bull_val'], kind)} (Bull)",
                     fontName="Calibri", fontSize=7.6, fillColor=MUTED, textAnchor="end"))
        for v, col in ((r[lo_k], NAVY), (r[hi_k], TEAL)):
            x1, x2 = sorted((X(base), X(v)))
            d.add(Rect(x1, y + 1, max(x2 - x1, 0.8), 13, fillColor=col, strokeColor=None))
            anchor_right = v >= base
            d.add(String(X(v) + (4 if anchor_right else -4), y + 4, fmtx(v), fontName="Calibri-Bold", fontSize=8.4,
                         fillColor=INK, textAnchor="start" if anchor_right else "end"))
    top_y = rh * len(rows) + 10
    d.add(Line(X(base), 4, X(base), top_y, strokeColor=INK, strokeWidth=0.8, strokeDashArray=[3, 2]))
    d.add(String(X(base), top_y + 4, f"Base {fmtx(base)}", fontName="Calibri-Bold", fontSize=8.4, fillColor=INK,
                 textAnchor="middle"))
    return d


def seg_chart():
    seg = N["seg"]["ltv_cac"]
    vals = [("Small", seg["small"]["base"]), ("Mid", seg["mid"]["base"]), ("Large", seg["large"]["base"])]
    d = Drawing(W * 0.62, 96)
    mx = max(v for _, v in vals) * 1.15
    base_y, ch = 22, 62
    sl = (W * 0.62 - 20) / 3
    y3 = base_y + ch * 3 / mx
    d.add(Line(10, base_y, W * 0.62 - 6, base_y, strokeColor=LINE, strokeWidth=0.8))
    d.add(Line(10, y3, W * 0.62 - 6, y3, strokeColor=RED, strokeWidth=0.9, strokeDashArray=[4, 3]))
    d.add(Line(12, 90, 30, 90, strokeColor=RED, strokeWidth=0.9, strokeDashArray=[4, 3]))
    d.add(String(34, 87, "3x rule of thumb", fontName="Calibri-Italic", fontSize=7.8, fillColor=RED))
    for i, (n, v) in enumerate(vals):
        h = ch * v / mx
        x = 14 + i * sl + 10
        cx = x + (sl - 30) / 2
        d.add(Rect(x, base_y, sl - 30, h, fillColor=TEAL if v >= 3 else AMBER, strokeColor=None))
        d.add(Rect(cx - 15, base_y + h + 2, 30, 13, fillColor=colors.white, strokeColor=None))  # masks the dashed line
        d.add(String(cx, base_y + h + 4, xm(v), fontName="Calibri-Bold", fontSize=10, fillColor=NAVY,
                     textAnchor="middle"))
        d.add(String(cx, 8, n, fontName="Calibri", fontSize=9.5, fillColor=INK, textAnchor="middle"))
    return d


def heat_table(top_left, col_heads, rows, col_fmt, row_fmt, cellfmt, good, mid=None, widths=None):
    data = [[top_left] + [col_fmt(c) for c in col_heads]]
    extra = []
    for i, (rh, vals) in enumerate(rows, start=1):
        data.append([row_fmt(rh)] + [cellfmt(v) for v in vals])
        for j, v in enumerate(vals, start=1):
            if mid is not None and v < good and v >= mid:
                bg = colors.HexColor("#FFE699")
            elif v >= good:
                bg = colors.HexColor("#C6EFCE")
            else:
                bg = colors.HexColor("#F8CBAD")
            extra.append(("BACKGROUND", (j, i), (j, i), bg))
    ncol = len(col_heads) + 1
    widths = widths or [34] + [(W / mm - 34) / (ncol - 1)] * (ncol - 1)
    return tbl(data, widths, right=tuple(range(1, ncol)), zebra=False, extra=extra)


# ------------------------------------------------------------------ document
class Doc(BaseDocTemplate):
    pass


DOC = Doc(OUT, pagesize=A4, leftMargin=LM, rightMargin=RM, topMargin=18 * mm, bottomMargin=20 * mm,
          title="The Data Moat financial model, explained", author="Team AlphaQ",
          subject="Plain-English guide to DataMoat_Financial_Model.xlsx and its link to the Case B problem statement")


def on_cover(c, doc):
    c.saveState()
    c.setFillColor(NAVY)
    c.rect(0, PH - 158 * mm, PW, 158 * mm, stroke=0, fill=1)
    c.setFillColor(TEAL)
    c.rect(0, PH - 161 * mm, PW, 3 * mm, stroke=0, fill=1)
    c.setFillColor(TEALD)
    c.roundRect(LM, PH - 36 * mm, 62 * mm, 7 * mm, 3.5 * mm, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Calibri-Bold", 9.5)
    c.drawString(LM + 5 * mm, PH - 33.6 * mm, "CASE B  ·  THE DATA MOAT")
    c.setFont("Cambria-Bold", 38)
    c.drawString(LM, PH - 70 * mm, "The Financial Model,")
    c.drawString(LM, PH - 88 * mm, "Explained")
    c.setFont("Calibri", 14)
    c.setFillColor(colors.HexColor("#BFE6E7"))
    c.drawString(LM, PH - 106 * mm, "Every tab, every term and how it all connects to the case brief,")
    c.drawString(LM, PH - 113 * mm, "in plain English for a first-time reader.")
    c.setFillColor(colors.white)
    c.setFont("Calibri-Bold", 11)
    c.drawString(LM, PH - 143 * mm, "Team AlphaQ")
    c.setFont("Calibri", 11)
    c.drawString(LM + 28 * mm, PH - 143 * mm, "·  Nextute Edtech × Finance Club, IIT Patna  ·  Case Competition 2026")
    c.setFillColor(MUTED)
    c.setFont("Calibri", 8.8)
    c.drawString(LM, 14 * mm, f"Explains DataMoat_Financial_Model.xlsx  ·  model version {VERSION}  ·  all numbers are the Base scenario "
                              "unless stated  ·  22 October 2026")
    c.restoreState()


def on_page(c, doc):
    c.saveState()
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(LM, 14 * mm, PW - RM, 14 * mm)
    c.setFont("Calibri", 8.5)
    c.setFillColor(MUTED)
    c.drawString(LM, 9.5 * mm, "The Data Moat · financial model explained · Team AlphaQ")
    c.drawRightString(PW - RM, 9.5 * mm, f"Page {doc.page}")
    c.restoreState()


DOC.addPageTemplates([
    PageTemplate(id="cover", frames=[Frame(LM, 19 * mm, W, PH - 19 * mm - 168 * mm, id="cf", leftPadding=0,
                                           rightPadding=0, topPadding=0, bottomPadding=0)], onPage=on_cover),
    PageTemplate(id="body", frames=[Frame(LM, 20 * mm, W, PH - 38 * mm, id="bf", leftPadding=0, rightPadding=0,
                                          topPadding=0, bottomPadding=0)], onPage=on_page)])

story = []

# ================================================================== COVER (frame below the navy block)
def make_cover(n_terms):
    """Lower part of the cover page. Built after the glossary exists so the term count is exact."""
    def tiles_table(items, big_size=20):
        cells = [[[Paragraph(f'<font name="Cambria-Bold" size="{big_size}" color="{H(NAVY)}">{a}</font>',
                             PS("t1", leading=big_size + 4, spaceAfter=0)),
                   Paragraph(b, PS("t2", fontSize=9.2, leading=11.5, textColor=MUTED, spaceAfter=0))]
                  for a, b in items[i:i + 3]] for i in range(0, len(items), 3)]
        t = Table(cells, colWidths=[W / 3] * 3)
        t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), TINT), ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                               ("LINEBEFORE", (1, 0), (-1, -1), 0.6, LINE), ("LINEBELOW", (0, 0), (-1, -2), 0.6, LINE),
                               ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                               ("LEFTPADDING", (0, 0), (-1, -1), 10), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
        return t

    headline = [(pct(R_("eff_red")), "of dropouts prevented (the PS assumed 25%)"),
                (xm(U_("ltv_cac")), f"lifetime value ÷ cost to win a customer (the PS said {xm(GU['ltv_cac'])})"),
                (num(R_("be_students")), "students to keep per year for the product to pay for itself")]
    inside = [("12", "tabs explained, one by one"), (str(n_terms), "jargon terms in plain words"),
              ("PS", "linked to the case brief throughout"), ("5 min", "to try it yourself"),
              (str(N_INPUTS), "inputs, each with a source"), ("1", "honest page on limits")]
    lab = PS("cw", fontName="Calibri-Bold", fontSize=11.5, textColor=TEALD, spaceAfter=3)
    return [Spacer(1, 4), Paragraph("Who this is for", lab),
            Paragraph("Anyone opening our workbook for the first time: a teammate building the slides, a mentor, or a judge. "
                      "No finance background needed.", PS("cp", fontSize=11, leading=15)), Spacer(1, 10),
            Paragraph("The honest headline, in three numbers (Base case, model output)", lab),
            tiles_table(headline, 22), Spacer(1, 10), Paragraph("What is inside", lab), tiles_table(inside),
            NextPageTemplate("body"), PageBreak()]


# ================================================================== START HERE
story += [Paragraph("START HERE", EYEBROW), Paragraph("How to read this guide", H1),
          Table([[""]], colWidths=[W], rowHeights=[1.4], style=[("BACKGROUND", (0, 0), (-1, -1), TEAL)]), Spacer(1, 7),
          P("This guide walks you through our financial model (an Excel workbook) the way a friend would: what each tab is "
            "for, what the jargon means, and where the case brief asks for it. The case brief is called the "
            "<b>PS</b> (problem statement) throughout. New words are explained as they appear, and again in Part 2."),
          callout("plain", "<b>The whole model in one breath.</b> We ask two questions. (1) Is our software worth its price "
                           "to a coaching institute? (2) Do we earn more from an institute than it costs us to win and "
                           "serve it? Every tab in the workbook feeds one of those two answers."),
          callout("ps", "<b>Where this sits in the competition.</b> The PS gives 30% of the marks to the edtech market and "
                        "business (Section 4). This model is its heart: <i>Revenue model &amp; unit economics</i> (20%) and "
                        "part of <i>Market &amp; go-to-market</i> (10%) (Section 10). The PS also says teams that state their "
                        "assumptions and limitations score higher than teams that oversell, so our model shows ranges and "
                        "warnings, not one rosy number."),
          Paragraph("<b>What the four coloured boxes mean</b>", PS("lg", fontName="Calibri-Bold", fontSize=9.6, leading=12,
                                                              textColor=TEALD, spaceAfter=2))]
legend = Table([[Paragraph("<b>In plain English</b><br/>the idea without jargon", BODYS),
                 Paragraph("<b>From the PS</b><br/>where the case brief asks for it", BODYS),
                 Paragraph("<b>Worked example</b><br/>real numbers from the model", BODYS),
                 Paragraph("<b>Watch out</b><br/>limits and soft spots", BODYS)]], colWidths=[W / 4] * 4)
legend.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, 0), TEALT), ("BACKGROUND", (1, 0), (1, 0), PSBG),
                            ("BACKGROUND", (2, 0), (2, 0), TINT), ("BACKGROUND", (3, 0), (3, 0), AMBERT),
                            ("LINEBEFORE", (0, 0), (0, 0), 3, TEAL), ("LINEBEFORE", (1, 0), (1, 0), 3, NAVY),
                            ("LINEBEFORE", (2, 0), (2, 0), 3, SOFT), ("LINEBEFORE", (3, 0), (3, 0), 3, AMBER),
                            ("LEFTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 5),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
story += [legend, Spacer(1, 6),
          P(f"<b>About the numbers.</b> Every number is the <b>Base</b> scenario of model version {VERSION} unless the "
            "text says Bear or Bull. They are model outputs built on sourced and assumed inputs, not measurements. If the "
            "workbook changes, rerun the scripts in the <font name=\"%s\">guide</font> folder. "
            "<b>Short on time?</b> Read Part 1, then the Cover, Institute_ROI and Unit_Econ tabs, then Part 6." % MONO,
            BODYS),
          P("Contents", H3)]
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle("TOC0", fontName="Calibri-Bold", fontSize=9.8, leading=10.9, textColor=NAVY, spaceBefore=0.5),
    ParagraphStyle("TOC1", fontName="Calibri", fontSize=8.9, leading=10, textColor=INK, leftIndent=14)]
toc.dotsMinLevel = 0
story += [toc]

# ================================================================== PART 1
story += part_head(1, "The big picture",
                   "Before the tabs, the story: what question the model answers, why the PS's own example is too good to "
                   "be true, and how a financial model is put together.", new_page=True)
story += [Paragraph("1.1  The two questions behind the model", H2),
          P("Think of a gym. The owner of a gym asks <i>“will members feel the fee is worth it?”</i> The company that built "
            "the gym's app asks <i>“after support staff and advertising, do we make money from each gym?”</i> Our case is the "
            "same, with coaching institutes instead of gyms."),
          *bullets([
              "<b>Question 1, the institute's view (tab Institute_ROI).</b> For an institute with 400 students: how many "
              "students can our software help keep, how much fee does that save, and is it more than the software costs?",
              "<b>Question 2, our view (tab Unit_Econ).</b> For each institute we sign: how much do we earn a month, what did "
              "it cost to win, how long does it stay, and do we get our money back?"]),
          callout("ps", "These are PS Section 3, questions <b>B1</b> (“Who is the buyer … and what is the measurable ROI for an "
                        "institute?”) and <b>B2</b> (“What do you charge … and what are CAC, payback, churn and LTV?”). "
                        "Don't worry about those abbreviations yet; Part 2 explains each one."),
          Paragraph("1.2  The PS's own example, and why it is too good to be true", H2),
          P("PS Section 6 gives a deliberately simple worked example. Here it is, step by step:"),
          tbl([["Step", "PS calculation", "Result"],
               ["Fees lost to dropouts", "400 students × 12% × ₹36,000", "₹17,28,000"],
               ["Saved if the platform prevents 25%", "12 students × ₹36,000", "₹4,32,000"],
               ["Platform cost at ₹40 a student a month", "400 × ₹40 × 12", "₹1,92,000"],
               ["Return on platform cost", "₹4,32,000 ÷ ₹1,92,000", "about 2.25x"],
               ["Monthly contribution per institute", "₹16,000 revenue − ₹5,400 costs", "₹10,600"],
               ["Payback and lifetime value", "₹33,000 ÷ ₹10,600; ₹10,600 × ~33 months", "3.1 months; LTV/CAC about 10x"]],
              [62, 69, 43], right=(2,)),
          Spacer(1, 6),
          P("The PS then says, in its own words, <b>“Your job is to challenge this.”</b> The numbers look so attractive that "
            "judges will question them. Our workbook keeps the PS example as a column called <i>Guide (naive)</i> next to our "
            "own numbers and shows what changes once real-world friction is added:"),
          *numbered([
              "Not every dropout can be prevented, and some students leave before we have any data on them.",
              "Not every rupee of fee is lost: instalment payers simply stop paying, and upfront payers may get a refund.",
              "Classrooms empty during exams, so a bill based on active students shrinks at certain times of year.",
              "Customers leave. A monthly churn of 3% sounds small, but it adds up and spikes when the new session starts.",
              "Winning a customer costs more than a salesperson's time: free pilots that do not convert, onboarding, support."]),
          P("Here is the effect on the headline numbers, for the same 400-student institute:"),
          tbl([["Headline", "PS example", "Our model (Base)"],
               ["Share of dropouts prevented", "25%", pct(R_("eff_red"))],
               ["Students kept per year", "12 of 48", f"{num(R_('prevented'))} of {num(R_('dropouts'), 0)}"],
               ["Institute ROI, counting only fees saved", "2.25x", xm(R_("roi_fees"))],
               ["Institute ROI, counting all benefits", "2.25x", xm(R_("roi"))],
               ["LTV ÷ CAC", xm(GU["ltv_cac"]), xm(U_("ltv_cac"))],
               ["Payback", f"{num(GU['payback'])} months", f"{num(U_('payback'), 0)} months"]],
              [78, 46, 50], right=(1, 2)),
          Spacer(1, 6),
          callout("warn", f"Our all-in ROI ({xm(R_('roi'))}) is <i>higher</i> than the PS's 2.25x. Do not be fooled. Roughly "
                          f"two-thirds of it rests on one soft assumption (1% more admissions after better results). On fees "
                          f"alone we are at only {xm(R_('roi_fees'))}. Both numbers sit on the Cover tab on purpose, and the "
                          "Institute_ROI section explains why.")]

story += [Paragraph("1.3  What a financial model really is", H2),
          P("A financial model is a calculator you can ask <i>“what if?”</i> You type in your beliefs (the <b>assumptions</b>), "
            "the calculator turns them into money numbers, and you change a belief to see what happens. Its job is not to "
            "predict the future. Its job is to show <b>which beliefs matter</b> and <b>how bad things could get</b>."),
          P("Ours is built in five steps, and each step has its own tabs:"),
          tbl([["Step", "What happens", "Tabs"],
               ["1  Write down the beliefs", "Every input, with Bear / Base / Bull values, a source and a confidence label",
                "Assumptions, Seasonality"],
               ["2  Build the blocks", "What price we really collect; what it costs to serve one student",
                "Pricing, COGS_Build"],
               ["3  Answer the two questions", "The institute's ROI; our own unit economics", "Institute_ROI, Unit_Econ"],
               ["4  Stress-test", "Three scenarios side by side; which single input matters most",
                "Scenarios, Sensitivity"],
               ["5  Guard rails", "Automatic checks and a source for every input", "Checks, Sources"]],
              [48, 90, 36]),
          Spacer(1, 5), workbook_map(),
          Paragraph("The workbook at a glance: inputs flow right, through building blocks, into the two questions, and out "
                    "as answers. The Cover tab is the front door.", CAP),
          P("Three house rules keep it trustworthy:", H3),
          *bullets([
              "<b>One home for numbers.</b> Every number lives on the Assumptions tab (plus the calendar on Seasonality). "
              "Calculation tabs only pull from there.",
              "<b>Formulas are never typed over.</b> Colour tells you what is what: <font color=\"#0000FF\"><b>blue</b></font> "
              "is a typed input, black is a formula, <font color=\"#008000\"><b>green</b></font> is a number pulled from "
              "another tab.",
              "<b>Ranges, not single points.</b> Each input has a Bear, Base and Bull value so you can see the spread."]),
          callout("ps", [f"<b>PS Section 9, Round 1, deliverable 2:</b> “Financial model with clearly listed assumptions and "
                         f"at least one sensitivity analysis… Formulas must be live, not hard-coded.” Here is how we meet it, "
                         f"and what Round 2 adds:",
                         tbl([["PS requirement", "How we meet it"],
                              ["Live formulas, not hard-coded", "Every calculation is a formula. The only typed numbers are the "
                               "blue inputs. A full recalculation shows 0 formula errors."],
                              ["Clearly listed assumptions", f"{N_INPUTS} inputs on Assumptions, each with unit, Bear / Base / "
                               "Bull, type, confidence and source."],
                              ["At least one sensitivity analysis", f"Sensitivity tab: a tornado of {len(N['tornado'])} inputs "
                               "and two what-if grids."],
                              ["Round 2: 3-year projection, scenarios, sensitivities", "Scenarios and sensitivities done. The "
                               "3-year monthly projection with hiring and cash is <b>not built yet</b>."]],
                             [55, 111], first_bold=False)])]

# ================================================================== PART 2
GLOSS = [
    ("A · About the institute's money", [
        ("Dropout", f"A student who leaves in the middle of the session, or stops paying. Base case: {pct_s(AB('DropoutRate'))} of "
                    f"students a year, so {num(R_('dropouts'), 0)} out of 400.", "Assumptions → Institute"),
        ("Upfront vs instalments", "Some parents pay the whole fee at admission (upfront). Most pay in 2–4 parts "
                                   "(instalments). When a student leaves, only the <i>unpaid</i> instalments are really lost.",
         f"Base: {pct_s(AB('UpfrontShare'))} upfront; {num(AB('NInstalments'), 0)} instalments"),
        ("Pro-rata refund", "Money back for the part of the course not used: leave after 4 of 10 months and you get back 6/10 of "
                            "what you paid. Ministry of Education guidelines say full payers should get this within 10 days, "
                            "but they are advisory and many big chains do not follow them.",
         f"Assumed: {pct_s(AB('RefundEnforced'))} of upfront leavers actually refunded"),
        ("Fee lost per dropout", "The part of the fee the institute truly loses: unpaid instalments for instalment payers, a "
                                 "refund for upfront payers, depending on the month the student leaves.",
         f"Base: {inr(R_('fee_lost'))} on average"),
        ("Active student", "A student currently in class. Our bill is per <i>active</i> student, so it shrinks when classes "
                           "empty out.", "Seasonality"),
        ("Seasonality", "The yearly rhythm: admissions in April to June, thin classes in exam months, then the cycle restarts.",
         "Seasonality tab"),
        ("GST and input credit", "GST is the 18% sales tax on our software. A GST-registered business can claim it back "
                                 "(<i>input tax credit</i>). A small unregistered one cannot, so for them it is a real extra "
                                 "cost.", f"Pricing; assumed {pct_s(AB('ITCShare'))} reclaim it")]),
    ("B · About how the model is built", [
        ("Assumption", "A number we believe but have not measured. Each one carries Bear, Base and Bull values and a label for "
                       "how much evidence stands behind it.", "Assumptions"),
        ("Bear / Base / Bull", "Three versions of each input. <b>Bear</b> = worst for our business, <b>Base</b> = our best guess, "
                               "<b>Bull</b> = best. Bear is not always the smaller number: high churn is Bear.", "Cover switch"),
        ("Live formula vs hard-coded", "A live formula recalculates when an input changes (for example =B2*B3). A hard-coded "
                                       "number is just typed in and goes stale. The PS requires live formulas.",
         "all calculation tabs"),
        ("Named range", "A nickname for a cell, so a formula can read <font name=\"%s\">=ListPrice</font> instead of "
                        "<font name=\"%s\">=Assumptions!G25</font>." % (MONO, MONO), "Assumptions"),
        ("Scenario", "One complete set of Bear, Base or Bull values. The switch on the Cover chooses which set the model "
                     "shows.", "Cover cell C6; Scenarios"),
        ("Sensitivity / tornado", "Move <i>one</i> input from its Bear value to its Bull value, keep the rest at Base, and "
                                  "see how far the answer swings. Sorted longest bar first, the chart looks like a tornado.",
         "Sensitivity"),
        ("Evidence labels", "<b>Researched</b> (found in a source), <b>Public</b> (public dataset), <b>Guide</b> (from the PS), "
                            "<b>Assumption</b> (our judgement), <b>Structural</b> (a modelling convention).",
         "Assumptions col H; Sources")]),
    ("C · About preventing dropouts", [
        ("Recall", f"Of the students who really will leave, the share our early warning flags. Base: "
                   f"{pct_s(AB('Recall_Minor'))} for under-18s, {pct_s(AB('Recall_Adult'))} for adults.", "Institute_ROI"),
        ("Precision", f"Of the students we flag, the share who really would have left. {pct_s(AB('Precision'))} means about two "
                      "of every three flags are false alarms. It drives how much mentor time is spent.", "Institute_ROI"),
        ("Catchable share", f"Dropouts that happen after we have enough test data to notice. A student who leaves in month 1 is "
                            f"invisible to us. Base: {pct_s(R_('catchable'))} are catchable.", "Institute_ROI"),
        ("RCT", f"Randomised controlled trial: a fair experiment where some students get outreach and a similar group does not. "
                f"We borrowed an average effect of {pct_s(AB('InterventionSuccess'))} from 8 such trials in other settings.",
         "Institute_ROI"),
        ("Effective reduction", f"The share of <i>all</i> dropouts we actually prevent: catchable × recall × follow-up rate × "
                                f"trial effect. Base: {pct(R_('eff_red'))}. The PS assumed 25%.", "Institute_ROI")]),
    ("D · Is it worth it for the institute?", [
        ("ROI (our definition)", "Value gained ÷ cost paid. 2.0x means ₹2 back for every ₹1 paid. This is the PS's definition "
                                 "(₹4,32,000 ÷ ₹1,92,000 = 2.25x). Careful: some textbooks subtract the cost first.",
         "Institute_ROI"),
        ("Fees-only ROI", "The same ratio counting only the fees saved. The cautious version that ignores soft benefits.",
         "Institute_ROI"),
        ("Soft benefits", "Gains that are real but harder to prove: staff hours saved, and extra admissions because results and "
                          "parent trust improve.", "Institute_ROI"),
        ("Break-even", f"How many students we must help keep each year so the fees saved equal what the institute pays us. "
                       f"Base: {num(R_('be_students'))} students.", "Institute_ROI")]),
    ("E · Is it worth it for us?", [
        ("List vs realised price", f"List is the brochure price ({inr(AB('ListPrice'))} per student per month). Realised is "
                                   f"what we really collect after discounts ({inr(PR['realised'], 2)}).", "Pricing"),
        ("Minimum fee", f"A floor of {inr(AB('MinFee'))} a month per institute so tiny or quiet months do not collapse "
                        "revenue.", "Pricing"),
        ("Bad debt", f"Bills that never get paid. Base: {pct_s(AB('BadDebt'))}.", "Unit_Econ"),
        ("COGS", "Cost of goods sold: what it costs to serve a customer. For us: AI, WhatsApp messages, servers. "
                 f"About {inr(CO['all_in'], 2)} per student per month.", "COGS_Build"),
        ("Gross margin", f"Revenue minus COGS, as a share of revenue. Base, Mid institute: {pct(U_('gm'), 0)}.", "Unit_Econ"),
        ("Contribution margin", f"Revenue minus COGS <i>and</i> support staff, as a share of revenue. Base: {pct(U_('cm'), 0)}. "
                                "What each institute contributes towards our team and office costs.", "Unit_Econ"),
        ("CAC", f"Customer acquisition cost: what we spend to win one paying institute (sales time, travel, marketing, and "
                f"the trials that do not convert). Base: {inr(U_('cac'))}. <b>Fully loaded</b> CAC also adds pilot costs and "
                f"onboarding: {inr(U_('acq'))}.", "Unit_Econ"),
        ("Pilot / retro-pilot", "A free trial. Ours looks backwards: we load last year's Excel and show the owner who left and "
                                "whether we would have spotted them.", "Assumptions → GTM"),
        ("Onboarding", f"Setting an institute up: moving its data and training its staff. Base: {inr(U_('onboard'))} for a Mid "
                       f"institute ({inr(U_('onboard', 'small'))} Small, {inr(U_('onboard', 'large'))} Large).", "Unit_Econ"),
        ("Payback", f"Months until an institute's contribution has repaid what we spent winning it. Base: "
                    f"{num(U_('payback'), 0)} months (PS: 3.1).", "Unit_Econ"),
        ("Logo churn", f"Share of <i>customers</i> (institutes, not rupees) that cancel in a month. Base: "
                       f"{pct_s(AB('ChurnInSeason'))} for monthly payers; {pct_s(AB('PrepayUptake'))} are on annual prepay and "
                       f"cannot leave mid-year, so the effective rate is {pct(U_('churn_eff'))}.", "Unit_Econ"),
        ("Renewal spike", f"Extra cancellations when a new session begins. Base: {pct_s(AB('RenewalSpike'))} of institutes do "
                          "not renew.", "Unit_Econ"),
        ("Survival curve", f"Month-by-month share of institutes still paying. Base annual retention: {pct(U_('ret'), 0)}.",
         "Unit_Econ"),
        ("Discounting", f"₹100 received next year is worth less than ₹100 today. We discount at {pct_s(AB('DiscountRate'))} a "
                        "year.", "Unit_Econ"),
        ("LTV", f"Lifetime value: all the contribution one institute brings before it leaves (60-month horizon, discounted). "
                f"Base: {lakh(U_('ltv'))}.", "Unit_Econ"),
        ("LTV ÷ CAC", f"Rupees of lifetime contribution for every rupee spent winning the customer. Base: {xm(U_('ltv_cac'))} "
                      f"(PS: {xm(GU['ltv_cac'])}). A common rule of thumb is that 3x or more is healthy.", "Unit_Econ"),
        ("NRR", "Net revenue retention: how revenue from existing customers changes over time, including upsell. The PS lists it "
                "as a concept to know, but our Round 1 model has no upsell revenue, so it is not computed.",
         "not in Round 1")]),
]
N_TERMS = sum(len(g[1]) for g in GLOSS)
story[0:0] = make_cover(N_TERMS)
story += part_head(2, "Jargon buster",
                   f"Read this like a dictionary, not a chapter: {N_TERMS} terms, grouped by the question they help answer. "
                   "Examples use the Base case, a typical 400-student institute with a ₹95,000 annual fee.")
for gtitle, rows in GLOSS:
    story += [Paragraph(gtitle, H2),
              tbl([["Term", "In plain words", "Where it shows up"]] + [[a, b, c] for a, b, c in rows], [30, 100, 44])]
    story.append(Spacer(1, 4))

# ================================================================== PART 3
story += part_head(3, "The tab-by-tab tour",
                   "Twelve tabs, in the order they appear in the workbook. Each gets the same treatment: what it is, why it "
                   "exists, what you will see, a worked example with real numbers, where the PS asks for it, and what to "
                   "watch out for.")

# ---- Cover
story += tab_head(1, "Cover", "the front door",
                  "Open the workbook and you land here. It is one page that tells you the answer, tells you whether to trust "
                  "it, and lets you flip the whole model between three versions of the future.")
story += bullets([
    "<b>Scenario switch (cell C6).</b> Type 1, 2 or 3 for Bear, Base or Bull. Every tab recalculates.",
    f"<b>Status light (cell C7).</b> Reads <i>ALL CHECKS PASS</i> when the arithmetic is consistent, plus a count of honest "
    f"warnings (currently {int(N['warnings'])}).",
    "<b>Headline table.</b> The key numbers for a typical 400-student institute, ours next to the PS's naive version.",
    "<b>Colour code and how-to notes</b> for first-time users."])


def cover_fmt(lab, v, ps=False):
    if v in (None, "") or isinstance(v, str):
        return v or "n/a"
    if lab.startswith("Effective dropout"):
        return pct(v)
    if lab.startswith("Extra admissions"):
        return "about 0" if v < 0.05 else num(v)
    if lab.startswith("Platform cost as %"):
        return pct(v, 2)
    if "ROI" in lab:
        return xm(v, 2 if ps else None)
    if "÷" in lab:
        return xm(v)
    if lab.startswith("Contribution margin"):
        return pct(v, 0)
    if "months" in lab.lower() or lab.startswith("Payback"):
        return num(v)
    if lab.startswith("Avg monthly") or lab.startswith("Fully loaded") or lab.startswith("LTV"):
        return inr(v)
    return num(v)


story.append(tbl([["Cover headline (Mid institute, Base)", "Our model", "PS naive"]] +
                 [[c["label"], cover_fmt(c["label"], c["ours"]), cover_fmt(c["label"], c["guide"], ps=True)] for c in N["cover"]],
                 [100, 37, 37], right=(1, 2)))
story += [Spacer(1, 6),
          callout("ps", "PS Section 10: <i>“Teams that clearly state their assumptions and limitations score higher than teams "
                        "that oversell.”</i> The <b>Guide (naive)</b> column and the warnings counter are that principle made "
                        "visible: we show the PS's version and our own, side by side."),
          callout("warn", "The headline follows the switch in C6, so always check it before quoting a number. For slides, quote "
                          "the Base scenario and say so.")]

# ---- Assumptions
story += tab_head(2, "Assumptions", "the control panel",
                  "Every number the model uses is typed here, and only here. If a number appears inside a calculation tab, it "
                  "was pulled from this tab. Change a blue cell and the whole workbook updates.")
story += bullets([
    f"<b>{N_INPUTS} inputs in seven blocks:</b> Segments (institute sizes and fees), Institute (dropouts and prevention), "
    "Pricing, COGS (cost to serve), GTM (sales and churn), Team, and Guide (the PS's own numbers, kept for comparison).",
    "<b>Columns:</b> Bear, Base and Bull (blue, typed) · <b>LIVE</b> (yellow: the one the switch picks) · Type and Confidence "
    "(H, M or L) · Source · Note.",
    "<b>How LIVE works:</b> it simply picks the Bear, Base or Bull column according to the switch on the Cover "
    "(the Excel function CHOOSE does this)."])
story += [P(f"<b>How much of this is evidence?</b> Of {N_INPUTS} inputs: {TYPES['Researched']} researched, {TYPES['Public']} public, "
            f"{TYPES['Guide']} straight from the PS, <b>{TYPES['Assumption']} our own assumptions</b>, "
            f"{TYPES['Structural']} structural. In other words, about half of what drives the model is still an informed "
            "guess, and the workbook labels each one so nobody is misled."),
          P("The ten inputs that move the answer most (Mid institute):", H3)]
top_inputs = [("ListPrice", "List price per student per month"), ("AdmissionUplift", "Extra admissions next session"),
              ("Fee_M", "Annual fee per student (Mid)"), ("InterventionSuccess", "Dropout reduction from outreach"),
              ("DropoutRate", "Dropout rate"), ("PilotConv", "Pilot-to-paid conversion"),
              ("ChurnInSeason", "Monthly churn (monthly payers)"), ("RenewalSpike", "Non-renewal at session end"),
              ("BlindMonths", "Months before the first flag"), ("ITCShare", "Share reclaiming our GST")]
story.append(tbl([["Input", "Bear", "Base", "Bull", "Type"]] +
                 [[lab, afmt(k, "bear"), afmt(k, "base"), afmt(k, "bull"), A[k]["type"]] for k, lab in top_inputs],
                 [74, 25, 25, 25, 25], right=(1, 2, 3)))
story += [Spacer(1, 6),
          callout("ps", "PS Section 7 gives a “data pack” of baseline values and says <i>“You may change them with "
                        "justification.”</i> Rule 4 in Section 11 repeats it. Part 4 shows exactly where we changed the PS's "
                        "numbers and why."),
          callout("warn", "<b>Bear means worst for our business, not “the lowest number”.</b> For churn, Bear is 5% and Bull is "
                          "1.5%. Always read the column header, not the size of the number.")]

# ---- Seasonality
story += tab_head(3, "Seasonality", "the calendar of busy and quiet months",
                  "Coaching runs on a calendar: students join in April to June, classes thin out around the board and "
                  "entrance exams, and by March many have finished. A flat “students × price × 12” ignores that. This tab "
                  "holds three small tables that teach the model the rhythm.")
story += bullets([
    "<b>A. Active-student index.</b> How full the classroom is each month, from 1.00 (full) down to "
    f"{min(SE['index']):.2f}. It also marks the {int(SE['renewal_months'])} renewal months when institutes decide whether to "
    "continue.",
    f"<b>B. Dropout timing.</b> Of all students who leave in a session, {pct_s(SE['drop_share'][0])} leave in course month 1 "
    f"and only {pct_s(SE['drop_share'][-1])} in month 10. The first five months hold "
    f"<b>{pct(sum(SE['drop_share'][:5]), 0)}</b> of dropouts.",
    "<b>C. A 60-month timeline</b> that maps “our paid month 1, 2, 3…” to calendar months, so Unit_Econ knows which months "
    "are quiet and which are renewals."])
story += [season_chart(), Paragraph("Table A: how full the classroom is, month by month (April to March).", CAP),
          callout("ps", "PS Section 6 lists “seasonal student counts” as a risk of per-student pricing, and Section 7 says "
                        "dropouts are <i>“highest in first 4–5 months.”</i> Judges also ask <i>“what happens to churn after the "
                        "exam season?”</i> This tab is the foundation of our answer; the answer itself is in Unit_Econ."),
          callout("warn", "Every number on this tab is an assumption (confidence: low). We found no public month-by-month data. "
                          "They are shaped by what we did find (refund windows in weeks 1–4, anecdotes of exits in months 2–4) "
                          "but must be checked in owner interviews.")]

# ---- Pricing
story += tab_head(4, "Pricing", "the price tag after discounts",
                  f"The brochure says {inr(AB('ListPrice'))} per student per month. Nobody pays exactly that. This tab turns "
                  "the list price into what we really collect.")
story += [callout("ex", [
    f"List price <b>{inr(AB('ListPrice'))}</b> per student per month",
    f"− negotiation discount {pct_s(AB('NegotiationDisc'))}, and annual prepay: {pct_s(AB('PrepayUptake'))} of institutes take it "
    f"at {pct_s(AB('PrepayDisc'))} off, an average of {pct_s(AB('PrepayUptake') * AB('PrepayDisc'))}",
    f"= effective discount <b>{pct_s(PR['eff_disc'])}</b> → realised price <b>{inr(PR['realised'], 2)}</b> per student per "
    f"month (before GST). If the owner cannot reclaim GST, it <i>feels</i> like {inr(PR['with_gst'], 2)}.",
    f"A minimum fee of {inr(AB('MinFee'))} a month means a small institute still pays something in the quietest month."],
    "WORKED EXAMPLE · Mid institute, Base"),
          P(f"<b>The competitor anchor.</b> Owners already pay for management apps. We found public prices of roughly ₹4 to ₹21 "
            f"per student per month (at 400 students) for tools like Classplus, Fedena and Graphy. Our realised price is "
            f"<b>{xm(PR['vs_anchor'])}</b> the middle anchor ({inr(PR['anchor'], 1)}). That gap is our biggest commercial risk and "
            "the reason the Checks tab shows its one warning."),
          P("<b>Packaging in the workbook</b>", H3),
          tbl([["Tier", "What it contains", "Price", "Role in the numbers"],
               ["Starter", "CSV or OMR upload, test-level reports, one batch", "Free", "Lead generation; free pilots are costed"],
               ["Pro (core)", "Topic heatmap, at-risk list with reasons, template parent reports", f"{inr(AB('ListPrice'))}",
                "The paid plan the whole model is built on"],
               ["Premium (AI)", "GenAI parent reports on WhatsApp, percentile band, study plans", "Pro + add-on",
                "<b>Not</b> in revenue until priced by research"],
               ["Annual plan", "Pro billed yearly upfront", inr(AB('ListPrice') * (1 - AB('PrepayDisc')), 2),
                "Cash up front; prepaid institutes cannot churn mid-year"]],
              [24, 74, 24, 52]),
          Spacer(1, 6),
          callout("ps", "PS Section 6 lists seven revenue models. Our numbers are built on the first one, <b>per-student "
                        "SaaS</b> with a minimum fee. “Freemium” appears as the free Starter tier and free pilots. The PS also "
                        "asks directly: <i>“Will owners really pay ₹40 per student?”</i> Part 4 lists which of the seven we "
                        "model and which we do not."),
          callout("warn", f"Price pulls two ways. A lower price improves the owner's ROI (at ₹20: "
                          f"{xm(N['tornado'][0]['roi_bear'])}) but weakens our LTV/CAC ({xm(N['tornado'][0]['lc_bear'])}). A higher "
                          f"price (₹40) gives {xm(N['tornado'][0]['roi_bull'])} and {xm(N['tornado'][0]['lc_bull'])}. The right "
                          "price is where both work, and only owner interviews can find it.")]

# ---- COGS
story += tab_head(5, "COGS_Build", "the cost of the ingredients, per student",
                  "COGS means <i>cost of goods sold</i>. For a software company it is what it costs to serve each customer: the "
                  "AI that writes parent reports, WhatsApp messages, servers, and the paperwork for protecting children's data.")
story += [tbl([["Cost line", "How it is worked out", "₹ per student per month"],
               ["AI parent reports", f"{num(AB('ReportsPerStudentMonth'), 0)} reports × (≈{indian(AB('TokensInPerReport'))} + "
                f"{indian(AB('TokensOutPerReport'))} tokens) at small-model prices", inr(CO['llm'], 2)],
               ["WhatsApp messages", f"{num(AB('WAMsgsPerStudentMonth'), 0)} messages × {inr(AB('WAPricePerMsg'), 4)}",
                inr(CO['whatsapp'], 2)],
               ["Servers and storage", "per-student share of compute, storage, backups", inr(CO['compute'], 2)],
               ["Consent verification", f"{inr(AB('ConsentCostPerStudentYear'), 2)} a year ÷ 12", inr(CO['consent'], 3)],
               ["<b>Variable total</b>", "", f"<b>{inr(CO['variable'], 2)}</b>"],
               ["Fixed share", f"(servers {inr(AB('ServerCostMonth'))} + WhatsApp provider {inr(AB('BSPFeeMonth'))}) ÷ "
                f"{num(AB('InstPerStack'), 0)} institutes + {inr(AB('CompliancePerInstMonth'))} data-protection compliance = "
                f"{inr(CO['fixed'])} a month per institute; at 400 students that adds {inr(CO['fixed'] / 400, 2)}",
                inr(CO['fixed'] / 400, 2)],
               ["<b>All-in at 400 students</b>", "", f"<b>{inr(CO['all_in'], 2)}</b>"]],
              [38, 100, 36], right=(2,)),
          Paragraph("A token is roughly three-quarters of a word; AI providers bill per million tokens.", CAP),
          callout("ps", f"PS Section 3, question <b>A7</b>: <i>“What is your infrastructure + AI cost per student per month?”</i> "
                        f"Section 7 gives a range of ₹3–10. We land at <b>{inr(CO['all_in'], 2)}</b>, inside it."),
          callout("warn", "This models a <i>paid, hosted</i> AI service. Our prototype runs the AI on a laptop at ₹0, so real "
                          "costs could be lower; we chose the cautious route. WhatsApp pricing also changed on 1 October 2026 "
                          "(replies inside the 24-hour window are no longer free) and the model counts every message.")]

# ---- Institute_ROI
story += tab_head(6, "Institute_ROI", "the owner's report card",
                  "This is the tab an institute owner cares about: <i>“if I pay for this, am I better off?”</i> It shows three "
                  "columns (Small, Mid and Large institutes) and walks down five steps.")
story += numbered([
    "<b>What a dropout actually costs.</b> Not the whole annual fee: only what is still unpaid (or refundable) when the "
    "student leaves.",
    "<b>How many we prevent.</b> A funnel that shrinks the PS's flat 25% into something realistic.",
    "<b>Value gained.</b> Fees retained, staff time saved, and extra admissions.",
    "<b>Cost paid.</b> Our fee, GST the owner cannot reclaim, and mentor time spent acting on flags.",
    "<b>Result.</b> ROI, fees-only ROI, and the break-even number of students."])
story += [P("Step 2 is the heart of it. Of every 100 students who would otherwise leave:", H3), funnel_chart(),
          Paragraph("From the PS's 25% to our 6.6%: each bar is what remains after one more real-world filter.", CAP)]
story.append(callout("ex", [tbl([
    ["Line", "Number"],
    ["Students; dropouts a year (10%)", f"400; {num(R_('dropouts'), 0)}"],
    ["Average fee lost per dropout (of a ₹95,000 fee)", inr(R_("fee_lost"))],
    ["Fee lost to dropouts a year, no platform", inr(R_("gross_loss"))],
    [f"Students we keep ({pct(R_('eff_red'))} of {num(R_('dropouts'), 0)})", num(R_("prevented"))],
    ["Fees retained", inr(R_("fees_retained"))],
    [f"+ Staff time saved ({num(AB('StaffHoursSaved'), 0)} hours a month × {inr(AB('StaffHourCost'))} × 12)", inr(R_("staff"))],
    [f"+ Margin on extra admissions ({pct_s(AB('AdmissionUplift'))} × 400 × ₹95,000 × {pct_s(AB('MarginExtraAdmission'))})",
     inr(R_("admissions"))],
    ["<b>= Total value</b>", f"<b>{inr(R_('value'))}</b>"],
    ["Platform fee (seasonal students, minimum fee, discounts)", inr(R_("platform_fee"))],
    ["+ GST not reclaimed + mentor time acting on flags", inr(R_("gst") + R_("mentor"))],
    ["<b>= Total cost</b>", f"<b>{inr(R_('cost'))}</b>"],
    ["<b>ROI, all benefits</b> · <b>fees only</b> · <b>break-even</b>",
     f"<b>{xm(R_('roi'))} · {xm(R_('roi_fees'))} · {num(R_('be_students'))} students</b>"]],
    [118, 46], right=(1,), first_bold=False)],
    "WORKED EXAMPLE · Mid institute (400 students), Base"))
story += [P("Where the value comes from, and what it costs:", H3), value_cost_chart(),
          Paragraph("Amber marks the one soft assumption: extra admissions. Without it, value is about equal to cost.", CAP),
          P("<b>Results by institute size (Base)</b>", H3),
          tbl([["", "Small (under 250)", "Mid (250–800)", "Large (over 800)"],
               ["Students", "180", "400", "1,200"],
               ["ROI, all benefits", xm(R_("roi", "small")), xm(R_("roi")), xm(R_("roi", "large"))],
               ["ROI, fees only", xm(R_("roi_fees", "small")), xm(R_("roi_fees")), xm(R_("roi_fees", "large"))],
               ["Break-even: students to keep per year", num(R_("be_students", "small")), num(R_("be_students")),
                num(R_("be_students", "large"))]],
              [64, 36, 36, 38], right=(1, 2, 3)),
          Spacer(1, 6),
          callout("ps", [
              "This tab rebuilds the PS's own worked example (Section 6) with the same ROI definition, value ÷ cost. The PS "
              "assumed 25% of dropouts prevented and asked: <i>“Will the platform actually prevent 25%… and how would you "
              "prove it?”</i> Two more links:",
              "<b>Section 8 (DPDP Act):</b> the law restricts tracking children, so our recall for under-18s "
              f"({pct_s(AB('Recall_Minor'))}) is lower than for adults ({pct_s(AB('Recall_Adult'))}).",
              "<b>Section 5 (student well-being):</b> flags must lead to <i>supportive</i> actions, so mentor time is counted as "
              "a real cost."]),
          callout("warn", f"Look at the value bar: <b>{pct(R_('admissions') / R_('value'), 0)} of the value is the admissions "
                          "assumption</b>, which has no evidence yet. Set it to 0% and the ROI falls to about 1.0x. We keep it "
                          "because better results and happier parents plausibly bring students, but we show the fees-only "
                          f"{xm(R_('roi_fees'))} beside it. (The {inr(R_('fee_lost'))} lost per dropout looks close to the PS's "
                          "₹36,000 by coincidence: a higher fee but a smaller unpaid share.)")]

# ---- Unit_Econ
story += tab_head(7, "Unit_Econ", "do we get our money back?",
                  "Now we switch sides. This tab follows <b>one institute</b> from the day we pitch it to the day it cancels, "
                  "and asks whether it paid us back. (<i>Unit economics</i> is the profit and loss of a single customer.) It has "
                  "five blocks.")
story += [callout("ex", [
    f"<b>1 · Earn.</b> After seasonality, discounts and {pct_s(AB('BadDebt'))} bad debt, a Mid institute pays us on average "
    f"<b>{inr(U_('rev_m'))}</b> a month. Minus COGS and support ({inr(AB('CSM_CTC'))} for a customer-success person ÷ "
    f"{num(AB('InstPerCSM'), 0)} institutes = {inr(U_('cs'), 2)}), contribution is <b>{inr(U_('contr'))}</b> a month "
    f"({pct(U_('cm'), 0)} margin).",
    f"<b>2 · Win.</b> A rep costs {inr(AB('RepCTC'))} + {inr(AB('RepTravel'))} travel a month and starts "
    f"{num(AB('PilotsPerRepMonth'), 0)} pilots: {inr(U_('sales_pp'))} a pilot. Only {pct_s(AB('PilotConv'))} convert, so "
    f"{inr(U_('sales_pp') / AB('PilotConv'))} of sales cost per paying institute + {inr(AB('MarketingPerPaid'))} marketing = "
    f"<b>CAC {inr(U_('cac'))}</b>. Add pilot setup ({inr(AB('PilotSetupCost'))}), serving the free month "
    f"({inr(U_('pilot_cogs'))}), both ÷ conversion, plus onboarding ({inr(U_('onboard'))}): "
    f"<b>fully loaded {inr(U_('acq'))}</b>.",
    f"<b>3 · Keep.</b> {pct_s(AB('PrepayUptake'))} are prepaid and cannot leave mid-year, so {pct_s(AB('ChurnInSeason'))} churn "
    f"applies to the rest: {pct(U_('churn_eff'))} a month. Add the renewal spike ({pct_s(AB('RenewalSpike'))} do not renew, "
    f"about {pct(U_('spike_m'))} in each of {int(SE['renewal_months'])} renewal months). Annual retention: "
    f"<b>{pct(U_('ret'), 0)}</b>; average paid life {num(U_('life'), 0)} months.",
    f"<b>4 · Add up.</b> Contribution each month × the share still paying × a discount factor, over 60 months: "
    f"<b>LTV {lakh(U_('ltv'))}</b>.",
    f"<b>5 · Compare.</b> LTV ÷ fully loaded cost = <b>{xm(U_('ltv_cac'))}</b>. Payback: <b>{num(U_('payback'), 0)} months</b>."],
    "WORKED EXAMPLE · Mid institute, Base")]
story += [P("The same walk for each institute size (Base):", H3),
          tbl([["", "Small", "Mid", "Large"],
               ["Average monthly contribution", inr(U_("contr", "small")), inr(U_("contr")), inr(U_("contr", "large"))],
               ["Fully loaded acquisition cost", inr(U_("acq", "small")), inr(U_("acq")), inr(U_("acq", "large"))],
               ["Lifetime value (LTV)", inr(U_("ltv", "small")), inr(U_("ltv")), inr(U_("ltv", "large"))],
               ["<b>LTV ÷ acquisition cost</b>", f"<b>{xm(U_('ltv_cac', 'small'))}</b>", f"<b>{xm(U_('ltv_cac'))}</b>",
                f"<b>{xm(U_('ltv_cac', 'large'))}</b>"],
               ["Payback (months)", num(U_("payback", "small"), 0), num(U_("payback"), 0), num(U_("payback", "large"), 0)]],
              [70, 34, 34, 36], right=(1, 2, 3)),
          Spacer(1, 4), seg_chart(),
          Paragraph("LTV ÷ acquisition cost by institute size. Amber is below the 3x rule of thumb.", CAP),
          P(f"<b>Break-even scale.</b> The right-hand side of the tab asks: how many institutes cover our own fixed team cost? "
            f"Our team is {num(AB('Founders'), 0)} founders at {inr(AB('FounderStipend'))} each, {num(AB('Engineers'), 0)} engineer at "
            f"{inr(AB('EngineerCTC'))} and {inr(AB('ToolsOpex'))} of tools, which adds up to {inr(SC['fixed_cost'])} a month. Divided by one Mid institute's "
            f"{inr(SC['mid_contr'])} contribution, that is <b>about {num(SC['institutes_needed'], 0)} institutes</b>. The same "
            "area also holds the PS's naive numbers. The month-by-month engine rows underneath are grouped and collapsed; click "
            "the “+” in the left margin to expand them."),
          callout("ps", "PS Section 6 (platform side): revenue ₹16,000, contribution ₹10,600, payback 3.1 months, LTV/CAC about "
                        "10x. Section 8 names the metrics to know: CAC, payback, gross margin, NRR and LTV/CAC. We compute all "
                        "of them except NRR. Judges ask <i>“what happens to churn after exam season?”</i> (block 3) and "
                        "<i>“what does it cost to onboard a low-tech institute?”</i> (block 2 and the size multipliers)."),
          callout("warn", [
              "<b>LTV is contribution only.</b> It is before the founders' and engineer's salaries, which is why the "
              "break-even-scale block exists.",
              f"<b>Support cost is our softest cost number.</b> {inr(U_('cs'), 0)} per institute per month is far below the PS's "
              f"₹3,000. It rests on one assumption: a customer-success person handling {num(AB('InstPerCSM'), 0)} institutes. "
              f"In Bear (40 institutes, {inr(AB('CSM_CTC', 'bear'))}) it is {inr(AB('CSM_CTC', 'bear') / AB('InstPerCSM', 'bear'))}.",
              f"<b>Small institutes earn only {xm(U_('ltv_cac', 'small'))}.</b> At that level a field rep is not worth sending; "
              "serve them through partners or self-serve."])]

# ---- Scenarios
story += tab_head(8, "Scenarios", "three weather forecasts",
                  "Rather than one answer, this tab shows three side by side: <b>Bear</b> (everything goes wrong at once), "
                  "<b>Base</b> (our best guess) and <b>Bull</b> (everything goes right), plus the PS's naive column for "
                  "contrast. They are always shown together, whatever the Cover switch says.")


def sc_fmt(key, v, ps=False):
    if key in ("eff_red", "ret"):
        return pct(v)
    if key in ("roi", "roi_fees"):
        return xm(v, 2 if ps else None)
    if key == "ltv_cac":
        return xm(v)
    if key in ("prevented", "be_students"):
        return num(v)
    if key == "payback":
        return "not within 60" if v > 60 else num(v)
    return inr(v)


sc_rows = [("eff_red", "Share of dropouts prevented"), ("prevented", "Students kept per year"),
           ("roi", "Institute ROI, all benefits"), ("roi_fees", "Institute ROI, fees only"),
           ("be_students", "Break-even students per year"), ("contr", "Monthly contribution per institute"),
           ("acq", "Fully loaded acquisition cost"), ("ret", "Annual institute retention"), ("ltv", "Lifetime value (LTV)"),
           ("ltv_cac", "LTV ÷ acquisition cost"), ("payback", "Payback (months)")]
story += [tbl([["Mid institute", "PS naive", "Bear", "Base", "Bull"]] +
              [[lab] + [sc_fmt(k, S_(k, c), ps=(c == "guide")) for c in ("guide", "bear", "base", "bull")] for k, lab in sc_rows],
              [62, 28, 28, 28, 28], right=(1, 2, 3, 4)),
          Spacer(1, 6),
          P("By institute size, the owner's ROI and our LTV ÷ acquisition cost:", H3),
          tbl([["", "ROI Bear", "ROI Base", "ROI Bull", "LTV/CAC Bear", "LTV/CAC Base", "LTV/CAC Bull"]] +
              [[nm] + [xm(N["seg"]["roi"][s][c]) for c in ("bear", "base", "bull")] +
               [xm(N["seg"]["ltv_cac"][s][c]) for c in ("bear", "base", "bull")]
               for s, nm in (("small", "Small"), ("mid", "Mid"), ("large", "Large"))],
              [28, 24, 24, 24, 24.7, 24.7, 24.6], right=(1, 2, 3, 4, 5, 6)),
          Spacer(1, 6),
          callout("ps", "PS Section 6: <i>“Build a model with ranges, scenarios and evidence.”</i> Round 2 (Section 9) asks for "
                        "a “detailed financial model (3-year projection, scenarios, sensitivities).”"),
          callout("warn", f"Bear and Bull move all {N_INPUTS} inputs together, which almost never happens in real life. Read "
                          "Bear as a stress test (<i>can we survive everything going wrong?</i>) and Bull as a ceiling, not "
                          f"forecasts. In Bear, contribution is negative ({inr(S_('contr', 'bear'))} a month), a useful warning "
                          "that price, CAC and support cost must be tested early.")]

# ---- Sensitivity
story += tab_head(9, "Sensitivity", "which dial matters most?",
                  "Scenarios move everything together. This tab moves <b>one thing at a time</b> to find the dials that really "
                  "matter. It has a tornado chart and two what-if grids.")
story += [P("Institute ROI: each input moved from its Bear value to its Bull value, everything else at Base", H3),
          tornado("roi", 8, R_("roi"), xm),
          Paragraph("Navy end = input at its Bear value; teal end = input at its Bull value. A long bar means the input "
                    "matters; a short bar means relax.", CAP),
          P("Our LTV ÷ acquisition cost, same method", H3), tornado("lc", 6, U_("ltv_cac"), xm),
          Paragraph("Inputs that only affect the owner's ROI (like the dropout rate) do not move this chart.", CAP)]
t = {r["name"][:12]: r for r in N["tornado"]}
adm = next(r for r in N["tornado"] if r["name"].startswith("Admissions"))
prc = next(r for r in N["tornado"] if r["name"].startswith("List price"))
fee = next(r for r in N["tornado"] if r["name"].startswith("Annual fee"))
rct = next(r for r in N["tornado"] if r["name"].startswith("Dropout reduction"))
pil = next(r for r in N["tornado"] if r["name"].startswith("Pilot-to-paid"))
chn = next(r for r in N["tornado"] if r["name"].startswith("Monthly logo"))
ren = next(r for r in N["tornado"] if r["name"].startswith("Non-renewal"))
story += [P("What the tornado tells us", H3),
          *bullets([
              f"<b>For the owner's ROI</b>, the big three are extra admissions ({xm(adm['roi_bear'])} to {xm(adm['roi_bull'])}), "
              f"list price ({xm(prc['roi_bear'])} at ₹20 to {xm(prc['roi_bull'])} at ₹40) and annual fee "
              f"({xm(fee['roi_bear'])} to {xm(fee['roi_bull'])}).",
              f"<b>For our LTV ÷ CAC</b>, the big ones are list price ({xm(prc['lc_bear'])} to {xm(prc['lc_bull'])}), pilot "
              f"conversion ({xm(pil['lc_bear'])} to {xm(pil['lc_bull'])}) and churn and renewal "
              f"({xm(chn['lc_bear'])} to {xm(chn['lc_bull'])}; {xm(ren['lc_bear'])} to {xm(ren['lc_bull'])}).",
              f"<b>The dropout-prevention effect</b> matters ({xm(rct['roi_bear'])} to {xm(rct['roi_bull'])}), but less than "
              "most people expect."]),
          P("Grid 1: owner's ROI by list price and effective dropout reduction", H3),
          heat_table("Reduction ↓ / price →", N["grid1"]["prices"], [(r["reduction"], r["roi"]) for r in N["grid1"]["rows"]],
                     lambda c: inr(c), lambda r: pct_s(r), xm, good=2.0, mid=1.0),
          Paragraph("Red: under 1x · amber: 1–2x · green: 2x or more. Includes the 1% admissions assumption.", CAP),
          P("Grid 2: our LTV ÷ acquisition cost by monthly churn and acquisition cost", H3),
          heat_table("Cost ↓ / churn →", N["grid2"]["churn"], [(r["acq"], r["ratio"]) for r in N["grid2"]["rows"]],
                     lambda c: pct_s(c), lambda r: inr(r), xm, good=3.0),
          Paragraph("Red: under 3x · green: 3x or more. Even at 1% churn, a ₹75,000 acquisition cost keeps us under 3x.", CAP),
          callout("ps", "PS Section 9 requires <i>“at least one sensitivity analysis”</i> in Round 1, and Section 10 lists "
                        "“sensitivity” under unit economics."),
          callout("warn", "Labels can confuse. For price, <b>Bear (₹20) is bad for us but good for the owner's ROI</b>. Read the "
                          "numbers, not the label.")]

# ---- Checks
story += tab_head(10, "Checks", "the smoke alarm",
                  f"A model can add up correctly and still be wrong in logic. This tab runs <b>{N_ERR} automatic error "
                  f"checks</b> (any failure turns red and the Cover says so) plus <b>{N_WARN} warnings</b>.")
story += [*bullets([
    "<b>Error checks</b> test things that must always be true: the dropout timing adds to 100%; every percentage input "
    "sits between 0% and 100%; each Live value lies between its Bear and Bull values.",
    "<b>Six consistency checks</b> prove the hidden Engine reproduces the visible ROI and LTV for all three institute "
    "sizes, so Scenarios and Sensitivity use exactly the same logic as the main tabs.",
    "<b>One reproduction check</b> confirms our copy of the PS example gives 2.25x, proving we read the guide correctly.",
    "<b>Warnings</b> are honest red flags, not bugs. They fire when the model is telling you something uncomfortable."]),
          tbl([["Warning", "Status now"]] +
              [[c["label"].replace("WARNING: ", "")[:1].upper() + c["label"].replace("WARNING: ", "")[1:],
                f'<font color="{H(RED)}"><b>FIRING</b></font>' if c["flag"] == 1 else "clear"]
               for c in N["checks"] if c["type"] == "Warning"],
              [138, 36], first_bold=False,
              extra=[("TEXTCOLOR", (0, 0), (-1, -1), INK)]),
          Spacer(1, 6),
          callout("ps", "PS Section 10: <i>“Teams that clearly state their assumptions and limitations score higher.”</i> The "
                        "warnings are limitations the model states about itself."),
          callout("warn", "Passing checks means the arithmetic is internally consistent. It does <b>not</b> mean the assumptions "
                          "are true.")]

# ---- Sources
story += tab_head(11, "Sources", "the receipts",
                  "Every input is listed again with where it came from: its type, a confidence level (H, M or L), the source and "
                  "a note. If a judge asks <i>“where did ₹95,000 come from?”</i>, this is the tab you open.")
story += [tbl([["Evidence type", "Inputs", "Meaning"],
               ["Researched", str(TYPES["Researched"]), "found in a named source (a pricing page, a study, a statute)"],
               ["Public", str(TYPES["Public"]), "from a public dataset"],
               ["Guide", str(TYPES["Guide"]), "straight from the PS; kept for comparison"],
               ["Assumption", str(TYPES["Assumption"]), "our own judgement; the number to challenge"],
               ["Structural", str(TYPES["Structural"]), "a modelling convention, such as the discount rate"]],
              [34, 20, 120]),
          Spacer(1, 6),
          P("The raw research behind the “Researched” inputs is saved in the <font name=\"%s\">research</font> folder: R1 "
            "competitor prices, R6 unit costs (WhatsApp, AI, GST, payments, cloud), R2 fees and refund rules, R3 dropout evidence, "
            "R4 trials on early warning and outreach, R5 software-business benchmarks and salaries." % MONO),
          callout("ps", "PS Section 8: <i>“Always cite what you use.”</i> Rule 3 (Section 11) asks for citations for public data and "
                        "Rule 4 asks for evidence behind any changed assumption."),
          callout("warn", "Some sources are weak (blogs and aggregator pages) and are marked confidence L. The dropout rate rests "
                          "on a single trade-body quote (“at least 10%”). We show this rather than hide it.")]

# ---- Engine + files
story += tab_head(12, "Engine", "the hidden backstage",
                  f"There is one more tab, hidden on purpose. The Engine holds {N['engine_cases']} copies of the whole calculation chain, one for "
                  "each case that Scenarios and Sensitivity need: three institute sizes under Bear, Base and Bull, every tornado "
                  "bar, and the churn grid. It exists so those tabs work without macros or Excel's Data Table feature, which "
                  "breaks in Google Sheets. The Checks tab proves it agrees with the visible tabs. You never need to touch it.")
story += [P("The files behind the workbook", H3),
          tbl([["File", "What it does"],
               ["assumptions.csv, seasonality.csv", "The source of every input. Edit these for permanent changes."],
               ["build_model.py", "Rebuilds the workbook from the CSVs: python build_model.py"],
               ["verify_model.py", "Recalculates without Excel and prints headline numbers and checks: python verify_model.py --all"],
               ["README.md", "Slide-ready numbers, the deck story and a “do not claim” list"],
               ["research/", "The raw research notes, with links"]],
              [56, 118]),
          Spacer(1, 6),
          callout("plain", "<b>Two ways to change a number.</b> To play, edit a blue cell in Excel. To make it permanent, edit "
                           "the CSV and rebuild; otherwise the workbook and the CSV drift apart.")]

# ================================================================== PART 4
story += part_head(4, "Linking the model to the PS",
                   "The case brief is the exam paper; the model is our answer sheet. Here is where each question is answered, "
                   "how the judges' four challenges are met, which revenue models are in the numbers, and where we "
                   "deliberately departed from the PS's data pack.")
story += [Paragraph("4.1  Which PS question is answered where", H2),
          tbl([["PS ref", "What it asks", "Where we answer"],
               ["A7 · Architecture", "Infrastructure + AI cost per student per month", f"COGS_Build: {inr(CO['all_in'], 2)}, inside "
                "the PS range of ₹3–10"],
               ["A8 · Privacy and safety", "Minors, consent, well-being", "Lower recall for under-18s; consent and compliance "
                "costs in COGS_Build; mentor time as a supportive cost"],
               ["B1 · Customer and value", "Who buys; the measurable ROI for an institute", "Institute_ROI (ROI, break-even); "
                "Pricing (what the owner feels)"],
               ["B2 · Pricing and unit economics", "What we charge; CAC, payback, churn, LTV", "Pricing, COGS_Build, Unit_Econ"],
               ["B3 · Go-to-market", "Which cities and sizes first; direct, partners or product-led",
                f"Unit_Econ by size (Small {xm(U_('ltv_cac', 'small'))}, Mid {xm(U_('ltv_cac'))}, Large "
                f"{xm(U_('ltv_cac', 'large'))}); pilot and CAC build"],
               ["B4 · Competition and moat", "How we beat generic apps; why our edge grows", "Pricing competitor anchor (₹4–21). "
                "The model gives the data moat <b>no credit</b> (no improving accuracy over time), which is deliberately "
                "conservative"],
               ["Section 10 · Judging", "Revenue model and unit economics 20%; Market and GTM 10%",
                "Pricing, Unit_Econ, Sensitivity; segment results and competitor anchor"]],
              [38, 60, 76]),
          Paragraph("4.2  The four questions the PS says judges will ask (Section 6)", H2),
          tbl([["Judge's question", "Our honest answer", "Look at"],
               ["Will owners really pay ₹40 per student?",
                f"We model a ₹{AB('ListPrice'):.0f} list price ({inr(PR['realised'], 2)} realised), above the ₹4–21 competitor "
                f"anchors. It costs the owner about {inr(R_('cost_pp'))} a student a year ({pct(R_('cost_pct'), 1)} of the fee); "
                f"break-even is keeping {num(R_('be_students'))} students a year. <b>Unproven until owner interviews.</b>",
                "Pricing, Sensitivity"],
               ["Will you really prevent 25% of dropouts, and how would you prove it?",
                f"No. We model {pct(R_('eff_red'))}, built from 8 trials in other settings and our detection limits. Proof "
                "would come from a staggered rollout across batches in a pilot.", "Institute_ROI"],
               ["What happens to churn after the exam season?",
                f"{pct_s(AB('RenewalSpike'))} of institutes do not renew at session end; prepaid ones cannot leave mid-year. "
                f"Annual retention is {pct(U_('ret'), 0)}.", "Seasonality, Unit_Econ"],
               ["What does it cost to onboard a low-tech institute?",
                f"{inr(U_('onboard'))} for a Mid institute ({inr(U_('onboard', 'small'))} Small, {inr(U_('onboard', 'large'))} "
                f"Large) after a light {inr(AB('PilotSetupCost'))} retro-pilot; {inr(U_('acq'))} fully loaded. The Bear case "
                f"assumes {inr(AB('OnboardBase', 'bear'))}.", "Assumptions, Unit_Econ"]],
              [46, 96, 32], first_bold=True),
          Paragraph("4.3  The PS's seven revenue models: which are in the numbers", H2),
          tbl([["Model (PS Section 6)", "In our numbers?", "Note"],
               ["Per-student SaaS", "<b>Yes, the core</b>", "List price × active students, with a minimum fee"],
               ["Tiered plans", "Described, not priced", "Only the Pro tier carries revenue"],
               ["Freemium + AI add-ons", "Partly", "Free Starter tier and free pilots are costed; the AI add-on is not priced"],
               ["Outcome-linked pricing", "No", "Attribution disputes make it hard to measure; pilot only"],
               ["Parent subscription (B2B2C)", "No", "Needs the institute's agreement; no evidence yet"],
               ["Marketplace / upsell", "No", "Would distract from the core"],
               ["Aggregated benchmarks", "No", "Strict privacy limits; individual data must never be exposed"]],
              [52, 40, 82]),
          Paragraph("4.4  Where we changed the PS's data pack, and why", H2),
          P("PS Rule 4 (Section 11) says <i>“You may change any assumption if you justify it with evidence.”</i> Here is every "
            "major change, so no one can say we hid it:"),
          tbl([["Item", "PS", "Ours (Base)", "Why"],
               ["Annual fee per student", "₹60,000", inr(AB("Fee_M")), "Local Tier-2 fee pages found in research (confidence low)"],
               ["Price per student per month", "₹40", f"{inr(AB('ListPrice'))} list; {inr(PR['realised'], 2)} realised",
                "Competitor prices are ₹4–21; discounts are real"],
               ["Dropout rate", "12%", pct_s(AB("DropoutRate")), "Trade-body quote: “at least 10%”"],
               ["Dropouts prevented", "25%", pct(R_("eff_red")), "Funnel from 8 trials and detection limits"],
               ["Fee lost per dropout", "₹36,000", inr(R_("fee_lost")), "Unpaid instalments and refunds, by month of leaving"],
               ["Infra + AI per student per month", "₹6", inr(CO["all_in"], 2), "Built bottom-up; inside the PS's ₹3–10"],
               ["Support per institute per month", "₹3,000", inr(U_("cs"), 0), "One CSM per 80 institutes (our softest cost number)"],
               ["CAC + onboarding", "₹25,000 + ₹8,000", f"{inr(U_('cac'))} CAC; {inr(U_('acq'))} fully loaded",
                "Rep cost, pilots that do not convert, onboarding"],
               ["Monthly churn", "3% flat", f"{pct(U_('churn_eff'))} + {pct_s(AB('RenewalSpike'))} at renewal",
                "Prepaid cannot leave mid-year; renewal is the real risk"],
               ["Payback; LTV ÷ CAC", "3.1 months; 10.7x", f"{num(U_('payback'), 0)} months; {xm(U_('ltv_cac'))}",
                "The result of all the above"]],
              [40, 30, 44, 60], first_bold=True)]

# ================================================================== PART 5
story += part_head(5, "Try it yourself in five minutes",
                   "Reading about a model only gets you so far. Open the workbook and follow these steps.")
story += [*numbered([
    "<b>Open the Cover tab.</b> Check that cell C7 says <i>ALL CHECKS PASS</i>.",
    "<b>Flip the switch.</b> Type 1 in cell C6 and watch every headline number change (Bear). Type 3 for Bull, then return to 2.",
    "<b>Change one belief.</b> Go to Assumptions, find a blue Base cell, change it, and look at the Cover again.",
    "<b>Read the tornado.</b> On Sensitivity, find the inputs with the longest bars. Those are the ones worth a conversation "
    "with an owner.",
    "<b>Check the receipts.</b> On Sources, look up any input you doubt."]),
          P("Three experiments to try", H3),
          tbl([["Do this (Assumptions, Base column)", "You should see (Mid institute)"],
               ["Set <i>Extra admissions next session</i> from 1% to 0%",
                f"All-in ROI falls from {xm(R_('roi'))} to about {xm(adm['roi_bear'])}: the soft benefit was carrying it."],
               ["Raise <i>List price</i> from ₹30 to ₹40",
                f"Owner's ROI falls to {xm(prc['roi_bull'])}, but our LTV ÷ CAC rises to {xm(prc['lc_bull'])}."],
               ["Set the Cover switch (C6) to 1 (Bear)",
                f"ROI drops to {xm(S_('roi', 'bear'))} and LTV ÷ CAC turns negative ({xm(S_('ltv_cac', 'bear'))}): every dial at "
                "its worst at once."]],
              [74, 100], first_bold=False),
          Spacer(1, 6),
          P("Before you quote a number on a slide", H3),
          *bullets([
              "Check the Cover says <i>ALL CHECKS PASS</i> and the switch is on 2 (Base).",
              "Label it <b>Model output</b>, never “measured”. State the evidence type of the inputs behind it (Part 3, Assumptions).",
              "Do not claim “we reduce dropouts by X%”. Say: <i>trials in comparable settings show 5–30% among students who get "
              "outreach; we model 15%.</i>",
              "Pair any ROI with the fees-only ROI so no one can say the soft benefits are hiding the truth."])]

# ================================================================== PART 6
story += part_head(6, "Honest limits and what is next",
                   "The PS rewards teams that state their limits before the judges do. Here are ours.")
story += [Paragraph("The weakest numbers", H2),
          tbl([["Input", "Why it is weak", "How we firm it up"],
               [f"List price ({inr(AB('ListPrice'))})", "Willingness to pay is untested; it is above every competitor price found",
                "Owner interviews with a Van Westendorp price survey"],
               [f"Extra admissions ({pct_s(AB('AdmissionUplift'))})", "No evidence; carries about two-thirds of the value",
                "Track next-session admissions in the first pilots"],
               [f"Pilot-to-paid conversion ({pct_s(AB('PilotConv'))})", "Borrowed from software free trials, not assisted pilots",
                "Record the first 20 pilots"],
               ["Dropout rate and timing", "One trade-body quote; the monthly timing is assumed",
                "Ask owners for last session's leavers, by month"],
               [f"Support per institute ({inr(U_('cs'), 0)})", "Rests on 80 institutes per customer-success person",
                "Time-track onboarding in pilots"],
               [f"Upfront share ({pct_s(AB('UpfrontShare'))}) and refund compliance ({pct_s(AB('RefundEnforced'))})",
                "No source found", "Owner interviews"],
               ["Recall and precision", "Placeholders until the tech build measures them", "Replace with metrics.json from the "
                "technical team"],
               [f"GST-registered share ({pct_s(AB('ITCShare'))})", "No data on how many institutes can reclaim GST",
                "Ask in interviews; confirm with a CA"]],
              [52, 70, 52], first_bold=True),
          Paragraph("What is not in the Round 1 model", H2),
          *bullets([
              "A <b>3-year monthly projection</b> with a hiring plan, profit and loss, cash and funding need (Round 2).",
              "<b>Market size</b> (total, serviceable and obtainable market).",
              "<b>Upsell or expansion revenue</b>, so no NRR.",
              "Revenue lines beyond per-student SaaS (see 4.3).",
              "Any benefit from the <b>data moat</b>."]),
          callout("plain", "<b>The honest one-liner.</b> On our own numbers the product roughly pays for itself once it keeps "
                           f"3–4 students a year and wins a little extra admission trade, and a Mid institute earns us about "
                           f"{xm(U_('ltv_cac'))} what it costs to win. That is a promising, <i>unproven</i> business. The next job "
                           "is evidence: owner interviews and a pilot."),
          Paragraph("Next steps", H2),
          *numbered(["Run owner interviews and the price survey; update <font name=\"%s\">assumptions.csv</font>." % MONO,
                     "Rebuild and verify the workbook, then refresh this guide.",
                     "Replace recall, precision and COGS with the technical team's measured values.",
                     "Build the Round 2 sheets: cohorts, hiring plan, 3-year P&amp;L, cash and funding need."])]

# ================================================================== APPENDIX
story += [CondPageBreak(60 * mm), TocMark(0, "Appendix · Cheat sheet and formulas"), Paragraph("APPENDIX", EYEBROW),
          Paragraph("Cheat sheet and formulas in plain words", H1),
          Table([[""]], colWidths=[W], rowHeights=[1.4], style=[("BACKGROUND", (0, 0), (-1, -1), TEAL)]), Spacer(1, 7),
          Paragraph("A · One line per tab", H2),
          tbl([["Tab", "One line", "Look here first"],
               ["Cover", "Headline answer, scenario switch, status light", "Cell C6 (switch) and C7 (checks)"],
               ["Assumptions", "Every input, with Bear / Base / Bull, source and confidence", "The yellow LIVE column"],
               ["Seasonality", "Busy and quiet months; when students leave", "Table A and Table B"],
               ["Pricing", "From list price to price actually collected", "Realised price"],
               ["COGS_Build", "Cost to serve one student per month", "All-in COGS"],
               ["Institute_ROI", "Is it worth it for the owner?", "ROI and break-even rows"],
               ["Unit_Econ", "Do we earn our money back?", "LTV ÷ CAC and payback"],
               ["Scenarios", "Bear, Base, Bull side by side, plus the PS column", "Mid-institute table"],
               ["Sensitivity", "Which input moves the answer most", "The tornado"],
               ["Checks", "Automatic tests and honest warnings", "ERRORS and WARNINGS totals"],
               ["Sources", "Where every input came from", "Type and Confidence columns"],
               ["Engine (hidden)", "Backstage copies feeding Scenarios and Sensitivity", "Nothing: do not edit"]],
              [32, 88, 54]),
          Paragraph("B · The main formulas, in words", H2),
          tbl([["What it works out", "The formula in words", "Mid institute, Base"],
               ["Price actually collected", "list price × (1 − negotiation − prepay uptake × prepay discount)",
                f"{inr(AB('ListPrice'))} × (1 − {pct_s(PR['eff_disc'])}) = {inr(PR['realised'], 2)}"],
               ["Revenue in a month", "the larger of (minimum fee, students × that month's index × list price), × (1 − discount) × "
                "(1 − bad debt)", f"average {inr(U_('rev_m'))} a month over the first year"],
               ["Share of dropouts prevented", "catchable share × recall × follow-up rate × trial effect",
                f"{pct_s(R_('catchable'))} × {pct_s(R_('recall'))} × {pct_s(AB('ActionRate'))} × {pct_s(AB('InterventionSuccess'))} "
                f"= {pct(R_('eff_red'))}"],
               ["Institute ROI", "(fees retained + staff time + admissions margin) ÷ (platform fee + GST not reclaimed + mentor time)",
                f"{inr(R_('value'))} ÷ {inr(R_('cost'))} = {xm(R_('roi'))}"],
               ["Share of institutes still paying", "last month's share × (1 − monthly churn) × (1 − renewal spike if it was a "
                "renewal month)", f"annual retention {pct(U_('ret'), 0)}"],
               ["Lifetime value", "sum over 60 months of: share still paying × contribution × discount factor",
                f"{inr(U_('ltv'))}"],
               ["Payback", "the first month where cumulative discounted contribution ≥ fully loaded acquisition cost",
                f"month {num(U_('payback'), 0)}"],
               ["LTV ÷ CAC", "lifetime value ÷ fully loaded acquisition cost", f"{inr(U_('ltv'))} ÷ {inr(U_('acq'))} = "
                f"{xm(U_('ltv_cac'))}"]],
              [38, 80, 56], first_bold=True),
          Spacer(1, 10),
          Paragraph("This guide explains model version %s and is generated from the workbook by the scripts in the guide folder. "
                    "It describes assumptions and model outputs; it is not financial or legal advice." % VERSION, CAP)]

DOC.multiBuild(finalize(story))
print("wrote", os.path.abspath(OUT))
