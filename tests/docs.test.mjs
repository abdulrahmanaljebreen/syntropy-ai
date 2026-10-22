import { test } from 'node:test';
import assert from 'node:assert/strict';
import { docToMarkdown } from '../scripts/lib/docs.mjs';

const T = (characters, name = 'text', extra = {}) => ({ type: 'TEXT', name, characters, ...extra });
const I = (name, children) => ({ type: 'INSTANCE', name, children });
const F = (name, children, extra = {}) => ({ type: 'FRAME', name, children, ...extra });

const doc = F('Button Doc Page', [
  I('Page Header', [T('Finished'), T('Author'), T('@A'), T('Last updated'), T('2026-05-19'), T('Version'), T('2.0.0'), T('Button'), T('The primary action.')]),
  F('Section · Overview', [
    I('Section Header', [T('Overview')]),
    I('Body Paragraph', [T('Buttons trigger actions — one per screen.')]),
    I('Button', [T('Invest now', 'label')]),
  ]),
  F('Section · Tokens', [
    I('Section Header', [T('Tokens')]),
    I('Token Mapping Row', [T('Background'), T('bg/brand/primary'), T('See sample'), T('Resting fill.')]),
    I('Token Mapping Row', [T('Label'), T('text/on-brand'), T('See sample'), T('On brand.')]),
    F('Contrast', [T('primary'), T('Light'), T('4.6:1')], { layoutMode: 'HORIZONTAL' }),
  ]),
  F('Section · Code', [I('Code Block', [T('Dart'), T('Copy'), T("SafqahButton(label: 'Go')")])]),
  F('Section · Usage', [I('Do Dont Card', [T('Do'), T('Scenario · Confirm'), I('Button', [T('Invest', 'label')]), T('One primary per screen.')])]),
  F('Section · Resources', [I('Resource Link', [T('🔗'), T('Material Buttons', 'l', { style: { hyperlink: { url: 'https://m3.material.io' } } }), T('→')])]),
  I('Footer', [T('Syntropy')]),
]);

const { meta, markdown, sections } = docToMarkdown(doc);

test('page header becomes metadata', () => {
  assert.deepEqual(meta, { status: 'Finished', updated: '2026-05-19', version: '2.0.0', title: 'Button', summary: 'The primary action.' });
});

test('sections, paragraphs and previews', () => {
  assert.deepEqual(sections, ['Overview', 'Tokens', 'Code', 'Usage', 'Resources']);
  assert.match(markdown, /## Overview\n\nButtons trigger actions, one per screen\./);
  assert.doesNotMatch(markdown, /Invest now/, 'component previews are skipped');
  assert.doesNotMatch(markdown, /—/);
});

test('token rows become one table', () => {
  assert.match(markdown, /\| Slot \| Token \| Notes \|\n\| --- \| --- \| --- \|\n\| Background \| `bg\/brand\/primary` \| Resting fill\. \|\n\| Label \| `text\/on-brand` \| On brand\. \|/);
  assert.match(markdown, /\| primary \| Light \| 4\.6:1 \|/);
});

test('code, do-dont and links', () => {
  assert.match(markdown, /```dart\nSafqahButton\(label: 'Go'\)\n```/);
  assert.match(markdown, /- \*\*Do\*\* · Scenario · Confirm: One primary per screen\./);
  assert.match(markdown, /- \[Material Buttons\]\(https:\/\/m3\.material\.io\)/);
  assert.doesNotMatch(markdown, /Syntropy\n/);
});
