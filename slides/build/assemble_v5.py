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
(B / "deck.js").write_text(out, encoding="utf-8")
print("deck.js written,", out.count("pres.addSlide") - 1, "addSlide calls,", out.count("content(\"") - 1, "content() calls")
