import { Link } from 'react-router-dom';
import { getCard } from '../content/loader';
import type { KnowledgeCard } from '../content/cardParser';
import { zh } from '../copy/zh';
import { formatDate } from '../lib/date';
import { DraftBadge, SectionTitle } from './ui';
import { SourceList } from './Sources';

const MODULE_DOT: Record<KnowledgeCard['module'], string> = {
  nutrition: 'bg-food',
  body: 'bg-body',
  environment: 'bg-play',
  behavior: 'bg-play',
  triage: 'bg-health',
  general: 'bg-line',
};

export function CardStatus({ card }: { card: KnowledgeCard }) {
  return card.status === 'draft' ? (
    <DraftBadge />
  ) : (
    <span className="text-[12px] font-semibold text-ink-2">
      {zh.common.verified} · {zh.common.verifiedAt(formatDate(card.verifiedAt!))}
    </span>
  );
}

export function KnowledgeCardView({ card, link = true }: { card: KnowledgeCard; link?: boolean }) {
  const isDraft = card.status === 'draft';
  const title = (
    <h3 className="flex items-start gap-2 text-[16px] leading-snug font-black">
      <span aria-hidden className={`mt-1.5 size-2.5 shrink-0 rounded-full ${MODULE_DOT[card.module]}`} />
      <span className="flex-1">{card.title}</span>
    </h3>
  );
  return (
    <article className="rounded-card bg-paper p-5 shadow-soft">
      {link ? (
        <Link to={`/knowledge/${card.id}`} className="block underline-offset-2 hover:underline">
          {title}
        </Link>
      ) : (
        title
      )}
      <p className="mt-2 text-[15px] text-ink-2">{isDraft ? zh.knowledge.draftBody : card.summary}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <SourceList sources={card.sources} />
      </div>
      <div className="mt-2">
        <CardStatus card={card} />
      </div>
    </article>
  );
}

export function KnowledgeCards({ ids }: { ids: string[] }) {
  const list = ids.map(getCard).filter((c): c is KnowledgeCard => Boolean(c));
  if (list.length === 0) return null;
  return (
    <section aria-label={zh.common.knowledge}>
      <SectionTitle>{zh.common.knowledge}</SectionTitle>
      <div className="flex flex-col gap-3">
        {list.map((c) => (
          <KnowledgeCardView key={c.id} card={c} />
        ))}
      </div>
    </section>
  );
}
