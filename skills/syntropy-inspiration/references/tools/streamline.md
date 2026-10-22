# Streamline playbook (icon proposals only)

Streamline (streamlinehq.com) is the source family of Syntropy Icons. Use it only when the icon you need does not exist in Syntropy Icons, and only to propose a candidate from the Sharp Line set to the design system team. A Streamline icon is never a shipped asset.

## Rules
1. Search Syntropy Icons first (636 icons, 15 categories, sizes 12 and 24, file `DDI9ObV7rOP82XQ3OJzogv`), by meaning: use the icon `words` and categories (`Financial / Fintech`, `Status & Feedback`, `Time & Calendar`, `Files & Data`, `Visibility & Security`). See syntropy-figma for the icon index and keys.
   Why: an icon that exists must be reused, and it often exists under another name.
2. Search Streamline only in set `sharp-line-style` (family `sharp-sets`).
   Why: Syntropy Icons are drawn in that style: 24px grid, 2px stroke, square caps, zero-radius miter corners.
3. Present the candidate as a proposal (Streamline name, hash, preview) and wait for the design team to add it to Syntropy Icons.
   Why: icons are licensed, named and published through the system.
4. Never mix families, never take Fill or Duo variants, never recolor beyond `icon/*` tokens, never paste the SVG into a build.
   Why: mixed or pasted icons read as broken UI and are unbound.
5. Directional icons (arrows, chevrons, back, send, progress) mirror in RTL; non-directional ones (search, clock, check, currency, play) do not.
   Why: Material 3 and Apple HIG bidirectionality rules.
6. Never use emoji as icons.

## At a glance
| Item | Detail |
|---|---|
| Access | Freemium; connector in Claude.ai (tools appear as `mcp__claude_ai_Streamline__*`) |
| Verified set | `search_sets` "Streamline Sharp Line" returns `sharp-line-style` ("Sharp Line", family `sharp-sets`, 5,839 icons, 2px stroke, 0 degree miter, square caps), 2026-10-15 |

## Tools
| Tool | Use | Key parameters |
|---|---|---|
| `get_user_context` | Call first; returns the `userContext` string other calls need | none |
| `search_assets` | Find icons by concept | `query` (one concrete noun), `setSlug: "sharp-line-style"`, `userContext`, `limit` (default 20, max 100) |
| `search_sets` | Confirm the set slug | `query`, `familySlug`, `limit` |
| `get_all_sets_from_family` | List sets in `sharp-sets` | `familySlug` |
| `get_icon_by_hash` | Re-open a found icon | hash |
| `download_asset` | Export a proposal preview | `iconHash`, `format` (`svg` or `png`), `size`, optional `strokeWidth`, `colors`, `responsive`, `strokeToFill` |
| `download_multiple_assets` | Up to 50 previews | |
| `search_families`, `get_all_families`, `get_family_extra_details` | Not needed: the family is fixed at Safqah | |

Never invent or normalize slugs, hashes or URLs; take them from a tool result.

```json
{"query": "zakat", "setSlug": "sharp-line-style", "userContext": "<from get_user_context>", "limit": 6}
```
Preview export (24px, 2px stroke; the team recolors with `icon/*` tokens):
```json
{"iconHash": "<hash from search_assets>", "format": "svg", "size": 24, "strokeWidth": 2}
```

## Example queries for Safqah gaps
| Need | Queries (one concept each) |
|---|---|
| Deal page | `building`, `land plot`, `key` |
| Invest and reserve | `hourglass`, `lock`, `receipt` |
| KYC | `id card`, `face scan`, `document check` |
| Wallet and cash-out | `wallet`, `bank`, `withdraw` |
| Portfolio | `pie chart`, `growth chart` |
| Payouts | `coins`, `calendar money` |
| Goals | `target`, `flag` |
| Notifications | `bell`, `bell off` |
| Back-office | `filter`, `export`, `audit` |
| Sharia and compliance | `shield check`, `certificate` |
| Empty states | none: use `Empty Illustration / *`, not icons |

## Proposal format
```markdown
Icon gap: «زكاة» concept, no match in Syntropy Icons (searched words: zakat, charity, donation).
Proposal: Streamline Sharp Line "<name from result>", hash <hash from result>, 24px, 2px stroke.
Mirrors in RTL: no.
Next step: design system team adds it to Syntropy Icons; until then use <closest existing Syntropy icon>.
```

## Watch-outs
- Search can return Material Pro Sharp Line (`material-pro-sharp-line`) first; it is a different family. Always pass `setSlug`.
- Western icons sometimes encode LTR meaning (a right arrow for "next"); check mirroring.

## Sources
- Streamline MCP `search_sets`, 2026-10-15; Streamline tool schemas loaded 2026-10-15
- Team link list entries `streamline`, `material-3-bidirectionality-and-rtl`
