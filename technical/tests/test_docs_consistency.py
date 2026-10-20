# Purpose: cross-check Round 1 agent prompts, the generator config draft and the frozen contracts, so agents are not sent after
#          files, metric keys or numbers that do not exist, and so statistical power is known BEFORE building.
# Run (from technical/): python -m pytest tests -q
import math
import re
from pathlib import Path

import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]
CONTRACTS = ROOT / "contracts"
DOCS = ROOT / "docs"
PROMPTS = sorted((DOCS / "agent_prompts").glob("R1_*.md"))


def _load(path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def _config():
    return _load(DOCS / "generator_config_draft.yaml")


def _enum_values(name, fallback):
    enums = _load(CONTRACTS / "enums.yaml")["enums"]
    return set(enums[name]["values"]) if name in enums else set(fallback)


def test_round1_prompts_exist():
    names = {p.name for p in PROMPTS}
    assert {"R1_00_COMMON.md", "R1_A_datagen.md", "R1_B_irt_mastery.md", "R1_C_risk_band.md",
            "R1_D_public_validation.md", "R1_E_genai_reports.md"} <= names


@pytest.mark.parametrize("prompt", PROMPTS, ids=lambda p: p.name)
def test_contract_paths_in_prompts_exist(prompt):
    text = prompt.read_text(encoding="utf-8")
    missing = []
    for rel in set(re.findall(r"contracts/([A-Za-z0-9_./-]+)", text)):
        rel = rel.rstrip(".,)`:;")
        if "*" in rel or rel.endswith("/") or rel == "":
            continue
        if not (CONTRACTS / rel).exists():
            missing.append(rel)
    assert not missing, f"{prompt.name} references missing contract files: {sorted(missing)}"


METRIC_PREFIXES = ("irt_", "mastery_", "ew_", "falling_behind_", "fee_default_", "fairness_", "conformal_",
                   "public_", "genai_", "omr_", "tagging_", "cost_per_")


@pytest.mark.parametrize("prompt", PROMPTS, ids=lambda p: p.name)
def test_metric_keys_in_prompts_exist_in_bars(prompt):
    bars = {b["metric_key"] for b in _load(CONTRACTS / "metrics_bars.yaml")["bars"]}
    text = prompt.read_text(encoding="utf-8")
    keys = {t for t in re.findall(r"`([a-z0-9_]+)", text) if t.startswith(METRIC_PREFIXES)}
    unknown = sorted(k for k in keys if k not in bars)
    assert not unknown, f"{prompt.name} names metric keys not in metrics_bars.yaml: {unknown}"


def test_feature_names_in_risk_prompt_exist():
    feats = {f["name"] for f in _load(CONTRACTS / "features.yaml")["features"]}
    text = (DOCS / "agent_prompts" / "R1_C_risk_band.md").read_text(encoding="utf-8")
    cand = {t for t in re.findall(r"`([a-z0-9_]+)`", text)
            if t.startswith(("attendance_rate_", "score_z_", "tests_missed_", "consecutive_", "days_overdue",
                             "mastery_theta_slope", "doubts_asked", "app_logins"))}
    assert cand, "expected some feature names in the risk prompt"
    assert not (cand - feats), f"unknown features in prompt: {sorted(cand - feats)}"


def test_amended_bars_present_and_sane():
    bars = {b["metric_key"]: b for b in _load(CONTRACTS / "metrics_bars.yaml")["bars"]}
    assert bars["irt_difficulty_recovery_r_n60"]["target"] >= 0.90
    assert bars["irt_difficulty_recovery_r_n30"]["gate"] == "blocking"
    for k in ("ew_median_lead_time_days", "ew_gradual_dropout_recall_at_capacity"):
        assert bars[k]["gate"] == "report", f"{k} must be report-only (gameable / generator-dependent)"
    for k in ("ew_gradual_recall_rel_gain_over_rule_at_capacity", "ew_precision_at_capacity_rel_gain_over_rule"):
        assert bars[k]["gate"] == "blocking"


def test_config_class_mix_and_rates():
    c = _config()
    assert math.isclose(sum(c["students"]["class_mix"].values()), 1.0, abs_tol=1e-9)
    assert 0.12 <= c["dropout"]["annual_rate"] <= 0.25
    assert 0.20 <= c["dropout"]["sudden_share"] <= 0.30
    assert sum(c["dropout"]["reasons_mix"].values()) == pytest.approx(1.0)
    assert c["students"]["min_age_at_enrolment"] == 16  # MoE 2024
    assert c["fees"]["refund_on_withdrawal"].startswith("pro_rata")


def test_config_exam_patterns_match_contracts():
    c = _config()["exam_patterns"]
    ep = _load(CONTRACTS / "exam_patterns.yaml")["patterns"]
    jee = ep["jee_main_2026"]
    n_q = len(jee["subjects"]) * sum(s["total_questions"] for s in jee["sections_per_subject"])
    assert n_q == 75
    assert c["JEE_MAIN_2026"]["marking"]["correct"] == jee["sections_per_subject"][0]["correct_marks"] == 4
    assert c["JEE_MAIN_2026"]["marking"]["wrong"] == jee["sections_per_subject"][0]["wrong_marks"] == -1
    assert c["JEE_MAIN_2026"]["duration_min"] == jee["duration_min"] == 180
    neet = ep["neet_ug_2026"]
    assert neet["verified"] is False
    assert set(c["NEET_UG_2026"]["variants"]) == set(neet["variants"])
    for name, v in neet["variants"].items():
        questions = 4 * sum(s["questions_to_attempt"] for s in v["sections_per_subject"])
        assert questions == 180 and questions * 4 == v["max_marks"] == 720, name


def test_config_values_map_to_contract_enums():
    exam_map = {"JEE": "jee_main", "NEET": "neet_ug", "MIX": "mix"}
    tier_map = {1: "tier_1", 2: "tier_2", 3: "tier_3"}
    focus = _enum_values("exam_focus", {"jee_main", "neet_ug", "mix"})
    tiers = _enum_values("city_tier", {"tier_1", "tier_2", "tier_3"})
    for inst in _config()["institutes"]:
        assert exam_map[inst["exam"]] in focus
        assert tier_map[inst["tier"]] in tiers
    assert {"class_11", "class_12", "dropper"} <= _enum_values("class_level", {"class_11", "class_12", "dropper"})


def test_statistical_power_of_planned_full_preset():
    """Events available for evaluation, computed from the config (not simulated). Documents the small-institute problem."""
    c = _config()
    rate = c["dropout"]["annual_rate"]
    events_per_year = {i["id"]: i["students"] * rate for i in c["institutes"]}
    total = sum(events_per_year.values())
    assert total >= 300, "final-year test cohort needs >= 300 dropout events for stable AUC-PR/recall CIs"
    assert total * (1 - c["dropout"]["sudden_share"]) >= 210
    small = {k for k, v in events_per_year.items() if v < 30}
    # Not a failure: the small institute is expected to be reported as "insufficient data" for per-slice fairness
    # and leave-one-institute-out CIs will be wide. The agent prompt must say so.
    risk_prompt = (DOCS / "agent_prompts" / "R1_C_risk_band.md").read_text(encoding="utf-8")
    assert "insufficient data" in risk_prompt
    assert small == {"smalltown_mix"}


@pytest.mark.parametrize("prompt", [p for p in PROMPTS if p.name != "R1_00_COMMON.md"], ids=lambda p: p.name)
def test_agent_prompts_forbid_editing_contracts_and_committing(prompt):
    text = prompt.read_text(encoding="utf-8").lower()
    assert "do not edit contracts" in text
    assert "do not commit or tag" in text
