import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { extractComponents, canonicalPropName, canonicalValue } from '../scripts/lib/components.mjs';

const pageNode = JSON.parse(readFileSync(new URL('./fixtures/button-page.json', import.meta.url)));
const page = { id: '69:889', code: '02a', name: 'Button', slug: 'button', family: '02 Actions', status: 'stable' };
const comps = extractComponents(pageNode, page);
const button = comps.find((c) => c.id === '417:2');

test('finds the Button set with its frames and key', () => {
  assert.equal(button.name, 'Button');
  assert.equal(button.kind, 'set');
  assert.equal(button.key, '69f940f6f7aa57f1a5c0637e6f128a63a1f7c6f4');
  assert.equal(button.variantCount, 3); // fixture keeps 3 of the 216 variants
  assert.equal(button.frames.doc, '465:2');
  assert.equal(button.frames.reference, '616:2383');
  assert.equal(button.frames.container, '616:2383');
});

test('keeps Figma names verbatim and adds canonical names', () => {
  const dir = button.props.find((p) => p.name === 'Direction');
  assert.deepEqual(dir.options, ['ltr', 'rtl']);
  assert.deepEqual(dir.canonicalOptions, ['LTR', 'RTL']);
  const lead = button.props.find((p) => p.name === 'Has icon leading');
  assert.equal(lead.canonical, 'hasIconLeading');
  assert.equal(lead.type, 'BOOLEAN');
  const icon = button.props.find((p) => p.name === 'Icon leading');
  assert.equal(icon.defaultComponent, 'Button Icon Placeholder');
});

test('standalone components count, nested ones inside instances do not', () => {
  assert.ok(comps.some((c) => c.id === '9:1' && c.kind === 'component' && c.description === 'Loading glyph'));
  assert.ok(!comps.some((c) => c.id === '9:3'));
  assert.equal(comps.length, 2);
});

test('canonical prop names across the three boolean styles', () => {
  assert.equal(canonicalPropName('Has icon leading#417:1'), 'hasIconLeading');
  assert.equal(canonicalPropName('showDescription'), 'showDescription');
  assert.equal(canonicalPropName('Show Label'), 'showLabel');
  assert.equal(canonicalPropName('HasIcon'), 'hasIcon');
  assert.equal(canonicalPropName('Property 1'), 'unnamed1');
});

test('direction values are upper-cased, others untouched', () => {
  assert.equal(canonicalValue('Direction', 'rtl'), 'RTL');
  assert.equal(canonicalValue('Size', 'md'), 'md');
});
