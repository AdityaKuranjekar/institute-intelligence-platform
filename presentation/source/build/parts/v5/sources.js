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
