  // ---- v2 chrome: breadcrumb tracker on top, heading + plain-English subtitle, source footer bottom-left, page box bottom-right
  kit.srcY = 7.1; kit.srcH = 0.28;
  const titleBox = { name: "title", type: "title", x: L, y: 0.38, w: 12.0, h: 0.42, fontFace: F.head, fontSize: 22, bold: true, color: T.tealDark, valign: "middle", margin: 0 };
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: T.white },
    objects: [
      { rect: { x: 12.3, y: 7.12, w: 0.58, h: 0.3, fill: { color: T.tealDark } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 7.12, w: 0.58, h: 0.3, fontFace: F.body, fontSize: 13, bold: true, color: T.white, align: "center", valign: "middle" },
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
    { rect: { x: 0, y: 0, w: 13.333, h: 0.1, fill: { color: T.tealDark } } },
    { placeholder: { options: { name: "title", type: "title", x: L, y: 1.15, w: 6.2, h: 1.2, fontFace: F.head, fontSize: 60, bold: true, color: T.tealDark, valign: "middle", margin: 0 }, text: "" } }] });

  const CRUMBS = ["Summary", "Problem", "Product", "Technology", "Trust", "Business", "The Ask", "Appendix"];
  const crumb = (s, active) => {
    let x = L;
    CRUMBS.forEach((c, i) => {
      const w = c.length * 0.085 + 0.36, on = i === active;
      if (on) s.addShape("roundRect", { x, y: 0.1, w, h: 0.25, rectRadius: 0.12, fill: { color: T.tealDark }, line: { type: "none" } });
      text(s, c.toUpperCase(), { x, y: 0.1, w, h: 0.25, fontSize: 8, bold: true, color: on ? T.white : T.muted, align: "center", valign: "middle", charSpacing: 0.8 });
      x += w;
      if (i < CRUMBS.length - 1) { text(s, "›", { x, y: 0.1, w: 0.2, h: 0.25, fontSize: 11, color: T.grey, align: "center", valign: "middle" }); x += 0.2; }
    });
  };
  // content(section, subtitle, rubric, [HEADING, crumb index]); the rubric goes to the speaker notes
  const content = (section, title, rub, head) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    rect(s, 0, 0, 13.333, 0.06, T.tealDark);
    crumb(s, head[1]);
    s.addText(head[0], { placeholder: "title" });
    const sub = title.replace(/^Appendix \d+: /, "");
    text(s, sub.charAt(0).toUpperCase() + sub.slice(1), { x: L, y: 0.8, w: CWD, h: 0.3, fontSize: 14, color: T.muted, valign: "middle" });
    rect(s, L, 1.14, CWD, 0.025, T.tealDark);
    s.addNotes("Scoring area: " + rub);
    return s;
  };
  const sec = (s, n, label, x, y, w) => {
    rect(s, x, y, 0.28, 0.28, T.tealDark);
    text(s, String(n), { x, y, w: 0.28, h: 0.28, fontSize: 11.5, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, label, { x: x + 0.36, y, w: w - 0.36, h: 0.28, fontSize: 12, bold: true, color: T.tealDark, valign: "middle", charSpacing: 0.5 });
  };
  const foot = (s, t) => text(s, t, { x: L, y: 7.1, w: 11.6, h: 0.28, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
  // small outlined tile with a dark head: head text, body text
  const tile = (s, x, y, w, h, head, body, o = {}) => {
    s.addShape("rect", { x, y, w, h, fill: { color: o.fill ?? T.white }, line: { color: o.line ?? T.tealDark, width: 1.25 } });
    rect(s, x, y, w, o.hh ?? 0.3, o.hf ?? T.tealDark);
    text(s, head, { x: x + 0.08, y, w: w - 0.16, h: o.hh ?? 0.3, fontSize: o.hs ?? 10.5, bold: true, color: T.white, align: "center", valign: "middle" });
    if (body) text(s, body, { x: x + 0.1, y: y + (o.hh ?? 0.3) + 0.03, w: w - 0.2, h: h - (o.hh ?? 0.3) - 0.06, fontSize: o.bs ?? 10, color: T.ink, align: o.align ?? "center", valign: "middle" });
  };
  const checks = async (s, items, x, y, w, gap, o = {}) => {
    for (let i = 0; i < items.length; i++) {
      await icon(s, o.icon ?? "FaCircleCheck", x, y + i * gap + 0.03, 0.2, o.color ?? T.tealDark);
      text(s, items[i], { x: x + 0.3, y: y + i * gap, w: w - 0.3, h: gap - 0.02, fontSize: o.size ?? 10.5, color: T.ink, valign: "middle" });
    }
  };

  // a pinned "sticky note" with a handwritten-style annotation (human touch); slight tilt
  const note = (s, x, y, w, h, t, rot = -2) => {
    s.addShape("rect", { x, y, w, h, fill: { color: "F1E8D3" }, line: { color: "D9C79A", width: 0.75 }, rotate: rot });
    text(s, t, { x: x + 0.05, y, w: w - 0.1, h, fontFace: "Segoe Script", fontSize: 9, color: "5A4A1E", align: "center", valign: "middle", rotate: rot });
  };
  // chip: small tinted status label
  const stat = (s, label, x, y, w, kind) => {
    const k = { built: [T.tealDark, T.white, null], build: ["D4A24C", T.navy, null], design: [T.white, T.muted, "9AA6B5"] }[kind];
    s.addShape("rect", { x, y, w, h: 0.2, fill: { color: k[0] }, line: k[2] ? { color: k[2], width: 1 } : { type: "none" } });
    text(s, label, { x, y, w, h: 0.2, fontSize: 7.5, bold: true, color: k[1], align: "center", valign: "middle", charSpacing: 0.5 });
  };
