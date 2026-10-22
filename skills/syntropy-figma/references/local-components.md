# Instancing Syntropy components

How to place a Syntropy component with `use_figma`: local sets by node id inside the Syntropy file, published sets by key everywhere else, then variants, text, booleans and icon swaps through component properties.

## Rules
1. Inside the Syntropy file (`a7Z956YZy9n6f9uz5DK16Y`) get the set with `figma.getNodeByIdAsync(id)`. Never `importComponentSetByKeyAsync` there.
   Why: inside the source file the import returns a stale published copy whose fills point at remote variables; it looks right and fails the audit.
2. In any other file import with `importComponentSetByKeyAsync(key)` (sets) or `importComponentByKeyAsync(key)` (standalone components and icons), keys from the index.
   Why: keys are stable across files; ids are not.
3. Start from `set.defaultVariant` (or the exact child), then call `instance.setProperties({...})` with Figma names and values copied from the index.
   Why: a misspelled or wrong-case value is ignored silently and leaves the default (usually LTR).
4. TEXT, BOOLEAN and INSTANCE_SWAP property keys carry a suffix (`Label#417:0`). Read `instance.componentProperties` and match on the part before `#`.
   Why: `setProperties({ Label: '...' })` throws or does nothing; the real key has the suffix.
5. Change content through properties, never by editing a nested layer inside the instance, and never detach.
   Why: overrides on nested layers are lost when the library updates; a detached instance is no longer Syntropy.
6. When a property does not reach a nested part (for example a BottomSheet action label that does not forward to its nested `Button`), set the nested instance's own property, not the raw text node.
   Why: known library debt; editing the raw text is an unbound override.

## Inside the Syntropy file
```js
// use_figma, file a7Z956YZy9n6f9uz5DK16Y
const set = await figma.getNodeByIdAsync('417:2');            // Button set, local
if (!set || set.type !== 'COMPONENT_SET') throw new Error('Button set not found');
const btn = set.defaultVariant.createInstance();
btn.setProperties({ Variant: 'primary', Size: 'lg', State: 'default', Direction: 'rtl' });
const labelKey = Object.keys(btn.componentProperties).find(k => k.split('#')[0] === 'Label');
btn.setProperties({ [labelKey]: 'استثمر الآن' });
parentFrame.appendChild(btn);
btn.layoutSizingHorizontal = 'FILL';                           // after appendChild into auto layout
```

## In a product file or any other file
```js
// use_figma, any file that is not the Syntropy file
const set = await figma.importComponentSetByKeyAsync('69f940f6f7aa57f1a5c0637e6f128a63a1f7c6f4'); // Button
const btn = set.defaultVariant.createInstance();
btn.setProperties({ Variant: 'secondary', Size: 'md', Direction: 'rtl' });
```
If the import throws, check `published` in the index. An unpublished set (for example `Tag`, `Header`) cannot be imported; tell the person and do not rebuild it.

## Icons
```js
const icon = await figma.importComponentByKeyAsync('<key of Icon / arrow-right from Syntropy Icons>');
const swapKey = Object.keys(btn.componentProperties).find(k => k.split('#')[0] === 'Icon leading');
btn.setProperties({ [Object.keys(btn.componentProperties).find(k => k.startsWith('Has icon leading'))]: true });
btn.setProperties({ [swapKey]: icon.id });                     // INSTANCE_SWAP takes a component id
```
After a swap, check the icon's vector paints: re-bind them to an `icon/*` variable if they lost the binding (see `variables-binding.md`).

## Picking the right variant
| You need | Set to |
|---|---|
| Arabic screen | the RTL value of that set (`rtl`, `RTL` or `Language=Arabic`) |
| Primary CTA | `Button` `Variant=primary`, `Size=lg` |
| Secondary action next to a primary | `Button` `Variant=secondary` or `tertiary`, same Size |
| Destructive confirm | `Button` `Variant=destructive` |
| Disabled look | `State=disabled` on the instance; never lower opacity by hand |
| Deal card in a list | `CardDeal` `Layout=Row`, `State=Available`, `Direction=RTL` |
| Settings group | `ActionList` `Style=Grouped` with `ListItem` rows |

## Do and Don't
| Do | Don't |
|---|---|
| `getNodeByIdAsync('1654:178')` for `StatusPill` inside the Syntropy file | `importComponentSetByKeyAsync('e7921991...')` inside the Syntropy file |
| `setProperties({ Tone: 'warning', Direction: 'RTL' })` on `StatusPill` | Recolor the pill's fill to orange |
| Swap `Icon leading` to `Icon / arrow-right` for an RTL back action | Rotate or scale `Icon / arrow-left` by -1 |
| Report "`Tag` is unpublished, I cannot import it into this file" | Draw a rounded rectangle with text and call it a tag |

## Sources
- `knowledge/components/index.json`
- `knowledge/guides/contributing.md` (golden rules)
- Figma Plugin API: `ComponentSetNode.defaultVariant`, `InstanceNode.setProperties`, `componentProperties`
