    const s = pres.addSlide({ masterName: "CLOSING", sectionTitle: "Closing" });
    s.addText("How we used AI, and what we cited", { placeholder: "title" });
    const cw = (CWD - 0.3) / 2;
    [["AI tools", ["Claude: planning, code review, documentation.", "Google Antigravity agents: code generation.", "Perplexity and Gemini Deep Research: literature and regulation research.", "Everything was reviewed and tested by the team; research claims were checked against primary sources where possible."], 0],
      ["Public data and libraries", ["OULAD (CC BY 4.0), ASSISTments 2009, the pyKT benchmark, JEEBench.", "Noto Sans Devanagari (SIL OFL), LightGBM, Ollama, FastAPI, PostgreSQL.", "Full list with licences: technical/docs/CITATIONS.md in the repository."], 2]].forEach((c, i) => {
      const x = L + i * (cw + 0.3), a = kit.acc(c[2]);
      s.addShape("roundRect", { x, y: 1.7, w: cw, h: 4.6, rectRadius: 0.02, fill: { color: a.t }, line: { color: a.c, width: 1.5 } });
      s.addShape("roundRect", { x: x + 0.3, y: 1.9, w: 2.8, h: 0.45, rectRadius: 0.02, fill: { color: a.c }, line: { type: "none" } });
      text(s, c[0], { x: x + 0.3, y: 1.9, w: 2.8, h: 0.45, fontSize: 15, bold: true, color: a.on, fontFace: F.head, align: "center", valign: "middle" });
      text(s, c[1].map((t, k) => ({ text: t, options: { breakLine: k < c[1].length - 1, paraSpaceAfter: 10, bullet: { indent: 14 } } })), { x: x + 0.3, y: 2.6, w: cw - 0.6, h: 3.6, fontSize: 17, color: T.ink });
    });
