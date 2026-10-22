# Slides

**Two versions are kept.**
| Version | File | What it is | Build |
|---|---|---|---|
| **v4 (current)** | `AlphaQ_CaseB_Round1_v4.pptx` (previews: `preview_v4/`) | v3 plus a Miro-style whiteboard and product-manager layer: dotted, soft-dotted or plain canvas (varied by slide), coloured sticky notes with tape, hand-drawn arrows, swoosh underlines, highlighter strokes, scribbled circles, name-tag cursors, Now/Next/Later and hypothesis/evidence/decision framing | `cd build && python doodles.py && python assemble_v4.py && node deck_v4.js` |
| v3 | `AlphaQ_CaseB_Round1_v3.pptx` (previews: `preview_v3/`) | Dense, human-made hybrid: v1's cluttered layout and evidence plus v2's diagrams (loop, friction matrix, layered architecture, intervention journey, compliance matrix with locks, lockbox, gauge, cost stack, Gantt, hub-and-spoke, risk matrix) and v2's top breadcrumb bar; sticky-note annotations; finance model v1.1 | `cd build && python assemble_v3.py && node deck_v3.js` |
| v2 | `AlphaQ_CaseB_Round1_v2.pptx` (previews: `preview_v2/`) | 13-slide pitch (title + 12 content) in plain English, one core graphic per slide, breadcrumb tracker on top, sources bottom-left, then Appendix 1 to 7 and the AI-use slide. **Uses finance model v1.1** (CFO audit) | `cd build && python assemble_v2.py && node deck_v2.js` |
| v1 (frozen) | `AlphaQ_CaseB_Round1_v1.pptx` (previews: `preview_v1/`) | 25-slide denser version. **Finance numbers are from model v1.0 and out of date** (see `Financial_Model/DECK_NUMBER_UPDATES.md`) | `cd build && python assemble_v5.py && node deck.js` (writes the v1 file) |

Run `python charts.py` and `python export_html.py` first if the PNGs in `assets/` are missing. Check layout with `python render_check.py ../AlphaQ_CaseB_Round1_v2.pptx ../preview`.

| File or folder | What it is |
|---|---|
| `AlphaQ_CaseB_Round1.pptx` | The Round 1 deck (25 slides, v5: title, 12 content slides from executive summary to validation, appendix 1 to 11 incl. case-question coverage map, final AI-disclosure slide). Consulting style v4: white paper, one blue family, amber only for pending/warning, bold caps heading + subtitle + rule, section tab bar at the bottom (modelled on the reference decks). Product name in the deck is **Pragati** (team stays AlphaQ). Panels, tables, chevrons, funnel and text are native and editable; the architecture and differentiators slides and all app screens are images |
| `html/` | HTML sources of the images: `arch_under_the_hood`, `what_makes_us_different`, `web_console` (browser frame), `app_scan` / `app_mentor` / `app_parent` (phones) and `screen_*` (web screens with synthetic data). `ui.css` holds the shared look |
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
python assemble_v5.py           # deck_v4_blue.js + parts/v5/*.js -> deck.js (v5); edit those sources, not deck.js
node deck.js                     # -> ../AlphaQ_CaseB_Round1.pptx
python render_check.py ../AlphaQ_CaseB_Round1.pptx ../preview   # prints text overflow, writes previews
```
The parent-report screen uses real text from the report module: `python dump_report_samples.py` (run from `technical/`) refreshes `report_samples.json`.

## Before submitting
1. Replace every amber PENDING tag with a measured value (`python technical/scripts/deck_numbers.py`) or remove the claim. Slides 6 to 9 and 14 carry them.
2. Swap the AlphaQ text wordmark for the logo.
3. In PowerPoint: File > Export > PDF (Standard), name it `AlphaQ_CaseB_Round1.pdf`; read it on a phone at 100 % zoom.
4. Keep the AI-use disclosure as the last slide (Problem Statement rule 2).
5. Mock-up images carry an "Illustrative mock-up" tag until they are real screenshots of the running prototype.

## Icons
Icons come from Font Awesome 6 and Lucide through `react-icons` (free licences). To use Flaticon artwork instead, download the PNGs from Flaticon (account and attribution required) into `assets/flaticon/` and tell the generator which slide each belongs to; attribution must then be added to `technical/docs/CITATIONS.md`.
