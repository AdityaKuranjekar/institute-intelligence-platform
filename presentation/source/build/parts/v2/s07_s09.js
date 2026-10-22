  // ================================================================ 7 LEARNING ANALYTICS
  {
    const s = content("Technology", "Pragati knows each student's weak topics, and tells the teacher how sure it is", "Data science, ML and AI rigour", ["KNOW EVERY STUDENT'S WEAK TOPICS", 3]);
    M.heatmap(kit, s, L, 1.3, 6.55, 3.55, { n: 9, m: 8, callout: true, seed: 11, fs: 9.5 });
    callout(s, 1, L + 3.55, 1.22, 0.3);
    text(s, "Pale column = topic probably not taught yet", { x: L + 3.9, y: 1.22, w: 2.6, h: 0.3, fontSize: 9, bold: true, color: T.tealDark, valign: "middle" });
    sec(s, "", "HOW IT WORKS, IN PLAIN ENGLISH", 7.3, 1.3, 5.55);
    const st = [["Rates how hard every question is", "2-parameter IRT, guessing prior"], ["Estimates mastery per topic, with doubt", "Per-topic ability, shrunk to the batch"], ["Says “not enough data” when unsure", "Uncertainty gate on every band"], ["Flags a likely wrong answer key", "Negative-discrimination detector"]];
    st.forEach((r, i) => {
      const y = 1.72 + i * 0.8;
      s.addShape("rect", { x: 7.3, y, w: 5.58, h: 0.72, fill: { color: i % 2 ? T.white : T.tint }, line: { color: T.line, width: 1 } });
      rect(s, 7.3, y, 0.6, 0.72, T.tealDark);
      text(s, String(i + 1), { x: 7.3, y, w: 0.6, h: 0.72, fontSize: 20, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: r[0], options: { bold: true, fontSize: 12.5, color: T.navy, breakLine: true } }, { text: r[1], options: { fontSize: 9.5, italic: true, color: T.muted } }], { x: 8.05, y, w: 4.75, h: 0.72, valign: "middle" });
    });
    s.addShape("rect", { x: 7.3, y: 4.98, w: 5.58, h: 0.36, fill: { color: T.tealTint }, line: { type: "none" } });
    text(s, "Works with small batches: question difficulty pooled across institutes", { x: 7.4, y: 4.98, w: 5.4, h: 0.36, fontSize: 10, bold: true, color: T.tealDark, valign: "middle" });
    pic(s, "chart_assist_bars.png", L, 5.0, 3.0, 1.86, "Next-answer accuracy: ours vs published");
    tag(s, "public", L + 3.15, 5.02);
    text(s, [{ text: "0.76 vs 0.75", options: { bold: true, fontSize: 22, color: T.tealDark, breakLine: true } }, { text: "Accuracy on 770 unseen students, public data. Published rival AKT scores higher (0.785); we say so.", options: { fontSize: 9.5, color: T.ink } }], { x: L + 3.15, y: 5.32, w: 3.4, h: 1.55, valign: "top" });
    text(s, "SYNTHETIC-DATA GATES", { x: 7.3, y: 5.5, w: 5.5, h: 0.24, fontSize: 9.5, bold: true, color: T.muted, charSpacing: 1 });
    ["Question difficulty recovered", "Wrong keys caught, few false alarms", "Mastery beats raw % correct"].forEach((t, i) => {
      text(s, t, { x: 7.3, y: 5.78 + i * 0.37, w: 3.9, h: 0.33, fontSize: 10.5, color: T.ink, valign: "middle" });
      tag(s, "pending", 11.55, 5.83 + i * 0.37, { size: 8, h: 0.22 });
    });
    foot(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT protocol, 770 held-out students; published DKT 0.754, SAKT 0.725, AKT 0.785); heat map is an illustrative mock-up. Gates pending Agent B.");
    s.addNotes("Plain-English headline with technical names as secondary labels. The three pending gates (difficulty recovery, wrong-key detection, mastery vs raw percent correct) come from Agent B and must be filled before submission.");
  }

  // ================================================================ 8 EARLY WARNING
  {
    const s = content("Technology", "Each week a mentor gets a short list: who to call, why, and what to offer", "Data science, ML and AI rigour; privacy", ["EARLY WARNING: THE INTERVENTION JOURNEY", 3]);
    const J = [["FaArrowTrendDown", "Engagement drops", "Six absences in ten classes"], ["FaFlag", "Model flags", "Appears on the weekly list"], ["FaPhone", "Mentor calls", "A supportive call, not a warning"], ["FaUserCheck", "Student retained", "Outcome logged; list updates"]];
    kit.line(s, 1.6, 1.7, 11.7, 1.7, { color: T.line, w: 3 });
    for (let i = 0; i < 4; i++) {
      const x = 1.6 + i * 3.37;
      s.addShape("ellipse", { x: x - 0.4, y: 1.3, w: 0.8, h: 0.8, fill: { color: i === 3 ? "1B8F55" : i === 0 ? T.red : T.tealDark }, line: { color: T.white, width: 3 } });
      await icon(s, J[i][0], x - 0.2, 1.5, 0.4, T.white);
      text(s, [{ text: J[i][1], options: { bold: true, fontSize: 12.5, color: T.navy, breakLine: true } }, { text: J[i][2], options: { fontSize: 9.5, color: T.muted } }], { x: x - 1.3, y: 2.15, w: 2.6, h: 0.55, align: "center", valign: "top" });
      if (i < 3) kit.line(s, x + 0.5, 1.7, x + 3.37 - 0.5, 1.7, { color: T.tealDark, w: 2, arrow: true });
    }
    pic(s, "screen_support_list.png", L, 2.85, 3.9, 2.19, "Weekly support list (illustrative)");
    text(s, "What the mentor sees (mock-up)", { x: L, y: 5.05, w: 3.9, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    pic(s, "chart_oulad_by_day.png", L, 5.3, 2.2, 1.53, "Withdrawal prediction accuracy over time, public data");
    tag(s, "public", L + 2.3, 5.3);
    text(s, [{ text: "0.46", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "of the top 10 % flagged really leave; simple rules: 0.24–0.31", options: { fontSize: 9, color: T.ink } }], { x: L + 2.3, y: 5.58, w: 1.75, h: 0.65, valign: "top" });
    text(s, [{ text: "0.009", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "calibration error: “30 %” means 30 %", options: { fontSize: 9, color: T.ink } }], { x: L + 2.3, y: 6.25, w: 1.75, h: 0.65, valign: "top" });
    // compliance matrix
    const mx = 4.65, mw = 8.23;
    hdrBar(s, mx, 2.85, mw, "COMPLIANCE MATRIX: WHAT THE LAW LETS US USE", { h: 0.32, size: 11 });
    const cols = ["Academic support", "Dropout risk", "Fee risk", "App activity"];
    const lw = 1.95, cwid = (mw - lw) / 4;
    cols.forEach((c, i) => text(s, c, { x: mx + lw + i * cwid, y: 3.2, w: cwid, h: 0.34, fontSize: 10.5, bold: true, color: T.tealDark, align: "center", valign: "middle" }));
    const M2 = { m: ["FaCircleCheck", "Model allowed", T.tealTint, T.tealDark], r: ["FaLock", "Plain rules only", "F1E8D3", "8A6500"], n: ["FaBan", "Never used", "F6E0DD", T.red], o: ["FaLockOpen", "Own opt-in", T.tealTint, T.tealDark] };
    const grid = [["Under 18", "parent consent", ["m", "r", "r", "n"]], ["18 and over", "own consent", ["m", "m", "m", "o"]], ["Under 18, if counsel agrees", "pending legal opinion", ["m", "m", "r", "n"]]];
    for (let r = 0; r < 3; r++) {
      const y = 3.58 + r * 0.98;
      rect(s, mx, y, lw - 0.05, 0.92, T.tint);
      text(s, [{ text: grid[r][0], options: { bold: true, fontSize: 11.5, color: T.navy, breakLine: true } }, { text: grid[r][1], options: { fontSize: 9, color: T.muted } }], { x: mx + 0.1, y, w: lw - 0.2, h: 0.92, valign: "middle" });
      for (let c = 0; c < 4; c++) {
        const m = M2[grid[r][2][c]], x = mx + lw + c * cwid;
        rect(s, x + 0.03, y, cwid - 0.06, 0.92, m[2]);
        await icon(s, m[0], x + cwid / 2 - 0.17, y + 0.12, 0.34, m[3]);
        text(s, m[1], { x: x + 0.03, y: y + 0.52, w: cwid - 0.06, h: 0.34, fontSize: 9.5, bold: true, color: m[3], align: "center", valign: "middle" });
      }
    }
    s.addShape("rect", { x: mx, y: 6.55, w: mw, h: 0.38, fill: { color: T.tealDark }, line: { type: "none" } });
    text(s, "DPDP s.9(3): no tracking of children, even with consent. Under-18 dropout and fee lists use plain rules.", { x: mx + 0.1, y: 6.55, w: mw - 0.2, h: 0.38, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
    foot(s, "Sources: ml/public_validation (OULAD day 28, student-grouped 5-fold; precision at top 10 %); contracts/routing_policy.yaml; DPDP Act 2023 s.9. On synthetic institutes, early-warning lift is pending.");
    s.addNotes("Journey on top, public-data evidence bottom-left (shrunk), compliance matrix on the right. Locks denote data walls. About a quarter of dropouts are sudden and cannot be predicted from academic data; say so if asked.");
  }

  // ================================================================ 9 HONEST RANGES AND CHECKED REPORTS
  {
    const s = content("Technology", "An honest range instead of a single rank, and parent messages where every number is checked", "Data science, ML and AI rigour; GenAI guardrails", ["HONEST RANGES AND SAFE PARENT REPORTS", 3]);
    s.addShape("rect", { x: L, y: 1.3, w: 5.6, h: 3.16, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "screen_student_profile.png", L + 0.02, 1.32, 5.56, 3.12, "Student profile with percentile range (illustrative)");
    callout(s, 1, 3.3, 2.75, 0.3);
    s.addShape("rect", { x: 6.45, y: 1.3, w: 5.5, h: 3.3, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "screen_parent_report.png", 6.47, 1.32, 5.46, 3.28, "Parent report in Hindi and English (illustrative)");
    callout(s, 2, 7.9, 3.75, 0.3);
    text(s, [{ text: "1 ", options: { bold: true, color: T.tealDark } }, { text: "The range narrows as tests add up. Never a single rank." }], { x: L, y: 4.5, w: 5.6, h: 0.3, fontSize: 10.5, color: T.ink, valign: "middle" });
    text(s, [{ text: "2 ", options: { bold: true, color: T.tealDark } }, { text: "Hindi and English; every number checked before sending." }], { x: 6.45, y: 4.64, w: 5.5, h: 0.3, fontSize: 10.5, color: T.ink, valign: "middle" });
    // side column: range facts
    rect(s, 12.1, 1.3, 0.78, 3.3, T.tealDark);
    text(s, "80 %", { x: 12.1, y: 1.45, w: 0.78, h: 0.5, fontSize: 20, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, "of students land inside their range", { x: 12.12, y: 1.95, w: 0.74, h: 1.3, fontSize: 9, color: "C9DBF0", align: "center" });
    text(s, "editable exam table", { x: 12.12, y: 3.3, w: 0.74, h: 1.2, fontSize: 9, color: "C9DBF0", align: "center" });
    sec(s, "", "EIGHT AUTOMATIC SAFETY CHECKS BEFORE ANY MESSAGE", L, 5.0, 8);
    const ck = ["Numbers match the data", "Topics are real", "Names added last", "No banned words", "Right length", "Trend is correct", "Tips are approved", "Format is valid"];
    ck.forEach((c, i) => {
      const x = L + (i % 4) * 1.95, y = 5.38 + Math.floor(i / 4) * 0.5;
      rect(s, x, y, 0.36, 0.42, T.tealDark);
      text(s, String(i + 1), { x, y, w: 0.36, h: 0.42, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x: x + 0.36, y, w: 1.52, h: 0.42, fill: { color: T.tealTint }, line: { type: "none" } });
      text(s, c, { x: x + 0.42, y, w: 1.44, h: 0.42, fontSize: 9, color: T.navy, valign: "middle" });
    });
    chevrow(s, 8.5, 5.38, 4.38, 0.42, [{ t: "AI drafts" }, { t: "8 checks" }, { t: "Send" }], { size: 10.5, depth: 0.16 });
    s.addShape("rect", { x: 8.5, y: 5.9, w: 4.38, h: 0.5, fill: { color: "F1E8D3" }, line: { color: T.amber, width: 1.25, dashType: "dash" } });
    await icon(s, "FaShieldHalved", 8.6, 6.0, 0.3, "8A6500");
    text(s, "Any check fails: a safe human-written template goes out instead", { x: 9.0, y: 5.9, w: 3.85, h: 0.5, fontSize: 10, bold: true, color: "6B4E00", valign: "middle" });
    s.addShape("rect", { x: L, y: 6.5, w: CWD, h: 0.44, fill: { color: T.tint }, line: { type: "none" } });
    text(s, [{ text: "Next on the same rails (designed): ", options: { bold: true, color: T.tealDark } }, { text: "7-day study plans and doubt answers from retrieved notes. Works with no AI model at all." }], { x: L + 0.15, y: 6.5, w: CWD - 0.3, h: 0.44, fontSize: 10.5, color: T.ink, valign: "middle" });
    foot(s, "Sources: backend/app/genai (20 templates, 16 tests); contracts/report_numbers.schema.json. Band = quantile model, conformal 80 % target; coverage pending. Mock-ups illustrative.");
    s.addNotes("Mock-ups: student profile with the narrowing percentile range, and the Hindi/English parent report. Do not quote a verifier catch rate until the independent adversarial test passes after the E2 fixes.");
  }

