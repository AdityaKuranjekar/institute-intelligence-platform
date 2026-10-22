  const titleBox = { name: "title", type: "title", x: L, y: 0.14, w: 9.2, h: 0.48, fontFace: F.head, fontSize: 24, bold: true, color: T.tealDark, valign: "middle", margin: 0 };
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
      { rect: { x: 12.3, y: 7.14, w: 0.58, h: 0.3, fill: { color: T.tealDark } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.14, w: 0.58, h: 0.3, fontFace: F.body, fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" },
  });
  pres.defineSlideMaster({ title: "FULL", background: { color: T.white }, objects: [] });
  pres.defineSlideMaster({
    title: "CLOSING", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
      { placeholder: { options: Object.assign({}, titleBox, { y: 0.3, h: 0.6, fontSize: 28 }), text: "" } },
    ],
  });
  pres.defineSlideMaster({ title: "TITLE", background: { color: T.white }, objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
    { placeholder: { options: { name: "title", type: "title", x: L, y: 1.5, w: 5.7, h: 2.2, fontFace: F.head, fontSize: 30, bold: true, color: T.tealDark, valign: "top", margin: 0 }, text: "" } }] });

