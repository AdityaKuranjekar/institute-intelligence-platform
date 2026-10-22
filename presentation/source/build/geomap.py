"""Geographic India map for the go-to-market slides: state outlines from a public GeoJSON (assets/india_states.geojson), target states shaded by
addressable institutes (maps.INST, our derived split of the R7 total), and city bubbles by tier. Bubble size = indicative coaching density
(High / Medium / Low), OUR qualitative estimate for planning, not a measured count. Run: python geomap.py -> ../assets/map_geo.png, map_geo_mini.png"""
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import font_manager as fm  # noqa: E402
from matplotlib.patches import Polygon  # noqa: E402

from maps import INST, PHASE  # noqa: E402

for f in ("calibri.ttf", "calibrib.ttf"):
    fm.fontManager.addfont(f"C:/Windows/Fonts/{f}")
plt.rcParams["font.family"] = "Calibri"
OUT = Path(__file__).resolve().parent.parent / "assets"
GEO = json.load(open(OUT / "india_states.geojson", encoding="utf8"))
STATE = {"Uttar Pradesh": "UP", "Bihar": "BR", "Rajasthan": "RJ", "Madhya Pradesh": "MP", "Jharkhand": "JH"}
SHADE = {"UP": "#1F4A82", "BR": "#2E6DB4", "RJ": "#7FA6D6", "MP": "#7FA6D6", "JH": "#C9DBF0"}
# name, lon, lat, tier, density (3 high, 2 medium, 1 low), label side
CITIES = [("Delhi", 77.2, 28.6, 1, 3, "l"), ("Mumbai", 72.85, 19.07, 1, 3, "l"), ("Bengaluru", 77.6, 12.97, 1, 3, "r"), ("Hyderabad", 78.45, 17.4, 1, 3, "r"),
          ("Kolkata", 88.36, 22.57, 1, 2, "r"), ("Chennai", 80.27, 13.08, 1, 2, "r"),
          ("Kota", 75.83, 25.18, 2, 3, "l"), ("Patna", 85.14, 25.61, 2, 3, "t"), ("Prayagraj", 81.85, 25.43, 2, 2, "b"), ("Lucknow", 80.95, 26.85, 2, 2, "t"),
          ("Jaipur", 75.79, 26.91, 2, 2, "l"), ("Indore", 75.86, 22.72, 2, 2, "l"), ("Ranchi", 85.31, 23.34, 2, 1, "b"), ("Kanpur", 80.35, 26.45, 3, 2, "l"),
          ("Varanasi", 83.0, 25.32, 3, 2, "b"), ("Gaya", 85.0, 24.8, 3, 1, "l"), ("Muzaffarpur", 85.39, 26.12, 3, 1, "r"), ("Bhopal", 77.41, 23.26, 2, 1, "l")]
TIER = {1: ("#8A94A6", "Tier 1: chains dominate, skip"), 2: ("#D4A24C", "Tier 2: coaching hubs, start here"), 3: ("#E8743B", "Tier 3: independents, partners and demos")}
OFF = {"Lucknow": (82.6, 28.9, "left"), "Kanpur": (79.0, 24.5, "right"), "Prayagraj": (81.2, 22.4, "center"), "Varanasi": (83.9, 23.2, "center"),
       "Gaya": (88.2, 24.2, "left"), "Patna": (88.4, 25.8, "left"), "Muzaffarpur": (88.4, 27.3, "left"), "Ranchi": (85.3, 21.6, "center"), "Chennai": (81.6, 12.0, "left")}
SIZE = {3: 150, 2: 80, 1: 38}


def rings(geom):
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for p in polys:
        yield p[0]


def draw(name, big):
    fig, ax = plt.subplots(figsize=(6.4 if big else 4.2, 7.0 if big else 4.6))
    for f in GEO["features"]:
        nm = f["properties"]["ST_NM"]
        fc = SHADE.get(STATE.get(nm), "#E7ECF3")
        for r in rings(f["geometry"]):
            ax.add_patch(Polygon(r[::2] if len(r) > 800 else r, closed=True, fc=fc, ec="white", lw=0.6))
    for st, code in STATE.items():
        pass
    for nm, lon, lat, tier, dens, side in CITIES:
        if not big and tier == 1:
            continue
        col = TIER[tier][0]
        ax.scatter(lon, lat, s=SIZE[dens] * (1 if big else 0.55), c=col, ec="white", lw=1.0, zorder=5, alpha=0.95)
        if big:
            if nm in OFF:
                tx, ty, ha = OFF[nm]
                ax.plot([lon, tx - (0.2 if ha == "left" else -0.2 if ha == "right" else 0)], [lat, ty], color="#17325C", lw=0.5, zorder=4)
            else:
                dx, dy, ha = {"l": (-0.6, 0, "right"), "r": (0.6, 0, "left"), "t": (0, 0.7, "center"), "b": (0, -0.85, "center")}[side]
                tx, ty = lon + dx, lat + dy
            ax.text(tx, ty, nm, fontsize=8.5, ha=ha, va="center", color="#17325C", fontweight="bold", zorder=6)
    ax.set_xlim(68, 98); ax.set_ylim(6, 37.5); ax.set_aspect(1.08); ax.axis("off")
    fig.patch.set_alpha(0)
    fig.savefig(OUT / name, dpi=220, transparent=True, bbox_inches="tight", pad_inches=0.02)
    plt.close(fig)
    print("wrote", name)


if __name__ == "__main__":
    draw("map_geo.png", True)
    draw("map_geo_mini.png", False)
