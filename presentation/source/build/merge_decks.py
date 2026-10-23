"""Combine slides from candidate-A v2.2 and candidate-B v4.2 into one deck (python-pptx, no PowerPoint needed).
Base = B. PICK maps B slide number -> A slide number to use instead; ORDER is the final sequence of base slides after swaps.
Run: python merge_decks.py"""
import copy
from pathlib import Path

from pptx import Presentation

D = Path(__file__).resolve().parents[2] / "decks"
A = Presentation(str(D / "AlphaQ_CaseB_Round1_candidate-A_v2.2.pptx"))
B = Presentation(str(D / "AlphaQ_CaseB_Round1_candidate-B_v4.2.pptx"))
OUT = D / "AlphaQ_CaseB_Round1_COMBINED_v5.pptx"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"

# (A slide number, B layout to use, position: final slide gets inserted at this 1-based index of the final order)
TAKE_FROM_A = [(1, "TITLE"), (5, "CONTENT_BLANK"), (6, "CONTENT_BLANK"), (9, "CONTENT_BLANK"), (13, "CONTENT_BLANK")]
DROP_FROM_B = [1, 5, 6, 9, 13]  # B slide numbers replaced


def layout(prs, name):
    return next(l for l in prs.slide_layouts if l.name == name)


def clone(src, dst_prs, layout_name):
    s = dst_prs.slides.add_slide(layout(dst_prs, layout_name))
    for sh in list(s.shapes):
        sh._element.getparent().remove(sh._element)
    rid = {}
    for rel in src.part.rels.values():
        if rel.reltype.endswith("/image"):
            _, new = s.part.get_or_add_image_part(__import__("io").BytesIO(rel.target_part.blob))
            rid[rel.rId] = new
    tree = s.shapes._spTree
    for el in src.shapes._spTree:
        if el.tag.endswith("}nvGrpSpPr") or el.tag.endswith("}grpSpPr"):
            continue
        e = copy.deepcopy(el)
        for node in e.iter():
            for k in (R + "embed", R + "link"):
                if k in node.attrib and node.attrib[k] in rid:
                    node.attrib[k] = rid[node.attrib[k]]
        if "".join(e.itertext()).startswith("SECTION "):
            continue
        tree.append(e)
    if src.has_notes_slide:
        s.notes_slide.notes_text_frame.text = src.notes_slide.notes_text_frame.text
    return s


base_ids = list(B.slides._sldIdLst)
new = [clone(A.slides[n - 1], B, lay) for n, lay in TAKE_FROM_A]
lst = B.slides._sldIdLst
all_ids = list(lst)
new_ids = all_ids[len(base_ids):]
# final order: A title, B 2-4, A arch, A product, B 7-8, A ranges, B 10-12, A validation, rest of B (14..)
order = [new_ids[0], base_ids[1], base_ids[2], base_ids[3], new_ids[1], new_ids[2], base_ids[6], base_ids[7], new_ids[3], base_ids[9], base_ids[10], base_ids[11], new_ids[4]] + base_ids[13:]
for e in all_ids:
    lst.remove(e)
for e in order:
    lst.append(e)
dropped = [base_ids[i - 1] for i in DROP_FROM_B]
for e in dropped:
    B.part.drop_rel(e.rId)
B.save(str(OUT))
print("saved", OUT, len(B.slides._sldIdLst), "slides")
