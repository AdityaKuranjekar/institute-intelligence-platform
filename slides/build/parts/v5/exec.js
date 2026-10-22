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

