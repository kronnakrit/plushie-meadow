// Progress lives on the device only (Capacitor Preferences, which is localStorage in a browser).
import { Preferences } from '@capacitor/preferences';
import { initialTier, type TierState } from './tiers';

export interface Save { version: 1; berry: TierState; stickers: string[] }
const KEY = 'plushie-meadow-save';

export const fresh = (): Save => ({ version: 1, berry: initialTier(), stickers: [] });

export async function load(): Promise<Save> {
  try {
    const { value } = await Preferences.get({ key: KEY });
    const s = value ? JSON.parse(value) : null;
    return s?.version === 1 ? { ...fresh(), ...s } : fresh();
  } catch { return fresh(); }
}

export async function store(s: Save) {
  try { await Preferences.set({ key: KEY, value: JSON.stringify(s) }); } catch { /* storage unavailable: play on */ }
}
