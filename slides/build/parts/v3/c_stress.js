  // ================================================================ STRESS-TEST THE GUIDE
  {
    const s = content("Problem", "The guide's example looks great on paper. Here is where each number breaks, and what we build instead", "Feasibility · business realism", ["STRESS-TESTING THE GUIDE", 1]);
    sec(s, 1, "SIX ASSUMPTIONS, TESTED", L, 1.22, 8);
    const g = (t) => ({ t, bold: true, color: T.tealDark });
    dtable(s, L, 1.58, [1.75, 3.2, 3.2], ["Hypothesis (the guide)", "Evidence", "Decision (what we do)"], [
      [g("₹40 per student per month"), "Generic institute apps list at ₹4 to ₹21 per student per month. ₹40 x 400 students = ₹1.92 lakh a year.", "List ₹30, tested from ₹20 to ₹40. Willingness to pay goes to owner interviews first."],
      [g("25 % of dropouts prevented"), "8 trials in comparable settings average 15.8 % among students who get outreach; month-1 leavers cannot be flagged.", "Model 4.0 % effective reduction. Prove it with comparison batches in a pilot."],
      [g("Saved fees pay for the product"), "Fees kept alone return 0.35x of the cost.", "Lead with staff time and parent reports: fees plus time reach 0.55x; admissions close the gap."],
      [g("LTV / CAC of 10.7x"), "Seasonal billing, 20 % post-exam non-renewal and pilots that do not convert.", "3.6x in base; small institutes use channel partners (3.4x, not 1.5x)."],
      [g("Published AUC of 0.794"), "Our honest student-grouped estimate on OULAD is 0.706; leakage inflates many reported numbers.", "Judge on precision at mentor capacity: 0.46 vs 0.24 to 0.31 for rules."],
      [g("Track app activity for everyone"), "DPDP s.9(3) bans behavioural monitoring of children, even with consent.", "Academic data only for under-18s; it costs 0.008 AUC on OULAD."]],
      { rowH: 0.6, headH: 0.3, size: 9.5, headFill: T.tealDark, leftCols: [1, 2], rowStyles: ["white", "band", "white", "band", "white", "band"] });
    // ---- reframe
    const rx = 8.75, rw = R - 8.75;
    s.addShape("rect", { x: rx, y: 1.22, w: rw, h: 4.32, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    hdrBar(s, rx, 1.22, rw, "DECISION REFRAME", { h: 0.32, size: 11 });
    text(s, "The wrong question", { x: rx + 0.2, y: 1.66, w: rw - 0.4, h: 0.24, fontSize: 9.5, color: T.muted });
    text(s, "\"Can a model predict who drops out?\"", { x: rx + 0.2, y: 1.9, w: rw - 0.4, h: 0.32, fontSize: 13, bold: true, color: T.grey, strike: "sngStrike" });
    text(s, "The right question", { x: rx + 0.2, y: 2.32, w: rw - 0.4, h: 0.24, fontSize: 9.5, color: T.muted });
    text(s, "\"Of the eight students a mentor can call this week, are they the right eight, and does the call help?\"", { x: rx + 0.2, y: 2.56, w: rw - 0.4, h: 0.95, fontSize: 14, bold: true, color: T.tealDark });
    chevrow(s, rx + 0.15, 3.62, rw - 0.3, 0.42, [{ t: "Score" }, { t: "Explain" }, { t: "Assign" }, { t: "Log" }], { size: 10, depth: 0.16 });
    text(s, "A model with a high AUC that produces a list nobody calls is worth nothing. We cap the list at mentor capacity and judge the system on students retained and actions taken, not on AUC.", { x: rx + 0.2, y: 4.12, w: rw - 0.4, h: 0.8, fontSize: 10, color: T.ink });
    [["8", "students per batch per week: the list cap"], ["=", "same workload as the institute's own rule"], ["1", "logged outcome for every flag"]].forEach((k, i) => {
      const y = 4.9 + i * 0.2;
      text(s, k[0], { x: rx + 0.2, y, w: 0.35, h: 0.2, fontSize: 10.5, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, k[1], { x: rx + 0.6, y, w: rw - 0.8, h: 0.2, fontSize: 9, color: T.ink, valign: "middle" });
    });
    // ---- principles
    sec(s, 2, "FOUR DESIGN PRINCIPLES THAT FOLLOW", L, 5.68, 8);
    const pr = [["FaUserShield", "Support, never surveillance", "Risk lists go to mentors only; no ranks for students or parents."], ["FaUsers", "Sized to mentor capacity", "A short weekly list, compared with the institute's own rule at equal workload."],
      ["FaListCheck", "Every number checked", "Reports are verified in code; a template goes out if any check fails."], ["FaLaptop", "Free and offline first", "One laptop, local models, no paid services; syncs when the network returns."]];
    for (let i = 0; i < 4; i++) {
      const x = L + i * 3.13;
      s.addShape("rect", { x, y: 6.02, w: 3.04, h: 0.88, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, 6.02, 0.5, 0.88, T.tealDark);
      await icon(s, pr[i][0], x + 0.11, 6.28, 0.28, T.white);
      text(s, pr[i][1], { x: x + 0.6, y: 6.05, w: 2.38, h: 0.26, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, pr[i][2], { x: x + 0.6, y: 6.31, w: 2.38, h: 0.56, fontSize: 9, color: T.ink });
    }
    note(s, 11.0, 0.72, 1.85, 0.36, "we cut our own numbers first", 2);
    source(s, "Sources: case guide; financial/research (vendor listings R1, outreach trials R4); financial workbook (Base: 4.0 % reduction, 0.35x fees only); OULAD results in ml/public_validation; PLOS ONE 2026; DPDP Act 2023 s.9(3).");
    s.addNotes("This slide shows judges we tested the guide's illustrative numbers instead of copying them. Every 'what we do' value is a workbook output or a measured public-data result. Mentor capacity of eight per batch per week is the cap used in the mock-ups and the early-warning evaluation.");
  }

