#!/usr/bin/env node
// Regenerates the copy-paste token snippets in ../assets from the Syntropy
// resolved tokens. Zero dependencies, Node >= 20.
//
//   node scripts/generate-snippets.mjs            write the files
//   node scripts/generate-snippets.mjs --check    exit 1 if a file is stale
//
// Inputs (first path that exists wins):
//   tokens:      references/data/tokens-resolved.json, ../../../knowledge/tokens/resolved.json
//   text styles: references/data/text-styles.json,     ../../../knowledge/tokens/text-styles.json
// Outputs:
//   assets/syntropy.css           CSS custom properties, Light in :root, Dark in [data-theme="dark"]
//   assets/tailwind.preset.cjs    Tailwind 3.4 preset that points at the CSS variables
//   assets/syntropy_colors.dart   Flutter ThemeExtension SyntropyColors with light and dark
//   assets/syntropy_tokens.dart   Flutter spacing, radius, elevation and the 37 text styles

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const skill = resolve(here, '..');
const check = process.argv.includes('--check');

function load(candidates, label) {
  for (const rel of candidates) {
    const p = resolve(skill, rel);
    if (existsSync(p)) return { path: p, json: JSON.parse(readFileSync(p, 'utf8')) };
  }
  throw new Error(`Cannot find ${label}. Looked in: ${candidates.join(', ')}`);
}

const tokSrc = load(['references/data/tokens-resolved.json', '../../knowledge/tokens/resolved.json', '../../../knowledge/tokens/resolved.json'], 'tokens-resolved.json');
const tsSrc = load(['references/data/text-styles.json', '../../knowledge/tokens/text-styles.json', '../../../knowledge/tokens/text-styles.json'], 'text-styles.json');
const tokens = tokSrc.json.tokens;

// ------------------------------------------------------------ name transforms
// R3: names transfer verbatim, only the separator changes.
const cssVar = (name) => '--' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const camel = (name) => {
  const parts = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  return parts.map((p, i) => (i === 0 ? p.toLowerCase() : p[0].toUpperCase() + p.slice(1).toLowerCase())).join('');
};
const twKey = (name, prefix) => name.slice(prefix.length).replace(/\//g, '-');

// ------------------------------------------------------------ token groups
const semantic = Object.entries(tokens).filter(([, t]) => t.collection === 'Semantic');
const colors = semantic.filter(([, t]) => t.type === 'color');
const dims = semantic.filter(([, t]) => t.type === 'dimension');
const space = dims.filter(([n]) => n.startsWith('space/'));
const radius = dims.filter(([n]) => n.startsWith('radius/'));
const fontSize = dims.filter(([n]) => n.startsWith('font/size/'));
const lineHeight = dims.filter(([n]) => n.startsWith('font/line-height/'));
const weights = semantic.filter(([, t]) => t.type === 'fontWeight');
const family = semantic.find(([n]) => n === 'font/family');
const familyName = family ? family[1].value.Light : 'IBM Plex Sans Arabic';

const light = (t) => t.value.Light;
const dark = (t) => t.value.Dark ?? t.value.Light;

// Elevation: the two-layer recipe of the Effects styles (shadow/xs..xl), each
// value read from the Shadow/* and Color/Alpha/Black/* tokens.
const prim = (n) => {
  const t = tokens[n];
  if (!t) throw new Error(`Missing primitive ${n}`);
  return t.value.Default ?? Object.values(t.value)[0];
};
const SHADOW_RECIPE = {
  xs: [['0', 'XS', 'Black/10'], ['XS', 'MD', 'Black/10']],
  sm: [['0', 'XS', 'Black/10'], ['SM', 'SM', 'Black/10']],
  md: [['0', 'XS', 'Black/10'], ['MD', 'MD', 'Black/10']],
  lg: [['0', 'MD', 'Black/10'], ['LG', 'LG', 'Black/30']],
  xl: [['0', 'MD', 'Black/10'], ['XL', 'XL', 'Black/30']],
};
const shadows = Object.fromEntries(
  Object.entries(SHADOW_RECIPE).map(([k, layers]) => [
    k,
    layers.map(([y, blur, alpha]) => ({
      y: y === '0' ? 0 : prim(`Shadow/OffsetY/${y}`),
      blur: prim(`Shadow/Blur/${blur}`),
      color: prim(`Color/Alpha/${alpha}`),
    })),
  ]),
);

// Text styles: walk caption/body/heading/display -> size -> weight.
const textStyles = [];
for (const [group, sizes] of Object.entries(tsSrc.json)) {
  if (typeof sizes !== 'object' || group.startsWith('$')) continue;
  for (const [size, ws] of Object.entries(sizes)) {
    for (const [weight, def] of Object.entries(ws)) {
      if (!def || def.$type !== 'typography') continue;
      const v = def.$value;
      textStyles.push({
        name: `${group}/${size}/${weight}`,
        figma: def.$extensions?.['com.figma']?.styleName ?? `${group} / ${size} / ${weight}`,
        size: Number(size),
        weight,
        lineHeight: v.lineHeight?.value ?? Number(size) * 1.5,
        letterSpacing: v.letterSpacing?.value ?? 0,
      });
    }
  }
}
const weightNum = Object.fromEntries(weights.map(([n, t]) => [n.split('/').pop(), light(t)]));

const banner = (c) => `${c} GENERATED by syntropy-code-adapters/scripts/generate-snippets.mjs from the Syntropy tokens.\n${c} Do not edit by hand: change the token in Figma, re-sync, then run the script.\n${c} Source: ${tokSrc.json.$schema || 'syntropy-resolved-tokens'}, ${colors.length} semantic colors, ${textStyles.length} text styles.\n`;

// ------------------------------------------------------------ CSS
function buildCss() {
  const px = (v) => (v === 0 ? '0' : `${v}px`);
  const L = [];
  L.push('/*\n' + banner(' *') + ' *\n * Load IBM Plex Sans Arabic (400, 500, 600, 700) yourself, self-hosted or from\n * Google Fonts, before this file. Light lives in :root, Dark in [data-theme="dark"]\n * and in prefers-color-scheme: dark unless the page forces data-theme="light".\n */\n');
  L.push(':root {');
  L.push('  color-scheme: light;');
  L.push('  /* color: semantic, Light mode */');
  for (const [n, t] of colors) L.push(`  ${cssVar(n)}: ${light(t)};`);
  L.push('  /* space */');
  for (const [n, t] of space) L.push(`  ${cssVar(n)}: ${px(light(t))};`);
  L.push('  /* radius */');
  for (const [n, t] of radius) L.push(`  ${cssVar(n)}: ${px(light(t))};`);
  L.push('  /* type */');
  L.push(`  ${cssVar('font/family')}: '${familyName}', system-ui, sans-serif;`);
  for (const [n, t] of fontSize) L.push(`  ${cssVar(n)}: ${px(light(t))};`);
  for (const [n, t] of lineHeight) L.push(`  ${cssVar(n)}: ${px(light(t))};`);
  for (const [n, t] of weights) L.push(`  ${cssVar(n)}: ${light(t)};`);
  L.push('  /* elevation (Effects styles shadow/xs..xl, two layers: ambient + key) */');
  for (const [k, layers] of Object.entries(shadows)) {
    L.push(`  --shadow-${k}: ${layers.map((l) => `0 ${px(l.y)} ${px(l.blur)} 0 ${l.color}`).join(', ')};`);
  }
  L.push('}\n');

  const darkBlock = (indent) => colors.map(([n, t]) => `${indent}${cssVar(n)}: ${dark(t)};`).join('\n');
  L.push('[data-theme="dark"] {');
  L.push('  color-scheme: dark;');
  L.push(darkBlock('  '));
  L.push('}\n');
  L.push('@media (prefers-color-scheme: dark) {');
  L.push('  :root:not([data-theme="light"]) {');
  L.push('    color-scheme: dark;');
  L.push(darkBlock('    '));
  L.push('  }');
  L.push('}\n');

  L.push('/* Base: one family for Arabic and English, page surface and default text. */');
  L.push('html { font-family: var(--font-family); background: var(--bg-surface); color: var(--text-default); }');
  L.push(':lang(ar) { letter-spacing: 0; }\n');

  L.push('/* The 37 Syntropy text styles. Class = style name with "/" -> "-". */');
  for (const s of textStyles) {
    L.push(
      `.text-${s.name.replace(/\//g, '-')} { font-family: var(--font-family); font-size: var(${cssVar(`font/size/${s.size}`)}); line-height: var(${cssVar(`font/line-height/${s.size}`)}); font-weight: var(${cssVar(`font/weight/${s.weight}`)}); letter-spacing: ${s.letterSpacing}; }`,
    );
  }
  return L.join('\n') + '\n';
}

// ------------------------------------------------------------ Tailwind preset
function buildTailwind() {
  const v = (n) => `var(${cssVar(n)})`;
  const group = (prefix) => Object.fromEntries(colors.filter(([n]) => n.startsWith(prefix)).map(([n]) => [twKey(n, prefix), v(n)]));
  const bg = group('bg/');
  const text = group('text/');
  const icon = Object.fromEntries(colors.filter(([n]) => n.startsWith('icon/')).map(([n]) => [twKey(n, ''), v(n)]));
  const border = { DEFAULT: v('border/default'), ...group('border/') };
  const base = { transparent: 'transparent', current: 'currentColor', inherit: 'inherit' };
  const spacing = { 0: '0px', px: '1px', ...Object.fromEntries(space.map(([n]) => [twKey(n, 'space/'), v(n)])) };
  const radii = { DEFAULT: v('radius/default'), ...Object.fromEntries(radius.map(([n]) => [twKey(n, 'radius/'), v(n)])) };
  const fontSizes = Object.fromEntries(
    textStyles.map((s) => [
      s.name.replace(/\//g, '-'),
      [v(`font/size/${s.size}`), { lineHeight: v(`font/line-height/${s.size}`), fontWeight: v(`font/weight/${s.weight}`), letterSpacing: String(s.letterSpacing) }],
    ]),
  );
  const fontWeights = Object.fromEntries(weights.map(([n]) => [n.split('/').pop(), v(n)]));
  const boxShadow = { none: 'none', ...Object.fromEntries(Object.keys(shadows).map((k) => [k, `var(--shadow-${k})`])) };

  const theme = {
    colors: base,
    backgroundColor: { ...base, ...bg },
    textColor: { ...base, ...text, ...icon },
    borderColor: { ...base, ...border },
    divideColor: { ...base, ...border },
    outlineColor: { ...base, ...border },
    ringColor: { ...base, DEFAULT: v('border/focus'), ...border },
    ringOffsetColor: { ...base, ...bg },
    placeholderColor: { ...base, ...text },
    caretColor: { ...base, ...text },
    fill: { ...base, ...icon },
    stroke: { ...base, ...icon },
    spacing,
    borderRadius: radii,
    fontFamily: { sans: ['var(--font-family)'] },
    fontSize: fontSizes,
    fontWeight: fontWeights,
    boxShadow,
    screens: { tablet: '600px', desktop: '1024px', wide: '1440px' },
  };
  const json = JSON.stringify(theme, null, 2).replace(/"([A-Za-z_$][\w$]*)":/g, '$1:');
  return `${banner('//')}// Usage (tailwind.config.js):\n//   module.exports = { presets: [require('./tailwind.preset.cjs')], content: ['./src/**/*.{html,ts}'] };\n// Load assets/syntropy.css once (it defines every var() used here).\n// The default Tailwind palette, spacing and radius scales are replaced on purpose (R4: no raw values).\n\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: ['selector', '[data-theme="dark"]'],\n  theme: ${json.replace(/\n/g, '\n  ')},\n  plugins: [],\n};\n`;
}

// ------------------------------------------------------------ Dart
const dartColor = (hex) => {
  let h = hex.replace('#', '').toLowerCase();
  if (h.length === 6) h += 'ff';
  const rgb = h.slice(0, 6);
  const a = h.slice(6, 8);
  return `Color(0x${(a + rgb).toUpperCase()})`;
};

function buildDartColors() {
  const fields = colors.map(([n, t]) => ({ id: camel(n), name: n, l: light(t), d: dark(t) }));
  const L = [];
  L.push(banner('//'));
  L.push("import 'package:flutter/material.dart';\n");
  L.push('/// Syntropy semantic colors as a ThemeExtension. Field names are the Figma');
  L.push('/// token names in camelCase (bg/brand/primary -> bgBrandPrimary).');
  L.push('/// Read through `context.colors`; never use a primitive or a raw Color.');
  L.push('@immutable');
  L.push('class SyntropyColors extends ThemeExtension<SyntropyColors> {');
  L.push('  const SyntropyColors({');
  for (const f of fields) L.push(`    required this.${f.id},`);
  L.push('  });\n');
  for (const f of fields) L.push(`  /// \`${f.name}\`\n  final Color ${f.id};`);
  L.push('');
  for (const mode of ['light', 'dark']) {
    L.push(`  static const ${mode} = SyntropyColors(`);
    for (const f of fields) L.push(`    ${f.id}: ${dartColor(mode === 'light' ? f.l : f.d)},`);
    L.push('  );\n');
  }
  L.push('  @override');
  L.push('  SyntropyColors copyWith({');
  for (const f of fields) L.push(`    Color? ${f.id},`);
  L.push('  }) {');
  L.push('    return SyntropyColors(');
  for (const f of fields) L.push(`      ${f.id}: ${f.id} ?? this.${f.id},`);
  L.push('    );');
  L.push('  }\n');
  L.push('  @override');
  L.push('  SyntropyColors lerp(ThemeExtension<SyntropyColors>? other, double t) {');
  L.push('    if (other is! SyntropyColors) return this;');
  L.push('    return SyntropyColors(');
  for (const f of fields) L.push(`      ${f.id}: Color.lerp(${f.id}, other.${f.id}, t)!,`);
  L.push('    );');
  L.push('  }');
  L.push('}\n');
  L.push('extension SyntropyColorsContext on BuildContext {');
  L.push('  /// The Syntropy semantic colors for the current theme mode.');
  L.push('  SyntropyColors get colors => Theme.of(this).extension<SyntropyColors>()!;');
  L.push('}');
  return L.join('\n') + '\n';
}

function buildDartTokens() {
  const L = [];
  L.push(banner('//'));
  L.push("import 'package:flutter/material.dart';\n");
  L.push('/// Spacing (`space/*`). Use with EdgeInsetsDirectional and SizedBox gaps.');
  L.push('abstract final class SyntropySpace {');
  for (const [n, t] of space) L.push(`  /// \`${n}\`\n  static const double ${camel(n)} = ${light(t)};`);
  L.push('}\n');
  L.push('/// Corner radius (`radius/*`). Use with BorderRadiusDirectional.');
  L.push('abstract final class SyntropyRadius {');
  for (const [n, t] of radius) L.push(`  /// \`${n}\`\n  static const double ${camel(n)} = ${light(t)};`);
  L.push('}\n');
  L.push('/// Elevation, the two-layer Effects styles shadow/xs..xl.');
  L.push('abstract final class SyntropyElevation {');
  for (const [k, layers] of Object.entries(shadows)) {
    const items = layers.map((l) => `BoxShadow(color: ${dartColor(l.color)}, offset: Offset(0, ${l.y}), blurRadius: ${l.blur})`).join(', ');
    L.push(`  /// \`shadow/${k}\`\n  static const List<BoxShadow> shadow${k[0].toUpperCase() + k.slice(1)} = [${items}];`);
  }
  L.push('}\n');
  L.push('/// The 37 Syntropy text styles. One family (font/family) for Arabic and English,');
  L.push('/// line height 1.5, letter spacing 0. Color is applied at the call site from');
  L.push('/// `context.colors` (for example `.copyWith(color: context.colors.textMuted)`).');
  L.push('abstract final class SyntropyTextStyles {');
  L.push(`  static const String fontFamily = '${familyName}';\n`);
  const fw = (w) => `FontWeight.w${weightNum[w] ?? 400}`;
  for (const s of textStyles) {
    const height = +(s.lineHeight / s.size).toFixed(4);
    L.push(`  /// \`${s.figma}\``);
    L.push(`  static const TextStyle ${camel(s.name)} = TextStyle(fontFamily: fontFamily, fontSize: ${s.size}, height: ${height}, fontWeight: ${fw(s.weight)}, letterSpacing: ${s.letterSpacing});`);
  }
  L.push('}');
  return L.join('\n') + '\n';
}

// ------------------------------------------------------------ write
const outDir = join(skill, 'assets');
mkdirSync(outDir, { recursive: true });
const outputs = {
  'syntropy.css': buildCss(),
  'tailwind.preset.cjs': buildTailwind(),
  'syntropy_colors.dart': buildDartColors(),
  'syntropy_tokens.dart': buildDartTokens(),
};

let stale = 0;
for (const [file, content] of Object.entries(outputs)) {
  const p = join(outDir, file);
  if (content.includes('\u2014')) throw new Error(`${file} would contain an em dash`);
  if (check) {
    const cur = existsSync(p) ? readFileSync(p, 'utf8') : '';
    if (cur !== content) {
      stale++;
      console.log(`stale  assets/${file}`);
    }
    continue;
  }
  writeFileSync(p, content);
  console.log(`wrote  assets/${file}  (${content.split('\n').length} lines)`);
}
console.log(`source ${tokSrc.path}`);
console.log(`       ${colors.length} semantic colors (Light + Dark), ${space.length} space, ${radius.length} radius, ${fontSize.length} font sizes, ${weights.length} weights, ${Object.keys(shadows).length} shadows, ${textStyles.length} text styles`);
if (check && stale) process.exit(1);
