  const NAVTABS = ["Problem", "Product", "Technology", "Trust", "Business", "Validation", "Appendix"];
  const HEAD = [["THE PROBLEM", 0], ["PRODUCT TOUR", 1], ["WEB AND PHONE APP", 1], ["LEARNING ANALYTICS", 2], ["EARLY WARNING", 2], ["PERCENTILE RANGE AND PARENT REPORTS", 2], ["PRIVACY AND COMPLIANCE", 3],
    ["RETURN FOR THE INSTITUTE", 4], ["UNIT ECONOMICS", 4], ["MARKET AND GO-TO-MARKET", 4], ["VALIDATION AND PILOT PLAN", 5],
    ["APPENDIX 1: DATA MODEL", 6], ["APPENDIX 2: COST PER STUDENT", 6], ["APPENDIX 3: LEGAL BASIS", 6], ["APPENDIX 4: HOW WE TEST", 6], ["APPENDIX 5: SCENARIOS", 6]];
  let hn = 0;
  const content = (section, title, rub) => {
    const h = HEAD[hn++];
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
    s.addText(h[0], { placeholder: "title" });
    text(s, title.replace(/^Appendix \d: /, ""), { x: L, y: 0.6, w: CWD, h: 0.34, fontSize: 14.5, color: T.muted, valign: "middle" });
    rect(s, L, 0.98, CWD, 0.025, T.tealDark);
    rubric(s, rub);
    kit.nav(s, NAVTABS, h[1]);
    return s;
  };

