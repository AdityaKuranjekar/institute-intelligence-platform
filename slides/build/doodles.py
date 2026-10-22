"""Hand-drawn style doodles for the v4 deck (whiteboard / Miro feel): wobbly arrows, swoosh underlines, highlighter strokes,
scribbled circles, cursors with name tags, tape, brackets and a dotted-grid canvas. Output: slides/assets/doodle_*.png (transparent).
Run from slides/build: python doodles.py"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "assets"
SS = 4  # supersampling
INK, CORAL, AMBER, BLUE = (31, 74, 130), (224, 88, 74), (212, 162, 76), (46, 109, 180)


def bez(p0, p1, p2, p3, n=60):
    pts = []
    for i in range(n + 1):
        t = i / n
        a = (1 - t) ** 3; b = 3 * (1 - t) ** 2 * t; c = 3 * (1 - t) * t ** 2; d = t ** 3
        pts.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return pts


def stroke(d, pts, color, w, jitter=0.0, taper=False, rnd=None):
    rnd = rnd or random
    n = len(pts)
    for i in range(n - 1):
        x0, y0 = pts[i]; x1, y1 = pts[i + 1]
        j = lambda: rnd.uniform(-jitter, jitter) * SS
        ww = w * SS * ((0.35 + 0.65 * math.sin(math.pi * i / (n - 1))) if taper else 1)
        d.line([(x0 + j(), y0 + j()), (x1 + j(), y1 + j())], fill=color, width=max(1, int(ww)))
        r = ww / 2
        d.ellipse([x0 - r, y0 - r, x0 + r, y0 + r], fill=color)


def canvas(w, h):
    return Image.new("RGBA", (w * SS, h * SS), (0, 0, 0, 0))


def save(im, name, w, h):
    im = im.resize((w, h), Image.LANCZOS)
    im.save(OUT / f"doodle_{name}.png")


def head(d, tip, ang, color, size=16, w=3.2):
    for s in (-0.5, 0.5):
        a = ang + math.pi + s
        d.line([tip, (tip[0] + size * SS * math.cos(a), tip[1] + size * SS * math.sin(a))], fill=color, width=int(w * SS))
        r = w * SS / 2
        e = (tip[0] + size * SS * math.cos(a), tip[1] + size * SS * math.sin(a))
        d.ellipse([e[0] - r, e[1] - r, e[0] + r, e[1] + r], fill=color)


def arrow(name, w, h, p, color, seed, wobble=1.2, lw=3.2):
    rnd = random.Random(seed)
    im = canvas(w, h); d = ImageDraw.Draw(im)
    P = [(x * SS, y * SS) for x, y in p]
    pts = bez(*P)
    stroke(d, pts, color, lw, wobble, rnd=rnd)
    a = math.atan2(pts[-1][1] - pts[-4][1], pts[-1][0] - pts[-4][0])
    head(d, pts[-1], a, color)
    save(im, name, w, h)


def underline(name, w, h, color, seed, kind="wave"):
    rnd = random.Random(seed)
    im = canvas(w, h); d = ImageDraw.Draw(im)
    pts = []
    for i in range(80):
        t = i / 79
        x = (8 + t * (w - 16)) * SS
        y = (h / 2 + (math.sin(t * 9) * 3 if kind == "wave" else (1 - t) * 4 - 2) + rnd.uniform(-0.6, 0.6)) * SS
        pts.append((x, y))
    stroke(d, pts, color, 5 if kind == "swoosh" else 3.4, 0.4, taper=(kind == "swoosh"), rnd=rnd)
    if kind == "double":
        pts2 = [(x + rnd.uniform(-2, 2) * SS, y + 9 * SS) for x, y in pts[::2]]
        stroke(d, pts2, color, 2.6, 0.4, rnd=rnd)
    save(im, name, w, h)


def highlighter(name, w, h, color, seed):
    rnd = random.Random(seed)
    im = canvas(w, h); d = ImageDraw.Draw(im)
    top = [(x * SS, (h * 0.12 + rnd.uniform(-2, 2)) * SS) for x in [6 + i * (w - 12) / 14 for i in range(15)]]
    bot = [(x * SS, (h * 0.88 + rnd.uniform(-2, 2)) * SS) for x in [w - 6 - i * (w - 12) / 14 for i in range(15)]]
    d.polygon(top + bot, fill=color + (125,))
    save(im.filter(ImageFilter.GaussianBlur(1.2)), name, w, h)


def scribble_circle(name, w, h, color, seed):
    rnd = random.Random(seed)
    im = canvas(w, h); d = ImageDraw.Draw(im)
    cx, cy, rx, ry = w / 2, h / 2, w / 2 - 8, h / 2 - 8
    pts = []
    for i in range(110):
        t = -0.35 + 2.2 * math.pi * i / 109
        k = 1 + 0.025 * math.sin(3 * t) + rnd.uniform(-0.008, 0.008) + 0.03 * (i / 109)
        pts.append(((cx + rx * k * math.cos(t)) * SS, (cy + ry * k * math.sin(t) - 3 * (i / 109)) * SS))
    stroke(d, pts, color, 3.2, 0.3, rnd=rnd)
    save(im, name, w, h)


def cursor(name, color, label):
    w, h = 150, 64
    im = canvas(w, h); d = ImageDraw.Draw(im)
    tri = [(6, 4), (6, 36), (14, 29), (21, 44), (28, 41), (21, 26), (32, 26)]
    d.polygon([(x * SS, y * SS) for x, y in tri], fill=color + (255,), outline=(255, 255, 255, 255))
    tw = 12 + 8.2 * len(label)
    d.rounded_rectangle([30 * SS, 34 * SS, (30 + tw) * SS, 58 * SS], radius=11 * SS, fill=color + (255,))
    try:
        from PIL import ImageFont
        f = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 13 * SS)
        d.text((38 * SS, 36 * SS), label, font=f, fill=(255, 255, 255, 255))
    except Exception:
        d.text((38 * SS, 38 * SS), label, fill=(255, 255, 255, 255))
    save(im, name, w, h)


def tape(name):
    w, h = 140, 44
    im = canvas(w, h); d = ImageDraw.Draw(im)
    rnd = random.Random(3)
    top = [(x * SS, (3 + rnd.uniform(-1.5, 1.5)) * SS) for x in range(4, w - 4, 8)]
    bot = [(x * SS, (h - 3 + rnd.uniform(-1.5, 1.5)) * SS) for x in range(w - 4, 4, -8)]
    d.polygon(top + bot, fill=(214, 205, 178, 190))
    save(im, name, w, h)


def brace(name, w, h, color):
    im = canvas(w, h); d = ImageDraw.Draw(im)
    pts = bez((10, 6), (w - 6, 6), (w - 6, h / 2 - 8), (w / 2 + 6, h / 2), 30) + bez((w / 2 + 6, h / 2), (w - 6, h / 2 + 8), (w - 6, h - 6), (10, h - 6), 30)
    stroke(d, [(x * SS, y * SS) for x, y in pts], color, 3, 0.3)
    save(im, name, w, h)


def burst(name, color):
    w = h = 120
    im = canvas(w, h); d = ImageDraw.Draw(im)
    pts = []
    for i in range(24):
        r = (54 if i % 2 == 0 else 38)
        a = math.pi * 2 * i / 24
        pts.append(((60 + r * math.cos(a)) * SS, (60 + r * math.sin(a)) * SS))
    d.polygon(pts, fill=color + (255,))
    save(im, name, w, h)


def dots_bg():
    w, h = 1920, 1080
    im = Image.new("RGB", (w, h), (252, 253, 255))
    d = ImageDraw.Draw(im)
    for x in range(20, w, 36):
        for y in range(20, h, 36):
            d.ellipse([x - 1.6, y - 1.6, x + 1.6, y + 1.6], fill=(214, 222, 236))
    im.save(OUT / "bg_dots.png")


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    arrow("arrow_a", 300, 150, [(8, 130), (60, 10), (200, 0), (290, 90)], CORAL, 1)
    arrow("arrow_b", 160, 260, [(20, 8), (140, 60), (20, 150), (110, 250)], INK, 2)
    arrow("arrow_c", 320, 140, [(8, 100), (120, 130), (170, 10), (310, 60)], CORAL, 4, wobble=1.6)
    arrow("arrow_d", 240, 60, [(6, 40), (80, 20), (150, 50), (232, 28)], INK, 5)
    arrow("arrow_e", 220, 220, [(10, 20), (190, 10), (210, 120), (120, 205)], CORAL, 6)
    arrow("arrow_f", 200, 120, [(190, 100), (120, 120), (60, 40), (10, 14)], INK, 8)
    underline("ul_wave", 420, 36, CORAL, 1, "wave")
    underline("ul_swoosh", 420, 40, INK, 2, "swoosh")
    underline("ul_double", 420, 40, CORAL, 3, "double")
    highlighter("hl_y", 420, 58, (248, 214, 90), 1)
    highlighter("hl_b", 420, 58, (150, 200, 245), 2)
    highlighter("hl_p", 420, 58, (248, 170, 190), 3)
    scribble_circle("circle_c", 360, 180, CORAL, 1)
    scribble_circle("circle_i", 360, 180, INK, 2)
    cursor("cur_mentor", (46, 109, 180), "Mentor")
    cursor("cur_owner", (224, 88, 74), "Owner")
    cursor("cur_parent", (60, 150, 100), "Parent")
    cursor("cur_judge", (140, 90, 170), "Judge?")
    tape("tape")
    brace("brace", 70, 260, INK)
    burst("burst_y", (248, 214, 90))
    burst("burst_c", (224, 88, 74))
    dots_bg()
    print("doodles written to", OUT)
