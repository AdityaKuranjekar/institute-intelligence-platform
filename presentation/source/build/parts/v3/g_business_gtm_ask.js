  // ================================================================ 10 BUSINESS MODEL
  pres.addSection({ title: "Business" });
  {
    const s = content("Business", "At ₹30 a student, fees kept and staff time saved already cover about half the cost; every admission it wins is a bonus", "Revenue model and unit economics", ["BUSINESS MODEL AND UNIT ECONOMICS", 5]);
    kit.panels("mix");
    const kp = [["3.6x", "LTV ÷ CAC", "4.8x undiscounted; guide 10.7x"], ["5.7 mo", "payback", "simple; guide 3.1 months"], ["78 %", "contribution margin", "₹6,740 a month per institute"], ["1.7x", "owner's return", "0.55x on fees + staff time only"]];
    const kw = (CWD - 0.3) / 4;
    kp.forEach((k, i) => {
      const x = L + i * (kw + 0.1);
      rect(s, x, 1.22, kw, 1.0, i === 3 ? T.teal : T.tealDark);
      text(s, k[0], { x: x + 0.1, y: 1.24, w: 1.5, h: 0.62, fontSize: 30, bold: true, color: T.white, valign: "middle" });
      text(s, k[1], { x: x + 1.6, y: 1.28, w: kw - 1.65, h: 0.55, fontSize: 11, bold: true, color: "C9DBF0", valign: "middle" });
      text(s, k[2], { x: x + 0.1, y: 1.86, w: kw - 0.2, h: 0.3, fontSize: 8.5, color: T.white });
    });
    frame(s, L, 2.35, 3.85, 4.0, "KEY ASSUMPTIONS (MID, BASE)");
    dtable(s, L + 0.04, 2.76, [1.62, 0.78, 1.0, 0.37], ["Assumption", "Base", "Range", "Basis"], [
      ["Students", "400", "180 to 1,200", "G"], ["Annual fee", "₹75,000", "60k to 95k", "R"], ["Dropout rate", "12 %", "8 to 18 %", "R"], ["Outreach effect", "15 %", "5 to 30 %", "R"], ["Share preventable", "55 %", "35 to 65 %", "A"], ["Recall, under 18", "32 %", "25 to 45 %", "A"],
      ["Recall, 18+", "42 %", "30 to 60 %", "A"], ["Flag precision", "15 %", "10 to 25 %", "R"], ["Admissions uplift", "1 %", "0 to 3 %", "A"], ["Staff hours saved", "25 a month", "10 to 50", "G"], ["Mentor min. a call", "120", "240 to 60", "A"], ["List price", "₹30", "₹20 to 40", "A"]],
      { rowH: 0.25, headH: 0.25, size: 8.5, headFill: T.tealDark, leftCols: [2], rowStyles: Array(12).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    text(s, "G guide · R researched · A assumption to test in interviews", { x: L + 0.06, y: 6.12, w: 3.7, h: 0.2, fontSize: 7.5, italic: true, color: T.muted });
    frame(s, 4.45, 2.35, 4.4, 4.0, "STRESS TEST: BEAR, BASE, BULL");
    pic(s, "chart_gauge.png", 4.5, 2.75, 4.3, 2.15, "Gauge of owner's return: bear, base, bull");
    [["BEAR", "0.37x", "LTV/CAC 0.75x"], ["BASE", "1.7x", "LTV/CAC 3.6x"], ["BULL", "3.9x", "LTV/CAC 10x"]].forEach((g, i) => {
      const x = 4.52 + i * 1.44;
      rect(s, x, 4.98, 1.38, 0.26, i === 1 ? T.tealDark : "6B7280");
      text(s, g[0], { x, y: 4.98, w: 1.38, h: 0.26, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: g[1], options: { bold: true, fontSize: 15, color: T.navy, breakLine: true } }, { text: g[2], options: { fontSize: 8, color: T.muted } }], { x, y: 5.27, w: 1.38, h: 0.55, align: "center" });
    });
    text(s, "Bear and Bull move 13 inputs. Every input at its worst gives 0.09x: a survival test, not a forecast.", { x: 4.55, y: 5.85, w: 4.25, h: 0.45, fontSize: 8.5, italic: true, color: T.muted });
    note(s, 11.0, 0.72, 1.85, 0.36, "value = fees + time + admissions", 2);
    frame(s, 9.0, 2.35, 3.88, 4.0, "WHERE ₹3.6 A STUDENT GOES");
    const parts = [["WhatsApp messages", 1.0, T.tealDark], ["Compute and storage", 0.8, T.teal], ["AI-written reports", 0.7, "5B8DC9"], ["Servers and database", 0.5, "8FB0D8"], ["Legal and compliance", 0.5, "B9CFE8"], ["Consent checks", 0.1, "DDE7F4"]];
    let yy = 2.78; const bh = 1.95;
    parts.forEach((p) => { const h = (p[1] / 3.6) * bh; rect(s, 9.1, yy, 0.55, h, p[2]); yy += h; });
    parts.forEach((p, i) => {
      const y = 2.76 + i * 0.33;
      rect(s, 9.8, y + 0.07, 0.16, 0.16, p[2]);
      text(s, [{ text: "₹" + p[1].toFixed(1) + "  ", options: { bold: true, color: T.navy } }, { text: p[0], options: { color: T.ink } }], { x: 10.02, y, w: 2.8, h: 0.3, fontSize: 9, valign: "middle" });
    });
    dtable(s, 9.04, 4.85, [1.45, 0.8, 1.53], ["Per institute", "Guide", "Pragati"], [["LTV ÷ CAC", "10.7x", { t: "3.6x", bold: true }], ["Payback", "3.1 mo", { t: "5.7 mo", bold: true }], ["CAC, sales", "₹25,000", { t: "₹15,567", bold: true }], ["Logo retention", "69 %", { t: "64 %", bold: true }]],
      { rowH: 0.26, headH: 0.26, size: 8.5, headFills: [T.tealDark, T.muted, T.tealDark], rowStyles: ["band", "white", "band", "white"] });
    tag(s, "model", 9.06, 6.12, { size: 7, h: 0.18 });
    rect(s, L, 6.47, CWD, 0.5, T.tealDark);
    text(s, [{ text: "Our base case is deliberately below the guide's: ", options: { color: T.white } }, { text: "4.0 % not 25 %, ₹30 not ₹40, 3.6x not 10.7x.", options: { bold: true, color: "F1D9A0" } }, { text: " It breaks even if it keeps 5.5 students a year or wins 1.5 extra admissions.", options: { color: T.white } }], { x: L + 0.15, y: 6.47, w: CWD - 0.3, h: 0.5, fontSize: 11, valign: "middle", align: "center" });
    foot(s, "Source: financial model v1.1 (Mid institute, 400 students, Base; CFO audit 22 Oct 2026). Model output from sourced and assumed inputs, not measured; willingness to pay is untested. ₹3.6 = all-in cost to serve.");
    s.addNotes("v1.1 numbers. Return 1.7x counts fees kept, staff time and a 1 % admissions uplift; 0.55x counts fees and staff time only; 0.35x fees only. LTV/CAC 3.6x discounted, 4.8x undiscounted; payback 5.7 months simple. Cost stack from COGS at Base inputs.");
  }

  // ================================================================ 11 GO-TO-MARKET
  {
    const s = content("Business", "Start in Patna with a free trial on last year's Excel, then grow city by city; the shared question bank is the moat", "Market and go-to-market; moat", ["GO-TO-MARKET, MOAT AND ROADMAP", 5]);
    const gx = 2.7, gw = 10.18, qw = gw / 6;
    rect(s, gx, 1.22, qw * 2, 0.2, T.navy); text(s, "FY27", { x: gx, y: 1.22, w: qw * 2, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
    rect(s, gx + qw * 2, 1.22, qw * 4, 0.2, T.tealDark); text(s, "FY28", { x: gx + qw * 2, y: 1.22, w: qw * 4, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
    ["Oct–Dec 26", "Jan–Mar 27", "Apr–Jun 27", "Jul–Sep 27", "Oct–Dec 27", "Jan–Mar 28"].forEach((q, i) => { rect(s, gx + i * qw, 1.42, qw - 0.02, 0.22, T.tealTint); text(s, q, { x: gx + i * qw, y: 1.42, w: qw, h: 0.22, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", valign: "middle" }); });
    const rows = [["TECH", "Validate on public data", 0, 1, T.tealDark], ["TECH", "Prototype and phone app", 0.3, 2, T.teal], ["PILOTS", "Free retro-pilots (2)", 1, 2, T.tealDark], ["PILOTS", "Paid pilots + controls", 2, 3, T.teal], ["SALES", "Demos before admissions", 1.3, 2.6, "5B8DC9"], ["SALES", "First paying institutes", 2.5, 4, T.tealDark], ["SCALE", "Bihar, UP, Jharkhand", 3.5, 6, T.teal], ["MONEY", "Raise ₹45 L", 1.5, 2.3, T.amber]];
    rows.forEach((r, i) => {
      const y = 1.7 + i * 0.265;
      if (i % 2 === 0) rect(s, L, y - 0.01, CWD, 0.265, T.tint);
      text(s, r[0], { x: L + 0.05, y, w: 0.7, h: 0.24, fontSize: 7.5, bold: true, color: T.muted, valign: "middle", charSpacing: 0.5 });
      text(s, r[1], { x: L + 0.8, y, w: 1.5, h: 0.24, fontSize: 8.5, color: T.ink, valign: "middle" });
      rect(s, gx + r[2] * qw, y + 0.03, (r[3] - r[2]) * qw - 0.04, 0.18, r[4]);
    });
    for (let i = 1; i < 6; i++) kit.line(s, gx + i * qw - 0.01, 1.66, gx + i * qw - 0.01, 3.82, { color: "D5DEEA", w: 0.5 });
    kit.panels("mix");
    frame(s, L, 3.98, 4.35, 2.97, "THE ACQUISITION ENGINE");
    const hx = 2.6, hy = 5.5;
    const sp = [[2.6, 4.7, "FaGift", "Free retro-pilot", "one Excel file, no install"], [0.95, 5.5, "FaPersonChalkboard", "Field demos", "Jan to Mar"], [4.25, 5.5, "FaHandshake", "Nextute network", "referral, to agree"], [2.6, 6.3, "FaPrint", "Channel partners", "OMR and test-series vendors"]];
    sp.forEach((p) => kit.line(s, hx, hy, p[0], p[1], { color: T.line, w: 2 }));
    s.addShape("ellipse", { x: hx - 0.42, y: hy - 0.42, w: 0.84, h: 0.84, fill: { color: T.tealDark }, line: { color: T.white, width: 3 } });
    text(s, "Pragati", { x: hx - 0.42, y: hy - 0.42, w: 0.84, h: 0.84, fontSize: 9.5, bold: true, color: T.white, align: "center", valign: "middle" });
    for (let i = 0; i < 4; i++) {
      const [x, y, ic, t, sub] = sp[i];
      s.addShape("ellipse", { x: x - 0.25, y: y - 0.25, w: 0.5, h: 0.5, fill: { color: T.teal }, line: { color: T.white, width: 2 } });
      await icon(s, ic, x - 0.12, y - 0.12, 0.24, T.white);
      const below = i !== 0 && i !== 3;
      text(s, [{ text: t, options: { bold: true, fontSize: 8.5, color: T.navy, breakLine: true } }, { text: sub, options: { fontSize: 7.5, color: T.muted } }], { x: i === 0 ? x + 0.3 : i === 3 ? x + 0.3 : x - 0.7, y: below ? y + 0.26 : y - 0.2, w: below ? 1.4 : 1.4, h: 0.42, align: below ? "center" : "left", valign: "top" });
    }
    frame(s, 4.95, 3.98, 4.2, 2.97, "COMPETITION AND MOAT");
    const mk = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? "F1E8D3" : "F4F7FB", bold: true, color: t === "yes" ? T.tealDark : T.muted });
    dtable(s, 5.0, 4.38, [1.0, 0.7, 0.5, 0.65, 0.65, 0.6], ["", "₹/mo", "OMR", "Topics", "Report", "Hindi"], [
      ["Classplus", "4–7", mk("?"), mk("?"), mk("?"), mk("?")], ["Fedena", "10–21", mk("no"), mk("?"), mk("yes"), mk("?")], ["Teachmint", "20–40", mk("?"), mk("?"), mk("yes"), mk("yes")],
      [{ t: "Pragati", bold: true, color: T.white, fill: T.tealDark }, { t: "30", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }]],
      { rowH: 0.25, headH: 0.25, size: 8.5, headSize: 8, rowStyles: ["white", "white", "white", "white"], headFill: T.tealDark });
    text(s, "yes: in listing · no: not shown · ?: not verifiable", { x: 5.0, y: 5.72, w: 4.1, h: 0.18, fontSize: 7.5, italic: true, color: T.muted });
    chevrow(s, 5.0, 5.95, 4.1, 0.44, [{ t: "More institutes" }, { t: "More answers" }, { t: "Sharper difficulty" }, { t: "Better lists" }], { size: 8, depth: 0.14 });
    text(s, "Weak below about 200 institutes: early wins come from time saved.", { x: 5.0, y: 6.45, w: 4.1, h: 0.4, fontSize: 8.5, italic: true, color: T.ink });
    frame(s, 9.3, 3.98, 3.58, 2.97, "BY INSTITUTE SIZE, AND YEAR 3");
    const b = (t) => ({ t, bold: true, fill: C2.green });
    dtable(s, 9.34, 4.38, [1.4, 0.68, 0.68, 0.72], ["Base", "Small", "Mid", "Large"], [["Students", "180", "400", "1,200"], ["Owner return", "1.6x", b("1.7x"), "2.1x"], ["LTV÷CAC, field", "1.5x", b("3.6x"), "9.2x"], ["LTV÷CAC, partner", "3.4x", "4.9x", "6.1x"]],
      { rowH: 0.26, headH: 0.26, size: 8.5, headFills: [T.tealDark, T.muted, T.tealDark, T.muted], rowStyles: ["band", "white", "band", "white"] });
    [["58", "paying institutes"], ["₹65 L", "revenue, year 3"], ["Month 16", "break-even"]].forEach((k, i) => {
      const x = 9.34 + i * 1.18;
      rect(s, x, 5.78, 1.12, 0.62, T.tealDark);
      text(s, [{ text: k[0], options: { bold: true, fontSize: 13, color: T.white, breakLine: true } }, { text: k[1], options: { fontSize: 7.5, color: "C9DBF0" } }], { x, y: 5.78, w: 1.12, h: 0.62, align: "center", valign: "middle" });
    });
    text(s, "Year 3, Base case. Needs ₹45 L.", { x: 9.34, y: 6.45, w: 3.4, h: 0.22, fontSize: 8, italic: true, color: T.muted });
    foot(s, "Sources: vendor listings (financial/research R1; ? means not verifiable, not absent); financial model v1.1 (field vs channel economics; 3-year projection); roadmap dates are our plan.");
    s.addNotes("Small institutes: channel partners give LTV/CAC 3.4x against 1.5x by field sales. Year 3 Base: 58 paying institutes, revenue 65.3 lakh, EBITDA 11.9 lakh, funding need 45 lakh, break-even month 16. One field rep at 8 percent of the market.");
  }

  // ================================================================ 12 VALIDATION AND THE ASK
  pres.addSection({ title: "The Ask" });
  {
    const s = content("The Ask", "What we have proved, what we have not, the risks that could sink us, and the one pilot that settles it", "Feasibility; honest limits", ["VALIDATION, RISKS AND THE ASK", 6]);
    const cw = 4.05, gx = 0.14, y0 = 1.22, h0 = 2.3;
    const cols = [["PROVED ON PUBLIC DATA", "proved", [["Next-answer AUC", "0.763 (DKT 0.754)"], ["Withdrawal AUC, day 28", "0.706 (published 0.794)"], ["Calibration error", "0.009"], ["Academic-only cost", "0.008 AUC"], ["Precision at top 10 %", "0.46 vs 0.24 to 0.31"]]],
      ["SHOWN ON SYNTHETIC DATA", "pending", [["Pipeline end to end", "116 tests pass"], ["Tenant isolation", "0 rows across institutes"], ["Report checker", "8 checks, template fallback"], ["Difficulty recovery", "pending"], ["Early-warning lift", "pending"]]],
      ["NOT PROVEN YET", "notproven", [["Accuracy at real institutes", "needs a pilot"], ["Willingness to pay", "owner interviews"], ["Real dropout reduction", "borrowed from trials"], ["Hindi quality at scale", "native review"], ["Other OMR layouts", "one-time onboarding"]]]];
    cols.forEach((c, i) => {
      const x = L + i * (cw + gx);
      s.addShape("rect", { x, y: y0, w: cw, h: h0, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      tag(s, c[1], x + 0.1, y0 + 0.08, { label: c[0], size: 8.5, h: 0.26, w: cw - 0.2 });
      c[2].forEach((r, k) => {
        const y = y0 + 0.4 + k * 0.37;
        rect(s, x + 0.1, y, cw - 0.2, 0.34, k % 2 ? T.white : C2.soft);
        text(s, r[0], { x: x + 0.16, y, w: 1.9, h: 0.34, fontSize: 9, bold: true, color: T.navy, valign: "middle" });
        text(s, r[1], { x: x + 2.05, y, w: cw - 2.2, h: 0.34, fontSize: 8.5, valign: "middle" });
      });
    });
    frame(s, L, 3.65, 3.95, 2.35, "RISK MATRIX");
    const mx = L + 0.45, my = 4.05, mw = 3.35, mh = 1.65;
    [[0, 0, "F4F7FB"], [1, 0, "FBEFD8"], [0, 1, "FBEFD8"], [1, 1, "F6E0DD"]].forEach(([qx, qy, c]) => rect(s, mx + qx * mw / 2, my + (1 - qy) * mh / 2, mw / 2 - 0.03, mh / 2 - 0.03, c));
    text(s, "LIKELIHOOD →", { x: mx, y: my + mh + 0.02, w: mw, h: 0.2, fontSize: 8, bold: true, color: T.muted, align: "center" });
    s.addText("IMPACT →", { x: L - 0.3, y: my + mh / 2 - 0.12, w: 0.9, h: 0.24, fontSize: 8, bold: true, color: T.muted, align: "center", rotate: 270, margin: 0 });
    [[1, 0.5, 0.82], [2, 0.66, 0.68], [3, 0.82, 0.42], [4, 0.24, 0.3]].forEach(([n, lx, iy]) => {
      s.addShape("ellipse", { x: mx + lx * mw - 0.17, y: my + (1 - iy) * mh - 0.17, w: 0.34, h: 0.34, fill: { color: n === 4 ? T.teal : T.tealDark }, line: { color: T.white, width: 2 } });
      text(s, String(n), { x: mx + lx * mw - 0.17, y: my + (1 - iy) * mh - 0.17, w: 0.34, h: 0.34, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
    });
    frame(s, 4.55, 3.65, 5.0, 2.35, "KEY RISKS AND HOW WE CONTAIN THEM");
    dtable(s, 4.6, 4.05, [0.3, 1.75, 2.85], ["", "Risk", "Mitigation"], [
      [{ t: "1", bold: true, color: T.tealDark }, { t: "Accuracy below public-data results", bold: true, color: T.red }, "Retro-pilot before any sale; compare with the institute's rule at equal workload"],
      [{ t: "2", bold: true, color: T.tealDark }, { t: "Owners will not pay ₹30", bold: true, color: T.red }, "Price survey; lead with staff time and parent reports"],
      [{ t: "3", bold: true, color: T.tealDark }, { t: "Mentors ignore the list", bold: true, color: T.red }, "List capped at capacity; every flag needs a logged outcome"],
      [{ t: "4", bold: true, color: T.tealDark }, { t: "Hindi quality", bold: true, color: T.red }, "Native reviewer; template fallback when a check fails"]],
      { rowH: 0.36, headH: 0.25, size: 8.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: ["band", "white", "band", "white"] });
    frame(s, 9.7, 3.65, 3.18, 2.35, "THE PILOT THAT SETTLES IT");
    chevrow(s, 9.78, 4.08, 3.02, 0.36, [{ t: "Wk 0–4" }, { t: "1 term" }, { t: "After" }], { size: 8.5, depth: 0.13 });
    lines(s, [{ t: "Retro-pilot at 2 institutes: last year's Excel, who left, who we would have flagged." }, { t: "Staggered paid pilot: half the batches first; measures written down in advance." }, { t: "Decide: fix the percentile table with real exam results; publish all of it." }], 9.8, 4.52, 3.05, 1.45, { size: 8.5, gap: 3 });
    rect(s, L, 6.12, CWD, 0.85, T.tealDark);
    text(s, "THE ASK", { x: L + 0.2, y: 6.16, w: 2, h: 0.24, fontSize: 10, bold: true, color: "F1D9A0", charSpacing: 2 });
    text(s, "Two free retro-pilots in Patna this winter.", { x: L + 0.2, y: 6.38, w: 6.6, h: 0.42, fontSize: 21, bold: true, color: T.white, valign: "middle" });
    text(s, "If we flag fewer of the students who left than your attendance rule, at the same workload, we stop.", { x: L + 0.2, y: 6.76, w: 6.6, h: 0.2, fontSize: 8.5, color: "C9DBF0" });
    [["₹45 L", "funding, Base"], ["Month 16", "break-even"], ["₹65 L", "year-3 revenue"]].forEach((k, i) => {
      const x = 7.5 + i * 1.8;
      rect(s, x, 6.2, 1.7, 0.7, "1A3F6F");
      text(s, [{ text: k[0], options: { bold: true, fontSize: 15, color: T.white, breakLine: true } }, { text: k[1], options: { fontSize: 8, color: "C9DBF0" } }], { x, y: 6.2, w: 1.7, h: 0.7, align: "center", valign: "middle" });
    });
    note(s, 11.0, 0.72, 1.85, 0.36, "we stop if it fails", 3);
    foot(s, "Sources: ml/public_validation; technical/docs/FEASIBILITY_CHECK.md; financial model v1.1 (Base: ₹45 L funding, break-even month 16, year-3 revenue ₹65.3 L). Pending items get measured values before submission.");
    s.addNotes("State limits first. The ask is concrete and falsifiable. Bear needs 1 crore funding and does not break even within 36 months.");
  }

