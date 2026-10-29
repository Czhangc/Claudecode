import { describe, expect, it } from 'vitest';
import md from '../../../docs/KNOWLEDGE_SOURCES.md?raw';
import { parseSourceIds, parseSourceRegistry } from '../sources';
import { addDays, ageYears, daysBetween, formatDate, todayISO } from '../date';


describe('source registry parsing', () => {
  it('reads all registered IDs from the table', () => {
    const ids = parseSourceIds(md);
    expect(ids.size).toBe(19);
    expect(ids.has('S01')).toBe(true);
    expect(ids.has('S19')).toBe(true);
  });

  it('attaches links, including labelled sub-links', () => {
    const reg = parseSourceRegistry(md);
    expect(reg.get('S01')!.grade).toBe('A');
    expect(reg.get('S04')!.links).toHaveLength(2);
    const s03 = reg.get('S03')!.links;
    expect(s03[0].url).toBe('https://wsava.org/global-guidelines/global-nutrition-guidelines/');
    expect(s03.find((l) => l.label === '简体中文工具包')?.url).toContain('Chinese-Simplified');
    expect(s03.find((l) => l.label === '猫体况评分图')).toBeDefined();
  });
});

describe('dates', () => {
  it('computes ages from birth dates or estimates', () => {
    expect(ageYears({ birthDate: '2026-02-28' }, '2026-10-29')).toBeLessThan(1);
    expect(ageYears({ birthDate: '2025-10-29' }, '2026-10-29')).toBeCloseTo(1, 6);
    expect(ageYears({ birthDate: '2025-10-30' }, '2026-10-29')).toBeLessThan(1);
    expect(ageYears({ estimatedAgeYears: 3 }, '2026-10-29')).toBe(3);
    expect(ageYears({}, '2026-10-29')).toBeUndefined();
  });

  it('does date arithmetic on ISO dates', () => {
    expect(daysBetween('2026-10-01', '2026-10-29')).toBe(28);
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02');
    expect(todayISO(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(formatDate('2026-10-29')).toBe('2026年10月29日');
  });
});
