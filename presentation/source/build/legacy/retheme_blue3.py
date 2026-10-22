import re
from pathlib import Path

B = Path(__file__).resolve().parent
H = B.parent / "html"

# ---- charts.py
p = B / "charts.py"
s = p.read_text(encoding="utf-8")
s = s.replace('NAVY, TEAL, TEALD, TINT, GREY, AMBER, RED = "#1E2B25", "#1FA971", "#0E7C4F", "#BFE6D2", "#9AA39D", "#F7B500", "#E04A3A"\nORANGE, BLUE = "#F28C28", "#2F80D1"',
              'NAVY, TEAL, TEALD, TINT, GREY, AMBER, RED = "#17325C", "#2E6DB4", "#1F4A82", "#B9CFE8", "#9AA6B5", "#F2A900", "#C0392B"\nORANGE, BLUE = "#8FB0D8", "#5B8DC9"')
s = s.replace('"axes.edgecolor": "#C9D1CC", "axes.labelcolor": "#5B675F"', '"axes.edgecolor": "#C9D6E8", "axes.labelcolor": "#5B6573"')
s = s.replace('"xtick.color": "#5B675F", "ytick.color": "#5B675F"', '"xtick.color": "#5B6573", "ytick.color": "#5B6573"').replace('"axes.titlecolor": "#1E2B25"', '"axes.titlecolor": "#17325C"')
s = s.replace('cols = [TEAL if x >= 0.9 else (AMBER if x >= 0.7 else ORANGE) for x in v]', 'cols = [TEALD if x >= 0.9 else (BLUE if x >= 0.7 else AMBER) for x in v]')
s = s.replace('color="#B85B07", fontweight="bold")', 'color=TEALD, fontweight="bold")')
s = s.replace('ax.barh(len(rows), 40 - 20, left=20, color=ORANGE, height=0.5)', 'ax.barh(len(rows), 40 - 20, left=20, color=TEALD, height=0.5)')
s = s.replace('color=[TINT, ORANGE, TEALD], width=0.6)', 'color=[TINT, BLUE, TEALD], width=0.6)')
s = s.replace('"#EEF1EE"', '"#EEF2F7"').replace('"#E5EAF1"', '"#E3EAF3"')
s = s.replace('edgecolors=ORANGE, lw=2, zorder=5, label="Published (PLOS ONE 2026)"', 'edgecolors=AMBER, lw=2, zorder=5, label="Published (PLOS ONE 2026)"')
p.write_text(s, encoding="utf-8")

# ---- ui.css variables and bands
p = H / "ui.css"
s = p.read_text(encoding="utf-8")
s = re.sub(r":root \{.*?\n\}", """:root {
  --navy: #17325C; --ink: #1F2937; --muted: #5B6573; --teal: #2E6DB4; --teal-d: #1F4A82; --teal-t: #E3ECF7; --tint: #F4F7FB;
  --line: #C9D6E8; --amber: #F2A900; --amber-t: #FFF3CC; --red: #C0392B; --green: #1B7F4F; --glow: #2E6DB4;
  --orange: #5B8DC9; --orange-t: #EAF1FA; --blue: #2E6DB4; --blue-t: #E3ECF7;
  --b0: #EEF2F7; --b1: #C9DBF0; --b2: #7FA6D6; --b3: #1F4A82;
}""", s, count=1, flags=re.S)
s = s.replace("background: var(--orange); color: #fff; font: 800 22px", "background: var(--teal-d); color: #fff; font: 800 22px")
p.write_text(s, encoding="utf-8")

# ---- screens and app mock-ups: remap leftover hard-coded colours to the blue family
MAP = {"#1FA971": "#2E6DB4", "#0E7C4F": "#1F4A82", "#E4F5EC": "#E3ECF7", "#F28C28": "#5B8DC9", "#FFEBD6": "#EAF1FA", "#B85B07": "#1F4A82", "#C4660E": "#1F4A82",
       "#2F80D1": "#1F4A82", "#1F63A8": "#1F4A82", "#E3EEFB": "#E3ECF7", "#168A58": "#1F4A82", "#6FCB9E": "#7FA6D6", "#CDEBDB": "#C9DBF0", "#FFF4E5": "#EEF3FA", "#F5FBF7": "#F8FAFD",
       "#FFD25A": "#F2A900", "#11805A": "#173A6B", "#FFF6EA": "#EEF3FA", "#FFD9AE": "#C9DBF0", "#1E2B25": "#17325C", "#5BE0A4": "#7FB0E6", "#DDF3E6": "#E3ECF7"}
for f in list(H.glob("screen_*.html")) + [H / n for n in ("web_console.html", "app_scan.html", "app_mentor.html", "app_parent.html")]:
    if not f.exists():
        continue
    t = f.read_text(encoding="utf-8")
    for k, v in MAP.items():
        t = t.replace(k, v).replace(k.lower(), v)
    t = t.replace("linear-gradient(135deg, #2E6DB4, #1F4A82)", "linear-gradient(135deg, #2E6DB4, #1F4A82)")
    f.write_text(t, encoding="utf-8")
print("ok")
