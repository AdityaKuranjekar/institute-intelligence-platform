"""One-off: switch tokens and shared components from the multi-colour v3 to the single-blue v4 (consulting) look."""
import re
from pathlib import Path

B = Path(__file__).resolve().parent


def sub(path, a, b, count=1):
    p = B / path
    s = p.read_text(encoding="utf-8")
    assert a in s, (path, a[:60])
    p.write_text(s.replace(a, b) if count == 0 else s.replace(a, b, count), encoding="utf-8")


# ---- lib.js tokens
p = B / "lib.js"
s = p.read_text(encoding="utf-8")
i = s.index("const T = {")
j = s.index("const W = 13.333")
new = '''const T = {
  // v4 consulting look: white paper, one blue family, amber only for pending / warnings
  navy: "17325C", ink: "1F2937", muted: "5B6573", teal: "2E6DB4", tealDark: "1F4A82", tealTint: "E3ECF7",
  tint: "F4F7FB", line: "C9D6E8", white: "FFFFFF", amber: "F2A900", red: "C0392B", green: "1F4A82",
  tealOnDark: "5B8DC9", grey: "9AA6B5", greyLight: "EEF2F7",
  orange: "5B8DC9", orangeD: "1F4A82", orangeT: "EAF1FA", blue: "2E6DB4", blueD: "1F4A82", blueT: "E3ECF7", yellowT: "EAF1FA", redT: "F8DEDA",
};
const ACC = [
  { c: T.tealDark, d: T.tealDark, t: T.tealTint, on: T.white },
  { c: T.teal, d: T.tealDark, t: T.tealTint, on: T.white },
  { c: T.tealDark, d: T.tealDark, t: T.tealTint, on: T.white },
  { c: "5B8DC9", d: T.tealDark, t: T.tealTint, on: T.white },
];
const F = { head: "Calibri", body: "Calibri", hindi: "Nirmala UI" };
'''
s = s[:i] + new + s[j:]
s = s.replace('model: { label: "MODEL OUTPUT", line: T.orangeD, color: T.orangeD }', 'model: { label: "MODEL OUTPUT", line: T.muted, color: T.muted }')
s = s.replace('proved: { label: "PROVED", fill: T.green, color: T.white }', 'proved: { label: "PROVED", fill: T.tealDark, color: T.white }')
# source line sits above the tab bar, italic like the references
s = s.replace('kit.text(slide, text, { x: 0.45, y: 7.07, w: 10.6, h: 0.3, fontSize: 9.5, color: T.muted, valign: "middle" });',
              'kit.text(slide, text, { x: 0.45, y: 6.96, w: 12.4, h: 0.16, fontSize: 8.5, italic: true, color: T.muted, valign: "middle" });')
p.write_text(s, encoding="utf-8")

# ---- lib2.js: palette of semantic fills, squarer components, centred tab titles
p = B / "lib2.js"
s = p.read_text(encoding="utf-8")
s = s.replace('const C2 = { band: "E3EEFB", gold: "FFF0BF", goldD: "F2C94C", green: "D3F0DF", greenD: "0E7C4F", blue: "2F80D1", soft: "F1F7F3", orange: "FFE3C7" };',
              'const C2 = { band: "E3ECF7", gold: "FBEFC5", goldD: "F2C94C", green: "D6E4F5", greenD: "1F4A82", blue: "2E6DB4", soft: "F2F6FB", orange: "EAF1FA" };')
s = s.replace('kit.text(slide, title, { x: x + 0.12, y, w: w - 0.24, h: 0.33, fontSize: tsize - 0.5, bold: true, color: a.on, valign: "middle", charSpacing: 0.5 });',
              'kit.text(slide, title, { x: x + 0.12, y, w: w - 0.24, h: 0.33, fontSize: tsize, bold: true, color: a.on, align: "center", valign: "middle" });')
s = s.replace('slide.addShape(S.roundRect, { x, y, w: o.w ?? w, h: o.h ?? 0.32', 'slide.addShape(S.roundRect, { x, y, w: o.w ?? w, h: o.h ?? 0.32')
s = s.replace('slide.addShape(S.roundRect, { x, y, w, h: o.h ?? 0.32, rectRadius: (o.h ?? 0.32) / 2, fill: { color: o.fill ?? T.tealDark }, line: { type: "none" } });',
              'slide.addShape(S.rect, { x, y, w, h: o.h ?? 0.32, fill: { color: o.fill ?? T.tealDark }, line: { type: "none" } });')
s = s.replace('rectRadius: 0.14, fill: { color: o.fill ?? a.t }, line: { type: "none" } });', 'rectRadius: 0.03, fill: { color: o.fill ?? a.t }, line: { type: "none" } });')
s = s.replace('line: { color: a.c, width: 1.25, dashType: "dash" } });', 'line: { color: a.c, width: 1.25, dashType: "dash" } });')
s = s.replace('const a = [240, 248, 242], b = [31, 169, 113], c = [10, 90, 56];', 'const a = [236, 242, 250], b = [91, 141, 201], c = [23, 50, 92];')
s = s.replace('kit.ellipse(slide, x, y, d, d, T.orange, { line: T.white, lw: 1.5 });', 'kit.ellipse(slide, x, y, d, d, T.tealDark, { line: T.white, lw: 1.5 });')
p.write_text(s, encoding="utf-8")
print("tokens ok")
