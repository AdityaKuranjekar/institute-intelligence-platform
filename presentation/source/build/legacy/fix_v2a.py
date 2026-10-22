from pathlib import Path

B = Path(__file__).resolve().parent


def sub(path, a, b):
    p = B / path
    s = p.read_text(encoding="utf-8")
    assert a in s, (path, a[:80])
    p.write_text(s.replace(a, b, 1), encoding="utf-8")


# mocks: blue band colours for the heat grid
sub("mocks.js", 'const BAND_FILL = { nodata: T.greyLight, building: "C9E6E6", steady: "6FBFC0", strong: T.teal };', 'const BAND_FILL = { nodata: T.greyLight, building: "C9DBF0", steady: "7FA6D6", strong: "1F4A82" };')
# S3 friction cells: larger text
sub("parts/v2/s03_s06.js", 'lines(s, fm[i][2], x + 0.12, y + 0.65, 2.78, 1.8, { size: 11, gap: 8 });', 'lines(s, fm[i][2], x + 0.12, y + 0.68, 2.78, 1.8, { size: 13, gap: 14 });')
# S4 pill labels
sub("parts/v2/s03_s06.js", 'text(s, rows[i][1], { x: 6.15, y: y + 0.2, w: 0.95, h: 0.52, fontSize: 7.5, bold: true, color: T.tealDark, valign: "middle", charSpacing: 0.3 });', 'text(s, rows[i][1], { x: 6.24, y: y + 0.2, w: 0.85, h: 0.52, fontSize: 7, bold: true, color: T.tealDark, valign: "middle" });')
# S6 caption position
sub("parts/v2/s03_s06.js", 'text(s, "Illustrative mock-ups, synthetic students", { x: 7.2, y: 4.78,', 'text(s, "Illustrative mock-ups, synthetic students", { x: 7.2, y: 4.9,')
# S8 KPI block
sub("parts/v2/s07_s09.js", 'pic(s, "chart_oulad_by_day.png", L, 5.3, 2.35, 1.63,', 'pic(s, "chart_oulad_by_day.png", L, 5.3, 2.2, 1.53,')
sub("parts/v2/s07_s09.js", 'tag(s, "public", L + 2.45, 5.32);', 'tag(s, "public", L + 2.3, 5.3);')
a = s = (B / "parts/v2/s07_s09.js").read_text(encoding="utf-8")
i = s.index('    text(s, [{ text: "0.46"')
j = s.index("\n", s.index('{ x: L + 2.45, y: 5.6', i)) + 1
new = '''    text(s, [{ text: "0.46", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "of the top 10 % flagged really leave; simple rules: 0.24–0.31", options: { fontSize: 9, color: T.ink } }], { x: L + 2.3, y: 5.58, w: 1.75, h: 0.65, valign: "top" });
    text(s, [{ text: "0.009", options: { bold: true, fontSize: 18, color: T.tealDark, breakLine: true } }, { text: "calibration error: “30 %” means 30 %", options: { fontSize: 9, color: T.ink } }], { x: L + 2.3, y: 6.25, w: 1.75, h: 0.65, valign: "top" });
'''
(B / "parts/v2/s07_s09.js").write_text(s[:i] + new + s[j:], encoding="utf-8")
# S9 footer shorter
sub("parts/v2/s07_s09.js", 'foot(s, "Sources: backend/app/genai (report module, 20 templates, 16 tests); contracts/report_numbers.schema.json. Percentile band is a quantile model with a conformal 80 % target; coverage results pending. Mock-ups are illustrative.");', 'foot(s, "Sources: backend/app/genai (20 templates, 16 tests); contracts/report_numbers.schema.json. Band = quantile model, conformal 80 % target; coverage pending. Mock-ups illustrative.");')
# S10 tile body size
sub("parts/v2/s10_s13.js", '"Question difficulty numbers only. No student, no name, no marks.", { bs: 11 }', '"Question difficulty numbers only. No student, no name, no marks.", { bs: 14 }')
sub("parts/v2/s10_s13.js", '"Progress and next steps. Never ranks. Never a risk label.", { bs: 11 }', '"Progress and next steps. Never ranks. Never a risk label.", { bs: 14 }')
# S11 cost stack: legend independent of bar
p = B / "parts/v2/s10_s13.js"
s = p.read_text(encoding="utf-8")
i = s.index("    let yy = 3.55; const tot = 3.6")
j = s.index('    text(s, "A month, per student, all-in, run locally: ₹0 extra"')
new = '''    let yy = 3.55; const tot = 3.6, bh = 2.75;
    parts.forEach((p) => { const h = (p[1] / tot) * bh; rect(s, sx, yy, 0.8, h, p[2]); yy += h; });
    parts.forEach((p, i) => {
      const y = 3.55 + i * 0.46;
      rect(s, sx + 1.0, y + 0.1, 0.2, 0.2, p[2]);
      text(s, [{ text: "₹" + p[1].toFixed(1) + "  ", options: { bold: true, color: T.navy } }, { text: p[0], options: { color: T.ink } }], { x: sx + 1.3, y, w: sw - 1.3, h: 0.4, fontSize: 10.5, valign: "middle" });
    });
'''
s = s[:i] + new + s[j:]
s = s.replace('text(s, "A month, per student, all-in, run locally: ₹0 extra", { x: sx, y: 6.62, w: sw, h: 0.3,', 'text(s, "A month, per student, all-in. Run locally: ₹0 extra", { x: sx, y: 6.5, w: sw, h: 0.3,')
# S11 owner return value labels in a fixed column
s = s.replace('text(s, r[1] + "x", { x: rx + 1.4 + (r[1] / 2) * (rw - 2.2), y, w: 0.7, h: 0.46, fontSize: 12, bold: true, color: T.navy, valign: "middle" });', 'text(s, r[1] + "x", { x: R - 0.75, y, w: 0.75, h: 0.46, fontSize: 13, bold: true, color: T.navy, align: "right", valign: "middle" });')
# S12 layout tweaks
s = s.replace('["PILOTS", "Paid pilots, control batches", 2, 3, T.teal]', '["PILOTS", "Paid pilots + controls", 2, 3, T.teal]')
s = s.replace("const hx = 3.2, hy = 5.95;", "const hx = 3.4, hy = 5.95;")
s = s.replace('[[1.3, 5.38, "FaGift"', '[[1.95, 5.38, "FaGift"').replace('[5.1, 5.38, "FaPersonChalkboard"', '[4.85, 5.38, "FaPersonChalkboard"').replace('[1.3, 6.52, "FaPrint"', '[1.95, 6.52, "FaPrint"').replace('[5.1, 6.52, "FaHandshake"', '[4.85, 6.52, "FaHandshake"')
s = s.replace("x: left ? x - 1.2 : x + 0.35, y: y - 0.25, w: 1.5, h: 0.5", "x: left ? x - 1.55 : x + 0.35, y: y - 0.25, w: 1.25, h: 0.5")
s = s.replace('text(s, [{ text: t, options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: sub, options: { fontSize: 8, color: T.muted } }], {', 'text(s, [{ text: t, options: { bold: true, fontSize: 10, color: T.navy, breakLine: true } }, { text: sub, options: { fontSize: 8, color: T.muted } }], { align: left ? "right" : "left",')
# S13 axis label
s = s.replace('s.addText("IMPACT →", { x: mx - 0.55, y: my + mh / 2 - 0.15, w: 0.5, h: 0.3,', 's.addText("IMPACT →", { x: mx - 0.75, y: my + mh / 2 - 0.15, w: 0.9, h: 0.3,')
p.write_text(s, encoding="utf-8")
# A2 chart fixes
p = B / "parts/v2/appendix.js"
s = p.read_text(encoding="utf-8")
s = s.replace('{ x: L, y: 3.62, w: 6.3, h: 0.45, fontSize: 9, italic: true, color: T.muted });', '{ x: L, y: 3.9, w: 6.3, h: 0.4, fontSize: 9, italic: true, color: T.muted });')
s = s.replace('sec(s, "B", "BASE CASE, YEAR BY YEAR (₹ LAKH)", L, 4.15, 6.3);', 'sec(s, "B", "BASE CASE, YEAR BY YEAR (₹ LAKH)", L, 4.35, 6.3);')
s = s.replace("const base0 = 6.2, sc = 0.034;", "const base0 = 6.2, K = 0.024;").replace("y[1] * 0.034", "y[1] * K").replace("e * 0.034", "e * K").replace("Math.abs(e) * 0.034", "Math.abs(e) * K")
s = s.replace('text(s, "■ revenue   ■ EBITDA", { x: L + 4.3, y: 4.45, w: 2, h: 0.24, fontSize: 9, color: T.muted, align: "right" });', 'rect(s, L + 3.4, 4.43, 0.14, 0.14, T.tealDark); text(s, "revenue", { x: L + 3.58, y: 4.38, w: 0.8, h: 0.24, fontSize: 9, color: T.muted, valign: "middle" }); rect(s, L + 4.5, 4.43, 0.14, 0.14, "5B8DC9"); text(s, "EBITDA", { x: L + 4.68, y: 4.38, w: 0.8, h: 0.24, fontSize: 9, color: T.muted, valign: "middle" });')
p.write_text(s, encoding="utf-8")
# gauge: remove overlapping texts
p = B / "charts.py"
s = p.read_text(encoding="utf-8")
s = s.replace('    ax.text(0, -0.2, "1.7x return, base", ha="center", fontsize=11, fontweight="bold", color=NAVY)\n    ax.text(-0.98, -0.2, "pays back above 1x", ha="left", fontsize=7.5, color=RED)\n', '    ax.text(1.12 * np.cos(a1), 1.12 * np.sin(a1) + 0.04, "1x", ha="center", fontsize=8.5, color=RED, fontweight="bold")\n    ax.text(0, -0.24, "return above 1x = the product pays for itself", ha="center", fontsize=8, color=RED)\n')
p.write_text(s, encoding="utf-8")
print("ok")
