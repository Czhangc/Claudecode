import { Link, Navigate } from 'react-router-dom';
import { zh } from '../copy/zh';
import { useActiveCatData } from '../hooks';
import { bcsCategory } from '../lib/bcs';
import { ageYears, formatDate, todayISO } from '../lib/date';
import { vetPlanRequired } from '../lib/nutrition';
import { latestEntry } from '../lib/weightTrend';
import { CatAvatar } from '../components/Avatar';
import { KnowledgeCards } from '../components/KnowledgeCards';
import { QuietNotice } from '../components/Notices';
import { LinkRow, Page, PageHeader, SectionTitle } from '../components/ui';

export function CatPage() {
  const { loaded, cat, weights, bcs } = useActiveCatData();
  const c = zh.cat;
  if (!loaded) return null;
  if (!cat) return <Navigate to="/cat/new" replace />;
  const today = todayISO();
  const age = ageYears(cat, today);
  const refer = vetPlanRequired(cat, today);
  const latestW = latestEntry(weights);
  const latestB = bcs[bcs.length - 1];

  return (
    <Page>
      <PageHeader title={c.homeTitle(cat.name)} backTo="/" />
      <section className="grain mt-2 flex items-center gap-4 rounded-card-lg bg-body p-5 shadow-soft">
        <CatAvatar blobId={cat.avatarBlobId} className="size-16" />
        <div className="text-on-module">
          <div className="text-[22px] font-black">{cat.name}</div>
          <div className="text-[14px] font-semibold text-ink-on-color">
            {[age !== undefined ? c.ageLine(age) : null, cat.sex === 'male' ? c.male : c.female, c.neuteredLabel(cat.neutered), c.activityLabel(cat.activity === 'low')]
              .filter(Boolean)
              .join(' · ')}
          </div>
        </div>
      </section>

      {refer && (
        <QuietNotice title={zh.refer.title}>
          {zh.refer.reasons[refer]} {zh.refer.noNumbers}
        </QuietNotice>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-card bg-paper p-4 shadow-soft">
          <div className="text-[12px] font-semibold text-ink-2">{c.latestWeight}</div>
          <div className="font-num text-[28px] font-black">{latestW ? latestW.weightKg.toFixed(2) : '—'}<span className="ml-1 text-[14px]">kg</span></div>
          {latestW && <div className="text-[12px] font-semibold text-ink-2">{formatDate(latestW.date)}</div>}
        </div>
        <div className="rounded-card bg-paper p-4 shadow-soft">
          <div className="text-[12px] font-semibold text-ink-2">{c.latestBcs}</div>
          <div className="font-num text-[28px] font-black">{latestB ? latestB.finalScore : '—'}<span className="ml-1 text-[14px]">/ 9</span></div>
          {latestB && <div className="text-[12px] font-semibold text-ink-2">{zh.bcs.categories[bcsCategory(latestB.finalScore)]}</div>}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <LinkRow to="/records">{c.actions.weight}</LinkRow>
        <LinkRow to="/bcs">{c.actions.bcs}</LinkRow>
        <LinkRow to="/feeding">{c.actions.feeding}</LinkRow>
        <LinkRow to={`/cat/${cat.id}/edit`}>{c.actions.edit}</LinkRow>
      </div>

      <SectionTitle>{c.bcsHistory}</SectionTitle>
      {bcs.length === 0 ? (
        <p className="text-ink-2">
          {c.bcsHistoryEmpty}，<Link to="/bcs" className="font-extrabold text-ink underline">{zh.feeding.bcsCta}</Link>
        </p>
      ) : (
        <ul className="rounded-card bg-paper px-4 shadow-soft">
          {[...bcs].reverse().map((b) => (
            <li key={b.id} className="flex items-center justify-between gap-2 border-b border-line-soft py-3 last:border-0">
              <span className="text-[14px] font-semibold text-ink-2">{formatDate(b.date)}</span>
              <span className="flex items-center gap-2">
                <span className="font-num text-[18px] font-black">{c.score(b.finalScore)}</span>
                <span className="text-[13px] font-semibold">{zh.bcs.categories[bcsCategory(b.finalScore)]}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <KnowledgeCards ids={['card-bcs-scale', 'card-ideal-weight-estimate', 'card-senior-bcs']} />
    </Page>
  );
}
