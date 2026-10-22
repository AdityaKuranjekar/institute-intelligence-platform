// Helpers and design tokens for the AlphaQ deck (see slides/DESIGN_SYSTEM.md).
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const Lu = require("react-icons/lu");
const Fa = require("react-icons/fa6");
const Md = require("react-icons/md");

const T = {
  // v4 consulting look: white paper, one blue family, amber only for pending / warnings
  navy: "17325C", ink: "1F2937", muted: "5B6573", teal: "2E6DB4", tealDark: "1F4A82", tealTint: "E3ECF7",
  tint: "F4F7FB", line: "C9D6E8", white: "FFFFFF", amber: "D4A24C", red: "C0392B", green: "1F4A82",
  tealOnDark: "5B8DC9", grey: "9AA6B5", greyLight: "EEF2F7",
  orange: "5B8DC9", orangeD: "1F4A82", orangeT: "EAF1FA", blue: "2E6DB4", blueD: "1F4A82", blueT: "E3ECF7", yellowT: "EAF1FA", redT: "F8DEDA",
};
const ACC = [
  { c: T.tealDark, d: T.tealDark, t: T.tealTint, on: T.white },
  { c: T.teal, d: T.tealDark, t: T.tealTint, on: T.white },
  { c: T.tealDark, d: T.tealDark, t: T.tealTint, on: T.white },
  { c: "5B8DC9", d: T.tealDark, t: T.tealTint, on: T.white },
];
const F = { head: "Calibri", body: "Calibri", hindi: "Nirmala UI" };
const W = 13.333, H = 7.5, X0 = 0.55, CW = 12.233;

// rough text width (inches) for pills and single-line labels; the renderer check catches under-estimates
function tw(text, size, bold = false, caps = false) {
  const em = caps ? 0.6 : bold ? 0.55 : 0.5;
  return text.length * em * size / 72;
}

const iconCache = new Map();
async function iconData(name, color) {
  const key = name + color;
  if (iconCache.has(key)) return iconCache.get(key);
  const Comp = Lu[name] || Fa[name] || Md[name];
  if (!Comp) throw new Error("missing icon " + name);
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: 256 }));
  const png = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  const data = "image/png;base64," + png.toString("base64");
  iconCache.set(key, data);
  return data;
}

function makeKit(pres) {
  const S = pres.ShapeType;
  const kit = {};

  kit.text = (slide, text, o = {}) => {
    slide.addText(text, Object.assign({
      isTextBox: true, fontFace: F.body, fontSize: 14, color: T.ink, margin: 0, valign: "top", align: "left", fit: "none",
    }, o));
  };

  kit.card = (slide, x, y, w, h, o = {}) => {
    slide.addShape(S.roundRect, {
      x, y, w, h, rectRadius: o.r ?? 0.1,
      fill: { color: o.fill ?? T.white },
      line: o.noLine ? { type: "none" } : { color: o.line ?? T.line, width: o.lw ?? 1, dashType: o.dash },
      objectName: o.name,
    });
  };

  kit.rect = (slide, x, y, w, h, fill, o = {}) => {
    slide.addShape(S.rect, { x, y, w, h, fill: { color: fill }, line: o.line ? { color: o.line, width: o.lw ?? 1 } : { type: "none" }, objectName: o.name });
  };

  kit.ellipse = (slide, x, y, w, h, fill, o = {}) => {
    slide.addShape(S.ellipse, { x, y, w, h, fill: { color: fill }, line: o.line ? { color: o.line, width: o.lw ?? 1 } : { type: "none" }, objectName: o.name });
  };

  kit.line = (slide, x1, y1, x2, y2, o = {}) => {
    slide.addShape(S.line, {
      x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
      flipH: x2 < x1 ? true : undefined, flipV: y2 < y1 ? true : undefined,
      line: { color: o.color ?? T.teal, width: o.w ?? 2, endArrowType: o.arrow ? "triangle" : undefined, dashType: o.dash },
    });
  };

  kit.icon = async (slide, name, x, y, size, color = T.teal) => {
    slide.addImage({ data: await iconData(name, color), x, y, w: size, h: size, altText: name.replace(/^Lu/, "") + " icon" });
  };

  kit.iconCircle = async (slide, name, x, y, d, o = {}) => {
    kit.ellipse(slide, x, y, d, d, o.fill ?? T.tealTint);
    const s = d * 0.54;
    await kit.icon(slide, name, x + (d - s) / 2, y + (d - s) / 2, s, o.color ?? T.tealDark);
  };

  // small pill; returns its width
  kit.pill = (slide, text, x, y, o = {}) => {
    const size = o.size ?? 10;
    const h = o.h ?? 0.26;
    const w = o.w ?? (tw(text, size, true, o.caps) + 0.26);
    slide.addShape(S.roundRect, {
      x, y, w, h, rectRadius: h / 2,
      fill: { color: o.fill ?? T.white },
      line: o.fill && !o.line ? { type: "none" } : { color: o.line ?? T.line, width: 1 },
    });
    kit.text(slide, text, { x, y, w, h, fontSize: size, bold: o.bold ?? true, color: o.color ?? T.ink, align: "center", valign: "middle", charSpacing: o.caps ? 1 : 0 });
    return w;
  };

  kit.eyebrow = (slide, text) => {
    kit.pill(slide, text.toUpperCase(), X0, 0.42, { fill: T.tealDark, color: T.white, size: 11, h: 0.3, caps: true });
  };

  // origin / status tags
  const TAGS = {
    public: { label: "PUBLIC DATA", line: T.tealDark, color: T.tealDark },
    synthetic: { label: "SYNTHETIC DATA", line: T.blueD, color: T.blueD },
    model: { label: "MODEL OUTPUT", line: T.muted, color: T.muted },
    mock: { label: "ILLUSTRATIVE MOCK-UP", line: T.muted, color: T.muted },
    ps: { label: "GUIDE BASELINE", line: T.muted, color: T.muted },
    built: { label: "BUILT", fill: T.tealDark, color: T.white },
    designed: { label: "DESIGNED", line: T.tealDark, color: T.tealDark },
    inbuild: { label: "IN BUILD", fill: T.amber, color: T.navy },
    pending: { label: "PENDING", fill: T.amber, color: T.navy },
    notproven: { label: "NOT PROVEN", line: T.red, color: T.red },
    proved: { label: "PROVED", fill: T.tealDark, color: T.white },
  };
  kit.tag = (slide, kind, x, y, o = {}) => {
    const t = TAGS[kind];
    const label = o.label ?? t.label;
    return kit.pill(slide, label, x, y, { fill: t.fill, line: t.line, color: t.color, size: o.size ?? 9, h: o.h ?? 0.24, caps: true, w: o.w });
  };

  kit.kpi = (slide, x, y, w, h, value, label, o = {}) => {
    kit.card(slide, x, y, w, h, { fill: o.fill ?? T.white });
    kit.text(slide, value, { x: x + 0.2, y: y + 0.12, w: w - 0.4, h: 0.7, fontSize: o.vsize ?? 36, bold: true, fontFace: F.head, color: o.vcolor ?? T.navy });
    kit.text(slide, label, { x: x + 0.2, y: y + 0.82, w: w - 0.4, h: h - 0.82 - (o.tag ? 0.34 : 0.1), fontSize: 12, color: T.muted });
    if (o.tag) kit.tag(slide, o.tag, x + 0.2, y + h - 0.34);
  };

  kit.source = (slide, text) => {
    kit.text(slide, text, { x: 0.45, y: kit.srcY ?? 6.96, w: 12.4, h: kit.srcH ?? 0.16, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
  };

  // table from shapes; cols = widths (in), rows = array of arrays of strings or {t, bold, color, fill}
  kit.table = (slide, x, y, cols, header, rows, o = {}) => {
    const rh = o.rowH ?? 0.46, hh = o.headH ?? 0.42, fs = o.size ?? 13;
    let cx = x;
    const total = cols.reduce((a, b) => a + b, 0);
    kit.rect(slide, x, y, total, hh, o.headFill ?? T.tealDark);
    header.forEach((h, i) => {
      const hf = Array.isArray(o.headFills) ? o.headFills[i] : null;
      if (hf) kit.rect(slide, cx, y, cols[i], hh, hf);
      kit.text(slide, h, { x: cx + 0.12, y, w: cols[i] - 0.24, h: hh, fontSize: o.headSize ?? 12, bold: true, color: T.white, valign: "middle" });
      cx += cols[i];
    });
    rows.forEach((r, ri) => {
      const ry = y + hh + ri * rh;
      kit.rect(slide, x, ry, total, rh, ri % 2 === 0 ? T.white : T.tint);
      slide.addShape(S.line, { x, y: ry + rh, w: total, h: 0, line: { color: T.line, width: 0.75 } });
      let c2 = x;
      r.forEach((cell, ci) => {
        const t = typeof cell === "string" ? { t: cell } : cell;
        kit.text(slide, t.t, { x: c2 + 0.12, y: ry, w: cols[ci] - 0.24, h: rh, fontSize: t.size ?? fs, bold: t.bold ?? ci === 0, color: t.color ?? T.ink, valign: "middle", align: t.align ?? "left" });
        c2 += cols[ci];
      });
    });
    return y + hh + rows.length * rh;
  };

  return kit;
}

module.exports = { T, ACC, F, W, H, X0, CW, tw, makeKit };
