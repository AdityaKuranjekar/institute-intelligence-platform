  // ================================================================ PRODUCT
  pres.addSection({ title: "Product" });
  {
    const s = content("Product", "One product, two surfaces: a web console for the office and a phone app for mentors and parents", "Architecture · product", ["THE PRODUCT", 2]);
    s.addShape("rect", { x: L, y: 1.22, w: 6.4, h: 3.6, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
    pic(s, "web_console.png", L + 0.02, 1.24, 6.36, 3.56, "Pragati web console (illustrative)");
    hdrBar(s, L, 4.86, 6.4, "WEB CONSOLE · owner, teacher and compliance views", { h: 0.27, size: 10 });
    rect(s, 6.98, 1.22, R - 6.98, 3.6, T.orangeT);
    const ph = ["Scan an OMR sheet", "Mentor: this week's list", "Parent: Hindi or English"];
    ["app_scan.png", "app_mentor.png", "app_parent.png"].forEach((f, i) => pic(s, f, 7.08 + i * 1.94, 1.27, 1.75, 3.5, ph[i] + " (illustrative)"));
    hdrBar(s, 6.98, 4.86, R - 6.98, "PHONE APP · scan sheets, weekly list, parent view", { h: 0.27, size: 10 });
    // ---- who sees what
    sec(s, 1, "WHO SEES WHAT", L, 5.25, 7.9);
    const roles = [["FaBuilding", "Owner", "Web console", ["Batch comparison, retention", "Actions done, outcomes", "Compliance exports"]],
      ["FaChalkboardUser", "Teacher and mentor", "Web and phone", ["Topic heatmap, wrong keys", "Weekly list with reasons", "Log what was done"]],
      ["FaUserGraduate", "Student", "Phone (web app)", ["Own topic mastery", "Practice on weak topics", "Never a risk score"]],
      ["FaUsers", "Parent", "Phone or WhatsApp", ["Weekly Hindi / English note", "What improved, what next", "No peer ranks"]]];
    for (let i = 0; i < 4; i++) {
      const x = L + i * 1.98, y = 5.6;
      s.addShape("rect", { x, y, w: 1.9, h: 1.32, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      rect(s, x, y, 1.9, 0.3, T.tealDark);
      await icon(s, roles[i][0], x + 0.08, y + 0.05, 0.2, T.white);
      text(s, roles[i][1], { x: x + 0.34, y, w: 1.52, h: 0.3, fontSize: 10, bold: true, color: T.white, valign: "middle" });
      text(s, roles[i][2], { x: x + 0.08, y: y + 0.32, w: 1.76, h: 0.22, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
      lines(s, roles[i][3], x + 0.05, y + 0.54, 1.82, 0.78, { size: 8.5, gap: 1 });
    }
    // ---- a week with pragati
    const wx = 8.5, ww = R - 8.5;
    sec(s, 2, "A WEEK WITH PRAGATI", wx, 5.25, ww);
    const wk = [["Mon", "Weekly test on OMR; sheets scanned on a phone"], ["Mon pm", "Topic map and wrong-key flags for the teacher"], ["Tue", "Mentor list of up to 8, each with reasons"], ["Wed", "Remedial session for the weakest topic"], ["Sat", "Checked Hindi / English note to parents"], ["Month", "Owner sees actions taken and outcomes"]];
    wk.forEach((w, i) => {
      const y = 5.6 + i * 0.22;
      rect(s, wx, y + 0.01, 0.72, 0.2, i % 2 ? T.teal : T.tealDark);
      text(s, w[0], { x: wx, y: y + 0.01, w: 0.72, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, w[1], { x: wx + 0.8, y, w: ww - 0.8, h: 0.22, fontSize: 9, color: T.ink, valign: "middle" });
    });
    source(s, "Illustrative mock-ups with synthetic students. Both surfaces use one API; the phone app is a progressive web app installed from the browser (no app-store fee).");
    s.addNotes("Product slide. Web console for the office, phone screens for scanning, mentors and parents. Who-sees-what follows the routing policy: risk lists only for mentors and owners; students and parents never see risk scores or ranks.");
  }

