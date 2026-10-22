# Binding to Syntropy variables

How to bind colors, radii, padding, gaps and type to Syntropy variables with the Plugin API, how to pick the right variable by category, and how to tell local, library, primitive and legacy variables apart.

## Rules
1. Colors bind to the **Semantic** collection only: `bg/*`, `text/*`, `border/*`, `icon/*`. Never `Color/...` primitives, never raw hex.
   Why: primitives have no Dark mode and are never used in product UI.
2. Match the category to the node and property: TEXT fill to `text/*`, frame or shape fill to `bg/*`, stroke to `border/*`, vector or icon paint to `icon/*`.
   Why: `text/default` and `icon/default` share a Light value but diverge in other modes and in code.
3. Inside the Syntropy file bind to LOCAL variables (`variable.remote === false`). In any other file bind to variables imported from the Syntropy library with `importVariableByKeyAsync`.
   Why: a remote variable inside the source file means the frame was pasted from a product file and is bound to an old library.
4. Old-library variables have capitalised path names (`Background/bg-brand`, `Colors/Primitive/...`) or come from `Global_Design_System`. Replace every one of them.
   Why: they look identical in Light mode and drift everywhere else.
5. Resolve a variable in its own collection's default mode when you need its value (Semantic Light mode id is `13:0`; Semantic collection id `13:2`).
   Why: resolving in the wrong mode gives a wrong match when you map a raw hex back to a token.
6. Bind radii per corner (`topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius`) to `radius/*`, padding (`paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`) and `itemSpacing` / `counterAxisSpacing` to `space/*`.
   Why: `cornerRadius` alone does not bind, and a raw 16 is not `space/lg`.
7. Text gets a Syntropy text style; if no style fits, bind `fontSize` to `font/size/*`, `fontFamily` to `font/family`, `fontWeight` to `font/weight/*` over the whole range.
   Why: text styles already carry the font variable bindings and the 1.5 line height.
8. Effects use the Syntropy effect styles `shadow/xs` to `shadow/xl` (two layers, bound to Shadow/Blur, Shadow/OffsetY and alpha black variables). Never type shadow values.
   Why: raw shadows drift from the elevation ramp and from code.

## Getting the variables
```js
// Inside the Syntropy file: local Semantic variables by name
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const semantic = cols.find(c => c.name === 'Semantic');            // id 13:2, Light mode 13:0
const all = await figma.variables.getLocalVariablesAsync();
const V = Object.fromEntries(all.filter(v => v.variableCollectionId === semantic.id).map(v => [v.name, v]));
// V['bg/surface'], V['text/muted'], V['border/default'], V['icon/default'], V['space/lg'], V['radius/default']
```
```js
// In any other file: import from the Syntropy library
const libs = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const sem = libs.find(c => c.libraryName === 'Syntropy - Safqah Design System 2.0.0' && c.name === 'Semantic');
const list = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(sem.key);
const V = {};
for (const item of list) V[item.name] = await figma.variables.importVariableByKeyAsync(item.key);
```

## Binding
```js
// Color by category
function bindPaint(node, prop, variable) {             // prop: 'fills' | 'strokes'
  const paints = node[prop].map(p => p.type === 'SOLID'
    ? figma.variables.setBoundVariableForPaint(p, 'color', variable) : p);
  node[prop] = paints;
}
bindPaint(card, 'fills', V['bg/elevated']);
bindPaint(card, 'strokes', V['border/subtle']);
bindPaint(title, 'fills', V['text/default']);
bindPaint(iconVector, 'fills', V['icon/muted']);

// Radius, per corner
for (const k of ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'])
  card.setBoundVariable(k, V['radius/lg']);

// Padding and gaps
for (const k of ['paddingLeft','paddingRight']) card.setBoundVariable(k, V['space/lg']);
for (const k of ['paddingTop','paddingBottom']) card.setBoundVariable(k, V['space/md']);
card.setBoundVariable('itemSpacing', V['space/sm']);

// Type, when no text style fits (prefer a text style, see text-and-fonts.md)
const n = title.characters.length;
title.setRangeBoundVariable(0, n, 'fontFamily', V['font/family']);
title.setRangeBoundVariable(0, n, 'fontSize', V['font/size/16']);
```

## Mapping a raw value back to a token
1. Read the raw hex from the paint.
2. Decide the category from the node and property (rule 2).
3. Resolve each candidate in that category in Semantic Light (`13:0`) and pick the exact match.
4. If two match (for example `text/default` and `icon/default`), the category decides. If none match exactly, ask; never pick "the closest green".

| Raw value seen | Category | Bind to |
|---|---|---|
| `#4daa57` fill on a primary button frame | bg | `bg/brand/primary` |
| `#ffffff` text on that button | text | `text/on-brand` |
| `#535d58` secondary text | text | `text/muted` |
| `#e1e4e3` 1 px card stroke | border | `border/default` |
| `#f9faf9` screen fill | bg | `bg/surface` |
| `#02ad4c` anywhere | none | Wrong old green: replace with the right semantic token for the role, never keep it |
| 16 padding | space | `space/lg` |
| 20 corner radius | radius | `radius/default` (same value as `radius/brand`; use `radius/default` unless the component doc says brand) |

## Quick audit (full version in audit.md)
```js
const counts = { localSemantic: 0, librarySemantic: 0, primitive: 0, legacy: 0, raw: 0 };
const inSyntropyFile = figma.fileKey
  ? figma.fileKey === 'a7Z956YZy9n6f9uz5DK16Y'
  : figma.root.name.startsWith('Syntropy - Safqah Design System');
async function check(paint) {
  if (paint.type !== 'SOLID' || paint.visible === false) return;
  const id = paint.boundVariables?.color?.id;
  if (!id) return counts.raw++;
  const v = await figma.variables.getVariableByIdAsync(id);
  const col = v && await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
  const semanticName = v && /^(bg|text|border|icon)\//.test(v.name) && col?.name === 'Semantic';
  if (semanticName && !v.remote) counts.localSemantic++;
  else if (semanticName && v.remote && !inSyntropyFile) counts.librarySemantic++;
  else if (col?.name?.startsWith('Primitive')) counts.primitive++;
  else counts.legacy++;
}
```

## Sources
- `knowledge/tokens/resolved.json` (Semantic collection, Light and Dark)
- `knowledge/tokens/shadows.json` (two-layer effect styles)
- `knowledge/guides/contributing.md` ("Bind everything to variables")
