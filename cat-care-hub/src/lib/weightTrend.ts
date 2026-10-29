import { SAFE_LOSS_PER_WEEK } from './constants';
import { addDays, daysBetween } from './date';
import type { ISODate, WeightEntry } from './types';

export type LossLevel = 'TOO_FAST' | 'SAFE' | 'SLOW' | 'INSUFFICIENT_DATA';

export function sortByDate<T extends { date: ISODate }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => a.date.localeCompare(b.date));
}

export function weeklyLossRate(
  entries: WeightEntry[],
  planStart: ISODate,
): { ratePerWeek: number; level: LossLevel } {
  const inPlan = sortByDate(entries.filter((e) => e.date >= planStart));
  if (inPlan.length < 2) return { ratePerWeek: 0, level: 'INSUFFICIENT_DATA' };
  const first = inPlan[0];
  const last = inPlan[inPlan.length - 1];
  const days = daysBetween(first.date, last.date);
  if (days < 7) return { ratePerWeek: 0, level: 'INSUFFICIENT_DATA' };
  const ratePerWeek = (first.weightKg - last.weightKg) / first.weightKg / (days / 7);
  // Compare on a rounded value so float noise (e.g. 0.020000000000000004) doesn't cross a boundary.
  const rate = Math.round(ratePerWeek * 1e9) / 1e9;
  if (rate > SAFE_LOSS_PER_WEEK.max) return { ratePerWeek, level: 'TOO_FAST' };
  if (rate >= SAFE_LOSS_PER_WEEK.min) return { ratePerWeek, level: 'SAFE' };
  if (days >= 28) return { ratePerWeek, level: 'SLOW' };
  return { ratePerWeek, level: 'INSUFFICIENT_DATA' };
}

/** Entries within the last `weeks` weeks (inclusive of today), sorted by date. */
export function recentEntries(entries: WeightEntry[], today: ISODate, weeks = 12): WeightEntry[] {
  const from = addDays(today, -weeks * 7);
  return sortByDate(entries.filter((e) => e.date >= from && e.date <= today));
}

/** Safe-loss "runway" bounds for a given date, as a linear decline from the plan's start weight. */
export function safeRunway(startKg: number, startDate: ISODate, date: ISODate): { upper: number; lower: number } {
  const weeks = Math.max(0, daysBetween(startDate, date)) / 7;
  return {
    upper: startKg * (1 - SAFE_LOSS_PER_WEEK.min * weeks),
    lower: startKg * (1 - SAFE_LOSS_PER_WEEK.max * weeks),
  };
}

/** The 7 days ending today, each flagged with whether a weight was recorded that day. */
export function weekStrip(entries: { date: ISODate }[], today: ISODate): { date: ISODate; recorded: boolean; isToday: boolean }[] {
  const dates = new Set(entries.map((e) => e.date));
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i - 6);
    return { date, recorded: dates.has(date), isToday: date === today };
  });
}

export function latestEntry(entries: WeightEntry[]): WeightEntry | undefined {
  const sorted = sortByDate(entries);
  return sorted[sorted.length - 1];
}
