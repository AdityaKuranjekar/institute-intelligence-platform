# Deck versions

| Version | File | Slides | Style | Finance numbers | Notes |
|---|---|---|---|---|---|
| earlier 1 (v1) | `decks/AlphaQ_CaseB_Round1_earlier-1_v1.pptx` | 25 | Dense consulting layout, blue theme, bottom tab bar, boxed panels | v1.0 (**out of date**) | First complete deck. Kept as the reference for density and evidence slides |
| earlier 2 (v2) | `decks/AlphaQ_CaseB_Round1_earlier-2_v2.pptx` | 21 | Spacious, plain English, one core graphic per slide, top breadcrumb | **v1.1** | New diagrams: Pragati loop, friction matrix, layered architecture, intervention journey, compliance matrix with locks, lockbox, gauge, cost stack, Gantt, hub-and-spoke, risk matrix. Judged too spacious |
| earlier 3 (v3) | `decks/AlphaQ_CaseB_Round1_earlier-3_v3.pptx` | 22 | v1 density plus v2 diagrams, top breadcrumb, sticky-note touches | **v1.1** | Hybrid of v1 and v2; hand-made feel |
| earlier-4 (v4) | `decks/AlphaQ_CaseB_Round1_earlier-4_v4.pptx` | 22 | v3 plus whiteboard and product-manager layer: three canvases (dots, soft dots, plain), sticky notes, hand-drawn arrows, underlines, name-tag cursors, PM framing | **v1.1** | **Current.** One emphasis per slide; psychology-led design intent in speaker notes (`docs/PRESENTER_NOTES_v4.md`) |

Lineage: v1 is built from `source/build/deck_v4_blue.js` (frozen base) and `parts/v5`; v2 from `parts/v2`; v3 from `parts/v3`; v4 is v3 with overlays added by `assemble_v4.py`. One-off migration scripts are in `source/build/legacy/`.

Each version's preview PNGs are in `previews/<same name as the deck>/`. Next version (v5) should start from v4's assembler and change only what feedback asks for.

## Candidates (23 Oct 2026): pick which looks better
| File | Based on | What changed |
|---|---|---|
| `decks/AlphaQ_CaseB_Round1_candidate-A_v2.2.pptx` | v2 | 8-step chevron breadcrumb strip, bottom bar (AlphaQ, case, slide number), consistent spacing and type sizes, mini India tile map on the go-to-market slide, new appendix 8 "Where we sell first" (tile map, 4 phases, 1,180 addressable institutes) |
| `decks/AlphaQ_CaseB_Round1_candidate-B_v4.2.pptx` | v4 | Same additions on top of the v4 whiteboard layer (stickies, doodles, cursors) |

Map note: a tile map (one tile per state, not to scale) avoids boundary-line issues. Totals come from `financial/research/R7_market_size.md` (1,180 addressable); the split by state is our derived assumption. Build: `python build_all.py v2.2 v4.2` in `source/build`.

### Update (23 Oct 2026, later): real map
Both candidates now use a geographic India map (state outlines from a public GeoJSON, `source/assets/india_states.geojson`, orientation only, not an official boundary) instead of the tile map. Target states are shaded by addressable institutes; cities are bubbles coloured by tier (1 grey, 2 gold, 3 orange) and sized by coaching density, which is our qualitative estimate, not a count. v2.2 also gets a section badge ("Section n of 8" and icon) at the top right of every content slide. Code: `source/build/geomap.py`.

### Update: flat-colour icons (23 Oct 2026)
Both candidates show a flat-colour icon (Icons8 "Flat Color Icons", CC BY 3.0, fetched via Iconify, files in `source/assets/flat/`) at the top right of every content slide, chosen per slide. Attribution is on the final AI-use slide. Flaticon's own files were not used: they need a login and per-icon attribution. Fetch more with `node fetch_flat.js <icon-name> ...` in `source/build`.

### Fix and financial icons (23 Oct 2026)
Real PowerPoint rendering (exported through PowerPoint itself, which the PIL preview checker cannot do) showed titles centred and "PRAGATI" clipped on the title slide in the v4 family. Fixed in v2.2 and v4.2 by left-aligning the title placeholders. v2.2 also has finance icons on the three unit-economics KPI cards. Always check a deck with a real PowerPoint export before sending.

### Combined v5 (23 Oct 2026)
`decks/AlphaQ_CaseB_Round1_COMBINED_v5.pptx` (23 slides): A's title, architecture, product, ranges and validation slides; B for the rest; flat finance icons on the business KPI cards. Polish step in `source/build/merge_decks.py`: slide-6 callout markers moved off the phone text; slide-13 risk-matrix quadrant labels (act now / plan the fix / watch / accept) and evidence tags on the scorecard (public data / code / next / not yet). Rebuild: `python merge_decks.py`.


## CURRENT = v5 (24 Oct 2026)
`decks/AlphaQ_CaseB_Round1_CURRENT_v5.pptx` (23 slides) is the combined deck: title, architecture, product, honest ranges and validation slides from candidate A (v2.2); executive summary, problem, stress test, weak topics, early warning, privacy, business model, go-to-market and all other appendix slides from candidate B (v4.2), with finance icons on the unit-economics cards. Built by `source/build/merge_decks.py`. A copy for submission is in `submission/round1/`. `COMBINED_v5.pptx` is a duplicate of it that was locked by PowerPoint; delete it.
