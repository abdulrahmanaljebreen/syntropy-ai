# Plugin API gotchas

Things that fail silently when building Syntropy in Figma. Check this list after every clone, resize, swap, variant change or component property edit.

## Rules
1. `clone()` strips `componentPropertyReferences`. After cloning a node inside a component, restore its `visible`, `characters` and `mainComponent` references.
   Why: the clone looks identical but its TEXT, BOOLEAN and INSTANCE_SWAP properties no longer drive it.
2. `resize()` sets both axes to fixed. Set `layoutSizingHorizontal` / `layoutSizingVertical` (`HUG`, `FILL`) after `resize()`, and after `appendChild` into the auto layout parent.
   Why: a hug frame silently becomes fixed and stops growing with Arabic text.
3. A clone of a COMPONENT is already a component. Do not call `createComponentFromNode` on it, and rename it before `combineAsVariants`.
   Why: wrapping it again nests a component inside a component.
4. INSTANCE_SWAP defaults and values take the component **id** (`icon.id`), not its key.
   Why: passing a key throws or leaves the placeholder.
5. TEXT, BOOLEAN and INSTANCE_SWAP property names carry a `#id` suffix (`Label#417:0`). Look the key up in `componentProperties`.
   Why: the bare name does nothing.
6. Wrong-case variant values (`Direction: 'RTL'` on a set whose values are `rtl`) are ignored or throw. Copy values from the index.
   Why: the instance stays on the default LTR variant and nobody notices until review.
7. Inside the Syntropy file, `importComponentSetByKeyAsync` returns a stale published copy with remote variables. Use `getNodeByIdAsync`.
   Why: it passes visual review and fails the audit.
8. Swapping an icon can drop its color binding. Re-bind the swapped icon's vector paints (fill or stroke, whichever it uses) to `icon/*`.
   Why: the new glyph arrives with its own default paint.
9. For RTL use the mirrored glyph (`Icon / arrow-right`, `Icon / chevron-left`), not `rotation = 180` or a negative scale.
   Why: flipped vectors keep the wrong export geometry and confuse code handoff.
10. Empty text nodes keep their old font when you re-font by range; set `fontName` directly on them.
    Why: one leftover unloadable font blocks the whole component from loading.
11. `layoutSizingHorizontal = 'FILL'` only works on a child of an auto layout frame. Append first, then set sizing.
    Why: setting it on an orphan throws.
12. `setBoundVariable('cornerRadius', v)` does not exist; bind the four corner fields.
    Why: the radius stays raw.
13. Gradient stops cannot bind to variables. Keep brand gradients only where the component already has them, and list them in the audit as gradient.
    Why: honest audit; do not invent new raw gradients.
14. Some text properties do not forward to nested components (for example action labels in `BottomSheet` vs its nested `Button`). Set the nested instance's own property.
    Why: editing raw text there creates an unbound override.
15. Per-tone icons in `Alert`, `Toast` and `Banner` are not variable-bound in the library. Do not "fix" them with local overrides; leave them and mention it if the audit flags them.
    Why: known library debt, fixed in the library, not in your screen.
16. `figma.currentPage = page` is not allowed in dynamic-page mode; use `await figma.setCurrentPageAsync(page)` and load pages before reading their children.
    Why: the sync setter throws.
17. Use the async getters (`getNodeByIdAsync`, `getVariableByIdAsync`, `getLocalTextStylesAsync`).
    Why: the sync versions throw in dynamic-page mode.

## Restoring property references after a clone
```js
const copy = original.clone();
// re-link the text to its TEXT property
const key = Object.keys(set.componentPropertyDefinitions).find(k => k.split('#')[0] === 'Title');
copy.findOne(n => n.type === 'TEXT' && n.name === 'Title').componentPropertyReferences = { characters: key };
// re-link an optional part to its BOOLEAN property
const showKey = Object.keys(set.componentPropertyDefinitions).find(k => k.split('#')[0] === 'Show description');
copy.findOne(n => n.name === 'Description').componentPropertyReferences = { visible: showKey };
```

## Resize then size
```js
frame.resize(358, 64);                 // both axes FIXED now
parent.appendChild(frame);
frame.layoutSizingHorizontal = 'FILL';
frame.layoutSizingVertical = 'HUG';    // restore hug after resize
```

## Sources
- Figma Plugin API reference (clone, resize, componentPropertyReferences, addComponentProperty)
- `knowledge/components/index.json` (Direction values per set)
- Known library debt recorded for `Alert`, `Toast`, `Banner` and `BottomSheet`
