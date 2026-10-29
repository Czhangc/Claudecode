import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { zh } from '../copy/zh';
import { db, newId } from '../db/schema';
import { useActiveCatData, type CatData } from '../hooks';
import { todayISO, formatDate } from '../lib/date';
import { formatUnits, portionSummary, portions } from '../lib/feedingSummary';
import { dailyKcal, vetPlanRequired } from '../lib/nutrition';
import { latestEntry } from '../lib/weightTrend';
import type { FeedingPlan, Food, Goal } from '../lib/types';
import { HowCalculated } from '../components/HowCalculated';
import { KitchenScale, TreatJar } from '../components/illustrations/KitchenScale';
import { KnowledgeCards } from '../components/KnowledgeCards';
import { QuietNotice } from '../components/Notices';
import { Card, Choice, Field, Page, PageHeader, PrimaryButton, ResultDisclaimer, SectionTitle, inputClass } from '../components/ui';

const CARD_IDS = ['card-rer-explained', 'card-mer-factors', 'card-treat-budget', 'card-individual-variation', 'card-weight-loss-calories'];

interface FoodRow {
  key: string;
  name: string;
  type: Food['type'];
  mode: 'kg' | 'unit';
  value: string;
  share: string;
}

const newRow = (share = '100'): FoodRow => ({ key: newId(), name: '', type: 'dry', mode: 'kg', value: '', share });

function rowsFromPlan(plan: FeedingPlan | undefined, foods: Food[]): FoodRow[] {
  if (!plan) return [newRow()];
  const rows = plan.foods.flatMap(({ foodId, shareOfFoodKcal }) => {
    const f = foods.find((x) => x.id === foodId);
    if (!f) return [];
    return [{
      key: newId(),
      name: f.name,
      type: f.type,
      mode: f.kcalPerKg ? ('kg' as const) : ('unit' as const),
      value: String(f.kcalPerKg ?? f.kcalPerUnit ?? ''),
      share: String(Math.round(shareOfFoodKcal * 100)),
    }];
  });
  return rows.length ? rows : [newRow()];
}

export function FeedingPage() {
  const data = useActiveCatData();
  if (!data.loaded) return null;
  if (!data.cat) return <Navigate to="/cat/new" replace />;
  // Keyed by plan so the form re-initialises when the saved plan changes.
  return <FeedingForm key={data.cat.id} data={data} />;
}

function FeedingForm({ data }: { data: CatData }) {
  const { weights, bcs, plan, foods } = data;
  const cat = data.cat!;
  const f = zh.feeding;
  const today = todayISO();
  const latestW = latestEntry(weights);
  const latestB = bcs[bcs.length - 1];
  const [weight, setWeight] = useState(latestW ? latestW.weightKg.toFixed(2) : '');
  const [goalChoice, setGoalChoice] = useState<Goal | undefined>(plan?.goal);
  const [rows, setRows] = useState<FoodRow[]>(() => rowsFromPlan(plan, foods));
  const [savedAt, setSavedAt] = useState<string>();

  const refer = vetPlanRequired(cat, today);
  const bcsScore = latestB?.finalScore;
  const goal: Goal = goalChoice ?? (bcsScore !== undefined && bcsScore >= 6 ? 'lose' : 'maintain');
  const kg = Number(weight);
  const weightOk = weight.trim() !== '' && Number.isFinite(kg) && kg > 0;

  const shareSum = rows.reduce((s, r) => s + (Number(r.share) || 0), 0);
  const energyOk = rows.every((r) => Number(r.value) > 0);
  const foodItems = rows.map((r) => ({
    food: {
      id: r.key,
      name: r.name.trim() || f.foodNamePlaceholder(rows.indexOf(r) + 1),
      type: r.type,
      ...(r.mode === 'kg' ? { kcalPerKg: Number(r.value) } : { kcalPerUnit: Number(r.value), unitLabel: f.unitLabel }),
    } satisfies Food,
    share: (Number(r.share) || 0) / 100,
  }));

  const result = useMemo(
    () => (weightOk && bcsScore !== undefined ? dailyKcal(cat, kg, bcsScore, goal, today) : undefined),
    [cat, kg, weightOk, bcsScore, goal, today],
  );
  const canPortion = result?.status === 'OK' && shareSum === 100 && energyOk;
  const list = canPortion ? portions(result.foodKcal!, foodItems) : [];
  const summary = canPortion ? portionSummary(list) : '— g';

  const updateRow = (key: string, patch: Partial<FoodRow>) => {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    setSavedAt(undefined);
  };

  const save = async () => {
    if (!result || result.status !== 'OK' || !canPortion) return;
    const savedFoods: Food[] = foodItems.map(({ food }) => ({ ...food, id: newId() }));
    const newPlan: FeedingPlan = {
      id: newId(),
      catId: cat.id,
      startDate: today,
      goal,
      inputs: { weightKg: kg, bcs: bcsScore! },
      result,
      foods: savedFoods.map((food, i) => ({ foodId: food.id, shareOfFoodKcal: foodItems[i].share })),
      active: true,
    };
    await db.transaction('rw', db.foods, db.feedingPlans, db.weights, async () => {
      await db.foods.bulkAdd(savedFoods);
      const old = await db.feedingPlans.where('catId').equals(cat.id).toArray();
      await db.feedingPlans.bulkPut(old.map((p) => ({ ...p, active: false })));
      await db.feedingPlans.add(newPlan);
      // The loss-rate baseline is the first weight on or after the plan start, so record today's input weight.
      const todays = await db.weights.where('[catId+date]').equals([cat.id, today]).count();
      if (todays === 0) await db.weights.add({ id: newId(), catId: cat.id, date: today, weightKg: Math.round(kg * 100) / 100 });
    });
    setSavedAt(today);
  };

  if (refer) {
    return (
      <Page>
        <PageHeader title={f.title} backTo="/" />
        <QuietNotice title={zh.refer.title}>
          {zh.refer.reasons[refer]} {zh.refer.noNumbers}
        </QuietNotice>
        <KnowledgeCards ids={CARD_IDS.slice(0, 3)} />
        <ResultDisclaimer />
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader title={f.title} backTo="/" />
      {plan && !savedAt && <p className="text-[13px] font-semibold text-ink-2">{f.activeSince(formatDate(plan.startDate))}</p>}

      {result?.status === 'OK' && (
        <section className="grain mt-3 rounded-card-lg bg-food px-3 pt-4 pb-2 shadow-soft">
          <KitchenScale display={summary} label={f.scaleLabel(summary)} className="w-full" />
        </section>
      )}

      {result?.status === 'REFER_VET' && <QuietNotice title={zh.refer.title}>{zh.refer.reasons[result.reason!]} {zh.refer.noNumbers}</QuietNotice>}

      {result?.status === 'OK' && (
        <>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-card bg-paper p-4 shadow-soft">
              <div className="text-[12px] font-semibold text-ink-2">{f.dailyKcal}</div>
              <div className="font-num text-[30px] font-black">{Math.round(result.dailyKcal!)}<span className="ml-1 text-[14px]">kcal</span></div>
              <div className="text-[11px] font-semibold text-ink-2">{zh.estimateTag}</div>
            </div>
            <div className="relative rounded-card bg-paper p-4 shadow-soft">
              <TreatJar className="absolute top-3 right-3 w-8" />
              <div className="text-[12px] font-semibold text-ink-2">{f.treat}</div>
              <div className="font-num text-[30px] font-black">≤ {Math.round(result.treatBudgetKcal!)}<span className="ml-1 text-[14px]">kcal</span></div>
              <div className="text-[11px] font-semibold text-ink-2">{f.treatSub}</div>
            </div>
          </div>
          {canPortion && list.length > 1 && (
            <Card className="mt-3">
              <div className="text-[13px] font-extrabold text-ink-2">{f.perFood}</div>
              <ul className="mt-1">
                {list.map((p) => (
                  <li key={p.food.id} className="flex justify-between border-b border-line-soft py-2 last:border-0">
                    <span>{p.food.name}</span>
                    <span className="font-num font-black">{p.grams !== undefined ? `${Math.round(p.grams)} g` : f.units(formatUnits(p.units!), p.food.unitLabel ?? f.unitLabel)}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {goal === 'lose' && <QuietNotice title={f.vetBeforeLoss} />}
          {goal === 'maintain' && bcsScore! >= 6 && <QuietNotice title={f.maintainOverweight} />}
          <HowCalculated steps={result.steps} />
          <p className="mt-4 text-[13px] font-semibold text-ink-2">{f.estimate}</p>
          <PrimaryButton className="mt-4" disabled={!canPortion} onClick={() => void save()}>
            {savedAt ? f.saved : f.save}
          </PrimaryButton>
        </>
      )}

      <SectionTitle>{f.inputs}</SectionTitle>
      <Card>
        {!latestW && (
          <p className="text-[14px] text-ink-2">
            {f.weightMissing} <Link to="/records" className="font-extrabold text-ink underline">{f.weightCta}</Link>
          </p>
        )}
        <Field label={f.weight}>
          <div className="flex items-center gap-2">
            <input type="number" inputMode="decimal" step={0.01} className={inputClass} value={weight} onChange={(e) => { setWeight(e.target.value); setSavedAt(undefined); }} aria-label={f.weight} />
            <span className="font-extrabold">kg</span>
          </div>
        </Field>
        <Field label={f.bcs}>
          {bcsScore === undefined ? (
            <p className="text-[14px] text-ink-2">
              {f.bcsMissing} <Link to="/bcs" className="font-extrabold text-ink underline">{f.bcsCta}</Link>
            </p>
          ) : (
            <p className="font-num text-[18px] font-black">
              {zh.cat.score(bcsScore)} <span className="text-[13px] font-semibold text-ink-2">（{formatDate(latestB.date)}）</span>{' '}
              <Link to="/bcs" className="text-[13px] font-extrabold underline">{f.rescore}</Link>
            </p>
          )}
        </Field>
        <Field label={f.goal}>
          <div className="flex gap-2">
            <Choice selected={goal === 'maintain'} onClick={() => { setGoalChoice('maintain'); setSavedAt(undefined); }}>{f.goalMaintain}</Choice>
            <Choice selected={goal === 'lose'} onClick={() => { setGoalChoice('lose'); setSavedAt(undefined); }}>{f.goalLose}</Choice>
          </div>
        </Field>
      </Card>

      <SectionTitle>{f.foods}</SectionTitle>
      <div className="flex flex-col gap-3">
        {rows.map((r, i) => (
          <Card key={r.key}>
            <div className="flex items-center justify-between">
              <span className="font-black">{f.foodNamePlaceholder(i + 1)}</span>
              {rows.length > 1 && (
                <button type="button" className="min-h-tap px-2 text-[13px] font-extrabold text-ink-2" onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))}>
                  {f.removeFood}
                </button>
              )}
            </div>
            <Field label={f.foodName}>
              <input className={inputClass} value={r.name} placeholder={f.foodNamePlaceholder(i + 1)} onChange={(e) => updateRow(r.key, { name: e.target.value })} />
            </Field>
            <Field label={f.foodType}>
              <div className="flex flex-wrap gap-2">
                {(['dry', 'wet', 'other'] as const).map((t) => (
                  <Choice key={t} selected={r.type === t} onClick={() => updateRow(r.key, { type: t, mode: t === 'wet' ? 'unit' : r.mode })}>{f.foodTypes[t]}</Choice>
                ))}
              </div>
            </Field>
            <Field label={f.energyMode}>
              <div className="flex gap-2">
                <Choice selected={r.mode === 'kg'} onClick={() => updateRow(r.key, { mode: 'kg' })}>{f.perKg}</Choice>
                <Choice selected={r.mode === 'unit'} onClick={() => updateRow(r.key, { mode: 'unit' })}>{f.perUnit}</Choice>
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={f.energyValue}>
                <input type="number" inputMode="decimal" className={inputClass} value={r.value} placeholder={r.mode === 'kg' ? '3800' : '80'} onChange={(e) => updateRow(r.key, { value: e.target.value })} aria-label={`${f.foodNamePlaceholder(i + 1)} ${f.energyValue}`} />
              </Field>
              <Field label={f.share}>
                <input type="number" inputMode="numeric" className={inputClass} value={r.share} onChange={(e) => updateRow(r.key, { share: e.target.value })} aria-label={`${f.foodNamePlaceholder(i + 1)} ${f.share}`} />
              </Field>
            </div>
          </Card>
        ))}
      </div>
      {shareSum !== 100 && <p role="alert" className="mt-2 text-[13px] font-semibold text-alert">{f.shareError(shareSum)}</p>}
      {!energyOk && <p className="mt-2 text-[13px] font-semibold text-ink-2">{f.energyError}</p>}
      {rows.length < 3 && (
        <button
          type="button"
          className="press mt-3 min-h-tap w-full rounded-full border-[1.5px] border-dashed border-line font-extrabold"
          onClick={() => setRows((rs) => [...rs, newRow('0')])}
        >
          + {f.addFood}
        </button>
      )}

      <KnowledgeCards ids={CARD_IDS.slice(0, 4)} />
      <ResultDisclaimer />
    </Page>
  );
}
