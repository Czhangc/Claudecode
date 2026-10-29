import { useLiveQuery } from 'dexie-react-hooks';
import { META, db } from './db/schema';
import { sortByDate } from './lib/weightTrend';
import type { BcsAssessment, Cat, FeedingPlan, Food, WeightEntry } from './lib/types';

export function useMeta<T>(key: string): { loaded: boolean; value: T | undefined } {
  const row = useLiveQuery(async () => ({ v: (await db.meta.get(key))?.value as T | undefined }), [key]);
  return { loaded: row !== undefined, value: row?.v };
}

export interface CatData {
  loaded: boolean;
  cats: Cat[];
  cat?: Cat;
  weights: WeightEntry[];
  bcs: BcsAssessment[];
  plan?: FeedingPlan;
  foods: Food[];
}

/** Everything the pages need about the active cat (falls back to the first cat). */
export function useActiveCatData(): CatData {
  const data = useLiveQuery(async () => {
    const cats = await db.cats.orderBy('createdAt').toArray();
    const activeId = (await db.meta.get(META.activeCatId))?.value as string | undefined;
    const cat = cats.find((c) => c.id === activeId) ?? cats[0];
    if (!cat) return { cats, weights: [], bcs: [], foods: [] };
    const [weights, bcs, plans, foods] = await Promise.all([
      db.weights.where('catId').equals(cat.id).toArray(),
      db.bcs.where('catId').equals(cat.id).toArray(),
      db.feedingPlans.where('catId').equals(cat.id).toArray(),
      db.foods.toArray(),
    ]);
    return {
      cats,
      cat,
      weights: sortByDate(weights),
      bcs: sortByDate(bcs),
      plan: plans.find((p) => p.active),
      foods,
    };
  });
  return data ? { loaded: true, ...data } : { loaded: false, cats: [], weights: [], bcs: [], foods: [] };
}
