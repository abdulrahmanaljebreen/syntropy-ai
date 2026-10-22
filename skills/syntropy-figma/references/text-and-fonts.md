# Text and fonts

How to create and edit text in Syntropy frames: the one font family, loading fonts safely, empty text nodes, the 37 text styles, and Arabic copy with Western digits.

## Rules
1. One family for both languages: IBM Plex Sans Arabic, bound through Semantic `font/family`. Never Inter, Noto, SF Pro or IBM Plex Sans (Latin) on Syntropy text.
   Why: the built system resolves `font/family` to IBM Plex Sans Arabic in Arabic and English; one family keeps metrics consistent.
2. Load every font a script will touch before editing: all fonts already on the node (`getRangeAllFontNames`) and the one you are setting.
   Why: editing `characters` or `fontName` with an unloaded font throws and leaves half-edited layers.
3. Set `fontName` on empty text nodes explicitly. A range-based re-font loop skips them.
   Why: an empty node keeps its old font (often an unloadable legacy one) and later blocks loading and instancing for the whole component.
4. Apply one of the 37 Syntropy text styles (`await node.setTextStyleIdAsync(id)`); never set size, weight or line height by hand.
   Why: text styles carry the font variable bindings and the 1.5 line height that Arabic needs.
5. Letter spacing is 0 for Arabic. Never add tracking to Arabic text.
   Why: tracking breaks Arabic letter joining.
6. Arabic copy uses Western digits (0-9), currency after the amount (`1,250.00 ر.س`), percent labels start with «نسبة» (IRR uses «معدل»), no em dash.
   Why: Safqah locale rules.
7. Set text through the component's TEXT property when the node belongs to an instance; edit raw characters only on text you own.
   Why: raw edits inside instances are unbound overrides.

## The 37 text styles
Names exactly as in Figma (`references/data/text-styles.json`). All use `font/family`, line height 1.5, letter spacing 0.

| Group | Sizes and weights |
|---|---|
| caption | 9 regular (fine print only), 10 regular, 11 regular, 12 regular, 12 medium |
| body | 13 regular, medium, semibold · 14 regular, medium, semibold, bold · 16 regular, medium, semibold, bold |
| heading | 18 regular, semibold, bold · 20 regular, semibold, bold · 22 semibold, bold · 24 semibold, bold · 28 semibold, bold |
| display | 32 regular, semibold, bold · 36, 40, 48, 56, 64, 72 bold |

| Role | Style |
|---|---|
| Screen title in an app bar | `heading / 18 / semibold` |
| Section title | `heading / 20 / bold` or the `Section` component |
| Body text, list titles | `body / 16 / regular`, `body / 14 / medium` |
| Secondary text, hints | `body / 14 / regular` or `caption / 12 / regular` with `text/muted` |
| Big amount (portfolio, balance) | `display / 32 / bold` |
| Legal fine print only | `caption / 9 / regular (fine-print only)` |

## Safe font loading
```js
const FAMILY = 'IBM Plex Sans Arabic';
async function loadAllFor(node) {
  if (node.characters.length > 0) {
    for (const f of node.getRangeAllFontNames(0, node.characters.length)) await figma.loadFontAsync(f);
  } else if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName).catch(() => {});      // an old font may be unloadable
  }
}
async function setText(node, text, style = 'Regular') {
  await loadAllFor(node);
  await figma.loadFontAsync({ family: FAMILY, style });
  if (node.characters.length === 0) node.fontName = { family: FAMILY, style };   // empty nodes too
  node.characters = text;
  node.fontName = { family: FAMILY, style };
}
```
Applying a text style:
```js
// inside the Syntropy file
const styles = await figma.getLocalTextStylesAsync();
const body14 = styles.find(s => s.name === 'body / 14 / regular');
await figma.loadFontAsync(body14.fontName);
await node.setTextStyleIdAsync(body14.id);
// in other files: find the style key with search_design_system (entity "style"), then
// const style = await figma.importStyleByKeyAsync(key);
```

## Re-fonting a component safely
1. Walk every TEXT node, including hidden and empty ones (`findAll(n => n.type === 'TEXT')`).
2. Load the target fonts once.
3. For non-empty nodes, set the style or range font; for empty nodes, set `fontName` directly.
4. Re-run and confirm no node still reports the old family.

## Arabic and digits
| Do | Don't |
|---|---|
| «تاريخ الاستحقاق 15 مارس 2026» | «تاريخ الاستحقاق ١٥ مارس ٢٠٢٦» | <!-- syntropy-lint-disable-line: intentional example -->
| «نسبة صافي العائد 13.75%» | «صافي العائد 13.75%» or «%13.75» |
| «2,500.00 ر.س» | «ر.س 2,500.00» | <!-- syntropy-lint-disable-line: intentional example -->
| English names inside Arabic stay LTR: «صفقة جديدة: Riyadh Tower» | Reversing the English string |

## Sources
- `knowledge/tokens/text-styles.json`, `knowledge/foundations/figma/typography.md`
- `knowledge/ux/rtl.md` (R2, R4)
- `knowledge/content/numbers-currency.md`
