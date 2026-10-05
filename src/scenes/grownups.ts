// Grown-up gate and a first Grown-ups corner, as plain HTML on top of the game.
// The gate asks for three numbers written as words, which 3 to 6 year olds can't read.
import { setVoice, word } from '../engine/voice';
import { fresh } from '../engine/save';
import { TIERS, type Tier } from '../engine/tiers';
import type { Ctx } from './types';

let lockedUntil = 0;
let voiceOn = true;

function overlay(html: string) {
  const el = document.createElement('div');
  el.className = 'grown';
  el.innerHTML = `<div class="card">${html}</div>`;
  document.body.appendChild(el);
  return el;
}

export function openGrownUps(ctx: Ctx) {
  if (document.querySelector('.grown')) return;
  if (Date.now() < lockedUntil) return;
  const digits = Array.from({ length: 3 }, () => 1 + Math.floor(Math.random() * 9));
  let typed: number[] = [], wrong = 0;
  const el = overlay(`<button class="x" aria-label="Close">×</button><h2>For grown-ups</h2><p class="muted">Tap these numbers</p>
    <p class="words">${digits.map(word).join(' · ')}</p><div class="boxes">${digits.map(() => '<span></span>').join('')}</div>
    <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button data-n="${n}">${n}</button>`).join('')}</div>`);
  const boxes = [...el.querySelectorAll<HTMLSpanElement>('.boxes span')];
  el.querySelector('.x')!.addEventListener('click', () => el.remove());
  el.querySelectorAll<HTMLButtonElement>('[data-n]').forEach(b => b.addEventListener('click', () => {
    typed.push(Number(b.dataset.n));
    boxes.forEach((s, i) => { s.textContent = typed[i] ? String(typed[i]) : ''; });
    if (typed.length < 3) return;
    if (typed.every((d, i) => d === digits[i])) { el.remove(); corner(ctx); return; }
    wrong++;
    typed = [];
    setTimeout(() => boxes.forEach(s => { s.textContent = ''; }), 300);
    if (wrong >= 3) { lockedUntil = Date.now() + 60_000; el.remove(); }
  }));
}

function corner(ctx: Ctx) {
  const s = ctx.save;
  const tierBtn = (t: Tier | 'auto', label: string) => {
    const on = t === 'auto' ? !s.berry.pinned : s.berry.pinned && s.berry.tier === t;
    return `<button data-tier="${t}" aria-pressed="${on}">${label}</button>`;
  };
  const el = overlay(`<button class="x" aria-label="Close">×</button><h2>Grown-ups corner</h2>
    <p class="muted">Prototype settings. Progress stays on this device.</p>
    <div class="row"><b>Berry Count level</b><span class="muted">now ${s.berry.tier}${s.berry.pinned ? ', pinned' : ''}</span></div>
    <div class="seg">${tierBtn('auto', 'Auto')}${TIERS.map(t => tierBtn(t, t[0].toUpperCase() + t.slice(1))).join('')}</div>
    <div class="row"><b>Voice</b><button data-voice aria-pressed="${voiceOn}">${voiceOn ? 'On' : 'Off'}</button></div>
    <div class="row"><b>Stickers earned</b><span>${s.stickers.length}</span></div>
    <div class="row"><b>Start over</b><button data-reset>Reset progress</button></div>`);
  el.querySelector('.x')!.addEventListener('click', () => el.remove());
  el.querySelectorAll<HTMLButtonElement>('[data-tier]').forEach(b => b.addEventListener('click', () => {
    const t = b.dataset.tier as Tier | 'auto';
    s.berry = t === 'auto' ? { ...s.berry, pinned: false } : { tier: t, pinned: true, streak: 0 };
    ctx.persist();
    el.remove(); corner(ctx);
  }));
  el.querySelector('[data-voice]')!.addEventListener('click', () => { voiceOn = !voiceOn; setVoice(voiceOn); el.remove(); corner(ctx); });
  const reset = el.querySelector<HTMLButtonElement>('[data-reset]')!;
  reset.addEventListener('click', () => {
    if (reset.dataset.armed) { Object.assign(s, fresh()); ctx.persist(); el.remove(); corner(ctx); return; }
    reset.dataset.armed = '1';
    reset.textContent = 'Tap again to reset';
  });
}
