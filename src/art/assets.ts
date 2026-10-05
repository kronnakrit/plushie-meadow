// Every drawing the prototype uses, baked once at start from the design's SVG art kit.
import { ART } from './art.js';
import { SCENES } from './scenes.js';
import { art, type Stage, type VB } from '../engine/stage';

const A = ART, S = SCENES;
const CHAR_VB: VB = [-60, -60, 120, 120];
const MOODS = ['happy', 'joy', 'wow', 'think', 'sad', 'sleepy'];

export async function bakeAll(stage: Stage) {
  const jobs: [string, string, VB, boolean?][] = [
    ['bg-meadow', A.bg('meadow', -100, 500, -80, 280), [-100, -80, 600, 360]],
    ['bg-night', A.bg('night', -100, 500, -80, 280), [-100, -80, 600, 360]],
    ['burrow', S.burrow(0, 0), [-40, -58, 80, 62]],
    ['tree', S.letterTree(0, 0), [-52, -102, 104, 106]],
    ['nest', S.nest(0, 0), [-46, -92, 92, 96]],
    ['pond', S.pondHut(0, 0), [-50, -32, 100, 36]],
    ['mushroom', S.mushroom(0, 0), [-36, -64, 72, 68]],
    ['cottage', S.cottage(0, 0), [-38, -66, 86, 70]],
    ['stones', S.stones([[178, 168], [160, 160], [140, 152], [222, 168], [240, 160], [262, 158], [200, 128], [196, 120]]), [128, 112, 146, 62]],
    ['bush', A.bush(0, 0, 2.1), [-76, -60, 152, 94]],
    ['berry', A.berry(0, 0, 1.25), [-13, -15, 26, 28], false],
    ['bowl-back', A.bowlBack(0, 0, 90), [-48, -14, 96, 28]],
    ['bowl-front', A.bowlFront(0, 0, 90), [-48, -14, 96, 62]],
    ['speech-wide', `<g filter="url(#lift)">${A.pillowShape(0, 0, 80, 46, 'cream')}<path d="M10 44l-6 10l12 -10Z" fill="${A.C.cream}"/></g>`, [-4, -4, 88, 62]],
    ['speech', `<g filter="url(#lift)">${A.pillowShape(0, 0, 56, 46, 'cream')}<path d="M10 44l-6 10l12 -10Z" fill="${A.C.cream}"/></g>`, [-4, -4, 64, 62]],
    ['btn-home', A.btn(0, 0, 14, 'cream', 'home'), [-20, -20, 40, 44]],
    ['btn-back', A.btn(0, 0, 14, 'cream', 'back'), [-20, -20, 40, 44]],
    ['btn-book', A.btn(0, 0, 14, 'butter', 'book'), [-20, -20, 40, 44]],
    ['btn-key', A.btn(0, 0, 10, 'cream', 'key'), [-15, -15, 30, 34]],
    ['btn-check', A.btn(0, 0, 15, 'mint', 'check'), [-21, -21, 42, 46]],
    ['btn-play', A.btn(0, 0, 26, 'rose', 'play'), [-32, -32, 64, 70]],
    ['btn-replay', A.btn(0, 0, 20, 'blush', 'replay'), [-26, -26, 52, 58]],
    ['btn-home-big', A.btn(0, 0, 20, 'cream', 'home'), [-26, -26, 52, 58]],
    ['hand', A.hand(0, 0, 1, -10), [-30, -42, 60, 66]],
    ['sparkle', A.sparkle(0, 0, 1.4), [-12, -12, 24, 24], false],
    ['glow', `<circle r="24" fill="url(#glow)"/>`, [-25, -25, 50, 50], false],
    ['sticker-berry', A.sticker(0, 0, 40, A.G(0, 0, 2.4, S.S.icon('berry'))), [-48, -48, 96, 100]],
    ['sticker-small', A.circ(0, 0, 13, 'cloud', false) + A.G(0, 0, .8, S.S.icon('berry')), [-16, -16, 32, 32]],
  ];
  for (const m of MOODS) {
    jobs.push([`tumble-${m}`, A.char('tumble', 0, 0, 1, m), CHAR_VB]);
    jobs.push([`mallow-${m}`, A.char('mallow', 0, 0, 1, m), CHAR_VB]);
  }
  await Promise.all(jobs.map(([k, inner, vb, felt]) => art(stage, k, inner, vb, felt ?? true)));
}
