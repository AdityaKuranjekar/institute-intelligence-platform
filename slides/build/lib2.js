// v3 components on top of lib.js: varied panel styles, chevron flows, funnel, loop nodes, heat and data tables, badges.
const path = require("path");
const { T, ACC, F, X0 } = require("./lib");

const C2 = { band: "E3EEFB", gold: "FFF0BF", goldD: "F2C94C", green: "D3F0DF", greenD: "0E7C4F", blue: "2F80D1", soft: "F1F7F3", orange: "FFE3C7" };

function extend(kit, pres) {
  const S = pres.ShapeType;
  let counter = 0, style = "tab";

  // set the default panel style for the slide being built and restart the colour cycle
  kit.panels = (st, start = 0) => { style = st; counter = start; };
  kit.acc = (i) => ACC[((i % ACC.length) + ACC.length) % ACC.length];

  // panel with a title; style: tab | tint | ring | dash | left | plain
  kit.frame = (slide, x, y, w, h, title, o = {}) => {
    const a = kit.acc(o.acc ?? counter++);
    const st = o.style ?? style;
    const tsize = o.tsize ?? 12;
    if (st === "dash") {
      slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.06, fill: { color: o.fill ?? T.white }, line: { color: a.c, width: 1.25, dashType: "dash" } });
      if (title) kit.text(slide, title, { x: x + 0.1, y: y + 0.05, w: w - 0.2, h: 0.3, fontSize: tsize, bold: true, color: a.d, align: "center", valign: "middle", charSpacing: 1 });
    } else if (st === "tint") {
      slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.14, fill: { color: o.fill ?? a.t }, line: { type: "none" } });
      if (title) {
        kit.ellipse(slide, x + 0.16, y + 0.115, 0.14, 0.14, a.c);
        kit.text(slide, title, { x: x + 0.38, y: y + 0.05, w: w - 0.5, h: 0.26, fontSize: tsize, bold: true, color: a.d, valign: "middle", charSpacing: 0.5 });
      }
    } else if (st === "ring") {
      slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.18, fill: { color: o.fill ?? T.white }, line: { color: a.c, width: 2.25 } });
      if (title) {
        const pw = Math.min(w - 0.5, title.length * 0.095 * tsize / 12 + 0.5);
        slide.addShape(S.roundRect, { x: x + (w - pw) / 2, y: y - 0.01, w: pw, h: 0.3, rectRadius: 0.15, fill: { color: a.c }, line: { color: T.white, width: 2 } });
        kit.text(slide, title, { x: x + (w - pw) / 2, y: y - 0.01, w: pw, h: 0.3, fontSize: tsize - 0.5, bold: true, color: a.on, align: "center", valign: "middle", charSpacing: 0.5 });
      }
    } else if (st === "left") {
      slide.addShape(S.rect, { x, y, w, h, fill: { color: o.fill ?? T.white }, line: { color: T.line, width: 1 } });
      kit.rect(slide, x, y, 0.1, h, a.c);
      if (title) kit.text(slide, title, { x: x + 0.25, y: y + 0.05, w: w - 0.35, h: 0.28, fontSize: tsize + 0.5, bold: true, color: T.navy, valign: "middle" });
    } else if (st === "plain") {
      slide.addShape(S.rect, { x, y, w, h, fill: { color: o.fill ?? T.white }, line: { color: T.line, width: 1 } });
      if (title) kit.text(slide, title, { x: x + 0.15, y: y + 0.05, w: w - 0.3, h: 0.28, fontSize: tsize, bold: true, color: a.d, valign: "middle" });
    } else { // tab
      slide.addShape(S.rect, { x, y, w, h, fill: { color: o.fill ?? T.white }, line: { color: a.c, width: 1.25 } });
      if (title) {
        kit.rect(slide, x, y, w, 0.33, a.c);
        kit.text(slide, title, { x: x + 0.12, y, w: w - 0.24, h: 0.33, fontSize: tsize - 0.5, bold: true, color: a.on, valign: "middle", charSpacing: 0.5 });
      }
    }
  };

  kit.hdrBar = (slide, x, y, w, text, o = {}) => {
    kit.rect(slide, x, y, w, o.h ?? 0.3, o.fill ?? T.tealDark);
    kit.text(slide, text, { x: x + 0.08, y, w: w - 0.16, h: o.h ?? 0.3, fontSize: o.size ?? 11.5, bold: true, color: o.color ?? T.white, align: o.align ?? "center", valign: "middle" });
  };

  kit.labelBar = (slide, x, y, w, text, o = {}) => {
    slide.addShape(S.roundRect, { x, y, w, h: o.h ?? 0.32, rectRadius: (o.h ?? 0.32) / 2, fill: { color: o.fill ?? T.tealDark }, line: { type: "none" } });
    kit.text(slide, text, { x: x + 0.15, y, w: w - 0.3, h: o.h ?? 0.32, fontSize: o.size ?? 12, bold: true, color: o.color ?? T.white, align: "center", valign: "middle" });
  };

  kit.callout = (slide, n, x, y, d = 0.3) => {
    kit.ellipse(slide, x, y, d, d, T.orange, { line: T.white, lw: 1.5 });
    kit.text(slide, String(n), { x, y, w: d, h: d, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
  };

  // rows: array of arrays; each cell string or {t,bold,color,align,fill}; rowStyles[i] in {gold, green, band, white, tint}
  kit.dtable = (slide, x, y, cols, header, rows, o = {}) => {
    const fs = o.size ?? 10.5, rh = o.rowH ?? 0.3, hh = o.headH ?? 0.3;
    let cx = x;
    if (header) {
      header.forEach((h, i) => {
        const hf = (o.headFills && o.headFills[i]) || o.headFill || T.tealDark;
        kit.rect(slide, cx, y, cols[i], hh, hf);
        kit.text(slide, h, { x: cx + 0.05, y, w: cols[i] - 0.1, h: hh, fontSize: o.headSize ?? fs, bold: true, color: hf === T.amber ? T.navy : T.white, align: (i === 0 || (o.leftCols || []).includes(i)) ? "left" : "center", valign: "middle" });
        cx += cols[i];
      });
    }
    const fills = { gold: C2.gold, green: C2.green, band: o.band ?? "F1F7F3", white: T.white, tint: T.tint, orange: C2.orange, blue: C2.band };
    const total = cols.reduce((a, b) => a + b, 0);
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
      slide.addShape(S.line, { x, y: ry + rh, w: total, h: 0, line: { color: "E3E8E4", width: 0.5 } });
    });
    return y + (header ? hh : 0) + rows.length * rh;
  };

  // heat table: values matrix, colour scale low -> high (pale green -> green -> deep green)
  kit.heat = (slide, x, y, cw, rh, colLabels, rowLabels, vals, o = {}) => {
    const lo = o.min ?? Math.min(...vals.flat()), hi = o.max ?? Math.max(...vals.flat());
    const lab = o.labW ?? 0.62;
    const mix = (t) => {
      const a = [240, 248, 242], b = [31, 169, 113], c = [10, 90, 56];
      const f = t < 0.55 ? [a, b, t / 0.55] : [b, c, (t - 0.55) / 0.45];
      const h = (i) => Math.round(f[0][i] + (f[1][i] - f[0][i]) * f[2]).toString(16).padStart(2, "0");
      return (h(0) + h(1) + h(2)).toUpperCase();
    };
    colLabels.forEach((c, j) => kit.text(slide, c, { x: x + lab + j * cw, y, w: cw, h: 0.26, fontSize: o.size ?? 10, bold: true, color: T.muted, align: "center", valign: "middle" }));
    rowLabels.forEach((r, i) => {
      kit.text(slide, r, { x, y: y + 0.27 + i * rh, w: lab, h: rh, fontSize: o.size ?? 10, bold: true, color: T.muted, align: "left", valign: "middle" });
      vals[i].forEach((v, j) => {
        const t = (v - lo) / (hi - lo || 1);
        kit.rect(slide, x + lab + j * cw + 0.015, y + 0.27 + i * rh + 0.015, cw - 0.03, rh - 0.03, mix(t));
        kit.text(slide, o.fmt ? o.fmt(v) : v.toFixed(1), { x: x + lab + j * cw, y: y + 0.27 + i * rh, w: cw, h: rh, fontSize: o.size ?? 10, bold: !!(o.hot && o.hot(i, j)), color: t > 0.45 ? T.white : T.navy, align: "center", valign: "middle" });
      });
    });
    return y + 0.27 + rowLabels.length * rh;
  };

  // icon in a coloured circle (accent colour by index)
  kit.badge = async (slide, name, x, y, d, fill, color = T.white) => {
    kit.ellipse(slide, x, y, d, d, fill);
    await kit.icon(slide, name, x + d * 0.22, y + d * 0.22, d * 0.56, color);
  };
  kit.abadge = async (slide, name, x, y, d, i) => {
    const a = kit.acc(i);
    kit.ellipse(slide, x, y, d, d, a.c);
    await kit.icon(slide, name, x + d * 0.22, y + d * 0.22, d * 0.56, a.on);
  };

  // bullet lines
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

  // horizontal chevron flow: items [{t, sub}], first is a pentagon; each takes an accent colour. Returns nothing.
  kit.chevrow = (slide, x, y, w, h, items, o = {}) => {
    const n = items.length, d = o.depth ?? Math.min(0.32, h * 0.38), ov = d * 0.82;
    const cw = (w + ov * (n - 1)) / n;
    items.forEach((it, i) => {
      const a = kit.acc(o.start ?? i + (o.shift ?? 0));
      const cx = x + i * (cw - ov);
      slide.addShape(i === 0 ? S.homePlate : S.chevron, { x: cx, y, w: cw, h, fill: { color: it.fill ?? a.c }, line: { color: T.white, width: 2 }, rectRadius: 0 });
      const tx = cx + (i === 0 ? 0.14 : d + 0.04), tw_ = cw - (i === 0 ? 0.14 : d + 0.04) - d - 0.02;
      const col = (it.fill ?? a.c) === T.amber ? T.navy : T.white;
      if (it.sub) kit.text(slide, [{ text: it.t, options: { bold: true, fontSize: o.size ?? 12, breakLine: true } }, { text: it.sub, options: { fontSize: (o.size ?? 12) - 2.5 } }], { x: tx, y, w: tw_, h, color: col, valign: "middle", align: "center" });
      else kit.text(slide, it.t, { x: tx, y, w: tw_, h, fontSize: o.size ?? 12, bold: true, color: col, valign: "middle", align: "center" });
    });
  };

  // stacked trapezoid funnel (wide at the top). stages [{t, sub}], width of the top tier = w. Continuous slopes.
  kit.funnel = (slide, x, y, w, tierH, stages, o = {}) => {
    const inset = 0.25 * Math.min(tierH, w); // OOXML trapezoid default adjustment
    stages.forEach((st, i) => {
      const tw_ = w - 2 * inset * i;
      const a = kit.acc((o.start ?? 0) + i);
      const ty = y + i * (tierH + (o.gap ?? 0.04));
      slide.addShape(S.trapezoid, { x: x + (w - tw_) / 2, y: ty, w: tw_, h: tierH, flipV: true, fill: { color: a.c }, line: { color: T.white, width: 1.5 } });
      const col = a.c === T.amber ? T.navy : T.white;
      const inner = tw_ - 2 * inset - 0.1;
      kit.text(slide, [{ text: st.t, options: { bold: true, fontSize: o.size ?? 12.5, breakLine: true } }, { text: st.sub, options: { fontSize: (o.size ?? 12.5) - 3 } }], { x: x + (w - inner) / 2, y: ty + 0.03, w: inner, h: tierH - 0.06, color: col, valign: "middle", align: "center" });
    });
  };

  // loop of circular nodes joined by arrows: nodes [{icon, t, sub}], drawn left to right with a return arrow underneath
  kit.loop = async (slide, x, y, w, nodes, o = {}) => {
    const n = nodes.length, d = o.d ?? 0.85, gap = (w - d * n) / (n - 1);
    for (let i = 0; i < n; i++) {
      const cx = x + i * (d + gap), a = kit.acc(i);
      kit.ellipse(slide, cx - 0.06, y - 0.06, d + 0.12, d + 0.12, a.t);
      kit.ellipse(slide, cx, y, d, d, a.c);
      await kit.icon(slide, nodes[i].icon, cx + d * 0.25, y + d * 0.25, d * 0.5, a.on);
      kit.text(slide, nodes[i].t, { x: cx - gap / 2 + 0.05, y: y + d + 0.1, w: d + gap - 0.1, h: 0.3, fontSize: o.size ?? 11.5, bold: true, color: T.navy, align: "center" });
      if (nodes[i].sub) kit.text(slide, nodes[i].sub, { x: cx - gap / 2 + 0.05, y: y + d + 0.4, w: d + gap - 0.1, h: o.subH ?? 0.7, fontSize: (o.size ?? 11.5) - 2, color: T.muted, align: "center" });
      if (i < n - 1) kit.line(slide, cx + d + 0.1, y + d / 2, cx + d + gap - 0.1, y + d / 2, { color: a.c, w: 2.5, arrow: true });
    }
    if (o.back) {
      const by = y - 0.3;
      kit.line(slide, x + d / 2, y - 0.08, x + d / 2, by, { color: T.grey, w: 1.5 });
      kit.line(slide, x + d / 2, by, x + w - d / 2, by, { color: T.grey, w: 1.5, dash: "dash" });
      kit.line(slide, x + w - d / 2, by, x + w - d / 2, y - 0.1, { color: T.grey, w: 1.5, arrow: true });
      kit.text(slide, o.back, { x: x + d, y: by - 0.28, w: w - 2 * d, h: 0.26, fontSize: 10.5, bold: true, color: T.muted, align: "center", valign: "middle" });
    }
  };

  return kit;
}

module.exports = { extend, C2 };
