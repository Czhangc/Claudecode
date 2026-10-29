import { sourceLabel, sourceRegistry } from '../content/loader';
import type { SourceRef } from '../content/cardParser';

export function SourceChip({ id, locator }: { id: string; locator?: string }) {
  const record = sourceRegistry.get(id);
  const url = record?.links[0]?.url;
  const text = `${sourceLabel(id)}${locator ? ` · ${locator}` : ''}`;
  const cls = 'inline-flex min-h-6 items-center rounded-full bg-chip px-2.5 py-0.5 text-[11px] font-extrabold text-ink';
  if (!url) return <span className={cls}>{text}</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${cls} underline-offset-2 hover:underline`} title={record?.name}>
      {text}
    </a>
  );
}

export function SourceList({ sources }: { sources: (SourceRef | string)[] }) {
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {sources.map((s) => {
        const ref = typeof s === 'string' ? { id: s } : s;
        return <SourceChip key={`${ref.id}-${ref.locator ?? ''}`} {...ref} />;
      })}
    </span>
  );
}
