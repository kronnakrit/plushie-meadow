// The Sticker Quilt: one patch per finished game, 24 patches to a page.
import { Container, Graphics } from 'pixi.js';
import { ART } from '../art/art.js';
import { piece } from '../engine/stage';
import { ease, tween } from '../engine/tween';
import { button, dim } from '../engine/widgets';
import type { Ctx } from './types';

const C = ART.C;
const FILLS = ['#FFE8C2', '#FFD3E4', '#CDEBFF', '#FFF0A8'];

export function quilt(ctx: Ctx) {
  const { stage, save } = ctx;
  const o = new Container();
  o.addChild(dim(stage, 0.35));
  const panel = new Container();
  panel.position.set(232, 100);
  const g = new Graphics().roundRect(-134, -86, 268, 172, 16).fill(C.lilac).stroke({ width: 2, color: ART.dk(C.lilac, .3) });
  panel.addChild(g);
  const n = save.stickers.length, page = n === 0 ? 0 : Math.floor((n - 1) / 24), onPage = n - page * 24;
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) {
    const k = j * 6 + i, x = -122 + i * 41, y = -76 + j * 38;
    g.roundRect(x, y, 37, 34, 6).fill(FILLS[(i + j) % 4]).stroke({ width: 1, color: ART.dk(C.lilac, .15) });
    if (k < onPage) panel.addChild(piece(stage, 'sticker-small', x + 18.5, y + 17));
    else g.circle(x + 18.5, y + 17, 10).stroke({ width: 1.4, color: ART.dk(C.lilac, .15) });
  }
  o.addChild(panel);
  const m = piece(stage, 'mallow-joy', 58, 140);
  m.scale.set(0.8);
  o.addChild(m);
  const close = button(stage, 'btn-back', stage.view.x + 24, stage.view.y + 24, () => o.destroy({ children: true }));
  o.addChild(close);
  panel.scale.set(0.8);
  void tween(350, k => panel.scale.set(0.8 + 0.2 * k), ease.back);
  return o;
}
