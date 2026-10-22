# Atoms first

How to build or extend a Syntropy component in Figma: decompose into atoms, molecules and an organism, build each as its own component, reuse existing Syntropy parts, then combine variants and add properties. Use this for any new component, any new variant, and any "make this a component" request.

## Rules
1. Decompose before drawing: write the list of atoms, molecules and the organism, and which of them already exist in the index.
   Why: most "new" components are 80% existing parts; finding them first prevents duplicates.
2. Each level is its own component (or component set). The organism contains instances of molecules, which contain instances of atoms.
   Why: one inline composition cannot be reused, audited or mapped to code.
3. Reuse real Syntropy parts: `Button`, `IconButton`, `Tag`, `Badge Dot`, `Badge Count`, `StatusPill`, `dealTags`, `Divider`, `Avatar`, `Content`, `ListItem`, Syntropy Icons. Never fake them with shapes and text.
   Why: fakes drift from the library on the first update.
4. Never build a custom chip, pill or badge. Pick `Tag`, `Badge Dot`, `Badge Count`, `StatusPill` or `dealTags`; if none fits, report the gap.
   Why: chips are the most duplicated element in legacy files.
5. Bind tokens while you build, never "fix later": every fill, stroke, radius, padding, gap and text style.
   Why: unbound atoms multiply into every variant.
6. Build the RTL direction as real variants (mirrored layout and mirrored icons), not by flipping LTR.
   Why: flipping mirrors digits, logos and glyphs that must not mirror.
7. Name to convention: components PascalCase (`RegionChip`), sub-parts with a slash (`CardDeal / Metric`), variant properties Title Case with values that match what renders (`State=Expanded`).
   Why: names are the code API (see syntropy-code-adapters).
8. Add component properties for content (TEXT), optional parts (BOOLEAN) and icons (INSTANCE_SWAP) instead of more variants.
   Why: variants multiply; properties do not.
9. Never build in a work-in-progress area, and never move a component to a Syntropy page unless the person asks; place new work on the page the person named.
   Why: publishing is the design team's decision.

## Decomposition template
```
Organism: <Name>  (what it is for, one line)
  Molecules:
    <Name / Part>  = atoms: <...>   exists? <set id or "new">
  Atoms:
    <Name / Atom>  exists? <set id or "new">
  Reused Syntropy components: Button 417:2, StatusPill 1654:178, Content 3210:738, Icon / chevron-left
  Variant axes: State (...) x Direction (LTR, RTL) = n
  Properties: Title (TEXT), Show description (BOOLEAN), Icon (INSTANCE_SWAP)
```

## Worked example: an investment summary row
```
Organism: InvestmentSummary (amount, status and next payout of one investment)
  Molecules:
    InvestmentSummary / Header  = Content (title + description) + StatusPill   new
    InvestmentSummary / Metric  = label text + value text                      new (or KeyValue 1739:122 if it fits)
  Atoms: none new
  Reused: Content 3210:738, StatusPill 1654:178, KeyValue 1739:122, Divider 1767:2
  Variant axes: Direction (LTR, RTL) = 2
  Properties: Show status (BOOLEAN)
```
Here `KeyValue` already covers the metric, so the only new component is the organism itself.

## Plugin API sequence
```js
// 1. Atom or molecule as a component with auto layout and bound tokens
const header = figma.createComponent();
header.name = 'InvestmentSummary / Header';
header.layoutMode = 'HORIZONTAL';
header.primaryAxisSizingMode = 'FIXED';
header.counterAxisSizingMode = 'AUTO';
header.setBoundVariable('itemSpacing', V['space/sm']);
// ...append Content and StatusPill instances (see local-components.md)

// 2. Variants: build the LTR component, clone for RTL, mirror the layout, then combine
const ltr = header; ltr.name = 'Direction=LTR';
const rtl = ltr.clone(); rtl.name = 'Direction=RTL';            // a clone of a COMPONENT is already a component
// set every nested instance's Direction to its RTL value, swap directional icons, reverse child order if needed
const set = figma.combineAsVariants([ltr, rtl], targetPage);
set.name = 'InvestmentSummary / Header';

// 3. Properties
const titleKey = set.addComponentProperty('Title', 'TEXT', 'عنوان');
for (const v of set.children) {
  const t = v.findOne(n => n.type === 'TEXT' && n.name === 'Title');
  t.componentPropertyReferences = { characters: titleKey };      // restore after every clone
}
const iconKey = set.addComponentProperty('Icon', 'INSTANCE_SWAP', iconComponent.id); // id, not key
```

## Do and Don't
| Do | Don't |
|---|---|
| `RegionChip` atom, then `ProvinceSelector` organism that wraps `RegionChip` instances | One frame with 13 hand-drawn chips |
| `Tag` with `Tone=success` for a category label | A green rounded rectangle with white text |
| `Direction=RTL` variant with `Icon / chevron-left` (pointing forward in RTL reading order) | The LTR variant scaled by -1 |
| `Show badge` BOOLEAN property | Two variants that differ only by a badge |

## Sources
- `knowledge/guides/contributing.md` (Adding a new component, Naming conventions)
- `knowledge/components/index.json`
