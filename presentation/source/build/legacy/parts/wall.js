  // ================================================================ 2 PRODUCT TOUR
  {
    const s = content("Problem and product", "Six screens of the same flow: upload, topic map, support list, student profile, owner view, parent report", "Product tour");
    kit.panels("plain");
    const cw = 4.05, gx = 0.14, ih = 2.25;
    const cells = [["screen_upload.png", "Upload and map: the system fixes the mess", 16 / 9], ["screen_heatmap.png", "Topic map: strengths, gaps, untaught topics", 16 / 9], ["screen_support_list.png", "Weekly support list: reasons and actions", 16 / 9],
      ["screen_student_profile.png", "Student profile: mastery with doubt, honest range", 16 / 9], ["screen_owner.png", "Owner dashboard: retention, coverage, compliance", 16 / 9], ["screen_parent_report.png", "Parent report in Hindi and English", 5 / 3]];
    cells.forEach((c, i) => {
      const col = i % 3, rw = Math.floor(i / 3);
      const x = L + col * (cw + gx), y = 1.22 + rw * 2.85;
      const w = c[2] === 16 / 9 ? cw : ih * c[2], xx = x + (cw - w) / 2;
      s.addShape("rect", { x: xx - 0.04, y: y - 0.04, w: w + 0.08, h: ih + 0.08, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
      pic(s, c[0], xx, y, w, ih, c[1]);
      rect(s, x, y + ih + 0.12, 0.3, 0.3, T.tealDark);
      text(s, String(i + 1), { x, y: y + ih + 0.12, w: 0.3, h: 0.3, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, c[1], { x: x + 0.4, y: y + ih + 0.07, w: cw - 0.45, h: 0.4, fontSize: 11.5, bold: true, color: T.navy, valign: "middle" });
    });
    source(s, "Illustrative mock-ups rendered from HTML with synthetic values; they become real screenshots once the web app is wired to the models.");
    s.addNotes("Product tour: upload, topic map, support list, profile, owner dashboard, parent report. All images are illustrative mock-ups (HTML rendered by headless Edge) using synthetic data and real report text from the report module.");
  }

  // ================================================================ 2b WEB + APP
  {
    const s = content("Problem and product", "One product, two surfaces: a web console for the desk and a phone app for the floor", "Product surfaces");
    kit.panels("tab");
    rect(s, 6.9, 1.22, 6.0, 3.95, T.orangeT);
    s.addShape("rect", { x: L, y: 1.22, w: 6.3, h: 3.55, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
    pic(s, "web_console.png", L + 0.03, 1.24, 6.24, 3.51, "Pragati web console (illustrative)");
    hdrBar(s, L, 4.85, 6.3, "WEB CONSOLE: owner, teacher and compliance views", { h: 0.3, size: 11 });
    const ph = ["Scan an OMR sheet", "Mentor: this week's list", "Parent: Hindi or English"];
    ["app_scan.png", "app_mentor.png", "app_parent.png"].forEach((f, i) => {
      const x = 7.1 + i * 1.9;
      pic(s, f, x, 1.3, 1.75, 3.5, ph[i] + " (illustrative)");
    });
    hdrBar(s, 6.9, 4.85, 6.0, "PHONE APP: scan, mentor list, parent view", { h: 0.3, size: 11 });
    text(s, "THE WEEKLY LOOP", { x: L, y: 5.3, w: 3, h: 0.24, fontSize: 10.5, bold: true, color: T.tealDark, charSpacing: 1.5 });
    await loop(s, 1.1, 5.95, 10.9, [{ icon: "FaCamera", t: "Scan or upload" }, { icon: "FaChartSimple", t: "Topic map" }, { icon: "FaListCheck", t: "Weekly list" }, { icon: "FaPhone", t: "Call or session" }, { icon: "FaCircleCheck", t: "Outcome logged" }], { d: 0.55, size: 11, back: "Outcomes feed the next week's list" });
    source(s, "Both surfaces use the same API. Illustrative mock-ups with synthetic students; the app is a Next.js progressive web app (installed from the browser, no app-store fee).");
    s.addNotes("New slide. Web console (owner, teacher, compliance) and phone screens (scan, mentor list, parent view in Hindi or English). All are illustrative HTML mock-ups with synthetic data. Delivery plan: Next.js PWA installed from the browser, so no app-store account is needed.");
  }

