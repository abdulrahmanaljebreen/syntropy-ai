// Loads the Syntropy token set and component manifest once and builds the
// indexes the rules need. Paths are resolved relative to this file.
import { readFileSync } from 'node:fs';

const TOKENS_URL = new URL('../knowledge/tokens/resolved.json', import.meta.url);
const COMPONENTS_URL = new URL('../knowledge/components/index.json', import.meta.url);

let cache = null;

export function normalizeName(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function cssVarName(token) {
  return '--' + token.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function primaryValue(value) {
  if (value == null || typeof value !== 'object') return value;
  if ('Light' in value) return value.Light;
  if ('Default' in value) return value.Default;
  const first = Object.keys(value)[0];
  return first ? value[first] : undefined;
}

function normHex(v) {
  if (typeof v !== 'string') return null;
  let h = v.trim().toLowerCase();
  if (!/^#[0-9a-f]{3,8}$/.test(h)) return null;
  if (h.length === 4 || h.length === 5) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
  if (h.length === 9 && h.endsWith('ff')) h = h.slice(0, 7);
  return h;
}

function build() {
  const tokensDoc = JSON.parse(readFileSync(TOKENS_URL, 'utf8'));
  const compDoc = JSON.parse(readFileSync(COMPONENTS_URL, 'utf8'));
  const tokens = tokensDoc.tokens || {};

  const colorTokens = []; // { name, hex, semantic }
  const palette = new Set(); // every hex in any mode
  const byHex = new Map(); // primary hex -> [token names]
  const cssVars = new Map(); // --css-var -> { name, hex }
  const space = []; // { name, px }
  const radius = [];

  for (const [name, t] of Object.entries(tokens)) {
    if (t.type === 'color') {
      for (const v of Object.values(t.value || {})) {
        const h = normHex(v);
        if (h) palette.add(h);
      }
      const hex = normHex(primaryValue(t.value));
      if (!hex) continue;
      const semantic = t.collection === 'Semantic';
      colorTokens.push({ name, hex, semantic });
      if (!byHex.has(hex)) byHex.set(hex, []);
      byHex.get(hex).push({ name, semantic });
      cssVars.set(cssVarName(name), { name, hex });
    } else if (t.type === 'dimension') {
      const px = Number(primaryValue(t.value));
      if (!Number.isFinite(px)) continue;
      if (name.startsWith('space/')) space.push({ name, px });
      else if (name.startsWith('radius/')) radius.push({ name, px });
      cssVars.set(cssVarName(name), { name, px });
    }
  }
  // Prefer the canonical alias when two radius tokens share a value.
  radius.sort((a, b) => (a.name === 'radius/default' ? -1 : b.name === 'radius/default' ? 1 : 0));

  const components = new Map(); // normalized name -> { name, variantProps: Map(normProp -> {name, options:Set(lower), display:[]}) }
  for (const c of compDoc.components || []) {
    const key = normalizeName(c.name);
    if (!key) continue;
    let entry = components.get(key);
    if (!entry) {
      entry = { name: c.name, variantProps: new Map() };
      components.set(key, entry);
    }
    for (const p of c.props || []) {
      if (p.type !== 'VARIANT') continue;
      const opts = [...(p.options || []), ...(p.canonicalOptions || [])];
      if (!opts.length) continue;
      for (const pk of new Set([normalizeName(p.name), normalizeName(p.canonical || '')])) {
        if (!pk) continue;
        let vp = entry.variantProps.get(pk);
        if (!vp) {
          vp = { name: p.canonical || p.name, options: new Set(), display: [] };
          entry.variantProps.set(pk, vp);
        }
        for (const o of opts) {
          const lo = String(o).toLowerCase();
          if (!vp.options.has(lo)) {
            vp.options.add(lo);
            vp.display.push(String(o));
          }
        }
      }
    }
  }
  // Page names (HeaderCard, KYCStep...) are how people refer to components too.
  for (const p of compDoc.pages || []) {
    for (const part of String(p.name).split('&')) {
      const key = normalizeName(part);
      if (key && !components.has(key)) components.set(key, { name: part.trim(), variantProps: new Map() });
    }
  }

  // Brand green pairs accepted as built (decided 19 Oct 2026): white on the brand
  // fills, and brand green text/icon/border on light surfaces. Keyed by "fgHex|bgHex"
  // across Light and Dark so the contrast rule never flags them.
  const brandAsBuilt = new Set();
  const pairUp = (fgs, bgs) => {
    for (const f of fgs) for (const b of bgs) {
      const fv = tokens[f]?.value || {};
      const bv = tokens[b]?.value || {};
      for (const mode of Object.keys(fv)) {
        const fh = normHex(fv[mode]);
        const bh = normHex(bv[mode]);
        if (fh && bh) brandAsBuilt.add(`${fh}|${bh}`);
      }
    }
  };
  pairUp(['text/on-brand', 'icon/on-brand'], ['bg/brand/primary', 'bg/brand/primary-hover', 'bg/brand/primary-pressed']);
  pairUp(['text/brand/primary', 'icon/brand/primary', 'border/brand/primary'],
    ['bg/base', 'bg/surface', 'bg/elevated', 'bg/brand/primary-subtle', 'bg/brand/accent-50', 'bg/brand/accent-100', 'bg/brand/lightest']);

  return { tokens, colorTokens, palette, byHex, cssVars, space, radius, components, normHex, brandAsBuilt };
}

export function getData() {
  if (!cache) cache = build();
  return cache;
}

export { normHex };
