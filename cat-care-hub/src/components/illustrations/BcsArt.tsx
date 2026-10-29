import type { ReactNode } from 'react';
import { bodyPath } from '../../lib/bodyOutline';
import { MIBAO } from './palette';

// Simple original diagrams for the BCS wizard. Shapes are illustrative, not a scoring standard.

function sideBody(score: number) {
  const sag = (score - 5) * 4.5; // negative = tucked belly
  return `M34 52 C34 32 72 26 104 28 C138 30 170 32 172 52 C174 64 162 68 152 68 C124 ${70 + sag} 80 ${70 + sag} 52 68 C40 68 34 62 34 52 Z`;
}

function SideCat({ score, children }: { score: number; children?: ReactNode }) {
  return (
    <g>
      <path d="M170 44 C190 40 198 28 196 18" fill="none" stroke={MIBAO.furEarTail} strokeWidth={7} strokeLinecap="round" />
      <rect x={48} y={58} width={12} height={32} rx={6} fill={MIBAO.furLeg} />
      <rect x={146} y={58} width={12} height={32} rx={6} fill={MIBAO.furLeg} />
      <ellipse cx={54} cy={90} rx={8} ry={4} fill={MIBAO.white} />
      <ellipse cx={152} cy={90} rx={8} ry={4} fill={MIBAO.white} />
      <path d={sideBody(score)} fill={MIBAO.fur} />
      {children}
      <circle cx={30} cy={34} r={17} fill={MIBAO.furHead} />
      <path d="M20 22 L18 8 L30 18 Z M34 18 L42 6 L42 22 Z" fill={MIBAO.furEarTail} />
      <circle cx={24} cy={33} r={3} fill={MIBAO.eye[2]} />
    </g>
  );
}

export function BcsOptionArt({ question, score }: { question: string; score: number }) {
  if (question === 'waist') {
    return (
      <svg viewBox="40 80 120 200" className="h-20 w-12" aria-hidden="true">
        <path d={bodyPath(score)} fill={MIBAO.fur} />
        <path d="M100 96 V262" stroke={MIBAO.stripe} strokeOpacity={0.8} strokeWidth={4} />
      </svg>
    );
  }
  if (question === 'ribs') {
    const ribOpacity = Math.max(0, Math.min(1, (6 - score) / 4));
    return (
      <svg viewBox="0 0 206 100" className="h-14 w-24" aria-hidden="true">
        <SideCat score={score}>
          <g stroke={MIBAO.stripe} strokeWidth={3} strokeLinecap="round" opacity={ribOpacity} fill="none">
            {[72, 84, 96, 108].map((x) => (
              <path key={x} d={`M${x} 36 Q${x + 6} 50 ${x} 62`} />
            ))}
          </g>
        </SideCat>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 206 100" className="h-14 w-24" aria-hidden="true">
      <SideCat score={score} />
    </svg>
  );
}

/** Looping demo of the action for each question (static when reduced motion is on). */
export function BcsDemo({ kind }: { kind: 'ribs' | 'top' | 'side' }) {
  if (kind === 'top') {
    return (
      <svg viewBox="0 0 240 150" className="h-36 w-full" aria-hidden="true">
        <g transform="translate(120 104) rotate(-90) scale(0.42) translate(-100 -180)">
          <path d={bodyPath(5)} fill={MIBAO.fur} />
          <ellipse cx={100} cy={66} rx={34} ry={33} fill={MIBAO.furHead} />
        </g>
        <g className="demo-bob">
          <ellipse cx={120} cy={26} rx={18} ry={10} fill="#FFFCF7" stroke="#2A211C" strokeWidth={2.4} />
          <circle cx={120} cy={26} r={5} fill="#2A211C" />
          <path d="M120 40 V58" stroke="#2A211C" strokeWidth={2} strokeDasharray="4 4" />
        </g>
      </svg>
    );
  }
  if (kind === 'side') {
    return (
      <svg viewBox="0 0 240 150" className="h-36 w-full" aria-hidden="true">
        <g transform="translate(30 30)">
          <SideCat score={5} />
        </g>
        <g className="demo-scan">
          <ellipse cx={20} cy={108} rx={12} ry={7} fill="#FFFCF7" stroke="#2A211C" strokeWidth={2.2} />
          <circle cx={20} cy={108} r={3.4} fill="#2A211C" />
          <path d="M36 108 H120" stroke="#2A211C" strokeWidth={2} strokeDasharray="4 5" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 150" className="h-36 w-full" aria-hidden="true">
      <g transform="translate(30 36)">
        <SideCat score={5} />
      </g>
      <g className="demo-scan">
        <path d="M84 52 C84 40 100 38 108 42 L132 52 C138 56 136 62 130 62 L108 64 C96 66 84 62 84 52 Z" fill="#F3D9C4" />
        <path d="M108 44 L130 53 M106 50 L131 57 M106 56 L129 61" stroke="#E2BFA4" strokeWidth={1.8} strokeLinecap="round" />
      </g>
    </svg>
  );
}
