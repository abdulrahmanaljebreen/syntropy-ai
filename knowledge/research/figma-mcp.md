# Figma MCP: reading Syntropy itself

The Figma MCP server lets an agent read the Syntropy design system directly: search components, variables and styles, read a component's design context, take screenshots and read variable values. Use it as research step zero: before looking at other apps, confirm what Syntropy already has.

## What it is

| Item | Detail |
|---|---|
| Server | Official Figma MCP (remote). In Claude Code the tools appear as `mcp__claude_ai_Figma__*` when connected through Claude.ai, or `mcp__figma__*` when added directly |
| Syntropy file | `a7Z956YZy9n6f9uz5DK16Y` ("Syntropy - Safqah Design System 2.0.0") |
| Syntropy Icons file | `DDI9ObV7rOP82XQ3OJzogv` (636 icons, 292 published) |
| Access | Figma seat with access to the Safqah team; use the safqah.co Figma account |
| Offline mirror | `knowledge/components/index.json`, `knowledge/tokens/*.json`, `knowledge/icons/icons.json` (read these first; they are faster and need no Figma call) |

## Library keys (verified 2026-10-15 with `get_libraries`)

| Library | Key |
|---|---|
| Syntropy - Safqah Design System 2.0.0 | `lk-6ab402548ad57b299026c7c0f549322a04c499160df6c6c3f00f29178bd5322304ee4493fb636a1ab9f98908f24b502404bd7f4a58cf3ac08e4b5ed754826f70` |
| Syntropy Icons | `lk-984cd83332b34410aa5efb2e1c35c45a8ff1f8b3b1dc060f9443105178fbcf1301da9da585639b360d0ca263bda032ee674535ac3974c023f2ebe850a03c173d` |

Always pass both in `includeLibraryKeys`. Other files in the Safqah organisation subscribe to legacy libraries named `Global_Design_System` and `Design_Team_Workspace`; their results are outdated and must be filtered out. Community kits (Material 3 Design Kit, iOS and iPadOS 26 or 27, Simple Design System) are also not Syntropy.

## Rules

1. Read `knowledge/` first; call Figma only when you need something the mirror lacks (a screenshot, live variable values, a component's internal structure).
   Why: the mirror is instant and costs no Figma quota.
2. Scope every `search_design_system` call to the two Syntropy library keys.
   Why: legacy libraries return look-alike components with old tokens.
3. Only open nodes on numbered design system pages (component sets, their doc frames and reference frames listed in `knowledge/components/index.json` under `frames`).
   Why: work-in-progress areas, labs and product files are not the system and may change or be wrong.
4. Never describe, link or screenshot a work-in-progress area, even if a search result points to it.
   Why: agents must only spread the published system.
5. Use component and variant names verbatim from results (`Button`, `Variant=primary`, `Size=lg`).
   Why: names are the contract between design and code.
6. Treat the Figma output as reference, not final code. Map it to Syntropy tokens (`bg/brand/primary`, `space/lg`, `radius/default`), never to raw hex or pixel values.
   Why: tokens carry light and dark modes.
7. Before calling `get_design_context`, load the `/figma-design-to-code` skill (required by the server); before any write (`use_figma`), load `/figma-use`. Research is read-only: do not write to the Syntropy file.
   Why: the server enforces these workflows, and the system file is maintained by the design team.

## Agent tools for research (read-only)

### `get_libraries`
| Parameter | Type | Required |
|---|---|---|
| `fileKey` | string | yes |
| `offset` | integer | no |
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y"}
```

### `search_design_system`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `fileKey` | string | yes | Context file, use the Syntropy file |
| `queries` | array of `{entity, query}` | yes | `entity` is `component`, `variable` or `style`; one intent per query; batch all needed queries in one call |
| `includeLibraryKeys` | string[] | no | Always the two Syntropy keys |
| `disableCodeConnect` | boolean | no | |
```json
{
  "fileKey": "a7Z956YZy9n6f9uz5DK16Y",
  "includeLibraryKeys": ["lk-6ab402548ad57b299026c7c0f549322a04c499160df6c6c3f00f29178bd5322304ee4493fb636a1ab9f98908f24b502404bd7f4a58cf3ac08e4b5ed754826f70", "lk-984cd83332b34410aa5efb2e1c35c45a8ff1f8b3b1dc060f9443105178fbcf1301da9da585639b360d0ca263bda032ee674535ac3974c023f2ebe850a03c173d"],
  "queries": [{"entity": "component", "query": "bottom sheet"}, {"entity": "variable", "query": "bg/brand/primary"}]
}
```

### `get_metadata`
Structure overview (XML of node IDs, names, sizes). Omit `nodeId` to list pages.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2"}
```

### `get_screenshot`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `fileKey` | string | yes | |
| `nodeId` | string | yes | e.g. a reference frame from `index.json` `frames.reference` |
| `maxDimension` | integer | no | Default 1024 |
| `contentsOnly` | boolean | no | |
| `enableBase64Response` | boolean | no | Only when you cannot fetch URLs |
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "616:2383", "maxDimension": 1024}
```

### `get_design_context`
Reference code plus screenshot for a node. Load `/figma-design-to-code` first.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2", "clientLanguages": "unknown", "clientFrameworks": "unknown"}
```

### `get_variable_defs`
Variables used by a node, with values.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2"}
```

## Example research queries for Safqah

| Need | Query |
|---|---|
| Deal page parts | `search_design_system` components `CardDeal`, `HeaderCard`, `DealTimeline`, `Guarantees` |
| Invest and reserve | components `Checkout`, `Investment-amount`, `Countdown`, `Reservation-Calculater` |
| KYC | components `KYCStep`, `KYCChecklist`, `File Item with Progress`, `Upload Button` |
| Wallet and cash-out | components `WalletChip`, `MoneyAmount`, `Input Amount`, `Keypad / Amount hero` |
| Portfolio | components `PortfolioHeader`, `ReturnsDisplay`, `BalanceToggle` |
| Payouts | components `Payouts cell`, `Distribution-schedule` |
| Goals | components `GoalTracker`, `GoalActivate`, `Goal / PhaseRow` |
| Empty states | components `EmptyState`, `Empty Illustration / default / Default` |
| Notifications | components `Banner`, `Toast`, `Alert`, `Switch` |
| Back-office tables | components `Table / Cell`, `Table / Toolbar`, `Pagination`, `Filter menu` |
| Tokens | variables `bg/brand/primary`, `text/muted`, `space/lg`, `radius/default` |
| Icons | components in the Icons library, e.g. `wallet`, `calendar` (check `knowledge/icons/icons.json` first) |

## Watch-outs

- Results can include components from other subscribed libraries; drop anything whose library key is not one of the two above.
- A published remote copy of a component can carry remote variables. When building inside the Syntropy file, instance local component sets by node ID, not by importing the published key.
- Variant counts are large (`Button` has 216). Read `props` in `index.json` instead of screenshotting every variant.
- Screenshots of doc frames are for your understanding. Present the person with `knowledge/examples/components/<page>/*.png` when available.

## Cost and access

- Requires a Figma seat on the Safqah team. Calls are rate-limited per seat; batch `search_design_system` queries into one call.

## Setup

| Client | How |
|---|---|
| Claude Code | Connect Figma in Claude.ai Connectors (tools appear as `mcp__claude_ai_Figma__*`), or `claude mcp add --transport http figma https://mcp.figma.com/mcp` |
| Cursor | Settings, MCP: `{"figma": {"url": "https://mcp.figma.com/mcp"}}`, then authorise |
| Claude.ai | Settings, Connectors, Figma |

Docs: https://developers.figma.com/docs/figma-mcp-server/

## Sources
- Figma MCP `get_libraries` on `a7Z956YZy9n6f9uz5DK16Y`, run 2026-10-15
- Figma MCP tool schemas, loaded 2026-10-15
- `knowledge/components/index.json` (source file and frames), `knowledge/icons/icons.json`
