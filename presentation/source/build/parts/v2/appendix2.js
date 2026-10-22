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
