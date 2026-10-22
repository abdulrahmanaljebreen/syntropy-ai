// Syntropy MCP core: transport-agnostic.
// createServer({ root, store }) registers every tool, resource and prompt on an McpServer.
// Knowledge is read through a small "store" interface so the same core runs on Node (files on disk)
// or on a Worker (a bundled JSON map of files). See DEPLOY.md.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const here = path.dirname(fileURLToPath(import.meta.url));
// The repo root: the nearest folder above this file that holds AGENTS.md and knowledge/.
// Works for mcp/core.mjs and for the bundled mcp/dist/server.mjs alike.
function findRoot(start) {
  for (let dir = start; ; dir = path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'AGENTS.md')) && fs.existsSync(path.join(dir, 'knowledge'))) return dir;
    if (path.dirname(dir) === dir) return path.resolve(start, '..');
  }
}
export const DEFAULT_ROOT = findRoot(here);
export const SERVER_INFO = { name: 'syntropy', version: '0.1.0' };
const FIGMA_FILE = 'a7Z956YZy9n6f9uz5DK16Y';
const MAX_CHARS = 6000;
const BLOCKED_PAGE_IDS = new Set(['69:977']);

// ---------------------------------------------------------------------------
// Stores
// ---------------------------------------------------------------------------

/** Store backed by the repo on disk. Every read checks mtime, so files added during the day show up. */
export function createNodeStore(root = DEFAULT_ROOT) {
  const abs = (rel) => path.join(root, rel);
  return {
    kind: 'node',
    root,
    version(rel) {
      try { return String(fs.statSync(abs(rel)).mtimeMs); } catch { return null; }
    },
    readText(rel) {
      try { return fs.readFileSync(abs(rel), 'utf8'); } catch { return null; }
    },
    list(relDir, { ext = null, recursive = false } = {}) {
      const out = [];
      const walk = (dir) => {
        let entries;
        try { entries = fs.readdirSync(abs(dir), { withFileTypes: true }); } catch { return; }
        for (const e of entries) {
          const rel = path.posix.join(dir, e.name);
          if (e.isDirectory()) { if (recursive) walk(rel); continue; }
          if (!ext || rel.endsWith(ext)) out.push(rel);
        }
      };
      walk(relDir);
      return out.sort();
    },
    async importLint() {
      const file = abs('lint/index.mjs');
      if (!fs.existsSync(file)) return null;
      return import(pathToFileURL(file).href + `?v=${fs.statSync(file).mtimeMs}`);
    },
  };
}

/**
 * Node store whose root can change while the server runs (the auto-updater moves it to the
 * managed copy once that is downloaded). Versions include the root so caches refresh.
 */
export function createSwitchableStore(root = DEFAULT_ROOT) {
  let inner = createNodeStore(root);
  return {
    kind: 'node',
    get root() { return inner.root; },
    setRoot(next) { if (next !== inner.root) inner = createNodeStore(next); },
    version(rel) { const v = inner.version(rel); return v == null ? null : `${inner.root}:${v}`; },
    readText(rel) { return inner.readText(rel); },
    list(relDir, opts) { return inner.list(relDir, opts); },
    importLint() { return inner.importLint(); },
  };
}

/** Store backed by an in-memory map { "knowledge/x.json": "<text>" }. Used by a Worker build. */
export function createBundleStore(files, { lint = null } = {}) {
  return {
    kind: 'bundle',
    root: '(bundle)',
    version: (rel) => (rel in files ? 'bundle' : null),
    readText: (rel) => (rel in files ? files[rel] : null),
    list(relDir, { ext = null, recursive = false } = {}) {
      const prefix = relDir.replace(/\/$/, '') + '/';
      return Object.keys(files).filter((k) => {
        if (!k.startsWith(prefix)) return false;
        if (!recursive && k.slice(prefix.length).includes('/')) return false;
        return !ext || k.endsWith(ext);
      }).sort();
    },
    async importLint() { return lint; },
  };
}

// ---------------------------------------------------------------------------
// Knowledge layer (lazy, cached by file version)
// ---------------------------------------------------------------------------

function createKnowledge(store) {
  const cache = new Map();
  const memo = (key, versionKey, build) => {
    const hit = cache.get(key);
    if (hit && hit.v === versionKey) return hit.value;
    const value = build();
    cache.set(key, { v: versionKey, value });
    return value;
  };
  const json = (rel) => memo('json:' + rel, store.version(rel), () => {
    const text = store.readText(rel);
    if (text == null) return null;
    try { return JSON.parse(text); } catch { return null; }
  });
  const text = (rel) => store.readText(rel);

  return {
    store,
    json,
    text,
    components() {
      const idx = json('knowledge/components/index.json');
      const desc = json('knowledge/components/descriptions.json') || {};
      const v = (store.version('knowledge/components/index.json') || '') + (store.version('knowledge/components/descriptions.json') || '');
      return memo('components', v, () => {
        if (!idx) return null;
        const pages = (idx.pages || []).filter((p) => !BLOCKED_PAGE_IDS.has(p.id));
        const pageBySlug = new Map(pages.map((p) => [p.slug, p]));
        const comps = (idx.components || [])
          .filter((c) => !pageBySlug.size || pageBySlug.has(c.page))
          .map((c) => ({ ...c, description: desc[c.id] || c.description || '' }));
        for (const c of comps) c.atom = isAtom(c, pageBySlug.get(c.page));
        return { raw: idx, pages, pageBySlug, comps, fileKey: idx.source?.file || FIGMA_FILE };
      });
    },
    examples() { return json('knowledge/examples/components/index.json') || []; },
    tokens() { return json('knowledge/tokens/resolved.json')?.tokens || null; },
    icons() { return json('knowledge/icons/icons.json')?.icons || null; },
    illustrations() { return json('knowledge/icons/illustrations.json')?.illustrations || null; },
    links() { return json('knowledge/links/links.json')?.links || null; },
    intake() { return json('mcp/intake.json'); },
    markdown(dirs) {
      const files = [];
      for (const d of dirs) files.push(...store.list(d, { ext: '.md', recursive: true }));
      return files;
    },
  };
}

/** Position of keyword k in lower-cased text, whole-word for Latin keywords; Infinity when absent. */
function kwPos(textL, k) {
  const kl = k.toLowerCase();
  if (/^[\x00-\x7f]+$/.test(kl)) {
    const m = new RegExp(`(^|[^a-z0-9])${kl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=[^a-z0-9]|$)`).exec(textL);
    return m ? m.index + m[1].length : Infinity;
  }
  const i = textL.indexOf(kl);
  return i < 0 ? Infinity : i;
}

function isAtom(c, page) {
  if (c.hidden || c.name.startsWith('_')) return true;
  if (page && norm(c.name) === norm(page.name)) return false;
  if (c.kind === 'component') return true;
  return /\b(indicator|helper|placeholder|value|label|underline|item|segment)\b/i.test(c.name);
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const norm = (s) => String(s ?? '').toLowerCase().replace(/[_\-/·]+/g, ' ').replace(/[^\p{L}\p{N} ]+/gu, '').replace(/\s+/g, ' ').trim();
const compact = (s) => norm(s).replace(/ /g, '');
const words = (s) => norm(s).split(' ').filter(Boolean);
const STOP = new Set(['a', 'an', 'the', 'for', 'of', 'to', 'in', 'on', 'and', 'or', 'with', 'my', 'is', 'use', 'when', 'between', 'what', 'how', 'i', 'need']);
const terms = (s) => words(s).filter((w) => !STOP.has(w));
const stem = (w) => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);

function lev(a, b) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 3) return 99;
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]; dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

/** Score how well query matches a candidate string: exact > prefix > contains > token overlap > typo. */
function matchScore(query, cand) {
  const q = compact(query), c = compact(cand);
  if (!q || !c) return 0;
  if (q === c) return 100;
  let s = 0;
  if (c.startsWith(q)) s = Math.max(s, 70);
  else if (c.includes(q) && q.length >= 3) s = Math.max(s, 55);
  else if (q.includes(c) && c.length >= 3) s = Math.max(s, 40);
  const qt = terms(query), ct = words(cand);
  if (qt.length) {
    let hit = 0;
    for (const t of qt) {
      if (ct.includes(t)) hit += 1;
      else if (ct.some((w) => w.startsWith(t) || (t.length > 3 && t.startsWith(w) && w.length > 2))) hit += 0.7;
      else if (t.length > 3 && ct.some((w) => lev(t, w) <= (t.length > 6 ? 2 : 1))) hit += 0.6;
    }
    s = Math.max(s, (hit / qt.length) * 50);
  }
  if (s === 0 && q.length > 3 && lev(q, c) <= 2) s = 35;
  return s;
}

function cap(text, hint = 'Narrow the query to see more.') {
  if (text.length <= MAX_CHARS) return text;
  const cut = text.slice(0, MAX_CHARS);
  const at = cut.lastIndexOf('\n');
  return (at > MAX_CHARS * 0.6 ? cut.slice(0, at) : cut) + `\n\n_More available. ${hint}_`;
}

const ok = (text, hint) => ({ content: [{ type: 'text', text: cap(text, hint) }] });
const notYet = (what, rel) => ok(`${what} is not available yet (expected at \`${rel}\`). It is being added to the repo; try again later.`);
const figmaUrl = (fileKey, id) => `https://www.figma.com/design/${fileKey}?node-id=${String(id).replace(/:/g, '-')}`;
const firstLine = (s, n = 110) => {
  const l = String(s || '').split('\n').find((x) => x.trim()) || '';
  return l.length > n ? l.slice(0, n - 1) + '…' : l;
};
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

// Markdown sections: split by headings, keep heading path.
function sections(md) {
  const lines = md.split('\n');
  const out = [];
  let cur = { heading: '(top)', level: 0, lines: [] };
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) inFence = !inFence;
    const m = !inFence && /^(#{1,4})\s+(.*)$/.exec(line);
    if (m) {
      if (cur.lines.join('').trim() || cur.level) out.push(cur);
      cur = { heading: m[2].trim(), level: m[1].length, lines: [line] };
    } else cur.lines.push(line);
  }
  out.push(cur);
  return out.map((s) => ({ heading: s.heading, level: s.level, body: s.lines.join('\n').trim() }));
}

/** A heading's section including its sub-headings. */
function sectionWithChildren(secs, i) {
  const lvl = secs[i].level;
  const parts = [secs[i].body];
  for (let j = i + 1; j < secs.length && (secs[j].level > lvl || lvl === 0); j++) parts.push(secs[j].body);
  return parts.join('\n\n');
}

function mdTitle(md, fallback) {
  const m = /^#\s+(.+)$/m.exec(md || '');
  return m ? m[1].trim() : fallback;
}

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

function buildTools(K) {
  const tools = {};
  const def = (name, description, inputSchema, handler) => { tools[name] = { name, description, inputSchema, handler }; };

  // 1. start_intake -------------------------------------------------------
  def('start_intake',
    'Start here for any Safqah design task. The /syntropy interview: returns the next single question to ask the user (with choices), or a brief and next steps once all six are answered. Pass back the `answers` object each time.',
    {
      request: z.string().optional().describe('The user request in their own words. Used to pre-answer obvious questions.'),
      answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional()
        .describe('Answers so far keyed by question id: kind, audience, surface, job, existing, stakes.'),
    },
    async ({ request = '', answers = {} } = {}) => {
      const intake = K.intake();
      if (!intake) return notYet('The intake script', 'mcp/intake.json');
      const req = String(request || '');
      const reqL = req.toLowerCase();
      const resolved = {};
      const inferred = {};
      for (const q of intake.questions) {
        const given = answers[q.id];
        if (given != null && String(given).trim() !== '' && !(Array.isArray(given) && !given.length)) {
          resolved[q.id] = Array.isArray(given) ? given : (q.type === 'multi' ? String(given).split(/\s*,\s*/) : String(given));
          continue;
        }
        if (!req) continue;
        if (q.type === 'choice') {
          let best = null;
          for (const c of q.choices) {
            const pos = Math.min(...c.keywords.map((k) => kwPos(reqL, k)));
            if (pos < Infinity && (!best || pos < best.pos)) best = { value: c.value, pos };
          }
          if (best) { resolved[q.id] = best.value; inferred[q.id] = true; }
        } else if (q.type === 'multi') {
          const hits = q.choices.filter((c) => c.keywords.some((k) => kwPos(reqL, k) < Infinity)).map((c) => c.value);
          if (hits.length) { resolved[q.id] = hits; inferred[q.id] = true; }
        } else if (q.patterns) {
          if (q.patterns.some((p) => new RegExp(p, 'i').test(req))) {
            const refs = req.match(/https?:\/\/\S+|\bSAF-\d+/gi);
            resolved[q.id] = refs ? refs.join(', ') : req;
            inferred[q.id] = true;
          }
        } else if (q.keywords) {
          if (q.keywords.some((k) => kwPos(reqL, k) < Infinity)) { resolved[q.id] = req; inferred[q.id] = true; }
        }
      }
      const total = intake.questions.length;
      const next = intake.questions.find((q) => resolved[q.id] == null);
      const answersJson = '```json\n' + JSON.stringify(resolved, null, 2) + '\n```';
      if (next) {
        const n = intake.questions.indexOf(next) + 1;
        const lines = [`## Syntropy intake: question ${n} of ${total}`, '', `**${next.ask}**`, ''];
        if (next.choices) {
          next.choices.forEach((c, i) => lines.push(`${i + 1}. ${c.label} (\`${c.value}\`)`));
          if (next.type === 'multi') lines.push('', 'More than one is fine.');
        } else lines.push('Free text.');
        lines.push('', 'Ask the user only this question. Then call `start_intake` again with `answers` set to the object below plus `' + next.id + '`.', '', answersJson);
        const inf = Object.keys(inferred);
        if (inf.length) lines.push('', `Inferred from the request (confirm if unsure): ${inf.join(', ')}.`);
        return ok(lines.join('\n'));
      }
      const label = (q, v) => {
        const vals = Array.isArray(v) ? v : [v];
        return vals.map((x) => q.choices?.find((c) => c.value === x)?.label || x).join(', ');
      };
      const out = ['## Syntropy brief', ''];
      for (const q of intake.questions) out.push(`- **${q.ask.split('?')[0]}:** ${label(q, resolved[q.id])}`);
      const kind = Array.isArray(resolved.kind) ? resolved.kind[0] : resolved.kind;
      const steps = intake.nextSteps?.[kind] || ['search_components', 'find_tokens', 'get_guideline'];
      const stakes = [].concat(resolved.stakes || []);
      out.push('', '## Next steps', '');
      const why = {
        research_plan: 'pick research tools, queries and benchmark apps before designing',
        get_pattern: 'check for an existing Safqah pattern for this job',
        search_components: 'find the Syntropy components to compose',
        get_component: 'read props, variants, Figma node and guide for each component',
        find_tokens: 'pick semantic tokens for color, space, radius, type',
        search_icons: 'find icons by meaning (Arabic keywords work)',
        get_guideline: 'read the UX and content rules that apply',
        find_links: 'open references, regulation and benchmarks',
        lint_ui: 'lint the code or CSS before handing over',
      };
      steps.forEach((s, i) => out.push(`${i + 1}. \`${s}\`: ${why[s] || ''}`));
      for (const s of stakes) {
        const topic = intake.stakeGuidelines?.[s];
        if (topic) out.push(`- Stake "${label(intake.questions.find((q) => q.id === 'stakes'), s)}": call \`get_guideline({ topic: "${topic}" })\`.`);
      }
      if (resolved.surface === 'back-office') out.push('- Back-office: prefer Table, Toolbar, Stat and the web variants (`Direction=ltr` or `rtl` by locale).');
      out.push('', 'Rules that always apply: Syntropy components only, semantic tokens only, Arabic and RTL first, Western digits, minimal copy, no dark patterns.', '', answersJson);
      return ok(out.join('\n'));
    });

  // 2. search_components -------------------------------------------------
  def('search_components',
    'Fuzzy search Syntropy components by name, page, family, description or prop names. Returns the top 10 with Figma id, page, status and a one-line purpose.',
    {
      query: z.string().describe('What you are looking for, e.g. "button", "bottom sheet", "deal card", "otp".'),
      family: z.string().optional().describe('Filter by family, e.g. "02 Actions", "Feedback", "08".'),
      includeAtoms: z.boolean().optional().describe('Include internal parts (indicators, items, labels, hidden). Default false.'),
    },
    async ({ query, family, includeAtoms = false }) => {
      const C = K.components();
      if (!C) return notYet('The component manifest', 'knowledge/components/index.json');
      let pool = C.comps;
      if (family) {
        const f = norm(family);
        pool = pool.filter((c) => norm(c.family).includes(f) || norm(c.pageCode).startsWith(f));
      }
      const scored = pool.map((c) => {
        const page = C.pageBySlug.get(c.page);
        let s = matchScore(query, c.name) * 1.0;
        s = Math.max(s, matchScore(query, page?.name || c.page) * 0.85);
        s = Math.max(s, matchScore(query, c.family) * 0.4);
        if (c.description) s = Math.max(s, matchScore(query, c.description) * 0.5);
        const propHit = (c.props || []).some((p) => matchScore(query, p.name) >= 70);
        if (propHit) s = Math.max(s, 30);
        if (!c.atom) s += 8;
        if (c.status === 'stable') s += 2;
        return { c, s, exact: compact(c.name) === compact(query) };
      }).filter((x) => x.s > 20 && (includeAtoms || !x.c.atom || x.exact));
      scored.sort((a, b) => b.s - a.s || a.c.name.localeCompare(b.c.name));
      const top = scored.slice(0, 10);
      if (!top.length) return ok(`No components match "${query}". Try a broader word, or \`includeAtoms: true\`. Pages: ${C.pages.map((p) => p.slug).slice(0, 40).join(', ')}…`);
      const lines = [`## Components matching "${query}"`, '', '| Name | Figma id | Page | Family | Status | Published | Variants | Purpose |', '|---|---|---|---|---|---|---|---|'];
      for (const { c } of top) {
        const purpose = firstLine(c.description) || `${c.kind === 'set' ? 'Component set' : 'Component'} on page ${c.pageCode} ${C.pageBySlug.get(c.page)?.name || c.page}${c.atom ? ' (part)' : ''}`;
        lines.push(`| ${cell(c.name)} | \`${c.id}\` | ${c.pageCode} ${c.page} | ${c.family} | ${c.status} | ${c.published ? 'yes' : 'no'} | ${c.variantCount ?? '-'} | ${cell(purpose)} |`);
      }
      if (scored.length > 10) lines.push('', `_${scored.length - 10} more matches. Add \`family\` or a more specific query._`);
      lines.push('', 'Next: `get_component({ name })` for props, variants, Figma link and guide.');
      return ok(lines.join('\n'));
    });

  // 3. get_component -----------------------------------------------------
  def('get_component',
    'Get one Syntropy component by exact or fuzzy name, Figma id, or page slug: props table, variant count, Figma link, example images, and the guide (or one section of it).',
    {
      name: z.string().describe('Component name ("Button"), Figma id ("417:2") or page slug ("bottom-sheet").'),
      section: z.string().optional().describe('Return only the guide section whose heading matches, e.g. "usage", "accessibility", "do and don\'t".'),
    },
    async ({ name, section }) => {
      const C = K.components();
      if (!C) return notYet('The component manifest', 'knowledge/components/index.json');
      const q = String(name).trim();
      let comp = C.comps.find((c) => c.id === q) || C.comps.find((c) => c.name === q) || C.comps.find((c) => compact(c.name) === compact(q));
      const page = C.pageBySlug.get(q) || C.pages.find((p) => compact(p.name) === compact(q) || compact(p.slug) === compact(q));
      if (!comp && page) {
        const onPage = C.comps.filter((c) => c.page === page.slug);
        comp = onPage.find((c) => compact(c.name) === compact(page.name)) || onPage.find((c) => !c.atom) || onPage[0];
      }
      if (!comp) {
        const ranked = C.comps.map((c) => ({ c, s: Math.max(matchScore(q, c.name), matchScore(q, c.page) * 0.9) + (c.atom ? 0 : 5) }))
          .filter((x) => x.s > 30).sort((a, b) => b.s - a.s);
        if (!ranked.length) return ok(`No component found for "${q}". Use \`search_components\` to find the right name.`);
        comp = ranked[0].c;
      }
      const pg = C.pageBySlug.get(comp.page);
      const lines = [
        `# ${comp.name}`,
        '',
        `- **Figma id:** \`${comp.id}\` · [open in Figma](${figmaUrl(C.fileKey, comp.id)})`,
        `- **Page:** ${comp.pageCode} ${pg?.name || comp.page} (\`${comp.page}\`) · **Family:** ${comp.family}`,
        `- **Kind:** ${comp.kind} · **Status:** ${comp.status} · **Published:** ${comp.published ? 'yes' : 'no'} · **Variants:** ${comp.variantCount ?? '-'}`,
      ];
      if (comp.key) lines.push(`- **Library key:** \`${comp.key}\``);
      if (comp.frames) {
        const f = Object.entries(comp.frames).filter(([, v]) => v).map(([k, v]) => `${k} \`${v}\``);
        if (f.length) lines.push(`- **Frames:** ${f.join(', ')}`);
      }
      if (comp.description) lines.push('', comp.description);
      if (comp.props?.length) {
        lines.push('', '## Props', '', '| Figma name | Canonical | Type | Default | Options |', '|---|---|---|---|---|');
        for (const p of comp.props) {
          const opts = p.options ? p.options.join(', ') : (p.defaultComponent ? `swap (default ${p.defaultComponent})` : '');
          lines.push(`| ${cell(p.name)} | \`${p.canonical}\` | ${p.type} | ${cell(p.default)} | ${cell(opts)} |`);
        }
        if (comp.props.some((p) => p.canonical === 'direction')) lines.push('', '_Direction follows the locale (Arabic = rtl). Never set it by hand in code._');
      }
      const siblings = C.comps.filter((c) => c.page === comp.page && c.id !== comp.id);
      if (siblings.length) lines.push('', `**Also on this page:** ${siblings.slice(0, 20).map((c) => `${c.name} (\`${c.id}\`)`).join(', ')}${siblings.length > 20 ? '…' : ''}`);
      const ex = K.examples().filter((e) => e.page === comp.page && (e.id === comp.id || e.kind === 'reference' || e.kind === 'set'));
      const exOwn = ex.filter((e) => e.id === comp.id || e.id === comp.frames?.reference);
      const exList = (exOwn.length ? exOwn : ex).slice(0, 4);
      if (exList.length) lines.push('', '## Example images', '', ...exList.map((e) => `- \`${e.path}\` (${e.kind}, \`${e.id}\`)`));
      const guideRel = `knowledge/components/${comp.page}.md`;
      const guide = K.text(guideRel);
      if (guide) {
        let body = guide;
        let label = `Guide (\`${guideRel}\`)`;
        if (section) {
          const secs = sections(guide);
          let best = -1, bestS = 0;
          secs.forEach((s, i) => { const sc = matchScore(section, s.heading); if (sc > bestS) { bestS = sc; best = i; } });
          if (best >= 0 && bestS >= 30) { body = sectionWithChildren(secs, best); label += `, section "${secs[best].heading}"`; }
          else body = `No section matches "${section}". Headings: ${secs.filter((s) => s.level).map((s) => s.heading).join(' · ')}`;
        }
        if (!section) {
          const heads = sections(guide).filter((s) => s.level >= 2).map((s) => s.heading);
          if (heads.length) lines.push('', `**Guide sections** (pass one as \`section\`): ${heads.slice(0, 30).join(' · ')}`);
        }
        lines.push('', `## ${label}`, '', body);
      } else lines.push('', `_Guide not available yet (expected at \`${guideRel}\`)._`);
      return ok(lines.join('\n'), `Call again with \`section\` to read one part of the guide (\`${guideRel}\`).`);
    });

  // 4. find_tokens -------------------------------------------------------
  const CATEGORY = [
    { prefix: 'bg/', words: ['bg', 'background', 'surface', 'fill', 'card', 'container', 'sheet', 'page', 'screen', 'backdrop', 'overlay', 'خلفية'] },
    { prefix: 'text/', words: ['text', 'copy', 'label', 'foreground', 'title', 'heading', 'body', 'caption', 'نص'] },
    { prefix: 'border/', words: ['border', 'stroke', 'outline', 'divider', 'separator', 'ring', 'focus', 'حد', 'إطار'] },
    { prefix: 'icon/', words: ['icon', 'glyph', 'أيقونة'] },
    { prefix: 'space/', words: ['space', 'spacing', 'gap', 'padding', 'margin', 'gutter', 'inset', 'between', 'مسافة'] },
    { prefix: 'radius/', words: ['radius', 'corner', 'corners', 'rounded', 'round', 'pill', 'زاوية'] },
    { prefix: 'font/', words: ['font', 'type', 'typography', 'size', 'weight', 'line', 'height', 'خط'] },
  ];
  const ROLE = {
    brand: ['brand', 'primary', 'cta', 'button', 'green', 'action'],
    error: ['error', 'danger', 'destructive', 'invalid', 'negative', 'fail', 'failed', 'خطأ'],
    success: ['success', 'positive', 'valid', 'done', 'complete', 'نجاح'],
    warning: ['warning', 'warn', 'alert', 'تحذير'],
    caution: ['caution'],
    info: ['info', 'informational', 'notice', 'معلومة'],
    progress: ['progress', 'pending', 'processing'],
    muted: ['muted', 'secondary', 'helper', 'hint', 'caption', 'quiet', 'grey', 'gray'],
    subtle: ['subtle', 'tertiary', 'placeholder', 'faint', 'light'],
    disabled: ['disabled', 'inactive'],
    inverse: ['inverse', 'inverted', 'reverse'],
    hover: ['hover'],
    pressed: ['pressed', 'active', 'tap'],
    default: ['default', 'normal', 'standard', 'regular'],
    elevated: ['elevated', 'raised', 'floating', 'card', 'modal', 'popover', 'sheet'],
    surface: ['surface', 'card', 'page', 'screen'],
    overlay: ['overlay', 'scrim', 'backdrop', 'dim'],
    focus: ['focus', 'focused', 'ring'],
    strong: ['strong', 'emphasis', 'bold'],
  };
  const SIZE_HINT = { xs: ['tiny', 'tight', 'xs'], sm: ['small', 'sm', 'compact', 'inline', 'icon'], md: ['medium', 'md', 'items', 'list'], lg: ['default', 'lg', 'component', 'padding'], xl: ['large', 'xl', 'card'], '2xl': ['sections', 'section', 'groups', '2xl'], '3xl': ['page', 'screen', 'hero', '3xl'] };

  def('find_tokens',
    'Find Syntropy design tokens by intent, e.g. "muted text", "card surface", "brand button background", "error border", "spacing between sections". Semantic tokens first; primitives only when asked. Returns name, Light/Dark values, tag and description.',
    {
      intent: z.string().describe('What the token is for, in plain words.'),
      type: z.enum(['color', 'dimension', 'fontFamily', 'number', 'string', 'any']).optional().describe('Restrict to a token type.'),
      includePrimitives: z.boolean().optional().describe('Also search primitive tokens (Color/..., Font/...). Default false; prefer semantic.'),
    },
    async ({ intent, type, includePrimitives = false }) => {
      const T = K.tokens();
      if (!T) return notYet('Resolved tokens', 'knowledge/tokens/resolved.json');
      const qs = [...new Set(terms(intent).flatMap((w) => [w, stem(w)]))];
      const wantPrim = includePrimitives || /\bprimitive|palette|raw|scale\b/i.test(intent);
      const cats = CATEGORY.filter((c) => c.words.some((w) => qs.includes(w)));
      const roles = Object.entries(ROLE).filter(([, ws]) => ws.some((w) => qs.includes(w))).map(([r]) => r);
      const rows = [];
      for (const [name, t] of Object.entries(T)) {
        const semantic = t.collection === 'Semantic';
        if (!semantic && !wantPrim) continue;
        if (type && type !== 'any' && t.type !== type) continue;
        const nl = name.toLowerCase();
        const segs = words(name);
        let s = 0;
        if (cats.length) {
          if (cats.some((c) => nl.startsWith(c.prefix) || nl.startsWith(c.prefix.replace('/', '')))) s += 6;
          else s -= 4;
        }
        for (const r of roles) {
          if (segs.includes(r) || nl.includes(r)) s += 5;
          if (ROLE[r].some((w) => w !== r && segs.includes(w))) s += 2;
        }
        for (const q of qs) {
          if (segs.includes(q)) s += 3;
          else if (nl.includes(q)) s += 1.5;
          if (t.description && words(t.description).map(stem).includes(stem(q))) s += 1;
        }
        if (nl.startsWith('space/')) {
          const size = nl.split('/')[1];
          if (SIZE_HINT[size]?.some((w) => qs.includes(w))) s += 3;
        }
        if (/hover|pressed/.test(nl) && !roles.includes('hover') && !roles.includes('pressed')) s -= 2;
        const mod = /subtle|lightest|accent|darkest|yellow|muted/.exec(nl);
        if (mod && !qs.some((q) => mod[0].startsWith(q))) s -= 2;
        if (!semantic) s -= 1;
        if (t.tag === 'locked' || t.tag === 'themable') s += 0.2;
        if (s > 2) rows.push({ name, t, s });
      }
      rows.sort((a, b) => b.s - a.s || a.name.localeCompare(b.name));
      const top = rows.slice(0, 12);
      if (!top.length) return ok(`No tokens match "${intent}". Try words like "text", "background", "border", "icon", "space", "radius" with a role ("brand", "muted", "error").`);
      const fmt = (v) => {
        if (v == null) return '-';
        if (typeof v !== 'object') return String(v);
        return Object.entries(v).map(([k, x]) => `${k} ${x}`).join(' / ');
      };
      const lines = [`## Tokens for "${intent}"`, '', '| Token | Collection | Type | Value | Tag | Description |', '|---|---|---|---|---|---|'];
      for (const { name, t } of top) lines.push(`| \`${name}\` | ${t.collection} | ${t.type} | ${cell(fmt(t.value))} | ${t.tag || ''} | ${cell(firstLine(t.description, 140))} |`);
      lines.push('', 'Source: `knowledge/tokens/resolved.json`. Use the token name in code and Figma; never the raw value.');
      if (rows.length > 12) lines.push(`_${rows.length - 12} more weaker matches._`);
      return ok(lines.join('\n'));
    });

  // 5. search_icons ------------------------------------------------------
  const ICON_SYNONYMS = {
    money: ['wallet', 'cash', 'coin', 'money', 'dollar'], cash: ['cash', 'money', 'coin'], pay: ['wallet', 'card', 'cash', 'money'], payment: ['card', 'wallet', 'cash'],
    delete: ['trash', 'bin', 'delete', 'remove'], remove: ['trash', 'minus', 'x', 'remove'], close: ['x', 'close'], cancel: ['x', 'close'],
    settings: ['cog', 'gear', 'sliders', 'settings', 'setting'], preferences: ['sliders', 'cog'], filter: ['filter', 'sliders', 'funnel'],
    back: ['arrow', 'chevron', 'back', 'left'], forward: ['arrow', 'chevron', 'right'], next: ['arrow', 'chevron', 'right'], previous: ['arrow', 'chevron', 'left'],
    home: ['home', 'house'], search: ['search', 'magnifier', 'magnifying'], find: ['search'], notification: ['bell', 'notification'], alert: ['bell', 'alert', 'warning'],
    user: ['user', 'person', 'profile', 'account'], profile: ['user', 'person', 'profile'], account: ['user', 'account'], people: ['users', 'people', 'group'],
    add: ['plus', 'add'], create: ['plus', 'add', 'new'], edit: ['pen', 'pencil', 'edit'], write: ['pen', 'pencil'], share: ['share'], copy: ['copy', 'duplicate'],
    download: ['download'], upload: ['upload'], document: ['file', 'document', 'paper'], file: ['file', 'document'], contract: ['file', 'contract', 'signature', 'document'],
    calendar: ['calendar', 'date'], date: ['calendar'], time: ['clock', 'time'], clock: ['clock', 'time'], history: ['history', 'clock', 'time'],
    lock: ['lock', 'padlock'], security: ['lock', 'shield'], secure: ['lock', 'shield'], password: ['lock', 'key'], hide: ['eye', 'hidden', 'off'], show: ['eye'], visibility: ['eye'],
    success: ['check', 'tick', 'success'], done: ['check'], error: ['error', 'x', 'alert', 'warning'], warning: ['warning', 'alert', 'triangle'], info: ['info', 'information'], help: ['help', 'question'],
    chat: ['chat', 'message', 'bubble'], message: ['message', 'chat', 'mail'], email: ['mail', 'email', 'envelope'], phone: ['phone', 'call', 'mobile'], call: ['phone', 'call'],
    location: ['location', 'pin', 'map'], map: ['map', 'location'], building: ['building', 'city', 'real', 'estate', 'house'], property: ['building', 'house', 'home'],
    invest: ['chart', 'growth', 'trend', 'coin', 'investment'], growth: ['growth', 'trend', 'chart', 'up'], chart: ['chart', 'graph'], profit: ['profit', 'trend', 'growth', 'percent'], percent: ['percent'],
    bank: ['bank'], card: ['card', 'credit'], transfer: ['transfer', 'exchange', 'arrows'], withdraw: ['money', 'out', 'withdraw'], deposit: ['money', 'in', 'deposit'],
    menu: ['menu', 'hamburger', 'list'], more: ['more', 'dots', 'ellipsis'], refresh: ['refresh', 'reload', 'sync'], logout: ['logout', 'exit', 'sign'], login: ['login', 'sign', 'enter'],
    gift: ['gift'], star: ['star', 'favorite'], favorite: ['star', 'heart', 'favorite'], like: ['heart', 'like', 'thumb'], camera: ['camera'], image: ['image', 'photo', 'picture'],
    id: ['id', 'identity', 'card'], identity: ['id', 'identity', 'fingerprint', 'face'], faceid: ['face', 'scan'], fingerprint: ['fingerprint'], scan: ['scan', 'qr'],
  };
  const ICON_ARABIC = {
    'محفظة': 'money', 'مال': 'money', 'فلوس': 'money', 'نقد': 'cash', 'دفع': 'pay', 'حذف': 'delete', 'إزالة': 'remove', 'إغلاق': 'close', 'إلغاء': 'cancel',
    'بحث': 'search', 'إعدادات': 'settings', 'تصفية': 'filter', 'فلتر': 'filter', 'إشعار': 'notification', 'إشعارات': 'notification', 'تنبيه': 'alert',
    'رجوع': 'back', 'عودة': 'back', 'التالي': 'next', 'السابق': 'previous', 'الرئيسية': 'home', 'بيت': 'home', 'مستخدم': 'user', 'حساب': 'account', 'ملف': 'file',
    'إضافة': 'add', 'تعديل': 'edit', 'مشاركة': 'share', 'نسخ': 'copy', 'تحميل': 'download', 'رفع': 'upload', 'مستند': 'document', 'عقد': 'contract',
    'تقويم': 'calendar', 'تاريخ': 'date', 'وقت': 'time', 'ساعة': 'clock', 'سجل': 'history', 'قفل': 'lock', 'أمان': 'security', 'كلمة المرور': 'password',
    'إخفاء': 'hide', 'إظهار': 'show', 'نجاح': 'success', 'خطأ': 'error', 'تحذير': 'warning', 'معلومات': 'info', 'مساعدة': 'help', 'محادثة': 'chat',
    'رسالة': 'message', 'بريد': 'email', 'هاتف': 'phone', 'جوال': 'phone', 'اتصال': 'call', 'موقع': 'location', 'خريطة': 'map', 'مبنى': 'building', 'عقار': 'property',
    'استثمار': 'invest', 'نمو': 'growth', 'رسم بياني': 'chart', 'ربح': 'profit', 'عائد': 'profit', 'نسبة': 'percent', 'بنك': 'bank', 'بطاقة': 'card',
    'تحويل': 'transfer', 'سحب': 'withdraw', 'إيداع': 'deposit', 'قائمة': 'menu', 'المزيد': 'more', 'تحديث': 'refresh', 'خروج': 'logout', 'دخول': 'login',
    'هدية': 'gift', 'نجمة': 'star', 'مفضلة': 'favorite', 'كاميرا': 'camera', 'صورة': 'image', 'هوية': 'identity', 'بصمة': 'fingerprint', 'مسح': 'scan',
  };

  def('search_icons',
    'Find Syntropy icons by meaning, in English or Arabic (e.g. "wallet", "delete", "settings", "محفظة", "رجوع"). Returns icon name, slug, category, size, Figma id and published state.',
    {
      meaning: z.string().describe('What the icon should mean.'),
      category: z.string().optional().describe('Optional category filter, e.g. "Financial / Fintech".'),
    },
    async ({ meaning, category }) => {
      const icons = K.icons();
      if (!icons) return notYet('The icon catalog', 'knowledge/icons/icons.json');
      let q = String(meaning).trim();
      for (const [ar, en] of Object.entries(ICON_ARABIC).sort((a, b) => b[0].length - a[0].length)) {
        if (q.includes(ar)) q = q.replace(ar, ' ' + en + ' ');
      }
      const base = terms(q);
      const expanded = new Map();
      for (const t of base) {
        expanded.set(t, 3);
        const single = t.endsWith('s') ? t.slice(0, -1) : t;
        if (single !== t) expanded.set(single, 3);
        for (const syn of ICON_SYNONYMS[t] || ICON_SYNONYMS[single] || []) if (!expanded.has(syn)) expanded.set(syn, 1.5);
      }
      let pool = icons;
      if (category) pool = pool.filter((i) => norm(i.category).includes(norm(category)));
      const scored = pool.map((i) => {
        const ws = new Set([...(i.words || []), ...words(i.slug)].map((w) => w.toLowerCase()));
        let s = 0;
        for (const [t, w] of expanded) {
          if (ws.has(t)) s += w * 2;
          else if ([...ws].some((x) => x.startsWith(t) && t.length > 2)) s += w;
        }
        if (compact(i.slug) === compact(q)) s += 10;
        if (base.some((t) => norm(i.category).includes(t))) s += 1;
        if (i.published) s += 0.3;
        return { i, s };
      }).filter((x) => x.s >= 1.5);
      scored.sort((a, b) => b.s - a.s || a.i.slug.length - b.i.slug.length);
      const top = scored.slice(0, 15);
      if (!top.length) {
        const cats = [...new Set(icons.map((i) => i.category))];
        return ok(`No icons match "${meaning}". Categories: ${cats.join(', ')}. Try a simpler English word.`);
      }
      const lines = [`## Icons for "${meaning}"`, '', '| Name | Slug | Category | Size | Figma id | Published |', '|---|---|---|---|---|---|'];
      for (const { i } of top) lines.push(`| ${cell(i.name)} | \`${i.slug}\` | ${i.category} | ${i.size} | \`${i.id}\` | ${i.published ? 'yes' : 'no'} |`);
      lines.push('', 'Source: `knowledge/icons/icons.json`. In Figma, swap the icon into the component\'s icon slot; directional icons (arrows, chevrons) mirror in RTL.');
      if (scored.length > 15) lines.push(`_${scored.length - 15} more matches._`);
      return ok(lines.join('\n'));
    });

  // 6. get_pattern -------------------------------------------------------
  def('get_pattern',
    'Read a Safqah UX pattern from knowledge/patterns (fuzzy name), or list the available patterns when no name matches.',
    { name: z.string().optional().describe('Pattern name, e.g. "empty state", "confirmation", "kyc". Omit to list all.') },
    async ({ name } = {}) => {
      const files = K.markdown(['knowledge/patterns']);
      if (!files.length) return notYet('Patterns', 'knowledge/patterns/*.md');
      const list = files.map((f) => ({ f, slug: path.posix.basename(f, '.md'), title: mdTitle(K.text(f), path.posix.basename(f, '.md')) }));
      const listing = () => list.map((p) => `- \`${p.slug}\`: ${p.title} (\`${p.f}\`)`).join('\n');
      if (!name) return ok(`## Patterns\n\n${listing()}\n\nCall \`get_pattern({ name })\` to read one.`);
      const ranked = list.map((p) => ({ p, s: Math.max(matchScore(name, p.slug), matchScore(name, p.title)) })).sort((a, b) => b.s - a.s);
      if (!ranked.length || ranked[0].s < 30) return ok(`No pattern matches "${name}".\n\n## Available patterns\n\n${listing()}`);
      const best = ranked[0].p;
      const others = ranked.slice(1, 4).filter((x) => x.s >= 30).map((x) => `\`${x.p.slug}\``);
      return ok(`_Source: \`${best.f}\`_\n\n${K.text(best.f)}${others.length ? `\n\n_Related: ${others.join(', ')}_` : ''}`, `Full file at \`${best.f}\`.`);
    });

  // 7. get_guideline -----------------------------------------------------
  def('get_guideline',
    'Search Syntropy UX, content and foundations guidelines (knowledge/ux, knowledge/content, knowledge/foundations) by topic and return the best matching section, e.g. "numbers and currency", "error messages", "RTL", "accessibility contrast".',
    { topic: z.string().describe('The topic to look up.') },
    async ({ topic }) => {
      const files = K.markdown(['knowledge/ux', 'knowledge/content', 'knowledge/foundations']);
      if (!files.length) return notYet('Guidelines', 'knowledge/ux, knowledge/content, knowledge/foundations');
      const qs = terms(topic);
      const cands = [];
      for (const f of files) {
        const md = K.text(f) || '';
        const fileScore = matchScore(topic, path.posix.basename(f, '.md')) * 0.6 + matchScore(topic, mdTitle(md, '')) * 0.4;
        const secs = sections(md);
        secs.forEach((s, i) => {
          const body = s.body.toLowerCase();
          let bodyHits = 0;
          for (const q of qs) if (body.includes(q)) bodyHits += 1;
          const s1 = fileScore * 0.5 + matchScore(topic, s.heading) * 0.8 + (qs.length ? (bodyHits / qs.length) * 25 : 0);
          if (s1 > 10) cands.push({ f, i, secs, s: s1, heading: s.heading, title: mdTitle(md, f) });
        });
      }
      if (!cands.length) {
        return ok(`No guideline matches "${topic}". Available files:\n\n${files.map((f) => `- \`${f}\``).join('\n')}`);
      }
      cands.sort((a, b) => b.s - a.s);
      const best = cands[0];
      const body = best.i === 0 && best.secs[0].level <= 1 ? best.secs.map((s) => s.body).join('\n\n') : sectionWithChildren(best.secs, best.i);
      const more = [];
      const seen = new Set([best.f + '#' + best.i]);
      for (const c of cands.slice(1)) {
        const k = c.f + '#' + c.i;
        if (seen.has(k)) continue;
        seen.add(k);
        more.push(`- \`${c.f}\` › ${c.heading}`);
        if (more.length >= 5) break;
      }
      return ok(`_Source: \`${best.f}\` › ${best.heading}_\n\n${body}${more.length ? `\n\n## Also relevant\n\n${more.join('\n')}` : ''}`, `Read the full file \`${best.f}\` for the rest.`);
    });

  // 8. find_links --------------------------------------------------------
  def('find_links',
    'Search the Syntropy links hub (research tools, benchmarks, design systems, regulation, Arabic/RTL, accessibility) by topic. Results grouped by category.',
    {
      topic: z.string().describe('What you need a link for, e.g. "saudi investing apps", "accessibility", "CMA regulation".'),
      category: z.string().optional().describe('Optional category id, e.g. "research-tools", "regulation", "saudi-investing".'),
    },
    async ({ topic, category }) => {
      const links = K.links();
      if (!links) return notYet('The links hub', 'knowledge/links/links.json');
      let pool = links;
      if (category) pool = pool.filter((l) => norm(l.category).includes(norm(category)));
      const qs = terms(topic);
      const scored = pool.map((l) => {
        const hay = norm([l.name, l.id, l.category, l.bestFor, l.region, l.agent].join(' '));
        let s = 0;
        for (const q of qs) if (hay.includes(q)) s += 1;
        s = s / Math.max(1, qs.length) * 10 + matchScore(topic, l.name) * 0.1 + matchScore(topic, l.category) * 0.08;
        if (!qs.length && category) s = 1;
        return { l, s };
      }).filter((x) => x.s >= 2 || (category && !topic.trim()));
      scored.sort((a, b) => b.s - a.s);
      const top = scored.slice(0, 25);
      if (!top.length) {
        const cats = [...new Set(links.map((l) => l.category))];
        return ok(`No links match "${topic}". Categories: ${cats.join(', ')}.`);
      }
      const groups = new Map();
      for (const { l } of top) { if (!groups.has(l.category)) groups.set(l.category, []); groups.get(l.category).push(l); }
      const lines = [`## Links for "${topic}"`];
      for (const [cat, ls] of groups) {
        lines.push('', `### ${cat}`);
        for (const l of ls) {
          const meta = [l.access, l.agent === 'mcp' && l.mcp ? `MCP: ${l.mcp}` : l.agent, l.region, l.benchmark ? 'benchmark' : null].filter(Boolean).join(' · ');
          lines.push(`- **${l.name}** ${l.url}: ${l.bestFor || ''}${meta ? ` (${meta})` : ''}`);
        }
      }
      lines.push('', 'Source: `knowledge/links/links.json`.');
      if (scored.length > 25) lines.push(`_${scored.length - 25} more. Add \`category\` to narrow._`);
      return ok(lines.join('\n'));
    });

  // 9. research_plan -----------------------------------------------------
  const QUERY_TEMPLATES = {
    lazyweb: (t, p) => [`${t} ${p}`, `${t} fintech app`, `${t} investment app best practices`, `${t} conversion experiment`, `${t} empty and error states`],
    refero: (t, p) => [`${t}`, `${t} ${p} flow`, `fintech ${t}`, `${t} confirmation screen`],
    mobbin: (t, p) => [`${t} ${p === 'web' ? 'web' : 'iOS'}`, `${t} flow banking apps`, `${t} investing apps`, `${t} Android`],
    screensdesign: (t) => [`${t}`, `${t} finance`, `${t} onboarding`],
    nicelydone: (t) => [`${t}`, `${t} SaaS`, `${t} dashboard`],
  };
  def('research_plan',
    'Plan design research for a task: which research tools to use (Lazyweb, Refero, Mobbin and other MCPs from the links hub), 3 to 5 concrete queries per tool, benchmark apps filtered by region and topic, and any Safqah research notes.',
    {
      task: z.string().describe('What you are designing, e.g. "withdraw to bank", "deal page", "KYC onboarding".'),
      platform: z.enum(['ios', 'android', 'mobile', 'web', 'back-office']).optional().describe('Target platform. Default mobile.'),
      region: z.enum(['KSA', 'GCC', 'Global', 'any']).optional().describe('Benchmark region. KSA also includes GCC. Default any.'),
    },
    async ({ task, platform = 'mobile', region = 'any' }) => {
      const links = K.links();
      if (!links) return notYet('The links hub', 'knowledge/links/links.json');
      const t = String(task).trim();
      const plat = platform === 'back-office' ? 'admin dashboard' : platform === 'web' ? 'web' : platform === 'mobile' ? 'mobile app' : platform;
      const tools = links.filter((l) => l.category === 'research-tools');
      const lines = [`# Research plan: ${t}`, '', `Platform: ${platform} · Region: ${region}`, '', '## Tools'];
      const order = ['lazyweb', 'refero', 'mobbin', 'screensdesign', 'nicelydone'];
      const sorted = [...tools].sort((a, b) => (order.indexOf(a.id) + 1 || 99) - (order.indexOf(b.id) + 1 || 99));
      let shown = 0;
      for (const l of sorted) {
        const tpl = QUERY_TEMPLATES[l.id];
        if (!tpl) continue;
        shown++;
        lines.push('', `### ${l.name}${l.agent === 'mcp' ? ' (MCP)' : ''}`, `${l.bestFor} · ${l.url}${l.mcp ? ` · MCP ${l.mcp}` : ''}`);
        for (const q of tpl(t, plat).slice(0, 5)) lines.push(`- "${q}"`);
      }
      const otherTools = sorted.filter((l) => !QUERY_TEMPLATES[l.id]);
      if (otherTools.length) lines.push('', `Also available: ${otherTools.map((l) => `${l.name} (${l.bestFor})`).join('; ')}.`);
      if (!shown) lines.push('', '_No research tools listed in links.json yet._');

      const regionSet = region === 'KSA' ? ['KSA', 'GCC'] : region === 'GCC' ? ['GCC', 'KSA'] : region === 'Global' ? ['Global'] : null;
      const qs = terms(t + ' ' + (platform === 'back-office' ? 'backoffice admin' : ''));
      const bench = links.filter((l) => l.benchmark && (!regionSet || regionSet.includes(l.region)))
        .map((l) => {
          const hay = norm([l.name, l.category, l.bestFor].join(' '));
          let s = 0;
          for (const q of qs) if (hay.includes(q)) s += 2;
          if (region === 'any' && l.region === 'KSA') s += 0.5;
          if (regionSet && l.region === regionSet[0]) s += 0.5;
          return { l, s };
        })
        .sort((a, b) => b.s - a.s).slice(0, 8);
      lines.push('', '## Benchmark apps');
      if (bench.length) for (const { l } of bench) lines.push(`- **${l.name}** (${l.region || 'n/a'}, ${l.category}) ${l.url}: ${l.bestFor}`);
      else lines.push('- None listed for this region yet. Try `region: "any"`.');

      const notes = K.markdown(['knowledge/research']);
      if (notes.length) {
        const ranked = notes.map((f) => {
          const md = K.text(f) || '';
          const hay = norm(path.posix.basename(f) + ' ' + md.slice(0, 4000));
          let s = 0;
          for (const q of qs) if (hay.includes(q)) s += 1;
          return { f, title: mdTitle(md, f), s };
        }).sort((a, b) => b.s - a.s);
        lines.push('', '## Safqah research notes', ...ranked.slice(0, 6).map((r) => `- \`${r.f}\`: ${r.title}${r.s ? '' : ' (general)'}`));
      } else lines.push('', '_Safqah research notes (knowledge/research/*.md) are not available yet._');

      lines.push('', '## Method', '1. Run 2 to 3 queries per tool; save the 5 strongest references with their links.', '2. Compare against at least 2 KSA or GCC benchmarks: Arabic, RTL and local regulation change the answer.', '3. Write down what to copy, what to avoid, and why, before opening Figma.', '4. Then `get_pattern` and `search_components` to build it in Syntropy.');
      return ok(lines.join('\n'));
    });

  // 10. lint_ui ----------------------------------------------------------
  def('lint_ui',
    'Lint UI source (CSS, JSX/TSX, HTML, Dart, Swift) against Syntropy rules: raw colors, raw spacing, unknown components, em dashes, Eastern digits and more. Returns findings with line, rule and fix.',
    {
      source: z.string().describe('The code to lint.'),
      filename: z.string().optional().describe('File name, used to pick the parser, e.g. "Card.tsx", "styles.css".'),
      kind: z.string().optional().describe('Override the source kind, e.g. "css", "jsx", "html", "dart".'),
    },
    async ({ source, filename, kind }) => {
      let mod;
      try { mod = await K.store.importLint(); } catch (e) { return ok(`The linter failed to load: ${e.message}. Expected \`lint/index.mjs\` exporting \`lintSource\`.`); }
      if (!mod || typeof mod.lintSource !== 'function') return notYet('The Syntropy linter', 'lint/index.mjs (export lintSource)');
      let findings;
      try { findings = await mod.lintSource(source, { filename, kind }); } catch (e) { return ok(`The linter threw: ${e.message}`); }
      findings = Array.isArray(findings) ? findings : [];
      if (!findings.length) return ok(`No Syntropy lint findings${filename ? ` in \`${filename}\`` : ''}.`);
      const sev = { error: 0, warning: 1, warn: 1, info: 2 };
      findings.sort((a, b) => (sev[a.severity] ?? 3) - (sev[b.severity] ?? 3) || (a.line ?? 0) - (b.line ?? 0));
      const counts = findings.reduce((m, f) => { m[f.severity || 'info'] = (m[f.severity || 'info'] || 0) + 1; return m; }, {});
      const lines = [`## Lint: ${findings.length} finding${findings.length === 1 ? '' : 's'}${filename ? ` in \`${filename}\`` : ''}`, '', Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · '), '', '| Line:Col | Severity | Rule | Message | Fix |', '|---|---|---|---|---|'];
      for (const f of findings.slice(0, 60)) lines.push(`| ${f.line ?? '-'}:${f.column ?? '-'} | ${f.severity || ''} | \`${f.rule}\` | ${cell(f.message)} | ${cell(f.fix || '')} |`);
      if (findings.length > 60) lines.push('', `_${findings.length - 60} more findings._`);
      return ok(lines.join('\n'), 'Fix the listed findings and lint again to see the rest.');
    });

  return tools;
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

export function createTools({ root = DEFAULT_ROOT, store } = {}) {
  const K = createKnowledge(store || createNodeStore(root));
  return { tools: buildTools(K), knowledge: K };
}

export function createServer({ root = DEFAULT_ROOT, store } = {}) {
  const { tools, knowledge: K } = createTools({ root, store });
  const server = new McpServer(SERVER_INFO, {
    instructions: 'Syntropy is the Safqah design system (Arabic-first, RTL, Sharia-compliant investing). Start any design task with start_intake. Use only components from search_components/get_component and tokens from find_tokens. Lint code with lint_ui before handing over.',
  });

  for (const t of Object.values(tools)) {
    server.registerTool(t.name, {
      description: t.description,
      inputSchema: t.inputSchema,
      annotations: { readOnlyHint: true, openWorldHint: false },
    }, async (args) => {
      try { return await t.handler(args || {}); } catch (e) {
        return { isError: true, content: [{ type: 'text', text: `${t.name} failed: ${e.message}` }] };
      }
    });
  }

  const textResource = (uri, mimeType, text) => ({ contents: [{ uri, mimeType, text }] });
  server.registerResource('agents', 'syntropy://agents', { title: 'Syntropy agent instructions', description: 'AGENTS.md: the rules for any agent working in Syntropy.', mimeType: 'text/markdown' },
    async (uri) => textResource(uri.href, 'text/markdown', K.text('AGENTS.md') || 'AGENTS.md is not available yet.'));
  server.registerResource('tokens', 'syntropy://tokens', { title: 'Syntropy resolved tokens', description: 'knowledge/tokens/resolved.json: every token with Light/Dark values.', mimeType: 'application/json' },
    async (uri) => textResource(uri.href, 'application/json', K.text('knowledge/tokens/resolved.json') || '{"error":"not available yet"}'));
  server.registerResource('components', 'syntropy://components', { title: 'Syntropy component index', description: 'Summary of every component: id, name, page, family, status, variants.', mimeType: 'application/json' },
    async (uri) => {
      const C = K.components();
      const body = C ? {
        source: C.raw.source, counts: C.raw.counts, families: C.raw.families,
        pages: C.pages.map((p) => ({ id: p.id, code: p.code, name: p.name, slug: p.slug, family: p.family, status: p.status })),
        components: C.comps.map((c) => ({ id: c.id, name: c.name, kind: c.kind, page: c.page, pageCode: c.pageCode, family: c.family, status: c.status, published: c.published, variantCount: c.variantCount, atom: c.atom })),
      } : { error: 'not available yet' };
      return textResource(uri.href, 'application/json', JSON.stringify(body));
    });

  server.registerPrompt('syntropy', {
    title: 'Syntropy intake',
    description: 'Start a Safqah design task the Syntropy way: a short interview, then a brief and next steps.',
    argsSchema: { request: z.string().optional().describe('What you want to make or change.') },
  }, ({ request } = {}) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `I am working on a Safqah design task with the Syntropy design system.${request ? `\n\nRequest: ${request}` : ''}\n\nCall the \`start_intake\` tool${request ? ' with this request' : ''}, ask me its questions one at a time, passing my answers back each time, then follow the brief's next steps. Use only Syntropy components and semantic tokens. Arabic and RTL first.`,
      },
    }],
  }));

  return server;
}

// Default tool map against the repo root, for tests and scripts.
export const tools = createTools().tools;
