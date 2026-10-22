/* sfx.mjs · interface sound effects, synthesised (no samples, no music)
 * synthesize(events, duration) -> 16-bit PCM stereo WAV Buffer, peak about -6 dBFS.
 * events: [{ t, type, gain }]  types: key space enter click pop tick blip whoosh chime
 * Deterministic: every random draw comes from a seeded generator.
 * CLI: node sfx.mjs events.json out.wav <duration>
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SR = 48000;

function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
/* RBJ biquad band-pass, frequency can change per sample */
function bandpass() {
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x, f, Q) => {
    const w = 2 * Math.PI * f / SR, al = Math.sin(w) / (2 * Q), cs = Math.cos(w);
    const b0 = al, b2 = -al, a0 = 1 + al, a1 = -2 * cs, a2 = 1 - al;
    const y = (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y; return y;
  };
}
const env = (i, att, dec) => { const t = i / SR; return t < att ? t / att : Math.exp(-(t - att) / dec); };

/* each voice returns a Float32Array (mono) */
const VOICES = {
  key(r) {   // soft keyboard tap: band-passed noise + a tiny low body
    const n = Math.round(SR * 0.045), out = new Float32Array(n), bp = bandpass(), f = 2300 + r() * 1300;
    for (let i = 0; i < n; i++) out[i] = bp(r() * 2 - 1, f, 1.2) * env(i, 0.0008, 0.006) * 2.2 + Math.sin(2 * Math.PI * 170 * i / SR) * env(i, 0.001, 0.008) * 0.25;
    return out;
  },
  space(r) {
    const n = Math.round(SR * 0.06), out = new Float32Array(n), bp = bandpass(), f = 1500 + r() * 400;
    for (let i = 0; i < n; i++) out[i] = bp(r() * 2 - 1, f, 1.0) * env(i, 0.001, 0.009) * 2.0 + Math.sin(2 * Math.PI * 140 * i / SR) * env(i, 0.001, 0.012) * 0.3;
    return out;
  },
  enter(r) {
    const n = Math.round(SR * 0.09), out = new Float32Array(n), bp = bandpass();
    for (let i = 0; i < n; i++) out[i] = bp(r() * 2 - 1, 1700, 1.0) * env(i, 0.001, 0.012) * 2.4 + Math.sin(2 * Math.PI * 120 * i / SR) * env(i, 0.001, 0.02) * 0.45;
    return out;
  },
  click(r) { // UI tap: short noise tick plus a soft pitched body
    const n = Math.round(SR * 0.08), out = new Float32Array(n), bp = bandpass();
    for (let i = 0; i < n; i++) out[i] = bp(r() * 2 - 1, 3200, 2.0) * env(i, 0.0005, 0.004) * 1.6 + Math.sin(2 * Math.PI * 820 * i / SR) * env(i, 0.001, 0.018) * 0.55;
    return out;
  },
  pop(r) {   // appear: quick upward sine blip
    const n = Math.round(SR * 0.12), out = new Float32Array(n); let ph = 0;
    for (let i = 0; i < n; i++) { const f = 480 + 520 * Math.min(1, i / (SR * 0.05)); ph += 2 * Math.PI * f / SR; out[i] = Math.sin(ph) * env(i, 0.003, 0.03) * 0.6; }
    return out;
  },
  tick(r) {  // confirmation tick
    const n = Math.round(SR * 0.2), out = new Float32Array(n);
    for (let i = 0; i < n; i++) { const t = i / SR; out[i] = (Math.sin(2 * Math.PI * 1760 * t) * 0.6 + Math.sin(2 * Math.PI * 2640 * t) * 0.2) * env(i, 0.002, 0.045) * 0.7; }
    return out;
  },
  blip(r) {  // gentle low note: a problem found, never an alarm
    const n = Math.round(SR * 0.18), out = new Float32Array(n);
    for (let i = 0; i < n; i++) { const t = i / SR; out[i] = (Math.sin(2 * Math.PI * 392 * t) + 0.3 * Math.sin(2 * Math.PI * 784 * t)) * env(i, 0.004, 0.05) * 0.6; }
    return out;
  },
  whoosh(r) { // swept band-passed noise, raised-cosine envelope
    const d = 0.62, n = Math.round(SR * d), out = new Float32Array(n), bp = bandpass(), bp2 = bandpass();
    for (let i = 0; i < n; i++) {
      const u = i / n, f = 350 * Math.pow(7, Math.sin(Math.PI * u)), e = Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 2);
      const x = r() * 2 - 1;
      out[i] = (bp(x, f, 0.9) * 0.8 + bp2(x, f * 1.6, 1.4) * 0.4) * e * 1.3;
    }
    return out;
  },
  chime(r) { // two soft bell partials, staggered
    const n = Math.round(SR * 1.6), out = new Float32Array(n);
    const notes = [[1046.5, 0, 0.5], [1568.0, 0.07, 0.38], [2093.0, 0.07, 0.08]];
    for (const [f, dl, g] of notes) {
      const o = Math.round(dl * SR);
      for (let i = o; i < n; i++) { const k = i - o, t = k / SR; out[i] += (Math.sin(2 * Math.PI * f * t) + 0.12 * Math.sin(2 * Math.PI * f * 2.76 * t)) * env(k, 0.004, 0.42) * g; }
    }
    return out;
  },
};

/* relative levels: keystrokes sit low, the success chime is the loudest event */
const LEVEL = { key: 0.15, space: 0.15, enter: 0.35, click: 1.1, pop: 1.0, tick: 1.8, blip: 1.4, whoosh: 1.25, chime: 2.2 };

export function synthesize(events, duration) {
  const N = Math.ceil(duration * SR) + SR, mix = new Float32Array(N);
  const r = rng(20261019);
  for (const e of events) {
    const v = VOICES[e.type]; if (!v) continue;
    const vr = rng(e.seed ?? Math.floor(r() * 2 ** 31));
    const buf = v(vr), g = (e.gain ?? 1) * (LEVEL[e.type] ?? 1);
    const o = Math.round(e.t * SR);
    for (let i = 0; i < buf.length && o + i < N; i++) if (o + i >= 0) mix[o + i] += buf[i] * g;
  }
  // gentle high shelf off (one-pole low-pass at ~9 kHz) to keep everything soft
  let lp = 0; const a = 1 - Math.exp(-2 * Math.PI * 9000 / SR);
  for (let i = 0; i < N; i++) { lp += a * (mix[i] - lp); mix[i] = lp; }
  let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(mix[i]));
  const target = Math.pow(10, -6 / 20), k = peak > 0 ? target / peak : 1;
  const n = Math.round(duration * SR);
  const data = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) { const s = Math.max(-1, Math.min(1, mix[i] * k)) * 32767 | 0; data.writeInt16LE(s, i * 4); data.writeInt16LE(s, i * 4 + 2); }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return { wav: Buffer.concat([h, data]), peakDb: 20 * Math.log10(peak * k) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [evFile, out, dur] = process.argv.slice(2);
  const { wav, peakDb } = synthesize(JSON.parse(readFileSync(evFile, 'utf8')), +dur);
  writeFileSync(out, wav); console.log('wrote', out, 'peak', peakDb.toFixed(1), 'dBFS');
}
