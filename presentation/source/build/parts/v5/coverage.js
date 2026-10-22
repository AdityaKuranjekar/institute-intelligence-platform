  {
    const s = content("Appendix", "Appendix 11: where the case's twelve questions are answered, and how strong the evidence is", "Problem statement coverage", ["APPENDIX 11: CASE QUESTIONS, ANSWERED", 7]);
    const E = (t, c) => ({ t, bold: true, color: T.white, fill: c });
    const M = E("Measured", T.tealDark), D = E("Designed", T.teal), B = E("Built", T.tealDark), A = E("Assumption", T.amber);
    const rowsL = [
      ["T1", "Data capture, offline, low effort", "Architecture, Product", D],
      ["T2", "Data model; tagging questions to topics at scale", "Appendices 5, 6", B],
      ["T3", "Mastery and question difficulty (IRT)", "Learning analytics", M],
      ["T4", "Early warning: dropout, falling behind, fees", "Early warning", M],
      ["T5", "Percentile range with honest uncertainty", "Percentile and reports", D],
      ["T6", "GenAI: reports, study plans, doubts", "Percentile and reports", B],
      ["T7", "Multi-tenant, secure, low-cost architecture", "Architecture, Appendix 4", B],
      ["T8", "Privacy and safety for minors", "Privacy, Appendix 7", B]];
    const rowsR = [
      ["B1", "Buyer and measurable institute return", "Business model, Appendix 1", A],
      ["B2", "Pricing, CAC, payback, churn, LTV", "Business model, Appendix 3", A],
      ["B3", "Cities and sizes first; channels", "Go-to-market", A],
      ["B4", "Competition and a moat that grows", "Go-to-market", D],
      ["R1", "Financial model with sensitivity", "Appendices 1, 2, 3", A],
      ["R2", "Limits and what we did not prove", "Validation, Appendix 7", M]];
    dtable(s, L, 1.22, [0.45, 3.2, 1.85, 0.75], ["#", "Technology (70 %)", "Where", "Evidence"], rowsL, { rowH: 0.52, headH: 0.32, size: 9.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: Array(8).fill(0).map((_, i) => i % 2 ? "white" : "band") });
    dtable(s, L + 6.5, 1.22, [0.45, 3.0, 1.9, 0.9], ["#", "Market (30 %) and deliverables", "Where", "Evidence"], rowsR, { rowH: 0.52, headH: 0.32, size: 9.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: Array(6).fill(0).map((_, i) => i % 2 ? "white" : "band") });
    sec(s, "i", "HOW TO READ THE EVIDENCE COLUMN", L + 6.5, 4.7, 5.9);
    lines(s, [{ t: "Measured: a number from our own run on public data or the test suite." }, { t: "Built: working code with tests, shown on synthetic data." }, { t: "Designed: specified in the contracts, not coded yet." }, { t: "Assumption: a model input with a stated range, to be tested in interviews and the pilot." }], L + 6.5, 5.05, 5.9, 1.2, { size: 10, gap: 3 });
    rect(s, L, 5.5, 6.2, 1.3, T.tint);
    text(s, [{ text: "Every slide states its limits. ", options: { bold: true, color: T.tealDark } }, { text: "We would rather show an honest 6.6 % than copy a hopeful 25 %, and rather mark a gate as pending than quote a number we have not measured. The case says teams that state assumptions and limits score higher, so we put them on the page." }], { x: L + 0.15, y: 5.5, w: 5.9, h: 1.3, fontSize: 10.5, color: T.ink, valign: "middle" });
    source(s, "Source: Participant Guide sections 4, 8 and 10 (questions and rubric). T = technology question, B = business question, R = round-1 deliverable or limit.");
  }
