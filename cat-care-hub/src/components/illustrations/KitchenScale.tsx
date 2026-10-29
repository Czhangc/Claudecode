import { MibaoDefs } from './MibaoDefs';
import { MibaoPeek, useIllustrationId } from './Mibao';
import { MIBAO } from './palette';

/** Kitchen scale with a food bowl; the display shows the daily grams. Mibao peeks in from the right. */
export function KitchenScale({ display, label, className = '' }: { display: string; label: string; className?: string }) {
  const p = useIllustrationId();
  return (
    <svg viewBox="0 0 320 210" className={className} role="img" aria-label={label}>
      <MibaoDefs p={p} />
      <MibaoPeek p={p} x={282} y={92} scale={0.62} />
      {/* bowl with kibble */}
      <g>
        <circle cx={112} cy={70} r={9} fill="#B97A43" />
        <circle cx={128} cy={64} r={9} fill="#C98B52" />
        <circle cx={146} cy={68} r={9} fill="#A0703F" />
        <circle cx={162} cy={66} r={9} fill="#C98B52" />
        <circle cx={178} cy={72} r={9} fill="#B97A43" />
        <circle cx={138} cy={78} r={9} fill="#A0703F" />
        <circle cx={156} cy={80} r={9} fill="#B97A43" />
        <path d="M86 76 H204 C202 104 184 118 145 118 C106 118 88 104 86 76 Z" fill="#E86A7E" />
        <path d="M92 84 H198" stroke="#F2B4C6" strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* scale */}
      <rect x={50} y={118} width={210} height={14} rx={7} fill="#EADBC8" />
      <rect x={60} y={132} width={190} height={66} rx={22} fill="#FFFCF7" />
      <rect x={60} y={132} width={190} height={66} rx={22} fill="none" stroke="#E6D3BE" strokeWidth={2} />
      <rect x={98} y={146} width={114} height={38} rx={10} fill="#2A211C" />
      <text x={155} y={173} textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight={900} fontSize={22} fill={MIBAO.eye[0]}>
        {display}
      </text>
      {/* one white paw resting on the platform edge */}
      <ellipse cx={252} cy={118} rx={14} ry={9} fill={MIBAO.white} />
      <path d="M246 114 v7 M252 113 v8 M258 114 v7" stroke={MIBAO.toe} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export function TreatJar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 64" className={className} aria-hidden="true">
      <rect x={12} y={6} width={36} height={10} rx={4} fill="#E86A7E" />
      <rect x={8} y={14} width={44} height={46} rx={14} fill="#FFFCF7" />
      <rect x={8} y={14} width={44} height={46} rx={14} fill="none" stroke="#E6D3BE" strokeWidth={2} />
      <path d="M18 38 Q28 28 38 38 Q28 48 18 38 Z M38 38 L45 32 L45 44 Z" fill="#F6D27A" />
      <circle cx={23} cy={37} r={1.6} fill="#2A211C" />
    </svg>
  );
}
