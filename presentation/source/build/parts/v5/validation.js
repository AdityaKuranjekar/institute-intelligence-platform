  // ================================================================ VALIDATION, RISKS AND THE ASK
  pres.addSection({ title: "Validation" });
  {
    const s = content("Validation", "What we proved, what we did not, the risks that could sink us, and the one pilot that settles it", "Feasibility, privacy and safety 20 % · honest limits", ["VALIDATION, RISKS AND OUR ASK", 6]);
    const cw = 4.05, gx = 0.14, y0 = 1.22, h0 = 2.86;
    const cols = [["PROVED ON PUBLIC DATA", "proved", [["Next-answer AUC", "0.763 (DKT 0.754)"], ["Withdrawal AUC, day 28", "0.706 (published 0.794)"], ["Calibration error", "0.009"], ["Academic-only cost", "0.008 AUC"], ["Precision at top 10 %", "0.46 vs 0.24 to 0.31"]]],
      ["SHOWN ON SYNTHETIC DATA", "pending", [["Pipeline end to end", "116 tests pass"], ["Tenant isolation", "0 rows across institutes"], ["Report checker", "8 checks, template fallback"], ["Difficulty recovery", "pending"], ["Early-warning lift", "pending"]]],
      ["NOT PROVEN YET", "notproven", [["Accuracy on real institutes", "needs a pilot"], ["Willingness to pay", "owner interviews"], ["Real dropout reduction", "borrowed from trials"], ["Hindi quality at scale", "native review"], ["Other OMR layouts", "one-time onboarding"]]]];
    cols.forEach((c, i) => {
      const x = L + i * (cw + gx);
      s.addShape("rect", { x, y: y0, w: cw, h: h0, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      tag(s, c[1], x + 0.12, y0 + 0.1, { label: c[0], size: 9, h: 0.28, w: cw - 0.24 });
      c[2].forEach((r, k) => {
        const y = y0 + 0.48 + k * 0.47;
        rect(s, x + 0.12, y, cw - 0.24, 0.44, k % 2 ? T.white : C2.soft);
        text(s, r[0], { x: x + 0.2, y, w: 1.95, h: 0.44, fontSize: 10, bold: true, color: T.navy, valign: "middle" });
        text(s, r[1], { x: x + 2.15, y, w: cw - 2.3, h: 0.44, fontSize: 9.5, valign: "middle" });
      });
    });
    // ---- risks
    sec(s, 1, "KEY RISKS AND HOW WE CONTAIN THEM", L, 4.22, 8.3);
    dtable(s, L, 4.56, [2.75, 5.5], ["Risk", "Mitigation"], [
      [{ t: "Real accuracy below public-data results", bold: true, color: T.red }, "Retro-pilot on last year's Excel before any sale; compare with the institute's own rule at equal workload."],
      [{ t: "Owners will not pay ₹30", bold: true, color: T.red }, "Owner interviews and a price survey first; lead with staff time and parent reports, tested at ₹20 to ₹40."],
      [{ t: "Mentors ignore the list", bold: true, color: T.red }, "List capped at capacity; every flag needs a logged outcome; owner sees actions done."],
      [{ t: "Hindi quality", bold: true, color: T.red }, "Native reviewer on all templates; template fallback when a check fails."],
      [{ t: "DPDP reading changes", bold: true, color: T.red }, "Consent-first design that does not depend on the education exemption."]],
      { rowH: 0.42, headH: 0.28, size: 9.5, leftCols: [1], rowStyles: ["white", "band", "white", "band", "white"] });
    // ---- the ask
    const ax = 8.95, aw = R - 8.95;
    rect(s, ax, 4.22, aw, 2.7, T.tealDark);
    text(s, "OUR ASK", { x: ax + 0.25, y: 4.32, w: aw - 0.5, h: 0.3, fontSize: 12, bold: true, color: "F1D9A0", charSpacing: 1.5 });
    text(s, "Two retro-pilots in Patna this winter.", { x: ax + 0.25, y: 4.66, w: aw - 0.5, h: 0.5, fontSize: 15, bold: true, color: T.white });
    text(s, "Give us last year's Excel. If Pragati would not have flagged more of the students who left than your attendance rule, at the same weekly workload, we stop and say so.", { x: ax + 0.25, y: 5.2, w: aw - 0.5, h: 1.05, fontSize: 10.5, color: T.white });
    text(s, "Changed from the guide: 25 % to 6.6 % dropout reduction; LTV ÷ CAC 10.7x to 3.7x.", { x: ax + 0.25, y: 6.3, w: aw - 0.5, h: 0.5, fontSize: 9, italic: true, color: "C9DBF0" });
    source(s, "Sources: ml/public_validation; financial workbook; technical/docs/FEASIBILITY_CHECK.md. Amber items are replaced with measured values before submission.");
    s.addNotes("State limitations before the judges do: synthetic data proves the pipeline only; public datasets are from the UK (OULAD) and US (ASSISTments); the percentile mapping is an assumption table. The ask is concrete and falsifiable.");
  }

