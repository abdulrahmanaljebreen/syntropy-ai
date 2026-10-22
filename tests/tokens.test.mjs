import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTokens, cleanText } from '../scripts/lib/tokens.mjs';

const sources = {
  collections: [
    { collection: 'Primitive Core', modes: ['Default'], vars: [
      ['Color/Primary/LightGreen/500', 'COLOR', { Default: '#4daa57' }, 'Brand — green', 'ALL_FILLS', 0],
      ['Color/Alpha/Black/50', 'COLOR', { Default: '#00000080' }, '', 'ALL_FILLS', 0],
      ['Radius/12', 'FLOAT', { Default: 12 }, '', 'CORNER_RADIUS', 0],
    ] },
    { collection: 'Primitive / Typography', modes: ['Arabic', 'English'], vars: [
      ['Font/Size/14', 'FLOAT', { Arabic: 14, English: 14 }, '', 'FONT_SIZE', 0],
      ['Font/Weight/Regular', 'FLOAT', { Arabic: 400, English: 400 }, '', 'FONT_WEIGHT', 0],
      ['Font/Family/Base', 'STRING', { Arabic: 'IBM Plex Sans Arabic', English: 'IBM Plex Sans Arabic' }, 'v1&amp;amp;amp;#39;s', 'FONT_FAMILY', 0],
    ] },
    { collection: 'Semantic', modes: ['Light', 'Dark'], vars: [
      ['bg/brand/primary', 'COLOR', { Light: { alias: 'Primitive Core::Color/Primary/LightGreen/500' }, Dark: { alias: 'Primitive Core::Color/Alpha/Black/50' } }, '[Themable] CTAs.', 'ALL_FILLS', 0],
      ['border/focus', 'COLOR', { Light: { alias: 'Semantic::bg/brand/primary' }, Dark: { alias: 'Semantic::bg/brand/primary' } }, '[Locked] Focus.', 'STROKE_COLOR', 0],
      ['radius/lg', 'FLOAT', { Light: { alias: 'Primitive Core::Radius/12' }, Dark: { alias: 'Primitive Core::Radius/12' } }, '', 'CORNER_RADIUS', 0],
      ['font/size/14', 'FLOAT', { Light: { alias: 'Primitive / Typography::Font/Size/14' }, Dark: { alias: 'Primitive / Typography::Font/Size/14' } }, '', 'ALL_SCOPES', 0],
      ['font/line-height/body', 'FLOAT', { Light: { alias: 'Primitive / Typography::Font/LineHeight/Normal' }, Dark: { alias: 'Primitive / Typography::Font/LineHeight/Normal' } }, '', 'LINE_HEIGHT', 0],
    ] },
  ],
  styles: {
    text: [['body / 14 / regular', 'IBM Plex Sans Arabic', 'Regular', 14, '21', '0%', '', { fontSize: 'Semantic::font/size/14' }]],
    effect: [{ name: 'Shadow/xs', description: '', layers: [{ type: 'DROP_SHADOW', color: '#0000001a', x: 0, y: 1, blur: 8, spread: 0, bound: {} }] }],
  },
};
const out = buildTokens(sources);

test('primitive color becomes a DTCG color with hex', () => {
  const t = out.files['primitive.json'].Color.Primary.LightGreen['500'];
  assert.equal(t.$type, 'color');
  assert.equal(t.$value.hex, '#4daa57');
  assert.deepEqual(t.$value.components, [0.302, 0.667, 0.341]);
  assert.equal(t.$description, 'Brand, green', 'em dash is removed from descriptions');
});

test('alpha is kept', () => {
  assert.equal(out.files['primitive.json'].Color.Alpha.Black['50'].$value.alpha, 0.502);
});

test('semantic per-mode files use references', () => {
  assert.equal(out.files['semantic.light.json'].bg.brand.primary.$value, '{Color.Primary.LightGreen.500}');
  assert.equal(out.files['semantic.dark.json'].bg.brand.primary.$value, '{Color.Alpha.Black.50}');
  assert.equal(out.files['semantic.light.json'].radius.lg.$type, 'dimension');
  assert.equal(out.files['semantic.light.json'].font.size['14'].$type, 'dimension');
});

test('resolved table follows alias chains and keeps the lock tag', () => {
  assert.deepEqual(out.resolved['border/focus'].value, { Light: '#4daa57', Dark: '#00000080' });
  assert.equal(out.resolved['border/focus'].tag, 'locked');
  assert.equal(out.resolved['bg/brand/primary'].tag, 'themable');
  assert.deepEqual(out.resolved['radius/lg'].value, { Light: 12, Dark: 12 });
});

test('aliases to missing variables are reported and left out', () => {
  assert.ok(out.issues.some((i) => i.token === 'font/line-height/body' && /missing/.test(i.issue)));
  assert.equal(out.files['semantic.light.json'].font['line-height'], undefined);
});

test('text styles and shadows become composite tokens', () => {
  const ts = out.files['text-styles.json'].body['14'].regular;
  assert.equal(ts.$type, 'typography');
  assert.equal(ts.$value.fontSize, '{font.size.14}');
  assert.deepEqual(ts.$value.lineHeight, { value: 21, unit: 'px' });
  const sh = out.files['shadows.json'].shadow.xs;
  assert.equal(sh.$type, 'shadow');
  assert.equal(sh.$value[0].offsetY.value, 1);
});

test('cleanText fixes entities and em dashes', () => {
  assert.equal(cleanText('v1&amp;amp;amp;#39;s'), "v1's");
  assert.equal(cleanText('a — b'), 'a, b');
});
