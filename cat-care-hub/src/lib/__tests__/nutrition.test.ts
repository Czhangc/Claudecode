import { describe, expect, it } from 'vitest';
import { dailyKcal, estimateIdealWeightKg, gramsPerDay, rer, vetPlanRequired } from '../nutrition';
import type { Cat } from '../types';

const TODAY = '2026-10-29';
const adult = (overrides: Partial<Cat> = {}): Cat => ({
  id: 'c1',
  name: '咪宝',
  birthDate: '2022-05-01',
  sex: 'female',
  neutered: true,
  activity: 'normal',
  hasKnownHealthCondition: false,
  createdAt: TODAY,
  ...overrides,
});

describe('TECH_SPEC 4.5 examples', () => {
  it('E1: 4.54 kg neutered, normal activity, BCS 5, maintain', () => {
    const r = dailyKcal(adult(), 4.54, 5, 'maintain', TODAY);
    expect(r.status).toBe('OK');
    expect(r.rerKcal).toBeCloseTo(217.7, 1);
    expect(r.dailyKcal).toBeCloseTo(261.3, 1);
    expect(r.factor).toBe(1.2);
    expect(r.vetCheckAdvised).toBeUndefined();
  });

  it('E2: 5.0 kg neutered, BCS 7, lose; dry food 3800 kcal/kg at 100%', () => {
    const r = dailyKcal(adult(), 5.0, 7, 'lose', TODAY);
    expect(r.status).toBe('OK');
    expect(r.idealWeightKg).toBeCloseTo(4.167, 2);
    expect(r.rerKcal).toBeCloseTo(204.1, 1);
    expect(r.dailyKcal).toBeCloseTo(163.3, 1);
    expect(r.treatBudgetKcal).toBeCloseTo(16.3, 1);
    expect(r.foodKcal).toBeCloseTo(147.0, 1);
    expect(r.vetCheckAdvised).toBe(true);
    const grams = gramsPerDay(r.foodKcal!, 1, { id: 'f', name: '干粮', type: 'dry', kcalPerKg: 3800 });
    expect(grams).toBeCloseTo(38.7, 1);
  });

  it('E3: 4.0 kg intact, normal activity, BCS 5, maintain', () => {
    const r = dailyKcal(adult({ neutered: false }), 4.0, 5, 'maintain', TODAY);
    expect(r.dailyKcal).toBeCloseTo(277.2, 1);
    expect(r.factor).toBe(1.4);
  });

  it('E4: 4.0 kg neutered, low activity, BCS 5, maintain', () => {
    const r = dailyKcal(adult({ activity: 'low' }), 4.0, 5, 'maintain', TODAY);
    expect(r.dailyKcal).toBeCloseTo(198.0, 1);
    expect(r.factor).toBe(1.0);
  });

  it('E5: any weight with BCS 3 → REFER_VET without numbers', () => {
    for (const w of [2.5, 4, 6.5]) {
      const r = dailyKcal(adult(), w, 3, 'maintain', TODAY);
      expect(r).toEqual({ status: 'REFER_VET', reason: 'underweight', steps: [] });
    }
    expect(dailyKcal(adult(), 4, 1, 'lose', TODAY).status).toBe('REFER_VET');
  });

  it('E6: 8 months old → REFER_VET without numbers', () => {
    const r = dailyKcal(adult({ birthDate: '2026-02-28' }), 3, 5, 'maintain', TODAY);
    expect(r).toEqual({ status: 'REFER_VET', reason: 'kitten', steps: [] });
    expect(dailyKcal(adult({ birthDate: undefined, estimatedAgeYears: 0.7 }), 3, 5, 'maintain', TODAY).reason).toBe(
      'kitten',
    );
  });
});

describe('referral rules', () => {
  it('refers cats with known health conditions, pregnancy/lactation or unknown age', () => {
    expect(vetPlanRequired(adult({ hasKnownHealthCondition: true }), TODAY)).toBe('health-condition');
    expect(vetPlanRequired(adult({ isPregnantOrLactating: true }), TODAY)).toBe('pregnant-lactating');
    expect(vetPlanRequired(adult({ birthDate: undefined }), TODAY)).toBe('age-unknown');
    expect(vetPlanRequired(adult(), TODAY)).toBeUndefined();
  });

  it('checks the cat before body condition', () => {
    expect(dailyKcal(adult({ hasKnownHealthCondition: true }), 4, 3, 'maintain', TODAY).reason).toBe('health-condition');
  });
});

describe('helpers', () => {
  it('ideal weight equals current weight at or below BCS 5', () => {
    expect(estimateIdealWeightKg(4.2, 5)).toBe(4.2);
    expect(estimateIdealWeightKg(4.2, 4)).toBe(4.2);
    expect(estimateIdealWeightKg(6, 9)).toBeCloseTo(6 / 1.4, 6);
  });

  it('rer follows 70 × kg^0.75', () => {
    expect(rer(1)).toBe(70);
    expect(rer(16)).toBeCloseTo(560, 6);
  });

  it('lose goal at BCS 5 uses current weight as ideal', () => {
    const r = dailyKcal(adult(), 4.0, 5, 'lose', TODAY);
    expect(r.idealWeightKg).toBe(4.0);
    expect(r.dailyKcal).toBeCloseTo(0.8 * rer(4), 6);
  });

  it('records every calculation step with sources', () => {
    const r = dailyKcal(adult(), 5.0, 7, 'lose', TODAY);
    expect(r.steps.map((s) => s.label)).toHaveLength(5);
    for (const s of r.steps) expect(s.sourceIds.length).toBeGreaterThan(0);
    expect(r.steps[0].formula).toBe('5 ÷ (1 + 0.1 × (7 − 5))');
  });

  it('gramsPerDay splits by share and supports per-unit foods', () => {
    expect(gramsPerDay(150, 0.5, { id: 'd', name: 'd', type: 'dry', kcalPerKg: 4000 })).toBeCloseTo(18.75, 6);
    expect(gramsPerDay(150, 0.5, { id: 'w', name: 'w', type: 'wet', kcalPerUnit: 75, unitLabel: '罐' })).toEqual({
      units: 1,
    });
    expect(() => gramsPerDay(150, 1, { id: 'x', name: 'x', type: 'other' })).toThrow();
  });
});
