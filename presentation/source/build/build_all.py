"""Rebuild every deck version and its previews. Run from presentation/source/build:  python build_all.py [v1 v2 v3 v4]
Needs: node + npm install (once), Python with matplotlib, pillow, lxml; Edge or Chrome for export_html.py.
Order matters: v1 writes deck.js, which v2 and v3 reuse for their appendix slides; v4 builds on v3."""
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DECKS = HERE.parent.parent / "decks"
PREV = HERE.parent.parent / "previews"
NAMES = {"v1": "earlier-1_v1", "v2": "earlier-2_v2", "v3": "earlier-3_v3", "v4": "CURRENT_v4"}
STEPS = {"v1": ("assemble_v5.py", "deck.js"), "v2": ("assemble_v2.py", "deck_v2.js"), "v3": ("assemble_v3.py", "deck_v3.js"), "v4": ("assemble_v4.py", "deck_v4.js")}


def run(*cmd):
    subprocess.run(list(cmd), cwd=HERE, check=True)


if __name__ == "__main__":
    want = sys.argv[1:] or list(STEPS)
    run(sys.executable, "charts.py")
    run(sys.executable, "doodles.py")
    for v in STEPS:
        if v in want:
            asm, js = STEPS[v]
            run(sys.executable, asm)
            run("node", js)
            run(sys.executable, "render_check.py", str(DECKS / f"AlphaQ_CaseB_Round1_{NAMES[v]}.pptx"), str(PREV / NAMES[v]))
    print("done:", ", ".join(want))
