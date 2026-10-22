// Native (editable) mock-ups drawn from shapes, filled with synthetic values. Always tagged "Illustrative mock-up" on the slide.
const fs = require("fs");
const path = require("path");
const { T, F } = require("./lib");

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

const TOPICS = ["Kinematics", "Laws of motion", "Work and energy", "Rotation", "Gravity", "Heat", "Electricity", "Optics"];
const BAND_FILL = { nodata: T.greyLight, building: "C9DBF0", steady: "7FA6D6", strong: "1F4A82" };
const BAND_LABEL = { nodata: "Not enough data", building: "Building", steady: "Steady", strong: "Strong" };

function heatmapData(n, m, seed = 7) {
  const r = rng(seed);
  const rows = [];
  for (let i = 0; i < n; i++) {
    const ability = r() * 1.4 - 0.5;
    const row = [];
    for (let j = 0; j < m; j++) {
      let v = ability + (r() - 0.5) * 0.9;
      if (j === 4) v = -0.9 + r() * 0.35; // one topic the whole batch is low on: probably not taught yet
      if (r() < 0.07) { row.push("nodata"); continue; }
      row.push(v < -0.15 ? "building" : v < 0.45 ? "steady" : "strong");
    }
    rows.push(row);
  }
  return rows;
}

function heatmap(kit, slide, x, y, w, h, o = {}) {
  const n = o.n ?? 10, m = o.m ?? 8;
  const labW = o.labW ?? 0.7, headH = o.headH ?? 0.62, fs = o.fs ?? 10;
  const legendH = o.legend === false ? 0 : 0.34;
  const gx = x + labW, gw = w - labW, cw = gw / m, ch = (h - headH - legendH - 0.08) / n;
  const data = heatmapData(n, m, o.seed ?? 7);
  kit.card(slide, x, y, w, h, { fill: T.white });
  for (let j = 0; j < m; j++) {
    kit.text(slide, (o.topics || TOPICS)[j], { x: gx + j * cw, y: y + 0.08, w: cw, h: headH - 0.08, fontSize: fs, color: T.muted, align: "center", valign: "middle" });
  }
  for (let i = 0; i < n; i++) {
    kit.text(slide, "S-" + String(i * 7 + 101), { x: x + 0.1, y: y + headH + i * ch, w: labW - 0.1, h: ch, fontSize: fs, bold: true, valign: "middle" });
    for (let j = 0; j < m; j++) {
      const b = data[i][j];
      kit.rect(slide, gx + j * cw + 0.02, y + headH + i * ch + 0.02, cw - 0.04, ch - 0.04, BAND_FILL[b]);
    }
  }
  if (o.callout) {
    slide.addShape("roundRect", { x: gx + 4 * cw + 0.005, y: y + headH - 0.02, w: cw - 0.01, h: n * ch + 0.04, rectRadius: 0.06, fill: { type: "none" }, line: { color: T.navy, width: 2 } });
  }
  if (legendH) {
    let lx = x + 0.12;
    const ly = y + h - legendH;
    for (const k of ["nodata", "building", "steady", "strong"]) {
      kit.rect(slide, lx, ly + 0.07, 0.2, 0.2, BAND_FILL[k]);
      kit.text(slide, BAND_LABEL[k], { x: lx + 0.28, y: ly, w: 1.5, h: 0.34, fontSize: 11, color: T.muted, valign: "middle" });
      lx += 0.28 + BAND_LABEL[k].length * 0.085 + 0.25;
    }
  }
}

const REASONS = [
  ["S-114", "Absent 6 of the last 10 classes", "Mentor call", "Needs support"],
  ["S-142", "Missed 2 recent tests", "Parent call", "Needs support"],
  ["S-107", "Scores slipped over the last 3 tests", "Remedial session", "Watch"],
  ["S-163", "Mastery slipping in 3 chapters", "Remedial session", "Watch"],
  ["S-128", "Absent 5 days in a row", "Mentor call", "Needs support"],
  ["S-135", "Late second instalment (18+ only)", "Fee-plan talk", "Watch"],
  ["S-171", "Scores below batch pace, 4 weeks", "Mentor call", "Watch"],
  ["S-120", "Blank answers rising in tests", "Counsellor referral", "Watch"],
];

function supportList(kit, slide, x, y, w, h, o = {}) {
  const rows = o.rows ?? 8, fs = o.fs ?? 12;
  const compact = !!o.compact;
  const narrow = w < 4.2;
  const headH = 0.5;
  kit.card(slide, x, y, w, h, { fill: T.white });
  kit.text(slide, [{ text: "Support list", options: { bold: true, color: T.navy } }, { text: compact ? "" : "   Batch JEE-11A, week 20", options: { color: T.muted } }],
    { x: x + 0.2, y: y + 0.06, w: compact ? 1.6 : w - 2.4, h: headH, fontSize: 13, valign: "middle" });
  if (!narrow) kit.pill(slide, "Capped at 8 per week", x + w - 2.05, y + 0.13, { fill: T.tealTint, color: T.navy, size: 10, h: 0.28 });
  const rh = (h - headH - 0.1) / rows;
  const cReason = x + 0.95, cAction = compact ? x + w - 1.95 : x + w - 3.35, cBand = x + w - 1.45;
  for (let i = 0; i < rows; i++) {
    const ry = y + headH + i * rh;
    kit.rect(slide, x + 0.01, ry, w - 0.02, 0.01, T.line);
    const r = REASONS[i];
    kit.text(slide, r[0], { x: x + 0.2, y: ry, w: 0.7, h: rh, fontSize: fs, bold: true, valign: "middle" });
    kit.text(slide, r[1], { x: cReason, y: ry, w: narrow ? w - 1.05 : cAction - cReason - 0.1, h: rh, fontSize: fs, valign: "middle" });
    if (!narrow) kit.pill(slide, r[2], cAction, ry + (rh - 0.28) / 2, { fill: T.tealTint, color: T.navy, size: 10, h: 0.28, w: compact ? 1.75 : 1.8, bold: false });
    const strong = r[3] === "Needs support";
    if (!compact && !narrow) kit.pill(slide, r[3], cBand, ry + (rh - 0.28) / 2, { fill: strong ? T.navy : T.white, line: strong ? undefined : T.navy, color: strong ? T.white : T.navy, size: 10, h: 0.28, w: 1.2 });
  }
}

function phone(kit, slide, x, y, w, h, o = {}) {
  const S = "roundRect";
  slide.addShape(S, { x, y, w, h, rectRadius: 0.28, fill: { color: T.white }, line: { color: T.navy, width: 3 } });
  kit.pill(slide, "", x + w / 2 - 0.3, y + 0.1, { fill: T.navy, w: 0.6, h: 0.1, size: 8 });
  const hx = x + 0.14, hw = w - 0.28;
  kit.rect(slide, hx, y + 0.3, hw, 0.42, T.tealDark);
  kit.text(slide, o.header ?? "AlphaQ", { x: hx + 0.12, y: y + 0.3, w: hw - 0.24, h: 0.42, fontSize: 12, bold: true, color: T.white, valign: "middle" });
  kit.text(slide, o.title, { x: hx + 0.08, y: y + 0.8, w: hw - 0.16, h: 0.42, fontSize: o.tsize ?? 13, bold: true, color: T.navy, fontFace: o.lang === "hi" ? F.hindi : F.head });
  kit.text(slide, o.body, {
    x: hx + 0.08, y: y + 1.26, w: hw - 0.16, h: h - 1.86, fontSize: o.fs ?? 10.5, color: T.ink,
    fontFace: o.lang === "hi" ? F.hindi : F.body, lineSpacingMultiple: 1.05,
  });
  kit.pill(slide, o.footer ?? "Numbers checked against the data", x + 0.2, y + h - 0.5, { fill: T.tealTint, color: T.navy, size: 9, h: 0.26, w: w - 0.4 });
}

function excerpt(text, words) {
  const parts = text.split(/\s+/);
  return parts.length <= words ? text : parts.slice(0, words).join(" ") + " ...";
}

function reportSamples() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "report_samples.json"), "utf-8"));
}

function uploadMock(kit, slide, x, y, w, h, o = {}) {
  kit.card(slide, x, y, w, h, { fill: T.white });
  const fs_ = o.fs ?? 11;
  kit.text(slide, [{ text: "Upload: ", options: { bold: true, color: T.navy } }, { text: "chem_test_12.xlsx", options: { color: T.muted } }],
    { x: x + 0.2, y: y + 0.08, w: w - 0.4, h: 0.4, fontSize: 12, valign: "middle" });
  kit.pill(slide, "Header found in row 3", x + 0.2, y + 0.56, { fill: T.tealTint, color: T.navy, size: 10, h: 0.28 });
  const map = [["Roll No.", "roll_no"], ["नाम / Name", "student_name"], ["Q1 ... Q75", "answers"], ["AB / A / -", "absent"]];
  const ty = y + 1.0, rh = 0.34;
  kit.text(slide, "Your column", { x: x + 0.2, y: ty, w: 1.7, h: 0.3, fontSize: 10, color: T.muted, bold: true });
  kit.text(slide, "We read it as", { x: x + w / 2 + 0.2, y: ty, w: 1.6, h: 0.3, fontSize: 10, color: T.muted, bold: true });
  map.forEach((m, i) => {
    const ry = ty + 0.3 + i * rh;
    kit.text(slide, m[0], { x: x + 0.2, y: ry, w: w / 2 - 0.3, h: rh, fontSize: fs_, valign: "middle", fontFace: /[\u0900-\u097F]/.test(m[0]) ? F.hindi : F.body });
    kit.text(slide, m[1], { x: x + w / 2 + 0.2, y: ry, w: w / 2 - 0.4, h: rh, fontSize: fs_, valign: "middle", bold: true, color: T.tealDark });
  });
  const ey = ty + 0.3 + map.length * rh + 0.12;
  if (o.compact) { kit.pill(slide, "3 rows need a look", x + 0.2, ey, { fill: T.navy, color: T.white, size: 10, h: 0.28 }); return; }
  kit.card(slide, x + 0.2, ey, w - 0.4, h - (ey - y) - 0.2 - 0.4, { fill: T.tint, line: T.line });
  kit.text(slide, "3 rows need a look", { x: x + 0.32, y: ey + 0.05, w: w - 0.64, h: 0.3, fontSize: 11, bold: true, color: T.navy });
  kit.text(slide, "Row 18: roll number repeated\nRow 41: answer not A to D\nRow 57: student not in roster", { x: x + 0.32, y: ey + 0.36, w: w - 0.64, h: h - (ey - y) - 1.0, fontSize: 10.5, color: T.ink });
  kit.pill(slide, "Confirm and save", x + w - 1.85, y + h - 0.5, { fill: T.tealDark, color: T.white, size: 11, h: 0.34, w: 1.65 });
}

// floating range bars: months of data vs predicted percentile band (schematic)
function bandChart(kit, slide, x, y, w, h) {
  kit.card(slide, x, y, w, h, { fill: T.white });
  const months = ["Aug", "Oct", "Dec", "Feb", "Apr"];
  const lows = [52, 58, 63, 68, 72], highs = [94, 91, 88, 85, 83];
  const cx = x + 0.75, cw = w - 1.0, top = y + 0.55, bh = h - 1.35, bottom = top + bh;
  [40, 60, 80, 100].forEach((p) => {
    const gy = bottom - ((p - 40) / 60) * bh;
    kit.rect(slide, cx, gy, cw, 0.01, T.line);
    kit.text(slide, String(p), { x: x + 0.2, y: gy - 0.12, w: 0.45, h: 0.24, fontSize: 11, color: T.muted, align: "right" });
  });
  kit.text(slide, "Predicted percentile range, one student", { x: x + 0.2, y: y + 0.1, w: w - 0.4, h: 0.3, fontSize: 12, bold: true, color: T.navy });
  const step = cw / months.length;
  months.forEach((m, i) => {
    const bx = cx + i * step + step * 0.28, bw = step * 0.44;
    const y1 = bottom - ((highs[i] - 40) / 60) * bh, y2 = bottom - ((lows[i] - 40) / 60) * bh;
    slide.addShape("roundRect", { x: bx, y: y1, w: bw, h: y2 - y1, rectRadius: 0.05, fill: { color: i === 4 ? T.teal : "B9CFE8" }, line: { type: "none" } });
    kit.text(slide, m, { x: cx + i * step, y: bottom + 0.06, w: step, h: 0.26, fontSize: 11, color: T.muted, align: "center" });
  });
  kit.text(slide, "The range narrows as more tests come in", { x: x + 0.2, y: y + h - 0.38, w: w - 0.4, h: 0.28, fontSize: 11, color: T.muted });
}

module.exports = { heatmap, supportList, phone, excerpt, reportSamples, uploadMock, bandChart, BAND_FILL, BAND_LABEL, TOPICS };
