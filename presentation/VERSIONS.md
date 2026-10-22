# Deck versions

| Version | File | Slides | Style | Finance numbers | Notes |
|---|---|---|---|---|---|
| earlier 1 (v1) | `decks/AlphaQ_CaseB_Round1_earlier-1_v1.pptx` | 25 | Dense consulting layout, blue theme, bottom tab bar, boxed panels | v1.0 (**out of date**) | First complete deck. Kept as the reference for density and evidence slides |
| earlier 2 (v2) | `decks/AlphaQ_CaseB_Round1_earlier-2_v2.pptx` | 21 | Spacious, plain English, one core graphic per slide, top breadcrumb | **v1.1** | New diagrams: Pragati loop, friction matrix, layered architecture, intervention journey, compliance matrix with locks, lockbox, gauge, cost stack, Gantt, hub-and-spoke, risk matrix. Judged too spacious |
| earlier 3 (v3) | `decks/AlphaQ_CaseB_Round1_earlier-3_v3.pptx` | 22 | v1 density plus v2 diagrams, top breadcrumb, sticky-note touches | **v1.1** | Hybrid of v1 and v2; hand-made feel |
| **CURRENT (v4)** | `decks/AlphaQ_CaseB_Round1_CURRENT_v4.pptx` | 22 | v3 plus whiteboard and product-manager layer: three canvases (dots, soft dots, plain), sticky notes, hand-drawn arrows, underlines, name-tag cursors, PM framing | **v1.1** | **Current.** One emphasis per slide; psychology-led design intent in speaker notes (`docs/PRESENTER_NOTES_v4.md`) |

Lineage: v1 is built from `source/build/deck_v4_blue.js` (frozen base) and `parts/v5`; v2 from `parts/v2`; v3 from `parts/v3`; v4 is v3 with overlays added by `assemble_v4.py`. One-off migration scripts are in `source/build/legacy/`.

Each version's preview PNGs are in `previews/<same name as the deck>/`. Next version (v5) should start from v4's assembler and change only what feedback asks for.
