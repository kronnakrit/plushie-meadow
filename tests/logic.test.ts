import { describe, expect, it } from 'vitest';
import { BerryRound, pickTarget, RANGES, autoFinish, showDots } from '../src/games/berry/logic';
import { afterGame, initialTier, type TierState } from '../src/engine/tiers';

describe('pickTarget', () => {
  it('stays inside the tier range and avoids repeating', () => {
    for (const tier of ['sprout', 'bud', 'bloom'] as const) {
      let prev: number | null = null;
      for (let i = 0; i < 200; i++) {
        const t = pickTarget(tier, prev);
        expect(t).toBeGreaterThanOrEqual(RANGES[tier][0]);
        expect(t).toBeLessThanOrEqual(RANGES[tier][1]);
        expect(t).not.toBe(prev);
        prev = t;
      }
    }
  });
  it('still returns a new number when the random source keeps repeating', () => {
    expect(pickTarget('sprout', 1, () => 0)).toBe(2);
  });
});

describe('BerryRound', () => {
  it('finishes by itself on the right count in Sprout and Bud', () => {
    const r = new BerryRound('bud', 3);
    expect(r.add()).toBe('count');
    expect(r.add()).toBe('count');
    expect(r.add()).toBe('complete');
    expect(r.add()).toBe('full');
    expect(r.firstTry).toBe(true);
  });
  it('waits for done in Bloom and escalates hints on misses', () => {
    const r = new BerryRound('bloom', 4);
    for (let i = 0; i < 5; i++) expect(r.add()).toBe('count');
    expect(r.done()).toBe('tooMany');
    expect(r.hint).toBe('none');
    r.remove(); r.remove();
    expect(r.done()).toBe('tooFew');
    expect(r.hint).toBe('glow');
    expect(r.done()).toBe('tooFew');
    expect(r.hint).toBe('demo');
    r.add();
    expect(r.done()).toBe('complete');
    expect(r.firstTry).toBe(false);
  });
  it('never goes below zero or above the bush', () => {
    const r = new BerryRound('bloom', 10);
    expect(r.remove()).toBe(false);
    for (let i = 0; i < 10; i++) r.add();
    expect(r.add()).toBe('full');
  });
  it('matches the tier table in the design', () => {
    expect(showDots('sprout')).toBe(true);
    expect(showDots('bud')).toBe(false);
    expect(autoFinish('bloom')).toBe(false);
  });
});

describe('afterGame', () => {
  const s0 = initialTier();
  it('steps up after two strong games in a row', () => {
    const a = afterGame(s0, 5, 0);
    expect(a.change).toBe(null);
    const b = afterGame(a.state, 4, 0);
    expect(b.change).toBe('up');
    expect(b.state.tier).toBe('bud');
  });
  it('resets the streak after an average game', () => {
    const a = afterGame(s0, 5, 0);
    const b = afterGame(a.state, 3, 0);
    expect(b.state.streak).toBe(0);
    expect(afterGame(b.state, 5, 0).change).toBe(null);
  });
  it('steps down after a weak game but never below Sprout', () => {
    const bud: TierState = { tier: 'bud', pinned: false, streak: 1 };
    expect(afterGame(bud, 2, 0).state.tier).toBe('sprout');
    expect(afterGame(s0, 0, 0).change).toBe(null);
  });
  it('moves at most one step per visit and never when pinned', () => {
    const bud: TierState = { tier: 'bud', pinned: false, streak: 1 };
    expect(afterGame(bud, 5, 1).change).toBe(null);
    expect(afterGame(bud, 0, 1).change).toBe(null);
    expect(afterGame({ ...bud, pinned: true }, 0, 0).change).toBe(null);
  });
});
