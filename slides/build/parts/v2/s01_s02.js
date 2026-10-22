  // ================================================================ 1 TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    text(s, "CASE B  ·  NEXTUTE × FINANCE CLUB, IIT PATNA", { x: L, y: 0.55, w: 7, h: 0.3, fontSize: 11.5, bold: true, color: T.teal, charSpacing: 2 });
    s.addText("PRAGATI", { placeholder: "title" });
    text(s, "The Data Moat", { x: L, y: 2.35, w: 6, h: 0.55, fontSize: 30, bold: true, color: T.teal });
    rect(s, L, 3.0, 1.2, 0.05, T.tealDark);
    text(s, "Every student's weak topics, found before the exam.", { x: L, y: 3.2, w: 5.6, h: 0.9, fontSize: 19, color: T.ink });
    text(s, "Team AlphaQ  ·  Round 1", { x: L, y: 4.35, w: 5, h: 0.3, fontSize: 11.5, color: T.muted });
    // abstract connected nodes (left) turning into a structured grid (right)
    let seed = 7; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pts = []; for (let i = 0; i < 17; i++) pts.push([6.55 + rnd() * 2.7, 0.75 + rnd() * 3.5]);
    pts.forEach((p, i) => pts.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 1.15) kit.line(s, p[0], p[1], q[0], q[1], { color: "B9CBE4", w: 0.9 }); }));
    pts.forEach((p, i) => ellipse(s, p[0] - 0.07, p[1] - 0.07, 0.14, 0.14, i % 3 === 0 ? T.orange : T.tealDark));
    ["Excel", "OMR sheets", "WhatsApp"].forEach((t, i) => pill(s, t, 6.5 + i * 0.95, 4.3, { fill: T.tealTint, color: T.navy, size: 9, h: 0.24, bold: false }));
    kit.line(s, 9.45, 2.5, 10.0, 2.5, { color: T.tealDark, w: 3, arrow: true });
    const shades = ["E3ECF7", "C9DBF0", "7FA6D6", "2E6DB4", "1F4A82"];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) rect(s, 10.15 + c * 0.45, 0.9 + r * 0.6, 0.42, 0.56, shades[(r * 2 + c * 3 + (c > 3 ? 1 : 0)) % 5]);
    text(s, "One clear topic map", { x: 10.15, y: 4.3, w: 2.7, h: 0.26, fontSize: 9.5, bold: true, color: T.tealDark, align: "center" });
    // impact ribbon
    const rb = [["0.76", "Prediction accuracy score", "Public data; published rival 0.75"], ["2", "Public datasets, not just ours", "Open University and ASSISTments"], ["₹3.6", "Cost per student per month", "All-in, on one laptop"]];
    const rw = (CWD - 0.3) / 3;
    rb.forEach((r, i) => {
      const x = L + i * (rw + 0.15), y = 5.15;
      rect(s, x, y, 1.6, 1.5, T.tealDark);
      text(s, r[0], { x, y, w: 1.6, h: 1.5, fontSize: r[0].length > 3 ? 30 : 38, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x: x + 1.6, y, w: rw - 1.6, h: 1.5, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
      text(s, r[1], { x: x + 1.75, y: y + 0.28, w: rw - 1.85, h: 0.5, fontSize: 14, bold: true, color: T.navy, valign: "middle" });
      text(s, r[2], { x: x + 1.75, y: y + 0.82, w: rw - 1.85, h: 0.5, fontSize: 10.5, color: T.muted });
    });
    text(s, "IMPACT RIBBON", { x: L, y: 4.88, w: 3, h: 0.24, fontSize: 9, bold: true, color: T.muted, charSpacing: 2 });
    foot(s, "Sources: ml/public_validation (ASSISTments 2009 under the pyKT protocol; OULAD); financial model v1.1, Base case. Screens and graphics are illustrative.");
    s.addNotes("Title. 0.76 is the next-answer AUC on ASSISTments 2009 (published DKT 0.754). Two public datasets: ASSISTments 2009 and OULAD. 3.6 rupees is the all-in cost per student per month from the financial model (Base).");
  }

  // ================================================================ 2 EXECUTIVE SUMMARY
  pres.addSection({ title: "Summary" });
  {
    const s = content("Summary", "Tests become a weekly to-do list for mentors, at a price owners accept", "All criteria", ["EXECUTIVE SUMMARY: THE PRAGATI LOOP", 0]);
    // sidebar
    hdrBar(s, L, 1.3, 3.5, "THE FRICTION & THE FIX", { h: 0.32, size: 11.5 });
    s.addShape("rect", { x: L, y: 1.62, w: 3.5, h: 2.35, fill: { color: "F6EAE8" }, line: { color: "D9A9A2", width: 1 } });
    await icon(s, "FaTriangleExclamation", L + 0.15, 1.75, 0.3, T.red);
    text(s, "THE FRICTION", { x: L + 0.55, y: 1.74, w: 2.8, h: 0.32, fontSize: 11.5, bold: true, color: T.red, valign: "middle" });
    lines(s, ["Marks sit on paper and WhatsApp", "Weak topics found after the exam", "₹17.3 L a year lost to dropouts", "Generic apps give no early warning"], L + 0.18, 2.18, 3.2, 1.75, { size: 10.5, gap: 4 });
    await icon(s, "FaArrowDown", L + 1.6, 4.02, 0.3, T.tealDark);
    s.addShape("rect", { x: L, y: 4.38, w: 3.5, h: 2.5, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 1.25 } });
    await icon(s, "FaCircleCheck", L + 0.15, 4.5, 0.3, T.tealDark);
    text(s, "THE FIX", { x: L + 0.55, y: 4.49, w: 2.8, h: 0.32, fontSize: 11.5, bold: true, color: T.tealDark, valign: "middle" });
    lines(s, ["One upload gives a topic map", "A short weekly list for mentors", "Plain reasons, supportive actions", "Checked Hindi and English parent notes", "Free to run, works offline"], L + 0.18, 4.95, 3.2, 1.9, { size: 10.5, gap: 4 });
    // loop
    const cx = 8.55, cy = 4.1, rx = 2.15, ry = 1.7;
    const st = [["FaCamera", "1 Capture", "Phone photo or Excel becomes clean data", "OMR reader"], ["FaDiagramProject", "2 Structure", "Every question tagged to a syllabus topic", "380-topic map"], ["FaBrain", "3 Estimate", "Knows each student's strengths, topic by topic", "IRT mastery model"],
      ["FaFlag", "4 Flag", "A short weekly list: who needs help, why", "Calibrated risk model"], ["FaHandshake", "5 Act", "Mentors call; every outcome is logged", "Intervention log"], ["FaFileLines", "6 Report", "Checked Hindi and English parent updates", "8-check verifier"]];
    const pos = st.map((_, i) => { const a = (-90 + i * 60) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
    for (let i = 0; i < 6; i++) { const a = pos[i], b = pos[(i + 1) % 6]; const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy); const u = [dx / d, dy / d]; kit.line(s, a[0] + u[0] * 0.5, a[1] + u[1] * 0.5, b[0] - u[0] * 0.5, b[1] - u[1] * 0.5, { color: T.grey, w: 2, arrow: true }); }
    s.addShape("ellipse", { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 1.5 } });
    text(s, "₹3.6", { x: cx - 0.85, y: cy - 0.55, w: 1.7, h: 0.6, fontSize: 28, bold: true, color: T.tealDark, align: "center", valign: "middle" });
    text(s, "per student, per month", { x: cx - 0.8, y: cy + 0.05, w: 1.6, h: 0.5, fontSize: 9.5, color: T.muted, align: "center" });
    for (let i = 0; i < 6; i++) {
      const [x, y] = pos[i];
      s.addShape("ellipse", { x: x - 0.42, y: y - 0.42, w: 0.84, h: 0.84, fill: { color: i % 2 ? T.teal : T.tealDark }, line: { color: T.white, width: 2 } });
      await icon(s, st[i][0], x - 0.2, y - 0.2, 0.4, T.white);
      const right = i === 0 || i === 1 || i === 2, tx = right ? x + 0.55 : x - 2.55, al = right ? "left" : "right";
      const top = i === 0 ? y - 0.52 : i === 3 ? y - 0.3 : y - 0.45;
      const tw = i === 0 ? 2.3 : 2.0;
      text(s, [{ text: st[i][1], options: { bold: true, fontSize: 13, color: T.tealDark, breakLine: true } }, { text: st[i][2], options: { fontSize: 10.5, color: T.ink, breakLine: true } }, { text: st[i][3], options: { fontSize: 8.5, italic: true, color: T.muted } }], { x: i === 0 || i === 3 ? (i === 0 ? x + 0.55 : x - 2.85) : tx, y: top, w: i === 0 || i === 3 ? 2.3 : tw, h: 0.95, align: i === 3 ? "right" : al, valign: "top" });
    }
    foot(s, "Sources: product design; financial model v1.1 (₹3.6 all-in cost, Base); case guide baselines. Technical names appear in grey as proof of rigour.");
    s.addNotes("The loop in plain English with the technical names as secondary labels. Each step statement is eight words or fewer.");
  }

