// First screen: one big play button. Its tap also unlocks sound, which browsers and phones require.
import { Container } from 'pixi.js';
import { unlockAudio } from '../engine/sound';
import { piece, sprite } from '../engine/stage';
import { ease, tween } from '../engine/tween';
import { say } from '../engine/voice';
import { bob, button } from '../engine/widgets';
import type { Ctx, Scene } from './types';

export function splash(ctx: Ctx): Scene {
  const { stage } = ctx;
  const root = new Container();
  root.addChild(sprite(stage, 'bg-meadow'));
  const mallow = piece(stage, 'mallow-wow', 150, 122);
  root.addChild(mallow);
  bob(stage, mallow);
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    unlockAudio();
    say('Hello! Welcome to Plushie Meadow!');
    ctx.go('meadow');
  };
  const play = button(stage, 'btn-play', 264, 118, start, 40);
  root.addChild(play);
  mallow.eventMode = 'static';
  mallow.on('pointertap', start);
  let alive = true;
  const pulse = () => { if (alive) void tween(1400, k => play.scale.set(1 + Math.sin(k * Math.PI) * 0.08), ease.linear).then(pulse); };
  return { root, enter: pulse, leave: () => { alive = false; } };
}
