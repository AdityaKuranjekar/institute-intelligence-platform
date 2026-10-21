  // ================================================================ 2 PRODUCT WALL
  {
    const s = pres.addSlide({ masterName: "WALL", sectionTitle: "Problem and product" });
    s.addText("From one upload to action: six screens of the same flow", { placeholder: "title" });
    const cw = 4.05, gx = 0.14, ih = 2.28;
    const cells = [["screen_upload.png", "Upload and map: the system fixes the mess", 16 / 9], ["screen_heatmap.png", "Topic map: strengths, gaps, untaught topics", 16 / 9], ["screen_support_list.png", "Weekly support list: reasons and actions", 16 / 9],
      ["screen_student_profile.png", "Student profile: mastery with doubt, honest range", 16 / 9], ["screen_owner.png", "Owner dashboard: retention, coverage, compliance", 16 / 9], ["screen_parent_report.png", "Parent report in Hindi and English", 5 / 3]];
    cells.forEach((c, i) => {
      const col = i % 3, rw = Math.floor(i / 3);
      const x = L + col * (cw + gx), y = 1.2 + rw * 2.85;
      const w = c[2] === 16 / 9 ? cw : ih * c[2], xx = x + (cw - w) / 2, a = kit.acc(i);
      s.addShape("rect", { x: xx - 0.05, y: y - 0.05, w: w + 0.1, h: ih + 0.1, fill: { color: T.white }, line: { color: a.c, width: 2 } });
      pic(s, c[0], xx, y, w, ih, c[1]);
      ellipse(s, x, y + ih + 0.1, 0.32, 0.32, a.c);
      text(s, String(i + 1), { x, y: y + ih + 0.1, w: 0.32, h: 0.32, fontSize: 12, bold: true, color: a.on, align: "center", valign: "middle" });
      text(s, c[1], { x: x + 0.42, y: y + ih + 0.04, w: cw - 0.5, h: 0.44, fontSize: 11.5, bold: true, color: T.navy, valign: "middle" });
    });
    text(s, "Illustrative mock-ups rendered from HTML with synthetic values. They become real screenshots once the web app is wired to the models.", { x: L, y: 7.08, w: 10.5, h: 0.3, fontSize: 10, color: T.muted, valign: "middle" });
    s.addNotes("Product wall: upload, topic map, support list, profile, owner dashboard, parent report. All images are illustrative mock-ups (HTML rendered by headless Edge) using synthetic data and real report text from the report module.");
  }

  // ================================================================ 2b WEB + APP
  {
    const s = content("Problem and product", "One product, two surfaces: web for the desk, phone for the floor", "Product surfaces");
    ellipse(s, 7.0, 1.0, 6.2, 5.0, T.tealTint);
    s.addShape("roundRect", { x: L, y: 1.25, w: 6.7, h: 3.8, rectRadius: 0.12, fill: { color: T.white }, line: { color: T.teal, width: 2 } });
    pic(s, "web_console.png", L + 0.05, 1.3, 6.6, 3.71, "Pragati web console (illustrative)");
    const ph = [["app_scan.png", "Scan an OMR sheet", T.orange], ["app_mentor.png", "Mentor: this week's list", T.teal], ["app_parent.png", "Parent: Hindi or English", T.blue]];
    ph.forEach((p, i) => {
      const x = 7.4 + i * 1.85;
      pic(s, p[0], x, 1.25, 1.8, 3.6, p[1] + " (illustrative)");
      s.addShape("roundRect", { x: x + 0.03, y: 4.95, w: 1.74, h: 0.5, rectRadius: 0.25, fill: { color: p[2] }, line: { type: "none" } });
      text(s, p[1], { x: x + 0.1, y: 4.95, w: 1.6, h: 0.5, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
    });
    s.addShape("roundRect", { x: L + 0.9, y: 5.1, w: 4.9, h: 0.36, rectRadius: 0.18, fill: { color: T.tealDark }, line: { type: "none" } });
    text(s, "Web console: owner, teacher and compliance views", { x: L + 0.9, y: 5.1, w: 4.9, h: 0.36, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, "THE WEEKLY LOOP", { x: L, y: 5.5, w: 3, h: 0.26, fontSize: 10.5, bold: true, color: T.muted, charSpacing: 1.5 });
    await loop(s, 1.1, 6.0, 10.9, [{ icon: "FaCamera", t: "Scan or upload" }, { icon: "FaChartSimple", t: "Topic map" }, { icon: "FaListCheck", t: "Weekly list" }, { icon: "FaPhone", t: "Call or session" }, { icon: "FaCircleCheck", t: "Outcome logged" }], { d: 0.62, size: 11, back: "Outcomes feed the next week's list" });
    source(s, "Both surfaces use the same API. Phone screens are illustrative mock-ups with synthetic students; the app is a Next.js progressive web app, no app-store fee.");
    s.addNotes("New slide. Web console (owner, teacher, compliance) and phone screens (scan, mentor list, parent view in Hindi or English). All are illustrative HTML mock-ups with synthetic data. Delivery plan: Next.js PWA installed from the browser, so no app-store account is needed.");
  }

