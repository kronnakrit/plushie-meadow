import '@fontsource/andika/700.css';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Graphics } from 'pixi.js';
import { bakeAll } from './art/assets';
import { berryCount } from './games/berry/BerryCount';
import { load, store } from './engine/save';
import { unlockAudio } from './engine/sound';
import { Stage } from './engine/stage';
import { startTweens, tween } from './engine/tween';
import { stop } from './engine/voice';
import { meadow } from './scenes/meadow';
import { splash } from './scenes/splash';
import type { Ctx, Scene, SceneName } from './scenes/types';

async function boot() {
  if (Capacitor.isNativePlatform()) void ScreenOrientation.lock({ orientation: 'landscape' }).catch(() => {});
  const stage = new Stage();
  await stage.init(document.getElementById('app')!);
  startTweens(stage.app.ticker);
  await Promise.all([document.fonts.load('700 28px Andika').catch(() => {}), bakeAll(stage)]);
  const save = await load();
  document.addEventListener('pointerdown', unlockAudio, { capture: true });

  const fade = new Graphics();
  fade.eventMode = 'none';
  stage.app.stage.addChild(fade);
  const cover = (a: number) => fade.clear().rect(0, 0, stage.app.screen.width, stage.app.screen.height).fill({ color: '#FFF6E5', alpha: a });

  const SCENES: Record<SceneName, (c: Ctx) => Scene> = { splash, meadow, berry: berryCount };
  let current: Scene | null = null, busy = false;
  const ctx: Ctx = {
    stage, save, visit: { steps: 0 },
    persist: () => void store(save),
    async go(name) {
      if (busy) return;
      busy = true;
      if (current) {
        await tween(220, k => cover(k));
        stop();
        current.leave?.();
        current.root.destroy({ children: true });
      }
      current = SCENES[name](ctx);
      stage.world.addChild(current.root);
      current.enter?.();
      await tween(260, k => cover(1 - k));
      fade.clear();
      busy = false;
    },
  };
  document.getElementById('loading')?.remove();
  // ?scene=berry jumps straight into a game while testing
  const start = new URLSearchParams(location.search).get('scene') as SceneName | null;
  void ctx.go(start && start in SCENES ? start : 'splash');
}

void boot();
