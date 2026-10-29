import { describe, expect, it } from 'vitest';
import wizard from '../../../content/bcs-wizard.json';
import { bcsCategory, clampScore, estimateBcs, type WizardQuestion } from '../bcs';
import { CANVAS, HALF_WIDTHS, bodyPath, halfWidthsAt, outlinePoints } from '../bodyOutline';

const questions = wizard.questions as WizardQuestion[];

describe('estimateBcs', () => {
  it('is undefined until all questions are answered', () => {
    expect(estimateBcs(questions, { ribs: 'ribs-thin-cover' })).toBeUndefined();
    expect(estimateBcs([], {})).toBeUndefined();
  });

  it('averages and rounds the chosen option scores', () => {
    expect(estimateBcs(questions, { ribs: 'ribs-thin-cover', waist: 'waist-slight', belly: 'belly-slight-tuck' })).toBe(5);
    expect(estimateBcs(questions, { ribs: 'ribs-press', waist: 'waist-none', belly: 'belly-flat' })).toBe(7);
    expect(estimateBcs(questions, { ribs: 'ribs-visible', waist: 'waist-extreme', belly: 'belly-tucked' })).toBe(2);
  });

  it('every wizard option score is within 1–9', () => {
    for (const q of questions) for (const o of q.options) expect(o.score).toBe(clampScore(o.score));
  });
});

describe('bcsCategory', () => {
  it('maps 1–3 thin, 4–5 ideal, 6–7 over, 8–9 obese', () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9].map(bcsCategory)).toEqual([
      'thin', 'thin', 'thin', 'ideal', 'ideal', 'over', 'over', 'obese', 'obese',
    ]);
  });

  it('clampScore keeps scores in range', () => {
    expect(clampScore(0)).toBe(1);
    expect(clampScore(12)).toBe(9);
    expect(clampScore(4.6)).toBe(5);
  });
});

describe('body outline', () => {
  it('uses the DESIGN_SPEC table at integer scores', () => {
    for (let s = 1; s <= 9; s++) expect(halfWidthsAt(s)).toEqual(HALF_WIDTHS[s]);
  });

  it('interpolates fractional scores and clamps out-of-range input', () => {
    expect(halfWidthsAt(5.5).waist).toBeCloseTo(33.5, 6);
    expect(halfWidthsAt(0)).toEqual(HALF_WIDTHS[1]);
    expect(halfWidthsAt(10)).toEqual(HALF_WIDTHS[9]);
  });

  it('builds 12 symmetric points and a closed path', () => {
    const pts = outlinePoints(7);
    expect(pts).toHaveLength(12);
    for (let i = 0; i < 6; i++) {
      expect(pts[i][0] + pts[11 - i][0]).toBeCloseTo(CANVAS.width, 6);
      expect(pts[i][1]).toBe(pts[11 - i][1]);
    }
    const d = bodyPath(7);
    expect(d.startsWith('M')).toBe(true);
    expect(d.endsWith('Z')).toBe(true);
    expect(d.match(/C/g)).toHaveLength(12);
  });
});
