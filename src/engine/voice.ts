// Placeholder narrator. Launch uses recorded English clips; until then the device's text-to-speech
// reads the same lines. Native apps use the TTS plugin, browsers use speechSynthesis.
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

let enabled = true;
export const setVoice = (on: boolean) => { enabled = on; if (!on) stop(); };

export function stop() {
  if (Capacitor.isNativePlatform()) void TextToSpeech.stop().catch(() => {});
  else try { speechSynthesis.cancel(); } catch { /* no speech in this browser */ }
}

export function say(text: string) {
  if (!enabled) return;
  if (Capacitor.isNativePlatform()) {
    void TextToSpeech.stop().catch(() => {}).then(() => TextToSpeech.speak({ text, lang: 'en-US', rate: 0.9, pitch: 1.2, volume: 1 })).catch(() => {});
    return;
  }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9; u.pitch = 1.25;
    speechSynthesis.speak(u);
  } catch { /* no speech in this browser */ }
}

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const word = (n: number) => WORDS[n] ?? String(n);
export const Word = (n: number) => word(n)[0].toUpperCase() + word(n).slice(1);
