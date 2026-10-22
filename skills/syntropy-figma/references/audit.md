# The paint audit

Run this before you say a frame, screen or component is done. It walks every node under a root, classifies every visible SOLID paint and reports counts plus the offenders, so you can fix them and run it again.

## Rules
1. Run the audit on the exact nodes you created or changed, after the last edit, in the same file.
   Why: a clean audit from before your final edits proves nothing.
2. Done means `raw = 0`, `primitive = 0`, `legacy = 0`. Report the counts in your answer.
   Why: "looks right" is not evidence; the counts are.
3. Inside the Syntropy file, every bound paint must be `localSemantic`. In other files, `librarySemantic` (imported from the Syntropy library) is the expected class and `localSemantic` should be zero unless the file defines no variables of its own.
   Why: a remote variable inside the source file means pasted, legacy-bound layers.
4. Paints inside nested instances count. Fix them in the component (inside the Syntropy file) or by choosing the right variant, never with a local override.
   Why: overriding an instance's paint is a hidden fork of the component.
5. Gradients and images are reported separately; a gradient's stops cannot bind to variables, so note it as a known exception instead of hiding it.
   Why: honest reporting; the brand gradient is the documented case.
6. Also check radii, padding and gaps on frames you built (the script lists raw ones) and that every text node uses a Syntropy text style.
   Why: color is the most common miss, not the only one.

## Script (paste into use_figma, set ROOT_IDS)
```js
const ROOT_IDS = ['<node id>'];                       // frames or components you built
const SYNTROPY = 'a7Z956YZy9n6f9uz5DK16Y';
const inSyntropyFile = figma.fileKey ? figma.fileKey === SYNTROPY
  : figma.root.name.startsWith('Syntropy - Safqah Design System');

const counts = { localSemantic: 0, librarySemantic: 0, primitive: 0, legacy: 0, raw: 0, gradient: 0 };
const offenders = [];
const rawGeometry = [];
const unstyledText = [];
const varCache = new Map();

async function describe(id) {
  if (varCache.has(id)) return varCache.get(id);
  const v = await figma.variables.getVariableByIdAsync(id);
  const col = v ? await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId) : null;
  const d = { name: v?.name ?? '?', remote: !!v?.remote, collection: col?.name ?? '?' };
  varCache.set(id, d);
  return d;
}

async function classify(node, paint, where) {
  if (paint.visible === false) return;
  if (paint.type.startsWith('GRADIENT')) { counts.gradient++; return; }
  if (paint.type !== 'SOLID') return;
  const id = paint.boundVariables?.color?.id;
  if (!id) {
    counts.raw++;
    const c = paint.color, h = x => Math.round(x * 255).toString(16).padStart(2, '0');
    offenders.push({ id: node.id, name: node.name, where, cls: 'raw', value: '#' + h(c.r) + h(c.g) + h(c.b) });
    return;
  }
  const d = await describe(id);
  const semantic = d.collection === 'Semantic' && /^(bg|text|border|icon)\//.test(d.name);
  let cls;
  if (semantic && !d.remote) cls = 'localSemantic';
  else if (semantic && d.remote && !inSyntropyFile) cls = 'librarySemantic';
  else if (/^Primitive/.test(d.collection)) cls = 'primitive';
  else cls = 'legacy';
  counts[cls]++;
  if (cls === 'primitive' || cls === 'legacy') offenders.push({ id: node.id, name: node.name, where, cls, value: `${d.collection} :: ${d.name}` });
  // Category check: text fill must be text/*, stroke border/*, vector icon/*, frame bg/*
  if (semantic) {
    const want = where === 'strokes' ? 'border/' : node.type === 'TEXT' ? 'text/'
      : ['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'LINE', 'POLYGON'].includes(node.type) ? 'icon/' : 'bg/';
    if (!d.name.startsWith(want)) offenders.push({ id: node.id, name: node.name, where, cls: 'category', value: `${d.name} (expected ${want}*)` });
  }
}

async function walk(node) {
  for (const where of ['fills', 'strokes']) {
    const paints = node[where];
    if (Array.isArray(paints)) for (const p of paints) await classify(node, p, where);
  }
  if ('layoutMode' in node && node.type !== 'INSTANCE' && node.layoutMode !== 'NONE') {
    const b = node.boundVariables || {};
    for (const k of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'itemSpacing'])
      if (node[k] > 0 && !b[k]) rawGeometry.push(`${node.name} ${k}=${node[k]}`);
  }
  if ('topLeftRadius' in node && node.type !== 'INSTANCE') {
    const b = node.boundVariables || {};
    for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius'])
      if (node[k] > 0 && !b[k]) rawGeometry.push(`${node.name} ${k}=${node[k]}`);
  }
  if (node.type === 'TEXT' && !node.textStyleId) unstyledText.push(`${node.id} ${node.name}`);
  if ('children' in node) for (const c of node.children) await walk(c);
}

for (const id of ROOT_IDS) {
  const n = await figma.getNodeByIdAsync(id);
  if (n) await walk(n);
}
return { inSyntropyFile, counts, offenders: offenders.slice(0, 60), rawGeometry: rawGeometry.slice(0, 40), unstyledText: unstyledText.slice(0, 40) };
```
`textStyleId` returns `figma.mixed` when a node has more than one style; treat that as styled but check it by eye.

## Reading the result
| Class | Meaning | Fix |
|---|---|---|
| `localSemantic` | Bound to a Semantic variable in this file | Correct inside the Syntropy file |
| `librarySemantic` | Bound to a Semantic variable from the Syntropy library | Correct in product files and every other consuming file |
| `primitive` | Bound to `Color/...` | Rebind to the Semantic token for the role |
| `legacy` | Bound to an old library or a remote variable inside the Syntropy file | Rebind to the Semantic token for the role |
| `raw` | No variable at all | Map the value back to a token (see `variables-binding.md`), bind it |
| `category` | Semantic, but the wrong family (a text node on `icon/default`) | Rebind to the same role in the right family |
| `rawGeometry` | Unbound padding, gap or radius | Bind to `space/*` or `radius/*` |
| `unstyledText` | Text without a Syntropy text style | Apply one of the 37 styles |

## How to report
```
Audit of 6012:345 (product file, screen frame):
librarySemantic 214 · localSemantic 0 · primitive 0 · legacy 0 · raw 0 · gradient 1 (brand hero, documented)
rawGeometry 0 · unstyledText 0
```
Never write "fully tokenised" without these numbers.

## Sources
- `knowledge/guides/contributing.md` (Definition of Done: zero unbound paints)
- `knowledge/tokens/resolved.json`
