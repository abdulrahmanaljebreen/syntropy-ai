// syntropy-lint-disable: rule patterns and messages quote the very values they catch.
// Rule implementations. Each rule exposes id, severity, description,
// appliesTo (kinds) and check(ctx). ctx.report(offset, message, fix, severity?)
// records a finding at an offset in the original source.
import { cssVarName, normalizeName } from './data.mjs';
import { functionalToHex, contrastRatio, colorDistance } from './color.mjs';
import { findClose, topLevel, closest, levenshtein } from './util.mjs';

const CODE = ['css', 'html', 'js', 'dart'];
const ALL = ['css', 'html', 'js', 'dart', 'text'];
const AR_LETTER = /[ء-ي]/;

// Token definition files may hold raw values: anything with "tokens" in its
// name, generated adapters (syntropy.css, syntropy_colors.dart) and Tailwind presets.
const isTokenFile = (filename) =>
  /tokens/i.test(filename) ||
  /(?:^|[\/\\])syntropy(?:[_-](?:colors?|spacing|space|radius|theme))?\.(?:css|scss|dart|[cm]?[jt]s)$/i.test(filename) ||
  /(?:^|[\/\\])tailwind\.(?:preset|config)\.[cm]?[jt]s$/i.test(filename);
const lineBefore = (s, offset) => s.slice(s.lastIndexOf('\n', offset - 1) + 1, offset);
const fmt = (n) => String(+n.toFixed(2));

/* ------------------------------------------------------------------ colors */

function colorContext(before) {
  const tw = before.match(/\b(bg|text|border|fill|stroke|ring|outline|divide|from|to|via|decoration|placeholder|caret|accent|shadow)-\[$/);
  let prop = tw ? tw[1] : null;
  if (!prop) {
    const m = before.match(/([A-Za-z_$][\w$-]*)['"]?\s*[:=]\s*[^:;{}=]*$/);
    prop = m ? m[1] : '';
  }
  if (/background|^bg$|^bg[A-Z-]|fill|surface|^from$|^to$|^via$/i.test(prop)) return 'bg';
  if (/border|outline|stroke|divider|divide|ring/i.test(prop)) return 'border';
  if (/icon/i.test(prop)) return 'icon';
  if (/color|text|foreground|^fg|font|caret|placeholder|decoration/i.test(prop)) return 'text';
  return null;
}

function suggestTokens(data, hex, ctx) {
  const matches = data.byHex.get(hex) || [];
  const semantic = matches.filter((m) => m.semantic);
  const pref = ctx ? semantic.filter((m) => m.name.startsWith(ctx + '/')) : [];
  const list = pref.length ? pref : semantic.length ? semantic : matches;
  return list.map((m) => m.name).slice(0, 3);
}

function nearestToken(data, hex, ctx) {
  const six = hex.slice(0, 7);
  let pool = data.colorTokens.filter((t) => t.semantic && t.hex.length === 7 && (!ctx || t.name.startsWith(ctx + '/')));
  if (!pool.length) pool = data.colorTokens.filter((t) => t.semantic && t.hex.length === 7);
  let best = null;
  let bestD = Infinity;
  for (const t of pool) {
    const d = colorDistance(six, t.hex);
    if (d < bestD) {
      bestD = d;
      best = t;
    }
  }
  return best;
}

// In Flutter a bare "color:" belongs to the enclosing constructor: TextStyle is
// text, Icon is icon, BorderSide is border, containers and decorations are bg.
function dartColorOwner(code, offset) {
  const back = code.slice(Math.max(0, offset - 400), offset);
  let depth = 0;
  for (let i = back.length - 1; i >= 0; i--) {
    const ch = back[i];
    if (ch === ')') depth++;
    else if (ch === '(') {
      if (depth === 0) {
        const head = back.slice(Math.max(0, i - 40), i + 1);
        const m = head.match(/([A-Z]\w*)\s*\($/);
        if (m) {
          const n = m[1];
          if (/^(TextStyle|Text|RichText|TextSpan|DefaultTextStyle)$/.test(n)) return 'text';
          if (/^(Icon|IconThemeData|ImageIcon)$/.test(n)) return 'icon';
          if (/^(BorderSide|Border|BorderDirectional|Divider|VerticalDivider|OutlineInputBorder|UnderlineInputBorder)$/.test(n)) return 'border';
          return 'bg';
        }
      } else depth--;
    }
  }
  return 'bg';
}

const insideVarFallback = (before) => {
  const i = before.lastIndexOf('var(');
  return i !== -1 && before.indexOf(')', i) === -1;
};

// Yields every color literal in the masked code: { offset, length, literal, hex }.
function* colorLiterals(ctx) {
  const { code, kind, data } = ctx;
  const hexRe = /(^|[^\w&.#\/-])#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g;
  let m;
  while ((m = hexRe.exec(code))) {
    const offset = m.index + m[1].length;
    const before = code.slice(Math.max(0, offset - 16), offset);
    if (/href\s*=\s*["']?$|url\(\s*["']?$/i.test(before)) continue;
    const after = code.slice(offset + m[2].length + 1, offset + m[2].length + 4);
    if ((kind === 'css' || kind === 'html') && /^\s*\{|^[.:\[>~+]\S/.test(after)) continue; // id selector
    const literal = '#' + m[2];
    yield { offset, length: literal.length, literal, hex: data.normHex(literal) };
  }
  const fnRe = /\b(rgba?|hsla?)\(\s*([^()]*?)\)/gi;
  while ((m = fnRe.exec(code))) {
    if (/var\(|\$|\{/.test(m[2])) continue;
    const hex = functionalToHex(m[1], m[2]);
    if (hex) yield { offset: m.index, length: m[0].length, literal: m[0], hex: data.normHex(hex) };
  }
  if (kind === 'dart') {
    const re = /\bColor\(\s*0x([0-9a-fA-F]{8}|[0-9a-fA-F]{6})\s*\)/g;
    while ((m = re.exec(code))) {
      const h = m[1].length === 8 ? m[1].slice(2) + m[1].slice(0, 2) : m[1];
      yield { offset: m.index, length: m[0].length, literal: m[0], hex: data.normHex('#' + h) };
    }
    const argb = /\bColor\.fromARGB\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    while ((m = argb.exec(code))) {
      const hex = functionalToHex('rgb', `${m[2]} ${m[3]} ${m[4]} ${m[1] / 255}`);
      yield { offset: m.index, length: m[0].length, literal: m[0], hex: data.normHex(hex) };
    }
    const rgbo = /\bColor\.fromRGBO\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/g;
    while ((m = rgbo.exec(code))) {
      const hex = functionalToHex('rgb', `${m[1]} ${m[2]} ${m[3]} ${m[4]}`);
      yield { offset: m.index, length: m[0].length, literal: m[0], hex: data.normHex(hex) };
    }
  }
}

function colorFindings(ctx) {
  if (ctx._colors) return ctx._colors;
  const out = [];
  if (!isTokenFile(ctx.filename)) {
    for (const c of colorLiterals(ctx)) {
      if (!c.hex) continue;
      const before = lineBefore(ctx.code, c.offset);
      if (insideVarFallback(before)) continue;
      let context = colorContext(before);
      // "Deal #1024" or "Issue #123": all-digit short hex outside a color property.
      if (!context && /^#\d{3,4}$/.test(c.literal) && !/[:(,\[]\s*$/.test(before)) continue;
      if (ctx.kind === 'dart' && /(?:^|[^\w])color\s*:\s*$/.test(before.replace(/Color\($|const\s+$/, ''))) context = dartColorOwner(ctx.code, c.offset);
      out.push({ ...c, context, inPalette: ctx.data.palette.has(c.hex) });
    }
  }
  ctx._colors = out;
  return out;
}

const tokenFix = (ctx, name) => (ctx.kind === 'css' || ctx.kind === 'html' ? `var(${cssVarName(name)})` : name);

const noRawColor = {
  id: 'no-raw-color',
  severity: 'error',
  description: 'Hex, rgb(), hsl() and Dart Color(0x...) literals must be Syntropy color tokens.',
  appliesTo: CODE,
  check(ctx) {
    for (const c of colorFindings(ctx)) {
      if (!c.inPalette) continue; // reported by off-palette-color
      const names = suggestTokens(ctx.data, c.hex, c.context);
      const alt = names.length > 1 ? ` (or ${names.slice(1).join(', ')})` : '';
      ctx.report(c.offset, `raw color ${c.literal}: use token ${names[0]}${alt}`, tokenFix(ctx, names[0]));
    }
  },
};

const offPalette = {
  id: 'off-palette-color',
  severity: 'error',
  description: 'A color that does not exist anywhere in the Syntropy token set.',
  appliesTo: CODE,
  check(ctx) {
    for (const c of colorFindings(ctx)) {
      if (c.inPalette) continue;
      const near = nearestToken(ctx.data, c.hex, c.context);
      ctx.report(
        c.offset,
        `off-palette color ${c.literal}: not in the Syntropy palette, use the nearest token ${near.name} (${near.hex})`,
        tokenFix(ctx, near.name),
      );
    }
  },
};

/* ---------------------------------------------------------- class strings */

function classStrings(ctx) {
  if (ctx._classes) return ctx._classes;
  const { code, kind } = ctx;
  const seen = new Set();
  const out = [];
  const add = (start, text) => {
    if (!seen.has(start)) {
      seen.add(start);
      out.push({ start, text });
    }
  };
  const literals = (from, to) => {
    const lit = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
    const seg = code.slice(from, to);
    let m;
    while ((m = lit.exec(seg))) add(from + m.index + 1, m[2]);
  };
  if (kind === 'html' || kind === 'js') {
    const attr = /\bclass(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|(\{))/g;
    let m;
    while ((m = attr.exec(code))) {
      if (m[3]) {
        const open = m.index + m[0].length - 1;
        literals(open + 1, findClose(code, open));
      } else {
        const text = m[1] ?? m[2];
        add(m.index + m[0].length - 1 - text.length, text);
      }
    }
  }
  if (kind === 'js') {
    const call = /\b(?:cn|clsx|classnames|classNames|twMerge|twJoin|cva|tw)\s*\(/g;
    let m;
    while ((m = call.exec(code))) {
      const open = m.index + m[0].length - 1;
      literals(open + 1, findClose(code, open));
    }
  }
  ctx._classes = out;
  return out;
}

function* classTokens(ctx) {
  for (const s of classStrings(ctx)) {
    const re = /[^\s]+/g;
    let m;
    while ((m = re.exec(s.text))) yield { offset: s.start + m.index, cls: m[0] };
  }
}

function splitVariant(cls) {
  let depth = 0;
  let cut = -1;
  for (let i = 0; i < cls.length; i++) {
    const c = cls[i];
    if (c === '[') depth++;
    else if (c === ']') depth--;
    else if (c === ':' && depth === 0) cut = i;
  }
  const prefix = cls.slice(0, cut + 1);
  let base = cls.slice(cut + 1);
  const bang = base.startsWith('!') ? '!' : '';
  base = base.slice(bang.length);
  const neg = base.startsWith('-') ? '-' : '';
  return { prefix: prefix + bang + neg, base: base.slice(neg.length) };
}

/* ----------------------------------------------------------- css regions */

// CSS text to scan: whole file for CSS, <style> blocks and style="" for HTML,
// the masked code (CSS-in-JS template strings, style objects) for JS.
function cssRegions(ctx) {
  if (ctx._css) return ctx._css;
  const { code, kind } = ctx;
  let out = [];
  if (kind === 'css') out = [{ text: code, base: 0, blocks: true }];
  else if (kind === 'html') {
    let m;
    const style = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    while ((m = style.exec(code))) out.push({ text: m[1], base: m.index + m[0].indexOf('>') + 1, blocks: true });
    const attr = /\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
    while ((m = attr.exec(code))) {
      const text = m[1] ?? m[2];
      out.push({ text, base: m.index + m[0].length - 1 - text.length, blocks: false });
    }
  } else if (kind === 'js') out = [{ text: code, base: 0, blocks: false }];
  ctx._css = out;
  return out;
}

const stripVar = (v) => v.replace(/var\((?:[^()]|\([^()]*\))*\)/g, (s) => ' '.repeat(s.length));

/* --------------------------------------------------------------- spacing */

function scaleReport(ctx, scale, kindLabel, px, offset, literal, strictOffScale) {
  const abs = Math.abs(px);
  const hit = scale.find((t) => t.px === abs);
  if (hit) {
    ctx.report(offset, `raw ${kindLabel} ${literal}: use token ${hit.name}`, tokenFix(ctx, hit.name), 'warning');
    return;
  }
  const sorted = [...scale].sort((a, b) => a.px - b.px);
  const below = [...sorted].reverse().find((t) => t.px < abs);
  const above = sorted.find((t) => t.px > abs);
  const opts = [below, above].filter(Boolean).map((t) => `${t.name} (${t.px}px)`).join(' or ');
  const nearest = [below, above].filter(Boolean).sort((a, b) => Math.abs(a.px - abs) - Math.abs(b.px - abs))[0];
  ctx.report(
    offset,
    `off-scale ${kindLabel} ${literal}: not on the ${kindLabel} scale, use ${opts}`,
    tokenFix(ctx, nearest.name),
    strictOffScale ? 'error' : 'warning',
  );
}

const SPACING_PROPS_CSS = /(?<![\w.#$-])((?:padding|margin|inset|scroll-padding|scroll-margin)(?:-[a-z]+)*|gap|row-gap|column-gap|top|bottom|left|right)\s*:\s*([^;{}\n]*)/g;
const SPACING_PROPS_JS = /(?<![\w.#$-])((?:padding|margin|inset)(?:[A-Z]\w*|(?:-[a-z]+)*)|gap|rowGap|columnGap|row-gap|column-gap)\s*:\s*([^;,{}\n]*)/g;
const TW_SPACE = /^(?:p|px|py|pt|pb|pl|pr|ps|pe|m|mx|my|mt|mb|ml|mr|ms|me|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|bottom|left|right|start|end)-\[(\d*\.?\d+)px\]$/;
const TW_RADIUS = /^rounded(?:-[a-z]+)?-\[(\d*\.?\d+)px\]$/;

function scanPxDecls(ctx, re, scale, label, strict, allowBareNumber) {
  for (const r of cssRegions(ctx)) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(r.text))) {
      const valueStart = r.base + m.index + m[0].length - m[2].length;
      const value = stripVar(m[2]);
      const px = /(-?\d*\.?\d+)px\b/g;
      let p;
      let any = false;
      while ((p = px.exec(value))) {
        any = true;
        scaleReport(ctx, scale, label, parseFloat(p[1]), valueStart + p.index, p[0], strict);
      }
      if (!any && allowBareNumber && ctx.kind === 'js') {
        const bare = value.match(/^\s*['"]?(-?\d+(?:\.\d+)?)['"]?\s*$/);
        if (bare && /^\s*-?\d/.test(value)) {
          scaleReport(ctx, scale, label, parseFloat(bare[1]), valueStart + value.indexOf(bare[1]), bare[1], strict);
        }
      }
    }
  }
}

const noRawSpacing = {
  id: 'no-raw-spacing',
  severity: 'warning',
  description: 'Raw px spacing must use space/* tokens; values off the spacing scale are errors.',
  appliesTo: CODE,
  check(ctx) {
    if (isTokenFile(ctx.filename)) return;
    const scale = ctx.data.space;
    if (ctx.kind === 'css' || ctx.kind === 'html') scanPxDecls(ctx, SPACING_PROPS_CSS, scale, 'spacing', true, false);
    if (ctx.kind === 'js') scanPxDecls(ctx, SPACING_PROPS_JS, scale, 'spacing', true, true);
    for (const t of classTokens(ctx)) {
      const { base, prefix } = splitVariant(t.cls);
      const m = base.match(TW_SPACE);
      if (m) scaleReport(ctx, scale, 'spacing', parseFloat(m[1]), t.offset + prefix.length, t.cls, true);
    }
    if (ctx.kind === 'dart') {
      const { code } = ctx;
      const re = /\bEdgeInsets(?:Directional)?\.(?:all|symmetric|only|fromLTRB|fromSTEB)\s*\(/g;
      let m;
      while ((m = re.exec(code))) {
        const open = m.index + m[0].length - 1;
        const args = code.slice(open + 1, findClose(code, open));
        const num = /(?<![\w.])(\d+(?:\.\d+)?)(?![\w.])/g;
        let n;
        while ((n = num.exec(args))) scaleReport(ctx, scale, 'spacing', parseFloat(n[1]), open + 1 + n.index, n[1], true);
      }
      const box = /\bSizedBox\(\s*(?:width|height)\s*:\s*(\d+(?:\.\d+)?)\s*,?\s*\)/g;
      while ((m = box.exec(code))) scaleReport(ctx, scale, 'spacing', parseFloat(m[1]), m.index + m[0].indexOf(m[1], 9), m[1], true);
    }
  },
};

const noRawRadius = {
  id: 'no-raw-radius',
  severity: 'warning',
  description: 'Raw px border radius must use radius/* tokens.',
  appliesTo: CODE,
  check(ctx) {
    if (isTokenFile(ctx.filename)) return;
    const scale = ctx.data.radius;
    const re = /(?<![\w.#$-])(border(?:-[a-z]+)*-radius|border\w*Radius)\s*:\s*([^;{}\n]*)/g;
    if (ctx.kind !== 'dart') scanPxDecls(ctx, re, scale, 'radius', false, true);
    for (const t of classTokens(ctx)) {
      const { base, prefix } = splitVariant(t.cls);
      const m = base.match(TW_RADIUS);
      if (m) scaleReport(ctx, scale, 'radius', parseFloat(m[1]), t.offset + prefix.length, t.cls, false);
    }
    if (ctx.kind === 'dart') {
      const dre = /\b(?:BorderRadius|Radius)(?:Directional)?\.circular\(\s*(\d+(?:\.\d+)?)\s*\)/g;
      let m;
      while ((m = dre.exec(ctx.code))) scaleReport(ctx, scale, 'radius', parseFloat(m[1]), m.index + m[0].lastIndexOf(m[1]), m[1], false);
    }
  },
};

/* ------------------------------------------------------------- direction */

const SIDE = { left: 'start', right: 'end', Left: 'Start', Right: 'End' };
const CORNER = { 'top-left': 'start-start', 'top-right': 'start-end', 'bottom-left': 'end-start', 'bottom-right': 'end-end' };

function cssLogical(prop) {
  let m = prop.match(/^border-(top|bottom)-(left|right)-radius$/);
  if (m) return `border-${CORNER[`${m[1]}-${m[2]}`]}-radius`;
  m = prop.match(/^(margin|padding|border|inset|scroll-margin|scroll-padding)-(left|right)(-[a-z]+)?$/);
  if (m) return `${m[1]}-inline-${SIDE[m[2]]}${m[3] || ''}`;
  if (prop === 'left' || prop === 'right') return `inset-inline-${SIDE[prop]}`;
  return null;
}

function jsLogical(prop) {
  let m = prop.match(/^border(Top|Bottom)(Left|Right)Radius$/);
  if (m) return `border${m[1] === 'Top' ? 'Start' : 'End'}${SIDE[m[2]]}Radius`;
  m = prop.match(/^(margin|padding|border|scrollMargin|scrollPadding)(Left|Right)(\w*)$/);
  if (m) return `${m[1]}Inline${SIDE[m[2]]}${m[3]}`;
  return null;
}

function tailwindLogical(base) {
  let m;
  if ((m = base.match(/^(scroll-)?(m|p)([lr])-(.+)$/))) return `${m[1] || ''}${m[2]}${m[3] === 'l' ? 's' : 'e'}-${m[4]}`;
  if ((m = base.match(/^(left|right)-(.+)$/))) return `${m[1] === 'left' ? 'start' : 'end'}-${m[2]}`;
  if ((m = base.match(/^(text|float|clear)-(left|right)$/))) return `${m[1]}-${m[2] === 'left' ? 'start' : 'end'}`;
  if ((m = base.match(/^rounded-(l|r|tl|tr|bl|br)(-.+)?$/))) {
    const map = { l: 's', r: 'e', tl: 'ss', tr: 'se', bl: 'es', br: 'ee' };
    return `rounded-${map[m[1]]}${m[2] || ''}`;
  }
  if ((m = base.match(/^border-(l|r)(-.+)?$/))) return `border-${m[1] === 'l' ? 's' : 'e'}${m[2] || ''}`;
  return null;
}

const physicalDirection = {
  id: 'physical-direction',
  severity: 'error',
  description: 'Left/right properties, values, Tailwind classes and Flutter APIs break RTL; use logical start/end.',
  appliesTo: ['css', 'html', 'js', 'dart'],
  check(ctx) {
    const { kind, code } = ctx;
    const err = (offset, what, fix) => ctx.report(offset, `physical direction ${what}: use ${fix}`, fix);

    if (kind === 'css' || kind === 'html' || kind === 'js') {
      for (const r of cssRegions(ctx)) {
        const propRe =
          kind === 'js'
            ? /(?<![\w.#$-])((?:margin|padding|border|inset|scroll-margin|scroll-padding)-(?:left|right)(?:-[a-z]+)?|border-(?:top|bottom)-(?:left|right)-radius)\s*:/g
            : /(?<![\w.#$&-])((?:margin|padding|border|inset|scroll-margin|scroll-padding)-(?:left|right)(?:-[a-z]+)?|border-(?:top|bottom)-(?:left|right)-radius|left|right)\s*:(?!:)/g;
        let m;
        while ((m = propRe.exec(r.text))) err(r.base + m.index, `"${m[1]}"`, cssLogical(m[1]));
        const valRe = /(?<![\w-])(text-align|float|clear)\s*:\s*(left|right)\b/g;
        while ((m = valRe.exec(r.text))) {
          const val = m[1] === 'text-align' ? SIDE[m[2]] : `inline-${SIDE[m[2]]}`;
          err(r.base + m.index, `"${m[1]}: ${m[2]}"`, `${m[1]}: ${val}`);
        }
        if (kind === 'js') {
          const camel = /(?<![\w.$])((?:margin|padding|border|scrollMargin|scrollPadding)(?:Left|Right)\w*|border(?:Top|Bottom)(?:Left|Right)Radius)\s*:/g;
          while ((m = camel.exec(r.text))) err(r.base + m.index, `"${m[1]}"`, jsLogical(m[1]));
          const cv = /\b(textAlign|float|clear)\s*:\s*(['"])(left|right)\2/g;
          while ((m = cv.exec(r.text))) {
            const val = m[1] === 'textAlign' ? SIDE[m[3]] : `inline-${SIDE[m[3]]}`;
            err(r.base + m.index, `"${m[1]}: '${m[3]}'"`, `${m[1]}: '${val}'`);
          }
        }
      }
      for (const t of classTokens(ctx)) {
        const { base, prefix } = splitVariant(t.cls);
        const logical = tailwindLogical(base);
        if (logical) err(t.offset, `class "${t.cls}"`, prefix + logical);
      }
    }

    if (kind === 'dart') {
      const argsOf = (m) => {
        const open = m.index + m[0].length - 1;
        return topLevel(code.slice(open + 1, findClose(code, open)));
      };
      let m;
      const only = /\bEdgeInsets\.only\s*\(/g;
      while ((m = only.exec(code))) {
        if (/\b(left|right)\s*:/.test(argsOf(m))) err(m.index, 'EdgeInsets.only(left:/right:)', 'EdgeInsetsDirectional.only(start:/end:)');
      }
      const ltrb = /\bEdgeInsets\.fromLTRB\b/g;
      while ((m = ltrb.exec(code))) err(m.index, 'EdgeInsets.fromLTRB', 'EdgeInsetsDirectional.fromSTEB');
      const align = /\bAlignment\.(top|center|bottom)(Left|Right)\b/g;
      while ((m = align.exec(code))) err(m.index, m[0], `AlignmentDirectional.${m[1]}${SIDE[m[2]]}`);
      const pos = /\bPositioned\s*\(/g;
      while ((m = pos.exec(code))) {
        if (/\b(left|right)\s*:/.test(argsOf(m))) err(m.index, 'Positioned(left:/right:)', 'PositionedDirectional(start:/end:)');
      }
      const ta = /\bTextAlign\.(left|right)\b/g;
      while ((m = ta.exec(code))) err(m.index, m[0], `TextAlign.${SIDE[m[1]]}`);
      const br = /\bBorderRadius\.only\s*\(/g;
      while ((m = br.exec(code))) {
        if (/\b(top|bottom)(Left|Right)\s*:/.test(argsOf(m))) err(m.index, 'BorderRadius.only(topLeft:...)', 'BorderRadiusDirectional.only(topStart:...)');
      }
      const border = /(?<![\w.])Border\s*\(/g;
      while ((m = border.exec(code))) {
        if (/\b(left|right)\s*:/.test(argsOf(m))) err(m.index, 'Border(left:/right:)', 'BorderDirectional(start:/end:)');
      }
    }
  },
};

/* ------------------------------------------------------------------ copy */

const noEmDash = {
  id: 'no-em-dash',
  severity: 'error',
  description: 'The em dash character (U+2014) is banned in all copy, code and docs.',
  appliesTo: ALL,
  check(ctx) {
    let i = -1;
    while ((i = ctx.src.indexOf('\u2014', i + 1)) !== -1) {
      ctx.report(i, 'em dash (U+2014): rewrite with a comma, colon or full stop', 'replace with ", " or ": "');
    }
  },
};

const EASTERN = /[٠-٩۰-۹](?:[٠-٩۰-۹٫٬]*[٠-٩۰-۹])?/g;
const toWestern = (s) =>
  s.replace(/[٠-٩]/g, (d) => d.charCodeAt(0) - 0x660)
    .replace(/[۰-۹]/g, (d) => d.charCodeAt(0) - 0x6f0)
    .replace(/٫/g, '.')
    .replace(/٬/g, ',');

const easternNumerals = {
  id: 'eastern-arabic-numerals',
  severity: 'error',
  description: 'Copy uses Western digits (0-9), never Eastern Arabic digits.',
  appliesTo: ALL,
  check(ctx) {
    EASTERN.lastIndex = 0;
    let m;
    while ((m = EASTERN.exec(ctx.src))) {
      const w = toWestern(m[0]);
      ctx.report(m.index, `Eastern Arabic numerals "${m[0]}": use Western digits "${w}"`, w);
    }
  },
};

const AMOUNT = '([0-9\\u0660-\\u0669][0-9\\u0660-\\u0669,.\\u066B\\u066C]*)';
const AR_CURRENCY = new RegExp(
  `((?<![\\u0621-\\u064A])ر\\s?\\.\\s?س\\.?(?![\\u0621-\\u064A])|﷼|(?<![\\u0621-\\u064A])ريال(?:\\s+سعودي)?(?![\\u0621-\\u064A]))\\s*${AMOUNT}`,
  'g',
);
const SAR_FIRST = new RegExp(`\\b(SAR)\\s*${AMOUNT}`, 'g');

const currencyPosition = {
  id: 'currency-position',
  severity: 'warning',
  description: 'In Arabic copy the currency follows the amount (1,250.00 ر.س).',
  appliesTo: ALL,
  check(ctx) {
    const { src } = ctx;
    let m;
    AR_CURRENCY.lastIndex = 0;
    while ((m = AR_CURRENCY.exec(src))) {
      const cur = m[1].replace(/\s+/g, ' ').trim();
      const fix = `${m[2]} ${cur === '﷼' ? 'ر.س' : cur}`;
      ctx.report(m.index, `currency before amount "${m[0]}": write the amount first, "${fix}"`, fix);
    }
    SAR_FIRST.lastIndex = 0;
    while ((m = SAR_FIRST.exec(src))) {
      // English locale may lead with SAR: only flag when the surrounding
      // phrase (bounded by quotes, backticks, slashes, pipes, brackets) is Arabic.
      const stop = /[\n`"'|/()\[\]«»]/;
      let a = m.index;
      while (a > 0 && !stop.test(src[a - 1])) a--;
      let b = m.index + m[0].length;
      while (b < src.length && !stop.test(src[b])) b++;
      if (!AR_LETTER.test(src.slice(a, b))) continue;
      const fix = `${m[2]} ر.س`;
      ctx.report(m.index, `currency before amount "${m[0]}" in Arabic copy: write "${fix}"`, fix);
    }
  },
};

const PERCENT = /(?:[0-9٠-٩]\s*[%٪])|(?:[%٪]\s*[0-9٠-٩])/;
const NISBA_EXEMPT = /نسبة|معدل|تغطية/;

const percentNisba = {
  id: 'percent-label-nisba',
  severity: 'warning',
  description: 'Arabic labels for a % value start with «نسبة» (IRR uses «معدل»).',
  appliesTo: ALL,
  check(ctx) {
    const lines = ctx.src.split('\n');
    let offset = 0;
    for (const line of lines) {
      if (AR_LETTER.test(line) && !NISBA_EXEMPT.test(line)) {
        const m = line.match(PERCENT);
        // A fee or rate basis such as «(1% من الربح)» is not a percentage label.
        const basis = m && /^\s*(?:من|of)(?:\s|$)/.test(line.slice(m.index + m[0].length).replace(/^[^\S\n]*[%٪]?/, ''));
        if (m && !basis) {
          const at = m.index + m[0].search(/[%٪]/);
          ctx.report(offset + at, 'percent value labelled without «نسبة»: start the Arabic label with نسبة (e.g. نسبة صافي العائد)', 'prefix the label with نسبة');
        }
      }
      offset += line.length + 1;
    }
  },
};

const URGENCY = [
  [/\bonly\s+\d+\s+(?:left|remaining|spots?|units?|shares?)\b/gi, 'scarcity count'],
  [/\bhurry\b/gi, 'hurry'],
  [/\blimited[- ]time\b/gi, 'limited time'],
  [/\bact\s+now\b/gi, 'act now'],
  [/\bending\s+soon\b/gi, 'ending soon'],
  [/\blast\s+chance\b/gi, 'last chance'],
  [/\bdon'?t\s+miss\s+out\b/gi, "don't miss out"],
  [/\b(?:sells?|selling)\s+out\s+fast\b/gi, 'selling out fast'],
  [/\b(?:offer|deal|opportunity)\s+ends\s+in\b/gi, 'countdown'],
  [/\bends\s+in\s+\d+\s*(?:hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/gi, 'countdown'],
  [/سارع/g, 'سارع'],
  [/لفترة\s+محدودة/g, 'لفترة محدودة'],
  [/آخر\s+فرصة/g, 'آخر فرصة'],
  [/بادر\s+الآن/g, 'بادر الآن'],
  [/لا\s+تفوّ?ت/g, 'لا تفوت'],
  [/(?:بقي|تبقى|متبقي)\s+فقط/g, 'scarcity count'],
  [/ينتهي\s+خلال/g, 'countdown'],
];

const fakeUrgency = {
  id: 'fake-urgency',
  severity: 'warning',
  description: 'No manufactured urgency or scarcity in investment copy (CMA, trust).',
  appliesTo: ALL,
  check(ctx) {
    for (const [re, label] of URGENCY) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(ctx.src))) {
        ctx.report(m.index, `fake urgency "${m[0]}" (${label}): state the fact neutrally, e.g. the funding close date`, 'remove the pressure wording; state dates or amounts plainly');
      }
    }
  },
};

/* ------------------------------------------------------------ components */

// Yields component references: { offset, name, attrsText?, attrsBase?, dartArgs? }
function* componentRefs(ctx) {
  const { code, kind } = ctx;
  let m;
  if (kind === 'js' || kind === 'text') {
    const jsx = /<Syntropy\.([A-Za-z0-9_]+)/g;
    while ((m = jsx.exec(code))) yield { offset: m.index, name: m[1], syntropy: true, tagEnd: m.index + m[0].length };
  }
  if (kind === 'dart') {
    const dart = /\bSafqah([A-Z]\w*)\s*\(/g;
    while ((m = dart.exec(code))) {
      if (/(?:Variant|Size|State|Direction|Type|Style|Tone)$/.test(m[1]) && code[m.index - 1] === '.') continue;
      yield { offset: m.index, name: m[1], syntropy: true, dartOpen: m.index + m[0].length - 1 };
    }
  }
  if (kind === 'text') {
    const spec = /^[ \t]*(?:[-*>][ \t]*)?\**component\**[ \t]*:[ \t]*\**`?([^`*\n]+?)`?\**[ \t]*[.,;]?[ \t]*$/gim;
    while ((m = spec.exec(code))) yield { offset: m.index + m[0].indexOf(m[1]), name: m[1].trim(), syntropy: true, specLine: m.index };
  }
}

// Closest manifest name: exact last segment ("RecommendationRow" ->
// "Reinvest / RecommendationRow"), otherwise edit distance with a bonus when
// one name contains the other ("RadioOption" -> "Radio").
function suggestComponent(data, name) {
  const t = normalizeName(name);
  let best = null;
  let bestScore = Infinity;
  for (const [key, c] of data.components) {
    const last = normalizeName(c.name.split('/').pop());
    let score = Math.min(levenshtein(t, key), levenshtein(t, last));
    if (last === t) score = -1;
    else if ((last.length >= 4 && (t.includes(last) || last.includes(t))) || (t.length >= 4 && key.includes(t))) score -= 3;
    if (score < bestScore) {
      bestScore = score;
      best = c.name;
    }
  }
  return best;
}

function lookupComponent(data, name) {
  return data.components.get(normalizeName(name));
}

const unknownComponent = {
  id: 'unknown-component',
  severity: 'warning',
  description: 'Syntropy component references must name a component in the manifest.',
  appliesTo: ['js', 'dart', 'text'],
  check(ctx) {
    const { data } = ctx;
    for (const ref of componentRefs(ctx)) {
      if (lookupComponent(data, ref.name)) continue;
      const name = suggestComponent(data, ref.name);
      ctx.report(ref.offset, `unknown component "${ref.name}": not in the Syntropy manifest, did you mean ${name}?`, name);
    }
  },
};

function checkVariant(ctx, comp, prop, value, offset) {
  const vp = comp.variantProps.get(normalizeName(prop));
  if (!vp || !value) return;
  if (vp.options.has(String(value).toLowerCase())) return;
  const near = closest(String(value).toLowerCase(), vp.display, (o) => o.toLowerCase());
  ctx.report(
    offset,
    `unknown variant ${prop}="${value}" on ${comp.name}: use ${near} (options: ${vp.display.filter((o, i, a) => a.findIndex((x) => x.toLowerCase() === o.toLowerCase()) === i).join(', ')})`,
    near,
  );
}

let nameRegexCache = null;
function componentNameRegex(data) {
  if (nameRegexCache && nameRegexCache.data === data) return nameRegexCache.re;
  const names = [...data.components.values()]
    .map((c) => c.name)
    .filter((n) => n.length >= 3)
    .sort((a, b) => b.length - a.length)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(?<![\\w])(?:${names.join('|')})(?![\\w])`, 'g');
  nameRegexCache = { data, re };
  return re;
}

const unknownVariant = {
  id: 'unknown-variant',
  severity: 'warning',
  description: 'Variant values on a known component must be one of its options.',
  appliesTo: ['js', 'dart', 'text', 'html'],
  check(ctx) {
    const { code, kind, data } = ctx;
    const attrRe = /(?<![\w-])([A-Za-z][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*["'`]([^"'`]*)["'`]\s*\})/g;
    const scanTag = (comp, start) => {
      let i = start;
      let depth = 0;
      while (i < code.length) {
        const c = code[i];
        if (c === '{') depth++;
        else if (c === '}') depth--;
        else if (c === '"' || c === "'") {
          const end = code.indexOf(c, i + 1);
          i = end === -1 ? code.length : end;
        } else if (c === '>' && depth === 0) break;
        i++;
      }
      const text = code.slice(start, i);
      attrRe.lastIndex = 0;
      let a;
      while ((a = attrRe.exec(text))) checkVariant(ctx, comp, a[1], a[2] ?? a[3] ?? a[4], start + a.index);
    };

    if (kind === 'js' || kind === 'text' || kind === 'html') {
      const tag = /<(?:Syntropy\.)?([A-Z][A-Za-z0-9_]*)(?=[\s/>])/g;
      let m;
      while ((m = tag.exec(code))) {
        const comp = lookupComponent(data, m[1]);
        if (comp) scanTag(comp, m.index + m[0].length);
      }
    }

    if (kind === 'dart') {
      for (const ref of componentRefs(ctx)) {
        const comp = lookupComponent(data, ref.name);
        if (!comp || ref.dartOpen == null) continue;
        const end = findClose(code, ref.dartOpen);
        const args = code.slice(ref.dartOpen + 1, end);
        const top = topLevel(args);
        const re = /\b(\w+)\s*:\s*(?:['"]([\w-]+)['"]|(?:[A-Z]\w*)?\.(\w+))/g;
        let a;
        while ((a = re.exec(top))) {
          const value = args.slice(a.index, a.index + a[0].length).match(/['"]([\w-]+)['"]|\.(\w+)/);
          checkVariant(ctx, comp, a[1], value && (value[1] || value[2]), ref.dartOpen + 1 + a.index);
        }
      }
    }

    if (kind === 'text') {
      // Spec blocks: "component: X" then "variant: value" lines until a blank line.
      const lines = code.split('\n');
      let offset = 0;
      let current = null;
      const nameRe = componentNameRegex(data);
      for (const line of lines) {
        const spec = line.match(/^[ \t]*(?:[-*>][ \t]*)?\**component\**[ \t]*:[ \t]*\**`?([^`*\n]+?)`?\**[ \t]*[.,;]?[ \t]*$/i);
        if (spec) current = lookupComponent(data, spec[1].trim()) || null;
        else if (!line.trim()) current = null;
        else if (current) {
          const kv = line.match(/^[ \t]*(?:[-*][ \t]*)?\**([A-Za-z][\w ]*?)\**[ \t]*[:=][ \t]*`?["']?([\w-]+)["']?`?[ \t]*[.,;]?[ \t]*$/);
          if (kv) checkVariant(ctx, current, kv[1], kv[2], offset + line.indexOf(kv[1]));
        }
        // Inline "Button Variant=primary, Size=md" style references.
        if (/[A-Za-z]=[\w-]/.test(line)) {
          const mentions = [];
          nameRe.lastIndex = 0;
          let n;
          while ((n = nameRe.exec(line))) mentions.push({ at: n.index, comp: lookupComponent(data, n[0]) });
          const pair = /(?<![\w.<-])([A-Z][A-Za-z]*(?: [a-z]+)*)=`?([\w-]+)/g;
          let p;
          while ((p = pair.exec(line))) {
            const owner = [...mentions].reverse().find((x) => x.at < p.index)?.comp || current;
            if (owner) checkVariant(ctx, owner, p[1], p[2], offset + p.index);
          }
        }
        offset += line.length + 1;
      }
    }
  },
};

/* -------------------------------------------------------------- contrast */

function resolveColor(ctx, value, localVars, depth = 0) {
  if (!value || depth > 4) return null;
  const v = value.trim();
  const varM = v.match(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\)/);
  if (varM) {
    const name = varM[1].toLowerCase();
    const tok = ctx.data.cssVars.get(name);
    if (tok && tok.hex) return { hex: tok.hex, label: tok.name };
    if (localVars.has(name)) return resolveColor(ctx, localVars.get(name), localVars, depth + 1);
    if (varM[2]) return resolveColor(ctx, varM[2], localVars, depth + 1);
    return null;
  }
  const hexM = v.match(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/);
  if (hexM) {
    const hex = ctx.data.normHex('#' + hexM[1]);
    return hex ? { hex, label: '#' + hexM[1] } : null;
  }
  const fnM = v.match(/\b(rgba?|hsla?)\(\s*([^()]*?)\)/i);
  if (fnM) {
    const hex = functionalToHex(fnM[1], fnM[2]);
    return hex ? { hex: ctx.data.normHex(hex), label: fnM[0] } : null;
  }
  if (/^(white)\b/i.test(v)) return { hex: '#ffffff', label: 'white' };
  if (/^(black)\b/i.test(v)) return { hex: '#000000', label: 'black' };
  return null;
}

const contrast = {
  id: 'contrast',
  severity: 'error',
  description: 'Text color on its background must reach WCAG 2.x 4.5:1 when both are known. Brand green pairs as built (white on bg/brand/primary, brand green on light surfaces) are accepted.',
  appliesTo: ['css', 'html'],
  check(ctx) {
    const localVars = new Map();
    const regions = cssRegions(ctx);
    for (const r of regions) {
      const def = /(--[\w-]+)\s*:\s*([^;{}]+)/g;
      let d;
      while ((d = def.exec(r.text))) localVars.set(d[1].toLowerCase(), d[2]);
    }
    const textTokens = ctx.data.colorTokens.filter((t) => t.semantic && t.name.startsWith('text/') && t.hex.length === 7);
    for (const r of regions) {
      const blocks = [];
      if (r.blocks) {
        const re = /\{([^{}]*)\}/g;
        let b;
        while ((b = re.exec(r.text))) blocks.push({ body: b[1], base: r.base + b.index + 1 });
      } else blocks.push({ body: r.text, base: r.base });
      for (const blk of blocks) {
        const decl = /(?<![\w-])(color|background-color|background)\s*:\s*([^;]+)/g;
        let fg = null;
        let bg = null;
        let m;
        while ((m = decl.exec(blk.body))) {
          const res = resolveColor(ctx, m[2], localVars);
          if (m[1] === 'color') fg = res && { ...res, offset: blk.base + m.index };
          else bg = res;
        }
        if (!fg || !bg) continue;
        if (bg.hex.length === 9) continue; // translucent background: underlying color unknown
        const ratio = contrastRatio(fg.hex, bg.hex);
        if (ratio >= 4.5) continue;
        if (ctx.data.brandAsBuilt.has(`${fg.hex}|${bg.hex}`)) continue; // brand green as built: accepted
        const passing = textTokens
          .map((t) => ({ t, r: contrastRatio(t.hex, bg.hex) }))
          .filter((x) => x.r >= 4.5)
          .sort((a, b) => b.r - a.r);
        const fix = passing.length ? passing[0].t.name : 'a darker or lighter text token';
        ctx.report(
          fg.offset,
          `contrast ${fmt(ratio)}:1 between color ${fg.label} and background ${bg.label} is below 4.5:1: use ${fix}${passing.length ? ` (${fmt(passing[0].r)}:1)` : ''} or change the background`,
          passing.length ? tokenFix(ctx, fix) : fix,
        );
      }
    }
  },
};

export const RULE_IMPLS = [
  noRawColor,
  noRawSpacing,
  noRawRadius,
  offPalette,
  physicalDirection,
  noEmDash,
  easternNumerals,
  currencyPosition,
  percentNisba,
  unknownComponent,
  unknownVariant,
  fakeUrgency,
  contrast,
];

export const COPY_RULES = new Set([
  'no-em-dash',
  'eastern-arabic-numerals',
  'currency-position',
  'percent-label-nisba',
  'fake-urgency',
]);
