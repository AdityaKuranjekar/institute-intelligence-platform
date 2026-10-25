# Notes

## Start commands
```bash
# real server (from technical/backend; needs technical/data, DATA_DIR defaults to the main checkout's)
set PYTHONUTF8=1 && python -m app.cli demo                      # API on http://127.0.0.1:8000

# front end against the real server
cd technical/web && npm install
set NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api/v1 && npm run dev      # or: npm run build && npm run start
# front end against the in-process mock (no backend)
npm run dev                                                      # NEXT_PUBLIC_API_BASE defaults to /api/mock

# tests (Playwright, production build; first time: npx playwright install chromium)
npm run build && npx playwright test                             # mock
NEXT_DIST=.next-real NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api/v1 npm run build
PW_PORT=3300 E2E_REAL=1 NEXT_DIST=.next-real npx playwright test # real server (backend must be running)
node scripts/shots.mjs http://localhost:3000 screenshots/after   # screenshots, every page, 1280/768/375, EN and HI
```
`NEXT_PUBLIC_API_BASE` is compiled in, so rebuild after changing it. `NEXT_DIST` lets a mock build and a real build live side by side.

## What the app is now
- **No login.** The app opens straight into the product. On start it silently gets a demo token (`POST /auth/login` as the owner role, full staff access) for the current institute, keeps it in memory and localStorage (`pragati.session.v2`), and on any 401 gets a new one and retries once. No redirect, no role switcher.
- **One navigation:** a left sidebar (a drawer behind a menu button below 1024 px). The top bar holds only the page title, the institute switch and the EN / हि toggle. Sidebar groups: Home; This week (Add data, Weak topics, Support list, Students, Parents, Results); Settings (Privacy and consent); For judges (How it works and evidence).
- **Student and parent pages** are ordinary pages with a searchable picker (name or roll number, alphabetical, batch filter). The selection is remembered per institute, `/student/<id>` and `/parent/<id>` are deep links, the parent page opens on the student last chosen. The view shows that one student only.
- **Working screens show no model jargon** (no theta, SE, AUC, SHAP, probabilities, origin chips). Origin chips and metrics exist only under `/about` (an `EvidenceContext` switches them on). Uncertainty bars on Weak topics sit behind "Show details".
- **Data layer:** `lib/query.ts` (`useQuery`: state is always derived for the current key, stale-while-revalidate cache, waits for the token), `lib/views.ts` (batches, roster, heatmap, support list, profile, parent view), `lib/app-context.tsx` (language, institute, remembered selection, silent sign-in).

## Defects found in the audit and fixes
| # | Defect (how it showed) | Cause | Fix |
|---|---|---|---|
| 1 | Page blank after using the navigation until reload | `useData` kept one state object per hook and applied a stale-key flag; data and token state raced (role login, institute change, hydration). The ECharts wrapper also applied the option captured at mount, so a chart whose data arrived before the lazy `echarts` import finished stayed empty. | New `useQuery` derives its state for the current key every render; queries wait for the token; the chart applies the latest option after init; pages wait for the roster so rows do not reorder when names arrive. Test: click through every page twice with no reload (mock and real). |
| 2 | Two navigations (role tabs and sidebar) | Role tabs duplicated the sidebar | Role tabs, login and role switcher removed; one sidebar |
| 3 | No way to change the student | Picker only existed for the artifact's 40 students | Searchable picker over the real roster (all batches), batch filter, deep links, remembered choice |
| 4 | Real server: student, support list and heatmap showed the 40-student artifact, not the 400 in the database; edits did not show | Pages read static `/{institute}/{file}` bodies | Pages use `/batches`, `/batches/{id}/heatmap`, `/support-list`, `/students/{id}/profile`, `/parent-view` (the mock serves the same paths) |
| 5 | Real login returned `me`, not `user` | Contract drift | Client reads both |
| 6 | Report generator crashed on real server (blank result) | Real response has `null` for `hi_reviewed`, `latency_ms` | Schema accepts null; fallback reason shows text for unknown reason codes |
| 7 | After Add data, the app jumped to `/teacher` (404 on real) | The server's `redirect` hint pointed to an old route | The client ignores the hint and goes to Weak topics with a "saved N rows" banner |
| 8 | Uploading the same file twice on the real server looked stuck | The server reuses the finished job for identical content | The screen says "this exact file was already saved"; the e2e adds a unique row per run |
| 9 | Support list rows reordered after names loaded, so an opened row jumped | Names came from a second request | Wait for names before drawing the list |
| 10 | 375 px: sideways scroll on Weak topics (long test name in a select), truncated page title in the top bar | Select not shrinkable; one-row header | `max-w-full` selects, wrapping card titles, two-row header on phones |
| 11 | Heatmap rows showed first names only (several "Mayank") | Label split | Full names |
| 12 | Hindi pages mixed English (consent method, fee status, notes from the artifacts) | Raw artifact strings | Own Hindi strings; remaining English comes from artifact files (below) |

## Design notes (ideas borrowed; no assets, logos or text copied; fonts and icons are the bundled Inter, Noto Sans Devanagari and lucide)
- **Linear / Stripe Dashboard:** a quiet left sidebar with small group labels, one clear active state, big headline numbers with a small label (Home). Why: owners scan numbers first.
- **Notion:** progressive disclosure ("Show details" for uncertainty and attendance edits), calm empty states with one sentence. Why: keep working screens short.
- **Vercel:** generous whitespace, one primary action per screen ("Next: Add data"). Why: the live demo needs an obvious next step.
- **Google Classroom / Khan Academy teacher tools:** task-first checklist for teachers (Support list with "Mark as done", counted "2/4 done"); weak topics shown as a colour map with plain bands. Why: low-tech daily users.
- **Duolingo / Khan Academy (student):** friendly headline, effort streak (never score streak), a small weekly plan with check-boxes, tinted sky background. Why: encouragement without ranking.
- **WhatsApp and simple banking or health apps (parent):** the real message frame, big text, warm tint, Hindi by default from the guardian's language, one report button. Why: reassurance and familiarity.
- **Colour system** (tokens in `tailwind.config.ts`, mirrored in CSS): one brand indigo `#3b5bdb`, supporting teal `#0ca678`, amber `#f08c00`, violet `#7048e8`, sky `#1c7ed6`; warm neutral surface `#faf8f5`; a gentle tint per area (Weak topics indigo, Support teal, Students sky, Parents warm, Results violet, Add data yellow). Semantic tones are teal and amber for people; the only red (`danger`) is reserved for system errors and is not used on any working screen. Heatmap palette is sequential light yellow, teal, navy (ordered by lightness, so it stays readable with red-green colour blindness). Text sizes: body 16 px, small 15 px, smallest 13 px; buttons and pickers at least 44 px high.
- **Motion:** page fade-up, number count-up and progress ring on Home, card lift on hover; all off with `prefers-reduced-motion`.

## Backend changes
None. Nothing under `technical/backend` was edited, so the backend tests were not re-run for this pass. Things the backend could still improve (not done): the real column mapper does not know the header "Present" (`present_flag` synonyms in the frozen contract), so that mapping is picked by hand in the preview; the ingest `redirect` hint is stale (`/teacher`).

## Mock vs real
- The mock (`lib/mock/server.ts`, one catch-all route under `app/api/mock/`) keeps edits, tokens and jobs in memory; restarting the web server resets them. `POST /api/mock/dev/reset` clears edits (used by the tests). It now also serves the real server's batch and student paths, composed from the artifact files (40 named students; other ids in a batch appear as "Student xxxx").
- Rules marked MOCK in that file are stand-ins: support list after an attendance edit, privacy-tier list size, canned flagged questions (last test of each batch), OMR cells (seeded by file name and size), report text (from `reports.json`).
- The mock reads CSV only (XLSX returns 415). `technical/ml/artifacts/` is not in a fresh worktree; `.env.local` (gitignored) sets `ARTIFACTS_DIR`.
- `API_CONTRACT.md` lists what the screens send and expect.

## Data gaps (front end cannot fix)
- Owner, Data card and How it works pages show English-only text from `owner.json`, `datacard.json`, `scaling.json`; only their chrome is translated. The Hindi test checks only the page title there and on Results.
- `parent.json` topic names and FAQ questions are English only (tagged `data-gap`).
- The real percentile range for some students is very high (for example 94.9 to 100 for a student with low test marks): a synthetic-data quirk, shown as is.
- Hindi text is unreviewed by a native speaker.

## Not verified
- OMR with a real photo (the e2e uses fakes on the mock and skips OMR confirm on the real server).
- Camera capture on a phone. XLSX upload (real server only).
- The Hindi check is a heuristic (flags lines with three or more English words).
