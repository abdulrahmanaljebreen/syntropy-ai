// Schema checks for knowledge/links/links.json.

export const CATEGORIES = {
  syntropy: 'Syntropy itself',
  'research-tools': 'Research tools with agent access',
  'mobile-patterns': 'Mobile patterns',
  'web-inspiration': 'Web and landing inspiration',
  'tool-directories': 'Tool directories',
  'saudi-investing': 'Saudi investing and fintech',
  'saudi-banking': 'Saudi banks and wallets',
  'gcc-investing': 'GCC and halal investing',
  'real-estate-investing': 'Real estate and alternative investing',
  'global-investing': 'Global investing and wealth',
  neobanks: 'Neobanks and money',
  'finance-backoffice': 'Finance web and back-office',
  'arabic-rtl': 'Arabic and RTL',
  'design-systems': 'Reference design systems',
  'ux-principles': 'UX principles and copy',
  accessibility: 'Accessibility',
  regulation: 'Saudi regulation',
  'motion-icons': 'Motion, icons and illustration',
};
export const ACCESS = ['free', 'freemium', 'paid', 'internal'];
export const AGENT = ['mcp', 'llms.txt', 'web', 'api', 'figma', 'none'];

/** @returns {string[]} problems, empty when valid */
export function validateLinks(doc) {
  const problems = [];
  const ids = new Set();
  const urls = new Set();
  if (!Array.isArray(doc?.links)) return ['links must be an array'];
  doc.links.forEach((l, i) => {
    const at = `#${i} ${l.id || l.name || ''}`.trim();
    for (const f of ['id', 'name', 'url', 'category', 'bestFor', 'access', 'agent']) {
      if (!l[f]) problems.push(`${at}: missing ${f}`);
    }
    if (l.url && !/^https:\/\//.test(l.url)) problems.push(`${at}: url must be https`);
    if (l.id && !/^[a-z0-9-]+$/.test(l.id)) problems.push(`${at}: id must be kebab-case`);
    if (l.category && !CATEGORIES[l.category]) problems.push(`${at}: unknown category ${l.category}`);
    if (l.access && !ACCESS.includes(l.access)) problems.push(`${at}: unknown access ${l.access}`);
    if (l.agent && !AGENT.includes(l.agent)) problems.push(`${at}: unknown agent ${l.agent}`);
    if (l.agent === 'mcp' && !l.mcp) problems.push(`${at}: mcp links need an mcp endpoint or page`);
    if (l.bestFor && /—/.test(l.bestFor)) problems.push(`${at}: no em dash in bestFor`);
    if (ids.has(l.id)) problems.push(`${at}: duplicate id`);
    const u = l.url?.replace(/\/$/, '');
    if (urls.has(u)) problems.push(`${at}: duplicate url`);
    ids.add(l.id); urls.add(u);
  });
  return problems;
}
