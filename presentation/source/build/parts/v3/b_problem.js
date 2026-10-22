  // ================================================================ 3 PROBLEM
  pres.addSection({ title: "Problem" });
  {
    const s = content("Problem", "Institutes have the marks, but notice a struggling student only after that student has already left", "Problem framing", ["THE PROBLEM: LEAKY REVENUE, MESSY DATA", 1]);
    kit.panels("mix");
    // top-left: friction matrix
    frame(s, L, 1.22, 4.75, 2.9, "WHO LOSES TODAY: THE FRICTION MATRIX");
    const fm = [["FaChalkboardUser", "Teachers", ["Check OMR sheets by hand", "See weak topics after exams", "No time for each student"]], ["FaBuilding", "Owners", ["Can't compare batches", "Learn of dropouts too late", "Apps store marks, no insight"]],
      ["FaUsers", "Parents", ["Get a marks list, nothing more", "Can't tell if child improves", "Trust slips, fee questions grow"]], ["FaChildReaching", "Students", ["Struggle quietly for weeks", "Same plan as whole batch", "Noticed when they stop coming"]]];
    for (let i = 0; i < 4; i++) {
      const x = L + 0.1 + (i % 2) * 2.3, y = 1.66 + Math.floor(i / 2) * 1.2;
      s.addShape("rect", { x, y, w: 2.22, h: 1.14, fill: { color: i === 1 || i === 2 ? T.tint : T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, y, 2.22, 0.27, T.tealDark);
      await icon(s, fm[i][0], x + 0.07, y + 0.04, 0.19, T.white);
      text(s, fm[i][1], { x: x + 0.32, y, w: 1.85, h: 0.27, fontSize: 10.5, bold: true, color: T.white, valign: "middle" });
      lines(s, fm[i][2], x + 0.06, y + 0.3, 2.1, 0.82, { size: 9, gap: 1 });
    }
    // top-middle: where the data lives -> bottleneck funnel
    frame(s, 5.3, 1.22, 4.35, 2.9, "WHERE THE DATA LIVES");
    const src = [["FaFileExcel", "Excel"], ["FaFileLines", "OMR sheets"], ["FaWhatsapp", "WhatsApp"]];
    for (let i = 0; i < 3; i++) {
      const x = 5.4 + i * 1.42;
      s.addShape("rect", { x, y: 1.66, w: 1.35, h: 0.4, fill: { color: T.greyLight }, line: { color: T.grey, width: 1, dashType: "dash" } });
      await icon(s, src[i][0], x + 0.07, 1.74, 0.24, T.muted);
      text(s, src[i][1], { x: x + 0.36, y: 1.66, w: 0.98, h: 0.4, fontSize: 9, bold: true, color: T.muted, valign: "middle" });
    }
    const tiers = [[4.1, "Messy, unconnected data", "No topic view. No early warning.", "9AA6B5"], [3.0, "The bottleneck", "Staff time, no analysis", "5B8DC9"], [2.0, "Pragati", "Topic map + weekly list", T.tealDark]];
    tiers.forEach((t, i) => {
      const y = 2.2 + i * 0.62, x = 5.3 + (4.35 - t[0]) / 2;
      s.addShape("trapezoid", { x, y, w: t[0], h: 0.56, flipV: true, fill: { color: t[3] }, line: { color: T.white, width: 1.5 } });
      text(s, [{ text: t[1], options: { bold: true, fontSize: 10, breakLine: true } }, { text: t[2], options: { fontSize: 8 } }], { x: x + 0.25, y, w: t[0] - 0.5, h: 0.56, color: T.white, align: "center", valign: "middle" });
    });
    // top-right: leaky revenue
    frame(s, 9.75, 1.22, 3.13, 2.9, "LEAKY REVENUE");
    const ks = [["8-15 %", "of students drop out or default mid-session"], ["₹36,000", "fees lost per dropout at month 4"], ["₹17.3 lakh", "fees at risk a year (400 students, 12 %)"]];
    ks.forEach((k, i) => {
      const y = 1.64 + i * 0.7;
      rect(s, 9.85, y, 2.93, 0.64, C2.gold);
      text(s, k[0], { x: 9.92, y, w: 1.3, h: 0.64, fontSize: 16, bold: true, color: i === 2 ? T.red : T.navy, valign: "middle" });
      text(s, k[1], { x: 11.2, y, w: 1.55, h: 0.64, fontSize: 8.5, valign: "middle" });
    });
    tag(s, "ps", 9.85, 3.78, { size: 8, h: 0.2 });
    note(s, 11.25, 3.72, 1.55, 0.32, "this is real cash", 3);
    // bottom row
    frame(s, L, 4.25, 4.75, 2.7, "WHO WE SERVE");
    const mk = [["22.8 L", "NEET UG 2025 registered candidates", "NTA result data"], ["15.4 L", "JEE Main 2025 unique registrations", "reported, secondary"], ["27 %", "of school students take private coaching", "NSO survey 2025"]];
    mk.forEach((m, i) => {
      const y = 4.68 + i * 0.47;
      text(s, m[0], { x: L + 0.1, y, w: 1.1, h: 0.42, fontSize: 17, bold: true, color: T.tealDark, valign: "middle" });
      text(s, [{ text: m[1], options: { breakLine: true } }, { text: m[2], options: { italic: true, color: T.muted, fontSize: 8 } }], { x: L + 1.25, y, w: 3.4, h: 0.42, fontSize: 9.5, color: T.ink, valign: "middle" });
    });
    rect(s, L + 0.1, 6.14, 4.55, 0.7, T.tint);
    text(s, [{ text: "Ceiling, not a forecast: ", options: { bold: true, color: T.tealDark } }, { text: "if every JEE and NEET aspirant's institute paid ₹30 a month, the pool is about ₹137 crore a year (38 lakh x ₹360)." }], { x: L + 0.18, y: 6.14, w: 4.4, h: 0.7, fontSize: 8.5, color: T.ink, valign: "middle" });
    frame(s, 5.3, 4.25, 4.35, 2.7, "THE BUYER'S CONSTRAINTS");
    const cons = [["FaIndianRupeeSign", "Price-sensitive", "Rivals list ₹4 to ₹21 a student a month."], ["FaTable", "Low-tech staff", "Excel, registers and a phone camera."], ["FaWifi", "Patchy internet", "So it must work offline, on one laptop."], ["FaUserShield", "Minors' data", "DPDP Act and MoE rules apply."]];
    for (let i = 0; i < 4; i++) {
      const x = 5.4 + (i % 2) * 2.1, y = 4.68 + Math.floor(i / 2) * 1.12;
      rect(s, x, y, 2.0, 1.04, C2.soft);
      await abadge(s, cons[i][0], x + 0.08, y + 0.08, 0.34, i);
      text(s, cons[i][1], { x: x + 0.5, y: y + 0.05, w: 1.45, h: 0.38, fontSize: 10.5, bold: true, valign: "middle" });
      text(s, cons[i][2], { x: x + 0.08, y: y + 0.48, w: 1.85, h: 0.52, fontSize: 9 });
    }
    frame(s, 9.75, 4.25, 3.13, 2.7, "WHAT PRAGATI DOES");
    const wd = ["Topic-level view of every student", "A short, supportive list each week", "An honest percentile range", "Verified Hindi and English reports", "Runs offline, free to run"];
    for (let i = 0; i < wd.length; i++) {
      await icon(s, "FaCircleCheck", 9.88, 4.7 + i * 0.37, 0.2, T.tealDark);
      text(s, wd[i], { x: 10.15, y: 4.64 + i * 0.37, w: 2.65, h: 0.32, fontSize: 9.5, valign: "middle" });
    }
    labelBar(s, 9.85, 6.58, 2.93, "Next: how it works", { h: 0.27, size: 10 });
    foot(s, "Sources: Participant Guide §2, §6, §7 (illustrative baselines); NTA NEET UG 2025 result data; JEE Main 2025 statistics (secondary); NSO CMS Education 2025; vendor listings (research R1).");
    s.addNotes("The 8-15 percent dropout, 36,000 rupee loss per leaver and 17.3 lakh total are the guide's illustrative baselines (400 x 12 % x 36,000). Market numbers: financial/research/R7_market_check.md.");
  }

