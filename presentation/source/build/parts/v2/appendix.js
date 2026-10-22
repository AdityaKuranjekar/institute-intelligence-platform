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

