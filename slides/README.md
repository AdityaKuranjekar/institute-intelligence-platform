# Slides

| File or folder | What it is |
|---|---|
| `AlphaQ_CaseB_Round1.pptx` | The Round 1 deck (19 slides: title, 12 content, appendix 1 to 5, final AI-disclosure slide). Dense consultant style v2. Open in PowerPoint; frames, tables, text and callouts are native and editable. Full-bleed dark slides (3 and 8) and the app screens are images |
| `html/` | HTML sources of the images: `arch_under_the_hood`, `what_makes_us_different` (dark showcase slides) and `screen_*` (app screens with synthetic data). `ui.css` holds the shared look |
| `assets/` | PNGs rendered from `html/` (headless Edge) and charts drawn from real result files (`chart_*.png`) |
| `preview/` | PNG previews of every slide from `build/render_check.py` (approximate; Hindi shaping is not exact) |
| `build/` | The generator. `lib.js`, `lib2.js` (components), `mocks.js`, `deck.js` (slides), `export_html.py` (HTML to PNG), `charts.py` (evidence charts), `render_check.py` (layout checker), `deck_v1_light.js` (first, sparse version, kept for reference) |
| `DESIGN_SYSTEM.md`, `BLUEPRINTS.md`, `MOCKUPS_PLAN.md` | Original design rules and plans; section 9 of the design system lists what changed in v2 |

## Rebuild
```
cd slides/build
npm install                      # once (pptxgenjs, react-icons, sharp)
python export_html.py            # app screens and dark slides -> ../assets (needs Edge or Chrome)
python charts.py                 # evidence charts -> ../assets (needs matplotlib, Calibri)
node deck.js                     # -> ../AlphaQ_CaseB_Round1.pptx
python render_check.py ../AlphaQ_CaseB_Round1.pptx ../preview   # prints text overflow, writes previews
```
The parent-report screen uses real text from the report module: `python dump_report_samples.py` (run from `technical/`) refreshes `report_samples.json`.

## Before submitting
1. Replace every amber PENDING tag with a measured value (`python technical/scripts/deck_numbers.py`) or remove the claim. Slides 4 to 7 and 12 carry them.
2. Swap the AlphaQ text wordmark for the logo.
3. In PowerPoint: File > Export > PDF (Standard), name it `AlphaQ_CaseB_Round1.pdf`; read it on a phone at 100 % zoom.
4. Keep the AI-use disclosure as the last slide (Problem Statement rule 2).
5. Mock-up images carry an "Illustrative mock-up" tag until they are real screenshots of the running prototype.

## Icons
Icons come from Font Awesome 6 and Lucide through `react-icons` (free licences). To use Flaticon artwork instead, download the PNGs from Flaticon (account and attribution required) into `assets/flaticon/` and tell the generator which slide each belongs to; attribution must then be added to `technical/docs/CITATIONS.md`.
