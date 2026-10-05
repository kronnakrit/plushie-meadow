// The meadow hub. In the prototype only Tumble's Berry Burrow opens a game; the other homes
// wiggle and their friend says they are still getting ready.
import { Container, Rectangle } from 'pixi.js';
import { sfx } from '../engine/sound';
import { piece, sprite } from '../engine/stage';
import { wait } from '../engine/tween';
import { say } from '../engine/voice';
import { bob, button, wobble } from '../engine/widgets';
import { openGrownUps } from './grownups';
import { quilt } from './quilt';
import type { Ctx, Scene } from './types';

const HOUSES: [key: string, x: number, y: number, line: string][] = [
  ['tree', 150, 106, 'Hoot is still getting the Letter Tree ready. Let’s count berries with Tumble!'],
  ['nest', 252, 108, 'Pip is still building the Rainbow Nest. Let’s count berries with Tumble!'],
  ['burrow', 60, 114, ''],
  ['pond', 330, 116, 'Kiki is still filling Puzzle Pond. Let’s count berries with Tumble!'],
  ['mushroom', 96, 182, 'Shelly is still planting the Wiggle Garden. Let’s count berries with Tumble!'],
  ['cottage', 306, 184, 'Shh, Heart Cottage is sleeping.'],
];

export function meadow(ctx: Ctx): Scene {
  const { stage } = ctx;
  const root = new Container();
  root.addChild(sprite(stage, 'bg-meadow'), sprite(stage, 'stones'));
  let leaving = false;

  for (const [key, x, y, line] of HOUSES) {
    const h = piece(stage, key, x, y);
    h.eventMode = 'static';
    h.cursor = 'pointer';
    h.on('pointertap', async () => {
      if (leaving) return;
      sfx.pomf();
      void wobble(h);
      if (key === 'burrow') {
        leaving = true;
        say('Let’s count berries with Tumble!');
        await wait(700);
        ctx.go('berry');
      } else say(line);
    });
    root.addChild(h);
  }

  const mallow = piece(stage, 'mallow-joy', 200, 150);
  mallow.scale.set(0.6);
  mallow.eventMode = 'static';
  mallow.cursor = 'pointer';
  mallow.hitArea = new Rectangle(-45, -50, 90, 100);
  mallow.on('pointertap', async () => {
    mallow.swap('mallow-wow');
    say('Hi! I’m Mallow. Tap Tumble’s burrow to count berries!');
    await wait(1600);
    if (!mallow.destroyed) mallow.swap('mallow-joy');
  });
  root.addChild(mallow);
  bob(stage, mallow);

  const book = button(stage, 'btn-book', 0, 0, () => { root.addChild(quilt(ctx)); });
  const key = button(stage, 'btn-key', 0, 0, () => {}, 18);
  // the key opens the grown-up gate only after a 2 second press
  let hold: ReturnType<typeof setTimeout> | undefined;
  key.on('pointerdown', () => { hold = setTimeout(() => { hold = undefined; key.scale.set(1); openGrownUps(ctx); }, 2000); });
  const cancel = () => { if (hold) { clearTimeout(hold); hold = undefined; void wobble(key); } };
  key.on('pointerup', cancel);
  key.on('pointerupoutside', cancel);
  root.addChild(book, key);
  const place = () => {
    book.position.set(stage.view.x + 24, stage.view.y + 24);
    key.position.set(stage.view.x + stage.view.w - 20, stage.view.y + 20);
  };
  place();
  const off = stage.resized(place);
  return { root, leave: () => { off(); cancel(); } };
}
