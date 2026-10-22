    chevrow(s, L + 0.2, 4.85, CWD - 0.4, 0.55, [{ t: "PHASE 1  ·  WEEKS 0 TO 4" }, { t: "PHASE 2  ·  ONE TERM" }, { t: "PHASE 3  ·  AFTER THE TERM" }], { size: 11 });
    const ph = [["Retro-pilot at 2 institutes", "Import last year's Excel; show who left and what we would have flagged. Measure recall and precision on their data."], ["Staggered paid pilot", "Half the batches start first; the rest are the comparison. Success measures are written down before we start."], ["Decide and scale", "Fix the percentile mapping with real exam outcomes; publish what worked and what did not."]];
    ph.forEach((p, i) => {
      const x = L + 0.3 + i * 4.1;
      text(s, p[0], { x, y: 5.5, w: 3.85, h: 0.3, fontSize: 12.5, bold: true, color: T.navy, fontFace: F.head });
      text(s, p[1], { x, y: 5.82, w: 3.85, h: 0.78, fontSize: 10.5 });
    });
