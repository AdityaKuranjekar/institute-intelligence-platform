# Round 2 technical build plan: backend, API, front end, end to end

Status: 25 Oct 2026. Tech only. Sources: Participant Guide (re-read in full), `technical/contracts/*`, `TECH_PLAN.md` §12-14, `ROUND2_PLAN.md`, `MODEL_TABLES.md`, branch `tab2-web`.

## 0. What the guide demands (verbatim intent)
- **Round 2 prototype:** "upload test results (CSV or an OMR sheet photo) → topic-mastery heatmap, at-risk list with reasons, predicted performance range, auto-generated parent report in Hindi or English. Live demo; code repository link submitted in advance." "It must run end-to-end on real or synthetic data and show the core logic live, not just screenshots… A web app backed by a real model is enough. **Judges may ask you to change an input live.**"
- Out of scope: production mobile app, full ERP, question banks. OMR is "not mandatory… a simple working version earns credit."
- **Correction to `FINAL_ROUND_PLAN.md`:** it said a front end reading model outputs is enough. The guide says a live end-to-end run is required. The artifact-reading front end is a base, not the finish. Treat the guide as authoritative.
- Also graded (technical): cost per student, offline/low bandwidth, multi-tenancy and security, DPDP and well-being, honest uncertainty, GenAI guardrails, a model-and-system report, a curveball.

## 1. Where we are (honest inventory)
| Layer | Built | Not built |
|---|---|---|
| Contracts | 31-table `schema.sql` with row-level security, `openapi.yaml` (23 endpoints), enums, routing policy, topics, CSV templates, OMR layouts | Server implementing them |
| Data | Seeded generator (4 institutes, 10,350 students, truth tables), 12 messy files with golden outputs, reference parser, synthetic OMR sheets | Ingestion service that uses the parser |
| ML | Batch script `ml/build_artifacts.py`: Rasch mastery, LightGBM risk (two feature sets), conformal band, reasons, reports through the genai module | A reusable runtime library; saved model files; fast per-batch recompute |
| GenAI | Report pipeline, 8-check verifier, template fallback, local-model client | Live Ollama benchmark; endpoint |
| Front end (`tab2-web`, unpushed) | 7 screens on precomputed JSON via a mock API | Real upload, live edits, login, error states, e2e tests |
| OMR | Layouts, renderer for synthetic sheets | The reader |
| Ops | `Makefile` tests | One-command demo start; offline proof |

## 2. Decisions to lock now (Phase 0)
1. **API shape:** the server implements the paths and bodies the front end already uses (artifact-shaped JSON), under `/api/v1/...`. The frozen `openapi.yaml` differs in places; log a CCR and add an OpenAPI doc generated from the real server. Do not spend time making the two identical.
2. **Database:** PostgreSQL 16 through `pgserver` (already used in contract tests; no Docker), schema from `contracts/schema.sql`, row-level security on, tenant set per request. Fallback if it eats time: in-memory pandas store with the same service interface.
3. **ML runtime:** train once offline, save models, infer at request time. Never retrain in a request.
4. **Seeded demo:** one institute loaded by default (Patna-style, 2026 cohort); the other three loadable by switch.
5. **Auth:** seeded demo users and a role switcher issuing a signed token (no OTP).
6. **Cut line (decide now):** OMR is the first thing dropped if behind, replaced by "CSV live, OMR reader shown on pre-scanned sheets".

## 3. Target architecture (all local)
```
Browser (Next.js) ──HTTP/JSON──> FastAPI (uvicorn)
                                   ├─ auth + tenant middleware (sets institute_id for RLS)
                                   ├─ ingestion service (parser, column mapper, row errors)
                                   ├─ OMR service (OpenCV)            [P1]
                                   ├─ analytics service  ── ml runtime: Rasch, risk, percentile, reasons
                                   ├─ report service ── genai pipeline (template; Ollama optional)
                                   └─ PostgreSQL (pgserver)  + model files in ml/artifacts/models/
```
One process, one laptop, no internet. Recompute is synchronous per batch; ingestion jobs report progress through a job row.

## 4. Phases

### P0. Decisions, repo, contracts (0.5 day)
Lock section 2. Create `technical/backend/app/{main,config,deps,routers,services,ml}`, `Makefile` targets (`demo-native`, `seed`, `test-api`), `.env.example`. Write the endpoint list (section 5) and agree JSON shapes with the front end by pointing it at `ml/artifacts/*` examples. Done when: both tabs share one endpoint table.

### P1. Backend skeleton, database, seed (1 day)
- Start Postgres via `pgserver`, apply `schema.sql`, create app role (RLS applies), health check.
- Seed loader: reads `data/clean/*.parquet` for chosen institutes into tables; creates demo users per role; loads consent rows.
- `/health` (db, ollama), `/version`, `/auth/login`, `/me`, tenant middleware.
- Tests: tenant isolation on every table through the API; cold start from a clean clone to first response < 3 minutes.

### P2. ML runtime library (1.5 days; start in parallel with P1)
Refactor `build_artifacts.py` into `backend/app/ml/`:
- `irt.py`: item difficulty store; `fit_batch(responses) -> theta, se, band`; wrong-key detector; re-score after key change.
- `risk.py`: snapshot features from DB tables as of a date; two saved LightGBM models (academic, full); reasons from contribution values; age and consent routing from `routing_policy.yaml`; capacity-sized list.
- `percentile.py`: saved point model plus conformal half-width; editable mapping table.
- `train.py`: one command that fits and writes `ml/artifacts/models/*` with a manifest and hashes.
- Tests: runtime output equals the batch artifacts within tolerance; per-batch recompute < 5 s for 60 to 300 students; no minor ever on the `full` track.
- Optional quality step (time-boxed, half a day): shrink sparse topic estimates toward the student's overall level and the batch mean (the hierarchical idea) and re-measure recovery; report the result either way.

### P3. Read endpoints and first live front end (1 day)
`GET` heatmap, support list, summary, student profile, percentile, reports, owner dashboard, data card, scaling, models, consents, privacy tier. Same JSON as today's artifact files so the front end swaps by changing `NEXT_PUBLIC_API_BASE`. Front end gets a real login (role switcher) and 401/403 handling. Done when: all 7 screens run from the server with the mock disabled.

### P4. Ingestion (2 days) , the heart of the demo
- Upload endpoints for students, attendance, fees, results (long, wide, marks-only), answer keys: CSV and XLSX.
- Reuse `datagen/messy/reference_parse.py` and `header_synonyms.yaml`: header detection, merged-cell and footer handling, text numbers, Devanagari, negative fees, absurd dates, reused roll numbers.
- Return a **mapping preview** (detected columns, confidence) and **row errors** before commit; commit writes to the DB and triggers batch recompute; job status endpoint.
- Compliance checks at ingest: age under 16, test the day after the weekly off.
- Tests: all 12 messy files parse to the golden outputs; re-uploading the same file is idempotent; a 2,000-student file < 30 s.

### P5. Live what-if and corrections (1 day)
`PATCH` attendance and fees, `POST` answer key (re-score), `PUT` privacy tier (live ablation numbers), `DELETE` consent (halts processing), interventions log. Each triggers recompute and returns the new list so the screen updates in under 5 seconds. Input validation returns clear errors (attendance 140 %, negative fee, unknown student). Done when: a scripted "judge edits an input" run passes 10 of 10.

### P6. Reports (0.5 day)
`POST` report for a student in Hindi or English: facts from numbers, template path always on, local model (`qwen3:4b`) used only if running, verifier mandatory, fallback within 1 s when the model is down. Pull and benchmark the two models once; record latency and cost. Show verifier ticks in the response.

### P7. OMR reader (2 days; independent, can start now)
OpenCV pipeline: find four corner marks, warp, read QR for layout, read bubbles with a per-cell confidence, return uncertain cells for one-tap review, `confirm` endpoint scores and recomputes. Build against the synthetic sheets (six imaging conditions) first, then photograph 20 printed sheets on a phone for the real number. Bar: 0.99 synthetic, 0.98 real or report the real figure. Cut line applies.

### P8. Front-end completion (runs beside P3 to P7, 3 days)
- Capture screen becomes real: file drop, mapping preview, row-error table, commit, progress, then jump to the heatmap.
- Teacher: batch picker, heatmap, flagged-question panel with "fix key", support list with live refresh and an "edit attendance" control; no ranking.
- Student, parent (WhatsApp-style preview), owner as today but fed live; consent and privacy-tier screen; report generator with verifier ticks.
- Loading, empty and error states; Hindi pass on every screen; phone width; bundled fonts and chart libraries (no CDN); bump Next 14.2.x; Playwright e2e: upload → heatmap → list → edit → report.
- Push `tab2-web`, merge to `main`.

### P9. Hardening and offline proof (1 day)
Chaos script (stop Ollama, kill DB mid-upload, same file twice, huge file, bad scan); log and audit trail; cable-unplugged run; `make demo-native` from a clean clone; second-laptop or USB copy; OBS backup recording.

### P10. Curveball kit (1 day)
Pre-built, timed responses: privacy tier tightening (live ablation), marks-only institute, doubled or sudden dropouts (generator scenarios plus a fast re-evaluation), LLM unavailable or priced up (template-only, cost recomputed), no internet, a new exam (new topics and exam pattern file), a parent disputes a prediction, a judge's own OMR layout (template registry). Rehearse each twice with a timer.

### P11. Evidence for the report and deck (1 day, parallel)
Fill `metrics.json` from the running system; measure real cost per student (CPU seconds, memory, disk per recompute, Ollama latency); update `MODEL_TABLES.md`; export screenshots from the live app; model-and-system report (2 to 4 pages) from these numbers; repo README for the public link.

## 5. Endpoint table (shared by backend and front end)
| Method and path | Purpose | Phase |
|---|---|---|
| `POST /auth/login`, `GET /me` | demo login, roles | P1 |
| `GET /health`, `/version` | db and Ollama status, model version | P1 |
| `POST /ingest/{students,attendance,fees,results,answer-key}` | upload with mapping preview and row errors | P4 |
| `GET /ingest/jobs/{id}` | status, mapping, errors | P4 |
| `POST /ingest/omr`, `/ingest/omr/{job}/confirm` | photo upload, review, commit | P7 |
| `GET /batches/{id}/heatmap` | mastery grid with bands | P3 |
| `GET /batches/{id}/support-list` | capacity-sized list with reasons | P3 |
| `GET /students/{id}/profile` | mastery, percentile range, trend | P3 |
| `PATCH /students/{id}/attendance`, `/fees` | what-if edit, recompute | P5 |
| `POST /students/{id}/reports` | verified HI/EN report | P6 |
| `GET /tests/{id}/flagged-questions`, `POST /answer-keys/{test}/{q}` | wrong-key flag and fix | P5 |
| `GET /owner/dashboard` | batches, retention, compliance | P3 |
| `GET/POST/DELETE /consents` | consent ledger | P5 |
| `GET/PUT /settings/privacy-tier` | tier switch with ablation | P5 |
| `GET /datacard`, `/scaling`, `/models` | static evidence pages | P3 |

## 6. Who builds what (parallel tabs)
| Tab | Scope | Starts | Depends on |
|---|---|---|---|
| A: Backend and ML | P0, P1, P2, P3 server, P4, P5, P6 | now | none |
| B: Front end | P8, switching to the server as P3 lands | now (mock API until then) | endpoint table |
| C: OMR | P7 | now | synthetic sheets only |
| 0: Coordinator | P9, P10, P11, merges, report and deck | after P3 | all |
Merge order: A (P1-P3) → B wiring → A (P4-P6) → C → hardening.

## 7. Critical path and cut lines
Critical path: P1 → P2 → P3 → P4 → P5 → P8 wiring → P9. About 8 to 9 working days for one backend builder; parallel tabs bring it to roughly 5 to 6 calendar days. If time is short, in this order: drop OMR live (keep reader on stored scans), drop interventions log, drop the study plan, drop model quality step, drop the second and third institutes from the live switch. Never drop: upload with row errors, live edit and recompute, the Hindi report with verifier fallback, tenant isolation, offline run, honest limits.

## 8. Risks
Recompute too slow for live edits (mitigate: precomputed item difficulties, per-batch only, cache). Messy file the judges bring does not parse (mitigate: mapper with manual column pick, clear errors). `pgserver` problems on Windows (fallback in-memory store). Ollama not ready on stage (template path). OMR accuracy on real photos unknown until tested. Port and path surprises on a borrowed laptop (one-command start, USB copy). Hindi text unreviewed (flag and say so).

## 9. Definition of done
A clean clone starts with one command, offline; the 9-step demo script in `ROUND2_PLAN.md` §4 passes 10 of 10 runs; tests green (API, tenant isolation, golden files, ML parity, e2e); `metrics.json` and the report numbers come from the running system; the repo README explains setup in under 10 lines.
