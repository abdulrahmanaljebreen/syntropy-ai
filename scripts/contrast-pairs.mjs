#!/usr/bin/env node
// Computes WCAG 2.x contrast for every meaningful Syntropy foreground/background
// token pair, in Light and Dark, from knowledge/tokens/resolved.json.
// Writes knowledge/ux/accessibility/contrast-pairs.json and contrast-pairs.md.
// Zero dependencies. Usage: node scripts/contrast-pairs.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MODES = ['Light', 'Dark'];

export const THRESHOLDS = Object.freeze({ aaNormal: 4.5, aaLarge: 3, nonText: 3 });

// ---------- colour math ----------

/** Parse #rgb, #rrggbb or #rrggbbaa into { r, g, b, a } with r/g/b 0-255 and a 0-1. */
export function parseHex(hex) {
  if (typeof hex !== 'string') throw new TypeError(`Not a hex colour: ${hex}`);
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(h)) throw new TypeError(`Not a hex colour: ${hex}`);
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}

export function toHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

/** Source-over composite of a (possibly translucent) colour onto an opaque backdrop. */
export function composite(fgHex, bgHex) {
  const f = parseHex(fgHex);
  const b = parseHex(bgHex);
  if (b.a < 1) throw new Error(`Backdrop must be opaque: ${bgHex}`);
  const mix = (x, y) => x * f.a + y * (1 - f.a);
  return toHex({ r: mix(f.r, b.r), g: mix(f.g, b.g), b: mix(f.b, b.b) });
}

/** WCAG 2.x relative luminance (sRGB). */
export function relativeLuminance(hex) {
  const { r, g, b } = parseHex(hex);
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG 2.x contrast ratio between two opaque colours (1 to 21). */
export function contrastRatio(aHex, bHex) {
  const la = relativeLuminance(aHex);
  const lb = relativeLuminance(bHex);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

// ---------- pair catalogue ----------

const NEUTRAL_BG = ['bg/base', 'bg/surface', 'bg/elevated'];
const TONES = ['success', 'caution', 'warning', 'error', 'info', 'progress'];
const BRAND_TINT_BG = ['bg/brand/primary-subtle', 'bg/brand/accent-50', 'bg/brand/accent-100', 'bg/brand/lightest'];
const SOLID_FILLS = [
  'bg/brand/primary', 'bg/brand/primary-hover', 'bg/brand/primary-pressed',
  'bg/brand/darkest', 'bg/brand/darkest-hover', 'bg/brand/darkest-pressed',
  'bg/success', 'bg/error', 'bg/info', 'bg/warning', 'bg/caution', 'bg/progress',
];
// Borders that are the only visible edge of a control or state (need 3:1 under SC 1.4.11).
const CONTROL_BORDERS = new Set([
  'border/strong', 'border/focus', 'border/brand/primary', 'border/brand/darkest',
  'border/error', 'border/success', 'border/warning', 'border/info', 'border/caution', 'border/progress',
]);

function roleFor(fg) {
  if (fg.startsWith('text/')) return fg === 'text/disabled' ? 'disabled' : 'text';
  if (fg.startsWith('icon/')) return fg === 'icon/disabled' ? 'disabled' : 'icon';
  if (fg.startsWith('border/')) {
    if (fg === 'border/disabled') return 'disabled';
    return CONTROL_BORDERS.has(fg) ? 'border-control' : 'border-decorative';
  }
  throw new Error(`Unknown foreground family: ${fg}`);
}

// Brand green pairs used as built in Figma (decided 19 Oct 2026): the primary Button,
// FAB, filled badges and Timeline steps (white on green) and selected tiles, amounts,
// links and selected borders (green on light surfaces). They keep their measured
// ratios but are accepted, not flagged.
const BRAND_FILLS = ['bg/brand/primary', 'bg/brand/primary-hover', 'bg/brand/primary-pressed'];
const BRAND_FG = ['text/brand/primary', 'icon/brand/primary', 'border/brand/primary'];
const LIGHT_SURFACES = [...NEUTRAL_BG, ...BRAND_TINT_BG];
export const BRAND_AS_BUILT = new Set([
  ...BRAND_FILLS.flatMap((bg) => ['text/on-brand', 'icon/on-brand'].map((fg) => `${fg} on ${bg}`)),
  ...LIGHT_SURFACES.flatMap((bg) => BRAND_FG.map((fg) => `${fg} on ${bg}`)),
]);

const REQUIRED = { text: THRESHOLDS.aaNormal, icon: THRESHOLDS.nonText, 'border-control': THRESHOLDS.nonText, 'border-decorative': null, disabled: null };

/**
 * Builds the list of { fg, bg, over?, context } pairs worth checking.
 * `over` is the opaque backdrop an alpha background is composited onto.
 */
export function pairCatalogue(tokens) {
  const has = (n) => Object.prototype.hasOwnProperty.call(tokens, n);
  const names = Object.keys(tokens).filter((n) => tokens[n].collection === 'Semantic' && tokens[n].type === 'color');
  const fam = (p) => names.filter((n) => n.startsWith(p));
  const out = [];
  const add = (fg, bg, context, over) => {
    if (!has(fg) || !has(bg) || (over && !has(over))) return;
    out.push({ fg, bg, context, ...(over ? { over } : {}) });
  };

  // 1. Neutral surfaces: every text, icon and border token that is meant for them.
  const onSurfaceText = fam('text/').filter((n) => !['text/on-brand', 'text/inverse'].includes(n));
  const onSurfaceIcon = fam('icon/').filter((n) => !['icon/on-brand', 'icon/inverse'].includes(n));
  const onSurfaceBorder = fam('border/').filter((n) => !['border/inverse'].includes(n));
  for (const bg of NEUTRAL_BG) {
    for (const fg of [...onSurfaceText, ...onSurfaceIcon, ...onSurfaceBorder]) add(fg, bg, 'surface');
  }

  // 2. Tonal tints: status text/icon on its own subtle background, plus body text on it.
  for (const t of TONES) {
    const bg = `bg/${t}-subtle`;
    for (const fg of [`text/${t}`, `icon/${t}`, 'text/default', 'text/muted']) add(fg, bg, 'tint');
  }
  for (const bg of BRAND_TINT_BG) {
    for (const fg of ['text/brand/primary', 'text/brand/darkest', 'icon/brand/primary', 'icon/brand/darkest', 'text/default', 'text/muted']) add(fg, bg, 'tint');
  }
  for (const bg of ['bg/brand/yellow', 'bg/brand/yellow-subtle']) {
    for (const fg of ['text/default', 'text/muted', 'icon/default']) add(fg, bg, 'tint');
  }

  // 3. Solid fills: on-brand text and icon (Button primary, StatusPill solid, Tag filled).
  for (const bg of SOLID_FILLS) {
    for (const fg of ['text/on-brand', 'icon/on-brand']) add(fg, bg, 'fill');
  }
  add('text/default', 'bg/warning', 'fill');
  add('text/inverse', 'bg/inverse', 'fill');
  add('icon/inverse', 'bg/inverse', 'fill');
  add('text/disabled', 'bg/disabled', 'fill');
  add('icon/disabled', 'bg/disabled', 'fill');

  // 4. Alpha backgrounds, only when composited over bg/base.
  add('text/on-brand', 'bg/overlay', 'composited', 'bg/base');
  add('text/default', 'bg/reverse-overlay', 'composited', 'bg/base');

  return out;
}

// ---------- evaluation ----------

const round2 = (n) => Math.round(n * 100) / 100;

export function evaluatePair(tokens, pair) {
  const role = roleFor(pair.fg);
  const required = REQUIRED[role];
  const modes = {};
  for (const mode of MODES) {
    let bg = tokens[pair.bg].value[mode];
    if (pair.over) bg = composite(bg, tokens[pair.over].value[mode]);
    else if (parseHex(bg).a < 1) throw new Error(`${pair.bg} has alpha; give it an "over" backdrop`);
    let fg = tokens[pair.fg].value[mode];
    if (parseHex(fg).a < 1) fg = composite(fg, bg);
    const ratio = contrastRatio(fg, bg);
    modes[mode] = {
      fg,
      bg,
      ratio: round2(ratio),
      aaNormal: ratio >= THRESHOLDS.aaNormal,
      aaLarge: ratio >= THRESHOLDS.aaLarge,
      nonText: ratio >= THRESHOLDS.nonText,
      meetsRequired: required == null ? null : ratio >= required,
    };
  }
  let verdict;
  if (role === 'disabled') verdict = 'exempt';
  else if (role === 'border-decorative') verdict = 'decorative';
  else {
    const failL = !modes.Light.meetsRequired;
    const failD = !modes.Dark.meetsRequired;
    if (!failL && !failD) verdict = 'pass';
    else if (role === 'text' && modes.Light.aaLarge && modes.Dark.aaLarge) verdict = 'large-only';
    else verdict = failL && failD ? 'fail-both' : failL ? 'fail-light' : 'fail-dark';
  }
  const id = `${pair.fg} on ${pair.bg}${pair.over ? ` over ${pair.over}` : ''}`;
  if (verdict !== 'pass' && BRAND_AS_BUILT.has(id)) verdict = 'brand-as-built';
  return {
    id,
    fg: pair.fg,
    bg: pair.bg,
    ...(pair.over ? { over: pair.over } : {}),
    context: pair.context,
    role,
    required,
    verdict,
    minRatio: Math.min(modes.Light.ratio, modes.Dark.ratio),
    modes,
  };
}

export const KNOWN_RISKS = [
  { id: 'text/subtle on bg/base', note: 'text/subtle is placeholder and tertiary meta only. Never put information the user needs to decide on in it.' },
  { id: 'text/subtle on bg/surface', note: 'Same as above on page background.' },
  { id: 'icon/subtle on bg/base', note: 'Decorative or redundant icons only (an icon next to a label that says the same thing).' },
  { id: 'border/default on bg/base', note: 'Divider. Fine as decoration; a control that relies on it as its only edge fails SC 1.4.11.' },
  { id: 'border/strong on bg/base', note: 'Strongest neutral border is still under 3:1 in Light. An Input or Checkbox edge drawn only with it fails SC 1.4.11; keep the visible label above the field and a filled or underlined field shape, and flag to the DS team.' },
  { id: 'text/default on bg/brand/yellow', note: 'text/default flips to light in Dark while the yellow stays bright (1.02:1). On yellow, use a fixed dark foreground or bg/brand/yellow-subtle.' },
  { id: 'text/default on bg/warning', note: 'Same flip problem in Dark. Use bg/warning-subtle with text/warning for warning surfaces.' },
  { id: 'text/on-brand on bg/success', note: 'StatusPill Variant=solid Tone=success. Prefer Variant=subtle.' },
  { id: 'text/on-brand on bg/warning', note: 'Never put white on warning orange. Use text/default on bg/warning or the subtle variant.' },
];

export function buildReport(resolved) {
  const tokens = resolved.tokens;
  const pairs = pairCatalogue(tokens).map((p) => evaluatePair(tokens, p));
  const count = (v) => pairs.filter((p) => p.verdict === v).length;
  return {
    $schema: 'syntropy-contrast-pairs/1',
    note: 'Generated by scripts/contrast-pairs.mjs from knowledge/tokens/resolved.json. Do not edit by hand.',
    method: 'WCAG 2.x relative luminance and contrast ratio. Alpha foregrounds are composited onto their background; alpha backgrounds are composited onto the named backdrop. Pass flags use the unrounded ratio.',
    thresholds: THRESHOLDS,
    requiredByRole: REQUIRED,
    summary: {
      total: pairs.length,
      pass: count('pass'),
      largeOnly: count('large-only'),
      failLight: count('fail-light'),
      failDark: count('fail-dark'),
      failBoth: count('fail-both'),
      decorative: count('decorative'),
      exempt: count('exempt'),
      brandAsBuilt: count('brand-as-built'),
    },
    knownRisks: KNOWN_RISKS.map((r) => {
      const p = pairs.find((x) => x.id === r.id);
      return { ...r, verdict: p ? p.verdict : 'missing', light: p?.modes.Light.ratio ?? null, dark: p?.modes.Dark.ratio ?? null };
    }),
    pairs,
  };
}

// ---------- markdown ----------

const yes = (b) => (b ? 'yes' : 'no');
const r = (m) => m.ratio.toFixed(2);

function table(rows, cols) {
  const head = `| ${cols.map((c) => c[0]).join(' | ')} |\n| ${cols.map(() => '---').join(' | ')} |`;
  return [head, ...rows.map((p) => `| ${cols.map((c) => c[1](p)).join(' | ')} |`)].join('\n');
}

export function renderMarkdown(report) {
  const P = report.pairs;
  const s = report.summary;
  const L = [];
  L.push('# Contrast pairs');
  L.push('');
  L.push('Generated WCAG 2.x contrast for Syntropy semantic colour tokens in Light and Dark. Use it to pick a foreground for a background, or to check a pair before you ship. Regenerate with `node scripts/contrast-pairs.mjs`; do not edit by hand. Machine-readable twin: `contrast-pairs.json`.');
  L.push('');
  L.push('## Rules');
  L.push('1. Body text (under 24px regular, under 18.66px bold) needs 4.5:1 in both modes (SC 1.4.3). Why: Safqah screens carry amounts and terms that must be read exactly.');
  L.push('2. Large text needs 3:1 (SC 1.4.3). A `large-only` pair may only be used at 24px+ regular or 18.66px+ bold. Why: thin strokes of small Arabic glyphs disappear first.');
  L.push('3. Icons that carry meaning, focus rings and the only visible edge of a control need 3:1 (SC 1.4.11). Why: users must find the control and its state.');
  L.push('4. Decorative borders (dividers, card outlines with a fill change) and disabled states are not required to meet a ratio. They must not be the only cue. Why: WCAG exempts them, but meaning still has to reach the user.');
  L.push('5. A pair must pass in Light and Dark. Never pick a pair that passes in one mode only. Why: Safqah ships both themes and users switch at night.');
  L.push('6. Brand green is used as built (decided 19 Oct 2026). White on `bg/brand/primary` (primary Button, FAB, filled badges, Timeline steps) and brand green text, icons and borders on light surfaces (selected tiles, amounts, links, selected states) are accepted at their measured ratios. Use the components exactly as built: do not flag these pairs, recolour them, darken the green or add raw colours. Why: this is the Safqah brand, and every shipped screen (the investment calculator, the deal page CTA) uses it this way.');
  L.push('');
  L.push(`Summary: ${s.total} pairs checked. ${s.pass} pass, ${s.brandAsBuilt} brand green as built (accepted), ${s.largeOnly} large-text only, ${s.failLight} fail Light only, ${s.failDark} fail Dark only, ${s.failBoth} fail both, ${s.decorative} decorative borders (informational), ${s.exempt} disabled (exempt).`);
  L.push('');
  L.push('## Brand green as built (accepted)');
  L.push('');
  L.push('These pairs are below the WCAG ratio and accepted by design-system decision. They are listed so you know they are intentional; never report them as issues.');
  L.push('');
  L.push(table(P.filter((p) => p.verdict === 'brand-as-built'), [
    ['Foreground', (p) => `\`${p.fg}\``],
    ['Background', (p) => `\`${p.bg}\``],
    ['Light', (p) => r(p.modes.Light)],
    ['Dark', (p) => r(p.modes.Dark)],
    ['Where', (p) => (p.context === 'fill' ? 'primary Button, FAB, filled badge, Timeline step' : 'selected tile, amount, link, selected border')],
  ]));
  L.push('');

  L.push('## Known risks');
  L.push('');
  L.push(table(report.knownRisks, [
    ['Pair', (k) => `\`${k.id}\``],
    ['Light', (k) => (k.light ?? 'n/a')],
    ['Dark', (k) => (k.dark ?? 'n/a')],
    ['Verdict', (k) => k.verdict],
    ['What to do', (k) => k.note],
  ]));
  L.push('');

  const failing = P.filter((p) => p.verdict.startsWith('fail') || p.verdict === 'large-only').sort((a, b) => a.minRatio - b.minRatio);
  L.push('## Pairs that fail in either mode');
  L.push('');
  L.push('Sorted worst first. `Needs` is the ratio the role requires (text 4.5, icon and control border 3). `large-only` text passes 3:1 in both modes, so it is allowed only at large sizes.');
  L.push('');
  L.push(table(failing, [
    ['Foreground', (p) => `\`${p.fg}\``],
    ['Background', (p) => `\`${p.bg}\`${p.over ? ` over \`${p.over}\`` : ''}`],
    ['Role', (p) => p.role],
    ['Needs', (p) => p.required],
    ['Light', (p) => r(p.modes.Light)],
    ['Dark', (p) => r(p.modes.Dark)],
    ['Verdict', (p) => p.verdict],
  ]));
  L.push('');

  const passing = P.filter((p) => p.verdict === 'pass');
  const groups = [
    ['Text on neutral surfaces', (p) => p.role === 'text' && p.context === 'surface'],
    ['Text on tints and fills', (p) => p.role === 'text' && p.context !== 'surface'],
    ['Icons', (p) => p.role === 'icon'],
    ['Control borders', (p) => p.role === 'border-control'],
  ];
  L.push('## Recommended pairs');
  L.push('');
  L.push('Every pair below meets its required ratio in both Light and Dark. Prefer these.');
  for (const [title, f] of groups) {
    const rows = passing.filter(f).sort((a, b) => b.minRatio - a.minRatio);
    L.push('');
    L.push(`### ${title}`);
    L.push('');
    L.push(table(rows, [
      ['Foreground', (p) => `\`${p.fg}\``],
      ['Background', (p) => `\`${p.bg}\``],
      ['Light', (p) => r(p.modes.Light)],
      ['Dark', (p) => r(p.modes.Dark)],
      ['AA normal both', (p) => yes(p.modes.Light.aaNormal && p.modes.Dark.aaNormal)],
    ]));
  }
  L.push('');

  L.push('## Decorative borders and disabled (informational)');
  L.push('');
  L.push(table(P.filter((p) => p.verdict === 'decorative' || p.verdict === 'exempt').filter((p) => p.bg === 'bg/base' || p.context === 'fill'), [
    ['Foreground', (p) => `\`${p.fg}\``],
    ['Background', (p) => `\`${p.bg}\``],
    ['Light', (p) => r(p.modes.Light)],
    ['Dark', (p) => r(p.modes.Dark)],
    ['Verdict', (p) => p.verdict],
  ]));
  L.push('');
  L.push('Only `bg/base` and fill rows are shown here; `contrast-pairs.json` has every surface.');
  L.push('');
  L.push('## Sources');
  L.push('- knowledge/tokens/resolved.json (Semantic collection, Light and Dark modes)');
  L.push('- https://www.w3.org/TR/WCAG22/#dfn-relative-luminance');
  L.push('- https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum');
  L.push('- https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast');
  L.push('');
  return L.join('\n');
}

// ---------- main ----------

export function run({ root = ROOT } = {}) {
  const resolved = JSON.parse(readFileSync(resolve(root, 'knowledge/tokens/resolved.json'), 'utf8'));
  const report = buildReport(resolved);
  const outDir = resolve(root, 'knowledge/ux/accessibility');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'contrast-pairs.json'), JSON.stringify(report, null, 1) + '\n');
  writeFileSync(resolve(outDir, 'contrast-pairs.md'), renderMarkdown(report));
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const rep = run();
  const s = rep.summary;
  console.log(`contrast-pairs: ${s.total} pairs, ${s.pass} pass, ${s.largeOnly} large-only, ${s.failLight + s.failDark + s.failBoth} fail (light ${s.failLight}, dark ${s.failDark}, both ${s.failBoth})`);
}
