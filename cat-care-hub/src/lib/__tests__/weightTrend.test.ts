import { describe, expect, it } from 'vitest';
import { latestEntry, recentEntries, safeRunway, weekStrip, weeklyLossRate } from '../weightTrend';
import type { WeightEntry } from '../types';

let n = 0;
const e = (date: string, weightKg: number): WeightEntry => ({ id: `w${n++}`, catId: 'c1', date, weightKg });

describe('weeklyLossRate', () => {
  it('E7: 5.00 → 4.80 kg over 7 days is 4%/week, TOO_FAST', () => {
    const r = weeklyLossRate([e('2026-10-01', 5.0), e('2026-10-08', 4.8)], '2026-10-01');
    expect(r.ratePerWeek).toBeCloseTo(0.04, 6);
    expect(r.level).toBe('TOO_FAST');
  });

  it('E8: 5.00 → 4.95 kg over 7 days is 1%/week, SAFE', () => {
    const r = weeklyLossRate([e('2026-10-01', 5.0), e('2026-10-08', 4.95)], '2026-10-01');
    expect(r.ratePerWeek).toBeCloseTo(0.01, 6);
    expect(r.level).toBe('SAFE');
  });

  it('treats exactly 2%/week and 0.5%/week as SAFE despite float error', () => {
    expect(weeklyLossRate([e('2026-09-01', 5.0), e('2026-09-29', 4.6)], '2026-09-01').level).toBe('SAFE');
    expect(weeklyLossRate([e('2026-09-01', 5.0), e('2026-09-08', 4.975)], '2026-09-01').level).toBe('SAFE');
  });

  it('is SLOW when below 0.5%/week over at least 28 days', () => {
    const r = weeklyLossRate([e('2026-09-01', 5.0), e('2026-09-29', 4.95)], '2026-09-01');
    expect(r.ratePerWeek).toBeCloseTo(0.0025, 6);
    expect(r.level).toBe('SLOW');
  });

  it('needs at least 7 days between two in-plan entries', () => {
    expect(weeklyLossRate([e('2026-10-01', 5)], '2026-10-01').level).toBe('INSUFFICIENT_DATA');
    expect(weeklyLossRate([e('2026-10-01', 5), e('2026-10-05', 4.9)], '2026-10-01').level).toBe('INSUFFICIENT_DATA');
  });

  it('ignores entries before the plan started and unsorted input', () => {
    const r = weeklyLossRate([e('2026-10-08', 4.95), e('2026-09-01', 9), e('2026-10-01', 5.0)], '2026-10-01');
    expect(r.ratePerWeek).toBeCloseTo(0.01, 6);
  });

  it('a slow change under 28 days is not yet judged', () => {
    expect(weeklyLossRate([e('2026-10-01', 5), e('2026-10-15', 5.0)], '2026-10-01').level).toBe('INSUFFICIENT_DATA');
  });
});

describe('chart helpers', () => {
  it('safeRunway declines linearly between 0.5% and 2% per week', () => {
    expect(safeRunway(5, '2026-10-01', '2026-10-01')).toEqual({ upper: 5, lower: 5 });
    const r = safeRunway(5, '2026-10-01', '2026-10-15');
    expect(r.upper).toBeCloseTo(4.95, 6);
    expect(r.lower).toBeCloseTo(4.8, 6);
  });

  it('recentEntries keeps the last 12 weeks, sorted', () => {
    const list = recentEntries([e('2026-10-29', 4), e('2026-01-01', 5), e('2026-08-10', 4.5)], '2026-10-29');
    expect(list.map((x) => x.date)).toEqual(['2026-08-10', '2026-10-29']);
  });

  it('weekStrip flags the last 7 days', () => {
    const strip = weekStrip([{ date: '2026-10-27' }], '2026-10-29');
    expect(strip).toHaveLength(7);
    expect(strip[0].date).toBe('2026-10-23');
    expect(strip[4]).toEqual({ date: '2026-10-27', recorded: true, isToday: false });
    expect(strip[6].isToday).toBe(true);
  });

  it('latestEntry returns the most recent entry', () => {
    expect(latestEntry([e('2026-10-02', 4.1), e('2026-10-09', 4.0)])?.weightKg).toBe(4.0);
    expect(latestEntry([])).toBeUndefined();
  });
});
