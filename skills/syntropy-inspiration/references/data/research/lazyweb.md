# Lazyweb

Lazyweb (lazyweb.com) is a design-evidence service built for AI agents: ranked real app screens, ordered flows, real mobile A/B experiments, saved Agentic Searches with shareable links, website Growth Scores and full Growth Reports. Use it when the question is about conversion or when you want one saved, shareable research page that collects screens, flows and experiments together.

## What it is

| Item | Detail |
|---|---|
| Content | Mobile screenshots and desktop captures, multi-screen flows, mobile growth and monetization experiments (control vs variant), growth scores of websites |
| Strength | A/B evidence (what won), one persistent `agentic_search_id` that accumulates mixed evidence, a private finalize link the person can share |
| Weakness | Experiment coverage is consumer subscription heavy; few Saudi apps; shared proxy can be busy or rate-limited |
| Access | Freemium; experiments depend on plan. MCP at `https://www.lazyweb.com/mcp` |
| Skill pack | Local skills `lazyweb`, `lazyweb-quick-search`, `lazyweb-design`, `lazyweb-explain-flow`, `lazyweb-propose-ui-changes`; check `~/.lazyweb/VERSION` against the published version once per session |

## Best for at Safqah

- Conversion of one step: first investment, KYC completion, notification opt-in, reinvest after payout.
- Comparing your current screen with similar real screens (`lazyweb_compare_image`, `lazyweb_find_similar`).
- One shareable evidence page for a design review (Agentic Search finalize).
- Explaining a flow visually for engineers or product (`lazyweb_explain_flow`), or proposing changes for accept or decline (`lazyweb_propose_ui_changes`).

## How the MCP works (code mode)

The server exposes two tools. Everything else runs inside JavaScript.

| Tool | Purpose |
|---|---|
| `mcp__lazyweb__lazyweb_discover_tools` | List tool names (omit `query`), or search a task or tool name to get JSON input schemas. `limit` 1 to 20, default 5 |
| `mcp__lazyweb__lazyweb_execute` | Run JavaScript that calls `await tools.NAME(args)`. Max 16 calls, 90 seconds, 64 KiB code, 512 KiB per response. Each call returns the MCP result with `content`, `structuredContent`, `isError` |

The live schemas are the contract. Always run `lazyweb_discover_tools` with the tool name before first use in a session, and never copy schemas into persistent notes.

```json
{"query": "lazyweb_search_screens", "limit": 1}
```

```js
const read = (r) => r.structuredContent ?? JSON.parse(r.content?.[0]?.text ?? "{}");
const s = await tools.lazyweb_search_screens({ query: "fintech onboarding", platform: "mobile", limit: 6 });
if (s.isError) return s;
const sd = read(s);
const id = sd.agentic_search_id;
const f = await tools.lazyweb_search_flows({ query: "identity verification", agentic_search_id: id, limit: 3 });
return { id, screens: sd.results?.map(x => [x.companyName, x.result_ref, x.visionDescription]), flows: read(f) };
```

## Tools available inside `lazyweb_execute` (verified list, 2026-10-15)

### Research (canonical, read)
| Tool | Use |
|---|---|
| `lazyweb_search_screens` | Ranked mobile and desktop references. First call creates `agentic_search_id`; each result has a stable `result_ref`. Broad mobile queries return `flavors` you can narrow by |
| `lazyweb_search_flows` | Ordered multi-screen journeys; pass `agentic_search_id` to accumulate |
| `lazyweb_search_experiments` | Real mobile growth and monetization experiments; pass `agentic_search_id` |
| `lazyweb_agentic_search_finalize` | Save selected `result_ref`s into one private Agentic Search page; returns a clean private `url` and a single-use `open_url` |
| `lazyweb_search` | Broad visual search, 2 to 6 word pattern queries, `offset` for paging |
| `lazyweb_get_flows` | Older flow lookup with step images |
| `lazyweb_search_ab_tests` | Older experiment lookup (plan dependent) |
| `lazyweb_compare_image` | Visually similar references for one screenshot (`image_base64` or public `image_url`) |
| `lazyweb_find_similar` | Expand from one screenshot to nearby examples |
| `lazyweb_list_categories` | Supported company categories, before filtered searches |

`lazyweb_search_screens` parameters (from the live schema):

| Parameter | Type | Notes |
|---|---|---|
| `query` | string, required | Concrete UI pattern |
| `agentic_search_id` | uuid | Reuse across refinements and mixed searches |
| `limit` | 1 to 100 | Keep 4 to 10 |
| `offset` | 0 to 400 | Results are deterministic; page instead of repeating a query |
| `platform` | `mobile`, `desktop`, `all` | |
| `category`, `company` | string | Filters (see `lazyweb_list_categories`) |
| `maxPerCompany` | 1 to 20 | Mobile defaults to one per app |
| `flavor`, `subflavor` | id from a previous response | Narrow to one kind of screen |
| `fields` | string[] | Trim the response |
| `skill`, `version`, `integrity` | string | Analytics only; `version` from `~/.lazyweb/VERSION`, `integrity` from `~/.lazyweb/INTEGRITY` |

### Growth and product (write or long-running: only on explicit request)
| Tool | Use |
|---|---|
| `lazyweb_growth_score` | Get, generate or compare Growth Scores for up to 10 websites. Reading is safe; generating only when asked |
| `lazyweb_growth_report` | Start or poll the Growth Report pipeline (`action: "start"` or `"status"`). Never start without the person's explicit request |
| `lazyweb_generate_report`, `lazyweb_get_report` | The one-call optimize or improve report (about 3 to 4 minutes, async). Same rule |
| `lazyweb_get_report_evidence`, `lazyweb_get_report_feedback`, `lazyweb_reports` | Read an existing report's evidence and feedback |
| `lazyweb_growth_backlog` | List or add product-scoped growth specs (adding needs an `idempotency_key`) |
| `lazyweb_products` | List or manage products (delete needs confirmation) |
| `lazyweb_request_image_upload`, `lazyweb_resolve_image_upload` | Upload a full-resolution screenshot without inline base64 |
| `lazyweb_render_report` | Host a deep-design-research report from structured data |

### Diagrams
| Tool | Use |
|---|---|
| `lazyweb_explain_flow` | Save an explanatory diagram page at `/explainer/<id>/` |
| `lazyweb_propose_ui_changes`, `lazyweb_get_proposal_decision` | Host proposed changes for the person to accept or decline, then read decisions |

### Account and health
`lazyweb_health`, `lazyweb_account`, `lazyweb_connections`, `lazyweb_hub_link`, `lazyweb_check_update`, `lazyweb_get_workflows`, `lazyweb_fetch_best_practice`.

Deprecated (rejected with `tool_deprecated`): `lazyweb_publish_report`, `lazyweb_paywall_score`, `lazyweb_start_paywall_retrieve`, `lazyweb_get_paywall_retrieve`, `lazyweb_start_paywall_synthesize`, `lazyweb_get_paywall_synthesize`, `lazyweb_generate_mockup`, `lazyweb_start_mockup`, `lazyweb_get_mockup`, `lazyweb_paywall_cta_research`.

## Research workflow with an Agentic Search

1. `lazyweb_search_screens` with a concrete query. Keep `agentic_search_id`.
2. Refine with `flavor`, `offset`, or a second query, passing the same `agentic_search_id`.
3. Add `lazyweb_search_flows` and `lazyweb_search_experiments` with the same id.
4. Pick 5 to 10 `result_ref`s you will actually cite.
5. `lazyweb_agentic_search_finalize` with that selection. Reusing the same selection is idempotent; changing it updates the same page.
6. Open the private `open_url` once in the person's browser without printing it; give the person the clean `url`. Public sharing is a human action from the page's Share button.

## Example queries for Safqah

| Topic | Tool | Query |
|---|---|---|
| Deal page | screens | `investment detail page` |
| Invest flow | flows | `investment purchase confirmation` |
| First investment conversion | experiments | `first deposit prompt` |
| KYC completion | experiments | `onboarding identity verification` |
| KYC screens | screens | `identity document upload` |
| Wallet and cash-out | flows | `withdraw to bank` |
| Portfolio | screens | `portfolio dashboard` |
| Payouts and reinvest | experiments | `reinvest prompt after payout` |
| Goals | screens | `savings goal progress` |
| Empty states | screens | `empty state first action` |
| Notifications | experiments | `push permission primer` |
| Back-office | screens, `platform: "desktop"` | `admin data table filters` |

## Example output and learnings (real run, 2026-10-15)

Call inside `lazyweb_execute`: `tools.lazyweb_search_screens({query: "fintech onboarding", limit: 3, platform: "mobile"})`.

Each result carries `companyName`, `category`, `platform`, `visionDescription`, `similarity`, `imageUrl` and `image_url` (signed, about 365 days), an optional `flow` object (`flow_canonical_id`, `flow_name`, `step`, `total_steps`) and a stable `result_ref` such as `screens:79e9cb54dc6796e3ac8beb37`. The payload arrives as JSON text in `content[0].text`; parse it if `structuredContent` is empty.

- Coinbase, account setup step 11 (similarity 0.9): onboarding checklist for regulatory compliance with step progress (create account done, add personal and financial details, verify identity by uploading documents), estimated time per step, a certification checkbox and a Submit button disabled until all steps are done. Learning: show the whole KYC checklist with time estimates up front. Maps to `KYCChecklist` with `KYCTaskRow` (`State=Completed`, `Current`, `Upcoming`), `Checkbox`, `Button` `State=disabled`.
- Fivecents, "get started" step 1 of 2 (similarity 0.86): welcome screen listing privacy benefits and a single choice of what to track before "Get Started". Learning: state the privacy promise at the first screen. Maps to `List` + `Radio Group` + `Button`.

Session note: several earlier calls that day returned `mcp_proxy_busy`, `mcp_rate_limited` or `mcp_upstream_timeout`. When this happens: keep each `lazyweb_execute` to one small call (`limit` 3), wait, retry, then fall back to Mobbin or Refero and tell the person.

## Watch-outs

- Never start a Growth Report or generate a Growth Score unless the person asked in their own words.
- Never print `open_url` or credentials; they are private, single-use handoffs.
- Results are deterministic: do not repeat an identical query; use `offset` or `flavor`.
- Experiments are mostly subscription apps. Translate the mechanic (one choice per screen, social proof, progress) and drop pressure tactics; Safqah bans fake urgency.
- Read `warnings` and `coverage` in responses when results look off.

## Cost and access

- Free tier covers screens and flows with limits; experiments and reports depend on plan (`lazyweb_account` shows entitlement).
- One `lazyweb_execute` can make up to 16 tool calls; count each inner call toward your budget.

## Setup

| Client | How |
|---|---|
| Claude Code | `curl -fsSL https://www.lazyweb.com/install.sh \| sh` installs skills and the MCP; or `claude mcp add --transport http lazyweb https://www.lazyweb.com/mcp` |
| Cursor | The same install script configures Cursor; or Settings, MCP: `{"lazyweb": {"url": "https://www.lazyweb.com/mcp"}}` |
| Claude.ai | Settings, Connectors, add custom connector `https://www.lazyweb.com/mcp` |

Restart the client after installing or updating to pick up new tools.

## Sources
- Lazyweb `lazyweb_discover_tools` output and `lazyweb_search_screens` schema, 2026-10-15
- Lazyweb MCP server instructions (Agentic Search, finalize, Growth Report rule)
- https://www.lazyweb.com
