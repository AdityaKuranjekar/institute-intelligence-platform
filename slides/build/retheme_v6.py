from pathlib import Path

B = Path(__file__).resolve().parent


def sub(path, a, b):
    p = B / path
    s = p.read_text(encoding="utf-8")
    assert a in s, (path, a[:70])
    p.write_text(s.replace(a, b, 1), encoding="utf-8")


# ---- lib2: borderless 'bar' / 'open' / 'mix' panel styles with a dashed divider on the right edge
sub("lib2.js", '    if (st === "dash") {', '''    if (st === "bar" || st === "open" || st === "mix") {
      const bar = st === "bar" || (st === "mix" && y < 1.6);
      if (title && bar) {
        kit.rect(slide, x, y, w, 0.33, a.c);
        kit.text(slide, title, { x: x + 0.12, y, w: w - 0.24, h: 0.33, fontSize: tsize, bold: true, color: a.on, align: "center", valign: "middle" });
      } else if (title) {
        kit.text(slide, title, { x: x + 0.04, y: y + 0.02, w: w - 0.1, h: 0.3, fontSize: tsize + 0.5, bold: true, color: T.tealDark, valign: "middle" });
        kit.rect(slide, x + 0.04, y + 0.34, w - 0.1, 0.012, T.line);
        kit.rect(slide, x + 0.04, y + 0.33, Math.min(w - 0.1, 2.4), 0.03, T.tealDark);
      }
      if (x + w < 12.6) kit.line(slide, x + w + 0.06, y + (bar ? 0 : 0.05), x + w + 0.06, y + h, { color: "8FA9CC", w: 1, dash: "dash" });
    } else if (st === "dash") {''')

# ---- assemble: use the new styles, friendlier subtitles, extra slides and lines
p = B / "assemble_v5.py"
s = p.read_text(encoding="utf-8")
s = s.replace('out = prefix + "".join(patch_content(x) for x in order)', '''out = prefix + "".join(patch_content(x) for x in order)
import re as _re
out = _re.sub(r'kit\\.panels\\("(tab|dash|tint|ring|left)"\\)', 'kit.panels("mix")', out)
FRIENDLY = {
    "Small institutes already hold the data; Pragati turns it into weekly action, at a cost they can say yes to": "Small institutes already hold the data. Pragati turns it into a weekly to-do list for mentors, at a price owners can say yes to",
    "Institutes hold the data, but notice a struggling student only after they leave": "Institutes have the marks, but notice a struggling student only after that student has already left",
    "The guide's example looks great on paper. Here is where each number breaks, and what we build instead": "The case guide's example looks great on paper. We tested every number and built around what survives",
    "One product, two surfaces: a web console for the office and a phone app for mentors and parents": "One product, two surfaces: a web console for the office, a phone app for mentors and parents",
    "We estimate what each student knows, topic by topic, and say how sure we are": "We estimate what each student knows, topic by topic, and tell the teacher how sure we are",
    "A short, supportive list each week: who to call, why, and what to offer": "Each week a mentor gets a short list: who to call, why, and what to offer",
    "An honest percentile range, and a parent report where every number is checked": "An honest range instead of a single rank, and parent messages where every number is checked",
    "Built for the law: consent first, supportive actions only, no rankings": "Built for the law and for children: consent first, supportive actions only, no rankings",
    "₹30 per student: fees and staff time already cover the cost; anything the product adds to admissions is upside": "At ₹30 a student, fees kept and staff time saved already cover the cost; every admission it wins is a bonus",
    "Win the Hindi belt with a free retro-pilot; let the shared question bank compound as institutes join": "Start in Patna with a free trial on last year's Excel, then grow as the shared question bank gets sharper",
    "What we proved, what we did not, the risks that could sink us, and the one pilot that settles it": "What we have proved, what we have not, the risks, and the one pilot that settles it",
}
for a, b in FRIENDLY.items():
    assert a in out, a
    out = out.replace(a, b)
# GenAI scope line on the percentile/report slide
a = 'tag(s, "built", rx + 0.12, 6.15);'
assert a in out
out = out.replace(a, 'text(s, [{ text: "Same pipeline, next jobs: ", options: { bold: true, color: T.tealDark } }, { text: "a 7-day study plan and doubt answers drawn from retrieved notes, under the same checks. Designed, not in the Round 1 build." }], { x: rx + 0.12, y: 5.62, w: rw - 0.24, h: 0.5, fontSize: 9, color: T.ink });\\n    ' + a)
# tagging strip on the data model appendix
a = 'labelBar(s, L, 6.4, CWD, "Row-level security on every tenant table'
assert a in out
out = out.replace(a, 'text(s, "HOW EVERY QUESTION GETS ITS TOPIC (SO TAGGING COSTS FALL AS WE GROW)", { x: L, y: 5.55, w: 8, h: 0.24, fontSize: 10, bold: true, color: T.tealDark, charSpacing: 0.5 });\\n    chevrow(s, L, 5.83, 8.0, 0.5, [{ t: "Question text" }, { t: "Shortlist" , sub: "embedding" }, { t: "Local model picks" }, { t: "Teacher 1-tap" }, { t: "Shared bank" }], { size: 9, depth: 0.16 });\\n    ' + a)
out = out.replace('frame(s, L + 2 * 4.18, 3.8, 4.05, 2.35, "DELIBERATELY NOT STORED");\\n    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.3, 3.7, 1.8, { size: 12, gap: 6 });', 'frame(s, L + 2 * 4.18, 3.8, 4.05, 1.65, "DELIBERATELY NOT STORED");\\n    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.2, 3.7, 1.2, { size: 11, gap: 3 });')
out = out.replace('const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.5, w = 4.05;\\n      frame(s, x, y, w, 2.35, g[0]);\\n      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.7, fontSize: 12 });', 'const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.25, w = 4.05;\\n      frame(s, x, y, w, 2.1, g[0]);\\n      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.5, fontSize: 12 });')
# coverage map appendix before the closing slide
cov = open(str(P / "coverage.js"), encoding="utf-8").read()
out = out.replace("  // ================================================================ FINAL", cov + "\\n  // ================================================================ FINAL", 1)''')
p.write_text(s, encoding="utf-8")
print("ok")
