import { emergency } from '../content/loader';
import { zh } from '../copy/zh';
import { META } from '../db/schema';
import { useActiveCatData, useMeta } from '../hooks';
import { ageYears, formatDate, todayISO } from '../lib/date';
import { gramsSummary } from '../lib/feedingSummary';
import { latestEntry } from '../lib/weightTrend';
import { IconAlert, IconClock, IconMap, IconPhone } from '../components/Icons';
import { SourceList } from '../components/Sources';
import { Page, PageHeader } from '../components/ui';
import { Link } from 'react-router-dom';

// Quiet zone (DESIGN_SPEC 5, 6.11): paper background, no illustrations, no motion.
export function EmergencyPage() {
  const e = zh.emergency;
  const { cat, weights, plan, foods } = useActiveCatData();
  const vetPhone = useMeta<string>(META.vetPhone).value;
  const vetName = useMeta<string>(META.vetName).value;
  const urgent = emergency.items.filter((i) => i.level === 'EMERGENCY');
  const soon = emergency.items.filter((i) => i.level === 'URGENT_24H');
  const latest = latestEntry(weights);
  const age = cat ? ageYears(cat, todayISO()) : undefined;
  const allSources = [...new Set(emergency.items.flatMap((i) => i.sourceIds))].sort();

  const row = (label: string, value: string) => (
    <div className="flex justify-between gap-4 border-b border-quiet-line py-2 last:border-0">
      <dt className="text-ink-2">{label}</dt>
      <dd className="text-right font-extrabold">{value}</dd>
    </div>
  );

  return (
    <Page quiet>
      <PageHeader title={e.title} close backTo="/" />

      <section className="mt-3 rounded-alert bg-alert p-5 text-white">
        <div className="flex items-center gap-2">
          <IconAlert />
          <h2 className="text-[20px] leading-snug font-black">{e.blockTitle}</h2>
        </div>
        <p className="mt-1 text-[15px] font-extrabold">{e.noWait}</p>
      </section>

      <ul className="mt-4 flex flex-col gap-3">
        {urgent.map((item) => (
          <li key={item.id} className="rounded-card border-[1.5px] border-alert bg-paper p-4">
            <div className="flex gap-2">
              <IconAlert className="mt-0.5 shrink-0 text-alert" />
              <div>
                <h3 className="text-[16px] font-black">{item.title}</h3>
                <p className="mt-1 text-[14px] text-ink-2">{item.detail}</p>
                <div className="mt-2"><SourceList sources={item.sourceIds} /></div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 flex items-center gap-2 text-[18px] font-black">
        <IconClock /> {e.urgentTitle}
      </h2>
      <ul className="mt-3 flex flex-col gap-3">
        {soon.map((item) => (
          <li key={item.id} className="rounded-card border-[1.5px] border-quiet-line bg-paper p-4">
            <h3 className="text-[16px] font-black">{item.title}</h3>
            <p className="mt-1 text-[14px] text-ink-2">{item.detail}</p>
            <div className="mt-2"><SourceList sources={item.sourceIds} /></div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        {vetPhone ? (
          <a href={`tel:${vetPhone.replace(/[^\d+]/g, '')}`} className="flex min-h-btn-lg items-center justify-center gap-2 rounded-full bg-ink text-[17px] font-extrabold text-paper">
            <IconPhone /> {e.call(vetName)}
          </a>
        ) : (
          <Link to="/me" className="flex min-h-btn-lg items-center justify-center gap-2 rounded-full bg-ink px-4 text-center text-[15px] font-extrabold text-paper">
            <IconPhone /> {e.callUnset}
          </Link>
        )}
        <a
          href={e.findErUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-btn-lg items-center justify-center gap-2 rounded-full border-[1.5px] border-ink text-[17px] font-extrabold"
        >
          <IconMap /> {e.findEr}
        </a>
      </div>

      <section className="mt-6 rounded-card border border-quiet-line bg-quiet-surface p-4">
        <h2 className="text-[16px] font-black">{e.summaryTitle}</h2>
        <dl className="mt-2 text-[14px]">
          {row(e.summaryName, cat?.name ?? e.summaryNone)}
          {row(e.summaryAge, age !== undefined ? zh.cat.ageLine(age) : e.summaryNone)}
          {row(e.summarySex, cat ? `${cat.sex === 'male' ? zh.cat.male : zh.cat.female} · ${zh.cat.neuteredLabel(cat.neutered)}` : e.summaryNone)}
          {row(e.summaryWeight, latest ? `${latest.weightKg.toFixed(2)} kg（${formatDate(latest.date)}）` : e.summaryNone)}
          {row(e.summaryFood, plan && plan.result.status === 'OK' ? `${gramsSummary(plan, foods)} / 天，${Math.round(plan.result.dailyKcal!)} kcal` : e.summaryNone)}
        </dl>
        <p className="mt-2 text-[12px] font-semibold text-ink-2">{e.summaryHint}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-[14px] font-extrabold text-ink-2">{e.basis}</h2>
        <div className="mt-2"><SourceList sources={allSources} /></div>
      </section>
      <p className="mt-6 text-center text-[13px] font-extrabold">{e.footer}</p>
    </Page>
  );
}
