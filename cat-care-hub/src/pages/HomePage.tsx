import { Link } from 'react-router-dom';
import { zh } from '../copy/zh';
import { useActiveCatData } from '../hooks';
import { todayISO } from '../lib/date';
import { latestEntry, weekStrip } from '../lib/weightTrend';
import { gramsSummary } from '../lib/feedingSummary';
import { vetPlanRequired } from '../lib/nutrition';
import { IconArrow, IconBowl, IconCross, IconScale, IconYarn } from '../components/Icons';
import { MibaoHead, MibaoSitting } from '../components/illustrations/Mibao';
import { WeekStrip } from '../components/Progress';
import { Page, PrimaryButton, StatusTag } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

function ModuleCard({
  to,
  color,
  icon,
  title,
  sub,
  tag,
}: {
  to?: string;
  color: string;
  icon: ReactNode;
  title: string;
  sub: string;
  tag?: string;
}) {
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper">{icon}</span>
        {tag && <StatusTag>{tag}</StatusTag>}
      </div>
      <div className="mt-8">
        <div className="text-[18px] font-black text-on-module">{title}</div>
        <div className="text-[13px] font-semibold text-ink-on-color">{sub}</div>
      </div>
    </>
  );
  const cls = `grain block rounded-card-md p-4 shadow-soft ${color}`;
  return to ? (
    <Link to={to} className={`press ${cls}`}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} opacity-70`} aria-disabled="true">
      {inner}
    </div>
  );
}

export function HomePage() {
  const { loaded, cat, weights, plan, foods } = useActiveCatData();
  const navigate = useNavigate();
  const today = todayISO();
  const m = zh.home.modules;
  if (!loaded) return null;

  const days = weekStrip(weights, today);
  const recorded = days.filter((d) => d.recorded).length;
  const latest = latestEntry(weights);
  const refer = cat ? vetPlanRequired(cat, today) : undefined;

  return (
    <Page>
      <header className="flex items-center gap-3 pt-5">
        <span className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-paper shadow-soft">
          <MibaoHead className="size-12" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold text-ink-2">{zh.greeting(new Date().getHours())}</div>
          <div className="truncate text-[22px] leading-tight font-black">{cat ? cat.name : zh.appName}</div>
        </div>
        <Link
          to="/emergency"
          className="press inline-flex min-h-tap items-center gap-2 rounded-full bg-paper px-4 text-[14px] font-extrabold shadow-soft"
        >
          <span aria-hidden className="size-2.5 rounded-full bg-alert" />
          {zh.home.emergencyPill}
        </Link>
      </header>

      {!cat ? (
        <section className="grain mt-14 rounded-card-lg bg-body p-6 pt-24 shadow-soft">
          <MibaoSitting className="absolute! -top-16 right-2 z-10 w-40" decor />
          <h2 className="text-[24px] font-black text-on-module">{zh.home.noCatTitle}</h2>
          <p className="mt-2 text-[15px] text-ink-on-color">{zh.home.noCatBody}</p>
          <PrimaryButton className="mt-5" onClick={() => navigate('/cat/new')}>
            {zh.home.noCatCta}
          </PrimaryButton>
        </section>
      ) : (
        <>
          <Link to="/records" className="press grain mt-16 block rounded-card-lg bg-body p-5 pt-6 shadow-soft">
            <MibaoSitting className="absolute! -top-[76px] right-1 z-10 w-32" />
            <div className="text-[13px] font-extrabold text-ink-on-color">{zh.home.weekTitle}</div>
            <div className="mt-1 max-w-[60%] text-[20px] leading-snug font-black text-on-module">
              {recorded === 0 ? zh.home.weekNone : zh.home.weekSome(recorded)}
            </div>
            {latest && <div className="mt-1 font-num text-[14px] font-extrabold text-ink-on-color">{zh.home.latest(latest.weightKg.toFixed(2))}</div>}
            <div className="mt-4">
              <WeekStrip days={days} />
            </div>
          </Link>

          <Link to="/feeding" className="press mt-3 flex min-h-btn items-center gap-3 rounded-full bg-paper py-2 pr-2 pl-4 shadow-soft">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-food text-on-module">
              <IconBowl width={20} height={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12px] font-semibold text-ink-2">{zh.home.feedingTitle}</span>
              <span className="block truncate font-extrabold">
                {refer
                  ? zh.home.feedingRefer
                  : plan && plan.result.status === 'OK'
                    ? zh.home.feedingLine(gramsSummary(plan, foods), Math.round(plan.result.treatBudgetKcal!))
                    : zh.home.feedingNone}
              </span>
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper">
              <IconArrow width={18} height={18} />
            </span>
          </Link>
        </>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <ModuleCard to={cat ? '/cat' : '/cat/new'} color="bg-body" icon={<IconScale width={20} height={20} />} title={m.body.title} sub={m.body.sub} />
        <ModuleCard to="/feeding" color="bg-food" icon={<IconBowl width={20} height={20} />} title={m.food.title} sub={m.food.sub} />
        <ModuleCard color="bg-play" icon={<IconYarn width={20} height={20} />} title={m.play.title} sub={m.play.sub} tag={m.play.soon} />
        <ModuleCard to="/emergency" color="bg-health" icon={<IconCross width={20} height={20} />} title={m.health.title} sub={m.health.sub} tag={m.health.tag} />
      </div>
    </Page>
  );
}
