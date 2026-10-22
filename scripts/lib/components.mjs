// Pulls component sets and standalone components out of a Figma page node
// (the `nodes[id]` object returned by GET /v1/files/:key/nodes).
// Figma names stay verbatim; `canonical` adds normalized names for code.

const DOC_FRAME = /\bdoc(umentation)?\b|· documentation/i;
const REF_FRAME = /\breference\b/i;

/** "Has icon leading#417:1" -> "Has icon leading" */
export const cleanPropName = (n) => n.replace(/#[\d:]+$/, '');

/** Prop names to camelCase: "Has icon leading" -> hasIconLeading, "HasIcon" -> hasIcon. */
export function canonicalPropName(name) {
  const base = cleanPropName(name).trim();
  if (/^property\s*\d+$/i.test(base)) return `unnamed${base.match(/\d+/)[0]}`;
  const words = base
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
  return words.map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w)).join('');
}

/** Variant values: direction is always LTR/RTL; everything else stays as written in Figma. */
export function canonicalValue(propName, value) {
  if (canonicalPropName(propName) === 'direction' && /^(ltr|rtl)$/i.test(value)) return value.toUpperCase();
  return value;
}

function buildProps(defs = {}, componentsMap = {}) {
  return Object.entries(defs).map(([figmaName, d]) => {
    const p = {
      name: cleanPropName(figmaName),
      canonical: canonicalPropName(figmaName),
      type: d.type,
      default: d.defaultValue,
    };
    if (d.variantOptions) {
      p.options = d.variantOptions;
      p.canonicalOptions = d.variantOptions.map((v) => canonicalValue(figmaName, v));
    }
    if (d.type === 'INSTANCE_SWAP' && componentsMap[d.defaultValue]) {
      p.defaultComponent = componentsMap[d.defaultValue].name;
    }
    if (p.canonical.startsWith('unnamed')) p.issue = 'unnamed property in Figma';
    return p;
  });
}

/**
 * @param {object} pageNode  nodes[pageId] from the REST API (document + components + componentSets)
 * @param {object} page      a component page record from classifyPages()
 * @returns {object[]} component records
 */
export function extractComponents(pageNode, page) {
  const doc = pageNode.document;
  const setsMap = pageNode.componentSets || {};
  const compsMap = pageNode.components || {};
  const tops = doc.children || [];
  const docFrame = tops.find((f) => f.type === 'FRAME' && DOC_FRAME.test(f.name));
  const refFrame = tops.find((f) => f.type === 'FRAME' && REF_FRAME.test(f.name));
  const out = [];

  const visit = (node, ancestors) => {
    if (node.type === 'INSTANCE') return; // components nested in instances are not ours
    if (node.type === 'COMPONENT_SET' || node.type === 'COMPONENT') {
      const meta = (node.type === 'COMPONENT_SET' ? setsMap : compsMap)[node.id] || {};
      const top = ancestors[1]; // ancestors[0] is the page
      out.push({
        id: node.id,
        name: node.name,
        kind: node.type === 'COMPONENT_SET' ? 'set' : 'component',
        page: page.slug,
        pageCode: page.code,
        family: page.family,
        status: page.status,
        hidden: /^[_.]/.test(node.name),
        key: meta.key || null,
        description: meta.description || '',
        variantCount: node.type === 'COMPONENT_SET' ? (node.children || []).length : 1,
        props: buildProps(node.componentPropertyDefinitions, compsMap),
        frames: {
          doc: docFrame?.id || null,
          reference: refFrame?.id || null,
          container: top && top.id !== node.id ? top.id : null,
        },
      });
      return; // variants inside a set are not separate components
    }
    for (const c of node.children || []) visit(c, [...ancestors, node]);
  };
  visit(doc, []);
  return out;
}
