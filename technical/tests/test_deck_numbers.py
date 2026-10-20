# Purpose: tests for scripts/deck_numbers.py (single source of numbers for slides): schema validation, bar re-evaluation,
#          detection of dishonest `passed_bar`, missing-bar reporting.
import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import deck_numbers as dn  # noqa: E402


def _write(tmp_path, results, name="x"):
    d = tmp_path / name / "artifacts" / "v1.0.0"
    d.mkdir(parents=True)
    doc = {"contract_version": "1.0.0", "model_version": "v1.0.0", "evaluated_at": "2026-10-21T00:00:00+00:00",
           "generator_seed": 42, "results": results}
    (d / "metrics.json").write_text(json.dumps(doc), encoding="utf-8")


def _res(key, module, origin, value, ok):
    return {"metric_key": key, "module": module, "dataset_origin": origin, "value": value,
            "ci_low": value, "ci_high": value, "passed_bar": ok, "notes": "t"}


def test_evaluate_operators():
    assert dn.evaluate({"operator": ">=", "target": 0.9}, 0.9)
    assert not dn.evaluate({"operator": ">", "target": 0.9}, 0.9)
    assert dn.evaluate({"operator": "between", "min_target": 0.77, "max_target": 0.83}, 0.8)
    assert not dn.evaluate({"operator": "between", "min_target": 0.77, "max_target": 0.83}, 0.9)
    assert dn.evaluate({"operator": "<=", "target": 0.0}, 0.0)


def test_repo_metrics_files_are_valid_and_honest():
    """Whatever artifacts agents have produced so far must be schema-valid with truthful passed_bar flags."""
    rows, problems = dn.collect(dn.find_metric_files())
    assert not problems, problems
    bars = dn.load_bars()
    for r in rows:
        assert r["metric_key"] in bars
        assert dn.evaluate(bars[r["metric_key"]], r["value"]) == bool(r["passed_bar"]), r["metric_key"]


def test_dishonest_passed_bar_is_detected(tmp_path):
    _write(tmp_path, [_res("irt_difficulty_recovery_r_n60", "irt", "synthetic", 0.50, True)])  # bar is >= 0.90
    text, code = dn.build_report(strict=True, root=tmp_path)
    assert "recomputed False" in text
    assert code == 1


def test_failed_blocking_bar_fails_strict(tmp_path):
    _write(tmp_path, [_res("irt_difficulty_recovery_r_n60", "irt", "synthetic", 0.50, False)])
    text, code = dn.build_report(strict=True, root=tmp_path)
    assert "FAIL" in text and code == 1


def test_missing_blocking_bars_reported_and_fail_strict(tmp_path):
    _write(tmp_path, [_res("public_oulad_roc_auc_day28", "public_validation", "public", 0.75, True)])
    text, code = dn.build_report(strict=True, root=tmp_path)
    assert "Not measured yet" in text and "blocking" in text
    assert code == 1
    _, code_lenient = dn.build_report(strict=False, root=tmp_path)
    assert code_lenient == 0


def test_origin_mismatch_is_flagged(tmp_path):
    _write(tmp_path, [_res("public_oulad_roc_auc_day28", "public_validation", "synthetic", 0.75, True)])
    text, _ = dn.build_report(strict=False, root=tmp_path)
    assert "origin synthetic != bar origin public" in text


def test_duplicate_metric_keys_flagged(tmp_path):
    for name in ("a", "b"):
        _write(tmp_path, [_res("public_oulad_roc_auc_day28", "public_validation", "public", 0.75, True)], name)
    text, _ = dn.build_report(strict=False, root=tmp_path)
    assert "duplicate metric_key" in text
