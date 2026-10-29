import {
  BCS_EXCESS_PER_POINT,
  BCS_IDEAL_MAX,
  CONSTANT_SOURCES,
  MER_FACTOR,
  RER_COEFFICIENT,
  RER_EXPONENT,
  TREAT_MAX_SHARE,
} from './constants';
import { ageYears, todayISO } from './date';
import type { CalcStep, Cat, FeedingResult, Food, Goal, ISODate } from './types';

const fmt = (n: number, digits = 2) => Number(n.toFixed(digits)).toString();

export function estimateIdealWeightKg(currentKg: number, bcs: number): number {
  if (bcs <= BCS_IDEAL_MAX) return currentKg;
  return currentKg / (1 + BCS_EXCESS_PER_POINT * (bcs - BCS_IDEAL_MAX));
}

export function rer(weightKg: number): number {
  return RER_COEFFICIENT * weightKg ** RER_EXPONENT;
}

type CatForFeeding = Pick<
  Cat,
  'birthDate' | 'estimatedAgeYears' | 'neutered' | 'activity' | 'hasKnownHealthCondition' | 'isPregnantOrLactating'
>;

/** Returns the reason a vet must set this cat's diet, or undefined if the calculator may run. */
export function vetPlanRequired(cat: CatForFeeding, asOf: ISODate = todayISO()) {
  const age = ageYears(cat, asOf);
  if (age === undefined) return 'age-unknown' as const;
  if (age < 1) return 'kitten' as const;
  if (cat.hasKnownHealthCondition) return 'health-condition' as const;
  if (cat.isPregnantOrLactating) return 'pregnant-lactating' as const;
  return undefined;
}

export function dailyKcal(
  cat: CatForFeeding,
  weightKg: number,
  bcs: number,
  goal: Goal,
  asOf: ISODate = todayISO(),
): FeedingResult {
  const refer = vetPlanRequired(cat, asOf);
  if (refer) return { status: 'REFER_VET', reason: refer, steps: [] };
  if (bcs <= 3) return { status: 'REFER_VET', reason: 'underweight', steps: [] };

  const steps: CalcStep[] = [];
  let idealWeightKg = weightKg;
  let factor: number;
  let rerKcal: number;
  let factorLabel: string;

  if (goal === 'lose') {
    idealWeightKg = estimateIdealWeightKg(weightKg, bcs);
    steps.push({
      label: '估算理想体重',
      formula:
        bcs > BCS_IDEAL_MAX
          ? `${fmt(weightKg)} ÷ (1 + ${BCS_EXCESS_PER_POINT} × (${bcs} − ${BCS_IDEAL_MAX}))`
          : `体况 ${bcs} 分，按当前体重 ${fmt(weightKg)}`,
      value: idealWeightKg,
      unit: 'kg',
      sourceIds: [...CONSTANT_SOURCES.BCS_EXCESS_PER_POINT],
    });
    rerKcal = rer(idealWeightKg);
    factor = MER_FACTOR.weightLoss;
    factorLabel = '减重系数';
  } else {
    rerKcal = rer(weightKg);
    if (cat.activity === 'low') {
      factor = MER_FACTOR.inactiveOrObeseProne;
      factorLabel = '活动偏少系数';
    } else if (cat.neutered) {
      factor = MER_FACTOR.neuteredAdult;
      factorLabel = '绝育成年猫系数';
    } else {
      factor = MER_FACTOR.intactAdult;
      factorLabel = '未绝育成年猫系数';
    }
  }

  steps.push({
    label: goal === 'lose' ? '静息能量需求 RER（按理想体重）' : '静息能量需求 RER',
    formula: `${RER_COEFFICIENT} × ${fmt(goal === 'lose' ? idealWeightKg : weightKg)}^${RER_EXPONENT}`,
    value: rerKcal,
    unit: 'kcal',
    sourceIds: [...CONSTANT_SOURCES.RER_COEFFICIENT],
  });

  const kcal = factor * rerKcal;
  steps.push({
    label: `每日热量（${factorLabel} ${factor}）`,
    formula: `${factor} × ${fmt(rerKcal, 1)}`,
    value: kcal,
    unit: 'kcal',
    sourceIds: [...CONSTANT_SOURCES.MER_FACTOR],
  });

  const treatBudgetKcal = kcal * TREAT_MAX_SHARE;
  steps.push({
    label: '零食额度（每日热量的 10% 以内）',
    formula: `${fmt(kcal, 1)} × ${TREAT_MAX_SHARE * 100}%`,
    value: treatBudgetKcal,
    unit: 'kcal',
    sourceIds: [...CONSTANT_SOURCES.TREAT_MAX_SHARE],
  });

  const foodKcal = kcal - treatBudgetKcal;
  steps.push({
    label: '主粮热量',
    formula: `${fmt(kcal, 1)} − ${fmt(treatBudgetKcal, 1)}`,
    value: foodKcal,
    unit: 'kcal',
    sourceIds: [...CONSTANT_SOURCES.TREAT_MAX_SHARE],
  });

  return {
    status: 'OK',
    idealWeightKg,
    rerKcal,
    factor,
    dailyKcal: kcal,
    treatBudgetKcal,
    foodKcal,
    vetCheckAdvised: goal === 'lose' ? true : undefined,
    steps,
  };
}

export function gramsPerDay(foodKcal: number, share: number, food: Food): number | { units: number } {
  if (food.kcalPerKg) return (foodKcal * share) / (food.kcalPerKg / 1000);
  if (food.kcalPerUnit) return { units: (foodKcal * share) / food.kcalPerUnit };
  throw new Error(`Food ${food.id} has no energy density`);
}
