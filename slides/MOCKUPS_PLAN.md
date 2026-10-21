# Mock-ups and images plan (all free tools)

Rule: until a screen exists in the running prototype, every screen image carries the tag **Illustrative mock-up** (Muted outline pill, 10 pt). Once the prototype runs, replace each mock-up with a real screenshot of the same screen (seed-42 synthetic data) and drop the tag. Never show a mock-up as if it were working software; judges can ask to see it live in Round 2.

## How we make them (no paid tools)
| Option | When | Notes |
|---|---|---|
| **HTML mock-ups in the repo** (`slides/mockups/*.html`, plain HTML/CSS + ECharts from a CDN or a local file) filled with **real synthetic data** from `technical/data/` (e.g. an actual generated batch), screenshotted at 2x with a browser | **Preferred.** Exactly our design tokens; numbers are real synthetic values; becomes the base of the real Next.js screens | I can build these in the in-app browser and export PNGs to `slides/assets/` |
| Figma free plan | if a teammate prefers drag-and-drop | export PNG at 2x; keep the same tokens |
| PowerPoint native shapes | architecture and flow diagrams (M9) | editable by anyone; use the design-system components |
| Python (matplotlib) | charts that come from `metrics.json` (M4, M8, M10) | use the chart colours from `DESIGN_SYSTEM.md`; title = takeaway |
Image spec: PNG, 2x, at least 1800 px wide, 12 pt rounded corners, 1 pt Line border, file name `M<number>_<name>.png` in `slides/assets/`.

## The ten visuals
| ID | Visual | Used on slide | Content (must be true to the data) | Data source | Status |
|---|---|---|---|---|---|
| M1 | Upload and column-mapping screen | 2, A | a messy Excel preview, detected header row, mapped columns (EN/Hinglish/Devanagari), 3 row errors with fixes, "Confirm" button | one of `data/dirty/*` files (A's golden parse) | to build |
| M2 | Weekly support list (desktop) | Title, 2, 5 | 8 synthetic students (codes, not real names), plain reason chips, suggested action chips, "capped to mentor capacity: 8", an "18+ / under 18: rules only" badge; **no scores shown to the student role** | later: Agent C output; now: values from generator for a real week | to build (final numbers PENDING Agent C) |
| M3 | Topic mastery heatmap | 2, 4 | 15 students x 12 topics, teal shades, legend (not enough data / building / steady / strong), one batch-wide weak column flagged "probably not taught yet" | later: Agent B output; now: generator truth, labelled | to build |
| M4 | Percentile band funnel | 6 | band width by month, honest wording "likely range", not a single number | Agent C (PENDING) | after C |
| M5 | Parent report on a phone (Hindi) + small English phone | 2, 6 | a real report produced by `backend/app/genai` with `NullClient` (template path) for a synthetic student; ticks beside each number; Devanagari rendered with the bundled font | `generate_report` output | **can build now** |
| M6 | Owner dashboard | A (optional) | retention trend, support list count, interventions done, batch comparison | generator data | optional |
| M7 | Consent screen (Hindi/English toggle) | 7 | itemised data fields, purpose-wise toggles, one-tap withdraw, notice version | design only | to build |
| M8 | Moat curve: recovery vs number of students | 4, 8 | r (estimated vs true difficulty) against students per question, with Rasch and classical baselines | Agent B `metrics.json` (PENDING) | after B |
| M9 | Architecture diagram | 3, A1 | sources → ingestion → PostgreSQL (isolated per institute) → models → web; status tags BUILT / DESIGNED; local-first box with "no paid APIs" | `TECH_PLAN.md` §6 | **can build now** |
| M10 | Sensitivity tornado | 10 | price, pilot conversion, churn... on LTV/CAC | workbook Sensitivity sheet (export the chart image or re-draw from the cells) | **can build now** |
Extra when Round 2 starts: M11 OMR before/after (photo → warped sheet → detected bubbles with low-confidence cells), M12 what-if edit (change attendance, list re-ranks), M13 flagged wrong answer key.

## Placement rules (from the reference deck, cleaned up)
- Screens are shown as a **flow left to right with numbered callouts** (reference "decision journey"), 3-4 per slide at most; vertical step labels become small number badges.
- One hero image per slide (max two). Phone frames 2.35 x 4.50 in; desktop frames 6.4 x 4.0 in; align image tops with the first card.
- Callouts: 1.5 pt teal ring + numbered badge; the legend lives in the adjacent card, 14 pt.
- Never put text over a screenshot; never crop a frame mid-element; keep 0.3 in clear space.

## Build order (cheap first)
1. M9 architecture and M10 tornado (no dependencies) → 2. M5 phone report (module exists) → 3. M1 upload screen (needs the messy files, exist) → 4. M7 consent screen → 5. M2 and M3 with generator data → 6. M4 and M8 when agents B/C deliver.
