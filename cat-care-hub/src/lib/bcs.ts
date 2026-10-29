import { BCS_IDEAL_MAX, BCS_IDEAL_MIN } from './constants';

export interface WizardOption {
  id: string;
  label: string;
  score: number;
}
export interface WizardQuestion {
  id: string;
  demo: 'ribs' | 'top' | 'side';
  action: string;
  prompt: string;
  options: WizardOption[];
}

export type BcsCategory = 'thin' | 'ideal' | 'over' | 'obese';

/** Mean of the chosen options' scores, rounded and clamped to 1–9. Undefined until every question is answered. */
export function estimateBcs(questions: WizardQuestion[], answers: Record<string, string>): number | undefined {
  const scores: number[] = [];
  for (const q of questions) {
    const option = q.options.find((o) => o.id === answers[q.id]);
    if (!option) return undefined;
    scores.push(option.score);
  }
  if (scores.length === 0) return undefined;
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  return clampScore(Math.round(mean));
}

export function clampScore(score: number): number {
  return Math.min(9, Math.max(1, Math.round(score)));
}

export function bcsCategory(score: number): BcsCategory {
  if (score < BCS_IDEAL_MIN) return 'thin';
  if (score <= BCS_IDEAL_MAX) return 'ideal';
  if (score <= 7) return 'over';
  return 'obese';
}
