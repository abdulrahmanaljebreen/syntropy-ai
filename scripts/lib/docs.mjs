// Converts a Syntropy doc frame (built from the Library Internals doc template) into markdown.
// Template blocks carry the text; live component previews inside sections are skipped.
import { cleanText } from './tokens.mjs';

const TEMPLATE = new Set([
  'Page Header', 'Section Header', 'Subsection Header', 'Body Paragraph', 'Bullet Item', 'Callout Block',
  'Code Block', 'Do Dont Card', 'Token Mapping Row', 'Props Row', 'Doc Row', 'Resource Link',
  'Type Specimen Row', 'Ramp Display', 'Variant Matrix Cell', 'State Demo Card', 'Spec Annotation',
  'Primitive Swatch', 'Semantic Swatch', 'Footer',
]);
const SKIP_TEXT = new Set(['Copy', '→', '🔗', 'See sample']);

const t = (s) => cleanText(s || '').replace(/[\u2028\u2029]/g, '\n');

/** Text nodes inside a template block, skipping nested component previews. */
function blockTexts(node) {
  const out = [];
  const walk = (n, root) => {
    if (n.visible === false) return;
    if (!root && n.type === 'INSTANCE' && !TEMPLATE.has(n.name)) return;
    if (n.type === 'TEXT') {
      const s = t(n.characters);
      if (s && !SKIP_TEXT.has(s)) out.push({ text: s, name: n.name, url: n.style?.hyperlink?.url });
      return;
    }
    (n.children || []).forEach((c) => walk(c, false));
  };
  walk(node, true);
  return out;
}

const row = (cells) => `| ${cells.map((c) => c.replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ')} |`;

function renderBlock(node, lines, state) {
  const texts = blockTexts(node);
  const plain = texts.map((x) => x.text);
  switch (node.name) {
    case 'Page Header': {
      // status, Author, @name, Last updated, date, Version, 2.0.0, Title, Description, Resources...
      const get = (label) => { const i = plain.indexOf(label); return i > -1 ? plain[i + 1] : undefined; };
      const ai = plain.indexOf('Author');
      state.meta = { status: ai > 0 ? plain[ai - 1] : undefined, updated: get('Last updated'), version: get('Version') };
      const vi = plain.indexOf('Version');
      state.meta.title = plain[vi + 2];
      state.meta.summary = plain[vi + 3];
      return;
    }
    case 'Footer': return;
    case 'Section Header': lines.push('', `## ${plain.join(' ')}`, ''); return;
    case 'Subsection Header': lines.push('', `### ${plain.join(' ')}`, ''); return;
    case 'Body Paragraph': lines.push(plain.join(' '), ''); return;
    case 'Bullet Item': lines.push(`- ${plain.join(' ')}`); return;
    case 'Callout Block': {
      const [label, ...rest] = plain;
      lines.push('', `> **${label}:** ${rest.join(' ')}`, ''); return;
    }
    case 'Code Block': {
      const [lang, ...code] = plain;
      const l = (lang || '').toLowerCase().replace(/[^a-z]/g, '');
      lines.push('', '```' + (l === 'react' || l === 'tsx' ? 'tsx' : l), code.join('\n'), '```', ''); return;
    }
    case 'Do Dont Card': {
      const [kind, scenario, ...rest] = plain;
      const note = rest.at(-1);
      lines.push(`- **${kind}** · ${scenario}${note ? `: ${note}` : ''}`); return;
    }
    case 'Resource Link': {
      const link = texts.find((x) => x.url) || texts[0];
      if (link) lines.push(link.url ? `- [${link.text}](${link.url})` : `- ${link.text}`);
      return;
    }
    case 'Token Mapping Row': case 'Props Row': case 'Doc Row': {
      if (state.lastTable !== node.name) {
        const header = node.name === 'Token Mapping Row' ? ['Slot', 'Token', 'Notes'] : plain.map((_, i) => `Col ${i + 1}`);
        lines.push('', row(header), row(header.map(() => '---')));
      }
      state.lastTable = node.name;
      lines.push(row(node.name === 'Token Mapping Row' ? [plain[0], plain[1] ? `\`${plain[1]}\`` : '', plain.slice(2).join(' ')] : plain));
      return;
    }
    default:
      if (plain.length) lines.push(`- ${plain.join(' · ')}`);
  }
}

/** Generic frames: horizontal frames of short texts become table rows; others recurse. */
function renderFrame(node, lines, state) {
  if (node.visible === false) return;
  if (node.type === 'INSTANCE') {
    if (TEMPLATE.has(node.name)) {
      if (!/Row$/.test(node.name)) state.lastTable = null;
      renderBlock(node, lines, state);
    }
    return; // component previews are skipped
  }
  if (node.type === 'TEXT') {
    const s = t(node.characters);
    if (s && !SKIP_TEXT.has(s)) { state.lastTable = null; lines.push(s, ''); }
    return;
  }
  const kids = (node.children || []).filter((c) => c.visible !== false);
  const leafTexts = (n) => {
    if (n.type === 'TEXT') return [t(n.characters)];
    if (n.type === 'INSTANCE') return null;
    const all = (n.children || []).map(leafTexts);
    if (all.some((x) => x === null)) return null;
    return all.flat().filter(Boolean);
  };
  if (node.layoutMode === 'HORIZONTAL' && kids.length >= 2) {
    const cells = kids.map((k) => leafTexts(k));
    if (cells.every((c) => c && c.length <= 2) && cells.some((c) => c.length)) {
      const flat = cells.map((c) => c.join(' '));
      if (flat.length === 2 && /^\d{1,2}$/.test(flat[0])) { // numbered anatomy slot
        state.lastTable = null; lines.push('', `**${flat[0]}. ${flat[1]}**`); return;
      }
      if (state.lastTable !== 'grid' || state.lastWidth !== flat.length) {
        lines.push('', row(flat), row(flat.map(() => '---')));
        state.lastTable = 'grid'; state.lastWidth = flat.length;
      } else lines.push(row(flat));
      return;
    }
  }
  state.lastTable = null;
  kids.forEach((k) => renderFrame(k, lines, state));
}

/**
 * @param {object} docFrame the "<Name> Doc Page" frame node
 * @returns {{ meta: object, markdown: string, sections: string[] }}
 */
export function docToMarkdown(docFrame) {
  const lines = [];
  const state = { meta: {}, lastTable: null };
  const sections = [];
  for (const child of docFrame.children || []) {
    if (child.visible === false) continue;
    if (child.type === 'INSTANCE') { renderFrame(child, lines, state); continue; }
    if (/^Section\s*·/.test(child.name)) {
      sections.push(t(child.name.replace(/^Section\s*·\s*/, '')));
      renderFrame(child, lines, state);
      lines.push('');
    } else if (child.name !== 'Divider') renderFrame(child, lines, state);
  }
  const markdown = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  return { meta: state.meta, markdown, sections };
}
