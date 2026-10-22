  // ================================================================ 3 PROBLEM
  pres.addSection({ title: "Problem" });
  {
    const s = content("Problem", "Institutes have the marks, but notice a struggling student only after that student has left", "Problem framing", ["THE PROBLEM: LEAKY REVENUE, MESSY DATA", 1]);
    hdrBar(s, L, 1.3, 5.95, "LEAKY REVENUE", { h: 0.3, size: 11.5 });
    [["8–15 %", "of students leave mid-session", T.tealDark], ["₹17.3 L", "fees lost a year, per 400 students", T.red]].forEach((k, i) => {
      const x = L + i * 3.0;
      rect(s, x, 1.6, 2.95, 1.15, k[2]);
      text(s, k[0], { x, y: 1.66, w: 2.95, h: 0.65, fontSize: 32, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 0.1, y: 2.3, w: 2.75, h: 0.4, fontSize: 10.5, color: T.white, align: "center", valign: "middle" });
    });
    sec(s, 1, "WHERE THE DATA LIVES", L, 2.95, 5.9);
    const src = [["FaFileExcel", "Excel files"], ["FaFileLines", "Paper OMR sheets"], ["FaWhatsapp", "WhatsApp groups"]];
    for (let i = 0; i < 3; i++) {
      const x = L + i * 2.0;
      s.addShape("rect", { x, y: 3.3, w: 1.9, h: 0.5, fill: { color: T.greyLight }, line: { color: T.grey, width: 1, dashType: "dash" } });
      await icon(s, src[i][0], x + 0.1, 3.4, 0.3, T.muted);
      text(s, src[i][1], { x: x + 0.5, y: 3.3, w: 1.38, h: 0.5, fontSize: 10.5, bold: true, color: T.muted, valign: "middle" });
    }
    const tiers = [[5.95, "Messy, unconnected data", "No topic view. No early warning.", "9AA6B5"], [4.1, "The bottleneck", "Staff time, no analysis", "5B8DC9"], [2.6, "Pragati", "Clean topic map, weekly list", T.tealDark]];
    tiers.forEach((t, i) => {
      const y = 3.95 + i * 0.7, x = L + (5.95 - t[0]) / 2;
      s.addShape("trapezoid", { x, y, w: t[0], h: 0.64, flipV: true, fill: { color: t[3] }, line: { color: T.white, width: 1.5 } });
      text(s, [{ text: t[1], options: { bold: true, fontSize: 11.5, breakLine: true } }, { text: t[2], options: { fontSize: 9 } }], { x: x + 0.3, y, w: t[0] - 0.6, h: 0.64, color: T.white, align: "center", valign: "middle" });
    });
    rect(s, L, 6.1, 5.95, 0.8, T.tint);
    text(s, [{ text: "Who we serve: ", options: { bold: true, color: T.tealDark } }, { text: "22.8 lakh NEET and about 15.4 lakh JEE Main candidates registered in 2025. 27 % of school students use private coaching." }], { x: L + 0.15, y: 6.1, w: 5.65, h: 0.8, fontSize: 10, color: T.ink, valign: "middle" });
    // friction matrix
    text(s, "THE FRICTION MATRIX", { x: 6.75, y: 1.3, w: 4, h: 0.3, fontSize: 11.5, bold: true, color: T.tealDark, valign: "middle", charSpacing: 1 });
    const fm = [["FaChalkboardUser", "Teachers", ["Check OMR sheets by hand", "See weak topics after exams", "No time for each student"]], ["FaBuilding", "Owners", ["Can't compare batches or teachers", "Learn of dropouts too late", "Generic apps give no insight"]],
      ["FaUsers", "Parents", ["Get a marks list, nothing more", "Can't tell if child improves", "Trust slips, fee questions grow"]], ["FaChildReaching", "Students", ["Struggle quietly for weeks", "Same plan as whole batch", "Noticed only when they stop"]]];
    for (let i = 0; i < 4; i++) {
      const x = 6.75 + (i % 2) * 3.1, y = 1.62 + Math.floor(i / 2) * 2.65;
      s.addShape("rect", { x, y, w: 3.0, h: 2.55, fill: { color: i === 1 || i === 2 ? T.tint : T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, y, 3.0, 0.5, T.tealDark);
      await icon(s, fm[i][0], x + 0.15, y + 0.1, 0.3, T.white);
      text(s, fm[i][1], { x: x + 0.6, y, w: 2.3, h: 0.5, fontSize: 14, bold: true, color: T.white, valign: "middle" });
      lines(s, fm[i][2], x + 0.12, y + 0.68, 2.78, 1.8, { size: 13, gap: 14 });
    }
    foot(s, "Sources: Participant Guide §2, §7 (illustrative baselines: 12 % dropout, ₹36,000 per leaver); NTA NEET UG 2025 result data; JEE Main 2025 statistics (secondary); NSO CMS Education 2025.");
    s.addNotes("The 8-15 percent dropout, 36,000 rupee loss per leaver and 17.3 lakh total are the guide's illustrative baselines (400 x 12 % x 36,000). Market numbers are in financial/research/R7_market_check.md.");
  }

  // ================================================================ 4 REALITY CHECK
  {
    const s = content("Problem", "We tested the guide's headline numbers and built around what survives", "Feasibility and business realism", ["REALITY CHECK: MYTH VS PRAGATI", 1]);
    rect(s, L, 1.3, 5.2, 0.38, "6B7280");
    text(s, "THE INDUSTRY MYTH", { x: L, y: 1.3, w: 5.2, h: 0.38, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1.5 });
    rect(s, 7.25, 1.3, 5.63, 0.38, T.tealDark);
    text(s, "THE PRAGATI REALITY", { x: 7.25, y: 1.3, w: 5.63, h: 0.38, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1.5 });
    const rows = [["FaIndianRupeeSign", "COST", "Owners will happily pay ₹40", "Rivals list ₹4–21 a student; we test ₹30"], ["FaUserMinus", "DROPOUTS", "Saves a quarter of dropouts", "Honest base case: 4 % fewer dropouts, proven in pilots"],
      ["FaChildReaching", "MINORS' DATA", "Track every student's app activity", "Law bans tracking minors; under-18s get academic data only"], ["FaBullseye", "ACCURACY", "Quote the best published score", "Our strict student-level test scores 0.71 against 0.79 published"]];
    for (let i = 0; i < 4; i++) {
      const y = 1.8 + i * 1.02;
      s.addShape("rect", { x: L, y, w: 5.2, h: 0.92, fill: { color: "F1F2F4" }, line: { color: "C5CAD3", width: 1 } });
      await icon(s, "FaCircleXmark", L + 0.15, y + 0.28, 0.36, T.red);
      text(s, rows[i][2], { x: L + 0.7, y, w: 4.4, h: 0.92, fontSize: 14, color: "5B6573", valign: "middle" });
      s.addShape("roundRect", { x: 5.8, y: y + 0.2, w: 1.3, h: 0.52, rectRadius: 0.26, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
      await icon(s, rows[i][0], 5.88, y + 0.31, 0.28, T.tealDark);
      text(s, rows[i][1], { x: 6.24, y: y + 0.2, w: 0.85, h: 0.52, fontSize: 7, bold: true, color: T.tealDark, valign: "middle" });
      s.addShape("rect", { x: 7.25, y, w: 5.63, h: 0.92, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 1.5 } });
      await icon(s, "FaCircleCheck", 7.4, y + 0.28, 0.36, "1B8F55");
      text(s, rows[i][3], { x: 7.95, y, w: 4.85, h: 0.92, fontSize: 13.5, bold: true, color: T.navy, valign: "middle" });
    }
    rect(s, L, 5.98, 3.3, 0.95, T.tealDark);
    text(s, [{ text: "THE DECISION REFRAME", options: { bold: true, fontSize: 10, color: "C9DBF0", breakLine: true } }, { text: "Not “who will drop out?” but “who do we call this week?”", options: { fontSize: 12.5, bold: true, color: T.white } }], { x: L + 0.12, y: 5.98, w: 3.06, h: 0.95, valign: "middle" });
    chevrow(s, 3.95, 6.1, 8.9, 0.72, [{ t: "Score", sub: "who is slipping" }, { t: "Explain", sub: "plain reasons" }, { t: "Assign", sub: "to a mentor" }, { t: "Log", sub: "what worked" }], { size: 13, depth: 0.28 });
    foot(s, "Sources: case guide; vendor listings (financial/research R1); financial model v1.1 (Base: 4.0 % effective reduction); OULAD student-grouped test, PLOS ONE 2026 (0.794); DPDP Act 2023 s.9(3).");
    s.addNotes("Four of the six assumptions tested in the guide. Effective dropout reduction 4.0 % in the v1.1 model against the guide's 25 %. Our OULAD day-28 AUC is 0.706 on a strict student-grouped split.");
  }

  // ================================================================ 5 ARCHITECTURE: LAYERED CAKE
  pres.addSection({ title: "Technology" });
  {
    const s = content("Technology", "Three layers, one rule: each institute's data stays its own", "Architecture and engineering", ["SYSTEM ARCHITECTURE: THREE LAYERS", 3]);
    const cx = 6.667;
    const layers = [["DELIVERY", "What people use", "FaDisplay", 9.2, T.tealDark, [["Web console", "Owner and teacher views"], ["Phone app", "Scan, weekly list, parent view"], ["Hindi + English", "Reports in both languages"], ["Open export", "CSV and API; you own the data"]]],
      ["INTELLIGENCE", "What it works out", "FaBrain", 10.5, T.teal, [["Topic mastery", "Finds weak topics (IRT)"], ["Early warning", "Flags who needs help (LightGBM)"], ["Honest ranges", "Percentile bands (conformal)"], ["Safe reports", "No invented numbers (8 checks)"]]],
      ["TRUST & DATA", "What keeps it safe", "FaShieldHalved", 11.8, T.navy, [["Row-level security", "Institutes never mix"], ["Consent gate", "No consent, no model"], ["Offline-first", "Works without internet"], ["Audit log", "Who saw what, kept a year"]]]];
    for (let i = 0; i < 3; i++) {
      const [name, sub, ic, w, col, chips] = layers[i];
      const x = cx - w / 2, y = 1.32 + i * 1.58;
      rect(s, x + 0.06, y + 0.08, w, 1.48, "DDE3EC");
      s.addShape("rect", { x, y, w, h: 1.48, fill: { color: T.white }, line: { color: col, width: 1.5 } });
      rect(s, x, y, 2.1, 1.48, col);
      await icon(s, ic, x + 0.78, y + 0.18, 0.55, T.white);
      text(s, name, { x, y: y + 0.78, w: 2.1, h: 0.32, fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, sub, { x, y: y + 1.08, w: 2.1, h: 0.3, fontSize: 9.5, color: "C9DBF0", align: "center", valign: "middle" });
      const cw = (w - 2.1 - 0.3) / 4;
      chips.forEach((c, k) => {
        const px = x + 2.2 + k * (cw + 0.03);
        s.addShape("rect", { x: px, y: y + 0.18, w: cw - 0.08, h: 1.12, fill: { color: T.tealTint }, line: { color: "B9CBE4", width: 0.75 } });
        text(s, [{ text: c[0], options: { bold: true, fontSize: 11, color: T.navy, breakLine: true } }, { text: c[1], options: { fontSize: 9.5, color: T.ink } }], { x: px + 0.08, y: y + 0.18, w: cw - 0.24, h: 1.12, valign: "middle", align: "center" });
      });
    }
    const tk = [["31", "tables, all isolated"], ["23", "API endpoints"], ["380", "syllabus topics"], ["116", "automated tests"], ["₹3.6", "per student a month"]];
    const tw = (CWD - 0.4) / 5;
    tk.forEach((k, i) => {
      const x = L + i * (tw + 0.1);
      rect(s, x, 6.12, tw, 0.82, T.tealDark);
      text(s, k[0], { x: x + 0.1, y: 6.12, w: 1.25, h: 0.82, fontSize: 24, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 1.35, y: 6.12, w: tw - 1.4, h: 0.82, fontSize: 10.5, color: "C9DBF0", valign: "middle" });
    });
    foot(s, "Sources: technical/contracts (31 tables, 23 endpoints, 380 topics); tenant isolation tested on PostgreSQL 16; test suites; financial model v1.1 (Base, ₹3.6 all-in).");
    s.addNotes("Layered view of the architecture. Keywords in brackets are the technical names for judges: IRT, LightGBM, conformal prediction, row-level security. Local-first: one laptop or one small server per deployment, no paid services.");
  }

  // ================================================================ 6 PRODUCT
  pres.addSection({ title: "Product" });
  {
    const s = content("Product", "A web console for the office, a phone app for mentors and parents", "Architecture and product", ["THE PRODUCT: WEB AND PHONE", 2]);
    rect(s, L, 1.3, 12.43, 3.75, T.tint);
    s.addShape("rect", { x: L + 0.1, y: 1.38, w: 6.45, h: 3.63, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "web_console.png", L + 0.12, 1.4, 6.41, 3.6, "Pragati web console (illustrative)");
    ["app_scan.png", "app_mentor.png", "app_parent.png"].forEach((f, i) => pic(s, f, 7.2 + i * 1.9, 1.3, 1.8, 3.6, "Pragati phone screen (illustrative)"));
    callout(s, 1, 8.75, 4.2, 0.3); callout(s, 2, 2.4, 3.15, 0.3); callout(s, 3, 9.25, 2.35, 0.3); callout(s, 4, 11.4, 3.3, 0.3);
    text(s, "Illustrative mock-ups, synthetic students", { x: 7.2, y: 4.9, w: 5.65, h: 0.22, fontSize: 8.5, italic: true, color: T.muted, align: "right" });
    const bn = [["FaCamera", "1  Scan on a phone", "Unclear bubbles fixed in one tap"], ["FaTableCells", "2  Topic map", "Weak topics for the whole batch"], ["FaListCheck", "3  Weekly list", "Up to 8 students, with plain reasons"], ["FaLanguage", "4  Parent update", "Hindi or English, numbers checked"]];
    const bw = (CWD - 0.45) / 4;
    for (let i = 0; i < 4; i++) {
      const x = L + i * (bw + 0.15);
      s.addShape("rect", { x, y: 5.25, w: bw, h: 1.0, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, 5.25, 0.62, 1.0, T.tealDark);
      await icon(s, bn[i][0], x + 0.14, 5.55, 0.34, T.white);
      text(s, bn[i][1], { x: x + 0.72, y: 5.3, w: bw - 0.8, h: 0.36, fontSize: 12, bold: true, color: T.navy, valign: "middle" });
      text(s, bn[i][2], { x: x + 0.72, y: 5.66, w: bw - 0.8, h: 0.55, fontSize: 10.5, color: T.ink });
    }
    const wk = [["Mon", "Test scanned"], ["Tue", "Mentor calls"], ["Wed", "Remedial session"], ["Sat", "Parent update"], ["Month", "Owner sees outcomes"]];
    chevrow(s, L, 6.4, CWD, 0.55, wk.map((w) => ({ t: w[0] + ": " + w[1] })), { size: 11, depth: 0.2 });
    foot(s, "Both surfaces share one API. The phone app is a progressive web app installed from the browser (no app-store fee). Mock-ups use synthetic students; report text comes from our report module.");
    s.addNotes("Product view. 1 is the scan screen, 2 the topic heatmap in the web console, 3 the mentor's weekly list, 4 the parent report in Hindi. The week strip shows the operating rhythm.");
  }

