import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { classifyPages, slugify } from '../scripts/lib/pages.mjs';

const pages = JSON.parse(readFileSync(new URL('./fixtures/pages.json', import.meta.url)));
const r = classifyPages(pages);
const all = [...r.guides, ...r.foundations, ...r.families, ...r.components];

test('private and internal pages never appear in any output list', () => {
  for (const id of ['69:976', '69:977']) assert.ok(!all.some((p) => p.id === id), id);
  assert.ok(!JSON.stringify(all).includes('Lab'));
});

test('governance pages are excluded', () => {
  assert.ok(!all.some((p) => p.id === '69:973'));
});

test('button page gets code, slug and family', () => {
  const b = r.components.find((p) => p.id === '69:889');
  assert.equal(b.code, '02a');
  assert.equal(b.name, 'Button');
  assert.equal(b.slug, 'button');
  assert.equal(b.family, '02 Actions');
  assert.equal(b.status, 'stable');
});

test('odd page names are cleaned', () => {
  const by = (id) => r.components.find((p) => p.id === id);
  assert.equal(by('3895:4429').name, 'NumericStepper');
  assert.equal(by('3618:122305').code, '08c');
  assert.equal(by('69:906').name, 'DatePicker & TimePicker');
  assert.equal(by('69:958').status, 'wip');
  assert.equal(by('69:958').name, 'GoalTracker');
  assert.equal(by('2733:3327').name, 'Table');
});

test('foundations, guides and families are found', () => {
  assert.deepEqual(r.foundations.map((p) => p.slug), ['colors', 'typography', 'layout', 'logos', 'icons', 'effects', 'illustrations']);
  assert.equal(r.guides.length, 3);
  assert.equal(r.families.length, 7);
  assert.equal(r.components.length, 85);
});

test('slugify handles PascalCase and symbols', () => {
  assert.equal(slugify('IconButton'), 'icon-button');
  assert.equal(slugify('Status/issuance Badge'), 'status-issuance-badge');
  assert.equal(slugify('Loader (Spinner)'), 'loader');
  assert.equal(slugify('Sharia & CMA Disclosure'), 'sharia-cma-disclosure');
});
