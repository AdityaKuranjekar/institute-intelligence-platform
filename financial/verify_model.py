"""Recalculates DataMoat_Financial_Model.xlsx in Python (no Excel needed) and reports
formula errors, the Checks sheet and the headline numbers.  Run: python verify_model.py"""
import os
import sys

import formulas

HERE = os.path.dirname(os.path.abspath(__file__))
PATH = os.path.join(HERE, "DataMoat_Financial_Model.xlsx")

xl = formulas.ExcelModel().loads(PATH).finish()
sol = xl.calculate()

vals = {}
for k, v in sol.items():
    key = k.upper()
    if "!" not in key or ":" in key.split("!")[1]:
        continue
    try:
        val = v.value[0, 0]
    except Exception:
        val = v
    vals[key] = val

errors = {k: v for k, v in vals.items() if isinstance(v, str) and v.startswith("#")
          or type(v).__name__ in ("XlError",)}
print("cells evaluated:", len(vals))
print("formula errors:", len(errors))
for k in list(errors)[:30]:
    print("  ", k, errors[k])


def g(sheet, ref):
    fname = os.path.basename(PATH).upper()
    return vals.get(f"'[{fname}]{sheet.upper()}'!{ref}")


def dump(sheet, r0, r1, cols):
    print(f"\n--- {sheet} ---")
    for r in range(r0, r1 + 1):
        row = [g(sheet, f"{c}{r}") for c in cols]
        if any(v not in (None, "") for v in row):
            out = []
            for v in row:
                if isinstance(v, float):
                    out.append(f"{v:,.3f}" if abs(v) < 10 else f"{v:,.0f}")
                else:
                    out.append("" if v is None else str(v)[:46])
            print(" | ".join(out))


if "--all" in sys.argv:
    dump("Scenarios", 4, 40, "ABCDEF")
    dump("Sensitivity", 4, 50, "ABCDEFGHI")

print("\nCover headline (Mid, live scenario)  |  ours  |  guide")
for r in range(10, 24):
    print(f"  {str(g('Cover', f'B{r}')):45s} {g('Cover', f'C{r}')!s:>22} {g('Cover', f'D{r}')!s:>22}")
print("\nChecks:")
r = 4
while g("Checks", f"A{r}") not in (None, "") or g("Checks", f"A{r+1}") not in (None, ""):
    if g("Checks", f"A{r}"):
        print(f"  {str(g('Checks', f'A{r}')):70s} val={g('Checks', f'C{r}')!s:>14}  flag={g('Checks', f'D{r}')}")
    r += 1
    if r > 60:
        break
if errors:
    sys.exit(1)
