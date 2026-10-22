# Building a screen

The screen chassis for Safqah in Figma: frame sizes per size class, auto layout, safe areas, RTL, the parts every screen has, and how to caption screens. Open this before you create the first frame of a screen or flow.

## Rules
1. Arabic RTL is the canonical screen. Build it first; build the English LTR twin from it only when asked.
   Why: RTL bugs only surface when RTL is designed first.
2. Every screen frame uses vertical auto layout, fills `bg/surface` (or `bg/base` when the design calls for white), and has side padding bound to `space/lg` on compact.
   Why: content never touches the screen edge, and auto layout is what makes RTL and resizing work.
3. Use the frame size for the size class the person asked for (table below). Do not invent sizes.
   Why: frame sizes map to window size classes in code.
4. Respect safe areas: status bar at the top, home indicator (34) at the bottom; app bars sit below the status bar, tab bars and sheets carry their own bottom padding.
   Why: tappable UI in those zones collides with the OS.
5. Use Syntropy chrome: `AppBar` or `Header` at the top, `TabBar` at the bottom on main screens, `BottomSheet` for sheets, `BackButton` for back. iOS system chrome (status bar, keyboard, system alerts) comes from the iOS library only when the person asks for it.
   Why: chrome is the most redrawn element in legacy screens.
   Note: `AppBar` and `Header` are unpublished (`published: false`), so they can be instanced only inside the Syntropy file. In other files, reuse the Syntropy top bar instance already on the screen you are extending, or tell the person; never draw one.
6. Build RTL with the RTL variant of every instance, and lay the frame out so that start is on the right: the leading icon sits on the right, chevrons point left for "forward", the back arrow points right.
   Why: a single LTR instance inside an RTL screen is the most common RTL defect.
7. Copy is minimal: a label, the control, at most one short hint; Arabic first, Western digits (0-9), currency after the amount (`1,250.00 ر.س`), percent labels start with «نسبة».
   Why: Safqah's screens are restrained, and these are the content rules.
8. Caption each screen with one line starting "This is the screen when the user ...", placed above the frame in a text node using a Syntropy text style. Never number screens ("01", "Screen 3", "Step 2 of 7" in layer names).
   Why: numbers go stale when a flow changes; the caption says what state is shown.
9. Name frames by state in plain words (`Deal page / reserved`, `Bank account / name mismatch`), never with numbers.
   Why: same reason as the captions; names survive reordering.
10. One flow lives in one section on the page the person named; screens sit left to right in reading order with a fixed gap.
    Why: reviewers read flows as a strip.

## Frame sizes
| Size class | Frame | Side padding | Notes |
|---|---|---|---|
| Compact (phone, default) | 390 x 844 | `space/lg` (16) | Primary target. Status bar 44 to 54 top, home indicator 34 bottom |
| Compact, small phone check | 375 x 667 | `space/lg` | Only when the person asks for a small-screen check |
| Regular (tablet portrait) | 834 x 1194 | `space/2xl` (24) | Content column max 720, centered |
| Regular (tablet landscape) | 1194 x 834 | `space/2xl` | Split or two-column layouts, never one stretched column |
| Foldable outer (iPhone Duo) | 466 x 678 | `space/lg` | 84 pt vertical bar on the right, also in Arabic; usable 382 |
| Foldable inner (iPhone Duo) | 951 x 669 | `space/lg` | 84 pt vertical bar on the right; keep the fold at x 475 clear; even columns only |
| Foldable table pose | 669 x 951 | `space/lg` | Glanceable content top, controls and keyboard bottom |
| Web, back office and portal | 1440 x 1024 | `space/3xl` (32) | Content max 1200 to 1400, centered |

Window size class (compact or regular) is a property of the screen frame, never of a component.

## Chassis (compact, RTL)
```
Screen frame 390 x 844  · vertical auto layout · fill bg/surface · clip content
├─ Status bar (iOS library, only if asked)            44
├─ AppBar  Type="Inner screens" · Direction=RTL        (title, BackButton on the right)
├─ Content  vertical auto layout · FILL width · padding x space/lg · gap space/lg
│   ├─ Section  Size=Md · Direction=RTL               (section title)
│   ├─ ActionList  Style=Grouped · Direction=RTL      (ListItem rows)
│   └─ ...
├─ Footer  padding space/lg · Button Variant=primary Size=lg Direction=rtl, FILL width
└─ Home indicator space 34 (or TabBar Active=1 Direction=RTL on main screens)
```
```js
const screen = figma.createFrame();
screen.name = 'Bank account / name mismatch';
screen.resize(390, 844);
screen.layoutMode = 'VERTICAL';
screen.primaryAxisSizingMode = 'FIXED';
screen.counterAxisSizingMode = 'FIXED';
screen.clipsContent = true;
bindPaint(screen, 'fills', V['bg/surface']);                  // see variables-binding.md
const content = figma.createFrame();
content.layoutMode = 'VERTICAL';
screen.appendChild(content);
content.layoutSizingHorizontal = 'FILL';                      // set sizing AFTER appendChild and resize
content.layoutSizingVertical = 'FILL';
for (const k of ['paddingLeft', 'paddingRight']) content.setBoundVariable(k, V['space/lg']);
content.setBoundVariable('itemSpacing', V['space/lg']);
```

## RTL checklist for a screen
| Check | RTL | LTR twin |
|---|---|---|
| Every instance's Direction | RTL value | LTR value |
| Text alignment | start = right | start = left |
| Back arrow | `Icon / arrow-right` | `Icon / arrow-left` |
| Row chevron ("go forward") | `Icon / chevron-left` | `Icon / chevron-right` |
| Progress fill, slider, stepper | fills from the right | from the left |
| Digits, phone numbers, IBAN, dates | never reversed | never reversed |
| Logos, clock and play icons, checkmarks, charts' time axis | do not mirror | do not mirror |

## Captions
| Do | Don't |
|---|---|
| "This is the screen when the user opens a deal that is fully reserved." | "Screen 4: Reserved" |
| "This is the screen when the user taps «سحب» with no bank account linked." | "Step 2/7 Withdraw (WIP)" |
| One caption line per screen, `body / 14 / regular`, `text/muted` | Paragraphs of explanation on the canvas |

## Copy examples
| Do (Arabic first) | Don't |
|---|---|
| «استثمر الآن» / "Invest now" | «اضغط هنا للاستثمار الآن بسرعة قبل فوات الفرصة!» |
| «نسبة العائد المتوقع 12.5%» | «العائد ١٢٫٥٪» | <!-- syntropy-lint-disable-line: intentional example -->
| «1,250.00 ر.س» / "1,250.00 SAR" | «ر.س 1,250.00» / "SR 1,250" | <!-- syntropy-lint-disable-line: intentional example -->
| One hint under a field: «كما يظهر في شهادة الآيبان» | An Alert, a Toast and a Banner on the same screen |

## Sources
- `knowledge/foundations/figma/layout.md` (spacing, breakpoints, safe areas, iPhone Duo)
- `knowledge/ux/rtl.md` (what mirrors and what does not)
- `knowledge/content/numbers-currency.md`
