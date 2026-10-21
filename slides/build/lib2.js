// Dense consultant-style components (frames, header bars, heat tables, callouts) on top of lib.js.
const path = require("path");
const { T, F, X0 } = require("./lib");

const FRAME_LINE = "6FA9AB";
const C2 = { band: "DCEEF3", gold: "F6E3A8", goldD: "E6C36A", green: "BDECCB", greenD: "1B7F4F", blue: "1F5FA8", soft: "EAF3F7" };

function extend(kit, pres) {
  const S = pres.ShapeType;

  // dashed frame with a centred caps title (reference "manual" style)
  kit.frame = (slide, x, y, w, h, title, o = {}) => {
    slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.06, fill: { color: o.fill ?? T.white }, line: { color: o.line ?? FRAME_LINE, width: 1.25, dashType: "dash" } });
    if (title) kit.text(slide, title, { x: x + 0.1, y: y + 0.05, w: w - 0.2, h: 0.3, fontSize: o.tsize ?? 12.5, bold: true, color: o.tcolor ?? T.navy, align: "center", valign: "middle", charSpacing: 1 });
  };

  kit.hdrBar = (slide, x, y, w, text, o = {}) => {
    kit.rect(slide, x, y, w, o.h ?? 0.3, o.fill ?? T.navy);
    kit.text(slide, text, { x: x + 0.08, y, w: w - 0.16, h: o.h ?? 0.3, fontSize: o.size ?? 11.5, bold: true, color: T.white, align: o.align ?? "center", valign: "middle" });
  };

  kit.labelBar = (slide, x, y, w, text, o = {}) => {
    kit.rect(slide, x, y, w, o.h ?? 0.32, o.fill ?? T.tealDark);
    kit.text(slide, text, { x: x + 0.08, y, w: w - 0.16, h: o.h ?? 0.32, fontSize: o.size ?? 12, bold: true, color: T.white, align: "center", valign: "middle" });
  };

  kit.callout = (slide, n, x, y, d = 0.3) => {
    kit.ellipse(slide, x, y, d, d, T.navy, { line: T.white, lw: 1.5 });
    kit.text(slide, String(n), { x, y, w: d, h: d, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
  };

  // rows: array of arrays; each cell string or {t,bold,color,align,fill}; rowStyles[i] in {gold, green, band, white, tint}
  kit.dtable = (slide, x, y, cols, header, rows, o = {}) => {
    const fs = o.size ?? 10.5, rh = o.rowH ?? 0.3, hh = o.headH ?? 0.3;
    const total = cols.reduce((a, b) => a + b, 0);
    let cx = x;
    if (header) {
      header.forEach((h, i) => {
        kit.rect(slide, cx, y, cols[i], hh, (o.headFills && o.headFills[i]) || o.headFill || T.navy);
        kit.text(slide, h, { x: cx + 0.05, y, w: cols[i] - 0.1, h: hh, fontSize: o.headSize ?? fs, bold: true, color: T.white, align: (i === 0 || (o.leftCols || []).includes(i)) ? "left" : "center", valign: "middle" });
        cx += cols[i];
      });
    }
    const fills = { gold: C2.gold, green: C2.green, band: C2.band, white: T.white, tint: T.tint };
    rows.forEach((r, ri) => {
      const ry = y + (header ? hh : 0) + ri * rh;
      const st = (o.rowStyles && o.rowStyles[ri]) || (ri % 2 === 0 ? "band" : "white");
      let c2 = x;
      r.forEach((cell, ci) => {
        const t = typeof cell === "string" ? { t: cell } : cell;
        kit.rect(slide, c2, ry, cols[ci], rh, t.fill ?? fills[st]);
        kit.text(slide, t.t, { x: c2 + 0.05, y: ry, w: cols[ci] - 0.1, h: rh, fontSize: t.size ?? fs, bold: t.bold ?? (ci === 0 || st === "gold" || st === "green"), color: t.color ?? T.ink, align: t.align ?? ((ci === 0 || (o.leftCols || []).includes(ci)) ? "left" : "center"), valign: "middle" });
        c2 += cols[ci];
      });
    });
    return y + (header ? hh : 0) + rows.length * rh;
  };

  // heat table: values matrix, colour scale low->high; returns bottom y
  kit.heat = (slide, x, y, cw, rh, colLabels, rowLabels, vals, o = {}) => {
    const lo = o.min ?? Math.min(...vals.flat()), hi = o.max ?? Math.max(...vals.flat());
    const lab = o.labW ?? 0.62;
    const mix = (t) => { // light -> teal -> navy
      const a = [233, 244, 246], b = [15, 139, 141], c = [11, 37, 69];
      const f = t < 0.55 ? [a, b, t / 0.55] : [b, c, (t - 0.55) / 0.45];
      const h = (i) => Math.round(f[0][i] + (f[1][i] - f[0][i]) * f[2]).toString(16).padStart(2, "0");
      return (h(0) + h(1) + h(2)).toUpperCase();
    };
    colLabels.forEach((c, j) => kit.text(slide, c, { x: x + lab + j * cw, y, w: cw, h: 0.26, fontSize: o.size ?? 10, bold: true, color: T.muted, align: "center", valign: "middle" }));
    rowLabels.forEach((r, i) => {
      kit.text(slide, r, { x, y: y + 0.27 + i * rh, w: lab, h: rh, fontSize: o.size ?? 10, bold: true, color: T.muted, align: "left", valign: "middle" });
      vals[i].forEach((v, j) => {
        const t = (v - lo) / (hi - lo || 1);
        const fill = mix(t);
        const dark = t > 0.5;
        kit.rect(slide, x + lab + j * cw + 0.015, y + 0.27 + i * rh + 0.015, cw - 0.03, rh - 0.03, fill);
        kit.text(slide, o.fmt ? o.fmt(v) : v.toFixed(1), { x: x + lab + j * cw, y: y + 0.27 + i * rh, w: cw, h: rh, fontSize: o.size ?? 10, bold: !!(o.hot && o.hot(i, j)), color: dark ? T.white : T.navy, align: "center", valign: "middle" });
      });
    });
    return y + 0.27 + rowLabels.length * rh;
  };

  // icon in a coloured circle with white border (Flaticon-like flat look)
  kit.badge = async (slide, name, x, y, d, fill, color = T.white) => {
    kit.ellipse(slide, x, y, d, d, fill);
    await kit.icon(slide, name, x + d * 0.22, y + d * 0.22, d * 0.56, color);
  };

  // bullet lines with small check/arrow icons drawn as text runs
  kit.lines = (slide, items, x, y, w, h, o = {}) => {
    const runs = items.map((t, k) => ({ text: typeof t === "string" ? t : t.t, options: Object.assign({ breakLine: k < items.length - 1, paraSpaceAfter: o.gap ?? 3, bullet: o.bullet === false ? false : { indent: 12 } }, typeof t === "string" ? {} : t.o) }));
    kit.text(slide, runs, { x, y, w, h, fontSize: o.size ?? 11, color: o.color ?? T.ink, valign: "top" });
  };

  kit.rubric = (slide, text) => {
    kit.text(slide, text.toUpperCase(), { x: 8.3, y: 0.2, w: 4.58, h: 0.24, fontSize: 9.5, bold: true, color: T.muted, align: "right", charSpacing: 1.5 });
  };

  kit.pic = (slide, file, x, y, w, h, alt) => {
    slide.addImage({ path: path.join(__dirname, "..", "assets", file), x, y, w, h, altText: alt });
  };

  return kit;
}

module.exports = { extend, C2 };
