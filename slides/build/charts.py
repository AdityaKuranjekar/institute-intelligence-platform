"""Evidence charts for the deck, drawn from real result files (public validation summary, financial workbook outputs).
Run from slides/build:  python charts.py   -> slides/assets/chart_*.png (Calibri, deck palette)."""
import csv
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import font_manager as fm  # noqa: E402

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
OUT = HERE.parent / "assets"
OUT.mkdir(exist_ok=True)
for f in ("calibri.ttf", "calibrib.ttf", "calibrii.ttf"):
    fm.fontManager.addfont(f"C:/Windows/Fonts/{f}")
plt.rcParams.update({"font.family": "Calibri", "font.size": 11, "axes.edgecolor": "#C9D6E8", "axes.labelcolor": "#5B6573",
                     "xtick.color": "#5B6573", "ytick.color": "#5B6573", "axes.spines.top": False, "axes.spines.right": False,
                     "axes.titleweight": "bold", "axes.titlecolor": "#17325C", "figure.facecolor": "white"})
NAVY, TEAL, TEALD, TINT, GREY, AMBER, RED = "#17325C", "#2E6DB4", "#1F4A82", "#B9CFE8", "#9AA6B5", "#F2A900", "#C0392B"
ORANGE, BLUE = "#8FB0D8", "#5B8DC9"
DPI = 220
S = json.loads((REPO / "technical/ml/public_validation/artifacts/v1.0.0/public_validation_summary.json").read_text(encoding="utf-8"))


def save(fig, name):
    fig.savefig(OUT / f"chart_{name}.png", dpi=DPI, bbox_inches="tight", pad_inches=0.08)
    plt.close(fig)
    print("wrote chart_%s.png" % name)


def oulad_by_day():
    days = ["14", "28", "42", "60"]
    series = [("lgbm_acad_behav_student_cv", "LightGBM, academic + clicks", TEALD, "-", "o"),
              ("lgbm_academic_only_student_cv", "LightGBM, academic only", TEAL, "-", "s"),
              ("logreg_acad_behav_student_cv", "Logistic regression, academic + clicks", BLUE, "--", "o"),
              ("rule_no_assessment", "Rule: no assessment submitted", GREY, ":", "x"),
              ("rule_zero_vle_7d", "Rule: zero clicks in 7 days", "#C5CEDA", ":", "x")]
    fig, ax = plt.subplots(figsize=(5.6, 3.9))
    for key, lab, c, ls, mk in series:
        ax.plot([int(d) for d in days], [S["oulad"][d]["models"][key]["roc_auc"] for d in days], color=c, ls=ls, marker=mk, lw=2.2, ms=5, label=lab)
    pub = {14: 0.727, 28: 0.794, 42: 0.804}
    ax.scatter(list(pub), list(pub.values()), s=70, facecolors="none", edgecolors=AMBER, lw=2, zorder=5, label="Published (PLOS ONE 2026)")
    ax.scatter([14, 60], [0.735, 0.815], s=70, facecolors="none", edgecolors=RED, lw=2, marker="D", zorder=5, label="Published (IJET 2026)")
    ax.set_xticks([14, 28, 42, 60]); ax.set_xlabel("Observation window (days from course start)"); ax.set_ylabel("ROC-AUC")
    ax.set_ylim(0.48, 0.84); ax.grid(axis="y", color="#E3EAF3")
    ax.legend(fontsize=8.2, frameon=False, loc="upper center", bbox_to_anchor=(0.5, -0.2), ncol=2)
    ax.set_title("Withdrawal prediction on OULAD (real data, student-grouped 5-fold)", fontsize=11, loc="left")
    save(fig, "oulad_by_day")


def assist_bars():
    m = S["assistments2009"]["models"]; a = S["assistments2009"]["published_pykt_anchors"]
    rows = [("AKT (published)", a["AKT"]["auc"], GREY), ("Ours: online IRT", m["irt_online_eap"]["mean_auc"], TEALD),
            ("1-parameter Rasch (ours)", m["rasch_1pl_global"]["mean_auc"], TEAL), ("DKT (published)", a["DKT"]["auc"], GREY),
            ("Logistic baseline (ours)", m["logistic_baseline"]["mean_auc"], TINT), ("SAKT (published)", a["SAKT"]["auc"], GREY),
            ("BKT (ours)", m["bkt_em"]["mean_auc"], TINT)]
    rows.sort(key=lambda r: r[1])
    fig, ax = plt.subplots(figsize=(5.2, 3.2))
    ax.barh([r[0] for r in rows], [r[1] for r in rows], color=[r[2] for r in rows], height=0.62)
    for i, r in enumerate(rows):
        ax.text(r[1] + 0.001, i, f"{r[1]:.3f}", va="center", fontsize=10, color=NAVY, fontweight="bold")
    ax.set_xlim(0.68, 0.80); ax.set_xlabel("Next-answer AUC, ASSISTments 2009 (pyKT protocol, 770 held-out students)")
    ax.grid(axis="x", color="#E3EAF3"); ax.set_axisbelow(True)
    ax.set_title("Knowledge tracing: ours vs published", fontsize=11, loc="left")
    save(fig, "assist_bars")


def calibration():
    c = S["oulad"]["28"]["calibration_curve"]
    x, y, n = c["mean_predicted_prob"], c["empirical_fraction_positive"], c["bin_counts"]
    fig, ax = plt.subplots(figsize=(3.4, 3.2))
    ax.plot([0, 0.7], [0, 0.7], color=GREY, ls="--", lw=1.5, label="Perfect")
    ax.scatter(x, y, s=[max(14, v / 40) for v in n], color=TEALD, alpha=.9, zorder=4, label="Model (dot size = students)")
    ax.plot(x, y, color=TEALD, lw=1.4)
    ax.set_xlim(0, 0.7); ax.set_ylim(0, 0.7); ax.set_xlabel("Predicted probability"); ax.set_ylabel("Observed share withdrawing")
    ax.text(0.03, 0.62, "Calibration error 0.009", fontsize=10, fontweight="bold", color=NAVY)
    ax.legend(fontsize=8, frameon=False, loc="lower right"); ax.grid(color="#E3EAF3")
    ax.set_title("Calibrated on OULAD, day 28", fontsize=11, loc="left")
    save(fig, "calibration")


def privacy_cost():
    d = ["14", "28", "42", "60"]
    ad = [S["oulad"][k]["models"]["lgbm_acad_behav_student_cv"]["roc_auc"] for k in d]
    a = [S["oulad"][k]["models"]["lgbm_academic_only_student_cv"]["roc_auc"] for k in d]
    fig, ax = plt.subplots(figsize=(4.6, 3.5))
    w = 0.36
    xs = range(len(d))
    ax.bar([i - w / 2 for i in xs], a, w, color=TEAL, label="Academic only (allowed for minors)")
    ax.bar([i + w / 2 for i in xs], ad, w, color=ORANGE, label="Academic + click behaviour")
    for i in xs:
        ax.text(i - w / 2, a[i] + 0.004, f"{a[i]:.3f}", ha="center", fontsize=8.5, color=NAVY)
        ax.text(i + w / 2, ad[i] + 0.004, f"{ad[i]:.3f}", ha="center", fontsize=8.5, color=NAVY)
        ax.text(i, max(a[i], ad[i]) + 0.016, f"-{ad[i]-a[i]:.3f}", ha="center", fontsize=9.5, color=RED, fontweight="bold")
    ax.set_xticks(list(xs)); ax.set_xticklabels([f"Day {x}" for x in d]); ax.set_ylim(0.6, 0.76); ax.set_ylabel("ROC-AUC")
    ax.legend(fontsize=8.5, frameon=False, loc="upper center", bbox_to_anchor=(0.5, -0.12), ncol=1); ax.grid(axis="y", color="#E3EAF3"); ax.set_axisbelow(True)
    ax.set_title("The cost of privacy on real data", fontsize=11, loc="left")
    save(fig, "privacy_cost")


def value_vs_cost():
    labels = ["Guide", "Bear", "Base", "Bull"]
    value = [4.32, 0.12, 3.48, 21.53]; cost = [1.92, 0.79, 1.20, 1.53]
    fig, ax = plt.subplots(figsize=(4.6, 3.1))
    w = 0.36; xs = range(4)
    ax.bar([i - w / 2 for i in xs], value, w, color=[GREY, TINT, TEALD, TEAL], label="Value to institute")
    ax.bar([i + w / 2 for i in xs], cost, w, color=ORANGE, label="Cost to institute")
    for i in xs:
        ax.text(i - w / 2, value[i] + 0.4, f"{value[i]:.2f}", ha="center", fontsize=9, color=NAVY, fontweight="bold")
        ax.text(i + w / 2, cost[i] + 0.4, f"{cost[i]:.2f}", ha="center", fontsize=9, color=NAVY)
    ax.set_xticks(list(xs)); ax.set_xticklabels(labels); ax.set_ylabel("₹ lakh per year")
    ax.legend(fontsize=8.5, frameon=False, loc="upper left"); ax.grid(axis="y", color="#E3EAF3"); ax.set_axisbelow(True)
    ax.set_title("Mid institute: value vs cost per year", fontsize=11, loc="left")
    save(fig, "value_vs_cost")


def roster_curve():
    rows = [r for r in csv.DictReader(open(REPO / "financial/seasonality.csv", encoding="utf-8-sig")) if r["kind"] == "student_idx"]
    lab = [r["label"] for r in rows]; v = [float(r["value"]) for r in rows]
    fig, ax = plt.subplots(figsize=(4.4, 2.2))
    cols = [TEALD if x >= 0.9 else (BLUE if x >= 0.7 else AMBER) for x in v]
    ax.bar(lab, v, color=cols, width=0.7)
    for i, x in enumerate(v):
        ax.text(i, x + 0.02, f"{int(round(x*100))}", ha="center", fontsize=8, color=NAVY)
    ax.set_ylim(0, 1.18); ax.set_yticks([]); ax.spines["left"].set_visible(False)
    ax.set_title("Active roster through the session (assumed index, %)", fontsize=10, loc="left")
    save(fig, "roster")


def price_benchmark():
    rows = [("Classplus plans", 4.17, 6.67), ("Vidhya Aahvan", 5, 12), ("Graphy plans", 5.21, 20.83), ("Fedena plans", 10.42, 20.83),
            ("Edmingle plans", 18.75, 75.0), ("Teachmint (estimate)", 20, 40)]
    fig, ax = plt.subplots(figsize=(5.4, 3.0))
    for i, (n, lo, hi) in enumerate(rows):
        ax.barh(i, hi - lo, left=lo, color=GREY, height=0.5)
        ax.text(hi + 0.8, i, f"₹{lo:g} to ₹{hi:g}", va="center", fontsize=9, color=NAVY)
    ax.barh(len(rows), 40 - 20, left=20, color=TEALD, height=0.5)
    ax.plot([30, 30], [len(rows) - 0.3, len(rows) + 0.3], color="white", lw=3)
    ax.text(41, len(rows), "Pragati list price: ₹20 / ₹30 / ₹40", va="center", fontsize=9.5, color=TEALD, fontweight="bold")
    ax.set_yticks(range(len(rows) + 1)); ax.set_yticklabels([r[0] for r in rows] + ["Pragati"])
    ax.set_xlim(0, 92); ax.set_xlabel("₹ per student per month at 400 students, excluding GST")
    ax.grid(axis="x", color="#E3EAF3"); ax.set_axisbelow(True)
    ax.set_title("What institutes already pay for generic apps (listed prices)", fontsize=11, loc="left")
    save(fig, "price_benchmark")


def ltv_segments():
    seg = ["Small", "Mid", "Large"]; ltv = [1.549, 3.671, 9.098]; pay = [18, 6, 3]
    fig, ax = plt.subplots(figsize=(3.4, 2.5))
    ax.bar(range(3), ltv, color=[TINT, BLUE, TEALD], width=0.6)
    for i, x in enumerate(ltv):
        ax.text(i, x + 0.2, f"{x:.1f}x", ha="center", fontsize=11, fontweight="bold", color=NAVY)
    ax.set_xticks(range(3)); ax.set_xticklabels([seg[n] + chr(10) + "payback " + str(pay[n]) + " mo" for n in range(3)], fontsize=9)
    ax.axhline(3, color=AMBER, ls="--", lw=1.4); ax.text(-0.42, 3.25, "3x rule of thumb", fontsize=8.5, color="#8a5a00", ha="left")
    ax.set_ylim(0, 10.5); ax.set_yticks([]); ax.spines["left"].set_visible(False)
    ax.set_title("LTV ÷ acquisition cost by segment", fontsize=10.5, loc="left")
    save(fig, "ltv_segments")


def ring(name, pct, color, big, small=""):
    fig, ax = plt.subplots(figsize=(1.6, 1.6))
    ax.pie([pct, 100 - pct], colors=[color, "#EEF2F7"], startangle=90, counterclock=False, wedgeprops={"width": 0.26, "edgecolor": "white"})
    ax.text(0, 0.06 if small else 0, big, ha="center", va="center", fontsize=17, fontweight="bold", color=NAVY)
    if small:
        ax.text(0, -0.28, small, ha="center", va="center", fontsize=7.5, color="#5B675F")
    fig.patch.set_alpha(0)
    fig.savefig(OUT / f"ring_{name}.png", dpi=DPI, transparent=True, bbox_inches="tight", pad_inches=0.02)
    plt.close(fig)
    print("wrote ring_%s.png" % name)


def rings():
    ring("dropout", 12, ORANGE, "12 %", "mid-session")
    ring("recall", 55, TEAL, "55 %", "recall <18")
    ring("precision", 35, BLUE, "35 %", "precision")
    ring("p10", 46, TEALD, "0.46", "P@10 %")


if __name__ == "__main__":
    for fn in (oulad_by_day, assist_bars, calibration, privacy_cost, value_vs_cost, roster_curve, price_benchmark, ltv_segments, rings):
        fn()
