# Purpose: keep the slide design system and blueprints honest: contrast claims are computed, every mock-up id and file path
#          referenced by the blueprints exists, slide count respects the PS limit, and no unverified number sneaks in.
# Run (from technical/): python -m pytest tests -q
import re
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parents[2]
SLIDES = REPO / "presentation" / "docs"


def _lum(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4  # noqa: E731
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a: str, b: str) -> float:
    la, lb = _lum(a), _lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


TOKENS = {"navy": "#0B2545", "ink": "#1B2A41", "muted": "#4F5D75", "teal": "#0F8B8D", "teal_dark": "#0A6F71",
          "teal_tint": "#E3F2F2", "tint": "#F4F7FB", "white": "#FFFFFF", "amber": "#F2A900", "red": "#B3261E",
          "green": "#1B7F4F", "teal_on_dark": "#19B5B7"}


def test_design_tokens_in_doc_match_code():
    text = (SLIDES / "DESIGN_SYSTEM.md").read_text(encoding="utf-8")
    for name, hex_value in TOKENS.items():
        if name == "white":
            continue
        assert hex_value in text, f"{name} {hex_value} missing from DESIGN_SYSTEM.md"


@pytest.mark.parametrize("fg,bg,minimum", [
    ("navy", "white", 4.5), ("ink", "white", 4.5), ("muted", "white", 4.5), ("muted", "tint", 4.5),
    ("teal_dark", "white", 4.5), ("white", "teal_dark", 4.5), ("navy", "teal_tint", 4.5), ("teal_dark", "teal_tint", 4.5),
    ("white", "navy", 4.5), ("navy", "amber", 4.5), ("red", "white", 4.5), ("green", "white", 4.5),
    ("teal_on_dark", "navy", 4.5),
])
def test_text_pairs_meet_wcag_aa(fg, bg, minimum):
    assert contrast(TOKENS[fg], TOKENS[bg]) >= minimum


def test_teal_is_not_allowed_for_small_text():
    # documented rule: plain teal is for shapes and 24 pt+ numbers only
    assert contrast(TOKENS["teal"], TOKENS["white"]) < 4.5
    assert contrast(TOKENS["navy"], TOKENS["teal"]) < 4.5
    text = (SLIDES / "DESIGN_SYSTEM.md").read_text(encoding="utf-8")
    assert "Never navy on teal" in text


def test_blueprints_have_title_twelve_content_slides_and_final_ai_slide():
    text = (SLIDES / "BLUEPRINTS.md").read_text(encoding="utf-8")
    numbered = re.findall(r"^## (\d+)\. ", text, flags=re.M)
    assert numbered == [str(i) for i in range(1, 13)], numbered  # PS: max 12 content slides
    assert re.search(r"^## Title", text, flags=re.M)
    assert re.search(r"^## FINAL SLIDE: AI-USE DISCLOSURE", text, flags=re.M)
    assert text.rfind("## FINAL SLIDE") > text.rfind("## Appendix"), "AI disclosure must be the last slide (PS rule 2)"


def test_mockup_ids_used_in_blueprints_are_defined():
    blueprints = (SLIDES / "BLUEPRINTS.md").read_text(encoding="utf-8")
    plan = (SLIDES / "MOCKUPS_PLAN.md").read_text(encoding="utf-8")
    used = set(re.findall(r"\bM(\d{1,2})\b", blueprints))
    defined = set(re.findall(r"^\| M(\d{1,2}) \|", plan, flags=re.M))
    assert used, "blueprints should reference mock-ups"
    assert used <= defined, f"undefined mock-ups: {sorted(used - defined, key=int)}"


def test_paths_referenced_in_slide_docs_exist():
    missing = []
    for doc in ("BLUEPRINTS.md", "MOCKUPS_PLAN.md", "DESIGN_SYSTEM.md"):
        text = (SLIDES / doc).read_text(encoding="utf-8")
        for rel in set(re.findall(r"`((?:technical|financial|presentation)/[A-Za-z0-9_./-]+)`", text)):
            rel = rel.rstrip("/.")
            if "*" in rel or rel.endswith(("assets", "mockups")):
                continue
            if not (REPO / rel).exists():
                missing.append(f"{doc}: {rel}")
    assert not missing, missing


def test_every_number_class_has_an_origin_rule_and_no_unverified_claims():
    text = (SLIDES / "BLUEPRINTS.md").read_text(encoding="utf-8")
    for tag in ("Public", "Synthetic", "Model output", "Illustrative mock-up"):
        assert tag in text
    # claims we decided NOT to make until verified
    assert "500/500" not in text.replace("Do not show \"500/500 caught\"", "")
    assert "25 %" in text  # the guide's 25 % appears only as the guide's baseline
    assert "we beat" not in text.lower()


def test_round2_plan_is_free_only():
    text = (REPO / "technical" / "docs" / "ROUND2_PLAN.md").read_text(encoding="utf-8")
    assert "no paid backend, no paid API" in text
    assert "15 content slides" in text
    for needed in ("curveball", "Q&A", "free"):
        assert needed.lower() in text.lower()
