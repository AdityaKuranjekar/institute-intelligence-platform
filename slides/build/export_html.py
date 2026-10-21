"""Render slides/html/*.html to slides/assets/*.png with headless Edge (or Chrome).
Usage (from slides/build): python export_html.py [name ...]   names without extension; size from the SIZES table below.
The parent-report screen is generated first from screen_parent_report.template.html using real text from report_samples.json."""
import html
import json
import re
import subprocess
import sys
import time
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
    "web_console": (1600, 900, 1.5),
    "app_scan": (410, 820, 2),
    "app_mentor": (410, 820, 2),
    "app_parent": (410, 820, 2),
    "app_student": (410, 820, 2),
}
TRANSPARENT = {"app_scan", "app_mentor", "app_parent", "app_student"}
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
        t = t.replace(f"__{k.upper()}_BODY__", paragraphs(data[k]["body"].replace("AlphaQ Demo Institute", "Sunrise Demo Institute").replace("AlphaQ", "Pragati")))
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
        extra = ["--default-background-color=00000000"] if n in TRANSPARENT else []
        cmd = [exe, "--headless=new", "--disable-gpu", "--hide-scrollbars", *extra, f"--force-device-scale-factor={dsf}",
               f"--window-size={w},{h}", f"--screenshot={out}", src.as_uri()]
        out.unlink(missing_ok=True)
        for _ in range(3):  # headless Edge occasionally exits without writing the file
            subprocess.run(cmd, check=True, capture_output=True, timeout=120)
            for _w in range(20):  # the file can land a moment after the process exits
                if out.exists():
                    break
                time.sleep(0.25)
            if out.exists():
                break
        if n in TRANSPARENT:
            from PIL import Image, ImageDraw
            im = Image.open(out).convert("RGBA")
            for pt in ((0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)):
                ImageDraw.floodfill(im, pt, (255, 255, 255, 0), thresh=12)
            im.save(out)
        print("wrote", out.name, out.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main(sys.argv[1:])
