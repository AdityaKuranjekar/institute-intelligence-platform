// Builds slides/AlphaQ_CaseB_Round1.pptx (light multi-colour style v3). Run: node deck.js  (from slides/build)
// Needs slides/assets/*.png from: python export_html.py && python charts.py
const pptxgen = require("pptxgenjs");
const path = require("path");
const { T, ACC, F, W, H, makeKit } = require("./lib");
const { extend, C2 } = require("./lib2");
const M = require("./mocks");

const OUT = path.join(__dirname, "..", "..", "decks", "AlphaQ_CaseB_Round1_candidate-B_v4.2.pptx");
const L = 0.45, CWD = 12.433, R = L + CWD;

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "AlphaQ: Case B, The Data Moat (Round 1, version 4)";
  pres.author = "AlphaQ";
  pres.company = "AlphaQ";
  pres.theme = { headFontFace: F.head, bodyFontFace: F.body };
  const kit = extend(makeKit(pres), pres);
  const { text, rect, ellipse, line, icon, pill, tag, source, frame, hdrBar, labelBar, callout, dtable, heat, badge, abadge, lines, rubric, pic, chevrow, funnel, loop } = kit;
  let nb = 0;

  // ---- v2 chrome: breadcrumb tracker on top, heading + plain-English subtitle, source footer bottom-left, page box bottom-right
  kit.srcY = 7.02; kit.srcH = 0.22;
  const titleBox = { name: "title", type: "title", x: L, y: 0.38, w: 12.0, h: 0.42, fontFace: F.head, fontSize: 22, bold: true, color: T.tealDark, align: "left", valign: "middle", margin: 0 };
  pres.defineSlideMaster({
    title: "CONTENT", background: { path: path.join(__dirname, "..", "assets", "bg_dots.png") },
    objects: [
      { rect: { x: 0, y: 7.26, w: 13.333, h: 0.24, fill: { color: T.tealDark } } },
      { text: { text: "AlphaQ", options: { x: 0.45, y: 7.26, w: 2, h: 0.24, fontFace: F.head, bold: true, fontSize: 10, color: T.white, margin: 0, valign: "middle" } } },
      { text: { text: "Pragati  ·  Case B: The Data Moat  ·  Round 1", options: { x: 3.6, y: 7.26, w: 6.1, h: 0.24, fontFace: F.body, fontSize: 9.5, color: "C9DBF0", align: "center", margin: 0, valign: "middle" } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 7.26, w: 0.68, h: 0.24, fontFace: F.body, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle" },
  });
  pres.defineSlideMaster({
    title: "CONTENT_SOFT", background: { path: path.join(__dirname, "..", "assets", "bg_dots_soft.png") },
    objects: [
      { rect: { x: 0, y: 7.26, w: 13.333, h: 0.24, fill: { color: T.tealDark } } },
      { text: { text: "AlphaQ", options: { x: 0.45, y: 7.26, w: 2, h: 0.24, fontFace: F.head, bold: true, fontSize: 10, color: T.white, margin: 0, valign: "middle" } } },
      { text: { text: "Pragati  ·  Case B: The Data Moat  ·  Round 1", options: { x: 3.6, y: 7.26, w: 6.1, h: 0.24, fontFace: F.body, fontSize: 9.5, color: "C9DBF0", align: "center", margin: 0, valign: "middle" } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 7.26, w: 0.68, h: 0.24, fontFace: F.body, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle" },
  });
  pres.defineSlideMaster({
    title: "CONTENT_BLANK", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 7.26, w: 13.333, h: 0.24, fill: { color: T.tealDark } } },
      { text: { text: "AlphaQ", options: { x: 0.45, y: 7.26, w: 2, h: 0.24, fontFace: F.head, bold: true, fontSize: 10, color: T.white, margin: 0, valign: "middle" } } },
      { text: { text: "Pragati  ·  Case B: The Data Moat  ·  Round 1", options: { x: 3.6, y: 7.26, w: 6.1, h: 0.24, fontFace: F.body, fontSize: 9.5, color: "C9DBF0", align: "center", margin: 0, valign: "middle" } } },
      { placeholder: { options: titleBox, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 7.26, w: 0.68, h: 0.24, fontFace: F.body, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle" },
  });
  pres.defineSlideMaster({ title: "FULL", background: { color: T.white }, objects: [] });
  pres.defineSlideMaster({
    title: "CLOSING", background: { color: T.white },
    objects: [
      { rect: { x: 0, y: 0, w: 13.333, h: 0.07, fill: { color: T.tealDark } } },
      { placeholder: { options: Object.assign({}, titleBox, { y: 0.3, h: 0.6, fontSize: 28 }), text: "" } },
    ],
  });
  pres.defineSlideMaster({ title: "TITLE", background: { path: path.join(__dirname, "..", "assets", "bg_dots_soft.png") }, objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.1, fill: { color: T.tealDark } } },
    { placeholder: { options: { name: "title", type: "title", x: L, y: 1.15, w: 6.2, h: 1.2, fontFace: F.head, fontSize: 60, bold: true, color: T.tealDark, align: "left", valign: "middle", margin: 0 }, text: "" } }] });


  // ---- reference-inspired helpers ----
  const stars = (s, x, y, n, of = 5, size = 11) => text(s, "★".repeat(n) + "☆".repeat(of - n), { x, y, w: 1.0, h: 0.24, fontSize: size, color: "D4A24C", fontFace: "Segoe UI Symbol", valign: "middle" });
  const banner = (s, x, y, w, t) => {
    s.addShape("roundRect", { x, y, w, h: 0.38, rectRadius: 0.19, fill: { color: T.tealDark }, line: { type: "none" } });
    text(s, t, { x, y, w, h: 0.38, fontSize: 14, bold: true, color: T.white, align: "center", valign: "middle" });
  };
  const clip = (s, x, y, w, h, t) => {
    s.addShape("rect", { x, y: y + 0.18, w, h: h - 0.18, fill: { color: "F7F8FB" }, line: { color: "D5DEEA", width: 0.75 } });
    s.addShape("rect", { x: x + 0.45, y, w: 1.9, h: 0.34, fill: { color: "A9B8F0" }, line: { type: "none" } });
    text(s, "KEY TAKEAWAY", { x: x + 0.45, y, w: 1.9, h: 0.34, fontSize: 11.5, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1 });
    kit.icon(s, "FaPaperclip", x + 0.05, y - 0.04, 0.34, "7A869A");
    text(s, t, { x: x + 0.2, y: y + 0.4, w: w - 0.4, h: h - 0.5, fontSize: 11, bold: true, color: T.navy, valign: "middle" });
  };
  const CRUMBS = ["Summary", "Problem", "Product", "Technology", "Trust", "Business", "The Ask", "Appendix"];
  const CRUMB_ICONS = ["FaClipboardList", "FaTriangleExclamation", "FaMobileScreen", "FaGears", "FaShieldHalved", "FaIndianRupeeSign", "FaBullseye", "FaBookOpen"];
  const crumb = (s, active) => {
    const n = CRUMBS.length, ov = 0.2, w = (CWD + ov * (n - 1)) / n;
    CRUMBS.forEach((c, i) => {
      const x = L + i * (w - ov), on = i === active;
      s.addShape(i === 0 ? "homePlate" : "chevron", { x, y: 0.07, w, h: 0.3, fill: { color: on ? "D4A24C" : (i % 2 ? "5B8DC9" : "2E6DB4") }, line: { color: T.white, width: 1.5 } });
      kit.icon(s, CRUMB_ICONS[i], x + (i === 0 ? 0.12 : 0.3), 0.11, 0.2, on ? T.navy : T.white);
      text(s, c.toUpperCase(), { x: x + (i === 0 ? 0.36 : 0.54), y: 0.07, w: w - 0.9, h: 0.3, fontSize: 9, bold: true, color: on ? T.navy : T.white, valign: "middle", charSpacing: 0.6 });
    });
  };
  // content(section, subtitle, rubric, [HEADING, crumb index]); the rubric goes to the speaker notes
  const content = (section, title, rub, head) => {
    const s = pres.addSlide({ masterName: (["THE PROBLEM","THE PRODUCT","HONEST RANGES","VALIDATION, RISKS"].some((k) => head[0].startsWith(k)) ? "CONTENT" : ["STRESS-TESTING","KNOW EVERY","GO-TO-MARKET"].some((k) => head[0].startsWith(k)) ? "CONTENT_SOFT" : "CONTENT_BLANK"), sectionTitle: section });
    rect(s, 0, 0, 13.333, 0.06, T.tealDark);
    crumb(s, head[1]);
    {
      const FLAT = { "EXECUTIVE": "idea", "THE PROBLEM": "debt", "REALITY": "inspection", "SYSTEM ARCH": "data-protection", "THE PRODUCT": "multiple-smartphones", "KNOW EVERY": "heat-map", "EARLY WARNING": "alarm-clock", "HONEST RANGES": "statistics", "PRIVACY": "privacy", "BUSINESS MODEL": "money-transfer", "GO-TO-MARKET": "globe", "VALIDATION": "approval", "APPENDIX 1": "line-chart", "APPENDIX 2": "timeline", "APPENDIX 3": "database", "APPENDIX 4": "rules", "APPENDIX 5": "survey", "APPENDIX 6": "questions", "APPENDIX 7": "data-sheet", "APPENDIX 8": "shop", "STRESS": "inspection" };
      const key = Object.keys(FLAT).find((k) => head[0].toUpperCase().startsWith(k));
      if (key) {
        s.addShape("ellipse", { x: 12.2, y: 0.46, w: 0.68, h: 0.68, fill: { color: "F4F8FD" }, line: { color: "A9C3E4", width: 1, dashType: "dash" } });
        pic(s, "flat/" + FLAT[key] + ".png", 12.3, 0.56, 0.48, 0.48, "Icon: " + FLAT[key]);
        if (false) text(s, "SECTION " + (head[1] + 1) + " OF 8", { x: 10.4, y: 0.69, w: 1.6, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, align: "right", valign: "middle", charSpacing: 1 });
      }
    }
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
  const foot = (s, t) => text(s, t, { x: L, y: 7.02, w: 12.4, h: 0.22, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
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
  // chip: small tinted status label
  const stat = (s, label, x, y, w, kind) => {
    const k = { built: [T.tealDark, T.white, null], build: ["D4A24C", T.navy, null], design: [T.white, T.muted, "9AA6B5"] }[kind];
    s.addShape("rect", { x, y, w, h: 0.2, fill: { color: k[0] }, line: k[2] ? { color: k[2], width: 1 } : { type: "none" } });
    text(s, label, { x, y, w, h: 0.2, fontSize: 7.5, bold: true, color: k[1], align: "center", valign: "middle", charSpacing: 0.5 });
  };

  // ---- v4 whiteboard layer ----
  const ASSET = (n) => path.join(__dirname, "..", "assets", n);
  const dd = (s, name, x, y, w, h, rot = 0) => s.addImage({ path: ASSET("doodle_" + name + ".png"), x, y, w, h, rotate: rot, altText: "hand-drawn " + name });
  const STICKY = { y: ["FBE9A0", "8A6D00"], o: ["FDCB9A", "8A4B00"], p: ["F7BFD0", "8A2C4B"], b: ["BFE0F7", "1F4A82"], g: ["CDEBC5", "2F6B2A"], v: ["D9C9F2", "4B2F8A"] };
  let stickyN = 0;
  // coloured sticky note with tape and a soft shadow; kind y/o/p/b/g/v
  const sticky = (s, x, y, w, h, t, kind, rot = -2) => {
    const k = STICKY[kind || "yopbgv"[stickyN++ % 6]];
    s.addShape("rect", { x: x + 0.05, y: y + 0.06, w, h, fill: { color: "C9CED6", transparency: 55 }, line: { type: "none" }, rotate: rot });
    s.addShape("rect", { x, y, w, h, fill: { color: k[0] }, line: { type: "none" }, rotate: rot });
    text(s, t, { x: x + 0.06, y: y + 0.04, w: w - 0.12, h: h - 0.06, fontFace: "Segoe Print", fontSize: 8.5, color: k[1], align: "center", valign: "middle", rotate: rot });
    s.addImage({ path: ASSET("doodle_tape.png"), x: x + w / 2 - 0.3, y: y - 0.1, w: 0.6, h: 0.19, rotate: rot * 0.6 });
  };
  const note = (s, x, y, w, h, t, rot = -2) => sticky(s, x, y, w, h, t, null, rot);
  const cur = (s, who, x, y) => s.addImage({ path: ASSET("doodle_cur_" + who + ".png"), x, y, w: 0.85, h: 0.36, altText: who + " cursor" });
  const hl = (s, kind, x, y, w, h) => dd(s, "hl_" + kind, x, y, w, h);
  const ul = (s, kind, x, y, w, h = 0.16) => dd(s, "ul_" + kind, x, y, w, h);
  const ring = (s, x, y, w, h, c = "c") => dd(s, "circle_" + c, x, y, w, h);
  const pmtag = (s, label, x, y, w, color) => {
    s.addShape("roundRect", { x, y, w, h: 0.2, rectRadius: 0.1, fill: { color: color || T.tealDark }, line: { type: "none" } });
    text(s, label, { x, y, w, h: 0.2, fontSize: 7.5, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 0.6 });
  };
  // frame label above a block, like a Miro frame title
  const flabel = (s, label, x, y) => text(s, "▭ " + label, { x, y, w: 3, h: 0.18, fontSize: 7.5, color: T.muted });
  // ================================================================ 1 TITLE
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    ellipse(s, 7.4, 0.0, 5.4, 5.4, T.orangeT);
    text(s, "CASE B  ·  NEXTUTE × FINANCE CLUB, IIT PATNA", { x: L, y: 0.5, w: 7, h: 0.3, fontSize: 11.5, bold: true, color: T.teal, charSpacing: 2 });
    s.addText("PRAGATI", { placeholder: "title" });
    text(s, "The Data Moat", { x: L, y: 2.3, w: 6, h: 0.5, fontSize: 28, bold: true, color: T.teal });
    rect(s, L, 2.85, 1.2, 0.05, T.tealDark);
    text(s, "Every student's weak topics, found before the exam.", { x: L, y: 3.0, w: 5.6, h: 0.7, fontSize: 18, color: T.ink });
    // messy data nodes turning into a clean grid
    let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const pts = []; for (let i = 0; i < 13; i++) pts.push([L + 0.1 + rnd() * 1.9, 3.85 + rnd() * 0.75]);
    pts.forEach((p, i) => pts.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.75) kit.line(s, p[0], p[1], q[0], q[1], { color: "B9CBE4", w: 0.8 }); }));
    pts.forEach((p, i) => ellipse(s, p[0] - 0.05, p[1] - 0.05, 0.1, 0.1, i % 3 === 0 ? T.orange : T.tealDark));
    kit.line(s, 2.55, 4.22, 3.1, 4.22, { color: T.tealDark, w: 2.5, arrow: true });
    const shades = ["E3ECF7", "C9DBF0", "7FA6D6", "2E6DB4", "1F4A82"];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) rect(s, 3.25 + c * 0.45, 3.85 + r * 0.27, 0.42, 0.25, shades[(r * 2 + c * 3 + (c > 3 ? 1 : 0)) % 5]);
    text(s, "Excel · OMR · WhatsApp", { x: L, y: 4.62, w: 2.2, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    text(s, "one clear topic map", { x: 3.25, y: 4.68, w: 2.7, h: 0.22, fontSize: 8.5, italic: true, color: T.muted });
    const rb = [["0.76", "Prediction accuracy score", "public data; rival 0.75"], ["2", "Public datasets, not just ours", "Open Univ. and ASSISTments"], ["₹3.6", "per student per month", "all-in, one laptop"]];
    rb.forEach((r, i) => {
      const x = L + i * 1.98;
      rect(s, x, 5.15, 1.88, 0.5, T.tealDark);
      text(s, r[0], { x, y: 5.15, w: 1.88, h: 0.5, fontSize: 22, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x, y: 5.65, w: 1.88, h: 0.85, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      text(s, [{ text: r[1], options: { bold: true, fontSize: 10.5, color: T.navy, breakLine: true } }, { text: r[2], options: { fontSize: 8.5, color: T.muted } }], { x: x + 0.06, y: 5.65, w: 1.76, h: 0.85, align: "center", valign: "middle" });
    });
    text(s, "IMPACT RIBBON", { x: L, y: 4.93, w: 3, h: 0.2, fontSize: 8, bold: true, color: T.muted, charSpacing: 2 });
    text(s, "Team AlphaQ  ·  Round 1  ·  Version 4.2", { x: L, y: 6.7, w: 5, h: 0.3, fontSize: 11, color: T.muted });
    pic(s, "web_console.png", 6.55, 0.75, 6.3, 3.54, "Pragati web console (illustrative)");
    pic(s, "app_scan.png", 7.0, 3.4, 1.75, 3.5, "Pragati scan screen on a phone (illustrative)");
    pic(s, "app_mentor.png", 8.85, 3.15, 1.75, 3.5, "Pragati mentor app (illustrative)");
    pic(s, "app_parent.png", 10.7, 3.4, 1.75, 3.5, "Pragati parent app (illustrative)");
    
    foot(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT protocol; OULAD); financial model v1.1, Base. Screens are illustrative mock-ups with synthetic students.");

    ul(s, "swoosh", 0.45, 2.02, 3.5, 0.26); hl(s, "y", 2.05, 3.03, 1.32, 0.3);
    sticky(s, 4.55, 1.05, 1.55, 0.78, "Your Excel in. A weekly list out.", "y", -4); dd(s, "arrow_d", 6.1, 1.65, 0.7, 0.2, -10);
    cur(s, "mentor", 10.25, 3.9); cur(s, "parent", 11.75, 5.2);
    s.addNotes("DESIGN INTENT: Aha moment first: the topic grid is the product in one picture. Benchmarking against a published rival (0.76 vs 0.75) anchors credibility. | Title. 0.76 is the next-answer AUC on ASSISTments 2009 (published DKT 0.754). Two public datasets: ASSISTments 2009 and OULAD. 3.6 rupees is the all-in cost per student per month (financial model v1.1, Base).");
  }

  // ================================================================ 2 EXECUTIVE SUMMARY
  pres.addSection({ title: "Summary" });
  {
    const s = content("Summary", "Small institutes already hold the data. Pragati turns it into a weekly to-do list for mentors, at a price owners can say yes to", "All criteria", ["EXECUTIVE SUMMARY", 0]);
    const scr = [["SITUATION", [{ text: "Tier-2 and Tier-3 JEE/NEET institutes (150 to 1,200 students) run on " }, { text: "paper OMR sheets, Excel and WhatsApp.", options: { bold: true } }, { text: " 22.8 lakh NEET and about 15.4 lakh JEE Main candidates registered in 2025." }]],
      ["COMPLICATION", [{ text: "A 400-student institute loses about " }, { text: "₹17 lakh a year", options: { bold: true } }, { text: " to mid-session dropouts, noticed only after students leave. Generic apps store marks but give no topic view or warning, and " }, { text: "DPDP s.9(3) bars behavioural tracking of minors.", options: { bold: true } }]],
      ["RESOLUTION", [{ text: "Pragati: ", options: { bold: true } }, { text: "OMR photo or Excel in; topic mastery, a weekly support list with plain reasons and checked Hindi and English parent reports out. Runs offline on one laptop for " }, { text: "₹3.6 per student per month.", options: { bold: true } }]]];
    scr.forEach((c, i) => {
      const y = 1.22 + i * 1.08;
      rect(s, L, y, 1.25, 0.98, i === 1 ? T.teal : T.tealDark);
      text(s, c[0], { x: L, y, w: 1.25, h: 0.98, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle", charSpacing: 1 });
      s.addShape("rect", { x: L + 1.25, y, w: 4.85, h: 0.98, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      text(s, c[1], { x: L + 1.38, y: y + 0.04, w: 4.62, h: 0.9, fontSize: 10.5, color: T.ink, valign: "middle" });
    });
    hdrBar(s, L, 4.5, 6.1, "WHY IT WINS ON THE RUBRIC (70 % TECHNOLOGY · 30 % BUSINESS)", { h: 0.3, size: 10.5 });
    const rb = [["FaSitemap", "Architecture 25", "Local-first, 31 tables with row-level security tested on PostgreSQL 16; 116 automated tests."],
      ["FaChartLine", "ML rigour 25", "Measured on public data against baselines: 0.763 AUC (DKT 0.754); precision 0.46 vs 0.24 to 0.31 for rules."],
      ["FaUserShield", "Privacy and safety 20", "Age- and purpose-aware routing; academic-only features cost just 0.008 AUC; every report checked."],
      ["FaIndianRupeeSign", "Business 30", "1.7x owner return with admissions, 0.55x on hard benefits; LTV/CAC 3.6x; bear case shown."]];
    for (let i = 0; i < 4; i++) {
      const x = L + (i % 2) * 3.08, y = 4.88 + Math.floor(i / 2) * 1.02;
      s.addShape("rect", { x, y, w: 3.02, h: 0.94, fill: { color: T.tint }, line: { color: T.line, width: 0.75 } });
      await abadge(s, rb[i][0], x + 0.1, y + 0.1, 0.36, i);
      text(s, rb[i][1], { x: x + 0.54, y: y + 0.07, w: 2.4, h: 0.28, fontSize: 11, bold: true, color: T.tealDark, valign: "middle" });
      text(s, rb[i][2], { x: x + 0.54, y: y + 0.36, w: 2.42, h: 0.56, fontSize: 9, color: T.ink });
    }
    const rx = 6.75, rw = R - 6.75;
    const kp = [["0.763", "next-answer AUC on ASSISTments", "PUBLIC DATA"], ["0.46", "precision at top 10 % (rules 0.24 to 0.31)", "PUBLIC DATA"], ["1.7x", "owner return, base (0.55x hard benefits)", "MODEL OUTPUT"], ["3.6x", "LTV ÷ CAC, base (4.8x undiscounted)", "MODEL OUTPUT"]];
    const kw = (rw - 0.3) / 4;
    kp.forEach((k, i) => {
      const x = rx + i * (kw + 0.1);
      s.addShape("rect", { x, y: 1.22, w: kw, h: 1.18, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
      rect(s, x, 1.22, kw, 0.06, T.tealDark);
      text(s, k[0], { x, y: 1.3, w: kw, h: 0.48, fontSize: 24, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, k[1], { x: x + 0.06, y: 1.77, w: kw - 0.12, h: 0.42, fontSize: 9, color: T.ink, align: "center", valign: "middle" });
      text(s, k[2], { x, y: 2.17, w: kw, h: 0.2, fontSize: 7.5, bold: true, color: T.muted, align: "center", valign: "middle", charSpacing: 1 });
    });
    // the Pragati loop: ring of six steps (v2 diagram) shrunk beside the table
    hdrBar(s, rx, 2.52, rw, "THE PRAGATI LOOP: CAPTURE → STRUCTURE → ESTIMATE → FLAG → ACT → REPORT", { h: 0.28, size: 10 });
    const lp = [["FaCamera", "Capture", "OMR photo, Excel"], ["FaDiagramProject", "Structure", "380-topic map"], ["FaBrain", "Estimate", "Mastery per topic"], ["FaFlag", "Flag", "Weekly list, reasons"], ["FaHandshake", "Act", "Call, session, log"], ["FaFileLines", "Report", "Checked Hindi / English"]];
    const lw = rw / 6;
    for (let i = 0; i < 6; i++) {
      const cx = rx + i * lw;
      if (i < 5) kit.line(s, cx + lw / 2 + 0.3, 3.15, cx + lw * 1.5 - 0.3, 3.15, { color: T.line, w: 1.5, arrow: true });
      await abadge(s, lp[i][0], cx + lw / 2 - 0.27, 2.88, 0.54, i);
      text(s, lp[i][1], { x: cx, y: 3.46, w: lw, h: 0.22, fontSize: 10, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, lp[i][2], { x: cx + 0.03, y: 3.67, w: lw - 0.06, h: 0.36, fontSize: 8.5, color: T.muted, align: "center" });
    }
    dtable(s, rx, 4.1, [1.15, 3.2, rw - 4.35], ["Build choice", "What we use", "Why"], [
      ["OMR capture", "Corner marks and QR; unclear bubbles sent back", "No scanner, works offline"],
      ["Topic mastery", "2-parameter IRT, guessing prior; Rasch if small", "Explains itself on sparse tests"],
      ["Early warning", "Calibrated LightGBM; rules for minors' dropout", "Legal for under-18s"],
      ["Percentile", "Quantile model, conformal band, NTA table", "A range, never a rank promise"],
      ["Parent report", "Facts, local model, 8 checks, template fallback", "No invented numbers"]],
      { rowH: 0.27, headH: 0.27, size: 9, headFill: T.tealDark, leftCols: [1, 2] });
    rect(s, rx, 5.82, rw, 1.1, T.tealDark);
    await icon(s, "FaLayerGroup", rx + 0.2, 6.1, 0.5, T.white);
    text(s, "THE MOAT", { x: rx + 0.9, y: 5.88, w: 3, h: 0.28, fontSize: 12, bold: true, color: "F1D9A0", valign: "middle", charSpacing: 1 });
    text(s, "Every institute adds answers that sharpen question difficulty for all (pooled item statistics, no raw child records shared), and every logged call teaches which actions work. A new rival starts with an uncalibrated question bank and no outcome history.", { x: rx + 0.9, y: 6.15, w: rw - 1.05, h: 0.74, fontSize: 9.5, color: T.white });
    note(s, 11.0, 0.7, 1.85, 0.42, "start with the weekly list", -2);
    foot(s, "Sources: NTA NEET UG 2025 result data; JEE Main 2025 unique registrations as reported (secondary); case guide baselines; public validation results; financial model v1.1 (Base). Full register: Appendix 8.");

    cur(s, "owner", 12.0, 6.5);
    pmtag(s, "GOAL", 1.68, 1.12, 0.5, "E0584A"); pmtag(s, "USERS", 1.68, 2.2, 0.55, "2E6DB4"); pmtag(s, "METRIC", 1.68, 3.28, 0.62, "3C9664");
    s.addNotes("DESIGN INTENT: Primacy and chunking: situation, complication, resolution, then the rubric. One block, one colour. | Executive summary in situation, complication, resolution form. Public-data figures are measured. 1.7x owner return counts fees kept, staff time and a 1 % admissions uplift; 0.55x counts only fees kept and staff time. LTV/CAC 3.6x is discounted (4.8x undiscounted). All from financial model v1.1.");
  }

  // ================================================================ 3 PROBLEM
  pres.addSection({ title: "Problem" });
  {
    const s = content("Problem", "Institutes have the marks, but notice a struggling student only after that student has already left", "Problem framing", ["THE PROBLEM: LEAKY REVENUE, MESSY DATA", 1]);
    kit.panels("mix");
    // top-left: friction matrix
    frame(s, L, 1.22, 4.75, 2.9, "WHO LOSES TODAY: THE FRICTION MATRIX");
    const fm = [["FaChalkboardUser", "Teachers", ["Check OMR sheets by hand", "See weak topics after exams", "No time for each student"]], ["FaBuilding", "Owners", ["Can't compare batches", "Learn of dropouts too late", "Apps store marks, no insight"]],
      ["FaUsers", "Parents", ["Get a marks list, nothing more", "Can't tell if child improves", "Trust slips, fee questions grow"]], ["FaChildReaching", "Students", ["Struggle quietly for weeks", "Same plan as whole batch", "Noticed when they stop coming"]]];
    for (let i = 0; i < 4; i++) {
      const x = L + 0.1 + (i % 2) * 2.3, y = 1.66 + Math.floor(i / 2) * 1.2;
      s.addShape("rect", { x, y, w: 2.22, h: 1.14, fill: { color: i === 1 || i === 2 ? T.tint : T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, y, 2.22, 0.27, T.tealDark);
      await icon(s, fm[i][0], x + 0.07, y + 0.04, 0.19, T.white);
      text(s, fm[i][1], { x: x + 0.32, y, w: 1.85, h: 0.27, fontSize: 10.5, bold: true, color: T.white, valign: "middle" });
      lines(s, fm[i][2], x + 0.06, y + 0.3, 2.1, 0.82, { size: 9, gap: 1 });
    }
    // top-middle: where the data lives -> bottleneck funnel
    frame(s, 5.3, 1.22, 4.35, 2.9, "WHERE THE DATA LIVES");
    const src = [["FaFileExcel", "Excel"], ["FaFileLines", "OMR sheets"], ["FaWhatsapp", "WhatsApp"]];
    for (let i = 0; i < 3; i++) {
      const x = 5.4 + i * 1.42;
      s.addShape("rect", { x, y: 1.66, w: 1.35, h: 0.4, fill: { color: T.greyLight }, line: { color: T.grey, width: 1, dashType: "dash" } });
      await icon(s, src[i][0], x + 0.07, 1.74, 0.24, T.muted);
      text(s, src[i][1], { x: x + 0.36, y: 1.66, w: 0.98, h: 0.4, fontSize: 9, bold: true, color: T.muted, valign: "middle" });
    }
    const tiers = [[4.1, "Messy, unconnected data", "No topic view. No early warning.", "9AA6B5"], [3.0, "The bottleneck", "Staff time, no analysis", "5B8DC9"], [2.0, "Pragati", "Topic map + weekly list", T.tealDark]];
    tiers.forEach((t, i) => {
      const y = 2.2 + i * 0.62, x = 5.3 + (4.35 - t[0]) / 2;
      s.addShape("trapezoid", { x, y, w: t[0], h: 0.56, flipV: true, fill: { color: t[3] }, line: { color: T.white, width: 1.5 } });
      text(s, [{ text: t[1], options: { bold: true, fontSize: 10, breakLine: true } }, { text: t[2], options: { fontSize: 8 } }], { x: x + 0.25, y, w: t[0] - 0.5, h: 0.56, color: T.white, align: "center", valign: "middle" });
    });
    // top-right: leaky revenue
    frame(s, 9.75, 1.22, 3.13, 2.9, "LEAKY REVENUE");
    const ks = [["8-15 %", "of students drop out or default mid-session"], ["₹36,000", "fees lost per dropout at month 4"], ["₹17.3 lakh", "fees at risk a year (400 students, 12 %)"]];
    ks.forEach((k, i) => {
      const y = 1.64 + i * 0.7;
      rect(s, 9.85, y, 2.93, 0.64, C2.gold);
      text(s, k[0], { x: 9.92, y, w: 1.3, h: 0.64, fontSize: 16, bold: true, color: i === 2 ? T.red : T.navy, valign: "middle" });
      text(s, k[1], { x: 11.2, y, w: 1.55, h: 0.64, fontSize: 8.5, valign: "middle" });
    });
    tag(s, "ps", 9.85, 3.78, { size: 8, h: 0.2 });
    note(s, 11.25, 3.72, 1.55, 0.32, "this is real cash", 3);
    // bottom row
    frame(s, L, 4.25, 4.75, 2.7, "WHO WE SERVE");
    const mk = [["22.8 L", "NEET UG 2025 registered candidates", "NTA result data"], ["15.4 L", "JEE Main 2025 unique registrations", "reported, secondary"], ["27 %", "of school students take private coaching", "NSO survey 2025"]];
    mk.forEach((m, i) => {
      const y = 4.68 + i * 0.47;
      text(s, m[0], { x: L + 0.1, y, w: 1.1, h: 0.42, fontSize: 17, bold: true, color: T.tealDark, valign: "middle" });
      text(s, [{ text: m[1], options: { breakLine: true } }, { text: m[2], options: { italic: true, color: T.muted, fontSize: 8 } }], { x: L + 1.25, y, w: 3.4, h: 0.42, fontSize: 9.5, color: T.ink, valign: "middle" });
    });
    rect(s, L + 0.1, 6.14, 4.55, 0.7, T.tint);
    text(s, [{ text: "Ceiling, not a forecast: ", options: { bold: true, color: T.tealDark } }, { text: "if every JEE and NEET aspirant's institute paid ₹30 a month, the pool is about ₹137 crore a year (38 lakh x ₹360)." }], { x: L + 0.18, y: 6.14, w: 4.4, h: 0.7, fontSize: 8.5, color: T.ink, valign: "middle" });
    frame(s, 5.3, 4.25, 4.35, 2.7, "THE BUYER'S CONSTRAINTS");
    const cons = [["FaIndianRupeeSign", "Price-sensitive", "Rivals list ₹4 to ₹21 a student a month."], ["FaTable", "Low-tech staff", "Excel, registers and a phone camera."], ["FaWifi", "Patchy internet", "So it must work offline, on one laptop."], ["FaUserShield", "Minors' data", "DPDP Act and MoE rules apply."]];
    for (let i = 0; i < 4; i++) {
      const x = 5.4 + (i % 2) * 2.1, y = 4.68 + Math.floor(i / 2) * 1.12;
      rect(s, x, y, 2.0, 1.04, C2.soft);
      await abadge(s, cons[i][0], x + 0.08, y + 0.08, 0.34, i);
      text(s, cons[i][1], { x: x + 0.5, y: y + 0.05, w: 1.45, h: 0.38, fontSize: 10.5, bold: true, valign: "middle" });
      text(s, cons[i][2], { x: x + 0.08, y: y + 0.48, w: 1.85, h: 0.52, fontSize: 9 });
    }
    frame(s, 9.75, 4.25, 3.13, 2.7, "WHAT PRAGATI DOES");
    const wd = ["Topic-level view of every student", "A short, supportive list each week", "An honest percentile range", "Verified Hindi and English reports", "Runs offline, free to run"];
    for (let i = 0; i < wd.length; i++) {
      await icon(s, "FaCircleCheck", 9.88, 4.7 + i * 0.37, 0.2, T.tealDark);
      text(s, wd[i], { x: 10.15, y: 4.64 + i * 0.37, w: 2.65, h: 0.32, fontSize: 9.5, valign: "middle" });
    }
    labelBar(s, 9.85, 6.58, 2.93, "Next: how it works", { h: 0.27, size: 10 });
    foot(s, "Sources: Participant Guide §2, §6, §7 (illustrative baselines); NTA NEET UG 2025 result data; JEE Main 2025 statistics (secondary); NSO CMS Education 2025; vendor listings (research R1).");

    ul(s, "wave", 9.88, 3.4, 1.4, 0.14); sticky(s, 2.95, 3.68, 1.55, 0.4, "HMW tell mentors who to call?", "g", -3);
    s.addNotes("DESIGN INTENT: Loss aversion: the lost rupees are the one red number on the slide. Framing: the buyer's loss, not our features. | The 8-15 percent dropout, 36,000 rupee loss per leaver and 17.3 lakh total are the guide's illustrative baselines (400 x 12 % x 36,000). Market numbers: financial/research/R7_market_check.md.");
  }

  // ================================================================ STRESS-TEST THE GUIDE
  {
    const s = content("Problem", "The guide's example looks great on paper. Here is where each number breaks, and what we build instead", "Feasibility · business realism", ["STRESS-TESTING THE GUIDE", 1]);
    sec(s, 1, "SIX ASSUMPTIONS, TESTED", L, 1.22, 8);
    const g = (t) => ({ t, bold: true, color: T.tealDark });
    dtable(s, L, 1.58, [1.75, 3.2, 3.2], ["Hypothesis (the guide)", "Evidence", "Decision (what we do)"], [
      [g("₹40 per student per month"), "Generic institute apps list at ₹4 to ₹21 per student per month. ₹40 x 400 students = ₹1.92 lakh a year.", "List ₹30, tested from ₹20 to ₹40. Willingness to pay goes to owner interviews first."],
      [g("25 % of dropouts prevented"), "8 trials in comparable settings average 15.8 % among students who get outreach; month-1 leavers cannot be flagged.", "Model 4.0 % effective reduction. Prove it with comparison batches in a pilot."],
      [g("Saved fees pay for the product"), "Fees kept alone return 0.35x of the cost.", "Lead with staff time and parent reports: fees plus time reach 0.55x; admissions close the gap."],
      [g("LTV / CAC of 10.7x"), "Seasonal billing, 20 % post-exam non-renewal and pilots that do not convert.", "3.6x in base; small institutes use channel partners (3.4x, not 1.5x)."],
      [g("Published AUC of 0.794"), "Our honest student-grouped estimate on OULAD is 0.706; leakage inflates many reported numbers.", "Judge on precision at mentor capacity: 0.46 vs 0.24 to 0.31 for rules."],
      [g("Track app activity for everyone"), "DPDP s.9(3) bans behavioural monitoring of children, even with consent.", "Academic data only for under-18s; it costs 0.008 AUC on OULAD."]],
      { rowH: 0.6, headH: 0.3, size: 9.5, headFill: T.tealDark, leftCols: [1, 2], rowStyles: ["white", "band", "white", "band", "white", "band"] });
    // ---- reframe
    const rx = 8.75, rw = R - 8.75;
    s.addShape("rect", { x: rx, y: 1.22, w: rw, h: 4.32, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    hdrBar(s, rx, 1.22, rw, "DECISION REFRAME", { h: 0.32, size: 11 });
    text(s, "The wrong question", { x: rx + 0.2, y: 1.66, w: rw - 0.4, h: 0.24, fontSize: 9.5, color: T.muted });
    text(s, "\"Can a model predict who drops out?\"", { x: rx + 0.2, y: 1.9, w: rw - 0.4, h: 0.32, fontSize: 13, bold: true, color: T.grey, strike: "sngStrike" });
    text(s, "The right question", { x: rx + 0.2, y: 2.32, w: rw - 0.4, h: 0.24, fontSize: 9.5, color: T.muted });
    text(s, "\"Of the eight students a mentor can call this week, are they the right eight, and does the call help?\"", { x: rx + 0.2, y: 2.56, w: rw - 0.4, h: 0.95, fontSize: 14, bold: true, color: T.tealDark });
    chevrow(s, rx + 0.15, 3.62, rw - 0.3, 0.42, [{ t: "Score" }, { t: "Explain" }, { t: "Assign" }, { t: "Log" }], { size: 10, depth: 0.16 });
    text(s, "A model with a high AUC that produces a list nobody calls is worth nothing. We cap the list at mentor capacity and judge the system on students retained and actions taken, not on AUC.", { x: rx + 0.2, y: 4.12, w: rw - 0.4, h: 0.8, fontSize: 10, color: T.ink });
    [["8", "students per batch per week: the list cap"], ["=", "same workload as the institute's own rule"], ["1", "logged outcome for every flag"]].forEach((k, i) => {
      const y = 4.9 + i * 0.2;
      text(s, k[0], { x: rx + 0.2, y, w: 0.35, h: 0.2, fontSize: 10.5, bold: true, color: T.tealDark, align: "center", valign: "middle" });
      text(s, k[1], { x: rx + 0.6, y, w: rw - 0.8, h: 0.2, fontSize: 9, color: T.ink, valign: "middle" });
    });
    // ---- principles
    sec(s, 2, "FOUR DESIGN PRINCIPLES THAT FOLLOW", L, 5.68, 8);
    const pr = [["FaUserShield", "Support, never surveillance", "Risk lists go to mentors only; no ranks for students or parents."], ["FaUsers", "Sized to mentor capacity", "A short weekly list, compared with the institute's own rule at equal workload."],
      ["FaListCheck", "Every number checked", "Reports are verified in code; a template goes out if any check fails."], ["FaLaptop", "Free and offline first", "One laptop, local models, no paid services; syncs when the network returns."]];
    for (let i = 0; i < 4; i++) {
      const x = L + i * 3.13;
      s.addShape("rect", { x, y: 6.02, w: 3.04, h: 0.88, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, 6.02, 0.5, 0.88, T.tealDark);
      await icon(s, pr[i][0], x + 0.11, 6.28, 0.28, T.white);
      text(s, pr[i][1], { x: x + 0.6, y: 6.05, w: 2.38, h: 0.26, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, pr[i][2], { x: x + 0.6, y: 6.31, w: 2.38, h: 0.56, fontSize: 9, color: T.ink });
    }
    note(s, 11.0, 0.7, 1.85, 0.42, "we cut our own numbers first", 2);
    source(s, "Sources: case guide; financial/research (vendor listings R1, outreach trials R4); financial workbook (Base: 4.0 % reduction, 0.35x fees only); OULAD results in ml/public_validation; PLOS ONE 2026; DPDP Act 2023 s.9(3).");

    hl(s, "y", 8.95, 2.58, 3.7, 0.5);
    s.addNotes("DESIGN INTENT: Pratfall effect and anchoring: we cut the guide's numbers ourselves, which earns belief in the numbers we keep. | This slide shows judges we tested the guide's illustrative numbers instead of copying them. Every 'what we do' value is a workbook output or a measured public-data result. Mentor capacity of eight per batch per week is the cap used in the mock-ups and the early-warning evaluation.");
  }

  // ================================================================ PRODUCT
  pres.addSection({ title: "Product" });
  {
    const s = content("Product", "One product, two surfaces: a web console for the office and a phone app for mentors and parents", "Architecture · product", ["THE PRODUCT", 2]);
    s.addShape("rect", { x: L, y: 1.22, w: 6.4, h: 3.6, fill: { color: T.white }, line: { color: T.tealDark, width: 1.25 } });
    pic(s, "web_console.png", L + 0.02, 1.24, 6.36, 3.56, "Pragati web console (illustrative)");
    hdrBar(s, L, 4.86, 6.4, "WEB CONSOLE · owner, teacher and compliance views", { h: 0.27, size: 10 });
    rect(s, 6.98, 1.22, R - 6.98, 3.6, T.orangeT);
    const ph = ["Scan an OMR sheet", "Mentor: this week's list", "Parent: Hindi or English"];
    ["app_scan.png", "app_mentor.png", "app_parent.png"].forEach((f, i) => pic(s, f, 7.08 + i * 1.94, 1.27, 1.75, 3.5, ph[i] + " (illustrative)"));
    hdrBar(s, 6.98, 4.86, R - 6.98, "PHONE APP · scan sheets, weekly list, parent view", { h: 0.27, size: 10 });
    callout(s, 1, 8.45, 4.3, 0.3); callout(s, 2, 2.3, 3.1, 0.3); callout(s, 3, 9.85, 2.45, 0.3); callout(s, 4, 11.8, 3.35, 0.3);
    note(s, 11.0, 0.7, 1.85, 0.42, "tap, fix, done", -2);
    // ---- who sees what
    sec(s, 1, "WHO SEES WHAT", L, 5.25, 7.9);
    const roles = [["FaBuilding", "Owner", "Web console", ["Batch comparison, retention", "Actions done, outcomes", "Compliance exports"]],
      ["FaChalkboardUser", "Teacher and mentor", "Web and phone", ["Topic heatmap, wrong keys", "Weekly list with reasons", "Log what was done"]],
      ["FaUserGraduate", "Student", "Phone (web app)", ["Own topic mastery", "Practice on weak topics", "Never a risk score"]],
      ["FaUsers", "Parent", "Phone or WhatsApp", ["Weekly Hindi / English note", "What improved, what next", "No peer ranks"]]];
    for (let i = 0; i < 4; i++) {
      const x = L + i * 1.98, y = 5.6;
      s.addShape("rect", { x, y, w: 1.9, h: 1.32, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      rect(s, x, y, 1.9, 0.3, T.tealDark);
      await icon(s, roles[i][0], x + 0.08, y + 0.05, 0.2, T.white);
      text(s, roles[i][1], { x: x + 0.34, y, w: 1.52, h: 0.3, fontSize: 10, bold: true, color: T.white, valign: "middle" });
      text(s, roles[i][2], { x: x + 0.08, y: y + 0.32, w: 1.76, h: 0.22, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });
      lines(s, roles[i][3], x + 0.05, y + 0.54, 1.82, 0.78, { size: 8.5, gap: 1 });
    }
    // ---- a week with pragati
    const wx = 8.5, ww = R - 8.5;
    sec(s, 2, "A WEEK WITH PRAGATI", wx, 5.25, ww);
    const wk = [["Mon", "Weekly test on OMR; sheets scanned on a phone"], ["Mon pm", "Topic map and wrong-key flags for the teacher"], ["Tue", "Mentor list of up to 8, each with reasons"], ["Wed", "Remedial session for the weakest topic"], ["Sat", "Checked Hindi / English note to parents"], ["Month", "Owner sees actions taken and outcomes"]];
    wk.forEach((w, i) => {
      const y = 5.6 + i * 0.22;
      rect(s, wx, y + 0.01, 0.72, 0.2, i % 2 ? T.teal : T.tealDark);
      text(s, w[0], { x: wx, y: y + 0.01, w: 0.72, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, w[1], { x: wx + 0.8, y, w: ww - 0.8, h: 0.22, fontSize: 9, color: T.ink, valign: "middle" });
    });
    source(s, "Illustrative mock-ups with synthetic students. Both surfaces use one API; the phone app is a progressive web app installed from the browser (no app-store fee).");

    cur(s, "owner", 3.9, 3.0); cur(s, "mentor", 9.7, 3.7); cur(s, "parent", 11.75, 2.2);
    sticky(s, 4.55, 3.85, 1.95, 0.8, "Job to be done: when a test ends, who do I call?", "y", -3); dd(s, "arrow_a", 6.8, 3.9, 0.6, 0.3, 0);
    s.addNotes("DESIGN INTENT: Jobs to be done: a mentor wants eight names, not 400. Show the work: both surfaces, one flow. | Product slide. Web console for the office, phone screens for scanning, mentors and parents. Who-sees-what follows the routing policy: risk lists only for mentors and owners; students and parents never see risk scores or ranks.");
  }

  // ================================================================ 5 ARCHITECTURE
  pres.addSection({ title: "Technology" });
  {
    const s = content("Technology", "Three layers, one rule: each institute's data stays its own. Four stages move paper to a parent message", "Architecture and engineering", ["SYSTEM ARCHITECTURE: THREE LAYERS, FOUR STAGES", 3]);
    const cx = 4.05;
    const layers = [["DELIVERY", "What people use", "FaDisplay", 5.8, T.tealDark, [["Web console", "Owner, teacher views"], ["Phone app", "Scan, list, parent view"], ["Hindi + English", "Reports, both languages"], ["Open export", "CSV and API"]]],
      ["INTELLIGENCE", "What it works out", "FaBrain", 6.5, T.teal, [["Topic mastery", "Weak topics (IRT)"], ["Early warning", "Who needs help (LightGBM)"], ["Honest ranges", "Percentile bands (conformal)"], ["Safe reports", "No invented numbers"]]],
      ["TRUST & DATA", "What keeps it safe", "FaShieldHalved", 7.2, T.navy, [["Row-level security", "Institutes never mix"], ["Consent gate", "No consent, no model"], ["Offline-first", "Works without internet"], ["Audit log", "Who saw what"]]]];
    for (let i = 0; i < 3; i++) {
      const [name, sub, ic, w, col, chips] = layers[i];
      const x = cx - w / 2, y = 1.25 + i * 1.3;
      rect(s, x + 0.05, y + 0.07, w, 1.2, "DDE3EC");
      s.addShape("rect", { x, y, w, h: 1.2, fill: { color: T.white }, line: { color: col, width: 1.5 } });
      rect(s, x, y, 1.45, 1.2, col);
      await icon(s, ic, x + 0.5, y + 0.14, 0.45, T.white);
      text(s, name, { x, y: y + 0.65, w: 1.45, h: 0.28, fontSize: 10.5, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, sub, { x, y: y + 0.9, w: 1.45, h: 0.24, fontSize: 8, color: "C9DBF0", align: "center", valign: "middle" });
      const cw = (w - 1.45 - 0.2) / 4;
      chips.forEach((c, k) => {
        const px = x + 1.52 + k * cw;
        s.addShape("rect", { x: px, y: y + 0.14, w: cw - 0.06, h: 0.92, fill: { color: T.tealTint }, line: { color: "B9CBE4", width: 0.75 } });
        text(s, [{ text: c[0], options: { bold: true, fontSize: 9.5, color: T.navy, breakLine: true } }, { text: c[1], options: { fontSize: 8, color: T.ink } }], { x: px + 0.04, y: y + 0.14, w: cw - 0.14, h: 0.92, valign: "middle", align: "center" });
      });
    }
    note(s, 6.4, 5.12, 1.4, 0.4, "one laptop, no cloud bill", 3);
    // evidence strip
    const ev = [["12 + 210", "messy files, synthetic OMR photos"], ["31 tables", "tenant isolation tested on PostgreSQL 16"], ["0.706 / 0.763", "public-data AUC: OULAD, ASSISTments"], ["20 + 8", "report templates and automatic checks"]];
    text(s, "EVIDENCE WE CAN SHOW", { x: L, y: 5.52, w: 3, h: 0.2, fontSize: 8, bold: true, color: T.muted, charSpacing: 1.5 });
    ev.forEach((e, i) => {
      const x = L + i * 1.83;
      s.addShape("rect", { x, y: 5.74, w: 1.76, h: 0.38, fill: { color: T.tealDark }, line: { type: "none" } });
      text(s, e[0], { x, y: 5.74, w: 1.76, h: 0.38, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, e[1], { x, y: 6.12, w: 1.76, h: 0.3, fontSize: 7.5, color: T.ink, align: "center", valign: "top" });
    });
    // right: stage-by-stage build status
    const tx = 7.85, tw = R - 7.85;
    hdrBar(s, tx, 1.25, tw, "FOUR STAGES: WHAT IS BUILT, IN BUILD, DESIGNED", { h: 0.3, size: 10 });
    const rows = [["1 CAPTURE", [["Excel and CSV mapper", "build"], ["OMR photo reader", "design"], ["Forms and WhatsApp import", "design"], ["Offline queue", "design"]]],
      ["2 STRUCTURE", [["Versioned answer keys", "build"], ["Question to topic tagging", "build"], ["Syllabus graph, 380 topics", "built"]]],
      ["3 INTELLIGENCE", [["Difficulty and wrong keys", "build"], ["Mastery with doubt", "build"], ["Early warning, routed by age", "build"], ["Percentile range", "build"]]],
      ["4 DELIVER", [["Verified parent report", "built"], ["Teacher and mentor views", "build"], ["Owner dashboard", "build"], ["Hindi and English", "built"]]]];
    let y = 1.6; const rh = 0.255;
    rows.forEach((g, gi) => {
      const col = [T.tealDark, T.teal, T.tealDark, T.teal][gi];
      rect(s, tx, y, 1.05, g[1].length * rh, col);
      text(s, g[0], { x: tx, y, w: 1.05, h: g[1].length * rh, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
      g[1].forEach((r, k) => {
        s.addShape("rect", { x: tx + 1.05, y: y + k * rh, w: tw - 1.05, h: rh, fill: { color: k % 2 ? T.white : T.tint }, line: { color: "E3E8EE", width: 0.5 } });
        text(s, r[0], { x: tx + 1.12, y: y + k * rh, w: tw - 2.25, h: rh, fontSize: 9, color: T.ink, valign: "middle" });
        stat(s, r[1] === "built" ? "BUILT" : r[1] === "build" ? "IN BUILD" : "DESIGNED", tx + tw - 0.85, y + k * rh + 0.027, 0.8, r[1]);
      });
      y += g[1].length * rh + 0.04;
    });
    s.addShape("rect", { x: tx, y: 5.6, w: tw, h: 0.82, fill: { color: T.tint }, line: { color: T.line, width: 1 } });
    lines(s, ["Local-first: laptop, local database, small local models", "Reports always send: a template covers any AI failure", "Phone photo read on the phone; 2 KB of answers uploaded"], tx + 0.1, 5.64, tw - 0.2, 0.76, { size: 8.5, gap: 1 });
    const tk = [["31", "tables, all isolated"], ["23", "API endpoints"], ["380", "syllabus topics"], ["116", "automated tests"], ["₹3.6", "per student a month"]];
    const tkw = (CWD - 0.4) / 5;
    tk.forEach((k, i) => {
      const x = L + i * (tkw + 0.1);
      rect(s, x, 6.55, tkw, 0.42, T.tealDark);
      text(s, [{ text: k[0] + "  ", options: { bold: true, fontSize: 15, color: T.white } }, { text: k[1], options: { fontSize: 9, color: "C9DBF0" } }], { x, y: 6.55, w: tkw, h: 0.42, align: "center", valign: "middle" });
    });
    foot(s, "Sources: technical/contracts (31 tables, 23 endpoints, 380 topics); tenant isolation tested on PostgreSQL 16; test suites; financial model v1.1 (₹3.6 all-in, Base). Status: BUILT has working code and tests.");

    ring(s, 1.86, 3.88, 1.7, 1.12, "c"); sticky(s, 2.0, 5.1, 1.5, 0.34, "trust is the moat", "p", -2); cur(s, "owner", 11.9, 6.0);
    s.addNotes("DESIGN INTENT: Mental model: three layers and four stages map to how judges score (architecture, ML, privacy). Status chips show honest progress. | Layers on the left, build status on the right. Keywords in brackets are the technical names: IRT, LightGBM, conformal prediction, row-level security.");
  }

  // ================================================================ 6 LEARNING ANALYTICS
  {
    const s = content("Technology", "Pragati knows each student's weak topics, topic by topic, and tells the teacher how sure it is", "Data science, ML and AI rigour", ["KNOW EVERY STUDENT'S WEAK TOPICS", 3]);
    kit.panels("mix");
    frame(s, L, 1.22, 5.7, 3.7, "WHAT THE TEACHER SEES: STUDENT x TOPIC MASTERY");
    M.heatmap(kit, s, L + 0.1, 1.62, 5.5, 3.2, { n: 9, m: 8, callout: true, seed: 11, fs: 9 });
    callout(s, 1, L + 3.55, 1.56, 0.28); callout(s, 2, L + 5.1, 4.45, 0.28);
    // annotations
    const an = [["1", "A column low for the whole batch: probably not taught yet, not weak students."], ["2", "Bands, not scores: building, steady, strong, or “not enough data”."], ["3", "A question the best students miss is flagged as a likely wrong key."]];
    an.forEach((a, i) => { callout(s, a[0], L, 5.05 + i * 0.36, 0.24); text(s, a[1], { x: L + 0.34, y: 5.0 + i * 0.36, w: 5.3, h: 0.34, fontSize: 9, valign: "middle" }); });
    // pooled question bank
    text(s, "WHY A 60-STUDENT BATCH IS ENOUGH", { x: L, y: 6.18, w: 4, h: 0.22, fontSize: 8.5, bold: true, color: T.tealDark, charSpacing: 0.8 });
    ["Institute A", "Institute B", "Institute C"].forEach((t, i) => pill(s, t, L + i * 1.0, 6.45, { fill: T.tealTint, color: T.navy, size: 8.5, h: 0.24, bold: false, w: 0.92 }));
    kit.line(s, L + 3.0, 6.57, L + 3.5, 6.57, { color: T.tealDark, w: 2, arrow: true });
    pill(s, "Shared item bank", L + 3.55, 6.45, { fill: T.tealDark, color: T.white, size: 8.5, h: 0.24, w: 1.2 });
    tag(s, "pending", L + 4.85, 6.46, { size: 7.5, h: 0.22 });
    frame(s, 6.3, 1.22, 3.55, 5.7, "HOW IT WORKS, IN PLAIN ENGLISH");
    const st = [["Rates how hard every question is", "2-parameter IRT, guessing prior", "Blank counts as wrong; dropped and multi-correct items follow NTA rules; fixing a key re-scores everything."], ["Estimates mastery per topic, with doubt", "Shrunk toward student and batch", "Recent tests count more; the estimate is pulled toward the student's overall level."],
      ["Says “not enough data” when unsure", "Uncertainty gate on every band", "A band appears only when the standard error is small."], ["Flags a likely wrong answer key", "Negative-discrimination detector", "Teachers get a suggested correction and a one-click re-score."]];
    st.forEach((r, i) => {
      const y = 1.66 + i * 1.3;
      s.addShape("rect", { x: 6.4, y, w: 3.35, h: 1.22, fill: { color: i % 2 ? T.white : T.tint }, line: { color: T.line, width: 0.75 } });
      rect(s, 6.4, y, 0.4, 1.22, T.tealDark);
      text(s, String(i + 1), { x: 6.4, y, w: 0.4, h: 1.22, fontSize: 16, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: r[0], options: { bold: true, fontSize: 10.5, color: T.navy, breakLine: true } }, { text: r[1], options: { italic: true, fontSize: 8, color: T.muted, breakLine: true } }, { text: r[2], options: { fontSize: 8.5, color: T.ink } }], { x: 6.88, y: y + 0.03, w: 2.82, h: 1.16, valign: "middle" });
    });
    frame(s, 9.95, 1.22, 2.93, 5.7, "EVIDENCE ON PUBLIC DATA");
    pic(s, "chart_assist_bars.png", 10.02, 1.62, 2.8, 1.74, "Next-answer AUC: ours vs published");
    tag(s, "public", 10.05, 3.4);
    text(s, [{ text: "0.76 vs 0.75", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "770 unseen students, 55,755 predictions. Our 95 % interval 0.756 to 0.779. The published AKT scores higher (0.785); we say so.", options: { fontSize: 8.5, color: T.ink } }], { x: 10.05, y: 3.7, w: 2.75, h: 1.25, valign: "top" });
    text(s, "SYNTHETIC-DATA GATES", { x: 10.05, y: 5.05, w: 2.7, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, charSpacing: 1 });
    ["Difficulty recovered", "Wrong keys caught", "Mastery beats raw %"].forEach((t, i) => {
      text(s, t, { x: 10.05, y: 5.33 + i * 0.4, w: 1.6, h: 0.34, fontSize: 9.5, color: T.ink, valign: "middle" });
      tag(s, "pending", 11.85, 5.4 + i * 0.4, { size: 7.5, h: 0.22 });
    });
    note(s, 10.2, 6.55, 2.4, 0.32, "gates come from Agent B", -2);
    foot(s, "Sources: ml/public_validation (ASSISTments 2009, pyKT protocol; published DKT 0.754, SAKT 0.725, AKT 0.785); heat map is an illustrative mock-up. Gates pending Agent B.");

    hl(s, "y", 0.78, 5.02, 4.4, 0.3); cur(s, "mentor", 3.0, 2.55); dd(s, "arrow_a", 5.3, 1.2, 0.8, 0.4, 0);
    sticky(s, 4.5, 6.0, 1.75, 0.42, "open loops: closed in Round 2", "o", 2);
    s.addNotes("DESIGN INTENT: Labor perception: show how the estimate is made, then show it admits doubt. Zeigarnik: pending gates are open loops to close in Round 2. | Plain-English headline with technical names as secondary labels. The three pending gates come from Agent B and must be filled before submission.");
  }

  // ================================================================ 7 EARLY WARNING
  {
    const s = content("Technology", "Each week a mentor gets a short list: who to call, why, and what to offer. Under-18s get plain rules where the law asks", "Data science, ML and AI rigour; privacy", ["EARLY WARNING: THE INTERVENTION JOURNEY", 3]);
    kit.panels("mix");
    const J = [["FaArrowTrendDown", "Engagement drops", "six absences in ten classes", T.red], ["FaFlag", "Model flags", "appears on the weekly list", T.tealDark], ["FaPhone", "Mentor calls", "supportive, not a warning", T.tealDark], ["FaUserCheck", "Student retained", "outcome logged, list updates", "1B8F55"]];
    kit.line(s, 0.9, 1.5, 12.4, 1.5, { color: T.line, w: 3 });
    for (let i = 0; i < 4; i++) {
      const x = L + i * 3.12;
      s.addShape("ellipse", { x, y: 1.22, w: 0.6, h: 0.6, fill: { color: J[i][3] }, line: { color: T.white, width: 3 } });
      await icon(s, J[i][0], x + 0.14, 1.36, 0.32, T.white);
      s.addShape("rect", { x: x + 0.66, y: 1.2, w: 2.3, h: 0.64, fill: { color: T.white }, line: { type: "none" } });
      text(s, [{ text: J[i][1], options: { bold: true, fontSize: 11, color: T.navy, breakLine: true } }, { text: J[i][2], options: { fontSize: 8.5, color: T.muted } }], { x: x + 0.7, y: 1.2, w: 2.25, h: 0.64, valign: "middle" });
    }
    frame(s, L, 2.0, 3.9, 4.95, "WHAT THE MENTOR SEES");
    pic(s, "screen_support_list.png", L + 0.05, 2.4, 3.8, 2.14, "Weekly support list (illustrative)");
    callout(s, 1, L + 2.7, 3.0, 0.26); callout(s, 2, L + 1.5, 3.3, 0.26);
    tag(s, "mock", L + 0.05, 4.58, { size: 7.5, h: 0.2 });
    text(s, "HOW A FLAG IS MADE", { x: L + 0.05, y: 4.86, w: 3.8, h: 0.22, fontSize: 9, bold: true, color: T.tealDark, charSpacing: 0.8 });
    const fl = [["FaClock", "Uses only data up to that date"], ["FaScaleBalanced", "Routes by age and purpose"], ["FaChartLine", "Scores, or applies a plain rule"], ["FaClipboardCheck", "Gives reasons and a supportive action"], ["FaHandshake", "A person decides; outcome is logged"]];
    for (let i = 0; i < 5; i++) { await abadge(s, fl[i][0], L + 0.08, 5.13 + i * 0.35, 0.28, i); text(s, fl[i][1], { x: L + 0.45, y: 5.12 + i * 0.35, w: 3.4, h: 0.3, fontSize: 9, valign: "middle" }); }
    frame(s, 4.55, 2.0, 4.0, 4.95, "REAL-DATA CHECK ON OULAD (WITHDRAWAL)");
    pic(s, "chart_oulad_by_day.png", 4.62, 2.4, 3.86, 2.68, "Withdrawal prediction accuracy by observation window");
    tag(s, "public", 4.65, 5.1);
    dtable(s, 4.62, 5.38, [2.0, 0.9, 0.96], ["Day 28, 5-fold by student", "AUC", "P@10 %"], [["LightGBM, academic + clicks", "0.706", "0.46"], ["LightGBM, academic only", "0.698", "0.46"], ["Logistic, academic only", "0.680", "0.40"], ["Rule: no assessment", "0.521", "0.31"], ["Rule: zero clicks, 7 days", "0.532", "0.24"]],
      { rowH: 0.24, headH: 0.24, size: 8.5, rowStyles: ["green", "band", "white", "gold", "gold"] });
    frame(s, 8.7, 2.0, 4.18, 4.95, "COMPLIANCE MATRIX: WHAT THE LAW LETS US USE");
    const cols = ["Academic support", "Dropout risk", "Fee risk", "App activity"];
    const lw = 1.3, cwid = (4.18 - lw - 0.1) / 4;
    cols.forEach((c, i) => text(s, c, { x: 8.75 + lw + i * cwid, y: 2.4, w: cwid, h: 0.4, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", valign: "middle" }));
    const M2 = { m: ["FaCircleCheck", "Model", T.tealTint, T.tealDark], r: ["FaLock", "Plain rules", "F1E8D3", "8A6500"], n: ["FaBan", "Never", "F6E0DD", T.red], o: ["FaLockOpen", "Opt-in", T.tealTint, T.tealDark] };
    const grid = [["Under 18", "parent consent", ["m", "r", "r", "n"]], ["18 and over", "own consent", ["m", "m", "m", "o"]], ["Under 18, if counsel agrees", "legal opinion pending", ["m", "m", "r", "n"]]];
    for (let r = 0; r < 3; r++) {
      const y = 2.85 + r * 0.9;
      rect(s, 8.75, y, lw - 0.05, 0.84, T.tint);
      text(s, [{ text: grid[r][0], options: { bold: true, fontSize: 9.5, color: T.navy, breakLine: true } }, { text: grid[r][1], options: { fontSize: 8, color: T.muted } }], { x: 8.8, y, w: lw - 0.12, h: 0.84, valign: "middle" });
      for (let c = 0; c < 4; c++) {
        const m = M2[grid[r][2][c]], x = 8.75 + lw + c * cwid;
        rect(s, x + 0.02, y, cwid - 0.04, 0.84, m[2]);
        await icon(s, m[0], x + cwid / 2 - 0.14, y + 0.1, 0.28, m[3]);
        text(s, m[1], { x: x + 0.02, y: y + 0.5, w: cwid - 0.04, h: 0.3, fontSize: 8, bold: true, color: m[3], align: "center", valign: "middle" });
      }
    }
    rect(s, 8.75, 5.58, 4.08, 0.34, T.tealDark);
    text(s, "DPDP s.9(3): no tracking of children, even with consent", { x: 8.8, y: 5.58, w: 3.98, h: 0.34, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
    pic(s, "chart_calibration.png", 8.8, 6.0, 0.9, 0.85, "Calibration curve");
    text(s, [{ text: "0.009 ", options: { bold: true, color: T.tealDark, fontSize: 12 } }, { text: "calibration error: “30 % risk” means 30 %. About a quarter of dropouts are sudden and cannot be predicted from academic data.", options: { fontSize: 8.5 } }], { x: 9.75, y: 5.98, w: 3.1, h: 0.9, valign: "middle" });
    foot(s, "Sources: ml/public_validation (OULAD, CC BY 4.0; day 28, student-grouped 5-fold; P@10 = precision at top 10 %); contracts/routing_policy.yaml; DPDP Act 2023 s.9. Early-warning lift on synthetic institutes is pending.");

    cur(s, "mentor", 2.2, 3.2); sticky(s, 11.0, 0.7, 1.85, 0.42, "a quarter of dropouts are sudden", "p", 2);
    s.addNotes("DESIGN INTENT: Framing: supportive, never punitive. Authority: the locks make the legal walls visible. | Journey on top; evidence in the middle; compliance matrix on the right (locks are data walls). Our OULAD AUC is lower than the published 0.794 because the split is strictly by student; say so if asked.");
  }

  // ================================================================ 8 PERCENTILE RANGE AND PARENT REPORTS
  {
    const s = content("Technology", "An honest range instead of a single rank, and parent messages where every number is checked before sending", "Data science, ML and AI rigour; GenAI guardrails", ["HONEST RANGES AND SAFE PARENT REPORTS", 3]);
    kit.panels("mix");
    frame(s, L, 1.22, 3.9, 3.5, "PERCENTILE RANGE, NOT A RANK");
    M.bandChart(kit, s, L + 0.08, 1.62, 3.74, 2.3);
    callout(s, 1, L + 3.4, 1.7, 0.26);
    lines(s, ["A quantile model plus a conformal band, 80 % target", "Mapped to the exam scale by an editable table", "Shown with a disclaimer, never a promise"], L + 0.05, 4.02, 3.8, 0.7, { size: 8.5, gap: 1 });
    frame(s, 4.55, 1.22, 5.0, 3.5, "PARENT REPORT: HINDI AND ENGLISH");
    pic(s, "screen_parent_report.png", 4.62, 1.62, 4.86, 2.92, "Parent report in Hindi and English (illustrative)");
    callout(s, 2, 4.75, 3.95, 0.26);
    note(s, 7.9, 4.35, 1.5, 0.3, "no AI needed to send", 2);
    frame(s, 9.7, 1.22, 3.18, 3.5, "THE CHECKING PIPELINE");
    const pl = [["FaDatabase", "Facts from data", "Attendance, tests, topics, trend."], ["FaRobot", "Optional local AI", "Only rewords; never adds a number."], ["FaListCheck", "Eight checks", "Numbers, topics, names, words, length, trend, tips, format."], ["FaFilePdf", "Template fallback", "Safe human-written text if any check fails."]];
    for (let i = 0; i < 4; i++) {
      const y = 1.64 + i * 0.77;
      await abadge(s, pl[i][0], 9.78, y, 0.36, i);
      text(s, [{ text: pl[i][1], options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: pl[i][2], options: { fontSize: 8.5, color: T.ink } }], { x: 10.22, y: y - 0.04, w: 2.62, h: 0.74, valign: "middle" });
    }
    frame(s, L, 4.85, 7.35, 2.1, "EIGHT AUTOMATIC SAFETY CHECKS BEFORE ANY MESSAGE");
    const ck = ["Numbers match the data", "Topics are real", "Names added last", "No banned words", "Right length", "Trend is correct", "Tips are approved", "Format is valid"];
    ck.forEach((c, i) => {
      const x = L + 0.05 + (i % 4) * 1.82, y = 5.3 + Math.floor(i / 4) * 0.62;
      rect(s, x, y, 0.34, 0.54, T.tealDark);
      text(s, String(i + 1), { x, y, w: 0.34, h: 0.54, fontSize: 11, bold: true, color: T.white, align: "center", valign: "middle" });
      s.addShape("rect", { x: x + 0.34, y, w: 1.4, h: 0.54, fill: { color: T.tealTint }, line: { type: "none" } });
      text(s, c, { x: x + 0.4, y, w: 1.32, h: 0.54, fontSize: 9, color: T.navy, valign: "middle" });
    });
    frame(s, 8.0, 4.85, 4.88, 2.1, "IF A CHECK FAILS");
    chevrow(s, 8.1, 5.3, 4.68, 0.4, [{ t: "AI drafts" }, { t: "8 checks" }, { t: "Send" }], { size: 10, depth: 0.15 });
    s.addShape("rect", { x: 8.1, y: 5.82, w: 4.68, h: 0.44, fill: { color: "F1E8D3" }, line: { color: T.amber, width: 1.25, dashType: "dash" } });
    await icon(s, "FaShieldHalved", 8.2, 5.9, 0.28, "8A6500");
    text(s, "Any failure: a safe human-written template goes out instead", { x: 8.58, y: 5.82, w: 4.15, h: 0.44, fontSize: 9, bold: true, color: "6B4E00", valign: "middle" });
    text(s, [{ text: "Next on the same rails: ", options: { bold: true, color: T.tealDark } }, { text: "7-day study plans and doubt answers from retrieved notes (designed)." }], { x: 8.1, y: 6.33, w: 3.0, h: 0.55, fontSize: 8.5, color: T.ink });
    tag(s, "built", 11.3, 6.4, { size: 8, h: 0.2 });
    text(s, "16 tests", { x: 11.95, y: 6.38, w: 0.9, h: 0.24, fontSize: 8.5, color: T.muted, valign: "middle" });
    foot(s, "Sources: backend/app/genai (20 templates, 16 tests); contracts/report_numbers.schema.json. An independent attack on the checker found gaps; fixes in progress, so no catch rate is claimed. Mock-ups illustrative.");

    cur(s, "parent", 6.8, 3.6); dd(s, "arrow_d", 7.1, 5.72, 0.85, 0.25, 0); ul(s, "swoosh", 10.2, 4.2, 1.6, 0.14);
    sticky(s, 11.0, 0.7, 1.85, 0.42, "the range narrows as tests come in", "b", 2);
    s.addNotes("DESIGN INTENT: Show the work: the eight checks make safety visible instead of claimed. | Range mock-up is schematic until coverage results arrive. The report image uses real template output. Do not quote a verifier catch rate until the independent adversarial test passes after the E2 fixes.");
  }

  // ================================================================ 9 PRIVACY
  pres.addSection({ title: "Trust" });
  {
    const s = content("Trust", "Built for the law and for children: consent first, supportive actions only, no rankings, raw data stays at the institute", "Feasibility, privacy and safety", ["PRIVACY, SAFETY AND DPDP COMPLIANCE", 4]);
    kit.panels("mix");
    frame(s, L, 1.22, 3.5, 3.6, "VERIFIABLE PARENTAL CONSENT");
    pic(s, "screen_consent.png", L + 0.25, 1.62, 3.0, 3.0, "Consent notice with purpose switches (illustrative)");
    callout(s, 1, L + 0.1, 2.05, 0.26); callout(s, 2, L + 0.1, 3.2, 0.26); callout(s, 3, L + 0.1, 4.15, 0.26);
    text(s, "1 ID checked at the desk (Rule 10)   2 One switch per purpose   3 Withdraw in one tap", { x: L + 0.05, y: 4.5, w: 3.4, h: 0.3, fontSize: 7.5, italic: true, color: T.muted });
    const bx = 4.1, bw = 4.55;
    frame(s, bx, 1.22, bw, 3.6, "DATA LOCKBOX: RAW DATA NEVER LEAVES");
    s.addShape("roundRect", { x: bx + 0.12, y: 1.65, w: bw - 0.24, h: 2.5, rectRadius: 0.1, fill: { color: T.tealTint }, line: { color: T.tealDark, width: 2, dashType: "dash" } });
    s.addShape("ellipse", { x: bx + bw / 2 - 0.3, y: 1.55, w: 0.6, h: 0.6, fill: { color: T.tealDark }, line: { color: T.white, width: 2 } });
    await icon(s, "FaLock", bx + bw / 2 - 0.13, 1.68, 0.26, T.white);
    text(s, "THE INSTITUTE'S OWN SPACE: ONE LAPTOP OR PRIVATE SERVER", { x: bx + 0.15, y: 2.2, w: bw - 0.3, h: 0.24, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", charSpacing: 0.5 });
    const lb = [["FaUserGraduate", "Student records"], ["FaFileCircleCheck", "Marks and answers"], ["FaSignature", "Consent ledger"], ["FaListCheck", "Risk lists: mentors only"]];
    for (let i = 0; i < 4; i++) {
      const x = bx + 0.25 + (i % 2) * 2.05, y = 2.5 + Math.floor(i / 2) * 0.78;
      s.addShape("rect", { x, y, w: 1.95, h: 0.7, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      await icon(s, lb[i][0], x + 0.08, y + 0.18, 0.3, T.tealDark);
      text(s, lb[i][1], { x: x + 0.45, y, w: 1.46, h: 0.7, fontSize: 9, bold: true, color: T.navy, valign: "middle" });
    }
    kit.line(s, bx + bw / 2, 4.15, bx + bw / 2, 4.38, { color: T.tealDark, w: 2.5, arrow: true });
    text(s, "Out: question difficulty numbers only, to the shared bank. Parents see progress, never ranks.", { x: bx + 0.1, y: 4.38, w: bw - 0.2, h: 0.4, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", valign: "middle" });
    frame(s, 8.8, 1.22, 4.08, 3.6, "THE COST OF PRIVACY, ON REAL DATA");
    pic(s, "chart_privacy_cost.png", 8.88, 1.62, 3.9, 2.96, "Academic-only vs academic plus click behaviour, OULAD");
    tag(s, "public", 8.9, 4.55, { size: 7.5, h: 0.2 });
    text(s, "Academic-only costs 0.008 AUC at day 28", { x: 10.4, y: 4.5, w: 2.45, h: 0.3, fontSize: 8.5, bold: true, color: T.tealDark, valign: "middle" });
    // guardrails
    frame(s, L, 4.95, 7.9, 2.0, "SAFETY GUARDRAILS");
    s.addShape("ellipse", { x: L + 0.08, y: 5.45, w: 1.3, h: 1.3, fill: { color: T.tealDark }, line: { color: T.tealTint, width: 5 } });
    await icon(s, "FaShieldHalved", L + 0.37, 5.74, 0.72, T.white);
    const gr = ["No leaderboards or public ranks", "No batch moves based on scores", "Banned-words check on every message", "Counsellor contact for each institute", "Risk lists: mentors and owner only", "Students never see a risk label"];
    gr.forEach((g, i) => {
      const x = L + 1.55 + (i % 2) * 3.2, y = 5.38 + Math.floor(i / 2) * 0.5;
      s.addShape("rect", { x, y, w: 3.1, h: 0.44, fill: { color: T.white }, line: { color: T.tealDark, width: 1 } });
      rect(s, x, y, 0.07, 0.44, T.tealDark);
      text(s, g, { x: x + 0.14, y, w: 2.92, h: 0.44, fontSize: 9, bold: true, color: T.navy, valign: "middle" });
    });
    frame(s, 8.55, 4.95, 4.33, 2.0, "THE LAW, IN ONE LINE EACH");
    const lw_ = [["DPDP s.9(1), Rule 10", "verifiable parental consent before processing"], ["DPDP s.9(3)", "no tracking of children, even with consent"], ["MoE 2024 cl. 10.2(xi)", "results for counselling, never public"], ["Our role", "data processor; the institute is the fiduciary"]];
    lw_.forEach((l, i) => text(s, [{ text: l[0] + ": ", options: { bold: true, color: T.tealDark } }, { text: l[1] }], { x: 8.65, y: 5.38 + i * 0.37, w: 4.15, h: 0.35, fontSize: 9, color: T.ink, valign: "middle" }));
    note(s, 11.0, 0.7, 1.85, 0.42, "built in, not bolted on", 2);
    foot(s, "Sources: DPDP Act 2023 s.9, Rules 2025 (Rule 10); MoE Guidelines 2024; contracts/routing_policy.yaml; OULAD results (ml/public_validation); isolation tested on PostgreSQL 16. Not legal advice.");

    ul(s, "swoosh", 4.3, 2.4, 4.0, 0.12); cur(s, "parent", 1.2, 3.6);
    s.addNotes("DESIGN INTENT: Authority and trust: law cited by section; the lockbox is the single most important promise. | Lockbox: raw data stays in the institute's own environment; only item difficulty statistics reach a shared bank. A lawyer's check on the in-person ID flow is still recommended.");
  }

  // ================================================================ 10 BUSINESS MODEL
  pres.addSection({ title: "Business" });
  {
    const s = content("Business", "At ₹30 a student, fees kept and staff time saved already cover about half the cost; every admission it wins is a bonus", "Revenue model and unit economics", ["BUSINESS MODEL AND UNIT ECONOMICS", 5]);
    kit.panels("mix");
    const kp = [["3.6x", "LTV ÷ CAC", "4.8x undiscounted; guide 10.7x"], ["5.7 mo", "payback", "simple; guide 3.1 months"], ["78 %", "contribution margin", "₹6,740 a month per institute"], ["1.7x", "owner's return", "0.55x on fees + staff time only"]];
    const kw = (CWD - 0.3) / 4;
    kp.forEach((k, i) => {
      const x = L + i * (kw + 0.1);
      rect(s, x, 1.22, kw, 1.0, i === 3 ? T.teal : T.tealDark);
      text(s, k[0], { x: x + 0.1, y: 1.24, w: 1.5, h: 0.62, fontSize: 30, bold: true, color: T.white, valign: "middle" });
      text(s, k[1], { x: x + 1.6, y: 1.28, w: kw - 2.2, h: 0.55, fontSize: 11, bold: true, color: "C9DBF0", valign: "middle" });
      s.addShape("ellipse", { x: x + kw - 0.58, y: 1.3, w: 0.5, h: 0.5, fill: { color: "F4F8FD" }, line: { type: "none" } });
      pic(s, "flat/" + ["sales-performance", "overtime", "bullish", "donate"][i] + ".png", x + kw - 0.52, 1.36, 0.38, 0.38, "Icon");
      text(s, k[2], { x: x + 0.1, y: 1.86, w: kw - 0.2, h: 0.3, fontSize: 8.5, color: T.white });
    });
    frame(s, L, 2.35, 3.85, 4.0, "KEY ASSUMPTIONS (MID, BASE)");
    dtable(s, L + 0.04, 2.76, [1.62, 0.78, 1.0, 0.37], ["Assumption", "Base", "Range", "Basis"], [
      ["Students", "400", "180 to 1,200", "G"], ["Annual fee", "₹75,000", "60k to 95k", "R"], ["Dropout rate", "12 %", "8 to 18 %", "R"], ["Outreach effect", "15 %", "5 to 30 %", "R"], ["Share preventable", "55 %", "35 to 65 %", "A"], ["Recall, under 18", "32 %", "25 to 45 %", "A"],
      ["Recall, 18+", "42 %", "30 to 60 %", "A"], ["Flag precision", "15 %", "10 to 25 %", "R"], ["Admissions uplift", "1 %", "0 to 3 %", "A"], ["Staff hours saved", "25 a month", "10 to 50", "G"], ["Mentor min. a call", "120", "240 to 60", "A"], ["List price", "₹30", "₹20 to 40", "A"]],
      { rowH: 0.25, headH: 0.25, size: 8.5, headFill: T.tealDark, leftCols: [2], rowStyles: Array(12).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    text(s, "G guide · R researched · A assumption to test in interviews", { x: L + 0.06, y: 6.12, w: 3.7, h: 0.2, fontSize: 7.5, italic: true, color: T.muted });
    frame(s, 4.45, 2.35, 4.4, 4.0, "STRESS TEST: BEAR, BASE, BULL");
    pic(s, "chart_gauge.png", 4.5, 2.75, 4.3, 2.15, "Gauge of owner's return: bear, base, bull");
    [["BEAR", "0.37x", "LTV/CAC 0.75x"], ["BASE", "1.7x", "LTV/CAC 3.6x"], ["BULL", "3.9x", "LTV/CAC 10x"]].forEach((g, i) => {
      const x = 4.52 + i * 1.44;
      rect(s, x, 4.98, 1.38, 0.26, i === 1 ? T.tealDark : "6B7280");
      text(s, g[0], { x, y: 4.98, w: 1.38, h: 0.26, fontSize: 9, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, [{ text: g[1], options: { bold: true, fontSize: 15, color: T.navy, breakLine: true } }, { text: g[2], options: { fontSize: 8, color: T.muted } }], { x, y: 5.27, w: 1.38, h: 0.55, align: "center" });
    });
    text(s, "Bear and Bull move 13 inputs. Every input at its worst gives 0.09x: a survival test, not a forecast.", { x: 4.55, y: 5.85, w: 4.25, h: 0.45, fontSize: 8.5, italic: true, color: T.muted });
    note(s, 11.0, 0.7, 1.85, 0.42, "value = fees + time + admissions", 2);
    frame(s, 9.0, 2.35, 3.88, 4.0, "WHERE ₹3.6 A STUDENT GOES");
    const parts = [["WhatsApp messages", 1.0, T.tealDark], ["Compute and storage", 0.8, T.teal], ["AI-written reports", 0.7, "5B8DC9"], ["Servers and database", 0.5, "8FB0D8"], ["Legal and compliance", 0.5, "B9CFE8"], ["Consent checks", 0.1, "DDE7F4"]];
    let yy = 2.78; const bh = 1.95;
    parts.forEach((p) => { const h = (p[1] / 3.6) * bh; rect(s, 9.1, yy, 0.55, h, p[2]); yy += h; });
    parts.forEach((p, i) => {
      const y = 2.76 + i * 0.33;
      rect(s, 9.8, y + 0.07, 0.16, 0.16, p[2]);
      text(s, [{ text: "₹" + p[1].toFixed(1) + "  ", options: { bold: true, color: T.navy } }, { text: p[0], options: { color: T.ink } }], { x: 10.02, y, w: 2.8, h: 0.3, fontSize: 9, valign: "middle" });
    });
    dtable(s, 9.04, 4.85, [1.45, 0.8, 1.53], ["Per institute", "Guide", "Pragati"], [["LTV ÷ CAC", "10.7x", { t: "3.6x", bold: true }], ["Payback", "3.1 mo", { t: "5.7 mo", bold: true }], ["CAC, sales", "₹25,000", { t: "₹15,567", bold: true }], ["Logo retention", "69 %", { t: "64 %", bold: true }]],
      { rowH: 0.26, headH: 0.26, size: 8.5, headFills: [T.tealDark, T.muted, T.tealDark], rowStyles: ["band", "white", "band", "white"] });
    tag(s, "model", 9.06, 6.12, { size: 7, h: 0.18 });
    rect(s, L, 6.47, CWD, 0.5, T.tealDark);
    text(s, [{ text: "Our base case is deliberately below the guide's: ", options: { color: T.white } }, { text: "4.0 % not 25 %, ₹30 not ₹40, 3.6x not 10.7x.", options: { bold: true, color: "F1D9A0" } }, { text: " It breaks even if it keeps 5.5 students a year or wins 1.5 extra admissions.", options: { color: T.white } }], { x: L + 0.15, y: 6.47, w: CWD - 0.3, h: 0.5, fontSize: 11, valign: "middle", align: "center" });
    foot(s, "Source: financial model v1.1 (Mid institute, 400 students, Base; CFO audit 22 Oct 2026). Model output from sourced and assumed inputs, not measured; willingness to pay is untested. ₹3.6 = all-in cost to serve.");

    ring(s, 0.38, 1.18, 1.7, 0.78, "c"); cur(s, "owner", 11.9, 1.6);
    s.addNotes("DESIGN INTENT: Anchoring: the guide's 10.7x sits beside our 3.6x. We choose to look worse and be believed. | v1.1 numbers. Return 1.7x counts fees kept, staff time and a 1 % admissions uplift; 0.55x counts fees and staff time only; 0.35x fees only. LTV/CAC 3.6x discounted, 4.8x undiscounted; payback 5.7 months simple. Cost stack from COGS at Base inputs.");
  }

  // ================================================================ 11 GO-TO-MARKET
  {
    const s = content("Business", "Start in Patna with a free trial on last year's Excel, then grow city by city; the shared question bank is the moat", "Market and go-to-market; moat", ["GO-TO-MARKET, MOAT AND ROADMAP", 5]);
    const gx = 2.7, gw = 10.18, qw = gw / 6;
    rect(s, gx, 1.22, qw * 2, 0.2, T.navy); text(s, "FY27", { x: gx, y: 1.22, w: qw * 2, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
    rect(s, gx + qw * 2, 1.22, qw * 4, 0.2, T.tealDark); text(s, "FY28", { x: gx + qw * 2, y: 1.22, w: qw * 4, h: 0.2, fontSize: 8.5, bold: true, color: T.white, align: "center", valign: "middle" });
    ["Oct–Dec 26", "Jan–Mar 27", "Apr–Jun 27", "Jul–Sep 27", "Oct–Dec 27", "Jan–Mar 28"].forEach((q, i) => { rect(s, gx + i * qw, 1.42, qw - 0.02, 0.22, T.tealTint); text(s, q, { x: gx + i * qw, y: 1.42, w: qw, h: 0.22, fontSize: 8.5, bold: true, color: T.tealDark, align: "center", valign: "middle" }); });
    const rows = [["TECH", "Validate on public data", 0, 1, T.tealDark], ["TECH", "Prototype and phone app", 0.3, 2, T.teal], ["PILOTS", "Free retro-pilots (2)", 1, 2, T.tealDark], ["PILOTS", "Paid pilots + controls", 2, 3, T.teal], ["SALES", "Demos before admissions", 1.3, 2.6, "5B8DC9"], ["SALES", "First paying institutes", 2.5, 4, T.tealDark], ["SCALE", "Bihar, UP, Jharkhand", 3.5, 6, T.teal], ["MONEY", "Raise ₹45 L", 1.5, 2.3, T.amber]];
    rows.forEach((r, i) => {
      const y = 1.7 + i * 0.265;
      if (i % 2 === 0) rect(s, L, y - 0.01, CWD, 0.265, T.tint);
      text(s, r[0], { x: L + 0.05, y, w: 0.7, h: 0.24, fontSize: 7.5, bold: true, color: T.muted, valign: "middle", charSpacing: 0.5 });
      text(s, r[1], { x: L + 0.8, y, w: 1.5, h: 0.24, fontSize: 8.5, color: T.ink, valign: "middle" });
      rect(s, gx + r[2] * qw, y + 0.03, (r[3] - r[2]) * qw - 0.04, 0.18, r[4]);
    });
    for (let i = 1; i < 6; i++) kit.line(s, gx + i * qw - 0.01, 1.66, gx + i * qw - 0.01, 3.82, { color: "D5DEEA", w: 0.5 });
    kit.panels("mix");
    frame(s, L, 3.98, 4.35, 2.97, "WHERE WE SELL FIRST");
    pic(s, "map_geo_mini.png", L + 0.35, 4.42, 1.55, 1.74, "Map of India: target states shaded, cities by tier");
    [["①", "Patna", "free retro-pilots"], ["②", "Lucknow", "paid pilots"], ["③", "Ranchi", "FY28"], ["④", "Raj. and MP", "after FY28"]].forEach((p, i) => {
      text(s, [{ text: p[0] + " ", options: { bold: true, color: "B5832A", fontSize: 10 } }, { text: p[1], options: { bold: true, color: T.navy, fontSize: 9 } }, { text: " " + p[2], options: { color: T.muted, fontSize: 8 } }], { x: 2.85, y: 4.45 + i * 0.36, w: 1.9, h: 0.34, valign: "middle" });
    });
    text(s, "1,180 addressable institutes in five states; 58 paying by year 3 = 4.9 %", { x: L + 0.1, y: 6.22, w: 4.1, h: 0.36, fontSize: 9, bold: true, color: T.tealDark });
    text(s, "State split is our derived allocation (assumption).", { x: L + 0.1, y: 6.6, w: 4.1, h: 0.26, fontSize: 8, italic: true, color: T.muted });
    frame(s, 4.95, 3.98, 4.2, 2.97, "COMPETITION AND MOAT");
    const mk = (t) => ({ t, fill: t === "yes" ? C2.green : t === "?" ? "F1E8D3" : "F4F7FB", bold: true, color: t === "yes" ? T.tealDark : T.muted });
    dtable(s, 5.0, 4.38, [1.0, 0.7, 0.5, 0.65, 0.65, 0.6], ["", "₹/mo", "OMR", "Topics", "Report", "Hindi"], [
      ["Classplus", "4–7", mk("?"), mk("?"), mk("?"), mk("?")], ["Fedena", "10–21", mk("no"), mk("?"), mk("yes"), mk("?")], ["Teachmint", "20–40", mk("?"), mk("?"), mk("yes"), mk("yes")],
      [{ t: "Pragati", bold: true, color: T.white, fill: T.tealDark }, { t: "30", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }, { t: "yes", bold: true, color: T.white, fill: T.tealDark }]],
      { rowH: 0.25, headH: 0.25, size: 8.5, headSize: 8, rowStyles: ["white", "white", "white", "white"], headFill: T.tealDark });
    text(s, "yes: in listing · no: not shown · ?: not verifiable", { x: 5.0, y: 5.72, w: 4.1, h: 0.18, fontSize: 7.5, italic: true, color: T.muted });
    chevrow(s, 5.0, 5.95, 4.1, 0.44, [{ t: "More institutes" }, { t: "More answers" }, { t: "Sharper difficulty" }, { t: "Better lists" }], { size: 8, depth: 0.14 });
    text(s, "Weak below about 200 institutes: early wins come from time saved.", { x: 5.0, y: 6.45, w: 4.1, h: 0.4, fontSize: 8.5, italic: true, color: T.ink });
    frame(s, 9.3, 3.98, 3.58, 2.97, "BY INSTITUTE SIZE, AND YEAR 3");
    const b = (t) => ({ t, bold: true, fill: C2.green });
    dtable(s, 9.34, 4.38, [1.4, 0.68, 0.68, 0.72], ["Base", "Small", "Mid", "Large"], [["Students", "180", "400", "1,200"], ["Owner return", "1.6x", b("1.7x"), "2.1x"], ["LTV÷CAC, field", "1.5x", b("3.6x"), "9.2x"], ["LTV÷CAC, partner", "3.4x", "4.9x", "6.1x"]],
      { rowH: 0.26, headH: 0.26, size: 8.5, headFills: [T.tealDark, T.muted, T.tealDark, T.muted], rowStyles: ["band", "white", "band", "white"] });
    [["58", "paying institutes"], ["₹65 L", "revenue, year 3"], ["Month 16", "break-even"]].forEach((k, i) => {
      const x = 9.34 + i * 1.18;
      rect(s, x, 5.78, 1.12, 0.62, T.tealDark);
      text(s, [{ text: k[0], options: { bold: true, fontSize: 13, color: T.white, breakLine: true } }, { text: k[1], options: { fontSize: 7.5, color: "C9DBF0" } }], { x, y: 5.78, w: 1.12, h: 0.62, align: "center", valign: "middle" });
    });
    text(s, "Year 3, Base case. Needs ₹45 L.", { x: 9.34, y: 6.45, w: 3.4, h: 0.22, fontSize: 8, italic: true, color: T.muted });
    foot(s, "Sources: vendor listings (financial/research R1; ? means not verifiable, not absent); financial model v1.1 (field vs channel economics; 3-year projection); roadmap dates are our plan.");

    cur(s, "owner", 4.0, 5.2);
    pmtag(s, "NOW", 2.75, 3.84, 0.5, "E0584A"); pmtag(s, "NEXT", 4.4, 3.84, 0.5, "2E6DB4"); pmtag(s, "LATER", 8.0, 3.84, 0.6, "6B7280");
    s.addNotes("DESIGN INTENT: Goal-gradient and chunking: Now, Next, Later makes the path feel short. | Small institutes: channel partners give LTV/CAC 3.4x against 1.5x by field sales. Year 3 Base: 58 paying institutes, revenue 65.3 lakh, EBITDA 11.9 lakh, funding need 45 lakh, break-even month 16. One field rep at 8 percent of the market.");
  }

  // ================================================================ 12 VALIDATION AND THE ASK
  pres.addSection({ title: "The Ask" });
  {
    const s = content("The Ask", "What we have proved, what we have not, the risks that could sink us, and the one pilot that settles it", "Feasibility; honest limits", ["VALIDATION, RISKS AND THE ASK", 6]);
    const cw = 4.05, gx = 0.14, y0 = 1.22, h0 = 2.3;
    const cols = [["PROVED ON PUBLIC DATA", "proved", [["Next-answer AUC", "0.763 (DKT 0.754)"], ["Withdrawal AUC, day 28", "0.706 (published 0.794)"], ["Calibration error", "0.009"], ["Academic-only cost", "0.008 AUC"], ["Precision at top 10 %", "0.46 vs 0.24 to 0.31"]]],
      ["SHOWN ON SYNTHETIC DATA", "pending", [["Pipeline end to end", "116 tests pass"], ["Tenant isolation", "0 rows across institutes"], ["Report checker", "8 checks, template fallback"], ["Difficulty recovery", "pending"], ["Early-warning lift", "pending"]]],
      ["NOT PROVEN YET", "notproven", [["Accuracy at real institutes", "needs a pilot"], ["Willingness to pay", "owner interviews"], ["Real dropout reduction", "borrowed from trials"], ["Hindi quality at scale", "native review"], ["Other OMR layouts", "one-time onboarding"]]]];
    cols.forEach((c, i) => {
      const x = L + i * (cw + gx);
      s.addShape("rect", { x, y: y0, w: cw, h: h0, fill: { color: T.white }, line: { color: T.line, width: 1 } });
      tag(s, c[1], x + 0.1, y0 + 0.08, { label: c[0], size: 8.5, h: 0.26, w: cw - 0.2 });
      c[2].forEach((r, k) => {
        const y = y0 + 0.4 + k * 0.37;
        rect(s, x + 0.1, y, cw - 0.2, 0.34, k % 2 ? T.white : C2.soft);
        text(s, r[0], { x: x + 0.16, y, w: 1.9, h: 0.34, fontSize: 9, bold: true, color: T.navy, valign: "middle" });
        text(s, r[1], { x: x + 2.05, y, w: cw - 2.2, h: 0.34, fontSize: 8.5, valign: "middle" });
      });
    });
    frame(s, L, 3.65, 3.95, 2.35, "RISK MATRIX");
    const mx = L + 0.45, my = 4.05, mw = 3.35, mh = 1.65;
    [[0, 0, "F4F7FB"], [1, 0, "FBEFD8"], [0, 1, "FBEFD8"], [1, 1, "F6E0DD"]].forEach(([qx, qy, c]) => rect(s, mx + qx * mw / 2, my + (1 - qy) * mh / 2, mw / 2 - 0.03, mh / 2 - 0.03, c));
    text(s, "LIKELIHOOD →", { x: mx, y: my + mh + 0.02, w: mw, h: 0.2, fontSize: 8, bold: true, color: T.muted, align: "center" });
    s.addText("IMPACT →", { x: L - 0.3, y: my + mh / 2 - 0.12, w: 0.9, h: 0.24, fontSize: 8, bold: true, color: T.muted, align: "center", rotate: 270, margin: 0 });
    [[1, 0.5, 0.82], [2, 0.66, 0.68], [3, 0.82, 0.42], [4, 0.24, 0.3]].forEach(([n, lx, iy]) => {
      s.addShape("ellipse", { x: mx + lx * mw - 0.17, y: my + (1 - iy) * mh - 0.17, w: 0.34, h: 0.34, fill: { color: n === 4 ? T.teal : T.tealDark }, line: { color: T.white, width: 2 } });
      text(s, String(n), { x: mx + lx * mw - 0.17, y: my + (1 - iy) * mh - 0.17, w: 0.34, h: 0.34, fontSize: 10, bold: true, color: T.white, align: "center", valign: "middle" });
    });
    frame(s, 4.55, 3.65, 5.0, 2.35, "KEY RISKS AND HOW WE CONTAIN THEM");
    dtable(s, 4.6, 4.05, [0.3, 1.75, 2.85], ["", "Risk", "Mitigation"], [
      [{ t: "1", bold: true, color: T.tealDark }, { t: "Accuracy below public-data results", bold: true, color: T.red }, "Retro-pilot before any sale; compare with the institute's rule at equal workload"],
      [{ t: "2", bold: true, color: T.tealDark }, { t: "Owners will not pay ₹30", bold: true, color: T.red }, "Price survey; lead with staff time and parent reports"],
      [{ t: "3", bold: true, color: T.tealDark }, { t: "Mentors ignore the list", bold: true, color: T.red }, "List capped at capacity; every flag needs a logged outcome"],
      [{ t: "4", bold: true, color: T.tealDark }, { t: "Hindi quality", bold: true, color: T.red }, "Native reviewer; template fallback when a check fails"]],
      { rowH: 0.36, headH: 0.25, size: 8.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: ["band", "white", "band", "white"] });
    frame(s, 9.7, 3.65, 3.18, 2.35, "THE PILOT THAT SETTLES IT");
    chevrow(s, 9.78, 4.08, 3.02, 0.36, [{ t: "Wk 0–4" }, { t: "1 term" }, { t: "After" }], { size: 8.5, depth: 0.13 });
    lines(s, [{ t: "Retro-pilot at 2 institutes: last year's Excel, who left, who we would have flagged." }, { t: "Staggered paid pilot: half the batches first; measures written down in advance." }, { t: "Decide: fix the percentile table with real exam results; publish all of it." }], 9.8, 4.52, 3.05, 1.45, { size: 8.5, gap: 3 });
    rect(s, L, 6.12, CWD, 0.85, T.tealDark);
    text(s, "THE ASK", { x: L + 0.2, y: 6.16, w: 2, h: 0.24, fontSize: 10, bold: true, color: "F1D9A0", charSpacing: 2 });
    text(s, "Two free retro-pilots in Patna this winter.", { x: L + 0.2, y: 6.38, w: 6.6, h: 0.42, fontSize: 21, bold: true, color: T.white, valign: "middle" });
    text(s, "If we flag fewer of the students who left than your attendance rule, at the same workload, we stop.", { x: L + 0.2, y: 6.76, w: 6.6, h: 0.2, fontSize: 8.5, color: "C9DBF0" });
    [["₹45 L", "funding, Base"], ["Month 16", "break-even"], ["₹65 L", "year-3 revenue"]].forEach((k, i) => {
      const x = 7.5 + i * 1.8;
      rect(s, x, 6.2, 1.7, 0.7, "1A3F6F");
      text(s, [{ text: k[0], options: { bold: true, fontSize: 15, color: T.white, breakLine: true } }, { text: k[1], options: { fontSize: 8, color: "C9DBF0" } }], { x, y: 6.2, w: 1.7, h: 0.7, align: "center", valign: "middle" });
    });
    note(s, 11.0, 0.7, 1.85, 0.42, "we stop if it fails", 3);
    foot(s, "Sources: ml/public_validation; technical/docs/FEASIBILITY_CHECK.md; financial model v1.1 (Base: ₹45 L funding, break-even month 16, year-3 revenue ₹65.3 L). Pending items get measured values before submission.");

    ring(s, 7.4, 6.12, 1.9, 0.82, "c"); dd(s, "arrow_c", 3.9, 5.1, 0.7, 0.45, 0);
    sticky(s, 2.9, 3.62, 1.5, 0.3, "test the red ones first", "y", -3);
    s.addNotes("DESIGN INTENT: Peak-end: finish on a small, low-risk, falsifiable ask (two free pilots; we stop if it fails). | State limits first. The ask is concrete and falsifiable. Bear needs 1 crore funding and does not break even within 36 months.");
  }

  // ================================================================ APPENDIX A1: SCENARIOS AND SENSITIVITY (model v1.1)
  pres.addSection({ title: "Appendix" });
  {
    const s = content("Appendix", "Appendix 1: scenarios and sensitivity: what the model says when inputs move (Mid institute, 400 students)", "Revenue model and unit economics: sensitivity", ["APPENDIX 1: SCENARIOS AND SENSITIVITY", 7]);
    sec(s, "A", "SCENARIOS (BEAR AND BULL MOVE 13 DRIVERS; STRESS MOVES ALL)", L, 1.28, 7.3);
    const b = (t) => ({ t, bold: true, fill: C2.green });
    dtable(s, L, 1.62, [2.55, 0.78, 0.75, 0.85, 0.75, 0.8], ["", "Guide", "Bear", "Base", "Bull", "Stress"], [
      ["Dropout reduction", "25 %", "1.0 %", b("4.0 %"), "11.3 %", "0.6 %"], ["Students kept a year", "12.0", "0.3", b("1.9"), "8.2", "0.2"], ["Return, all benefits", "2.25x", "0.37x", b("1.7x"), "3.9x", "0.09x"],
      ["Return, fees + staff time", "2.25x", "0.37x", b("0.55x"), "1.3x", "0.09x"], ["Students to keep to break even", "5.3", "3.8", b("5.5"), "7.2", "11.7"], ["CAC, sales and marketing", "₹25,000", "₹44,889", b("₹15,567"), "₹8,386", "₹65,111"],
      ["LTV ÷ CAC, discounted", "10.7x", "0.75x", b("3.6x"), "10x", "-0.11x"], ["LTV ÷ CAC, undiscounted", "10.7x", "0.93x", b("4.8x"), "15x", "-0.13x"], ["Payback, simple (months)", "3.1", "21.1", b("5.7"), "2.6", "never"]],
      { rowH: 0.3, headH: 0.28, size: 9.5, headFills: [T.tealDark, T.muted, T.muted, T.tealDark, T.muted, T.muted], rowStyles: Array(9).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    sec(s, "B", "OWNER'S RETURN BY PRICE AND DROPOUT REDUCTION", L, 4.78, 7.3);
    heat(s, L, 5.05, 0.78, 0.25, ["₹20", "₹30", "₹40", "₹50", "₹60", "₹80"], ["5 %", "8 %", "11 %", "15 %", "20 %", "25 %"],
      [[2.4, 1.8, 1.4, 1.2, 1.0, 0.81], [2.7, 2.1, 1.7, 1.4, 1.2, 0.92], [3.1, 2.3, 1.9, 1.6, 1.3, 1.0], [3.6, 2.7, 2.1, 1.8, 1.5, 1.2], [4.1, 3.1, 2.5, 2.1, 1.8, 1.4], [4.7, 3.6, 2.8, 2.4, 2.0, 1.6]], { labW: 0.5, size: 9, fmt: (v) => v.toFixed(1) + "x" });
    // tornado
    const tx = 8.0, tw = R - 8.0;
    sec(s, "C", "WHAT MOVES THE OWNER'S RETURN (BASE 1.7x)", tx, 1.28, tw);
    const tor = [["Admissions uplift 0–3 %", 0.55, 4.1], ["Price ₹40 to ₹20", 1.4, 2.3], ["Annual fee ₹70k to ₹1.2 L", 1.4, 2.1], ["Mentor minutes per call", 1.4, 2.0], ["Outreach effect 5–30 %", 1.5, 2.1], ["Precision of the flag", 1.5, 1.9], ["Months before first flag", 1.6, 1.8]];
    const ax0 = 0.4, ax1 = 4.3, px = tx + 1.9, pw = tw - 2.2, X = (v) => px + ((v - ax0) / (ax1 - ax0)) * pw;
    tor.forEach((r, i) => {
      const y = 1.66 + i * 0.36;
      text(s, r[0], { x: tx, y, w: 1.9, h: 0.3, fontSize: 9, color: T.ink, valign: "middle" });
      rect(s, X(r[1]), y + 0.05, X(1.7) - X(r[1]), 0.2, "8FB0D8");
      rect(s, X(1.7), y + 0.05, X(r[2]) - X(1.7), 0.2, T.tealDark);
      text(s, r[1] + "x", { x: X(r[1]) - 0.42, y, w: 0.4, h: 0.3, fontSize: 8, color: T.muted, align: "right", valign: "middle" });
      text(s, r[2] + "x", { x: X(r[2]) + 0.03, y, w: 0.4, h: 0.3, fontSize: 8, color: T.muted, valign: "middle" });
    });
    rect(s, X(1.7) - 0.01, 1.62, 0.02, 2.55, T.navy);
    sec(s, "D", "OUR LTV ÷ CAC BY CHURN AND ACQUISITION COST", tx, 4.28, tw);
    heat(s, tx, 4.55, 0.78, 0.27, ["1 %", "2 %", "3 %", "4 %", "5 %"], ["₹15k", "₹25k", "₹35k", "₹50k", "₹75k"],
      [[11, 10, 9.3, 8.5, 7.8], [6.9, 6.2, 5.6, 5.1, 4.7], [4.9, 4.4, 4.0, 3.6, 3.3], [3.4, 3.1, 2.8, 2.5, 2.3], [2.3, 2.1, 1.9, 1.7, 1.6]], { labW: 0.5, size: 9, fmt: (v) => v.toFixed(1) + "x" });
    foot(s, "Source: financial model v1.1 (Scenarios, Sensitivity). Model output from sourced and assumed inputs, not measured. Base marker on the churn grid is about ₹38k acquisition cost at 3 % churn.");
  }

  // ================================================================ APPENDIX A2: THREE-YEAR PLAN
  {
    const s = content("Appendix", "Appendix 2: a three-year plan capped by the market, and how size changes the economics", "Revenue model; three-year projection", ["APPENDIX 2: THREE-YEAR PLAN AND SEGMENTS", 7]);
    sec(s, "A", "THREE-YEAR PROJECTION (₹)", L, 1.28, 6.3);
    const b = (t) => ({ t, bold: true, fill: C2.green });
    dtable(s, L, 1.62, [2.6, 1.2, 1.3, 1.2], ["", "Bear", "Base", "Bull"], [
      ["Revenue in year 3", "₹11.0 L", b("₹65.3 L"), "₹2.50 Cr"], ["EBITDA in year 3", "-₹30.2 L", b("₹11.9 L"), "₹1.26 Cr"], ["Paying institutes, end of year 3", "15", b("58"), "191"],
      ["Funding the model needs", "₹1.00 Cr", b("₹45.0 L"), "₹30.0 L"], ["Break-even month", "after 36", b("16"), "4"]],
      { rowH: 0.38, headH: 0.3, size: 10, headFills: [T.tealDark, T.muted, T.tealDark, T.muted], rowStyles: ["band", "white", "band", "white", "band"] });
    text(s, "Market cap: 1,180 addressable institutes in five states x 8 % penetration (derived, mostly assumption). Bear funding assumes no cost response.", { x: L, y: 3.9, w: 6.3, h: 0.4, fontSize: 9, italic: true, color: T.muted });
    sec(s, "B", "BASE CASE, YEAR BY YEAR (₹ LAKH)", L, 4.35, 6.3);
    const yr = [["Year 1", 18.9, -16.1, 28], ["Year 2", 48.0, -0.9, 51], ["Year 3", 65.3, 11.9, 58]];
    const base0 = 6.2, K = 0.024;
    yr.forEach((y, i) => {
      const x = L + 0.4 + i * 2.05;
      rect(s, x, base0 - y[1] * K * 1.0 - 0.0, 0.7, y[1] * K, T.tealDark);
      text(s, "₹" + y[1], { x: x - 0.1, y: base0 - y[1] * K - 0.26, w: 0.9, h: 0.24, fontSize: 10, bold: true, color: T.navy, align: "center" });
      const e = y[2]; rect(s, x + 0.78, e >= 0 ? base0 - e * K : base0, 0.55, Math.abs(e) * K, e >= 0 ? "5B8DC9" : T.red);
      text(s, (e >= 0 ? "+" : "") + e, { x: x + 0.68, y: e >= 0 ? base0 - e * K - 0.26 : base0 + Math.abs(e) * K + 0.01, w: 0.75, h: 0.24, fontSize: 9, color: T.muted, align: "center" });
      text(s, y[0] + "  ·  " + y[3] + " institutes", { x: x - 0.25, y: 6.68, w: 1.9, h: 0.22, fontSize: 9, color: T.ink });
    });
    rect(s, L, base0, 6.3, 0.015, T.grey);
    rect(s, L + 0.1, 6.88, 0.14, 0.14, T.tealDark); text(s, "revenue", { x: L + 0.28, y: 6.83, w: 0.8, h: 0.24, fontSize: 9, color: T.muted, valign: "middle" }); rect(s, L + 1.3, 6.88, 0.14, 0.14, "5B8DC9"); text(s, "EBITDA", { x: L + 1.48, y: 6.83, w: 0.8, h: 0.24, fontSize: 9, color: T.muted, valign: "middle" });
    sec(s, "C", "BY INSTITUTE SIZE (BASE)", 7.15, 1.28, 5.7);
    dtable(s, 7.15, 1.62, [2.4, 1.1, 1.1, 1.08], ["", "Small", "Mid", "Large"], [
      ["Students", "180", "400", "1,200"], ["Annual fee per student", "₹60,000", "₹75,000", "₹1,00,000"], ["Return, all benefits", "1.6x", b("1.7x"), "2.1x"],
      ["LTV ÷ CAC, field sales", "1.5x", b("3.6x"), "9.2x"], ["LTV ÷ CAC, channel partner", "3.4x", "4.9x", "6.1x"], ["Payback, months", "19", b("6"), "3"]],
      { rowH: 0.37, headH: 0.3, size: 10, headFills: [T.tealDark, T.muted, T.tealDark, T.muted], rowStyles: ["band", "white", "band", "white", "band", "white"] });
    rect(s, 7.15, 4.35, 5.73, 2.4, T.tint);
    text(s, "WHAT THIS MEANS FOR GO-TO-MARKET", { x: 7.3, y: 4.42, w: 5.4, h: 0.28, fontSize: 10.5, bold: true, color: T.tealDark, charSpacing: 0.5 });
    lines(s, ["Mid and large institutes: field sales pays.", "Small institutes: channel partners, not reps.", "One field rep at 8 % of the market.", "Raise ₹45 L, break even in month 16.", "Bear case needs ₹1 Cr: we stop if pilots fail."], 7.3, 4.78, 5.4, 1.9, { size: 10.5, gap: 5 });
    foot(s, "Source: financial model v1.1 (Projection, Scenarios; Bear, Base, Bull). Model output from sourced and assumed inputs; willingness to pay is untested. 1 Cr = 100 lakh (L).");
  }

  {
    const s = content("Appendix", "Appendix 3: 31 tables in five groups, all isolated per institute", "Data model", ["APPENDIX 3: DATA MODEL AND QUESTION TAGGING", 7]);
    kit.panels("mix");
    const groups = [["PEOPLE", "institutes, users, students, guardians, batches, batch_changes, consents, legal_settings"], ["LEARNING", "topics, topic_prereqs, questions, question_topics, item_params, tests, test_questions, answer_keys, marking_schemes"],
      ["RESULTS", "responses, test_totals, attendance, fees, engagement"], ["INTELLIGENCE", "mastery_snapshots, risk_scores, predictions, interventions, reports, model_registry"], ["OPERATIONS", "ingest_jobs, omr_templates, audit_log"]];
    groups.forEach((g, i) => {
      const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.25, w = 4.05;
      frame(s, x, y, w, 2.1, g[0]);
      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.5, fontSize: 12 });
    });
    frame(s, L + 2 * 4.18, 3.8, 4.05, 1.65, "DELIBERATELY NOT STORED");
    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.2, 3.7, 1.2, { size: 11, gap: 3 });
    text(s, "HOW EVERY QUESTION GETS ITS TOPIC (SO TAGGING COSTS FALL AS WE GROW)", { x: L, y: 5.55, w: 8, h: 0.24, fontSize: 10, bold: true, color: T.tealDark, charSpacing: 0.5 });
    chevrow(s, L, 5.83, 8.0, 0.5, [{ t: "Question text" }, { t: "Shortlist" , sub: "embedding" }, { t: "Local model picks" }, { t: "Teacher 1-tap" }, { t: "Shared bank" }], { size: 9, depth: 0.16 });
    labelBar(s, L, 6.4, CWD, "Row-level security on every tenant table; another institute sees 0 rows (tested on PostgreSQL 16)", { h: 0.34, size: 12, fill: T.tealDark });
    source(s, "Source: technical/contracts/schema.sql. Synthetic data: 4 institutes, 3 academic years, known ground truth.");
  }

  {
    const s = content("Appendix", "Appendix 4: the rules we design against, and what we do about each", "Legal basis", ["APPENDIX 4: LEGAL BASIS", 7]);
    kit.panels("plain");
    frame(s, L, 1.22, CWD, 5.7, null);
    dtable(s, L + 0.1, 1.35, [3.3, 8.9], ["Rule", "Our response"], [
      ["DPDP Act s.9(1), Rule 10", "Verifiable parental consent before processing a minor's data: ID checked at the admission desk, consent recorded per purpose."],
      ["DPDP Act s.9(3)", "No tracking or behavioural monitoring of children: under 18, academic support uses a model; dropout and fee signals use plain rules."],
      ["Fourth Schedule, educational institutions", "Narrow and purpose-limited, so we do not rely on it for consent."],
      ["DPDP Rules, Rules 6 and 7", "Encryption, access control, logs kept one year, breach notice to the institute within hours."],
      ["MoE Guidelines 2024, cl. 10.2(xi)", "Results stay private; early warning leads to counselling, never public ranks."],
      ["MoE Guidelines 2024, cl. 12(vii)", "No batch moves based on performance; remedial help is an extra session."],
      ["MoE Guidelines 2024, cl. 8(iv), 10.1", "Pro-rata refund within 10 days; no test the day after the weekly off."],
      ["Rajasthan Act 2025, s.6(2)(d)", "Fee plans support four or more equal instalments."]],
      { rowH: 0.62, headH: 0.34, size: 11, leftCols: [1] });
    source(s, "Sources: DPDP Act 2023, DPDP Rules 2025, MoE Guidelines 2024, Rajasthan Coaching Centres Act 2025 (technical/docs/TECH_PLAN.md, section 24). Not legal advice.");
  }

  {
    const s = content("Appendix", "Appendix 5: how we will know each model works before an institute relies on it", "Validation plan and model card", ["APPENDIX 5: MODEL CARD AND GO-LIVE GATES", 7]);
    sec(s, "A", "HOW WE SPLIT AND COMPARE", L, 1.22, 4);
    const sp = [["By student and by year", "Features use only data before the as-of date; never split by row."], ["Baselines at equal workload", "Each model sits beside the institute's own rule at the same weekly list size."], ["Uncertainty", "Bootstrap intervals over students; three generator seeds; event counts shown."], ["Stress tests", "Misspecified generators, a held-out institute, an independent attack on the report checker."], ["Honest misses", "A missed gate is reported with its cause; gates are never moved to pass."]];
    sp.forEach((p, i) => {
      const y = 1.6 + i * 0.66;
      rect(s, L, y, 0.08, 0.58, T.tealDark);
      text(s, p[0], { x: L + 0.18, y, w: 3.8, h: 0.24, fontSize: 10.5, bold: true, color: T.tealDark, valign: "middle" });
      text(s, p[1], { x: L + 0.18, y: y + 0.24, w: 3.8, h: 0.36, fontSize: 9, color: T.ink });
    });
    sec(s, "C", "KNOWN LIMITATIONS, STATED", L, 4.98, 4);
    lines(s, ["Synthetic data proves the pipeline, not real-world accuracy.", "OULAD is a UK online university; ASSISTments is US school maths.", "The percentile mapping is an editable assumption table until real mock-vs-exam pairs exist."], L, 5.32, 4.0, 1.5, { size: 9.5, gap: 3 });
    const mx = 4.75, mw = R - 4.75;
    sec(s, "B", "METRICS AND GATES (FROM contracts/metrics_bars.yaml)", mx, 1.22, mw);
    const ok = (t) => ({ t, bold: true, color: T.tealDark, fill: C2.green });
    const pd = { t: "pending", bold: true, color: T.navy, fill: C2.gold };
    dtable(s, mx, 1.58, [1.55, 3.6, 1.15, mw - 6.3], ["Component", "Metric", "Gate", "Status"], [
      ["Difficulty (IRT)", "Recovery r(b̂, b) at 60 answers per item; at 30 answers", "≥ 0.90; ≥ 0.85", pd],
      ["Wrong-key detector", "Recall on planted wrong keys; false flags per 300 items", "≥ 0.80; ≤ 2", pd],
      ["Topic mastery", "Ability recovery r; next-test AUC vs raw % and BKT", "≥ 0.80; better", pd],
      ["Knowledge tracing", "Next-answer AUC, ASSISTments 2009 (public)", "report", ok("0.763")],
      ["Early warning", "AUC-PR vs institute rule; precision at capacity vs rule", "+30 %; +25 %", pd],
      ["Early warning", "Calibration error (public: OULAD day 28)", "< 0.05", ok("0.009")],
      ["Early warning", "Median lead time before a student leaves", "≥ 21 days", pd],
      ["Withdrawal, public", "OULAD day-28 AUC, student-grouped 5-fold", "report", ok("0.706")],
      ["Fairness", "Largest recall gap across slices (gender, city tier)", "≤ 0.10", pd],
      ["Percentile range", "Coverage of the 80 % band", "77 to 83 %", pd],
      ["Parent reports", "Numbers matching the facts; independent attack passes", "100 %", pd]],
      { rowH: 0.42, headH: 0.3, size: 9.5, leftCols: [1], rowStyles: Array(11).fill(0).map((_, i) => i % 2 ? "white" : "band") });
    source(s, "Sources: technical/contracts/metrics_bars.yaml, technical/docs/agent_prompts/R1_00_COMMON.md, ml/public_validation. Pending gates are filled from metrics.json by technical/scripts/deck_numbers.py.");
  }

  {
    const s = content("Appendix", "Appendix 6: where the case's twelve questions are answered, and how strong the evidence is", "Problem statement coverage", ["APPENDIX 6: CASE QUESTIONS, ANSWERED", 7]);
    const E = (t, c) => ({ t, bold: true, color: T.white, fill: c });
    const M_ = E("Measured", T.tealDark), D_ = E("Designed", T.teal), B_ = E("Built", T.tealDark), A_ = E("Assumption", "B5832A");
    const rowsL = [
      ["T1", "Data capture, offline, low effort", "Slides 5, 6", D_], ["T2", "Data model; tagging questions to topics", "Appendix 3", B_], ["T3", "Mastery and question difficulty", "Slide 7", M_], ["T4", "Early warning: dropout, behind, fees", "Slide 8", M_],
      ["T5", "Percentile range, honest uncertainty", "Slide 9", D_], ["T6", "GenAI: reports, plans, doubts", "Slide 9", B_], ["T7", "Multi-tenant, secure, low-cost", "Slides 5, 11", B_], ["T8", "Privacy and safety for minors", "Slide 10, App. 4", B_]];
    const rowsR = [
      ["B1", "Buyer and measurable return", "Slide 11, App. 1", A_], ["B2", "Pricing, CAC, payback, churn, LTV", "Slide 11, App. 1–2", A_], ["B3", "Cities, sizes, channels", "Slide 12", A_], ["B4", "Competition and a growing moat", "Slide 12", D_],
      ["R1", "Financial model with sensitivity", "App. 1–2", A_], ["R2", "Limits: what we did not prove", "Slide 13, App. 5", M_]];
    dtable(s, L, 1.3, [0.45, 3.2, 1.75, 0.85], ["#", "Technology (70 %)", "Where", "Evidence"], rowsL, { rowH: 0.52, headH: 0.32, size: 9.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: Array(8).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    dtable(s, L + 6.5, 1.3, [0.45, 3.0, 1.85, 0.95], ["#", "Market (30 %) and deliverables", "Where", "Evidence"], rowsR, { rowH: 0.52, headH: 0.32, size: 9.5, leftCols: [1, 2], headFill: T.tealDark, rowStyles: Array(6).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    sec(s, "i", "HOW TO READ THE EVIDENCE COLUMN", L + 6.5, 4.75, 5.9);
    lines(s, [{ t: "Measured: our own run on public data or the test suite." }, { t: "Built: working code with tests, on synthetic data." }, { t: "Designed: specified in the contracts, not coded yet." }, { t: "Assumption: a model input with a range, tested in pilots." }], L + 6.5, 5.1, 5.9, 1.2, { size: 10, gap: 3 });
    rect(s, L, 5.6, 6.2, 1.25, T.tint);
    text(s, [{ text: "Every slide states its limits. ", options: { bold: true, color: T.tealDark } }, { text: "We show an honest 4 % rather than a hopeful 25 %, and mark a gate pending rather than quote a number we have not measured. The case says teams that state limits score higher." }], { x: L + 0.15, y: 5.6, w: 5.9, h: 1.25, fontSize: 10.5, color: T.ink, valign: "middle" });
    foot(s, "Source: Participant Guide sections 4, 8 and 10 (questions and rubric). T = technology question, B = business question, R = round-1 deliverable or limit.");
  }
  {
    const s = content("Appendix", "Appendix 7: six screens of the same flow, from upload to parent report", "Product tour", ["APPENDIX 7: PRODUCT TOUR", 7]);
    kit.panels("plain");
    kit.panels("plain");
    const cw = 4.05, gx = 0.14, ih = 2.25;
    const cells = [["screen_upload.png", "Upload and map: the system fixes the mess", 16 / 9], ["screen_heatmap.png", "Topic map: strengths, gaps, untaught topics", 16 / 9], ["screen_support_list.png", "Weekly support list: reasons and actions", 16 / 9],
      ["screen_student_profile.png", "Student profile: mastery with doubt, honest range", 16 / 9], ["screen_owner.png", "Owner dashboard: retention, coverage, compliance", 16 / 9], ["screen_parent_report.png", "Parent report in Hindi and English", 5 / 3]];
    cells.forEach((c, i) => {
      const col = i % 3, rw = Math.floor(i / 3);
      const x = L + col * (cw + gx), y = 1.22 + rw * 2.85;
      const w = c[2] === 16 / 9 ? cw : ih * c[2], xx = x + (cw - w) / 2;
      s.addShape("rect", { x: xx - 0.04, y: y - 0.04, w: w + 0.08, h: ih + 0.08, fill: { color: T.white }, line: { color: T.tealDark, width: 1.5 } });
      pic(s, c[0], xx, y, w, ih, c[1]);
      rect(s, x, y + ih + 0.12, 0.3, 0.3, T.tealDark);
      text(s, String(i + 1), { x, y: y + ih + 0.12, w: 0.3, h: 0.3, fontSize: 12, bold: true, color: T.white, align: "center", valign: "middle" });
      text(s, c[1], { x: x + 0.4, y: y + ih + 0.07, w: cw - 0.45, h: 0.4, fontSize: 11.5, bold: true, color: T.navy, valign: "middle" });
    });
    source(s, "Illustrative mock-ups rendered from HTML with synthetic values; they become real screenshots once the web app is wired to the models.");
    s.addNotes("Product tour: upload, topic map, support list, profile, owner dashboard, parent report. All images are illustrative mock-ups (HTML rendered by headless Edge) using synthetic data and real report text from the report module.");
  }

  {
    const s = content("Appendix", "Appendix 8: every external number in the deck, where it came from, and where we used it", "Source register", ["APPENDIX 8: SOURCE REGISTER", 7]);
    dtable(s, L, 1.3, [0.35, 4.1, 4.6, 2.0, CWD - 11.05], ["#", "Source", "Used for", "Confidence", "Slide"], [
      ["1", "NTA NEET UG 2025 result data (via Careers360, ALLEN)", "22.76 lakh registered candidates", "High (official)", "3"],
      ["2", "JEE Main 2025 statistics (Vedantu; NTA total not found)", "About 15.4 lakh unique registrations", "Medium (secondary)", "3"],
      ["3", "NSO Comprehensive Modular Survey: Education 2025", "27 % of school students in private coaching", "High (official)", "3"],
      ["4", "Case participant guide", "8 to 15 % dropout, ₹36,000 per leaver, ₹17.3 lakh, ₹40, 25 %", "Illustrative", "3, 4"],
      ["5", "Vendor listings: Classplus, Fedena, Edmingle, Teachmint (research R1)", "₹4 to ₹40 per student per month anchors", "Medium", "4, 12"],
      ["6", "Outreach trials in comparable settings (research R4)", "Effect of outreach on dropout, 5 to 30 %", "Medium", "A1"],
      ["7", "OULAD (Open University, CC BY 4.0), our runs", "0.706 AUC, 0.009 calibration, 0.46 precision", "Measured", "1, 4, 8"],
      ["8", "PLOS ONE 2026, OULAD withdrawal study", "Published 0.727 / 0.794 / 0.804 anchors", "High", "4, 8"],
      ["9", "Liu et al., pyKT, NeurIPS 2022; ASSISTments 2009, our runs", "DKT 0.754, SAKT 0.725, AKT 0.785; ours 0.763", "Measured", "1, 7"],
      ["10", "DPDP Act 2023 s.9; DPDP Rules 2025", "Parental consent, no tracking of children", "High (primary)", "4, 8, 10"],
      ["11", "MoE Guidelines for Coaching Centres 2024; Rajasthan Act 2025", "cl. 10.2(xi), 12(vii), 10.1, 8(iv); s.6(2)(d)", "High (primary)", "10, A4"],
      ["12", "WhatsApp and LLM price pages; Patna pay data (research R5, R6)", "Cost per student, staff hour ₹100", "Medium to high", "5, 11"],
      ["13", "Financial model v1.1 (CFO audit, 22 Oct 2026)", "Return, LTV/CAC, payback, margin, 3-year plan, scenarios", "Model output", "2, 4, 11–13, A1–A2"]],
      { rowH: 0.38, headH: 0.3, size: 9.5, leftCols: [1, 2, 3], rowStyles: Array(13).fill(0).map((_, i) => (i % 2 ? "white" : "band")) });
    foot(s, "Full citations with URLs and licences: technical/docs/CITATIONS.md and financial/research. Every model number traces to the financial workbook or a metrics.json file.");
  }


  {
    const s = content("Appendix", "Appendix 9: where the first hundred institutes are, and how we reach them", "Market and go-to-market", ["APPENDIX 9: WHERE WE SELL FIRST", 7]);
    banner(s, L, 1.3, 6.4, "Where institutes are (state shade = addressable, Base)");
    pic(s, "map_geo.png", L, 1.78, 4.55, 5.15, "Map of India: target states shaded by addressable institutes, cities sized by coaching density, coloured by tier");
    [["8A94A6", "Tier 1", "chains dominate; skip"], ["D4A24C", "Tier 2", "coaching hubs; start here"], ["E8743B", "Tier 3", "independents; demos"]].forEach((t, i) => {
      const y = 1.9 + i * 0.5;
      s.addShape("ellipse", { x: 5.12, y: y + 0.08, w: 0.2, h: 0.2, fill: { color: t[0] }, line: { color: T.white, width: 1 } });
      text(s, [{ text: t[1], options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: t[2], options: { fontSize: 8.5, color: T.muted } }], { x: 5.38, y, w: 1.6, h: 0.4, valign: "middle" });
    });
    text(s, "Bubble size = coaching density", { x: 5.12, y: 3.5, w: 1.9, h: 0.22, fontSize: 9, bold: true, color: T.navy });
    [[0.3, "High"], [0.2, "Medium"], [0.12, "Low"]].forEach((d, i) => {
      s.addShape("ellipse", { x: 5.12 + (0.3 - d[0]) / 2, y: 3.82 + i * 0.36 + (0.3 - d[0]) / 2, w: d[0], h: d[0], fill: { color: "D4A24C" }, line: { color: T.white, width: 1 } });
      text(s, d[1], { x: 5.55, y: 3.78 + i * 0.36, w: 1.2, h: 0.3, fontSize: 9, color: T.ink, valign: "middle" });
    });
    text(s, "Density is our qualitative estimate for planning, not a count.", { x: 5.12, y: 4.95, w: 1.85, h: 0.55, fontSize: 8, italic: true, color: T.muted });
    kit.icon(s, "FaLocationDot", 5.12, 5.62, 0.3, T.tealDark);
    text(s, [{ text: "Patna first", options: { bold: true, fontSize: 10.5, color: T.navy, breakLine: true } }, { text: "in-person access", options: { fontSize: 8.5, color: T.muted } }], { x: 5.5, y: 5.56, w: 1.5, h: 0.42, valign: "middle" });
    kit.icon(s, "FaTrainSubway", 5.12, 6.2, 0.3, T.tealDark);
    text(s, [{ text: "Kota", options: { bold: true, fontSize: 10.5, color: T.navy, breakLine: true } }, { text: "dense, chain-held", options: { fontSize: 8.5, color: T.muted } }], { x: 5.5, y: 6.14, w: 1.5, h: 0.42, valign: "middle" });
    banner(s, 7.1, 1.3, 5.78, "How we start selling");
    const rows = [["1", "Patna, Jan to Mar 2027", "2 free retro-pilots on last year's Excel; about 115 to 145 qualifying institutes in Patna (cross-check)", 5], ["2", "Lucknow, Apr 2027", "Paid pilots with comparison batches; Uttar Pradesh is the largest pool (about 490)", 4], ["3", "Bihar and UP Tier-2, Ranchi, FY28", "Gaya, Muzaffarpur, Kanpur, Varanasi, Ranchi by partners and demos", 3], ["4", "Rajasthan and MP, after FY28", "Kota is chain territory; Jaipur and Indore only after the first three", 2]];
    rows.forEach((r, i) => {
      const y = 1.82 + i * 0.78;
      s.addShape("ellipse", { x: 7.1, y: y + 0.1, w: 0.46, h: 0.46, fill: { color: "D4A24C" }, line: { color: T.white, width: 2 } });
      text(s, r[0], { x: 7.1, y: y + 0.1, w: 0.46, h: 0.46, fontSize: 14, bold: true, color: T.navy, align: "center", valign: "middle" });
      text(s, [{ text: r[1], options: { bold: true, fontSize: 12, color: T.tealDark, breakLine: true } }, { text: r[2], options: { fontSize: 9.5, color: T.ink } }], { x: 7.68, y: y, w: 4.1, h: 0.74, valign: "middle" });
      stars(s, 11.85, y + 0.26, r[3], 5, 12);
    });
    text(s, "Priority", { x: 11.85, y: 1.86, w: 1.0, h: 0.2, fontSize: 8.5, bold: true, color: T.muted });
    const kp = [["FaBuilding", "1,180 addressable institutes", "five states, independent, 150 to 2,000 students"], ["FaChartLine", "58 paying by year 3", "4.9 % of the 1,180; one field rep, partners for small institutes"], ["FaTriangleExclamation", "Chains are arriving", "Allen opened in Patna and announced six more Bihar cities"]];
    kp.forEach((k, i) => {
      const y = 4.9 + i * 0.4;
      kit.icon(s, k[0], 7.15, y + 0.04, 0.3, T.tealDark);
      text(s, [{ text: k[1], options: { bold: true, fontSize: 11.5, color: T.navy, breakLine: true } }, { text: k[2], options: { fontSize: 9, color: T.muted } }], { x: 7.62, y, w: 5.2, h: 0.4, valign: "middle" });
    });
    clip(s, 7.1, 6.3, 5.78, 0.7, "Start where we can reach owners in person: Patna.");
    foot(s, "Sources: financial/research R7 (1,180 = Bihar + UP about 740, +60 % for three more states); model v1.1 (4.9 % share at month 36). State split is our assumption; map for orientation only; city bubbles are indicative.");
    s.addNotes("Map: state outlines from a public GeoJSON (datameet-style, orientation only, not an official boundary). Bubble size is our qualitative estimate of coaching density (Kota, Patna highest). State figures are our allocation of the R7 total (Bihar and UP by population, Rajasthan, MP and Jharkhand 40/40/20 of the extension) and must be called an assumption. Chains: Allen opened in Patna and announced six more Bihar cities (R7).");
  }

  // ================================================================ FINAL
  pres.addSection({ title: "Closing" });
  {
    const s = pres.addSlide({ masterName: "CLOSING", sectionTitle: "Closing" });
    s.addText("How we used AI, and what we cited", { placeholder: "title" });
    const cw = (CWD - 0.3) / 2;
    [["AI tools", ["Claude: planning, code review, documentation.", "Google Antigravity agents: code generation.", "Perplexity and Gemini Deep Research: literature and regulation research.", "Everything was reviewed and tested by the team; research claims were checked against primary sources where possible."], 0],
      ["Public data and libraries", ["OULAD (CC BY 4.0), ASSISTments 2009, the pyKT benchmark, JEEBench.", "Noto Sans Devanagari (SIL OFL), LightGBM, Ollama, FastAPI, PostgreSQL.", "Flat Color Icons by Icons8 (CC BY 3.0) via Iconify; Font Awesome icons (CC BY 4.0).", "Full list with licences: technical/docs/CITATIONS.md in the repository."], 2]].forEach((c, i) => {
      const x = L + i * (cw + 0.3), a = kit.acc(c[2]);
      s.addShape("roundRect", { x, y: 1.7, w: cw, h: 4.6, rectRadius: 0.02, fill: { color: a.t }, line: { color: a.c, width: 1.5 } });
      s.addShape("roundRect", { x: x + 0.3, y: 1.9, w: 2.8, h: 0.45, rectRadius: 0.02, fill: { color: a.c }, line: { type: "none" } });
      text(s, c[0], { x: x + 0.3, y: 1.9, w: 2.8, h: 0.45, fontSize: 15, bold: true, color: a.on, fontFace: F.head, align: "center", valign: "middle" });
      text(s, c[1].map((t, k) => ({ text: t, options: { breakLine: k < c[1].length - 1, paraSpaceAfter: 10, bullet: { indent: 14 } } })), { x: x + 0.3, y: 2.6, w: cw - 0.6, h: 3.6, fontSize: 17, color: T.ink });
    });
    text(s, "github.com/AdityaKuranjekar/institute-intelligence-platform", { x: 5.0, y: 6.7, w: 7.88, h: 0.45, fontSize: 13, color: T.muted, align: "right", valign: "middle" });
    s.addNotes("Mandatory disclosure (Problem Statement, rule 2). Keep this as the last slide of the submitted PDF.");
  }

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
