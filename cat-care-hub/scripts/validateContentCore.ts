import { CARD_MODULES, parseCardFile } from '../src/content/cardParser';

export interface ContentInput {
  sourceIds: Set<string>;
  cards: { file: string; raw: string }[];
  json: { file: string; data: unknown }[];
  constantSources?: Record<string, readonly string[]>;
  sourceLabels?: Record<string, string>;
  today?: string; // 'YYYY-MM-DD'
}

export interface ValidationReport {
  errors: string[];
  warnings: string[];
  drafts: string[];
}

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

function monthsBefore(today: string, months: number): string {
  const [y, m, d] = today.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1 - months, d));
  return t.toISOString().slice(0, 10);
}

export function validateContent(input: ContentInput): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const drafts: string[] = [];
  const seenIds = new Map<string, string>();
  const staleBefore = monthsBefore(input.today ?? new Date().toISOString().slice(0, 10), 12);

  const checkId = (where: string, id: unknown) => {
    if (!isNonEmptyString(id)) return errors.push(`${where}: 缺少 id`);
    const prev = seenIds.get(id);
    if (prev) errors.push(`${where}: id "${id}" 与 ${prev} 重复`);
    else seenIds.set(id, where);
  };

  const checkSourceIds = (where: string, ids: unknown[]) => {
    if (ids.length === 0) errors.push(`${where}: sources 为空`);
    for (const id of ids) {
      if (!isNonEmptyString(id)) errors.push(`${where}: 来源 ID 格式不对`);
      else if (!input.sourceIds.has(id)) errors.push(`${where}: 来源 ${id} 不在 KNOWLEDGE_SOURCES.md 登记表中`);
    }
  };

  const checkStatus = (where: string, entry: Obj) => {
    if (entry.status === 'draft') {
      drafts.push(where);
      return;
    }
    if (entry.status !== 'verified') return errors.push(`${where}: status 必须是 draft 或 verified`);
    if (!isNonEmptyString(entry.verifiedBy)) errors.push(`${where}: verified 条目缺少 verifiedBy`);
    if (!isNonEmptyString(entry.verifiedAt) || !/^\d{4}-\d{2}-\d{2}$/.test(entry.verifiedAt)) {
      errors.push(`${where}: verified 条目缺少 verifiedAt（YYYY-MM-DD）`);
    } else if (entry.verifiedAt < staleBefore) {
      warnings.push(`${where}: verifiedAt ${entry.verifiedAt} 已超过 12 个月，请复查`);
    }
  };

  for (const { file, raw } of input.cards) {
    let data: Obj;
    try {
      data = parseCardFile(raw).data;
    } catch (e) {
      errors.push(`${file}: frontmatter 解析失败（${(e as Error).message}）`);
      continue;
    }
    const where = `${file}`;
    checkId(where, data.id);
    for (const field of ['title', 'summary'] as const) {
      if (!isNonEmptyString(data[field])) errors.push(`${where}: 缺少 ${field}`);
    }
    if (!CARD_MODULES.includes(data.module as never)) errors.push(`${where}: module 无效`);
    if (!Array.isArray(data.sources)) {
      errors.push(`${where}: 缺少 sources`);
    } else {
      checkSourceIds(where, data.sources.map((s) => (isObj(s) ? s.id : s)));
    }
    if (data.status === undefined) errors.push(`${where}: 缺少 status`);
    else checkStatus(where, data);
  }

  for (const { file, data } of input.json) {
    if (!isObj(data)) {
      errors.push(`${file}: 顶层必须是对象`);
      continue;
    }
    if (file.endsWith('emergency.json')) {
      checkId(file, data.id);
      if (!Array.isArray(data.items) || data.items.length === 0) errors.push(`${file}: items 为空`);
      for (const [i, item] of (Array.isArray(data.items) ? data.items : []).entries()) {
        const where = `${file}#${isObj(item) && isNonEmptyString(item.id) ? item.id : i}`;
        if (!isObj(item)) {
          errors.push(`${where}: 条目必须是对象`);
          continue;
        }
        checkId(where, item.id);
        if (!isNonEmptyString(item.title)) errors.push(`${where}: 缺少 title`);
        if (!['EMERGENCY', 'URGENT_24H'].includes(item.level as string)) errors.push(`${where}: level 无效`);
        checkSourceIds(where, Array.isArray(item.sourceIds) ? item.sourceIds : []);
        checkStatus(where, item);
      }
    } else if (file.endsWith('triage-rules.json')) {
      const rules = Array.isArray(data.rules) ? data.rules : [];
      for (const [i, rule] of rules.entries()) {
        const where = `${file}#${isObj(rule) && isNonEmptyString(rule.id) ? rule.id : i}`;
        if (!isObj(rule)) {
          errors.push(`${where}: 规则必须是对象`);
          continue;
        }
        checkId(where, rule.id);
        checkSourceIds(where, Array.isArray(rule.sourceIds) ? rule.sourceIds : []);
        checkStatus(where, rule);
      }
    } else {
      // Questionnaire files (bcs-wizard.json, env-pillars.json, ...)
      checkId(file, data.id);
      checkSourceIds(file, Array.isArray(data.sources) ? data.sources.map((s) => (isObj(s) ? s.id : s)) : []);
      checkStatus(file, data);
    }
  }

  for (const [name, ids] of Object.entries(input.constantSources ?? {})) {
    checkSourceIds(`constants.ts:${name}`, [...ids]);
  }
  for (const id of Object.keys(input.sourceLabels ?? {})) {
    if (!input.sourceIds.has(id)) errors.push(`sourceLabels.ts: ${id} 不在登记表中`);
  }

  for (const d of drafts) warnings.push(`待核对（draft）：${d}`);
  return { errors, warnings, drafts };
}
