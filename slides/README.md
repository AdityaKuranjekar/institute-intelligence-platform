# Slides

| File | What it is |
|---|---|
| `AlphaQ_CaseB_Round1.pptx` | The Round 1 deck (19 slides: title, 12 content, appendix A1-A5, final AI-disclosure slide). Open in PowerPoint; every shape and text is editable |
| `DESIGN_SYSTEM.md`, `BLUEPRINTS.md`, `MOCKUPS_PLAN.md` | Design rules, slide-by-slide plan, visuals plan |
| `build/` | The generator. `cd slides/build && npm install && node deck.js` rebuilds the deck (needs Node 18+). `report_samples.json` holds real report text from the report module (`python dump_report_samples.py`, run from `technical/`) |
| `preview/` | PNG previews of every slide from `build/render_check.py` (approximate, Hindi shaping is not exact) |

Before submitting: (1) replace every amber PENDING tag with a measured value from `python technical/scripts/deck_numbers.py` or remove the claim, (2) swap the AlphaQ text wordmark for the logo, (3) in PowerPoint use File > Export > PDF (Standard) and name it `AlphaQ_CaseB_Round1.pdf`, (4) read the PDF on a phone at 100 % zoom, (5) keep the last slide (AI-use disclosure) last.
Layout check without PowerPoint: `python slides/build/render_check.py slides/AlphaQ_CaseB_Round1.pptx slides/preview` prints text-overflow and off-slide problems (needs `pip install lxml pillow`, Windows fonts Calibri and Cambria).
