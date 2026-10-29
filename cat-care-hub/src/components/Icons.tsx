import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...p,
});

export const IconBack = (p: P) => (<svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>);
export const IconClose = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconArrow = (p: P) => (<svg {...base(p)}><path d="M9 5l7 7-7 7" /></svg>);
export const IconDown = (p: P) => (<svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>);
export const IconAlert = (p: P) => (<svg {...base(p)}><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5M12 18.5v.01" /></svg>);
export const IconCheck = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const IconInfo = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.01" /></svg>);
export const IconClock = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const IconPhone = (p: P) => (<svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>);
export const IconMap = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const IconHome = (p: P) => (<svg {...base(p)}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-9z" /></svg>);
export const IconList = (p: P) => (<svg {...base(p)}><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>);
export const IconBook = (p: P) => (<svg {...base(p)}><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" /><path d="M4 19a2 2 0 012-2h13" /></svg>);
export const IconUser = (p: P) => (<svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></svg>);
export const IconScale = (p: P) => (<svg {...base(p)}><rect x="3" y="7" width="18" height="13" rx="4" /><path d="M9 12a3 3 0 016 0" /><path d="M8 4h8" /></svg>);
export const IconBowl = (p: P) => (<svg {...base(p)}><path d="M3 11h18a9 6 0 01-18 0z" /><path d="M8 8c0-1.5 1-2 2-2M13 7c0-1.5 1-2 2-2" /></svg>);
export const IconYarn = (p: P) => (<svg {...base(p)}><circle cx="11" cy="12" r="7" /><path d="M6 9c4 0 8 3 10 7M7 15c3-2 7-2 10-1M10 5.5c1 3 1 8-1 12.5" /><path d="M17 17c1.5 1 3 1.5 4 1" /></svg>);
export const IconCross = (p: P) => (<svg {...base(p)}><rect x="4" y="4" width="16" height="16" rx="5" /><path d="M12 8v8M8 12h8" /></svg>);
export const IconPaw = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden fill="currentColor" {...p}>
    <ellipse cx="12" cy="15.5" rx="4.6" ry="3.8" />
    <circle cx="6.3" cy="10.5" r="2" />
    <circle cx="9.6" cy="6.8" r="2.1" />
    <circle cx="14.4" cy="6.8" r="2.1" />
    <circle cx="17.7" cy="10.5" r="2" />
  </svg>
);
