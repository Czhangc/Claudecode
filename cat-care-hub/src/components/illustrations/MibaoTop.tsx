import { useEffect, useRef, useState } from 'react';
import { CANVAS, Y, bodyPath, halfWidthsAt } from '../../lib/bodyOutline';
import { MibaoDefs } from './MibaoDefs';
import { useIllustrationId } from './Mibao';
import { MIBAO } from './palette';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Tweens a numeric value over ~280ms (instant when reduced motion is requested). */
function useTween(target: number, ms = 280) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reducedMotion() || typeof requestAnimationFrame === 'undefined') {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - (1 - t) ** 3;
      const v = origin + (target - origin) * eased;
      from.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

function halfAtY(score: number, y: number): number {
  const w = halfWidthsAt(score);
  const stops: [number, number][] = [
    [Y.neck, 16],
    [Y.shoulder, w.shoulder],
    [Y.chest, (w.shoulder + w.waist) / 2 + 1],
    [Y.waist, w.waist],
    [Y.hip, w.hip],
    [Y.tailRoot, 12],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [y0, h0] = stops[i];
    const [y1, h1] = stops[i + 1];
    if (y >= y0 && y <= y1) return h0 + ((h1 - h0) * (y - y0)) / (y1 - y0);
  }
  return 12;
}

/** Top-down Mibao whose body morphs with the BCS score (DESIGN_SPEC 6.3). */
export function MibaoTop({ score, label, className = '' }: { score: number; label: string; className?: string }) {
  const p = useIllustrationId();
  const s = useTween(score);
  const w = halfWidthsAt(s);
  const d = bodyPath(s);
  const cx = CANVAS.width / 2;
  const stripe = { fill: 'none', stroke: MIBAO.stripe, strokeOpacity: 0.82, strokeLinecap: 'round' as const };
  const arcs = [132, 152, 172, 192, 212, 232, 250];
  return (
    <svg viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`} className={className} role="img" aria-label={label}>
      <MibaoDefs p={p} />
      <g filter={`url(#${p}fur)`}>
        <path d="M100 256 C102 290 130 302 152 292" fill="none" stroke={MIBAO.furEarTail} strokeWidth={13} strokeLinecap="round" />
        <path d="M100 256 C102 290 130 302 152 292" fill="none" stroke={MIBAO.stripe} strokeOpacity={0.8} strokeWidth={13} strokeDasharray="6 9" />
        <circle cx={152} cy={292} r={6.5} fill={MIBAO.stripe} />
        {/* white paws peek out from under the body and follow its width */}
        {[-1, 1].map((side) => (
          <g key={side}>
            <ellipse cx={cx + side * (w.shoulder + 2)} cy={Y.shoulder + 8} rx={7} ry={9} fill={MIBAO.white} />
            <ellipse cx={cx + side * (w.hip + 1)} cy={Y.hip + 10} rx={7.5} ry={9.5} fill={MIBAO.white} />
          </g>
        ))}
        <clipPath id={`${p}top`}>
          <path d={d} />
        </clipPath>
        <path d={d} fill={MIBAO.fur} />
        <g clipPath={`url(#${p}top)`}>
          <path d={d} fill="none" stroke={MIBAO.dark} strokeWidth={22} filter={`url(#${p}b7)`} opacity={0.85} />
          <ellipse cx={cx} cy={182} rx={11} ry={72} fill={MIBAO.lightBack} opacity={0.8} filter={`url(#${p}b7)`} />
          {arcs.map((y) => {
            const h = halfAtY(s, y) * 0.9;
            return <path key={y} d={`M${cx - h} ${y + 9} Q${cx} ${y - 7} ${cx + h} ${y + 9}`} {...stripe} strokeWidth={4} />;
          })}
          <path d={`M${cx} ${Y.neck - 4} L${cx} ${Y.tailRoot}`} {...stripe} strokeWidth={5} />
        </g>
        {/* head seen from above, facing up */}
        <path d="M70 66 L60 40 L86 50 Z" fill={MIBAO.furEarTail} />
        <path d="M130 66 L140 40 L114 50 Z" fill={MIBAO.furEarTail} />
        <path d="M71 60 L65 46 L80 52 Z" fill={MIBAO.innerEar} />
        <path d="M129 60 L135 46 L120 52 Z" fill={MIBAO.innerEar} />
        <clipPath id={`${p}tophead`}>
          <ellipse cx={cx} cy={66} rx={34} ry={33} />
        </clipPath>
        <ellipse cx={cx} cy={66} rx={34} ry={33} fill={MIBAO.furHead} />
        <g clipPath={`url(#${p}tophead)`}>
          <ellipse cx={cx} cy={92} rx={30} ry={14} fill={MIBAO.dark} opacity={0.6} filter={`url(#${p}b5)`} />
          <path d="M86 74 Q100 66 114 74 M90 84 Q100 78 110 84" {...stripe} strokeWidth={3.4} />
          <path d="M100 52 L100 64 M92 54 L94 64 M108 54 L106 64" {...stripe} strokeWidth={3} />
          <ellipse cx={cx} cy={36} rx={15} ry={10} fill={MIBAO.white} filter={`url(#${p}soft)`} />
        </g>
        <ellipse cx={cx} cy={33} rx={3.2} ry={2.2} fill={MIBAO.nose} />
      </g>
    </svg>
  );
}
