import { MIBAO } from './palette';

/** Mibao's head on a 240-wide canvas, centred at (120, 100). */
export function MibaoFace({ p, whisker = MIBAO.whiskerOnLight }: { p: string; whisker?: string }) {
  const eye = (cx: number) => (
    <g>
      <circle cx={cx} cy={100} r={17} fill={MIBAO.eyeWarm} opacity={0.9} filter={`url(#${p}eyeglow)`} />
      <circle cx={cx} cy={100} r={13.5} fill={`url(#${p}eye)`} stroke={MIBAO.rim} strokeWidth={2.2} />
      <ellipse cx={cx} cy={101} rx={4.6} ry={9} fill={MIBAO.pupil} />
      <circle cx={cx - 5} cy={95} r={3.6} fill="#fff" />
      <circle cx={cx + 4} cy={105} r={1.6} fill="#fff" />
    </g>
  );
  const stripe = { fill: 'none', stroke: MIBAO.stripe, strokeOpacity: 0.82, strokeLinecap: 'round' as const };
  return (
    <g>
      {/* ears */}
      <path d="M68 82 Q60 42 72 28 Q98 42 108 60 Z" fill={MIBAO.furEarTail} />
      <path d="M172 82 Q180 42 168 28 Q142 42 132 60 Z" fill={MIBAO.furEarTail} />
      <path d="M75 72 Q71 48 77 40 Q92 50 99 61 Z" fill={MIBAO.innerEar} />
      <path d="M165 72 Q169 48 163 40 Q148 50 141 61 Z" fill={MIBAO.innerEar} />
      <path d="M78 66 l6 -8 M82 70 l7 -6 M162 66 l-6 -8 M158 70 l-7 -6" stroke={MIBAO.earFur} strokeWidth={1.6} strokeLinecap="round" />
      <clipPath id={`${p}head`}>
        <ellipse cx={120} cy={102} rx={60} ry={52} />
      </clipPath>
      <ellipse cx={120} cy={102} rx={60} ry={52} fill={MIBAO.furHead} />
      <g clipPath={`url(#${p}head)`}>
        <ellipse cx={120} cy={54} rx={56} ry={22} fill={MIBAO.dark} opacity={0.7} filter={`url(#${p}b7)`} />
        <ellipse cx={84} cy={122} rx={22} ry={18} fill={MIBAO.light} filter={`url(#${p}b5)`} />
        <ellipse cx={156} cy={122} rx={22} ry={18} fill={MIBAO.light} filter={`url(#${p}b5)`} />
        {/* forehead M + crown lines */}
        <path d="M103 78 L109 63 L115 73 L120 59 L125 73 L131 63 L137 78" {...stripe} strokeWidth={3.6} strokeLinejoin="round" />
        <path d="M112 56 L113 46 M120 54 L120 43 M128 56 L127 46" {...stripe} strokeWidth={3.2} />
        {/* cheek stripes, two per side */}
        <path d="M62 104 Q75 101 84 106 M64 117 Q76 113 85 117" {...stripe} strokeWidth={3.4} />
        <path d="M178 104 Q165 101 156 106 M176 117 Q164 113 155 117" {...stripe} strokeWidth={3.4} />
        {/* white muzzle and nose bridge */}
        <ellipse cx={120} cy={130} rx={25} ry={16} fill={MIBAO.white} filter={`url(#${p}soft)`} />
        <ellipse cx={120} cy={110} rx={4} ry={8} fill={MIBAO.white} filter={`url(#${p}soft)`} />
      </g>
      {eye(97)}
      {eye(143)}
      <ellipse cx={82} cy={124} rx={9} ry={5} fill={MIBAO.blush} opacity={0.4} />
      <ellipse cx={158} cy={124} rx={9} ry={5} fill={MIBAO.blush} opacity={0.4} />
      <path d="M113.5 118 Q120 114.5 126.5 118 Q123 124.5 120 125.5 Q117 124.5 113.5 118 Z" fill={MIBAO.nose} />
      <ellipse cx={118} cy={118.6} rx={2.2} ry={1} fill={MIBAO.noseLight} />
      <path d="M120 125.5 V129 M120 129 Q115.5 134 111 130.5 M120 129 Q124.5 134 129 130.5" fill="none" stroke={MIBAO.dark} strokeWidth={1.8} strokeLinecap="round" />
      <g stroke={whisker} strokeWidth={1.3} strokeLinecap="round">
        <path d="M96 128 L56 121 M96 132 L54 134 M97 136 L60 145" />
        <path d="M144 128 L184 121 M144 132 L186 134 M143 136 L180 145" />
      </g>
    </g>
  );
}
