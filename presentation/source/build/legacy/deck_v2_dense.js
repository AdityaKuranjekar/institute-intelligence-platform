// Builds slides/AlphaQ_CaseB_Round1.pptx (dense consultant style v2). Run: node deck.js  (from slides/build)
// Needs slides/assets/*.png from: python export_html.py && python charts.py
const pptxgen = require("pptxgenjs");
const path = require("path");
const { T, F, W, H, makeKit } = require("./lib");
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
  const { text, rect, ellipse, line, icon, pill, tag, source, frame, hdrBar, labelBar, callout, dtable, heat, badge, lines, rubric, pic } = kit;

  const titleBox = { name: "title", type: "title", x: L, y: 0.34, w: CWD, h: 0.8, fontFace: F.head, fontSize: 24, bold: true, color: T.navy, valign: "top", margin: 0 };
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { text: { text: "AlphaQ", options: { x: 11.2, y: 7.1, w: 1.0, h: 0.28, fontFace: F.head, bold: true, fontSize: 12, color: T.navy, align: "right", margin: 0, valign: "middle" } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.1, w: 0.5, h: 0.28, fontFace: F.body, fontSize: 11, color: T.muted, align: "right" },
  });
  pres.defineSlideMaster({
    title: "WALL", background: { color: "061529" },
    objects: [{ placeholder: { options: Object.assign({}, titleBox, { color: T.white, fontSize: 26 }), text: "" } }],
  });
  pres.defineSlideMaster({ title: "FULL", background: { color: "061529" }, objects: [] });
  pres.defineSlideMaster({
    title: "CLOSING", background: { color: T.navy },
    objects: [
      { text: { text: "AlphaQ", options: { x: L, y: 6.7, w: 3, h: 0.45, fontFace: F.head, bold: true, fontSize: 22, color: T.white, margin: 0, valign: "middle" } } },
      { placeholder: { options: Object.assign({}, titleBox, { color: T.white, fontSize: 32, y: 0.5, h: 0.9 }), text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "DARK", background: { color: T.navy },
    objects: [
      { text: { text: "AlphaQ", options: { x: L, y: 6.7, w: 3, h: 0.45, fontFace: F.head, bold: true, fontSize: 22, color: T.white, margin: 0, valign: "middle" } } },
      { placeholder: { options: { name: "title", type: "title", x: L, y: 1.5, w: 6.3, h: 2.6, fontFace: F.head, fontSize: 36, bold: true, color: T.white, valign: "top", margin: 0 }, text: "" } },
    ],
  });

  const content = (section, title, rub) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    s.addText(title, { placeholder: "title" });
    rubric(s, rub);
    return s;
  };

  // ================================================================ TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Opening" });
    text(s, "CASE B  ·  THE DATA MOAT", { x: L, y: 0.85, w: 6.3, h: 0.35, fontSize: 13, bold: true, color: T.tealOnDark, charSpacing: 2 });
    s.addText("Intelligence for the coaching institutes that run on Excel, OMR sheets and WhatsApp", { placeholder: "title" });
    text(s, "One upload becomes a topic map, a weekly support list and a verified Hindi and English parent report. Offline, private, free to run.", { x: L, y: 4.2, w: 6.2, h: 1.0, fontSize: 16, color: "DCE6F2" });
    const kp = [["0.763", "AUC on ASSISTments (public)"], ["0.706", "AUC on OULAD, day 28 (public)"], ["₹3.6", "per student per month"]];
    kp.forEach((k, i) => {
      const x = L + i * 2.1;
      rect(s, x, 5.45, 1.95, 0.95, "10325B", {});
      text(s, k[0], { x: x + 0.12, y: 5.5, w: 1.7, h: 0.5, fontSize: 24, bold: true, color: T.white, fontFace: F.head });
      text(s, k[1], { x: x + 0.12, y: 6.0, w: 1.75, h: 0.36, fontSize: 9.5, color: "B9C7DA" });
    });
    text(s, "Round 1  ·  Nextute x Finance Club, IIT Patna", { x: L + 1.5, y: 6.7, w: 5, h: 0.45, fontSize: 13, color: "B9C7DA", valign: "middle" });
    pic(s, "screen_heatmap.png", 7.05, 0.75, 5.6, 3.15, "Topic mastery screen (illustrative)");
    pic(s, "screen_support_list.png", 7.45, 2.45, 5.4, 3.04, "Support list screen (illustrative)");
    pic(s, "screen_student_profile.png", 7.05, 4.1, 3.4, 1.91, "Student profile screen (illustrative)");
    [[7.05, 0.75, 5.6, 3.15], [7.45, 2.45, 5.4, 3.04], [7.05, 4.1, 3.4, 1.91]].forEach((b) => s.addShape("rect", { x: b[0], y: b[1], w: b[2], h: b[3], fill: { type: "none" }, line: { color: T.tealOnDark, width: 1.5 } }));
    tag(s, "mock", 7.05, 6.2);
    text(s, "Screens show synthetic students; accuracy figures are on public data.", { x: 9.0, y: 6.15, w: 3.9, h: 0.36, fontSize: 9.5, color: "B9C7DA", valign: "middle" });
    s.addNotes("Title. Right-hand screens are illustrative mock-ups rendered from HTML with synthetic values. The two AUC figures are results on public datasets (ASSISTments 2009 under the pyKT protocol, OULAD day 28); the 3.6 rupee figure is the model's all-in cost per student per month.");
  }

  // ================================================================ 1 PROBLEM
  pres.addSection({ title: "Problem and product" });
  {
    const s = content("Problem and product", "Institutes hold the data, but notice a struggling student only after they leave", "Problem framing · Participant Guide §2, §7");
    frame(s, L, 1.22, 4.75, 2.9, "WHO LOSES TODAY");
    const pers = [["FaChalkboardUser", "Teachers", "Learn which topics are weak only after the exam.", T.navy],
      ["FaBuilding", "Owners", "Cannot compare batches or teaching methods.", T.tealDark],
      ["FaUsers", "Parents", "Get a marks list and little else, so trust suffers.", T.navy],
      ["FaChildReaching", "Students", "Noticed only after they stop paying or coming.", T.tealDark]];
    for (let i = 0; i < 4; i++) {
      const y = 1.62 + i * 0.6;
      await badge(s, pers[i][0], L + 0.15, y, 0.46, pers[i][3]);
      text(s, pers[i][1], { x: L + 0.75, y, w: 1.0, h: 0.46, fontSize: 12.5, bold: true, color: T.navy, valign: "middle", fontFace: F.head });
      text(s, pers[i][2], { x: L + 1.75, y, w: 2.9, h: 0.46, fontSize: 11, valign: "middle" });
    }
    const x2 = 5.3, w2 = 4.35;
    frame(s, x2, 1.22, w2, 2.9, "WHERE THE DATA LIVES");
    const src = [["FaFileLines", "Paper OMR sheets", "Marks kept; per-question answers rarely are."], ["FaFileExcel", "Excel and registers", "Headers, names and dates differ file to file."], ["FaWhatsapp", "WhatsApp groups", "Photos and chats, with no structure to analyse."]];
    for (let i = 0; i < 3; i++) {
      const y = 1.62 + i * 0.66;
      rect(s, x2 + 0.15, y, w2 - 0.3, 0.58, C2.soft);
      await badge(s, src[i][0], x2 + 0.22, y + 0.07, 0.44, T.tealDark);
      text(s, src[i][1], { x: x2 + 0.78, y, w: 1.6, h: 0.58, fontSize: 11.5, bold: true, valign: "middle" });
      text(s, src[i][2], { x: x2 + 2.35, y, w: w2 - 2.55, h: 0.58, fontSize: 10.5, valign: "middle" });
    }
    labelBar(s, x2 + 0.15, 3.68, w2 - 0.3, "Result: no topic view, no early warning", { h: 0.3, size: 11.5, fill: T.navy });
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
    frame(s, L, 4.25, 4.75, 2.7, "WHEN STUDENTS LEAVE AND RETURN");
    pic(s, "chart_roster.png", L + 0.15, 4.65, 4.45, 2.0, "Active roster index through the session");
    tag(s, "model", L + 0.15, 6.68, { label: "ASSUMPTION, LOW CONFIDENCE", size: 8, h: 0.2 });
    frame(s, 5.3, 4.25, 4.35, 2.7, "THE BUYER'S CONSTRAINTS");
    const cons = [["FaIndianRupeeSign", "Price-sensitive", "Generic apps cost ₹4 to ₹21 per student per month today."], ["FaTable", "Low-tech staff", "Excel, registers and the phone camera."], ["FaWifi", "Patchy internet", "So it must work offline, on one laptop."], ["FaUserShield", "Minors' data", "DPDP Act and MoE coaching rules apply."]];
    for (let i = 0; i < 4; i++) {
      const x = 5.42 + (i % 2) * 2.1, y = 4.65 + Math.floor(i / 2) * 1.12;
      rect(s, x, y, 2.0, 1.02, C2.soft);
      await badge(s, cons[i][0], x + 0.08, y + 0.08, 0.36, T.navy);
      text(s, cons[i][1], { x: x + 0.5, y: y + 0.05, w: 1.45, h: 0.4, fontSize: 11, bold: true, valign: "middle" });
      text(s, cons[i][2], { x: x + 0.08, y: y + 0.48, w: 1.85, h: 0.52, fontSize: 9.5 });
    }
    frame(s, x3, 4.25, w3, 2.7, "WHAT ALPHAQ DOES");
    const wd = ["Topic-level view of every student", "A short, supportive list each week", "An honest percentile range", "Verified Hindi and English reports", "Runs offline, free to run"];
    for (let i = 0; i < wd.length; i++) {
      await icon(s, "FaCircleCheck", x3 + 0.16, 4.72 + i * 0.37, 0.22, T.tealDark);
      text(s, wd[i], { x: x3 + 0.48, y: 4.66 + i * 0.37, w: w3 - 0.6, h: 0.34, fontSize: 10.5, valign: "middle" });
    }
    labelBar(s, x3 + 0.12, 6.58, w3 - 0.24, "Next: how it works", { h: 0.27, size: 10.5 });
    source(s, "Sources: Participant Guide sections 2, 6 and 7 (illustrative baselines); roster index and competitor prices from financial/ (assumptions and research, confidence low to medium).");
    s.addNotes("Dense problem slide. The 8-15 percent and 36,000 rupee figures and the 17.3 lakh total are the guide's illustrative baselines (400 x 12% x 36,000). The roster index is an assumption in the financial model; competitor price range comes from the finance research (listed prices, low-medium confidence).");
  }

  // ================================================================ 2 PRODUCT WALL (dark)
  {
    const s = pres.addSlide({ masterName: "WALL", sectionTitle: "Problem and product" });
    s.addText("From one upload to action: six screens of the same flow", { placeholder: "title" });
    const cw = 4.05, gx = 0.14, ih = 2.28;
    const cells = [["screen_upload.png", "Upload and map: the system fixes the mess", 16 / 9], ["screen_heatmap.png", "Topic map: strengths, gaps, untaught topics", 16 / 9], ["screen_support_list.png", "Weekly support list: reasons and actions", 16 / 9],
      ["screen_student_profile.png", "Student profile: mastery with doubt, honest range", 16 / 9], ["screen_owner.png", "Owner dashboard: retention, coverage, compliance", 16 / 9], ["screen_parent_report.png", "Parent report in Hindi and English", 5 / 3]];
    cells.forEach((c, i) => {
      const col = i % 3, rw = Math.floor(i / 3);
      const x = L + col * (cw + gx), y = 1.2 + rw * 2.85;
      const w = c[2] === 16 / 9 ? cw : ih * c[2], xx = x + (cw - w) / 2;
      pic(s, c[0], xx, y, w, ih, c[1]);
      s.addShape("rect", { x: xx, y, w, h: ih, fill: { type: "none" }, line: { color: T.tealOnDark, width: 1.25 } });
      ellipse(s, x, y + ih + 0.1, 0.32, 0.32, T.tealOnDark);
      text(s, String(i + 1), { x, y: y + ih + 0.1, w: 0.32, h: 0.32, fontSize: 12, bold: true, color: T.navy, align: "center", valign: "middle" });
      text(s, c[1], { x: x + 0.42, y: y + ih + 0.04, w: cw - 0.5, h: 0.44, fontSize: 11.5, bold: true, color: "E8F0FA", valign: "middle" });
    });
    text(s, "Illustrative mock-ups rendered from HTML with synthetic values. They become real screenshots once the web app is wired to the models.", { x: L, y: 7.08, w: 10.5, h: 0.3, fontSize: 10, color: "9FB4CF", valign: "middle" });
    s.addNotes("Product wall in the style of a demo reel: upload, topic map, support list, profile, owner dashboard, parent report. All images are illustrative mock-ups (HTML rendered by headless Edge) using synthetic data and real report text from the report module.");
  }

  // ================================================================ 3 ARCHITECTURE (full-bleed)
  pres.addSection({ title: "Technology" });
  {
    const s = pres.addSlide({ masterName: "FULL", sectionTitle: "Technology" });
    s.addImage({ path: path.join(__dirname, "..", "assets", "arch_under_the_hood.png"), x: 0, y: 0, w: W, h: H, altText: "System architecture: capture, structure, intelligence, deliver, with a trust layer underneath" });
    s.addNotes("Architecture. Status tags: BUILT means working code with tests; IN BUILD means in progress; DESIGNED means specified but not coded. Evidence boxes are real: 12 messy export files and 210 synthetic OMR images exist; 31 tables and tenant isolation tested on a live PostgreSQL 16; OULAD 0.706 and ASSISTments 0.763 on public data; 20 templates and 8 checks.");
  }

  // ================================================================ 4 LEARNING ANALYTICS
  {
    const s = content("Technology", "We estimate what each student knows, topic by topic, and say how sure we are", "ML rigour 25 % · learning analytics");
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
    const s = content("Technology", "A short, supportive list each week: who to call, why, and what to offer", "ML rigour 25 % · early warning");
    frame(s, L, 1.22, 5.0, 5.7, "WHAT THE MENTOR SEES");
    pic(s, "screen_support_list.png", L + 0.1, 1.6, 4.8, 2.7, "Support list (illustrative)");
    callout(s, 1, L + 3.7, 2.15); callout(s, 2, L + 2.2, 2.35);
    text(s, "ROUTING BY AGE AND PURPOSE", { x: L + 0.1, y: 4.35, w: 4.8, h: 0.26, fontSize: 10.5, bold: true, color: T.navy });
    dtable(s, L + 0.1, 4.62, [1.3, 1.2, 1.15, 1.15], ["", "Academic support", "Dropout", "Fees"],
      [["Under 18", { t: "Model", fill: C2.green, bold: true }, { t: "Plain rules", fill: C2.gold }, { t: "Plain rules", fill: C2.gold }],
        ["18 and over", { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }],
        ["Minors, legal opinion", { t: "Model", fill: C2.green, bold: true }, { t: "Model", fill: C2.green, bold: true }, { t: "Plain rules", fill: C2.gold }]],
      { rowH: 0.34, headH: 0.28, size: 10, headFill: T.navy });
    text(s, "Never used for minors: app activity tracking. Flags persist until resolved; list capped at mentor capacity.", { x: L + 0.1, y: 5.98, w: 4.8, h: 0.4, fontSize: 9.5, color: T.muted });
    tag(s, "mock", L + 0.1, 6.4);
    labelBar(s, L + 0.1, 6.62, 4.8, "Visible to mentor and owner only", { h: 0.27, size: 10.5, fill: T.navy });
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
      await badge(s, fl[i][0], rx + 0.12, y, 0.36, i % 2 ? T.tealDark : T.navy);
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
    const s = content("Technology", "An honest percentile range, and a parent report where every number is checked", "ML rigour 25 % · GenAI with guardrails");
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
      await badge(s, pl[i][0], rx + 0.12, y, 0.4, i === 2 ? T.tealDark : T.navy);
      text(s, pl[i][1], { x: rx + 0.62, y, w: rw - 0.74, h: 0.4, fontSize: 11.5, bold: true, color: T.navy, valign: "middle" });
      text(s, pl[i][2], { x: rx + 0.62, y: y + 0.4, w: rw - 0.74, h: 0.62, fontSize: 10 });
    }
    tag(s, "built", rx + 0.12, 6.15);
    text(s, "16 automated tests", { x: rx + 0.85, y: 6.12, w: rw - 1.0, h: 0.3, fontSize: 10, valign: "middle", color: T.muted });
    source(s, "Sources: backend/app/genai (report module), contracts/report_numbers.schema.json. An independent attack on the checker found gaps; fixes are in progress, so no catch rate is claimed here.");
    s.addNotes("Prediction range is schematic until Agent C delivers coverage numbers. The report images use real template output. Do not state a verifier catch rate until the independent adversarial test passes after the E2 fixes.");
  }

  // ================================================================ 7 PRIVACY
  {
    const s = content("Technology", "Built for the law: consent first, supportive actions only, no rankings", "Feasibility, privacy and safety 20 %");
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

  // ================================================================ 8 DIFFERENT (dark image)
  {
    const s = pres.addSlide({ masterName: "FULL", sectionTitle: "Technology" });
    s.addImage({ path: path.join(__dirname, "..", "assets", "what_makes_us_different.png"), x: 0, y: 0, w: W, h: H, altText: "What makes us different: eight differentiators" });
    s.addNotes("Differentiators. Item 05 (small-batch strength) is marked result pending until the difficulty-recovery curve exists. Item 08 refers to public-data results and the independent attack on the report checker, with misses listed.");
  }

  // ================================================================ 9 ROI
  pres.addSection({ title: "Business" });
  {
    const s = content("Business", "It pays for itself if it saves three or four students a year", "Revenue model and unit economics 20 %");
    frame(s, L, 1.22, 3.95, 5.7, "KEY ASSUMPTIONS (MID, BASE)");
    dtable(s, L + 0.08, 1.6, [1.5, 0.75, 1.0, 0.5], ["Assumption", "Base", "Range", "Conf."], [
      ["Students", "400", "180 to 1,200", "M"], ["Annual fee", "₹95,000", "70k to 120k", "L"], ["Mid-session dropout", "10 %", "6 to 18 %", "L"],
      ["Outreach effect", "15 %", "5 to 30 %", "M"], ["Share preventable", "45 %", "30 to 60 %", "L"], ["Recall, under 18", "55 %", "40 to 70 %", "L"],
      ["Recall, 18+", "65 %", "50 to 80 %", "M"], ["Flag precision", "35 %", "25 to 50 %", "L"], ["Flags acted on", "90 %", "70 to 100 %", "L"],
      ["Admissions uplift", "1 %", "0 to 3 %", "L"], ["Staff hours saved", "25 a month", "10 to 50", "L"], ["List price", "₹30", "₹20 to 40", "L"], ["GST reclaimed", "60 %", "30 to 90 %", "L"]],
      { rowH: 0.33, headH: 0.3, size: 9.5 });
    text(s, "Conf.: H high, M medium, L low. Low means an assumption to test in owner interviews.", { x: L + 0.1, y: 6.28, w: 3.7, h: 0.5, fontSize: 9.5, color: T.muted });
    const mx = 4.55, mw = 4.85;
    frame(s, mx, 1.22, mw, 5.7, "INSTITUTE ECONOMICS: GUIDE VS ALPHAQ");
    dtable(s, mx + 0.08, 1.6, [1.75, 0.7, 0.75, 0.8, 0.7], ["Per year, 400 students", "Guide", "Bear", "Base", "Bull"], [
      ["Effective dropout reduction", "25 %", "1.0 %", "6.6 %", "22 %"], ["Dropouts prevented", "12", "0.2", "2.6", "16"], ["Fee lost per dropout", "₹36,000", "₹15,414", "₹36,967", "₹56,994"],
      ["Fees retained", "₹4.32 L", "₹2,928", "₹89,672", "₹9.11 L"], ["Total value", "₹4.32 L", "₹11,928", "₹3.48 L", "₹21.5 L"], ["Total cost to institute", "₹1.92 L", "₹78,544", "₹1.20 L", "₹1.53 L"],
      ["Return, all benefits", "2.25x", "0.15x", "2.9x", "14x"], ["Return, fees only", "2.25x", "0.04x", "0.75x", "5.9x"], ["Students to save to break even", "5.3", "6.5", "3.5", "2.7"]],
      { rowH: 0.43, headH: 0.34, size: 9.5, rowStyles: ["band", "white", "band", "gold", "band", "white", "green", "green", "gold"], headFills: [T.navy, T.muted, T.muted, T.tealDark, T.muted] });
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
    const s = content("Business", "The economics are real, but thinner than the guide's 10x", "Revenue model and unit economics 20 %");
    frame(s, L, 1.22, 4.35, 5.7, "UNIT ECONOMICS (MID, BASE)");
    dtable(s, L + 0.08, 1.6, [1.9, 0.95, 1.3], ["Per institute", "Guide", "AlphaQ"], [
      ["LTV ÷ acquisition cost", "10.7x", { t: "3.7x", bold: true }], ["Payback", "3.1 months", { t: "6 months", bold: true }], ["Contribution margin", "66 %", { t: "78 %", bold: true }],
      ["Lifetime value", "₹3.53 lakh", { t: "₹1.30 lakh", bold: true }], ["Acquisition cost", "₹33,000", { t: "₹35,492", bold: true }], ["Revenue, monthly", "₹16,000", { t: "₹8,612", bold: true }],
      ["Contribution, monthly", "₹10,600", { t: "₹6,740", bold: true }], ["Annual logo retention", "69 %", { t: "64 %", bold: true }], ["Institutes to cover fixed team cost", "n/a", { t: "18", bold: true }]],
      { rowH: 0.42, headH: 0.32, size: 10, rowStyles: ["gold", "band", "white", "band", "white", "band", "white", "band", "green"], headFills: [T.navy, T.muted, T.tealDark] });
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
      rect(s, X(d[1]), y + 0.08, X(base) - X(d[1]), 0.26, "9FD3D4");
      rect(s, X(base), y + 0.08, X(d[2]) - X(base), 0.26, T.tealDark);
      text(s, d[1].toFixed(1), { x: X(d[1]) - 0.38, y, w: 0.36, h: 0.42, fontSize: 9, color: T.muted, align: "right", valign: "middle" });
      text(s, d[2].toFixed(1), { x: X(d[2]) + 0.03, y, w: 0.4, h: 0.42, fontSize: 9, color: T.muted, valign: "middle" });
    });
    rect(s, X(base) - 0.01, 1.9, 0.02, 2.6, T.navy);
    text(s, "Base 3.7x", { x: X(base) - 0.5, y: 4.5, w: 1.0, h: 0.24, fontSize: 9, bold: true, color: T.navy, align: "center" });
    pic(s, "chart_ltv_segments.png", rx + 0.35, 4.8, 2.3, 1.72, "LTV over acquisition cost by segment");
    source(s, "Source: financial workbook (Scenarios, Sensitivity). List price ₹30; ERP and LMS prices found: ₹4 to ₹21. Willingness to pay is untested.");
    s.addNotes("Heat tables are the two grids of the Sensitivity sheet. Bear, Base and Bull LTV/CAC for the mid institute are -0.1x, 3.7x and 24x. The segment bars show small 1.5x, mid 3.7x, large 9.1x with paybacks of 18, 6 and 3 months.");
  }

  // ================================================================ 11 GTM
  {
    const s = content("Business", "Start with mid-size institutes in Patna and Lucknow, keep small ones self-serve", "Market and go-to-market 10 %");
    frame(s, L, 1.22, 4.9, 3.3, "WHAT INSTITUTES PAY TODAY");
    pic(s, "chart_price_benchmark.png", L + 0.1, 1.6, 4.7, 2.6, "Listed prices of generic institute apps");
    tag(s, "model", L + 0.12, 4.22, { label: "MODEL OUTPUT INPUTS: LISTED PRICES, LOW TO MEDIUM", size: 8, h: 0.2 });
    const fx = 5.5, fw = 3.95;
    frame(s, fx, 1.22, fw, 3.3, "THE FUNNEL");
    const stg = [["Retro-pilot", "Last year's Excel: who left, would we have caught them?", 3.65], ["Paid pilot", "One month, measures agreed in advance; about 30 % convert (15 to 50 %).", 3.15], ["Onboarded", "Full onboarding only after conversion; about ₹8,000 each.", 2.65]];
    stg.forEach((st, i) => {
      const y = 1.62 + i * 0.95, w = st[2], x = fx + (fw - w) / 2;
      rect(s, x, y, w, 0.88, i === 2 ? T.tealDark : i === 1 ? T.teal : T.navy);
      text(s, [{ text: st[0] + "  ", options: { bold: true, color: T.white, fontSize: 12 } }, { text: st[1], options: { color: "E8F0FA", fontSize: 10 } }], { x: x + 0.1, y, w: w - 0.2, h: 0.88, valign: "middle" });
    });
    const sx = 9.6, sw = R - 9.6;
    frame(s, sx, 1.22, sw, 3.3, "SEGMENTS (BASE)");
    dtable(s, sx + 0.08, 1.6, [0.85, 0.7, 0.7, 0.8], ["", "Small", "Mid", "Large"], [
      ["Students", "180", "400", "1,200"], ["Annual fee", "₹65k", "₹95k", "₹1.25L"], ["LTV÷CAC", "1.5x", { t: "3.7x", bold: true }, "9.1x"], ["Payback", "18 mo", { t: "6 mo", bold: true }, "3 mo"], ["Motion", "Self-serve", { t: "Field", bold: true }, "Field"]],
      { rowH: 0.36, headH: 0.3, size: 9.5, headFills: [T.navy, T.muted, T.tealDark, T.muted] });
    text(s, "Selling window: March to June, before the new session.", { x: sx + 0.1, y: 3.8, w: sw - 0.2, h: 0.5, fontSize: 10, bold: true, color: T.navy });
    for (let i = 0; i < 12; i++) {
      const hot = i === 11 || i < 3;
      rect(s, sx + 0.1 + i * ((sw - 0.2) / 12), 4.3, (sw - 0.2) / 12 - 0.02, 0.18, hot ? T.tealDark : "DCEEF3");
    }
    frame(s, L, 4.65, 8.2, 2.3, "WHAT GENERIC APPS SHOW (VENDOR LISTINGS, OCT 2026)");
    const mark = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? C2.gold : "F4F7FB", bold: true, color: t === "yes" ? T.green : T.muted });
    dtable(s, L + 0.1, 5.02, [2.2, 1.0, 1.1, 1.1, 0.9, 1.0, 0.8], ["", "OMR", "Topic analytics", "Parent reports", "Hindi", "Consent ledger", "WhatsApp"], [
      ["Classplus", mark("?"), mark("?"), mark("?"), mark("?"), mark("?"), mark("?")],
      ["Fedena", mark("no"), mark("?"), mark("yes"), mark("?"), mark("no"), mark("no")],
      ["Edmingle", mark("no"), mark("?"), mark("?"), mark("?"), mark("no"), mark("yes")],
      ["Teachmint", mark("?"), mark("?"), mark("yes"), mark("yes"), mark("?"), mark("?")],
      [{ t: "AlphaQ", bold: true, color: T.tealDark }, { t: "designed", fill: C2.gold, bold: true }, mark("yes"), mark("yes"), mark("yes"), mark("yes"), { t: "preview", fill: C2.gold, bold: true }]],
      { rowH: 0.27, headH: 0.28, size: 9.5, rowStyles: ["white", "white", "white", "white", "white"] });
    text(s, "yes: shown in the listing   no: not shown   ?: not verified from the listing", { x: L + 0.1, y: 6.68, w: 8.0, h: 0.24, fontSize: 8.5, color: T.muted });
    const cx0 = 8.8, cw0 = R - 8.8;
    frame(s, cx0, 4.65, cw0, 2.3, "COMPLIANCE AS A FEATURE");
    const cp = [["FaCalendarDays", "No test the day after the weekly off"], ["FaMoneyBillWave", "Pro-rata refund calculator, 10-day rule"], ["FaUserShield", "Age check at enrolment, consent ledger"], ["FaFileLines", "Attendance and fee registers, exportable"]];
    for (let i = 0; i < 4; i++) {
      await badge(s, cp[i][0], cx0 + 0.12, 5.05 + i * 0.46, 0.34, i % 2 ? T.tealDark : T.navy);
      text(s, cp[i][1], { x: cx0 + 0.55, y: 5.05 + i * 0.46, w: cw0 - 0.65, h: 0.36, fontSize: 10, valign: "middle" });
    }
    source(s, "Sources: financial workbook (segments, pilot assumptions), financial/research (vendor listings; many features could not be verified), MoE Guidelines 2024, Rajasthan Act 2025.");
    s.addNotes("Competitor matrix shows only what vendor listings showed; a question mark means it could not be verified from the listing, not that the feature is absent. Do not state that competitors lack the features.");
  }

  // ================================================================ 12 VALIDATION + PILOT
  pres.addSection({ title: "Validation" });
  {
    const s = content("Validation", "What we proved, what we did not, and how a pilot would settle it", "Feasibility, privacy and safety 20 % · honest limits");
    const cw = 4.05, gx = 0.14, y0 = 1.22, h0 = 3.1;
    const cols = [["PROVED ON PUBLIC DATA", "proved", [["Next-answer AUC", "0.763 (DKT 0.754)"], ["Withdrawal AUC day 28", "0.706 (published 0.794, lower)"], ["Calibration error", "0.009"], ["Academic-only cost", "0.008 AUC"], ["Precision at top 10 %", "0.46 vs 0.24 to 0.31 for rules"]]],
      ["SHOWN ON SYNTHETIC DATA", "pending", [["Pipeline end to end", "over 100 tests pass"], ["Tenant isolation", "0 rows seen across institutes"], ["Report checker", "8 checks, template fallback"], ["Difficulty recovery", "pending"], ["Early-warning lift, range coverage", "pending"]]],
      ["NOT PROVEN YET", "notproven", [["Accuracy on real institutes", "needs a pilot"], ["Willingness to pay", "owner interviews"], ["Real dropout reduction", "borrowed from trials"], ["Hindi quality at scale", "native review"], ["OMR on other sheet layouts", "one-time onboarding"]]]];
    cols.forEach((c, i) => {
      const x = L + i * (cw + gx);
      frame(s, x, y0, cw, h0, null);
      tag(s, c[1], x + 0.12, y0 + 0.1, { label: c[0], size: 9, h: 0.28, w: cw - 0.24 });
      c[2].forEach((r, k) => {
        const y = y0 + 0.5 + k * 0.5;
        rect(s, x + 0.12, y, cw - 0.24, 0.46, k % 2 ? T.white : C2.soft);
        text(s, r[0], { x: x + 0.2, y, w: 1.75, h: 0.46, fontSize: 10.5, bold: true, color: T.navy, valign: "middle" });
        text(s, r[1], { x: x + 1.95, y, w: cw - 2.1, h: 0.46, fontSize: 10, valign: "middle" });
      });
    });
    frame(s, L, 4.45, CWD, 2.5, "PILOT PLAN: HOW WE SETTLE THE OPEN QUESTIONS");
    line(s, L + 0.6, 5.15, R - 0.6, 5.15, { color: T.tealDark, w: 2 });
    const ph = [["PHASE 1  ·  WEEKS 0 TO 4", "Retro-pilot at 2 institutes", "Import last year's Excel; show who left and what we would have flagged. Measure recall and precision on their data."], ["PHASE 2  ·  ONE TERM", "Staggered paid pilot", "Half the batches start first; the rest are the comparison. Success measures are written down before we start."], ["PHASE 3  ·  AFTER THE TERM", "Decide and scale", "Fix the percentile mapping with real exam outcomes; publish what worked and what did not."]];
    ph.forEach((p, i) => {
      const x = L + 0.35 + i * 4.1;
      ellipse(s, x + 0.1, 5.05, 0.2, 0.2, T.tealDark);
      hdrBar(s, x, 4.78, 3.85, p[0], { h: 0.24, size: 9.5, fill: T.navy, align: "left" });
      text(s, p[1], { x, y: 5.35, w: 3.85, h: 0.3, fontSize: 12, bold: true, color: T.navy, fontFace: F.head });
      text(s, p[2], { x, y: 5.68, w: 3.85, h: 0.9, fontSize: 10.5 });
    });
    labelBar(s, L + 0.12, 6.62, CWD - 0.24, "Changed from the guide: dropout reduction 25 % to 6.6 %,  LTV ÷ CAC 10.7x to 3.7x.  About a quarter of dropouts are sudden and cannot be predicted from academic data.", { h: 0.28, size: 10.5, fill: T.tealDark });
    source(s, "Sources: ml/public_validation, financial workbook, technical/docs/FEASIBILITY_CHECK.md. Pending items are replaced with measured values before submission.");
    s.addNotes("Replace amber pending items with measured values from deck_numbers.py. Limitations to state first: synthetic data proves the pipeline only; the percentile mapping is an assumption table; difficulty scales are comparable across institutes only through anchors.");
  }

  // ================================================================ APPENDIX
  pres.addSection({ title: "Appendix" });
  {
    const s = content("Appendix", "Appendix 1: 31 tables in five groups, all isolated per institute", "Data model");
    const groups = [["PEOPLE", "institutes, users, students, guardians, batches, batch_changes, consents, legal_settings"], ["LEARNING", "topics, topic_prereqs, questions, question_topics, item_params, tests, test_questions, answer_keys, marking_schemes"],
      ["RESULTS", "responses, test_totals, attendance, fees, engagement"], ["INTELLIGENCE", "mastery_snapshots, risk_scores, predictions, interventions, reports, model_registry"], ["OPERATIONS", "ingest_jobs, omr_templates, audit_log"]];
    groups.forEach((g, i) => {
      const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.5, w = 4.05;
      frame(s, x, y, w, 2.35, g[0]);
      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.7, fontSize: 12 });
    });
    frame(s, L + 2 * 4.18, 3.8, 4.05, 2.35, "DELIBERATELY NOT STORED");
    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.3, 3.7, 1.8, { size: 12, gap: 6 });
    labelBar(s, L, 6.4, CWD, "Row-level security on every tenant table; another institute sees 0 rows (tested on PostgreSQL 16)", { h: 0.34, size: 12, fill: T.navy });
    source(s, "Source: technical/contracts/schema.sql. Synthetic data: 4 institutes, 3 academic years, known ground truth.");
  }
  {
    const s = content("Appendix", "Appendix 2: about ₹3.6 per student per month, ₹0 extra run locally", "Cost per student");
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
    const s = content("Appendix", "Appendix 3: the rules we design against, and what we do about each", "Legal basis");
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
    const s = content("Appendix", "Appendix 4: every result follows the same protocol, and misses are reported", "How we test");
    const items = [["FaShieldHalved", "No leakage", "Features use only data before the as-of date. Splits are by student and by year, never by row."], ["FaScaleBalanced", "Baselines at equal workload", "Each model sits beside a simple rule at the same weekly top-k."], ["FaChartColumn", "Uncertainty", "Bootstrap intervals over students, three generator seeds, event counts shown."],
      ["FaTriangleExclamation", "Stress tests", "Misspecified generators, a held-out institute, an independent attack on the report checker."], ["FaFlag", "Honest misses", "A missed bar is reported with its cause. Bars are never moved to pass."], ["FaCircleCheck", "Public data", "OULAD and ASSISTments under published protocols, with deviations listed."]];
    for (let i = 0; i < 6; i++) {
      const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.85;
      frame(s, x, y, 4.05, 2.7, null);
      await badge(s, items[i][0], x + 0.2, y + 0.2, 0.55, i % 2 ? T.tealDark : T.navy);
      text(s, items[i][1], { x: x + 0.95, y: y + 0.2, w: 2.95, h: 0.55, fontSize: 14, bold: true, color: T.navy, valign: "middle", fontFace: F.head });
      text(s, items[i][2], { x: x + 0.2, y: y + 1.0, w: 3.65, h: 1.5, fontSize: 12 });
    }
    source(s, "Sources: technical/docs/agent_prompts/R1_00_COMMON.md and technical/docs/FEASIBILITY_CHECK.md.");
  }
  {
    const s = content("Appendix", "Appendix 5: Bear, Base and Bull for a mid-size institute, plus segments", "Scenarios");
    frame(s, L, 1.22, 8.1, 5.7, "MID INSTITUTE (400 STUDENTS)");
    dtable(s, L + 0.1, 1.62, [3.3, 1.5, 1.5, 1.5], ["Per year unless stated", "Bear", "Base", "Bull"], [
      ["Effective dropout reduction", "1.0 %", "6.6 %", "22.2 %"], ["Dropouts prevented", "0.2", "2.6", "16"], ["Institute return, all benefits", "0.15x", "2.9x", "14x"], ["Institute return, fees only", "0.04x", "0.75x", "5.9x"],
      ["Students to save to break even", "6.5", "3.5", "2.7"], ["Revenue per institute, monthly", "₹4,992", "₹8,612", "₹11,999"], ["Fully loaded acquisition cost", "₹1.74 L", "₹35,492", "₹13,336"], ["LTV ÷ acquisition cost", "-0.1x", "3.7x", "24x"], ["Payback", "61 months", "6 months", "2 months"]],
      { rowH: 0.45, headH: 0.34, size: 11, rowStyles: ["band", "white", "green", "green", "gold", "band", "white", "gold", "band"], headFills: [T.navy, T.muted, T.tealDark, T.muted] });
    tag(s, "model", L + 0.12, 6.3);
    const rx = 8.7, rw = R - 8.7;
    frame(s, rx, 1.22, rw, 5.7, "BY SEGMENT (BASE)");
    dtable(s, rx + 0.1, 1.62, [1.5, 0.8, 0.8, 0.8], ["", "Small", "Mid", "Large"], [["Return", "2.3x", "2.9x", "3.6x"], ["LTV÷CAC", "1.5x", "3.7x", "9.1x"], ["Payback", "18 mo", "6 mo", "3 mo"]], { rowH: 0.5, headH: 0.32, size: 11, headFills: [T.navy, T.muted, T.tealDark, T.muted] });
    text(s, "Bear changes every input to its worst value at once. It is a stress test, not a forecast.", { x: rx + 0.15, y: 3.7, w: rw - 0.3, h: 1.0, fontSize: 11.5, color: T.muted });
    source(s, "Source: financial workbook (Scenarios sheet). Model output from sourced and assumed inputs, not measured.");
  }

  // ================================================================ FINAL
  pres.addSection({ title: "Closing" });
  {
    const s = pres.addSlide({ masterName: "CLOSING", sectionTitle: "Closing" });
    s.addText("How we used AI, and what we cited", { placeholder: "title" });
    const cw = (CWD - 0.3) / 2;
    [["AI tools", ["Claude: planning, code review, documentation.", "Google Antigravity agents: code generation.", "Perplexity and Gemini Deep Research: literature and regulation research.", "Everything was reviewed and tested by the team; research claims were checked against primary sources where possible."]],
      ["Public data and libraries", ["OULAD (CC BY 4.0), ASSISTments 2009, the pyKT benchmark, JEEBench.", "Noto Sans Devanagari (SIL OFL), LightGBM, Ollama, FastAPI, PostgreSQL.", "Full list with licences: technical/docs/CITATIONS.md in the repository."]]].forEach((c, i) => {
      const x = L + i * (cw + 0.3);
      rect(s, x, 1.7, cw, 4.6, "10325B");
      text(s, c[0], { x: x + 0.3, y: 1.85, w: cw - 0.6, h: 0.45, fontSize: 18, bold: true, color: T.white, fontFace: F.head });
      text(s, c[1].map((t, k) => ({ text: t, options: { breakLine: k < c[1].length - 1, paraSpaceAfter: 10 } })), { x: x + 0.3, y: 2.5, w: cw - 0.6, h: 3.6, fontSize: 15, color: "E6EEF8" });
    });
    text(s, "github.com/AdityaKuranjekar/institute-intelligence-platform", { x: 5.0, y: 6.7, w: 7.88, h: 0.45, fontSize: 13, color: "B9C7DA", align: "right", valign: "middle" });
    s.addNotes("Mandatory disclosure (Problem Statement, rule 2). Keep this as the last slide of the submitted PDF.");
  }

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
