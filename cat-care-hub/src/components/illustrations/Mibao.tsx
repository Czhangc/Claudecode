import { useId } from 'react';
import { MibaoDefs } from './MibaoDefs';
import { MibaoFace } from './MibaoFace';
import { MIBAO } from './palette';

function useP() {
  return `m${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}

/** Mibao sitting, full body (home, empty states). Decorative. */
export function MibaoSitting({ className = '', decor = false }: { className?: string; decor?: boolean }) {
  const p = useP();
  const stripe = { fill: 'none', stroke: MIBAO.stripe, strokeOpacity: 0.82, strokeWidth: 5, strokeLinecap: 'round' as const };
  return (
    <svg viewBox="0 0 240 262" className={className} aria-hidden="true">
      <MibaoDefs p={p} />
      <g filter={`url(#${p}fur)`}>
        {/* tail curling up on the right, ringed with a dashed stroke */}
        <path d="M168 240 C204 246 222 214 212 188 C206 174 198 170 193 176" fill="none" stroke={MIBAO.furEarTail} strokeWidth={15} strokeLinecap="round" />
        <path d="M168 240 C204 246 222 214 212 188 C206 174 198 170 193 176" fill="none" stroke={MIBAO.stripe} strokeOpacity={0.8} strokeWidth={15} strokeDasharray="7 10" />
        <circle cx={193.5} cy={176} r={7.5} fill={MIBAO.stripe} />
        <clipPath id={`${p}body`}>
          <path d="M80 128 C60 160 50 210 62 238 C72 254 168 254 178 238 C190 210 180 160 160 128 Z" />
        </clipPath>
        <path d="M80 128 C60 160 50 210 62 238 C72 254 168 254 178 238 C190 210 180 160 160 128 Z" fill={MIBAO.fur} />
        <g clipPath={`url(#${p}body)`}>
          <ellipse cx={58} cy={196} rx={20} ry={58} fill={MIBAO.dark} filter={`url(#${p}b7)`} />
          <ellipse cx={182} cy={196} rx={20} ry={58} fill={MIBAO.dark} filter={`url(#${p}b7)`} />
          <ellipse cx={80} cy={224} rx={15} ry={20} fill={MIBAO.bellyWarm} opacity={0.55} filter={`url(#${p}b5)`} />
          <ellipse cx={160} cy={224} rx={15} ry={20} fill={MIBAO.bellyWarm} opacity={0.55} filter={`url(#${p}b5)`} />
          <path d="M58 168 Q71 163 82 170 M56 189 Q70 184 82 191 M58 211 Q71 206 82 213" {...stripe} />
          <path d="M182 168 Q169 163 158 170 M184 189 Q170 184 158 191 M182 211 Q169 206 158 213" {...stripe} />
          {/* white bib */}
          <path d="M97 126 Q120 142 143 126 Q152 170 139 206 Q120 216 101 206 Q88 170 97 126 Z" fill={MIBAO.white} filter={`url(#${p}soft)`} />
          <ellipse cx={120} cy={204} rx={17} ry={6} fill={MIBAO.whiteShadow} filter={`url(#${p}b3)`} />
        </g>
        {/* front legs with white socks */}
        <rect x={85} y={194} width={24} height={54} rx={12} fill={MIBAO.furLeg} />
        <rect x={131} y={194} width={24} height={54} rx={12} fill={MIBAO.furLeg} />
        <path d="M86 214 h10 M86 226 h9 M154 214 h-10 M154 226 h-9" {...stripe} strokeWidth={3.4} />
        <ellipse cx={97} cy={222} rx={5} ry={14} fill={MIBAO.bellyWarm} opacity={0.35} filter={`url(#${p}b3)`} />
        <ellipse cx={143} cy={222} rx={5} ry={14} fill={MIBAO.bellyWarm} opacity={0.35} filter={`url(#${p}b3)`} />
        <ellipse cx={97} cy={246} rx={14.5} ry={8.5} fill={MIBAO.white} filter={`url(#${p}soft)`} />
        <ellipse cx={143} cy={246} rx={14.5} ry={8.5} fill={MIBAO.white} filter={`url(#${p}soft)`} />
        <path d="M92.5 243 v6 M101.5 243 v6 M138.5 243 v6 M147.5 243 v6" stroke={MIBAO.toe} strokeWidth={1.6} strokeLinecap="round" />
        <MibaoFace p={p} />
      </g>
      {decor && (
        <g aria-hidden="true">
          <path d="M28 46 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={MIBAO.accentInk} />
          <path d="M210 40 c-4 -6 -12 -2 -9 4 l9 9 9 -9 c3 -6 -5 -10 -9 -4z" fill={MIBAO.accentPink} />
        </g>
      )}
    </svg>
  );
}

/** Small head-only avatar: forehead stripes, warm eye rings, white muzzle, green eyes. */
export function MibaoHead({ className = '' }: { className?: string }) {
  const p = useP();
  return (
    <svg viewBox="52 22 136 136" className={className} aria-hidden="true">
      <MibaoDefs p={p} />
      <g filter={`url(#${p}fur)`}>
        <MibaoFace p={p} />
      </g>
    </svg>
  );
}

/** Mibao peeking in from the right with one white paw on the edge (used on the kitchen scale). */
export function MibaoPeek({ p, x, y, scale }: { p: string; x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-120 -100)`} filter={`url(#${p}fur)`}>
      <MibaoFace p={p} />
    </g>
  );
}

export { useP as useIllustrationId };
