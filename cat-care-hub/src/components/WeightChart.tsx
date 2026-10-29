import { useMemo, useSyncExternalStore } from 'react';
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { daysBetween } from '../lib/date';
import { safeRunway } from '../lib/weightTrend';
import type { WeightEntry } from '../lib/types';

// Recharts writes colours as SVG attributes, which cannot read CSS variables, so resolve tokens at runtime.
function readTokens() {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return `${v('--color-ink')}|${v('--color-ink-2')}|${v('--color-line-soft')}|${v('--color-ideal')}`;
}
function subscribe(cb: () => void) {
  const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
  mq?.addEventListener('change', cb);
  return () => mq?.removeEventListener('change', cb);
}

const toTime = (d: string) => new Date(`${d}T12:00:00`).getTime();
const fmtTick = (t: number) => {
  const d = new Date(t);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

export function WeightChart({
  entries,
  runway,
  label,
}: {
  entries: WeightEntry[];
  runway?: { startKg: number; startDate: string; endDate: string };
  label: string;
}) {
  const tokens = useSyncExternalStore(subscribe, readTokens, () => '#2A211C|#6B5D53|#EFE2D1|#A8CBA6');
  const [ink, ink2, grid, ideal] = tokens.split('|');

  const data = useMemo(() => {
    const rows = new Map<number, { t: number; weight?: number; runway?: [number, number] }>();
    for (const e of entries) rows.set(toTime(e.date), { t: toTime(e.date), weight: e.weightKg });
    if (runway) {
      const span = Math.max(7, daysBetween(runway.startDate, runway.endDate));
      for (let day = 0; day <= span; day += 7) {
        const t = toTime(runway.startDate) + day * 86_400_000;
        const date = new Date(t).toISOString().slice(0, 10);
        const r = safeRunway(runway.startKg, runway.startDate, date);
        rows.set(t, { ...(rows.get(t) ?? { t }), runway: [r.lower, r.upper] });
      }
    }
    return [...rows.values()].sort((a, b) => a.t - b.t);
  }, [entries, runway]);

  return (
    <div role="img" aria-label={label} className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -12 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="t" type="number" scale="time" domain={['dataMin', 'dataMax']} tickFormatter={fmtTick} tick={{ fill: ink2, fontSize: 11 }} stroke={grid} />
          <YAxis domain={['auto', 'auto']} tick={{ fill: ink2, fontSize: 11 }} stroke={grid} tickFormatter={(v: number) => v.toFixed(1)} width={44} />
          {runway && <Area dataKey="runway" stroke="none" fill={ideal} fillOpacity={0.35} isAnimationActive={false} connectNulls />}
          <Line dataKey="weight" stroke={ink} strokeWidth={2.5} dot={{ r: 3.5, fill: ink }} isAnimationActive={false} connectNulls />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
