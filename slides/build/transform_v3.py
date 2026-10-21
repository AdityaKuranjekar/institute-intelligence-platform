import re
src = open('deck_v2_dense.js', encoding='utf-8').read()


def between(s, a, b, include_b=False):
    i = s.index(a)
    j = s.index(b, i)
    return i, (j + len(b) if include_b else j)


# 0. header + imports
src = src.replace('const { T, F, W, H, makeKit } = require("./lib");', 'const { T, ACC, F, W, H, makeKit } = require("./lib");')
src = src.replace('const { text, rect, ellipse, line, icon, pill, tag, source, frame, hdrBar, labelBar, callout, dtable, heat, badge, lines, rubric, pic } = kit;',
                  'const { text, rect, ellipse, line, icon, pill, tag, source, frame, hdrBar, labelBar, callout, dtable, heat, badge, abadge, lines, rubric, pic, chevrow, funnel, loop } = kit;\n  let nb = 0;')
src = src.replace('(dense consultant style v2)', '(light multi-colour style v3)')

# 1. masters
i, j = between(src, '  const titleBox =', '  const content =')
masters = open('parts/masters.js', encoding='utf-8').read()
src = src[:i] + masters + src[j:]

# 2. title slide
i, j = between(src, '  // ================================================================ TITLE', '  // ================================================================ 1 PROBLEM')
src = src[:i] + open('parts/title.js', encoding='utf-8').read() + src[j:]

# 3. wall + surfaces slide
i, j = between(src, '  // ================================================================ 2 PRODUCT WALL (dark)', '  // ================================================================ 3 ARCHITECTURE (full-bleed)')
src = src[:i] + open('parts/wall.js', encoding='utf-8').read() + src[j:]

# 4. funnel block (GTM slide)
i, j = between(src, '    const stg = [["Retro-pilot"', '    const sx = 9.6, sw = R - 9.6;')
src = src[:i] + open('parts/funnel.js', encoding='utf-8').read() + src[j:]
src = src.replace('rect(s, sx + 0.1 + i * ((sw - 0.2) / 12), 4.3, (sw - 0.2) / 12 - 0.02, 0.18, hot ? T.tealDark : "DCEEF3");',
                  'rect(s, sx + 0.1 + i * ((sw - 0.2) / 12), 4.3, (sw - 0.2) / 12 - 0.02, 0.18, hot ? T.orange : "FFE3C7");')

# 5. pilot plan chevrons
i, j = between(src, '    line(s, L + 0.6, 5.15, R - 0.6, 5.15', '    labelBar(s, L + 0.12, 6.62, CWD - 0.24, "Changed from the guide')
src = src[:i] + open('parts/pilot.js', encoding='utf-8').read() + src[j:]

# 6. final slide
i, j = between(src, '    const s = pres.addSlide({ masterName: "CLOSING"', '    text(s, "github.com/AdityaKuranjekar')
src = src[:i] + open('parts/final.js', encoding='utf-8').read() + src[j:]
src = src.replace('{ x: 5.0, y: 6.7, w: 7.88, h: 0.45, fontSize: 13, color: "B9C7DA", align: "right", valign: "middle" }',
                  '{ x: 5.0, y: 6.7, w: 7.88, h: 0.45, fontSize: 13, color: T.muted, align: "right", valign: "middle" }')

# 7. product naming: AlphaQ -> Pragati, then restore team-name spots
src = src.replace('AlphaQ', 'Pragati').replace('ALPHAQ', 'PRAGATI')
src = src.replace('pres.title = "Pragati: Case B, The Data Moat (Round 1)"', 'pres.title = "AlphaQ: Case B, The Data Moat (Round 1)"')
src = src.replace('pres.author = "Pragati"', 'pres.author = "AlphaQ"').replace('pres.company = "Pragati"', 'pres.company = "AlphaQ"')
src = src.replace('Pragati_CaseB_Round1.pptx', 'AlphaQ_CaseB_Round1.pptx')

# 8. badges -> accent badges (cycle)
src = re.sub(r'await badge\(s, ([^,]+), ([^,]+), ([^,]+), ([^,]+), [^;]+?\);', r'await abadge(s, \1, \2, \3, \4, nb++);', src)

# 9. bars and table headers
cyc = ['T.blueD', 'T.orangeD', 'T.tealDark']
k = [0]


def rep(m):
    c = cyc[k[0] % 3]
    k[0] += 1
    return m.group(1) + c


src = re.sub(r'(labelBar\([^\n]*?fill: )T\.navy', rep, src)
src = re.sub(r'(hdrBar\([^\n]*?fill: )T\.navy', rep, src)
src = src.replace('headFill: T.navy', 'headFill: T.blueD')
src = src.replace('headFills: [T.navy,', 'headFills: [T.blueD,')
src = src.replace('X(base) - X(d[1]), 0.26, "9FD3D4");', 'X(base) - X(d[1]), 0.26, "F6B26B");')
src = src.replace('X(d[2]) - X(base), 0.26, T.tealDark);', 'X(d[2]) - X(base), 0.26, T.teal);')

# 10. panel style per content slide, in order
styles = ['tint', 'tab', 'ring', 'tab', 'left', 'dash', 'tab', 'tint', 'ring', 'tint', 'dash', 'left', 'tab', 'plain', 'tint', 'dash']
parts = src.split('const s = content(')
out = parts[0]
for n, p in enumerate(parts[1:]):
    st = styles[n] if n < len(styles) else 'tab'
    first_nl = p.index('\n')
    out += 'const s = content(' + p[:first_nl] + '\n    kit.panels("' + st + '");' + p[first_nl:]
src = out
open('deck.js', 'w', encoding='utf-8').write(src)
print('ok', src.count('kit.panels('))
