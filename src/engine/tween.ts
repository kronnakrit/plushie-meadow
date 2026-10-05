// A tiny tween runner on the Pixi ticker. Every animation in the game is slow and eased.
import type { Ticker } from 'pixi.js';

export const ease = {
  out: (t: number) => 1 - (1 - t) ** 3,
  inOut: (t: number) => (t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  back: (t: number) => { const c = 1.6; return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2; },
  linear: (t: number) => t,
};

type Job = { t: number; dur: number; step: (k: number) => void; done: () => void; ease: (t: number) => number };
let jobs: Job[] = [];
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function startTweens(ticker: Ticker) {
  ticker.add(t => {
    const dt = t.deltaMS;
    const live = jobs; jobs = [];
    for (const j of live) {
      j.t += dt;
      const k = Math.min(j.t / j.dur, 1);
      // a tween whose target was destroyed by a scene change just ends quietly
      try { j.step(j.ease(k)); } catch { j.done(); continue; }
      if (k < 1) jobs.push(j); else j.done();
    }
  });
}

/** Animate from 0 to 1 over `ms`. Resolves when finished. */
export function tween(ms: number, step: (k: number) => void, e: (t: number) => number = ease.out): Promise<void> {
  return new Promise(res => jobs.push({ t: 0, dur: reduce ? Math.min(ms, 120) : ms, step, done: res, ease: e }));
}

export const wait = (ms: number) => tween(ms, () => {}, ease.linear);

export function cancelAll() { jobs = []; }
