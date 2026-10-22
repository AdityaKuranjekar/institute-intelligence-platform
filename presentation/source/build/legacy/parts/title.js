  // ================================================================ TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    rect(s, 6.35, 0.45, 6.55, 6.45, T.orangeT);
    text(s, "CASE B  ·  THE DATA MOAT", { x: L, y: 0.75, w: 5.8, h: 0.3, fontSize: 13, bold: true, color: T.teal, charSpacing: 2 });
    rect(s, L, 1.1, 5.7, 0.025, T.tealDark);
    s.addText("Intelligence for the coaching institutes that run on Excel, OMR sheets and WhatsApp", { placeholder: "title" });
    text(s, "Pragati turns one upload into a topic map, a weekly support list and a verified Hindi and English parent report, on the web and on the phone. Offline, private, free to run.", { x: L, y: 3.7, w: 5.5, h: 1.0, fontSize: 14.5, color: T.ink });
    const kp = [["0.763", "AUC on ASSISTments (public data)"], ["0.706", "AUC on OULAD, day 28 (public data)"], ["₹3.6", "per student per month, all-in (model)"]];
    kp.forEach((k, i) => {
      const x = L + i * 1.95;
      rect(s, x, 5.2, 1.8, 0.3, T.tealDark);
      text(s, k[0], { x, y: 5.2, w: 1.8, h: 0.3, fontSize: 14, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x, y: 5.5, w: 1.8, h: 0.75, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      text(s, k[1], { x: x + 0.08, y: 5.55, w: 1.64, h: 0.65, fontSize: 10.5, color: T.ink, align: "center", valign: "middle" });
    });
    text(s, "Team AlphaQ  ·  Round 1  ·  Nextute x Finance Club, IIT Patna", { x: L, y: 6.7, w: 5.8, h: 0.4, fontSize: 11.5, color: T.muted, valign: "middle" });
    pic(s, "web_console.png", 6.55, 0.7, 6.15, 3.46, "Pragati web console (illustrative)");
    pic(s, "app_scan.png", 7.0, 3.4, 1.7, 3.4, "Pragati scan screen on a phone (illustrative)");
    pic(s, "app_mentor.png", 8.85, 3.15, 1.7, 3.4, "Pragati mentor app (illustrative)");
    pic(s, "app_parent.png", 10.7, 3.4, 1.7, 3.4, "Pragati parent app (illustrative)");
    text(s, "Illustrative mock-ups, synthetic data", { x: 10.2, y: 6.95, w: 2.7, h: 0.25, fontSize: 9, italic: true, color: T.muted, align: "right" });
    s.addNotes("Title. Right-hand screens are illustrative mock-ups rendered from HTML with synthetic values: the web console and three phone screens. The two AUC figures are results on public datasets (ASSISTments 2009 under the pyKT protocol, OULAD day 28); the 3.6 rupee figure is the model's all-in cost per student per month.");
  }

