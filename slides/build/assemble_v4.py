"""Assemble deck_v4.js (Version 4: v3 plus a Miro-style whiteboard / product-manager layer) -> slides/AlphaQ_CaseB_Round1_v4.pptx.
Adds a dotted-grid canvas, coloured sticky notes with tape, hand-drawn arrows, swoosh underlines, highlighter strokes, scribbled circles,
name-tag cursors and PM-style framing. Slides are v3's; overlays are injected before each slide's addNotes call.
Run from slides/build:  python doodles.py && python assemble_v4.py && node deck_v4.js"""
import re
import subprocess
import sys
from pathlib import Path

B = Path(__file__).resolve().parent
subprocess.run([sys.executable, str(B / "assemble_v3.py")], check=True, capture_output=True)
src = (B / "deck_v3.js").read_text(encoding="utf-8")
src = src.replace("AlphaQ_CaseB_Round1_v3.pptx", "AlphaQ_CaseB_Round1_v4.pptx").replace("(Round 1, version 3)", "(Round 1, version 4)").replace("Round 1  ·  Version 3", "Round 1  ·  Version 4")

# ---- canvas: dotted grid behind every content and title slide
BG = 'background: { path: path.join(__dirname, "..", "assets", "bg_dots.png") }'
src = src.replace('title: "CONTENT", background: { color: T.white },', 'title: "CONTENT", ' + BG + ',')
src = src.replace('title: "TITLE", background: { color: T.white },', 'title: "TITLE", ' + BG + ',')

# ---- helpers (after the v3 helpers: note and stat)
helpers = r'''
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
'''
# insert helpers right after the v3 `stat` helper
i = src.index("  const stat = (s, label, x, y, w, kind) => {")
j = src.index("\n  };\n", i) + 6
src = src[:j] + helpers + src[j:]
# remove v3 note (grey) definition to avoid duplicate declaration
k = src.index("  const note = (s, x, y, w, h, t, rot = -2) => {\n    s.addShape")
k2 = src.index("\n  };\n", k) + 6
src = src[:k] + src[k2:]
# the `note` const above was defined before the helper; keep order valid by moving usage: helper defines it later but only used inside slide blocks

# v3 grey notes that now collide with overlays
src = src.replace('note(s, 4.6, 4.45, 1.7, 0.4, "Hindi and English, checked", 3);', '')
src = src.replace('note(s, 11.0, 0.72, 1.85, 0.36,', 'note(s, 11.0, 0.7, 1.85, 0.42,')
# ---- per-slide overlays
OV = {
    "CASE B  ·  NEXTUTE × FINANCE CLUB, IIT PATNA": r'''
    ul(s, "swoosh", 0.45, 2.02, 3.5, 0.26); hl(s, "y", 2.05, 3.03, 1.32, 0.3);
    sticky(s, 4.55, 1.05, 1.55, 0.78, "Your Excel in. A weekly list out.", "y", -4); dd(s, "arrow_d", 6.1, 1.65, 0.7, 0.2, -10);
    cur(s, "mentor", 10.25, 3.9); cur(s, "parent", 11.75, 5.2); ring(s, 0.62, 5.08, 1.65, 0.62, "c");''',
    "EXECUTIVE SUMMARY\", 0]": r'''
    hl(s, "y", 7.28, 0.83, 2.5, 0.3); cur(s, "owner", 12.0, 6.5); ring(s, 11.5, 1.17, 1.25, 0.62, "c");
    pmtag(s, "GOAL", 1.68, 1.12, 0.5, "E0584A"); pmtag(s, "USERS", 1.68, 2.2, 0.55, "2E6DB4"); pmtag(s, "METRIC", 1.68, 3.28, 0.62, "3C9664");''',
    "THE PROBLEM: LEAKY REVENUE, MESSY DATA": r'''
    ul(s, "wave", 9.88, 3.4, 1.4, 0.14); sticky(s, 2.95, 3.68, 1.55, 0.4, "HMW tell mentors who to call?", "g", -3);''',
    "STRESS-TESTING THE GUIDE": r'''
    hl(s, "y", 8.95, 2.58, 3.7, 0.5); ring(s, 2.15, 3.15, 2.9, 0.58, "c");''',
    "THE PRODUCT\", 2]": r'''
    cur(s, "owner", 3.9, 3.0); cur(s, "mentor", 9.7, 3.7); cur(s, "parent", 11.75, 2.2); ring(s, 7.02, 4.18, 1.9, 0.62, "c");
    sticky(s, 4.75, 3.95, 1.75, 0.7, "As a mentor, I want 8 names, not 400.", "y", -3); dd(s, "arrow_a", 6.8, 3.9, 0.6, 0.3, 0);''',
    "SYSTEM ARCHITECTURE: THREE LAYERS, FOUR STAGES": r'''
    ring(s, 1.86, 3.88, 1.7, 1.12, "c"); sticky(s, 2.0, 5.1, 1.5, 0.34, "trust is the moat", "p", -2); cur(s, "owner", 11.9, 6.0);''',
    "KNOW EVERY STUDENT'S WEAK TOPICS": r'''
    hl(s, "y", 0.78, 5.02, 4.4, 0.3); cur(s, "mentor", 3.0, 2.55); dd(s, "arrow_a", 5.3, 1.2, 0.8, 0.4, 0);
    sticky(s, 4.7, 6.0, 1.5, 0.42, "gates pending, not hidden", "o", 2);''',
    "EARLY WARNING: THE INTERVENTION JOURNEY": r'''
    ring(s, 6.5, 1.08, 1.0, 0.9, "c"); cur(s, "mentor", 2.2, 3.2); sticky(s, 11.0, 0.7, 1.85, 0.42, "a quarter of dropouts are sudden", "p", 2);''',
    "HONEST RANGES AND SAFE PARENT REPORTS": r'''
    cur(s, "parent", 6.8, 3.6); dd(s, "arrow_d", 7.1, 5.72, 0.85, 0.25, 0); ul(s, "swoosh", 10.2, 4.2, 1.6, 0.14);
    sticky(s, 11.0, 0.7, 1.85, 0.42, "the range narrows as tests come in", "b", 2);''',
    "PRIVACY, SAFETY AND DPDP COMPLIANCE": r'''
    ring(s, 5.75, 1.36, 1.2, 0.95, "c"); ul(s, "swoosh", 4.3, 2.4, 4.0, 0.12); cur(s, "parent", 1.2, 3.6);''',
    "BUSINESS MODEL AND UNIT ECONOMICS": r'''
    ring(s, 0.38, 1.18, 1.7, 0.78, "c"); cur(s, "owner", 11.9, 1.6);''',
    "GO-TO-MARKET, MOAT AND ROADMAP": r'''
    ring(s, 11.55, 5.7, 1.45, 0.8, "c"); cur(s, "owner", 4.0, 5.2);
    pmtag(s, "NOW", 2.75, 3.84, 0.5, "E0584A"); pmtag(s, "NEXT", 4.4, 3.84, 0.5, "2E6DB4"); pmtag(s, "LATER", 8.0, 3.84, 0.6, "6B7280");''',
    "VALIDATION, RISKS AND THE ASK": r'''
    ring(s, 7.4, 6.12, 1.9, 0.82, "c"); dd(s, "arrow_c", 3.9, 5.1, 0.7, 0.45, 0);
    sticky(s, 2.9, 3.62, 1.5, 0.3, "test the red ones first", "y", -3);''',
}
for marker, js in OV.items():
    i = src.index(marker)
    j = src.index("    s.addNotes(", i)
    src = src[:j] + js.rstrip("\n") + "\n" + src[j:]
(B / "deck_v4.js").write_text(src, encoding="utf-8")
print("deck_v4.js written")
