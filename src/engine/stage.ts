// The game is laid out in the design's 400x200 landscape space. The world is scaled to fit the
// screen height (or width on squat screens) and backgrounds extend past the edges, so no device
// ever sees a letterbox. `view` is the visible part of that space, shrunk by the safe-area insets.
import { Application, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { ART } from '../art/art.js';

export const W = 400, H = 200;
export type VB = [number, number, number, number];

export interface View { x: number; y: number; w: number; h: number }

function safeInsets() {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;inset:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
  document.body.appendChild(probe);
  const cs = getComputedStyle(probe);
  const r = { t: parseFloat(cs.paddingTop) || 0, r: parseFloat(cs.paddingRight) || 0, b: parseFloat(cs.paddingBottom) || 0, l: parseFloat(cs.paddingLeft) || 0 };
  probe.remove();
  return r;
}

export class Stage {
  app = new Application();
  world = new Container();
  scale = 1;
  /** visible world rectangle */
  full: View = { x: 0, y: 0, w: W, h: H };
  /** visible world rectangle inside the notch and home-indicator insets: place buttons here */
  view: View = { x: 0, y: 0, w: W, h: H };
  /** pixels per world unit for baked textures */
  res = 4;
  private onResize: (() => void)[] = [];

  async init(parent: HTMLElement) {
    await this.app.init({ resizeTo: window, background: '#7CCBFF', antialias: true, resolution: Math.min(devicePixelRatio || 1, 3), autoDensity: true });
    parent.appendChild(this.app.canvas);
    this.app.stage.addChild(this.world);
    this.app.stage.eventMode = 'static';
    // textures are baked once at the size a landscape screen of this device needs
    const long = Math.max(innerWidth, innerHeight), short = Math.min(innerWidth, innerHeight);
    this.res = Math.min(Math.min(long / W, short / H) * Math.min(devicePixelRatio || 1, 3), 8);
    this.layout();
    addEventListener('resize', () => this.layout());
  }

  layout() {
    const sw = this.app.screen.width, sh = this.app.screen.height;
    this.scale = Math.min(sw / W, sh / H);
    this.world.scale.set(this.scale);
    this.world.position.set((sw - W * this.scale) / 2, (sh - H * this.scale) / 2);
    this.app.stage.hitArea = new Rectangle(0, 0, sw, sh);
    const x0 = -this.world.x / this.scale, y0 = -this.world.y / this.scale;
    this.full = { x: x0, y: y0, w: sw / this.scale, h: sh / this.scale };
    const ins = safeInsets(), k = 1 / this.scale;
    this.view = { x: x0 + ins.l * k, y: y0 + ins.t * k, w: (sw - ins.l - ins.r) * k, h: (sh - ins.t - ins.b) * k };
    this.onResize.forEach(f => f());
  }

  resized(f: () => void) { this.onResize.push(f); return () => { this.onResize = this.onResize.filter(g => g !== f); }; }
}

// ---- baked SVG textures ----
const cache = new Map<string, { tex: Texture; vb: VB; res: number }>();
const MAX_TEX = 4096;
let defs = '';

async function bake(inner: string, vb: VB, res: number, felt: boolean): Promise<Texture> {
  defs ||= ART.defs();
  const [x, y, w, h] = vb, pw = Math.ceil(w * res), ph = Math.ceil(h * res);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="${x} ${y} ${w} ${h}"><defs>${defs}</defs>${felt ? `<g filter="url(#felt)">${inner}</g>` : inner}</svg>`;
  const img = new Image();
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  await img.decode();
  const c = document.createElement('canvas');
  c.width = pw; c.height = ph;
  c.getContext('2d')!.drawImage(img, 0, 0, pw, ph);
  return Texture.from(c);
}

/** Register and bake an SVG drawing. `vb` is its box in world units around its own origin. */
export async function art(stage: Stage, key: string, inner: string, vb: VB, felt = true) {
  if (cache.has(key)) return;
  // big soft backgrounds can be baked a little lower; nothing may exceed a safe texture size
  const res = Math.min(stage.res * (vb[2] > 400 ? 0.75 : 1), MAX_TEX / vb[2], MAX_TEX / vb[3]);
  cache.set(key, { tex: await bake(inner, vb, res, felt), vb, res });
}

/** A sprite of a baked drawing, positioned so the drawing's own origin sits at (0,0) of its parent. */
export function sprite(_stage: Stage, key: string): Sprite {
  const a = cache.get(key);
  if (!a) throw new Error(`art not baked: ${key}`);
  const s = new Sprite(a.tex);
  s.scale.set(1 / a.res);
  s.position.set(a.vb[0], a.vb[1]);
  return s;
}

/** A container at (x, y) holding one baked drawing; move, wobble and scale the container. */
export function piece(stage: Stage, key: string, x = 0, y = 0): Container & { swap: (k: string) => void } {
  const c = new Container() as Container & { swap: (k: string) => void };
  let s = sprite(stage, key);
  c.addChild(s);
  c.position.set(x, y);
  c.swap = (k: string) => { const n = sprite(stage, k); c.removeChild(s); s.destroy(); s = n; c.addChildAt(n, 0); };
  return c;
}
