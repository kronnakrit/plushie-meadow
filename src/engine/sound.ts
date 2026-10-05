// Placeholder sound effects synthesised with Web Audio, so the prototype needs no audio files.
// They follow the design's sound list: felt "pomf", soft pop, wooden tok, boing, and a chime ladder.
let ctx: AudioContext | null = null;
const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];

export function unlockAudio() {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch { ctx = null; }
}

function tone(freq: number, dur: number, type: OscillatorType, vol: number, bendTo?: number) {
  if (!ctx) return;
  const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (bendTo) o.frequency.exponentialRampToValueAtTime(bendTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t); o.stop(t + dur + 0.02);
}

export const sfx = {
  pomf: () => tone(170, 0.18, 'sine', 0.35, 90),
  pop: () => tone(620, 0.09, 'sine', 0.25, 980),
  tok: () => tone(880, 0.06, 'triangle', 0.18),
  boing: () => tone(300, 0.35, 'sine', 0.22, 160),
  /** rises one step per finished task */
  chime: (step: number) => { const f = PENTA[Math.min(step, PENTA.length - 1)]; tone(f, 0.5, 'sine', 0.22); tone(f * 2, 0.35, 'sine', 0.06); },
  fanfare: () => PENTA.forEach((f, i) => setTimeout(() => tone(f, 0.4, 'sine', 0.18), i * 90)),
};
