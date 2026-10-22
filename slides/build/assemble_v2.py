"""Assemble deck_v2.js (Version 2: 13-slide pitch + appendix + AI disclosure) and write slides/AlphaQ_CaseB_Round1_v2.pptx.
Reuses three appendix blocks (data model, legal basis, model card) and the closing slide from the Version 1 generator (deck.js).
Run from slides/build:  python assemble_v2.py && node deck_v2.js"""
from pathlib import Path

B = Path(__file__).resolve().parent
P = B / "parts" / "v2"
v4 = (B / "deck_v4_blue.js").read_text(encoding="utf-8")
v1 = (B / "deck.js").read_text(encoding="utf-8")
part = lambda n: (P / n).read_text(encoding="utf-8")

head = v4[: v4.index("  const titleBox =")].replace("AlphaQ_CaseB_Round1_v1.pptx", "AlphaQ_CaseB_Round1_v2.pptx")
head = head.replace("(Round 1)", "(Round 1, version 2)").replace("Builds slides/AlphaQ_CaseB_Round1_v1.pptx", "Builds slides/AlphaQ_CaseB_Round1_v2.pptx")


def block(src, marker):
    i = src.index(marker)
    a = src.rfind("\n  {\n", 0, i) + 1
    b = src.index("\n  }\n", i) + 5
    return src[a:b]


data = block(v1, 'content("Appendix", "Appendix 5: 31 tables').replace('["APPENDIX 5: DATA MODEL", 7]', '["APPENDIX 3: DATA MODEL AND QUESTION TAGGING", 7]').replace("Appendix 5: 31 tables", "Appendix 3: 31 tables")
legal = block(v1, 'content("Appendix", "Appendix 6: the rules').replace('["APPENDIX 6: LEGAL BASIS", 7]', '["APPENDIX 4: LEGAL BASIS", 7]').replace("Appendix 6: the rules", "Appendix 4: the rules")
card = block(v1, 'content("Appendix", "Appendix 7: how we will know').replace('["APPENDIX 7: MODEL CARD AND GO-LIVE GATES", 7]', '["APPENDIX 5: MODEL CARD AND GO-LIVE GATES", 7]').replace("Appendix 7: how we will know", "Appendix 5: how we will know")
for b_ in (data, legal, card):
    assert "content(" in b_
fin_i = v1.index("  // ================================================================ FINAL")
fin = v1[fin_i: v1.index("  await pres.writeFile")]

body = (head + part("chrome.js") + part("s01_s02.js") + part("s03_s06.js") + part("s07_s09.js") + part("s10_s13.js") + part("appendix.js")
        + data + "\n" + legal + "\n" + card + "\n" + part("appendix2.js") + "\n" + fin
        + "  await pres.writeFile({ fileName: OUT });\n  console.log(\"written\", OUT);\n}\n\nmain().catch((e) => { console.error(e); process.exit(1); });\n")
body = body.replace("Pragati: Case B", "AlphaQ: Case B")
(B / "deck_v2.js").write_text(body, encoding="utf-8")
print("deck_v2.js written;", body.count("content(\"") - 1, "content slides;")
