import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { bcsWizard, wsavaLinks } from '../content/loader';
import { zh } from '../copy/zh';
import { db, newId } from '../db/schema';
import { useActiveCatData } from '../hooks';
import { bcsCategory, clampScore, estimateBcs } from '../lib/bcs';
import { todayISO } from '../lib/date';
import { BcsDemo, BcsOptionArt } from '../components/illustrations/BcsArt';
import { MibaoTop } from '../components/illustrations/MibaoTop';
import { KnowledgeCards } from '../components/KnowledgeCards';
import { ProgressRing } from '../components/Progress';
import { SourceList } from '../components/Sources';
import { DraftBadge, Page, PageHeader, PrimaryButton, ResultDisclaimer, SecondaryButton } from '../components/ui';

const CATEGORY_TAG: Record<ReturnType<typeof bcsCategory>, string> = {
  thin: 'bg-chip text-ink',
  ideal: 'bg-ideal text-on-module',
  over: 'bg-body text-on-module',
  obese: 'bg-obese text-on-module',
};

export function BcsWizardPage() {
  const { loaded, cat } = useActiveCatData();
  const navigate = useNavigate();
  const b = zh.bcs;
  const questions = bcsWizard.questions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(5);
  const [estimated, setEstimated] = useState(5);
  const isDraft = bcsWizard.status === 'draft';

  if (!loaded) return null;
  if (!cat) return <Navigate to="/cat/new" replace />;

  const total = questions.length;
  const onCompare = step >= total;

  const choose = (qid: string, oid: string) => {
    const next = { ...answers, [qid]: oid };
    setAnswers(next);
    if (step + 1 >= total) {
      const est = estimateBcs(questions, next) ?? 5;
      setEstimated(est);
      setScore(est);
    }
    setStep(step + 1);
  };

  const save = async () => {
    await db.bcs.add({ id: newId(), catId: cat.id, date: todayISO(), answers, estimatedScore: estimated, finalScore: clampScore(score) });
    navigate('/cat', { replace: true });
  };

  const back = () => (step === 0 ? navigate(-1) : setStep(step - 1));
  const links = wsavaLinks();

  if (!onCompare) {
    const q = questions[step];
    return (
      <Page>
        <div className="flex items-center gap-3 pt-4">
          <button type="button" onClick={back} aria-label={zh.common.back} className="press inline-flex size-tap items-center justify-center rounded-full border border-line bg-paper">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="flex-1 text-[14px] font-extrabold text-ink-2">{b.title} · {b.questionOf(step + 1, total)}</div>
          <ProgressRing value={step} total={total} label={b.questionOf(step + 1, total)} />
        </div>
        <section className="grain mt-4 rounded-card-lg bg-body px-4 pt-3 pb-2 shadow-soft">
          <BcsDemo kind={q.demo} />
        </section>
        <p className="mt-5 text-[14px] font-extrabold text-ink-2">{q.action}</p>
        <h1 className="mt-1 flex items-center gap-2 text-[24px] leading-tight font-black">
          {q.prompt}
          {isDraft && <DraftBadge />}
        </h1>
        <ul className="mt-4 flex flex-col gap-2.5">
          {q.options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                aria-pressed={answers[q.id] === o.id}
                onClick={() => choose(q.id, o.id)}
                className={`press flex min-h-16 w-full items-center gap-3 rounded-card border-[1.5px] bg-paper px-4 py-2 text-left font-extrabold shadow-soft ${answers[q.id] === o.id ? 'border-ink' : 'border-transparent'}`}
              >
                <BcsOptionArt question={q.id} score={o.score} />
                <span className="flex-1">{o.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4"><SourceList sources={bcsWizard.sources} /></div>
      </Page>
    );
  }

  const cat9 = bcsCategory(score);
  return (
    <Page>
      <PageHeader title={b.compareTitle} right={<ProgressRing value={total} total={total} label={b.title} />} />
      <p className="text-[14px] text-ink-2">{b.compareHint}</p>
      <section className="grain mt-4 rounded-card-lg bg-body p-4 shadow-soft">
        <MibaoTop score={score} label={b.outlineLabel(score, b.categories[cat9])} className="mx-auto h-64 w-auto" />
      </section>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-num text-[56px] leading-none font-black">{score}</span>
        <div className="min-w-0">
          <span className={`inline-flex rounded-full px-3 py-1 text-[13px] font-extrabold ${CATEGORY_TAG[cat9]}`}>{b.categories[cat9]}</span>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-[14px]">
            {bcsWizard.scoreDescriptions[String(score)]}
            {isDraft && <DraftBadge />}
          </p>
        </div>
      </div>

      <div className="relative mt-4">
        {/* track with the ideal 4–5 band */}
        <div aria-hidden className="pointer-events-none absolute inset-x-[16px] top-[17px] h-[10px] rounded-full bg-track">
          <div className="absolute inset-y-0 rounded-full bg-ideal" style={{ left: `${(3 / 8) * 100}%`, width: `${(1 / 8) * 100}%` }} />
        </div>
        <label htmlFor="bcs-range" className="sr-only">{b.sliderLabel}</label>
        <input
          id="bcs-range"
          type="range"
          min={1}
          max={9}
          step={1}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          aria-valuetext={`${score} 分，${b.categories[cat9]}`}
          className="bcs-range relative"
        />
        <div aria-hidden className="relative mx-[16px] h-5 text-[12px] font-extrabold text-ideal-ink">
          <span className="absolute -translate-x-1/2" style={{ left: `${(3.5 / 8) * 100}%` }}>{b.ideal}</span>
        </div>
        <div aria-hidden className="mx-[16px] flex justify-between font-num text-[12px] font-extrabold text-ink-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
        </div>
      </div>
      <p className="mt-2 text-[13px] font-semibold text-ink-2">{b.idealNote}</p>

      <div className="mt-4 flex flex-col gap-1 text-[14px] font-extrabold">
        {links.chart && <a href={links.chart} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{b.official} ↗</a>}
        {links.toolkitZh && <a href={links.toolkitZh} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{b.officialZh} ↗</a>}
        <span className="text-[12px] font-semibold text-ink-2">{b.officialNote}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <PrimaryButton onClick={() => void save()}>{b.confirm(score)}</PrimaryButton>
        <SecondaryButton onClick={() => { setAnswers({}); setStep(0); }}>{b.redo}</SecondaryButton>
      </div>

      <KnowledgeCards ids={['card-bcs-scale', 'card-ideal-weight-estimate', 'card-senior-bcs']} />
      <ResultDisclaimer />
    </Page>
  );
}
