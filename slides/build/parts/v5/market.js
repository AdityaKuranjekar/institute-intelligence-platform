    frame(s, L, 4.25, 4.75, 2.7, "WHO WE SERVE");
    const mk = [["22.8 L", "NEET UG 2025 registered candidates", "NTA result data"], ["15.4 L", "JEE Main 2025 unique registrations", "reported, secondary"], ["27 %", "of school students take private coaching", "NSO survey 2025"]];
    mk.forEach((m, i) => {
      const y = 4.68 + i * 0.5;
      text(s, m[0], { x: L + 0.15, y, w: 1.1, h: 0.44, fontSize: 18, bold: true, color: T.tealDark, valign: "middle" });
      text(s, [{ text: m[1], options: { breakLine: true } }, { text: m[2], options: { italic: true, color: T.muted, fontSize: 8.5 } }], { x: L + 1.3, y, w: 3.35, h: 0.44, fontSize: 10, color: T.ink, valign: "middle" });
    });
    rect(s, L + 0.12, 6.2, 4.51, 0.65, T.tint);
    text(s, [{ text: "Ceiling, not a forecast: ", options: { bold: true, color: T.tealDark } }, { text: "if every JEE and NEET aspirant's institute paid ₹30 a month, the pool is about ₹137 crore a year (38 lakh x ₹360)." }], { x: L + 0.2, y: 6.2, w: 4.35, h: 0.65, fontSize: 9, color: T.ink, valign: "middle" });
