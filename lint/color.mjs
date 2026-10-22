// Color parsing, conversion and WCAG 2.x contrast helpers.

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
}

const hx = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

export function rgbToHex(r, g, b, a = 1) {
  const base = '#' + hx(r) + hx(g) + hx(b);
  return a >= 1 ? base : base + hx(a * 255);
}

export function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 };
}

function alphaOf(raw) {
  if (raw == null || raw === '') return 1;
  const s = String(raw).trim();
  return s.endsWith('%') ? parseFloat(s) / 100 : parseFloat(s);
}

// Parses rgb()/rgba()/hsl()/hsla() source text into a hex string.
export function functionalToHex(fn, args) {
  const parts = args.split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const a = alphaOf(parts[3]);
  if (/^rgb/i.test(fn)) {
    const ch = parts.slice(0, 3).map((p) => (p.endsWith('%') ? (parseFloat(p) * 255) / 100 : parseFloat(p)));
    if (ch.some((n) => !Number.isFinite(n))) return null;
    return rgbToHex(ch[0], ch[1], ch[2], a);
  }
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);
  if (![h, s, l].every(Number.isFinite)) return null;
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b, a);
}

function channel(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

// Composites a possibly translucent foreground over an opaque background.
export function composite(fgHex, bgHex) {
  const f = hexToRgb(fgHex);
  if (f.a >= 1) return fgHex.slice(0, 7);
  const b = hexToRgb(bgHex);
  return rgbToHex(f.r * f.a + b.r * (1 - f.a), f.g * f.a + b.g * (1 - f.a), f.b * f.a + b.b * (1 - f.a));
}

export function contrastRatio(fgHex, bgHex) {
  const fg = composite(fgHex, bgHex);
  const l1 = luminance(fg);
  const l2 = luminance(bgHex.slice(0, 7));
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

export function colorDistance(a, b) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  const rm = (x.r + y.r) / 2;
  const dr = x.r - y.r;
  const dg = x.g - y.g;
  const db = x.b - y.b;
  return Math.sqrt((2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db);
}
