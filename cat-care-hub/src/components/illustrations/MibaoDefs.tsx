import { MIBAO } from './palette';

/** Shared filters/gradients. `p` is a per-instance id prefix from useId(). */
export function MibaoDefs({ p }: { p: string }) {
  return (
    <defs>
      <filter id={`${p}b3`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id={`${p}b5`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
      <filter id={`${p}b7`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" /></filter>
      <filter id={`${p}soft`} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.1" /></filter>
      <filter id={`${p}eyeglow`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" /></filter>
      {/* Fur grain: monochrome turbulence clipped to the drawing, multiplied in at ~16%. */}
      <filter id={`${p}fur`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="3" result="n" />
        <feColorMatrix in="n" type="saturate" values="0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gc" />
        <feBlend in="SourceGraphic" in2="gc" mode="multiply" result="m" />
        <feComposite in="m" in2="SourceGraphic" operator="arithmetic" k1="0" k2="0.16" k3="0.84" k4="0" result="mix" />
        <feComposite in="mix" in2="SourceAlpha" operator="in" />
      </filter>
      <radialGradient id={`${p}eye`} cx="45%" cy="40%" r="60%">
        <stop offset="0%" stopColor={MIBAO.eye[0]} />
        <stop offset="55%" stopColor={MIBAO.eye[1]} />
        <stop offset="100%" stopColor={MIBAO.eye[2]} />
      </radialGradient>
    </defs>
  );
}
