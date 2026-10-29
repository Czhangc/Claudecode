// Every numeric constant used in calculations. Values and source IDs come from
// docs/KNOWLEDGE_SOURCES.md section 3; do not add a constant without a source.

export const RER_COEFFICIENT = 70; // S01, S02
export const RER_EXPONENT = 0.75; // S01, S02
export const MER_FACTOR = {
  neuteredAdult: 1.2, // S01 (range 1.2–1.4, lower bound), S02
  intactAdult: 1.4, // S01 (range 1.4–1.6, lower bound), S02
  inactiveOrObeseProne: 1.0, // S01, S02
  weightLoss: 0.8, // S01, S02 (applied to the RER of the ideal weight)
} as const;
export const BCS_IDEAL_MIN = 4; // S03, S04
export const BCS_IDEAL_MAX = 5; // S03, S04 (4–5 is ideal)
export const BCS_EXCESS_PER_POINT = 0.1; // S04 (10–15% per point; 10% keeps the ideal weight estimate high, so loss is gentler)
export const TREAT_MAX_SHARE = 0.1; // S07, S18
export const SAFE_LOSS_PER_WEEK = { min: 0.005, max: 0.02 } as const; // S05 (0.5%–2%)
export const INDIVIDUAL_VARIATION = 0.5; // S02 (up to ±50%)

export const CONSTANT_SOURCES = {
  RER_COEFFICIENT: ['S01', 'S02'],
  RER_EXPONENT: ['S01', 'S02'],
  MER_FACTOR: ['S01', 'S02'],
  BCS_IDEAL_MIN: ['S03', 'S04'],
  BCS_IDEAL_MAX: ['S03', 'S04'],
  BCS_EXCESS_PER_POINT: ['S04'],
  TREAT_MAX_SHARE: ['S07', 'S18'],
  SAFE_LOSS_PER_WEEK: ['S05'],
  INDIVIDUAL_VARIATION: ['S02'],
} as const satisfies Record<string, readonly string[]>;
