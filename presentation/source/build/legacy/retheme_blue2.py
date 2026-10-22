from pathlib import Path

B = Path(__file__).resolve().parent


def sub(path, a, b):
    p = B / path
    s = p.read_text(encoding="utf-8")
    assert a in s, (path, a[:70])
    p.write_text(s.replace(a, b), encoding="utf-8")


# nav bar component
sub("lib2.js", "  kit.rubric = (slide, text) => {", '''  // bottom section tab bar (active tab filled), like the reference decks
  kit.nav = (slide, tabs, active) => {
    const x0 = 0.45, w = 11.75 / tabs.length;
    kit.rect(slide, x0, 7.11, 11.75, 0.025, T.navy);
    tabs.forEach((t, i) => {
      const on = i === active;
      if (on) kit.rect(slide, x0 + i * w, 7.14, w, 0.3, T.tealDark);
      kit.text(slide, t, { x: x0 + i * w, y: 7.14, w, h: 0.3, fontSize: 10.5, bold: true, color: on ? T.white : T.ink, align: "center", valign: "middle" });
    });
  };

  kit.rubric = (slide, text) => {''')
sub("lib2.js", 'kit.text(slide, text.toUpperCase(), { x: 8.3, y: 0.2, w: 4.58, h: 0.24, fontSize: 9.5, bold: true, color: T.muted, align: "right", charSpacing: 1.5 });',
    'kit.text(slide, text.toUpperCase(), { x: 8.9, y: 0.16, w: 3.98, h: 0.22, fontSize: 8.5, bold: true, color: T.muted, align: "right", charSpacing: 1 });')

# transform: content function, style list, drop WALL
sub("transform_v3.py", "# 2. title slide", '''i, j = between(src, '  const content =', '  // ================================================================ TITLE')
src = src[:i] + open('parts/content.js', encoding='utf-8').read() + src[j:]

# 2. title slide''')
sub("transform_v3.py", "styles = ['tint', 'tab', 'ring', 'tab', 'left', 'dash', 'tab', 'tint', 'ring', 'tint', 'dash', 'left', 'tab', 'plain', 'tint', 'dash']",
    "styles = ['tab', 'plain', 'tab', 'tab', 'dash', 'tab', 'dash', 'tab', 'tint', 'dash', 'tab', 'tab', 'dash', 'plain', 'tab', 'tab']")
# panel style injection must skip the content() helper definition itself
sub("transform_v3.py", "parts = src.split('const s = content(')", "parts = src.split('    const s = content(')")
sub("transform_v3.py", "out += 'const s = content(' + p[:first_nl]", "out += '    const s = content(' + p[:first_nl]")

# closing slide parts: squarer
sub("parts/final.js", 'rectRadius: 0.14, fill: { color: a.t }, line: { color: a.c, width: 2 } });', 'rectRadius: 0.02, fill: { color: a.t }, line: { color: a.c, width: 1.5 } });')
sub("parts/final.js", 'rectRadius: 0.22, fill: { color: a.c }, line: { type: "none" } });', 'rectRadius: 0.02, fill: { color: a.c }, line: { type: "none" } });')
sub("parts/final.js", '[["AI tools",', '[["AI tools",')

# wall.js: phone caption bar
sub("parts/wall.js", 'hdrBar(s, 6.9, 4.95 + 0.0, 6.0, "PHONE APP: scan, mentor list, parent view", { h: 0.2, size: 9, fill: T.tealDark });', 'hdrBar(s, 6.9, 4.85, 6.0, "PHONE APP: scan, mentor list, parent view", { h: 0.3, size: 11 });')
print("ok")
