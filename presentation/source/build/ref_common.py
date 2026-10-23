"""Reference-inspired upgrade (candidate decks v2.2 and v4.2), applied as text patches to the generated deck JS:
  1. top breadcrumb becomes a chevron process strip with icons (active step highlighted), like the reference decks
  2. a slim bottom bar (team, product, page number); source line moves just above it
  3. helpers: stars(), banner(), clip() (key-takeaway note with paperclip)
  4. go-to-market slide: the hub-and-spoke block becomes a tile map of India (heat by addressable institutes)
  5. one new appendix slide: where we sell first (map, phases, numbers, channels)
Used by assemble_v2.py / assemble_v3.py / assemble_v4.py when the environment variable REF=1 is set."""
import re

HELPERS = r'''
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
'''

CRUMB = r'''  const CRUMBS = ["Summary", "Problem", "Product", "Technology", "Trust", "Business", "The Ask", "Appendix"];
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
'''


BADGE = r'''    crumb(s, head[1]);
    {
      const FLAT = { "EXECUTIVE": "idea", "THE PROBLEM": "debt", "REALITY": "inspection", "SYSTEM ARCH": "data-protection", "THE PRODUCT": "multiple-smartphones", "KNOW EVERY": "heat-map", "EARLY WARNING": "alarm-clock", "HONEST RANGES": "statistics", "PRIVACY": "privacy", "BUSINESS MODEL": "money-transfer", "GO-TO-MARKET": "globe", "VALIDATION": "approval", "APPENDIX 1": "line-chart", "APPENDIX 2": "timeline", "APPENDIX 3": "database", "APPENDIX 4": "rules", "APPENDIX 5": "survey", "APPENDIX 6": "questions", "APPENDIX 7": "data-sheet", "APPENDIX 8": "shop", "STRESS": "inspection" };
      const key = Object.keys(FLAT).find((k) => head[0].toUpperCase().startsWith(k));
      if (key) {
        s.addShape("ellipse", { x: 12.2, y: 0.46, w: 0.68, h: 0.68, fill: { color: "F4F8FD" }, line: { color: "A9C3E4", width: 1, dashType: "dash" } });
        pic(s, "flat/" + FLAT[key] + ".png", 12.3, 0.56, 0.48, 0.48, "Icon: " + FLAT[key]);
        if (SECTION_TAG) text(s, "SECTION " + (head[1] + 1) + " OF 8", { x: 10.4, y: 0.69, w: 1.6, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, align: "right", valign: "middle", charSpacing: 1 });
      }
    }
'''


def patch_chrome(js, kind="v2"):
    a = js.index("  const CRUMBS = ")
    b = js.index("  // content(section, subtitle, rubric")
    js = js[:a] + HELPERS + CRUMB + js[b:]
    # bottom bar and page number inside it
    js = js.replace("{ rect: { x: 12.3, y: 7.12, w: 0.58, h: 0.3, fill: { color: T.tealDark } } },",
                    "{ rect: { x: 0, y: 7.26, w: 13.333, h: 0.24, fill: { color: T.tealDark } } },\n      { text: { text: \"AlphaQ\", options: { x: 0.45, y: 7.26, w: 2, h: 0.24, fontFace: F.head, bold: true, fontSize: 10, color: T.white, margin: 0, valign: \"middle\" } } },\n      { text: { text: \"Pragati  ·  Case B: The Data Moat  ·  Round 1\", options: { x: 3.6, y: 7.26, w: 6.1, h: 0.24, fontFace: F.body, fontSize: 9.5, color: \"C9DBF0\", align: \"center\", margin: 0, valign: \"middle\" } } },")
    js = js.replace("slideNumber: { x: 12.3, y: 7.12, w: 0.58, h: 0.3, fontFace: F.body, fontSize: 13,", "slideNumber: { x: 12.2, y: 7.26, w: 0.68, h: 0.24, fontFace: F.body, fontSize: 10.5,")
    js = js.replace("    crumb(s, head[1]);" + chr(10), BADGE.replace("SECTION_TAG", "true" if kind == "v2" else "false"), 1)
    if kind != "v2":
        js = js.replace("sticky(s, 11.0, 0.7, 1.85", "sticky(s, 10.2, 0.68, 1.85").replace("note(s, 11.0, 0.7, 1.85", "note(s, 10.2, 0.68, 1.85")
    js = js.replace('"Full list with licences:', '"Flat Color Icons by Icons8 (CC BY 3.0) via Iconify; Font Awesome icons (CC BY 4.0).", "Full list with licences:')
    js = js.replace('color: T.tealDark, valign: "middle", margin: 0 }', 'color: T.tealDark, align: "left", valign: "middle", margin: 0 }')
    if kind == "v2":
        old = 'text(s, k[1], { x: x + 2.05, y: 1.45, w: kw - 2.15, h: 0.8, fontSize: 14, bold: true, color: "C9DBF0", valign: "middle" });'
        new = (old.replace('w: kw - 2.15', 'w: kw - 2.95') + chr(10) + '      s.addShape("ellipse", { x: x + kw - 0.85, y: 1.42, w: 0.7, h: 0.7, fill: { color: "F4F8FD" }, line: { type: "none" } });' + chr(10)
               + '      pic(s, "flat/" + ["sales-performance", "overtime", "bullish"][i] + ".png", x + kw - 0.77, 1.5, 0.54, 0.54, "Icon");')
        js = js.replace(old, new)
    if kind != "v2":
        old = 'text(s, k[1], { x: x + 1.6, y: 1.28, w: kw - 1.65, h: 0.55, fontSize: 11, bold: true, color: "C9DBF0", valign: "middle" });'
        new = (old.replace('w: kw - 1.65', 'w: kw - 2.2') + chr(10) + '      s.addShape("ellipse", { x: x + kw - 0.58, y: 1.3, w: 0.5, h: 0.5, fill: { color: "F4F8FD" }, line: { type: "none" } });' + chr(10)
               + '      pic(s, "flat/" + ["sales-performance", "overtime", "bullish", "donate"][i] + ".png", x + kw - 0.52, 1.36, 0.38, 0.38, "Icon");')
        js = js.replace(old, new)
    js = js.replace("kit.srcY = 7.1; kit.srcH = 0.28;", "kit.srcY = 7.02; kit.srcH = 0.22;")
    js = js.replace("const foot = (s, t) => text(s, t, { x: L, y: 7.1, w: 11.6, h: 0.28,", "const foot = (s, t) => text(s, t, { x: L, y: 7.02, w: 12.4, h: 0.22,")
    return js


GTM_V2_A = '    sec(s, 1, "THE ACQUISITION ENGINE", L, 4.78, 5.8);'
GTM_V3_A = '    frame(s, L, 3.98, 4.35, 2.97, "THE ACQUISITION ENGINE");'

MINI_V2 = r'''    sec(s, 1, "WHERE WE SELL FIRST: ADDRESSABLE INSTITUTES", L, 4.78, 5.8);
    pic(s, "map_geo_mini.png", L + 0.5, 5.08, 1.62, 1.82, "Map of India: target states shaded, cities by tier");
    [["①", "Patna: 2 free retro-pilots", "Bihar 250"], ["②", "Lucknow: paid pilots, Apr 2027", "UP 490"], ["③", "Ranchi and Tier-2 cities, FY28", "Jharkhand 88"], ["④", "Rajasthan and MP: after FY28", "176 each"]].forEach((p, i) => {
      text(s, [{ text: p[0] + " ", options: { bold: true, color: "B5832A", fontSize: 11 } }, { text: p[1], options: { bold: true, color: T.navy, fontSize: 9 } }, { text: "  " + p[2], options: { color: T.muted, fontSize: 8.5 } }], { x: 3.2, y: 5.2 + i * 0.4, w: 2.75, h: 0.4, valign: "middle" });
    });
'''
MINI_V3 = r'''    frame(s, L, 3.98, 4.35, 2.97, "WHERE WE SELL FIRST");
    pic(s, "map_geo_mini.png", L + 0.35, 4.42, 1.55, 1.74, "Map of India: target states shaded, cities by tier");
    [["①", "Patna", "free retro-pilots"], ["②", "Lucknow", "paid pilots"], ["③", "Ranchi", "FY28"], ["④", "Raj. and MP", "after FY28"]].forEach((p, i) => {
      text(s, [{ text: p[0] + " ", options: { bold: true, color: "B5832A", fontSize: 10 } }, { text: p[1], options: { bold: true, color: T.navy, fontSize: 9 } }, { text: " " + p[2], options: { color: T.muted, fontSize: 8 } }], { x: 2.85, y: 4.45 + i * 0.36, w: 1.9, h: 0.34, valign: "middle" });
    });
    text(s, "1,180 addressable institutes in five states; 58 paying by year 3 = 4.9 %", { x: L + 0.1, y: 6.22, w: 4.1, h: 0.36, fontSize: 9, bold: true, color: T.tealDark });
    text(s, "State split is our derived allocation (assumption).", { x: L + 0.1, y: 6.6, w: 4.1, h: 0.26, fontSize: 8, italic: true, color: T.muted });
'''


def patch_gtm(js, kind):
    """Replace the acquisition-engine (hub and spoke) block by the tile map; its end marker is the competition block."""
    if kind == "v2":
        a = js.index(GTM_V2_A)
        b = js.index('    // competitor matrix', a)
        return js[:a] + MINI_V2 + js[b:]
    a = js.index(GTM_V3_A)
    b = js.index('    frame(s, 4.95, 3.98, 4.2, 2.97, "COMPETITION AND MOAT");', a)
    return js[:a] + MINI_V3 + js[b:]


def map_slide(num):
    return r'''
  {
    const s = content("Appendix", "Appendix ''' + str(num) + r''': where the first hundred institutes are, and how we reach them", "Market and go-to-market", ["APPENDIX ''' + str(num) + r''': WHERE WE SELL FIRST", 7]);
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
'''


def apply(js, kind, num):
    js = patch_chrome(js, kind)
    js = patch_gtm(js, kind)
    marker = "  // ================================================================ FINAL"
    i = js.index(marker)
    return js[:i] + map_slide(num) + "\n" + js[i:]
