# Plushie Meadow

A bright, felt-stitched learning game for children aged 3 to 6, for iOS and Android.
Six plush friends host 20 mini games that teach counting, letters, shapes, colors,
memory and fine motor skills. Five games are free; one grown-up purchase opens the rest.

- Design v1: [`design/plushie-meadow.html`](design/plushie-meadow.html) (open in a browser).
  The design sources live next to it; `python3 build.py` inside `design/` rebuilds the page.

## Prototype

The first playable slice: the meadow home screen, **Berry Count** with all three levels,
the five-petal progress row, the sticker reward and Sticker Quilt, and the grown-up gate.
The other homes wiggle and say they are still getting ready.

Built with PixiJS 8 (2D WebGL) inside Capacitor 8, as the design recommends.

### Play it in a browser

```sh
npm install
npm run dev        # prints a local and a network URL; open the network one on a phone on the same Wi-Fi
```

Turn the phone sideways. Add `?scene=berry` to the URL to jump straight into Berry Count.

### Run it on a phone

```sh
npm run build
npx cap add ios        # once; needs Xcode on a Mac
npx cap add android    # once; needs Android Studio
npx cap sync
npx cap open ios       # or: npx cap open android
```

The app locks itself to landscape at start-up. The bundle id is `tech.thegang.plushiemeadow`
in `capacitor.config.ts`; change it before the first store upload if you want a different one.

### Grown-ups corner

Press and hold the key at the top right of the meadow for 2 seconds, then tap the three
numbers written as words. From there you can pin Berry Count to Sprout, Bud or Bloom,
turn the voice off, or reset progress.

### Placeholders in the prototype

- **Voice:** the device's text-to-speech reads the lines. Launch uses recorded English clips.
- **Sounds:** synthesised in code (pomf, pop, tok, boing, chime ladder). Launch uses recorded sounds.
- **Art:** the design's SVG drawings are baked into textures when the app starts.
  Production will ship pre-made texture atlases for a faster start.

### Checks

```sh
npm test           # game rules and level changes
npm run typecheck
npm run build
```

### Layout

```
src/art/         design art kit (SVG) and the list of drawings the game bakes
src/engine/      stage and scaling, tweens, sound, voice, saves, level rules, shared widgets
src/games/berry/ Berry Count rules (logic.ts) and screen (BerryCount.ts)
src/scenes/      splash, meadow, sticker quilt, grown-up gate
tests/           unit tests
design/          design v1 page and sources
```
