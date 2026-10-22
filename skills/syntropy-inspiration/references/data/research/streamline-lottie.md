# Icons and motion: Syntropy Icons, Streamline, Lottie

How to research icons and motion for Safqah. Syntropy Icons are always the answer first. Streamline is used only to propose a missing icon from the same family Syntropy was drawn from. Lottie is a reference source for motion, not a source of shipped assets.

## Rules

1. Search `knowledge/icons/icons.json` (636 icons, 15 categories, sizes 12 and 24) before anything else.
   Why: an icon that exists must be reused, never redrawn or replaced.
2. Search by meaning, not by name: use the `words` field and the category (`Financial / Fintech`, `Status & Feedback`, `Time & Calendar`, `Files & Data`, `Visibility & Security`).
   Why: the icon you need often exists under another name.
3. Use Streamline only to propose a missing icon, and only from the Sharp Line set (`setSlug: "sharp-line-style"`, family `sharp-sets`).
   Why: Syntropy Icons are drawn in that style: 24px grid, 2px stroke, square caps, zero-radius miter corners; any other family breaks the system.
4. A proposed icon is a proposal, never a shipped asset. Present it to the person with its Streamline name and hash and wait for the design team to add it to the Syntropy Icons file.
   Why: icons are licensed, named and published through the system.
5. Never mix families, never take a Fill or Duo variant, never recolor beyond `icon/*` tokens.
   Why: mixed families read as broken UI.
6. Directional icons (arrows, chevrons, back, send, progress) mirror in RTL; non-directional ones (search, clock, check, currency, play) do not.
   Why: Material 3 and Apple HIG bidirectionality rules.
7. Lottie animations are references for timing and choreography. Rebuild motion with Syntropy assets and the platform motion guidance; do not ship a third-party Lottie with its own colors or characters.
   Why: brand, license and performance.

## Syntropy Icons (first stop)

| Item | Detail |
|---|---|
| File | `DDI9ObV7rOP82XQ3OJzogv` |
| Figma library key | `lk-984cd833...` (full key in `figma-mcp.md`) |
| Offline index | `knowledge/icons/icons.json`: `name`, `slug`, `words`, `category`, `size`, `id`, `key`, `published` |
| Illustrations | `knowledge/icons/illustrations.json` (isometric status illustrations; use `Illustrations` and `Empty Illustration / *` components) |

Example lookup (shell):
```bash
python3 -c "import json;d=json.load(open('knowledge/icons/icons.json'));print([i['slug'] for i in d['icons'] if 'wallet' in ' '.join(i['words'])])"
```

## Streamline (proposal only)

Streamline (streamlinehq.com) is the source family of Syntropy Icons. Connector in Claude.ai; tools appear as `mcp__claude_ai_Streamline__*`.

### Tools

| Tool | Use | Key parameters |
|---|---|---|
| `get_user_context` | Required first; returns the `userContext` string other calls need | none |
| `search_assets` | Find icons by concept | `query` (one concrete noun), `setSlug: "sharp-line-style"`, `userContext`, `limit` (default 20, max 100) |
| `search_sets` | Confirm the set slug | `query`, `familySlug`, `limit` |
| `get_all_sets_from_family` | List sets in `sharp-sets` | `familySlug` |
| `search_families`, `get_all_families`, `get_family_extra_details` | Not needed at Safqah; the family is fixed | |
| `get_icon_by_hash` | Re-open a found icon | hash |
| `download_asset` | Export a proposal preview | `iconHash`, `format` (`svg` or `png`), `size`, optional `strokeWidth`, `colors`, `responsive`, `strokeToFill` |
| `download_multiple_assets` | Up to 50 at once | |

Verified 2026-10-15: `search_sets` "Streamline Sharp Line" returns set `sharp-line-style` ("Sharp Line", family `sharp-sets`, 5,839 icons, 2px stroke, sharp 0 degree miter, square caps).

Example call:
```json
{"query": "zakat", "setSlug": "sharp-line-style", "userContext": "<from get_user_context>", "limit": 6}
```

Preview export for the proposal (24px, 2px stroke, black; the team recolors with `icon/*` tokens):
```json
{"iconHash": "<hash from search_assets>", "format": "svg", "size": 24, "strokeWidth": 2}
```

### Example queries for Safqah gaps

| Need | Query (one concept each) |
|---|---|
| Deal page | `building`, `land plot`, `key` |
| Invest and reserve | `hourglass`, `lock`, `receipt` |
| KYC | `id card`, `face scan`, `document check` |
| Wallet and cash-out | `wallet`, `bank`, `withdraw` |
| Portfolio | `pie chart`, `growth chart` |
| Payouts | `coins`, `calendar money` |
| Goals | `target`, `flag` |
| Empty states | use `Empty Illustration / *`, not icons |
| Notifications | `bell`, `bell off` |
| Back-office | `filter`, `export`, `audit` |
| Sharia and compliance | `shield check`, `certificate` |

## Lottie (motion references)

| Item | Detail |
|---|---|
| Site | https://lottiefiles.com |
| MCP | `https://mcp.lottiefiles.com/mcp` (free; not connected in the session that wrote this guide, so discover tool names with `ToolSearch` query `lottie`) |
| Use at Safqah | Study timing for success checks, loaders, pull-to-refresh, onboarding transitions, countdown ticks |
| Syntropy equivalents | `SpinnerSafqahBrand` and the other spinners, `Pull-to-refresh`, `ProgressBar_Indeterminate`, `SkeletonLine`, `Countdown` |

What to extract from a Lottie reference: duration, easing, number of beats, what moves first, whether it loops. Then specify the motion in words with Material 3 Motion or Apple HIG Motion as the rule set.

Example searches: `success checkmark`, `money transfer`, `document scan`, `loading dots`, `confetti` (check it fits a regulated product; celebration is fine on a completed investment, never on a loss or a withdrawal).

## Watch-outs

- Streamline search can return Material Pro Sharp Line (`material-pro-sharp-line`) first; it is a different family. Always scope with `setSlug`.
- Icons in Western apps sometimes encode LTR meaning (a right arrow for "next"). Check mirroring before proposing.
- Never use emoji as icons.

## Setup

| Client | How |
|---|---|
| Claude Code | Streamline: connect it in Claude.ai Connectors; LottieFiles: `claude mcp add --transport http lottiefiles https://mcp.lottiefiles.com/mcp` |
| Cursor | Settings, MCP: `{"lottiefiles": {"url": "https://mcp.lottiefiles.com/mcp"}}`; Streamline per its docs |
| Claude.ai | Settings, Connectors: Streamline; add custom connector for LottieFiles |

## Sources
- `knowledge/icons/icons.json` (source file `DDI9ObV7rOP82XQ3OJzogv`)
- Streamline MCP `search_sets`, run 2026-10-15; Streamline tool schemas loaded 2026-10-15
- `knowledge/links/links.json` entries `streamline`, `lottiefiles-mcp`, `material-3-motion`, `apple-hig-motion`, `material-3-bidirectionality-and-rtl`
