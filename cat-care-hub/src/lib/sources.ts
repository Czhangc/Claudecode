// Parses docs/KNOWLEDGE_SOURCES.md so the source registry has a single source of truth.

export interface SourceRecord {
  id: string;
  name: string;
  grade: string;
  usage: string;
  links: { label?: string; url: string }[];
}

const ROW_RE = /^\|\s*(S\d{2})\s*\|\s*(.+?)\s*\|\s*([A-C])\s*\|\s*(.+?)\s*\|\s*$/;
const LINK_RE = /^-\s*(S\d{2}):\s*(.+)$/;
const SUBLINK_RE = /^\s+-\s*(.+?)[：:]\s*(https?:\/\/\S+)\s*$/;
const URL_RE = /https?:\/\/[^\s；;]+/g;

export function parseSourceRegistry(markdown: string): Map<string, SourceRecord> {
  const registry = new Map<string, SourceRecord>();
  let lastLinkId: string | null = null;
  for (const line of markdown.split(/\r?\n/)) {
    const row = ROW_RE.exec(line);
    if (row) {
      const [, id, name, grade, usage] = row;
      registry.set(id, { id, name, grade, usage, links: [] });
      continue;
    }
    const link = LINK_RE.exec(line);
    if (link && registry.has(link[1])) {
      lastLinkId = link[1];
      const urls = link[2].match(URL_RE) ?? [];
      registry.get(link[1])!.links.push(...urls.map((url) => ({ url })));
      continue;
    }
    const sub = SUBLINK_RE.exec(line);
    if (sub && lastLinkId) {
      registry.get(lastLinkId)!.links.push({ label: sub[1], url: sub[2] });
      continue;
    }
    if (!/^\s+-/.test(line)) lastLinkId = null;
  }
  return registry;
}

export function parseSourceIds(markdown: string): Set<string> {
  return new Set(parseSourceRegistry(markdown).keys());
}
