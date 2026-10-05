// Berry Count rules, kept free of rendering so they can be tested.
import type { Tier } from '../../engine/tiers';

export const RANGES: Record<Tier, [number, number]> = { sprout: [1, 3], bud: [1, 5], bloom: [3, 10] };
export const BUSH_SIZE = 10;
export const TASKS_PER_GAME = 5;

/** Sprout shows dots beside the numeral; Bud and Bloom show the numeral only. */
export const showDots = (t: Tier) => t === 'sprout';
/** Sprout and Bud finish by themselves on the right count; Bloom waits for the child to say "done". */
export const autoFinish = (t: Tier) => t !== 'bloom';

export function pickTarget(tier: Tier, prev: number | null, rand: () => number = Math.random): number {
  const [lo, hi] = RANGES[tier];
  for (let i = 0; i < 20; i++) {
    const t = lo + Math.floor(rand() * (hi - lo + 1));
    if (t !== prev || lo === hi) return t;
  }
  return prev === lo ? lo + 1 : lo;
}

export type AddResult = 'count' | 'complete' | 'full';
export type DoneResult = 'complete' | 'tooMany' | 'tooFew';
export type Hint = 'none' | 'glow' | 'demo';

export class BerryRound {
  inBowl = 0;
  misses = 0;
  /** set when the felt hand had to show the move, so the task no longer counts as first try */
  helped = false;
  finished = false;
  constructor(readonly tier: Tier, readonly target: number) {}

  add(): AddResult {
    if (this.finished || this.inBowl >= BUSH_SIZE) return 'full';
    this.inBowl++;
    if (autoFinish(this.tier) && this.inBowl === this.target) { this.finished = true; return 'complete'; }
    return 'count';
  }

  remove(): boolean {
    if (this.finished || this.inBowl === 0) return false;
    this.inBowl--;
    return true;
  }

  /** The child taps Tumble or the check button (Bloom). */
  done(): DoneResult {
    if (this.inBowl === this.target) { this.finished = true; return 'complete'; }
    this.misses++;
    return this.inBowl > this.target ? 'tooMany' : 'tooFew';
  }

  /** First miss: try again. Second: the right move glows. Third and later: the felt hand shows it. */
  get hint(): Hint {
    return this.misses >= 3 ? 'demo' : this.misses >= 2 ? 'glow' : 'none';
  }

  get firstTry(): boolean {
    return this.misses === 0 && !this.helped;
  }
}
