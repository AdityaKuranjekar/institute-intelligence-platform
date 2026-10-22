# -*- coding: utf-8 -*-
"""Builds DataMoat_Financial_Model_Preparation_Report.pdf: how the financial model was prepared (method, evidence, tests, audit trail).

Reuses the helpers and house style of build_guide_pdf.py and the numbers in guide_numbers.json (made by extract_numbers.py).
Run:  python extract_numbers.py ; python build_prep_report.py
"""
import io
import os

HERE = os.path.dirname(os.path.abspath(__file__))
_src = io.open(os.path.join(HERE, "build_guide_pdf.py"), encoding="utf-8").read()
_prefix = _src[:_src.index('\nPJ = N["proj"]\n')]  # helpers, charts, page templates: everything before the explainer's story


def _swap(old, new):
    global _prefix
    assert _prefix.count(old) == 1, old[:70]
    _prefix = _prefix.replace(old, new)


_swap('OUT = os.path.join(HERE, "..", "DataMoat_Financial_Model_Explained.pdf")',
      'OUT = os.path.join(HERE, "..", "DataMoat_Financial_Model_Preparation_Report.pdf")')
_swap('c.drawString(LM, PH - 70 * mm, "The Financial Model,")', 'c.drawString(LM, PH - 70 * mm, "How the Financial Model")')
_swap('c.drawString(LM, PH - 88 * mm, "Explained")', 'c.drawString(LM, PH - 88 * mm, "Was Prepared")')
_swap('"Every tab, every term and how it all connects to the case brief,"', '"Method, evidence, tests and audit trail behind the model,"')
_swap('"in plain English for a first-time reader."', '"for judges, mentors and teammates who want to see the work."')
_swap('title="The Data Moat financial model, explained"', 'title="How the Data Moat financial model was prepared"')
_swap('subject="Plain-English guide to DataMoat_Financial_Model.xlsx and its link to the Case B problem statement"',
      'subject="Preparation report: method, evidence, verification and audit of DataMoat_Financial_Model_v1.1.xlsx"')
_swap('"The Data Moat · financial model explained · Team AlphaQ"', '"The Data Moat · how the financial model was prepared · Team AlphaQ"')
exec(compile(_prefix, "build_guide_pdf_prefix", "exec"), globals())

PJ = N["proj"]
PJS = N["proj_scen"]
PA, PK, PD = PJ["annual"], PJ["kpi"], PJ["derived"]
N_DRIVERS = sum(1 for r in A.values() if (r.get("driver") or "").strip().upper() == "Y")


def money(x):
    return lakh(x, 1)


def be_txt(v):
    return f"month {int(v)}" if isinstance(v, (int, float)) else "after month 36"


story = []

# ================================================================== cover (lower frame) and contents
tiles = [(str(N_INPUTS), "inputs, each with unit, range, source and confidence"), ("7", "research workstreams (R1 to R7)"),
         ("18", "findings fixed in the CFO audit"), ("90", "values matched by an independent rebuild"),
         (str(N_ERR), "automatic error checks, all passing"), ("0", "formula errors in about 37,000 cells")]
cells = [[[Paragraph(f'<font name="Cambria-Bold" size="20" color="{H(NAVY)}">{a}</font>', PS("t1", leading=24, spaceAfter=0)),
           Paragraph(b, PS("t2", fontSize=9.2, leading=11.5, textColor=MUTED, spaceAfter=0))] for a, b in tiles[i:i + 3]]
         for i in range(0, 6, 3)]
ct = Table(cells, colWidths=[W / 3] * 3)
ct.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), TINT), ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                        ("LINEBEFORE", (1, 0), (-1, -1), 0.6, LINE), ("LINEBELOW", (0, 0), (-1, 0), 0.6, LINE),
                        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
lab = PS("cw", fontName="Calibri-Bold", fontSize=11.5, textColor=TEALD, spaceAfter=3)
story += [Spacer(1, 4), Paragraph("What this report is", lab),
          Paragraph("The record of how the Data Moat financial model was prepared: what it had to do, how the work was done, what "
                    "evidence stands behind each input, how the calculations work, how they were tested, what an independent CFO review "
                    "changed, and how to reproduce everything. It complements the plain-English guide, which explains what each tab means.",
                    PS("cp", fontSize=11, leading=15)), Spacer(1, 10), Paragraph("The work in numbers", lab), ct,
          NextPageTemplate("body"), PageBreak()]

story += [Paragraph("CONTENTS", EYEBROW), Paragraph("About this report", H1),
          Table([[""]], colWidths=[W], rowHeights=[1.4], style=[("BACKGROUND", (0, 0), (-1, -1), TEAL)]), Spacer(1, 7),
          callout("plain", f"<b>In one paragraph.</b> We built a live-formula Excel model for an AI analytics product sold to coaching "
                           f"institutes. It answers three questions: is the product worth its price to an owner, do we earn our money back "
                           f"on each institute, and what does that add up to over three years. We then had it reviewed like a sceptical CFO, "
                           f"found 18 problems, fixed them, and re-tested. The honest answer: on hard benefits an owner gets back "
                           f"<b>{xm(R_('hard_roi'))}</b> of the cost ({xm(R_('roi'))} if admissions improve); each institute is worth "
                           f"<b>{xm(U_('ltv_cac'))}</b> what it costs to win; the business is lean and market-capped ({money(PJS['rev3']['base'])} "
                           f"revenue and {money(PJS['funding']['base'])} of funding over three years)."),
          callout("ps", "<b>Why this matters for the competition.</b> PS Section 10 gives 20% of the marks to the revenue model and unit "
                        "economics (including the 3-year projection) and says teams that state assumptions and limitations clearly score "
                        "higher than teams that oversell. This report is the evidence that the numbers are traceable, tested and honest."),
          P("Chapters", H3)]
toc = TableOfContents()
toc.levelStyles = [ParagraphStyle("TOC0", fontName="Calibri-Bold", fontSize=10.5, leading=13, textColor=NAVY, spaceBefore=3)]
toc.dotsMinLevel = 0
toc.tableStyle = TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                             ("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                             ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5)])
story += [toc]

# ================================================================== 1 what the model had to do
story += part_head(1, "What the model had to do",
                   "Everything starts from the problem statement (the PS). We traced each requirement to a place in the workbook before "
                   "building anything, and re-traced it during the audit.", new_page=True)
story += [tbl([["PS requirement", "PS ref", "Where it is answered", "Status"],
               ["Challenge the naive worked example (2.25x return, 10x LTV/CAC)", "Sec 6", "A “Guide (naive)” column beside our numbers on every output tab", "Done"],
               ["Measurable ROI for an institute; who is the buyer", "Sec 3 · B1", "Institute_ROI: three returns and a break-even", "Done"],
               ["Pricing, packaging, CAC, payback, churn, LTV", "Sec 3 · B2", "Pricing, COGS_Build, Unit_Econ", "Done"],
               ["Cities and sizes first; direct, partners or product-led", "Sec 3 · B3", "Unit_Econ by size and channel; Projection market cap", "Done"],
               ["Infrastructure + AI cost per student per month", "Sec 3 · A7, Sec 7", f"COGS_Build: {inr(CO['all_in'], 2)} against the PS range ₹3–10", "Done"],
               ["Churn after exam season; seasonal student counts", "Sec 6", "Seasonality and the renewal logic in Unit_Econ", "Done"],
               ["Live formulas, listed assumptions, at least one sensitivity", "Sec 9 · Round 1", "All tabs; Assumptions and Sources; Sensitivity", "Done"],
               ["3-year projection, scenarios, sensitivities", "Sec 9 · Round 2; Sec 4 and 10", "Projection, Scenarios, Sensitivity", "Done; 3-year sensitivity grid still to come"],
               ["Ranges, scenarios and evidence", "Sec 6", "Bear / Base / Bull on 13 drivers, a Stress test, a source and confidence per input", "Done"],
               ["State assumptions and limitations", "Sec 10", "Warnings on Checks; evidence labels; the limits in chapter 9", "Done"],
               ["Other revenue models (outcome-linked, parent, marketplace, benchmarks)", "Sec 6", "Not modelled; listed as such", "Open by choice"]],
              [66, 24, 62, 22]),
          Spacer(1, 6),
          callout("warn", "<b>Out of scope on purpose:</b> upsell and expansion revenue (so no NRR), income tax, early cash from annual prepay, "
                          "any management response in the Bear case, and the PS revenue models other than per-student SaaS.")]

# ================================================================== 2 how it was prepared
story += part_head(2, "How it was prepared",
                   "Eight steps, in order. Each step left a file behind, so a reviewer can check the work.")
story += [tbl([["#", "Step", "What was done", "What it left behind"],
               ["1", "Challenge the guide<br/>(20 Oct)", "Listed the ten weakest points of the PS's naive example: flat 25% prevention, whole-fee loss, 12 billing months, "
                "1/churn lifetime, one average institute, no seasonality, no proof.", "FINANCE_PLAN.md"],
               ["2", "Research<br/>(20 and 22 Oct)", "Seven workstreams, run in parallel: R1 competitor prices, R2 fees and refund rules, R3 dropout evidence, "
                "R4 trials on early warning, R5 SaaS benchmarks and salaries, R6 unit costs (WhatsApp, AI, GST, payments, cloud), R7 market size. "
                "Rules: primary sources first, never estimate (write “not found”), every row with a link, date and confidence.", "research/R1 to R7 (.md)"],
               ["3", "Design the inputs", "Every number became a row with unit, Bear / Base / Bull, an evidence type (Researched, Public, Guide, Assumption, Structural), "
                "a confidence (H, M, L), a source and a note.", "assumptions.csv, seasonality.csv"],
               ["4", "Build<br/>(20 Oct)", "A Python generator writes the workbook: live formulas only, one Assumptions sheet, named ranges, a scenario switch, a hidden Engine "
                "that re-runs the model for scenarios and sensitivities.", "build_model.py, the .xlsx"],
               ["5", "First verification", "Automatic checks in the workbook; an independent plain-Python rebuild of the unit economics matched to the rupee.",
                "Checks tab, verify_model.py"],
               ["6", "Document", "Slide-ready numbers with cell references, a “do not claim” list, and a plain-English guide to every tab.",
                "README.md, the explainer PDF"],
               ["7", "CFO audit<br/>(22 Oct)", "Re-read the PS, cross-checked every input against the technical team's measurements and against how SaaS peers calculate. "
                "Found 18 issues, including a missing 3-year projection. Fixed them, added the Projection tab and the market research.", "MODEL_AUDIT.md, v1.1"],
               ["8", "Re-verify and hand off", "Full recalculation, independent rebuild of ROI, unit economics and the projection, a structural scan, refreshed documents.",
                "this report, DECK_NUMBER_UPDATES.md"]],
              [8, 28, 100, 38], first_bold=False),
          Spacer(1, 6),
          callout("plain", "<b>The rule behind every step:</b> a number is either sourced, or labelled as an assumption, or both. Nothing is "
                           "typed into a calculation; if it changes, it changes in one place and everything follows.")]

# ================================================================== 3 how it is built
story += part_head(3, "How the model is built",
                   "A small set of design rules does most of the work of keeping a 30,000-formula workbook trustworthy.")
story += [workbook_map(), Paragraph("Inputs flow right: Assumptions and Seasonality, then Pricing and COGS, then the business case, then the answers. "
                                    "Checks and Sources watch over everything.", CAP),
          tbl([["Design rule", "Why it matters"],
               ["One home for numbers: the Assumptions sheet (plus the monthly calendar on Seasonality)", "A judge can change one cell and see everything move; nothing is hidden inside a formula"],
               ["The workbook is generated from two CSV files by a script", "Inputs are versioned and diffable; the script rebuilds the workbook in seconds"],
               ["Colour code: blue = typed input, black = formula, green = pulled from another tab", "A reader can tell at a glance what is an assumption"],
               [f"Scenario drivers: only {N_DRIVERS} inputs move with the Bear / Base / Bull switch", "Scenarios are coherent stories, not an everything-at-worst joint extreme"],
               ["A hidden Engine and three hidden Proj_ sheets hold copies of the whole chain", "Scenarios, Stress and the tornado work without macros or Excel Data Tables, which break in Google Sheets"],
               ["Each calculation sheet starts with the inputs it uses, pulled in green", "No typed number ever sits inside a calculation"],
               ["Checks sheet with error checks and honest warnings", "Arithmetic errors stop the Cover from saying ALL CHECKS PASS; uncomfortable results raise a warning"],
               ["Row positions of every output are exported to model_layout.json", "Downstream documents read exact cells instead of guessing at labels"]],
              [86, 88], first_bold=False)]

# ================================================================== 4 the evidence behind the inputs
story += part_head(4, "The evidence behind the inputs",
                   f"Of {N_INPUTS} inputs, {TYPES['Researched']} are researched, {TYPES['Public']} are public, {TYPES['Guide']} come straight from the PS, "
                   f"<b>{TYPES['Assumption']} are our own assumptions</b> and {TYPES['Structural']} are modelling conventions. Half the model is still judgement, and it says so.")
story += [tbl([["Workstream", "What it established", "What it fed in the model"],
               ["R1 · Competitor prices", "ERP and LMS tools list at about ₹4–21 per student per month at 400 students (Classplus, Fedena, Graphy); nobody bundles OMR, topic analytics and Hindi parent reports",
                f"Price anchor; the warning that our {inr(AB('ListPrice'))} list price is above every competitor"],
               ["R2 · Fees and refund rules", "Local institutes charge about ₹50k–1.2L a year; the Ministry of Education guideline (cl. 8(iv)) and Rajasthan Act (s.6(2)(d), s.13(4)) set instalment and pro-rata refund rules, but chains rarely follow them",
                f"Fee levels by size (₹{AB('Fee_S') / 1000:.0f}k / ₹{AB('Fee_M') / 1000:.0f}k / ₹{AB('Fee_L') / 1000:.0f}k), instalments, refund compliance"],
               ["R3 · Dropout evidence", "Thin: a trade body says “at least 10% per batch”; no timing or reasons by share. The PS baseline is 8–15%", f"Dropout rate {pct_s(AB('DropoutRate'))}; timing curve flagged as an assumption"],
               ["R4 · Trials on early warning", "Eight randomised trials: mean 15.8%, median 12.5% relative reduction in dropout among flagged students who get outreach; India's Room to Read 30%, MAAPS and Samata nulls",
                f"Trial effect {pct_s(AB('InterventionSuccess'))} (5% / 15% / 30%), labelled “borrowed from other settings”"],
               ["R5 · SaaS benchmarks, salaries", "SaaS Capital 2025 net revenue retention 90 / 98 / 106%; ChartMogul churn; India SMB CAC and payback only from weak sources; Tier-2 salaries from Payscale and job postings",
                "Churn, conversion, CAC build, salaries; most rows flagged confidence L"],
               ["R6 · Unit costs", "WhatsApp utility ₹0.115–0.145 a message; GST 18% (unregistered institutes cannot reclaim); hosted AI prices; Razorpay 2.36%; cloud prices",
                f"COGS {inr(CO['all_in'], 2)} per student per month; GST and gateway inputs"],
               ["R7 · Market size", "No institute counts by size for any state; 574 registered coaching institutes in Patna district; JEE and NEET registrations; SAM derived bottom-up",
                f"Addressable market {indian(AB('AddressableInstitutes'))} and penetration {pct_s(AB('MaxPenetration'))}, both assumptions"],
               ["Technical team's own measurements", "Recall 0.31–0.41 of dropouts at a workable workload; precision about 0.15; 78% of students are minors; dropout peaks in months 3–4; 25% of dropouts are sudden",
                f"Recall {pct_s(AB('Recall_Minor'))} / {pct_s(AB('Recall_Adult'))}, precision {pct_s(AB('Precision'))}, minors share, timing"]],
              [32, 88, 54], first_bold=True),
          Spacer(1, 6),
          callout("warn", "<b>Where the evidence is weakest:</b> willingness to pay, the admissions uplift, pilot-to-paid conversion, the addressable "
                          "market, mentor time per flag, and the upfront-payer and refund-compliance shares. These are labelled Assumption, shown in the "
                          "tornado, and listed as the first things to test in owner interviews.")]

# ================================================================== 5 the method
story += part_head(5, "The method, module by module",
                   "What each calculation block does, with the Base-case numbers for a typical 400-student institute.")
story += [Paragraph("5.1  Owner's return (Institute_ROI)", H2),
          *bullets([
              f"<b>What a dropout costs.</b> For each month a student might leave, the fee actually lost is the unpaid instalments (instalment payers) or the pro-rata refund times its compliance rate (upfront payers); weighted by the dropout-timing curve it averages {inr(R_('fee_lost'))}, not the whole {inr(AB('Fee_M'))} fee.",
              f"<b>The prevention funnel.</b> Share prevented = share catchable after the blind months ({pct_s(R_('catchable'))}) × recall ({pct_s(R_('recall'))}) × follow-up rate ({pct_s(AB('ActionRate'))}) × trial effect ({pct_s(AB('InterventionSuccess'))}) = <b>{pct(R_('eff_red'))}</b>, not the PS's flat 25%.",
              f"<b>Value and cost.</b> Value = fees retained ({inr(R_('fees_retained'))}) + staff time ({inr(R_('staff'))}) + admissions margin ({inr(R_('admissions'))}). Cost = platform fee ({inr(R_('platform_fee'))}) + GST not reclaimed ({inr(R_('gst'))}) + mentor time acting on flags ({inr(R_('mentor'))}, {pct(R_('flagged_share'), 0)} of the roll flagged).",
              f"<b>Three returns.</b> Fees only {xm(R_('roi_fees'))}; hard benefits (fees + staff time) {xm(R_('hard_roi'))}; all benefits {xm(R_('roi'))}. Break-even needs {num(R_('be_students'))} students kept or {num(R_('uplift_students'))} extra admissions a year."]),
          Paragraph("5.2  Our unit economics (Unit_Econ)", H2),
          *bullets([
              f"<b>Revenue and contribution.</b> Price × active students × a monthly seasonal index, with a minimum fee, discounts and bad debt: {inr(U_('rev_m'))} a month; after cost of serving and customer-success staff, {inr(U_('contr'))} ({pct(U_('cm'), 0)}).",
              f"<b>Acquisition.</b> Rep cost with {pct_s(AB('SalesOverheadPct'))} overhead ÷ pilots per rep, ÷ pilot-to-paid conversion ({pct_s(AB('PilotConv'))}), plus marketing: CAC {inr(U_('cac'))}. Adding pilot cost and onboarding: {inr(U_('acq'))} fully loaded.",
              f"<b>Retention.</b> Monthly churn applies only to institutes not on annual prepay ({pct(U_('churn_eff'))} a month); a renewal spike ({pct_s(AB('RenewalSpike'))}) applies in three renewal months, and only after nine months of paying. Annual retention {pct(U_('ret'), 0)}.",
              f"<b>LTV and payback.</b> Contribution × share still paying × discount factor over 60 months: {lakh(U_('ltv'))} discounted, {lakh(U_('ltv_undisc'))} undiscounted. LTV ÷ CAC {xm(U_('ltv_cac'))} and {xm(U_('ltv_undisc_cac'))}; payback {num(U_('payback_simple'))} months simple, {num(U_('payback'), 0)} survival-weighted. A channel partner lifts small institutes from {xm(U_('ltv_cac', 'small'))} to {xm(U_('channel_ltv_cac', 'small'))}."]),
          Paragraph("5.3  The 3-year projection (Projection)", H2),
          *bullets([
              f"<b>Sales capacity.</b> Reps × pilots per rep × a sales-intensity index that peaks March to June; pilots convert a month later at {pct_s(AB('PilotConv'))}.",
              f"<b>Market cap.</b> New institutes never exceed addressable institutes × maximum penetration = {num(PD['sam_cap'], 0)} in total; the cap limited sales in {int(PK['k_capbind'])} months.",
              "<b>Cohorts.</b> Each month's new institutes are tracked separately with the same churn and renewal logic as Unit_Econ.",
              "<b>Costs.</b> Variable cost of serving, server stacks, customer-success staff in steps, sales and marketing, engineers, founders and overheads, with percentage-of-revenue floors so costs grow with revenue.",
              f"<b>Cash.</b> Receivables, equipment for new hires, then the funding ask = deepest cash deficit ({money(PK['k_peak'])}) + three months of costs ({money(PK['k_buffer'])}), rounded up: <b>{money(PK['k_funding'])}</b>."]),
          Paragraph("5.4  Scenarios and sensitivity", H2),
          *bullets([
              f"<b>Scenarios.</b> Bear / Base / Bull flex the {N_DRIVERS} drivers marked Y on Assumptions; all else stays at Base. <b>Stress</b> flexes every input to its worst and is a survival test.",
              f"<b>Tornado.</b> {len(N['tornado'])} inputs, each moved alone from its Bear to its Bull value; the chart ranks them by swing in the owner's return and in LTV ÷ CAC.",
              "<b>Two what-if grids.</b> The owner's return by price and prevention rate; LTV ÷ CAC by churn and acquisition cost. Both are computed with plain formulas, not Excel Data Tables."])]

# ================================================================== 6 how it was tested
story += part_head(6, "How it was tested",
                   "A green recalculation proves the formulas evaluate, not that they are right. So there are four independent layers.")
story += [tbl([["Test", "What it proves", "Result"],
               ["Full recalculation of the workbook in a separate engine (no Excel)", "No broken references, no #errors, no stray artifacts", "About 37,000 cells, 0 formula errors"],
               [f"{N_ERR} automatic error checks inside the workbook", "Percentages in range, timing sums to 100%, customer mix sums to 100%, live values inside Bear–Bull, projection never exceeds the market cap or runs out of cash", "All pass"],
               ["Engine reproduces the visible tabs for all three sizes (6 checks)", "Scenarios and the tornado use exactly the same logic as the main tabs", "All pass"],
               ["Our copy of the PS example reproduces 2.25x", "We read the case brief correctly", "Pass"],
               ["Independent plain-Python rebuild of ROI and unit economics (3 sizes)", "The spreadsheet formulas compute what the method says", "57 of 57 values match"],
               ["Independent rebuild of the 3-year projection (Bear, Base, Bull)", "Cohorts, market cap, P&amp;L, cash and funding ask are right", "33 of 33 values match"],
               ["Live Projection equals the fixed-scenario sheet for the chosen scenario", "The hidden copies agree with the visible one", "Pass"],
               ["Structural scan of 31,232 formulas and 117 named ranges", "No leftover placeholders; no names that Excel could confuse with cell references", "Clean"],
               ["Cross-check with the technical team's measurements and with peer conventions", "Inputs and definitions agree across workstreams", "Led to findings F3 to F11"]],
              [62, 80, 32], first_bold=False),
          Spacer(1, 6),
          callout("ps", "The three warnings that fire today are limitations the model reports about itself, which PS Section 10 rewards: "
                        f"{'; '.join(c['label'].replace('WARNING: ', '').lower() for c in N['checks'] if c['type'] == 'Warning' and c['flag'] == 1)}."),
          callout("warn", "<b>What testing cannot do:</b> prove the assumptions true. The checks confirm the arithmetic and the logic; only owner interviews, "
                          "a pilot and the technical team's measured metrics can confirm the inputs.")]

# ================================================================== 7 the CFO audit
story += part_head(7, "The CFO audit",
                   "On 22 October the model was re-read as a sceptical CFO would read it. The full record is in MODEL_AUDIT.md; this is the summary.")
story += [tbl([["#", "Finding", "Fix"],
               ["F1", "A May sign-up faced the renewal spike in June (LTV understated about 7%)", "Renewal only after 9 months of paying"],
               ["F2", "PS column used our fee instead of the PS's ₹60k for “cost as % of fee”", "Added the PS's own fee input"],
               ["F3", "Mentor time 30 minutes per flagged student", "120 minutes"],
               ["F4", "Recall 55% / 65% versus 31–41% measured by the tech team", f"{pct_s(AB('Recall_Minor'))} / {pct_s(AB('Recall_Adult'))}"],
               ["F5", "Precision 35% versus about 15% implied by the tech data", f"{pct_s(AB('Precision'))}; alert-load check added"],
               ["F6", "Dropout rate used a trade-body floor as a mean", "PS baseline 12%"],
               ["F7", "Dropout timing front-loaded; PS and tech data peak in months 3–4", "Curve re-shaped; two blind months"],
               ["F8", "Minors share 75% versus 78%", "78%"],
               ["F9", "Mid fee came from chain price pages", f"₹{AB('Fee_S') / 1000:.0f}k / ₹{AB('Fee_M') / 1000:.0f}k / ₹{AB('Fee_L') / 1000:.0f}k"],
               ["F10", "No simple payback or undiscounted LTV (what peers and the PS quote)", "Both added"],
               ["F11", "CAC excluded sales overhead and sat below the PS's ₹15–30k range", f"{pct_s(AB('SalesOverheadPct'))} loading"],
               ["F12", "“Gross margin” excluded support staff", "Relabelled; contribution margin = peer gross margin"],
               ["F13", "An unproven assumption carried two-thirds of the headline return", "Hard-benefit return leads"],
               ["F14", "Bear and Bull moved all inputs at once", f"{N_DRIVERS} drivers plus a Stress column"],
               ["F15", "No 3-year projection (the PS rubric lists one)", "New Projection tab"],
               ["F16", "No channel-partner economics (PS question B3)", "Field versus channel comparison"],
               ["F17", "Draft projection let costs stay flat as revenue grew", "R&D and overhead floors"],
               ["F18", "No market cap on the projection", "Cap from research R7; one-rep hiring plan"]],
              [10, 98, 66], first_bold=True),
          Spacer(1, 6), P("What moved (Base, 400-student institute)", H3),
          tbl([["Metric", "v1.0", "v1.1"],
               ["Share of dropouts prevented", "6.6%", pct(R_("eff_red"))],
               ["Owner's return: fees only / hard benefits / all benefits", "0.75x / about 1.0x / 2.9x", f"{xm(R_('roi_fees'))} / {xm(R_('hard_roi'))} / {xm(R_('roi'))}"],
               ["Students to keep to break even", "3.5", num(R_("be_students"))],
               ["CAC (sales + marketing)", "₹12,667", inr(U_("cac"))],
               ["LTV ÷ CAC, discounted", "3.7x", xm(U_("ltv_cac"))],
               ["Year-3 revenue / EBITDA / funding", "not modelled", f"{money(PJS['rev3']['base'])} / {money(PJS['ebitda3']['base'])} / {money(PJS['funding']['base'])}"]],
              [90, 42, 42], right=(1, 2))]

# ================================================================== 8 what the model says
story += part_head(8, "What the model says",
                   "The corrected model is less flattering and more defensible. Bear, Base and Bull flex the key drivers; Stress is a survival test.")
SCN = N["scen"]


def f_(k, v, kind):
    if v is None:
        return "n/a"
    if kind == "pct":
        return pct(v)
    if kind == "x":
        return xm(v)
    if kind == "inr":
        return inr(v)
    return num(v)


story += [tbl([["Mid institute", "Bear", "Base", "Bull", "Stress"]] +
              [[lab_] + [f_(k, SCN[k][c], kind) for c in ("bear", "base", "bull", "stress")] for lab_, k, kind in
               (("Owner's return, all benefits", "roi", "x"), ("Owner's return, hard benefits", "hard_roi", "x"),
                ("Owner's return, fees only", "roi_fees", "x"), ("LTV ÷ acquisition cost, discounted", "ltv_cac", "x"),
                ("LTV ÷ acquisition cost, undiscounted", "ltv_undisc_cac", "x"), ("Fully loaded acquisition cost", "acq", "inr"))] +
              [["Revenue in year 3"] + [money(PJS["rev3"][c]) for c in ("bear", "base", "bull")] + ["n/a"],
               ["EBITDA in year 3"] + [money(PJS["ebitda3"][c]) for c in ("bear", "base", "bull")] + ["n/a"],
               ["Funding the model says we need"] + [money(PJS["funding"][c]) for c in ("bear", "base", "bull")] + ["n/a"],
               ["Break-even month"] + [be_txt(PJS["be3"][c]) for c in ("bear", "base", "bull")] + ["n/a"]],
              [66, 27, 27, 27, 27], right=(1, 2, 3, 4)),
          Spacer(1, 6), proj_chart(),
          Paragraph("Base case: paying institutes (bars), institutes won so far (line), the market cap (dashed); cumulative cash before funding below.", CAP),
          *bullets([
              f"<b>Retention alone does not pay for the product.</b> Fees retained return {xm(R_('roi_fees'))} of the owner's cost. The pitch must be a bundle: staff time, parent reports, results.",
              f"<b>Our unit economics hold.</b> LTV ÷ CAC {xm(U_('ltv_cac'))} discounted, {xm(U_('ltv_undisc_cac'))} undiscounted; simple payback {num(U_('payback_simple'))} months. Small institutes belong with channel partners ({xm(U_('channel_ltv_cac', 'small'))} against {xm(U_('ltv_cac', 'small'))} by field sales).",
              f"<b>The market caps the plan, not money.</b> At {pct_s(AB('MaxPenetration'))} of {indian(AB('AddressableInstitutes'))} institutes the business is lean; a second sales rep does not help until territory grows.",
              "<b>Price is a two-sided trap.</b> A lower price helps the owner's return and hurts our LTV ÷ CAC. Only owner interviews can find the price where both work."])]

# ================================================================== 9 limits and reproduce
story += part_head(9, "Limits, open items and how to reproduce",
                   "What a reader should not over-trust, what to do next, and the commands that rebuild everything.")
story += [tbl([["Limit", "Why it matters", "How it closes"],
               [f"Willingness to pay ({inr(AB('ListPrice'))} list)", "Above every competitor price found; untested", "Owner interviews and a Van Westendorp price survey"],
               [f"Admissions uplift ({pct_s(AB('AdmissionUplift'))})", f"Lifts the owner's return from {xm(R_('hard_roi'))} to {xm(R_('roi'))}; no evidence", "Track next-session admissions in pilots"],
               ["Addressable market and penetration", "Derived, not counted; caps the whole 3-year plan", "10–15 owner calls; the UP district survey when published"],
               ["Recall and precision", "Placeholders matching the tech team's early tests", "Replace with Agent C's metrics.json"],
               ["Pilot conversion, mentor time, support load", "Borrowed or assumed", "Time-track the first 20 pilots"],
               ["Bear funding", "Assumes no cost response", "A real team would cut costs"],
               ["Not modelled", "Expansion revenue and NRR, outcome-linked pricing, tax, prepaid cash timing, a 3-year sensitivity grid", "Round 2 extras"]],
              [52, 70, 52], first_bold=True),
          Spacer(1, 8), P("Reproduce everything", H3),
          tbl([["Command (in the Financial_Model folder)", "What it does"],
               ["python build_model.py", "Rebuilds DataMoat_Financial_Model_v1.1.xlsx from assumptions.csv and seasonality.csv"],
               ["python verify_model.py --all", "Recalculates without Excel; prints the Cover, the Checks, Scenarios, Sensitivity and the projection (about 3 minutes)"],
               ["python guide/extract_numbers.py", "Reads every output cell into guide_numbers.json (about 4 minutes)"],
               ["python guide/build_guide_pdf.py", "Rebuilds the plain-English explainer"],
               ["python guide/build_prep_report.py", "Rebuilds this report"]],
              [66, 108], first_bold=False),
          Spacer(1, 8),
          callout("plain", f"<b>Sign-off.</b> Model {VERSION}. Verified: 0 formula errors, {N_ERR} of {N_ERR} error checks pass, 90 of 90 values reproduced "
                           "independently. Records: MODEL_AUDIT.md (the audit), README.md (slide numbers), DECK_NUMBER_UPDATES.md (old to new numbers), "
                           "research/ (sources). Every figure here is a model output, not a measurement.")]

DOC.multiBuild(finalize(story))
print("wrote", os.path.abspath(OUT))
