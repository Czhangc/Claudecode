import { gramsPerDay } from './nutrition';
import type { FeedingPlan, Food } from './types';

export interface Portion {
  food: Food;
  share: number;
  grams?: number;
  units?: number;
}

export function portions(foodKcal: number, items: { food: Food; share: number }[]): Portion[] {
  return items.map(({ food, share }) => {
    const r = gramsPerDay(foodKcal, share, food);
    return typeof r === 'number' ? { food, share, grams: r } : { food, share, units: r.units };
  });
}

/** One-line daily amount: total grams of weighed foods, plus per-unit foods (e.g. "39 g + 0.5 罐"). */
export function portionSummary(list: Portion[]): string {
  const grams = list.reduce((s, p) => s + (p.grams ?? 0), 0);
  const parts: string[] = [];
  if (list.some((p) => p.grams !== undefined)) parts.push(`${Math.round(grams)} g`);
  for (const p of list) if (p.units !== undefined) parts.push(`${formatUnits(p.units)} ${p.food.unitLabel ?? '罐'}`);
  return parts.join(' + ');
}

export function formatUnits(units: number): string {
  return Number(units.toFixed(1)).toString();
}

export function gramsSummary(plan: FeedingPlan, foods: Food[]): string {
  if (plan.result.status !== 'OK' || plan.result.foodKcal === undefined) return '';
  const items = plan.foods
    .map((f) => ({ food: foods.find((x) => x.id === f.foodId), share: f.shareOfFoodKcal }))
    .filter((x): x is { food: Food; share: number } => Boolean(x.food));
  return portionSummary(portions(plan.result.foodKcal, items));
}
