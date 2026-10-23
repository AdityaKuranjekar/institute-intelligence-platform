# Presentation: Round 1 deck (and Round 2 later)

Team **AlphaQ**, product **Pragati**. Round 1 rules: PDF, 16:9, up to 12 content slides plus title and appendix, file name `TeamName_Case_Round.pdf`, **last slide discloses AI use**.

```
presentation/
  decks/       every deck: earlier-1 (v1), earlier-2 (v2), earlier-3 (v3) and CURRENT (v4); the PDF for submission goes here too
  previews/    PNG preview of every slide, one folder per deck, named like the deck
  source/      what builds the decks: build/ (generators), html/ (app screens), assets/ (images, charts, doodles)
  docs/        design system, blueprints, mock-up plan, slides brief, presenter notes
  submission/  what to hand in: round1/ and round2/ checklists and final files
  VERSIONS.md  what changed in each version and why
```

**Use CURRENT (v5)** (`decks/AlphaQ_CaseB_Round1_CURRENT_v5.pptx`). Older versions are kept so progress can be tracked and any idea reused. Details in `VERSIONS.md`.

## Rebuild
```
cd presentation/source/build
npm install              # once
python build_all.py      # all versions; or: python build_all.py v4
```
`build_all.py` makes the charts and doodles, runs each version's assembler, writes `decks/*.pptx` and `previews/vN/`. The checker (`render_check.py`) prints text-overflow issues; keep it at 0. Every number comes from `financial/model` (v1.1) or a `technical/.../metrics.json`; do not type numbers by hand.

## Before submitting
1. Replace every amber PENDING tag with a measured value (`python technical/scripts/deck_numbers.py`) or remove the claim.
2. Check the content-slide count is 12 or fewer (appendix and title do not count).
3. Swap the AlphaQ wordmark for the logo when it exists.
4. In PowerPoint: File > Export > PDF, named `AlphaQ_CaseB_Round1.pdf`; read it on a phone.
5. Keep the AI-use slide last (Problem Statement rule 2).
