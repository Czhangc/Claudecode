import { describe, expect, it } from 'vitest';
import { validateContent, type ContentInput } from './validateContentCore';

const sourceIds = new Set(['S01', 'S02']);
const card = (front: string, body = '正文') => `---\n${front}\n---\n${body}`;
const good = `id: card-a
module: nutrition
title: 标题
summary: 摘要
sources:
  - id: S01
status: verified
verifiedBy: cccc
verifiedAt: 2026-10-29`;

const run = (partial: Partial<ContentInput>) =>
  validateContent({ sourceIds, cards: [], json: [], today: '2026-10-29', ...partial });

describe('validateContent', () => {
  it('accepts a well-formed verified card', () => {
    expect(run({ cards: [{ file: 'a.md', raw: card(good) }] }).errors).toEqual([]);
  });

  it('fails a card with no sources', () => {
    const raw = card(good.replace('sources:\n  - id: S01', 'sources: []'));
    expect(run({ cards: [{ file: 'a.md', raw }] }).errors.join()).toContain('sources 为空');
  });

  it('fails a card missing the sources field', () => {
    const raw = card(good.replace('sources:\n  - id: S01\n', ''));
    expect(run({ cards: [{ file: 'a.md', raw }] }).errors.join()).toContain('缺少 sources');
  });

  it('fails a card citing an unregistered source', () => {
    const raw = card(good.replace('id: S01', 'id: S99'));
    expect(run({ cards: [{ file: 'a.md', raw }] }).errors.join()).toContain('S99');
  });

  it.each(['id', 'title', 'summary', 'status'])('fails a card missing %s', (field) => {
    const raw = card(good.split('\n').filter((l) => !l.startsWith(`${field}:`)).join('\n'));
    expect(run({ cards: [{ file: 'a.md', raw }] }).errors.join()).toContain(`缺少 ${field}`);
  });

  it('fails verified cards without verifiedBy / verifiedAt', () => {
    const raw = card(good.replace('verifiedBy: cccc\n', '').replace('verifiedAt: 2026-10-29', ''));
    const errors = run({ cards: [{ file: 'a.md', raw }] }).errors.join();
    expect(errors).toContain('verifiedBy');
    expect(errors).toContain('verifiedAt');
  });

  it('fails duplicate IDs', () => {
    const errors = run({ cards: [{ file: 'a.md', raw: card(good) }, { file: 'b.md', raw: card(good) }] }).errors;
    expect(errors.join()).toContain('重复');
  });

  it('fails invalid frontmatter and invalid status / module', () => {
    expect(run({ cards: [{ file: 'a.md', raw: card('summary: TODO: x') }] }).errors.join()).toContain('解析失败');
    const bad = card(good.replace('status: verified', 'status: maybe').replace('module: nutrition', 'module: x'));
    const errors = run({ cards: [{ file: 'a.md', raw: bad }] }).errors.join();
    expect(errors).toContain('status');
    expect(errors).toContain('module');
  });

  it('lists drafts as warnings without failing', () => {
    const raw = card('id: d\nmodule: body\ntitle: t\nsummary: s\nsources:\n  - id: S02\nstatus: draft');
    const r = run({ cards: [{ file: 'd.md', raw }] });
    expect(r.errors).toEqual([]);
    expect(r.drafts).toEqual(['d.md']);
    expect(r.warnings.join()).toContain('待核对');
  });

  it('warns when verification is older than 12 months', () => {
    const raw = card(good.replace('verifiedAt: 2026-10-29', 'verifiedAt: 2025-09-01'));
    const r = run({ cards: [{ file: 'a.md', raw }] });
    expect(r.errors).toEqual([]);
    expect(r.warnings.join()).toContain('12 个月');
  });

  it('fails triage rules without sourceIds', () => {
    const data = { rules: [{ id: 'R-X', status: 'draft' }, { id: 'R-Y', status: 'draft', sourceIds: ['S01'] }] };
    const errors = run({ json: [{ file: 'content/triage-rules.json', data }] }).errors;
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('R-X');
  });

  it('validates emergency items', () => {
    const data = {
      id: 'em',
      items: [
        { id: 'R-A', level: 'EMERGENCY', title: 't', sourceIds: ['S01'], status: 'verified', verifiedBy: 'c', verifiedAt: '2026-10-29' },
        { id: 'R-B', level: 'SOON', title: '', sourceIds: [], status: 'verified' },
      ],
    };
    const errors = run({ json: [{ file: 'content/emergency.json', data }] }).errors.join('\n');
    expect(errors).not.toContain('R-A');
    expect(errors).toContain('R-B: level');
    expect(errors).toContain('R-B: 缺少 title');
    expect(errors).toContain('R-B: sources 为空');
    expect(errors).toContain('R-B: verified 条目缺少 verifiedBy');
  });

  it('validates questionnaire files, constants and source labels', () => {
    const r = run({
      json: [{ file: 'content/bcs-wizard.json', data: { id: 'w', status: 'draft', sources: [{ id: 'S07' }] } }, { file: 'x.json', data: null }],
      constantSources: { RER: ['S01'], BAD: ['S42'] },
      sourceLabels: { S01: 'AAHA', S77: '?' },
    });
    const errors = r.errors.join('\n');
    expect(errors).toContain('bcs-wizard.json: 来源 S07');
    expect(errors).toContain('x.json: 顶层必须是对象');
    expect(errors).toContain('constants.ts:BAD');
    expect(errors).toContain('S77');
    expect(errors).not.toContain('constants.ts:RER');
  });
});
