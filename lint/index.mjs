// syntropy-lint: one rule set for agent output and CI.
// lintSource(source, { filename, kind }) -> [{ rule, severity, line, column, message, fix }]
import { getData } from './data.mjs';
import { maskComments, lineIndex } from './util.mjs';
import { RULE_IMPLS, COPY_RULES } from './rules.mjs';

export const RULES = RULE_IMPLS.map(({ id, severity, description, appliesTo }) => ({ id, severity, description, appliesTo }));

const EXT_KIND = {
  css: 'css', scss: 'css', sass: 'css', less: 'css', pcss: 'css',
  html: 'html', htm: 'html', vue: 'html', svelte: 'html', astro: 'html',
  js: 'js', jsx: 'js', ts: 'js', tsx: 'js', mjs: 'js', cjs: 'js', mts: 'js', cts: 'js',
  dart: 'dart',
  md: 'text', mdx: 'text', markdown: 'text', txt: 'text', text: 'text',
};
const KINDS = new Set(['css', 'html', 'js', 'dart', 'text']);

export function inferKind(filename = '') {
  const ext = String(filename).toLowerCase().match(/\.([a-z0-9]+)$/);
  return (ext && EXT_KIND[ext[1]]) || 'text';
}

const FENCE_KIND = {
  css: 'css', scss: 'css', less: 'css',
  html: 'html', vue: 'html', svelte: 'html',
  js: 'js', jsx: 'js', ts: 'js', tsx: 'js', javascript: 'js', typescript: 'js',
  dart: 'dart', flutter: 'dart',
};

// Inline suppressions:
//   syntropy-lint-disable rule-a, rule-b      (whole file; no list = all rules)
//   syntropy-lint-disable-line rule-a
//   syntropy-lint-disable-next-line rule-a
function suppressions(src) {
  const file = new Set();
  let fileAll = false;
  const byLine = new Map();
  const re = /syntropy-lint-disable(-next-line|-line)?(?:[ \t]+([a-z][\w-]*(?:[ \t]*,[ \t]*[a-z][\w-]*)*))?/g;
  const pos = lineIndex(src);
  let m;
  while ((m = re.exec(src))) {
    const rules = m[2] ? m[2].split(/\s*,\s*/) : null;
    if (!m[1]) {
      if (rules) rules.forEach((r) => file.add(r));
      else fileAll = true;
      continue;
    }
    const line = pos(m.index).line + (m[1] === '-next-line' ? 1 : 0);
    if (!byLine.has(line)) byLine.set(line, []);
    byLine.get(line).push(rules);
  }
  return (f) => {
    if (fileAll || file.has(f.rule)) return true;
    const list = byLine.get(f.line);
    return !!list && list.some((rules) => !rules || rules.includes(f.rule));
  };
}

function run(source, filename, kind, { skipCopy = false } = {}) {
  const data = getData();
  const code = maskComments(source, kind, filename);
  const pos = lineIndex(source);
  const findings = [];
  const seen = new Set();
  let rule = null;
  // One context per file so rules share parsed caches (colors, classes, css regions).
  const ctx = {
    src: source,
    code,
    kind,
    filename,
    data,
    report(offset, message, fix, severity) {
      const { line, column } = pos(offset);
      const key = `${rule.id}:${offset}:${message}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({ rule: rule.id, severity: severity || rule.severity, line, column, message, fix: fix ?? null });
    },
  };
  for (rule of RULE_IMPLS) {
    if (!rule.appliesTo.includes(kind)) continue;
    if (skipCopy && COPY_RULES.has(rule.id)) continue;
    rule.check(ctx);
  }

  if (kind === 'text') {
    // Lint fenced code blocks in Markdown with their own language rules.
    const fence = /^([ \t]*)(```|~~~)[ \t]*([\w+-]*)[^\n]*\n([\s\S]*?)^\1\2[ \t]*$/gm;
    let m;
    while ((m = fence.exec(source))) {
      const sub = FENCE_KIND[m[3].toLowerCase()];
      if (!sub) continue;
      const bodyStart = m.index + m[0].indexOf('\n') + 1;
      const lineOffset = pos(bodyStart).line - 1;
      for (const f of run(m[4], filename, sub, { skipCopy: true })) findings.push({ ...f, line: f.line + lineOffset });
    }
  }
  return findings;
}

export function lintSource(source, { filename = '', kind } = {}) {
  const src = String(source ?? '');
  const k = kind && KINDS.has(kind) ? kind : inferKind(filename);
  const findings = run(src, filename, k);
  const suppressed = suppressions(src);
  return findings
    .filter((f) => !suppressed(f))
    .sort((a, b) => a.line - b.line || a.column - b.column || a.rule.localeCompare(b.rule));
}

export default lintSource;
