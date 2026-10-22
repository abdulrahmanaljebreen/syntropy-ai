// Converts the Figma variables snapshot into W3C DTCG (2025.10) token files,
// plus a flat resolved table that agents and the MCP server read directly.

const COLLECTION_FILE = { 'Primitive Core': 'primitive', 'Primitive / Typography': 'typography', Semantic: 'semantic' };

/** Decode Figma's double-escaped entities and replace em dashes. */
export function cleanText(s = '') {
  let t = s;
  for (let i = 0; i < 4; i++) t = t.replace(/&amp;/g, '&');
  t = t.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  return t.replace(/\s*—\s*/g, ', ').replace(/,\s*,/g, ',').trim();
}

const ref = (name) => `{${name.split('/').join('.')}}`;

function colorValue(hex) {
  const h = hex.replace('#', '');
  const ch = (i) => parseInt(h.slice(i, i + 2), 16) / 255;
  const round = (n) => Math.round(n * 1000) / 1000;
  const v = { colorSpace: 'srgb', components: [round(ch(0)), round(ch(2)), round(ch(4))], hex: `#${h.slice(0, 6)}` };
  if (h.length === 8) v.alpha = round(ch(6));
  return v;
}

function dtcgType(name, type, scopes) {
  if (type === 'COLOR') return 'color';
  if (type === 'STRING') return /FONT_FAMILY/.test(scopes) || /family/i.test(name) ? 'fontFamily' : 'string';
  if (/FONT_WEIGHT/.test(scopes) || /weight/i.test(name)) return 'fontWeight';
  if (/size|line-?height|letter|radius|spacing|space|offset|blur/i.test(name) || /CORNER_RADIUS|GAP|WIDTH_HEIGHT|FONT_SIZE|LINE_HEIGHT|LETTER_SPACING|EFFECT_FLOAT/.test(scopes)) return 'dimension';
  return 'number';
}

function literal(type, v) {
  if (type === 'color') return colorValue(v);
  if (type === 'dimension') return { value: v, unit: 'px' };
  return v;
}

function setPath(root, name, token) {
  const parts = name.split('/');
  let node = root;
  for (const p of parts.slice(0, -1)) node = node[p] ??= {};
  node[parts.at(-1)] = token;
}

/**
 * @param {{collections: object[], styles: {text: any[], effect: any[]}}} sources
 * @returns {{files: Record<string, object>, resolved: Record<string, object>, issues: object[]}}
 */
export function buildTokens({ collections, styles }) {
  const files = {};
  const issues = [];
  const byKey = new Map(); // "Collection::name" -> var record
  for (const c of collections) for (const v of c.vars) byKey.set(`${c.collection}::${v[0]}`, { c, v });

  const resolve = (val, mode, seen = new Set()) => {
    if (!val || typeof val !== 'object' || !('alias' in val)) return val;
    if (seen.has(val.alias)) return undefined;
    seen.add(val.alias);
    const hit = byKey.get(val.alias);
    if (!hit) return undefined;
    const modes = hit.c.modes;
    const next = hit.v[2][mode] ?? hit.v[2][modes[0]];
    return resolve(next, mode, seen);
  };

  const resolved = {};
  for (const c of collections) {
    const base = COLLECTION_FILE[c.collection] || c.collection.toLowerCase().replace(/\W+/g, '-');
    const perMode = Object.fromEntries(c.modes.map((m) => [m, {}]));
    for (const [name, type, values, description, scopes, hidden] of c.vars) {
      const $type = dtcgType(name, type, scopes);
      const desc = cleanText(description);
      const tag = /^\[locked\]/i.test(desc) ? 'locked' : /^\[themable\]/i.test(desc) ? 'themable' : undefined;
      let broken = false;
      const resolvedValues = {};
      for (const m of c.modes) {
        const raw = values[m];
        if (raw && typeof raw === 'object' && 'alias' in raw && !byKey.has(raw.alias)) broken = true;
        resolvedValues[m] = resolve(raw, m);
      }
      if (broken) {
        issues.push({ collection: c.collection, token: name, issue: `alias target missing in Figma: ${values[c.modes[0]].alias}` });
        continue;
      }
      for (const m of c.modes) {
        const raw = values[m];
        const $value = raw && typeof raw === 'object' && 'alias' in raw ? ref(raw.alias.split('::')[1]) : literal($type, raw);
        const token = { $type, $value };
        if (desc) token.$description = desc;
        token.$extensions = { 'com.figma': { collection: c.collection, scopes: scopes.split(','), ...(hidden ? { hidden: true } : {}) } };
        setPath(perMode[m], name, token);
      }
      resolved[name] = { collection: c.collection, type: $type, value: resolvedValues, ...(tag ? { tag } : {}), ...(desc ? { description: desc.replace(/^\[(locked|themable)\]\s*/i, '') } : {}) };
    }
    if (c.modes.length === 1) files[`${base}.json`] = perMode[c.modes[0]];
    else for (const m of c.modes) files[`${base}.${m.toLowerCase()}.json`] = perMode[m];
  }

  // Text styles -> typography composites.
  const textStyles = {};
  for (const [name, family, style, size, lineHeight, letterSpacing, description, bound] of styles.text) {
    const note = name.match(/\(([^)]+)\)/)?.[1];
    const path = name.replace(/\(.*?\)/g, '').split('/').map((s) => s.trim()).filter(Boolean).join('/');
    const b = (k) => (bound[k] ? ref(bound[k].split('::')[1]) : undefined);
    const token = {
      $type: 'typography',
      $value: {
        fontFamily: b('fontFamily') ?? family,
        fontSize: b('fontSize') ?? { value: size, unit: 'px' },
        fontWeight: b('fontWeight') ?? style,
        lineHeight: lineHeight === 'auto' ? 'auto' : { value: parseFloat(lineHeight), unit: 'px' },
        letterSpacing: { value: parseFloat(letterSpacing), unit: letterSpacing.endsWith('%') ? '%' : 'px' },
      },
      $extensions: { 'com.figma': { styleName: name, fontStyle: style } },
    };
    const desc = cleanText([description, note].filter(Boolean).join(' '));
    if (desc) token.$description = desc;
    setPath(textStyles, path, token);
  }
  files['text-styles.json'] = textStyles;

  // Effect styles -> shadow composites.
  const shadows = { shadow: {} };
  for (const s of styles.effect) {
    const key = s.name.replace(/^shadow\s*\/\s*/i, '').trim().toLowerCase();
    const px = (n, boundName) => (boundName ? ref(boundName.split('::')[1]) : { value: n ?? 0, unit: 'px' });
    shadows.shadow[key] = {
      $type: 'shadow',
      $value: s.layers.map((l) => ({
        color: l.bound.color ? ref(l.bound.color.split('::')[1]) : colorValue(l.color),
        offsetX: px(l.x, l.bound.offsetX),
        offsetY: px(l.y, l.bound.offsetY),
        blur: px(l.blur, l.bound.radius),
        spread: px(l.spread, l.bound.spread),
      })),
      ...(s.description ? { $description: cleanText(s.description) } : {}),
    };
  }
  files['shadows.json'] = shadows;

  return { files, resolved, issues };
}
