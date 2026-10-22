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
