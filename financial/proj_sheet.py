# -*- coding: utf-8 -*-
"""Builds one 3-year (36-month) projection sheet: sales capacity -> cohorts -> revenue -> P&L -> cash -> funding ask.

The same layout is written to the visible `Projection` sheet (live scenario) and to hidden `Proj_Bear/Base/Bull` sheets
(fixed scenarios), so Scenarios can show all three side by side without macros or data tables.
Called from build_model.py:  build_projection(ws, code, globals())   code=None -> live scenario, 1/2/3 -> Bear/Base/Bull.
"""
from openpyxl.utils import get_column_letter as L
from openpyxl.styles import Alignment

MONTHS = 36
M0 = 5  # column index of month 1 (column E)


def mc(t):
    return L(M0 + t - 1)


FIRST, LAST = mc(1), mc(MONTHS)

# every Assumptions input the projection needs (label/unit/format come from the CSV)
INPUTS = [
    "Students_S", "Students_M", "Students_L", "OnboardMult_S", "OnboardMult_M", "OnboardMult_L",
    "SegMix_S", "SegMix_M", "SegMix_L", "ListPrice", "MinFee", "NegotiationDisc", "PrepayUptake", "PrepayDisc",
    "BadDebt", "GatewayFee", "ReportsPerStudentMonth", "TokensInPerReport", "TokensOutPerReport", "LLMPriceIn",
    "LLMPriceOut", "WAMsgsPerStudentMonth", "WAPricePerMsg", "ComputePerStudentMonth", "ConsentCostPerStudentYear",
    "ServerCostMonth", "BSPFeeMonth", "InstPerStack", "CompliancePerInstMonth", "CSM_CTC", "InstPerCSM", "RepCTC",
    "RepTravel", "SalesOverheadPct", "PilotsPerRepMonth", "PilotConv", "PilotMonths", "PilotSetupCost", "OnboardBase",
    "MarketingPerPaid", "ChurnInSeason", "RenewalSpike", "MinRenewTenure", "Founders", "FounderStipend",
    "EngineersY1", "EngineersY2", "EngineersY3", "EngineerCTC", "ToolsOpex", "RepsY1", "RepsY2", "RepsY3",
    "RDFloorPct", "GAFloorPct", "SalaryInflation", "DaysToCollect", "HireEquipment", "CashBufferMonths", "AddressableInstitutes", "MaxPenetration",
]


def build_projection(ws, code, g):
    put, A_BY, A_ROW = g["put"], g["A_BY"], g["A_ROW"]
    F_IN, F_CALC, F_LINK, F_BOLD = g["F_IN"], g["F_CALC"], g["F_LINK"], g["F_BOLD"]
    F_NOTE, F_TITLE, F_SUB, F_HDR = g["F_NOTE"], g["F_TITLE"], g["F_SUB"], g["F_HDR"]
    FILL_SEC, FILL_OUT, FILL_HDR, FILL_KEY = g["FILL_SEC"], g["FILL_OUT"], g["FILL_HDR"], g["FILL_KEY"]
    live = code is None
    name = {None: "live scenario", 1: "Bear", 2: "Base", 3: "Bull"}[code]

    # ------------------------------------------------------------ phase 1: allocate rows
    row = {}
    cursor = [5]

    def alloc(key, n=1):
        row[key] = cursor[0]
        cursor[0] += n

    alloc("hdr_in")
    for n in INPUTS:
        alloc(n)
    alloc("hdr_der")
    for k in ("eff_disc", "cogs_ps", "churn_eff", "spike_m", "blend_students", "blend_mult", "pilot_cost", "sam_cap",
              "avg_rev_inst"):
        alloc(k)
    alloc("hdr_cal")
    for k in ("cal_hdr", "rev_S", "rev_M", "rev_L", "rev_blend", "cogs_blend"):
        alloc(k)
    group_end = cursor[0] - 1
    alloc("gap1")
    alloc("hdr_sum")
    for k in ("sum_hdr", "a_rev", "a_gp", "a_gm", "a_sm", "a_rd", "a_ga", "a_ebitda", "a_margin", "a_new", "a_active",
              "a_arr", "a_heads"):
        alloc(k)
    alloc("gap2")
    alloc("hdr_kpi")
    for k in ("k_peak", "k_buffer", "k_funding", "k_cash_end", "k_be3", "k_bettm", "k_pen", "k_cac", "k_capbind"):
        alloc(k)
    alloc("gap3")
    alloc("hdr_m")
    monthly = [
        ("t", "Month number", "no.", "int"), ("cm", "Calendar month (1 = April)", "no.", "int"),
        ("fy", "Financial year", "no.", "int"), ("label", "Month", "", "txt"),
        ("H_A", "A. Sales engine", None, None),
        ("infl", "Cost inflation factor", "x", "num2"), ("sales_idx", "Sales intensity index", "x", "num2"),
        ("reps", "Field sales reps", "people", "int"), ("pilots", "Free pilots started", "pilots", "num1"),
        ("new_raw", "New paying institutes before the market cap", "institutes", "num1"),
        ("headroom", "Market headroom left (SAM × max penetration − institutes won so far)", "institutes", "num1"),
        ("new", "New paying institutes", "institutes", "num1"), ("cum_new", "Cumulative institutes won", "institutes", "num1"),
        ("H_B", "B. Customers and revenue", None, None),
        ("active", "Paying institutes (end of month)", "institutes", "num1"),
        ("rev_inst", "Revenue per paying institute this month", "₹", "inr"), ("revenue", "Revenue (ex-GST)", "₹", "inr"),
        ("H_C", "C. Cost of serving customers", None, None),
        ("cogs_var", "Variable cost of serving (AI, WhatsApp, compute, consent, payment fees, compliance)", "₹", "inr"),
        ("stacks", "Server stacks needed", "stacks", "int"), ("hosting", "Hosting and WhatsApp provider fee", "₹", "inr"),
        ("csm", "Customer-success staff", "people", "int"), ("cs_cost", "Customer-success cost", "₹", "inr"),
        ("gp", "Gross profit (SaaS convention: after support)", "₹", "inr"),
        ("H_D", "D. Operating costs", None, None),
        ("s_reps", "Sales team (rep cost + travel, with overhead loading)", "₹", "inr"),
        ("s_mkt", "Marketing", "₹", "inr"), ("s_pilot", "Free pilots (setup + serving)", "₹", "inr"),
        ("s_onb", "Onboarding of new paying institutes", "₹", "inr"), ("sm", "Sales and marketing, total", "₹", "inr"),
        ("eng", "Engineers", "people", "int"),
        ("rd", "Product and engineering (the larger of the planned engineers and a share of revenue)", "₹", "inr"),
        ("ga", "Founders' stipends and general costs (the larger of the plan and a share of revenue)", "₹", "inr"), ("opex", "Total operating costs", "₹", "inr"),
        ("ebitda", "EBITDA", "₹", "inr"),
        ("H_E", "E. Cash and funding", None, None),
        ("ar", "Receivables outstanding", "₹", "inr"), ("d_ar", "Increase in receivables", "₹", "inr"),
        ("heads", "Headcount (founders + reps + engineers + customer success)", "people", "int"),
        ("hires", "New hires", "people", "int"), ("capex", "Equipment for new hires", "₹", "inr"),
        ("ncf", "Net cash flow before any funding", "₹", "inr"),
        ("cash_pre", "Cumulative cash before funding", "₹", "inr"),
        ("costs", "Total cash costs this month (used for the buffer)", "₹", "inr"),
        ("cash", "Cash balance with the funding ask received in month 1", "₹", "inr"),
        ("ttm", "Trailing-12-month EBITDA", "₹", "inr"),
        ("be3", "Flag: EBITDA ≥ 0 for 3 months in a row", "1/0", "int"),
        ("bettm", "Flag: trailing-12-month EBITDA ≥ 0", "1/0", "int"),
        ("H_F", "F. Cohorts: institutes still paying, by month they signed (rows) and calendar month (columns)", None, None),
    ]
    for key, *_ in monthly:
        alloc(key)
    for c in range(1, MONTHS + 1):
        alloc(f"coh_{c}")

    D = lambda k: f"$D${row[k]}"  # noqa: E731  scalar input / derived value
    X = lambda k, t: f"{mc(t)}{row[k]}"  # noqa: E731  monthly cell
    RNG = lambda k: f"${FIRST}${row[k]}:${LAST}${row[k]}"  # noqa: E731  whole monthly row

    # ------------------------------------------------------------ phase 2: write
    put(ws, "A1", f"3-year projection — {name}: sales capacity → cohorts → P&L → cash → funding ask", font=F_TITLE)
    put(ws, "A2", "Months run April to March. Revenue starts after the free pilot. New institutes are capped by the addressable "
                  "market. Rows 6-80 (inputs and per-institute vectors) are grouped: use the +/- in the left margin.",
        font=F_SUB)
    put(ws, "B3", "Scenario (1 = Bear, 2 = Base, 3 = Bull)", bold=True)
    if live:
        put(ws, "D3", "=Scenario", font=F_LINK, fmt="0")
    else:
        put(ws, "D3", code, font=F_IN, fmt="0")

    def band(key, text):
        for cc in range(1, M0 + MONTHS):
            ws.cell(row=row[key], column=cc).fill = FILL_SEC
        put(ws, f"B{row[key]}", text, font=F_BOLD, fill=FILL_SEC)

    band("hdr_in", "Inputs used (linked from Assumptions; Bear / Base / Bull chosen by the scenario)")
    for n in INPUTS:
        a = A_BY[n]
        r = row[n]
        put(ws, f"B{r}", a["label"])
        put(ws, f"C{r}", a["unit"], font=F_NOTE)
        if live:
            put(ws, f"D{r}", f"={n}", font=F_LINK, fmt=a["fmt"])
        else:
            ar = A_ROW[n]
            put(ws, f"D{r}", f'=IF(Assumptions!$N${ar}="Y",INDEX(Assumptions!$D${ar}:$F${ar},$D$3),Assumptions!$E${ar})',
                font=F_LINK, fmt=a["fmt"])

    band("hdr_der", "Derived values")
    der = [
        ("eff_disc", "Effective discount (negotiation + prepay uptake × prepay discount)", "%", "pct",
         f"={D('NegotiationDisc')}+{D('PrepayUptake')}*{D('PrepayDisc')}"),
        ("cogs_ps", "Variable cost per active student per month", "₹/student/month", "inr2",
         f"={D('ReportsPerStudentMonth')}*({D('TokensInPerReport')}*{D('LLMPriceIn')}+{D('TokensOutPerReport')}*{D('LLMPriceOut')})"
         f"/1000000+{D('WAMsgsPerStudentMonth')}*{D('WAPricePerMsg')}+{D('ComputePerStudentMonth')}"
         f"+{D('ConsentCostPerStudentYear')}/12"),
        ("churn_eff", "In-season churn, monthly payers only", "%/month", "pct",
         f"={D('ChurnInSeason')}*(1-{D('PrepayUptake')})"),
        ("spike_m", "Extra churn per renewal month", "%/month", "pct", f"=1-(1-{D('RenewalSpike')})^(1/NRenew)"),
        ("blend_students", "Average students per new institute (customer mix)", "students", "num1",
         f"={D('SegMix_S')}*{D('Students_S')}+{D('SegMix_M')}*{D('Students_M')}+{D('SegMix_L')}*{D('Students_L')}"),
        ("blend_mult", "Average onboarding-cost multiplier (customer mix)", "x", "num2",
         f"={D('SegMix_S')}*{D('OnboardMult_S')}+{D('SegMix_M')}*{D('OnboardMult_M')}+{D('SegMix_L')}*{D('OnboardMult_L')}"),
        ("pilot_cost", "Cost of one free pilot (setup + serving the free months)", "₹", "inr",
         f"={D('PilotSetupCost')}+{D('PilotMonths')}*({D('blend_students')}*{D('cogs_ps')}+{D('CompliancePerInstMonth')})"),
        ("sam_cap", "Market cap: addressable institutes × max penetration", "institutes", "num1",
         f"={D('AddressableInstitutes')}*{D('MaxPenetration')}"),
        ("avg_rev_inst", "Average monthly revenue per institute over a year", "₹", "inr",
         f"=AVERAGE({FIRST}{row['rev_blend']}:{mc(12)}{row['rev_blend']})"),
    ]
    for key, lab, unit, fm, f in der:
        put(ws, f"B{row[key]}", lab)
        put(ws, f"C{row[key]}", unit, font=F_NOTE)
        put(ws, f"D{row[key]}", f, fmt=fm)

    band("hdr_cal", "Per-institute revenue and cost by calendar month (April = 1), same formulas as Unit_Econ")
    put(ws, f"B{row['cal_hdr']}", "Calendar month number", font=F_BOLD)
    for m in range(1, 13):
        put(ws, f"{mc(m)}{row['cal_hdr']}", m, bold=True, fmt="0")
    seg = {"S": ("Small", "Students_S"), "M": ("Mid", "Students_M"), "L": ("Large", "Students_L")}
    for sg, (nm, sv) in seg.items():
        r = row[f"rev_{sg}"]
        put(ws, f"B{r}", f"Revenue per {nm} institute (ex-GST, after discounts and bad debt)")
        put(ws, f"C{r}", "₹", font=F_NOTE)
        for m in range(1, 13):
            put(ws, f"{mc(m)}{r}",
                f"=MAX({D('MinFee')},{D(sv)}*INDEX(Season_Idx,{mc(m)}${row['cal_hdr']})*{D('ListPrice')})"
                f"*(1-{D('eff_disc')})*(1-{D('BadDebt')})", fmt="inr")
    r = row["rev_blend"]
    put(ws, f"B{r}", "Revenue per institute, weighted by customer mix", bold=True)
    put(ws, f"C{r}", "₹", font=F_NOTE)
    r2 = row["cogs_blend"]
    put(ws, f"B{r2}", "Variable cost per institute, weighted by customer mix", bold=True)
    put(ws, f"C{r2}", "₹", font=F_NOTE)
    for m in range(1, 13):
        put(ws, f"{mc(m)}{r}", f"={D('SegMix_S')}*{mc(m)}{row['rev_S']}+{D('SegMix_M')}*{mc(m)}{row['rev_M']}"
                               f"+{D('SegMix_L')}*{mc(m)}{row['rev_L']}", fmt="inr")
        put(ws, f"{mc(m)}{r2}", f"={D('cogs_ps')}*{D('blend_students')}*INDEX(Season_Idx,{mc(m)}${row['cal_hdr']})"
                                f"+{D('GatewayFee')}*{mc(m)}{r}+{D('CompliancePerInstMonth')}", fmt="inr")

    # ---------------- summary
    band("hdr_sum", "Annual summary")
    hs = row["sum_hdr"]
    for j, yy in enumerate((1, 2, 3)):
        put(ws, f"{L(4 + j)}{hs}", yy, font=F_HDR, fill=FILL_HDR, fmt='"Year "0')
    put(ws, f"G{hs}", "3-year total", font=F_HDR, fill=FILL_HDR)
    put(ws, f"B{hs}", "Financial year (April to March)", font=F_HDR, fill=FILL_HDR)

    def annual(key, label, src, fm, total=True, pct_of=None):
        r = row[key]
        put(ws, f"B{r}", label)
        for j in range(3):
            col = L(4 + j)
            if pct_of:
                num_k, den_k = pct_of
                put(ws, f"{col}{r}", f"=IF({col}{row[den_k]}<>0,{col}{row[num_k]}/{col}{row[den_k]},0)", fmt=fm)
            else:
                put(ws, f"{col}{r}", f"=SUMIF({RNG('fy')},{col}${hs},{RNG(src)})", fmt=fm)
        if total and not pct_of:
            put(ws, f"G{r}", f"=SUM(D{r}:F{r})", fmt=fm)
        elif pct_of:
            num_k, den_k = pct_of
            put(ws, f"G{r}", f"=IF(G{row[den_k]}<>0,G{row[num_k]}/G{row[den_k]},0)", fmt=fm)

    annual("a_rev", "Revenue", "revenue", "inr")
    annual("a_gp", "Gross profit (after support)", "gp", "inr")
    annual("a_gm", "Gross margin", None, "pct", pct_of=("a_gp", "a_rev"))
    annual("a_sm", "Sales and marketing", "sm", "inr")
    annual("a_rd", "Product and engineering", "rd", "inr")
    annual("a_ga", "Founders' stipends and general costs", "ga", "inr")
    annual("a_ebitda", "EBITDA", "ebitda", "inr")
    annual("a_margin", "EBITDA margin", None, "pct", pct_of=("a_ebitda", "a_rev"))
    annual("a_new", "New paying institutes", "new", "num1")
    for key, label, src, fm in (("a_active", "Paying institutes at year end", "active", "num1"),
                                ("a_heads", "Headcount at year end", "heads", "int")):
        r = row[key]
        put(ws, f"B{r}", label)
        for j in range(3):
            col = L(4 + j)
            put(ws, f"{col}{r}", f"=INDEX({RNG(src)},1,12*{col}${hs})", fmt=fm)
    r = row["a_arr"]
    put(ws, f"B{r}", "Run-rate annual revenue at year end (institutes × average yearly revenue per institute)")
    for j in range(3):
        col = L(4 + j)
        put(ws, f"{col}{r}", f"={col}{row['a_active']}*{D('avg_rev_inst')}*12", fmt="inr", fill=FILL_OUT)
    for key in ("a_rev", "a_ebitda"):
        for j in range(3):
            ws[f"{L(4 + j)}{row[key]}"].fill = FILL_OUT

    band("hdr_kpi", "Funding, break-even and market checks")
    cp = RNG("cash_pre")
    kp = [
        ("k_peak", "Peak cash deficit before any funding", "₹", "inr", f"=-MIN(0,MIN({cp}))"),
        ("k_buffer", "Cash buffer: months of costs at the point of the deepest deficit",
         "₹", "inr", f"={D('CashBufferMonths')}*INDEX({RNG('costs')},1,MATCH(MIN({cp}),{cp},0))"),
        ("k_funding", "FUNDING THE MODEL SAYS WE NEED (peak deficit + buffer, rounded up to ₹5 lakh)", "₹", "inr",
         f"=CEILING({D('k_peak')}+{D('k_buffer')},500000)"),
        ("k_cash_end", "Cash left at the end of month 36 if that funding arrives in month 1", "₹", "inr",
         f"={D('k_funding')}+{X('cash_pre', MONTHS)}"),
        ("k_be3", "Break-even month: first month of 3 in a row with EBITDA ≥ 0", "month #", "int",
         f'=IFERROR(MATCH(1,{RNG("be3")},0),"after month 36")'),
        ("k_bettm", "Break-even month on a trailing-12-month basis (seasonality-proof)", "month #", "int",
         f'=IFERROR(MATCH(1,{RNG("bettm")},0),"after month 36")'),
        ("k_pen", "Share of the addressable market paying us at month 36", "%", "pct",
         f"=IF({D('AddressableInstitutes')}>0,{X('active', MONTHS)}/{D('AddressableInstitutes')},0)"),
        ("k_cac", "Blended CAC realised (sales and marketing ÷ new paying institutes, 36 months)", "₹", "inr",
         f"=IF(SUM({RNG('new')})>0,SUM({RNG('sm')})/SUM({RNG('new')}),0)"),
        ("k_capbind", "Months in which the market cap limited sales", "months", "int",
         f"=SUMPRODUCT(({RNG('new')}<{RNG('new_raw')}-0.000001)*1)"),
    ]
    for key, lab, unit, fm, f in kp:
        put(ws, f"B{row[key]}", lab, bold=(key == "k_funding"))
        put(ws, f"C{row[key]}", unit, font=F_NOTE)
        put(ws, f"D{row[key]}", f, fmt=fm, fill=FILL_KEY if key == "k_funding" else FILL_OUT)

    # ---------------- monthly engine
    band("hdr_m", "Monthly model (36 months)")
    f_by_key = {
        "t": lambda t: 1 if t == 1 else f"={mc(t - 1)}{row['t']}+1",
        "cm": lambda t: f"=MOD({X('t', t)}-1,12)+1",
        "fy": lambda t: f"=INT(({X('t', t)}-1)/12)+1",
        "label": lambda t: f'=INDEX(Seasonality!$B$5:$B$16,{X("cm", t)})&" Y"&{X("fy", t)}',
        "infl": lambda t: f"=(1+{D('SalaryInflation')})^({X('fy', t)}-1)",
        "sales_idx": lambda t: f"=INDEX(Sales_Idx,{X('cm', t)})",
        "reps": lambda t: f"=CHOOSE({X('fy', t)},{D('RepsY1')},{D('RepsY2')},{D('RepsY3')})",
        "pilots": lambda t: f"={X('reps', t)}*{D('PilotsPerRepMonth')}*{X('sales_idx', t)}",
        "new_raw": lambda t: f"=IF({X('t', t)}>{D('PilotMonths')},INDEX({RNG('pilots')},1,{X('t', t)}-{D('PilotMonths')}),0)"
                             f"*{D('PilotConv')}",
        "headroom": lambda t: (f"=MAX(0,{D('sam_cap')})" if t == 1 else f"=MAX(0,{D('sam_cap')}-{mc(t - 1)}{row['cum_new']})"),
        "new": lambda t: f"=MIN({X('new_raw', t)},{X('headroom', t)})",
        "cum_new": lambda t: f"={X('new', t)}" if t == 1 else f"={mc(t - 1)}{row['cum_new']}+{X('new', t)}",
        "active": lambda t: f"=SUM({mc(t)}{row['coh_1']}:{mc(t)}{row['coh_36']})",
        "rev_inst": lambda t: f"=INDEX(${FIRST}${row['rev_blend']}:${mc(12)}${row['rev_blend']},1,{X('cm', t)})",
        "revenue": lambda t: f"={X('active', t)}*{X('rev_inst', t)}",
        "cogs_var": lambda t: f"={X('active', t)}*INDEX(${FIRST}${row['cogs_blend']}:${mc(12)}${row['cogs_blend']},1,{X('cm', t)})",
        "stacks": lambda t: f"=IF({X('active', t)}>0,CEILING({X('active', t)}/{D('InstPerStack')},1),0)",
        "hosting": lambda t: f"={X('stacks', t)}*({D('ServerCostMonth')}+{D('BSPFeeMonth')})",
        "csm": lambda t: f"=IF({X('active', t)}>0,CEILING({X('active', t)}/{D('InstPerCSM')},1),0)",
        "cs_cost": lambda t: f"={X('csm', t)}*{D('CSM_CTC')}*{X('infl', t)}",
        "gp": lambda t: f"={X('revenue', t)}-{X('cogs_var', t)}-{X('hosting', t)}-{X('cs_cost', t)}",
        "s_reps": lambda t: f"={X('reps', t)}*({D('RepCTC')}+{D('RepTravel')})*{X('infl', t)}*(1+{D('SalesOverheadPct')})",
        "s_mkt": lambda t: f"={X('new', t)}*{D('MarketingPerPaid')}",
        "s_pilot": lambda t: f"={X('pilots', t)}*{D('pilot_cost')}",
        "s_onb": lambda t: f"={X('new', t)}*{D('OnboardBase')}*{D('blend_mult')}",
        "sm": lambda t: f"={X('s_reps', t)}+{X('s_mkt', t)}+{X('s_pilot', t)}+{X('s_onb', t)}",
        "eng": lambda t: f"=CHOOSE({X('fy', t)},{D('EngineersY1')},{D('EngineersY2')},{D('EngineersY3')})",
        "rd": lambda t: f"=MAX({X('eng', t)}*{D('EngineerCTC')}*{X('infl', t)},{D('RDFloorPct')}*{X('revenue', t)})",
        "ga": lambda t: f"=MAX(({D('Founders')}*{D('FounderStipend')}+{D('ToolsOpex')})*{X('infl', t)},{D('GAFloorPct')}*{X('revenue', t)})",
        "opex": lambda t: f"={X('sm', t)}+{X('rd', t)}+{X('ga', t)}",
        "ebitda": lambda t: f"={X('gp', t)}-{X('opex', t)}",
        "ar": lambda t: f"={X('revenue', t)}*{D('DaysToCollect')}/30",
        "d_ar": lambda t: f"={X('ar', t)}" if t == 1 else f"={X('ar', t)}-{mc(t - 1)}{row['ar']}",
        "heads": lambda t: f"={D('Founders')}+{X('reps', t)}+{X('eng', t)}+{X('csm', t)}",
        "hires": lambda t: f"={X('heads', t)}" if t == 1 else f"=MAX(0,{X('heads', t)}-{mc(t - 1)}{row['heads']})",
        "capex": lambda t: f"={X('hires', t)}*{D('HireEquipment')}",
        "ncf": lambda t: f"={X('ebitda', t)}-{X('d_ar', t)}-{X('capex', t)}",
        "cash_pre": lambda t: f"={X('ncf', t)}" if t == 1 else f"={mc(t - 1)}{row['cash_pre']}+{X('ncf', t)}",
        "costs": lambda t: f"={X('cogs_var', t)}+{X('hosting', t)}+{X('cs_cost', t)}+{X('opex', t)}",
        "cash": lambda t: f"={D('k_funding')}+{X('cash_pre', t)}",
        "ttm": lambda t: (f'=SUM({mc(t - 11)}{row["ebitda"]}:{X("ebitda", t)})' if t >= 12 else '=""'),
        "be3": lambda t: (f"=IF(AND({X('ebitda', t)}>=0,{X('ebitda', t + 1)}>=0,{X('ebitda', t + 2)}>=0),1,0)"
                          if t <= MONTHS - 2 else "=0"),
        "bettm": lambda t: (f"=IF({X('ttm', t)}>=0,1,0)" if t >= 12 else "=0"),
    }
    for key, lab, unit, fm in monthly:
        r = row[key]
        if key.startswith("H_"):
            put(ws, f"B{r}", lab, font=F_BOLD, fill=FILL_SEC)
            for cc in range(1, M0 + MONTHS):
                ws.cell(row=r, column=cc).fill = FILL_SEC
            continue
        put(ws, f"B{r}", lab, bold=key in ("revenue", "gp", "ebitda", "cash", "active"))
        put(ws, f"C{r}", unit, font=F_NOTE)
        for t in range(1, MONTHS + 1):
            v = f_by_key[key](t)
            cell = put(ws, f"{mc(t)}{r}", v, fmt=fm if fm != "txt" else None,
                       bold=key in ("label", "t"), fill=FILL_OUT if key in ("revenue", "ebitda", "cash") else None)
            if key == "label":
                cell.alignment = Alignment(horizontal="center")

    # ---------------- cohort matrix
    for c in range(1, MONTHS + 1):
        r = row[f"coh_{c}"]
        put(ws, f"B{r}", f"Cohort signed in month {c}")
        put(ws, f"C{r}", "institutes", font=F_NOTE)
        for t in range(c, MONTHS + 1):
            if t == c:
                f = f"={mc(t)}{row['new']}"
            else:
                f = (f"={mc(t - 1)}{r}*(1-{D('churn_eff')})*(1-IF(AND({t - c}>={D('MinRenewTenure')},"
                     f"INDEX(Season_Flag,{mc(t - 1)}${row['cm']})=1),{D('spike_m')},0))")
            put(ws, f"{mc(t)}{r}", f, fmt="num1")

    ws.column_dimensions["A"].width = 3
    ws.column_dimensions["B"].width = 62
    ws.column_dimensions["C"].width = 14
    ws.column_dimensions["D"].width = 17
    for t in range(1, MONTHS + 1):
        ws.column_dimensions[mc(t)].width = 13
    ws.freeze_panes = "E5"
    ws.row_dimensions.group(row["hdr_in"], group_end, hidden=True, outline_level=1)

    out = {
        "rev3": f"$F${row['a_rev']}", "ebitda3": f"$F${row['a_ebitda']}", "act3": f"$F${row['a_active']}",
        "arr3": f"$F${row['a_arr']}", "funding": f"$D${row['k_funding']}", "be3": f"$D${row['k_be3']}",
        "bettm": f"$D${row['k_bettm']}", "capbind": f"$D${row['k_capbind']}", "pen": f"$D${row['k_pen']}",
        "cac": f"$D${row['k_cac']}", "peak": f"$D${row['k_peak']}", "gm3": f"$F${row['a_gm']}",
    }
    return {"row": row, "out": out}
