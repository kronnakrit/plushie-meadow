// Tier rules from the design: step up after two strong games in a row, step down after a weak one,
// never more than one step per visit, never while a grown-up has pinned the tier.
export type Tier = 'sprout' | 'bud' | 'bloom';
export const TIERS: Tier[] = ['sprout', 'bud', 'bloom'];

export interface TierState {
  tier: Tier;
  pinned: boolean;
  /** consecutive games with at least 4 of 5 first-try answers */
  streak: number;
}

export const STRONG = 4;
export const WEAK = 2;

export function initialTier(): TierState {
  return { tier: 'sprout', pinned: false, streak: 0 };
}

export function afterGame(s: TierState, firstTry: number, stepsThisVisit: number): { state: TierState; change: 'up' | 'down' | null } {
  if (s.pinned) return { state: s, change: null };
  const i = TIERS.indexOf(s.tier);
  const canStep = stepsThisVisit < 1;
  if (firstTry >= STRONG) {
    const streak = s.streak + 1;
    if (streak >= 2 && i < TIERS.length - 1 && canStep) return { state: { ...s, tier: TIERS[i + 1], streak: 0 }, change: 'up' };
    return { state: { ...s, streak }, change: null };
  }
  if (firstTry <= WEAK && i > 0 && canStep) return { state: { ...s, tier: TIERS[i - 1], streak: 0 }, change: 'down' };
  return { state: { ...s, streak: 0 }, change: null };
}
