  // ================================================================ 7 EARLY WARNING
  {
    const s = content("Technology", "Each week a mentor gets a short list: who to call, why, and what to offer. Under-18s get plain rules where the law asks", "Data science, ML and AI rigour; privacy", ["EARLY WARNING: THE INTERVENTION JOURNEY", 3]);
    kit.panels("mix");
    const J = [["FaArrowTrendDown", "Engagement drops", "six absences in ten classes", T.red], ["FaFlag", "Model flags", "appears on the weekly list", T.tealDark], ["FaPhone", "Mentor calls", "supportive, not a warning", T.tealDark], ["FaUserCheck", "Student retained", "outcome logged, list updates", "1B8F55"]];
    kit.line(s, 0.9, 1.5, 12.4, 1.5, { color: T.line, w: 3 });
    for (let i = 0; i < 4; i++) {
      const x = L + i * 3.12;
      s.addShape("ellipse", { x, y: 1.22, w: 0.6, h: 0.6, fill: { color: J[i][3] }, line: { color: T.white, width: 3 } });
      await icon(s, J[i][0], x + 0.14, 1.36, 0.32, T.white);
      s.addShape("rect", { x: x + 0.66, y: 1.2, w: 2.3, h: 0.64, fill: { color: T.white }, line: { type: "none" } });
      text(s, [{ text: J[i][1], options: { bold: true, fontSize: 11, color: T.navy, breakLine: true } }, { text: J[i][2], options: { fontSize: 8.5, color: T.muted } }], { x: x + 0.7, y: 1.2, w: 2.25, h: 0.64, valign: "middle" });
    }
    frame(s, L, 2.0, 3.9, 4.95, "WHAT THE MENTOR SEES");
    pic(s, "screen_support_list.png", L + 0.05, 2.4, 3.8, 2.14, "Weekly support list (illustrative)");
    callout(s, 1, L + 2.7, 3.0, 0.26); callout(s, 2, L + 1.5, 3.3, 0.26);
    tag(s, "mock", L + 0.05, 4.58, { size: 7.5, h: 0.2 });
    text(s, "HOW A FLAG IS MADE", { x: L + 0.05, y: 4.86, w: 3.8, h: 0.22, fontSize: 9, bold: true, color: T.tealDark, charSpacing: 0.8 });
    const fl = [["FaClock", "Uses only data up to that date"], ["FaScaleBalanced", "Routes by age and purpose"], ["FaChartLine", "Scores, or applies a plain rule"], ["FaClipboardCheck", "Gives reasons and a supportive action"], ["FaHandshake", "A person decides; outcome is logged"]];
    for (let i = 0; i < 5; i++) { await abadge(s, fl[i][0], L + 0.08, 5.13 + i * 0.35, 0.28, i); text(s, fl[i][1], { x: L + 0.45, y: 5.12 + i * 0.35, w: 3.4, h: 0.3, fontSize: 9, valign: "middle" }); }
    frame(s, 4.55, 2.0, 4.0, 4.95, "REAL-DATA CHECK ON OULAD (WITHDRAWAL)");
    pic(s, "chart_oulad_by_day.png", 4.62, 2.4, 3.86, 2.68, "Withdrawal prediction accuracy by observation window");
    tag(s, "public", 4.65, 5.1);
    dtable(s, 4.62, 5.38, [2.0, 0.9, 0.96], ["Day 28, 5-fold by student", "AUC", "P@10 %"], [["LightGBM, academic + clicks", "0.706", "0.46"], ["LightGBM, academic only", "0.698", "0.46"], ["Logistic, academic only", "0.680", "0.40"], ["Rule: no assessment", "0.521", "0.31"], ["Rule: zero clicks, 7 days", "0.532", "0.24"]],
      { rowH: 0.24, headH: 0.24, size: 8.5, rowStyles: ["green", "band", "white", "gold", "gold"] });
    frame(s, 8.7, 2.0, 4.18, 4.95, "COMPLIANCE MATRIX: WHAT THE LAW LETS US USE");
    const cols = ["Academic support", "Dropout risk", "Fee risk", "App activity"];
    const lw = 1.3, cwid = (4.18 - lw - 0.1) / 4;
    cols.forEach((c, i) => text(s, c, { x: 8.75 + lw + i * cwid, y: 2.4, w: cwid, h: 0.4, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", valign: "middle" }));
    const M2 = { m: ["FaCircleCheck", "Model", T.tealTint, T.tealDark], r: ["FaLock", "Plain rules", "F1E8D3", "8A6500"], n: ["FaBan", "Never", "F6E0DD", T.red], o: ["FaLockOpen", "Opt-in", T.tealTint, T.tealDark] };
    const grid = [["Under 18", "parent consent", ["m", "r", "r", "n"]], ["18 and over", "own consent", ["m", "m", "m", "o"]], ["Under 18, if counsel agrees", "legal opinion pending", ["m", "m", "r", "n"]]];
    for (let r = 0; r < 3; r++) {
      const y = 2.85 + r * 0.9;
      rect(s, 8.75, y, lw - 0.05, 0.84, T.tint);
      text(s, [{ text: grid[r][0], options: { bold: true, fontSize: 9.5, color: T.navy, breakLine: true } }, { text: grid[r][1], options: { fontSize: 8, color: T.muted } }], { x: 8.8, y, w: lw - 0.12, h: 0.84, valign: "middle" });
      for (let c = 0; c < 4; c++) {
        const m = M2[grid[r][2][c]], x = 8.75 + lw + c * cwid;
        rect(s, x + 0.02, y, cwid - 0.04, 0.84, m[2]);
        await icon(s, m[0], x + cwid / 2 - 0.14, y + 0.1, 0.28, m[3]);
        text(s, m[1], { x: x + 0.02, y: y + 0.5, w: cwid - 0.04, h: 0.3, fontSize: 8, bold: true, color: m[3], align: "center", valign: "middle" });
      }
    }
    rect(s, 8.75, 5.58, 4.08, 0.34, T.tealDark);
    text(s, "DPDP s.9(3): no tracking of children, even with consent", { x: 8.8, y: 5.58, w: 3.98, h: 0.34, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
    pic(s, "chart_calibration.png", 8.8, 6.0, 0.9, 0.85, "Calibration curve");
    text(s, [{ text: "0.009 ", options: { bold: true, color: T.tealDark, fontSize: 12 } }, { text: "calibration error: “30 % risk” means 30 %. About a quarter of dropouts are sudden and cannot be predicted from academic data.", options: { fontSize: 8.5 } }], { x: 9.75, y: 5.98, w: 3.1, h: 0.9, valign: "middle" });
    foot(s, "Sources: ml/public_validation (OULAD, CC BY 4.0; day 28, student-grouped 5-fold; P@10 = precision at top 10 %); contracts/routing_policy.yaml; DPDP Act 2023 s.9. Early-warning lift on synthetic institutes is pending.");
    s.addNotes("Journey on top; evidence in the middle; compliance matrix on the right (locks are data walls). Our OULAD AUC is lower than the published 0.794 because the split is strictly by student; say so if asked.");
  }

  // ================================================================ 8 PERCENTILE RANGE AND PARENT REPORTS
  {
    const s = content("Technology", "An honest range instead of a single rank, and parent messages where every number is checked before sending", "Data science, ML and AI rigour; GenAI guardrails", ["HONEST RANGES AND SAFE PARENT REPORTS", 3]);
    kit.panels("mix");
    frame(s, L, 1.22, 3.9, 3.5, "PERCENTILE RANGE, NOT A RANK");
    M.bandChart(kit, s, L + 0.08, 1.62, 3.74, 2.3);
    callout(s, 1, L + 3.4, 1.7, 0.26);
    lines(s, ["A quantile model plus a conformal band, 80 % target", "Mapped to the exam scale by an editable table", "Shown with a disclaimer, never a promise"], L + 0.05, 4.02, 3.8, 0.7, { size: 8.5, gap: 1 });
    frame(s, 4.55, 1.22, 5.0, 3.5, "PARENT REPORT: HINDI AND ENGLISH");
    pic(s, "screen_parent_report.png", 4.62, 1.62, 4.86, 2.92, "Parent report in Hindi and English (illustrative)");
    callout(s, 2, 4.75, 3.95, 0.26);
    note(s, 7.9, 4.35, 1.5, 0.3, "no AI needed to send", 2);
    frame(s, 9.7, 1.22, 3.18, 3.5, "THE CHECKING PIPELINE");
    const pl = [["FaDatabase", "Facts from data", "Attendance, tests, topics, trend."], ["FaRobot", "Optional local AI", "Only rewords; never adds a number."], ["FaListCheck", "Eight checks", "Numbers, topics, names, words, length, trend, tips, format."], ["FaFilePdf", "Template fallback", "Safe human-written text if any check fails."]];
    for (let i = 0; i < 4; i++) {
      const y = 1.64 + i * 0.77;
      await abadge(s, pl[i][0], 9.78, y, 0.36, i);
      text(s, [{ text: pl[i][1], options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: pl[i][2], options: { fontSize: 8.5, color: T.ink } }], { x: 10.22, y: y - 0.04, w: 2.62, h: 0.74, valign: "middle" });
    }
    frame(s, L, 4.85, 7.35, 2.1, "EIGHT AUTOMATIC SAFETY CHECKS BEFORE ANY MESSAGE");
    const ck = ["Numbers match the data", "Topics are real", "Names added last", "No banned words", "Right length", "Trend is correct", "Tips are approved", "Format is valid"];
    ck.forEach((c, i) => {
      const x = L + 0.05 + (i % 4) * 1.82, y = 5.3 + Math.floor(i / 4) * 0.62;
      rect(s, x, y, 0.34, 0.54, T.tealDark);
      text(s, String(i + 1), { x, y, w: 0.34, h: 0.54, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x: x + 0.34, y, w: 1.4, h: 0.54, fill: { color: T.tealTint }, line: { type: "none" } });
      text(s, c, { x: x + 0.4, y, w: 1.32, h: 0.54, fontSize: 9, color: T.navy, valign: "middle" });
    });
    frame(s, 8.0, 4.85, 4.88, 2.1, "IF A CHECK FAILS");
    chevrow(s, 8.1, 5.3, 4.68, 0.4, [{ t: "AI drafts" }, { t: "8 checks" }, { t: "Send" }], { size: 10, depth: 0.15 });
    s.addShape("rect", { x: 8.1, y: 5.82, w: 4.68, h: 0.44, fill: { color: "F1E8D3" }, line: { color: T.amber, width: 1.25, dashType: "dash" } });
    await icon(s, "FaShieldHalved", 8.2, 5.9, 0.28, "8A6500");
    text(s, "Any failure: a safe human-written template goes out instead", { x: 8.58, y: 5.82, w: 4.15, h: 0.44, fontSize: 9, bold: true, color: "6B4E00", valign: "middle" });
    text(s, [{ text: "Next on the same rails: ", options: { bold: true, color: T.tealDark } }, { text: "7-day study plans and doubt answers from retrieved notes (designed)." }], { x: 8.1, y: 6.33, w: 3.0, h: 0.55, fontSize: 8.5, color: T.ink });
    tag(s, "built", 11.3, 6.4, { size: 8, h: 0.2 });
    text(s, "16 tests", { x: 11.95, y: 6.38, w: 0.9, h: 0.24, fontSize: 8.5, color: T.muted, valign: "middle" });
    foot(s, "Sources: backend/app/genai (20 templates, 16 tests); contracts/report_numbers.schema.json. An independent attack on the checker found gaps; fixes in progress, so no catch rate is claimed. Mock-ups illustrative.");
    s.addNotes("Range mock-up is schematic until coverage results arrive. The report image uses real template output. Do not quote a verifier catch rate until the independent adversarial test passes after the E2 fixes.");
  }

  // ================================================================ 9 PRIVACY
  pres.addSection({ title: "Trust" });
  {
    const s = content("Trust", "Built for the law and for children: consent first, supportive actions only, no rankings, raw data stays at the institute", "Feasibility, privacy and safety", ["PRIVACY, SAFETY AND DPDP COMPLIANCE", 4]);
    kit.panels("mix");
    frame(s, L, 1.22, 3.5, 3.6, "VERIFIABLE PARENTAL CONSENT");
    pic(s, "screen_consent.png", L + 0.25, 1.62, 3.0, 3.0, "Consent notice with purpose switches (illustrative)");
    callout(s, 1, L + 0.1, 2.05, 0.26); callout(s, 2, L + 0.1, 3.2, 0.26); callout(s, 3, L + 0.1, 4.15, 0.26);
    text(s, "1 ID checked at the desk (Rule 10)   2 One switch per purpose   3 Withdraw in one tap", { x: L + 0.05, y: 4.5, w: 3.4, h: 0.3, fontSize: 7.5, italic: true, color: T.muted });
    const bx = 4.1, bw = 4.55;
    frame(s, bx, 1.22, bw, 3.6, "DATA LOCKBOX: RAW DATA NEVER LEAVES");
    s.addShape("roundRect", { x: bx + 0.12, y: 1.65, w: bw - 0.24, h: 2.5, rectRadius: 0.1, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 2, dashType: "dash" } });
    s.addShape("ellipse", { x: bx + bw / 2 - 0.3, y: 1.55, w: 0.6, h: 0.6, fill: { color: T.tealDark }, line: { color: T.white, width: 2 } });
    await icon(s, "FaLock", bx + bw / 2 - 0.13, 1.68, 0.26, T.white);
    text(s, "THE INSTITUTE'S OWN SPACE: ONE LAPTOP OR PRIVATE SERVER", { x: bx + 0.15, y: 2.2, w: bw - 0.3, h: 0.24, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", charSpacing: 0.5 });
    const lb = [["FaUserGraduate", "Student records"], ["FaFileCircleCheck", "Marks and answers"], ["FaSignature", "Consent ledger"], ["FaListCheck", "Risk lists: mentors only"]];
    for (let i = 0; i < 4; i++) {
      const x = bx + 0.25 + (i % 2) * 2.05, y = 2.5 + Math.floor(i / 2) * 0.78;
      s.addShape("rect", { x, y, w: 1.95, h: 0.7, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      await icon(s, lb[i][0], x + 0.08, y + 0.18, 0.3, T.tealDark);
      text(s, lb[i][1], { x: x + 0.45, y, w: 1.46, h: 0.7, fontSize: 9, bold: true, color: T.navy, valign: "middle" });
    }
    kit.line(s, bx + bw / 2, 4.15, bx + bw / 2, 4.38, { color: T.tealDark, w: 2.5, arrow: true });
    text(s, "Out: question difficulty numbers only, to the shared bank. Parents see progress, never ranks.", { x: bx + 0.1, y: 4.38, w: bw - 0.2, h: 0.4, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", valign: "middle" });
    frame(s, 8.8, 1.22, 4.08, 3.6, "THE COST OF PRIVACY, ON REAL DATA");
    pic(s, "chart_privacy_cost.png", 8.88, 1.62, 3.9, 2.96, "Academic-only vs academic plus click behaviour, OULAD");
    tag(s, "public", 8.9, 4.55, { size: 7.5, h: 0.2 });
    text(s, "Academic-only costs 0.008 AUC at day 28", { x: 10.4, y: 4.5, w: 2.45, h: 0.3, fontSize: 8.5, bold: true, color: T.tealDark, valign: "middle" });
    // guardrails
    frame(s, L, 4.95, 7.9, 2.0, "SAFETY GUARDRAILS");
    s.addShape("ellipse", { x: L + 0.08, y: 5.45, w: 1.3, h: 1.3, fill: { color: T.tealDark }, line: { color: T.tealTint, width: 5 } });
    await icon(s, "FaShieldHalved", L + 0.37, 5.74, 0.72, T.white);
    const gr = ["No leaderboards or public ranks", "No batch moves based on scores", "Banned-words check on every message", "Counsellor contact for each institute", "Risk lists: mentors and owner only", "Students never see a risk label"];
    gr.forEach((g, i) => {
      const x = L + 1.55 + (i % 2) * 3.2, y = 5.38 + Math.floor(i / 2) * 0.5;
      s.addShape("rect", { x, y, w: 3.1, h: 0.44, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, y, 0.07, 0.44, T.tealDark);
      text(s, g, { x: x + 0.14, y, w: 2.92, h: 0.44, fontSize: 9, bold: true, color: T.navy, valign: "middle" });
    });
    frame(s, 8.55, 4.95, 4.33, 2.0, "THE LAW, IN ONE LINE EACH");
    const lw_ = [["DPDP s.9(1), Rule 10", "verifiable parental consent before processing"], ["DPDP s.9(3)", "no tracking of children, even with consent"], ["MoE 2024 cl. 10.2(xi)", "results for counselling, never public"], ["Our role", "data processor; the institute is the fiduciary"]];
    lw_.forEach((l, i) => text(s, [{ text: l[0] + ": ", options: { bold: true, color: T.tealDark } }, { text: l[1] }], { x: 8.65, y: 5.38 + i * 0.37, w: 4.15, h: 0.35, fontSize: 9, color: T.ink, valign: "middle" }));
    note(s, 11.0, 0.72, 1.85, 0.36, "built in, not bolted on", 2);
    foot(s, "Sources: DPDP Act 2023 s.9, Rules 2025 (Rule 10); MoE Guidelines 2024; contracts/routing_policy.yaml; OULAD results (ml/public_validation); isolation tested on PostgreSQL 16. Not legal advice.");
    s.addNotes("Lockbox: raw data stays in the institute's own environment; only item difficulty statistics reach a shared bank. A lawyer's check on the in-person ID flow is still recommended.");
  }

