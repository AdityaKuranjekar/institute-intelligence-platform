"""Recalculates the workbook in Python (no Excel needed), reports formula errors, the Cover headline and the Checks sheet.

    python verify_model.py                      # checks DataMoat_Financial_Model_CURRENT_v1.1.xlsx
    python verify_model.py path/to/file.xlsx    # checks another file
    python verify_model.py --all                # also prints Scenarios, Sensitivity and the 3-year summary
Needs: pip install openpyxl formulas
"""
import os
import shutil
import sys
import tempfile
import warnings

warnings.filterwarnings("ignore")
import formulas  # noqa: E402

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
PATH = os.path.abspath(args[0]) if args else os.path.join(HERE, "DataMoat_Financial_Model_CURRENT_v1.1.xlsx")
SHOW_ALL = "--all" in sys.argv

tmp = os.path.join(tempfile.mkdtemp(), "model.xlsx")
shutil.copy(PATH, tmp)  # the original may be open in Excel
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
    V.setdefault(sheet, {})[ref] = x


def g(sheet, ref):
    return V.get(sheet.upper(), {}).get(ref)


errors = {}
for sheet, cells in V.items():
    for ref, val in cells.items():
        if isinstance(val, str) and val.startswith("#"):
            errors[f"{sheet}!{ref}"] = val
        elif type(val).__name__ == "XlError":
            errors[f"{sheet}!{ref}"] = str(val)
print("file:", PATH)
print("cells evaluated:", sum(len(c) for c in V.values()), "| formula errors:", len(errors))
for k in list(errors)[:25]:
    print("  ", k, errors[k])


def fmt(v):
    if isinstance(v, float):
        return f"{v:,.4f}" if abs(v) < 10 else f"{v:,.0f}"
    return "" if v is None else str(v)


def dump(sheet, r0, r1, cols):
    print(f"\n--- {sheet} ---")
    for r in range(r0, r1 + 1):
        row = [g(sheet, f"{c}{r}") for c in cols]
        if any(v not in (None, "") for v in row):
            print(" | ".join(fmt(v)[:58] for v in row))


print("\nCover headline (Mid institute, live scenario)")
for r in range(10, 45):
    lab = g("Cover", f"B{r}")
    if isinstance(lab, str) and g("Cover", f"C{r}") not in (None, ""):
        print(f"  {lab[:62]:62s} {fmt(g('Cover', f'C{r}')):>16} {fmt(g('Cover', f'D{r}')):>14}")

print("\nChecks")
r = 4
n_err = None
while r < 80:
    a = g("Checks", f"A{r}")
    if a:
        if a.startswith("ERRORS"):
            n_err = g("Checks", f"D{r}")
            print(f"  >>> ERRORS = {fmt(n_err)}")
        elif a.startswith("WARNINGS"):
            print(f"  >>> WARNINGS = {fmt(g('Checks', f'D{r}'))}")
        else:
            flag = g("Checks", f"D{r}")
            mark = "FAIL" if flag and flag > 0 else "ok  "
            if flag or SHOW_ALL or a.startswith("WARNING"):
                print(f"  [{mark}] {a[:78]:78s} value={fmt(g('Checks', f'C{r}'))}")
    r += 1

if SHOW_ALL:
    dump("Scenarios", 4, 60, "ABCDEFG")
    dump("Sensitivity", 4, 60, "ABCDEFGHI")
    # 3-year summary of the live Projection sheet: find rows by label
    P = V["PROJECTION"]
    print("\n--- Projection: annual summary and KPIs (live scenario) ---")
    for rr in range(5, 140):
        lab = P.get(f"B{rr}")
        if isinstance(lab, str) and P.get(f"D{rr}") not in (None, "") and not lab.startswith(("Inputs", "Derived")):
            vals = [P.get(f"{c}{rr}") for c in "DEFG"]
            if rr > 85 and rr < 110:
                print(f"  {lab[:70]:70s} " + " ".join(f"{fmt(v):>14}" for v in vals))
sys.exit(1 if errors or (n_err not in (None, 0, 0.0)) else 0)
