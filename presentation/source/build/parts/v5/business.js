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

