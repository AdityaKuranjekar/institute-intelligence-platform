"""Assemble deck_v3.js (Version 3: dense, human-made hybrid of v1 and v2, finance model v1.1) -> slides/AlphaQ_CaseB_Round1_earlier-3_v3.pptx.
Run from slides/build:  python assemble_v3.py && node deck_v3.js"""
from pathlib import Path

B = Path(__file__).resolve().parent
P3, P2 = B / "parts" / "v3", B / "parts" / "v2"
v4 = (B / "deck_v4_blue.js").read_text(encoding="utf-8")
v1 = (B / "deck.js").read_text(encoding="utf-8")
p3 = lambda n: (P3 / n).read_text(encoding="utf-8")
p2 = lambda n: (P2 / n).read_text(encoding="utf-8")

head = v4[: v4.index("  const titleBox =")].replace("AlphaQ_CaseB_Round1_earlier-1_v1.pptx", "AlphaQ_CaseB_Round1_earlier-3_v3.pptx")
head = head.replace("(Round 1)", "(Round 1, version 3)")


def block(src, marker):
    i = src.index(marker)
    a = src.rfind("\n  {\n", 0, i) + 1
    b = src.index("\n  }\n", i) + 5
    return src[a:b]


data = block(v1, 'content("Appendix", "Appendix 5: 31 tables').replace('["APPENDIX 5: DATA MODEL", 7]', '["APPENDIX 3: DATA MODEL AND QUESTION TAGGING", 7]').replace("Appendix 5: 31 tables", "Appendix 3: 31 tables")
legal = block(v1, 'content("Appendix", "Appendix 6: the rules').replace('["APPENDIX 6: LEGAL BASIS", 7]', '["APPENDIX 4: LEGAL BASIS", 7]').replace("Appendix 6: the rules", "Appendix 4: the rules")
card = block(v1, 'content("Appendix", "Appendix 7: how we will know').replace('["APPENDIX 7: MODEL CARD AND GO-LIVE GATES", 7]', '["APPENDIX 5: MODEL CARD AND GO-LIVE GATES", 7]').replace("Appendix 7: how we will know", "Appendix 5: how we will know")
tour = block(v1, 'content("Appendix", "Appendix 8: six screens').replace('["APPENDIX 8: PRODUCT TOUR", 7]', '["APPENDIX 7: PRODUCT TOUR", 7]').replace("Appendix 8: six screens", "Appendix 7: six screens")
fin_i = v1.index("  // ================================================================ FINAL")
fin = v1[fin_i: v1.index("  await pres.writeFile")]
for b_ in (data, legal, card, tour):
    assert "content(" in b_

# appendix 6 (coverage) and 7 (sources) are the two blocks of v2 appendix2.js
a2 = p2("appendix2.js")
split = a2.index("\n  {\n    const s = content(\"Appendix\", \"Appendix 7")
cover, sources = a2[:split], a2[split + 1:].replace("Appendix 7: every external number", "Appendix 8: every external number").replace("APPENDIX 7: SOURCE REGISTER", "APPENDIX 8: SOURCE REGISTER")

body = (head + p3("chrome.js") + p3("a_title_exec.js") + p3("b_problem.js") + p3("c_stress.js") + p3("d_product.js") + p3("e_arch_learning.js")
        + p3("f_ew_reports_privacy.js") + p3("g_business_gtm_ask.js")
        + p2("appendix.js") + data + "\n" + legal + "\n" + card + "\n" + cover + "\n" + tour + "\n" + sources + "\n" + fin
        + "  await pres.writeFile({ fileName: OUT });\n  console.log(\"written\", OUT);\n}\n\nmain().catch((e) => { console.error(e); process.exit(1); });\n")
body = body.replace("Pragati: Case B", "AlphaQ: Case B")
import os
outjs = "deck_v3.js"
if os.environ.get("REF"):
    import ref_common
    body = ref_common.apply(body, "v3", 9)
    outjs = "deck_v3r.js"
(B / outjs).write_text(body, encoding="utf-8")
print("deck_v3.js written")
