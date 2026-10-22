# AlphaQ deck: design system (PowerPoint, 16:9)

Decisions (2026-10-22): team **AlphaQ** (logo to come) · accent **teal** next to navy · **white** backgrounds (light tint for card zones) · built in **PowerPoint** · fonts chosen by the designer: **Cambria** (titles) and **Calibri** (body). Both ship with Microsoft Office, so the deck looks the same on any machine that has PowerPoint, and the exported PDF embeds them. Inter was dropped because it is not installed with Office and would silently fall back to another font. Hindi text uses Nirmala UI in the deck and Noto Sans Devanagari (in the repo, `technical/backend/templates/fonts/`) in the report module.
Derived from the reference deck (Myntra StylBiz) but fixed for legibility: its 10 pt body and 5 pt margins are not copied.

## 1. Page and grid
| Item | Value |
|---|---|
| Slide size | 13.333 x 7.5 in (960 x 540 pt), 16:9 |
| Margins | left/right 0.55 in, top 0.40 in, bottom 0.35 in |
| Columns | 12, gutter 0.20 in, column width 0.836 in |
| Header zone | y 0.40-1.70 in (eyebrow chip + action title, max 2 lines) |
| Content zone | y 1.85-6.75 in (4.9 in high) |
| Footer line | y 7.00 in: source text left (10 pt), "AlphaQ · Case B" centre, page number right |
| Spacing unit | 8 pt grid (gaps 8 / 16 / 24 / 32 pt); inside cards 16 pt padding |

PowerPoint setup: Design > Slide Size > Custom 13.333 x 7.5 in. View > Slide Master: add guides at 0.55 in from each edge and at 1.85 in and 6.75 in. Set theme fonts (Inter for headings and body) and theme colours from the table below, so every shape picks them up.

## 2. Colour tokens (contrast measured, WCAG 2.x)
| Token | Hex | Use | Contrast |
|---|---|---|---|
| Navy | `#0B2545` | titles, table headers, dark slides, key numbers | 15.4:1 on white |
| Ink | `#1B2A41` | body text | 14.4:1 on white |
| Muted | `#4F5D75` | captions, sources, secondary labels | 6.7:1 on white, 6.2:1 on tint |
| Teal | `#0F8B8D` | shapes, icons, chart series, big (24 pt+) numbers only | 4.1:1 on white (never for small text) |
| Teal-dark | `#0A6F71` | small accent text, button/chip fills with white text | 6.0:1 on white, white on it 6.0:1 |
| Teal-tint | `#E3F2F2` | chip and highlight fills | navy on it 13.4:1 |
| Tint | `#F4F7FB` | zone backgrounds, zebra rows | |
| Line | `#D5DEEA` | card borders, table rules (1 pt) | decorative |
| Amber | `#F2A900` | "PENDING / watch" tags only, with navy text | navy on it 7.7:1 |
| Red | `#B3261E` | "limit / not proven" outline and text only | 6.5:1 on white |
| Green | `#1B7F4F` | "verified" ticks | 5.0:1 on white |
| Teal on dark | `#19B5B7` | accent on navy slides | 6.1:1 on navy |
Rules: body text is always Ink or Navy on white/tint, or white on navy. Never navy on teal (3.7:1). Never red or amber for people's performance (see charts). One accent only (teal) plus amber/red as status.

## 3. Typography (Cambria titles, Calibri body; sizes in pt)
| Role | Size / weight | Colour | Notes |
|---|---|---|---|
| Eyebrow (category chip) | 11, semibold, ALL CAPS, +8 % tracking | white on Teal-dark pill | e.g. "EARLY WARNING" |
| Action title | 28, bold, line spacing 1.05 | Navy | one sentence, 90 characters or fewer, states the takeaway |
| Card heading | 16, bold | Navy | 6 words or fewer |
| Body | 14, regular (12 minimum inside dense tables) | Ink | 15 words per bullet or fewer; no paragraph over 3 lines |
| KPI number | 40, bold | Navy (deltas Teal-dark) | one unit per number |
| KPI label | 12, regular | Muted | what it measures + origin tag |
| Chip / tag text | 11, semibold | see tags | |
| Source / footnote | 10, regular | Muted | only place 10 pt is allowed |
Hindi: Nirmala UI 14 pt (never below 13 pt). Word budget: **70 words of body text per slide** plus one visual (the reference deck has 120+).

## 4. Components
| Component | Spec |
|---|---|
| Eyebrow chip | pill (radius full), height 0.30 in, Teal-dark fill, white 11 pt caps, at x=0.55 in, y=0.40 in |
| Action title | x=0.55 in, y=0.78 in, width 12.2 in, 28 pt bold navy, max 2 lines |
| Card | rounded rectangle radius 12 pt, Tint fill with no border on white slides (or white fill with a 1 pt Line border on Tint zones), no shadow, no accent stripe, 16 pt padding |
| Value row | 3 or 4 equal cards across the 12 columns, each one plain sentence, 14 pt, with a small Lucide icon (24 pt, Teal) at the top |
| KPI box | card with number 40 pt, label 12 pt, optional delta chip; height 1.25 in |
| Data chip | pill, Teal-tint fill, Navy 11 pt semibold text, e.g. "OULAD AUC 0.706" |
| Origin tag (mandatory on every number and image) | tiny pill 10 pt: **Public data** (Teal-dark outline), **Synthetic data** (Navy outline), **Model output** (Navy outline, finance), **Illustrative mock-up** (Muted outline) |
| Status tag | **BUILT** Teal-dark fill white text; **DESIGNED** white fill Teal-dark border; **PENDING** Amber fill Navy text; **NOT PROVEN** white fill Red border and text |
| Table | header row Navy fill, white 12 pt semibold; rows 0.42 in, 12-14 pt Ink; zebra Tint; horizontal 1 pt Line rules only, no vertical lines; first column semibold |
| Comparison table (before/after) | two content columns, header cells "Today" (Muted fill white text) and "With AlphaQ" (Teal-dark fill white text) |
| Flow arrows | 2 pt Teal lines with filled triangle heads, rounded step cards (Teal-tint) with step number badges |
| Footer strip (business slides) | full-width Tint bar y=6.20-6.75 in: Cost chip, Benefit chip, break-even chip; reuses the reference's Cost/Benefit idea |
| Mock-up frames | phone: 2.35 x 4.50 in, radius 24 pt, 3 pt Navy border; desktop: 6.4 x 4.0 in with a 0.28 in top bar (three grey dots), 1 pt Line border; screenshots cropped to fit, never stretched |
| Callout | 1.5 pt Teal circle or rounded rectangle on the screenshot with a numbered badge; legend in the card beside it |
| Dark slides (title, section break, closing) | Navy background, white title 36 pt, Teal-on-dark accents |

## 5. Charts and images
- Series colours: Teal, Navy, grey `#9AA7B8`; Amber only to highlight one point. Gridlines `#E5EAF1`, no chart borders, axis labels 12 pt Muted, data labels 12 pt Ink.
- **Heatmap: use light-to-dark teal (Teal-tint to Teal to Navy), never red/green.** Labels are the supportive bands: *not enough data / building / steady / strong*. No colour ever says "bad student".
- Every chart: a one-line takeaway as its title (not "Figure 2"), n and origin tag under it.
- Images: PNG at 2x (screenshots at least 1800 px wide), consistent 12 pt rounded corners, 1 pt Line border. Icons: Lucide (ISC licence), 24 pt, single Teal colour.
- Place visuals on the right for text-led slides and on the left for visual-led ones; keep at least 0.3 in between image and text; never overlap text with images.

## 6. Slide skeletons (repeatable like the reference deck)
- **S1 Value-row slide** (solution, problem): header + 3-4 value cards + body zone (table or screenshot) + optional footer strip.
- **S2 Split slide** (analytics, prediction): header + 50/50: visual left, 3 stacked cards right.
- **S3 Pillar slide** (privacy, moat): header + 3 equal vertical pillars + quote bar at the bottom.
- **S4 Number slide** (ROI, unit economics): header + KPI row (4 boxes) + comparison table or chart + footer strip.
- **S5 Roadmap slide** (go-to-market, pilot): header + horizontal timeline bar with milestone markers + 3 stage cards.
Use the same skeleton for the same kind of content so judges learn the layout once.

## 7. Do and do not
Do: lead with the takeaway; one idea per slide; plain subject-first sentences ("Staff upload what they already have"); show real numbers with n and origin; state limits on the slide they apply to.
Do not: more than 70 body words; text under 12 pt (10 pt only for sources); more than one accent colour; red/green for students; decorative clip-art; a number without an origin tag; a mock-up without the "Illustrative mock-up" tag until it is a real screenshot from the running prototype.

## 8. Accessibility and export
Check contrast with the table above; set alt text on every image; reading order top-left to bottom-right; export PDF at 16:9 with fonts embedded (File > Export > PDF, "Standard"); file name `AlphaQ_CaseB_Round1.pdf` (rule: `TeamName_Case_Round.pdf`); test-read the PDF on a phone at 100 % zoom: if body text is hard to read there, it is too small.

## 9. As built (2026-10-22): deviations from the first draft
- Built by `presentation/source/build/deck.js` (pptxgenjs), 19 slides: title, 12 content slides, appendix A1-A5, final AI-disclosure slide.
- **No accent rules under titles and no edge stripes on cards or slide edges**: they read as template decoration. Hierarchy comes from size, weight, spacing and tinted cards instead.
- Visuals are native shapes (editable in PowerPoint): heatmap, support list, phone report, upload screen, percentile band, tornado, architecture. Charts are drawn as shapes so they render identically everywhere.
- Tag labels are written in plain words (GUIDE BASELINE, MODEL OUTPUT, PUBLIC DATA, SYNTHETIC DATA, ILLUSTRATIVE MOCK-UP; BUILT, IN BUILD, DESIGNED, PENDING, NOT PROVEN).
- Amber PENDING tags mark numbers that wait for model results. Remove each one only after the number appears in `technical/scripts/deck_numbers.py` output.
- Preview and checks: `python presentation/source/build/render_check.py presentation/decks/AlphaQ_CaseB_Round1_CURRENT_v4.pptx presentation/previews/v4` draws every slide with the real Windows fonts and lists text overflow. Hindi letter shaping in that preview is approximate; PowerPoint renders it correctly.

## 10. Version 2 (2026-10-22): dense consultant style
The first build was too sparse for a competition deck. Version 2 follows the reference decks: many small evidence panels per slide, dashed teal frames with caps titles, navy header bars, gold highlight rows and green result rows in tables, numbered callouts on screenshots, chart panels drawn from real result files, icons in flat coloured circles, and a source line on every slide.
- **Two registers:** white dense slides for problem, analysis and business (frames, tables, charts); dark HTML-rendered slides for the product wall, the architecture and the differentiators (glow cards, status tags, evidence boxes), as in the RAY deck.
- **Type floor:** body 10 to 11.5 pt in dense panels, tables 9.5 to 11 pt, sources 9.5 pt. This is deliberate; titles stay at 24 pt and every number sits in a labelled panel.
- **Rubric tag** (top right of each content slide) names the judging criterion the slide answers.
- Components live in `presentation/source/build/lib2.js` (`frame`, `hdrBar`, `labelBar`, `dtable`, `heat`, `badge`, `callout`, `pic`).
