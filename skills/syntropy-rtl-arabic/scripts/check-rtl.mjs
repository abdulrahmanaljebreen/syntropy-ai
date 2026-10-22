#!/usr/bin/env node
// syntropy-lint-disable physical-direction, eastern-arabic-numerals (rule and fix tables name physical values on purpose)
// check-rtl-ignore-file
// check-rtl.mjs: zero-dependency RTL scanner for Syntropy (Safqah).
// Finds physical left/right usage that breaks in Arabic RTL and Eastern Arabic digits.
//
// Usage:
//   node check-rtl.mjs <file|dir> [...more]      scan files (dirs are walked)
//   node check-rtl.mjs --json <file>             machine-readable output
//   node check-rtl.mjs --stdin --ext=dart        scan text piped on stdin
// Ignore a line on purpose with a trailing comment containing: check-rtl-ignore
// Ignore a whole file with the marker check-rtl-ignore-file in its first 5 lines.
// Exit code: 0 no findings, 1 findings, 2 usage error. Node >= 20.

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const fromStdin = args.includes('--stdin');
const extArg = (args.find((a) => a.startsWith('--ext=')) || '').slice(6);
const targets = args.filter((a) => !a.startsWith('--'));

const CSS_EXT = new Set(['.css', '.scss', '.sass', '.less']);
const MARKUP_EXT = new Set(['.html', '.htm', '.vue', '.svelte', '.astro']);
const JS_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const DART_EXT = new Set(['.dart']);
const TEXT_EXT = new Set(['.md', '.txt', '.json', '.arb', '.yaml', '.yml', '.csv', '.po', '.strings', '.xml']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'build', 'dist', '.dart_tool', '.next', 'coverage']);

// Each rule: id, kinds (which file kinds it applies to), regex (global), message, fix(match) -> suggestion.
const CSS_PROP_FIX = {
  'margin-left': 'margin-inline-start', 'margin-right': 'margin-inline-end',
  'padding-left': 'padding-inline-start', 'padding-right': 'padding-inline-end',
  'border-left': 'border-inline-start', 'border-right': 'border-inline-end',
  'border-left-width': 'border-inline-start-width', 'border-right-width': 'border-inline-end-width',
  'border-left-color': 'border-inline-start-color', 'border-right-color': 'border-inline-end-color',
  'border-left-style': 'border-inline-start-style', 'border-right-style': 'border-inline-end-style',
  'border-top-left-radius': 'border-start-start-radius', 'border-top-right-radius': 'border-start-end-radius',
  'border-bottom-left-radius': 'border-end-start-radius', 'border-bottom-right-radius': 'border-end-end-radius',
  'left': 'inset-inline-start', 'right': 'inset-inline-end',
  'scroll-margin-left': 'scroll-margin-inline-start', 'scroll-margin-right': 'scroll-margin-inline-end',
  'scroll-padding-left': 'scroll-padding-inline-start', 'scroll-padding-right': 'scroll-padding-inline-end',
};
const JS_PROP_FIX = {
  marginLeft: 'marginInlineStart', marginRight: 'marginInlineEnd',
  paddingLeft: 'paddingInlineStart', paddingRight: 'paddingInlineEnd',
  borderLeft: 'borderInlineStart', borderRight: 'borderInlineEnd',
  borderTopLeftRadius: 'borderStartStartRadius', borderTopRightRadius: 'borderStartEndRadius',
  borderBottomLeftRadius: 'borderEndStartRadius', borderBottomRightRadius: 'borderEndEndRadius',
};
const TW_FIX = {
  ml: 'ms', mr: 'me', pl: 'ps', pr: 'pe', left: 'start', right: 'end',
  'scroll-ml': 'scroll-ms', 'scroll-mr': 'scroll-me', 'scroll-pl': 'scroll-ps', 'scroll-pr': 'scroll-pe',
  'rounded-l': 'rounded-s', 'rounded-r': 'rounded-e',
  'rounded-tl': 'rounded-ss', 'rounded-tr': 'rounded-se', 'rounded-bl': 'rounded-es', 'rounded-br': 'rounded-ee',
  'border-l': 'border-s', 'border-r': 'border-e',
};
const ALIGN_FIX = {
  topLeft: 'AlignmentDirectional.topStart', topRight: 'AlignmentDirectional.topEnd',
  centerLeft: 'AlignmentDirectional.centerStart', centerRight: 'AlignmentDirectional.centerEnd',
  bottomLeft: 'AlignmentDirectional.bottomStart', bottomRight: 'AlignmentDirectional.bottomEnd',
};
const EASTERN = { '\u0660': '0', '\u0661': '1', '\u0662': '2', '\u0663': '3', '\u0664': '4', '\u0665': '5', '\u0666': '6', '\u0667': '7', '\u0668': '8', '\u0669': '9',
  '\u06F0': '0', '\u06F1': '1', '\u06F2': '2', '\u06F3': '3', '\u06F4': '4', '\u06F5': '5', '\u06F6': '6', '\u06F7': '7', '\u06F8': '8', '\u06F9': '9',
  '\u066B': '.', '\u066C': ',', '\u066A': '%' };
const toWestern = (s) => s.replace(/[\u0660-\u0669\u06F0-\u06F9\u066A-\u066C]/g, (c) => EASTERN[c]);

const RULES = [
  // CSS (stylesheets, markup <style> and inline style="")
  { id: 'css-physical-property', kinds: ['css', 'markup'],
    re: /(?<![\w-])((?:scroll-)?(?:margin|padding)-(?:left|right)|border-(?:left|right)(?:-(?:width|color|style))?|border-(?:top|bottom)-(?:left|right)-radius|left|right)\s*:/g,
    msg: (m) => `physical CSS property "${m[1]}"`, fix: (m) => `${CSS_PROP_FIX[m[1]]}:` },
  { id: 'css-text-align', kinds: ['css', 'markup'], re: /text-align\s*:\s*(left|right)\b/g,
    msg: (m) => `text-align: ${m[1]}`, fix: (m) => `text-align: ${m[1] === 'left' ? 'start' : 'end'}` },
  { id: 'css-float-clear', kinds: ['css', 'markup'], re: /\b(float|clear)\s*:\s*(left|right)\b/g,
    msg: (m) => `${m[1]}: ${m[2]}`, fix: (m) => `${m[1]}: ${m[2] === 'left' ? 'inline-start' : 'inline-end'}` },
  { id: 'css-direction-hardcoded', kinds: ['css', 'markup'], re: /\bdirection\s*:\s*(ltr|rtl)\b/g,
    msg: (m) => `hardcoded direction: ${m[1]}`, fix: () => 'set dir on <html> from the locale; use dir="auto" or <bdi> only for user-generated or LTR runs (IBAN, phone)' },
  // JS style objects (React inline styles, CSS-in-JS)
  { id: 'js-physical-style', kinds: ['js'], re: /\b(marginLeft|marginRight|paddingLeft|paddingRight|borderLeft|borderRight|border(?:Top|Bottom)(?:Left|Right)Radius)\s*:/g,
    msg: (m) => `physical style key "${m[1]}"`, fix: (m) => `${JS_PROP_FIX[m[1]]}:` },
  { id: 'js-text-align', kinds: ['js'], re: /\btextAlign\s*:\s*['"](left|right)['"]/g,
    msg: (m) => `textAlign: '${m[1]}'`, fix: (m) => `textAlign: '${m[1] === 'left' ? 'start' : 'end'}'` },
  { id: 'js-position-left-right', kinds: ['js'], re: /(?<![\w-])(left|right)\s*:\s*(?=[\d'"`{-])/g,
    msg: (m) => `physical position "${m[1]}"`, fix: (m) => (m[1] === 'left' ? 'insetInlineStart:' : 'insetInlineEnd:') },
  // Tailwind utility classes (in markup and JS/TS files)
  { id: 'tw-physical-spacing', kinds: ['markup', 'js'],
    re: /(?<=^|[\s"'`:{(\[])(-?)((?:scroll-)?(?:ml|mr|pl|pr)|left|right|rounded-(?:tl|tr|bl|br|l|r))-([\w.\[\]/%-]+)/g,
    msg: (m) => `Tailwind physical class "${m[0]}"`, fix: (m) => `${m[1]}${TW_FIX[m[2]]}-${m[3]}` },
  { id: 'tw-physical-border', kinds: ['markup', 'js'], re: /(?<=^|[\s"'`:{(\[])(border-[lr])(?=[\s"'`}\])]|-\d|$)/g,
    msg: (m) => `Tailwind physical class "${m[1]}"`, fix: (m) => TW_FIX[m[1]] },
  { id: 'tw-text-float', kinds: ['markup', 'js'], re: /(?<=^|[\s"'`:{(\[])(text|float|clear)-(left|right)(?=[\s"'`}\])]|$)/g,
    msg: (m) => `Tailwind "${m[0]}"`, fix: (m) => `${m[1]}-${m[2] === 'left' ? 'start' : 'end'}` },
  { id: 'tw-space-x', kinds: ['markup', 'js'], re: /(?<=^|[\s"'`:{(\[])(space-x-\d+|divide-x(?:-\d+)?)(?=[\s"'`}\])]|$)/g,
    msg: (m) => `"${m[1]}" spaces with physical margins`, fix: () => 'use flex + gap-* (gap is direction-agnostic), or add rtl:space-x-reverse' },
  // Dart / Flutter
  { id: 'dart-edgeinsets-only', kinds: ['dart'], re: /\bEdgeInsets\.only\(([^)]*\b(?:left|right)\s*:[^)]*)\)/g,
    msg: () => 'EdgeInsets.only with left/right', fix: (m) => `EdgeInsetsDirectional.only(${m[1].replace(/\bleft\s*:/g, 'start:').replace(/\bright\s*:/g, 'end:')})` },
  { id: 'dart-edgeinsets-ltrb', kinds: ['dart'], re: /\bEdgeInsets\.fromLTRB\(/g,
    msg: () => 'EdgeInsets.fromLTRB', fix: () => 'EdgeInsetsDirectional.fromSTEB(' },
  { id: 'dart-alignment', kinds: ['dart'], re: /(?<![\w.])Alignment\.(topLeft|topRight|centerLeft|centerRight|bottomLeft|bottomRight)\b/g,
    msg: (m) => `Alignment.${m[1]}`, fix: (m) => ALIGN_FIX[m[1]] },
  { id: 'dart-textalign', kinds: ['dart'], re: /\bTextAlign\.(left|right)\b/g,
    msg: (m) => `TextAlign.${m[1]}`, fix: (m) => `TextAlign.${m[1] === 'left' ? 'start' : 'end'}` },
  { id: 'dart-positioned', kinds: ['dart'], re: /(?<![\w.])Positioned\(([^)]*\b(?:left|right)\s*:)/g,
    msg: () => 'Positioned with left/right', fix: () => 'PositionedDirectional(start: ..., end: ...)' },
  { id: 'dart-borderradius-only', kinds: ['dart'], re: /\bBorderRadius\.only\(([^)]*\b(?:topLeft|topRight|bottomLeft|bottomRight)\s*:)/g,
    msg: () => 'BorderRadius.only with physical corners', fix: () => 'BorderRadiusDirectional.only(topStart:, topEnd:, bottomStart:, bottomEnd:)' },
  { id: 'dart-border', kinds: ['dart'], re: /(?<![\w.])Border\(([^)]*\b(?:left|right)\s*:)/g,
    msg: () => 'Border with left/right side', fix: () => 'BorderDirectional(start: ..., end: ...)' },
  { id: 'dart-textdirection-hardcoded', kinds: ['dart'], re: /\b(?:textDirection\s*:\s*)?TextDirection\.(ltr|rtl)\b/g,
    msg: (m) => `hardcoded TextDirection.${m[1]}`, fix: () => 'take direction from the locale (Directionality.of(context)); hardcode TextDirection.ltr only around an LTR value such as an IBAN, phone or code, and say so in a comment',
    severity: 'info' },
  // Digits (every file kind, including copy files)
  { id: 'eastern-arabic-digits', kinds: ['css', 'markup', 'js', 'dart', 'text'],
    re: /[\u0660-\u0669\u06F0-\u06F9][\u0660-\u0669\u06F0-\u06F9\u066B\u066C.,]*[\u066A%]?/g,
    msg: (m) => `Eastern Arabic digits "${m[0]}"`, fix: (m) => toWestern(m[0]) },
  { id: 'arabic-number-signs', kinds: ['css', 'markup', 'js', 'dart', 'text'], re: /(?<=[0-9])[\u066B\u066C\u066A]|[\u066A](?=[0-9])/g,
    msg: (m) => `Arabic number sign "${m[0]}" next to Western digits`, fix: (m) => toWestern(m[0]) },
];

function kindOf(ext) {
  if (CSS_EXT.has(ext)) return 'css';
  if (MARKUP_EXT.has(ext)) return 'markup';
  if (JS_EXT.has(ext)) return 'js';
  if (DART_EXT.has(ext)) return 'dart';
  if (TEXT_EXT.has(ext)) return 'text';
  return null;
}

function scanText(text, kind) {
  const findings = [];
  const lines = text.split(/\r?\n/);
  if (lines.slice(0, 5).some((l) => l.includes('check-rtl-ignore-file'))) return findings;
  lines.forEach((line, i) => {
    if (line.includes('check-rtl-ignore')) return;
    for (const rule of RULES) {
      if (!rule.kinds.includes(kind)) continue;
      // In JS/TS, only treat a line as Tailwind when it carries class names.
      if (rule.id.startsWith('tw-') && kind === 'js' && !/class(Name)?\s*=|cn\(|clsx\(|tw`|class:\s*/.test(line)) continue;
      if (rule.id === 'js-position-left-right' && /class(Name)?\s*=/.test(line)) continue;
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line)) !== null) {
        findings.push({ line: i + 1, col: m.index + 1, rule: rule.id, severity: rule.severity || 'error', found: rule.msg(m), fix: rule.fix(m) });
        if (m[0].length === 0) rule.re.lastIndex++;
      }
    }
  });
  return findings.sort((a, b) => a.line - b.line || a.col - b.col);
}

function walk(p, out) {
  const st = statSync(p);
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) if (!SKIP_DIRS.has(name)) walk(join(p, name), out);
  } else if (kindOf(extname(p).toLowerCase())) out.push(p);
}

function main() {
  if (!fromStdin && targets.length === 0) {
    console.error('Usage: node check-rtl.mjs [--json] <file|dir> [...]   or   --stdin --ext=dart');
    process.exit(2);
  }
  const results = [];
  if (fromStdin) {
    const kind = kindOf('.' + (extArg || 'txt').replace(/^\./, ''));
    if (!kind) { console.error(`Unknown --ext=${extArg}`); process.exit(2); }
    results.push({ file: '<stdin>', findings: scanText(readFileSync(0, 'utf8'), kind) });
  } else {
    const files = [];
    for (const t of targets) walk(t, files);
    for (const f of files) results.push({ file: relative(process.cwd(), f) || f, findings: scanText(readFileSync(f, 'utf8'), kindOf(extname(f).toLowerCase())) });
  }
  const total = results.reduce((n, r) => n + r.findings.length, 0);
  const errors = results.reduce((n, r) => n + r.findings.filter((x) => x.severity === 'error').length, 0);
  if (asJson) {
    console.log(JSON.stringify({ files: results.length, findings: total, errors, results }, null, 2));
  } else {
    for (const r of results) {
      for (const f of r.findings) console.log(`${r.file}:${f.line}:${f.col}  ${f.severity === 'info' ? 'info ' : 'error'}  [${f.rule}] ${f.found}\n    fix: ${f.fix}`);
    }
    console.log(`\ncheck-rtl: ${results.length} file(s), ${errors} error(s), ${total - errors} info.` + (total ? '' : ' RTL-safe.'));
  }
  process.exit(errors > 0 ? 1 : 0);
}

main();
