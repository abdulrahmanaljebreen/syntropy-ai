import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIconRecords, buildIllustrationRecords } from '../scripts/lib/icons.mjs';

const iconsPage = {
  document: {
    children: [
      { type: 'FRAME', name: 'Communication', children: [
        { type: 'COMPONENT', id: '24:40', name: 'Icon / voice-mail', absoluteBoundingBox: { width: 24 } },
        { type: 'INSTANCE', id: '24:41', name: 'Icon / ghost', children: [{ type: 'COMPONENT', id: '24:42', name: 'nested' }] },
      ] },
      { type: 'FRAME', name: '📖 Syntropy Icons, Documentation', children: [
        { type: 'COMPONENT', id: '99:1', name: 'Icon / doc-only' },
      ] },
    ],
  },
  components: { '24:40': { key: 'abc' } },
};

test('icon record has slug, category, size, key and published flag', () => {
  const [icon, ...rest] = buildIconRecords(iconsPage, new Set(['24:40']));
  assert.equal(rest.length, 0, 'instances and documentation frames are skipped');
  assert.deepEqual(icon, {
    name: 'Icon / voice-mail', slug: 'voice-mail', words: ['voice', 'mail'], category: 'Communication',
    size: 24, id: '24:40', key: 'abc', published: true,
  });
});

test('unpublished icons are marked', () => {
  const [icon] = buildIconRecords(iconsPage, new Set());
  assert.equal(icon.published, false);
});

test('illustration concepts come from the variant property', () => {
  const page = {
    document: { children: [{ type: 'COMPONENT_SET', id: '228:89', name: 'Illustrations', componentPropertyDefinitions: {
      'Property 1': { type: 'VARIANT', variantOptions: ['Scheduled', 'Bank'] },
      Alignment: { type: 'VARIANT', variantOptions: ['Left', 'Right'] },
    } }] },
    componentSets: { '228:89': { key: 'k1' } },
  };
  const recs = buildIllustrationRecords(page);
  assert.equal(recs.length, 2);
  assert.deepEqual(recs[1], { concept: 'Bank', set: 'Illustrations', setId: '228:89', setKey: 'k1', figmaProperty: 'Property 1', alignments: ['Left', 'Right'] });
});
