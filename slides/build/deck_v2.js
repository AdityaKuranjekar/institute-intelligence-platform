// Builds slides/AlphaQ_CaseB_Round1.pptx (light multi-colour style v3). Run: node deck.js  (from slides/build)
// Needs slides/assets/*.png from: python export_html.py && python charts.py
const pptxgen = require("pptxgenjs");
const path = require("path");
const { T, ACC, F, W, H, makeKit } = require("./lib");
const { extend, C2 } = require("./lib2");
const M = require("./mocks");

const OUT = path.join(__dirname, "..", "AlphaQ_CaseB_Round1_v2.pptx");
const L = 0.45, CWD = 12.433, R = L + CWD;

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "AlphaQ: Case B, The Data Moat (Round 1, version 2)";
  pres.author = "AlphaQ";
  pres.company = "AlphaQ";
  pres.theme = { headFontFace: F.head, bodyFontFace: F.body };
  const kit = extend(makeKit(pres), pres);
  const { text, rect, ellipse, line, icon, pill, tag, source, frame, hdrBar, labelBar, callout, dtable, heat, badge, abadge, lines, rubric, pic, chevrow, funnel, loop } = kit;
  let nb = 0;

  // ---- v2 chrome: breadcrumb tracker on top, heading + plain-English subtitle, source footer bottom-left, page box bottom-right
  kit.srcY = 7.1; kit.srcH = 0.28;
  const titleBox = { name: "title", type: "title", x: L, y: 0.38, w: 12.0, h: 0.42, fontFace: F.head, fontSize: 22, bold: true, color: T.tealDark, valign: "middle", margin: 0 };
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { rect: { x: 12.3, y: 7.12, w: 0.58, h: 0.3, fill: { color: T.tealDark } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.12, w: 0.58, h: 0.3, fontFace: F.body, fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" },
  });
  pres.defineSlideMaster({ title: "FULL", background: { color: T.white }, objects: [] });
  pres.defineSlideMaster({
    title: "CLOSING", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
      { placeholder: { options: Object.assign({}, titleBox, { y: 0.3, h: 0.6, fontSize: 28 }), text: "" } },
    ],
  });
  pres.defineSlideMaster({ title: "TITLE", background: { color: T.white }, objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.1, fill: { color: T.tealDark } } },
    { placeholder: { options: { name: "title", type: "title", x: L, y: 1.15, w: 6.2, h: 1.2, fontFace: F.head, fontSize: 60, bold: true, color: T.tealDark, valign: "middle", margin: 0 }, text: "" } }] });

  const CRUMBS = ["Summary", "Problem", "Product", "Technology", "Trust", "Business", "The Ask", "Appendix"];
  const crumb = (s, active) => {
    let x = L;
    CRUMBS.forEach((c, i) => {
      const w = c.length * 0.085 + 0.36, on = i === active;
      if (on) s.addShape("roundRect", { x, y: 0.1, w, h: 0.25, rectRadius: 0.12, fill: { color: T.tealDark }, line: { type: "none" } });
      text(s, c.toUpperCase(), { x, y: 0.1, w, h: 0.25, fontSize: 8, bold: true, color: on ? T.white : T.muted, align: "center", valign: "middle", charSpacing: 0.8 });
      x += w;
      if (i < CRUMBS.length - 1) { text(s, "›", { x, y: 0.1, w: 0.2, h: 0.25, fontSize: 11, color: T.grey, align: "center", valign: "middle" }); x += 0.2; }
    });
  };
  // content(section, subtitle, rubric, [HEADING, crumb index]); the rubric goes to the speaker notes
  const content = (section, title, rub, head) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    rect(s, 0, 0, 13.333, 0.06, T.tealDark);
    crumb(s, head[1]);
    s.addText(head[0], { placeholder: "title" });
    const sub = title.replace(/^Appendix \d+: /, "");
    text(s, sub.charAt(0).toUpperCase() + sub.slice(1), { x: L, y: 0.8, w: CWD, h: 0.3, fontSize: 14, color: T.muted, valign: "middle" });
    rect(s, L, 1.14, CWD, 0.025, T.tealDark);
    s.addNotes("Scoring area: " + rub);
    return s;
  };
  const sec = (s, n, label, x, y, w) => {
    rect(s, x, y, 0.28, 0.28, T.tealDark);
    text(s, String(n), { x, y, w: 0.28, h: 0.28, fontSize: 11.5, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, label, { x: x + 0.36, y, w: w - 0.36, h: 0.28, fontSize: 12, bold: true, color: T.tealDark, valign: "middle", charSpacing: 0.5 });
  };
  const foot = (s, t) => text(s, t, { x: L, y: 7.1, w: 11.6, h: 0.28, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
  // small outlined tile with a dark head: head text, body text
  const tile = (s, x, y, w, h, head, body, o = {}) => {
    s.addShape("rect", { x, y, w, h, fill: { color: o.fill ?? T.white }, line: { color: o.line ?? T.tealDark, width: 1.25 } });
    rect(s, x, y, w, o.hh ?? 0.3, o.hf ?? T.tealDark);
    text(s, head, { x: x + 0.08, y, w: w - 0.16, h: o.hh ?? 0.3, fontSize: o.hs ?? 10.5, bold: true, color: T.white, align: "center", valign: "middle" });
    if (body) text(s, body, { x: x + 0.1, y: y + (o.hh ?? 0.3) + 0.03, w: w - 0.2, h: h - (o.hh ?? 0.3) - 0.06, fontSize: o.bs ?? 10, color: T.ink, align: o.align ?? "center", valign: "middle" });
  };
  const checks = async (s, items, x, y, w, gap, o = {}) => {
    for (let i = 0; i < items.length; i++) {
      await icon(s, o.icon ?? "FaCircleCheck", x, y + i * gap + 0.03, 0.2, o.color ?? T.tealDark);
      text(s, items[i], { x: x + 0.3, y: y + i * gap, w: w - 0.3, h: gap - 0.02, fontSize: o.size ?? 10.5, color: T.ink, valign: "middle" });
    }
  };

  // ================================================================ 1 TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    text(s, "CASE B  ·  NEXTUTE × FINANCE CLUB, IIT PATNA", { x: L, y: 0.55, w: 7, h: 0.3, fontSize: 11.5, bold: true, color: T.teal, charSpacing: 2 });
    s.addText("PRAGATI", { placeholder: "title" });
    text(s, "The Data Moat", { x: L, y: 2.35, w: 6, h: 0.55, fontSize: 30, bold: true, color: T.teal });
    rect(s, L, 3.0, 1.2, 0.05, T.tealDark);
    text(s, "Every student's weak topics, found before the exam.", { x: L, y: 3.2, w: 5.6, h: 0.9, fontSize: 19, color: T.ink });
    text(s, "Team AlphaQ  ·  Round 1", { x: L, y: 4.35, w: 5, h: 0.3, fontSize: 11.5, color: T.muted });
    // abstract connected nodes (left) turning into a structured grid (right)
    let seed = 7; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pts = []; for (let i = 0; i < 17; i++) pts.push([6.55 + rnd() * 2.7, 0.75 + rnd() * 3.5]);
    pts.forEach((p, i) => pts.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 1.15) kit.line(s, p[0], p[1], q[0], q[1], { color: "B9CBE4", w: 0.9 }); }));
    pts.forEach((p, i) => ellipse(s, p[0] - 0.07, p[1] - 0.07, 0.14, 0.14, i % 3 === 0 ? T.orange : T.tealDark));
    ["Excel", "OMR sheets", "WhatsApp"].forEach((t, i) => pill(s, t, 6.5 + i * 0.95, 4.3, { fill: T.tealTint, color: T.navy, size: 9, h: 0.24, bold: false }));
    kit.line(s, 9.45, 2.5, 10.0, 2.5, { color: T.tealDark, w: 3, arrow: true });
    const shades = ["E3ECF7", "C9DBF0", "7FA6D6", "2E6DB4", "1F4A82"];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) rect(s, 10.15 + c * 0.45, 0.9 + r * 0.6, 0.42, 0.56, shades[(r * 2 + c * 3 + (c > 3 ? 1 : 0)) % 5]);
    text(s, "One clear topic map", { x: 10.15, y: 4.3, w: 2.7, h: 0.26, fontSize: 9.5, bold: true, color: T.tealDark, align: "center" });
    // impact ribbon
    const rb = [["0.76", "Prediction accuracy score", "Public data; published rival 0.75"], ["2", "Public datasets, not just ours", "Open University and ASSISTments"], ["₹3.6", "Cost per student per month", "All-in, on one laptop"]];
    const rw = (CWD - 0.3) / 3;
    rb.forEach((r, i) => {
      const x = L + i * (rw + 0.15), y = 5.15;
      rect(s, x, y, 1.6, 1.5, T.tealDark);
      text(s, r[0], { x, y, w: 1.6, h: 1.5, fontSize: r[0].length > 3 ? 30 : 38, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x: x + 1.6, y, w: rw - 1.6, h: 1.5, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
      text(s, r[1], { x: x + 1.75, y: y + 0.28, w: rw - 1.85, h: 0.5, fontSize: 14, bold: true, color: T.navy, valign: "middle" });
      text(s, r[2], { x: x + 1.75, y: y + 0.82, w: rw - 1.85, h: 0.5, fontSize: 10.5, color: T.muted });
    });
    text(s, "IMPACT RIBBON", { x: L, y: 4.88, w: 3, h: 0.24, fontSize: 9, bold: true, color: T.muted, charSpacing: 2 });
    foot(s, "Sources: ml/public_validation (ASSISTments 2009 under the pyKT protocol; OULAD); financial model v1.1, Base case. Screens and graphics are illustrative.");
    s.addNotes("Title. 0.76 is the next-answer AUC on ASSISTments 2009 (published DKT 0.754). Two public datasets: ASSISTments 2009 and OULAD. 3.6 rupees is the all-in cost per student per month from the financial model (Base).");
  }

  // ================================================================ 2 EXECUTIVE SUMMARY
  pres.addSection({ title: "Summary" });
  {
    const s = content("Summary", "Tests become a weekly to-do list for mentors, at a price owners accept", "All criteria", ["EXECUTIVE SUMMARY: THE PRAGATI LOOP", 0]);
    // sidebar
    hdrBar(s, L, 1.3, 3.5, "THE FRICTION & THE FIX", { h: 0.32, size: 11.5 });
    s.addShape("rect", { x: L, y: 1.62, w: 3.5, h: 2.35, fill: { color: "F6EAE8" }, line: { color: "D9A9A2", width: 1 } });
    await icon(s, "FaTriangleExclamation", L + 0.15, 1.75, 0.3, T.red);
    text(s, "THE FRICTION", { x: L + 0.55, y: 1.74, w: 2.8, h: 0.32, fontSize: 11.5, bold: true, color: T.red, valign: "middle" });
    lines(s, ["Marks sit on paper and WhatsApp", "Weak topics found after the exam", "₹17.3 L a year lost to dropouts", "Generic apps give no early warning"], L + 0.18, 2.18, 3.2, 1.75, { size: 10.5, gap: 4 });
    await icon(s, "FaArrowDown", L + 1.6, 4.02, 0.3, T.tealDark);
    s.addShape("rect", { x: L, y: 4.38, w: 3.5, h: 2.5, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 1.25 } });
    await icon(s, "FaCircleCheck", L + 0.15, 4.5, 0.3, T.tealDark);
    text(s, "THE FIX", { x: L + 0.55, y: 4.49, w: 2.8, h: 0.32, fontSize: 11.5, bold: true, color: T.tealDark, valign: "middle" });
    lines(s, ["One upload gives a topic map", "A short weekly list for mentors", "Plain reasons, supportive actions", "Checked Hindi and English parent notes", "Free to run, works offline"], L + 0.18, 4.95, 3.2, 1.9, { size: 10.5, gap: 4 });
    // loop
    const cx = 8.55, cy = 4.1, rx = 2.15, ry = 1.7;
    const st = [["FaCamera", "1 Capture", "Phone photo or Excel becomes clean data", "OMR reader"], ["FaDiagramProject", "2 Structure", "Every question tagged to a syllabus topic", "380-topic map"], ["FaBrain", "3 Estimate", "Knows each student's strengths, topic by topic", "IRT mastery model"],
      ["FaFlag", "4 Flag", "A short weekly list: who needs help, why", "Calibrated risk model"], ["FaHandshake", "5 Act", "Mentors call; every outcome is logged", "Intervention log"], ["FaFileLines", "6 Report", "Checked Hindi and English parent updates", "8-check verifier"]];
    const pos = st.map((_, i) => { const a = (-90 + i * 60) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
    for (let i = 0; i < 6; i++) { const a = pos[i], b = pos[(i + 1) % 6]; const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy); const u = [dx / d, dy / d]; kit.line(s, a[0] + u[0] * 0.5, a[1] + u[1] * 0.5, b[0] - u[0] * 0.5, b[1] - u[1] * 0.5, { color: T.grey, w: 2, arrow: true }); }
    s.addShape("ellipse", { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 1.5 } });
    text(s, "₹3.6", { x: cx - 0.85, y: cy - 0.55, w: 1.7, h: 0.6, fontSize: 28, bold: true, color: T.tealDark, align: "center", valign: "middle" });
    text(s, "per student, per month", { x: cx - 0.8, y: cy + 0.05, w: 1.6, h: 0.5, fontSize: 9.5, color: T.muted, align: "center" });
    for (let i = 0; i < 6; i++) {
      const [x, y] = pos[i];
      s.addShape("ellipse", { x: x - 0.42, y: y - 0.42, w: 0.84, h: 0.84, fill: { color: i % 2 ? T.teal : T.tealDark }, line: { color: T.white, width: 2 } });
      await icon(s, st[i][0], x - 0.2, y - 0.2, 0.4, T.white);
      const right = i === 0 || i === 1 || i === 2, tx = right ? x + 0.55 : x - 2.55, al = right ? "left" : "right";
      const top = i === 0 ? y - 0.52 : i === 3 ? y - 0.3 : y - 0.45;
      const tw = i === 0 ? 2.3 : 2.0;
      text(s, [{ text: st[i][1], options: { bold: true, fontSize: 13, color: T.tealDark, breakLine: true } }, { text: st[i][2], options: { fontSize: 10.5, color: T.ink, breakLine: true } }, { text: st[i][3], options: { fontSize: 8.5, italic: true, color: T.muted } }], { x: i === 0 || i === 3 ? (i === 0 ? x + 0.55 : x - 2.85) : tx, y: top, w: i === 0 || i === 3 ? 2.3 : tw, h: 0.95, align: i === 3 ? "right" : al, valign: "top" });
    }
    foot(s, "Sources: product design; financial model v1.1 (₹3.6 all-in cost, Base); case guide baselines. Technical names appear in grey as proof of rigour.");
    s.addNotes("The loop in plain English with the technical names as secondary labels. Each step statement is eight words or fewer.");
  }

  // ================================================================ 3 PROBLEM
  pres.addSection({ title: "Problem" });
  {
    const s = content("Problem", "Institutes have the marks, but notice a struggling student only after that student has left", "Problem framing", ["THE PROBLEM: LEAKY REVENUE, MESSY DATA", 1]);
    hdrBar(s, L, 1.3, 5.95, "LEAKY REVENUE", { h: 0.3, size: 11.5 });
    [["8–15 %", "of students leave mid-session", T.tealDark], ["₹17.3 L", "fees lost a year, per 400 students", T.red]].forEach((k, i) => {
      const x = L + i * 3.0;
      rect(s, x, 1.6, 2.95, 1.15, k[2]);
      text(s, k[0], { x, y: 1.66, w: 2.95, h: 0.65, fontSize: 32, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 0.1, y: 2.3, w: 2.75, h: 0.4, fontSize: 10.5, color: T.white, align: "center", valign: "middle" });
    });
    sec(s, 1, "WHERE THE DATA LIVES", L, 2.95, 5.9);
    const src = [["FaFileExcel", "Excel files"], ["FaFileLines", "Paper OMR sheets"], ["FaWhatsapp", "WhatsApp groups"]];
    for (let i = 0; i < 3; i++) {
      const x = L + i * 2.0;
      s.addShape("rect", { x, y: 3.3, w: 1.9, h: 0.5, fill: { color: T.greyLight }, line: { color: T.grey, width: 1, dashType: "dash" } });
      await icon(s, src[i][0], x + 0.1, 3.4, 0.3, T.muted);
      text(s, src[i][1], { x: x + 0.5, y: 3.3, w: 1.38, h: 0.5, fontSize: 10.5, bold: true, color: T.muted, valign: "middle" });
    }
    const tiers = [[5.95, "Messy, unconnected data", "No topic view. No early warning.", "9AA6B5"], [4.1, "The bottleneck", "Staff time, no analysis", "5B8DC9"], [2.6, "Pragati", "Clean topic map, weekly list", T.tealDark]];
    tiers.forEach((t, i) => {
      const y = 3.95 + i * 0.7, x = L + (5.95 - t[0]) / 2;
      s.addShape("trapezoid", { x, y, w: t[0], h: 0.64, flipV: true, fill: { color: t[3] }, line: { color: T.white, width: 1.5 } });
      text(s, [{ text: t[1], options: { bold: true, fontSize: 11.5, breakLine: true } }, { text: t[2], options: { fontSize: 9 } }], { x: x + 0.3, y, w: t[0] - 0.6, h: 0.64, color: T.white, align: "center", valign: "middle" });
    });
    rect(s, L, 6.1, 5.95, 0.8, T.tint);
    text(s, [{ text: "Who we serve: ", options: { bold: true, color: T.tealDark } }, { text: "22.8 lakh NEET and about 15.4 lakh JEE Main candidates registered in 2025. 27 % of school students use private coaching." }], { x: L + 0.15, y: 6.1, w: 5.65, h: 0.8, fontSize: 10, color: T.ink, valign: "middle" });
    // friction matrix
    text(s, "THE FRICTION MATRIX", { x: 6.75, y: 1.3, w: 4, h: 0.3, fontSize: 11.5, bold: true, color: T.tealDark, valign: "middle", charSpacing: 1 });
    const fm = [["FaChalkboardUser", "Teachers", ["Check OMR sheets by hand", "See weak topics after exams", "No time for each student"]], ["FaBuilding", "Owners", ["Can't compare batches or teachers", "Learn of dropouts too late", "Generic apps give no insight"]],
      ["FaUsers", "Parents", ["Get a marks list, nothing more", "Can't tell if child improves", "Trust slips, fee questions grow"]], ["FaChildReaching", "Students", ["Struggle quietly for weeks", "Same plan as whole batch", "Noticed only when they stop"]]];
    for (let i = 0; i < 4; i++) {
      const x = 6.75 + (i % 2) * 3.1, y = 1.62 + Math.floor(i / 2) * 2.65;
      s.addShape("rect", { x, y, w: 3.0, h: 2.55, fill: { color: i === 1 || i === 2 ? T.tint : T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, y, 3.0, 0.5, T.tealDark);
      await icon(s, fm[i][0], x + 0.15, y + 0.1, 0.3, T.white);
      text(s, fm[i][1], { x: x + 0.6, y, w: 2.3, h: 0.5, fontSize: 14, bold: true, color: T.white, valign: "middle" });
      lines(s, fm[i][2], x + 0.12, y + 0.68, 2.78, 1.8, { size: 13, gap: 14 });
    }
    foot(s, "Sources: Participant Guide §2, §7 (illustrative baselines: 12 % dropout, ₹36,000 per leaver); NTA NEET UG 2025 result data; JEE Main 2025 statistics (secondary); NSO CMS Education 2025.");
    s.addNotes("The 8-15 percent dropout, 36,000 rupee loss per leaver and 17.3 lakh total are the guide's illustrative baselines (400 x 12 % x 36,000). Market numbers are in financial/research/R7_market_check.md.");
  }

  // ================================================================ 4 REALITY CHECK
  {
    const s = content("Problem", "We tested the guide's headline numbers and built around what survives", "Feasibility and business realism", ["REALITY CHECK: MYTH VS PRAGATI", 1]);
    rect(s, L, 1.3, 5.2, 0.38, "6B7280");
    text(s, "THE INDUSTRY MYTH", { x: L, y: 1.3, w: 5.2, h: 0.38, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1.5 });
    rect(s, 7.25, 1.3, 5.63, 0.38, T.tealDark);
    text(s, "THE PRAGATI REALITY", { x: 7.25, y: 1.3, w: 5.63, h: 0.38, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1.5 });
    const rows = [["FaIndianRupeeSign", "COST", "Owners will happily pay ₹40", "Rivals list ₹4–21 a student; we test ₹30"], ["FaUserMinus", "DROPOUTS", "Saves a quarter of dropouts", "Honest base case: 4 % fewer dropouts, proven in pilots"],
      ["FaChildReaching", "MINORS' DATA", "Track every student's app activity", "Law bans tracking minors; under-18s get academic data only"], ["FaBullseye", "ACCURACY", "Quote the best published score", "Our strict student-level test scores 0.71 against 0.79 published"]];
    for (let i = 0; i < 4; i++) {
      const y = 1.8 + i * 1.02;
      s.addShape("rect", { x: L, y, w: 5.2, h: 0.92, fill: { color: "F1F2F4" }, line: { color: "C5CAD3", width: 1 } });
      await icon(s, "FaCircleXmark", L + 0.15, y + 0.28, 0.36, T.red);
      text(s, rows[i][2], { x: L + 0.7, y, w: 4.4, h: 0.92, fontSize: 14, color: "5B6573", valign: "middle" });
      s.addShape("roundRect", { x: 5.8, y: y + 0.2, w: 1.3, h: 0.52, rectRadius: 0.26, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
      await icon(s, rows[i][0], 5.88, y + 0.31, 0.28, T.tealDark);
      text(s, rows[i][1], { x: 6.24, y: y + 0.2, w: 0.85, h: 0.52, fontSize: 7, bold: true, color: T.tealDark, valign: "middle" });
      s.addShape("rect", { x: 7.25, y, w: 5.63, h: 0.92, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 1.5 } });
      await icon(s, "FaCircleCheck", 7.4, y + 0.28, 0.36, "1B8F55");
      text(s, rows[i][3], { x: 7.95, y, w: 4.85, h: 0.92, fontSize: 13.5, bold: true, color: T.navy, valign: "middle" });
    }
    rect(s, L, 5.98, 3.3, 0.95, T.tealDark);
    text(s, [{ text: "THE DECISION REFRAME", options: { bold: true, fontSize: 10, color: "C9DBF0", breakLine: true } }, { text: "Not “who will drop out?” but “who do we call this week?”", options: { fontSize: 12.5, bold: true, color: T.white } }], { x: L + 0.12, y: 5.98, w: 3.06, h: 0.95, valign: "middle" });
    chevrow(s, 3.95, 6.1, 8.9, 0.72, [{ t: "Score", sub: "who is slipping" }, { t: "Explain", sub: "plain reasons" }, { t: "Assign", sub: "to a mentor" }, { t: "Log", sub: "what worked" }], { size: 13, depth: 0.28 });
    foot(s, "Sources: case guide; vendor listings (financial/research R1); financial model v1.1 (Base: 4.0 % effective reduction); OULAD student-grouped test, PLOS ONE 2026 (0.794); DPDP Act 2023 s.9(3).");
    s.addNotes("Four of the six assumptions tested in the guide. Effective dropout reduction 4.0 % in the v1.1 model against the guide's 25 %. Our OULAD day-28 AUC is 0.706 on a strict student-grouped split.");
  }

  // ================================================================ 5 ARCHITECTURE: LAYERED CAKE
  pres.addSection({ title: "Technology" });
  {
    const s = content("Technology", "Three layers, one rule: each institute's data stays its own", "Architecture and engineering", ["SYSTEM ARCHITECTURE: THREE LAYERS", 3]);
    const cx = 6.667;
    const layers = [["DELIVERY", "What people use", "FaDisplay", 9.2, T.tealDark, [["Web console", "Owner and teacher views"], ["Phone app", "Scan, weekly list, parent view"], ["Hindi + English", "Reports in both languages"], ["Open export", "CSV and API; you own the data"]]],
      ["INTELLIGENCE", "What it works out", "FaBrain", 10.5, T.teal, [["Topic mastery", "Finds weak topics (IRT)"], ["Early warning", "Flags who needs help (LightGBM)"], ["Honest ranges", "Percentile bands (conformal)"], ["Safe reports", "No invented numbers (8 checks)"]]],
      ["TRUST & DATA", "What keeps it safe", "FaShieldHalved", 11.8, T.navy, [["Row-level security", "Institutes never mix"], ["Consent gate", "No consent, no model"], ["Offline-first", "Works without internet"], ["Audit log", "Who saw what, kept a year"]]]];
    for (let i = 0; i < 3; i++) {
      const [name, sub, ic, w, col, chips] = layers[i];
      const x = cx - w / 2, y = 1.32 + i * 1.58;
      rect(s, x + 0.06, y + 0.08, w, 1.48, "DDE3EC");
      s.addShape("rect", { x, y, w, h: 1.48, fill: { color: T.white }, line: { color: col, width: 1.5 } });
      rect(s, x, y, 2.1, 1.48, col);
      await icon(s, ic, x + 0.78, y + 0.18, 0.55, T.white);
      text(s, name, { x, y: y + 0.78, w: 2.1, h: 0.32, fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, sub, { x, y: y + 1.08, w: 2.1, h: 0.3, fontSize: 9.5, color: "C9DBF0", align: "center", valign: "middle" });
      const cw = (w - 2.1 - 0.3) / 4;
      chips.forEach((c, k) => {
        const px = x + 2.2 + k * (cw + 0.03);
        s.addShape("rect", { x: px, y: y + 0.18, w: cw - 0.08, h: 1.12, fill: { color: T.tealTint }, line: { color: "B9CBE4", width: 0.75 } });
        text(s, [{ text: c[0], options: { bold: true, fontSize: 11, color: T.navy, breakLine: true } }, { text: c[1], options: { fontSize: 9.5, color: T.ink } }], { x: px + 0.08, y: y + 0.18, w: cw - 0.24, h: 1.12, valign: "middle", align: "center" });
      });
    }
    const tk = [["31", "tables, all isolated"], ["23", "API endpoints"], ["380", "syllabus topics"], ["116", "automated tests"], ["₹3.6", "per student a month"]];
    const tw = (CWD - 0.4) / 5;
    tk.forEach((k, i) => {
      const x = L + i * (tw + 0.1);
      rect(s, x, 6.12, tw, 0.82, T.tealDark);
      text(s, k[0], { x: x + 0.1, y: 6.12, w: 1.25, h: 0.82, fontSize: 24, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 1.35, y: 6.12, w: tw - 1.4, h: 0.82, fontSize: 10.5, color: "C9DBF0", valign: "middle" });
    });
    foot(s, "Sources: technical/contracts (31 tables, 23 endpoints, 380 topics); tenant isolation tested on PostgreSQL 16; test suites; financial model v1.1 (Base, ₹3.6 all-in).");
    s.addNotes("Layered view of the architecture. Keywords in brackets are the technical names for judges: IRT, LightGBM, conformal prediction, row-level security. Local-first: one laptop or one small server per deployment, no paid services.");
  }

  // ================================================================ 6 PRODUCT
  pres.addSection({ title: "Product" });
  {
    const s = content("Product", "A web console for the office, a phone app for mentors and parents", "Architecture and product", ["THE PRODUCT: WEB AND PHONE", 2]);
    rect(s, L, 1.3, 12.43, 3.75, T.tint);
    s.addShape("rect", { x: L + 0.1, y: 1.38, w: 6.45, h: 3.63, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "web_console.png", L + 0.12, 1.4, 6.41, 3.6, "Pragati web console (illustrative)");
    ["app_scan.png", "app_mentor.png", "app_parent.png"].forEach((f, i) => pic(s, f, 7.2 + i * 1.9, 1.3, 1.8, 3.6, "Pragati phone screen (illustrative)"));
    callout(s, 1, 8.75, 4.2, 0.3); callout(s, 2, 2.4, 3.15, 0.3); callout(s, 3, 9.25, 2.35, 0.3); callout(s, 4, 11.4, 3.3, 0.3);
    text(s, "Illustrative mock-ups, synthetic students", { x: 7.2, y: 4.9, w: 5.65, h: 0.22, fontSize: 8.5, italic: true, color: T.muted, align: "right" });
    const bn = [["FaCamera", "1  Scan on a phone", "Unclear bubbles fixed in one tap"], ["FaTableCells", "2  Topic map", "Weak topics for the whole batch"], ["FaListCheck", "3  Weekly list", "Up to 8 students, with plain reasons"], ["FaLanguage", "4  Parent update", "Hindi or English, numbers checked"]];
    const bw = (CWD - 0.45) / 4;
    for (let i = 0; i < 4; i++) {
      const x = L + i * (bw + 0.15);
      s.addShape("rect", { x, y: 5.25, w: bw, h: 1.0, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, 5.25, 0.62, 1.0, T.tealDark);
      await icon(s, bn[i][0], x + 0.14, 5.55, 0.34, T.white);
      text(s, bn[i][1], { x: x + 0.72, y: 5.3, w: bw - 0.8, h: 0.36, fontSize: 12, bold: true, color: T.navy, valign: "middle" });
      text(s, bn[i][2], { x: x + 0.72, y: 5.66, w: bw - 0.8, h: 0.55, fontSize: 10.5, color: T.ink });
    }
    const wk = [["Mon", "Test scanned"], ["Tue", "Mentor calls"], ["Wed", "Remedial session"], ["Sat", "Parent update"], ["Month", "Owner sees outcomes"]];
    chevrow(s, L, 6.4, CWD, 0.55, wk.map((w) => ({ t: w[0] + ": " + w[1] })), { size: 11, depth: 0.2 });
    foot(s, "Both surfaces share one API. The phone app is a progressive web app installed from the browser (no app-store fee). Mock-ups use synthetic students; report text comes from our report module.");
    s.addNotes("Product view. 1 is the scan screen, 2 the topic heatmap in the web console, 3 the mentor's weekly list, 4 the parent report in Hindi. The week strip shows the operating rhythm.");
  }

  // ================================================================ 7 LEARNING ANALYTICS
  {
    const s = content("Technology", "Pragati knows each student's weak topics, and tells the teacher how sure it is", "Data science, ML and AI rigour", ["KNOW EVERY STUDENT'S WEAK TOPICS", 3]);
    M.heatmap(kit, s, L, 1.3, 6.55, 3.55, { n: 9, m: 8, callout: true, seed: 11, fs: 9.5 });
    callout(s, 1, L + 3.55, 1.22, 0.3);
    text(s, "Pale column = topic probably not taught yet", { x: L + 3.9, y: 1.22, w: 2.6, h: 0.3, fontSize: 9, bold: true, color: T.tealDark, valign: "middle" });
    sec(s, "", "HOW IT WORKS, IN PLAIN ENGLISH", 7.3, 1.3, 5.55);
    const st = [["Rates how hard every question is", "2-parameter IRT, guessing prior"], ["Estimates mastery per topic, with doubt", "Per-topic ability, shrunk to the batch"], ["Says “not enough data” when unsure", "Uncertainty gate on every band"], ["Flags a likely wrong answer key", "Negative-discrimination detector"]];
    st.forEach((r, i) => {
      const y = 1.72 + i * 0.8;
      s.addShape("rect", { x: 7.3, y, w: 5.58, h: 0.72, fill: { color: i % 2 ? T.white : T.tint }, line: { color: T.line, width: 1 } });
      rect(s, 7.3, y, 0.6, 0.72, T.tealDark);
      text(s, String(i + 1), { x: 7.3, y, w: 0.6, h: 0.72, fontSize: 20, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: r[0], options: { bold: true, fontSize: 12.5, color: T.navy, breakLine: true } }, { text: r[1], options: { fontSize: 9.5, italic: true, color: T.muted } }], { x: 8.05, y, w: 4.75, h: 0.72, valign: "middle" });
    });
    s.addShape("rect", { x: 7.3, y: 4.98, w: 5.58, h: 0.36, fill: { color: T.tealTint }, line: { type: "none" } });
    text(s, "Works with small batches: question difficulty pooled across institutes", { x: 7.4, y: 4.98, w: 5.4, h: 0.36, fontSize: 10, bold: true, color: T.tealDark, valign: "middle" });
    pic(s, "chart_assist_bars.png", L, 5.0, 3.0, 1.86, "Next-answer accuracy: ours vs published");
    tag(s, "public", L + 3.15, 5.02);
    text(s, [{ text: "0.76 vs 0.75", options: { bold: true, fontSize: 22, color: T.tealDark, breakLine: true } }, { text: "Accuracy on 770 unseen students, public data. Published rival AKT scores higher (0.785); we say so.", options: { fontSize: 9.5, color: T.ink } }], { x: L + 3.15, y: 5.32, w: 3.4, h: 1.55, valign: "top" });
    text(s, "SYNTHETIC-DATA GATES", { x: 7.3, y: 5.5, w: 5.5, h: 0.24, fontSize: 9.5, bold: true, color: T.muted, charSpacing: 1 });
    ["Question difficulty recovered", "Wrong keys caught, few false alarms", "Mastery beats raw % correct"].forEach((t, i) => {
      text(s, t, { x: 7.3, y: 5.78 + i * 0.37, w: 3.9, h: 0.33, fontSize: 10.5, color: T.ink, valign: "middle" });
      tag(s, "pending", 11.55, 5.83 + i * 0.37, { size: 8, h: 0.22 });
    });
    foot(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT protocol, 770 held-out students; published DKT 0.754, SAKT 0.725, AKT 0.785); heat map is an illustrative mock-up. Gates pending Agent B.");
    s.addNotes("Plain-English headline with technical names as secondary labels. The three pending gates (difficulty recovery, wrong-key detection, mastery vs raw percent correct) come from Agent B and must be filled before submission.");
  }

  // ================================================================ 8 EARLY WARNING
  {
    const s = content("Technology", "Each week a mentor gets a short list: who to call, why, and what to offer", "Data science, ML and AI rigour; privacy", ["EARLY WARNING: THE INTERVENTION JOURNEY", 3]);
    const J = [["FaArrowTrendDown", "Engagement drops", "Six absences in ten classes"], ["FaFlag", "Model flags", "Appears on the weekly list"], ["FaPhone", "Mentor calls", "A supportive call, not a warning"], ["FaUserCheck", "Student retained", "Outcome logged; list updates"]];
    kit.line(s, 1.6, 1.7, 11.7, 1.7, { color: T.line, w: 3 });
    for (let i = 0; i < 4; i++) {
      const x = 1.6 + i * 3.37;
      s.addShape("ellipse", { x: x - 0.4, y: 1.3, w: 0.8, h: 0.8, fill: { color: i === 3 ? "1B8F55" : i === 0 ? T.red : T.tealDark }, line: { color: T.white, width: 3 } });
      await icon(s, J[i][0], x - 0.2, 1.5, 0.4, T.white);
      text(s, [{ text: J[i][1], options: { bold: true, fontSize: 12.5, color: T.navy, breakLine: true } }, { text: J[i][2], options: { fontSize: 9.5, color: T.muted } }], { x: x - 1.3, y: 2.15, w: 2.6, h: 0.55, align: "center", valign: "top" });
      if (i < 3) kit.line(s, x + 0.5, 1.7, x + 3.37 - 0.5, 1.7, { color: T.tealDark, w: 2, arrow: true });
    }
    pic(s, "screen_support_list.png", L, 2.85, 3.9, 2.19, "Weekly support list (illustrative)");
    text(s, "What the mentor sees (mock-up)", { x: L, y: 5.05, w: 3.9, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    pic(s, "chart_oulad_by_day.png", L, 5.3, 2.2, 1.53, "Withdrawal prediction accuracy over time, public data");
    tag(s, "public", L + 2.3, 5.3);
    text(s, [{ text: "0.46", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "of the top 10 % flagged really leave; simple rules: 0.24–0.31", options: { fontSize: 9, color: T.ink } }], { x: L + 2.3, y: 5.58, w: 1.75, h: 0.65, valign: "top" });
    text(s, [{ text: "0.009", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "calibration error: “30 %” means 30 %", options: { fontSize: 9, color: T.ink } }], { x: L + 2.3, y: 6.25, w: 1.75, h: 0.65, valign: "top" });
    // compliance matrix
    const mx = 4.65, mw = 8.23;
    hdrBar(s, mx, 2.85, mw, "COMPLIANCE MATRIX: WHAT THE LAW LETS US USE", { h: 0.32, size: 11 });
    const cols = ["Academic support", "Dropout risk", "Fee risk", "App activity"];
    const lw = 1.95, cwid = (mw - lw) / 4;
    cols.forEach((c, i) => text(s, c, { x: mx + lw + i * cwid, y: 3.2, w: cwid, h: 0.34, fontSize: 10.5, bold: true, color: T.tealDark, align: "center", valign: "middle" }));
    const M2 = { m: ["FaCircleCheck", "Model allowed", T.tealTint, T.tealDark], r: ["FaLock", "Plain rules only", "F1E8D3", "8A6500"], n: ["FaBan", "Never used", "F6E0DD", T.red], o: ["FaLockOpen", "Own opt-in", T.tealTint, T.tealDark] };
    const grid = [["Under 18", "parent consent", ["m", "r", "r", "n"]], ["18 and over", "own consent", ["m", "m", "m", "o"]], ["Under 18, if counsel agrees", "pending legal opinion", ["m", "m", "r", "n"]]];
    for (let r = 0; r < 3; r++) {
      const y = 3.58 + r * 0.98;
      rect(s, mx, y, lw - 0.05, 0.92, T.tint);
      text(s, [{ text: grid[r][0], options: { bold: true, fontSize: 11.5, color: T.navy, breakLine: true } }, { text: grid[r][1], options: { fontSize: 9, color: T.muted } }], { x: mx + 0.1, y, w: lw - 0.2, h: 0.92, valign: "middle" });
      for (let c = 0; c < 4; c++) {
        const m = M2[grid[r][2][c]], x = mx + lw + c * cwid;
        rect(s, x + 0.03, y, cwid - 0.06, 0.92, m[2]);
        await icon(s, m[0], x + cwid / 2 - 0.17, y + 0.12, 0.34, m[3]);
        text(s, m[1], { x: x + 0.03, y: y + 0.52, w: cwid - 0.06, h: 0.34, fontSize: 9.5, bold: true, color: m[3], align: "center", valign: "middle" });
      }
    }
    s.addShape("rect", { x: mx, y: 6.55, w: mw, h: 0.38, fill: { color: T.tealDark }, line: { type: "none" } });
    text(s, "DPDP s.9(3): no tracking of children, even with consent. Under-18 dropout and fee lists use plain rules.", { x: mx + 0.1, y: 6.55, w: mw - 0.2, h: 0.38, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
    foot(s, "Sources: ml/public_validation (OULAD day 28, student-grouped 5-fold; precision at top 10 %); contracts/routing_policy.yaml; DPDP Act 2023 s.9. On synthetic institutes, early-warning lift is pending.");
    s.addNotes("Journey on top, public-data evidence bottom-left (shrunk), compliance matrix on the right. Locks denote data walls. About a quarter of dropouts are sudden and cannot be predicted from academic data; say so if asked.");
  }

  // ================================================================ 9 HONEST RANGES AND CHECKED REPORTS
  {
    const s = content("Technology", "An honest range instead of a single rank, and parent messages where every number is checked", "Data science, ML and AI rigour; GenAI guardrails", ["HONEST RANGES AND SAFE PARENT REPORTS", 3]);
    s.addShape("rect", { x: L, y: 1.3, w: 5.6, h: 3.16, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "screen_student_profile.png", L + 0.02, 1.32, 5.56, 3.12, "Student profile with percentile range (illustrative)");
    callout(s, 1, 3.3, 2.75, 0.3);
    s.addShape("rect", { x: 6.45, y: 1.3, w: 5.5, h: 3.3, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "screen_parent_report.png", 6.47, 1.32, 5.46, 3.28, "Parent report in Hindi and English (illustrative)");
    callout(s, 2, 7.9, 3.75, 0.3);
    text(s, [{ text: "1 ", options: { bold: true, color: T.tealDark } }, { text: "The range narrows as tests add up. Never a single rank." }], { x: L, y: 4.5, w: 5.6, h: 0.3, fontSize: 10.5, color: T.ink, valign: "middle" });
    text(s, [{ text: "2 ", options: { bold: true, color: T.tealDark } }, { text: "Hindi and English; every number checked before sending." }], { x: 6.45, y: 4.64, w: 5.5, h: 0.3, fontSize: 10.5, color: T.ink, valign: "middle" });
    // side column: range facts
    rect(s, 12.1, 1.3, 0.78, 3.3, T.tealDark);
    text(s, "80 %", { x: 12.1, y: 1.45, w: 0.78, h: 0.5, fontSize: 20, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, "of students land inside their range", { x: 12.12, y: 1.95, w: 0.74, h: 1.3, fontSize: 9, color: "C9DBF0", align: "center" });
    text(s, "editable exam table", { x: 12.12, y: 3.3, w: 0.74, h: 1.2, fontSize: 9, color: "C9DBF0", align: "center" });
    sec(s, "", "EIGHT AUTOMATIC SAFETY CHECKS BEFORE ANY MESSAGE", L, 5.0, 8);
    const ck = ["Numbers match the data", "Topics are real", "Names added last", "No banned words", "Right length", "Trend is correct", "Tips are approved", "Format is valid"];
    ck.forEach((c, i) => {
      const x = L + (i % 4) * 1.95, y = 5.38 + Math.floor(i / 4) * 0.5;
      rect(s, x, y, 0.36, 0.42, T.tealDark);
      text(s, String(i + 1), { x, y, w: 0.36, h: 0.42, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x: x + 0.36, y, w: 1.52, h: 0.42, fill: { color: T.tealTint }, line: { type: "none" } });
      text(s, c, { x: x + 0.42, y, w: 1.44, h: 0.42, fontSize: 9, color: T.navy, valign: "middle" });
    });
    chevrow(s, 8.5, 5.38, 4.38, 0.42, [{ t: "AI drafts" }, { t: "8 checks" }, { t: "Send" }], { size: 10.5, depth: 0.16 });
    s.addShape("rect", { x: 8.5, y: 5.9, w: 4.38, h: 0.5, fill: { color: "F1E8D3" }, line: { color: T.amber, width: 1.25, dashType: "dash" } });
    await icon(s, "FaShieldHalved", 8.6, 6.0, 0.3, "8A6500");
    text(s, "Any check fails: a safe human-written template goes out instead", { x: 9.0, y: 5.9, w: 3.85, h: 0.5, fontSize: 10, bold: true, color: "6B4E00", valign: "middle" });
    s.addShape("rect", { x: L, y: 6.5, w: CWD, h: 0.44, fill: { color: T.tint }, line: { type: "none" } });
    text(s, [{ text: "Next on the same rails (designed): ", options: { bold: true, color: T.tealDark } }, { text: "7-day study plans and doubt answers from retrieved notes. Works with no AI model at all." }], { x: L + 0.15, y: 6.5, w: CWD - 0.3, h: 0.44, fontSize: 10.5, color: T.ink, valign: "middle" });
    foot(s, "Sources: backend/app/genai (20 templates, 16 tests); contracts/report_numbers.schema.json. Band = quantile model, conformal 80 % target; coverage pending. Mock-ups illustrative.");
    s.addNotes("Mock-ups: student profile with the narrowing percentile range, and the Hindi/English parent report. Do not quote a verifier catch rate until the independent adversarial test passes after the E2 fixes.");
  }

  // ================================================================ 10 PRIVACY
  pres.addSection({ title: "Trust" });
  {
    const s = content("Trust", "Built for the law and for children: consent first, supportive actions only", "Feasibility, privacy and safety", ["PRIVACY, SAFETY AND DPDP COMPLIANCE", 4]);
    s.addShape("rect", { x: L, y: 1.3, w: 3.3, h: 3.3, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "screen_consent.png", L + 0.02, 1.32, 3.26, 3.26, "Consent notice with purpose switches (illustrative)");
    callout(s, 1, L - 0.12, 1.75, 0.3); callout(s, 2, L - 0.12, 2.9, 0.3); callout(s, 3, L - 0.12, 3.9, 0.3);
    text(s, [{ text: "1  ", options: { bold: true, color: T.tealDark } }, { text: "Rule 10: parent's ID checked at the admission desk", options: { breakLine: true } }, { text: "2  ", options: { bold: true, color: T.tealDark } }, { text: "One switch for each purpose", options: { breakLine: true } }, { text: "3  ", options: { bold: true, color: T.tealDark } }, { text: "Withdraw everything in one tap" }], { x: L, y: 4.68, w: 3.3, h: 0.7, fontSize: 9.5, color: T.ink });
    // lockbox
    const bx = 4.05, bw = 4.4;
    s.addShape("roundRect", { x: bx, y: 1.3, w: bw, h: 3.9, rectRadius: 0.12, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 2.5, dashType: "dash" } });
    s.addShape("ellipse", { x: bx + bw / 2 - 0.45, y: 1.0, w: 0.9, h: 0.9, fill: { color: T.tealDark }, line: { color: T.white, width: 3 } });
    await icon(s, "FaLock", bx + bw / 2 - 0.2, 1.25, 0.4, T.white);
    text(s, "THE INSTITUTE'S OWN SPACE", { x: bx, y: 1.95, w: bw, h: 0.3, fontSize: 12, bold: true, color: T.tealDark, align: "center", charSpacing: 1 });
    text(s, "one laptop or one private server", { x: bx, y: 2.22, w: bw, h: 0.24, fontSize: 9.5, italic: true, color: T.muted, align: "center" });
    const lb = [["FaUserGraduate", "Student records"], ["FaFileCircleCheck", "Marks and answers"], ["FaSignature", "Consent ledger"], ["FaListCheck", "Risk lists: mentors only"]];
    for (let i = 0; i < 4; i++) {
      const x = bx + 0.2 + (i % 2) * 2.0, y = 2.6 + Math.floor(i / 2) * 1.0;
      s.addShape("rect", { x, y, w: 1.9, h: 0.9, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      await icon(s, lb[i][0], x + 0.78, y + 0.1, 0.34, T.tealDark);
      text(s, lb[i][1], { x: x + 0.05, y: y + 0.5, w: 1.8, h: 0.35, fontSize: 10, bold: true, color: T.navy, align: "center", valign: "middle" });
    }
    text(s, "Raw student data never leaves", { x: bx, y: 4.7, w: bw, h: 0.35, fontSize: 12, bold: true, color: T.tealDark, align: "center", valign: "middle" });
    // outputs
    kit.line(s, bx + bw, 2.3, 9.0, 2.3, { color: T.tealDark, w: 2.5, arrow: true });
    kit.line(s, bx + bw, 3.9, 9.0, 3.9, { color: T.tealDark, w: 2.5, arrow: true });
    tile(s, 9.0, 1.3, 3.88, 1.95, "OUT: SHARED QUESTION BANK", "Question difficulty numbers only. No student, no name, no marks.", { bs: 14 });
    tile(s, 9.0, 3.4, 3.88, 1.8, "SEEN BY PARENTS AND STUDENTS", "Progress and next steps. Never ranks. Never a risk label.", { bs: 14 });
    // guardrails
    s.addShape("ellipse", { x: L, y: 5.35, w: 1.5, h: 1.5, fill: { color: T.tealDark }, line: { color: T.tealTint, width: 6 } });
    await icon(s, "FaShieldHalved", L + 0.38, 5.68, 0.75, T.white);
    text(s, "SAFETY GUARDRAILS", { x: 2.2, y: 5.28, w: 4, h: 0.28, fontSize: 11.5, bold: true, color: T.tealDark, charSpacing: 1 });
    const gr = ["No leaderboards or public ranks", "No batch moves based on scores", "Banned-words check on every message", "Counsellor contact for each institute", "Risk lists: mentors and owner only", "Students never see a risk label"];
    gr.forEach((g, i) => {
      const x = 2.2 + (i % 3) * 3.55, y = 5.6 + Math.floor(i / 3) * 0.52;
      s.addShape("rect", { x, y, w: 3.48, h: 0.46, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, y, 0.08, 0.46, T.tealDark);
      text(s, g, { x: x + 0.18, y, w: 3.25, h: 0.46, fontSize: 10.5, bold: true, color: T.navy, valign: "middle" });
    });
    text(s, "DPDP s.9(1) and Rule 10: parental consent  ·  s.9(3): no tracking of children  ·  MoE 2024 cl. 10.2(xi): results for counselling, never public", { x: 2.2, y: 6.68, w: 10.6, h: 0.3, fontSize: 9, italic: true, color: T.muted, valign: "middle" });
    foot(s, "Sources: DPDP Act 2023 s.9 and Rules 2025 (Rule 10); MoE Guidelines for Coaching Centres 2024; contracts/routing_policy.yaml; tenant isolation tested on PostgreSQL 16. Not legal advice.");
    s.addNotes("Central lockbox: raw data stays in the institute's own environment; only item difficulty statistics reach a shared bank. We are the data processor; the institute is the data fiduciary. A lawyer's check on the in-person ID flow is still recommended.");
  }

  // ================================================================ 11 BUSINESS
  pres.addSection({ title: "Business" });
  {
    const s = content("Business", "At ₹30 a student the product pays back in under six months", "Revenue model and unit economics", ["BUSINESS MODEL AND UNIT ECONOMICS", 5]);
    const kp = [["3.6x", "LTV / CAC", "4.8x on the undiscounted basis most peers quote. The guide claims 10.7x."], ["5.7", "months to pay back", "Sales and onboarding cost recovered. Guide: 3.1 months."], ["78 %", "contribution margin", "₹6,740 a month per institute, after serving costs."]];
    const kw = (CWD - 0.3) / 3;
    kp.forEach((k, i) => {
      const x = L + i * (kw + 0.15);
      rect(s, x, 1.3, kw, 1.65, T.tealDark);
      text(s, k[0], { x: x + 0.15, y: 1.35, w: 1.9, h: 1.0, fontSize: 48, bold: true, color: T.white, valign: "middle" });
      text(s, k[1], { x: x + 2.05, y: 1.45, w: kw - 2.15, h: 0.8, fontSize: 14, bold: true, color: "C9DBF0", valign: "middle" });
      text(s, k[2], { x: x + 0.15, y: 2.35, w: kw - 0.3, h: 0.55, fontSize: 10, color: T.white });
    });
    // gauge
    sec(s, 1, "STRESS TEST: BEAR, BASE, BULL", L, 3.15, 4.4);
    pic(s, "chart_gauge.png", L, 3.5, 4.4, 2.2, "Gauge of institute return: bear, base, bull");
    const gv = [["BEAR", "0.37x", "LTV/CAC 0.75x"], ["BASE", "1.7x", "LTV/CAC 3.6x"], ["BULL", "3.9x", "LTV/CAC 10x"]];
    gv.forEach((g, i) => {
      const x = L + i * 1.48;
      rect(s, x, 5.82, 1.42, 0.28, i === 1 ? T.tealDark : "6B7280");
      text(s, g[0], { x, y: 5.82, w: 1.42, h: 0.28, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: g[1], options: { bold: true, fontSize: 16, color: T.navy, breakLine: true } }, { text: g[2], options: { fontSize: 8.5, color: T.muted } }], { x, y: 6.12, w: 1.42, h: 0.6, align: "center", valign: "top" });
    });
    text(s, "Owner's return, all benefits. Every input at its worst: 0.09x.", { x: L, y: 6.72, w: 4.4, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    // cost stack
    const sx = 5.2, sw = 3.7;
    sec(s, 2, "WHERE ₹3.6 A STUDENT GOES", sx, 3.15, sw);
    const parts = [["WhatsApp messages", 1.0, T.tealDark], ["Compute and storage", 0.8, T.teal], ["AI-written reports", 0.7, "5B8DC9"], ["Servers and database", 0.5, "8FB0D8"], ["Legal and compliance", 0.5, "B9CFE8"], ["Consent checks", 0.1, "DDE7F4"]];
    let yy = 3.55; const tot = 3.6, bh = 2.75;
    parts.forEach((p) => { const h = (p[1] / tot) * bh; rect(s, sx, yy, 0.8, h, p[2]); yy += h; });
    parts.forEach((p, i) => {
      const y = 3.55 + i * 0.46;
      rect(s, sx + 1.0, y + 0.1, 0.2, 0.2, p[2]);
      text(s, [{ text: "₹" + p[1].toFixed(1) + "  ", options: { bold: true, color: T.navy } }, { text: p[0], options: { color: T.ink } }], { x: sx + 1.3, y, w: sw - 1.3, h: 0.4, fontSize: 10.5, valign: "middle" });
    });
    text(s, "A month, per student, all-in. Run locally: ₹0 extra", { x: sx, y: 6.5, w: sw, h: 0.3, fontSize: 9, italic: true, color: T.muted });
    // owner return
    const rx = 9.15, rw = R - 9.15;
    sec(s, 3, "WHAT THE OWNER GETS", rx, 3.15, rw);
    const rr = [["All benefits", 1.7, T.tealDark], ["Fees + staff time", 0.55, T.teal], ["Fees only", 0.35, "8FB0D8"]];
    rr.forEach((r, i) => {
      const y = 3.55 + i * 0.58;
      text(s, r[0], { x: rx, y, w: 1.3, h: 0.46, fontSize: 10, color: T.ink, valign: "middle" });
      rect(s, rx + 1.35, y + 0.06, (r[1] / 2) * (rw - 2.2), 0.34, r[2]);
      text(s, r[1] + "x", { x: R - 0.75, y, w: 0.75, h: 0.46, fontSize: 13, bold: true, color: T.navy, align: "right", valign: "middle" });
    });
    kit.line(s, rx + 1.35 + 0.5 * (rw - 2.2), 3.5, rx + 1.35 + 0.5 * (rw - 2.2), 5.3, { color: T.red, w: 1.25, dash: "dash" });
    text(s, "1x = pays for itself", { x: rx + 1.35 + 0.5 * (rw - 2.2) - 0.8, y: 5.25, w: 1.6, h: 0.22, fontSize: 8.5, color: T.red, align: "center" });
    s.addShape("rect", { x: rx, y: 5.6, w: rw, h: 1.3, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    lines(s, ["Keep 5.5 students a year, or", "win 1.5 extra admissions: it breaks even", "₹30 per active student per month", "Annual contract per session"], rx + 0.12, 5.66, rw - 0.24, 1.2, { size: 10, gap: 2 });
    foot(s, "Source: financial model v1.1 (Mid institute, 400 students, Base; Bear/Bull flex 13 drivers; Stress sets all inputs to worst). Model output from sourced and assumed inputs; willingness to pay is untested.");
    s.addNotes("v1.1 numbers: LTV/CAC 3.6x discounted (4.8x undiscounted), payback 5.7 months simple, margin 78 %. Return 1.7x with admissions counted, 0.55x on hard benefits (fees plus staff time), 0.35x fees only. Cost stack from the COGS build at Base inputs: WhatsApp 0.8 plus platform fee 0.2, compute 0.8, AI reports 0.7, servers 0.5, compliance 0.5, consent 0.1.");
  }

  // ================================================================ 12 GO-TO-MARKET
  {
    const s = content("Business", "Start in Patna with a free trial on last year's Excel, then grow city by city", "Market and go-to-market; moat", ["GO-TO-MARKET AND ROADMAP", 5]);
    const gx = 2.7, gw = 10.18, qw = gw / 6;
    const qs = ["Oct–Dec 26", "Jan–Mar 27", "Apr–Jun 27", "Jul–Sep 27", "Oct–Dec 27", "Jan–Mar 28"];
    rect(s, gx, 1.3, qw * 2, 0.22, T.navy); text(s, "FY27", { x: gx, y: 1.3, w: qw * 2, h: 0.22, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
    rect(s, gx + qw * 2, 1.3, qw * 4, 0.22, T.tealDark); text(s, "FY28", { x: gx + qw * 2, y: 1.3, w: qw * 4, h: 0.22, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
    qs.forEach((q, i) => { rect(s, gx + i * qw, 1.52, qw - 0.02, 0.26, T.tealTint); text(s, q, { x: gx + i * qw, y: 1.52, w: qw, h: 0.26, fontSize: 9, bold: true, color: T.tealDark, align: "center", valign: "middle" }); });
    const rows = [["TECH", "Validate on public data", 0, 1, T.tealDark], ["TECH", "Prototype and phone app", 0.3, 2, T.teal], ["PILOTS", "Free retro-pilots (2)", 1, 2, T.tealDark], ["PILOTS", "Paid pilots + controls", 2, 3, T.teal], ["SALES", "Demos before admissions", 1.3, 2.6, "5B8DC9"], ["SALES", "First paying institutes", 2.5, 4, T.tealDark], ["SCALE", "Bihar, UP, Jharkhand", 3.5, 6, T.teal], ["MONEY", "Raise ₹45 L", 1.5, 2.3, T.amber]];
    rows.forEach((r, i) => {
      const y = 1.86 + i * 0.35;
      if (i % 2 === 0) rect(s, L, y - 0.02, CWD, 0.34, T.tint);
      text(s, r[0], { x: L + 0.05, y, w: 0.8, h: 0.3, fontSize: 8, bold: true, color: T.muted, valign: "middle", charSpacing: 0.5 });
      text(s, r[1], { x: L + 0.85, y, w: 1.45, h: 0.3, fontSize: 9, color: T.ink, valign: "middle" });
      rect(s, gx + r[2] * qw, y + 0.03, (r[3] - r[2]) * qw - 0.04, 0.24, r[4]);
    });
    for (let i = 1; i < 6; i++) kit.line(s, gx + i * qw - 0.01, 1.8, gx + i * qw - 0.01, 4.62, { color: "D5DEEA", w: 0.5 });
    // hub and spoke
    sec(s, 1, "THE ACQUISITION ENGINE", L, 4.78, 5.8);
    const hx = 3.4, hy = 5.95;
    const sp = [[1.95, 5.38, "FaGift", "Free retro-pilot", "one Excel file, no install"], [4.85, 5.38, "FaPersonChalkboard", "Field demos", "Jan to Mar, before admissions"], [1.95, 6.52, "FaPrint", "Channel partners", "OMR and test-series vendors"], [4.85, 6.52, "FaHandshake", "Nextute network", "referral channel, to agree"]];
    sp.forEach((p) => kit.line(s, hx, hy, p[0], p[1], { color: T.line, w: 2 }));
    s.addShape("ellipse", { x: hx - 0.5, y: hy - 0.5, w: 1.0, h: 1.0, fill: { color: T.tealDark }, line: { color: T.white, width: 3 } });
    text(s, "Pragati", { x: hx - 0.5, y: hy - 0.5, w: 1.0, h: 1.0, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
    for (let i = 0; i < 4; i++) {
      const [x, y, ic, t, sub] = sp[i];
      s.addShape("ellipse", { x: x - 0.28, y: y - 0.28, w: 0.56, h: 0.56, fill: { color: T.teal }, line: { color: T.white, width: 2 } });
      await icon(s, ic, x - 0.14, y - 0.14, 0.28, T.white);
      const left = x < hx;
      text(s, [{ text: t, options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: sub, options: { fontSize: 8, color: T.muted } }], { align: left ? "right" : "left", x: left ? x - 1.55 : x + 0.35, y: y - 0.25, w: 1.25, h: 0.5, valign: "middle", align: left ? "left" : "left" });
    }
    // competitor matrix
    const cx0 = 6.75;
    sec(s, 2, "COMPETITION (VENDOR LISTINGS)", cx0, 4.78, 6.1);
    const mk = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? "F1E8D3" : "F4F7FB", bold: true, color: t === "yes" ? T.tealDark : T.muted });
    dtable(s, cx0, 5.12, [1.25, 1.2, 0.7, 0.95, 1.0, 0.75], ["", "₹ / student / mo", "OMR", "Topic map", "Parent report", "Hindi"], [
      ["Classplus", "4–7", mk("?"), mk("?"), mk("?"), mk("?")], ["Fedena", "10–21", mk("no"), mk("?"), mk("yes"), mk("?")], ["Teachmint", "20–40 (est.)", mk("?"), mk("?"), mk("yes"), mk("yes")],
      [{ t: "Pragati", bold: true, color: T.white, fill: T.tealDark }, { t: "30", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }]],
      { rowH: 0.27, headH: 0.3, size: 9, headSize: 8.5, rowStyles: ["white", "white", "white", "white"], headFill: T.tealDark });
    text(s, "yes: shown in listing · no: not shown · ?: not verifiable", { x: cx0, y: 6.52, w: 6.1, h: 0.2, fontSize: 8, italic: true, color: T.muted });
    text(s, [{ text: "Moat: ", options: { bold: true, color: T.tealDark } }, { text: "more institutes sharpen question difficulty for all. Weak below about 200 institutes, so early wins come from time saved." }], { x: cx0, y: 6.7, w: 6.1, h: 0.38, fontSize: 9, color: T.ink });
    foot(s, "Sources: vendor listings (financial/research R1; ? means not verifiable, not absent); financial model v1.1 (field vs channel economics); roadmap dates are our plan. Year 3, Base: 58 institutes, ₹65 L revenue.");
    s.addNotes("Year 3 Base: 58 paying institutes, revenue 65.3 lakh, EBITDA 11.9 lakh, break-even month 16, funding need 45 lakh. Channel partners give LTV/CAC 3.4x for small institutes against 1.5x by field sales.");
  }

  // ================================================================ 13 VALIDATION AND THE ASK
  pres.addSection({ title: "The Ask" });
  {
    const s = content("The Ask", "What we have proved, what we have not, and the one pilot that settles it", "Feasibility; honest limits", ["VALIDATION SCORECARD AND THE ASK", 6]);
    hdrBar(s, L, 1.3, 4.3, "VALIDATION SCORECARD", { h: 0.32, size: 11.5 });
    const sc = [["ok", "0.76 accuracy on public student data"], ["ok", "0.009 calibration error, public data"], ["ok", "Privacy costs only 0.008 accuracy"], ["ok", "116 tests pass; tenants stay apart"], ["wait", "Difficulty and wrong-key gates"], ["no", "Accuracy at a real institute"]];
    for (let i = 0; i < sc.length; i++) {
      const y = 1.68 + i * 0.6, k = sc[i][0];
      s.addShape("rect", { x: L, y, w: 4.3, h: 0.54, fill: { color: k === "ok" ? T.tealTint : k === "wait" ? "F1E8D3" : "F6E0DD" }, line: { type: "none" } });
      await icon(s, k === "ok" ? "FaCircleCheck" : k === "wait" ? "FaHourglassHalf" : "FaCircleXmark", L + 0.12, y + 0.12, 0.3, k === "ok" ? "1B8F55" : k === "wait" ? "8A6500" : T.red);
      text(s, sc[i][1], { x: L + 0.55, y, w: 3.7, h: 0.54, fontSize: 11, bold: true, color: T.navy, valign: "middle" });
    }
    // risk matrix
    const mx = 5.2, my = 1.7, mw = 3.7, mh = 3.45;
    sec(s, "", "RISK MATRIX", mx - 0.2, 1.3, 4);
    const quad = [[0, 0, "F4F7FB"], [1, 0, "FBEFD8"], [0, 1, "FBEFD8"], [1, 1, "F6E0DD"]];
    quad.forEach(([qx, qy, c]) => rect(s, mx + qx * mw / 2, my + (1 - qy) * mh / 2, mw / 2 - 0.03, mh / 2 - 0.03, c));
    text(s, "LIKELIHOOD →", { x: mx, y: my + mh + 0.02, w: mw, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, align: "center" });
    s.addText("IMPACT →", { x: mx - 0.75, y: my + mh / 2 - 0.15, w: 0.9, h: 0.3, fontSize: 8.5, bold: true, color: T.muted, align: "center", rotate: 270, margin: 0 });
    const rk = [[1, 0.5, 0.84], [2, 0.64, 0.7], [3, 0.82, 0.46], [4, 0.24, 0.3]];
    rk.forEach(([n, lx, iy]) => {
      s.addShape("ellipse", { x: mx + lx * mw - 0.2, y: my + (1 - iy) * mh - 0.2, w: 0.4, h: 0.4, fill: { color: n === 4 ? T.teal : T.tealDark }, line: { color: T.white, width: 2 } });
      text(s, String(n), { x: mx + lx * mw - 0.2, y: my + (1 - iy) * mh - 0.2, w: 0.4, h: 0.4, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
    });
    const rl = [["Real accuracy is lower", "Retro-pilot before any sale"], ["Owners won't pay ₹30", "Price survey; lead with time saved"], ["Mentors ignore the list", "Cap the list; log every outcome"], ["Hindi quality falls short", "Native review; template fallback"]];
    rl.forEach((r, i) => {
      const y = 1.3 + i * 0.96, x = 9.3;
      s.addShape("ellipse", { x, y: y + 0.18, w: 0.4, h: 0.4, fill: { color: i === 3 ? T.teal : T.tealDark }, line: { type: "none" } });
      text(s, String(i + 1), { x, y: y + 0.18, w: 0.4, h: 0.4, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: r[0], options: { bold: true, fontSize: 11.5, color: T.navy, breakLine: true } }, { text: "Fix: " + r[1], options: { fontSize: 9.5, color: T.muted } }], { x: x + 0.5, y: y + 0.05, w: 3.1, h: 0.75, valign: "middle" });
    });
    // ask
    rect(s, L, 5.65, CWD, 1.3, T.tealDark);
    text(s, "THE ASK", { x: L + 0.25, y: 5.72, w: 3, h: 0.3, fontSize: 12, bold: true, color: "F1D9A0", charSpacing: 2 });
    text(s, "Two free retro-pilots in Patna this winter.", { x: L + 0.25, y: 6.0, w: 7.2, h: 0.5, fontSize: 24, bold: true, color: T.white, valign: "middle" });
    text(s, "Give us last year's Excel. If we don't flag more of the students who left than your attendance rule, at the same workload, we stop.", { x: L + 0.25, y: 6.5, w: 7.2, h: 0.42, fontSize: 10.5, color: "C9DBF0" });
    [["₹45 L", "funding, Base plan"], ["Month 16", "break-even"], ["₹65 L", "year-3 revenue"]].forEach((k, i) => {
      const x = 8.05 + i * 1.62;
      rect(s, x, 5.85, 1.5, 1.0, "1A3F6F");
      text(s, k[0], { x, y: 5.9, w: 1.5, h: 0.55, fontSize: 18, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, k[1], { x, y: 6.45, w: 1.5, h: 0.35, fontSize: 9, color: "C9DBF0", align: "center" });
    });
    foot(s, "Sources: ml/public_validation; technical/docs/FEASIBILITY_CHECK.md; financial model v1.1 (3-year projection, Base: ₹45 L funding, break-even month 16, year-3 revenue ₹65.3 L, EBITDA ₹11.9 L).");
    s.addNotes("The ask is concrete and falsifiable. Funding of 45 lakh and break-even in month 16 are Base outputs of the v1.1 projection; Bear needs 1 crore and does not break even within 36 months.");
  }

  // ================================================================ APPENDIX A1: SCENARIOS AND SENSITIVITY (model v1.1)
  pres.addSection({ title: "Appendix" });
  {
    const s = content("Appendix", "Appendix 1: scenarios and sensitivity: what the model says when inputs move (Mid institute, 400 students)", "Revenue model and unit economics: sensitivity", ["APPENDIX 1: SCENARIOS AND SENSITIVITY", 7]);
    sec(s, "A", "SCENARIOS (BEAR AND BULL MOVE 13 DRIVERS; STRESS MOVES ALL)", L, 1.28, 7.3);
    const b = (t) => ({ t, bold: true, fill: C2.green });
    dtable(s, L, 1.62, [2.55, 0.78, 0.75, 0.85, 0.75, 0.8], ["", "Guide", "Bear", "Base", "Bull", "Stress"], [
      ["Dropout reduction", "25 %", "1.0 %", b("4.0 %"), "11.3 %", "0.6 %"], ["Students kept a year", "12.0", "0.3", b("1.9"), "8.2", "0.2"], ["Return, all benefits", "2.25x", "0.37x", b("1.7x"), "3.9x", "0.09x"],
      ["Return, fees + staff time", "2.25x", "0.37x", b("0.55x"), "1.3x", "0.09x"], ["Students to keep to break even", "5.3", "3.8", b("5.5"), "7.2", "11.7"], ["CAC, sales and marketing", "₹25,000", "₹44,889", b("₹15,567"), "₹8,386", "₹65,111"],
      ["LTV ÷ CAC, discounted", "10.7x", "0.75x", b("3.6x"), "10x", "-0.11x"], ["LTV ÷ CAC, undiscounted", "10.7x", "0.93x", b("4.8x"), "15x", "-0.13x"], ["Payback, simple (months)", "3.1", "21.1", b("5.7"), "2.6", "never"]],
      { rowH: 0.3, headH: 0.28, size: 9.5, headFills: [T.tealDark, T.muted, T.muted, T.tealDark, T.muted, T.muted], rowStyles: Array(9).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    sec(s, "B", "OWNER'S RETURN BY PRICE AND DROPOUT REDUCTION", L, 4.78, 7.3);
    heat(s, L, 5.05, 0.78, 0.25, ["₹20", "₹30", "₹40", "₹50", "₹60", "₹80"], ["5 %", "8 %", "11 %", "15 %", "20 %", "25 %"],
      [[2.4, 1.8, 1.4, 1.2, 1.0, 0.81], [2.7, 2.1, 1.7, 1.4, 1.2, 0.92], [3.1, 2.3, 1.9, 1.6, 1.3, 1.0], [3.6, 2.7, 2.1, 1.8, 1.5, 1.2], [4.1, 3.1, 2.5, 2.1, 1.8, 1.4], [4.7, 3.6, 2.8, 2.4, 2.0, 1.6]], { labW: 0.5, size: 9, fmt: (v) => v.toFixed(1) + "x" });
    // tornado
    const tx = 8.0, tw = R - 8.0;
    sec(s, "C", "WHAT MOVES THE OWNER'S RETURN (BASE 1.7x)", tx, 1.28, tw);
    const tor = [["Admissions uplift 0–3 %", 0.55, 4.1], ["Price ₹40 to ₹20", 1.4, 2.3], ["Annual fee ₹70k to ₹1.2 L", 1.4, 2.1], ["Mentor minutes per call", 1.4, 2.0], ["Outreach effect 5–30 %", 1.5, 2.1], ["Precision of the flag", 1.5, 1.9], ["Months before first flag", 1.6, 1.8]];
    const ax0 = 0.4, ax1 = 4.3, px = tx + 1.9, pw = tw - 2.2, X = (v) => px + ((v - ax0) / (ax1 - ax0)) * pw;
    tor.forEach((r, i) => {
      const y = 1.66 + i * 0.36;
      text(s, r[0], { x: tx, y, w: 1.9, h: 0.3, fontSize: 9, color: T.ink, valign: "middle" });
      rect(s, X(r[1]), y + 0.05, X(1.7) - X(r[1]), 0.2, "8FB0D8");
      rect(s, X(1.7), y + 0.05, X(r[2]) - X(1.7), 0.2, T.tealDark);
      text(s, r[1] + "x", { x: X(r[1]) - 0.42, y, w: 0.4, h: 0.3, fontSize: 8, color: T.muted, align: "right", valign: "middle" });
      text(s, r[2] + "x", { x: X(r[2]) + 0.03, y, w: 0.4, h: 0.3, fontSize: 8, color: T.muted, valign: "middle" });
    });
    rect(s, X(1.7) - 0.01, 1.62, 0.02, 2.55, T.navy);
    sec(s, "D", "OUR LTV ÷ CAC BY CHURN AND ACQUISITION COST", tx, 4.28, tw);
    heat(s, tx, 4.55, 0.78, 0.27, ["1 %", "2 %", "3 %", "4 %", "5 %"], ["₹15k", "₹25k", "₹35k", "₹50k", "₹75k"],
      [[11, 10, 9.3, 8.5, 7.8], [6.9, 6.2, 5.6, 5.1, 4.7], [4.9, 4.4, 4.0, 3.6, 3.3], [3.4, 3.1, 2.8, 2.5, 2.3], [2.3, 2.1, 1.9, 1.7, 1.6]], { labW: 0.5, size: 9, fmt: (v) => v.toFixed(1) + "x" });
    foot(s, "Source: financial model v1.1 (Scenarios, Sensitivity). Model output from sourced and assumed inputs, not measured. Base marker on the churn grid is about ₹38k acquisition cost at 3 % churn.");
  }

  // ================================================================ APPENDIX A2: THREE-YEAR PLAN
  {
    const s = content("Appendix", "Appendix 2: a three-year plan capped by the market, and how size changes the economics", "Revenue model; three-year projection", ["APPENDIX 2: THREE-YEAR PLAN AND SEGMENTS", 7]);
    sec(s, "A", "THREE-YEAR PROJECTION (₹)", L, 1.28, 6.3);
    const b = (t) => ({ t, bold: true, fill: C2.green });
    dtable(s, L, 1.62, [2.6, 1.2, 1.3, 1.2], ["", "Bear", "Base", "Bull"], [
      ["Revenue in year 3", "₹11.0 L", b("₹65.3 L"), "₹2.50 Cr"], ["EBITDA in year 3", "-₹30.2 L", b("₹11.9 L"), "₹1.26 Cr"], ["Paying institutes, end of year 3", "15", b("58"), "191"],
      ["Funding the model needs", "₹1.00 Cr", b("₹45.0 L"), "₹30.0 L"], ["Break-even month", "after 36", b("16"), "4"]],
      { rowH: 0.38, headH: 0.3, size: 10, headFills: [T.tealDark, T.muted, T.tealDark, T.muted], rowStyles: ["band", "white", "band", "white", "band"] });
    text(s, "Market cap: 1,180 addressable institutes in five states x 8 % penetration (derived, mostly assumption). Bear funding assumes no cost response.", { x: L, y: 3.9, w: 6.3, h: 0.4, fontSize: 9, italic: true, color: T.muted });
    sec(s, "B", "BASE CASE, YEAR BY YEAR (₹ LAKH)", L, 4.35, 6.3);
    const yr = [["Year 1", 18.9, -16.1, 28], ["Year 2", 48.0, -0.9, 51], ["Year 3", 65.3, 11.9, 58]];
    const base0 = 6.2, K = 0.024;
    yr.forEach((y, i) => {
      const x = L + 0.4 + i * 2.05;
      rect(s, x, base0 - y[1] * K * 1.0 - 0.0, 0.7, y[1] * K, T.tealDark);
      text(s, "₹" + y[1], { x: x - 0.1, y: base0 - y[1] * K - 0.26, w: 0.9, h: 0.24, fontSize: 10, bold: true, color: T.navy, align: "center" });
      const e = y[2]; rect(s, x + 0.78, e >= 0 ? base0 - e * K : base0, 0.55, Math.abs(e) * K, e >= 0 ? "5B8DC9" : T.red);
      text(s, (e >= 0 ? "+" : "") + e, { x: x + 0.68, y: e >= 0 ? base0 - e * K - 0.26 : base0 + Math.abs(e) * K + 0.01, w: 0.75, h: 0.24, fontSize: 9, color: T.muted, align: "center" });
      text(s, y[0] + "  ·  " + y[3] + " institutes", { x: x - 0.25, y: 6.68, w: 1.9, h: 0.22, fontSize: 9, color: T.ink });
    });
    rect(s, L, base0, 6.3, 0.015, T.grey);
    rect(s, L + 0.1, 6.88, 0.14, 0.14, T.tealDark); text(s, "revenue", { x: L + 0.28, y: 6.83, w: 0.8, h: 0.24, fontSize: 9, color: T.muted, valign: "middle" }); rect(s, L + 1.3, 6.88, 0.14, 0.14, "5B8DC9"); text(s, "EBITDA", { x: L + 1.48, y: 6.83, w: 0.8, h: 0.24, fontSize: 9, color: T.muted, valign: "middle" });
    sec(s, "C", "BY INSTITUTE SIZE (BASE)", 7.15, 1.28, 5.7);
    dtable(s, 7.15, 1.62, [2.4, 1.1, 1.1, 1.08], ["", "Small", "Mid", "Large"], [
      ["Students", "180", "400", "1,200"], ["Annual fee per student", "₹60,000", "₹75,000", "₹1,00,000"], ["Return, all benefits", "1.6x", b("1.7x"), "2.1x"],
      ["LTV ÷ CAC, field sales", "1.5x", b("3.6x"), "9.2x"], ["LTV ÷ CAC, channel partner", "3.4x", "4.9x", "6.1x"], ["Payback, months", "19", b("6"), "3"]],
      { rowH: 0.37, headH: 0.3, size: 10, headFills: [T.tealDark, T.muted, T.tealDark, T.muted], rowStyles: ["band", "white", "band", "white", "band", "white"] });
    rect(s, 7.15, 4.35, 5.73, 2.4, T.tint);
    text(s, "WHAT THIS MEANS FOR GO-TO-MARKET", { x: 7.3, y: 4.42, w: 5.4, h: 0.28, fontSize: 10.5, bold: true, color: T.tealDark, charSpacing: 0.5 });
    lines(s, ["Mid and large institutes: field sales pays.", "Small institutes: channel partners, not reps.", "One field rep at 8 % of the market.", "Raise ₹45 L, break even in month 16.", "Bear case needs ₹1 Cr: we stop if pilots fail."], 7.3, 4.78, 5.4, 1.9, { size: 10.5, gap: 5 });
    foot(s, "Source: financial model v1.1 (Projection, Scenarios; Bear, Base, Bull). Model output from sourced and assumed inputs; willingness to pay is untested. 1 Cr = 100 lakh (L).");
  }

  {
    const s = content("Appendix", "Appendix 3: 31 tables in five groups, all isolated per institute", "Data model", ["APPENDIX 3: DATA MODEL AND QUESTION TAGGING", 7]);
    kit.panels("mix");
    const groups = [["PEOPLE", "institutes, users, students, guardians, batches, batch_changes, consents, legal_settings"], ["LEARNING", "topics, topic_prereqs, questions, question_topics, item_params, tests, test_questions, answer_keys, marking_schemes"],
      ["RESULTS", "responses, test_totals, attendance, fees, engagement"], ["INTELLIGENCE", "mastery_snapshots, risk_scores, predictions, interventions, reports, model_registry"], ["OPERATIONS", "ingest_jobs, omr_templates, audit_log"]];
    groups.forEach((g, i) => {
      const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.25, w = 4.05;
      frame(s, x, y, w, 2.1, g[0]);
      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.5, fontSize: 12 });
    });
    frame(s, L + 2 * 4.18, 3.8, 4.05, 1.65, "DELIBERATELY NOT STORED");
    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.2, 3.7, 1.2, { size: 11, gap: 3 });
    text(s, "HOW EVERY QUESTION GETS ITS TOPIC (SO TAGGING COSTS FALL AS WE GROW)", { x: L, y: 5.55, w: 8, h: 0.24, fontSize: 10, bold: true, color: T.tealDark, charSpacing: 0.5 });
    chevrow(s, L, 5.83, 8.0, 0.5, [{ t: "Question text" }, { t: "Shortlist" , sub: "embedding" }, { t: "Local model picks" }, { t: "Teacher 1-tap" }, { t: "Shared bank" }], { size: 9, depth: 0.16 });
    labelBar(s, L, 6.4, CWD, "Row-level security on every tenant table; another institute sees 0 rows (tested on PostgreSQL 16)", { h: 0.34, size: 12, fill: T.tealDark });
    source(s, "Source: technical/contracts/schema.sql. Synthetic data: 4 institutes, 3 academic years, known ground truth.");
  }

  {
    const s = content("Appendix", "Appendix 4: the rules we design against, and what we do about each", "Legal basis", ["APPENDIX 4: LEGAL BASIS", 7]);
    kit.panels("plain");
    frame(s, L, 1.22, CWD, 5.7, null);
    dtable(s, L + 0.1, 1.35, [3.3, 8.9], ["Rule", "Our response"], [
      ["DPDP Act s.9(1), Rule 10", "Verifiable parental consent before processing a minor's data: ID checked at the admission desk, consent recorded per purpose."],
      ["DPDP Act s.9(3)", "No tracking or behavioural monitoring of children: under 18, academic support uses a model; dropout and fee signals use plain rules."],
      ["Fourth Schedule, educational institutions", "Narrow and purpose-limited, so we do not rely on it for consent."],
      ["DPDP Rules, Rules 6 and 7", "Encryption, access control, logs kept one year, breach notice to the institute within hours."],
      ["MoE Guidelines 2024, cl. 10.2(xi)", "Results stay private; early warning leads to counselling, never public ranks."],
      ["MoE Guidelines 2024, cl. 12(vii)", "No batch moves based on performance; remedial help is an extra session."],
      ["MoE Guidelines 2024, cl. 8(iv), 10.1", "Pro-rata refund within 10 days; no test the day after the weekly off."],
      ["Rajasthan Act 2025, s.6(2)(d)", "Fee plans support four or more equal instalments."]],
      { rowH: 0.62, headH: 0.34, size: 11, leftCols: [1] });
    source(s, "Sources: DPDP Act 2023, DPDP Rules 2025, MoE Guidelines 2024, Rajasthan Coaching Centres Act 2025 (technical/docs/TECH_PLAN.md, section 24). Not legal advice.");
  }

  {
    const s = content("Appendix", "Appendix 5: how we will know each model works before an institute relies on it", "Validation plan and model card", ["APPENDIX 5: MODEL CARD AND GO-LIVE GATES", 7]);
    sec(s, "A", "HOW WE SPLIT AND COMPARE", L, 1.22, 4);
    const sp = [["By student and by year", "Features use only data before the as-of date; never split by row."], ["Baselines at equal workload", "Each model sits beside the institute's own rule at the same weekly list size."], ["Uncertainty", "Bootstrap intervals over students; three generator seeds; event counts shown."], ["Stress tests", "Misspecified generators, a held-out institute, an independent attack on the report checker."], ["Honest misses", "A missed gate is reported with its cause; gates are never moved to pass."]];
    sp.forEach((p, i) => {
      const y = 1.6 + i * 0.66;
      rect(s, L, y, 0.08, 0.58, T.tealDark);
      text(s, p[0], { x: L + 0.18, y, w: 3.8, h: 0.24, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, p[1], { x: L + 0.18, y: y + 0.24, w: 3.8, h: 0.36, fontSize: 9, color: T.ink });
    });
    sec(s, "C", "KNOWN LIMITATIONS, STATED", L, 4.98, 4);
    lines(s, ["Synthetic data proves the pipeline, not real-world accuracy.", "OULAD is a UK online university; ASSISTments is US school maths.", "The percentile mapping is an editable assumption table until real mock-vs-exam pairs exist."], L, 5.32, 4.0, 1.5, { size: 9.5, gap: 3 });
    const mx = 4.75, mw = R - 4.75;
    sec(s, "B", "METRICS AND GATES (FROM contracts/metrics_bars.yaml)", mx, 1.22, mw);
    const ok = (t) => ({ t, bold: true, color: T.tealDark, fill: C2.green });
    const pd = { t: "pending", bold: true, color: T.navy, fill: C2.gold };
    dtable(s, mx, 1.58, [1.55, 3.6, 1.15, mw - 6.3], ["Component", "Metric", "Gate", "Status"], [
      ["Difficulty (IRT)", "Recovery r(b̂, b) at 60 answers per item; at 30 answers", "≥ 0.90; ≥ 0.85", pd],
      ["Wrong-key detector", "Recall on planted wrong keys; false flags per 300 items", "≥ 0.80; ≤ 2", pd],
      ["Topic mastery", "Ability recovery r; next-test AUC vs raw % and BKT", "≥ 0.80; better", pd],
      ["Knowledge tracing", "Next-answer AUC, ASSISTments 2009 (public)", "report", ok("0.763")],
      ["Early warning", "AUC-PR vs institute rule; precision at capacity vs rule", "+30 %; +25 %", pd],
      ["Early warning", "Calibration error (public: OULAD day 28)", "< 0.05", ok("0.009")],
      ["Early warning", "Median lead time before a student leaves", "≥ 21 days", pd],
      ["Withdrawal, public", "OULAD day-28 AUC, student-grouped 5-fold", "report", ok("0.706")],
      ["Fairness", "Largest recall gap across slices (gender, city tier)", "≤ 0.10", pd],
      ["Percentile range", "Coverage of the 80 % band", "77 to 83 %", pd],
      ["Parent reports", "Numbers matching the facts; independent attack passes", "100 %", pd]],
      { rowH: 0.42, headH: 0.3, size: 9.5, leftCols: [1], rowStyles: Array(11).fill(0).map((_, i) => i % 2 ? "white" : "band") });
    source(s, "Sources: technical/contracts/metrics_bars.yaml, technical/docs/agent_prompts/R1_00_COMMON.md, ml/public_validation. Pending gates are filled from metrics.json by technical/scripts/deck_numbers.py.");
  }

  {
    const s = content("Appendix", "Appendix 6: where the case's twelve questions are answered, and how strong the evidence is", "Problem statement coverage", ["APPENDIX 6: CASE QUESTIONS, ANSWERED", 7]);
    const E = (t, c) => ({ t, bold: true, color: T.white, fill: c });
    const M_ = E("Measured", T.tealDark), D_ = E("Designed", T.teal), B_ = E("Built", T.tealDark), A_ = E("Assumption", "B5832A");
    const rowsL = [
      ["T1", "Data capture, offline, low effort", "Slides 5, 6", D_], ["T2", "Data model; tagging questions to topics", "Appendix 3", B_], ["T3", "Mastery and question difficulty", "Slide 7", M_], ["T4", "Early warning: dropout, behind, fees", "Slide 8", M_],
      ["T5", "Percentile range, honest uncertainty", "Slide 9", D_], ["T6", "GenAI: reports, plans, doubts", "Slide 9", B_], ["T7", "Multi-tenant, secure, low-cost", "Slides 5, 11", B_], ["T8", "Privacy and safety for minors", "Slide 10, App. 4", B_]];
    const rowsR = [
      ["B1", "Buyer and measurable return", "Slide 11, App. 1", A_], ["B2", "Pricing, CAC, payback, churn, LTV", "Slide 11, App. 1–2", A_], ["B3", "Cities, sizes, channels", "Slide 12", A_], ["B4", "Competition and a growing moat", "Slide 12", D_],
      ["R1", "Financial model with sensitivity", "App. 1–2", A_], ["R2", "Limits: what we did not prove", "Slide 13, App. 5", M_]];
    dtable(s, L, 1.3, [0.45, 3.2, 1.75, 0.85], ["#", "Technology (70 %)", "Where", "Evidence"], rowsL, { rowH: 0.52, headH: 0.32, size: 9.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: Array(8).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    dtable(s, L + 6.5, 1.3, [0.45, 3.0, 1.85, 0.95], ["#", "Market (30 %) and deliverables", "Where", "Evidence"], rowsR, { rowH: 0.52, headH: 0.32, size: 9.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: Array(6).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    sec(s, "i", "HOW TO READ THE EVIDENCE COLUMN", L + 6.5, 4.75, 5.9);
    lines(s, [{ t: "Measured: our own run on public data or the test suite." }, { t: "Built: working code with tests, on synthetic data." }, { t: "Designed: specified in the contracts, not coded yet." }, { t: "Assumption: a model input with a range, tested in pilots." }], L + 6.5, 5.1, 5.9, 1.2, { size: 10, gap: 3 });
    rect(s, L, 5.6, 6.2, 1.25, T.tint);
    text(s, [{ text: "Every slide states its limits. ", options: { bold: true, color: T.tealDark } }, { text: "We show an honest 4 % rather than a hopeful 25 %, and mark a gate pending rather than quote a number we have not measured. The case says teams that state limits score higher." }], { x: L + 0.15, y: 5.6, w: 5.9, h: 1.25, fontSize: 10.5, color: T.ink, valign: "middle" });
    foot(s, "Source: Participant Guide sections 4, 8 and 10 (questions and rubric). T = technology question, B = business question, R = round-1 deliverable or limit.");
  }
  {
    const s = content("Appendix", "Appendix 7: every external number in the deck, where it came from, and where we used it", "Source register", ["APPENDIX 7: SOURCE REGISTER", 7]);
    dtable(s, L, 1.3, [0.35, 4.1, 4.6, 2.0, CWD - 11.05], ["#", "Source", "Used for", "Confidence", "Slide"], [
      ["1", "NTA NEET UG 2025 result data (via Careers360, ALLEN)", "22.76 lakh registered candidates", "High (official)", "3"],
      ["2", "JEE Main 2025 statistics (Vedantu; NTA total not found)", "About 15.4 lakh unique registrations", "Medium (secondary)", "3"],
      ["3", "NSO Comprehensive Modular Survey: Education 2025", "27 % of school students in private coaching", "High (official)", "3"],
      ["4", "Case participant guide", "8 to 15 % dropout, ₹36,000 per leaver, ₹17.3 lakh, ₹40, 25 %", "Illustrative", "3, 4"],
      ["5", "Vendor listings: Classplus, Fedena, Edmingle, Teachmint (research R1)", "₹4 to ₹40 per student per month anchors", "Medium", "4, 12"],
      ["6", "Outreach trials in comparable settings (research R4)", "Effect of outreach on dropout, 5 to 30 %", "Medium", "A1"],
      ["7", "OULAD (Open University, CC BY 4.0), our runs", "0.706 AUC, 0.009 calibration, 0.46 precision", "Measured", "1, 4, 8"],
      ["8", "PLOS ONE 2026, OULAD withdrawal study", "Published 0.727 / 0.794 / 0.804 anchors", "High", "4, 8"],
      ["9", "Liu et al., pyKT, NeurIPS 2022; ASSISTments 2009, our runs", "DKT 0.754, SAKT 0.725, AKT 0.785; ours 0.763", "Measured", "1, 7"],
      ["10", "DPDP Act 2023 s.9; DPDP Rules 2025", "Parental consent, no tracking of children", "High (primary)", "4, 8, 10"],
      ["11", "MoE Guidelines for Coaching Centres 2024; Rajasthan Act 2025", "cl. 10.2(xi), 12(vii), 10.1, 8(iv); s.6(2)(d)", "High (primary)", "10, A4"],
      ["12", "WhatsApp and LLM price pages; Patna pay data (research R5, R6)", "Cost per student, staff hour ₹100", "Medium to high", "5, 11"],
      ["13", "Financial model v1.1 (CFO audit, 22 Oct 2026)", "Return, LTV/CAC, payback, margin, 3-year plan, scenarios", "Model output", "2, 4, 11–13, A1–A2"]],
      { rowH: 0.38, headH: 0.3, size: 9.5, leftCols: [1, 2, 3], rowStyles: Array(13).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    foot(s, "Full citations with URLs and licences: technical/docs/CITATIONS.md and financial/research. Every model number traces to the financial workbook or a metrics.json file.");
  }

  // ================================================================ FINAL
  pres.addSection({ title: "Closing" });
  {
    const s = pres.addSlide({ masterName: "CLOSING", sectionTitle: "Closing" });
    s.addText("How we used AI, and what we cited", { placeholder: "title" });
    const cw = (CWD - 0.3) / 2;
    [["AI tools", ["Claude: planning, code review, documentation.", "Google Antigravity agents: code generation.", "Perplexity and Gemini Deep Research: literature and regulation research.", "Everything was reviewed and tested by the team; research claims were checked against primary sources where possible."], 0],
      ["Public data and libraries", ["OULAD (CC BY 4.0), ASSISTments 2009, the pyKT benchmark, JEEBench.", "Noto Sans Devanagari (SIL OFL), LightGBM, Ollama, FastAPI, PostgreSQL.", "Full list with licences: technical/docs/CITATIONS.md in the repository."], 2]].forEach((c, i) => {
      const x = L + i * (cw + 0.3), a = kit.acc(c[2]);
      s.addShape("roundRect", { x, y: 1.7, w: cw, h: 4.6, rectRadius: 0.02, fill: { color: a.t }, line: { color: a.c, width: 1.5 } });
      s.addShape("roundRect", { x: x + 0.3, y: 1.9, w: 2.8, h: 0.45, rectRadius: 0.02, fill: { color: a.c }, line: { type: "none" } });
      text(s, c[0], { x: x + 0.3, y: 1.9, w: 2.8, h: 0.45, fontSize: 15, bold: true, color: a.on, fontFace: F.head, align: "center", valign: "middle" });
      text(s, c[1].map((t, k) => ({ text: t, options: { breakLine: k < c[1].length - 1, paraSpaceAfter: 10, bullet: { indent: 14 } } })), { x: x + 0.3, y: 2.6, w: cw - 0.6, h: 3.6, fontSize: 17, color: T.ink });
    });
    text(s, "github.com/AdityaKuranjekar/institute-intelligence-platform", { x: 5.0, y: 6.7, w: 7.88, h: 0.45, fontSize: 13, color: T.muted, align: "right", valign: "middle" });
    s.addNotes("Mandatory disclosure (Problem Statement, rule 2). Keep this as the last slide of the submitted PDF.");
  }

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
