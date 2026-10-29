import type { ISODate } from './types';

const DAY_MS = 86_400_000;

export function todayISO(now: Date = new Date()): ISODate {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function toUTC(date: ISODate): number {
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

export function daysBetween(from: ISODate, to: ISODate): number {
  return Math.round((toUTC(to) - toUTC(from)) / DAY_MS);
}

export function addDays(date: ISODate, days: number): ISODate {
  const t = new Date(toUTC(date) + days * DAY_MS);
  return t.toISOString().slice(0, 10);
}

/** Age in (fractional) years, or undefined when neither birth date nor estimate is known. */
export function ageYears(
  cat: { birthDate?: ISODate; estimatedAgeYears?: number },
  asOf: ISODate,
): number | undefined {
  if (cat.birthDate) {
    const [by, bm, bd] = cat.birthDate.split('-').map(Number);
    const [ay, am, ad] = asOf.split('-').map(Number);
    let years = ay - by;
    if (am < bm || (am === bm && ad < bd)) years -= 1;
    const anniversary = `${by + years}-${String(bm).padStart(2, '0')}-${String(bd).padStart(2, '0')}`;
    return years + Math.max(0, daysBetween(anniversary, asOf)) / 365.25;
  }
  return cat.estimatedAgeYears;
}

export function formatDate(date: ISODate): string {
  const [y, m, d] = date.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}
