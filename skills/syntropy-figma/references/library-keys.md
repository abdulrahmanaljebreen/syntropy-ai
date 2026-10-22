# Library keys, component ids and component keys

How to find the right Syntropy library, component and icon, and how to tell Syntropy results apart from legacy look-alikes. Open this before any `search_design_system` call or any import.

## Rules
1. Read `references/data/components-index.json` first; it has every id, key, prop and Direction value, and costs no Figma call.
   Why: the mirror is instant and exact; search is fuzzy and returns legacy results.
2. Pass both Syntropy library keys in `includeLibraryKeys` on every `search_design_system` call, then still drop any result whose library is not Syntropy.
   Why: the Safqah organisation also subscribes to `Global_Design_System` and `Design_Team_Workspace`, whose components look the same but carry old variables.
3. A component id (`417:2`) is valid only inside the Syntropy file; a component key (`69f940f6...`) is how you import into any other file.
   Why: node ids are file-local.
4. Use the set key (the entry with `kind: "set"`) with `importComponentSetByKeyAsync`, and a standalone key (`kind: "component"`) with `importComponentByKeyAsync`.
   Why: the wrong call throws "not found" even though the key is right.
5. Never use an entry with `status: "wip"`, and check `published` before promising an import outside the Syntropy file.
   Why: wip entries are not the system; unpublished sets cannot be imported.

## The two libraries
| Library | File key | Library key (prefix) | Use for |
|---|---|---|---|
| Syntropy - Safqah Design System 2.0.0 | `a7Z956YZy9n6f9uz5DK16Y` | `lk-6ab40254...` | Components, variables, text styles, effect styles |
| Syntropy Icons | `DDI9ObV7rOP82XQ3OJzogv` | `lk-984cd833...` | Every icon (`Icon / kebab-case-name`) |

Full keys (verified 15 Oct 2026 with `get_libraries`):
```
lk-6ab402548ad57b299026c7c0f549322a04c499160df6c6c3f00f29178bd5322304ee4493fb636a1ab9f98908f24b502404bd7f4a58cf3ac08e4b5ed754826f70
lk-984cd83332b34410aa5efb2e1c35c45a8ff1f8b3b1dc060f9443105178fbcf1301da9da585639b360d0ca263bda032ee674535ac3974c023f2ebe850a03c173d
```

## Reading an index entry
```json
{
  "id": "417:2", "name": "Button", "kind": "set", "page": "button", "pageCode": "02a",
  "status": "stable", "published": true,
  "key": "69f940f6f7aa57f1a5c0637e6f128a63a1f7c6f4",
  "props": [
    { "name": "Label", "type": "TEXT", "default": "Button" },
    { "name": "Variant", "type": "VARIANT", "options": ["primary","secondary","tertiary","destructive","error","text"] },
    { "name": "Size", "type": "VARIANT", "options": ["lg","md","sm"] },
    { "name": "State", "type": "VARIANT", "options": ["default","hover","pressed","focused","disabled","loading"] },
    { "name": "Direction", "type": "VARIANT", "options": ["ltr","rtl"] }
  ],
  "frames": { "doc": "465:2", "reference": "616:2383" }
}
```
- `name` and `options` are the Figma values to pass to `setProperties`. `canonical` and `canonicalOptions` are the code names (see syntropy-code-adapters); do not pass them to Figma.
- `frames.reference` is the labelled matrix to screenshot before you build.

## Worked examples (from the index)
| Component | Set id | Key (start) | Published | Direction values |
|---|---|---|---|---|
| `Button` | `417:2` | `69f940f6` | yes | `ltr` / `rtl` |
| `IconButton` | `502:729` | `859368d5` | yes | `ltr` / `rtl` |
| `Input Field` | `826:579` | `4875b185` | yes | `ltr` / `rtl` |
| `StatusPill` | `1654:178` | `e7921991` | yes | `LTR` / `RTL` |
| `Badge Dot` | `1322:63` | `cf4a0966` | yes | none |
| `Tag` | `1306:63` | `3d0139ba` | no (DS file only) | `ltr` / `rtl` |
| `ListItem` | `3212:1071` | `062ceb8d` | yes | `LTR` / `RTL` |
| `ActionList` | `3222:1092` | `946153bf` | yes | `LTR` / `RTL` |
| `BottomSheet` | `2634:273` | `6bbe2ada` | yes | `LTR` / `RTL` |
| `TabBar` | `2527:350` | `e7e23ed6` | yes | `LTR` / `RTL` |
| `CardDeal` | `3013:95390` | `b755c964` | yes | `RTL` / `LTR` |
| `dealTags` | `3023:39526` | `75c22654` | yes | none |
| `Header` | `4844:107612` | `57825a8b` | no (DS file only) | `Language=Arabic` / `English` |

Always take the full key from the index; the short prefixes above are for recognition only.

## Finding an entry fast
```bash
node -e "const d=require('./references/data/components-index.json');for(const c of d.components)if(/button/i.test(c.name)&&c.status==='stable')console.log(c.kind,c.id,c.key,c.name,c.published)"
```

## Searching Figma
```json
{
  "fileKey": "<the file you are working in>",
  "includeLibraryKeys": ["lk-6ab402548ad5...", "lk-984cd83332b3..."],
  "queries": [
    { "entity": "component", "query": "bottom sheet" },
    { "entity": "component", "query": "Icon / arrow-right" },
    { "entity": "variable", "query": "bg/brand/primary" },
    { "entity": "style", "query": "body / 14 / regular" }
  ]
}
```
Then keep only results whose library name is `Syntropy - Safqah Design System 2.0.0` or `Syntropy Icons`.

| Result looks like | Verdict |
|---|---|
| Library `Global_Design_System`, `Design_Team_Workspace` | Legacy. Drop. |
| Variable named with capitals and a path such as `Background/bg-brand`, `Colors/Primitive/...` | Old library variable. Drop. |
| Material 3 Design Kit, iOS and iPadOS kits, Simple Design System | Community kit. Drop (iOS system chrome such as the status bar or keyboard is the only exception, and only when the person asks for it). |
| Component name not in the index | Not Syntropy, or a wip area. Drop and do not describe it. |

## Icons
- Icon names are `Icon / kebab-case-name` (`Icon / wallet-add`, `Icon / chevron-left`), 24 px (602 icons) and 12 px (34 icons).
- Icon keys live in the Syntropy Icons file; find them with `search_design_system` scoped to the icons key, then `importComponentByKeyAsync(key)`.
- Directional pairs exist for RTL: `chevron-left` / `chevron-right`, `arrow-left` / `arrow-right`, `chevrons-left` / `chevrons-right`, `move-left` / `move-right`, `sidebar-left` / `sidebar-right`.

## Sources
- `knowledge/components/index.json` (Syntropy file `a7Z956YZy9n6f9uz5DK16Y`, synced 15 Oct 2026)
- `knowledge/research/figma-mcp.md` (library keys verified with `get_libraries`)
- `knowledge/icons/icons.json` (Syntropy Icons `DDI9ObV7rOP82XQ3OJzogv`)
