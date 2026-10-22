// Builds slides/AlphaQ_CaseB_Round1.pptx. Run: node deck.js  (from slides/build). Layout and rules: slides/DESIGN_SYSTEM.md, BLUEPRINTS.md
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");
const { T, F, W, H, X0, CW, tw, makeKit } = require("./lib");
const M = require("./mocks");

const OUT = path.join(__dirname, "..", "AlphaQ_CaseB_Round1.pptx");

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "AlphaQ: Case B, The Data Moat (Round 1)";
  pres.author = "AlphaQ";
  pres.company = "AlphaQ";
  pres.theme = { headFontFace: F.head, bodyFontFace: F.body };
  const kit = makeKit(pres);
  const { text, card, rect, ellipse, line, icon, iconCircle, pill, tag, kpi, source, table, eyebrow } = kit;

  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { text: { text: "AlphaQ", options: { x: 11.2, y: 7.02, w: 1.0, h: 0.3, fontFace: F.head, bold: true, fontSize: 12, color: T.navy, align: "right", margin: 0, valign: "middle" } } },
      { placeholder: { options: { name: "title", type: "title", x: X0, y: 0.8, w: 12.2, h: 0.95, fontFace: F.head, fontSize: 28, bold: true, color: T.navy, valign: "top", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.02, w: 0.48, h: 0.3, fontFace: F.body, fontSize: 11, color: T.muted, align: "right" },
  });
  pres.defineSlideMaster({
    title: "DARK", background: { color: T.navy },
    objects: [
      { text: { text: "AlphaQ", options: { x: X0, y: 6.7, w: 3, h: 0.45, fontFace: F.head, bold: true, fontSize: 22, color: T.white, margin: 0, valign: "middle" } } },
      { placeholder: { options: { name: "title", type: "title", x: X0, y: 1.6, w: 6.5, h: 2.6, fontFace: F.head, fontSize: 36, bold: true, color: T.white, valign: "top", margin: 0 }, text: "" } },
    ],
  });

  pres.defineSlideMaster({
    title: "CLOSING", background: { color: T.navy },
    objects: [
      { text: { text: "AlphaQ", options: { x: X0, y: 6.7, w: 3, h: 0.45, fontFace: F.head, bold: true, fontSize: 22, color: T.white, margin: 0, valign: "middle" } } },
      { placeholder: { options: { name: "title", type: "title", x: X0, y: 0.8, w: 12.2, h: 0.9, fontFace: F.head, fontSize: 32, bold: true, color: T.white, valign: "top", margin: 0 }, text: "" } },
    ],
  });
  const reports = M.reportSamples();
  const content = (section) => pres.addSlide({ masterName: "CONTENT", sectionTitle: section });

  // ---------------------------------------------------------------- Title
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Opening" });
    text(s, "CASE B  ·  THE DATA MOAT", { x: X0, y: 0.9, w: 6.5, h: 0.35, fontSize: 13, bold: true, color: T.tealOnDark, charSpacing: 2 });
    s.addText("Intelligence for the coaching institutes that run on Excel, OMR sheets and WhatsApp", { placeholder: "title" });
    text(s, "From one upload to a topic map, a weekly support list and a verified Hindi and English parent report. Offline, private, free to run.",
      { x: X0, y: 4.45, w: 6.3, h: 1.1, fontSize: 18, color: "DCE6F2" });
    text(s, "Round 1  ·  Nextute x Finance Club, IIT Patna", { x: X0 + 1.55, y: 6.7, w: 5, h: 0.45, fontSize: 13, color: "B9C7DA", valign: "middle" });
    M.supportList(kit, s, 7.45, 1.2, 5.3, 4.9, { rows: 8, compact: true, fs: 11 });
    tag(s, "mock", 7.45, 6.25, {});
    s.addNotes("Title slide. The right-hand screen is an illustrative mock-up with synthetic student codes. Team name AlphaQ; replace the text wordmark with the logo when ready.");
  }

  // ---------------------------------------------------------------- 1 Problem
  pres.addSection({ title: "Problem and product" });
  {
    const s = content("Problem and product");
    eyebrow(s, "The problem");
    s.addText("Institutes hold the data, but notice a struggling student only after they leave", { placeholder: "title" });
    const items = [
      ["LuGraduationCap", "Teachers", "Do not know which topics each student is weak in until it is too late."],
      ["LuBuilding2", "Owners", "Cannot tell which batches or teaching methods really work."],
      ["LuUsers", "Parents", "See a marks list and little else, so trust suffers."],
      ["LuUserRound", "Students", "Are noticed only after they stop paying or stop coming."],
    ];
    const cw = (CW - 3 * 0.2) / 4;
    for (let i = 0; i < 4; i++) {
      const x = X0 + i * (cw + 0.2);
      card(s, x, 1.95, cw, 1.85, { fill: T.tint, line: T.tint });
      await iconCircle(s, items[i][0], x + 0.2, 2.1, 0.5);
      text(s, items[i][1], { x: x + 0.82, y: 2.1, w: cw - 1.0, h: 0.5, fontSize: 16, bold: true, color: T.navy, valign: "middle", fontFace: F.head });
      text(s, items[i][2], { x: x + 0.2, y: 2.72, w: cw - 0.4, h: 1.0, fontSize: 14 });
    }
    // where data lives today
    text(s, "Where the data lives today", { x: X0, y: 4.05, w: 6, h: 0.35, fontSize: 16, bold: true, color: T.navy, fontFace: F.head });
    const tiles = [["LuScanLine", "Paper OMR sheets"], ["LuTable2", "Excel and registers"], ["LuMessageCircle", "WhatsApp groups"]];
    const tw3 = 2.2;
    for (let i = 0; i < 3; i++) {
      const x = X0 + i * (tw3 + 0.25);
      card(s, x, 4.5, tw3, 0.95, { fill: T.white });
      await icon(s, tiles[i][0], x + 0.18, 4.78, 0.38, T.tealDark);
      text(s, tiles[i][1], { x: x + 0.7, y: 4.5, w: tw3 - 0.8, h: 0.95, fontSize: 14, bold: true, valign: "middle" });
    }
    card(s, X0, 5.6, 3 * tw3 + 0.5, 0.62, { fill: T.greyLight, line: T.greyLight });
    text(s, "Scattered and inconsistent, so nobody sees the whole picture", { x: X0 + 0.2, y: 5.6, w: 3 * tw3 + 0.1, h: 0.62, fontSize: 14, color: T.ink, valign: "middle" });
    // KPIs
    kpi(s, 8.0, 4.05, 2.35, 2.15, "8-15 %", "of students drop out or default mid-session, mostly in months 1 to 5", { tag: "ps" });
    kpi(s, 10.5, 4.05, 2.28, 2.15, "₹36,000", "fees lost per dropout at month 4 (400 students, ₹60,000 fee)", { tag: "ps" });
    // constraint chips
    let cx = X0;
    for (const c of ["Price-sensitive owners", "Low-tech staff", "Patchy internet", "Most students are minors"]) {
      cx += pill(s, c, cx, 6.45, { fill: T.tealTint, color: T.navy, size: 12, h: 0.34, bold: false }) + 0.15;
    }
    source(s, "Source: Participant Guide, sections 2, 6 and 7 (illustrative baselines).");
    s.addNotes("Problem framing from the Participant Guide. The 8-15 percent and 36,000 rupee figures are the guide's illustrative baselines, not our measurements.");
  }

  // ---------------------------------------------------------------- 2 Solution
  {
    const s = content("Problem and product");
    eyebrow(s, "Our solution");
    s.addText("One upload turns marks sheets into a topic map, a support list and a parent report", { placeholder: "title" });
    const steps = [
      ["1", "Capture", "Excel, CSV or an OMR photo"],
      ["2", "Understand", "Topic mastery and question difficulty"],
      ["3", "Act", "A weekly support list with reasons"],
      ["4", "Share", "Hindi and English parent reports"],
    ];
    const cw = (CW - 3 * 0.35) / 4;
    for (let i = 0; i < 4; i++) {
      const x = X0 + i * (cw + 0.35);
      card(s, x, 1.95, cw, 1.3, { fill: T.tealTint, line: T.tealTint });
      ellipse(s, x + 0.2, 2.1, 0.42, 0.42, T.tealDark);
      text(s, steps[i][0], { x: x + 0.2, y: 2.1, w: 0.42, h: 0.42, fontSize: 15, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, steps[i][1], { x: x + 0.75, y: 2.06, w: cw - 0.9, h: 0.5, fontSize: 17, bold: true, color: T.navy, valign: "middle", fontFace: F.head });
      text(s, steps[i][2], { x: x + 0.2, y: 2.65, w: cw - 0.4, h: 0.55, fontSize: 13 });
      if (i < 3) line(s, x + cw + 0.05, 2.52, x + cw + 0.3, 2.52, { color: T.tealDark, arrow: true, w: 2 });
    }
    // mock-ups under the steps
    const my = 3.5, mh = 2.9;
    M.uploadMock(kit, s, X0, my, cw, mh, { compact: true, fs: 10.5 });
    M.heatmap(kit, s, X0 + (cw + 0.35), my, cw, mh, { n: 6, m: 4, labW: 0.62, headH: 0.66, fs: 9.5, legend: false, topics: ["Motion", "Forces", "Energy", "Rotation"] });
    M.supportList(kit, s, X0 + 2 * (cw + 0.35), my, cw, mh, { rows: 5, compact: true, fs: 10.5 });
    M.phone(kit, s, X0 + 3 * (cw + 0.35) + 0.3, my, cw - 0.6, mh, { lang: "hi", title: reports.hi.title, body: M.excerpt(reports.hi.body, 22), fs: 9.5, tsize: 11, footer: "Numbers checked" });
    tag(s, "mock", X0, 6.55);
    let cx = 3.1;
    for (const c of ["Works offline on one laptop", "Hindi and English", "No paid services"]) {
      cx += pill(s, c, cx, 6.52, { fill: T.tealTint, color: T.navy, size: 12, h: 0.32, bold: false }) + 0.12;
    }
    source(s, "Screens are illustrative mock-ups with synthetic data; the report text is produced by our report module.");
    s.addNotes("The four steps map to the four mock-ups: upload and column mapping, topic map, support list, parent report. All screens use synthetic values.");
  }

  // ---------------------------------------------------------------- 3 Capture and architecture
  {
    const s = content("Problem and product");
    eyebrow(s, "Capture and architecture");
    s.addText("Staff upload what they already have, and the system cleans up the mess", { placeholder: "title" });
    // diagram: 5 columns
    const cols = [
      { h: "SOURCES", boxes: [["Excel / CSV", "designed"], ["OMR photo", "designed"], ["Forms, WhatsApp", "designed"]] },
      { h: "INGESTION", boxes: [["Column mapper and error preview", "inbuild"], ["OMR reader with one-tap fix", "inbuild"]] },
      { h: "DATA", boxes: [["PostgreSQL: one institute per row, checked", "built"]] },
      { h: "MODELS", boxes: [["Difficulty and mastery", "inbuild"], ["Early warning", "inbuild"], ["Percentile range", "inbuild"], ["Parent report", "built"]] },
      { h: "VIEWS", boxes: [["Owner", "inbuild"], ["Teacher and mentor", "inbuild"], ["Parent (mobile)", "inbuild"]] },
    ];
    const dw = 1.3, gap = 0.2, dx0 = X0;
    cols.forEach((c, i) => {
      const x = dx0 + i * (dw + gap);
      text(s, c.h, { x, y: 1.95, w: dw, h: 0.3, fontSize: 11, bold: true, color: T.muted, charSpacing: 1 });
      const n = c.boxes.length, avail = 4.15, bh = n === 1 ? 1.6 : Math.min(1.0, (avail - (n - 1) * 0.12) / n);
      const total = n * bh + (n - 1) * 0.12, y0 = 2.3 + (avail - total) / 2;
      c.boxes.forEach((b, j) => {
        const y = y0 + j * (bh + 0.12);
        card(s, x, y, dw, bh, { fill: i === 2 ? T.navy : T.white, line: i === 2 ? T.navy : T.line });
        text(s, b[0], { x: x + 0.1, y: y + 0.04, w: dw - 0.2, h: bh - 0.34, fontSize: 12, bold: true, color: i === 2 ? T.white : T.ink, valign: "middle" });
        tag(s, b[1], x + 0.1, y + bh - 0.29, { size: 8, h: 0.22 });
      });
      if (i < cols.length - 1) line(s, x + dw + 0.02, 4.4, x + dw + gap - 0.02, 4.4, { color: T.tealDark, arrow: true, w: 1.5 });
    });
    text(s, "Runs offline on one laptop. No paid services.", { x: X0, y: 6.5, w: 7.2, h: 0.32, fontSize: 13, bold: true, color: T.tealDark });
    // right cards
    const rx = 8.25, rw = 4.53;
    const cards = [
      ["LuFileSpreadsheet", "Excel and CSV", "Finds the header row, reads English, Hinglish and Devanagari column names, and shows each row error before saving.", ["synthetic", "12 messy export files tested"]],
      ["LuScanLine", "OMR photo", "Four corner marks and a QR code identify the test. Uncertain bubbles are shown for a one-tap fix.", null],
      ["LuShieldCheck", "Cheap and safe", "One institute cannot read another's rows. Verified on PostgreSQL 16. All-in cost ₹3.6 per student per month.", ["model", "Cost from the financial model"]],
    ];
    let cy = 1.95;
    for (const c of cards) {
      const h = 1.5;
      card(s, rx, cy, rw, h, { fill: T.tint, line: T.tint });
      await iconCircle(s, c[0], rx + 0.18, cy + 0.16, 0.46);
      text(s, c[1], { x: rx + 0.78, y: cy + 0.14, w: rw - 0.95, h: 0.5, fontSize: 16, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      text(s, c[2], { x: rx + 0.2, y: cy + 0.7, w: rw - 0.4, h: 0.76, fontSize: 12 });
      cy += h + 0.17;
    }
    source(s, "Sources: contracts/schema.sql, generator messy exports, financial model (COGS_Build). Status tags show what exists today.");
    s.addNotes("Architecture at a glance. BUILT means working code with tests; IN BUILD means in progress; DESIGNED means specified, not coded. The 3.6 rupee figure is the all-in cost check in the financial workbook (band 3 to 10 rupees).");
  }

  // ---------------------------------------------------------------- 4 Learning analytics
  pres.addSection({ title: "Technology" });
  {
    const s = content("Technology");
    eyebrow(s, "Learning analytics");
    s.addText("We estimate what each student knows, topic by topic, and say how sure we are", { placeholder: "title" });
    M.heatmap(kit, s, X0, 1.95, 6.3, 4.45, { n: 10, m: 8, callout: true, fs: 10 });
    tag(s, "mock", X0, 6.5);
    text(s, "Whole batch low in one topic: probably not taught yet, not student weakness", { x: 3.0, y: 6.48, w: 4.0, h: 0.4, fontSize: 11, color: T.muted, valign: "middle" });
    const rx = 7.15, rw = 5.63;
    const cards = [
      ["LuSearch", "Question difficulty with error bars", "A question the best students get wrong is flagged as a likely wrong answer key."],
      ["LuBrain", "Mastery that admits doubt", "A band appears only with enough evidence. Otherwise it says not enough data."],
      ["LuCircleCheck", "Checked on real public data", "Next-answer accuracy on ASSISTments 2009: ours 0.763 AUC, DKT 0.754, SAKT 0.725 (same test protocol)."],
    ];
    let cy = 1.95;
    const hs = [1.12, 1.12, 1.4];
    for (let i = 0; i < 3; i++) {
      card(s, rx, cy, rw, hs[i], { fill: T.tint, line: T.tint });
      await iconCircle(s, cards[i][0], rx + 0.18, cy + 0.1, 0.4);
      text(s, cards[i][1], { x: rx + 0.7, y: cy + 0.08, w: rw - 1.9, h: 0.44, fontSize: 15, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      text(s, cards[i][2], { x: rx + 0.2, y: cy + 0.56, w: rw - 0.4, h: 0.5, fontSize: 12.5 });
      if (i === 0) tag(s, "pending", rx + rw - 1.0, cy + 0.14);
      if (i === 2) { tag(s, "public", rx + 0.2, cy + hs[i] - 0.34); text(s, "AKT scores 0.785, higher than ours", { x: rx + 1.6, y: cy + hs[i] - 0.36, w: 3.6, h: 0.28, fontSize: 11, color: T.muted, valign: "middle" }); }
      cy += hs[i] + 0.1;
    }
    card(s, rx, cy, rw, 6.4 - cy, { fill: T.white, line: T.muted, dash: "dash" });
    text(s, "Result goes here: how well difficulty is recovered as more students answer.", { x: rx + 0.2, y: cy, w: rw - 1.5, h: 6.4 - cy, fontSize: 12, color: T.muted, valign: "middle" });
    tag(s, "pending", rx + rw - 1.1, cy + (6.4 - cy) / 2 - 0.12);
    source(s, "Sources: public validation (ml/public_validation); pyKT benchmark (Liu et al., 2022). Difficulty and mastery results are pending.");
    s.addNotes("The ASSISTments comparison uses the pyKT protocol; check deviations in ml/public_validation/README before presenting. IRT difficulty recovery and the moat curve come from Agent B and must replace the dashed placeholder before submission.");
  }

  // ---------------------------------------------------------------- 5 Early warning
  {
    const s = content("Technology");
    eyebrow(s, "Early warning");
    s.addText("A short, supportive list each week: who to call, why, and what to offer", { placeholder: "title" });
    M.supportList(kit, s, X0, 1.95, 7.35, 4.45, { rows: 8, fs: 11.5 });
    tag(s, "mock", X0, 6.5);
    const rx = 8.2, rw = 4.58;
    const cards = [
      ["LuClipboardList", "Reasons, not scores", "Each flag shows one to three plain reasons and a suggested action: mentoring, counselling, a remedial session or a fee-plan talk."],
      ["LuHeartHandshake", "Kind by design", "No public rank. No risk label shown to students. A person decides before any outreach."],
      ["LuTarget", "How good is it?", "Measured against the institute's own attendance rule at the same weekly workload."],
    ];
    let cy = 1.95;
    const hs = [1.62, 1.28, 1.35];
    for (let i = 0; i < 3; i++) {
      card(s, rx, cy, rw, hs[i], { fill: T.tint, line: T.tint });
      await iconCircle(s, cards[i][0], rx + 0.18, cy + 0.14, 0.44);
      text(s, cards[i][1], { x: rx + 0.75, y: cy + 0.12, w: rw - 0.95, h: 0.48, fontSize: 15, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      text(s, cards[i][2], { x: rx + 0.2, y: cy + 0.64, w: rw - 0.4, h: hs[i] - 0.7, fontSize: 12.5 });
      cy += hs[i] + 0.12;
    }
    tag(s, "pending", rx + rw - 1.0, 1.95 + 1.62 + 0.12 + 1.28 + 0.12 + 0.12);
    let cx = 8.2;
    for (const c of ["Dropout (30 days)", "Falling behind", "Fees (18+)"]) {
      cx += pill(s, c, cx, 6.5, { fill: T.tealTint, color: T.navy, size: 11, h: 0.3, bold: false }) + 0.1;
    }
    source(s, "Student codes are synthetic. Early-warning accuracy results are pending; about a quarter of dropouts are sudden and cannot be predicted from academic data.");
    s.addNotes("Support list capped by mentor capacity. Absolute and relative performance versus the institute rule come from Agent C; do not quote any number until deck_numbers.py shows it. Honest framing: calibrated, explained, privacy-routed lists, not a large accuracy jump over sorting by attendance.");
  }

  // ---------------------------------------------------------------- 6 Prediction and report
  {
    const s = content("Technology");
    eyebrow(s, "Prediction and report");
    s.addText("An honest percentile range, and a parent report where every number is checked", { placeholder: "title" });
    M.bandChart(kit, s, X0, 1.95, 5.5, 4.0);
    tag(s, "mock", X0, 6.05);
    tag(s, "pending", X0 + 1.9, 6.05);
    text(s, "A range with a disclaimer, never a single number or a rank promise.", { x: X0, y: 6.4, w: 5.5, h: 0.4, fontSize: 13, color: T.ink });
    const px = 6.5, pw = 2.75, ph = 4.1;
    M.phone(kit, s, px, 1.95, pw, ph, { lang: "hi", title: reports.hi.title, body: M.excerpt(reports.hi.body, 58), fs: 10.5, tsize: 12, footer: "Numbers checked against the data" });
    M.phone(kit, s, px + pw + 0.3, 1.95, pw, ph, { lang: "en", title: reports.en.title, body: M.excerpt(reports.en.body, 54), fs: 10.5, tsize: 12, footer: "Numbers checked against the data" });
    tag(s, "mock", px, 6.15);
    let cx = px;
    for (const c of ["Works without AI", "20 templates", "Names added last"]) {
      cx += pill(s, c, cx, 6.5, { fill: T.tealTint, color: T.navy, size: 11, h: 0.3, bold: false }) + 0.1;
    }
    source(s, "Report text comes from our report module (template path, synthetic student). Hindi still needs a native reviewer; range widths are pending.");
    s.addNotes("Reports: facts come from data, an optional language model only rewords them, an automatic checker verifies numbers, topics and tone, and a template is used if anything fails. Do not claim a checker catch rate until the independent adversarial test passes after the E2 fixes.");
  }

  // ---------------------------------------------------------------- 7 Privacy and well-being
  {
    const s = content("Technology");
    eyebrow(s, "Privacy and well-being");
    s.addText("Built for the law: consent first, supportive actions only, no rankings", { placeholder: "title" });
    const pw = (CW - 2 * 0.2) / 3;
    const pillars = [
      ["LuKeyRound", "Consent", ["The admission desk checks the parent's ID.", "Consent is recorded for each purpose.", "Withdrawing takes one tap."], "DPDP Rules 2025, Rule 10"],
      ["LuScale", "Age-aware by design", ["Under 18: academic support uses a model; dropout and fee signals use plain rules.", "18 and over: full model, with their own consent."], null],
      ["LuHeartHandshake", "Well-being", ["No leaderboards. No performance-based batch moves.", "Every message passes a banned-words check.", "A counsellor contact for every institute."], null],
    ];
    for (let i = 0; i < 3; i++) {
      const x = X0 + i * (pw + 0.2);
      card(s, x, 1.95, pw, 3.5, { fill: T.tint, line: T.tint });
      await iconCircle(s, pillars[i][0], x + 0.22, 2.12, 0.55);
      text(s, pillars[i][1], { x: x + 0.9, y: 2.12, w: pw - 1.1, h: 0.55, fontSize: 18, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      const runs = [];
      pillars[i][2].forEach((t, k) => runs.push({ text: t, options: { breakLine: k < pillars[i][2].length - 1, paraSpaceAfter: 8 } }));
      text(s, runs, { x: x + 0.22, y: 2.85, w: pw - 0.44, h: 2.0, fontSize: 16 });
      if (pillars[i][3]) pill(s, pillars[i][3], x + 0.22, 5.0, { fill: T.white, line: T.tealDark, color: T.tealDark, size: 10, h: 0.28 });
      if (i === 1) { tag(s, "public", x + 0.22, 4.78); text(s, "Academic-only costs 0.008 AUC on OULAD", { x: x + 0.22, y: 5.04, w: pw - 0.44, h: 0.3, fontSize: 11, color: T.muted, valign: "middle" }); }
    }
    card(s, X0, 5.65, CW, 1.1, { fill: T.tealTint, line: T.tealTint });
    text(s, [{ text: "Ministry of Education, Coaching Centre Guidelines 2024, clause 10.2(xi): ", options: { bold: true, color: T.navy } },
      { text: "results should be used for regular analysis and, for a student whose performance is deteriorating, counselling should be provided." , options: { italic: true } }],
      { x: X0 + 0.25, y: 5.65, w: CW - 0.5, h: 1.1, fontSize: 14, valign: "middle" });
    source(s, "Sources: DPDP Act 2023 s.9, DPDP Rules 2025, MoE Guidelines 2024. We act as the institute's data processor.");
    s.addNotes("The quote is paraphrased to stay short; exact wording is in TECH_PLAN section 24. We do not rely on the educational-institution exemption for consent. The OULAD result is public data and shows academic-only features lose very little accuracy.");
  }

  // ---------------------------------------------------------------- 8 Data moat
  {
    const s = content("Technology");
    eyebrow(s, "The data moat");
    s.addText("Every institute makes the next one's models better, without sharing children's data", { placeholder: "title" });
    // flywheel left
    const fx = X0, fy = 1.95, nodeW = 1.95, nodeH = 0.82;
    const nodes = [["More institutes", fx, fy + 0.0], ["Better question bank", fx + 2.35, fy + 0.0], ["Sharper insights", fx + 2.35, fy + 1.85], ["Better results", fx, fy + 1.85]];
    nodes.forEach((n) => {
      card(s, n[1], n[2], nodeW, nodeH, { fill: T.tealTint, line: T.tealTint });
      text(s, n[0], { x: n[1] + 0.1, y: n[2], w: nodeW - 0.2, h: nodeH, fontSize: 14, bold: true, color: T.navy, align: "center", valign: "middle" });
    });
    line(s, fx + nodeW + 0.05, fy + 0.41, fx + 2.3, fy + 0.41, { color: T.tealDark, arrow: true });
    line(s, fx + 2.35 + nodeW / 2, fy + nodeH + 0.05, fx + 2.35 + nodeW / 2, fy + 1.8, { color: T.tealDark, arrow: true });
    line(s, fx + 2.3, fy + 2.26, fx + nodeW + 0.05, fy + 2.26, { color: T.tealDark, arrow: true });
    line(s, fx + nodeW / 2, fy + 1.8, fx + nodeW / 2, fy + nodeH + 0.05, { color: T.tealDark, arrow: true });
    text(s, "Small institutes borrow strength from the pool: a batch of 60 gets difficulty estimates that would otherwise need hundreds of answers.", { x: X0, y: 4.95, w: 4.3, h: 1.1, fontSize: 14, color: T.ink });
    // pillars right
    const rx = 5.2, rw = 7.58;
    const rows = [
      ["LuLayers", "Shared question bank", "Difficulty estimated across institutes through anchor questions."],
      ["LuTarget", "Real exam outcomes", "Institutes enter actual percentiles after the exam, so our mapping improves every year."],
      ["LuRoute", "What works", "Logged support actions show which help suits which kind of student."],
    ];
    let cy = 1.95;
    for (const r of rows) {
      card(s, rx, cy, rw, 1.2, { fill: T.tint, line: T.tint });
      await iconCircle(s, r[0], rx + 0.2, cy + 0.3, 0.6);
      text(s, r[1], { x: rx + 1.0, y: cy + 0.14, w: rw - 1.2, h: 0.4, fontSize: 16, bold: true, color: T.navy, fontFace: F.head });
      text(s, r[2], { x: rx + 1.0, y: cy + 0.58, w: rw - 1.2, h: 0.55, fontSize: 14 });
      cy += 1.2 + 0.14;
    }
    card(s, rx, cy + 0.02, rw, 6.75 - cy - 0.02, { fill: T.white, line: T.red, lw: 1.5 });
    text(s, [{ text: "Never leaves the institute: ", options: { bold: true, color: T.red } }, { text: "names, answers, attendance, fees. Shared: question statistics and anonymous totals from groups of 20 or more." }],
      { x: rx + 0.2, y: cy + 0.02, w: rw - 0.4, h: 6.75 - cy - 0.02, fontSize: 13, valign: "middle" });
    source(s, "Limit: difficulty scales are comparable across institutes only through shared anchor questions. Evidence curve pending.");
    s.addNotes("The moat is the pooled item bank and outcome tables, not a pooled profile of children. We are the data processor, so we never train on real minors' raw data across institutes.");
  }

  // ---------------------------------------------------------------- 9 ROI
  pres.addSection({ title: "Business" });
  {
    const s = content("Business");
    eyebrow(s, "ROI for the institute");
    s.addText("It pays for itself if it saves three or four students a year", { placeholder: "title" });
    const kw = (CW - 3 * 0.2) / 4;
    const ks = [["6.6 %", "effective dropout reduction (the guide assumes 25 %)"], ["2.9x", "return counting all benefits"], ["0.75x", "return from retained fees alone"], ["3.5", "students to save per year to break even"]];
    ks.forEach((k, i) => kpi(s, X0 + i * (kw + 0.2), 1.95, kw, 1.65, k[0], k[1], { tag: "model" }));
    // bars: guide vs ours
    text(s, "Dropouts prevented per year", { x: X0, y: 3.85, w: 5.5, h: 0.35, fontSize: 15, bold: true, color: T.navy, fontFace: F.head });
    const bx = X0 + 1.1, scale = 3.3 / 12;
    [["Guide", 12, "12 of 48 students", T.grey], ["Ours", 2.6, "2.6 of 40 students", T.tealDark]].forEach((b, i) => {
      const y = 4.3 + i * 0.65;
      text(s, b[0], { x: X0, y, w: 1.0, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
      rect(s, bx, y + 0.05, Math.max(0.1, b[1] * scale), 0.4, b[3]);
      text(s, b[2], { x: bx + b[1] * scale + 0.1, y, w: 2.2, h: 0.5, fontSize: 13, valign: "middle" });
    });
    text(s, "Only students who get outreach can benefit, and month-one dropouts cannot be caught.", { x: X0, y: 5.65, w: 6.0, h: 0.5, fontSize: 12, color: T.muted });
    // owner gets
    const rx = 7.0, rw = 5.78;
    card(s, rx, 3.85, rw, 2.35, { fill: T.tint, line: T.tint });
    text(s, "What the owner gets", { x: rx + 0.25, y: 3.95, w: rw - 0.5, h: 0.4, fontSize: 15, bold: true, color: T.navy, fontFace: F.head });
    const gets = [["LuBanknote", "Fees retained from students who stay"], ["LuClock", "Staff time saved on registers and reports"], ["LuTrendingUp", "About ₹2.3 lakh more per 1 % admissions uplift"]];
    for (let i = 0; i < 3; i++) {
      await iconCircle(s, gets[i][0], rx + 0.25, 4.45 + i * 0.58, 0.44);
      text(s, gets[i][1], { x: rx + 0.85, y: 4.45 + i * 0.58, w: rw - 1.1, h: 0.44, fontSize: 14, valign: "middle" });
    }
    card(s, X0, 6.3, CW, 0.5, { fill: T.tealTint, line: T.tealTint });
    text(s, "Platform cost is 0.3 % of a student's fee.  The dropout effect is borrowed from 8 trials in comparable settings (mean 15.8 %).",
      { x: X0 + 0.25, y: 6.3, w: CW - 0.5, h: 0.5, fontSize: 13, valign: "middle", bold: true, color: T.navy });
    source(s, "Model output, Base case, 400-student institute. We have no coaching-specific dropout data yet. Source: financial/DataMoat_Financial_Model.xlsx (Cover).");
    s.addNotes("All numbers from the financial workbook Cover sheet, Base scenario, Mid institute. 12 of 48 and 2.6 of 40 are the guide's and our dropout counts. Safe wording: RCTs in comparable settings show 5 to 30 percent among students who get outreach; we model 15 percent.");
  }

  // ---------------------------------------------------------------- 10 Unit economics
  {
    const s = content("Business");
    eyebrow(s, "Unit economics");
    s.addText("The economics are real, but thinner than the guide's 10x", { placeholder: "title" });
    const cols = [2.6, 1.55, 1.55];
    const rows = [
      ["LTV ÷ acquisition cost", "10.7x", { t: "3.7x", bold: true, color: T.tealDark }],
      ["Payback", "3.1 months", { t: "6 months", bold: true, color: T.tealDark }],
      ["Contribution margin", "66 %", { t: "78 %", bold: true, color: T.tealDark }],
      ["Lifetime value", "₹3.53 lakh", { t: "₹1.30 lakh", bold: true, color: T.tealDark }],
      ["Acquisition cost", "₹33,000", { t: "₹35,492", bold: true, color: T.tealDark }],
      ["Revenue per institute, monthly", "₹16,000", { t: "₹8,612", bold: true, color: T.tealDark }],
    ];
    table(s, X0, 1.95, cols, ["Mid institute, Base", "Guide", "AlphaQ"], rows, { rowH: 0.52, headFills: [null, T.muted, T.tealDark], size: 14 });
    tag(s, "model", X0, 5.7);
    text(s, "By segment, LTV ÷ acquisition cost:", { x: X0, y: 6.05, w: 3.4, h: 0.4, fontSize: 13, color: T.muted, valign: "middle" });
    let cx = X0 + 3.1;
    for (const c of ["Small 1.5x", "Mid 3.7x", "Large 9.1x"]) cx += pill(s, c, cx, 6.09, { fill: T.tealTint, color: T.navy, size: 12, h: 0.32, bold: false }) + 0.1;
    // tornado
    const tx = 7.3, tw_ = 5.48;
    card(s, tx, 1.95, tw_, 4.6, { fill: T.white });
    text(s, "What moves LTV ÷ acquisition cost", { x: tx + 0.25, y: 2.05, w: tw_ - 0.5, h: 0.4, fontSize: 15, bold: true, color: T.navy, fontFace: F.head });
    const drivers = [["Price ₹20 to ₹40", 2.13, 5.21], ["Pilot conversion 15 % to 50 %", 2.17, 5.07], ["Non-renewal 30 % to 10 %", 3.15, 4.29], ["Monthly churn 5 % to 1.5 %", 3.07, 4.27], ["Pilots per rep 6 to 14", 3.11, 3.98]];
    const base = 3.67, axis = { min: 1.5, max: 5.5 };
    const px0 = tx + 2.55, pw_ = tw_ - 2.8;
    const X = (v) => px0 + ((v - axis.min) / (axis.max - axis.min)) * pw_;
    drivers.forEach((d, i) => {
      const y = 2.65 + i * 0.62;
      text(s, d[0], { x: tx + 0.2, y, w: 2.3, h: 0.45, fontSize: 12, valign: "middle" });
      rect(s, X(d[1]), y + 0.08, X(base) - X(d[1]), 0.3, "9FD3D4");
      rect(s, X(base), y + 0.08, X(d[2]) - X(base), 0.3, T.tealDark);
      text(s, d[1].toFixed(1), { x: X(d[1]) - 0.5, y, w: 0.45, h: 0.45, fontSize: 11, color: T.muted, align: "right", valign: "middle" });
      text(s, d[2].toFixed(1), { x: X(d[2]) + 0.05, y, w: 0.5, h: 0.45, fontSize: 11, color: T.muted, valign: "middle" });
    });
    rect(s, X(base) - 0.01, 2.6, 0.02, 3.2, T.navy);
    text(s, "Base 3.7x", { x: X(base) - 0.6, y: 5.82, w: 1.2, h: 0.28, fontSize: 11, bold: true, color: T.navy, align: "center" });
    text(s, "Price and pilot conversion matter most. Willingness to pay is still untested.", { x: tx + 0.25, y: 6.1, w: tw_ - 0.5, h: 0.4, fontSize: 12, color: T.muted });
    source(s, "Model output (financial workbook: Scenarios, Sensitivity). List price ₹30 per student per month; ERP and LMS prices we found: ₹4 to ₹21.");
    s.addNotes("Guide figures are the Participant Guide's naive example. Bear, Base and Bull LTV/CAC for a mid institute are -0.1x, 3.7x and 24x; Bear stresses every input at once. Tornado values are from the Sensitivity sheet.");
  }

  // ---------------------------------------------------------------- 11 Go-to-market
  {
    const s = content("Business");
    eyebrow(s, "Go-to-market");
    s.addText("Start with mid-size institutes in Patna and Lucknow, keep small ones self-serve", { placeholder: "title" });
    const st = [["Retro-pilot", "Their last year's Excel: who left, and would we have caught them?"], ["Paid pilot", "One term, with agreed measures set in advance."], ["Full onboarding", "Only after conversion, so onboarding cost is not wasted."]];
    const cw = (CW - 2 * 0.5) / 3;
    for (let i = 0; i < 3; i++) {
      const x = X0 + i * (cw + 0.5);
      card(s, x, 1.95, cw, 1.7, { fill: T.tealTint, line: T.tealTint });
      ellipse(s, x + 0.22, 2.12, 0.42, 0.42, T.tealDark);
      text(s, String(i + 1), { x: x + 0.22, y: 2.12, w: 0.42, h: 0.42, fontSize: 15, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, st[i][0], { x: x + 0.8, y: 2.08, w: cw - 1.0, h: 0.5, fontSize: 17, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      text(s, st[i][1], { x: x + 0.22, y: 2.7, w: cw - 0.44, h: 0.9, fontSize: 14 });
      if (i < 2) line(s, x + cw + 0.08, 2.8, x + cw + 0.42, 2.8, { color: T.tealDark, arrow: true });
    }
    text(s, "Selling window: March to June, before the new session.", { x: X0, y: 3.78, w: 8, h: 0.35, fontSize: 13, color: T.muted });
    table(s, X0, 4.3, [1.35, 2.25, 1.15, 1.25], ["Segment", "How we sell", "LTV÷CAC", "Payback"],
      [["Large, Mid", "Field sales", "9.1x, 3.7x", "3, 6 months"], ["Small", "Self-serve or partners", "1.5x", "18 months"]], { rowH: 0.62, headH: 0.42, size: 13 });
    tag(s, "model", X0, 6.15);
    const rx = 7.0, rw = 5.78;
    card(s, rx, 4.3, rw, 2.45, { fill: T.tint, line: T.tint });
    text(s, "Against generic institute apps", { x: rx + 0.25, y: 4.38, w: rw - 0.5, h: 0.38, fontSize: 15, bold: true, color: T.navy, fontFace: F.head });
    text(s, "They sell operations: fees, classes, content. In the listings we checked, topic analytics, OMR and compliance records were not shown. Our edge is topic-level insight, offline use and records that help with the coaching rules.",
      { x: rx + 0.25, y: 4.8, w: rw - 0.5, h: 1.15, fontSize: 12.5 });
    text(s, "Compliance records built in:", { x: rx + 0.25, y: 5.55, w: rw - 0.5, h: 0.3, fontSize: 12, bold: true, color: T.navy });
    let cx = rx + 0.25;
    for (const c of ["Age check at enrolment", "Test-day rule", "Refund calculator"]) {
      const w = pill(s, c, cx, 6.0, { fill: T.white, line: T.tealDark, color: T.tealDark, size: 10.5, h: 0.32, bold: false });
      cx += w + 0.1;
    }
    source(s, "Sources: financial workbook (segments), financial/research (competitor listings, several features not verified), MoE Guidelines 2024.");
    s.addNotes("Competitors checked in the finance research include Classplus, Fedena, Edmingle and Teachmint; several listings could not verify OMR, analytics or Hindi, so the claim is limited to what the listings showed. Do not state they lack the features.");
  }

  // ---------------------------------------------------------------- 12 Validation and limits
  pres.addSection({ title: "Validation" });
  {
    const s = content("Validation");
    eyebrow(s, "Validation and limits");
    s.addText("What we proved, what we did not, and how a pilot would settle it", { placeholder: "title" });
    const cw = 2.62, gx = 0.12, y0 = 1.95;
    const colsData = [
      ["Proved on public data", "proved", ["Next-answer AUC 0.763 on ASSISTments (DKT 0.754)", "Withdrawal AUC 0.706 on OULAD at day 28 (published 0.794, ours is lower)", "Academic-only features cost 0.008 AUC"]],
      ["Shown on synthetic data", "pending", ["Pipeline runs end to end, over 100 automated tests pass", "One institute never sees another's rows", "Accuracy numbers pending"]],
      ["Not proven yet", "notproven", ["Accuracy on real institutes", "Willingness to pay", "Real dropout reduction", "Hindi quality at scale"]],
    ];
    colsData.forEach((c, i) => {
      const x = X0 + i * (cw + gx);
      card(s, x, y0, cw, 3.65, { fill: T.tint, line: T.tint });
      tag(s, c[1], x + 0.18, y0 + 0.15, { label: c[0].toUpperCase(), size: 9, h: 0.28, w: cw - 0.36 });
      const runs = c[2].map((t, k) => ({ text: t, options: { breakLine: k < c[2].length - 1, paraSpaceAfter: 10 } }));
      text(s, runs, { x: x + 0.2, y: y0 + 0.6, w: cw - 0.4, h: 2.95, fontSize: 14 });
    });
    const px = X0 + 3 * (cw + gx) + 0.1, pw = CW - (px - X0);
    card(s, px, y0, pw, 3.65, { fill: T.navy, line: T.navy });
    text(s, "How a pilot settles it", { x: px + 0.25, y: y0 + 0.15, w: pw - 0.5, h: 0.4, fontSize: 16, bold: true, color: T.white, fontFace: F.head });
    const steps = ["Two institutes, one term", "Staggered start, so we can measure real uplift", "Success measures fixed in advance"];
    steps.forEach((t, i) => {
      const y = y0 + 0.75 + i * 0.95;
      ellipse(s, px + 0.25, y, 0.4, 0.4, T.tealOnDark);
      text(s, String(i + 1), { x: px + 0.25, y, w: 0.4, h: 0.4, fontSize: 14, bold: true, color: T.navy, align: "center", valign: "middle" });
      text(s, t, { x: px + 0.8, y: y - 0.05, w: pw - 1.05, h: 0.85, fontSize: 14, color: T.white });
    });
    card(s, X0, 5.85, CW, 0.85, { fill: T.tealTint, line: T.tealTint });
    text(s, [{ text: "Changed from the guide: ", options: { bold: true, color: T.navy } }, { text: "dropout reduction 25 % to 6.6 %, LTV ÷ acquisition cost 10.7x to 3.7x. About a quarter of dropouts are sudden and cannot be predicted from academic data." }],
      { x: X0 + 0.25, y: 5.85, w: CW - 0.5, h: 0.85, fontSize: 14, valign: "middle" });
    source(s, "Pending items are replaced by measured values before submission (scripts/deck_numbers.py).");
    s.addNotes("Replace the amber pending items with measured values from deck_numbers.py before submission. Limitations to say first: synthetic data proves the pipeline only; the percentile mapping is an assumption table; difficulty scales are comparable across institutes only through anchors.");
  }

  // ---------------------------------------------------------------- Appendix
  pres.addSection({ title: "Appendix" });
  // A1 data model
  {
    const s = content("Appendix");
    eyebrow(s, "Appendix 1  ·  Data model");
    s.addText("31 tables, grouped by what they describe, all isolated per institute", { placeholder: "title" });
    const groups = [
      ["People", "institutes, users, students, guardians, batches, batch_changes, consents, legal_settings"],
      ["Learning", "topics, topic_prereqs, questions, question_topics, item_params, tests, test_questions, answer_keys, marking_schemes"],
      ["Results", "responses, test_totals, attendance, fees, engagement"],
      ["Intelligence", "mastery_snapshots, risk_scores, predictions, interventions, reports, model_registry"],
      ["Operations", "ingest_jobs, omr_templates, audit_log"],
    ];
    const cw = (CW - 0.2) / 2;
    groups.forEach((g, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = X0 + col * (cw + 0.2), y = 1.95 + row * 1.5;
      const w = i === 4 ? CW : cw;
      card(s, x, y, w, 1.35, { fill: T.tint, line: T.tint });
      text(s, g[0], { x: x + 0.22, y: y + 0.12, w: 3, h: 0.4, fontSize: 16, bold: true, color: T.navy, fontFace: F.head });
      text(s, g[1], { x: x + 0.22, y: y + 0.58, w: w - 0.44, h: 0.8, fontSize: 13 });
    });
    text(s, "Not stored on purpose: counselling notes, ID document images, student photos.", { x: X0, y: 6.45, w: 9, h: 0.35, fontSize: 14, bold: true, color: T.tealDark });
    source(s, "Source: technical/contracts/schema.sql. Synthetic data: 4 institutes, 3 academic years, known ground truth.");
  }
  // A2 cost per student
  {
    const s = content("Appendix");
    eyebrow(s, "Appendix 2  ·  Cost per student");
    s.addText("About ₹3.6 per student per month in the model; ₹0 extra when run locally", { placeholder: "title" });
    kpi(s, X0, 1.95, 3.6, 1.7, "₹3.6", "all-in cost per student per month, inside the ₹3 to ₹10 band", { tag: "model" });
    kpi(s, X0 + 3.8, 1.95, 3.6, 1.7, "₹0", "marginal cost of the local run: laptop, local model, local database", { tag: "synthetic", vcolor: T.tealDark });
    table(s, X0, 3.95, [3.2, 1.7, 1.7, 1.7], ["Researched input", "Bear", "Base", "Bull"],
      [["Hosted model, ₹ per 1M input tokens", "142.58", "23.76", "9.51"], ["Hosted model, ₹ per 1M output tokens", "712.88", "142.58", "47.53"], ["WhatsApp utility message, ₹ each", "0.145", "0.1323", "0.115"]],
      { rowH: 0.5, size: 13 });
    text(s, "We run a local model, so hosted-model prices apply only if an institute prefers a hosted option.", { x: X0, y: 6.15, w: 8.2, h: 0.5, fontSize: 12, color: T.muted });
    const rx = 9.2, rw = 3.58;
    card(s, rx, 1.95, rw, 4.55, { fill: T.tint, line: T.tint });
    text(s, "How we keep it low", { x: rx + 0.22, y: 2.05, w: rw - 0.44, h: 0.4, fontSize: 16, bold: true, color: T.navy, fontFace: F.head });
    const runs = ["Small local models on a laptop", "A template fallback, so no model is required", "No paid APIs or hosting", "One database per deployment, isolated per institute"].map((t, k, a) => ({ text: t, options: { breakLine: k < a.length - 1, paraSpaceAfter: 10 } }));
    text(s, runs, { x: rx + 0.22, y: 2.6, w: rw - 0.44, h: 3.7, fontSize: 14 });
    source(s, "Source: financial workbook (COGS_Build, assumptions.csv; prices from vendor pages researched 20 Oct 2026, exchange rate ₹95.05 per US dollar).");
  }
  // A3 privacy clauses
  {
    const s = content("Appendix");
    eyebrow(s, "Appendix 3  ·  Legal basis");
    s.addText("The rules we design against, and what we do about each", { placeholder: "title" });
    table(s, X0, 1.95, [3.5, 8.73], ["Rule", "Our response"], [
      ["DPDP Act s.9(1) and Rule 10", "Verifiable parental consent before processing a minor's data: ID checked at the admission desk, consent recorded per purpose."],
      ["DPDP Act s.9(3)", "No tracking or behavioural monitoring of children: under 18, academic support uses a model; dropout and fee signals use plain rules."],
      ["Fourth Schedule, educational institutions", "Narrow and purpose-limited, so we do not rely on it for consent."],
      ["DPDP Rules, Rule 6 and 7", "Encryption, access control, logs kept one year, breach notice to the institute within hours."],
      ["MoE Guidelines 2024, cl. 10.2(xi)", "Results stay private; early warning leads to counselling, never public ranks."],
      ["MoE Guidelines 2024, cl. 12(vii)", "No batch moves based on performance; remedial help is an extra session."],
      ["Rajasthan Act 2025, s.6(2)(d)", "Fee plans support four or more equal instalments."],
    ], { rowH: 0.6, size: 12, headH: 0.42 });
    source(s, "Sources: DPDP Act 2023, DPDP Rules 2025, MoE Guidelines 2024, Rajasthan Coaching Centres Act 2025 (technical/docs/TECH_PLAN.md, section 24). Not legal advice.");
  }
  // A4 validation protocol
  {
    const s = content("Appendix");
    eyebrow(s, "Appendix 4  ·  How we test");
    s.addText("Every result follows the same protocol, and misses are reported", { placeholder: "title" });
    const items = [
      ["LuShieldCheck", "No leakage", "Features use only data before the as-of date. Splits are by student and by year, never by row."],
      ["LuScale", "Baselines at equal workload", "Each model sits beside a simple rule at the same weekly top-k."],
      ["LuChartColumn", "Uncertainty", "Bootstrap confidence intervals over students, three generator seeds, event counts shown."],
      ["LuTriangleAlert", "Stress tests", "Misspecified generators, a held-out institute, and an independent adversarial test of the report checker."],
      ["LuFlag", "Honest misses", "A missed bar is reported with its cause. Bars are never moved to pass."],
      ["LuCircleCheck", "Public data", "OULAD and ASSISTments under published protocols, with deviations listed."],
    ];
    const cw = (CW - 0.4) / 3;
    for (let i = 0; i < 6; i++) {
      const x = X0 + (i % 3) * (cw + 0.2), y = 1.95 + Math.floor(i / 3) * 2.4;
      card(s, x, y, cw, 2.2, { fill: T.tint, line: T.tint });
      await iconCircle(s, items[i][0], x + 0.2, y + 0.16, 0.46);
      text(s, items[i][1], { x: x + 0.78, y: y + 0.14, w: cw - 0.95, h: 0.5, fontSize: 15, bold: true, color: T.navy, fontFace: F.head, valign: "middle" });
      text(s, items[i][2], { x: x + 0.2, y: y + 0.78, w: cw - 0.4, h: 1.3, fontSize: 13 });
    }
    source(s, "Source: technical/docs/agent_prompts/R1_00_COMMON.md and docs/FEASIBILITY_CHECK.md.");
  }
  // A5 scenarios
  {
    const s = content("Appendix");
    eyebrow(s, "Appendix 5  ·  Scenarios");
    s.addText("Bear, Base and Bull for a mid-size institute: Bear stresses every input at once", { placeholder: "title" });
    table(s, X0, 1.95, [4.1, 1.5, 1.5, 1.5], ["Mid institute (400 students)", "Bear", "Base", "Bull"], [
      ["Effective dropout reduction", "1.0 %", "6.6 %", "22.2 %"],
      ["Dropouts prevented per year", "0.2", "2.6", "16"],
      ["Institute return, all benefits", "0.15x", "2.9x", "14x"],
      ["Institute return, fees only", "0.04x", "0.75x", "5.9x"],
      ["Students to save to break even", "6.5", "3.5", "2.7"],
      ["LTV ÷ acquisition cost", "-0.1x", "3.7x", "24x"],
      ["Payback", "61 months", "6 months", "2 months"],
    ], { rowH: 0.5, size: 13, headFills: [null, T.muted, T.tealDark, T.navy] });
    tag(s, "model", X0, 6.0);
    const rx = 9.9, rw = 2.88;
    card(s, rx, 1.95, rw, 4.0, { fill: T.tint, line: T.tint });
    text(s, "By segment, Base", { x: rx + 0.2, y: 2.05, w: rw - 0.4, h: 0.4, fontSize: 15, bold: true, color: T.navy, fontFace: F.head });
    text(s, [{ text: "Return", options: { bold: true, breakLine: true } }, { text: "Small 2.3x, Mid 2.9x, Large 3.6x", options: { breakLine: true, paraSpaceAfter: 10 } },
      { text: "LTV ÷ acquisition cost", options: { bold: true, breakLine: true } }, { text: "Small 1.5x, Mid 3.7x, Large 9.1x", options: { breakLine: true, paraSpaceAfter: 10 } },
      { text: "Payback", options: { bold: true, breakLine: true } }, { text: "18, 6 and 3 months" }], { x: rx + 0.2, y: 2.55, w: rw - 0.4, h: 3.2, fontSize: 13 });
    source(s, "Source: financial workbook (Scenarios sheet). Model output from sourced and assumed inputs, not measured.");
  }

  // ---------------------------------------------------------------- Final slide
  pres.addSection({ title: "Closing" });
  {
    const s = pres.addSlide({ masterName: "CLOSING", sectionTitle: "Closing" });
    s.addText("How we used AI, and what we cited", { placeholder: "title" });
    const cw = (CW - 0.3) / 2;
    card(s, X0, 2.0, cw, 4.3, { fill: "10325B", line: "10325B" });
    text(s, "AI tools", { x: X0 + 0.3, y: 2.15, w: cw - 0.6, h: 0.45, fontSize: 18, bold: true, color: T.white, fontFace: F.head });
    const a = ["Claude: planning, code review, documentation.", "Google Antigravity agents: code generation.", "Perplexity and Gemini Deep Research: literature and regulation research.", "Everything was reviewed and tested by the team, and research claims were checked against primary sources where possible."];
    text(s, a.map((t, k) => ({ text: t, options: { breakLine: k < a.length - 1, paraSpaceAfter: 10 } })), { x: X0 + 0.3, y: 2.75, w: cw - 0.6, h: 3.4, fontSize: 15, color: "E6EEF8" });
    card(s, X0 + cw + 0.3, 2.0, cw, 4.3, { fill: "10325B", line: "10325B" });
    text(s, "Public data and libraries", { x: X0 + cw + 0.6, y: 2.15, w: cw - 0.6, h: 0.45, fontSize: 18, bold: true, color: T.white, fontFace: F.head });
    const b = ["OULAD (CC BY 4.0), ASSISTments 2009, the pyKT benchmark, JEEBench.", "Noto Sans Devanagari (SIL OFL), LightGBM, Ollama, FastAPI, PostgreSQL.", "Full list with licences: technical/docs/CITATIONS.md in the repository."];
    text(s, b.map((t, k) => ({ text: t, options: { breakLine: k < b.length - 1, paraSpaceAfter: 10 } })), { x: X0 + cw + 0.6, y: 2.75, w: cw - 0.6, h: 3.4, fontSize: 15, color: "E6EEF8" });
    text(s, "github.com/AdityaKuranjekar/institute-intelligence-platform", { x: 5.0, y: 6.7, w: 7.8, h: 0.45, fontSize: 13, color: "B9C7DA", align: "right", valign: "middle" });
    s.addNotes("Mandatory disclosure (Problem Statement, rule 2). Keep this as the last slide of the submitted PDF.");
  }

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
