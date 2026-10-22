---
name: syntropy-figma
description: Builds and edits Safqah screens and components in Figma with the Figma MCP (use_figma, search_design_system, get_design_context, get_variable_defs, get_screenshot) using only the Syntropy design system. Use whenever an agent is asked to design, mock up, build, fix, tidy, audit or extend anything in Figma for Safqah or Syntropy: a new screen or flow, an RTL Arabic screen, an English LTR twin, a new component or variant, rebinding colors to tokens, swapping icons, or checking that a frame has no raw values. Covers instancing from the published Syntropy library (and local component sets inside the Syntropy file), binding colors, spacing, radius and type to Semantic variables, the 37 text styles, IBM Plex Sans Arabic, atoms-first construction, Direction variants, Syntropy Icons, Plugin API gotchas (clone, resize, INSTANCE_SWAP) and the paint audit to run before saying done. Triggers: Figma, use_figma, Syntropy, Safqah screen, frame, variant, component set, bind variable, token audit, RTL screen.
---

# Syntropy in Figma

## Purpose
Build Safqah screens and components in Figma that are made only of Syntropy: real component instances, Semantic variables, Syntropy text styles and Syntropy Icons, with RTL as the canonical direction. Every frame you hand over passes a paint audit with zero raw or legacy values.

## Hard rules
1. **Work only in the file and on the page the person names.** Never create, move or edit nodes anywhere else, and never open, describe or link work-in-progress areas of the Syntropy file.
   Why: the Syntropy file is a shared, published contract; stray edits ship to every consumer.
2. **Instance, never redraw.** Every button, input, chip, list row, sheet, bar and icon is an instance of a Syntropy component. If none fits, stop and say so.
   Why: a redrawn look-alike never receives library updates and breaks the design to code contract.
3. **Outside the Syntropy file, import from the published Syntropy library only** (library key prefix `lk-6ab40254` for the design system, `lk-984cd833` for icons). Filter every `search_design_system` result by library and drop `Global_Design_System`, `Design_Team_Workspace` and community kits.
   Why: legacy libraries return look-alike components bound to old variables.
4. **Inside the Syntropy file (`a7Z956YZy9n6f9uz5DK16Y`), instance LOCAL component sets by node id** (`figma.getNodeByIdAsync('417:2')`). Never call `importComponentSetByKeyAsync` there.
   Why: inside the source file it returns a stale published copy that carries remote variables.
5. **Bind every color to a Semantic variable by category:** text fills to `text/*`, frame and shape fills to `bg/*`, strokes to `border/*`, vector and icon paints to `icon/*`. Never raw hex, never a Primitive (`Color/...`), never an old-library variable (capitalised names such as `Background/bg-brand`).
   Why: only Semantic variables carry Light and Dark modes and match the code token names.
6. **Bind geometry and type too:** corner radii (`topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius`) to `radius/*`, padding and `itemSpacing` to `space/*`, text through one of the 37 Syntropy text styles (which bind `font/size/*`, `font/weight/*` and `font/family`).
   Why: a raw 16 is not `space/lg`; only bound values survive a token change.
7. **One font: IBM Plex Sans Arabic for Arabic and English**, bound through Semantic `font/family`. Load every font before editing text, and set `fontName` on empty text nodes as well.
   Why: an unloaded font throws mid-script; empty nodes keep the old font and later block instancing.
8. **Atoms first.** Build atoms, then molecules, then the organism, each as its own component. Never ship one big inline composition. Chips are always `Tag`, `Badge Dot`, `Badge Count`, `StatusPill` or `dealTags`; never a custom chip.
   Why: atoms are what make a component reusable, auditable and mappable to code.
9. **Icons come only from Syntropy Icons** (`Icon / kebab-case-name`, file `DDI9ObV7rOP82XQ3OJzogv`). Never paste Streamline or other SVGs, never `createNodeFromSvg` an icon. For RTL use the mirrored glyph (`Icon / arrow-right` for back in RTL) instead of flipping, and re-tint swapped icons with `icon/*`.
   Why: pasted SVGs are unbound and unpublished; flipped vectors render wrong in code.
10. **Direction is a variant: build RTL screens with RTL variants.** Copy the exact property and value from the component index (`Direction=RTL`, `Direction=rtl` or `Language=Arabic`).
    Why: values differ per set, and a wrong case silently falls back to the default LTR variant.
11. **Use only components with `status: "stable"`** in `references/data/components-index.json`. Check `published`: an unpublished set can only be used inside the Syntropy file; elsewhere, report the gap instead of rebuilding it.
    Why: anything else is not part of the system agents may spread.
12. **Minimal copy on canvas.** A label, the control and at most one short hint. Screen captions read "This is the screen when the user ...". Never number screens.
    Why: matches the restraint of Safqah's own screens; numbers go stale the moment a flow changes.
13. **Audit before claiming done.** Walk every node, classify every visible SOLID paint as local-semantic, library-semantic, primitive, legacy/remote or raw, and report the counts. Done means zero raw, zero primitive and zero legacy.
    Why: an unaudited frame almost always hides a few raw paints from pasted or cloned layers.
14. **Never use the em dash character** in any layer name, text, caption or description.
    Why: Syntropy writing rule.

## Workflow
1. **Pin the target.** Get the file key, page and frame or section from the person (parse the URL: `node-id=12-34` becomes `12:34`). If the page is not named, ask. Note whether the file is the Syntropy file itself (rule 4) or a consuming file (rule 3).
2. **Load the Figma skills the server requires:** `/figma-use` before any `use_figma` call, `/figma-design-to-code` before `get_design_context`.
3. **Read the offline mirror first.** Open `references/data/components-index.json` for component ids, keys, props, Direction values, `status` and `published`; `references/data/tokens-resolved.json` for token names; `references/data/text-styles.json` for the 37 styles. See `references/library-keys.md`.
4. **Search Figma only for what the mirror lacks:** `search_design_system` with both Syntropy library keys in `includeLibraryKeys`; drop every result whose library is not Syntropy.
5. **Look before building.** `get_screenshot` the component's reference frame (`frames.reference` in the index) or the target frame. Use `get_design_context` to read structure, never to paste generated code.
6. **Plan the decomposition** (`references/atoms-first.md`): list the screen's sections, the Syntropy component for each, and any missing atom. If something is missing, stop and tell the person before drawing anything.
7. **Build the chassis** (`references/building-screens.md`): frame size, auto layout, safe areas, `bg/*` fill, RTL.
8. **Instance components** (`references/local-components.md`), set variants with `setProperties`, set text through the property keys (`Label#417:0` style), swap icons through INSTANCE_SWAP properties.
9. **Bind everything** (`references/variables-binding.md`): colors by category, radii, padding, gaps, text styles.
10. **Text and fonts** (`references/text-and-fonts.md`): load fonts, set empty nodes, Arabic first copy, Western digits.
11. **Check the gotchas** (`references/gotchas.md`) for every clone, resize, swap and component property you touched.
12. **Audit** (`references/audit.md`): run the paint audit script, fix every raw, primitive or legacy paint, run it again, then `get_screenshot` and compare against the reference.
13. **Report**: what you built, where (page and node ids), the audit counts, and any gap you could not fill.

## Decision tables

### Which way to get a component
| Situation | Do | Not |
|---|---|---|
| Working inside the Syntropy file | `figma.getNodeByIdAsync('<set id>')`, pick the variant child, `createInstance()` | `importComponentSetByKeyAsync` (stale copy, remote variables) |
| Working in a product file or any other file | `figma.importComponentSetByKeyAsync('<key from index>')` | Copy-pasting a node from another file |
| `search_design_system` returns `Global_Design_System` or `Design_Team_Workspace` | Drop it, search again scoped to Syntropy keys | Use it because it "looks the same" |
| Component has `published: false` and you are outside the Syntropy file | Place its published route, or an empty frame named `<Component> · <variants>` plus the copy link from the Syntropy file in the handoff | Rebuild it locally |
| Component has `status: "wip"` | Do not use it, do not mention it | Use it as a reference |
| No Syntropy component fits | Stop, describe the gap, propose atoms | Draw a custom one inline |

### Which token for which paint
| Node and property | Token family | Example |
|---|---|---|
| TEXT fill | `text/*` | `text/default`, `text/muted`, `text/brand/primary`, `text/on-brand` |
| FRAME, RECTANGLE, ELLIPSE fill | `bg/*` | `bg/surface` (screen), `bg/base`, `bg/elevated` (card), `bg/brand/primary` |
| Any stroke | `border/*` | `border/default`, `border/subtle`, `border/brand/primary`, `border/focus` |
| VECTOR, BOOLEAN_OPERATION, icon paints | `icon/*` | `icon/default`, `icon/muted`, `icon/brand/primary`, `icon/on-brand` |
| Warning tone | `*/warning` family (yellow-orange) | `bg/warning-subtle` + `text/warning` |
| Critical only (defaulted, blocking error) | `*/error` family | `text/error` |

### Which chip
| Need | Component |
|---|---|
| Category or filter label ("عقاري", "Real Estate") | `Tag` (Tone, Size, Style) |
| Count on an icon or tab | `Badge Count` |
| Presence dot | `Badge Dot` |
| Status of a deal, payout, request | `StatusPill` (Tone, Variant subtle or solid) |
| Deal tier or deal marker on a deal card | `dealTags` (Type) |

### Which Direction value
| Set | Property and values (copy from the index) |
|---|---|
| `Button`, `Input Field`, `Switch`, `Checkbox`, `Tag`, `Tag Group` | `Direction=ltr` / `rtl` |
| `StatusPill`, `Stat`, `KeyValue`, `Alert`, `Banner`, `Toast`, `ListItem`, `ActionList`, `BottomSheet`, `TabBar`, `AppBar` | `Direction=LTR` / `RTL` |
| `CardDeal` | `Direction=RTL` / `LTR` |
| `Header` | `Language=Arabic` / `English` |
| `Divider`, `Avatar` | No Direction property: place them inside an RTL auto layout parent |

## Self-check before answering
- [ ] I touched only the file and page the person named, and nothing in a work-in-progress area.
- [ ] Every UI element is a Syntropy instance with `status: "stable"`; nothing is redrawn; no legacy library component is present.
- [ ] Inside the Syntropy file I used local sets by id; elsewhere I imported by key from the Syntropy library only.
- [ ] Every component in an Arabic screen uses its RTL Direction value, copied verbatim.
- [ ] The audit script reports 0 raw, 0 primitive, 0 legacy/remote paints; I quoted the counts.
- [ ] Radii, padding and gaps are bound to `radius/*` and `space/*`; text uses Syntropy text styles; font is IBM Plex Sans Arabic.
- [ ] Icons are Syntropy Icons; RTL uses mirrored glyphs; swapped icons are re-tinted with `icon/*`.
- [ ] Chips are `Tag`, `Badge Dot`, `Badge Count`, `StatusPill` or `dealTags`.
- [ ] Copy is minimal, Arabic first, Western digits, currency after the amount (`1,250.00 ر.س`), no em dash.
- [ ] Captions start "This is the screen when the user ..."; no screen numbers.
- [ ] I compared a screenshot with the reference and reported node ids plus any gaps.

## References
| File | Open it when |
|---|---|
| `references/library-keys.md` | Finding the right library, component id, component key, icon key, or filtering search results |
| `references/local-components.md` | Instancing: local sets by id inside Syntropy, import by key elsewhere, setProperties, property keys |
| `references/variables-binding.md` | Binding colors, radii, padding, gaps and fonts to variables; resolving modes |
| `references/atoms-first.md` | Building or extending a component: decomposition, variant sets, component properties |
| `references/building-screens.md` | Starting a screen: frame sizes, auto layout, safe areas, RTL, captions |
| `references/text-and-fonts.md` | Editing any text: font loading, empty nodes, text styles, Arabic and digits |
| `references/gotchas.md` | After any clone, resize, swap or property edit; when something silently fails |
| `references/audit.md` | Before saying done: the paint audit script and how to read its output |
| `references/data/components-index.json` | Generated: every component, its id, key, props, Direction values, status, published |
| `references/data/tokens-resolved.json` | Generated: every token with Light and Dark values |
| `references/data/text-styles.json` | Generated: the 37 text styles |

For choosing the right token by role see syntropy-foundations; for writing the code side of a screen see syntropy-code-adapters.
