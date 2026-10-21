"""Render slides/html/*.html to slides/assets/*.png with headless Edge (or Chrome).
Usage (from slides/build): python export_html.py [name ...]   names without extension; size from the SIZES table below.
The parent-report screen is generated first from screen_parent_report.template.html using real text from report_samples.json."""
import html
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
HTML = HERE.parent / "html"
OUT = HERE.parent / "assets"
SIZES = {  # name: (width, height, device scale factor)
    "arch_under_the_hood": (1920, 1080, 1),
    "what_makes_us_different": (1920, 1080, 1),
    "screen_heatmap": (1600, 900, 1.5),
    "screen_support_list": (1600, 900, 1.5),
    "screen_student_profile": (1600, 900, 1.5),
    "screen_upload": (1600, 900, 1.5),
    "screen_owner": (1600, 900, 1.5),
    "screen_parent_report": (1500, 900, 1.5),
    "screen_consent": (900, 900, 1.5),
}
BROWSERS = [r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", r"C:\Program Files\Google\Chrome\Application\chrome.exe"]
DANDA = "\u0964"  # Devanagari full stop


def paragraphs(text):
    parts = [p.strip() for p in re.split(r"(?<=[.\u0964])\s+", text) if p.strip()]
    half = max(1, len(parts) // 2)
    groups = [parts[:half], parts[half:]]
    return "".join("<p>" + html.escape(" ".join(g)) + "</p>" for g in groups if g)


def build_parent_report():
    data = json.loads((HERE / "report_samples.json").read_text(encoding="utf-8"))
    t = (HTML / "screen_parent_report.template.html").read_text(encoding="utf-8")
    for k in ("hi", "en"):
        t = t.replace(f"__{k.upper()}_TITLE__", html.escape(data[k]["title"]))
        t = t.replace(f"__{k.upper()}_BODY__", paragraphs(data[k]["body"]))
    (HTML / "screen_parent_report.html").write_text(t, encoding="utf-8")


def main(names):
    build_parent_report()
    exe = next((b for b in BROWSERS if Path(b).exists()), None)
    if not exe:
        raise SystemExit("Edge or Chrome not found")
    OUT.mkdir(exist_ok=True)
    for n in names or SIZES:
        w, h, dsf = SIZES[n]
        src = HTML / f"{n}.html"
        if not src.exists():
            print("skip (missing)", n)
            continue
        out = OUT / f"{n}.png"
        subprocess.run([exe, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--force-device-scale-factor={dsf}",
                        f"--window-size={w},{h}", f"--screenshot={out}", src.as_uri()], check=True, capture_output=True, timeout=120)
        print("wrote", out.name, out.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main(sys.argv[1:])
