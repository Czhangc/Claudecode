import sourcesMarkdown from '../../docs/KNOWLEDGE_SOURCES.md?raw';
import emergencyJson from '../../content/emergency.json';
import bcsWizardJson from '../../content/bcs-wizard.json';
import { parseSourceRegistry, type SourceRecord } from '../lib/sources';
import type { WizardQuestion } from '../lib/bcs';
import { toCard, type CardModule, type KnowledgeCard } from './cardParser';
import { SOURCE_SHORT_LABELS } from './sourceLabels';

const cardFiles = import.meta.glob('../../content/cards/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

export const cards: KnowledgeCard[] = Object.values(cardFiles)
  .map(toCard)
  .sort((a, b) => a.id.localeCompare(b.id));

export const sourceRegistry: Map<string, SourceRecord> = parseSourceRegistry(sourcesMarkdown);

export function sourceLabel(id: string): string {
  return SOURCE_SHORT_LABELS[id] ?? id;
}

export function getCard(id: string): KnowledgeCard | undefined {
  return cards.find((c) => c.id === id);
}

export function cardsByModule(module: CardModule): KnowledgeCard[] {
  return cards.filter((c) => c.module === module);
}

export interface EmergencyItem {
  id: string;
  level: 'EMERGENCY' | 'URGENT_24H';
  title: string;
  detail: string;
  sourceIds: string[];
  status: 'draft' | 'verified';
  verifiedBy?: string;
  verifiedAt?: string;
}

export const emergency = emergencyJson as { id: string; title: string; items: EmergencyItem[]; keywords: string[] };

export interface BcsWizard {
  id: string;
  status: 'draft' | 'verified';
  todo?: string;
  sources: { id: string }[];
  questions: WizardQuestion[];
  scoreDescriptions: Record<string, string>;
}

export const bcsWizard = bcsWizardJson as BcsWizard;

/** Official WSAVA chart links, read from the S03 entry of the source registry. */
export function wsavaLinks() {
  const links = sourceRegistry.get('S03')?.links ?? [];
  return {
    chart: links.find((l) => l.label === '猫体况评分图')?.url,
    toolkitZh: links.find((l) => l.label === '简体中文工具包')?.url,
  };
}
