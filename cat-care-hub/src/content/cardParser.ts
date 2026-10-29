import { parse } from 'yaml';

export const CARD_MODULES = ['nutrition', 'body', 'environment', 'behavior', 'triage', 'general'] as const;
export type CardModule = (typeof CARD_MODULES)[number];

export interface SourceRef {
  id: string;
  locator?: string;
}

export interface KnowledgeCard {
  id: string;
  module: CardModule;
  title: string;
  summary: string;
  sources: SourceRef[];
  status: 'draft' | 'verified';
  verifiedBy?: string;
  verifiedAt?: string;
  tags?: string[];
  body: string;
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/** Splits a card file into its raw frontmatter object and Markdown body. Does not validate. */
export function parseCardFile(raw: string): { data: Record<string, unknown>; body: string } {
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = parse(match[1]) as unknown;
  return {
    data: data && typeof data === 'object' ? (data as Record<string, unknown>) : {},
    body: match[2].trim(),
  };
}

export function toCard(raw: string): KnowledgeCard {
  const { data, body } = parseCardFile(raw);
  return { ...(data as unknown as Omit<KnowledgeCard, 'body'>), body };
}
