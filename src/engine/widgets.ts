// Small shared pieces: big forgiving buttons, the petal row, sparkles, the felt hand and a fade.
import { Container, Graphics, Text } from 'pixi.js';
import { ART } from '../art/art.js';
import { sfx } from './sound';
import { piece, sprite, type Stage } from './stage';
import { ease, tween, wait } from './tween';

const C = ART.C;

/** A pressable baked drawing. The hit area is padded so small fingers can't miss. */
export function button(stage: Stage, key: string, x: number, y: number, onTap: () => void, hitR = 22) {
  const b = piece(stage, key, x, y);
  b.eventMode = 'static';
  b.cursor = 'pointer';
  b.hitArea = { contains: (px: number, py: number) => px * px + py * py <= hitR * hitR };
  b.on('pointerdown', () => { b.scale.set(0.9); sfx.tok(); });
  b.on('pointerupoutside', () => b.scale.set(1));
  b.on('pointerup', () => { b.scale.set(1); onTap(); });
  return b;
}

export class Petals extends Container {
  private g = new Graphics();
  constructor(readonly of = 5) { super(); this.addChild(this.g); this.set(0); }
  set(n: number) {
    this.g.clear();
    for (let i = 0; i < this.of; i++) {
      const x = (i - (this.of - 1) / 2) * 15, on = i < n;
      this.g.circle(x, 0, 5.2).fill(on ? C.rose : '#ffffff').stroke({ width: 1.6, color: on ? ART.dk(C.rose, .25) : C.lilac });
    }
  }
}

export function sparkles(stage: Stage, parent: Container, x: number, y: number, n = 6, spread = 34) {
  for (let i = 0; i < n; i++) {
    const s = piece(stage, 'sparkle', x, y);
    const a = (i / n) * Math.PI * 2 + Math.random() * .5, d = spread * (0.6 + Math.random() * 0.5);
    s.scale.set(0.2);
    parent.addChild(s);
    void tween(700, k => {
      s.position.set(x + Math.cos(a) * d * k, y + Math.sin(a) * d * k);
      s.scale.set(0.2 + k * 0.7);
      s.alpha = 1 - Math.max(0, k - 0.5) * 2;
      s.rotation = k;
    }).then(() => s.destroy());
  }
}

/** The felt hand slides from one point to another to show a move; it never completes it. */
export async function showMove(stage: Stage, parent: Container, from: [number, number], to: [number, number]) {
  const h = piece(stage, 'hand', from[0], from[1] + 26);
  h.alpha = 0;
  parent.addChild(h);
  await tween(250, k => { h.alpha = k; });
  await tween(300, k => { h.scale.set(1 - 0.12 * Math.sin(k * Math.PI)); });
  await tween(1000, k => h.position.set(from[0] + (to[0] - from[0]) * k, from[1] + 26 + (to[1] - from[1]) * k), ease.inOut);
  await wait(250);
  await tween(250, k => { h.alpha = 1 - k; });
  h.destroy();
}

export function label(stage: Stage, text: string | number, size: number, color: string = C.ink) {
  return new Text({ text: String(text), style: { fontFamily: 'Andika, Itim, system-ui, sans-serif', fontWeight: '700', fontSize: size, fill: color }, resolution: stage.res, anchor: 0.5 });
}

export function wobble(c: Container) {
  return tween(600, k => { c.rotation = Math.sin(k * Math.PI * 4) * 0.08 * (1 - k); }, ease.linear);
}

export function bob(stage: Stage, c: Container) {
  let t = Math.random() * 3;
  const y0 = c.y;
  const f = (tk: { deltaMS: number }) => { if (c.destroyed) { stage.app.ticker.remove(f); return; } t += tk.deltaMS / 1000; c.y = y0 + Math.sin(t * 2.2) * 1.4; };
  stage.app.ticker.add(f);
}

export function dim(stage: Stage, alpha = 0.4) {
  const g = new Graphics().rect(stage.full.x - 2, stage.full.y - 2, stage.full.w + 4, stage.full.h + 4).fill({ color: '#3A2B45', alpha });
  g.eventMode = 'static';
  return g;
}

export { sprite };
