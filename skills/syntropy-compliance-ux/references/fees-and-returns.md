Design guidance only. Confirm wording with Safqah Compliance before release.

# Fees and returns: net, gross, projected, realised, rounding

How to show returns and fees so the number a user sees is the number they can expect: net vs gross, projected vs realised, the worked fee-from-profit example, annualised vs total, rounding rules and Arabic labels. Open it whenever a screen shows a rate, a profit, a fee or a total.

## What the rules say (verified)

| Source | Point that shapes the UI |
| --- | --- |
| CMI Regs Art. 46 | "Fees and commission charged by a capital market institution to its clients must be fully disclosed in advance of providing any services." |
| CMI Regs Annex 5.1 item 3 | Forecasts fair and not misleading; "If any promise or forecast is based on assumptions, the assumptions must be stated." |
| CMI Regs Annex 5.1 item 9 | Past performance fair, not selected to exaggerate, sourced, verifiable, with the "not necessarily a guide" warning |
| IFR Art. 72(c)(1) (fund benchmark) | Total return "must be shown net of all actual historical expenses"; gross only "in addition to, and with no greater prominence than" net |
| IFR Art. 72(d) (fund benchmark) | No performance shown for periods under one year |
| SAMA Principle 2; Fees Guide Art. 3, 4 | Prices, commissions and taxes disclosed clearly; prior approval for all fees |
| SAMA Rule 5 | Initial disclosure includes "details of calculating fees and commissions" |
| SAMA Advertising Art. 3.5 | Ads show "All related fees and commissions ... including VAT" |

## Rules

### Net first
1. The headline profit and headline rate are **net of all fees** the user pays. Gross only as a secondary line in the breakdown, never larger or bolder than net. Why: IFR 72(c)(1) benchmark; CMI Annex 5.1 item 3.
2. Every fee is its own line between gross and net, with basis and VAT treatment: «رسوم الإدارة (1% من الربح)». Why: CMI Art. 46, SAMA Rule 5.
3. Label which number is which: every profit or rate says net or gross in words. Why: an unlabelled rate is read as net.

### Projected vs realised
4. Before payment every figure is «متوقع» / "expected"; after payment «مستلم» / "received". Portfolio and payouts show both in separate rows: received to date, expected remaining. Why: a projection shown as earned is misleading.
5. State the assumptions behind a projection in the breakdown: full and on-time repayment, the term, the amount. Why: Annex 5.1 item 3.
6. Returned capital is not profit. Payout rows separate «رأس المال» from «الربح». Why: mixing them inflates "earnings".
7. No "total returns" figure that sums received and expected profit unless both parts are shown beside it. `ReturnsDisplay` defaults its label to "Total returns and expected profit": split or relabel it (its compliance note: the label must say it includes expected profit; never present expected as realised). Why: it combines two things.

### Annualised vs total
8. A deal rate is annual unless labelled otherwise; always show the unit: «16.0% سنوياً». A term return («نسبة العائد للمدة») is labelled with the term. Why: 16% a year and 16% for 16 months are different products.
9. When showing an annualised net rate, state the method in the breakdown: simple (term return × 12 ÷ months) or compounded. One method across the app. Why: they differ (see the example).
10. Never annualise a short-period return to look larger; never show performance under one year as an annual track record. Why: IFR 72(d) benchmark.

### Rounding and format
11. Money: two decimals, comma thousands, currency after the amount: `21,120.00 ر.س`, `21,120.00 SAR`. Marketing projections may use whole numbers (numbers-currency rule 8). Why: transactions are exact to the halala.
12. Percentages: one decimal, `%` after the number, no space: `15.8%`. Why: numbers-currency rule 9.
13. Compute every rate from unrounded amounts; round only for display, half up. Never round across a threshold for marketing («يصل إلى 16%» when it is 15.8%). Why: rounding a rounded number can flip the last digit.
14. Arabic percentage labels start with «نسبة»: «نسبة صافي العائد», «نسبة العائد المتوقع». Not for SAR amounts («صافي الربح 21,120.00 ر.س») and not for IRR («معدل العائد الداخلي»). Why: numbers-currency rule 10.
15. Never more precision than the data has (no `15.84%` on a headline), never less where the user transacts. Why: false precision implies a guarantee.
16. In RTL, put the fee's minus sign in its own text node so it does not flip. Green only on profit figures; capital, duration and annual rate stay neutral. Why: bidi safety; Safqah colour rule for money.

## Worked example: fee taken from profit

Inputs: amount 100,000.00 SAR, term 16 months, expected profit rate 16.0% a year (simple), fee taken from profit. The fee basis is a product decision that has changed; two bases are shown. Use the one Finance and Compliance confirm, and take numbers from the backend.

### Step 1: gross expected profit
```
gross = amount × annual rate × months ÷ 12
      = 100,000.00 × 0.16 × 16 ÷ 12
      = 100,000.00 × 0.21333...
      = 21,333.33 SAR   (21,333.333... before rounding)
```

### Example A: fee = 1% of profit (current product rule, 30 Sep 2026)
```
fee        = 1% × 21,333.33           =    213.33 SAR
net profit = 21,333.33 − 213.33        = 21,120.00 SAR
total back = 100,000.00 + 21,120.00    = 121,120.00 SAR
net return for the term = 21,120.00 ÷ 100,000.00 = 21.12%  → shows 21.1%
net annual (simple)     = 21.12% × 12 ÷ 16     = 15.84%  → shows 15.8%
net annual (compounded) = (1.2112)^(12 ÷ 16) − 1 = 15.45% → shows 15.5%
```
If VAT (15%) applies to the fee: fee 245.33, net 21,088.00. Whether VAT applies is a Finance confirm; if it does, show it as its own line.

### Example B: flat fee 3,000.00 SAR including VAT (2,608.70 + 391.30 VAT), earlier mock-up
```
net profit = 21,333.33 − 3,000.00      = 18,333.33 SAR
total back = 100,000.00 + 18,333.33    = 118,333.33 SAR
net return for the term = 18.33%  → shows 18.3%
net annual (simple) from unrounded net: 18,333.333... ÷ 100,000 × 12 ÷ 16 = 13.75% exactly → shows 13.8%
```
Rounding trap: computing from the rounded 18,333.33 gives 13.7499975%, which rounds to 13.7%. Compute from unrounded values (rule 13). The numbers-currency file shows this example as «13.75%»; under the one-decimal rule the display is 13.8%.

### How Example A reads on the invest summary
| Label (AR) | Label (EN) | Value |
| --- | --- | --- |
| المبلغ المستثمر | Amount invested | 100,000.00 ر.س |
| نسبة العائد المتوقع (سنوياً) | Expected annual rate | 16.0% |
| الربح المتوقع قبل الرسوم | Expected profit before fees | 21,333.33 ر.س |
| رسوم الإدارة (1% من الربح) | Management fee (1% of profit) | − 213.33 ر.س |
| **صافي الربح المتوقع** | **Net expected profit** | **21,120.00 ر.س** |
| **نسبة صافي العائد (سنوياً)** | **Net annual return** | **15.8%** |
| إجمالي المبلغ المتوقع عند الاستحقاق | Expected total at maturity | 121,120.00 ر.س |
| المدة | Term | 16 شهراً |

Build with `KeyValue` rows (Emphasis=strong on the two net rows) or `Calculator / Results card`. Fee label: the knowledge base uses «رسوم الإدارة»; the Calculator component descriptions use «رسوم الوكالة (1% من الربح)» (agency fee, 1% of profit, never of capital). Which label ships is an open item.

## Components that carry money figures

| Component | Node | Compliance facts from its description |
| --- | --- | --- |
| `Calculator / Results card` | 5998:7821 | «ناتج الاستثمار المتوقع»: received after fees (large green), stat strip, total and net profit rows, Indicators=Closed/Open for IRR and agency fee. Label projections «متوقع», net beside gross, never guaranteed; green only for profit values. |
| `Calculator / Metric row` | 5996:5988 | Value=Money/Percent, Tone=Default/Muted (Muted for the fee row). Fee is 1% of profit, never of capital. Same library caveat |
| `Calculator / Disclosure toggle` | 5994:6041 | «مؤشرات إضافية», State=Closed/Open. Keep the fee visible on the summary that precedes confirmation even if indicators are collapsed. Same library caveat |
| `Calculator / Amount card` | 5998:7155 | Distributions=Closed/Open. Projections labelled expected. Same library caveat |
| `Investment Calculator` | 3442:5240 | Legacy, Value=1/4/20/Qualified-user. Gross/net breakdown; the upgrade prompt must not promise returns, only higher limits |
| `Reservation-Calculater` | 3481:3102 | Reservation summary with «عائد الاستثمار 12%»: read the return as expected and show net after the fee beside gross |
| `ReturnsDisplay` | 4241:1368 | Label must say it includes expected profit |
| `KeyValue` | 1739:122 | Label/value rows, Emphasis=default/strong |

## Examples

| Do | Don't |
| --- | --- |
| «نسبة صافي العائد 15.8% سنوياً» | «عائد 16%» (gross, no unit, no «نسبة») |
| «صافي الربح المتوقع 21,120.00 ر.س» | «نسبة صافي الربح 21,120.00 ر.س» |
| "Net expected profit 21,120.00 SAR" | "Profit 21,333 SAR" headline with net hidden |
| Received «4,800.00 ر.س» · Expected remaining «16,320.00 ر.س» | «أرباحك 21,120 ر.س» before any payout |
| «نسبة العائد للمدة 21.1% (16 شهراً)» | «21% عائد» with no term |
| `15.8%` | `15.84%` on a headline, `16%` rounded up |

## Sources

- CMA, CMI Regs, Art. 46, Annex 5.1 items 3, 9: https://cma.org.sa/en/RulesRegulations/Regulations/Documents/the_Capital_Market_Institutions_Regulations_en.pdf
- CMA, Investment Funds Regulations, amended 21/5/2025, Art. 72(c), (d) (benchmark): https://cma.org.sa/en/RulesRegulations/Regulations/Documents/Investment_Funds_Regulations_2025_EN.pdf
- SAMA Rulebook: Principle 2, Rule 5; Fees Guide Art. 3, 4; Advertising Art. 3.5: https://rulebook.sama.gov.sa/en/entiresection/1375
- Safqah product rules: deal rate is annual; fee deducted from profit; fee basis corrected to 1% of profit on 30 Sep 2026 (earlier flat 3,000.00 incl. VAT mock-up); green only for profit.
- `references/data/content/numbers-currency.md`, `references/data/content/glossary.md`; components in `references/data/components-index.json`.
- Full source file: `references/data/ux/compliance/fees-returns.md`.
