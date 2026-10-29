import type { ReactNode } from 'react';
import { IconAlert, IconCheck, IconInfo } from './Icons';

/** Quiet-zone styled block used for health warnings, even inside daily-zone pages (DESIGN_SPEC 5). */
export function QuietNotice({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'alert' | 'info' | 'safe';
  title: string;
  children?: ReactNode;
}) {
  const look =
    tone === 'alert'
      ? 'border-alert text-ink'
      : tone === 'safe'
        ? 'border-ideal text-ink'
        : 'border-quiet-line text-ink';
  const icon =
    tone === 'alert' ? (
      <IconAlert className="text-alert" />
    ) : tone === 'safe' ? (
      <IconCheck className="text-ideal-ink" />
    ) : (
      <IconInfo className="text-ink-2" />
    );
  return (
    <div role={tone === 'alert' ? 'alert' : 'status'} className={`mt-4 flex gap-3 rounded-card border-[1.5px] bg-quiet-surface p-4 ${look}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-[15px] font-black">{title}</div>
        {children && <div className="mt-1 text-[14px] text-ink-2">{children}</div>}
      </div>
    </div>
  );
}
