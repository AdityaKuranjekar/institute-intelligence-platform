  // ================================================================ 1 TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    ellipse(s, 7.4, 0.0, 5.4, 5.4, T.orangeT);
    text(s, "CASE B  ·  NEXTUTE × FINANCE CLUB, IIT PATNA", { x: L, y: 0.5, w: 7, h: 0.3, fontSize: 11.5, bold: true, color: T.teal, charSpacing: 2 });
    s.addText("PRAGATI", { placeholder: "title" });
    text(s, "The Data Moat", { x: L, y: 2.3, w: 6, h: 0.5, fontSize: 28, bold: true, color: T.teal });
    rect(s, L, 2.85, 1.2, 0.05, T.tealDark);
    text(s, "Every student's weak topics, found before the exam.", { x: L, y: 3.0, w: 5.6, h: 0.7, fontSize: 18, color: T.ink });
    // messy data nodes turning into a clean grid
    let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pts = []; for (let i = 0; i < 13; i++) pts.push([L + 0.1 + rnd() * 1.9, 3.85 + rnd() * 0.75]);
    pts.forEach((p, i) => pts.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.75) kit.line(s, p[0], p[1], q[0], q[1], { color: "B9CBE4", w: 0.8 }); }));
    pts.forEach((p, i) => ellipse(s, p[0] - 0.05, p[1] - 0.05, 0.1, 0.1, i % 3 === 0 ? T.orange : T.tealDark));
    kit.line(s, 2.55, 4.22, 3.1, 4.22, { color: T.tealDark, w: 2.5, arrow: true });
    const shades = ["E3ECF7", "C9DBF0", "7FA6D6", "2E6DB4", "1F4A82"];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) rect(s, 3.25 + c * 0.45, 3.85 + r * 0.27, 0.42, 0.25, shades[(r * 2 + c * 3 + (c > 3 ? 1 : 0)) % 5]);
    text(s, "Excel · OMR · WhatsApp", { x: L, y: 4.62, w: 2.2, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    text(s, "one clear topic map", { x: 3.25, y: 4.68, w: 2.7, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    const rb = [["0.76", "Prediction accuracy score", "public data; rival 0.75"], ["2", "Public datasets, not just ours", "Open Univ. and ASSISTments"], ["₹3.6", "per student per month", "all-in, one laptop"]];
    rb.forEach((r, i) => {
      const x = L + i * 1.98;
      rect(s, x, 5.15, 1.88, 0.5, T.tealDark);
      text(s, r[0], { x, y: 5.15, w: 1.88, h: 0.5, fontSize: 22, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x, y: 5.65, w: 1.88, h: 0.85, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      text(s, [{ text: r[1], options: { bold: true, fontSize: 10.5, color: T.navy, breakLine: true } }, { text: r[2], options: { fontSize: 8.5, color: T.muted } }], { x: x + 0.06, y: 5.65, w: 1.76, h: 0.85, align: "center", valign: "middle" });
    });
    text(s, "IMPACT RIBBON", { x: L, y: 4.93, w: 3, h: 0.2, fontSize: 8, bold: true, color: T.muted, charSpacing: 2 });
    text(s, "Team AlphaQ  ·  Round 1  ·  Version 3", { x: L, y: 6.7, w: 5, h: 0.3, fontSize: 11, color: T.muted });
    pic(s, "web_console.png", 6.55, 0.75, 6.3, 3.54, "Pragati web console (illustrative)");
    pic(s, "app_scan.png", 7.0, 3.4, 1.75, 3.5, "Pragati scan screen on a phone (illustrative)");
    pic(s, "app_mentor.png", 8.85, 3.15, 1.75, 3.5, "Pragati mentor app (illustrative)");
    pic(s, "app_parent.png", 10.7, 3.4, 1.75, 3.5, "Pragati parent app (illustrative)");
    note(s, 4.6, 4.45, 1.7, 0.4, "Hindi and English, checked", 3);
    foot(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT protocol; OULAD); financial model v1.1, Base. Screens are illustrative mock-ups with synthetic students.");
    s.addNotes("Title. 0.76 is the next-answer AUC on ASSISTments 2009 (published DKT 0.754). Two public datasets: ASSISTments 2009 and OULAD. 3.6 rupees is the all-in cost per student per month (financial model v1.1, Base).");
  }

  // ================================================================ 2 EXECUTIVE SUMMARY
  pres.addSection({ title: "Summary" });
  {
    const s = content("Summary", "Small institutes already hold the data. Pragati turns it into a weekly to-do list for mentors, at a price owners can say yes to", "All criteria", ["EXECUTIVE SUMMARY", 0]);
    const scr = [["SITUATION", [{ text: "Tier-2 and Tier-3 JEE/NEET institutes (150 to 1,200 students) run on " }, { text: "paper OMR sheets, Excel and WhatsApp.", options: { bold: true } }, { text: " 22.8 lakh NEET and about 15.4 lakh JEE Main candidates registered in 2025." }]],
      ["COMPLICATION", [{ text: "A 400-student institute loses about " }, { text: "₹17 lakh a year", options: { bold: true } }, { text: " to mid-session dropouts, noticed only after students leave. Generic apps store marks but give no topic view or warning, and " }, { text: "DPDP s.9(3) bars behavioural tracking of minors.", options: { bold: true } }]],
      ["RESOLUTION", [{ text: "Pragati: ", options: { bold: true } }, { text: "OMR photo or Excel in; topic mastery, a weekly support list with plain reasons and checked Hindi and English parent reports out. Runs offline on one laptop for " }, { text: "₹3.6 per student per month.", options: { bold: true } }]]];
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
      ["FaIndianRupeeSign", "Business 30", "1.7x owner return with admissions, 0.55x on hard benefits; LTV/CAC 3.6x; bear case shown."]];
    for (let i = 0; i < 4; i++) {
      const x = L + (i % 2) * 3.08, y = 4.88 + Math.floor(i / 2) * 1.02;
      s.addShape("rect", { x, y, w: 3.02, h: 0.94, fill: { color: T.tint }, line: { color: T.line, width: 0.75 } });
      await abadge(s, rb[i][0], x + 0.1, y + 0.1, 0.36, i);
      text(s, rb[i][1], { x: x + 0.54, y: y + 0.07, w: 2.4, h: 0.28, fontSize: 11, bold: true, color: T.tealDark, valign: "middle" });
      text(s, rb[i][2], { x: x + 0.54, y: y + 0.36, w: 2.42, h: 0.56, fontSize: 9, color: T.ink });
    }
    const rx = 6.75, rw = R - 6.75;
    const kp = [["0.763", "next-answer AUC on ASSISTments", "PUBLIC DATA"], ["0.46", "precision at top 10 % (rules 0.24 to 0.31)", "PUBLIC DATA"], ["1.7x", "owner return, base (0.55x hard benefits)", "MODEL OUTPUT"], ["3.6x", "LTV ÷ CAC, base (4.8x undiscounted)", "MODEL OUTPUT"]];
    const kw = (rw - 0.3) / 4;
    kp.forEach((k, i) => {
      const x = rx + i * (kw + 0.1);
      s.addShape("rect", { x, y: 1.22, w: kw, h: 1.18, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, 1.22, kw, 0.06, T.tealDark);
      text(s, k[0], { x, y: 1.3, w: kw, h: 0.48, fontSize: 24, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 0.06, y: 1.77, w: kw - 0.12, h: 0.42, fontSize: 9, color: T.ink, align: "center", valign: "middle" });
      text(s, k[2], { x, y: 2.17, w: kw, h: 0.2, fontSize: 7.5, bold: true, color: T.muted, align: "center", valign: "middle", charSpacing: 1 });
    });
    // the Pragati loop: ring of six steps (v2 diagram) shrunk beside the table
    hdrBar(s, rx, 2.52, rw, "THE PRAGATI LOOP: CAPTURE → STRUCTURE → ESTIMATE → FLAG → ACT → REPORT", { h: 0.28, size: 10 });
    const lp = [["FaCamera", "Capture", "OMR photo, Excel"], ["FaDiagramProject", "Structure", "380-topic map"], ["FaBrain", "Estimate", "Mastery per topic"], ["FaFlag", "Flag", "Weekly list, reasons"], ["FaHandshake", "Act", "Call, session, log"], ["FaFileLines", "Report", "Checked Hindi / English"]];
    const lw = rw / 6;
    for (let i = 0; i < 6; i++) {
      const cx = rx + i * lw;
      if (i < 5) kit.line(s, cx + lw / 2 + 0.3, 3.15, cx + lw * 1.5 - 0.3, 3.15, { color: T.line, w: 1.5, arrow: true });
      await abadge(s, lp[i][0], cx + lw / 2 - 0.27, 2.88, 0.54, i);
      text(s, lp[i][1], { x: cx, y: 3.46, w: lw, h: 0.22, fontSize: 10, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, lp[i][2], { x: cx + 0.03, y: 3.67, w: lw - 0.06, h: 0.36, fontSize: 8.5, color: T.muted, align: "center" });
    }
    dtable(s, rx, 4.1, [1.15, 3.2, rw - 4.35], ["Build choice", "What we use", "Why"], [
      ["OMR capture", "Corner marks and QR; unclear bubbles sent back", "No scanner, works offline"],
      ["Topic mastery", "2-parameter IRT, guessing prior; Rasch if small", "Explains itself on sparse tests"],
      ["Early warning", "Calibrated LightGBM; rules for minors' dropout", "Legal for under-18s"],
      ["Percentile", "Quantile model, conformal band, NTA table", "A range, never a rank promise"],
      ["Parent report", "Facts, local model, 8 checks, template fallback", "No invented numbers"]],
      { rowH: 0.27, headH: 0.27, size: 9, headFill: T.tealDark, leftCols: [1, 2] });
    rect(s, rx, 5.82, rw, 1.1, T.tealDark);
    await icon(s, "FaLayerGroup", rx + 0.2, 6.1, 0.5, T.white);
    text(s, "THE MOAT", { x: rx + 0.9, y: 5.88, w: 3, h: 0.28, fontSize: 12, bold: true, color: "F1D9A0", valign: "middle", charSpacing: 1 });
    text(s, "Every institute adds answers that sharpen question difficulty for all (pooled item statistics, no raw child records shared), and every logged call teaches which actions work. A new rival starts with an uncalibrated question bank and no outcome history.", { x: rx + 0.9, y: 6.15, w: rw - 1.05, h: 0.74, fontSize: 9.5, color: T.white });
    note(s, 11.0, 0.72, 1.85, 0.36, "start with the weekly list", -2);
    foot(s, "Sources: NTA NEET UG 2025 result data; JEE Main 2025 unique registrations as reported (secondary); case guide baselines; public validation results; financial model v1.1 (Base). Full register: Appendix 8.");
    s.addNotes("Executive summary in situation, complication, resolution form. Public-data figures are measured. 1.7x owner return counts fees kept, staff time and a 1 % admissions uplift; 0.55x counts only fees kept and staff time. LTV/CAC 3.6x is discounted (4.8x undiscounted). All from financial model v1.1.");
  }

