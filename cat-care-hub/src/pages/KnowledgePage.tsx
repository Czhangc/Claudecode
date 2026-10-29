import { Link, useParams } from 'react-router-dom';
import { cards, getCard } from '../content/loader';
import { CARD_MODULES } from '../content/cardParser';
import { zh } from '../copy/zh';
import { CardStatus, KnowledgeCardView } from '../components/KnowledgeCards';
import { Markdown } from '../components/Markdown';
import { SourceChip } from '../components/Sources';
import { Card, Page, PageHeader, SectionTitle } from '../components/ui';
import { sourceRegistry } from '../content/loader';

export function KnowledgePage() {
  const k = zh.knowledge;
  return (
    <Page>
      <PageHeader title={k.title} backTo="/" />
      <p className="text-[14px] text-ink-2">{k.intro}</p>
      {CARD_MODULES.map((m) => {
        const list = cards.filter((c) => c.module === m);
        if (list.length === 0) return null;
        return (
          <section key={m}>
            <SectionTitle>{k.modules[m]}</SectionTitle>
            <div className="flex flex-col gap-3">
              {list.map((c) => <KnowledgeCardView key={c.id} card={c} />)}
            </div>
          </section>
        );
      })}
    </Page>
  );
}

export function KnowledgeDetailPage() {
  const { id } = useParams();
  const card = id ? getCard(id) : undefined;
  if (!card) {
    return (
      <Page>
        <PageHeader title={zh.knowledge.title} backTo="/knowledge" />
        <p className="mt-4"><Link to="/knowledge" className="underline">{zh.knowledge.title}</Link></p>
      </Page>
    );
  }
  return (
    <Page>
      <PageHeader title={card.title} backTo="/knowledge" />
      <Card className="mt-2">
        <div className="mb-3"><CardStatus card={card} /></div>
        {card.status === 'draft' ? <p className="text-ink-2">{zh.knowledge.draftBody}</p> : <Markdown source={card.body} />}
      </Card>
      <SectionTitle>{zh.common.sources}</SectionTitle>
      <ul className="flex flex-col gap-2">
        {card.sources.map((s) => {
          const rec = sourceRegistry.get(s.id);
          return (
            <li key={s.id} className="rounded-card bg-paper p-4 text-[14px] shadow-soft">
              <SourceChip id={s.id} locator={s.locator} />
              <div className="mt-1 font-semibold">{rec?.name}</div>
              {rec && <div className="text-[12px] text-ink-2">{rec.grade} 级来源</div>}
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
