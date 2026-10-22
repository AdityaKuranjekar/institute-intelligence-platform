# Purpose: guard the generated deck: slide count and order, mandatory last slide (AI disclosure), no leftover filler, no text overflow.
import re
import sys
import zipfile
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parents[2]
PPTX = REPO / "presentation" / "decks" / "AlphaQ_CaseB_Round1_CURRENT_v4.pptx"
BUILD = REPO / "presentation" / "source" / "build"


def _slide_texts():
    z = zipfile.ZipFile(PPTX)
    names = sorted((n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)), key=lambda n: int(re.findall(r"\d+", n)[0]))
    return [" ".join(re.findall(r"<a:t>([^<]*)</a:t>", z.read(n).decode("utf-8"))) for n in names]


def test_deck_exists_with_expected_structure():
    assert PPTX.exists(), "build it: cd presentation/source/build && python build_all.py v4"
    texts = _slide_texts()
    assert len(texts) == 22  # title + 12 content + 8 appendix + final
    assert "CASE B" in texts[0]
    assert "How we used AI" in texts[-1], "PS rule 2: AI-use disclosure must be the final slide"
    content_slides = texts[1:13]
    assert len(content_slides) == 12  # PS limit: max 12 content slides (+ title and appendix)


def test_no_filler_or_ai_tell_words_and_no_dash_punctuation():
    text = " ".join(_slide_texts()).lower()
    for bad in ("lorem", "todo", "\u2014", "delve", "unleash", "seamless", "cutting-edge", "game-chang", "leverage"):
        assert bad not in text, bad


def test_unverified_numbers_are_not_presented_as_results():
    text = " ".join(_slide_texts())
    assert "500/500" not in text and "500 of 500" not in text
    assert "PENDING" in text  # pending items stay visibly marked until replaced by measured values


def test_every_content_slide_tags_its_numbers_by_origin():
    texts = _slide_texts()
    # slides with numeric claims must carry one of the origin tags
    for idx in (6, 7, 10):  # 1-based slide numbers of: analytics, ROI, unit economics ... (title is slide 1)
        t = texts[idx].upper()
        assert any(k in t for k in ("PUBLIC DATA", "MODEL OUTPUT", "SYNTHETIC DATA", "GUIDE BASELINE")), f"slide {idx + 1} lacks an origin tag"


def test_layout_has_no_text_overflow():
    pytest.importorskip("lxml")
    pytest.importorskip("PIL")
    if not Path("C:/Windows/Fonts/calibri.ttf").exists():
        pytest.skip("Windows fonts not available")
    sys.path.insert(0, str(BUILD))
    import importlib

    rc = importlib.import_module("render_check")
    import tempfile

    issues = rc.render(str(PPTX), tempfile.mkdtemp())
    assert issues == [], issues


def test_html_and_chart_assets_exist_and_have_expected_sizes():
    from PIL import Image
    assets = REPO / "presentation" / "source" / "assets"
    for name in ("arch_under_the_hood", "what_makes_us_different"):
        assert Image.open(assets / f"{name}.png").size == (1920, 1080)
    for name in ("screen_heatmap", "screen_support_list", "screen_student_profile", "screen_upload", "screen_owner", "screen_parent_report", "screen_consent"):
        assert (assets / f"{name}.png").stat().st_size > 50_000, name
    for name in ("oulad_by_day", "assist_bars", "calibration", "privacy_cost", "value_vs_cost", "roster", "price_benchmark", "ltv_segments"):
        assert (assets / f"chart_{name}.png").exists(), name


def test_charts_use_real_result_numbers():
    import json
    summary = json.loads((REPO / "technical/ml/public_validation/artifacts/v1.0.0/public_validation_summary.json").read_text(encoding="utf-8"))
    text = " ".join(_slide_texts())
    assert f"{summary['assistments2009']['models']['irt_online_eap']['mean_auc']:.3f}" in text
    assert f"{summary['oulad']['28']['models']['lgbm_acad_behav_student_cv']['roc_auc']:.3f}" in text
