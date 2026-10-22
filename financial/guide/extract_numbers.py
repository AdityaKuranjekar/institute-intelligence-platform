"""Reads the calculated values of DataMoat_Financial_Model_CURRENT_v1.1.xlsx (no Excel needed) and writes guide_numbers.json,
which build_guide_pdf.py uses so no number in the explainer is typed by hand.

Row positions come from ../model_layout.json, which build_model.py writes next to the workbook, so nothing is guessed from labels.
Run from this folder:  python extract_numbers.py        (needs: pip install openpyxl formulas; takes about 4 minutes)
"""
import json
import os
import shutil
import tempfile
import warnings

warnings.filterwarnings("ignore")
import formulas  # noqa: E402
from openpyxl.utils import get_column_letter  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
XLSX = os.path.join(HERE, "..", "model", "DataMoat_Financial_Model_CURRENT_v1.1.xlsx")
LAY = json.load(open(os.path.join(HERE, "..", "model", "model_layout.json"), encoding="utf-8"))

CACHE = os.path.join(HERE, "_values_cache.json")
if os.path.exists(CACHE) and os.path.getmtime(CACHE) >= os.path.getmtime(XLSX):
    V = json.load(open(CACHE, encoding="utf-8"))
    print("using cached values (workbook unchanged since the last recalculation)")
else:
    tmp = os.path.join(tempfile.mkdtemp(), "model.xlsx")
    shutil.copy(XLSX, tmp)  # work on a copy: the original may be open in Excel
    sol = formulas.ExcelModel().loads(tmp).finish().calculate()
    V = {}
    for k, v in sol.items():
        key = k.upper()
        if "!" not in key or ":" in key.split("!")[1]:
            continue
        sheet = key.split("]")[1].split("'")[0]
        ref = key.split("!")[1]
        try:
            x = v.value[0, 0]
        except Exception:
            x = v
        if hasattr(x, "item"):
            try:
                x = x.item()
            except Exception:
                pass
        if x is not None and not isinstance(x, (int, float, str, bool)):
            x = str(x)
        V.setdefault(sheet, {})[ref] = x
    json.dump(V, open(CACHE, "w", encoding="utf-8"))


def cell(sheet, ref):
    return V[sheet.upper()].get(ref)


out = {"version": LAY["version"]}
SEG3 = ("small", "mid", "large")
ALIAS = {
    # Institute_ROI
    "Dropouts": "dropouts", "FeeAtRisk": "fee_lost", "GrossLoss": "gross_loss", "Recall": "recall", "CatchableShare": "catchable",
    "EffReduction": "eff_red", "Prevented": "prevented", "FeeSavedPerPrevented": "fee_saved_pp", "FeesRetained": "fees_retained",
    "AdmissionValue": "admissions", "StaffValue": "staff", "TotalValue": "value", "PlatformFee": "platform_fee", "GSTCost": "gst",
    "Flagged": "flagged", "FlaggedShare": "flagged_share", "InterventionCost": "mentor", "TotalCost": "cost", "NetBenefit": "net",
    "ROI": "roi", "HardROI": "hard_roi", "FeesOnlyROI": "roi_fees", "BreakEvenStudents": "be_students",
    "BreakEvenReduction": "be_red", "UpliftNeededStudents": "uplift_students", "CostPerStudentYr": "cost_pp", "CostPctFee": "cost_pct",
    # Unit_Econ
    "Y1Revenue": "y1_rev", "AvgMonthlyRev": "rev_m", "Y1COGS": "y1_cogs", "GrossMargin": "gm", "SupportPerInst": "cs",
    "AvgMonthlyContr": "contr", "ContrMargin": "cm", "SalesPerPilot": "sales_pp", "OnboardCost": "onboard", "PilotCOGS": "pilot_cogs",
    "CAC": "cac", "AcqCost": "acq", "ChurnEff": "churn_eff", "SpikeMonthly": "spike_m", "AnnualRetention": "ret",
    "ExpLifetime": "life", "LTV": "ltv", "LTVtoCAC": "ltv_cac", "Payback": "payback", "PaybackSimple": "payback_simple",
    "LTVUndisc": "ltv_undisc", "LTVUndiscToCAC": "ltv_undisc_cac", "ChannelAcq": "channel_acq", "ChannelLTVtoCAC": "channel_ltv_cac",
    # Pricing / COGS
    "EffDisc": "eff_disc", "RealisedPrice": "realised", "RealisedPriceGST": "with_gst", "CompetitorAnchor": "anchor",
    "PriceVsAnchor": "vs_anchor", "cogs_llm": "llm", "cogs_wa": "whatsapp", "cogs_compute": "compute", "cogs_consent": "consent",
    "COGS_PerStudent": "variable", "HostingPerInst": "hosting", "COGS_FixedInst": "fixed", "COGS_AllIn": "all_in",
}


def al(k):
    return ALIAS.get(k, k)

# ---- Institute_ROI, Unit_Econ (columns D, E, F = Small, Mid, Large)
out["roi"] = {al(k): dict(zip(SEG3, [cell("Institute_ROI", f"{c}{r}") for c in "DEF"])) for k, r in LAY["ir_rows"].items()}
out["ue"] = {al(k): dict(zip(SEG3, [cell("Unit_Econ", f"{c}{r}") for c in "DEF"])) for k, r in LAY["ue_rows"].items()}
out["scale"] = {
    "fixed_cost": cell("Unit_Econ", "I14"), "mid_contr": cell("Unit_Econ", "I15"),
    "institutes_needed": cell("Unit_Econ", "I16"), "students_needed": cell("Unit_Econ", "I17"),
    "rep_adds": cell("Unit_Econ", "I18"),
}
out["guide_ue"] = {"revenue": cell("Unit_Econ", "I5"), "contr": cell("Unit_Econ", "I6"), "acq": cell("Unit_Econ", "I7"),
                   "payback": cell("Unit_Econ", "I8"), "ltv": cell("Unit_Econ", "I9"), "ltv_cac": cell("Unit_Econ", "I10")}

# ---- Pricing and COGS (value in column D)
out["pricing"] = {al(k): cell("Pricing", f"D{r}") for k, r in LAY["pr_rows"].items()}
out["cogs"] = {al(k): cell("COGS_Build", f"D{r}") for k, r in LAY["cg_rows"].items()}

# ---- Scenarios
out["scen"] = {al(k): dict(zip(("guide", "bear", "base", "bull", "stress"), [cell("Scenarios", f"{c}{r}") for c in "CDEFG"]))
               for k, r in LAY["sc_rows"].items()}
out["seg"] = {}
for i, name in enumerate(["roi", "ltv_cac", "channel", "payback"]):
    rb = LAY["sc_seg0"] + 1 + i * 6
    out["seg"][name] = {seg: dict(zip(("bear", "base", "bull"), [cell("Scenarios", f"{c}{rb + 1 + j}") for c in "DEF"]))
                        for j, seg in enumerate(SEG3)}
out["proj_scen"] = {}
for i, key in enumerate(["rev3", "ebitda3", "act3", "arr3", "funding", "be3", "capbind"]):
    rr = LAY["sc_pj0"] + 1 + i
    out["proj_scen"][key] = dict(zip(("bear", "base", "bull"), [cell("Scenarios", f"{c}{rr}") for c in "DEF"]))

# ---- 3-year projection (live scenario sheet) and the three fixed-scenario sheets
PR = LAY["proj_rows"]
T = LAY["months"]
cols = [get_column_letter(5 + t) for t in range(T)]


def monthly(sheet, key):
    return [cell(sheet, f"{c}{PR[key]}") for c in cols]


def projection(sheet):
    p = {"annual": {}, "kpi": {}, "monthly": {}}
    for key in ("a_rev", "a_gp", "a_gm", "a_sm", "a_rd", "a_ga", "a_ebitda", "a_margin", "a_new", "a_active", "a_arr", "a_heads"):
        p["annual"][key] = [cell(sheet, f"{c}{PR[key]}") for c in "DEFG"]
    for key in ("k_peak", "k_buffer", "k_funding", "k_cash_end", "k_be3", "k_bettm", "k_pen", "k_cac", "k_capbind"):
        p["kpi"][key] = cell(sheet, f"D{PR[key]}")
    for key in ("label", "revenue", "gp", "sm", "rd", "ga", "opex", "ebitda", "active", "new", "pilots", "reps", "csm", "cash",
                "cash_pre", "cogs_var", "cs_cost", "hosting", "headroom", "new_raw", "heads"):
        p["monthly"][key] = monthly(sheet, key)
    p["derived"] = {k: cell(sheet, f"D{PR[k]}") for k in ("eff_disc", "cogs_ps", "churn_eff", "spike_m", "blend_students",
                                                           "blend_mult", "pilot_cost", "sam_cap", "avg_rev_inst")}
    return p


out["proj"] = projection("Projection")
out["proj_by_scenario"] = {nm: projection(f"Proj_{nm}") for nm in ("Bear", "Base", "Bull")}

# ---- Sensitivity
n = LAY["tornado_n"]
out["tornado"] = []
for i in range(n):
    r = LAY["tornado_first"] + i
    row = [cell("Sensitivity", f"{c}{r}") for c in "ABCDEFGHI"]
    out["tornado"].append(dict(zip(
        ["name", "bear_val", "bull_val", "roi_bear", "roi_bull", "roi_swing", "lc_bear", "lc_bull", "lc_swing"], row)))
g1, g2 = LAY["g1"], LAY["g2"]
out["grid1"] = {
    "prices": [cell("Sensitivity", f"{c}{g1 + 2}") for c in "BCDEFG"],
    "rows": [{"reduction": cell("Sensitivity", f"A{g1 + 3 + i}"),
              "roi": [cell("Sensitivity", f"{c}{g1 + 3 + i}") for c in "BCDEFG"]} for i in range(6)],
}
out["grid2"] = {
    "churn": [cell("Sensitivity", f"{c}{g2 + 1}") for c in "BCDEF"],
    "ltv": [cell("Sensitivity", f"{c}{g2 + 2}") for c in "BCDEF"],
    "rows": [{"acq": cell("Sensitivity", f"A{g2 + 4 + i}"),
              "ratio": [cell("Sensitivity", f"{c}{g2 + 4 + i}") for c in "BCDEF"]} for i in range(5)],
}

# ---- Checks
out["checks"] = []
for r in range(4, LAY["ck_last"] + 1):
    out["checks"].append({"label": cell("Checks", f"A{r}"), "type": cell("Checks", f"B{r}"),
                          "value": cell("Checks", f"C{r}"), "flag": cell("Checks", f"D{r}")})
out["errors"] = cell("Checks", f"D{LAY['ck_last'] + 2}")
out["warnings"] = cell("Checks", f"D{LAY['ck_last'] + 3}")

# ---- Cover headline
out["cover"] = []
for i in range(LAY["cover_n"]):
    r = 10 + i
    out["cover"].append({"label": cell("Cover", f"B{r}"), "ours": cell("Cover", f"C{r}"), "guide": cell("Cover", f"D{r}")})

# ---- Seasonality
out["season"] = {
    "months": [cell("Seasonality", f"B{r}") for r in range(5, 17)],
    "index": [cell("Seasonality", f"C{r}") for r in range(5, 17)],
    "renewal": [cell("Seasonality", f"D{r}") for r in range(5, 17)],
    "sales": [cell("Seasonality", f"E{r}") for r in range(5, 17)],
    "drop_share": [cell("Seasonality", f"C{r}") for r in range(22, 32)],
    "remain": [cell("Seasonality", f"D{r}") for r in range(22, 32)],
    "renewal_months": cell("Seasonality", "C18"),
}
out["engine_cases"] = sum(1 for ref, val in V["ENGINE"].items()
                          if ref.endswith("2") and ref[:-1].isalpha() and ref[:-1] not in ("A", "B", "C") and val not in (None, ""))

with open(os.path.join(HERE, "guide_numbers.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("wrote guide_numbers.json")
