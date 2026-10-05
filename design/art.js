// ---- Plushie Meadow art kit: felt-and-plush look (soft gradients, stitched seams, grain, lifted shadows) ----
const ART = (() => {
  const C = {
    ink: '#4A3A5C', cream: '#FFF6E5', oat: '#FFE0BD', peach: '#FFAE73', blush: '#FF9CC2', rose: '#FF5C8F', berry: '#E8336D',
    butter: '#FFD43B', honey: '#FFA62B', sage: '#7ED36A', grass: '#5BC44E', mint: '#36D6B0', sky: '#4BB0FF', powder: '#A6DAFF',
    lilac: '#B79AFF', lav: '#8A6CF0', brown: '#CC8752', cocoa: '#8A5638', cloud: '#FFFFFF', night: '#5B4FC4', coral: '#FF7A5A'
  };
  const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (h, t, f) => { const a = hx(h), b = hx(t); return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * f).toString(16).padStart(2, '0')).join(''); };
  const lt = (h, f) => mix(h, '#ffffff', f), dk = (h, f) => mix(h, '#3a2b45', f);
  const col = k => C[k] || k;
  const F = k => C[k] ? `url(#r-${k})` : k;
  const OUT = k => `stroke="${dk(col(k), .3)}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const STITCH = k => `fill="none" stroke="${lt(col(k), .62)}" stroke-width="1.3" stroke-dasharray="2.6 2.8" stroke-linecap="round"`;
  const FONT = `Andika,'Itim',ui-rounded,system-ui,sans-serif`;
  const T = (x, y, s, r = 0) => `transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}${r ? ` rotate(${r})` : ''}"`;
  const G = (x, y, s, inner, r = 0, extra = '') => `<g ${T(x, y, s, r)} ${extra}>${inner}</g>`;

  function defs() {
    let g = '';
    for (const [k, c] of Object.entries(C)) {
      g += `<radialGradient id="r-${k}" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="${lt(c, .3)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${dk(c, .12)}"/></radialGradient>`;
    }
    g += `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7CCBFF"/><stop offset="1" stop-color="#E6F7FF"/></linearGradient>`;
    g += `<linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7D6BE8"/><stop offset=".65" stop-color="#FF8FB8"/><stop offset="1" stop-color="#FFC48A"/></linearGradient>`;
    g += `<linearGradient id="nightsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E3AA8"/><stop offset="1" stop-color="#8E6FE0"/></linearGradient>`;
    g += `<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1D6"/><stop offset="1" stop-color="#FFDDB8"/></linearGradient>`;
    g += `<radialGradient id="shadow"><stop offset="0" stop-color="#5B4E63" stop-opacity=".28"/><stop offset=".7" stop-color="#5B4E63" stop-opacity=".1"/><stop offset="1" stop-color="#5B4E63" stop-opacity="0"/></radialGradient>`;
    g += `<radialGradient id="glow"><stop offset="0" stop-color="#FFF08A" stop-opacity=".95"/><stop offset=".5" stop-color="#FFE14D" stop-opacity=".45"/><stop offset="1" stop-color="#FFE14D" stop-opacity="0"/></radialGradient>`;
    g += `<pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.6" fill="#FFBFA0"/><circle cx="12" cy="12" r="1.6" fill="#9FD8FF"/></pattern>`;
    g += `<pattern id="gingham" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#FFF1F5"/><rect width="7" height="14" fill="#FF7FA8" opacity=".55"/><rect width="14" height="7" fill="#FF7FA8" opacity=".55"/></pattern>`;
    g += `<pattern id="plaid" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#B79AFF"/><rect width="3" height="10" fill="#9B7BF2"/><rect width="10" height="3" fill="#9B7BF2"/></pattern>`;
    g += `<filter id="felt" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .36  0 0 0 0 .3  0 0 0 0 .42  .5 0 0 0 -.16" result="g"/><feComposite in="g" in2="SourceAlpha" operator="in" result="gm"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gm"/></feMerge></filter>`;
    g += `<filter id="lift" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2.2" stdDeviation="2.2" flood-color="#5B4E63" flood-opacity=".22"/></filter>`;
    g += `<filter id="sil" x="-10%" y="-10%" width="120%" height="120%"><feFlood flood-color="#6E5FB0" flood-opacity=".8"/><feComposite in2="SourceAlpha" operator="in"/></filter>`;
    g += `<clipPath id="scr" clipPathUnits="userSpaceOnUse"><rect width="400" height="200" rx="14"/></clipPath>`;
    g += `<clipPath id="qcell" clipPathUnits="userSpaceOnUse"><rect x="200" y="80" width="40" height="40"/></clipPath>`;
    return g;
  }

  // ---- primitives ----
  const shadow = (x, y, rx, ry = rx * .22) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#shadow)"/>`;
  const circ = (x, y, r, k, st = true) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${F(k)}" ${OUT(k)}/>` + (st && r > 9 ? `<circle cx="${x}" cy="${y}" r="${r - 3.4}" ${STITCH(k)}/>` : '');
  const ell = (x, y, rx, ry, k, rot = 0, st = true) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${F(k)}" ${OUT(k)}${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}/>` +
    (st && rx > 9 && ry > 9 ? `<ellipse cx="${x}" cy="${y}" rx="${rx - 3.4}" ry="${ry - 3.4}" ${STITCH(k)}${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}/>` : '');
  const rr = (x, y, w, h, r, k, st = true) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${F(k)}" ${OUT(k)}/>` +
    (st && w > 18 && h > 18 ? `<rect x="${x + 3.4}" y="${y + 3.4}" width="${w - 6.8}" height="${h - 6.8}" rx="${Math.max(r - 3, 1)}" ${STITCH(k)}/>` : '');
  const pth = (d, k, st = false) => `<path d="${d}" fill="${F(k)}" ${OUT(k)}/>` + (st ? `<path d="${d}" ${STITCH(k)} transform-origin="center" style="transform-box:fill-box;transform:scale(.84)"/>` : '');
  // merged blob of circles: outlined layer then fill layer, so only the outer edge shows a seam
  const blob = (cs, k) => cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${F(k)}" stroke="${dk(col(k), .3)}" stroke-width="4"/>`).join('') + cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${F(k)}"/>`).join('');
  const txt = (x, y, s, size, fill = C.ink, w = 700, font = FONT, extra = '') => `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${w}" fill="${fill}" text-anchor="middle" dominant-baseline="central" ${extra}>${s}</text>`;
  const sparkle = (x, y, s = 1, c = '#FFE14D') => `<path d="M${x} ${y - 7 * s} Q${x + 1.2 * s} ${y - 1.2 * s} ${x + 7 * s} ${y} Q${x + 1.2 * s} ${y + 1.2 * s} ${x} ${y + 7 * s} Q${x - 1.2 * s} ${y + 1.2 * s} ${x - 7 * s} ${y} Q${x - 1.2 * s} ${y - 1.2 * s} ${x} ${y - 7 * s}Z" fill="${c}" stroke="${dk(c, .25)}" stroke-width=".8"/>`;
  const dashLine = (d, c = C.ink, w = 3) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="1 ${w * 2.4}" stroke-linecap="round" opacity=".55"/>`;

  function starPath(x, y, R, r = R * .5, n = 5) {
    let d = '';
    for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, q = i % 2 ? r : R; d += (i ? 'L' : 'M') + (x + q * Math.cos(a)).toFixed(1) + ' ' + (y + q * Math.sin(a)).toFixed(1); }
    return d + 'Z';
  }
  const heartPath = (x, y, s) => `M${x} ${y + s * .9}C${x - s * 1.35} ${y + s * .05} ${x - s * .95} ${y - s * 1} ${x} ${y - s * .38}C${x + s * .95} ${y - s * 1} ${x + s * 1.35} ${y + s * .05} ${x} ${y + s * .9}Z`;
  function shapePath(t, x, y, r) {
    if (t === 'circle') return `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
    if (t === 'square') { const q = r * .9, c = r * .28; return `M${x - q + c} ${y - q}H${x + q - c}Q${x + q} ${y - q} ${x + q} ${y - q + c}V${y + q - c}Q${x + q} ${y + q} ${x + q - c} ${y + q}H${x - q + c}Q${x - q} ${y + q} ${x - q} ${y + q - c}V${y - q + c}Q${x - q} ${y - q} ${x - q + c} ${y - q}Z`; }
    if (t === 'triangle') return `M${x} ${y - r * 1.05}L${x + r * 1.08} ${y + r * .8}L${x - r * 1.08} ${y + r * .8}Z`;
    if (t === 'star') return starPath(x, y + r * .08, r * 1.12, r * .55);
    if (t === 'heart') return heartPath(x, y + r * .05, r * 1.02);
    return '';
  }
  const shp = (t, x, y, r, k) => `<path d="${shapePath(t, x, y, r)}" fill="${F(k)}" ${OUT(k)}/><path d="${shapePath(t, x, y, r * .72)}" ${STITCH(k)}/>`;
  const hole = (t, x, y, r) => `<path d="${shapePath(t, x, y, r)}" fill="${dk(C.lav, .45)}" stroke="${dk(C.lav, .2)}" stroke-width="2" stroke-linejoin="round"/>`;

  // ---- faces ----
  function face(x, y, s = 1, mood = 'happy', o = {}) {
    const ex = (o.eyeDx || 9) * s, ink = C.ink; let e = '';
    if (mood === 'joy' || mood === 'sleepy') {
      const up = mood === 'joy';
      for (const sx of [-1, 1]) e += `<path d="M${x + sx * ex - 4 * s} ${y + (up ? 1.5 : -1) * s}Q${x + sx * ex} ${y + (up ? -4 : 3) * s} ${x + sx * ex + 4 * s} ${y + (up ? 1.5 : -1) * s}" fill="none" stroke="${ink}" stroke-width="${2.2 * s}" stroke-linecap="round"/>`;
    } else {
      const r = (mood === 'wow' ? 3.5 : 3) * s, dx = mood === 'think' ? 1.6 * s : 0, dy = mood === 'think' ? -1.6 * s : 0;
      for (const sx of [-1, 1]) e += `<circle cx="${x + sx * ex + dx}" cy="${y + dy}" r="${r}" fill="${ink}"/><circle cx="${x + sx * ex + dx - r * .32}" cy="${y + dy - r * .36}" r="${r * .36}" fill="#fff"/>`;
      if (mood === 'sad') e += `<path d="M${x + ex + 1 * s} ${y + 4 * s}q${2.4 * s} ${4 * s} 0 ${6 * s}q${-2.4 * s} ${-2 * s} 0 ${-6 * s}Z" fill="${C.sky}" stroke="${dk(C.sky, .3)}" stroke-width=".8"/>`;
      if (mood === 'sad') for (const sx of [-1, 1]) e += `<path d="M${x + sx * ex - 4 * s * sx} ${y - 6 * s}L${x + sx * ex + 3 * s * sx} ${y - 4.5 * s}" stroke="${ink}" stroke-width="${1.4 * s}" stroke-linecap="round"/>`;
    }
    if (o.blush !== false) for (const sx of [-1, 1]) e += `<ellipse cx="${x + sx * (ex + (o.blushDx || 6) * s)}" cy="${y + 5.5 * s}" rx="${4.6 * s}" ry="${2.8 * s}" fill="${C.rose}" opacity=".45"/>`;
    if (o.mouth !== false) {
      const my = y + (o.my || 7) * s, m = `fill="none" stroke="${ink}" stroke-width="${1.8 * s}" stroke-linecap="round" stroke-linejoin="round"`;
      if (mood === 'happy' || mood === 'joy') e += `<path d="M${x - 4 * s} ${my}q${2 * s} ${2.6 * s} ${4 * s} 0q${2 * s} ${2.6 * s} ${4 * s} 0" ${m}/>`;
      else if (mood === 'wow') e += `<ellipse cx="${x}" cy="${my + 1.2 * s}" rx="${2.4 * s}" ry="${3 * s}" fill="${dk(C.rose, .35)}"/>`;
      else if (mood === 'think') e += `<path d="M${x - 2.5 * s} ${my + 1 * s}L${x + 3 * s} ${my}" ${m}/>`;
      else if (mood === 'sleepy') e += `<ellipse cx="${x}" cy="${my + 1 * s}" rx="${1.7 * s}" ry="${1.4 * s}" fill="${ink}" opacity=".7"/>`;
      else if (mood === 'sad') e += `<path d="M${x - 4 * s} ${my + 2.4 * s}Q${x} ${my - 1.4 * s} ${x + 4 * s} ${my + 2.4 * s}" ${m}/>`;
    }
    return e;
  }

  // ---- the cast (local box about -50..50, feet near y=48) ----
  const CHARS = {
    mallow(m) { // Mallow the cloud lamb: guide, host of Heart Cottage
      return shadow(0, 50, 36) + ell(-14, 46, 8, 5, 'cocoa', 0, false) + ell(14, 46, 8, 5, 'cocoa', 0, false) +
        blob([[-24, 24, 18], [24, 24, 18], [0, 30, 22], [-30, 6, 16], [30, 6, 16], [-20, -20, 16], [20, -20, 16], [0, -28, 18], [-27, -5, 14], [27, -5, 14]], 'cloud') +
        ell(-35, -4, 12, 6, 'oat', -28, false) + ell(-36, -4, 6, 3, 'blush', -28, false) + ell(35, -4, 12, 6, 'oat', 28, false) + ell(36, -4, 6, 3, 'blush', 28, false) +
        ell(0, -2, 22, 20, 'oat') + blob([[-8, -24, 8], [8, -24, 8], [0, -29, 9]], 'cloud') + face(0, -1, 1, m);
    },
    tumble(m) { // Tumble the bear: Berry Burrow (numbers)
      return shadow(0, 50, 30) + ell(-12, 47, 8, 5, 'brown', 0, false) + ell(12, 47, 8, 5, 'brown', 0, false) +
        ell(0, 32, 24, 18, 'brown') + ell(0, 34, 13, 10, 'oat', 0, false) + ell(-22, 28, 7, 10, 'brown', 20, false) + ell(22, 28, 7, 10, 'brown', -20, false) +
        circ(-24, -30, 11, 'brown', false) + circ(-24, -30, 6, 'oat', false) + circ(24, -30, 11, 'brown', false) + circ(24, -30, 6, 'oat', false) +
        circ(0, -6, 30, 'brown') + ell(0, 6, 13, 9.5, 'oat', 0, false) + ell(0, 1.5, 4.2, 3, 'cocoa', 0, false) + face(0, -9, 1, m, { my: 18, blushDx: 7 });
    },
    pip(m) { // Pip the chick: Rainbow Nest (shapes & colors)
      return shadow(0, 50, 30) + `<path d="M-12 44l-4 6M-12 44l0 7M-12 44l4 6M12 44l-4 6M12 44l0 7M12 44l4 6" stroke="${C.honey}" stroke-width="3" stroke-linecap="round"/>` +
        ell(-33, 16, 9, 15, 'butter', 25, false) + ell(33, 16, 9, 15, 'butter', -25, false) + circ(0, 10, 36, 'butter') + ell(0, 26, 20, 13, 'cream', 0, false) +
        ell(-4, -28, 4, 9, 'butter', -25, false) + ell(4, -29, 4, 9, 'butter', 20, false) + face(0, 2, 1, m, { mouth: false, eyeDx: 11 }) +
        `<path d="M-5 8L5 8L0 15Z" fill="${C.honey}" stroke="${dk(C.honey, .3)}" stroke-width="1.5" stroke-linejoin="round"/>`;
    },
    hoot(m) { // Hoot the owl: Letter Tree (letters)
      let sc = ''; for (const [x, y] of [[-8, 16], [8, 16], [0, 24], [-10, 30], [10, 30], [0, 36]]) sc += `<path d="M${x - 4} ${y}q4 4 8 0" fill="none" stroke="${dk(C.cream, .25)}" stroke-width="1.4" stroke-linecap="round"/>`;
      return shadow(0, 50, 30) + `<path d="M-10 46h-4M-10 46v4M10 46h4M10 46v4" stroke="${C.honey}" stroke-width="3" stroke-linecap="round"/>` +
        pth('M-28 -24L-22 -50L-8 -34Z', 'lilac') + pth('M28 -24L22 -50L8 -34Z', 'lilac') + ell(0, 6, 32, 42, 'lilac') + ell(-31, 12, 8, 19, 'lav', 12, false) + ell(31, 12, 8, 19, 'lav', -12, false) +
        ell(0, 24, 20, 20, 'cream', 0, false) + sc + circ(-12, -10, 12.5, 'cloud', false) + circ(12, -10, 12.5, 'cloud', false) +
        face(0, -10, 1, m, { eyeDx: 12, mouth: false, blushDx: 9 }) + `<path d="M-4 -1L4 -1L0 6Z" fill="${C.honey}" stroke="${dk(C.honey, .3)}" stroke-width="1.4" stroke-linejoin="round"/>`;
    },
    kiki(m) { // Kiki the kitten: Puzzle Pond (thinking)
      return shadow(0, 50, 28) + `<path d="M16 38Q46 34 38 8" fill="none" stroke="${dk(C.sky, .3)}" stroke-width="11" stroke-linecap="round"/><path d="M16 38Q46 34 38 8" fill="none" stroke="${C.sky}" stroke-width="7" stroke-linecap="round"/>` +
        ell(0, 32, 21, 17, 'sky') + ell(0, 35, 11, 9, 'cream', 0, false) + ell(-10, 47, 7, 4.5, 'sky', 0, false) + ell(10, 47, 7, 4.5, 'sky', 0, false) +
        pth('M-28 -12L-24 -44L-4 -30Z', 'sky') + `<path d="M-23 -18L-22 -36L-11 -28Z" fill="${C.blush}"/>` + pth('M28 -12L24 -44L4 -30Z', 'sky') + `<path d="M23 -18L22 -36L11 -28Z" fill="${C.blush}"/>` +
        ell(0, -6, 31, 27, 'sky') + `<path d="M-3 2h6l-3 3Z" fill="${C.rose}"/>` +
        `<path d="M-14 4h-14M-14 8l-13 3M14 4h14M14 8l13 3" stroke="${dk(C.sky, .35)}" stroke-width="1.2" stroke-linecap="round"/>` + face(0, -8, 1, m, { my: 15, eyeDx: 11 });
    },
    shelly(m) { // Shelly the snail: Wiggle Garden (little hands)
      let sp = ''; for (let i = 0; i <= 60; i++) { const a = i * .3, r = 1 + i * .36; sp += (i ? 'L' : 'M') + (-8 + r * Math.cos(a)).toFixed(1) + ' ' + (8 + r * Math.sin(a)).toFixed(1); }
      return shadow(0, 50, 46) + rr(-46, 32, 96, 16, 8, 'sage', false) + ell(32, 12, 14, 24, 'sage', 0, false) +
        `<path d="M28 -10L24 -30M38 -10L42 -30" stroke="${dk(C.sage, .3)}" stroke-width="3" stroke-linecap="round"/>` + circ(24, -32, 4.5, 'sage', false) + circ(42, -32, 4.5, 'sage', false) +
        circ(-8, 8, 29, 'peach') + `<path d="${sp}" fill="none" stroke="${dk(C.peach, .28)}" stroke-width="2" stroke-linecap="round"/>` + face(33, 6, .62, m, { blushDx: 3 });
    }
  };
  const char = (n, x, y, s = 1, m = 'happy', extra = '') => G(x, y, s, CHARS[n](m), 0, extra);

  // ---- props ----
  const berry = (x, y, s = 1) => G(x, y, s, `<circle r="7.5" fill="url(#r-berry)" ${OUT('berry')}/><circle cx="-2.6" cy="-2.6" r="1.9" fill="#fff" opacity=".7"/><circle cx="2" cy="2" r=".9" fill="${dk(C.berry, .35)}"/><circle cx="-1" cy="3.4" r=".9" fill="${dk(C.berry, .35)}"/>` + ell(1.5, -7.5, 4.2, 2, 'sage', -25, false));
  const bowlBack = (x, y, w, k = 'sky') => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${w * .12}" fill="${dk(col(k), .25)}"/>`;
  const bowlFront = (x, y, w, k = 'sky') => `<path d="M${x - w / 2} ${y}Q${x - w / 2} ${y + w * .48} ${x} ${y + w * .48}Q${x + w / 2} ${y + w * .48} ${x + w / 2} ${y}Q${x} ${y + w * .2} ${x - w / 2} ${y}Z" fill="${F(k)}" ${OUT(k)}/><path d="M${x - w * .38} ${y + w * .14}Q${x} ${y + w * .3} ${x + w * .38} ${y + w * .14}" ${STITCH(k)}/>`;
  const bowl = (x, y, w, k, inner = '') => bowlBack(x, y, w, k) + inner + bowlFront(x, y, w, k);
  const lantern = (x, y, k, label, glow = false, s = 1, font = FONT) => G(x, y, s,
    (glow ? `<circle r="38" fill="url(#glow)"/>` : '') + `<path d="M0 -24V-46" stroke="${C.cocoa}" stroke-width="1.6"/>` + ell(0, 0, 19, 21, k) +
    `<path d="M-8 -19Q-14 0 -8 19M8 -19Q14 0 8 19" fill="none" stroke="${lt(col(k), .5)}" stroke-width="1.4"/>` + rr(-10, -25, 20, 7, 3, 'cocoa', false) + rr(-7, 18, 14, 6, 3, 'cocoa', false) +
    `<path d="M0 24v8" stroke="${C.rose}" stroke-width="2.4" stroke-linecap="round"/>` + txt(0, 1, label, 19, C.ink, 700, font));
  const bubble = (x, y, r, label = '', pop = false) => pop ? G(x, y, 1, [0, 60, 120, 180, 240, 300].map(a => sparkle(Math.cos(a * Math.PI / 180) * r, Math.sin(a * Math.PI / 180) * r, .7, '#BDE6FF')).join('') + txt(0, 0, label, r, C.ink)) :
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#D6EEFF" fill-opacity=".55" stroke="#fff" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${C.lilac}" stroke-width="1" opacity=".7"/><path d="M${x - r * .6} ${y - r * .25}A${r * .65} ${r * .65} 0 0 1 ${x - r * .1} ${y - r * .62}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` + (label !== '' ? txt(x, y + 1, label, r * 1.05, C.ink) : '');
  const bead = (x, y, r, k) => circ(x, y, r, k, false) + `<circle cx="${x - r * .32}" cy="${y - r * .34}" r="${r * .22}" fill="#fff" opacity=".6"/>`;
  const bell = (x, y, k, s = 1, ring = false) => G(x, y, s, (ring ? `<circle r="30" fill="url(#glow)"/>` : '') + `<path d="M0 -22v-6" stroke="${C.cocoa}" stroke-width="2.4" stroke-linecap="round"/>` +
    pth('M-16 12Q-16 -20 0 -20Q16 -20 16 12L20 16H-20Z', k) + `<path d="M-12 6Q0 2 12 6" ${STITCH(k)}/>` + circ(0, 18, 4.5, 'honey', false) +
    (ring ? `<path d="M-24 -12q-6 8 0 16M24 -12q6 8 0 16" fill="none" stroke="${C.honey}" stroke-width="2" stroke-linecap="round"/>` : ''));
  const cookie = (x, y, r = 12) => circ(x, y, r, 'honey', r > 9) + [[-.4, -.3], [.35, -.2], [0, .35], [-.35, .3], [.45, .4]].map(([a, b]) => `<circle cx="${x + a * r}" cy="${y + b * r}" r="${r * .11}" fill="${C.cocoa}"/>`).join('');
  function sock(x, y, k, pat = 'stripe', s = 1, flip = false) {
    const d = 'M-9 -24H9V2Q9 8 15 9H22Q30 9 30 18Q30 27 21 27H-1Q-9 27 -9 17Z';
    let p = '';
    if (pat === 'stripe') p = [-12, -4, 4].map(yy => `<path d="M-9 ${yy}H9" stroke="${lt(col(k), .6)}" stroke-width="3"/>`).join('');
    if (pat === 'dot') p = [[-3, -12], [4, -4], [-3, 4], [10, 18], [18, 15], [2, 18]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.2" fill="${lt(col(k), .6)}"/>`).join('');
    if (pat === 'heart') p = [[0, -10], [0, 4], [14, 18]].map(([a, b]) => `<path d="${heartPath(a, b, 3.6)}" fill="${lt(col(k), .65)}"/>`).join('');
    return G(x, y, s, `<g ${flip ? 'transform="scale(-1 1)"' : ''}>${pth(d, k)}${p}${rr(-10, -29, 20, 8, 3, lt(col(k), .45), false)}</g>`);
  }
  const cloud = (x, y, s = 1, k = 'cloud') => G(x, y, s, blob([[-16, 4, 11], [0, -3, 14], [16, 4, 11], [0, 7, 10]], k));
  const sun = (x, y, r = 18, m = 'happy') => G(x, y, 1, Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${(Math.cos(a) * (r + 5)).toFixed(1)} ${(Math.sin(a) * (r + 5)).toFixed(1)}L${(Math.cos(a) * (r + 11)).toFixed(1)} ${(Math.sin(a) * (r + 11)).toFixed(1)}" stroke="${C.honey}" stroke-width="4" stroke-linecap="round"/>`; }).join('') + circ(0, 0, r, 'butter') + face(0, 0, r / 22, m));
  const moon = (x, y, r = 16) => `<path d="M${x} ${y - r}A${r} ${r} 0 0 0 ${x} ${y + r}A${r * .55} ${r} 0 0 1 ${x} ${y - r}Z" fill="url(#r-butter)" ${OUT('butter')}/>`;
  const drop = (x, y, s = 1) => G(x, y, s, `<path d="M0 -8Q6 0 6 3A6 6 0 0 1 -6 3Q-6 0 0 -8Z" fill="url(#r-sky)" ${OUT('sky')}/>`);
  const tree = (x, y, s = 1) => G(x, y, s, shadow(0, 2, 26) + rr(-6, -26, 12, 28, 5, 'brown', false) + blob([[-16, -40, 16], [16, -40, 16], [0, -54, 20], [0, -34, 16]], 'sage'));
  const flower = (x, y, k = 'blush', s = 1, stem = true) => G(x, y, s, (stem ? `<path d="M0 6V30" stroke="${dk(C.grass, .2)}" stroke-width="3" stroke-linecap="round"/>` + ell(6, 22, 6, 3, 'grass', -30, false) : '') +
    [0, 72, 144, 216, 288].map(a => ell(Math.cos((a - 90) * Math.PI / 180) * 8, Math.sin((a - 90) * Math.PI / 180) * 8, 6, 6, k, 0, false)).join('') + circ(0, 0, 5.5, 'butter', false));
  const bush = (x, y, s = 1) => G(x, y, s, blob([[-18, 0, 14], [0, -8, 17], [18, 0, 14]], 'grass'));
  const grassTuft = (x, y, s = 1) => `<path d="M${x - 6 * s} ${y}q${2 * s} ${-8 * s} ${4 * s} ${-10 * s}M${x} ${y}q0 ${-8 * s} ${1 * s} ${-12 * s}M${x + 6 * s} ${y}q${-2 * s} ${-8 * s} ${-3 * s} ${-10 * s}" fill="none" stroke="${dk(C.grass, .2)}" stroke-width="${1.8 * s}" stroke-linecap="round"/>`;
  const hand = (x, y, s = 1, r = -15) => G(x, y, s, `<g filter="url(#lift)">` + rr(-4.5, -24, 9, 24, 4.5, 'cream', false) + rr(-11, -6, 24, 19, 9, 'cream', false) + ell(-11, 3, 4.5, 6.5, 'cream', -20, false) + `<path d="M-1 -6v4M5 -6v4" stroke="${dk(C.cream, .3)}" stroke-width="1.2" stroke-linecap="round"/></g>` + `<circle cx="0" cy="-27" r="6" fill="none" stroke="#fff" stroke-width="2" opacity=".9"/>`, r);
  const pillowShape = (x, y, w, h, k, st = true) => rr(x, y, w, h, Math.min(w, h) * .32, k, st) + [[x + 3, y + 3], [x + w - 3, y + 3], [x + 3, y + h - 3], [x + w - 3, y + h - 3]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3" fill="${dk(col(k), .12)}"/>`).join('');
  const zzz = (x, y, s = 1, c = C.lav) => txt(x, y, 'z', 11 * s, c, 700, `'Itim',${FONT}`) + txt(x + 8 * s, y - 9 * s, 'z', 8 * s, c, 700, `'Itim',${FONT}`) + txt(x + 14 * s, y - 16 * s, 'z', 6 * s, c, 700, `'Itim',${FONT}`);
  function badge(x, y, sz, k, icon, sleeping = false) {
    return G(x, y, 1, `<g filter="url(#lift)">${pillowShape(-sz / 2, -sz / 2, sz, sz, k)}</g>` + icon +
      (sleeping ? `<path d="M${-sz / 2 + 1} ${sz * .06}Q0 ${-sz * .08} ${sz / 2 - 1} ${sz * .06}V${sz / 2 - sz * .3}Q${sz / 2 - 1} ${sz / 2 - 1} ${sz / 2 - sz * .3} ${sz / 2 - 1}H${-sz / 2 + sz * .3}Q${-sz / 2 + 1} ${sz / 2 - 1} ${-sz / 2 + 1} ${sz / 2 - sz * .3}Z" fill="url(#plaid)" stroke="${dk(C.lilac, .3)}" stroke-width="1.6"/>` + zzz(sz * .28, -sz * .3, sz / 50) : ''));
  }
  const ICON = {
    home: c => `<path d="M-7 1L0 -6L7 1M-5 -1V7H5V-1" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    back: c => `<path d="M3 -6L-4 0L3 6" fill="none" stroke="${c}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    sound: c => `<path d="M-8 -3H-4L1 -7V7L-4 3H-8Z" fill="${c}"/><path d="M4 -4Q7 0 4 4M6.5 -7Q11 0 6.5 7" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`,
    key: c => `<circle cx="-3" cy="0" r="4.5" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M1.5 0H8M5.5 0V3.5M8 0V3" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`,
    book: c => `<path d="M0 -5Q-4 -8 -9 -6V6Q-4 4 0 7Q4 4 9 6V-6Q4 -8 0 -5ZM0 -5V7" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>`,
    check: c => `<path d="M-6 0L-2 4L6 -5" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    play: c => `<path d="M-3 -6L6 0L-3 6Z" fill="${c}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>`,
    replay: c => `<path d="M5 -4A7 7 0 1 0 6 3" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/><path d="M6 -8V-3H1" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`
  };
  const btn = (x, y, r, k, icon, s = r / 13) => `<g filter="url(#lift)">${circ(x, y, r, k)}</g>` + G(x, y, s, ICON[icon](C.ink));
  const sticker = (x, y, r, inner, k = 'cloud') => `<g filter="url(#lift)">${circ(x, y, r, k)}</g>` + inner;
  const ball = (x, y, r = 12) => circ(x, y, r, 'rose', false) + `<path d="M${x - r} ${y}Q${x} ${y - r * .5} ${x + r} ${y}M${x - r * .7} ${y + r * .7}Q${x} ${y + r * .2} ${x + r * .7} ${y + r * .7}" fill="none" stroke="${C.cream}" stroke-width="${r * .22}"/>`;
  const apple = (x, y, r = 12) => circ(x, y, r, 'coral', false) + `<path d="M${x} ${y - r}q1 -5 4 -6" stroke="${C.cocoa}" stroke-width="2" fill="none" stroke-linecap="round"/>` + ell(x + 5, y - r - 2, 4.5, 2.2, 'sage', -20, false) + `<circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .2}" fill="#fff" opacity=".55"/>`;
  const bee = (x, y, s = 1) => G(x, y, s, ell(-3, -10, 6, 8, 'powder', -20, false) + ell(5, -10, 6, 8, 'powder', 20, false) + ell(0, 0, 13, 10, 'butter', 0, false) +
    `<path d="M-3 -9.5V9.5M4 -9V9" stroke="${C.ink}" stroke-width="3" opacity=".75"/>` + `<circle cx="9" cy="-2" r="1.6" fill="${C.ink}"/>`);
  const moonIcon = (x, y, r = 12) => moon(x, y, r);
  const egg = (x, y, s = 1) => G(x, y, s, ell(0, 0, 9, 12, 'cream'));
  const flourBag = (x, y, s = 1) => G(x, y, s, pth('M-12 -10L-9 -18H9L12 -10V16Q12 18 10 18H-10Q-12 18 -12 16Z', 'oat') + `<path d="M-9 -18Q0 -13 9 -18" fill="none" stroke="${dk(C.oat, .3)}" stroke-width="1.4"/>` + G(0, 4, .5, ICON_FLOWER()));
  function ICON_FLOWER() { return [0, 72, 144, 216, 288].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * 8).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 8).toFixed(1)}" r="6" fill="${C.blush}"/>`).join('') + `<circle r="5" fill="${C.butter}"/>`; }
  const spoon = (x, y, s = 1, r = -30) => G(x, y, s, rr(-2, -4, 4, 26, 2, 'brown', false) + ell(0, -10, 6, 8, 'brown', 0, false), r);
  const umbrella = (x, y, k = 'rose', s = 1) => G(x, y, s, `<path d="M0 -14V14Q0 19 -5 19" fill="none" stroke="${C.cocoa}" stroke-width="2.6" stroke-linecap="round"/>` + pth('M-24 -10Q-22 -32 0 -33Q22 -32 24 -10Q18 -15 12 -10Q6 -15 0 -10Q-6 -15 -12 -10Q-18 -15 -24 -10Z', k));
  const raincoat = (x, y, k = 'butter', s = 1) => G(x, y, s, pth('M-10 -20Q0 -26 10 -20L22 -6L16 0L12 -6V24H-12V-6L-16 0L-22 -6Z', k) + `<path d="M0 -20V24" stroke="${dk(col(k), .25)}" stroke-width="1.4"/>` + [-8, 2, 12].map(yy => `<circle cx="3" cy="${yy}" r="1.6" fill="${C.cocoa}"/>`).join(''));
  const sunglasses = (x, y, s = 1) => G(x, y, s, `<path d="M-6 0H6" stroke="${C.ink}" stroke-width="2"/>` + rr(-20, -6, 15, 11, 5, 'night', false) + rr(5, -6, 15, 11, 5, 'night', false));
  const scarf = (x, y, k = 'mint', s = 1) => G(x, y, s, pth('M-20 -6Q0 4 20 -6V4Q0 14 -20 4Z', k) + rr(6, 2, 9, 22, 3, k, false));
  const boots = (x, y, k = 'berry', s = 1) => G(x, y, s, pth('M-16 -14H-6V6H-2V12H-18V-14Z', k) + pth('M4 -14H14V6H18V12H2V-14Z', k));
  const sunhat = (x, y, k = 'oat', s = 1) => G(x, y, s, ell(0, 4, 24, 6, k, 0, false) + pth('M-12 4Q-12 -12 0 -12Q12 -12 12 4Z', k) + `<path d="M-12 0Q0 4 12 0" stroke="${C.rose}" stroke-width="3" fill="none"/>`);
  const iceCream = (x, y, s = 1, r = 0) => G(x, y, s, pth('M-8 0L0 22L8 0Z', 'honey') + `<path d="M-5 5L3 12M0 3L5 8" stroke="${dk(C.honey, .3)}" stroke-width="1"/>` + circ(0, -5, 10, 'blush', false), r);
  const notes = (x, y, s = 1, c = C.lav) => G(x, y, s, `<path d="M0 0V-14L10 -17V-3" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/><ellipse cx="-3" cy="1" rx="4" ry="3" fill="${c}"/><ellipse cx="7" cy="-2" rx="4" ry="3" fill="${c}"/>`);
  const paintPot = (x, y, k, s = 1) => G(x, y, s, ell(0, -10, 14, 4.5, dk(col(k), .05), 0, false) + pth('M-14 -10V10Q-14 16 0 16Q14 16 14 10V-10Q0 -5 -14 -10Z', 'cream') + `<path d="M-14 -4Q0 1 14 -4V2Q0 7 -14 2Z" fill="${col(k)}"/>` + ell(0, -10, 11, 3, k, 0, false));
  const teddy = (x, y, s = 1, k = 'brown') => G(x, y, s, circ(-10, -14, 6, k, false) + circ(10, -14, 6, k, false) + ell(0, 10, 13, 12, k, 0, false) + circ(0, -4, 13, k, false) + ell(0, 0, 5.5, 4, 'oat', 0, false) + `<circle cx="-4.5" cy="-6" r="1.6" fill="${C.ink}"/><circle cx="4.5" cy="-6" r="1.6" fill="${C.ink}"/>`);
  const tub = (x, y, w = 120) => rr(x - w / 2, y, w, 34, 16, 'powder') + `<path d="M${x - w / 2 + 14} ${y + 34}v8M${x + w / 2 - 14} ${y + 34}v8" stroke="${C.honey}" stroke-width="5" stroke-linecap="round"/>`;
  const plate = (x, y, w = 50) => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${w * .22}" fill="#fff" stroke="${C.lilac}" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="${w * .36}" ry="${w * .15}" fill="none" ${STITCH('lilac')}/>`;
  const card = (x, y, w, h, k, inner = '') => `<g filter="url(#lift)">${pillowShape(x, y, w, h, k)}</g>` + inner;
  const cardBack = (x, y, w, h, k = 'mint') => card(x, y, w, h, k, `<path d="${starPath(x + w / 2, y + h / 2 + 1, w * .2, w * .1)}" fill="none" stroke="${lt(col(k), .65)}" stroke-width="1.6" stroke-dasharray="2.4 2.4" stroke-linejoin="round"/>`);

  // ---- grounds ----
  function bg(t = 'meadow') {
    if (t === 'room' || t === 'kitchen') return `<rect width="400" height="200" fill="url(#wall)"/><rect width="400" height="200" fill="url(#dots)"/>` +
      `<rect y="150" width="400" height="50" fill="${t === 'kitchen' ? '#FFD7A8' : '#F5B97E'}"/><path d="M0 150H400" stroke="${dk('#F5B97E', .18)}" stroke-width="2"/>` +
      [0, 80, 160, 240, 320].map(x => `<path d="M${x + 20} 152V200" stroke="${dk('#F5B97E', .1)}" stroke-width="1.2"/>`).join('') +
      (t === 'kitchen' ? `<rect x="0" y="118" width="400" height="34" fill="#FFE6C6"/><path d="M0 118H400" stroke="${dk('#FFE6C6', .2)}" stroke-width="2"/>` : '');
    const sky = t === 'night' ? 'url(#nightsky)' : t === 'dusk' ? 'url(#dusk)' : 'url(#sky)';
    const h1 = t === 'night' ? '#5C6FC4' : '#9BE07F', h2 = t === 'night' ? '#4C8F9E' : C.grass;
    let s = `<rect width="400" height="200" fill="${sky}"/>`;
    if (t === 'night') s += [[40, 30], [90, 18], [150, 40], [250, 22], [320, 44], [370, 16], [210, 52]].map(([x, y], i) => sparkle(x, y, .45 + (i % 3) * .15, '#FFF08A')).join('');
    else s += cloud(70, 34, .75) + cloud(330, 26, .6);
    s += `<path d="M0 118Q100 92 200 112T400 102V200H0Z" fill="${h1}"/><path d="M0 150Q120 128 240 146T400 138V200H0Z" fill="${h2}"/>`;
    if (t !== 'night') s += grassTuft(30, 170) + grassTuft(370, 165, .9) + grassTuft(250, 185, .8);
    return s;
  }
  const hud = (n = 2, of = 5) => btn(22, 22, 14, 'cream', 'home') + Array.from({ length: of }, (_, i) =>
    `<circle cx="${200 + (i - (of - 1) / 2) * 15}" cy="17" r="5.2" fill="${i < n ? C.rose : '#fff'}" stroke="${i < n ? dk(C.rose, .25) : C.lilac}" stroke-width="1.6"/>`).join('');

  return { C, lt, dk, mix, defs, shadow, circ, ell, rr, pth, blob, txt, sparkle, dashLine, starPath, heartPath, shapePath, shp, hole, face, char, CHARS, G,
    berry, bowl, bowlBack, bowlFront, lantern, bubble, bead, bell, cookie, sock, cloud, sun, moon, drop, tree, flower, bush, grassTuft, hand, pillowShape, badge, btn, ICON, sticker,
    ball, apple, bee, moonIcon, egg, flourBag, spoon, umbrella, raincoat, sunglasses, scarf, boots, sunhat, iceCream, notes, paintPot, teddy, tub, plate, card, cardBack, zzz, bg, hud, FONT };
})();
