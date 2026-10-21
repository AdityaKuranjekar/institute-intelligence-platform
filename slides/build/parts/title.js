  // ================================================================ TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    ellipse(s, 7.9, 0.0, 5.4, 5.4, T.orangeT);
    ellipse(s, 5.2, 3.95, 3.4, 3.4, T.tealTint);
    ellipse(s, 11.9, 5.0, 1.4, 2.4, T.yellowT);
    text(s, "CASE B  ·  THE DATA MOAT", { x: L, y: 0.85, w: 6.3, h: 0.35, fontSize: 13, bold: true, color: T.orangeD, charSpacing: 2 });
    s.addText("Intelligence for the coaching institutes that run on Excel, OMR sheets and WhatsApp", { placeholder: "title" });
    text(s, "Pragati turns one upload into a topic map, a weekly support list and a verified Hindi and English parent report. On the web and on the phone. Offline, private, free to run.", { x: L, y: 4.05, w: 5.9, h: 1.0, fontSize: 15, color: T.ink });
    const kp = [["0.763", "AUC on ASSISTments (public)", T.teal], ["0.706", "AUC on OULAD, day 28 (public)", T.orange], ["₹3.6", "per student per month", T.blue]];
    kp.forEach((k, i) => {
      const x = L + i * 2.05;
      s.addShape("roundRect", { x, y: 5.3, w: 1.9, h: 1.0, rectRadius: 0.14, fill: { color: k[2] }, line: { type: "none" } });
      text(s, k[0], { x: x + 0.14, y: 5.35, w: 1.65, h: 0.5, fontSize: 24, bold: true, color: T.white, fontFace: F.head });
      text(s, k[1], { x: x + 0.14, y: 5.85, w: 1.65, h: 0.4, fontSize: 9.5, color: T.white });
    });
    text(s, "Team AlphaQ  ·  Round 1  ·  Nextute x Finance Club, IIT Patna", { x: L, y: 6.7, w: 6.4, h: 0.4, fontSize: 12, color: T.muted, valign: "middle" });
    pic(s, "web_console.png", 6.55, 0.75, 6.3, 3.54, "Pragati web console (illustrative)");
    pic(s, "app_scan.png", 7.15, 3.35, 1.75, 3.5, "Pragati scan screen on a phone (illustrative)");
    pic(s, "app_mentor.png", 9.0, 3.1, 1.75, 3.5, "Pragati mentor app (illustrative)");
    pic(s, "app_parent.png", 10.85, 3.35, 1.75, 3.5, "Pragati parent app (illustrative)");
    tag(s, "mock", 10.5, 6.95);
    s.addNotes("Title. Right-hand screens are illustrative mock-ups rendered from HTML with synthetic values: the web console and three phone screens. The two AUC figures are results on public datasets (ASSISTments 2009 under the pyKT protocol, OULAD day 28); the 3.6 rupee figure is the model's all-in cost per student per month.");
  }

