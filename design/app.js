// ---- Page rendering ----
(() => {
  const $ = id => document.getElementById(id);
  const A = ART, C = A.C, { S, phone, thumb } = SCENES, { AREAS, TIERS, SKILLS, LIST } = GAMES;
  $('defs').innerHTML = A.defs();
  const svg = (vb, inner, label = '') => `<svg viewBox="${vb}" role="img" aria-label="${label}">${inner}</svg>`;
  const tile = (art, name, note = '') => `<div class="tile"><div class="art">${art}</div><b>${name}</b>${note ? `<span>${note}</span>` : ''}</div>`;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  // hero
  $('heroPhones').innerHTML = phone(S.hub(), 'The meadow hub') + phone(S.berry(), 'Berry Count game');

  // cast
  const CAST = [['mallow', 'Mallow', 'the cloud lamb · guide and host of Heart Cottage'], ['tumble', 'Tumble', 'the bear · Berry Burrow, numbers'], ['hoot', 'Hoot', 'the owl · Letter Tree, letters and sounds'],
    ['pip', 'Pip', 'the chick · Rainbow Nest, shapes and colors'], ['kiki', 'Kiki', 'the kitten · Puzzle Pond, thinking games'], ['shelly', 'Shelly', 'the snail · Wiggle Garden, little hands']];
  $('cast').innerHTML = CAST.map(([k, n, d]) => `<figure>${svg('-58 -58 116 116', `<g class="bob">${A.char(k, 0, 0, 1, 'happy')}</g>`, n)}<b>${n}</b><span>${d}</span></figure>`).join('');

  $('meadowShots').innerHTML = [[S.burrow(), 'Inside a home', 'Tumble’s Berry Burrow. Free games sit awake on the shelf; full-meadow games doze under a plaid blanket.'],
    [S.stickers(), 'Sticker Quilt', 'Every finished game sews one sticker into the quilt. Each quilt page holds 24, and a new page starts when one fills up.'],
    [S.winddown(), 'Wind-down', 'When the daily limit arrives, the meadow goes to dusk after the current game, Mallow tucks in and the app rests on this screen.'],
    [S.gate(), 'The key button', 'The small key at the top right of the meadow opens the grown-up gate. Children can tap it, but it asks for a long press and reading.']]
    .map(([sc, t, c]) => `<figure>${phone(sc, t)}<figcaption><b>${t}.</b> ${c}</figcaption></figure>`).join('');

  $('tiers').innerHTML = [['Sprout', '3 to 4', 'Two or three choices, dots beside every number, slow voice, and the answer starts to glow sooner.'],
    ['Bud', '4 to 5', 'More choices, voice-only prompts, longer patterns and sequences.'], ['Bloom', '5 to 6', 'Numbers up to 20, small letters, hidden steps, and tasks that need the child to say when they are done.']]
    .map(([n, a, d]) => `<div><span class="eyebrow">Ages ${a}</span><b>${n}</b><p>${d}</p></div>`).join('');

  // games
  const areaChip = g => `<span class="chip">${AREAS[g.area].name}</span>`;
  const tierList = g => `<ul class="tierlist">${g.tiers.map((t, i) => `<li><span>${TIERS[i][0]}</span><span>${t}</span></li>`).join('')}</ul>`;
  const free = LIST.filter(g => g.free), paid = LIST.filter(g => !g.free);
  $('freeGames').innerHTML = free.map(g => `<article class="game" id="g-${g.id}"><div class="stage">${phone(S[g.id](), g.name)}</div>
    <div class="stack"><div class="meta"><span class="chip free">Free</span>${areaChip(g)}<span class="chip">${SKILLS[g.p[0]]}</span></div>
    <h3>${g.name}</h3><p>${g.how}</p>${tierList(g)}<span class="say">“${g.say}”</span></div></article>` + (g.id === 'berry' ? `<div class="demo" id="demo"></div>` : '')).join('');
  $('paidGames').innerHTML = paid.map(g => `<article class="g15">${thumb(S[g.id](), g.name)}<div class="meta" style="display:flex;gap:6px;flex-wrap:wrap">${areaChip(g)}<span class="chip paid">${SKILLS[g.p[0]]}</span></div>
    <h3>${g.name}</h3><p>${g.how}</p><details><summary>Three tiers</summary>${tierList(g)}</details></article>`).join('');

  // matrix
  $('matrix').innerHTML = `<thead><tr><th>Game</th><th>Home</th>${SKILLS.map(s => `<th>${s}</th>`).join('')}</tr></thead><tbody>` +
    LIST.map(g => `<tr class="${g.free ? 'free' : ''}"><td><b>${g.name}</b></td><td class="area">${AREAS[g.area].name}</td>${SKILLS.map((_, i) => `<td>${g.p.includes(i) ? '<span class="dot p" title="main skill"></span>' : g.s.includes(i) ? '<span class="dot s" title="also practises"></span>' : ''}</td>`).join('')}</tr>`).join('') + '</tbody>';

  // moods
  $('moods').innerHTML = [['happy', 'Happy', 'Waiting and listening'], ['joy', 'Joy', 'Got it!'], ['wow', 'Wow', 'A surprise or a new game'], ['think', 'Hmm', 'Not yet, try again'], ['sad', 'Sad', 'Story moments in Feelings Faces'], ['sleepy', 'Sleepy', 'Wind-down and bedtime']]
    .map(([m, n, d]) => `<figure>${svg('-56 -56 112 112', A.char('mallow', 0, 0, 1, m), n)}<b>${n}</b><span class="muted">${d}</span></figure>`).join('');

  // grown-ups
  $('grownShots').innerHTML = [[S.gate(), 'Grown-up gate', 'Hold the key, then tap three numbers written as words.'], [S.paywall(), 'Open the whole meadow', 'One price, paid once. Restore and Family Sharing on the same screen.'], [S.parents(), 'Grown-ups corner', 'Skills and tiers, time this week, the daily limit and language.']]
    .map(([sc, t, c]) => `<figure>${phone(sc, t)}<figcaption><b>${t}.</b> ${c}</figcaption></figure>`).join('');

  // assets: cast sheet
  const moods = ['happy', 'joy', 'wow', 'think', 'sad', 'sleepy'];
  $('castSheet').innerHTML = `<span></span>` + moods.map(m => `<span class="h">${m}</span>`).join('') +
    CAST.map(([k, n]) => `<span class="n">${n}</span>` + moods.map(m => svg('-58 -58 116 116', A.char(k, 0, 0, 1, m), `${n} ${m}`)).join('')).join('');

  const P = (inner, vb = '-30 -30 60 60') => svg(vb, inner);
  $('props').innerHTML = [
    [P(A.berry(0, 0, 2.4)), 'Berry', 'Berry Count'], [P(A.bowl(0, -6, 50, 'sky', A.berry(-8, -6) + A.berry(8, -5)), '-30 -30 60 60'), 'Berry bowl', 'Berry Count'],
    [P(A.shp('circle', 0, 0, 20, 'rose')), 'Circle', 'Sort-it Box'], [P(A.shp('square', 0, 0, 20, 'sky')), 'Square', 'Sort-it Box'], [P(A.shp('triangle', 0, 2, 20, 'butter')), 'Triangle', 'Sort-it Box'],
    [P(A.shp('star', 0, 0, 20, 'mint')), 'Star', 'Sort-it Box, Bloom'], [P(A.shp('heart', 0, 0, 20, 'blush')), 'Heart', 'Sort-it Box, Bloom'],
    [P(A.lantern(0, 16, 'butter', 'B', true, .95), '-38 -34 76 76'), 'Lantern, lit', 'Letter Lanterns'], [P(A.lantern(0, 16, 'mint', 'ก', false, .95, `'Noto Sans Thai Looped',${A.FONT}`), '-38 -34 76 76'), 'Lantern, Thai pack', 'Letter Lanterns'],
    [P(A.bubble(0, 0, 22, '7')), 'Number bubble', 'Bubble Numbers'], [P(A.cookie(0, 0, 20)), 'Cookie', 'Picnic Plus, Little Baker'], [P(A.plate(0, 4, 54)), 'Plate', 'Picnic Plus'],
    [P(A.teddy(0, 2, 1.25)), 'Teddy', 'Big & Little'], [P(A.ball(0, 0, 18)), 'Ball', 'First Sound Basket'], [P(A.bee(0, 2, 1.5)), 'Bee', 'First Sound Basket'], [P(A.apple(0, 3, 18)), 'Apple', 'First Sound Basket'],
    [P(A.paintPot(0, 0, 'rose', 1.3)), 'Paint pot', 'Paint Pots'], [P(A.bead(-14, 0, 9, 'rose') + A.bead(0, 4, 9, 'sky') + A.bead(14, 0, 9, 'butter')), 'Beads', 'Bead Patterns'],
    [P(A.sock(-6, 0, 'sky', 'stripe', .9)), 'Stripy sock', 'Sock Line'], [P(A.sock(-6, 0, 'blush', 'dot', .9)), 'Spotty sock', 'Sock Line'], [P(A.sock(-6, 0, 'butter', 'heart', .9)), 'Heart sock', 'Sock Line'],
    [P(A.bell(0, 2, 'butter', 1.1, true)), 'Bell, ringing', 'Melody Bells'], [P(A.notes(-2, 8, 1.6)), 'Music notes', 'Melody Bells'],
    [P(A.egg(0, 0, 1.8)), 'Egg', 'Little Baker'], [P(A.flourBag(0, 0, 1.2)), 'Flour bag', 'Little Baker'], [P(A.spoon(0, 2, 1.3)), 'Wooden spoon', 'Little Baker'],
    [P(A.umbrella(0, 6, 'rose', 1)), 'Umbrella', 'Weather Wardrobe'], [P(A.raincoat(0, 2, 'butter', 1)), 'Raincoat', 'Weather Wardrobe'], [P(A.sunhat(0, 4, 'oat', 1)), 'Sun hat', 'Weather Wardrobe'],
    [P(A.sunglasses(0, 0, 1.2)), 'Sunglasses', 'Weather Wardrobe'], [P(A.scarf(0, 0, 'mint', 1.1)), 'Scarf', 'Weather Wardrobe'], [P(A.boots(0, 2, 'berry', 1.2)), 'Boots', 'Weather Wardrobe'],
    [P(A.iceCream(0, -4, 1.5)), 'Ice cream', 'Feelings Faces'], [P(A.sun(0, 0, 16)), 'Sun', 'Meadow, weather'], [P(A.moon(0, 0, 18)), 'Moon', 'Night, Starry Dots'], [P(A.cloud(0, 0, 1.05)), 'Cloud', 'Meadow'],
    [P(A.drop(0, 0, 2.6)), 'Raindrop', 'Weather Wardrobe'], [P(A.flower(0, -8, 'blush', 1.3)), 'Flower', 'Trace the Trail, Paint Pots'], [P(A.tree(0, 26, .8)), 'Tree', 'Meadow'], [P(A.bush(0, 8, .85)), 'Bush', 'Berry Count']
  ].map(([a, n, d]) => tile(a, n, d)).join('');

  $('ui').innerHTML = [
    [P(A.btn(0, 0, 22, 'cream', 'home')), 'Home', '64 pt, top left in every game'], [P(A.btn(0, 0, 22, 'cream', 'back')), 'Back', 'Inside homes and the quilt'],
    [P(A.btn(0, 0, 22, 'cream', 'sound')), 'Say it again', 'Repeats the prompt'], [P(A.btn(0, 0, 22, 'butter', 'book')), 'Sticker Quilt', 'Meadow, top left'],
    [P(A.btn(0, 0, 18, 'cream', 'key')), 'Grown-up key', 'Hold 2 s to open the gate'], [P(A.btn(0, 0, 22, 'mint', 'check')), 'I’m done', 'Bloom tier only'],
    [P(A.btn(0, 0, 22, 'blush', 'replay')), 'Play again', 'End of a game'], [P(A.hand(2, 16, 1.05, -10)), 'Felt hand', 'Shows the move, never taps for the child'],
    [P(A.G(0, 0, 1, [0, 1, 2, 3, 4].map(i => `<circle cx="${(i - 2) * 11}" cy="0" r="4.4" fill="${i < 2 ? C.rose : '#fff'}" stroke="${i < 2 ? A.dk(C.rose, .25) : C.lilac}" stroke-width="1.4"/>`).join(''))), 'Petals', 'Five tasks per game'],
    [P(A.sticker(0, 0, 22, A.G(0, 0, 1.2, S.icon('berry')))), 'Sticker', 'One per finished game'], [P(A.badge(0, 0, 46, 'mint', A.G(0, 0, 1.1, S.icon('berry')))), 'Game pillow, awake', 'Free or unlocked'],
    [P(A.badge(0, 0, 46, 'powder', A.G(0, 0, 1.1, S.icon('bubbles')), true)), 'Game pillow, dozing', 'Full meadow, before purchase'],
    [P(`<g filter="url(#lift)">${A.pillowShape(-24, -18, 48, 34, 'cream')}</g>` + A.txt(0, -1, '3', 22) + `<circle cx="14" cy="-6" r="3" fill="${C.berry}"/><circle cx="14" cy="4" r="3" fill="${C.berry}"/><circle cx="-14" cy="0" r="3" fill="${C.berry}"/>`), 'Ask bubble', 'Shows what a host wants'],
    [P(A.sparkle(-8, -6, 1.6) + A.sparkle(12, 8, 1)), 'Sparkle', 'Right answers'], [P(A.zzz(-8, 8, 2)), 'Snooze', 'Dozing games, wind-down']
  ].map(([a, n, d]) => tile(a, n, d)).join('');

  $('pillows').innerHTML = LIST.map((g, i) => tile(P(A.badge(0, 0, 48, ['mint', 'blush', 'powder', 'butter', 'lilac'][i % 5], A.G(0, 0, 1.15, S.icon(g.id)), !g.free)), g.name, g.free ? 'Free' : 'Full meadow')).join('');

  $('swatches').innerHTML = [['cream', 'Cream', 'page and pillows'], ['oat', 'Oat', 'faces, floors'], ['peach', 'Peach', 'Shelly’s shell'], ['blush', 'Blush', 'cheeks, petals'], ['rose', 'Rose', 'petals, ribbon'], ['berry', 'Berry', 'berries, boots'],
    ['butter', 'Butter', 'Pip, lanterns'], ['honey', 'Honey', 'beaks, cookies'], ['sage', 'Sage', 'trees, Shelly'], ['grass', 'Grass', 'meadow'], ['mint', 'Mint', 'pillows, scarf'], ['sky', 'Sky', 'Kiki, bowls'],
    ['powder', 'Powder', 'sky, tub'], ['lilac', 'Lilac', 'Hoot, blankets'], ['lav', 'Lavender', 'wings, hints'], ['brown', 'Teddy brown', 'Tumble'], ['cocoa', 'Cocoa', 'doors, chips'], ['ink', 'Plum ink', 'eyes and lines']]
    .map(([k, n, d]) => `<div class="sw"><i style="background:${C[k]}"></i><div><b>${n}</b><br><code>${C[k]}</code><br>${d}</div></div>`).join('');

  // ---- playable Berry Count ----
  const demo = $('demo');
  const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const BUSH = [[290, 116], [310, 102], [334, 96], [356, 106], [370, 124], [298, 136], [320, 120], [344, 122], [326, 144], [352, 144]];
  const BOWL = [[182, 150], [198, 151], [214, 150], [230, 151], [190, 142], [206, 141], [222, 142], [198, 133], [214, 132], [206, 124]];
  const RANGE = { Sprout: [1, 3], Bud: [1, 5], Bloom: [3, 10] };
  const st = { tier: 'Sprout', target: 2, n: 0, round: 0, mood: 'happy', busy: false, voice: true, sticker: false };
  const say = t => { if (!st.voice) return; try { const s = window.speechSynthesis; if (!s) return; s.cancel(); const u = new SpeechSynthesisUtterance(t); u.rate = .9; u.pitch = 1.25; s.speak(u); } catch (e) { } };
  const pick = () => { const [a, b] = RANGE[st.tier]; let t; do { t = a + Math.floor(Math.random() * (b - a + 1)); } while (t === st.target && b > a); st.target = t; st.n = 0; st.mood = 'happy'; };
  const ask = () => say(`${WORDS[st.target][0].toUpperCase() + WORDS[st.target].slice(1)} ${st.target === 1 ? 'berry' : 'berries'}, please!`);
  function draw() {
    const showDots = st.tier === 'Sprout', bloom = st.tier === 'Bloom';
    let s = A.bg('meadow') + A.bush(330, 134, 2.1);
    BUSH.slice(0, 10 - st.n).forEach(([x, y], i) => { s += `<g data-hit="bush" role="button" aria-label="Berry on the bush">${`<circle cx="${x}" cy="${y}" r="15" fill="transparent"/>`}${A.berry(x, y, 1.25)}</g>`; });
    s += `<g data-hit="tumble" role="button" aria-label="Tumble">${A.char('tumble', 96, 128, 1, st.mood)}</g>`;
    const dots = showDots ? Array.from({ length: st.target }, (_, i) => `<circle cx="${124 + (i % 2) * 11}" cy="${44 + Math.floor(i / 2) * 11}" r="4.2" fill="${C.berry}"/>`).join('') : '';
    s += `<g filter="url(#lift)">${A.pillowShape(64, 28, showDots ? 80 : 56, 46, 'cream')}</g>` + A.txt(showDots ? 92 : 92, 51, st.target, 28);
    s += dots;
    s += A.bowlBack(206, 150, 90, 'sky');
    BOWL.slice(0, st.n).forEach(([x, y]) => { s += `<g data-hit="bowl" role="button" aria-label="Berry in the bowl">${A.berry(x, y, 1.1)}</g>`; });
    s += A.bowlFront(206, 150, 90, 'sky');
    if (st.n) s += A.txt(BOWL[st.n - 1][0], BOWL[st.n - 1][1] - 18, st.n, 14, C.lav);
    if (bloom) s += `<g data-hit="tumble" role="button" aria-label="I'm done">${A.btn(266, 176, 15, 'mint', 'check')}</g>`;
    if (st.mood === 'joy') s += A.sparkle(150, 70, .9) + A.sparkle(60, 80, .7) + A.sparkle(230, 120, .8);
    s += A.hud(st.round);
    if (st.sticker) s += `<rect width="400" height="200" fill="#3A2B45" opacity=".35"/>` + A.sticker(200, 100, 40, A.G(200, 100, 2.4, S.icon('berry'))) + A.sparkle(244, 66, 1.2) + A.sparkle(160, 140, .9);
    demo.querySelector('svg').innerHTML = `<g clip-path="url(#scr)">${s}</g>`;
  }
  function win() {
    st.busy = true; st.mood = 'joy'; st.round++; draw(); say('Yum! Thank you!');
    setTimeout(() => {
      if (st.round >= 5) { st.sticker = true; draw(); say('You got a sticker!'); setTimeout(() => { st.sticker = false; st.round = 0; pick(); st.busy = false; draw(); ask(); }, 2200); }
      else { pick(); st.busy = false; draw(); ask(); }
    }, 1300);
  }
  demo.innerHTML = `<svg viewBox="0 0 400 200" role="group" aria-label="Playable Berry Count"></svg>
    <div class="stack"><span class="eyebrow">Try it here</span><h3>Feed Tumble</h3><p>Tap berries on the bush to drop them in the bowl. Tap a berry in the bowl to take it back. In Bloom, tap the check button or Tumble when you think it’s right. Turn on your sound to hear the counting.</p>
    <div class="ctl" role="group" aria-label="Tier">${TIERS.map(([t]) => `<button type="button" data-tier="${t}" aria-pressed="${t === st.tier}">${t}</button>`).join('')}<button type="button" id="voiceBtn" aria-pressed="true">Voice on</button></div></div>`;
  demo.querySelector('svg').addEventListener('click', e => {
    const h = e.target.closest('[data-hit]'); if (!h || st.busy) return;
    const k = h.dataset.hit;
    if (k === 'bush' && st.n < 10) { st.n++; st.mood = 'happy'; say(WORDS[st.n]); draw(); if (st.tier !== 'Bloom' && st.n === st.target) win(); }
    else if (k === 'bowl' && st.n > 0) { st.n--; st.mood = 'happy'; draw(); }
    else if (k === 'tumble') {
      if (st.tier === 'Bloom' && st.n === st.target) win();
      else { st.mood = 'think'; draw(); say(st.n > st.target ? 'Hmm, too many. Can you take some back?' : `Hmm, let's count again. ${st.target} berries, please!`); }
    }
  });
  demo.querySelectorAll('[data-tier]').forEach(b => b.addEventListener('click', () => {
    st.tier = b.dataset.tier; demo.querySelectorAll('[data-tier]').forEach(x => x.setAttribute('aria-pressed', x === b)); st.round = 0; st.busy = false; st.sticker = false; pick(); draw(); ask();
  }));
  $('voiceBtn').addEventListener('click', e => { st.voice = !st.voice; e.currentTarget.setAttribute('aria-pressed', st.voice); e.currentTarget.textContent = st.voice ? 'Voice on' : 'Voice off'; if (!st.voice) try { speechSynthesis.cancel(); } catch (x) { } });
  pick(); draw();
})();
