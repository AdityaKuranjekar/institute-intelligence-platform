# Notes and open questions

## Mock vs real server
- The mock (`lib/mock/server.ts`, one catch-all route under `app/api/mock/`) keeps edits, tokens and jobs **in memory**: restarting the web server resets everything. `POST /api/mock/dev/reset` clears edits (used by the tests).
- Rules marked MOCK in that file are stand-ins, not the model: the support list after an attendance edit (adults: under 75 % joins the list, 85 % or more removes attendance reasons), the privacy-tier list size (academic-only drops adults whose reasons were all non-academic), the flagged questions (the last test of each batch has two canned suspect keys), OMR cells (seeded by file name and size), and the report text (taken from `reports.json`, so it does not change when an input changes).
- The mock reads CSV only. XLSX returns 415 with a clear message; the real server must parse XLSX.
- Real accuracy numbers on the privacy page come from `metrics.json` (synthetic cohort).
- `technical/ml/artifacts/` is untracked in the main checkout, so a worktree does not contain it; `.env.local` (gitignored) points `ARTIFACTS_DIR` at the main checkout.
- The contract the screens expect from the real server is in `API_CONTRACT.md`. Three endpoints are additions to the plan's table: `POST /ingest/jobs/{id}/mapping`, `POST /ingest/jobs/{id}/commit`, `GET /batches/{id}/tests`.

## Data requests (front end cannot fix these)
- `owner.json`: names for every batch id in `batch_compare` (the page resolves names from `mastery.json` and shows a short id otherwise); an explicit retention figure (now derived from `retention.monthly`).
- `parent.json`: `strongest_topic_hi`, `focus_topic_hi`, FAQ `q_hi` (shown in English in Hindi mode, tagged `data-gap` in the markup).
- Owner, Data card and How it works pages show English-only text from `owner.json`, `datacard.json` and `scaling.json`; only their chrome is translated. The Hindi test asserts the heading only for those three.
- `mastery.json` `wrong_key_flags` is empty for patna_jee, so the flagged-question panel uses canned flags in the mock.
- Adults in `risk.json` have no row in `student.json` (no name or roll number), so they appear as "Student xxxx" in lists.
- How-it-works pain-point mapping is static text; not in `scaling.json`.

## Done in this pass
- Next bumped to 14.2.35. Fonts (Inter, Noto Sans Devanagari) and ECharts are bundled from npm; the production build makes no request outside localhost (checked by the smoke tests, which abort every other request).
- Login with role switcher, 401 and 403 handling, Capture with mapping preview and row errors, OMR review, teacher panels, consent and privacy page, report generator, tests.

## Not verified
- Nothing has run against the real FastAPI server yet.
- No visual review beyond the 375 px overflow check and a few screenshots; 768 px not checked.
- The Hindi check is a heuristic (it flags lines with three or more English words); it does not prove the Hindi is good, and the Hindi text is unreviewed by a native speaker.
- Mobile camera capture (`capture="environment"`) was not tried on a phone.
