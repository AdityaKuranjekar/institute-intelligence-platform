  // ================================================================ GO-TO-MARKET, MOAT AND ROADMAP
  {
    const s = content("Business", "Win the Hindi belt with a free retro-pilot; let the shared question bank compound as institutes join", "Market and go-to-market 10 %", ["GO-TO-MARKET, MOAT AND ROADMAP", 5]);
    // ---- where we start
    sec(s, 1, "WHERE WE START, AND WHY", L, 1.22, 6);
    const phs = [["PHASE 1 · JAN TO MAR 2027", "Patna", "Free retro-pilot at 2 institutes on last year's Excel: who left, and would we have flagged them?"],
      ["PHASE 2 · APR 2027 SESSION", "Patna and Lucknow", "Paid pilots with comparison batches; measures written down before we start."],
      ["PHASE 3 · FY28", "Bihar, UP, Jharkhand", "Field sales for mid and large institutes; small ones self-serve (LTV/CAC 1.5x)."]];
    phs.forEach((p, i) => {
      const x = L + i * 2.03, y = 1.58;
      rect(s, x, y, 1.95, 0.3, i === 0 ? T.tealDark : T.teal);
      text(s, p[0], { x, y, w: 1.95, h: 0.3, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x, y: y + 0.3, w: 1.95, h: 1.3, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      text(s, p[1], { x: x + 0.08, y: y + 0.34, w: 1.8, h: 0.26, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, p[2], { x: x + 0.08, y: y + 0.6, w: 1.8, h: 0.98, fontSize: 9, color: T.ink });
    });
    sec(s, 2, "CHANNELS", L, 3.6, 6);
    const ch = [["FaHandshake", "Nextute network", "partner channel, to be agreed"], ["FaGift", "Free retro-pilot", "one Excel file, one answer, no install"], ["FaPersonChalkboard", "Field demos, Jan to Mar", "before the April admission season"], ["FaPrint", "OMR and test-series vendors", "referral partners, to be tested"]];
    for (let i = 0; i < 4; i++) {
      const x = L + (i % 2) * 3.05, y = 3.96 + Math.floor(i / 2) * 0.55;
      await abadge(s, ch[i][0], x, y + 0.04, 0.36, i);
      text(s, [{ text: ch[i][1], options: { bold: true, color: T.tealDark, breakLine: true } }, { text: ch[i][2], options: { color: T.muted, fontSize: 8.5 } }], { x: x + 0.44, y, w: 2.55, h: 0.48, fontSize: 9.5, valign: "middle" });
    }
    // ---- competition
    const cx0 = 6.7, cw0 = R - 6.7;
    sec(s, 3, "COMPETITION (VENDOR LISTINGS, OCT 2026)", cx0, 1.22, cw0);
    const mark = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? C2.gold : "F4F7FB", bold: true, color: t === "yes" ? T.tealDark : T.muted });
    dtable(s, cx0, 1.58, [1.2, 0.95, 0.72, 0.85, 0.82, 0.8, 0.82], ["", "Price / student / mo", "OMR", "Topic analytics", "Parent report", "Hindi", "Consent ledger"], [
      ["Classplus", "₹4 to ₹7", mark("?"), mark("?"), mark("?"), mark("?"), mark("?")],
      ["Fedena", "₹10 to ₹21", mark("no"), mark("?"), mark("yes"), mark("?"), mark("no")],
      ["Edmingle", "₹19 to ₹75", mark("no"), mark("?"), mark("?"), mark("?"), mark("no")],
      ["Teachmint", "₹20 to ₹40 (est.)", mark("?"), mark("?"), mark("yes"), mark("yes"), mark("?")],
      [{ t: "Pragati", bold: true, color: T.tealDark }, { t: "₹30", bold: true }, { t: "designed", fill: C2.gold, bold: true }, mark("yes"), mark("yes"), mark("yes"), mark("yes")]],
      { rowH: 0.3, headH: 0.38, size: 9, headSize: 8.5, rowStyles: ["white", "white", "white", "white", "white"] });
    text(s, "yes: shown in the listing · no: not shown · ?: could not be verified from the listing", { x: cx0, y: 3.48, w: cw0, h: 0.2, fontSize: 8, italic: true, color: T.muted });
    // ---- moat
    sec(s, 4, "THE MOAT, AND ITS LIMITS", cx0, 3.76, cw0);
    chevrow(s, cx0, 4.1, cw0, 0.5, [{ t: "More institutes" }, { t: "More answers per question" }, { t: "Sharper difficulty, wrong keys caught" }, { t: "Better lists and reports" }], { size: 9, depth: 0.2 });
    text(s, [{ text: "Limit: ", options: { bold: true, color: T.tealDark } }, { text: "until the shared bank covers the syllabus, early wins must come from staff time and parent reports, not model accuracy. Only item statistics are pooled; raw records stay with each institute." }], { x: cx0, y: 4.66, w: cw0, h: 0.5, fontSize: 9, color: T.ink });
    // ---- roadmap
    sec(s, 5, "ROADMAP", L, 5.3, CWD);
    const rm = [["Oct 2026", "Public-data validation, synthetic pipeline, 116 tests", true], ["Round 2", "Working prototype; judges change the inputs live", false], ["Jan to Mar 2027", "Retro-pilots in Patna", false], ["Apr 2027", "Paid pilots start with the session", false], ["Jun 2027", "Publish what worked; fix the percentile table", false], ["FY28", "Bihar, UP, Jharkhand; deep knowledge tracing if it beats IRT", false]];
    const sw = CWD / rm.length;
    rect(s, L, 5.86, CWD, 0.04, T.line);
    rm.forEach((r, i) => {
      const x = L + i * sw;
      rect(s, x + 0.02, 5.7, sw - 0.06, 0.1, r[2] ? T.tealDark : T.teal);
      ellipse(s, x + 0.02, 5.8, 0.14, 0.14, r[2] ? T.tealDark : T.white, { line: T.tealDark, lw: 1.5 });
      text(s, r[0], { x: x + 0.22, y: 5.98, w: sw - 0.26, h: 0.24, fontSize: 10, bold: true, color: T.tealDark, valign: "middle" });
      text(s, r[1], { x: x + 0.22, y: 6.22, w: sw - 0.26, h: 0.66, fontSize: 9, color: T.ink });
    });
    source(s, "Sources: financial/research R1 (vendor listings; many features unverifiable, so '?' is not 'absent'); financial workbook (segments, pilot assumptions). Roadmap dates are our plan.");
    s.addNotes("GTM follows the unit economics: field sales where LTV/CAC is 3.7 to 9x, self-serve for small institutes at 1.5x. The retro-pilot needs only last year's Excel, so it costs the institute nothing. The competitor table shows only what listings show.");
  }

