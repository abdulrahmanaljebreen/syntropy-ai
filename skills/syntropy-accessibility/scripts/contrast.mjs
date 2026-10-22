#!/usr/bin/env node
// WCAG 2.x contrast for two Syntropy tokens (or hex values) in Light and Dark.
// Zero dependencies, Node >= 20.
//
// Usage:
//   node scripts/contrast.mjs <foreground> <background> [--over <token|hex>] [--large] [--non-text] [--json]
//
// Examples:
//   node scripts/contrast.mjs text/muted bg/elevated
//   node scripts/contrast.mjs text/on-brand bg/brand/primary
//   node scripts/contrast.mjs "#999999" bg/base
//   node scripts/contrast.mjs --text-muted var(--bg-surface)
//   node scripts/contrast.mjs text/on-brand bg/overlay --over bg/elevated
//
// Foreground and background accept a token name (text/muted), a CSS variable
// style name (--text-muted, var(--text-muted), text-muted) or a hex colour
// (#rgb, #rgba, #rrggbb, #rrggbbaa).
// Alpha: a translucent background is composited over bg/base of the same mode
// (or the --over backdrop); a translucent foreground is composited over the
// resolved background.
// Required ratio: 4.5 for text, 3 for icon/* and border/* tokens, 3 with
// --large (24px regular or 18.66px bold) or --non-text.
// Exit code: 0 when the required ratio is met in both modes, 1 when not,
// 2 on usage errors.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const TOKEN_PATHS = [
  join(HERE, '..', 'references', 'data', 'tokens-resolved.json'),
  join(HERE, '..', '..', '..', 'knowledge', 'tokens', 'resolved.json'),
];
const MODES = ['Light', 'Dark'];
const AA_NORMAL = 4.5;
const AA_LARGE = 3;

// Known system-level issues: report them, never "fix" them with raw hex.
const KNOWN_RISKS = {
  'text/on-brand on bg/success': 'StatusPill Variant=solid Tone=success. Prefer Variant=subtle (text/success on bg/success-subtle).',
  'text/on-brand on bg/warning': 'Never white on warning. Use Variant=subtle (text/warning on bg/warning-subtle).',
  'border/strong on bg/base': 'Strongest neutral border is under 3:1 in Light. Never the only edge of a control; add a visible label and a second cue, flag to the DS team.',
  'border/strong on bg/surface': 'Under 3:1 in Light. Never the only edge of a control.',
  'border/strong on bg/elevated': 'Under 3:1 in Light. Never the only edge of a control.',
  'text/default on bg/brand/yellow': 'text/default flips to light in Dark (1.02:1). Use bg/brand/yellow-subtle with text/default.',
  'text/default on bg/warning': 'Collapses in Dark. Use bg/warning-subtle with text/warning.',
};

// Brand green as built (decided 19 Oct 2026): accepted at its measured ratio, never a finding.
const BRAND_FILLS = ['bg/brand/primary', 'bg/brand/primary-hover', 'bg/brand/primary-pressed'];
const LIGHT_SURFACES = ['bg/base', 'bg/surface', 'bg/elevated', 'bg/brand/primary-subtle', 'bg/brand/accent-50', 'bg/brand/accent-100', 'bg/brand/lightest'];
const BRAND_AS_BUILT = new Set([
  ...BRAND_FILLS.flatMap((b) => ['text/on-brand', 'icon/on-brand'].map((f) => `${f} on ${b}`)),
  ...LIGHT_SURFACES.flatMap((b) => ['text/brand/primary', 'icon/brand/primary', 'border/brand/primary'].map((f) => `${f} on ${b}`)),
]);

function usage(msg) {
  if (msg) process.stderr.write(`contrast: ${msg}\n`);
  process.stderr.write('usage: node scripts/contrast.mjs <foreground> <background> [--over <token|hex>] [--large] [--non-text] [--json]\n');
  process.exit(2);
}

function loadTokens() {
  for (const p of TOKEN_PATHS) {
    if (existsSync(p)) {
      const data = JSON.parse(readFileSync(p, 'utf8'));
      return { tokens: data.tokens || data, path: p };
    }
  }
  usage(`tokens file not found. Looked in:\n  ${TOKEN_PATHS.join('\n  ')}`);
}

// ---------- colour math ----------

function parseHex(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(h)) return null;
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}

function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function composite(fg, bg) {
  // Rounded to whole channels, as a rendered pixel would be (matches contrast-pairs.json).
  const mix = (x, y) => Math.round(x * fg.a + y * (1 - fg.a));
  return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), a: 1 };
}

function luminance({ r, g, b }) {
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

// ---------- token lookup ----------

function normalise(name) {
  return String(name).trim().replace(/^var\(\s*/, '').replace(/\s*\)$/, '').replace(/^--/, '').toLowerCase();
}

function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[a.length][b.length];
}

function resolveInput(input, tokens) {
  const hex = parseHex(input);
  if (hex && /^#?[0-9a-f]+$/i.test(String(input).trim())) {
    return { label: String(input).trim(), token: null, byMode: { Light: hex, Dark: hex } };
  }
  const want = normalise(input);
  const colorNames = Object.keys(tokens).filter((k) => tokens[k].type === 'color');
  const match = colorNames.find((k) => k.toLowerCase() === want)
    || colorNames.find((k) => k.toLowerCase().replace(/\//g, '-') === want.replace(/\//g, '-'));
  if (!match) {
    const ranked = colorNames
      .filter((k) => tokens[k].collection === 'Semantic')
      .map((k) => [k, editDistance(k.toLowerCase(), want)])
      .sort((x, y) => x[1] - y[1])
      .slice(0, 5)
      .map(([k]) => k);
    usage(`unknown colour token or hex "${input}". Closest semantic tokens: ${ranked.join(', ')}`);
  }
  const v = tokens[match].value;
  const byMode = {};
  for (const m of MODES) {
    const raw = v[m] ?? v.Default ?? Object.values(v)[0];
    const c = parseHex(raw);
    if (!c) usage(`token ${match} has a non-hex value in ${m}: ${raw}`);
    byMode[m] = c;
  }
  return { label: match, token: match, collection: tokens[match].collection, byMode };
}

// ---------- main ----------

function main(argv) {
  const flags = new Set(argv.filter((a) => ['--large', '--non-text', '--json', '--help', '-h'].includes(a)));
  if (flags.has('--help') || flags.has('-h')) usage();
  const rest = [];
  let overArg = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--over') { overArg = argv[++i]; if (!overArg) usage('--over needs a value'); continue; }
    if (flags.has(argv[i])) continue;
    rest.push(argv[i]);
  }
  if (rest.length !== 2) usage('give exactly one foreground and one background');

  const { tokens, path } = loadTokens();
  const fg = resolveInput(rest[0], tokens);
  const bg = resolveInput(rest[1], tokens);
  const over = resolveInput(overArg || 'bg/base', tokens);

  const isNonTextToken = /^(icon|border)\//.test(fg.token || '');
  const required = flags.has('--large') || flags.has('--non-text') || isNonTextToken ? AA_LARGE : AA_NORMAL;
  const roleLabel = flags.has('--large') ? 'large text' : isNonTextToken || flags.has('--non-text') ? 'non-text (icon, control border, focus)' : 'body text';

  const modes = {};
  for (const m of MODES) {
    let b = bg.byMode[m];
    let composedBg = false;
    if (b.a < 1) {
      const o = over.byMode[m];
      if (o.a < 1) usage(`backdrop ${over.label} must be opaque`);
      b = composite(b, o);
      composedBg = true;
    }
    let f = fg.byMode[m];
    const composedFg = f.a < 1;
    if (composedFg) f = composite(f, b);
    const r = ratio(f, b);
    modes[m] = {
      fg: toHex(f),
      bg: toHex(b),
      ratio: Math.round(r * 100) / 100,
      aaNormal: r >= AA_NORMAL,
      aaLarge: r >= AA_LARGE,
      meetsRequired: r >= required,
      composited: [composedFg && 'fg', composedBg && `bg over ${over.label}`].filter(Boolean),
    };
  }

  const both = MODES.every((m) => modes[m].meetsRequired);
  const largeBoth = MODES.every((m) => modes[m].aaLarge);
  let verdict;
  if (both) verdict = 'pass';
  else if (required === AA_NORMAL && largeBoth) verdict = 'large-only';
  else if (!modes.Light.meetsRequired && !modes.Dark.meetsRequired) verdict = 'fail-both';
  else verdict = modes.Light.meetsRequired ? 'fail-dark' : 'fail-light';

  const key = fg.token && bg.token ? `${fg.token} on ${bg.token}` : null;
  if (verdict !== 'pass' && key && BRAND_AS_BUILT.has(key)) verdict = 'brand-as-built';
  const knownRisk = key ? KNOWN_RISKS[key] || null : null;
  const notes = [];
  if (knownRisk) notes.push(`Known system risk: ${knownRisk}`);
  if (verdict === 'brand-as-built') notes.push('Brand green as built: accepted by DS decision (19 Oct 2026). Use the component as built; do not flag or recolour.');
  if (!fg.token || !bg.token) notes.push('A raw hex value is not a Syntropy token. Use it only to evaluate a request; ship semantic tokens.');
  if (fg.collection && fg.collection !== 'Semantic') notes.push(`${fg.token} is a primitive. Product UI uses semantic tokens only.`);
  if (bg.collection && bg.collection !== 'Semantic') notes.push(`${bg.token} is a primitive. Product UI uses semantic tokens only.`);
  if (/disabled/.test(fg.token || '')) notes.push('Disabled content is exempt from contrast (SC 1.4.3), but it must not carry needed information.');

  const result = { fg: fg.label, bg: bg.label, over: over.label, role: roleLabel, required, verdict, modes, knownRisk, notes, tokensFile: path };

  if (flags.has('--json')) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } else {
    const yn = (b) => (b ? 'pass' : 'FAIL');
    const lines = [];
    lines.push(`${fg.label} on ${bg.label}  (role: ${roleLabel}, required ${required}:1 in both modes)`);
    lines.push('');
    lines.push('Mode   fg       bg       ratio    AA 4.5   AA 3.0   required');
    for (const m of MODES) {
      const x = modes[m];
      const comp = x.composited.length ? `  (composited: ${x.composited.join(', ')})` : '';
      lines.push(`${m.padEnd(6)} ${x.fg}  ${x.bg}  ${(x.ratio.toFixed(2) + ':1').padEnd(7)}  ${yn(x.aaNormal).padEnd(7)}  ${yn(x.aaLarge).padEnd(7)}  ${yn(x.meetsRequired)}${comp}`);
    }
    lines.push('');
    lines.push(`Verdict: ${verdict}`);
    for (const n of notes) lines.push(`Note: ${n}`);
    process.stdout.write(lines.join('\n') + '\n');
  }
  return both ? 0 : 1;
}

process.exitCode = main(process.argv.slice(2));
