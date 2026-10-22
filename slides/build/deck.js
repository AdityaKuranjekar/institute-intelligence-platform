// Builds slides/AlphaQ_CaseB_Round1.pptx (v5: blue consulting style, 12 content slides). Run: node deck.js  (from slides/build)
// Needs slides/assets/*.png from: python export_html.py && python charts.py
const pptxgen = require("pptxgenjs");
const path = require("path");
const { T, ACC, F, W, H, makeKit } = require("./lib");
const { extend, C2 } = require("./lib2");
const M = require("./mocks");

const OUT = path.join(__dirname, "..", "AlphaQ_CaseB_Round1.pptx");
const L = 0.45, CWD = 12.433, R = L + CWD;

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "AlphaQ: Case B, The Data Moat (Round 1)";
  pres.author = "AlphaQ";
  pres.company = "AlphaQ";
  pres.theme = { headFontFace: F.head, bodyFontFace: F.body };
  const kit = extend(makeKit(pres), pres);
  const { text, rect, ellipse, line, icon, pill, tag, source, frame, hdrBar, labelBar, callout, dtable, heat, badge, abadge, lines, rubric, pic, chevrow, funnel, loop } = kit;
  let nb = 0;

  const titleBox = { name: "title", type: "title", x: L, y: 0.14, w: 9.2, h: 0.48, fontFace: F.head, fontSize: 24, bold: true, color: T.tealDark, valign: "middle", margin: 0 };
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
      { rect: { x: 12.3, y: 7.14, w: 0.58, h: 0.3, fill: { color: T.tealDark } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.14, w: 0.58, h: 0.3, fontFace: F.body, fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" },
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
    { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
    { placeholder: { options: { name: "title", type: "title", x: L, y: 1.5, w: 5.7, h: 2.2, fontFace: F.head, fontSize: 30, bold: true, color: T.tealDark, valign: "top", margin: 0 }, text: "" } }] });

  const NAVTABS = ["Summary", "Problem", "Product", "Technology", "Trust", "Business", "Validation", "Appendix"];
  // content(section, subtitle, rubric, [HEADING, tab index]); appendix subtitles drop their "Appendix N: " prefix
  const content = (section, title, rub, head) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    s.addText(head[0], { placeholder: "title" });
    const sub = title.replace(/^Appendix \d+: /, "");
    text(s, sub.charAt(0).toUpperCase() + sub.slice(1), { x: L, y: 0.6, w: CWD, h: 0.34, fontSize: 14.5, color: T.muted, valign: "middle" });
    rect(s, L, 0.98, CWD, 0.025, T.tealDark);
    rubric(s, rub);
    kit.nav(s, NAVTABS, head[1]);
    return s;
  };
  // numbered section label inside a slide (dark square with the number, caps title)
  const sec = (s, n, label, x, y, w) => {
    rect(s, x, y, 0.28, 0.28, T.tealDark);
    text(s, String(n), { x, y, w: 0.28, h: 0.28, fontSize: 11.5, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, label, { x: x + 0.36, y, w: w - 0.36, h: 0.28, fontSize: 12, bold: true, color: T.tealDark, valign: "middle", charSpacing: 0.5 });
  };

  // ================================================================ TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    rect(s, 6.35, 0.45, 6.55, 6.45, T.orangeT);
    text(s, "CASE B  ·  THE DATA MOAT", { x: L, y: 0.75, w: 5.8, h: 0.3, fontSize: 13, bold: true, color: T.teal, charSpacing: 2 });
    rect(s, L, 1.1, 5.7, 0.025, T.tealDark);
    s.addText("Intelligence for the coaching institutes that run on Excel, OMR sheets and WhatsApp", { placeholder: "title" });
    text(s, "Pragati turns one upload into a topic map, a weekly support list and a verified Hindi and English parent report, on the web and on the phone. Offline, private, free to run.", { x: L, y: 3.7, w: 5.5, h: 1.0, fontSize: 14.5, color: T.ink });
    const kp = [["0.763", "AUC on ASSISTments (public data)"], ["0.706", "AUC on OULAD, day 28 (public data)"], ["₹3.6", "per student per month, all-in (model)"]];
    kp.forEach((k, i) => {
      const x = L + i * 1.95;
      rect(s, x, 5.2, 1.8, 0.3, T.tealDark);
      text(s, k[0], { x, y: 5.2, w: 1.8, h: 0.3, fontSize: 14, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x, y: 5.5, w: 1.8, h: 0.75, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      text(s, k[1], { x: x + 0.08, y: 5.55, w: 1.64, h: 0.65, fontSize: 10.5, color: T.ink, align: "center", valign: "middle" });
    });
    text(s, "Team AlphaQ  ·  Round 1  ·  Nextute x Finance Club, IIT Patna", { x: L, y: 6.7, w: 5.8, h: 0.4, fontSize: 11.5, color: T.muted, valign: "middle" });
    pic(s, "web_console.png", 6.55, 0.7, 6.15, 3.46, "Pragati web console (illustrative)");
    pic(s, "app_scan.png", 7.0, 3.4, 1.7, 3.4, "Pragati scan screen on a phone (illustrative)");
    pic(s, "app_mentor.png", 8.85, 3.15, 1.7, 3.4, "Pragati mentor app (illustrative)");
    pic(s, "app_parent.png", 10.7, 3.4, 1.7, 3.4, "Pragati parent app (illustrative)");
    text(s, "Illustrative mock-ups, synthetic data", { x: 10.2, y: 6.95, w: 2.7, h: 0.25, fontSize: 9, italic: true, color: T.muted, align: "right" });
    s.addNotes("Title. Right-hand screens are illustrative mock-ups rendered from HTML with synthetic values: the web console and three phone screens. The two AUC figures are results on public datasets (ASSISTments 2009 under the pyKT protocol, OULAD day 28); the 3.6 rupee figure is the model's all-in cost per student per month.");
  }

  // ================================================================ EXECUTIVE SUMMARY
  pres.addSection({ title: "Summary" });
  {
    const s = content("Summary", "Small institutes already hold the data; Pragati turns it into weekly action, at a cost they can say yes to", "All criteria · one-page view", ["EXECUTIVE SUMMARY", 0]);
    // ---- left: situation, complication, resolution
    const scr = [["SITUATION", [{ text: "Tier-2 and Tier-3 JEE/NEET institutes (150 to 1,200 students) run on " }, { text: "paper OMR sheets, Excel and WhatsApp.", options: { bold: true } }, { text: " 22.8 lakh NEET and about 15.4 lakh JEE Main candidates registered in 2025." }]],
      ["COMPLICATION", [{ text: "A 400-student institute loses about " }, { text: "₹17 lakh a year", options: { bold: true } }, { text: " to mid-session dropouts, noticed only after students leave. Generic apps store marks but give no topic view or warning, and " }, { text: "DPDP s.9(3) bars behavioural tracking of minors.", options: { bold: true } }]],
      ["RESOLUTION", [{ text: "Pragati: ", options: { bold: true } }, { text: "OMR photo or Excel in, then topic mastery, a weekly support list with plain reasons, and checked Hindi and English parent reports. Runs offline on one laptop for " }, { text: "₹3.6 per student per month.", options: { bold: true } }]]];
    scr.forEach((c, i) => {
      const y = 1.22 + i * 1.08;
      rect(s, L, y, 1.25, 0.98, i === 1 ? T.teal : T.tealDark);
      text(s, c[0], { x: L, y, w: 1.25, h: 0.98, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1 });
      s.addShape("rect", { x: L + 1.25, y, w: 4.85, h: 0.98, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      text(s, c[1], { x: L + 1.38, y: y + 0.04, w: 4.62, h: 0.9, fontSize: 10.5, color: T.ink, valign: "middle" });
    });
    hdrBar(s, L, 4.5, 6.1, "WHY IT WINS ON THE RUBRIC (70 % TECHNOLOGY · 30 % BUSINESS)", { h: 0.3, size: 10.5 });
    const rb = [["FaSitemap", "Architecture 25", "Local-first, 31 tables with row-level security tested on PostgreSQL 16; 116 automated tests."],
      ["FaChartLine", "ML rigour 25", "Measured on public data against baselines: 0.763 AUC (DKT 0.754); precision 0.46 vs 0.24 to 0.31 for rules."],
      ["FaUserShield", "Privacy and safety 20", "Age- and purpose-aware routing; academic-only features cost just 0.008 AUC; every report checked."],
      ["FaIndianRupeeSign", "Business 30", "2.9x institute return in base, 1.0x on fees and staff time alone; LTV/CAC 3.7x with the bear case shown."]];
    for (let i = 0; i < 4; i++) {
      const x = L + (i % 2) * 3.08, y = 4.88 + Math.floor(i / 2) * 1.02;
      s.addShape("rect", { x, y, w: 3.02, h: 0.94, fill: { color: T.tint }, line: { color: T.line, width: 0.75 } });
      await abadge(s, rb[i][0], x + 0.1, y + 0.1, 0.36, i);
      text(s, rb[i][1], { x: x + 0.54, y: y + 0.07, w: 2.4, h: 0.28, fontSize: 11, bold: true, color: T.tealDark, valign: "middle" });
      text(s, rb[i][2], { x: x + 0.54, y: y + 0.36, w: 2.42, h: 0.56, fontSize: 9, color: T.ink });
    }
    // ---- right: KPI tiles
    const rx = 6.75, rw = R - 6.75;
    const kp = [["0.763", "next-answer AUC on ASSISTments", "PUBLIC DATA"], ["0.46", "precision at top 10 % (rules 0.24 to 0.31)", "PUBLIC DATA"], ["2.9x", "institute return, base case", "MODEL OUTPUT"], ["₹3.6", "all-in cost per student per month", "MODEL OUTPUT"]];
    const kw = (rw - 0.3) / 4;
    kp.forEach((k, i) => {
      const x = rx + i * (kw + 0.1);
      s.addShape("rect", { x, y: 1.22, w: kw, h: 1.18, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, 1.22, kw, 0.06, T.tealDark);
      text(s, k[0], { x, y: 1.3, w: kw, h: 0.48, fontSize: 24, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 0.06, y: 1.77, w: kw - 0.12, h: 0.42, fontSize: 9, color: T.ink, align: "center", valign: "middle" });
      text(s, k[2], { x, y: 2.17, w: kw, h: 0.2, fontSize: 7.5, bold: true, color: T.muted, align: "center", valign: "middle", charSpacing: 1 });
    });
    // ---- the loop
    hdrBar(s, rx, 2.52, rw, "THE PRAGATI LOOP: CAPTURE → STRUCTURE → ESTIMATE → FLAG → ACT → REPORT", { h: 0.28, size: 10 });
    const lp = [["FaCamera", "Capture", "OMR photo, Excel, Forms"], ["FaDiagramProject", "Structure", "380-topic syllabus graph"], ["FaBrain", "Estimate", "Difficulty and mastery"], ["FaFlag", "Flag", "Weekly list, plain reasons"], ["FaHandshake", "Act", "Call, remedial session"], ["FaFileLines", "Report", "Checked Hindi / English"]];
    const lw = rw / 6;
    for (let i = 0; i < 6; i++) {
      const cx = rx + i * lw;
      if (i < 5) kit.line(s, cx + lw / 2 + 0.3, 3.15, cx + lw * 1.5 - 0.3, 3.15, { color: T.line, w: 1.5, arrow: true });
      await abadge(s, lp[i][0], cx + lw / 2 - 0.27, 2.88, 0.54, i);
      text(s, lp[i][1], { x: cx, y: 3.46, w: lw, h: 0.22, fontSize: 10, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, lp[i][2], { x: cx + 0.03, y: 3.67, w: lw - 0.06, h: 0.36, fontSize: 8.5, color: T.muted, align: "center" });
    }
    // ---- build choices
    dtable(s, rx, 4.1, [1.15, 3.2, rw - 4.35], ["Build choice", "What we use", "Why"], [
      ["OMR capture", "Corner marks and QR; unclear bubbles sent back", "No scanner, works offline"],
      ["Topic mastery", "2-parameter IRT, guessing prior; Rasch if small", "Explains itself on sparse tests"],
      ["Early warning", "Calibrated LightGBM; rules for minors' dropout", "Legal for under-18s"],
      ["Percentile", "Quantile model, conformal band, NTA table", "A range, never a rank promise"],
      ["Parent report", "Facts, local model, 8 checks, template fallback", "No invented numbers"]],
      { rowH: 0.27, headH: 0.27, size: 9, headFill: T.tealDark, leftCols: [1, 2] });
    // ---- the moat
    rect(s, rx, 5.82, rw, 1.1, T.tealDark);
    await icon(s, "FaLayerGroup", rx + 0.2, 6.1, 0.5, T.white);
    text(s, "THE MOAT", { x: rx + 0.9, y: 5.88, w: 3, h: 0.28, fontSize: 12, bold: true, color: "F1D9A0", valign: "middle", charSpacing: 1 });
    text(s, "Every institute adds answers that sharpen question difficulty for all (pooled item statistics, no raw child records shared), and every logged call teaches which actions work. A new rival starts with an uncalibrated question bank and no outcome history.", { x: rx + 0.9, y: 6.15, w: rw - 1.05, h: 0.74, fontSize: 9.5, color: T.white });
    source(s, "Sources: NTA NEET UG 2025 result data; JEE Main 2025 unique registrations as reported (secondary); case guide baselines; public validation results; financial workbook (Base). Full register: Appendix 10.");
    s.addNotes("Executive summary in situation, complication, resolution form. Public-data figures are measured (ASSISTments 2009 pyKT protocol; OULAD day 28). 2.9x and 3.6 rupees are model outputs from the financial workbook; 1.0x is the return from fees retained plus staff time only, without the admissions-uplift assumption.");
  }

  pres.addSection({ title: "Problem" });
  // ================================================================ 1 PROBLEM
  {
    const s = content("Problem", "Institutes hold the data, but notice a struggling student only after they leave", "Problem framing · Participant Guide §2, §7", ["THE PROBLEM AND THE MARKET", 1]);
    kit.panels("tab");
    frame(s, L, 1.22, 4.75, 2.9, "WHO LOSES TODAY");
    const pers = [["FaChalkboardUser", "Teachers", "Learn which topics are weak only after the exam.", T.navy],
      ["FaBuilding", "Owners", "Cannot compare batches or teaching methods.", T.tealDark],
      ["FaUsers", "Parents", "Get a marks list and little else, so trust suffers.", T.navy],
      ["FaChildReaching", "Students", "Noticed only after they stop paying or coming.", T.tealDark]];
    for (let i = 0; i < 4; i++) {
      const y = 1.62 + i * 0.6;
      await abadge(s, pers[i][0], L + 0.15, y, 0.46, nb++);
      text(s, pers[i][1], { x: L + 0.75, y, w: 1.0, h: 0.46, fontSize: 12.5, bold: true, color: T.navy, valign: "middle", fontFace: F.head });
      text(s, pers[i][2], { x: L + 1.75, y, w: 2.9, h: 0.46, fontSize: 11, valign: "middle" });
    }
    const x2 = 5.3, w2 = 4.35;
    frame(s, x2, 1.22, w2, 2.9, "WHERE THE DATA LIVES");
    const src = [["FaFileLines", "Paper OMR sheets", "Marks kept; per-question answers rarely are."], ["FaFileExcel", "Excel and registers", "Headers, names and dates differ file to file."], ["FaWhatsapp", "WhatsApp groups", "Photos and chats, with no structure to analyse."]];
    for (let i = 0; i < 3; i++) {
      const y = 1.62 + i * 0.66;
      rect(s, x2 + 0.15, y, w2 - 0.3, 0.58, C2.soft);
      await abadge(s, src[i][0], x2 + 0.22, y + 0.07, 0.44, nb++);
      text(s, src[i][1], { x: x2 + 0.78, y, w: 1.6, h: 0.58, fontSize: 11.5, bold: true, valign: "middle" });
      text(s, src[i][2], { x: x2 + 2.35, y, w: w2 - 2.55, h: 0.58, fontSize: 10.5, valign: "middle" });
    }
    labelBar(s, x2 + 0.15, 3.68, w2 - 0.3, "Result: no topic view, no early warning", { h: 0.3, size: 11.5, fill: T.blueD });
    const x3 = 9.75, w3 = R - 9.75;
    frame(s, x3, 1.22, w3, 2.9, "WHAT IT COSTS");
    const ks = [["8-15 %", "of students drop out or default mid-session"], ["₹36,000", "fees lost per dropout at month 4"], ["₹17.3 lakh", "fees at risk a year (400 students, 12 %)"]];
    ks.forEach((k, i) => {
      const y = 1.6 + i * 0.7;
      rect(s, x3 + 0.12, y, w3 - 0.24, 0.64, C2.gold);
      text(s, k[0], { x: x3 + 0.2, y, w: 1.45, h: 0.64, fontSize: 18, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      text(s, k[1], { x: x3 + 1.62, y, w: w3 - 1.8, h: 0.64, fontSize: 10, valign: "middle" });
    });
    tag(s, "ps", x3 + 0.12, 3.76, { size: 8, h: 0.2 });
    frame(s, L, 4.25, 4.75, 2.7, "WHO WE SERVE");
    const mk = [["22.8 L", "NEET UG 2025 registered candidates", "NTA result data"], ["15.4 L", "JEE Main 2025 unique registrations", "reported, secondary"], ["27 %", "of school students take private coaching", "NSO survey 2025"]];
    mk.forEach((m, i) => {
      const y = 4.68 + i * 0.5;
      text(s, m[0], { x: L + 0.15, y, w: 1.1, h: 0.44, fontSize: 18, bold: true, color: T.tealDark, valign: "middle" });
      text(s, [{ text: m[1], options: { breakLine: true } }, { text: m[2], options: { italic: true, color: T.muted, fontSize: 8.5 } }], { x: L + 1.3, y, w: 3.35, h: 0.44, fontSize: 10, color: T.ink, valign: "middle" });
    });
    rect(s, L + 0.12, 6.2, 4.51, 0.65, T.tint);
    text(s, [{ text: "Ceiling, not a forecast: ", options: { bold: true, color: T.tealDark } }, { text: "if every JEE and NEET aspirant's institute paid ₹30 a month, the pool is about ₹137 crore a year (38 lakh x ₹360)." }], { x: L + 0.2, y: 6.2, w: 4.35, h: 0.65, fontSize: 9, color: T.ink, valign: "middle" });
    frame(s, 5.3, 4.25, 4.35, 2.7, "THE BUYER'S CONSTRAINTS");
    const cons = [["FaIndianRupeeSign", "Price-sensitive", "Generic apps cost ₹4 to ₹21 per student per month today."], ["FaTable", "Low-tech staff", "Excel, registers and the phone camera."], ["FaWifi", "Patchy internet", "So it must work offline, on one laptop."], ["FaUserShield", "Minors' data", "DPDP Act and MoE coaching rules apply."]];
    for (let i = 0; i < 4; i++) {
      const x = 5.42 + (i % 2) * 2.1, y = 4.65 + Math.floor(i / 2) * 1.12;
      rect(s, x, y, 2.0, 1.02, C2.soft);
      await abadge(s, cons[i][0], x + 0.08, y + 0.08, 0.36, nb++);
      text(s, cons[i][1], { x: x + 0.5, y: y + 0.05, w: 1.45, h: 0.4, fontSize: 11, bold: true, valign: "middle" });
      text(s, cons[i][2], { x: x + 0.08, y: y + 0.48, w: 1.85, h: 0.52, fontSize: 9.5 });
    }
    frame(s, x3, 4.25, w3, 2.7, "WHAT PRAGATI DOES");
    const wd = ["Topic-level view of every student", "A short, supportive list each week", "An honest percentile range", "Verified Hindi and English reports", "Runs offline, free to run"];
    for (let i = 0; i < wd.length; i++) {
      await icon(s, "FaCircleCheck", x3 + 0.16, 4.72 + i * 0.37, 0.22, T.tealDark);
      text(s, wd[i], { x: x3 + 0.48, y: 4.66 + i * 0.37, w: w3 - 0.6, h: 0.34, fontSize: 10.5, valign: "middle" });
    }
    labelBar(s, x3 + 0.12, 6.58, w3 - 0.24, "Next: how it works", { h: 0.27, size: 10.5 });
    source(s, "Sources: Participant Guide sections 2, 6 and 7 (illustrative baselines); NTA NEET UG 2025 result data; JEE Main 2025 statistics (secondary); NSO CMS: Education 2025; competitor prices from financial/research R1.");
    s.addNotes("Dense problem slide. The 8-15 percent and 36,000 rupee figures and the 17.3 lakh total are the guide's illustrative baselines (400 x 12% x 36,000). The roster index is an assumption in the financial model; competitor price range comes from the finance research (listed prices, low-medium confidence).");
  }

  // ================================================================ STRESS-TEST THE GUIDE
  {
    const s = content("Problem", "The guide's example looks great on paper. Here is where each number breaks, and what we build instead", "Feasibility · business realism", ["STRESS-TESTING THE GUIDE", 1]);
    sec(s, 1, "SIX ASSUMPTIONS, TESTED", L, 1.22, 8);
    const g = (t) => ({ t, bold: true, color: T.tealDark });
    dtable(s, L, 1.58, [1.75, 3.2, 3.2], ["Guide assumption", "What the evidence says", "What we do instead"], [
      [g("₹40 per student per month"), "Generic institute apps list at ₹4 to ₹21 per student per month. ₹40 x 400 students = ₹1.92 lakh a year.", "List ₹30, tested from ₹20 to ₹40. Willingness to pay goes to owner interviews first."],
      [g("25 % of dropouts prevented"), "8 trials in comparable settings average 15.8 % among students who get outreach; month-1 leavers cannot be flagged.", "Model 6.6 % effective reduction. Prove it with comparison batches in a pilot."],
      [g("Saved fees pay for the product"), "Fees retained return 0.75x of the cost on their own.", "Lead with staff time and parent reports: fees plus time reach 1.0x."],
      [g("LTV / CAC of 10.7x"), "Seasonal billing, 20 % post-exam non-renewal and pilots that do not convert.", "3.7x in base; small institutes go self-serve (1.5x)."],
      [g("Published AUC of 0.794"), "Our honest student-grouped estimate on OULAD is 0.706; leakage inflates many reported numbers.", "Judge on precision at mentor capacity: 0.46 vs 0.24 to 0.31 for rules."],
      [g("Track app activity for everyone"), "DPDP s.9(3) bans behavioural monitoring of children, even with consent.", "Academic data only for under-18s; it costs 0.008 AUC on OULAD."]],
      { rowH: 0.6, headH: 0.3, size: 9.5, headFill: T.tealDark, leftCols: [1, 2], rowStyles: ["white", "band", "white", "band", "white", "band"] });
    // ---- reframe
    const rx = 8.75, rw = R - 8.75;
    s.addShape("rect", { x: rx, y: 1.22, w: rw, h: 4.32, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    hdrBar(s, rx, 1.22, rw, "DECISION REFRAME", { h: 0.32, size: 11 });
    text(s, "The wrong question", { x: rx + 0.2, y: 1.66, w: rw - 0.4, h: 0.24, fontSize: 9.5, color: T.muted });
    text(s, "\"Can a model predict who drops out?\"", { x: rx + 0.2, y: 1.9, w: rw - 0.4, h: 0.32, fontSize: 13, bold: true, color: T.grey, strike: "sngStrike" });
    text(s, "The right question", { x: rx + 0.2, y: 2.32, w: rw - 0.4, h: 0.24, fontSize: 9.5, color: T.muted });
    text(s, "\"Of the eight students a mentor can call this week, are they the right eight, and does the call help?\"", { x: rx + 0.2, y: 2.56, w: rw - 0.4, h: 0.95, fontSize: 14, bold: true, color: T.tealDark });
    chevrow(s, rx + 0.15, 3.62, rw - 0.3, 0.42, [{ t: "Score" }, { t: "Explain" }, { t: "Assign" }, { t: "Log" }], { size: 10, depth: 0.16 });
    text(s, "A model with a high AUC that produces a list nobody calls is worth nothing. We cap the list at mentor capacity and judge the system on students retained and actions taken, not on AUC.", { x: rx + 0.2, y: 4.12, w: rw - 0.4, h: 0.8, fontSize: 10, color: T.ink });
    [["8", "students per batch per week: the list cap"], ["=", "same workload as the institute's own rule"], ["1", "logged outcome for every flag"]].forEach((k, i) => {
      const y = 4.9 + i * 0.2;
      text(s, k[0], { x: rx + 0.2, y, w: 0.35, h: 0.2, fontSize: 10.5, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, k[1], { x: rx + 0.6, y, w: rw - 0.8, h: 0.2, fontSize: 9, color: T.ink, valign: "middle" });
    });
    // ---- principles
    sec(s, 2, "FOUR DESIGN PRINCIPLES THAT FOLLOW", L, 5.68, 8);
    const pr = [["FaUserShield", "Support, never surveillance", "Risk lists go to mentors only; no ranks for students or parents."], ["FaUsers", "Sized to mentor capacity", "A short weekly list, compared with the institute's own rule at equal workload."],
      ["FaListCheck", "Every number checked", "Reports are verified in code; a template goes out if any check fails."], ["FaLaptop", "Free and offline first", "One laptop, local models, no paid services; syncs when the network returns."]];
    for (let i = 0; i < 4; i++) {
      const x = L + i * 3.13;
      s.addShape("rect", { x, y: 6.02, w: 3.04, h: 0.88, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, 6.02, 0.5, 0.88, T.tealDark);
      await icon(s, pr[i][0], x + 0.11, 6.28, 0.28, T.white);
      text(s, pr[i][1], { x: x + 0.6, y: 6.05, w: 2.38, h: 0.26, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, pr[i][2], { x: x + 0.6, y: 6.31, w: 2.38, h: 0.56, fontSize: 9, color: T.ink });
    }
    source(s, "Sources: case guide; financial/research (vendor listings R1, outreach trials R4); financial workbook (Base); OULAD results in ml/public_validation; PLOS ONE 2026; DPDP Act 2023 s.9(3).");
    s.addNotes("This slide shows judges we tested the guide's illustrative numbers instead of copying them. Every 'what we do' value is a workbook output or a measured public-data result. Mentor capacity of eight per batch per week is the cap used in the mock-ups and the early-warning evaluation.");
  }

  // ================================================================ PRODUCT
  pres.addSection({ title: "Product" });
  {
    const s = content("Product", "One product, two surfaces: a web console for the office and a phone app for mentors and parents", "Architecture · product", ["THE PRODUCT", 2]);
    s.addShape("rect", { x: L, y: 1.22, w: 6.4, h: 3.6, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
    pic(s, "web_console.png", L + 0.02, 1.24, 6.36, 3.56, "Pragati web console (illustrative)");
    hdrBar(s, L, 4.86, 6.4, "WEB CONSOLE · owner, teacher and compliance views", { h: 0.27, size: 10 });
    rect(s, 6.98, 1.22, R - 6.98, 3.6, T.orangeT);
    const ph = ["Scan an OMR sheet", "Mentor: this week's list", "Parent: Hindi or English"];
    ["app_scan.png", "app_mentor.png", "app_parent.png"].forEach((f, i) => pic(s, f, 7.08 + i * 1.94, 1.27, 1.75, 3.5, ph[i] + " (illustrative)"));
    hdrBar(s, 6.98, 4.86, R - 6.98, "PHONE APP · scan sheets, weekly list, parent view", { h: 0.27, size: 10 });
    // ---- who sees what
    sec(s, 1, "WHO SEES WHAT", L, 5.25, 7.9);
    const roles = [["FaBuilding", "Owner", "Web console", ["Batch comparison, retention", "Actions done, outcomes", "Compliance exports"]],
      ["FaChalkboardUser", "Teacher and mentor", "Web and phone", ["Topic heatmap, wrong keys", "Weekly list with reasons", "Log what was done"]],
      ["FaUserGraduate", "Student", "Phone (web app)", ["Own topic mastery", "Practice on weak topics", "Never a risk score"]],
      ["FaUsers", "Parent", "Phone or WhatsApp", ["Weekly Hindi / English note", "What improved, what next", "No peer ranks"]]];
    for (let i = 0; i < 4; i++) {
      const x = L + i * 1.98, y = 5.6;
      s.addShape("rect", { x, y, w: 1.9, h: 1.32, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      rect(s, x, y, 1.9, 0.3, T.tealDark);
      await icon(s, roles[i][0], x + 0.08, y + 0.05, 0.2, T.white);
      text(s, roles[i][1], { x: x + 0.34, y, w: 1.52, h: 0.3, fontSize: 10, bold: true, color: T.white, valign: "middle" });
      text(s, roles[i][2], { x: x + 0.08, y: y + 0.32, w: 1.76, h: 0.22, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
      lines(s, roles[i][3], x + 0.05, y + 0.54, 1.82, 0.78, { size: 8.5, gap: 1 });
    }
    // ---- a week with pragati
    const wx = 8.5, ww = R - 8.5;
    sec(s, 2, "A WEEK WITH PRAGATI", wx, 5.25, ww);
    const wk = [["Mon", "Weekly test on OMR; sheets scanned on a phone"], ["Mon pm", "Topic map and wrong-key flags for the teacher"], ["Tue", "Mentor list of up to 8, each with reasons"], ["Wed", "Remedial session for the weakest topic"], ["Sat", "Checked Hindi / English note to parents"], ["Month", "Owner sees actions taken and outcomes"]];
    wk.forEach((w, i) => {
      const y = 5.6 + i * 0.22;
      rect(s, wx, y + 0.01, 0.72, 0.2, i % 2 ? T.teal : T.tealDark);
      text(s, w[0], { x: wx, y: y + 0.01, w: 0.72, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, w[1], { x: wx + 0.8, y, w: ww - 0.8, h: 0.22, fontSize: 9, color: T.ink, valign: "middle" });
    });
    source(s, "Illustrative mock-ups with synthetic students. Both surfaces use one API; the phone app is a progressive web app installed from the browser (no app-store fee).");
    s.addNotes("Product slide. Web console for the office, phone screens for scanning, mentors and parents. Who-sees-what follows the routing policy: risk lists only for mentors and owners; students and parents never see risk scores or ranks.");
  }

  pres.addSection({ title: "Technology" });
  // ================================================================ 3 ARCHITECTURE (full-bleed)
  {
    const s = pres.addSlide({ masterName: "FULL", sectionTitle: "Technology" });
    s.addImage({ path: path.join(__dirname, "..", "assets", "arch_under_the_hood.png"), x: 0, y: 0, w: W, h: H, altText: "System architecture: capture, structure, intelligence, deliver, with a trust layer underneath" });
    s.addNotes("Architecture. Status tags: BUILT means working code with tests; IN BUILD means in progress; DESIGNED means specified but not coded. Evidence boxes are real: 12 messy export files and 210 synthetic OMR images exist; 31 tables and tenant isolation tested on a live PostgreSQL 16; OULAD 0.706 and ASSISTments 0.763 on public data; 20 templates and 8 checks.");
  }

  // ================================================================ 4 LEARNING ANALYTICS
  {
    const s = content("Technology", "We estimate what each student knows, topic by topic, and say how sure we are", "ML rigour 25 % · learning analytics", ["LEARNING ANALYTICS", 3]);
    kit.panels("tab");
    frame(s, L, 1.22, 5.35, 5.7, "WHAT THE TEACHER SEES");
    pic(s, "screen_heatmap.png", L + 0.17, 1.62, 5.0, 2.81, "Topic mastery heatmap (illustrative)");
    callout(s, 1, L + 0.75, 4.18); callout(s, 2, L + 1.68, 1.82); callout(s, 3, L + 4.1, 3.1);
    const ex = [["1", "Bands, not scores: building, steady, strong, or not enough data."], ["2", "A column low for the whole batch means probably not taught yet, not weak students."], ["3", "A question the best students miss is flagged as a likely wrong answer key."]];
    ex.forEach((e, i) => {
      callout(s, e[0], L + 0.17, 4.6 + i * 0.5, 0.26);
      text(s, e[1], { x: L + 0.55, y: 4.55 + i * 0.5, w: 4.65, h: 0.4, fontSize: 10.5, valign: "middle" });
    });
    tag(s, "mock", L + 0.17, 6.15);
    tag(s, "synthetic", L + 2.3, 6.15);
    labelBar(s, L + 0.12, 6.5, 5.11, "Teacher view: topic-level, per student, per batch", { h: 0.3, size: 11 });
    const mx = 5.9, mw = 3.45;
    frame(s, mx, 1.22, mw, 5.7, "HOW IT WORKS");
    const steps = [["1", "Answers and versioned keys", "Blank counts as wrong. Dropped and multi-correct items follow NTA rules; fixing a key re-scores everything."], ["2", "Question difficulty", "2-parameter IRT with a guessing prior; Rasch for small samples. Negative discrimination flags a bad key."], ["3", "Mastery per topic", "Shrunk toward the student's overall level and the batch; recent tests count more."], ["4", "Bands with honesty", "A band appears only when the standard error is small; otherwise: not enough data."]];
    steps.forEach((st, i) => {
      const y = 1.62 + i * 1.28;
      hdrBar(s, mx + 0.12, y, mw - 0.24, st[0] + "  " + st[1], { h: 0.3, size: 11, align: "left" });
      rect(s, mx + 0.12, y + 0.3, mw - 0.24, 0.88, C2.band);
      text(s, st[2], { x: mx + 0.2, y: y + 0.33, w: mw - 0.4, h: 0.82, fontSize: 10.5 });
    });
    const rx = 9.5, rw = R - 9.5;
    frame(s, rx, 1.22, rw, 5.7, "EVIDENCE ON REAL DATA");
    pic(s, "chart_assist_bars.png", rx + 0.1, 1.62, rw - 0.2, (rw - 0.2) * 0.62, "Knowledge tracing AUC: ours vs published");
    tag(s, "public", rx + 0.12, 3.75);
    text(s, "770 held-out students, 55,755 predictions, 5-fold, pyKT split. Our 95% interval: 0.756 to 0.779. AKT is higher than ours.", { x: rx + 0.12, y: 4.02, w: rw - 0.24, h: 0.62, fontSize: 10 });
    hdrBar(s, rx + 0.12, 4.72, rw - 0.24, "SYNTHETIC-DATA RESULTS", { h: 0.28, size: 10.5, fill: T.muted });
    const pend = ["Difficulty recovery vs students", "Wrong-key detection", "Mastery vs raw % correct"];
    pend.forEach((p, i) => {
      rect(s, rx + 0.12, 5.0 + i * 0.4, rw - 0.24, 0.38, i % 2 ? T.white : T.tint);
      text(s, p, { x: rx + 0.2, y: 5.0 + i * 0.4, w: rw - 1.4, h: 0.38, fontSize: 10.5, valign: "middle" });
      tag(s, "pending", rx + rw - 1.05, 5.08 + i * 0.4, { size: 8, h: 0.22 });
    });
    text(s, "Moat curve: difficulty accuracy as more students answer.", { x: rx + 0.12, y: 6.25, w: rw - 0.24, h: 0.5, fontSize: 10, color: T.muted });
    source(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT NeurIPS 2022 reference values); screens are illustrative. Difficulty and mastery results on synthetic data are pending.");
    s.addNotes("Evidence: the bar chart uses the real result file (online IRT 0.763, 1-parameter 0.759, logistic baseline 0.741, BKT 0.714) next to the published pyKT values (DKT 0.754, SAKT 0.725, AKT 0.785). IRT recovery, wrong-key detection and mastery-vs-baseline come from Agent B and must replace the amber placeholders before submission.");
  }

  // ================================================================ 5 EARLY WARNING
  {
    const s = content("Technology", "A short, supportive list each week: who to call, why, and what to offer", "ML rigour 25 % · early warning", ["EARLY WARNING", 3]);
    kit.panels("dash");
    frame(s, L, 1.22, 5.0, 5.7, "WHAT THE MENTOR SEES");
    pic(s, "screen_support_list.png", L + 0.1, 1.6, 4.8, 2.7, "Support list (illustrative)");
    callout(s, 1, L + 3.7, 2.15); callout(s, 2, L + 2.2, 2.35);
    text(s, "ROUTING BY AGE AND PURPOSE", { x: L + 0.1, y: 4.35, w: 4.8, h: 0.26, fontSize: 10.5, bold: true, color: T.navy });
    dtable(s, L + 0.1, 4.62, [1.3, 1.2, 1.15, 1.15], ["", "Academic support", "Dropout", "Fees"],
      [["Under 18", { t: "Model", fill: C2.green, bold: true }, { t: "Plain rules", fill: C2.gold }, { t: "Plain rules", fill: C2.gold }],
        ["18 and over", { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }],
        ["Minors, legal opinion", { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Plain rules", fill: C2.gold }]],
      { rowH: 0.34, headH: 0.28, size: 10, headFill: T.blueD });
    text(s, "Never used for minors: app activity tracking. Flags persist until resolved; list capped at mentor capacity.", { x: L + 0.1, y: 5.98, w: 4.8, h: 0.4, fontSize: 9.5, color: T.muted });
    tag(s, "mock", L + 0.1, 6.4);
    labelBar(s, L + 0.1, 6.62, 4.8, "Visible to mentor and owner only", { h: 0.27, size: 10.5, fill: T.orangeD });
    const mx = 5.6, mw = 4.0;
    frame(s, mx, 1.22, mw, 5.7, "REAL-DATA CHECK ON OULAD (WITHDRAWAL)");
    pic(s, "chart_oulad_by_day.png", mx + 0.1, 1.6, mw - 0.2, (mw - 0.2) * 0.695, "OULAD AUC by observation window");
    tag(s, "public", mx + 0.12, 4.42);
    dtable(s, mx + 0.1, 4.7, [2.0, 0.9, 0.8], ["Day 28, 5-fold by student", "AUC", "P@10 %"],
      [["LightGBM, academic + clicks", "0.706", "0.46"], ["LightGBM, academic only", "0.698", "0.46"], ["Logistic, academic only", "0.680", "0.40"], ["Rule: no assessment", "0.521", "0.31"], ["Rule: zero clicks, 7 days", "0.532", "0.24"]],
      { rowH: 0.27, headH: 0.27, size: 9.5, rowStyles: ["green", "band", "white", "gold", "gold"] });
    text(s, "Calibration error 0.009. Held-out course: 0.654.", { x: mx + 0.1, y: 6.4, w: mw - 0.2, h: 0.3, fontSize: 10, bold: true, color: T.navy });
    const rx = 9.75, rw = R - 9.75;
    frame(s, rx, 1.22, rw, 5.7, "HOW A FLAG IS MADE");
    const fl = [["FaClock", "Features as of the date, never the future"], ["FaScaleBalanced", "Route by age and purpose"], ["FaChartLine", "Score or apply a plain rule"], ["FaClipboardCheck", "Plain reasons and a supportive action"], ["FaHandshake", "A person decides; outcome is logged"]];
    for (let i = 0; i < fl.length; i++) {
      const y = 1.62 + i * 0.5;
      await abadge(s, fl[i][0], rx + 0.12, y, 0.36, nb++);
      text(s, fl[i][1], { x: rx + 0.56, y, w: rw - 0.68, h: 0.4, fontSize: 10.5, valign: "middle" });
    }
    pic(s, "chart_calibration.png", rx + 0.35, 4.22, 2.2, 2.07, "Calibration curve, OULAD day 28");
    text(s, "Model on synthetic institutes: pending.", { x: rx + 0.12, y: 6.38, w: rw - 1.3, h: 0.36, fontSize: 9, color: T.muted, valign: "middle" });
    tag(s, "pending", rx + rw - 1.05, 6.45, { size: 8, h: 0.22 });
    source(s, "Sources: ml/public_validation (OULAD, CC BY 4.0); routing policy: contracts/routing_policy.yaml. About a quarter of dropouts are sudden and cannot be predicted from academic data.");
    s.addNotes("The OULAD table is real: LightGBM with isotonic calibration, student-grouped 5-fold; rules are the two deterministic baselines. Published anchors for context: 0.727, 0.794 and 0.804 at days 14, 28 and 42 (PLOS ONE 2026); ours is lower, so do not claim parity. Precision at top 10 percent is shown as P@10. Early warning on synthetic institutes and the comparison against the institute rule come from Agent C.");
  }

  // ================================================================ 6 PREDICTION + REPORT
  {
    const s = content("Technology", "An honest percentile range, and a parent report where every number is checked", "ML rigour 25 % · GenAI with guardrails", ["PERCENTILE RANGE AND PARENT REPORTS", 3]);
    kit.panels("tab");
    frame(s, L, 1.22, 4.2, 5.7, "PERCENTILE RANGE");
    M.bandChart(kit, s, L + 0.12, 1.62, 3.96, 2.75);
    text(s, "Quantile model plus conformal band, 80 % target (77 to 83 % accepted).", { x: L + 0.12, y: 4.45, w: 3.96, h: 0.4, fontSize: 10.5 });
    text(s, "Mapped to the NTA percentile through an editable table: 2026 average curve, with 2024 easy and tough shifts as the uncertainty envelope.", { x: L + 0.12, y: 4.88, w: 3.96, h: 0.7, fontSize: 10.5 });
    text(s, "Shown as a range with a disclaimer, never a single number or a rank promise.", { x: L + 0.12, y: 5.6, w: 3.96, h: 0.5, fontSize: 10.5, bold: true, color: T.navy });
    tag(s, "mock", L + 0.12, 6.2); tag(s, "pending", L + 2.3, 6.2);
    labelBar(s, L + 0.12, 6.5, 3.96, "Coverage results pending", { h: 0.28, size: 10.5, fill: T.muted });
    const mx = 4.8, mw = 5.0;
    frame(s, mx, 1.22, mw, 5.7, "PARENT REPORT: HINDI AND ENGLISH");
    pic(s, "screen_parent_report.png", mx + 0.1, 1.6, mw - 0.2, (mw - 0.2) * 0.6, "Parent report in Hindi and English (illustrative)");
    callout(s, 1, mx + 3.0, 1.75); callout(s, 2, mx + 0.35, 4.3);
    text(s, "1  Every number and topic comes from the data, never from the AI.", { x: mx + 0.15, y: 4.75, w: mw - 0.3, h: 0.3, fontSize: 10.5 });
    text(s, "2  Checked before sending: if any check fails, a template is sent instead.", { x: mx + 0.15, y: 5.05, w: mw - 0.3, h: 0.3, fontSize: 10.5 });
    let cx = mx + 0.15;
    for (const c of ["No AI needed", "20 templates", "Names added last"]) cx += pill(s, c, cx, 5.5, { fill: T.tealTint, color: T.navy, size: 10, h: 0.28, bold: false }) + 0.08;
    tag(s, "mock", mx + 0.15, 6.2);
    text(s, "Report text produced by our report module (template path) for a synthetic student.", { x: mx + 2.3, y: 6.17, w: mw - 2.45, h: 0.4, fontSize: 9.5, color: T.muted, valign: "middle" });
    labelBar(s, mx + 0.1, 6.55, mw - 0.2, "Hindi still needs a native reviewer", { h: 0.27, size: 10.5, fill: T.muted });
    const rx = 9.95, rw = R - 9.95;
    frame(s, rx, 1.22, rw, 5.7, "THE CHECKING PIPELINE");
    const pl = [["FaDatabase", "Facts from data", "Attendance, tests, topics, trend, two tips."], ["FaRobot", "Optional local AI", "Only rewords; runs on the laptop."], ["FaListCheck", "Eight checks", "Numbers, topics, names, banned words, length, trend, tips, schema."], ["FaFilePdf", "Template fallback", "Safe human-written text if anything fails."]];
    for (let i = 0; i < 4; i++) {
      const y = 1.62 + i * 1.12;
      await abadge(s, pl[i][0], rx + 0.12, y, 0.4, nb++);
      text(s, pl[i][1], { x: rx + 0.62, y, w: rw - 0.74, h: 0.4, fontSize: 11.5, bold: true, color: T.navy, valign: "middle" });
      text(s, pl[i][2], { x: rx + 0.62, y: y + 0.4, w: rw - 0.74, h: 0.62, fontSize: 10 });
    }
    tag(s, "built", rx + 0.12, 6.15);
    text(s, "16 automated tests", { x: rx + 0.85, y: 6.12, w: rw - 1.0, h: 0.3, fontSize: 10, valign: "middle", color: T.muted });
    source(s, "Sources: backend/app/genai (report module), contracts/report_numbers.schema.json. An independent attack on the checker found gaps; fixes are in progress, so no catch rate is claimed here.");
    s.addNotes("Prediction range is schematic until Agent C delivers coverage numbers. The report images use real template output. Do not state a verifier catch rate until the independent adversarial test passes after the E2 fixes.");
  }

  pres.addSection({ title: "Trust" });
  // ================================================================ 7 PRIVACY
  {
    const s = content("Trust", "Built for the law: consent first, supportive actions only, no rankings", "Feasibility, privacy and safety 20 %", ["PRIVACY, SAFETY AND COMPLIANCE", 4]);
    kit.panels("dash");
    frame(s, L, 1.22, 4.55, 4.95, "WHO GETS WHAT");
    dtable(s, L + 0.1, 1.62, [1.05, 0.9, 0.85, 0.8, 0.75], ["", "Academic support", "Dropout", "Fees", "App activity"],
      [["Under 18", { t: "Model", fill: C2.green, bold: true }, { t: "Plain rules", fill: C2.gold }, { t: "Plain rules", fill: C2.gold }, { t: "Never", fill: "F4CFCB", color: T.red, bold: true }],
        ["18 and over", { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Opt-in", fill: C2.gold }],
        ["Under 18, legal opinion", { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Plain rules", fill: C2.gold }, { t: "Never", fill: "F4CFCB", color: T.red, bold: true }]],
      { rowH: 0.5, headH: 0.5, size: 10 });
    const lg = [["DPDP Act s.9(3)", "no tracking or behavioural monitoring of children, even with consent"], ["Fourth Schedule", "exemption is narrow and purpose-limited, so we do not rely on it for consent"], ["MoE guidelines cl. 10.2(xi)", "analyse results and counsel students whose performance is deteriorating"], ["We act as the processor", "the institute stays the data fiduciary; no pooling of children's raw data"]];
    lg.forEach((l, i) => text(s, [{ text: l[0] + ": ", options: { bold: true, color: T.navy } }, { text: l[1] }], { x: L + 0.12, y: 3.8 + i * 0.58, w: 4.3, h: 0.55, fontSize: 10.5 }));
    tag(s, "designed", L + 0.12, 6.0, { label: "DESIGNED AND TESTED IN CODE" });
    const mx = 5.15, mw = 3.55;
    frame(s, mx, 1.22, mw, 4.95, "VERIFIABLE PARENTAL CONSENT");
    pic(s, "screen_consent.png", mx + 0.15, 1.62, 3.25, 3.25, "Consent notice with purpose switches (illustrative)");
    callout(s, 1, mx + 0.1, 2.0); callout(s, 2, mx + 0.1, 3.2); callout(s, 3, mx + 0.1, 4.2);
    text(s, "1 Itemised data  2 One switch per purpose  3 Withdraw in one tap", { x: mx + 0.15, y: 4.92, w: mw - 0.3, h: 0.45, fontSize: 10 });
    text(s, "ID checked at the admission desk (Rule 10); consent recorded per purpose and notice version.", { x: mx + 0.15, y: 5.38, w: mw - 0.3, h: 0.5, fontSize: 10, color: T.muted });
    tag(s, "mock", mx + 0.15, 5.85);
    const rx = 8.85, rw = R - 8.85;
    frame(s, rx, 1.22, rw, 4.95, "THE COST OF PRIVACY, ON REAL DATA");
    pic(s, "chart_privacy_cost.png", rx + 0.12, 1.6, rw - 0.24, (rw - 0.24) * 0.76, "Academic-only vs academic plus click behaviour, OULAD");
    tag(s, "public", rx + 0.12, 4.65);
    const wb = ["No leaderboards, no public ranks", "No batch moves based on performance", "Banned-words check on every message", "Counsellor contact for every institute"];
    for (let i = 0; i < wb.length; i++) {
      await icon(s, "FaCircleCheck", rx + 0.16, 5.0 + i * 0.28, 0.2, T.tealDark);
      text(s, wb[i], { x: rx + 0.45, y: 4.95 + i * 0.28, w: rw - 0.55, h: 0.28, fontSize: 10, valign: "middle" });
    }
    rect(s, L, 6.3, CWD, 0.6, C2.band);
    text(s, [{ text: "MoE Coaching Centre Guidelines 2024, cl. 10.2(xi): ", options: { bold: true, color: T.navy } }, { text: "results should be used for regular analysis and counselling of students whose performance is deteriorating. ", options: { italic: true } }, { text: "Our whole flow is built on that sentence.", options: { bold: true, color: T.tealDark } }],
      { x: L + 0.2, y: 6.3, w: CWD - 0.4, h: 0.6, fontSize: 11.5, valign: "middle" });
    source(s, "Sources: DPDP Act 2023 s.9, DPDP Rules 2025, MoE Guidelines 2024; contracts/routing_policy.yaml; OULAD results in ml/public_validation. Not legal advice.");
    s.addNotes("Routing table mirrors contracts/routing_policy.yaml. The OULAD bars show that academic-only features lose only about 0.007 to 0.025 AUC against academic plus click behaviour: privacy is cheap here. A lawyer's check on the in-person ID flow is still recommended.");
  }

  // ================================================================ BUSINESS MODEL
  pres.addSection({ title: "Business" });
  {
    const s = content("Business", "₹30 per student: fees and staff time already cover the cost; anything the product adds to admissions is upside", "Revenue model and unit economics 20 %", ["BUSINESS MODEL AND UNIT ECONOMICS", 5]);
    kit.panels("tab");
    // ---- price and cost
    frame(s, L, 1.22, 3.95, 5.08, "PRICE AND COST TO THE INSTITUTE");
    dtable(s, L + 0.08, 1.62, [2.2, 1.59], null, [
      ["List price", { t: "₹30 / student / month", bold: true }], ["Range tested", "₹20 to ₹40"], ["Billed per year (active students, seasonal)", "₹1.03 lakh"],
      ["Total cost incl. GST not reclaimed and mentor time", { t: "₹1.20 lakh", bold: true }], ["Per student per year", "≈ ₹285 (0.3 % of fee)"], ["Our cost to serve (all-in)", "₹3.6 / student / month"]],
      { rowH: 0.42, size: 9.5, leftCols: [1], rowStyles: ["band", "white", "band", "white", "band", "white"] });
    text(s, "BY SEGMENT (BASE)", { x: L + 0.1, y: 4.26, w: 3.7, h: 0.24, fontSize: 10, bold: true, color: T.tealDark });
    dtable(s, L + 0.08, 4.5, [1.15, 0.88, 0.88, 0.88], ["", "Small", "Mid", "Large"], [["Students", "180", "400", "1,200"], ["Institute return", "2.3x", { t: "2.9x", bold: true }, "3.6x"], ["LTV ÷ CAC", "1.5x", { t: "3.7x", bold: true }, "9.1x"], ["Payback", "18 mo", { t: "6 mo", bold: true }, "3 mo"]],
      { rowH: 0.3, headH: 0.28, size: 9.5, headFills: [T.tealDark, T.muted, T.tealDark, T.muted] });
    tag(s, "model", L + 0.1, 6.0);
    // ---- value bridge
    const mx = 4.55, mw = 4.6;
    frame(s, mx, 1.22, mw, 5.08, "VALUE BRIDGE, MID INSTITUTE (₹ LAKH / YEAR)");
    pic(s, "chart_value_bridge.png", mx + 0.1, 1.62, mw - 0.2, (mw - 0.2) * 0.72, "Value bridge: fees retained, staff time, admissions uplift vs cost");
    rect(s, mx + 0.12, 4.9, mw - 0.24, 1.3, T.tint);
    lines(s, [{ t: "Fees retained (₹0.90 L) plus staff time (₹0.30 L) equal the cost: 1.0x with no admissions benefit." }, { t: "The 2.9x needs a 1 % admissions uplift, our weakest assumption. Every 1 % adds about ₹2.3 L." }, { t: "Break-even: save 3.5 students a year." }], mx + 0.2, 4.96, mw - 0.4, 1.2, { size: 9.5, gap: 2 });
    // ---- unit economics
    const rx = 9.3, rw = R - 9.3;
    frame(s, rx, 1.22, rw, 5.08, "OUR UNIT ECONOMICS: GUIDE VS OURS");
    dtable(s, rx + 0.08, 1.62, [1.6, 0.9, rw - 2.66], ["Per institute", "Guide", "Pragati"], [
      ["LTV ÷ acquisition cost", "10.7x", { t: "3.7x", bold: true }], ["Payback", "3.1 mo", { t: "6 mo", bold: true }], ["Contribution margin", "66 %", { t: "78 %", bold: true }],
      ["Revenue per month", "₹16,000", { t: "₹8,612", bold: true }], ["Acquisition cost", "₹33,000", { t: "₹35,492", bold: true }], ["Logo retention a year", "69 %", { t: "64 %", bold: true }], ["Institutes to cover the team", "n/a", { t: "18", bold: true }]],
      { rowH: 0.34, headH: 0.3, size: 9.5, headFills: [T.tealDark, T.muted, T.tealDark] });
    text(s, "SCENARIOS (MID)", { x: rx + 0.1, y: 4.38, w: rw - 0.2, h: 0.24, fontSize: 10, bold: true, color: T.tealDark });
    dtable(s, rx + 0.08, 4.62, [1.2, (rw - 1.36) / 3, (rw - 1.36) / 3, (rw - 1.36) / 3], ["", "Bear", "Base", "Bull"], [["Return", "0.15x", { t: "2.9x", bold: true }, "14x"], ["LTV ÷ CAC", "-0.1x", { t: "3.7x", bold: true }, "24x"], ["Payback", "61 mo", { t: "6 mo", bold: true }, "2 mo"]],
      { rowH: 0.3, headH: 0.28, size: 9.5, headFills: [T.tealDark, T.muted, T.tealDark, T.muted] });
    text(s, "Bear sets every input to its worst at once: a stress test, not a forecast.", { x: rx + 0.1, y: 5.82, w: rw - 0.2, h: 0.4, fontSize: 9, italic: true, color: T.muted });
    // ---- bottom line
    rect(s, L, 6.4, CWD, 0.5, T.tealDark);
    text(s, [{ text: "Our base case is deliberately below the guide's: ", options: { color: T.white } }, { text: "6.6 % not 25 %, ₹30 not ₹40, 3.7x not 10.7x.", options: { bold: true, color: "F1D9A0" } }, { text: " It still pays for itself if it saves three or four students a year.", options: { color: T.white } }],
      { x: L + 0.2, y: 6.4, w: CWD - 0.4, h: 0.5, fontSize: 12, valign: "middle", align: "center" });
    source(s, "Source: financial workbook (Pricing, Institute_ROI, Unit_Econ, Scenarios). Model output from sourced and assumed inputs; willingness to pay is untested.");
    s.addNotes("Value bridge from the workbook, mid institute, Base: fees retained 89,672; staff time 25 hours x 100 rupees x 12 = 30,000; admissions uplift 1 % x 400 x 95,000 x 60 % margin = 2,28,000; total 3,47,672 against a cost of 1,20,131. Say plainly that two thirds of the value rests on the admissions assumption.");
  }

  // ================================================================ GO-TO-MARKET, MOAT AND ROADMAP
  {
    const s = content("Business", "Win the Hindi belt with a free retro-pilot; let the shared question bank compound as institutes join", "Market and go-to-market 10 %", ["GO-TO-MARKET, MOAT AND ROADMAP", 5]);
    // ---- where we start
    sec(s, 1, "WHERE WE START, AND WHY", L, 1.22, 6);
    const phs = [["PHASE 1 · JAN TO MAR 2027", "Patna", "Free retro-pilot at 2 institutes on last year's Excel: who left, and would we have flagged them?"],
      ["PHASE 2 · APR 2027 SESSION", "Patna and Lucknow", "Paid pilots with comparison batches; measures written down before we start."],
      ["PHASE 3 · FY28", "Bihar, UP, Jharkhand", "Field sales for mid and large institutes; small ones self-serve (LTV/CAC 1.5x)."]];
    phs.forEach((p, i) => {
      const x = L + i * 2.03, y = 1.58;
      rect(s, x, y, 1.95, 0.3, i === 0 ? T.tealDark : T.teal);
      text(s, p[0], { x, y, w: 1.95, h: 0.3, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x, y: y + 0.3, w: 1.95, h: 1.3, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      text(s, p[1], { x: x + 0.08, y: y + 0.34, w: 1.8, h: 0.26, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, p[2], { x: x + 0.08, y: y + 0.6, w: 1.8, h: 0.98, fontSize: 9, color: T.ink });
    });
    sec(s, 2, "CHANNELS", L, 3.6, 6);
    const ch = [["FaHandshake", "Nextute network", "partner channel, to be agreed"], ["FaGift", "Free retro-pilot", "one Excel file, one answer, no install"], ["FaPersonChalkboard", "Field demos, Jan to Mar", "before the April admission season"], ["FaPrint", "OMR and test-series vendors", "referral partners, to be tested"]];
    for (let i = 0; i < 4; i++) {
      const x = L + (i % 2) * 3.05, y = 3.96 + Math.floor(i / 2) * 0.55;
      await abadge(s, ch[i][0], x, y + 0.04, 0.36, i);
      text(s, [{ text: ch[i][1], options: { bold: true, color: T.tealDark, breakLine: true } }, { text: ch[i][2], options: { color: T.muted, fontSize: 8.5 } }], { x: x + 0.44, y, w: 2.55, h: 0.48, fontSize: 9.5, valign: "middle" });
    }
    // ---- competition
    const cx0 = 6.7, cw0 = R - 6.7;
    sec(s, 3, "COMPETITION (VENDOR LISTINGS, OCT 2026)", cx0, 1.22, cw0);
    const mark = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? C2.gold : "F4F7FB", bold: true, color: t === "yes" ? T.tealDark : T.muted });
    dtable(s, cx0, 1.58, [1.2, 0.95, 0.72, 0.85, 0.82, 0.8, 0.82], ["", "Price / student / mo", "OMR", "Topic analytics", "Parent report", "Hindi", "Consent ledger"], [
      ["Classplus", "₹4 to ₹7", mark("?"), mark("?"), mark("?"), mark("?"), mark("?")],
      ["Fedena", "₹10 to ₹21", mark("no"), mark("?"), mark("yes"), mark("?"), mark("no")],
      ["Edmingle", "₹19 to ₹75", mark("no"), mark("?"), mark("?"), mark("?"), mark("no")],
      ["Teachmint", "₹20 to ₹40 (est.)", mark("?"), mark("?"), mark("yes"), mark("yes"), mark("?")],
      [{ t: "Pragati", bold: true, color: T.tealDark }, { t: "₹30", bold: true }, { t: "designed", fill: C2.gold, bold: true }, mark("yes"), mark("yes"), mark("yes"), mark("yes")]],
      { rowH: 0.3, headH: 0.38, size: 9, headSize: 8.5, rowStyles: ["white", "white", "white", "white", "white"] });
    text(s, "yes: shown in the listing · no: not shown · ?: could not be verified from the listing", { x: cx0, y: 3.48, w: cw0, h: 0.2, fontSize: 8, italic: true, color: T.muted });
    // ---- moat
    sec(s, 4, "THE MOAT, AND ITS LIMITS", cx0, 3.76, cw0);
    chevrow(s, cx0, 4.1, cw0, 0.5, [{ t: "More institutes" }, { t: "More answers per question" }, { t: "Sharper difficulty, wrong keys caught" }, { t: "Better lists and reports" }], { size: 9, depth: 0.2 });
    text(s, [{ text: "Limit: ", options: { bold: true, color: T.tealDark } }, { text: "until the shared bank covers the syllabus, early wins must come from staff time and parent reports, not model accuracy. Only item statistics are pooled; raw records stay with each institute." }], { x: cx0, y: 4.66, w: cw0, h: 0.5, fontSize: 9, color: T.ink });
    // ---- roadmap
    sec(s, 5, "ROADMAP", L, 5.3, CWD);
    const rm = [["Oct 2026", "Public-data validation, synthetic pipeline, 116 tests", true], ["Round 2", "Working prototype; judges change the inputs live", false], ["Jan to Mar 2027", "Retro-pilots in Patna", false], ["Apr 2027", "Paid pilots start with the session", false], ["Jun 2027", "Publish what worked; fix the percentile table", false], ["FY28", "Bihar, UP, Jharkhand; deep knowledge tracing if it beats IRT", false]];
    const sw = CWD / rm.length;
    rect(s, L, 5.86, CWD, 0.04, T.line);
    rm.forEach((r, i) => {
      const x = L + i * sw;
      rect(s, x + 0.02, 5.7, sw - 0.06, 0.1, r[2] ? T.tealDark : T.teal);
      ellipse(s, x + 0.02, 5.8, 0.14, 0.14, r[2] ? T.tealDark : T.white, { line: T.tealDark, lw: 1.5 });
      text(s, r[0], { x: x + 0.22, y: 5.98, w: sw - 0.26, h: 0.24, fontSize: 10, bold: true, color: T.tealDark, valign: "middle" });
      text(s, r[1], { x: x + 0.22, y: 6.22, w: sw - 0.26, h: 0.66, fontSize: 9, color: T.ink });
    });
    source(s, "Sources: financial/research R1 (vendor listings; many features unverifiable, so '?' is not 'absent'); financial workbook (segments, pilot assumptions). Roadmap dates are our plan.");
    s.addNotes("GTM follows the unit economics: field sales where LTV/CAC is 3.7 to 9x, self-serve for small institutes at 1.5x. The retro-pilot needs only last year's Excel, so it costs the institute nothing. The competitor table shows only what listings show.");
  }

  // ================================================================ VALIDATION, RISKS AND THE ASK
  pres.addSection({ title: "Validation" });
  {
    const s = content("Validation", "What we proved, what we did not, the risks that could sink us, and the one pilot that settles it", "Feasibility, privacy and safety 20 % · honest limits", ["VALIDATION, RISKS AND OUR ASK", 6]);
    const cw = 4.05, gx = 0.14, y0 = 1.22, h0 = 2.86;
    const cols = [["PROVED ON PUBLIC DATA", "proved", [["Next-answer AUC", "0.763 (DKT 0.754)"], ["Withdrawal AUC, day 28", "0.706 (published 0.794)"], ["Calibration error", "0.009"], ["Academic-only cost", "0.008 AUC"], ["Precision at top 10 %", "0.46 vs 0.24 to 0.31"]]],
      ["SHOWN ON SYNTHETIC DATA", "pending", [["Pipeline end to end", "116 tests pass"], ["Tenant isolation", "0 rows across institutes"], ["Report checker", "8 checks, template fallback"], ["Difficulty recovery", "pending"], ["Early-warning lift", "pending"]]],
      ["NOT PROVEN YET", "notproven", [["Accuracy on real institutes", "needs a pilot"], ["Willingness to pay", "owner interviews"], ["Real dropout reduction", "borrowed from trials"], ["Hindi quality at scale", "native review"], ["Other OMR layouts", "one-time onboarding"]]]];
    cols.forEach((c, i) => {
      const x = L + i * (cw + gx);
      s.addShape("rect", { x, y: y0, w: cw, h: h0, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      tag(s, c[1], x + 0.12, y0 + 0.1, { label: c[0], size: 9, h: 0.28, w: cw - 0.24 });
      c[2].forEach((r, k) => {
        const y = y0 + 0.48 + k * 0.47;
        rect(s, x + 0.12, y, cw - 0.24, 0.44, k % 2 ? T.white : C2.soft);
        text(s, r[0], { x: x + 0.2, y, w: 1.95, h: 0.44, fontSize: 10, bold: true, color: T.navy, valign: "middle" });
        text(s, r[1], { x: x + 2.15, y, w: cw - 2.3, h: 0.44, fontSize: 9.5, valign: "middle" });
      });
    });
    // ---- risks
    sec(s, 1, "KEY RISKS AND HOW WE CONTAIN THEM", L, 4.22, 8.3);
    dtable(s, L, 4.56, [2.75, 5.5], ["Risk", "Mitigation"], [
      [{ t: "Real accuracy below public-data results", bold: true, color: T.red }, "Retro-pilot on last year's Excel before any sale; compare with the institute's own rule at equal workload."],
      [{ t: "Owners will not pay ₹30", bold: true, color: T.red }, "Owner interviews and a price survey first; lead with staff time and parent reports, tested at ₹20 to ₹40."],
      [{ t: "Mentors ignore the list", bold: true, color: T.red }, "List capped at capacity; every flag needs a logged outcome; owner sees actions done."],
      [{ t: "Hindi quality", bold: true, color: T.red }, "Native reviewer on all templates; template fallback when a check fails."],
      [{ t: "DPDP reading changes", bold: true, color: T.red }, "Consent-first design that does not depend on the education exemption."]],
      { rowH: 0.42, headH: 0.28, size: 9.5, leftCols: [1], rowStyles: ["white", "band", "white", "band", "white"] });
    // ---- the ask
    const ax = 8.95, aw = R - 8.95;
    rect(s, ax, 4.22, aw, 2.7, T.tealDark);
    text(s, "OUR ASK", { x: ax + 0.25, y: 4.32, w: aw - 0.5, h: 0.3, fontSize: 12, bold: true, color: "F1D9A0", charSpacing: 1.5 });
    text(s, "Two retro-pilots in Patna this winter.", { x: ax + 0.25, y: 4.66, w: aw - 0.5, h: 0.5, fontSize: 15, bold: true, color: T.white });
    text(s, "Give us last year's Excel. If Pragati would not have flagged more of the students who left than your attendance rule, at the same weekly workload, we stop and say so.", { x: ax + 0.25, y: 5.2, w: aw - 0.5, h: 1.05, fontSize: 10.5, color: T.white });
    text(s, "Changed from the guide: 25 % to 6.6 % dropout reduction; LTV ÷ CAC 10.7x to 3.7x.", { x: ax + 0.25, y: 6.3, w: aw - 0.5, h: 0.5, fontSize: 9, italic: true, color: "C9DBF0" });
    source(s, "Sources: ml/public_validation; financial workbook; technical/docs/FEASIBILITY_CHECK.md. Amber items are replaced with measured values before submission.");
    s.addNotes("State limitations before the judges do: synthetic data proves the pipeline only; public datasets are from the UK (OULAD) and US (ASSISTments); the percentile mapping is an assumption table. The ask is concrete and falsifiable.");
  }

  pres.addSection({ title: "Appendix" });
  // ================================================================ 9 ROI
  {
    const s = content("Appendix", "Appendix 1: the assumptions behind the institute return, with ranges and confidence", "Revenue model and unit economics 20 %", ["APPENDIX 1: INSTITUTE RETURN ASSUMPTIONS", 7]);
    kit.panels("tab");
    frame(s, L, 1.22, 3.95, 5.7, "KEY ASSUMPTIONS (MID, BASE)");
    dtable(s, L + 0.08, 1.6, [1.5, 0.75, 1.0, 0.5], ["Assumption", "Base", "Range", "Conf."], [
      ["Students", "400", "180 to 1,200", "M"], ["Annual fee", "₹95,000", "70k to 120k", "L"], ["Mid-session dropout", "10 %", "6 to 18 %", "L"],
      ["Outreach effect", "15 %", "5 to 30 %", "M"], ["Share preventable", "45 %", "30 to 60 %", "L"], ["Recall, under 18", "55 %", "40 to 70 %", "L"],
      ["Recall, 18+", "65 %", "50 to 80 %", "M"], ["Flag precision", "35 %", "25 to 50 %", "L"], ["Flags acted on", "90 %", "70 to 100 %", "L"],
      ["Admissions uplift", "1 %", "0 to 3 %", "L"], ["Staff hours saved", "25 a month", "10 to 50", "L"], ["List price", "₹30", "₹20 to 40", "L"], ["GST reclaimed", "60 %", "30 to 90 %", "L"]],
      { rowH: 0.33, headH: 0.3, size: 9.5 });
    text(s, "Conf.: H high, M medium, L low. Low means an assumption to test in owner interviews.", { x: L + 0.1, y: 6.28, w: 3.7, h: 0.5, fontSize: 9.5, color: T.muted });
    const mx = 4.55, mw = 4.85;
    frame(s, mx, 1.22, mw, 5.7, "INSTITUTE ECONOMICS: GUIDE VS PRAGATI");
    dtable(s, mx + 0.08, 1.6, [1.75, 0.7, 0.75, 0.8, 0.7], ["Per year, 400 students", "Guide", "Bear", "Base", "Bull"], [
      ["Effective dropout reduction", "25 %", "1.0 %", "6.6 %", "22 %"], ["Dropouts prevented", "12", "0.2", "2.6", "16"], ["Fee lost per dropout", "₹36,000", "₹15,414", "₹36,967", "₹56,994"],
      ["Fees retained", "₹4.32 L", "₹2,928", "₹89,672", "₹9.11 L"], ["Total value", "₹4.32 L", "₹11,928", "₹3.48 L", "₹21.5 L"], ["Total cost to institute", "₹1.92 L", "₹78,544", "₹1.20 L", "₹1.53 L"],
      ["Return, all benefits", "2.25x", "0.15x", "2.9x", "14x"], ["Return, fees only", "2.25x", "0.04x", "0.75x", "5.9x"], ["Students to save to break even", "5.3", "6.5", "3.5", "2.7"]],
      { rowH: 0.43, headH: 0.34, size: 9.5, rowStyles: ["band", "white", "band", "gold", "band", "white", "green", "green", "gold"], headFills: [T.blueD, T.muted, T.muted, T.tealDark, T.muted] });
    tag(s, "model", mx + 0.1, 5.98);
    text(s, "Total cost includes the fee, GST net of what institutes reclaim, and mentor time.", { x: mx + 0.1, y: 6.28, w: mw - 0.2, h: 0.5, fontSize: 9.5, color: T.muted });
    const rx = 9.55, rw = R - 9.55;
    frame(s, rx, 1.22, rw, 5.7, "VALUE VS COST AND WHAT IT MEANS");
    pic(s, "chart_value_vs_cost.png", rx + 0.1, 1.6, rw - 0.2, (rw - 0.2) * 0.76, "Value vs cost by scenario");
    hdrBar(s, rx + 0.1, 4.2, rw - 0.2, "KEY INSIGHTS", { h: 0.3, size: 11 });
    rect(s, rx + 0.1, 4.5, rw - 0.2, 2.3, C2.gold);
    lines(s, ["Fees alone return 0.75x: they do not cover the cost on their own.", "Fees plus staff time reach about break-even; every 1 % admissions uplift adds about ₹2.3 lakh.", "Save 3 to 4 students a year and it pays for itself.", "Platform cost is 0.3 % of a student's fee."], rx + 0.18, 4.55, rw - 0.36, 2.2, { size: 10.5, gap: 4 });
    source(s, "Source: financial workbook (Assumptions, Scenarios). Model output, not measured; dropout effect borrowed from 8 trials in comparable settings (mean 15.8 %).");
    s.addNotes("Numbers are from the workbook scenarios table, mid institute. The guide's 25 percent prevention and 2.25x return are shown as the baseline we replaced. Safe wording: randomised trials in comparable settings show 5 to 30 percent among students who get outreach; we model 15 percent.");
  }

  // ================================================================ 10 UNIT ECONOMICS
  {
    const s = content("Appendix", "Appendix 2: what moves the answer: price, effect size, acquisition cost and churn", "Revenue model and unit economics 20 %", ["APPENDIX 2: SENSITIVITY", 7]);
    kit.panels("tint");
    frame(s, L, 1.22, 4.35, 5.7, "UNIT ECONOMICS (MID, BASE)");
    dtable(s, L + 0.08, 1.6, [1.9, 0.95, 1.3], ["Per institute", "Guide", "Pragati"], [
      ["LTV ÷ acquisition cost", "10.7x", { t: "3.7x", bold: true }], ["Payback", "3.1 months", { t: "6 months", bold: true }], ["Contribution margin", "66 %", { t: "78 %", bold: true }],
      ["Lifetime value", "₹3.53 lakh", { t: "₹1.30 lakh", bold: true }], ["Acquisition cost", "₹33,000", { t: "₹35,492", bold: true }], ["Revenue, monthly", "₹16,000", { t: "₹8,612", bold: true }],
      ["Contribution, monthly", "₹10,600", { t: "₹6,740", bold: true }], ["Annual logo retention", "69 %", { t: "64 %", bold: true }], ["Institutes to cover fixed team cost", "n/a", { t: "18", bold: true }]],
      { rowH: 0.42, headH: 0.32, size: 10, rowStyles: ["gold", "band", "white", "band", "white", "band", "white", "band", "green"], headFills: [T.blueD, T.muted, T.tealDark] });
    tag(s, "model", L + 0.1, 5.78);
    text(s, "Why thinner: seasonal billing, 20 % non-renewal after the session, pilots that do not convert, and a price near the top of what ERPs charge.", { x: L + 0.1, y: 6.08, w: 4.15, h: 0.75, fontSize: 10 });
    const mx = 4.95, mw = 4.1;
    frame(s, mx, 1.22, mw, 5.7, "SENSITIVITY: WHAT MOVES THE ANSWER");
    text(s, "Institute return (x), by effective reduction and list price", { x: mx + 0.1, y: 1.6, w: mw - 0.2, h: 0.26, fontSize: 10, bold: true, color: T.navy });
    heat(s, mx + 0.1, 1.86, 0.56, 0.3, ["₹20", "₹30", "₹40", "₹50", "₹60", "₹80"], ["5 %", "8 %", "11 %", "15 %", "20 %", "25 %"],
      [[3.97, 2.71, 2.06, 1.66, 1.39, 1.05], [4.47, 3.05, 2.32, 1.87, 1.57, 1.18], [4.97, 3.39, 2.58, 2.08, 1.74, 1.31], [5.63, 3.85, 2.92, 2.35, 1.97, 1.49], [6.46, 4.41, 3.35, 2.70, 2.26, 1.71], [7.29, 4.98, 3.78, 3.05, 2.55, 1.93]], { labW: 0.5, size: 9.5, fmt: (v) => v.toFixed(1) + "x" });
    text(s, "LTV ÷ acquisition cost, by acquisition cost and monthly churn", { x: mx + 0.1, y: 4.0, w: mw - 0.2, h: 0.26, fontSize: 10, bold: true, color: T.navy });
    heat(s, mx + 0.1, 4.26, 0.7, 0.3, ["1 %", "2 %", "3 %", "4 %", "5 %"], ["₹15k", "₹25k", "₹35k", "₹50k", "₹75k"],
      [[11.0, 9.6, 8.7, 7.9, 7.3], [6.4, 5.8, 5.2, 4.8, 4.4], [4.6, 4.1, 3.7, 3.4, 3.1], [3.2, 2.9, 2.6, 2.4, 2.2], [2.1, 1.9, 1.7, 1.6, 1.5]], { labW: 0.5, size: 9.5, fmt: (v) => v.toFixed(1) + "x" });
    tag(s, "model", mx + 0.1, 6.42);
    text(s, "Base cells: ₹30 with 6.6 % reduction; ₹35k with 3 %.", { x: mx + 1.9, y: 6.38, w: mw - 2.0, h: 0.36, fontSize: 9, color: T.muted, valign: "middle" });
    const rx = 9.2, rw = R - 9.2;
    frame(s, rx, 1.22, rw, 5.7, "TORNADO AND SEGMENTS");
    const dr = [["Price ₹20 to ₹40", 2.13, 5.21], ["Pilot conversion 15 to 50 %", 2.17, 5.07], ["Non-renewal 30 to 10 %", 3.15, 4.29], ["Monthly churn 5 to 1.5 %", 3.07, 4.27], ["Pilots per rep 6 to 14", 3.11, 3.98]];
    text(s, "LTV ÷ acquisition cost, one input at a time", { x: rx + 0.1, y: 1.6, w: rw - 0.2, h: 0.26, fontSize: 10, bold: true, color: T.navy });
    const base = 3.67, ax = [1.5, 5.5], px0 = rx + 1.55, pw_ = rw - 1.95;
    const X = (v) => px0 + ((v - ax[0]) / (ax[1] - ax[0])) * pw_;
    dr.forEach((d, i) => {
      const y = 1.95 + i * 0.5;
      text(s, d[0], { x: rx + 0.1, y, w: 1.45, h: 0.42, fontSize: 9, valign: "middle" });
      rect(s, X(d[1]), y + 0.08, X(base) - X(d[1]), 0.26, "F6B26B");
      rect(s, X(base), y + 0.08, X(d[2]) - X(base), 0.26, T.teal);
      text(s, d[1].toFixed(1), { x: X(d[1]) - 0.38, y, w: 0.36, h: 0.42, fontSize: 9, color: T.muted, align: "right", valign: "middle" });
      text(s, d[2].toFixed(1), { x: X(d[2]) + 0.03, y, w: 0.4, h: 0.42, fontSize: 9, color: T.muted, valign: "middle" });
    });
    rect(s, X(base) - 0.01, 1.9, 0.02, 2.6, T.navy);
    text(s, "Base 3.7x", { x: X(base) - 0.5, y: 4.5, w: 1.0, h: 0.24, fontSize: 9, bold: true, color: T.navy, align: "center" });
    pic(s, "chart_ltv_segments.png", rx + 0.35, 4.8, 2.3, 1.72, "LTV over acquisition cost by segment");
    source(s, "Source: financial workbook (Scenarios, Sensitivity). List price ₹30; ERP and LMS prices found: ₹4 to ₹21. Willingness to pay is untested.");
    s.addNotes("Heat tables are the two grids of the Sensitivity sheet. Bear, Base and Bull LTV/CAC for the mid institute are -0.1x, 3.7x and 24x. The segment bars show small 1.5x, mid 3.7x, large 9.1x with paybacks of 18, 6 and 3 months.");
  }

  {
    const s = content("Appendix", "Appendix 3: Bear, Base and Bull for a mid-size institute, plus segments", "Scenarios", ["APPENDIX 3: SCENARIOS", 7]);
    kit.panels("tab");
    frame(s, L, 1.22, 8.1, 5.7, "MID INSTITUTE (400 STUDENTS)");
    dtable(s, L + 0.1, 1.62, [3.3, 1.5, 1.5, 1.5], ["Per year unless stated", "Bear", "Base", "Bull"], [
      ["Effective dropout reduction", "1.0 %", "6.6 %", "22.2 %"], ["Dropouts prevented", "0.2", "2.6", "16"], ["Institute return, all benefits", "0.15x", "2.9x", "14x"], ["Institute return, fees only", "0.04x", "0.75x", "5.9x"],
      ["Students to save to break even", "6.5", "3.5", "2.7"], ["Revenue per institute, monthly", "₹4,992", "₹8,612", "₹11,999"], ["Fully loaded acquisition cost", "₹1.74 L", "₹35,492", "₹13,336"], ["LTV ÷ acquisition cost", "-0.1x", "3.7x", "24x"], ["Payback", "61 months", "6 months", "2 months"]],
      { rowH: 0.45, headH: 0.34, size: 11, rowStyles: ["band", "white", "green", "green", "gold", "band", "white", "gold", "band"], headFills: [T.blueD, T.muted, T.tealDark, T.muted] });
    tag(s, "model", L + 0.12, 6.3);
    const rx = 8.7, rw = R - 8.7;
    frame(s, rx, 1.22, rw, 5.7, "BY SEGMENT (BASE)");
    dtable(s, rx + 0.1, 1.62, [1.5, 0.8, 0.8, 0.8], ["", "Small", "Mid", "Large"], [["Return", "2.3x", "2.9x", "3.6x"], ["LTV÷CAC", "1.5x", "3.7x", "9.1x"], ["Payback", "18 mo", "6 mo", "3 mo"]], { rowH: 0.5, headH: 0.32, size: 11, headFills: [T.blueD, T.muted, T.tealDark, T.muted] });
    text(s, "Bear changes every input to its worst value at once. It is a stress test, not a forecast.", { x: rx + 0.15, y: 3.7, w: rw - 0.3, h: 1.0, fontSize: 11.5, color: T.muted });
    source(s, "Source: financial workbook (Scenarios sheet). Model output from sourced and assumed inputs, not measured.");
  }


  {
    const s = content("Appendix", "Appendix 4: about ₹3.6 per student per month, ₹0 extra run locally", "Cost per student", ["APPENDIX 4: COST PER STUDENT", 7]);
    kit.panels("dash");
    frame(s, L, 1.22, 5.2, 5.7, "COST INPUTS (BEAR / BASE / BULL)");
    dtable(s, L + 0.08, 1.62, [2.4, 0.9, 0.9, 0.8], ["Input", "Bear", "Base", "Bull"], [
      ["Hosted model, ₹ per 1M input tokens", "142.58", "23.76", "9.51"], ["Hosted model, ₹ per 1M output tokens", "712.88", "142.58", "47.53"], ["WhatsApp utility message, ₹", "0.145", "0.132", "0.115"],
      ["AI reports per student per month", "6", "4", "4"], ["WhatsApp messages per student per month", "10", "6", "4"], ["Compute and storage, ₹ per student per month", "1.5", "0.8", "0.4"],
      ["Consent verification, ₹ per student per year", "3.0", "1.5", "0.5"], ["App server + database, ₹ per month per stack", "9,000", "4,000", "3,000"], ["Institutes sharing one stack", "10", "20", "40"]],
      { rowH: 0.45, headH: 0.32, size: 10 });
    tag(s, "model", L + 0.1, 6.2);
    text(s, "Prices researched 20 Oct 2026 from vendor pages; exchange rate ₹95.05 per US dollar.", { x: L + 0.1, y: 6.5, w: 5.0, h: 0.35, fontSize: 9.5, color: T.muted });
    const mx = 5.8;
    frame(s, mx, 1.22, 3.4, 2.7, "ALL-IN COST");
    text(s, "₹3.6", { x: mx + 0.2, y: 1.7, w: 3.0, h: 0.9, fontSize: 48, bold: true, color: T.navy, fontFace: F.head });
    text(s, "per student per month, inside the planned ₹3 to ₹10 band (financial model check).", { x: mx + 0.2, y: 2.65, w: 3.0, h: 0.9, fontSize: 11.5 });
    frame(s, mx, 4.05, 3.4, 2.87, "LOCAL RUN");
    text(s, "₹0", { x: mx + 0.2, y: 4.5, w: 3.0, h: 0.9, fontSize: 48, bold: true, color: T.tealDark, fontFace: F.head });
    text(s, "marginal cost: laptop, local model, local database, no paid services.", { x: mx + 0.2, y: 5.45, w: 3.0, h: 0.9, fontSize: 11.5 });
    const rx = 9.35, rw = R - 9.35;
    frame(s, rx, 1.22, rw, 5.7, "HOW WE KEEP IT LOW");
    const kw = ["Small local models on a laptop", "Template fallback: no model required", "No paid APIs or hosting", "One database per deployment, isolated per institute", "WhatsApp only for utility messages, in-window replies free"];
    for (let i = 0; i < kw.length; i++) { await icon(s, "FaCircleCheck", rx + 0.15, 1.72 + i * 0.85, 0.24, T.tealDark); text(s, kw[i], { x: rx + 0.5, y: 1.62 + i * 0.85, w: rw - 0.65, h: 0.6, fontSize: 11.5, valign: "middle" }); }
    source(s, "Source: financial/assumptions.csv (COGS rows), financial/research. Production costs are assumptions with confidence flags.");
  }
  {
    const s = content("Appendix", "Appendix 5: 31 tables in five groups, all isolated per institute", "Data model", ["APPENDIX 5: DATA MODEL", 7]);
    kit.panels("tab");
    const groups = [["PEOPLE", "institutes, users, students, guardians, batches, batch_changes, consents, legal_settings"], ["LEARNING", "topics, topic_prereqs, questions, question_topics, item_params, tests, test_questions, answer_keys, marking_schemes"],
      ["RESULTS", "responses, test_totals, attendance, fees, engagement"], ["INTELLIGENCE", "mastery_snapshots, risk_scores, predictions, interventions, reports, model_registry"], ["OPERATIONS", "ingest_jobs, omr_templates, audit_log"]];
    groups.forEach((g, i) => {
      const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.5, w = 4.05;
      frame(s, x, y, w, 2.35, g[0]);
      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.7, fontSize: 12 });
    });
    frame(s, L + 2 * 4.18, 3.8, 4.05, 2.35, "DELIBERATELY NOT STORED");
    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.3, 3.7, 1.8, { size: 12, gap: 6 });
    labelBar(s, L, 6.4, CWD, "Row-level security on every tenant table; another institute sees 0 rows (tested on PostgreSQL 16)", { h: 0.34, size: 12, fill: T.tealDark });
    source(s, "Source: technical/contracts/schema.sql. Synthetic data: 4 institutes, 3 academic years, known ground truth.");
  }
  {
    const s = content("Appendix", "Appendix 6: the rules we design against, and what we do about each", "Legal basis", ["APPENDIX 6: LEGAL BASIS", 7]);
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
    const s = content("Appendix", "Appendix 7: how we will know each model works before an institute relies on it", "Validation plan and model card", ["APPENDIX 7: MODEL CARD AND GO-LIVE GATES", 7]);
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
  // ================================================================ A8 PRODUCT TOUR
  {
    const s = content("Appendix", "Appendix 8: six screens of the same flow, from upload to parent report", "Product tour", ["APPENDIX 8: PRODUCT TOUR", 7]);
    kit.panels("plain");
    kit.panels("plain");
    const cw = 4.05, gx = 0.14, ih = 2.25;
    const cells = [["screen_upload.png", "Upload and map: the system fixes the mess", 16 / 9], ["screen_heatmap.png", "Topic map: strengths, gaps, untaught topics", 16 / 9], ["screen_support_list.png", "Weekly support list: reasons and actions", 16 / 9],
      ["screen_student_profile.png", "Student profile: mastery with doubt, honest range", 16 / 9], ["screen_owner.png", "Owner dashboard: retention, coverage, compliance", 16 / 9], ["screen_parent_report.png", "Parent report in Hindi and English", 5 / 3]];
    cells.forEach((c, i) => {
      const col = i % 3, rw = Math.floor(i / 3);
      const x = L + col * (cw + gx), y = 1.22 + rw * 2.85;
      const w = c[2] === 16 / 9 ? cw : ih * c[2], xx = x + (cw - w) / 2;
      s.addShape("rect", { x: xx - 0.04, y: y - 0.04, w: w + 0.08, h: ih + 0.08, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
      pic(s, c[0], xx, y, w, ih, c[1]);
      rect(s, x, y + ih + 0.12, 0.3, 0.3, T.tealDark);
      text(s, String(i + 1), { x, y: y + ih + 0.12, w: 0.3, h: 0.3, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, c[1], { x: x + 0.4, y: y + ih + 0.07, w: cw - 0.45, h: 0.4, fontSize: 11.5, bold: true, color: T.navy, valign: "middle" });
    });
    source(s, "Illustrative mock-ups rendered from HTML with synthetic values; they become real screenshots once the web app is wired to the models.");
    s.addNotes("Product tour: upload, topic map, support list, profile, owner dashboard, parent report. All images are illustrative mock-ups (HTML rendered by headless Edge) using synthetic data and real report text from the report module.");
  }

  // ================================================================ 8 DIFFERENT (dark image)
  {
    const s = pres.addSlide({ masterName: "FULL", sectionTitle: "Appendix" });
    s.addImage({ path: path.join(__dirname, "..", "assets", "what_makes_us_different.png"), x: 0, y: 0, w: W, h: H, altText: "What makes us different: eight differentiators" });
    s.addNotes("Differentiators. Item 05 (small-batch strength) is marked result pending until the difficulty-recovery curve exists. Item 08 refers to public-data results and the independent attack on the report checker, with misses listed.");
  }

  {
    const s = content("Appendix", "Appendix 10: every external number in the deck, where it came from, and where we used it", "Source register", ["APPENDIX 10: SOURCE REGISTER", 7]);
    dtable(s, L, 1.22, [0.35, 3.6, 5.0, 2.55, CWD - 11.5], ["#", "Source", "Used for", "Confidence", "Slide"], [
      ["1", "NTA NEET UG 2025 result data (via Careers360, ALLEN)", "22.76 lakh registered candidates", "High (official)", "2, 3"],
      ["2", "JEE Main 2025 statistics (Vedantu; NTA total not found)", "About 15.4 lakh unique registrations", "Medium (secondary)", "2, 3"],
      ["3", "NSO Comprehensive Modular Survey: Education 2025 (via Careers360)", "27 % of school students in private coaching", "High (official)", "3"],
      ["4", "Case participant guide", "8 to 15 % dropout, ₹36,000 per leaver, ₹17.3 lakh, ₹40, 25 %", "Illustrative", "2, 3, 4"],
      ["5", "Vendor listings: Classplus, Fedena, Graphy, Edmingle (financial/research R1)", "₹4 to ₹21 per student per month anchors", "Medium", "4, 12"],
      ["6", "Outreach trials in comparable settings (financial/research R4)", "8 trials, mean 15.8 % reduction", "Medium", "4, 11"],
      ["7", "OULAD (Open University, CC BY 4.0), our runs", "0.706 AUC, 0.009 calibration, 0.46 precision", "Measured", "2, 4, 8, 13"],
      ["8", "PLOS ONE 2026, OULAD withdrawal study", "Published 0.727 / 0.794 / 0.804 anchors", "High", "4, 8"],
      ["9", "Liu et al., pyKT, NeurIPS 2022; ASSISTments 2009, our runs", "DKT 0.754, SAKT 0.725, AKT 0.785; ours 0.763", "Measured", "2, 7"],
      ["10", "DPDP Act 2023 s.9; DPDP Rules 2025", "Parental consent, no tracking of children", "High (primary)", "4, 10"],
      ["11", "MoE Guidelines for Coaching Centres 2024", "cl. 10.2(xi), 12(vii), 10.1, 8(iv)", "High (primary)", "10, A6"],
      ["12", "Rajasthan Coaching Centres Act 2025", "s.6(2)(d) instalments", "High (primary)", "A6"],
      ["13", "WhatsApp and LLM price pages, Patna pay data (financial/research R5, R6)", "Cost per student, staff hour ₹100", "Medium to high", "11, A4"]],
      { rowH: 0.405, headH: 0.3, size: 9.5, leftCols: [1, 2, 3], rowStyles: Array(13).fill(0).map((_, i) => i % 2 ? "white" : "band") });
    source(s, "Full citations with URLs and licences: technical/docs/CITATIONS.md and financial/research. Every model number traces to the financial workbook or a metrics.json file.");
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
