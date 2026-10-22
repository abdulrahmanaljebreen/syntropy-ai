# Browser-only research sources

Sources with no MCP server for agents. Open them in a browser (Claude in Chrome, the built-in browser, or `WebFetch` for public text pages) or ask the person to open them. Use them when an MCP library cannot answer: recorded end-to-end flows, research-backed form guidance, A/B-tested patterns, psychology teardowns, visual trend scans, and tool discovery.

## Rules

1. Prefer an MCP library first (Mobbin, Refero, Lazyweb); go to the browser when the question needs research findings, teardown reasoning or sources the libraries lack.
   Why: MCP results are structured and citable in one call.
2. Respect each site's terms: no bulk scraping, no bypassing paywalls or logins. Paid sites (Page Flows, Baymard) need the person's own account.
   Why: legal and account safety.
3. Quote findings, not pages: note the claim, the source URL and the date you read it.
   Why: guidance changes; citations must be checkable.
4. Sites with `llms.txt` (Land-book, Awwwards, Baymard, Laws of UX, Carbon, Atlassian, Ant Design, shadcn/ui, LottieFiles, Lucide, Motion) can be read as text with `WebFetch` on `<site>/llms.txt` first.
   Why: faster and cleaner than parsing HTML.

## Sources by job

### Recorded flows and teardowns
| Source | URL | Access | Best for at Safqah | How to use |
|---|---|---|---|---|
| Page Flows | https://pageflows.com | Paid, no agent access | Video recordings of onboarding, KYC, checkout, cancellation | The person searches "KYC", "bank onboarding", "withdraw"; you analyse their screenshots or notes |
| Growth.design case studies | https://growth.design/case-studies | Free | Psychology teardowns of onboarding, pricing, trust | Read a relevant case, extract the named biases and fixes; check each against the Safqah no-dark-patterns rule |
| Pttrns | https://pttrns.com | Freemium | Mobile patterns by category | Quick scan when Mobbin is unavailable |
| Collect UI | https://collectui.com | Free | Daily UI shots by component | Component-level ideas only; often concept work, not shipped products |
| Savee | https://savee.com | Freemium, no agent access | Moodboards | The person builds boards; you summarise direction |

### Research-backed guidance
| Source | URL | Access | Best for |
|---|---|---|---|
| Baymard Institute | https://baymard.com | Paid (some free articles), `llms.txt` | Forms, checkout, error messages, input fields, mobile form UX |
| GoodUI | https://goodui.org | Freemium | A/B-tested patterns with measured effects |
| NN/g 10 usability heuristics | https://www.nngroup.com/articles/ten-usability-heuristics/ | Free | Heuristic review of a flow |
| Laws of UX | https://lawsofux.com | Free, `llms.txt` | Naming the principle behind a pattern (Hick, Fitts, Jakob, Goal-gradient) |
| Deceptive Design | https://deceptive.design/types | Free | Checking that nothing in a reference is a dark pattern (all banned at Safqah) |
| Checklist Design | https://www.checklist.design | Free | Per-page and per-component checklists |
| GOV.UK Design System | https://design-system.service.gov.uk | Free | Accessible forms, error summaries, plain language |
| Inclusive Components | https://inclusive-components.design | Free | Accessible component behaviour |

### Back-office and SaaS
| Source | URL | Access | Best for |
|---|---|---|---|
| SaaSFrame | https://www.saasframe.io | Freemium, no agent access | SaaS web-app screens: tables, settings, dashboards |
| Mercury, Ramp, Stripe | https://mercury.com, https://ramp.com, https://stripe.com | Free marketing pages | Finance dashboards and approval flows (public screenshots and docs) |
| Component Gallery | https://component.gallery | Free | Same component compared across design systems |
| Carbon, Polaris, Atlassian, Ant Design | see `links.json` category `design-systems` | Free | Dense data UI behaviour, table rules, empty states |

### Visual inspiration (web)
| Source | URL | Best for |
|---|---|---|
| Best Designs On X | https://bestdesignsonx.com | Fresh UI and brand work posted on X, updated hourly |
| Recent (formerly Godly) | https://recent.design | High-end web direction |
| Land-book | https://land-book.com | Landing pages, filterable (`llms.txt`) |
| Lapa Ninja | https://www.lapa.ninja | Landing pages by category, including finance |
| SaaS Landing Page, Landingfolio | https://saaslandingpage.com, https://www.landingfolio.com | Landing sections broken down |
| Awwwards, CSS Design Awards, Siteinspire, Minimal Gallery, One Page Love, Httpster | see `links.json` category `web-inspiration` | Trend scans, typography-led sites |
| Navbar Gallery, Footer Design, Dark Mode Design | see `links.json` | One section type at a time |

### Tool discovery
| Source | URL | Best for |
|---|---|---|
| Toolfolio | https://toolfolio.com | Curated design, productivity and AI tools |
| TOOOLS.design | https://www.toools.design | 2,000+ design tools |
| UX Tools | https://www.uxtools.co | Tool comparisons and the yearly survey |
| Design Resources, UIUX Showcase | https://designresourc.es, https://uiuxshowcase.com | Directories |
| Figma Community | https://www.figma.com/community | Kits, plugins, RTL files (never import a kit into Syntropy) |
| Product Hunt | https://www.producthunt.com | New tools (has an API) |

### Arabic, RTL and regulation (read before designing Saudi-specific UI)
| Source | Use |
|---|---|
| DGA Platforms Code design system, https://design.dga.gov.sa | Saudi government UI conventions users already know |
| Material 3 bidirectionality, Apple HIG right to left | Mirroring rules for icons, layout, numbers |
| RTL Styling, https://rtlstyling.com/posts/rtl-styling | CSS logical properties for web |
| W3C inline bidi markup | Mixed Arabic and Latin strings (IBANs, amounts) |
| SAMA consumer protection, CMA regulations library, PDPL | Disclosure, fair treatment, consent UX |

### Engineer-facing MCPs (not for the Safqah look)
`shadcn/ui MCP` (https://ui.shadcn.com/docs/mcp) and `Ant Design MCP` (https://ant.design/docs/react/mcp) show component behaviour for engineers. They are never a visual reference; the look is Syntropy.

## Example queries for Safqah

| Topic | Source | What to search or read |
|---|---|---|
| Deal page | Lapa Ninja, finance category | Real-estate and investing landing pages: how they present returns and risk |
| Invest flow | Baymard | "order review step" and "payment confirmation" guidance |
| Reserve flow | Growth.design | Cases on urgency; use them to recognise and avoid false urgency |
| KYC | Page Flows | "identity verification", "bank onboarding" recordings |
| KYC forms | GOV.UK Design System | Date input, address, error summary patterns |
| Wallet and cash-out | Baymard + Wise public help pages | Fee transparency and arrival estimates |
| Portfolio | Component Gallery | "stat", "data table", "card" across systems |
| Payouts | Carbon | Data table and status indicator guidance |
| Goals | Laws of UX | Goal-gradient effect, then design progress honestly |
| Empty states | Carbon, Atlassian | Empty state content rules |
| Notifications | GoodUI | Permission and opt-in tests |
| Back-office tables | SaaSFrame | "table", "filters", "bulk actions" |
| Marketing visual direction | Best Designs On X, Recent | Current trends; translate to Syntropy tokens only |
| Missing tool | Toolfolio, UX Tools | Accessibility checkers, RTL plugins |

## Watch-outs

- Inspiration galleries show concept work that never shipped; prefer real products for behaviour.
- Teardowns are opinions with evidence; still check the claim against Safqah data (Mixpanel boards, Notion research) before acting.
- Award sites favour motion-heavy, low-contrast work; Safqah needs WCAG 2.2 AA.

## Setup

| Client | How |
|---|---|
| Claude Code | Use `WebFetch` for public pages and `llms.txt`; use Claude in Chrome (`mcp__claude-in-chrome__*`, load the `claude-in-chrome` skill first) for pages that need the person's login |
| Cursor | Built-in browser or `@web` |
| Claude.ai | Web search and fetch; or ask the person to paste screenshots |

## Sources
- `knowledge/links/links.json` categories `mobile-patterns`, `web-inspiration`, `tool-directories`, `ux-principles`, `design-systems`, `arabic-rtl`, `regulation`, `finance-backoffice` (checked 2026-10-15)
