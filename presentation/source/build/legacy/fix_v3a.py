from pathlib import Path
import re

B = Path(__file__).resolve().parent


def sub(path, a, b):
    p = B / path
    s = p.read_text(encoding="utf-8")
    assert a in s, (path, a[:70])
    p.write_text(s.replace(a, b, 1), encoding="utf-8")


NOTE = lambda t, rot: f'note(s, 11.0, 0.72, 1.85, 0.36, "{t}", {rot});'
sub("parts/v3/a_title_exec.js", 'note(s, 11.35, 5.0, 1.45, 0.75, "Hindi and English, checked", 3);', 'note(s, 4.6, 4.45, 1.7, 0.4, "Hindi and English, checked", 3);')
sub("parts/v3/a_title_exec.js", 'note(s, 4.9, 3.62, 1.6, 0.6, "start with the weekly list!", -3);', NOTE("start with the weekly list", -2))
sub("parts/v3/c_stress.js", 'note(s, 10.9, 5.1, 1.75, 0.42, "we cut our own numbers first", 2);', NOTE("we cut our own numbers first", 2))
sub("parts/v3/d_product.js", 'note(s, 5.2, 4.6, 1.5, 0.3, "tap, fix, done", -2);', NOTE("tap, fix, done", -2))
sub("parts/v3/e_arch_learning.js", '"messy export files and synthetic OMR photos"', '"messy files, synthetic OMR photos"')
sub("parts/v3/e_arch_learning.js", "callout(s, 2, L + 0.6, 4.55, 0.28);", "callout(s, 2, L + 5.1, 4.45, 0.28);")
sub("parts/v3/f_ew_reports_privacy.js", '    tag(s, "mock", L + 2.8, 1.3, { size: 7, h: 0.18 });\n', "")
sub("parts/v3/f_ew_reports_privacy.js", 'note(s, 11.3, 4.5, 1.5, 0.3, "built in, not bolted on", 2);', NOTE("built in, not bolted on", 2))
sub("parts/v3/g_business_gtm_ask.js", 'note(s, 7.1, 2.4, 1.6, 0.36, "value = fees + time + admissions", 2);', NOTE("value = fees + time + admissions", 2))
sub("parts/v3/g_business_gtm_ask.js", "{ rowH: 0.265, headH: 0.26, size: 8.5, headFill: T.tealDark, leftCols: [2]", "{ rowH: 0.25, headH: 0.25, size: 8.5, headFill: T.tealDark, leftCols: [2]")
sub("parts/v3/g_business_gtm_ask.js", 'note(s, 11.6, 5.35, 1.2, 0.4, "we stop if it fails", 3);', NOTE("we stop if it fails", 3))
sub("parts/v3/g_business_gtm_ask.js", 'foot(s, "Sources: ml/public_validation; technical/docs/FEASIBILITY_CHECK.md; financial model v1.1 (Base: ₹45 L funding, break-even month 16, year-3 revenue ₹65.3 L, EBITDA ₹11.9 L). Pending items are replaced with measured values before submission.");', 'foot(s, "Sources: ml/public_validation; technical/docs/FEASIBILITY_CHECK.md; financial model v1.1 (Base: ₹45 L funding, break-even month 16, year-3 revenue ₹65.3 L). Pending items get measured values before submission.");')
sub("parts/v3/f_ew_reports_privacy.js", 'foot(s, "Sources: DPDP Act 2023 s.9 and Rules 2025 (Rule 10); MoE Guidelines for Coaching Centres 2024; contracts/routing_policy.yaml; OULAD results in ml/public_validation; tenant isolation tested on PostgreSQL 16. Not legal advice.");', 'foot(s, "Sources: DPDP Act 2023 s.9, Rules 2025 (Rule 10); MoE Guidelines 2024; contracts/routing_policy.yaml; OULAD results (ml/public_validation); isolation tested on PostgreSQL 16. Not legal advice.");')
sub("mocks.js", '"9FD3D4"', '"B9CFE8"')
print("ok")
