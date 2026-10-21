"""Produce real (template-path) parent reports from backend/app/genai for the slide mock-up. Run from technical/:
   python ../slides/build/dump_report_samples.py
Writes slides/build/report_samples.json (synthetic student, placeholders replaced by a synthetic name)."""
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
TECH = HERE.parents[1] / "technical"
sys.path.insert(0, str(TECH))

from backend.app.genai import NullClient, build_numbers, generate_report, substitute_placeholders  # noqa: E402

out = {}
for lang, name, inst in (("hi", "आरव (काल्पनिक)", "AlphaQ डेमो संस्थान"), ("en", "Aarav (synthetic)", "AlphaQ Demo Institute")):
    numbers = build_numbers({
        "period": "2026-W20", "lang": lang, "attendance_pct": 86.5, "tests_taken": 6, "trend": "improving",
        "strengths": [{"topic_id": "jee.phy.kinematics", "mastery_band": "strong"},
                      {"topic_id": "jee.math.statistics_probability", "mastery_band": "strong"}],
        "focus": [{"topic_id": "jee.phy.thermodynamics_phy", "mastery_band": "building"},
                  {"topic_id": "jee.phy.electromagnetic_waves", "mastery_band": "building"}],
    })
    report = generate_report(numbers, lang=lang, client=NullClient())
    final = substitute_placeholders(report, student_name=name, institute_name=inst)
    content = final.content if hasattr(final, "content") else final
    out[lang] = {"verified": bool(report.verified), "path": report.path, "title": content["title"], "body": content["body"]}
(HERE / "report_samples.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
for k, v in out.items():
    print(k, v["verified"], v["path"], len(v["body"].split()), "words")
    print(v["title"]); print(v["body"][:400]); print()
