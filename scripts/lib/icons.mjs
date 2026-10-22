// Builds icon and illustration records from the Syntropy Icons file.

const DOC = /documentation/i;

/**
 * @param {object} pageNode  nodes['9:2'] from the REST API
 * @param {Set<string>} publishedIds node ids published to the library
 */
export function buildIconRecords(pageNode, publishedIds = new Set()) {
  const comps = pageNode.components || {};
  const out = [];
  for (const frame of pageNode.document.children || []) {
    if (DOC.test(frame.name)) continue;
    const walk = (n) => {
      if (n.type === 'INSTANCE') return;
      if (n.type === 'COMPONENT') {
        const slug = n.name.replace(/^Icon\s*\/\s*/i, '').trim();
        const box = n.absoluteBoundingBox || {};
        out.push({
          name: n.name,
          slug,
          words: slug.split('-'),
          category: frame.name,
          size: Math.round(box.width || 0) || null,
          id: n.id,
          key: comps[n.id]?.key || null,
          published: publishedIds.has(n.id),
        });
        return;
      }
      for (const c of n.children || []) walk(c);
    };
    walk(frame);
  }
  return out;
}

/** The isometric illustration set: one record per concept, with its alignments. */
export function buildIllustrationRecords(pageNode) {
  const sets = (pageNode.document.children || []).filter((c) => c.type === 'COMPONENT_SET');
  return sets.flatMap((set) => {
    const defs = set.componentPropertyDefinitions || {};
    const conceptProp = Object.keys(defs).find((k) => defs[k].type === 'VARIANT' && !/alignment/i.test(k));
    const alignProp = Object.keys(defs).find((k) => /alignment/i.test(k));
    return (defs[conceptProp]?.variantOptions || []).map((concept) => ({
      concept,
      set: set.name,
      setId: set.id,
      setKey: pageNode.componentSets?.[set.id]?.key || null,
      figmaProperty: conceptProp,
      alignments: alignProp ? defs[alignProp].variantOptions : [],
    }));
  });
}
