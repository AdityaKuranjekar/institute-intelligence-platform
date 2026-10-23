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
def polish(prs):
    """Small post-merge improvements: callout markers off the phone text (slide 6), quadrant labels and evidence tags (slide 13)."""
    from pptx.util import Emu, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
    u = 9144

    def find(slide, text):
        return next(sh for sh in slide.shapes if sh.has_text_frame and sh.text_frame.text.strip() == text)

    def mover(slide, shape_idx, x, y):
        for sh in list(slide.shapes)[shape_idx:shape_idx + 2]:
            sh.left, sh.top = Emu(x * u), Emu(y * u)

    def label(slide, x, y, w, h, text, size=9, color="5B6B82", bold=True, align=PP_ALIGN.LEFT):
        tb = slide.shapes.add_textbox(Emu(x * u), Emu(y * u), Emu(w * u), Emu(h * u))
        tf = tb.text_frame
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.alignment = align
        r = p.add_run()
        r.text = text
        r.font.size, r.font.bold = Pt(size), bold
        r.font.color.rgb = RGBColor.from_string(color)
        return tb

    s6 = prs.slides[5]
    mover(s6, 32, 1056, 128)   # marker 3 on phone 2 status bar
    mover(s6, 34, 1248, 128)   # marker 4 on phone 3 status bar
    s13 = prs.slides[12]
    for text, x, y in [("ACT NOW", 711, 176), ("PLAN THE FIX", 526, 176), ("WATCH", 711, 348), ("ACCEPT", 526, 348)]:
        label(s13, x - (0 if x < 700 else 0), y, 80, 16, text, size=9, color="8A6D2B" if text != "ACT NOW" else "B03A2E")
    for y, tag in [(168, "PUBLIC DATA"), (228, "PUBLIC DATA"), (288, "PUBLIC DATA"), (348, "CODE"), (408, "NEXT"), (468, "NOT YET")]:
        label(s13, 385, y + 4, 84, 14, tag, size=8, align=PP_ALIGN.RIGHT)

polish(B)
B.save(str(OUT))
print("saved", OUT, len(B.slides._sldIdLst), "slides")
