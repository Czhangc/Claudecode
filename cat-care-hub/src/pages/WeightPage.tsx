import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { zh } from '../copy/zh';
import { db, newId } from '../db/schema';
import { useActiveCatData } from '../hooks';
import { formatDate, todayISO } from '../lib/date';
import { latestEntry, recentEntries, weeklyLossRate } from '../lib/weightTrend';
import { KnowledgeCards } from '../components/KnowledgeCards';
import { QuietNotice } from '../components/Notices';
import { Card, Field, Page, PageHeader, PrimaryButton, SectionTitle, inputClass } from '../components/ui';

// Recharts is the largest dependency; load it only when a chart is shown.
const WeightChart = lazy(() => import('../components/WeightChart').then((m) => ({ default: m.WeightChart })));

export const WEIGHT_SANE_RANGE = { min: 1, max: 15 };

export function WeightPage() {
  const { loaded, cat, weights, plan } = useActiveCatData();
  const w = zh.weight;
  const today = todayISO();
  const [value, setValue] = useState<string>();
  const [date, setDate] = useState(today);
  const [note, setNote] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!loaded) return null;
  if (!cat) {
    return (
      <Page>
        <PageHeader title={w.title} backTo="/" />
        <p className="mt-6 text-ink-2">
          {zh.home.noCatTitle}，<Link to="/cat/new" className="font-extrabold text-ink underline">{zh.home.noCatCta}</Link>
        </p>
      </Page>
    );
  }

  const last = latestEntry(weights);
  const shown = value ?? (last ? last.weightKg.toFixed(2) : '');
  const kg = Number(shown);
  const valid = shown.trim() !== '' && Number.isFinite(kg) && kg > 0;
  const outOfRange = valid && (kg < WEIGHT_SANE_RANGE.min || kg > WEIGHT_SANE_RANGE.max);

  const save = async () => {
    if (!valid) return;
    if (outOfRange && !confirming) {
      setConfirming(true);
      return;
    }
    await db.weights.add({ id: newId(), catId: cat.id, date, weightKg: Math.round(kg * 100) / 100, note: note.trim() || undefined });
    setConfirming(false);
    setNote('');
    setValue(undefined);
    setSaved(true);
  };

  const inLossPlan = plan?.goal === 'lose' && plan.result.status === 'OK';
  const rate = inLossPlan ? weeklyLossRate(weights, plan.startDate) : undefined;
  const recent = recentEntries(weights, today);
  const rateCopy = rate ? w.rate[rate.level] : undefined;

  return (
    <Page>
      <PageHeader title={w.title} backTo="/" />
      <Card className="mt-2">
        <label className="block text-[14px] font-extrabold" htmlFor="weight-input">{w.inputLabel}</label>
        <div className="mt-2 flex items-baseline gap-2">
          <input
            id="weight-input"
            type="number"
            inputMode="decimal"
            step={0.01}
            min={0}
            value={shown}
            onChange={(e) => {
              setValue(e.target.value);
              setConfirming(false);
              setSaved(false);
            }}
            className="w-full min-w-0 rounded-[16px] border-[1.5px] border-line bg-paper px-4 py-2 font-num text-[44px] leading-none font-black outline-none focus:border-ink"
          />
          <span className="font-num text-[20px] font-black">kg</span>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-3">
          <Field label={w.dateLabel}>
            <input type="date" className={inputClass} value={date} max={today} onChange={(e) => setDate(e.target.value || today)} />
          </Field>
          <Field label={w.noteLabel}>
            <input className={inputClass} value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        {confirming && <QuietNotice title={w.confirmRange} />}
        <PrimaryButton className="mt-5" disabled={!valid} onClick={() => void save()}>
          {confirming ? w.saveAnyway : w.save}
        </PrimaryButton>
        {saved && <p role="status" className="mt-2 text-center text-[13px] font-extrabold text-ideal-ink">{w.saved}</p>}
      </Card>

      {rate && rateCopy && (
        <QuietNotice tone={rate.level === 'TOO_FAST' ? 'alert' : rate.level === 'SAFE' ? 'safe' : 'info'} title={rateCopy.title}>
          {rateCopy.body}
          {rate.level !== 'INSUFFICIENT_DATA' && ` （${w.ratePerWeek((rate.ratePerWeek * 100).toFixed(1))}）`}
        </QuietNotice>
      )}

      <SectionTitle>{w.chartTitle}</SectionTitle>
      <Card>
        {recent.length < 2 ? (
          <p className="text-ink-2">{w.chartEmpty}</p>
        ) : (
          <Suspense fallback={<div className="h-56" />}>
          <WeightChart
            entries={recent}
            label={w.chartLabel(recent.length)}
            runway={
              inLossPlan
                ? { startKg: plan.inputs.weightKg, startDate: plan.startDate, endDate: recent[recent.length - 1].date }
                : undefined
            }
          />
          </Suspense>
        )}
        {inLossPlan && (
          <p className="mt-2 flex items-center gap-2 text-[12px] font-semibold text-ink-2">
            <span aria-hidden className="inline-block h-3 w-5 rounded-sm bg-ideal opacity-60" />
            {w.runwayLegend} · {w.planHint(formatDate(plan.startDate))}
          </p>
        )}
      </Card>

      <SectionTitle>{w.list}</SectionTitle>
      {weights.length === 0 ? (
        <p className="text-ink-2">{w.empty}</p>
      ) : (
        <ul className="rounded-card bg-paper px-4 shadow-soft">
          {[...weights].reverse().map((e) => (
            <li key={e.id} className="flex items-center gap-3 border-b border-line-soft py-2 last:border-0">
              <span className="flex-1 text-[14px] font-semibold text-ink-2">
                {formatDate(e.date)}
                {e.note && <span className="block text-[12px]">{e.note}</span>}
              </span>
              <span className="font-num text-[18px] font-black">{e.weightKg.toFixed(2)} kg</span>
              <button type="button" className="min-h-tap px-2 text-[13px] font-extrabold text-ink-2" onClick={() => void db.weights.delete(e.id)} aria-label={`${zh.common.delete} ${e.date}`}>
                {zh.common.delete}
              </button>
            </li>
          ))}
        </ul>
      )}

      <KnowledgeCards ids={['card-safe-loss-rate', 'card-weight-drop-alert', 'card-bcs-scale']} />
    </Page>
  );
}
