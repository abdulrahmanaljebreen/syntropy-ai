# Illustrations (isocons) and empty states

The isometric illustration set ("isocons"): every concept, how deal statuses map to it, Left vs Right alignment in Arabic, and how `EmptyState` uses it. Open this before putting any illustration in product UI.

## Rules
1. In product UI use only the isocon set: component set `Illustrations` with variant property `Property 1` (the concept) and `Alignment` (`Left` / `Right`). The full list is in `data/illustrations.json` (39 concepts, each in Right and Left).
   Why: one style of illustration across the app; real components stay in sync with the library.
2. Isocons are for whole-screen or whole-card moments: empty states, success, onboarding, large status moments. Never inline with body text and never as a button icon.
   Why: inline meaning belongs to 24 px icons; isocons are too detailed to read small.
3. Render at illustration scale (about 48 to 132 px; `EmptyState` uses 132 in `Size=Default`, 88 in `Size=Compact`), scaled proportionally with strokes (Figma `rescale`, not `resize`).
   Why: `resize` keeps stroke weight and washes the drawing out.
4. Never recolour, rotate, flatten, crop or restyle an isocon, and never place two in one slot or mix with flat icons in the same slot.
   Why: the drawing's tones and isometric angle are the style.
5. Pick `Alignment` so the illustration leans toward its copy. Do not mirror an isocon with a transform; switch the variant.
   Why: transforms distort the isometric angle; the variant is drawn correctly.
6. Pick the concept by meaning. If no concept fits, use the `EmptyState` default for the tone or no illustration; never generate a 3D render or stock art as a stand-in.
   Why: a wrong or off-style picture misleads more than none.
7. New illustrations avoid figurative human or animal forms and faces; use the existing `Group` and `Group hug` concepts as drawn when you need people.
   Why: brand and cultural constraint of the illustration system.

## Concepts
### Deal and investment lifecycle
| `Property 1` value | Deal status it represents | Typical use |
|---|---|---|
| `Preparing` | Deal being prepared, coming soon | Upcoming deals empty state, "opening soon" card |
| `Raising` | Open for investment, funding in progress | Raising state hero, "no open deals right now" |
| `Scheduled` | Scheduled to open or a scheduled payout | Calendar of upcoming openings, default EmptyState tone |
| `Active` | Funded and running | Active investments section |
| `Repayment due` | A repayment or distribution is due | Payout due reminder (pair with warning tone copy only if late) |
| `Partial` | Partially repaid | Partial distribution status moment |
| `Matured` | Fully repaid, completed | Closed / matured investments, success after final payout |
| `Defaulted` | Defaulted (the extreme state) | Defaulted deal page, EmptyState `Tone=error` default |
| `In recovery` | Collection / recovery after default | Recovery status page |

### Product and feedback concepts
| Concept | Use |
|---|---|
| `Chosen checkmark` | Success, selection confirmed, KYC step done |
| `Info`, `Data info alert` | Informational or data notice moments |
| `Settings` | Preferences, configuration empty state |
| `Start` | Onboarding start, "begin your journey" |
| `Stairs` | Steps, levels, progress through a journey |
| `Think`, `Light bulb` | Learning, tips, ideas |
| `Puzzle` | Matching, completing a profile |
| `Cards` | Payment cards, card-based lists |
| `Bank` | Bank account, IBAN, payout bank |
| `Backspace` | Input deletion, keypad moments |
| `Garbage - Delete` | Deleted / removed state, confirm delete |
| `Hearts - Favorite` | Watchlist / favourites empty state |
| `Web - Globe` | Language, web, connectivity |
| `Arabic badge` | Arabic language or local badge moments |
| `Group`, `Group hug` | Community, referrals, joint ownership |
| `Diamond`, `Flower` | Premium, growth, celebration accents |
| `Face ID standing`, `Face ID flat`, `Face ID deep`, `Face ID layered` | Biometric login and re-prompt screens. On devices with Touch ID, branch the illustration and copy by biometry type |
| `Recommendation`, `Recommendation · Cycle`, `Recommendation · Scan`, `Recommendation · Funnel`, `Recommendation · Target`, `Recommendation · Orbit` | Reinvestment and recommendation moments (capital recycling, matched deals) |

## Left vs Right in Arabic
- `Alignment` leans the drawing toward the adjacent copy. Choose the side that faces the text.
- Side-by-side layouts: in RTL the illustration usually sits at the start (right) with copy to its left, so it should lean left (`Alignment=Left`); in LTR the mirror (`Alignment=Right`). Always check against where the text really is.
- Centred, stacked layouts (EmptyState): lean in the reading direction of the screen. Keep the alignment that the `EmptyState` variant for that `Direction` uses; do not hand-flip it.
- Never flip an isocon with a negative scale.

## Empty states
`EmptyState` (05d) has `Tone` (`default`, `search`, `error`) × `Size` (`Default`, `Compact`) × `Direction` (`LTR`, `RTL`), with the illustration as a nested instance on a concentric-circles backdrop.

| Tone | Default isocon | Use | Primary action |
|---|---|---|---|
| `default` | `Scheduled` | Nothing here yet (first-time portfolio, no goals, empty watchlist) | «تصفح الفرص» / Browse deals |
| `search` | `Preparing` | Filter or search returned nothing | «مسح الفلاتر» / Clear filters |
| `error` | `Defaulted` | Data failed to load | «إعادة المحاولة» / Try again |

Swap the nested illustration for a closer concept when one exists:
| Empty state | Better isocon |
|---|---|
| Empty watchlist / favourites | `Hearts - Favorite` |
| No bank account added | `Bank` |
| No payment cards | `Cards` |
| No open deals right now | `Raising` or `Preparing` |
| No matured investments yet | `Matured` |
| No recommendations yet | `Recommendation` |
| Settings with nothing configured | `Settings` |
| Learning centre with no content yet | `Light bulb` |

EmptyState copy: title in `text/default`, one-sentence description in `text/muted`, almost always one primary `Button`. Loading is `Skeleton`, not EmptyState. Empty because supply is scarce (no open deals) must not read as an app failure: use `Tone=default`, not `error`.

## Examples
| Do | Don't |
|---|---|
| Watchlist empty: `EmptyState` `Tone=default`, isocon `Hearts - Favorite`, «لا توجد فرص في قائمة المتابعة» + «تصفح الفرص» | Stock photo of a heart |
| No deals open: `Tone=default` with `Preparing` and a «أبلغني عند طرح فرصة» action | `Tone=error` with the `Defaulted` isocon, which reads as failure |
| Defaulted deal page: `Defaulted` isocon with plain, calm copy | `Defaulted` on a normal "no results" search |
| Arabic two-column card: illustration on the right, `Alignment=Left` facing the text | Mirroring the isocon with scaleX(-1) |
| Face ID re-prompt: `Face ID standing` | A 3D render of a face |

## Sources
- `data/illustrations.json` (Illustrations set 228:89 in the Syntropy Icons file, `Property 1`, Right/Left).
- Figma foundation pages Icons 69:882 (Isocons section) and Illustrations 69:886 (`data/foundations/`).
- EmptyState component page 05d (Figma 69:925, set 2066:434, illustration set 2071:38797).
