  const titleBox = { name: "title", type: "title", x: L, y: 0.34, w: CWD, h: 0.8, fontFace: F.head, fontSize: 24, bold: true, color: T.navy, valign: "top", margin: 0 };
  const foot = (x, c) => ({ text: { text: "AlphaQ", options: { x, y: 7.1, w: 1.0, h: 0.28, fontFace: F.head, bold: true, fontSize: 11, color: c, align: "right", margin: 0, valign: "middle" } } });
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 0.16, h: 1.9, fill: { color: T.orange } } },
      { rect: { x: 0, y: 1.9, w: 0.16, h: 1.9, fill: { color: T.teal } } },
      { rect: { x: 0, y: 3.8, w: 0.16, h: 1.9, fill: { color: T.blue } } },
      { rect: { x: 0, y: 5.7, w: 0.16, h: 1.8, fill: { color: T.amber } } },
      foot(11.2, T.tealDark),
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.1, w: 0.5, h: 0.28, fontFace: F.body, fontSize: 11, color: T.muted, align: "right" },
  });
  pres.defineSlideMaster({
    title: "WALL", background: { color: "FFF8EE" },
    objects: [{ placeholder: { options: Object.assign({}, titleBox, { fontSize: 26 }), text: "" } }],
  });
  pres.defineSlideMaster({ title: "FULL", background: { color: T.white }, objects: [] });
  pres.defineSlideMaster({
    title: "CLOSING", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.18, fill: { color: T.teal } } },
      { placeholder: { options: Object.assign({}, titleBox, { fontSize: 32, y: 0.5, h: 0.9 }), text: "" } },
    ],
  });
  pres.defineSlideMaster({ title: "TITLE", background: { color: T.white }, objects: [{ placeholder: { options: { name: "title", type: "title", x: L, y: 1.55, w: 6.2, h: 2.4, fontFace: F.head, fontSize: 31, bold: true, color: T.navy, valign: "top", margin: 0 }, text: "" } }] });

