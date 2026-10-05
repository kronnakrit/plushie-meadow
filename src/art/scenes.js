// Ported from design/scenes.js. ---- Plushie Meadow screens: every scene is drawn in a 400x200 landscape space ----
import { ART } from './art.js';

export const SCENES = (() => {
  const A = ART, C = A.C, { txt, char, G } = A;
  const tl = (x, y, s, size, fill = C.ink, w = 600, font = `'Mali',${A.FONT}`) => `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${w}" fill="${fill}" dominant-baseline="central">${s}</text>`;
  const ITIM = `'Itim',${A.FONT}`;
  const speech = (x, y, w, h, inner, tail = 'left') => `<g filter="url(#lift)">${A.pillowShape(x, y, w, h, 'cream')}<path d="M${tail === 'left' ? x + 10 : x + w - 18} ${y + h - 2}l${tail === 'left' ? -6 : 6} 10l12 -10Z" fill="${C.cream}"/></g>` + inner;

  // ---- hub houses ----
  const burrow = (x, y) => `<path d="M${x - 36} ${y}Q${x - 36} ${y - 42} ${x} ${y - 42}Q${x + 36} ${y - 42} ${x + 36} ${y}Z" fill="#5DC24E" stroke="${A.dk('#5DC24E', .3)}" stroke-width="2"/>` +
    `<path d="M${x - 28} ${y - 4}Q${x - 28} ${y - 34} ${x} ${y - 35}Q${x + 28} ${y - 34} ${x + 28} ${y - 4}" fill="none" stroke="${A.lt('#5DC24E', .5)}" stroke-width="1.3" stroke-dasharray="2.6 2.8"/>` +
    `<path d="M${x - 11} ${y}V${y - 13}A11 11 0 0 1 ${x + 11} ${y - 13}V${y}Z" fill="url(#r-brown)" stroke="${A.dk(C.brown, .3)}" stroke-width="2"/><circle cx="${x + 6}" cy="${y - 8}" r="1.6" fill="${C.honey}"/>` +
    A.berry(x - 14, y - 40, .8) + A.berry(x, y - 44, .8) + A.berry(x + 13, y - 40, .8);
  const letterTree = (x, y) => A.shadow(x, y + 1, 34) + A.rr(x - 13, y - 40, 26, 40, 6, 'brown', false) + `<path d="M${x - 8} ${y}V${y - 12}A8 8 0 0 1 ${x + 8} ${y - 12}V${y}Z" fill="${C.cocoa}"/>` +
    A.blob([[x - 24, y - 54, 20], [x + 24, y - 54, 20], [x, y - 72, 25], [x, y - 46, 18]], 'sage') + A.lantern(x + 30, y - 22, 'butter', 'A', true, .42);
  const nest = (x, y) => [[C.rose, 40], [C.butter, 35], [C.sky, 30]].map(([c, r]) => `<path d="M${x - r} ${y - 58}A${r} ${r} 0 0 1 ${x + r} ${y - 58}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".8"/>`).join('') +
    A.rr(x - 3, y - 34, 6, 34, 3, 'brown', false) + A.rr(x - 18, y - 64, 36, 32, 6, 'butter') + A.pth(`M${x - 24} ${y - 60}L${x} ${y - 82}L${x + 24} ${y - 60}Z`, 'rose') + `<circle cx="${x}" cy="${y - 49}" r="6" fill="${C.cocoa}"/>`;
  const pondHut = (x, y) => A.ell(x - 10, y - 6, 34, 10, 'sky', 0, false) + A.ell(x - 24, y - 7, 7, 2.6, 'grass', 0, false) + A.ell(x - 4, y - 4, 6, 2.2, 'grass', 0, false) +
    A.pth(`M${x + 8} ${y - 4}A17 17 0 0 1 ${x + 42} ${y - 4}Z`, 'powder') + `<path d="M${x + 20} ${y - 4}V${y - 12}A5 5 0 0 1 ${x + 30} ${y - 12}V${y - 4}Z" fill="${C.cocoa}"/>`;
  const mushroom = (x, y) => A.shadow(x, y + 1, 30) + A.rr(x - 12, y - 26, 24, 26, 8, 'cream', false) + `<path d="M${x - 6} ${y}V${y - 9}A6 6 0 0 1 ${x + 6} ${y - 9}V${y}Z" fill="${C.cocoa}"/>` +
    A.pth(`M${x - 31} ${y - 22}Q${x - 31} ${y - 58} ${x} ${y - 58}Q${x + 31} ${y - 58} ${x + 31} ${y - 22}Q${x} ${y - 14} ${x - 31} ${y - 22}Z`, 'rose') +
    [[-16, -34, 4], [2, -46, 5], [16, -30, 3.5], [-2, -28, 3]].map(([a, b, r]) => `<circle cx="${x + a}" cy="${y + b}" r="${r}" fill="${C.cream}"/>`).join('');
  const cottage = (x, y, wrapped = true) => A.shadow(x, y + 1, 34) + A.rr(x - 26, y - 34, 52, 34, 4, 'oat', false) + A.pth(`M${x - 32} ${y - 30}L${x} ${y - 58}L${x + 32} ${y - 30}Z`, 'lilac') +
    `<path d="${A.heartPath(x - 12, y - 20, 6)}" fill="${C.blush}" stroke="${A.dk(C.blush, .3)}" stroke-width="1.4"/><path d="M${x + 6} ${y}V${y - 14}A6 6 0 0 1 ${x + 18} ${y - 14}V${y}Z" fill="${C.cocoa}"/>` +
    (wrapped ? `<rect x="${x - 4}" y="${y - 52}" width="8" height="52" fill="${C.rose}" opacity=".9"/>` + A.ell(x - 8, y - 54, 8, 5, 'rose', -20, false) + A.ell(x + 8, y - 54, 8, 5, 'rose', 20, false) + `<circle cx="${x}" cy="${y - 54}" r="3.4" fill="${A.dk(C.rose, .15)}"/>` + A.zzz(x + 30, y - 52, 1.1) : '');
  const stones = pts => pts.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="2.6" fill="#FFE0B0" stroke="${A.dk('#FFE0B0', .2)}" stroke-width="1"/>`).join('');

  const S = {};
  S.hub = () => A.bg('meadow') + stones([[178, 168], [160, 160], [140, 152], [222, 168], [240, 160], [262, 158], [200, 128], [196, 120]]) +
    burrow(60, 114) + letterTree(150, 106) + nest(252, 108) + pondHut(330, 116) + mushroom(96, 182) + cottage(306, 184) +
    char('mallow', 200, 150, .6, 'joy') + A.btn(22, 22, 14, 'butter', 'book') + A.btn(380, 20, 10, 'cream', 'key');

  const icons = {
    berry: () => A.berry(-7, 4) + A.berry(7, 4) + A.berry(0, -7),
    sort: () => A.shp('circle', -9, 6, 6.5, 'rose') + A.shp('triangle', 9, 6, 6.5, 'butter') + A.shp('square', 0, -8, 6.5, 'sky'),
    lantern: () => A.lantern(0, 5, 'butter', 'A', false, .55),
    pairs: () => A.pillowShape(-15, -11, 13, 20, 'mint', false) + A.pillowShape(2, -11, 13, 20, 'mint', false) + `<path d="${A.heartPath(-8.5, -1, 3.6)}" fill="${C.rose}"/><path d="${A.heartPath(8.5, -1, 3.6)}" fill="${C.rose}"/>`,
    trace: () => `<path d="M-16 8Q-8 -10 0 4T16 -6" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-dasharray="1 5" stroke-linecap="round" opacity=".6"/>` + char('shelly', 10, -2, .2),
    bubbles: () => A.bubble(0, 0, 14, '7'),
    picnic: () => A.cookie(-11, 0, 7) + txt(0, 0, '+', 13, C.berry) + A.cookie(11, 0, 7),
    biglittle: () => A.teddy(-7, 2, .75) + A.teddy(11, 7, .45),
    sound: () => A.ball(-8, 5, 7.5) + A.bee(8, -4, .7),
    wool: () => `<path d="M0 -13L-10 12M0 -13L10 12M-6 3H6" fill="none" stroke="${C.rose}" stroke-width="3.6" stroke-linecap="round"/>`,
    paint: () => A.paintPot(-9, 3, 'rose', .55) + A.paintPot(9, 3, 'sky', .55),
    beads: () => [-12, -4, 4, 12].map((x, i) => A.bead(x, 2 + Math.abs(x) * .2, 4.4, i % 2 ? 'sky' : 'rose')).join(''),
    shadow: () => `<g filter="url(#sil)">${char('pip', 0, 0, .28)}</g>`,
    quilt: () => [['blush', -10, -10], ['butter', 1, -10], ['sky', -10, 1], ['mint', 1, 1]].map(([k, x, y]) => A.rr(x, y, 10, 10, 2, k, false)).join(''),
    socks: () => A.sock(-2, 2, 'sky', 'stripe', .5),
    bells: () => A.bell(0, 2, 'butter', .62),
    dots: () => `<path d="${A.starPath(0, 1, 13, 6)}" fill="none" stroke="${C.honey}" stroke-width="1.6" stroke-dasharray="2 2"/>` + [0, 2, 4, 6, 8].map(i => { const a = -Math.PI / 2 + i * Math.PI / 5; return `<circle cx="${(13 * Math.cos(a)).toFixed(1)}" cy="${(1 + 13 * Math.sin(a)).toFixed(1)}" r="2.4" fill="${C.ink}"/>`; }).join(''),
    feelings: () => A.circ(0, 0, 13, 'butter', false) + A.face(0, -1, .7, 'joy'),
    baker: () => A.cookie(0, 0, 12),
    weather: () => A.umbrella(0, 4, 'rose', .55)
  };
  S.icon = id => icons[id]();

  S.burrow = () => A.bg('room') + char('tumble', 64, 132, .95, 'joy') + A.rr(122, 124, 262, 9, 4, 'brown', false) + `<path d="M140 133v40M366 133v40" stroke="${C.cocoa}" stroke-width="5" stroke-linecap="round"/>` +
    [['berry', false], ['bubbles', true], ['picnic', true], ['biglittle', true]].map(([id, z], i) => A.badge(158 + i * 64, 96, 52, ['mint', 'powder', 'blush', 'butter'][i], G(0, 0, 1.25, S.icon(id)), z)).join('') +
    A.sparkle(140, 62, .8) + A.btn(22, 22, 14, 'cream', 'back');

  S.berry = () => A.bg('meadow') + A.bush(328, 140, 1.7) + [[306, 124], [328, 112], [350, 122], [318, 140], [342, 138]].map(([x, y]) => A.berry(x, y, 1.15)).join('') +
    char('tumble', 104, 128, 1, 'happy') + speech(76, 30, 70, 46, txt(98, 54, '3', 28) + [42, 54, 66].map(y => `<circle cx="${128}" cy="${y}" r="4.4" fill="${C.berry}"/>`).join('')) +
    A.dashLine('M312 122Q262 84 214 136', C.ink, 2.6) + A.bowl(205, 150, 74, 'sky', A.berry(194, 150) + A.berry(214, 151)) +
    txt(194, 128, '1', 13, C.lav) + txt(214, 128, '2', 13, C.lav) + A.berry(258, 104, 1.15) + A.hand(266, 132, .9, -10) + A.hud(2);

  S.sort = () => {
    const holes = [['circle', 192], ['square', 228], ['triangle', 264]].map(([t, x]) => `<g transform="translate(${x} 110) scale(1 .6)">${A.hole(t, 0, 0, 10)}</g>`).join('');
    return A.bg('room') + char('pip', 60, 130, .8, 'wow') + A.shadow(225, 172, 80) +
      `<path d="M150 122L172 96H306L284 122Z" fill="${A.lt(C.lilac, .3)}" stroke="${A.dk(C.lilac, .3)}" stroke-width="2" stroke-linejoin="round"/><path d="M284 122L306 96V146L284 172Z" fill="${A.dk(C.lilac, .1)}" stroke="${A.dk(C.lilac, .3)}" stroke-width="2" stroke-linejoin="round"/>` +
      A.rr(150, 122, 134, 50, 8, 'lilac') + holes + `<path d="${A.heartPath(217, 146, 9)}" fill="${C.blush}" opacity=".9"/>` +
      `<g filter="url(#lift)">${A.shp('circle', 112, 170, 12, 'rose')}${A.shp('square', 336, 172, 12, 'sky')}${A.shp('star', 364, 140, 12, 'mint')}</g>` +
      `<g filter="url(#lift)">${A.shp('triangle', 262, 70, 13, 'butter')}</g>` + A.hand(272, 98, .9, -10) + A.dashLine('M262 84V100', C.ink, 2.4) + A.hud(3);
  };

  S.lantern = () => A.bg('dusk') + `<path d="M0 52Q200 92 400 52" fill="none" stroke="${C.cocoa}" stroke-width="2"/>` +
    A.lantern(130, 116, 'blush', 'M') + A.lantern(210, 118, 'butter', 'B', true) + A.lantern(290, 114, 'mint', 'S') +
    A.sparkle(240, 92, .7) + A.sparkle(184, 100, .5) + char('hoot', 52, 140, .78, 'happy') +
    speech(70, 66, 40, 28, G(90, 80, 1, A.ICON.sound(C.ink))) + A.hand(222, 168, .9, -8) + A.hud(1);

  S.pairs = () => {
    const x0 = 128, ys = [40, 104], w = 46, h = 54, gap = 12, face = (n, i, j) => A.card(x0 + i * (w + gap), ys[j], w, h, 'cream', char(n, x0 + i * (w + gap) + w / 2, ys[j] + 28, .3, 'joy'));
    let s = A.bg('room') + char('kiki', 54, 142, .72, 'think');
    const grid = [['b', 'pip', 'b', 'tumble'], ['pip', 'b', 'b', 'b']];
    grid.forEach((row, j) => row.forEach((n, i) => { s += n === 'b' ? A.cardBack(x0 + i * (w + gap), ys[j], w, h, ['mint', 'blush', 'sky', 'butter'][(i + j) % 4]) : face(n, i, j); }));
    return s + A.sparkle(x0 + w + gap + w + 4, 38, .8) + A.sparkle(x0 - 6, 104, .7) + `<path d="${A.heartPath(x0 + 52, 98, 7)}" fill="${C.rose}" stroke="${A.dk(C.rose, .3)}" stroke-width="1.2"/>` + A.hud(2);
  };

  S.trace = () => {
    const d = 'M60 150C110 70 170 190 230 120S330 70 350 80';
    return A.bg('meadow') + `<path d="${d}" fill="none" stroke="#FFF6E5" stroke-width="20" stroke-linecap="round" opacity=".75"/>` + A.dashLine(d, C.ink, 4) +
      `<path d="M60 150C110 70 170 190 230 120" fill="none" stroke="${A.lt(C.mint, .1)}" stroke-width="7" stroke-linecap="round"/>` +
      `<circle cx="60" cy="150" r="7" fill="${C.sage}" stroke="#fff" stroke-width="2"/><circle cx="356" cy="76" r="26" fill="url(#glow)"/>` + A.flower(356, 74, 'blush', 1.2) +
      A.sparkle(150, 120, .6) + A.sparkle(100, 104, .5) + char('shelly', 234, 112, .42, 'joy') + A.hand(246, 144, .85, -8) + A.hud(3);
  };

  S.bubbles = () => A.bg('room') + char('tumble', 200, 126, .72, 'happy') + A.tub(200, 140, 160) + A.blob([[140, 142, 10], [160, 138, 12], [184, 140, 10], [220, 139, 11], [244, 141, 10], [262, 143, 8]], 'cloud') +
    speech(232, 82, 34, 28, txt(249, 96, '7', 20), 'left') +
    A.bubble(84, 74, 18, '3') + A.bubble(150, 54, 19, '7', true) + A.bubble(306, 56, 17, '5') + A.bubble(340, 116, 15, '9') + A.bubble(108, 128, 14, '2') + A.bubble(300, 160, 12, '4') + A.hand(160, 90, .85, -10) + A.hud(2);

  S.picnic = () => A.bg('meadow') + `<path d="M70 192L106 132H322L352 192Z" fill="url(#gingham)" stroke="${A.dk('#FF7FA8', .3)}" stroke-width="2" stroke-linejoin="round"/>` +
    char('tumble', 52, 126, .62, 'happy') + char('pip', 356, 130, .55, 'think') + A.plate(150, 160, 70) + A.cookie(140, 156, 11) + A.cookie(162, 158, 11) + txt(206, 158, '+', 26, C.berry) + A.plate(258, 160, 70) + A.cookie(258, 156, 11) +
    [['2', 150], ['3', 200], ['4', 250]].map(([n, x]) => A.badge(x, 70, 38, n === '3' ? 'butter' : 'cream', txt(0, 1, n, 22))).join('') + A.sparkle(222, 52, .6) + A.hand(208, 106, .8, -6) + A.hud(3);

  S.biglittle = () => A.bg('room') + [[96, 156, 44, 16, 'blush'], [168, 150, 62, 22, 'powder'], [258, 142, 86, 30, 'butter']].map(([x, y, w, h, k]) => `<g filter="url(#lift)">${A.pillowShape(x, y, w, h, k)}</g>`).join('') +
    A.teddy(118, 142, .62, 'peach') + A.teddy(199, 128, .9, 'honey') + A.dashLine('M300 100V128', C.ink, 2.4) + A.teddy(300, 76, 1.3, 'brown') + A.hand(316, 112, .85, -10) + char('tumble', 50, 132, .66, 'think') + A.hud(2);

  S.sound = () => A.bg('meadow') + char('hoot', 54, 136, .72, 'happy') + `<g filter="url(#lift)">${A.pillowShape(166, 26, 68, 54, 'butter')}</g>` + txt(200, 54, 'B<tspan font-size="24" dx="2">b</tspan>', 34) +
    A.btn(252, 42, 10, 'cream', 'sound') + A.bowl(200, 160, 86, 'honey', A.ball(190, 158, 11)) +
    A.apple(118, 104, 13) + A.moon(338, 70, 14) + A.bee(286, 112, 1.2) + A.hand(296, 140, .85, -10) + A.dashLine('M276 124Q250 142 222 152', C.ink, 2.4) + A.hud(2);

  S.wool = () => {
    const lanes = ['M200 46L160 156', 'M200 46L240 156', 'M176 114H224'];
    return A.bg('room') + `<g filter="url(#lift)">${A.rr(112, 26, 176, 150, 16, 'mint')}</g>` +
      lanes.map(d => `<path d="${d}" stroke="#FFF6E5" stroke-width="16" stroke-linecap="round" opacity=".8"/>`).join('') + lanes.map(d => A.dashLine(d, C.ink, 3.4)).join('') +
      `<path d="M200 46L160 156" stroke="${C.rose}" stroke-width="7" stroke-linecap="round"/><path d="M200 46L160 156" stroke="${A.lt(C.rose, .4)}" stroke-width="2" stroke-dasharray="3 4" stroke-linecap="round"/>` +
      `<path d="M200 46L220 101" stroke="${C.rose}" stroke-width="7" stroke-linecap="round"/>` +
      [['1', 188, 44], ['2', 212, 44], ['3', 166, 114]].map(([n, x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${C.sage}" stroke="#fff" stroke-width="1.6"/>` + txt(x, y + .5, n, 9, '#fff')).join('') +
      A.hand(226, 128, .85, -8) + char('hoot', 58, 140, .7, 'wow') + A.circ(338, 162, 14, 'rose', false) + `<path d="M326 156Q338 150 350 160M328 166Q340 160 350 168M332 150Q344 152 348 156" fill="none" stroke="${A.lt(C.rose, .45)}" stroke-width="1.6"/>` + A.hud(4);
  };

  S.paint = () => A.bg('room') + A.paintPot(80, 152, 'rose', 1.3) + txt(118, 152, '+', 22, C.ink) + A.paintPot(156, 152, 'butter', 1.3) +
    `<path d="M188 150H206" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" opacity=".6"/><path d="M200 144L208 150L200 156" fill="none" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>` +
    A.bowlBack(250, 144, 74, 'cream') + `<ellipse cx="250" cy="146" rx="31" ry="7" fill="${C.coral}"/>` + A.bowlFront(250, 144, 74, 'cream') +
    `<circle cx="320" cy="74" r="34" fill="url(#glow)"/>` + A.flower(320, 74, 'coral', 1.5) + A.sparkle(352, 48, .7) + char('pip', 356, 154, .5, 'joy') + A.hud(2);

  S.beads = () => {
    const q = t => [40 * (1 - t) ** 2 + 400 * t * (1 - t) + 360 * t * t, 104 * (1 - t) ** 2 + 340 * t * (1 - t) + 104 * t * t];
    let s = A.bg('room') + `<path d="M40 104Q200 170 360 104" fill="none" stroke="${C.cocoa}" stroke-width="2.4"/>`;
    ['rose', 'sky', 'rose', 'sky', 'rose'].forEach((k, i) => { const [x, y] = q(.16 + i * .12); s += A.bead(x, y, 11, k); });
    const [ex, ey] = q(.76);
    s += `<circle cx="${ex}" cy="${ey}" r="11" fill="#fff" fill-opacity=".5" stroke="${C.lav}" stroke-width="2" stroke-dasharray="3 3"/>` + txt(ex, ey + 1, '?', 13, C.lav);
    return s + `<g filter="url(#lift)">${A.rr(150, 166, 120, 30, 14, 'oat', false)}</g>` + A.bead(176, 181, 10, 'sky') + A.bead(210, 181, 10, 'butter') + A.bead(244, 181, 10, 'rose') +
      A.dashLine(`M182 166Q${ex - 30} ${ey + 30} ${ex - 12} ${ey + 12}`, C.ink, 2.4) + A.hand(186, 210, .85, -6) + char('pip', 36, 160, .45, 'think') + A.hud(3);
  };

  S.shadow = () => A.bg('room') + `<circle cx="372" cy="34" r="40" fill="url(#glow)"/>` + [['tumble', 110], ['hoot', 200], ['kiki', 290]].map(([n, x]) => `<g filter="url(#sil)" opacity=".75">${char(n, x, 82, .55, 'happy')}</g>`).join('') +
    A.sparkle(316, 52, .6) + char('kiki', 208, 160, .42, 'joy') + A.dashLine('M226 140Q262 120 280 110', C.ink, 2.4) + A.hand(220, 196, .8, -10) + A.hud(2);

  const quiltPic = () => `<rect x="160" y="40" width="120" height="120" fill="${C.powder}"/><path d="M160 126Q220 100 280 122V160H160Z" fill="${C.grass}"/>` + A.sun(250, 70, 12) +
    A.flower(178, 132, 'blush', .8) + char('pip', 216, 124, .42, 'joy');
  S.quilt = () => A.bg('room') + `<g filter="url(#lift)">${A.rr(150, 30, 140, 140, 12, 'lilac', false)}</g>` + quiltPic() +
    `<path d="M200 40V160M240 40V160M160 80H280M160 120H280" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 3" opacity=".9"/>` +
    `<rect x="200" y="80" width="40" height="40" fill="#FFF1DC" stroke="${C.lav}" stroke-width="2" stroke-dasharray="3 3"/>` +
    `<g transform="translate(130 22)" filter="url(#lift)"><g clip-path="url(#qcell)">${quiltPic()}</g><rect x="200" y="80" width="40" height="40" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/></g>` +
    A.hand(352, 146, .85, -10) + char('kiki', 66, 140, .72, 'think') + A.hud(2);

  S.socks = () => {
    const y = x => { const t = (x - 20) / 360; return 50 + 60 * t * (1 - t); };
    const hang = (x, k, p, s = .7) => A.sock(x, y(x) + 20, k, p, s) + `<rect x="${x - 3}" y="${y(x) - 6}" width="6" height="12" rx="2" fill="${C.brown}"/>`;
    return A.bg('meadow') + `<path d="M20 50Q200 80 380 50" fill="none" stroke="${C.cocoa}" stroke-width="2"/>` +
      hang(90, 'sky', 'stripe') + hang(124, 'sky', 'stripe') + A.sparkle(108, 98, .6) + hang(176, 'blush', 'dot') +
      `<path d="M204 ${y(210) + 2}h14v18q0 4 4 5h6q6 0 6 6t-6 6h-17q-7 0 -7 -7Z" fill="none" stroke="${C.lav}" stroke-width="2" stroke-dasharray="3 3"/>` +
      hang(272, 'butter', 'heart') + A.bowl(312, 160, 90, 'honey', A.sock(300, 150, 'butter', 'heart', .5, true) + A.sock(326, 152, 'mint', 'dot', .5)) +
      A.sock(222, 132, 'blush', 'dot', .7) + A.dashLine('M222 112V96', C.ink, 2.4) + A.hand(232, 168, .85, -8) + char('kiki', 52, 150, .62, 'happy') + A.hud(3);
  };

  S.bells = () => A.bg('meadow') + A.rr(108, 138, 194, 10, 4, 'brown', false) + `<path d="M120 148v30M290 148v30" stroke="${C.cocoa}" stroke-width="5" stroke-linecap="round"/>` +
    [['rose', 132], ['butter', 184], ['sage', 236], ['sky', 288]].map(([k, x], i) => A.bell(x, 110, k, 1.05, i === 1)).join('') +
    A.notes(206, 66, .9, C.lav) + A.notes(156, 58, .7, C.rose) + [[C.rose, 1], [C.butter, 1], [C.sky, 0], [C.butter, 0]].map(([c, on], i) => `<circle cx="${174 + i * 17}" cy="38" r="5.5" fill="${on ? c : '#fff'}" stroke="${c}" stroke-width="2"/>`).join('') +
    A.hand(194, 160, .85, -6) + char('kiki', 54, 140, .72, 'wow') + A.hud(1);

  S.dots = () => {
    const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 30 : 64; return [200 + r * Math.cos(a), 104 + r * Math.sin(a)]; });
    const solid = pts.slice(0, 6).map((p, i) => (i ? 'L' : 'M') + p.map(v => v.toFixed(1)).join(' ')).join('');
    const rest = pts.slice(5).concat([pts[0]]).map((p, i) => (i ? 'L' : 'M') + p.map(v => v.toFixed(1)).join(' ')).join('');
    return A.bg('night') + A.moon(354, 42, 16) + A.dashLine(rest, '#FFF08A', 2.6) + `<path d="${solid}" fill="none" stroke="#FFE14D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
      pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 6 ? 9 : 7}" fill="${i < 6 ? '#FFE14D' : '#fff'}" stroke="${i === 6 ? C.rose : A.dk('#FFE14D', .3)}" stroke-width="${i === 6 ? 2.4 : 1.4}"/>` + txt(x, y + .5, i + 1, i === 9 ? 7 : 8, C.ink)).join('') +
      A.hand(pts[5][0] + 6, pts[5][1] + 26, .8, -8) + char('shelly', 56, 160, .5, 'wow') + A.hud(3);
  };

  const facePillow = (x, y, m, k = 'cream') => `<g filter="url(#lift)">${A.circ(x, y, 22, k)}</g>` + A.face(x, y - 2, 1.05, m);
  S.feelings = () => A.bg('meadow') + char('mallow', 140, 124, .95, 'sad') + A.iceCream(206, 170, 1.1, 160) + `<ellipse cx="204" cy="184" rx="14" ry="4" fill="${C.blush}"/>` +
    facePillow(320, 52, 'joy') + facePillow(320, 106, 'sad', 'butter') + facePillow(320, 160, 'wow') + A.sparkle(348, 84, .6) + A.hand(336, 140, .8, -12) + A.hud(2);

  S.baker = () => {
    const hatX = 70, hatY = 92;
    return A.bg('kitchen') + [['flour', 140, true], ['egg', 190, false], ['spoon', 240, false], ['cookie', 290, false]].map(([k, x, done]) =>
      A.badge(x, 44, 36, done ? 'mint' : k === 'egg' ? 'butter' : 'cream', k === 'flour' ? A.flourBag(0, 0, .55) : k === 'egg' ? A.egg(0, 0, .8) : k === 'spoon' ? A.spoon(0, 2, .7) : A.cookie(0, 0, 10)) +
      (done ? A.G(x + 13, 31, .6, A.circ(0, 0, 8, 'sage', false) + A.ICON.check('#fff')) : '')).join('') +
      A.bowl(206, 128, 92, 'blush', A.blob([[194, 128, 9], [210, 126, 10], [222, 130, 7]], 'oat')) + A.flourBag(336, 128, .9) + A.egg(266, 82, 1) + A.hand(276, 112, .8, -10) +
      char('mallow', 70, 132, .85, 'joy') + A.blob([[hatX - 10, hatY - 6, 9], [hatX, hatY - 13, 11], [hatX + 10, hatY - 6, 9]], 'cloud') + A.rr(hatX - 12, hatY - 3, 24, 9, 3, 'cloud', false) + A.hud(3);
  };

  S.weather = () => A.bg('room') + `<g filter="url(#lift)">${A.rr(150, 20, 100, 72, 10, 'cloud', false)}</g><rect x="158" y="28" width="84" height="56" rx="6" fill="#8FA6D6"/>` +
    A.cloud(186, 46, .7, 'powder') + A.cloud(218, 52, .6, 'powder') + [[176, 66], [196, 72], [214, 66], [230, 74], [188, 80]].map(([x, y]) => A.drop(x, y, .7)).join('') + `<path d="M200 28V84M158 56H242" stroke="#fff" stroke-width="3"/>` +
    char('pip', 200, 146, .82, 'happy') + A.sunglasses(64, 82, 1) + A.sunhat(64, 146, 'oat', 1) + A.umbrella(338, 82, 'rose', 1) + A.boots(338, 154, 'berry', 1) +
    A.raincoat(276, 128, 'butter', 1) + A.hand(284, 168, .8, -8) + A.hud(2);

  S.stickers = () => {
    let s = A.bg('room') + `<g filter="url(#lift)">${A.rr(112, 22, 260, 166, 14, 'lilac')}</g>`;
    const ids = ['berry', 'sort', 'lantern', 'pairs', 'trace', 'bubbles', 'bells', 'feelings', 'baker', 'paint', 'socks'];
    const fills = ['#FFE8C2', '#FFD3E4', '#CDEBFF', '#FFF0A8'];
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) {
      const n = j * 6 + i, x = 126 + i * 40, y = 34 + j * 37;
      s += `<rect x="${x}" y="${y}" width="36" height="33" rx="5" fill="${fills[(i + j) % 4]}" stroke="${A.dk(C.lilac, .15)}" stroke-width="1"/>`;
      s += n < ids.length ? A.G(x + 18, y + 16.5, .62, A.circ(0, 0, 21, 'cloud', false) + S.icon(ids[n])) : `<circle cx="${x + 18}" cy="${y + 16.5}" r="11" fill="none" stroke="${A.dk(C.lilac, .15)}" stroke-width="1.4" stroke-dasharray="2.4 2.4"/>`;
    }
    return s + char('mallow', 58, 140, .8, 'joy') + A.G(60, 56, 1.1, A.circ(0, 0, 18, 'cloud') + A.G(0, 0, 1.2, S.icon('dots'))) + A.sparkle(84, 40, .7) + A.sparkle(38, 74, .5) + A.btn(22, 22, 14, 'cream', 'back');
  };

  S.gate = () => {
    let s = S.hub() + `<rect width="400" height="200" fill="#3A2B45" opacity=".5"/><g filter="url(#lift)">${A.rr(116, 14, 168, 176, 16, 'cream', false)}</g>` +
      txt(200, 32, 'For grown-ups', 13, C.ink, 400, ITIM) + txt(200, 50, 'Tap these numbers', 8.5, '#7A6E84', 500, `'Mali',${A.FONT}`) + txt(200, 64, 'seven · two · five', 12, C.berry, 700, `'Mali',${A.FONT}`) +
      [['7', 172], ['2', 200], ['', 228]].map(([n, x]) => `<rect x="${x - 11}" y="74" width="22" height="20" rx="5" fill="#fff" stroke="${n ? C.sage : C.lilac}" stroke-width="1.6"/>` + (n ? txt(x, 84.5, n, 12) : '')).join('');
    for (let i = 0; i < 9; i++) { const x = 170 + (i % 3) * 30, y = 112 + Math.floor(i / 3) * 25; s += `<circle cx="${x}" cy="${y}" r="10.5" fill="#fff" stroke="${C.lilac}" stroke-width="1.4"/>` + txt(x, y + .5, i + 1, 11); }
    return s + A.G(270, 28, .8, `<path d="M-5 -5L5 5M5 -5L-5 5" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>`);
  };

  S.paywall = () => {
    const paid = ['bubbles', 'picnic', 'biglittle', 'sound', 'wool', 'paint', 'beads', 'shadow', 'quilt', 'socks', 'bells', 'dots', 'feelings', 'baker', 'weather'];
    const ks = ['mint', 'blush', 'powder', 'butter', 'lilac'];
    return `<rect width="400" height="200" fill="#FFF6E5"/><rect width="400" height="200" fill="url(#dots)" opacity=".6"/>` + char('mallow', 74, 128, .92, 'joy') + A.sparkle(40, 50, .7) + A.sparkle(112, 44, .5) +
      txt(258, 26, 'Open the whole meadow', 15, C.ink, 400, ITIM) +
      paid.map((id, i) => A.badge(186 + (i % 5) * 36, 56 + Math.floor(i / 5) * 34, 28, ks[i % 5], A.G(0, 0, .6, S.icon(id)))).join('') +
      `<g filter="url(#lift)">${A.rr(196, 148, 124, 28, 14, 'rose', false)}</g>` + txt(258, 162.5, 'Pay once · $4.99', 10.5, '#fff', 700, `'Mali',${A.FONT}`) +
      txt(258, 188, 'Restore purchase  ·  Family Sharing  ·  No ads  ·  No subscription', 6.6, '#7A6E84', 500, `'Mali',${A.FONT}`) + A.btn(22, 22, 13, 'cream', 'back');
  };

  S.parents = () => {
    const skills = [['Numbers', .7, 'Bud', C.honey], ['Letters & sounds', .45, 'Sprout', C.lav], ['Shapes & colors', .85, 'Bloom', C.rose], ['Thinking', .6, 'Bud', C.sky], ['Little hands', .5, 'Bud', C.sage], ['Feelings & life', .3, 'Sprout', C.coral]];
    const days = [12, 18, 0, 20, 15, 20, 9];
    const M = `'Mali',${A.FONT}`;
    let s = `<rect width="400" height="200" fill="#FBF7F2"/>` + tl(46, 22, 'Grown-ups corner', 12.5, C.ink, 400, ITIM) + A.btn(22, 22, 12, 'cream', 'back') + tl(22, 46, 'SKILLS · tier', 7, '#7A6E84', 700, M);
    skills.forEach(([n, f, t, c], i) => { const y = 62 + i * 21; s += tl(22, y, n, 8.5, C.ink, 600, M) + `<rect x="104" y="${y - 4}" width="90" height="8" rx="4" fill="#EFE6DD"/><rect x="104" y="${y - 4}" width="${90 * f}" height="8" rx="4" fill="${c}"/>` + `<rect x="200" y="${y - 7}" width="34" height="14" rx="7" fill="#fff" stroke="${c}" stroke-width="1.2"/>` + txt(217, y + .5, t, 7, C.ink, 600, M); });
    s += `<path d="M252 34V188" stroke="#EADFD3" stroke-width="1.4"/>` + tl(266, 46, 'THIS WEEK · 1 h 34 m', 7, '#7A6E84', 700, M);
    days.forEach((m, i) => { const x = 270 + i * 16, h = m * 1.6; s += `<rect x="${x}" y="${92 - h}" width="10" height="${Math.max(h, 1.5)}" rx="3" fill="${i === 6 ? C.rose : C.lilac}"/>` + txt(x + 5, 100, 'MTWTFSS'[i], 6.5, '#7A6E84', 600, M); });
    s += `<path d="M266 60H382" stroke="${C.rose}" stroke-width="1" stroke-dasharray="3 3"/>` + tl(342, 55, 'limit', 6, C.berry, 600, M);
    const row = (y, label, ctrl) => tl(266, y, label, 8.5, C.ink, 600, M) + ctrl;
    s += row(122, 'Time limit', `<rect x="334" y="114" width="48" height="16" rx="8" fill="#fff" stroke="${C.lilac}"/>` + txt(358, 122.5, '20 min', 7.5, C.ink, 700, M));
    s += row(146, 'Voice', `<rect x="322" y="138" width="60" height="16" rx="8" fill="#fff" stroke="${C.lilac}"/><rect x="323" y="139" width="29" height="14" rx="7" fill="${C.lilac}"/>` + txt(337.5, 146.5, 'EN', 7.5, C.ink, 700, M) + txt(367, 146.5, 'ไทย', 7.5, C.ink, 700, `'Noto Sans Thai Looped',${M}`));
    s += row(170, 'Music', `<rect x="358" y="162" width="24" height="16" rx="8" fill="${C.sage}"/><circle cx="374" cy="170" r="6" fill="#fff"/>`);
    return s;
  };

  S.winddown = () => A.bg('night') + A.moon(330, 44, 18) + char('mallow', 200, 134, .95, 'sleepy') +
    `<path d="M150 150Q200 132 250 150L256 184H144Z" fill="url(#plaid)" stroke="${A.dk(C.lilac, .3)}" stroke-width="2" stroke-linejoin="round"/>` + A.zzz(234, 86, 1.6, '#FFF08A') + A.lantern(96, 118, 'butter', '', true, .7) + A.flower(300, 168, 'lilac', .8, false);

  // ---- frames ----
  const phone = (inner, label = '') => `<svg class="phone" viewBox="0 0 424 224" role="img" aria-label="${label}"><rect x="1" y="1" width="422" height="222" rx="30" fill="#4A3F55"/><rect x="5" y="5" width="414" height="214" rx="26" fill="#5A4E66"/>` +
    `<g transform="translate(12 12)"><g clip-path="url(#scr)"><g filter="url(#felt)">${inner}</g></g></g><rect x="4.5" y="92" width="3" height="40" rx="1.5" fill="#2F2738"/></svg>`;
  const thumb = (inner, label = '') => `<svg class="thumb" viewBox="0 0 400 200" role="img" aria-label="${label}"><g clip-path="url(#scr)">${inner}</g></svg>`;

  return { S, phone, thumb, tl, speech, burrow, letterTree, nest, pondHut, mushroom, cottage, stones };
})();
