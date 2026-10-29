// Top-down body outline for the BCS slider (DESIGN_SPEC 6.3). Illustrative only, not a measurement standard.

export const CANVAS = { width: 200, height: 320 } as const;
const CX = CANVAS.width / 2;

// Half-widths on a 200px-wide canvas, indexed by score 1–9.
export const HALF_WIDTHS: Record<number, { shoulder: number; waist: number; hip: number }> = {
  1: { shoulder: 30, waist: 16, hip: 27 },
  2: { shoulder: 31, waist: 19, hip: 28 },
  3: { shoulder: 32, waist: 23, hip: 31 },
  4: { shoulder: 34, waist: 27, hip: 34 },
  5: { shoulder: 36, waist: 31, hip: 36 },
  6: { shoulder: 38, waist: 36, hip: 39 },
  7: { shoulder: 40, waist: 42, hip: 42 },
  8: { shoulder: 43, waist: 49, hip: 45 },
  9: { shoulder: 46, waist: 56, hip: 48 },
};

export const Y = { neck: 96, shoulder: 122, chest: 152, waist: 186, hip: 226, tailRoot: 262 } as const;
const NECK_HALF = 16;
const TAIL_ROOT_HALF = 12;

/** Half-widths for a possibly fractional score (linear interpolation between table rows). */
export function halfWidthsAt(score: number) {
  const s = Math.min(9, Math.max(1, score));
  const lo = Math.floor(s);
  const hi = Math.min(9, lo + 1);
  const t = s - lo;
  const a = HALF_WIDTHS[lo];
  const b = HALF_WIDTHS[hi];
  const lerp = (x: number, y: number) => x + (y - x) * t;
  return { shoulder: lerp(a.shoulder, b.shoulder), waist: lerp(a.waist, b.waist), hip: lerp(a.hip, b.hip) };
}

export type Point = [number, number];

/** The 12 control points: right side from neck to tail root, then left side back up. */
export function outlinePoints(score: number): Point[] {
  const w = halfWidthsAt(score);
  const chest = (w.shoulder + w.waist) / 2 + 1;
  const right: Point[] = [
    [CX + NECK_HALF, Y.neck],
    [CX + w.shoulder, Y.shoulder],
    [CX + chest, Y.chest],
    [CX + w.waist, Y.waist],
    [CX + w.hip, Y.hip],
    [CX + TAIL_ROOT_HALF, Y.tailRoot],
  ];
  const left = right.map(([x, y]) => [2 * CX - x, y] as Point).reverse();
  return [...right, ...left];
}

/** Closed uniform Catmull-Rom spline through the points, as cubic Bézier SVG path data. */
export function catmullRomClosed(points: Point[]): string {
  const n = points.length;
  const f = (v: number) => v.toFixed(2);
  let d = `M${f(points[0][0])},${f(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d} Z`;
}

export function bodyPath(score: number): string {
  return catmullRomClosed(outlinePoints(score));
}
