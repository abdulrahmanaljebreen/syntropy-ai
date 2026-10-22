# ScreensDesign playbook

ScreensDesign (screensdesign.com) is a library of recorded iOS app flows, strongest on onboarding and paywalls, with revenue and download context per app. Open this when the question is "how do high-earning apps onboard, educate and ask for commitment", then translate the mechanics to Safqah's first-investment journey.

## At a glance
| Item | Detail |
|---|---|
| Content | Recorded iOS flows (onboarding, paywall, signup, permissions, retention) with revenue and download estimates |
| Strength | Ties a flow to a business outcome, so you can prefer patterns from apps that earn |
| Weakness | iOS only; consumer subscription apps dominate; few finance apps; no Arabic apps |
| Access | Paid (person's own account) |
| MCP | `https://screensdesign.com/mcp` |
| Tool names | Not verified (the MCP was not connected when this playbook was written, 2026-10-15). Discover them at runtime |

## Discover the tools first
1. Claude Code: `ToolSearch` query `+screensdesign` (or `screensdesign search`) to load the schemas. Claude.ai: check the connector's tool list.
2. Read each tool's description and parameters; note the names for this session.
3. Expect at least a flow or screen search taking a natural-language `query`, and a detail call taking an ID. Never call a tool name you have not seen in the loaded list.

Call shape once discovered (replace with the real tool name):
```json
{"query": "finance app onboarding with notification permission primer"}
```

## Best for at Safqah
- First-run onboarding: value screens, permission primers (notifications, Face ID), progress indicators.
- The first-investment moment: Safqah has no paywall, but the first deposit or first invest behaves like one (a commitment ask). Study paywall layouts for structure, never for pressure.
- Notification permission primers before the iOS system alert (the Safqah order is: primer screen, then reminder `BottomSheet`, then system alert).
- Personalization questionnaires that resemble investor suitability questions.

## Example queries for Safqah
| Topic | Query |
|---|---|
| Onboarding | `finance app onboarding with value carousel and phone signup` |
| Permission primer | `notification permission primer screen before system alert` |
| Biometrics | `enable Face ID prompt during onboarding` |
| Suitability | `onboarding questionnaire about goals and experience level` |
| First commitment | `paywall with annual monthly toggle and trust badges` (structure only) |
| Reminders | `trial reminder timeline screen` (maps to reservation reminders) |
| Goals | `goal setting onboarding with target amount` |
| Empty home after signup | `first session home with checklist of setup steps` |
| Referral | `invite friends reward screen` |
| Retention | `win-back offer screen for inactive users` (study, then strip any pressure) |

## Keep, translate, drop
| Keep | Translate | Drop |
|---|---|---|
| Clear progress, one question per screen, a reason before every permission, a visible skip | A paywall plan picker becomes a Safqah choice: deal term with `Calculator / Duration picker`, amount presets with `Keypad / Presets` | Countdown discounts, pre-selected expensive plans, hidden close buttons, guilt copy |

## Watch-outs
- Revenue numbers are estimates; a signal, not proof.
- Subscription psychology does not transfer to regulated investing. CMA disclosure and risk text stay visible, never visually suppressed.
- iOS only: check Android behaviour (back button, system dialogs) separately.

## Fallback when not connected
Refero flows (`refero_search_flows`, `platform: "ios"`) for onboarding structure, then Lazyweb experiments for conversion evidence.

## Cost
Paid plan for the MCP. Budget 2 to 4 calls per question.

## Sources
- Team link list entry `screensdesign` (checked 2026-10-15)
- https://screensdesign.com
