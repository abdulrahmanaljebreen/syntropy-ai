# Figma MCP playbook: reading Syntropy itself

The Figma MCP server lets you read the Syntropy design system directly: search components, variables and styles, read a component's design context, take screenshots and read variable values. In research it is step zero: confirm what Syntropy already has before you look at other apps. It does not count toward the 2-tool limit. For building in Figma, use the syntropy-figma skill.

## At a glance
| Item | Detail |
|---|---|
| Server | Official Figma MCP (remote, `https://mcp.figma.com/mcp`). Tools appear as `mcp__claude_ai_Figma__*` when connected through Claude.ai, `mcp__figma__*` when added directly |
| Syntropy file | `a7Z956YZy9n6f9uz5DK16Y` ("Syntropy - Safqah Design System 2.0.0") |
| Syntropy Icons file | `DDI9ObV7rOP82XQ3OJzogv` (636 icons, 292 published) |
| Access | Paid: a Figma seat on the Safqah team (use the safqah.co Figma account) |
| Offline first | `references/data/components-index.json` answers names, variants, status and node ids without any Figma call |

## Library keys (verified 2026-10-15 with `get_libraries`)
| Library | Key |
|---|---|
| Syntropy - Safqah Design System 2.0.0 | `lk-6ab402548ad57b299026c7c0f549322a04c499160df6c6c3f00f29178bd5322304ee4493fb636a1ab9f98908f24b502404bd7f4a58cf3ac08e4b5ed754826f70` |
| Syntropy Icons | `lk-984cd83332b34410aa5efb2e1c35c45a8ff1f8b3b1dc060f9443105178fbcf1301da9da585639b360d0ca263bda032ee674535ac3974c023f2ebe850a03c173d` |

Always pass both in `includeLibraryKeys`. Legacy libraries (`Global_Design_System`, `Design_Team_Workspace`) and community kits (Material 3 Design Kit, iOS and iPadOS kits, Simple Design System) are not Syntropy; drop their results.

## Rules
1. Read the offline index first; call Figma only for what it lacks (a screenshot, live variable values, internal structure).
   Why: instant and costs no Figma quota.
2. Scope every `search_design_system` call to the two Syntropy keys.
   Why: legacy libraries return look-alikes with old tokens.
3. Open only nodes on numbered design system pages (the component sets and frames listed in the component index).
   Why: anything else is not the published system.
4. Never describe, link or screenshot a work-in-progress area, even if a search result points to it.
   Why: agents spread only the published system.
5. Use component and variant names verbatim (`Button`, `Variant=primary`, `Size=lg`).
   Why: names are the design to code contract.
6. Treat output as reference; map to tokens (`bg/brand/primary`, `space/lg`, `radius/default`), never raw values.
   Why: tokens carry light and dark modes.
7. Load `/figma-design-to-code` before `get_design_context`. Research is read-only: never write to the Syntropy file.
   Why: the server requires it, and the system file is maintained by the design team.

## Read-only tools
### `get_libraries`
`fileKey` (required), `offset`.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y"}
```

### `search_design_system`
| Parameter | Type | Required | Notes |
|---|---|---|---|
| `fileKey` | string | yes | Use the Syntropy file |
| `queries` | array of `{entity, query}` | yes | `entity` is `component`, `variable` or `style`; one intent per query; batch all queries in one call |
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
Structure overview (XML of node ids, names, sizes); omit `nodeId` to list pages.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2"}
```

### `get_screenshot`
`fileKey`, `nodeId` (required); `maxDimension` (default 1024), `contentsOnly`, `enableBase64Response` (only when you cannot fetch URLs).
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2", "maxDimension": 1024}
```

### `get_design_context`
Reference code plus screenshot for a node; load `/figma-design-to-code` first.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2", "clientLanguages": "unknown", "clientFrameworks": "unknown"}
```

### `get_variable_defs`
Variables used by a node, with values.
```json
{"fileKey": "a7Z956YZy9n6f9uz5DK16Y", "nodeId": "417:2"}
```

## Example research queries
| Need | Components or variables to search |
|---|---|
| Deal page | `CardDeal`, `CardDeal / Metric`, `DealTimeline`, `Guarantees`, `Distribution-schedule` |
| Invest and reserve | `Checkout`, `Investment-amount`, `Countdown`, `Reservation-Calculater` |
| KYC | `KYCStep`, `KYCChecklist`, `KYCTaskRow`, `File Item with Progress`, `Upload Button` |
| Wallet and cash-out | `WalletChip`, `MoneyAmount`, `Input Amount`, `Keypad / Amount hero` |
| Portfolio | `PortfolioHeader`, `ReturnsDisplay`, `BalanceToggle` |
| Payouts | `Payouts cell`, `Distribution-schedule` |
| Goals | `GoalTracker`, `GoalActivate`, `Goal / PhaseRow` |
| Empty states | `EmptyState`, `Empty Illustration / default / Default` |
| Notifications | `Banner`, `Toast`, `Alert`, `Switch` |
| Back-office | `Table / Cell`, `Table / Toolbar`, `Pagination`, `Filter menu` |
| Tokens | `bg/brand/primary`, `text/muted`, `space/lg`, `radius/default` |

## Watch-outs
- Results may include components from other subscribed libraries; drop anything whose key is not one of the two above.
- Variant counts are large (`Button` has 216); read `props` in the index instead of screenshotting every variant.

## Cost
Figma seat, rate-limited per seat; batch `search_design_system` queries into one call.

## Sources
- Figma MCP `get_libraries` on `a7Z956YZy9n6f9uz5DK16Y`, 2026-10-15; tool schemas loaded 2026-10-15
- https://developers.figma.com/docs/figma-mcp-server/
