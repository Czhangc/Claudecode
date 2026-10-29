export type ISODate = string; // 'YYYY-MM-DD'

export interface Cat {
  id: string;
  name: string;
  birthDate?: ISODate;
  estimatedAgeYears?: number; // used when the birth date is unknown
  sex: 'male' | 'female';
  neutered: boolean;
  activity: 'low' | 'normal';
  hasKnownHealthCondition: boolean;
  isPregnantOrLactating?: boolean; // female only
  avatarBlobId?: string;
  createdAt: ISODate;
}

export interface WeightEntry {
  id: string;
  catId: string;
  date: ISODate;
  weightKg: number;
  note?: string;
}

export interface BcsAssessment {
  id: string;
  catId: string;
  date: ISODate;
  answers: Record<string, string>; // wizard question id -> option id
  estimatedScore: number; // 1–9, from the wizard
  finalScore: number; // 1–9, confirmed or adjusted by the owner against the official chart
}

export interface Food {
  id: string;
  name: string;
  type: 'dry' | 'wet' | 'other';
  kcalPerKg?: number; // one of the two
  kcalPerUnit?: number; // e.g. per can
  unitLabel?: string; // '罐' | '袋'
}

export type Goal = 'maintain' | 'lose';

export interface CalcStep {
  label: string;
  formula: string;
  value: number;
  unit: string;
  sourceIds: string[];
}

export type ReferReason = 'kitten' | 'age-unknown' | 'health-condition' | 'pregnant-lactating' | 'underweight';

export interface FeedingResult {
  status: 'OK' | 'REFER_VET';
  reason?: ReferReason;
  idealWeightKg?: number;
  rerKcal?: number;
  factor?: number;
  dailyKcal?: number;
  treatBudgetKcal?: number;
  foodKcal?: number;
  vetCheckAdvised?: boolean;
  steps: CalcStep[];
}

export interface FeedingPlan {
  id: string;
  catId: string;
  startDate: ISODate;
  goal: Goal;
  inputs: { weightKg: number; bcs: number };
  result: FeedingResult;
  foods: { foodId: string; shareOfFoodKcal: number }[]; // shares sum to 1
  active: boolean;
}
