// Sorts the design system file's pages into guides, foundations, component pages
// and excluded pages. Private and internal pages never leave this function.

// Never extracted, linked or listed.
export const EXCLUDED_IDS = new Set(['69:976', '69:977']);

// Known typos in page names, fixed for the canonical name only.
const NAME_FIXES = { NumricStepper: 'NumericStepper' };

const stripDecor = (s) =>
  s.replace(/\p{Extended_Pictographic}|️|‍/gu, '').replace(/\s+/g, ' ').trim();

export function slugify(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/\(.*?\)/g, '')
    .replace(/&/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * @param {{id:string,name:string}[]} pages in file order
 * @returns {{guides:object[], foundations:object[], families:object[], components:object[], excluded:object[]}}
 */
export function classifyPages(pages) {
  const out = { guides: [], foundations: [], families: [], components: [], excluded: [] };
  let section = 'GUIDES';
  let family = null;
  for (const p of pages) {
    const clean = stripDecor(p.name);
    if (EXCLUDED_IDS.has(p.id)) { out.excluded.push({ id: p.id }); continue; }
    if (/─{2,}/.test(p.name)) {
      section = clean.replace(/[─\s]+/g, ' ').trim().toUpperCase();
      out.excluded.push({ id: p.id, reason: 'divider' });
      continue;
    }
    if (section === 'GUIDES') { out.guides.push({ id: p.id, name: clean, slug: slugify(clean) }); continue; }
    if (section === 'FOUNDATIONS') { out.foundations.push({ id: p.id, name: clean, slug: slugify(clean) }); continue; }
    if (section !== 'COMPONENTS') { out.excluded.push({ id: p.id, reason: section.toLowerCase() }); continue; }

    const fam = clean.match(/^(\d{2})\.\s+(.+)$/);
    if (fam) {
      family = { id: p.id, code: fam[1], name: fam[2].trim() };
      out.families.push(family);
      continue;
    }
    const m = clean.match(/^(\d{2})\.?([a-z])\.?\s+(.+)$/i);
    if (!m) { out.excluded.push({ id: p.id, reason: 'unrecognised' }); continue; }
    const wip = /🥼|incomplete/i.test(p.name);
    let title = m[3].replace(/\s*&\s*\d{2}[a-z]\.\s*/i, ' & ').replace(/\*.*$/, '').trim();
    for (const [bad, good] of Object.entries(NAME_FIXES)) title = title.replace(bad, good);
    out.components.push({
      id: p.id,
      code: `${m[1]}${m[2].toLowerCase()}`,
      name: title,
      figmaPageName: p.name,
      slug: slugify(title),
      family: family ? `${family.code} ${family.name}` : null,
      status: wip ? 'wip' : 'stable',
    });
  }
  return out;
}
