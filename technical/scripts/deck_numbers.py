"""Single source of numbers for slides and the report.

Merges every `**/artifacts/v*/metrics.json` under technical/, validates each against contracts/metrics.schema.json,
re-evaluates every result against contracts/metrics_bars.yaml (does not trust `passed_bar`), and prints a table labelled
by dataset origin (synthetic / public / real_photo). Bars with no measurement yet are listed as NOT MEASURED.

Usage (from technical/):  python scripts/deck_numbers.py [--strict] [--markdown out.md]
Exit code 1 with --strict if a blocking bar failed or is missing.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import yaml
from jsonschema import Draft202012Validator

ROOT = Path(__file__).resolve().parents[1]


def _rel(path: Path, root: Path) -> str:
    try:
        return str(path.relative_to(root))
    except ValueError:
        return str(path)


def load_bars() -> dict:
    doc = yaml.safe_load((ROOT / "contracts" / "metrics_bars.yaml").read_text(encoding="utf-8"))
    return {b["metric_key"]: b for b in doc["bars"]}


def evaluate(bar: dict, value: float) -> bool:
    op = bar["operator"]
    if op == "between":
        return bar["min_target"] <= value <= bar["max_target"]
    t = bar["target"]
    return {">=": value >= t, "<=": value <= t, ">": value > t, "<": value < t, "==": value == t}[op]


def find_metric_files(root: Path = ROOT) -> list[Path]:
    skip = {".venv", "node_modules", ".git", "__pycache__"}
    out = []
    for p in root.rglob("metrics.json"):
        if any(part in skip for part in p.parts):
            continue
        if p.parent.parent.name == "artifacts" and p.parent.name.startswith("v"):
            out.append(p)
    return sorted(out)


def collect(files: list[Path], root: Path = ROOT) -> tuple[list[dict], list[str]]:
    schema = json.loads((ROOT / "contracts" / "metrics.schema.json").read_text(encoding="utf-8"))
    validator = Draft202012Validator(schema)
    rows, problems = [], []
    seen: dict[str, Path] = {}
    for f in files:
        doc = json.loads(f.read_text(encoding="utf-8"))
        for err in validator.iter_errors(doc):
            problems.append(f"{_rel(f, root)}: schema: {err.message}")
        for r in doc.get("results", []):
            key = r["metric_key"]
            if key in seen:
                problems.append(f"duplicate metric_key {key} in {_rel(f, root)} and {_rel(seen[key], root)}")
            seen[key] = f
            rows.append({**r, "file": _rel(f, root), "seed": doc.get("generator_seed")})
    return rows, problems


def build_report(strict: bool = False, root: Path = ROOT) -> tuple[str, int]:
    bars = load_bars()
    rows, problems = collect(find_metric_files(root), root)
    lines = ["| metric | origin | value | 95% CI | bar | gate | status |", "|---|---|---|---|---|---|---|"]
    failed_blocking, measured = [], set()
    for r in sorted(rows, key=lambda x: (x["module"], x["metric_key"])):
        bar = bars.get(r["metric_key"])
        measured.add(r["metric_key"])
        if bar is None:
            problems.append(f"{r['metric_key']}: no bar in metrics_bars.yaml")
            status, bar_txt, gate = "NO BAR", "-", "-"
        else:
            ok = evaluate(bar, r["value"])
            if ok != bool(r["passed_bar"]):
                problems.append(f"{r['metric_key']}: file says passed_bar={r['passed_bar']} but recomputed {ok}")
            if bar["dataset_origin"] != r["dataset_origin"]:
                problems.append(f"{r['metric_key']}: origin {r['dataset_origin']} != bar origin {bar['dataset_origin']}")
            gate = bar["gate"]
            bar_txt = (f"{bar['min_target']}-{bar['max_target']}" if bar["operator"] == "between"
                       else f"{bar['operator']} {bar['target']}")
            status = "PASS" if ok else ("FAIL" if gate == "blocking" else "below target (report)")
            if not ok and gate == "blocking":
                failed_blocking.append(r["metric_key"])
        lines.append(f"| `{r['metric_key']}` | {r['dataset_origin']} | {r['value']:.4g} | "
                     f"{r['ci_low']:.4g} to {r['ci_high']:.4g} | {bar_txt} | {gate} | {status} |")
    missing = [k for k, b in bars.items() if k not in measured]
    missing_blocking = [k for k in missing if bars[k]["gate"] == "blocking"]
    lines += ["", f"**Measured:** {len(measured)} of {len(bars)} bars. **Not measured yet:** {len(missing)} "
              f"({len(missing_blocking)} blocking).", ""]
    if missing:
        lines.append("Not measured: " + ", ".join(f"`{k}`" for k in sorted(missing)))
    if problems:
        lines += ["", "**Problems:**"] + [f"- {p}" for p in problems]
    code = 1 if strict and (failed_blocking or missing_blocking or problems) else 0
    return "\n".join(lines), code


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--strict", action="store_true")
    ap.add_argument("--markdown")
    args = ap.parse_args()
    text, code = build_report(args.strict)
    print(text)
    if args.markdown:
        Path(args.markdown).write_text(text + "\n", encoding="utf-8")
    return code


if __name__ == "__main__":
    sys.exit(main())
