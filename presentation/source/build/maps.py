"""Tile-grid map of India for the go-to-market slides: each state is one tile placed roughly where it sits on the map, shaded by the
number of addressable institutes (independent JEE/NEET institutes with 150 to 2,000 students). Tile maps avoid any boundary-line issues.
Numbers: financial/research/R7_market_size.md (Bihar + UP about 740 in Base; five-state total about 1,180). The state split is OUR derived
allocation (assumption): Bihar and UP by population, Rajasthan / MP / Jharkhand 40 / 40 / 20 of the extension.
Run from presentation/source/build:  python maps.py  -> ../assets/map_tiles.png and map_tiles_mini.png"""
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import font_manager as fm  # noqa: E402
from matplotlib.patches import FancyBboxPatch  # noqa: E402

for f in ("calibri.ttf", "calibrib.ttf"):
    fm.fontManager.addfont(f"C:/Windows/Fonts/{f}")
plt.rcParams["font.family"] = "Calibri"
OUT = Path(__file__).resolve().parent.parent / "assets"

# state: (col, row)
GRID = {"JK": (4, 0), "PB": (3, 1), "HP": (4, 1), "UK": (5, 1), "AR": (9, 1), "RJ": (2, 2), "HR": (3, 2), "DL": (4, 2), "UP": (5, 2), "BR": (6, 2),
        "SK": (7, 2), "AS": (8, 2), "NL": (9, 2), "GJ": (2, 3), "MP": (3, 3), "CG": (4, 3), "JH": (5, 3), "WB": (6, 3), "ML": (8, 3), "MN": (9, 3),
        "MH": (3, 4), "TG": (4, 4), "OD": (5, 4), "TR": (8, 4), "MZ": (9, 4), "GA": (2, 5), "KA": (3, 5), "AP": (4, 5), "KL": (3, 6), "TN": (4, 6)}
INST = {"UP": 490, "BR": 250, "RJ": 176, "MP": 176, "JH": 88}  # addressable institutes, Base, derived
PHASE = {"BR": "1", "UP": "2", "JH": "3", "RJ": "4", "MP": "4"}
NAMES = {"UP": "Uttar Pradesh", "BR": "Bihar", "RJ": "Rajasthan", "MP": "Madhya Pradesh", "JH": "Jharkhand"}


def shade(n):
    if n >= 400: return "#1F4A82", "white"
    if n >= 200: return "#2E6DB4", "white"
    if n >= 120: return "#7FA6D6", "#17325C"
    if n > 0: return "#C9DBF0", "#17325C"
    return "#EEF1F5", "#9AA6B5"


def draw(name, big):
    fig, ax = plt.subplots(figsize=(8.0 if big else 5.6, 5.6 if big else 3.9))
    for st, (c, r) in GRID.items():
        n = INST.get(st, 0)
        fc, tc = shade(n)
        ax.add_patch(FancyBboxPatch((c + 0.04, -r + 0.04), 0.92, 0.92, boxstyle="round,pad=0,rounding_size=0.12", fc=fc, ec="white", lw=1.2))
        ax.text(c + 0.5, -r + (0.62 if n else 0.5), st, ha="center", va="center", fontsize=(13 if n else 9) * (1 if big else 0.85), fontweight="bold" if n else "normal", color=tc)
        if n:
            ax.text(c + 0.5, -r + 0.3, str(n), ha="center", va="center", fontsize=(12 if big else 10), color=tc, fontweight="bold")
        if st in PHASE:
            ax.add_patch(plt.Circle((c + 0.86, -r + 0.86), 0.15, fc="#D4A24C", ec="white", lw=1.2, zorder=5))
            ax.text(c + 0.86, -r + 0.86, PHASE[st], ha="center", va="center", fontsize=9 if big else 8, fontweight="bold", color="#17325C", zorder=6)
    ax.set_xlim(1.6, 10.2); ax.set_ylim(-6.2, 1.3); ax.set_aspect("equal"); ax.axis("off")
    fig.patch.set_alpha(0)
    fig.savefig(OUT / name, dpi=220, transparent=True, bbox_inches="tight", pad_inches=0.02)
    plt.close(fig)
    print("wrote", name)


if __name__ == "__main__":
    assert sum(INST.values()) == 1180
    draw("map_tiles.png", True)
    draw("map_tiles_mini.png", False)
