// Berry Count: Tumble asks for some berries; the child drags (or taps) berries from the bush into
// his bowl while he counts aloud. Five tasks make a game; a finished game earns a sticker.
import { Container, Graphics, type FederatedPointerEvent } from 'pixi.js';
import { ART } from '../../art/art.js';
import { sfx } from '../../engine/sound';
import { piece, sprite } from '../../engine/stage';
import { afterGame } from '../../engine/tiers';
import { ease, tween, wait } from '../../engine/tween';
import { say, word, Word } from '../../engine/voice';
import { button, dim, label, Petals, showMove, sparkles } from '../../engine/widgets';
import type { Ctx, Scene } from '../../scenes/types';
import { autoFinish, BerryRound, BUSH_SIZE, pickTarget, showDots, TASKS_PER_GAME } from './logic';

const BUSH: [number, number][] = [[290, 116], [310, 102], [334, 96], [356, 106], [370, 124], [298, 136], [320, 120], [344, 122], [326, 144], [352, 144]];
const BOWL: [number, number][] = [[182, 150], [198, 151], [214, 150], [230, 151], [190, 142], [206, 141], [222, 142], [198, 133], [214, 132], [206, 124]];
const BOWL_AT = { x: 206, y: 146, r: 64 };
const MOUTH = { x: 96, y: 136 };
const TAP_MOVE = 6, TAP_MS = 400;
const IDLE_REPEAT = 6000, IDLE_SHOW = 12000;

type Berry = { c: ReturnType<typeof piece>; where: 'bush' | 'bowl' | 'fly'; slot: number };

export function berryCount(ctx: Ctx): Scene {
  const { stage, save } = ctx;
  const root = new Container();
  const bushLayer = new Container(), bowlLayer = new Container(), flyLayer = new Container(), hud = new Container(), fx = new Container();

  root.addChild(sprite(stage, 'bg-meadow'), piece(stage, 'bush', 330, 134));
  const tumble = piece(stage, 'tumble-happy', 96, 128);
  tumble.eventMode = 'static';
  tumble.cursor = 'pointer';
  const speech = new Container();
  speech.position.set(64, 24);
  root.addChild(tumble, speech, piece(stage, 'bowl-back', 206, 150), bowlLayer, piece(stage, 'bowl-front', 206, 150), bushLayer, fx, flyLayer, hud);

  const petals = new Petals(TASKS_PER_GAME);
  const home = button(stage, 'btn-home', 0, 0, () => ctx.go('meadow'));
  const check = button(stage, 'btn-check', 266, 178, () => done(), 24);
  hud.addChild(petals, home, check);
  const place = () => { home.position.set(stage.view.x + 24, stage.view.y + 24); petals.position.set(200, stage.view.y + 17); };
  place();
  const offResize = stage.resized(place);

  let tier = save.berry.tier;
  let round = new BerryRound(tier, 1);
  let berries: Berry[] = [];
  let bowl: Berry[] = [];
  let task = 0, firstTry = 0, locked = true, idle = 0, repeated = false, alive = true;
  let glow: ReturnType<typeof piece> | null = null;
  let drag: { b: Berry; id: number; x: number; y: number; t: number } | null = null;

  const ask = () => say(`${Word(round.target)} ${round.target === 1 ? 'berry' : 'berries'}, please!`);

  function drawSpeech() {
    speech.removeChildren().forEach(c => c.destroy());
    const dots = showDots(tier);
    speech.addChild(sprite(stage, dots ? 'speech-wide' : 'speech'));
    const n = label(stage, round.target, 28);
    n.position.set(28, 23);
    speech.addChild(n);
    if (dots) {
      const g = new Graphics();
      for (let i = 0; i < round.target; i++) g.circle(62, 23 + (i - (round.target - 1) / 2) * 11, 4.2).fill(ART.C.berry);
      speech.addChild(g);
    }
    speech.scale.set(0.6);
    void tween(350, k => speech.scale.set(0.6 + 0.4 * k), ease.back);
  }

  function mood(m: string, ms = 0) {
    tumble.swap(`tumble-${m}`);
    if (ms) setTimeout(() => { if (alive && !tumble.destroyed) tumble.swap('tumble-happy'); }, ms);
  }

  function clearHint() { if (glow) { glow.destroy(); glow = null; } }

  function makeBerry(slot: number): Berry {
    const [x, y] = BUSH[slot];
    const b: Berry = { c: piece(stage, 'berry', x, y), where: 'bush', slot };
    b.c.eventMode = 'static';
    b.c.cursor = 'pointer';
    b.c.hitArea = { contains: (px: number, py: number) => px * px + py * py <= 17 * 17 };
    b.c.on('pointerdown', (e: FederatedPointerEvent) => grab(b, e));
    return b;
  }

  async function newTask() {
    locked = true;
    clearHint();
    berries.forEach(b => b.c.destroy());
    bowl = [];
    berries = Array.from({ length: BUSH_SIZE }, (_, i) => makeBerry(i));
    berries.forEach((b, i) => { bushLayer.addChild(b.c); b.c.scale.set(0); void wait(i * 40).then(() => tween(300, k => b.c.scale.set(k), ease.back)); });
    round = new BerryRound(tier, pickTarget(tier, task === 0 ? null : round.target));
    check.visible = !autoFinish(tier);
    mood('happy');
    drawSpeech();
    ask();
    idle = 0; repeated = false;
    await wait(500);
    locked = false;
  }

  function worldPos(e: FederatedPointerEvent) { return stage.world.toLocal(e.global); }

  function grab(b: Berry, e: FederatedPointerEvent) {
    if (locked || drag) return;
    clearHint();
    if (b.where === 'bowl') { takeBack(b); return; }
    if (b.where !== 'bush') return;
    const p = worldPos(e);
    drag = { b, id: e.pointerId, x: p.x, y: p.y, t: performance.now() };
    b.where = 'fly';
    flyLayer.addChild(b.c);
    b.c.scale.set(1.25);
    sfx.pop();
  }

  function move(e: FederatedPointerEvent) {
    if (!drag || e.pointerId !== drag.id) return;
    const p = worldPos(e);
    drag.b.c.position.set(p.x, p.y - 6);
  }

  function release(e: FederatedPointerEvent) {
    if (!drag || e.pointerId !== drag.id) return;
    const { b, x, y, t } = drag;
    drag = null;
    const p = worldPos(e);
    const tap = Math.hypot(p.x - x, p.y - y) < TAP_MOVE && performance.now() - t < TAP_MS;
    const nearBowl = Math.hypot(b.c.x - BOWL_AT.x, b.c.y - BOWL_AT.y) < BOWL_AT.r;
    if ((tap || nearBowl) && !locked) void drop(b); else void floatBack(b);
  }

  async function floatBack(b: Berry) {
    sfx.boing();
    b.where = 'fly';
    flyLayer.addChild(b.c);
    const [x0, y0] = [b.c.x, b.c.y], [x1, y1] = BUSH[b.slot];
    await tween(450, k => { b.c.position.set(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k); b.c.scale.set(1.25 - 0.25 * k); }, ease.back);
    if (b.c.destroyed) return;
    b.where = 'bush';
    bushLayer.addChild(b.c);
  }

  async function drop(b: Berry) {
    const r = round.add();
    if (r === 'full') { void floatBack(b); return; }
    const n = round.inBowl, [x1, y1] = BOWL[n - 1];
    bowl.push(b);
    b.where = 'fly';
    if (r === 'complete') locked = true;
    const [x0, y0] = [b.c.x, b.c.y];
    await tween(260, k => { b.c.position.set(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 14); b.c.scale.set(1.25 - 0.25 * k); });
    if (b.c.destroyed) return;
    b.where = 'bowl';
    bowlLayer.addChild(b.c);
    sfx.pomf();
    say(word(n));
    countPop(n, x1, y1);
    if (r === 'complete') void complete();
    else mood('wow', 450);
  }

  function countPop(n: number, x: number, y: number) {
    const t = label(stage, n, 15, ART.C.lav);
    t.position.set(x, y - 20);
    fx.addChild(t);
    void tween(900, k => { t.y = y - 20 - k * 10; t.alpha = 1 - Math.max(0, k - 0.6) / 0.4; }).then(() => t.destroy());
  }

  function repack() {
    bowl.forEach((b, i) => {
      const [x0, y0] = [b.c.x, b.c.y], [x1, y1] = BOWL[i];
      if (x0 !== x1 || y0 !== y1) void tween(200, k => b.c.position.set(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k));
    });
  }

  function takeBack(b: Berry) {
    if (!round.remove()) return;
    bowl = bowl.filter(x => x !== b);
    const taken = new Set(berries.filter(x => x.where === 'bush' || x.where === 'fly').map(x => x.slot));
    b.slot = [...Array(BUSH_SIZE).keys()].find(i => !taken.has(i)) ?? b.slot;
    sfx.pop();
    void floatBack(b);
    repack();
  }

  async function done() {
    if (locked || autoFinish(tier)) return;
    clearHint();
    const r = round.done();
    if (r === 'complete') { locked = true; void complete(); return; }
    sfx.boing();
    mood('think', 1600);
    say(r === 'tooMany' ? `Oops, that’s too many. Tumble wants ${word(round.target)}. Can you take some back?` : `Hmm, Tumble wants ${word(round.target)}. Can you add more?`);
    if (round.hint === 'glow') showGlow(r);
    else if (round.hint === 'demo') { round.helped = true; await wait(1200); void demo(r); }
  }

  function showGlow(r: 'tooMany' | 'tooFew') {
    const b = r === 'tooMany' ? bowl[bowl.length - 1] : berries.find(x => x.where === 'bush');
    if (!b) return;
    glow = piece(stage, 'glow', b.c.x, b.c.y);
    fx.addChildAt(glow, 0);
    const g = glow;
    const pulse = () => { if (!g.destroyed) void tween(900, k => g.scale.set(1 + Math.sin(k * Math.PI) * 0.3), ease.linear).then(pulse); };
    pulse();
  }

  function demo(r: 'tooMany' | 'tooFew') {
    if (r === 'tooMany') {
      const b = bowl[bowl.length - 1];
      if (b) return showMove(stage, fx, [b.c.x, b.c.y], BUSH[b.slot]);
    }
    const b = berries.find(x => x.where === 'bush');
    if (b) return showMove(stage, fx, [b.c.x, b.c.y], [BOWL_AT.x, BOWL_AT.y - 6]);
  }

  async function complete() {
    locked = true;
    clearHint();
    if (round.firstTry) firstTry++;
    task++;
    petals.set(task);
    sfx.chime(task - 1);
    mood('joy');
    sparkles(stage, fx, BOWL_AT.x, BOWL_AT.y - 10, 7);
    say('Yum! Thank you!');
    await wait(500);
    await Promise.all(bowl.map((b, i) => wait(i * 70).then(() => {
      const [x0, y0] = [b.c.x, b.c.y];
      flyLayer.addChild(b.c);
      return tween(420, k => { b.c.position.set(x0 + (MOUTH.x - x0) * k, y0 + (MOUTH.y - y0) * k - Math.sin(k * Math.PI) * 20); b.c.scale.set(1 - 0.8 * k); b.c.alpha = 1 - k * 0.6; });
    })));
    bowl.forEach(b => { b.c.visible = false; });
    await wait(700);
    if (!alive) return;
    if (task < TASKS_PER_GAME) void newTask(); else finish();
  }

  function finish() {
    const r = afterGame(save.berry, firstTry, ctx.visit.steps);
    if (r.change) ctx.visit.steps++;
    save.berry = r.state;
    save.stickers.push('berry');
    ctx.persist();
    const o = new Container();
    o.addChild(dim(stage, 0.4));
    const st = piece(stage, 'sticker-berry', 200, 88);
    st.scale.set(0);
    o.addChild(st);
    hud.addChild(o);
    sfx.fanfare();
    say('You did it! Here’s a sticker for your quilt!');
    void tween(600, k => st.scale.set(k), ease.back).then(() => sparkles(stage, o, 200, 88, 10, 60));
    o.addChild(button(stage, 'btn-replay', 168, 162, () => { o.destroy({ children: true }); restart(); }, 30));
    o.addChild(button(stage, 'btn-home-big', 232, 162, () => ctx.go('meadow'), 30));
  }

  function restart() {
    tier = save.berry.tier;
    task = 0; firstTry = 0;
    petals.set(0);
    void newTask();
  }

  tumble.on('pointertap', () => { if (locked) return; if (autoFinish(tier)) { mood('wow', 500); ask(); } else void done(); });

  const s = stage.app.stage;
  const anyTouch = () => { idle = 0; repeated = false; };
  const tick = (t: { deltaMS: number }) => {
    if (locked || drag) return;
    idle += t.deltaMS;
    if (idle > IDLE_REPEAT && !repeated) { repeated = true; ask(); }
    if (idle > IDLE_SHOW) {
      idle = 0; repeated = false;
      round.helped = true;
      void demo(round.inBowl > round.target ? 'tooMany' : 'tooFew');
    }
  };

  return {
    root,
    enter() {
      s.on('globalpointermove', move);
      s.on('pointerup', release);
      s.on('pointerupoutside', release);
      s.on('pointerdown', anyTouch);
      stage.app.ticker.add(tick);
      restart();
    },
    leave() {
      alive = false;
      s.off('globalpointermove', move);
      s.off('pointerup', release);
      s.off('pointerupoutside', release);
      s.off('pointerdown', anyTouch);
      stage.app.ticker.remove(tick);
      offResize();
    },
  };
}
