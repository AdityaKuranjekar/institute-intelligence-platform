  // ================================================================ 10 PRIVACY
  pres.addSection({ title: "Trust" });
  {
    const s = content("Trust", "Built for the law and for children: consent first, supportive actions only", "Feasibility, privacy and safety", ["PRIVACY, SAFETY AND DPDP COMPLIANCE", 4]);
    s.addShape("rect", { x: L, y: 1.3, w: 3.3, h: 3.3, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "screen_consent.png", L + 0.02, 1.32, 3.26, 3.26, "Consent notice with purpose switches (illustrative)");
    callout(s, 1, L - 0.12, 1.75, 0.3); callout(s, 2, L - 0.12, 2.9, 0.3); callout(s, 3, L - 0.12, 3.9, 0.3);
    text(s, [{ text: "1  ", options: { bold: true, color: T.tealDark } }, { text: "Rule 10: parent's ID checked at the admission desk", options: { breakLine: true } }, { text: "2  ", options: { bold: true, color: T.tealDark } }, { text: "One switch for each purpose", options: { breakLine: true } }, { text: "3  ", options: { bold: true, color: T.tealDark } }, { text: "Withdraw everything in one tap" }], { x: L, y: 4.68, w: 3.3, h: 0.7, fontSize: 9.5, color: T.ink });
    // lockbox
    const bx = 4.05, bw = 4.4;
    s.addShape("roundRect", { x: bx, y: 1.3, w: bw, h: 3.9, rectRadius: 0.12, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 2.5, dashType: "dash" } });
    s.addShape("ellipse", { x: bx + bw / 2 - 0.45, y: 1.0, w: 0.9, h: 0.9, fill: { color: T.tealDark }, line: { color: T.white, width: 3 } });
    await icon(s, "FaLock", bx + bw / 2 - 0.2, 1.25, 0.4, T.white);
    text(s, "THE INSTITUTE'S OWN SPACE", { x: bx, y: 1.95, w: bw, h: 0.3, fontSize: 12, bold: true, color: T.tealDark, align: "center", charSpacing: 1 });
    text(s, "one laptop or one private server", { x: bx, y: 2.22, w: bw, h: 0.24, fontSize: 9.5, italic: true, color: T.muted, align: "center" });
    const lb = [["FaUserGraduate", "Student records"], ["FaFileCircleCheck", "Marks and answers"], ["FaSignature", "Consent ledger"], ["FaListCheck", "Risk lists: mentors only"]];
    for (let i = 0; i < 4; i++) {
      const x = bx + 0.2 + (i % 2) * 2.0, y = 2.6 + Math.floor(i / 2) * 1.0;
      s.addShape("rect", { x, y, w: 1.9, h: 0.9, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      await icon(s, lb[i][0], x + 0.78, y + 0.1, 0.34, T.tealDark);
      text(s, lb[i][1], { x: x + 0.05, y: y + 0.5, w: 1.8, h: 0.35, fontSize: 10, bold: true, color: T.navy, align: "center", valign: "middle" });
    }
    text(s, "Raw student data never leaves", { x: bx, y: 4.7, w: bw, h: 0.35, fontSize: 12, bold: true, color: T.tealDark, align: "center", valign: "middle" });
    // outputs
    kit.line(s, bx + bw, 2.3, 9.0, 2.3, { color: T.tealDark, w: 2.5, arrow: true });
    kit.line(s, bx + bw, 3.9, 9.0, 3.9, { color: T.tealDark, w: 2.5, arrow: true });
    tile(s, 9.0, 1.3, 3.88, 1.95, "OUT: SHARED QUESTION BANK", "Question difficulty numbers only. No student, no name, no marks.", { bs: 14 });
    tile(s, 9.0, 3.4, 3.88, 1.8, "SEEN BY PARENTS AND STUDENTS", "Progress and next steps. Never ranks. Never a risk label.", { bs: 14 });
    // guardrails
    s.addShape("ellipse", { x: L, y: 5.35, w: 1.5, h: 1.5, fill: { color: T.tealDark }, line: { color: T.tealTint, width: 6 } });
    await icon(s, "FaShieldHalved", L + 0.38, 5.68, 0.75, T.white);
    text(s, "SAFETY GUARDRAILS", { x: 2.2, y: 5.28, w: 4, h: 0.28, fontSize: 11.5, bold: true, color: T.tealDark, charSpacing: 1 });
    const gr = ["No leaderboards or public ranks", "No batch moves based on scores", "Banned-words check on every message", "Counsellor contact for each institute", "Risk lists: mentors and owner only", "Students never see a risk label"];
    gr.forEach((g, i) => {
      const x = 2.2 + (i % 3) * 3.55, y = 5.6 + Math.floor(i / 3) * 0.52;
      s.addShape("rect", { x, y, w: 3.48, h: 0.46, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, y, 0.08, 0.46, T.tealDark);
      text(s, g, { x: x + 0.18, y, w: 3.25, h: 0.46, fontSize: 10.5, bold: true, color: T.navy, valign: "middle" });
    });
    text(s, "DPDP s.9(1) and Rule 10: parental consent  ·  s.9(3): no tracking of children  ·  MoE 2024 cl. 10.2(xi): results for counselling, never public", { x: 2.2, y: 6.68, w: 10.6, h: 0.3, fontSize: 9, italic: true, color: T.muted, valign: "middle" });
    foot(s, "Sources: DPDP Act 2023 s.9 and Rules 2025 (Rule 10); MoE Guidelines for Coaching Centres 2024; contracts/routing_policy.yaml; tenant isolation tested on PostgreSQL 16. Not legal advice.");
    s.addNotes("Central lockbox: raw data stays in the institute's own environment; only item difficulty statistics reach a shared bank. We are the data processor; the institute is the data fiduciary. A lawyer's check on the in-person ID flow is still recommended.");
  }

  // ================================================================ 11 BUSINESS
  pres.addSection({ title: "Business" });
  {
    const s = content("Business", "At ₹30 a student the product pays back in under six months", "Revenue model and unit economics", ["BUSINESS MODEL AND UNIT ECONOMICS", 5]);
    const kp = [["3.6x", "LTV / CAC", "4.8x on the undiscounted basis most peers quote. The guide claims 10.7x."], ["5.7", "months to pay back", "Sales and onboarding cost recovered. Guide: 3.1 months."], ["78 %", "contribution margin", "₹6,740 a month per institute, after serving costs."]];
    const kw = (CWD - 0.3) / 3;
    kp.forEach((k, i) => {
      const x = L + i * (kw + 0.15);
      rect(s, x, 1.3, kw, 1.65, T.tealDark);
      text(s, k[0], { x: x + 0.15, y: 1.35, w: 1.9, h: 1.0, fontSize: 48, bold: true, color: T.white, valign: "middle" });
      text(s, k[1], { x: x + 2.05, y: 1.45, w: kw - 2.15, h: 0.8, fontSize: 14, bold: true, color: "C9DBF0", valign: "middle" });
      text(s, k[2], { x: x + 0.15, y: 2.35, w: kw - 0.3, h: 0.55, fontSize: 10, color: T.white });
    });
    // gauge
    sec(s, 1, "STRESS TEST: BEAR, BASE, BULL", L, 3.15, 4.4);
    pic(s, "chart_gauge.png", L, 3.5, 4.4, 2.2, "Gauge of institute return: bear, base, bull");
    const gv = [["BEAR", "0.37x", "LTV/CAC 0.75x"], ["BASE", "1.7x", "LTV/CAC 3.6x"], ["BULL", "3.9x", "LTV/CAC 10x"]];
    gv.forEach((g, i) => {
      const x = L + i * 1.48;
      rect(s, x, 5.82, 1.42, 0.28, i === 1 ? T.tealDark : "6B7280");
      text(s, g[0], { x, y: 5.82, w: 1.42, h: 0.28, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: g[1], options: { bold: true, fontSize: 16, color: T.navy, breakLine: true } }, { text: g[2], options: { fontSize: 8.5, color: T.muted } }], { x, y: 6.12, w: 1.42, h: 0.6, align: "center", valign: "top" });
    });
    text(s, "Owner's return, all benefits. Every input at its worst: 0.09x.", { x: L, y: 6.72, w: 4.4, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    // cost stack
    const sx = 5.2, sw = 3.7;
    sec(s, 2, "WHERE ₹3.6 A STUDENT GOES", sx, 3.15, sw);
    const parts = [["WhatsApp messages", 1.0, T.tealDark], ["Compute and storage", 0.8, T.teal], ["AI-written reports", 0.7, "5B8DC9"], ["Servers and database", 0.5, "8FB0D8"], ["Legal and compliance", 0.5, "B9CFE8"], ["Consent checks", 0.1, "DDE7F4"]];
    let yy = 3.55; const tot = 3.6, bh = 2.75;
    parts.forEach((p) => { const h = (p[1] / tot) * bh; rect(s, sx, yy, 0.8, h, p[2]); yy += h; });
    parts.forEach((p, i) => {
      const y = 3.55 + i * 0.46;
      rect(s, sx + 1.0, y + 0.1, 0.2, 0.2, p[2]);
      text(s, [{ text: "₹" + p[1].toFixed(1) + "  ", options: { bold: true, color: T.navy } }, { text: p[0], options: { color: T.ink } }], { x: sx + 1.3, y, w: sw - 1.3, h: 0.4, fontSize: 10.5, valign: "middle" });
    });
    text(s, "A month, per student, all-in. Run locally: ₹0 extra", { x: sx, y: 6.5, w: sw, h: 0.3, fontSize: 9, italic: true, color: T.muted });
    // owner return
    const rx = 9.15, rw = R - 9.15;
    sec(s, 3, "WHAT THE OWNER GETS", rx, 3.15, rw);
    const rr = [["All benefits", 1.7, T.tealDark], ["Fees + staff time", 0.55, T.teal], ["Fees only", 0.35, "8FB0D8"]];
    rr.forEach((r, i) => {
      const y = 3.55 + i * 0.58;
      text(s, r[0], { x: rx, y, w: 1.3, h: 0.46, fontSize: 10, color: T.ink, valign: "middle" });
      rect(s, rx + 1.35, y + 0.06, (r[1] / 2) * (rw - 2.2), 0.34, r[2]);
      text(s, r[1] + "x", { x: R - 0.75, y, w: 0.75, h: 0.46, fontSize: 13, bold: true, color: T.navy, align: "right", valign: "middle" });
    });
    kit.line(s, rx + 1.35 + 0.5 * (rw - 2.2), 3.5, rx + 1.35 + 0.5 * (rw - 2.2), 5.3, { color: T.red, w: 1.25, dash: "dash" });
    text(s, "1x = pays for itself", { x: rx + 1.35 + 0.5 * (rw - 2.2) - 0.8, y: 5.25, w: 1.6, h: 0.22, fontSize: 8.5, color: T.red, align: "center" });
    s.addShape("rect", { x: rx, y: 5.6, w: rw, h: 1.3, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    lines(s, ["Keep 5.5 students a year, or", "win 1.5 extra admissions: it breaks even", "₹30 per active student per month", "Annual contract per session"], rx + 0.12, 5.66, rw - 0.24, 1.2, { size: 10, gap: 2 });
    foot(s, "Source: financial model v1.1 (Mid institute, 400 students, Base; Bear/Bull flex 13 drivers; Stress sets all inputs to worst). Model output from sourced and assumed inputs; willingness to pay is untested.");
    s.addNotes("v1.1 numbers: LTV/CAC 3.6x discounted (4.8x undiscounted), payback 5.7 months simple, margin 78 %. Return 1.7x with admissions counted, 0.55x on hard benefits (fees plus staff time), 0.35x fees only. Cost stack from the COGS build at Base inputs: WhatsApp 0.8 plus platform fee 0.2, compute 0.8, AI reports 0.7, servers 0.5, compliance 0.5, consent 0.1.");
  }

  // ================================================================ 12 GO-TO-MARKET
  {
    const s = content("Business", "Start in Patna with a free trial on last year's Excel, then grow city by city", "Market and go-to-market; moat", ["GO-TO-MARKET AND ROADMAP", 5]);
    const gx = 2.7, gw = 10.18, qw = gw / 6;
    const qs = ["Oct–Dec 26", "Jan–Mar 27", "Apr–Jun 27", "Jul–Sep 27", "Oct–Dec 27", "Jan–Mar 28"];
    rect(s, gx, 1.3, qw * 2, 0.22, T.navy); text(s, "FY27", { x: gx, y: 1.3, w: qw * 2, h: 0.22, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
    rect(s, gx + qw * 2, 1.3, qw * 4, 0.22, T.tealDark); text(s, "FY28", { x: gx + qw * 2, y: 1.3, w: qw * 4, h: 0.22, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
    qs.forEach((q, i) => { rect(s, gx + i * qw, 1.52, qw - 0.02, 0.26, T.tealTint); text(s, q, { x: gx + i * qw, y: 1.52, w: qw, h: 0.26, fontSize: 9, bold: true, color: T.tealDark, align: "center", valign: "middle" }); });
    const rows = [["TECH", "Validate on public data", 0, 1, T.tealDark], ["TECH", "Prototype and phone app", 0.3, 2, T.teal], ["PILOTS", "Free retro-pilots (2)", 1, 2, T.tealDark], ["PILOTS", "Paid pilots + controls", 2, 3, T.teal], ["SALES", "Demos before admissions", 1.3, 2.6, "5B8DC9"], ["SALES", "First paying institutes", 2.5, 4, T.tealDark], ["SCALE", "Bihar, UP, Jharkhand", 3.5, 6, T.teal], ["MONEY", "Raise ₹45 L", 1.5, 2.3, T.amber]];
    rows.forEach((r, i) => {
      const y = 1.86 + i * 0.35;
      if (i % 2 === 0) rect(s, L, y - 0.02, CWD, 0.34, T.tint);
      text(s, r[0], { x: L + 0.05, y, w: 0.8, h: 0.3, fontSize: 8, bold: true, color: T.muted, valign: "middle", charSpacing: 0.5 });
      text(s, r[1], { x: L + 0.85, y, w: 1.45, h: 0.3, fontSize: 9, color: T.ink, valign: "middle" });
      rect(s, gx + r[2] * qw, y + 0.03, (r[3] - r[2]) * qw - 0.04, 0.24, r[4]);
    });
    for (let i = 1; i < 6; i++) kit.line(s, gx + i * qw - 0.01, 1.8, gx + i * qw - 0.01, 4.62, { color: "D5DEEA", w: 0.5 });
    // hub and spoke
    sec(s, 1, "THE ACQUISITION ENGINE", L, 4.78, 5.8);
    const hx = 3.4, hy = 5.95;
    const sp = [[1.95, 5.38, "FaGift", "Free retro-pilot", "one Excel file, no install"], [4.85, 5.38, "FaPersonChalkboard", "Field demos", "Jan to Mar, before admissions"], [1.95, 6.52, "FaPrint", "Channel partners", "OMR and test-series vendors"], [4.85, 6.52, "FaHandshake", "Nextute network", "referral channel, to agree"]];
    sp.forEach((p) => kit.line(s, hx, hy, p[0], p[1], { color: T.line, w: 2 }));
    s.addShape("ellipse", { x: hx - 0.5, y: hy - 0.5, w: 1.0, h: 1.0, fill: { color: T.tealDark }, line: { color: T.white, width: 3 } });
    text(s, "Pragati", { x: hx - 0.5, y: hy - 0.5, w: 1.0, h: 1.0, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
    for (let i = 0; i < 4; i++) {
      const [x, y, ic, t, sub] = sp[i];
      s.addShape("ellipse", { x: x - 0.28, y: y - 0.28, w: 0.56, h: 0.56, fill: { color: T.teal }, line: { color: T.white, width: 2 } });
      await icon(s, ic, x - 0.14, y - 0.14, 0.28, T.white);
      const left = x < hx;
      text(s, [{ text: t, options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: sub, options: { fontSize: 8, color: T.muted } }], { align: left ? "right" : "left", x: left ? x - 1.55 : x + 0.35, y: y - 0.25, w: 1.25, h: 0.5, valign: "middle", align: left ? "left" : "left" });
    }
    // competitor matrix
    const cx0 = 6.75;
    sec(s, 2, "COMPETITION (VENDOR LISTINGS)", cx0, 4.78, 6.1);
    const mk = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? "F1E8D3" : "F4F7FB", bold: true, color: t === "yes" ? T.tealDark : T.muted });
    dtable(s, cx0, 5.12, [1.25, 1.2, 0.7, 0.95, 1.0, 0.75], ["", "₹ / student / mo", "OMR", "Topic map", "Parent report", "Hindi"], [
      ["Classplus", "4–7", mk("?"), mk("?"), mk("?"), mk("?")], ["Fedena", "10–21", mk("no"), mk("?"), mk("yes"), mk("?")], ["Teachmint", "20–40 (est.)", mk("?"), mk("?"), mk("yes"), mk("yes")],
      [{ t: "Pragati", bold: true, color: T.white, fill: T.tealDark }, { t: "30", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }]],
      { rowH: 0.27, headH: 0.3, size: 9, headSize: 8.5, rowStyles: ["white", "white", "white", "white"], headFill: T.tealDark });
    text(s, "yes: shown in listing · no: not shown · ?: not verifiable", { x: cx0, y: 6.52, w: 6.1, h: 0.2, fontSize: 8, italic: true, color: T.muted });
    text(s, [{ text: "Moat: ", options: { bold: true, color: T.tealDark } }, { text: "more institutes sharpen question difficulty for all. Weak below about 200 institutes, so early wins come from time saved." }], { x: cx0, y: 6.7, w: 6.1, h: 0.38, fontSize: 9, color: T.ink });
    foot(s, "Sources: vendor listings (financial/research R1; ? means not verifiable, not absent); financial model v1.1 (field vs channel economics); roadmap dates are our plan. Year 3, Base: 58 institutes, ₹65 L revenue.");
    s.addNotes("Year 3 Base: 58 paying institutes, revenue 65.3 lakh, EBITDA 11.9 lakh, break-even month 16, funding need 45 lakh. Channel partners give LTV/CAC 3.4x for small institutes against 1.5x by field sales.");
  }

  // ================================================================ 13 VALIDATION AND THE ASK
  pres.addSection({ title: "The Ask" });
  {
    const s = content("The Ask", "What we have proved, what we have not, and the one pilot that settles it", "Feasibility; honest limits", ["VALIDATION SCORECARD AND THE ASK", 6]);
    hdrBar(s, L, 1.3, 4.3, "VALIDATION SCORECARD", { h: 0.32, size: 11.5 });
    const sc = [["ok", "0.76 accuracy on public student data"], ["ok", "0.009 calibration error, public data"], ["ok", "Privacy costs only 0.008 accuracy"], ["ok", "116 tests pass; tenants stay apart"], ["wait", "Difficulty and wrong-key gates"], ["no", "Accuracy at a real institute"]];
    for (let i = 0; i < sc.length; i++) {
      const y = 1.68 + i * 0.6, k = sc[i][0];
      s.addShape("rect", { x: L, y, w: 4.3, h: 0.54, fill: { color: k === "ok" ? T.tealTint : k === "wait" ? "F1E8D3" : "F6E0DD" }, line: { type: "none" } });
      await icon(s, k === "ok" ? "FaCircleCheck" : k === "wait" ? "FaHourglassHalf" : "FaCircleXmark", L + 0.12, y + 0.12, 0.3, k === "ok" ? "1B8F55" : k === "wait" ? "8A6500" : T.red);
      text(s, sc[i][1], { x: L + 0.55, y, w: 3.7, h: 0.54, fontSize: 11, bold: true, color: T.navy, valign: "middle" });
    }
    // risk matrix
    const mx = 5.2, my = 1.7, mw = 3.7, mh = 3.45;
    sec(s, "", "RISK MATRIX", mx - 0.2, 1.3, 4);
    const quad = [[0, 0, "F4F7FB"], [1, 0, "FBEFD8"], [0, 1, "FBEFD8"], [1, 1, "F6E0DD"]];
    quad.forEach(([qx, qy, c]) => rect(s, mx + qx * mw / 2, my + (1 - qy) * mh / 2, mw / 2 - 0.03, mh / 2 - 0.03, c));
    text(s, "LIKELIHOOD →", { x: mx, y: my + mh + 0.02, w: mw, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, align: "center" });
    s.addText("IMPACT →", { x: mx - 0.75, y: my + mh / 2 - 0.15, w: 0.9, h: 0.3, fontSize: 8.5, bold: true, color: T.muted, align: "center", rotate: 270, margin: 0 });
    const rk = [[1, 0.5, 0.84], [2, 0.64, 0.7], [3, 0.82, 0.46], [4, 0.24, 0.3]];
    rk.forEach(([n, lx, iy]) => {
      s.addShape("ellipse", { x: mx + lx * mw - 0.2, y: my + (1 - iy) * mh - 0.2, w: 0.4, h: 0.4, fill: { color: n === 4 ? T.teal : T.tealDark }, line: { color: T.white, width: 2 } });
      text(s, String(n), { x: mx + lx * mw - 0.2, y: my + (1 - iy) * mh - 0.2, w: 0.4, h: 0.4, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
    });
    const rl = [["Real accuracy is lower", "Retro-pilot before any sale"], ["Owners won't pay ₹30", "Price survey; lead with time saved"], ["Mentors ignore the list", "Cap the list; log every outcome"], ["Hindi quality falls short", "Native review; template fallback"]];
    rl.forEach((r, i) => {
      const y = 1.3 + i * 0.96, x = 9.3;
      s.addShape("ellipse", { x, y: y + 0.18, w: 0.4, h: 0.4, fill: { color: i === 3 ? T.teal : T.tealDark }, line: { type: "none" } });
      text(s, String(i + 1), { x, y: y + 0.18, w: 0.4, h: 0.4, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: r[0], options: { bold: true, fontSize: 11.5, color: T.navy, breakLine: true } }, { text: "Fix: " + r[1], options: { fontSize: 9.5, color: T.muted } }], { x: x + 0.5, y: y + 0.05, w: 3.1, h: 0.75, valign: "middle" });
    });
    // ask
    rect(s, L, 5.65, CWD, 1.3, T.tealDark);
    text(s, "THE ASK", { x: L + 0.25, y: 5.72, w: 3, h: 0.3, fontSize: 12, bold: true, color: "F1D9A0", charSpacing: 2 });
    text(s, "Two free retro-pilots in Patna this winter.", { x: L + 0.25, y: 6.0, w: 7.2, h: 0.5, fontSize: 24, bold: true, color: T.white, valign: "middle" });
    text(s, "Give us last year's Excel. If we don't flag more of the students who left than your attendance rule, at the same workload, we stop.", { x: L + 0.25, y: 6.5, w: 7.2, h: 0.42, fontSize: 10.5, color: "C9DBF0" });
    [["₹45 L", "funding, Base plan"], ["Month 16", "break-even"], ["₹65 L", "year-3 revenue"]].forEach((k, i) => {
      const x = 8.05 + i * 1.62;
      rect(s, x, 5.85, 1.5, 1.0, "1A3F6F");
      text(s, k[0], { x, y: 5.9, w: 1.5, h: 0.55, fontSize: 18, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, k[1], { x, y: 6.45, w: 1.5, h: 0.35, fontSize: 9, color: "C9DBF0", align: "center" });
    });
    foot(s, "Sources: ml/public_validation; technical/docs/FEASIBILITY_CHECK.md; financial model v1.1 (3-year projection, Base: ₹45 L funding, break-even month 16, year-3 revenue ₹65.3 L, EBITDA ₹11.9 L).");
    s.addNotes("The ask is concrete and falsifiable. Funding of 45 lakh and break-even in month 16 are Base outputs of the v1.1 projection; Bear needs 1 crore and does not break even within 36 months.");
  }

