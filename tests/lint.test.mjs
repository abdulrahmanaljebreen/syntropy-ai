import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { lintSource, RULES, inferKind } from '../lint/index.mjs';

const only = (findings, rule) => findings.filter((f) => f.rule === rule);
const lint = (src, filename, kind) => lintSource(src, { filename, kind });

describe('interface', () => {
  test('RULES lists all 13 rules with id, severity, description, appliesTo', () => {
    const ids = RULES.map((r) => r.id).sort();
    assert.deepEqual(ids, [
      'contrast', 'currency-position', 'eastern-arabic-numerals', 'fake-urgency', 'no-em-dash',
      'no-raw-color', 'no-raw-radius', 'no-raw-spacing', 'off-palette-color', 'percent-label-nisba',
      'physical-direction', 'unknown-component', 'unknown-variant',
    ]);
    for (const r of RULES) {
      assert.ok(['error', 'warning'].includes(r.severity));
      assert.ok(r.description.length > 10);
      assert.ok(Array.isArray(r.appliesTo) && r.appliesTo.length);
    }
  });

  test('findings have the documented shape and are sorted by line', () => {
    const f = lint('.b { margin-left: 13px; }\n.a { color: #4daa57; }\n', 'x.css');
    assert.ok(f.length >= 3);
    for (const x of f) {
      assert.deepEqual(Object.keys(x).sort(), ['column', 'fix', 'line', 'message', 'rule', 'severity']);
      assert.equal(typeof x.line, 'number');
      assert.equal(typeof x.column, 'number');
    }
    for (let i = 1; i < f.length; i++) assert.ok(f[i - 1].line <= f[i].line);
  });

  test('kind is inferred from the extension and can be overridden', () => {
    assert.equal(inferKind('a.scss'), 'css');
    assert.equal(inferKind('a.tsx'), 'js');
    assert.equal(inferKind('a.dart'), 'dart');
    assert.equal(inferKind('a.vue'), 'html');
    assert.equal(inferKind('README.md'), 'text');
    assert.equal(inferKind('noext'), 'text');
    assert.equal(only(lint('.a{color:#4daa57}', 'notes.txt'), 'no-raw-color').length, 0);
    assert.equal(only(lint('.a{color:#4daa57}', 'notes.txt', 'css'), 'no-raw-color').length, 1);
  });

  test('empty input and missing options are safe', () => {
    assert.deepEqual(lintSource(''), []);
    assert.deepEqual(lintSource('hello'), []);
  });

  test('inline suppressions', () => {
    const src = '.a {\n  /* syntropy-lint-disable-next-line no-raw-color */\n  color: #4daa57;\n  background: #4daa57; /* syntropy-lint-disable-line */\n}';
    assert.equal(only(lint(src, 'a.css'), 'no-raw-color').length, 0);
    const file = '/* syntropy-lint-disable physical-direction */\n.a { margin-left: var(--space-sm); }';
    assert.equal(lint(file, 'a.css').length, 0);
  });
});

describe('no-raw-color', () => {
  test('suggests the semantic token by context', () => {
    const f = only(lint('.a { background: #4daa57; color: #111312; border: 1px solid #d6edd9; }', 'a.css'), 'no-raw-color');
    assert.equal(f.length, 3);
    assert.match(f[0].message, /raw color #4daa57: use token bg\/brand\/primary/);
    assert.equal(f[0].fix, 'var(--bg-brand-primary)');
    assert.match(f[1].message, /text\/default/);
    assert.equal(f[1].severity, 'error');
  });

  test('text context on brand green prefers text/brand/primary', () => {
    const f = only(lint('a { color: #4DAA57 }', 'a.css'), 'no-raw-color');
    assert.match(f[0].message, /use token text\/brand\/primary/);
  });

  test('rgb() and hsl() literals are converted', () => {
    const f = only(lint('.a { background: rgb(77, 170, 87); color: hsl(0 0% 100%); }', 'a.css'), 'no-raw-color');
    assert.equal(f.length, 2);
    assert.match(f[0].message, /bg\/brand\/primary/);
  });

  test('Dart Color(0xFF...) is caught and container color maps to bg/*', () => {
    const f = only(lint('final c = Container(color: Color(0xFF4DAA57));\nfinal t = TextStyle(color: Color(0xFF111312));', 'w.dart'), 'no-raw-color');
    assert.equal(f.length, 2);
    assert.match(f[0].message, /Color\(0xFF4DAA57\): use token bg\/brand\/primary/);
    assert.match(f[1].message, /text\/default/);
  });

  test('tokens, comments, links and token files are not flagged', () => {
    assert.equal(lint('.a { color: var(--text-default); }', 'a.css').length, 0);
    assert.equal(only(lint('// see #fff for details\nconst x = 1;', 'a.js'), 'no-raw-color').length, 0);
    assert.equal(only(lint('<a href="#abc">top</a>', 'a.html'), 'no-raw-color').length, 0);
    assert.equal(only(lint(':root { --bg-brand-primary: #4daa57; }', 'build/tokens.css'), 'no-raw-color').length, 0);
    assert.equal(only(lint('.a { color: var(--brand, #4daa57); }', 'a.css'), 'no-raw-color').length, 0);
  });
});

describe('off-palette-color', () => {
  test('a hex not in the token set is an error with the nearest token', () => {
    const f = lint('.a { color: #02AD4C; }', 'a.css');
    assert.equal(only(f, 'no-raw-color').length, 0);
    const o = only(f, 'off-palette-color');
    assert.equal(o.length, 1);
    assert.equal(o[0].severity, 'error');
    assert.match(o[0].message, /off-palette color #02AD4C: not in the Syntropy palette, use the nearest token text\//);
  });

  test('palette colors (including alpha tokens) are not off-palette', () => {
    assert.equal(only(lint('.a { background: #0000001a; color: #ffffff; }', 'a.css'), 'off-palette-color').length, 0);
  });

  test('Dart off-palette color', () => {
    assert.equal(only(lint('Container(color: Color(0xFF123456))', 'a.dart'), 'off-palette-color').length, 1);
  });
});

describe('no-raw-spacing', () => {
  test('on-scale px values suggest the space token (warning)', () => {
    const f = only(lint('.a { padding: 16px 24px; gap: 8px; }', 'a.css'), 'no-raw-spacing');
    assert.deepEqual(f.map((x) => x.message), [
      'raw spacing 16px: use token space/lg',
      'raw spacing 24px: use token space/2xl',
      'raw spacing 8px: use token space/sm',
    ]);
    assert.ok(f.every((x) => x.severity === 'warning'));
    assert.equal(f[0].fix, 'var(--space-lg)');
  });

  test('off-scale values are errors', () => {
    const f = only(lint('.a { margin-top: 13px; }', 'a.css'), 'no-raw-spacing');
    assert.equal(f[0].severity, 'error');
    assert.match(f[0].message, /off-scale spacing 13px: .*space\/md \(12px\) or space\/lg \(16px\)/);
  });

  test('var() tokens, unitless zero and non-spacing properties pass', () => {
    assert.equal(only(lint('.a { padding: var(--space-lg); margin: 0; font-size: 13px; width: 13px; }', 'a.css'), 'no-raw-spacing').length, 0);
  });

  test('JS style objects, Tailwind arbitrary values and Dart EdgeInsets', () => {
    assert.equal(only(lint('const s = { paddingTop: 12, marginBlock: "13px" };', 'a.jsx'), 'no-raw-spacing').length, 2);
    assert.equal(only(lint('<div className="p-[13px] gap-4" />', 'a.tsx'), 'no-raw-spacing').length, 1);
    const d = only(lint('Padding(padding: EdgeInsetsDirectional.all(13), child: SizedBox(height: 16))', 'a.dart'), 'no-raw-spacing');
    assert.equal(d.length, 2);
    assert.equal(d[0].severity, 'error');
    assert.match(d[1].message, /space\/lg/);
  });
});

describe('no-raw-radius', () => {
  test('px radius maps to radius tokens', () => {
    const f = only(lint('.a { border-radius: 20px; } .b { border-top-left-radius: 8px; }', 'a.css'), 'no-raw-radius');
    assert.equal(f.length, 2);
    assert.match(f[0].message, /raw radius 20px: use token radius\/default/);
    assert.match(f[1].message, /radius\/md/);
    assert.equal(f[0].severity, 'warning');
  });

  test('off-scale radius names the nearest steps', () => {
    const f = only(lint('.a { border-radius: 10px; }', 'a.css'), 'no-raw-radius');
    assert.match(f[0].message, /off-scale radius 10px.*radius\/md \(8px\) or radius\/lg \(12px\)/);
  });

  test('tokens pass; Dart BorderRadius.circular and Tailwind are checked', () => {
    assert.equal(only(lint('.a { border-radius: var(--radius-default); }', 'a.css'), 'no-raw-radius').length, 0);
    assert.equal(only(lint('BorderRadius.circular(12)', 'a.dart'), 'no-raw-radius').length, 1);
    assert.equal(only(lint('<i className="rounded-[12px] rounded-lg" />', 'a.tsx'), 'no-raw-radius').length, 1);
  });
});

describe('physical-direction', () => {
  test('CSS properties and values', () => {
    const src = '.a { margin-left: var(--space-sm); padding-right: 0; left: 0; text-align: left; float: right; border-left: 1px solid; border-top-right-radius: 0; }';
    const f = only(lint(src, 'a.css'), 'physical-direction');
    assert.deepEqual(f.map((x) => x.fix), [
      'margin-inline-start', 'padding-inline-end', 'inset-inline-start', 'text-align: start',
      'float: inline-end', 'border-inline-start', 'border-start-end-radius',
    ]);
    assert.ok(f.every((x) => x.severity === 'error'));
  });

  test('logical CSS passes', () => {
    const src = '.a { margin-inline-start: 0; inset-inline-end: 0; text-align: start; border-inline-start: 0; }\n.b:hover { top: 0; }';
    assert.equal(only(lint(src, 'a.css'), 'physical-direction').length, 0);
  });

  test('Tailwind sample', () => {
    const src = '<div className="ml-2 mr-auto pl-4 pr-1 -left-2 right-0 text-left md:text-right rounded-l-lg rounded-tr-md border-l-2 rounded-lg border-lime-500 ms-2 text-start">x</div>';
    const f = only(lint(src, 'a.tsx'), 'physical-direction');
    assert.deepEqual(f.map((x) => x.fix), [
      'ms-2', 'me-auto', 'ps-4', 'pe-1', '-start-2', 'end-0', 'text-start', 'md:text-end',
      'rounded-s-lg', 'rounded-se-md', 'border-s-2',
    ]);
    assert.match(f[0].message, /physical direction class "ml-2": use ms-2/);
  });

  test('Tailwind in HTML class and cn() calls', () => {
    assert.equal(only(lint('<p class="pl-2 ps-2">x</p>', 'a.html'), 'physical-direction').length, 1);
    assert.equal(only(lint('const c = cn("mr-4", ok && "me-4");', 'a.ts'), 'physical-direction').length, 1);
  });

  test('JS style objects', () => {
    const f = only(lint('const s = { marginLeft: 8, paddingInlineStart: 4, textAlign: "right" };', 'a.js'), 'physical-direction');
    assert.deepEqual(f.map((x) => x.fix), ['marginInlineStart', "textAlign: 'end'"]);
  });

  test('Dart sample', () => {
    const src = [
      'Widget build(BuildContext context) {',
      '  return Stack(children: [',
      '    Positioned(left: 0, top: 0, child: Text("x", textAlign: TextAlign.right)),',
      '    Container(',
      '      padding: EdgeInsets.only(left: SyntropySpace.lg),',
      '      margin: EdgeInsets.fromLTRB(0, 0, 0, 0),',
      '      alignment: Alignment.centerLeft,',
      '    ),',
      '  ]);',
      '}',
    ].join('\n');
    const f = only(lint(src, 'a.dart'), 'physical-direction');
    assert.deepEqual(f.map((x) => x.fix), [
      'PositionedDirectional(start:/end:)', 'TextAlign.end', 'EdgeInsetsDirectional.only(start:/end:)',
      'EdgeInsetsDirectional.fromSTEB', 'AlignmentDirectional.centerStart',
    ]);
    assert.equal(f[0].line, 3);
  });

  test('directional Dart passes', () => {
    const src = 'PositionedDirectional(start: 0, child: Text("x", textAlign: TextAlign.start, style: TextStyle(fontSize: 14)))\nEdgeInsets.only(top: SyntropySpace.lg)\nAlignmentDirectional.centerStart';
    assert.equal(only(lint(src, 'a.dart'), 'physical-direction').length, 0);
  });
});

describe('no-em-dash', () => {
  test('flags U+2014 in copy and code', () => {
    const f = only(lint('Invest today \u2014 safely', 'a.md'), 'no-em-dash');
    assert.equal(f.length, 1);
    assert.equal(f[0].column, 14);
    assert.equal(only(lint('const t = "a \u2014 b"; // x \u2014 y', 'a.js'), 'no-em-dash').length, 2);
  });

  test('hyphen and en dash pass', () => {
    assert.equal(only(lint('2024-2025 and 1–2', 'a.md'), 'no-em-dash').length, 0);
  });
});

describe('eastern-arabic-numerals', () => {
  test('flags Eastern Arabic and Persian digits with a Western fix', () => {
    const f = only(lint('المبلغ ١٬٢٥٠٫٥٠ ر.س و ۳ أيام', 'a.md'), 'eastern-arabic-numerals');
    assert.equal(f.length, 2);
    assert.equal(f[0].fix, '1,250.50');
    assert.equal(f[1].fix, '3');
  });

  test('Western digits pass', () => {
    assert.equal(only(lint('المبلغ 1,250.50 ر.س', 'a.md'), 'eastern-arabic-numerals').length, 0);
  });
});

describe('currency-position', () => {
  test('currency before the amount in Arabic copy', () => {
    const f = only(lint('ادفع ر.س 100 الآن\nالحد ﷼5000\nالمبلغ SAR 250 فقط', 'a.md'), 'currency-position');
    assert.equal(f.length, 3);
    assert.equal(f[0].fix, '100 ر.س');
    assert.equal(f[1].fix, '5000 ر.س');
    assert.match(f[0].message, /write the amount first/);
  });

  test('amount then currency, and English SAR-first, pass', () => {
    assert.equal(only(lint('المبلغ 1,250.00 ر.س\nPay SAR 1,250.00 today', 'a.md'), 'currency-position').length, 0);
  });
});

describe('percent-label-nisba', () => {
  test('Arabic % label without نسبة', () => {
    const f = only(lint('العائد السنوي 16%', 'a.md'), 'percent-label-nisba');
    assert.equal(f.length, 1);
    assert.match(f[0].message, /نسبة/);
  });

  test('نسبة / معدل labels, SAR amounts and English pass', () => {
    const src = 'نسبة صافي العائد 13.75%\nمعدل العائد الداخلي 18%\nصافي الربح 18,333 ر.س\nNet return 16%';
    assert.equal(only(lint(src, 'a.md'), 'percent-label-nisba').length, 0);
  });
});

describe('unknown-component', () => {
  test('JSX, Dart and spec references not in the manifest', () => {
    const j = only(lint('<Syntropy.Buton label="x" />', 'a.tsx'), 'unknown-component');
    assert.equal(j.length, 1);
    assert.match(j[0].message, /unknown component "Buton".*did you mean Button\?/);
    assert.equal(j[0].fix, 'Button');
    assert.equal(only(lint('SafqahCardDael(title: "x")', 'a.dart'), 'unknown-component')[0].fix, 'CardDeal');
    assert.equal(only(lint('component: Botom Sheet', 'spec.md'), 'unknown-component')[0].fix, 'BottomSheet');
  });

  test('known names pass (case and spaces ignored)', () => {
    const src = '<Syntropy.Button />\n<Syntropy.BottomSheet />';
    assert.equal(only(lint(src, 'a.tsx'), 'unknown-component').length, 0);
    assert.equal(only(lint('component: bottom sheet\ncomponent: `CardDeal`', 'spec.md'), 'unknown-component').length, 0);
    assert.equal(only(lint('SafqahButton(label: "x")', 'a.dart'), 'unknown-component').length, 0);
  });
});

describe('unknown-variant', () => {
  test('JSX props with unknown values', () => {
    const f = only(lint('<Syntropy.Button variant="primaryy" size="xl" />', 'a.tsx'), 'unknown-variant');
    assert.equal(f.length, 2);
    assert.match(f[0].message, /unknown variant variant="primaryy" on Button: use primary/);
    assert.equal(f[0].fix, 'primary');
    assert.equal(f[1].fix, 'lg');
  });

  test('spec blocks and inline Variant= references', () => {
    const src = 'component: Button\nvariant: ghost\nsize: md\n\nUse a CardDeal State=Opened inside, with Button Variant=secondary.';
    const f = only(lint(src, 'spec.md'), 'unknown-variant');
    assert.equal(f.length, 2);
    assert.equal(f[0].line, 2);
    assert.match(f[1].message, /State="Opened" on CardDeal/);
  });

  test('valid values pass (case-insensitive, canonical options)', () => {
    assert.equal(only(lint('<Syntropy.Button variant="primary" size="md" direction="RTL" state="disabled" />', 'a.tsx'), 'unknown-variant').length, 0);
    assert.equal(only(lint('SafqahButton(variant: SafqahButtonVariant.secondary, size: "sm")', 'a.dart'), 'unknown-variant').length, 0);
  });

  test('Dart enum values', () => {
    assert.equal(only(lint('SafqahButton(variant: SafqahButtonVariant.ghost)', 'a.dart'), 'unknown-variant').length, 1);
  });
});

describe('fake-urgency', () => {
  test('English and Arabic pressure wording', () => {
    const f = only(lint('Only 3 left! Hurry, limited time. Act now, ending soon.\nسارع بالاستثمار لفترة محدودة، آخر فرصة، بادر الآن', 'a.md'), 'fake-urgency');
    assert.equal(f.length, 9);
    assert.ok(f.every((x) => x.severity === 'warning'));
  });

  test('neutral funding facts pass', () => {
    assert.equal(only(lint('Funding closes on 20 Oct 2026. 62% funded.\nيغلق الطرح في 20 أكتوبر', 'a.md'), 'fake-urgency').length, 0);
  });
});

describe('contrast', () => {
  test('white text on a status fill fails 4.5:1 and gives the ratio', () => {
    const f = only(lint('.chip { color: #ffffff; background-color: #34c759; }', 'a.css'), 'contrast');
    assert.equal(f.length, 1);
    assert.match(f[0].message, /contrast 2\.2\d:1 between color #ffffff and background #34c759 is below 4\.5:1/);
    assert.equal(f[0].severity, 'error');
  });

  test('brand green pairs as built are accepted (primary Button, selected tile)', () => {
    assert.equal(only(lint('.btn { color: #ffffff; background-color: #4daa57; }', 'a.css'), 'contrast').length, 0);
    assert.equal(only(lint('.btn { color: var(--text-on-brand); background: var(--bg-brand-primary); }', 'a.css'), 'contrast').length, 0);
    assert.equal(only(lint('.tile { color: var(--text-brand-primary); background: var(--bg-base); }', 'a.css'), 'contrast').length, 0);
    assert.equal(only(lint('<p style="color:#ffffff;background:#77c27f">x</p>', 'a.html'), 'contrast').length, 0);
  });

  test('resolves var(--token) names from resolved.json and local custom properties', () => {
    const f = only(lint('.a { color: var(--text-subtle); background: var(--bg-surface); }', 'a.css'), 'contrast');
    assert.equal(f.length, 1);
    assert.match(f[0].message, /text\/subtle/);
    const local = ':root { --muted: #c3c9c6; }\n.b { color: var(--muted); background: #ffffff; }';
    assert.equal(only(lint(local, 'a.css'), 'contrast').length, 1);
  });

  test('passing pairs and unresolvable values are silent', () => {
    assert.equal(only(lint('.a { color: var(--text-default); background: var(--bg-surface); }', 'a.css'), 'contrast').length, 0);
    assert.equal(only(lint('.a { color: var(--unknown); background: #fff; }', 'a.css'), 'contrast').length, 0);
    assert.equal(only(lint('.a { color: #fff; }', 'a.css'), 'contrast').length, 0);
  });

  test('HTML style attributes', () => {
    assert.equal(only(lint('<p style="color:#ffffff;background:#ff9500">x</p>', 'a.html'), 'contrast').length, 1);
  });
});

describe('samples', () => {
  test('clean files produce zero findings', () => {
    const css = [
      '.card {',
      '  color: var(--text-default);',
      '  background: var(--bg-surface);',
      '  padding: var(--space-lg) var(--space-xl);',
      '  margin-inline-start: var(--space-sm);',
      '  border-radius: var(--radius-default);',
      '  text-align: start;',
      '  width: 100%;',
      '}',
    ].join('\n');
    assert.deepEqual(lint(css, 'card.css'), []);
    const tsx = [
      "import { Syntropy } from '@safqah/syntropy';",
      'export const Deal = () => (',
      '  <div className="ms-4 ps-2 text-start rounded-s-lg gap-4">',
      '    <Syntropy.Button variant="primary" size="md" label="استثمر الآن" />',
      '    <p>نسبة صافي العائد 13.75%</p>',
      '    <p>1,250.00 ر.س</p>',
      '  </div>',
      ');',
    ].join('\n');
    assert.deepEqual(lint(tsx, 'Deal.tsx'), []);
    const dart = [
      'Widget build(BuildContext context) => Padding(',
      '  padding: EdgeInsetsDirectional.only(start: SyntropySpace.lg),',
      '  child: SafqahButton(variant: SafqahButtonVariant.primary, label: "استثمر"),',
      ');',
    ].join('\n');
    assert.deepEqual(lint(dart, 'deal.dart'), []);
    const md = '# Deal card\n\ncomponent: CardDeal\nstate: Available\n\nنسبة العائد المتوقع 16% · المبلغ 1,250.00 ر.س';
    assert.deepEqual(lint(md, 'spec.md'), []);
  });

  test('Arabic copy sample hits every copy rule', () => {
    const src = 'العائد السنوي ١٦% \u2014 سارع، ادفع ر.س 500 قبل الإغلاق';
    const rules = new Set(lint(src, 'copy.txt').map((f) => f.rule));
    for (const r of ['eastern-arabic-numerals', 'no-em-dash', 'fake-urgency', 'currency-position', 'percent-label-nisba']) {
      assert.ok(rules.has(r), r);
    }
  });

  test('fenced code in Markdown is linted with its language rules and right line numbers', () => {
    const md = 'Spec\n\n```css\n.a {\n  margin-left: 4px;\n}\n```\n';
    const f = lint(md, 'spec.md');
    const p = only(f, 'physical-direction');
    assert.equal(p.length, 1);
    assert.equal(p[0].line, 5);
    assert.equal(p[0].column, 3);
  });

  test('5k-line file lints quickly', () => {
    const src = Array.from({ length: 5000 }, (_, i) => `.c${i} { color: #111312; padding: 13px; margin-left: 4px; }`).join('\n');
    const t = Date.now();
    const f = lint(src, 'big.css');
    assert.ok(f.length >= 15000);
    assert.ok(Date.now() - t < 3000, `took ${Date.now() - t}ms`);
  });
});

test('markdown html-comment suppression with no rule list suppresses the line', async () => {
  const { lintSource } = await import('../lint/index.mjs');
  const md = 'Copy — here <!-- syntropy-lint-disable-line -->\n';
  assert.equal(lintSource(md, { filename: 'a.md' }).filter((f) => f.rule === 'no-em-dash').length, 0);
});

test('fee basis in parentheses is not a percentage label', () => {
  const f = lintSource('رسوم الإدارة (1% من الربح)\nصافي العائد 13.8%\n', { filename: 'a.md' }).filter((x) => x.rule === 'percent-label-nisba');
  assert.equal(f.length, 1);
  assert.equal(f[0].line, 2);
});
