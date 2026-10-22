  // ================================================================ 5 ARCHITECTURE
  pres.addSection({ title: "Technology" });
  {
    const s = content("Technology", "Three layers, one rule: each institute's data stays its own. Four stages move paper to a parent message", "Architecture and engineering", ["SYSTEM ARCHITECTURE: THREE LAYERS, FOUR STAGES", 3]);
    const cx = 4.05;
    const layers = [["DELIVERY", "What people use", "FaDisplay", 5.8, T.tealDark, [["Web console", "Owner, teacher views"], ["Phone app", "Scan, list, parent view"], ["Hindi + English", "Reports, both languages"], ["Open export", "CSV and API"]]],
      ["INTELLIGENCE", "What it works out", "FaBrain", 6.5, T.teal, [["Topic mastery", "Weak topics (IRT)"], ["Early warning", "Who needs help (LightGBM)"], ["Honest ranges", "Percentile bands (conformal)"], ["Safe reports", "No invented numbers"]]],
      ["TRUST & DATA", "What keeps it safe", "FaShieldHalved", 7.2, T.navy, [["Row-level security", "Institutes never mix"], ["Consent gate", "No consent, no model"], ["Offline-first", "Works without internet"], ["Audit log", "Who saw what"]]]];
    for (let i = 0; i < 3; i++) {
      const [name, sub, ic, w, col, chips] = layers[i];
      const x = cx - w / 2, y = 1.25 + i * 1.3;
      rect(s, x + 0.05, y + 0.07, w, 1.2, "DDE3EC");
      s.addShape("rect", { x, y, w, h: 1.2, fill: { color: T.white }, line: { color: col, width: 1.5 } });
      rect(s, x, y, 1.45, 1.2, col);
      await icon(s, ic, x + 0.5, y + 0.14, 0.45, T.white);
      text(s, name, { x, y: y + 0.65, w: 1.45, h: 0.28, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, sub, { x, y: y + 0.9, w: 1.45, h: 0.24, fontSize: 8, color: "C9DBF0", align: "center", valign: "middle" });
      const cw = (w - 1.45 - 0.2) / 4;
      chips.forEach((c, k) => {
        const px = x + 1.52 + k * cw;
        s.addShape("rect", { x: px, y: y + 0.14, w: cw - 0.06, h: 0.92, fill: { color: T.tealTint }, line: { color: "B9CBE4", width: 0.75 } });
        text(s, [{ text: c[0], options: { bold: true, fontSize: 9.5, color: T.navy, breakLine: true } }, { text: c[1], options: { fontSize: 8, color: T.ink } }], { x: px + 0.04, y: y + 0.14, w: cw - 0.14, h: 0.92, valign: "middle", align: "center" });
      });
    }
    note(s, 6.4, 5.12, 1.4, 0.4, "one laptop, no cloud bill", 3);
    // evidence strip
    const ev = [["12 + 210", "messy files, synthetic OMR photos"], ["31 tables", "tenant isolation tested on PostgreSQL 16"], ["0.706 / 0.763", "public-data AUC: OULAD, ASSISTments"], ["20 + 8", "report templates and automatic checks"]];
    text(s, "EVIDENCE WE CAN SHOW", { x: L, y: 5.52, w: 3, h: 0.2, fontSize: 8, bold: true, color: T.muted, charSpacing: 1.5 });
    ev.forEach((e, i) => {
      const x = L + i * 1.83;
      s.addShape("rect", { x, y: 5.74, w: 1.76, h: 0.38, fill: { color: T.tealDark }, line: { type: "none" } });
      text(s, e[0], { x, y: 5.74, w: 1.76, h: 0.38, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, e[1], { x, y: 6.12, w: 1.76, h: 0.3, fontSize: 7.5, color: T.ink, align: "center", valign: "top" });
    });
    // right: stage-by-stage build status
    const tx = 7.85, tw = R - 7.85;
    hdrBar(s, tx, 1.25, tw, "FOUR STAGES: WHAT IS BUILT, IN BUILD, DESIGNED", { h: 0.3, size: 10 });
    const rows = [["1 CAPTURE", [["Excel and CSV mapper", "build"], ["OMR photo reader", "design"], ["Forms and WhatsApp import", "design"], ["Offline queue", "design"]]],
      ["2 STRUCTURE", [["Versioned answer keys", "build"], ["Question to topic tagging", "build"], ["Syllabus graph, 380 topics", "built"]]],
      ["3 INTELLIGENCE", [["Difficulty and wrong keys", "build"], ["Mastery with doubt", "build"], ["Early warning, routed by age", "build"], ["Percentile range", "build"]]],
      ["4 DELIVER", [["Verified parent report", "built"], ["Teacher and mentor views", "build"], ["Owner dashboard", "build"], ["Hindi and English", "built"]]]];
    let y = 1.6; const rh = 0.255;
    rows.forEach((g, gi) => {
      const col = [T.tealDark, T.teal, T.tealDark, T.teal][gi];
      rect(s, tx, y, 1.05, g[1].length * rh, col);
      text(s, g[0], { x: tx, y, w: 1.05, h: g[1].length * rh, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      g[1].forEach((r, k) => {
        s.addShape("rect", { x: tx + 1.05, y: y + k * rh, w: tw - 1.05, h: rh, fill: { color: k % 2 ? T.white : T.tint }, line: { color: "E3E8EE", width: 0.5 } });
        text(s, r[0], { x: tx + 1.12, y: y + k * rh, w: tw - 2.25, h: rh, fontSize: 9, color: T.ink, valign: "middle" });
        stat(s, r[1] === "built" ? "BUILT" : r[1] === "build" ? "IN BUILD" : "DESIGNED", tx + tw - 0.85, y + k * rh + 0.027, 0.8, r[1]);
      });
      y += g[1].length * rh + 0.04;
    });
    s.addShape("rect", { x: tx, y: 5.6, w: tw, h: 0.82, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    lines(s, ["Local-first: laptop, local database, small local models", "Reports always send: a template covers any AI failure", "Phone photo read on the phone; 2 KB of answers uploaded"], tx + 0.1, 5.64, tw - 0.2, 0.76, { size: 8.5, gap: 1 });
    const tk = [["31", "tables, all isolated"], ["23", "API endpoints"], ["380", "syllabus topics"], ["116", "automated tests"], ["₹3.6", "per student a month"]];
    const tkw = (CWD - 0.4) / 5;
    tk.forEach((k, i) => {
      const x = L + i * (tkw + 0.1);
      rect(s, x, 6.55, tkw, 0.42, T.tealDark);
      text(s, [{ text: k[0] + "  ", options: { bold: true, fontSize: 15, color: T.white } }, { text: k[1], options: { fontSize: 9, color: "C9DBF0" } }], { x, y: 6.55, w: tkw, h: 0.42, align: "center", valign: "middle" });
    });
    foot(s, "Sources: technical/contracts (31 tables, 23 endpoints, 380 topics); tenant isolation tested on PostgreSQL 16; test suites; financial model v1.1 (₹3.6 all-in, Base). Status: BUILT has working code and tests.");
    s.addNotes("Layers on the left, build status on the right. Keywords in brackets are the technical names: IRT, LightGBM, conformal prediction, row-level security.");
  }

  // ================================================================ 6 LEARNING ANALYTICS
  {
    const s = content("Technology", "Pragati knows each student's weak topics, topic by topic, and tells the teacher how sure it is", "Data science, ML and AI rigour", ["KNOW EVERY STUDENT'S WEAK TOPICS", 3]);
    kit.panels("mix");
    frame(s, L, 1.22, 5.7, 3.7, "WHAT THE TEACHER SEES: STUDENT x TOPIC MASTERY");
    M.heatmap(kit, s, L + 0.1, 1.62, 5.5, 3.2, { n: 9, m: 8, callout: true, seed: 11, fs: 9 });
    callout(s, 1, L + 3.55, 1.56, 0.28); callout(s, 2, L + 5.1, 4.45, 0.28);
    // annotations
    const an = [["1", "A column low for the whole batch: probably not taught yet, not weak students."], ["2", "Bands, not scores: building, steady, strong, or “not enough data”."], ["3", "A question the best students miss is flagged as a likely wrong key."]];
    an.forEach((a, i) => { callout(s, a[0], L, 5.05 + i * 0.36, 0.24); text(s, a[1], { x: L + 0.34, y: 5.0 + i * 0.36, w: 5.3, h: 0.34, fontSize: 9, valign: "middle" }); });
    // pooled question bank
    text(s, "WHY A 60-STUDENT BATCH IS ENOUGH", { x: L, y: 6.18, w: 4, h: 0.22, fontSize: 8.5, bold: true, color: T.tealDark, charSpacing: 0.8 });
    ["Institute A", "Institute B", "Institute C"].forEach((t, i) => pill(s, t, L + i * 1.0, 6.45, { fill: T.tealTint, color: T.navy, size: 8.5, h: 0.24, bold: false, w: 0.92 }));
    kit.line(s, L + 3.0, 6.57, L + 3.5, 6.57, { color: T.tealDark, w: 2, arrow: true });
    pill(s, "Shared item bank", L + 3.55, 6.45, { fill: T.tealDark, color: T.white, size: 8.5, h: 0.24, w: 1.2 });
    tag(s, "pending", L + 4.85, 6.46, { size: 7.5, h: 0.22 });
    frame(s, 6.3, 1.22, 3.55, 5.7, "HOW IT WORKS, IN PLAIN ENGLISH");
    const st = [["Rates how hard every question is", "2-parameter IRT, guessing prior", "Blank counts as wrong; dropped and multi-correct items follow NTA rules; fixing a key re-scores everything."], ["Estimates mastery per topic, with doubt", "Shrunk toward student and batch", "Recent tests count more; the estimate is pulled toward the student's overall level."],
      ["Says “not enough data” when unsure", "Uncertainty gate on every band", "A band appears only when the standard error is small."], ["Flags a likely wrong answer key", "Negative-discrimination detector", "Teachers get a suggested correction and a one-click re-score."]];
    st.forEach((r, i) => {
      const y = 1.66 + i * 1.3;
      s.addShape("rect", { x: 6.4, y, w: 3.35, h: 1.22, fill: { color: i % 2 ? T.white : T.tint }, line: { color: T.line, width: 0.75 } });
      rect(s, 6.4, y, 0.4, 1.22, T.tealDark);
      text(s, String(i + 1), { x: 6.4, y, w: 0.4, h: 1.22, fontSize: 16, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: r[0], options: { bold: true, fontSize: 10.5, color: T.navy, breakLine: true } }, { text: r[1], options: { italic: true, fontSize: 8, color: T.muted, breakLine: true } }, { text: r[2], options: { fontSize: 8.5, color: T.ink } }], { x: 6.88, y: y + 0.03, w: 2.82, h: 1.16, valign: "middle" });
    });
    frame(s, 9.95, 1.22, 2.93, 5.7, "EVIDENCE ON PUBLIC DATA");
    pic(s, "chart_assist_bars.png", 10.02, 1.62, 2.8, 1.74, "Next-answer AUC: ours vs published");
    tag(s, "public", 10.05, 3.4);
    text(s, [{ text: "0.76 vs 0.75", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "770 unseen students, 55,755 predictions. Our 95 % interval 0.756 to 0.779. The published AKT scores higher (0.785); we say so.", options: { fontSize: 8.5, color: T.ink } }], { x: 10.05, y: 3.7, w: 2.75, h: 1.25, valign: "top" });
    text(s, "SYNTHETIC-DATA GATES", { x: 10.05, y: 5.05, w: 2.7, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, charSpacing: 1 });
    ["Difficulty recovered", "Wrong keys caught", "Mastery beats raw %"].forEach((t, i) => {
      text(s, t, { x: 10.05, y: 5.33 + i * 0.4, w: 1.6, h: 0.34, fontSize: 9.5, color: T.ink, valign: "middle" });
      tag(s, "pending", 11.85, 5.4 + i * 0.4, { size: 7.5, h: 0.22 });
    });
    note(s, 10.2, 6.55, 2.4, 0.32, "gates come from Agent B", -2);
    foot(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT protocol; published DKT 0.754, SAKT 0.725, AKT 0.785); heat map is an illustrative mock-up. Gates pending Agent B.");
    s.addNotes("Plain-English headline with technical names as secondary labels. The three pending gates come from Agent B and must be filled before submission.");
  }

