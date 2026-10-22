"""Assemble deck.js v5 (12 content slides + appendix) from the v4 generator (deck_v4_blue.js) and parts/v5/*.js.
Run from slides/build: python assemble_v5.py && node deck.js"""
import re
from pathlib import Path

B = Path(__file__).resolve().parent
P = B / "parts" / "v5"
src = (B / "deck_v4_blue.js").read_text(encoding="utf-8")
part = lambda n: (P / n).read_text(encoding="utf-8")

MARK = "  // ================================================================ "
head_end = src.index("  const NAVTABS")
first_block = src.index(MARK)
prefix = src[:head_end] + part("content.js")
prefix = prefix.replace("(light multi-colour style v3)", "(v5: blue consulting style, 12 content slides)")

# split into named blocks
blocks = {}
names = []
for m in re.finditer(re.escape(MARK) + r"(.*)\n", src):
    names.append((m.group(1).strip(), m.start()))
for i, (n, st) in enumerate(names):
    en = names[i + 1][1] if i + 1 < len(names) else len(src)
    blocks[n] = src[st:en]


def strip_sections(b):
    return re.sub(r"  pres\.addSection\(\{ title: \"[^\"]+\" \}\);\n", "", b)


def sect(name):
    return f'  pres.addSection({{ title: "{name}" }});\n'


# subtitle -> (section, new subtitle or None, heading, tab)
HEADS = {
    "Institutes hold the data": ("Problem", None, "THE PROBLEM AND THE MARKET", 1),
    "We estimate what each student knows": ("Technology", None, "LEARNING ANALYTICS", 3),
    "A short, supportive list each week": ("Technology", None, "EARLY WARNING", 3),
    "An honest percentile range": ("Technology", None, "PERCENTILE RANGE AND PARENT REPORTS", 3),
    "Built for the law": ("Trust", None, "PRIVACY, SAFETY AND COMPLIANCE", 4),
    "It pays for itself": ("Appendix", "Appendix 1: the assumptions behind the institute return, with ranges and confidence", "APPENDIX 1: INSTITUTE RETURN ASSUMPTIONS", 7),
    "The economics are real": ("Appendix", "Appendix 2: what moves the answer: price, effect size, acquisition cost and churn", "APPENDIX 2: SENSITIVITY", 7),
    "Appendix 5: Bear, Base and Bull": ("Appendix", "Appendix 3: Bear, Base and Bull for a mid-size institute, plus segments", "APPENDIX 3: SCENARIOS", 7),
    "Appendix 2: about": ("Appendix", "Appendix 4: about ₹3.6 per student per month, ₹0 extra run locally", "APPENDIX 4: COST PER STUDENT", 7),
    "Appendix 1: 31 tables": ("Appendix", "Appendix 5: 31 tables in five groups, all isolated per institute", "APPENDIX 5: DATA MODEL", 7),
    "Appendix 3: the rules": ("Appendix", "Appendix 6: the rules we design against, and what we do about each", "APPENDIX 6: LEGAL BASIS", 7),
    "Six screens of the same flow": ("Appendix", "Appendix 8: six screens of the same flow, from upload to parent report", "APPENDIX 8: PRODUCT TOUR", 7),
}


def patch_content(b):
    def rep(m):
        sec_, sub, rub = m.group(1), m.group(2), m.group(3)
        for k, (s2, newsub, h, t) in HEADS.items():
            if sub.startswith(k):
                return f'content("{s2}", "{newsub or sub}", "{rub}", ["{h}", {t}])'
        raise SystemExit("no heading for: " + sub)
    return re.sub(r'content\("([^"]+)", "([^"]+)", "([^"]+)"\)', rep, b)


def apx_split(b):
    b = strip_sections(b)
    body = b[b.index("\n") + 1:]  # drop the marker line
    return ["  {" + x for x in ("\n" + body).split("\n  {")[1:]]


title = blocks["TITLE"]
problem = strip_sections(blocks["1 PROBLEM"])
problem = re.sub(r'    frame\(s, L, 4\.25, 4\.75, 2\.7, "WHEN STUDENTS LEAVE AND RETURN"\);\n.*?\n.*?ASSUMPTION, LOW CONFIDENCE.*?\n', lambda m: part("market.js"), problem, flags=re.S)
assert "WHO WE SERVE" in problem
tour = strip_sections(blocks["2 PRODUCT TOUR"])
tour = tour.replace("2 PRODUCT TOUR", "A8 PRODUCT TOUR")
arch = strip_sections(blocks["3 ARCHITECTURE (full-bleed)"])
analytics = strip_sections(blocks["4 LEARNING ANALYTICS"])
ew = strip_sections(blocks["5 EARLY WARNING"])
report = strip_sections(blocks["6 PREDICTION + REPORT"])
privacy = strip_sections(blocks["7 PRIVACY"])
diff = strip_sections(blocks["8 DIFFERENT (dark image)"]).replace('sectionTitle: "Technology"', 'sectionTitle: "Appendix"')
roi = strip_sections(blocks["9 ROI"])
unit = strip_sections(blocks["10 UNIT ECONOMICS"])
apx = apx_split(blocks["APPENDIX"])  # data model, cost, legal, how we test, scenarios
final = blocks["FINAL"]
by = {k: v for k, v in zip(["data", "cost", "legal", "test", "scen"], apx)}

order = [title, part("exec.js"), sect("Problem"), problem, part("stress.js"), part("product.js"),
         sect("Technology"), arch, analytics, ew, report, sect("Trust"), privacy,
         part("business.js"), part("gtm.js"), part("validation.js"),
         sect("Appendix"), roi, unit, by["scen"] + "\n", by["cost"] + "\n", by["data"] + "\n", by["legal"] + "\n", part("modelcard.js"), tour, diff, part("sources.js"), final]
out = prefix + "".join(patch_content(x) for x in order)
import re as _re
out = _re.sub(r'kit\.panels\("(tab|dash|tint|ring|left)"\)', 'kit.panels("mix")', out)
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
out = out.replace(a, 'text(s, [{ text: "Same pipeline, next jobs: ", options: { bold: true, color: T.tealDark } }, { text: "a 7-day study plan and doubt answers drawn from retrieved notes, under the same checks. Designed, not in the Round 1 build." }], { x: rx + 0.12, y: 5.5, w: rw - 0.24, h: 0.68, fontSize: 9, color: T.ink });\n    ' + a)
# tagging strip on the data model appendix
a = 'labelBar(s, L, 6.4, CWD, "Row-level security on every tenant table'
assert a in out
out = out.replace(a, 'text(s, "HOW EVERY QUESTION GETS ITS TOPIC (SO TAGGING COSTS FALL AS WE GROW)", { x: L, y: 5.55, w: 8, h: 0.24, fontSize: 10, bold: true, color: T.tealDark, charSpacing: 0.5 });\n    chevrow(s, L, 5.83, 8.0, 0.5, [{ t: "Question text" }, { t: "Shortlist" , sub: "embedding" }, { t: "Local model picks" }, { t: "Teacher 1-tap" }, { t: "Shared bank" }], { size: 9, depth: 0.16 });\n    ' + a)
out = out.replace('frame(s, L + 2 * 4.18, 3.8, 4.05, 2.35, "DELIBERATELY NOT STORED");\n    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.3, 3.7, 1.8, { size: 12, gap: 6 });', 'frame(s, L + 2 * 4.18, 3.8, 4.05, 1.65, "DELIBERATELY NOT STORED");\n    lines(s, ["Counselling notes or mental-health information", "ID document images", "Student photographs", "Any public rank"], L + 2 * 4.18 + 0.2, 4.2, 3.7, 1.2, { size: 11, gap: 3 });')
out = out.replace('const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.5, w = 4.05;\n      frame(s, x, y, w, 2.35, g[0]);\n      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.7, fontSize: 12 });', 'const x = L + (i % 3) * 4.18, y = 1.3 + Math.floor(i / 3) * 2.25, w = 4.05;\n      frame(s, x, y, w, 2.1, g[0]);\n      text(s, g[1], { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 1.5, fontSize: 12 });')
# coverage map appendix before the closing slide
cov = open(str(P / "coverage.js"), encoding="utf-8").read()
out = out.replace("  // ================================================================ FINAL", cov + "\n  // ================================================================ FINAL", 1)
(B / "deck.js").write_text(out, encoding="utf-8")
print("deck.js written,", out.count("pres.addSlide") - 1, "addSlide calls,", out.count("content(\"") - 1, "content() calls")
