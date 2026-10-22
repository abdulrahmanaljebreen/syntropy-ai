/* core.js · Syntropy for AI film · drawing primitives
 * Adapted from the safqah-canvas-film core: same deterministic rules (no Math.random,
 * no state carried between frames), but crisp interface drawing instead of the pen model.
 * Classic script: file:// blocks ES module imports in Chrome.
 */
'use strict';

/* ── Syntropy tokens (knowledge/tokens/resolved.json, Light mode) ─────── */
const C = {
  surface: '#f9faf9',      // bg/surface
  base: '#ffffff',         // bg/base
  elevated: '#f4f6f2',     // bg/elevated
  ink: '#111312',          // text/default, bg/inverse
  muted: '#535d58',        // text/muted
  subtle: '#86938d',       // text/subtle
  disabled: '#c3c9c6',     // text/disabled
  border: '#e1e4e3',       // border/default
  borderSubtle: '#edefee', // border/subtle
  borderStrong: '#b0b9b5', // border/strong
  brand: '#4daa57',        // bg/brand/primary
  brandHover: '#469b4f',   // bg/brand/primary-hover
  brandDark: '#387c3f',    // bg/brand/darkest, text/brand/darkest
  lg50: '#fafdfb', lg100: '#e4f3e5', lg200: '#d6edd9', lg300: '#aedab2', lg400: '#77c27f',
  yellow: '#fcee21',       // bg/brand/yellow (accent, sparingly)
  yellowSubtle: '#fffdeb', // bg/brand/yellow-subtle
  success: '#217f39', successBg: '#eefbf1', successIcon: '#2ba349',
  warnText: '#a25f00', warnBg: '#fff5e8', warnBorder: '#ffd8a2',
  error: '#da002a', errorBg: '#ffecf0',
  // dark surface (terminal): Dark-mode values of the same tokens
  dInk: '#edefee', dMuted: '#b0b9b5', dSubtle: '#86938d', dBrand: '#77c27f',
  dError: '#ff6d87', dWarn: '#ffb246', dBorder: '#303230', dElev: '#1c1d1c',
};
const RAMP = ['#008150', '#00B224', '#FBE900'];   // brand ramp: opening and closing title only

const AR = '"IBM Plex Sans Arabic"';
const MONO = 'Menlo, "IBM Plex Sans Arabic", monospace';

/* ── frame ─────────────────────────────────────────────────────────────── */
let W = 1920, H = 1080, FPS = 30;
let ctx = null;
let A = 1;                                         // global alpha multiplier
const M = 96;                                      // safe margin
function setFrame(c, w, h, fps) { ctx = c; W = w; H = h; FPS = fps; }
function withAlpha(a, fn) { const o = A; A = o * clamp01(a); if (A > 0.002) fn(); A = o; }

/* ── numbers, easing, ranges ───────────────────────────────────────────── */
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const lerp = (a, b, p) => a + (b - a) * p;
const span = (p, a, b) => clamp01((p - a) / (b - a));
const easeOutCubic = p => 1 - Math.pow(1 - p, 3);
const easeInOutCubic = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const easeOutBack = p => { const c1 = 1.4, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
const ein = (t, a, d = 0.45) => easeOutCubic(span(t, a, a + d));      // eased fade-in from a
const eout = (t, b, d = 0.45) => 1 - easeInOutCubic(span(t, b - d, b)); // eased fade-out ending at b

/* deterministic RNG (mulberry32) */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* bidi isolate for Latin inside Arabic lines */
const L = s => '⁦' + s + '⁩';

/* ── shapes ────────────────────────────────────────────────────────────── */
function rrPath(x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function rr(x, y, w, h, r, o = {}) {
  const { fill = null, stroke = null, lw = 2, alpha = 1, shadow = 0 } = o;
  ctx.save();
  ctx.globalAlpha = A * alpha;
  rrPath(x, y, w, h, r);
  if (fill) {
    if (shadow) { ctx.shadowColor = 'rgba(17,19,18,0.08)'; ctx.shadowBlur = shadow; ctx.shadowOffsetY = shadow / 2; }
    ctx.fillStyle = fill; ctx.fill();
    ctx.shadowColor = 'transparent';
  }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
function circle(x, y, r, o = {}) {
  const { fill = null, stroke = null, lw = 2, alpha = 1 } = o;
  ctx.save(); ctx.globalAlpha = A * alpha;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
function line(x1, y1, x2, y2, o = {}) {
  const { color = C.border, lw = 2, alpha = 1, p = 1, dash = null } = o;
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = A * alpha;
  ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, p), lerp(y1, y2, p)); ctx.stroke();
  ctx.restore();
}
/* check mark drawn on, centred at x,y with size s */
function check(x, y, s, o = {}) {
  const { color = C.base, lw = 3, p = 1, alpha = 1 } = o;
  if (p <= 0) return;
  const pts = [[x - s * 0.42, y + s * 0.02], [x - s * 0.12, y + s * 0.32], [x + s * 0.45, y - s * 0.3]];
  const l1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]);
  const l2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]);
  const d = (l1 + l2) * clamp01(p);
  ctx.save(); ctx.globalAlpha = A * alpha;
  ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  if (d <= l1) ctx.lineTo(lerp(pts[0][0], pts[1][0], d / l1), lerp(pts[0][1], pts[1][1], d / l1));
  else { ctx.lineTo(pts[1][0], pts[1][1]); const q = (d - l1) / l2; ctx.lineTo(lerp(pts[1][0], pts[2][0], q), lerp(pts[1][1], pts[2][1], q)); }
  ctx.stroke(); ctx.restore();
}
/* simple arrow glyph pointing in direction dir (+1 right, -1 left) */
function arrow(x, y, s, dir, o = {}) {
  const { color = C.ink, lw = 2.5, alpha = 1 } = o;
  ctx.save(); ctx.globalAlpha = A * alpha; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(x - dir * s / 2, y); ctx.lineTo(x + dir * s / 2, y);
  ctx.moveTo(x + dir * s / 2 - dir * s * 0.35, y - s * 0.35); ctx.lineTo(x + dir * s / 2, y); ctx.lineTo(x + dir * s / 2 - dir * s * 0.35, y + s * 0.35);
  ctx.stroke(); ctx.restore();
}

/* ── text ──────────────────────────────────────────────────────────────── */
function fontStr(size, weight = 400, family = AR) { return `${weight} ${size}px ${family}`; }
function tw(str, size, weight = 400, family = AR, dir = 'rtl') {
  ctx.save(); ctx.font = fontStr(size, weight, family); ctx.direction = dir;
  const w = ctx.measureText(str).width; ctx.restore(); return w;
}
/* align: 'left' | 'right' | 'center' (physical). dir sets the bidi paragraph direction. */
function text(str, x, y, o = {}) {
  const { size = 32, weight = 400, color = C.ink, align = 'right', dir = 'rtl', family = AR, alpha = 1, baseline = 'alphabetic', fill = null } = o;
  if (!str) return 0;
  ctx.save();
  ctx.globalAlpha = A * alpha;
  ctx.font = fontStr(size, weight, family);
  ctx.direction = dir; ctx.textAlign = align; ctx.textBaseline = baseline;
  ctx.fillStyle = fill || color;
  ctx.fillText(str, x, y);
  const w = ctx.measureText(str).width;
  ctx.restore();
  return w;
}
/* pill chip, anchored by its right edge (RTL) or left edge; returns its width */
function chip(str, x, y, o = {}) {
  const { size = 30, weight = 500, h = size * 1.9, padX = size * 0.8, fill = C.base, stroke = C.border, color = C.ink, anchor = 'right', dir = 'rtl', family = AR, alpha = 1, scale = 1, lw = 2 } = o;
  const w = tw(str, size, weight, family, dir) + padX * 2;
  const x0 = anchor === 'right' ? x - w : anchor === 'center' ? x - w / 2 : x;
  ctx.save();
  if (scale !== 1) { const cx = x0 + w / 2, cy = y + h / 2; ctx.translate(cx, cy); ctx.scale(scale, scale); ctx.translate(-cx, -cy); }
  rr(x0, y, w, h, h / 2, { fill, stroke, alpha, lw });
  text(str, x0 + w / 2, y + h / 2 + size * 0.06, { size, weight, color, align: 'center', dir, family, alpha, baseline: 'middle' });
  ctx.restore();
  return w;
}

/* ── images ────────────────────────────────────────────────────────────── */
const IMG = {};
function loadImages(map) {
  return Promise.all(Object.entries(map).map(([k, src]) => new Promise((res, rej) => {
    const im = new Image(); im.onload = () => { IMG[k] = im; res(); }; im.onerror = () => rej(new Error('image ' + src)); im.src = src;
  })));
}
/* draw crop [sx,sy,sw,sh] of image k fitted (contain) inside x,y,w,h */
function imgCrop(k, crop, x, y, w, h, o = {}) {
  const { alpha = 1, radius = 0, align = 'center' } = o;
  const im = IMG[k]; if (!im) return null;
  const [sx, sy, sw, sh] = crop;
  const s = Math.min(w / sw, h / sh), dw = sw * s, dh = sh * s;
  const dx = align === 'right' ? x + w - dw : align === 'left' ? x : x + (w - dw) / 2, dy = y + (h - dh) / 2;
  ctx.save(); ctx.globalAlpha = A * alpha;
  if (radius) { rrPath(x, y, w, h, radius); ctx.clip(); }
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(im, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.restore();
  return { x: dx, y: dy, w: dw, h: dh };
}

/* ── typing ────────────────────────────────────────────────────────────────
 * A typed string: per-character reveal times with seeded jitter. Keystroke
 * events are registered once at load so the sound lines up with the frames.
 */
function typer(str, t0, cps, seed, evs, gain = 1) {
  const chars = [...str];
  const r = rng(seed);
  const times = [];
  let t = t0;
  for (let i = 0; i < chars.length; i++) {
    times.push(t);
    if (evs) evs.push({ t, type: chars[i] === ' ' ? 'space' : 'key', gain, seed: seed * 131 + i });
    t += (1 / cps) * (0.65 + r() * 0.7) * (chars[i] === ' ' ? 1.4 : 1);
  }
  return {
    t1: t, str,
    count: tt => { let n = 0; while (n < times.length && times[n] <= tt) n++; return n; },
    at: tt => { let n = 0; while (n < times.length && times[n] <= tt) n++; return chars.slice(0, n).join(''); },
  };
}
const caretOn = t => Math.floor(t * 2.2) % 2 === 0;
