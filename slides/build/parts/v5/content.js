  const NAVTABS = ["Summary", "Problem", "Product", "Technology", "Trust", "Business", "Validation", "Appendix"];
  // content(section, subtitle, rubric, [HEADING, tab index]); appendix subtitles drop their "Appendix N: " prefix
  const content = (section, title, rub, head) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    s.addText(head[0], { placeholder: "title" });
    const sub = title.replace(/^Appendix \d+: /, "");
    text(s, sub.charAt(0).toUpperCase() + sub.slice(1), { x: L, y: 0.6, w: CWD, h: 0.34, fontSize: 14.5, color: T.muted, valign: "middle" });
    rect(s, L, 0.98, CWD, 0.025, T.tealDark);
    rubric(s, rub);
    kit.nav(s, NAVTABS, head[1]);
    return s;
  };
  // numbered section label inside a slide (dark square with the number, caps title)
  const sec = (s, n, label, x, y, w) => {
    rect(s, x, y, 0.28, 0.28, T.tealDark);
    text(s, String(n), { x, y, w: 0.28, h: 0.28, fontSize: 11.5, bold: true, color: T.white, align: "center", valign: "middle" });
    text(s, label, { x: x + 0.36, y, w: w - 0.36, h: 0.28, fontSize: 12, bold: true, color: T.tealDark, valign: "middle", charSpacing: 0.5 });
  };

