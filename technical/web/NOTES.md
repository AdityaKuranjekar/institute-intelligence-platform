# Notes and open questions

- `technical/ml/artifacts/` is untracked in the main checkout, so a worktree does not contain it; `.env.local` (gitignored) points `ARTIFACTS_DIR` at the main checkout.
- Heatmap shows students (rows) by topics (columns) for one batch; `batch_compare` batch ids outside the 3 batches in `mastery.json` are shown as short ids. Request: names for all batches in `owner.json`.
- Owner "retained since first month" is derived from `retention.monthly` (1 - total dropped / first enrolled). Request: an explicit retention figure.
- `faq` has only `q_en`; Hindi questions fall back to English. Request: `q_hi`.
- How-it-works pain-point mapping is static text (no numbers); not in `scaling.json`.
- Next 14.2.15 reports a security advisory; bump to the latest 14.2.x before deploying.
- Not done yet: Playwright smoke tests, visual check at 375/768 px, Hindi-language pass on every screen.
