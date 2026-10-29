import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSourceIds } from '../src/lib/sources';
import { CONSTANT_SOURCES } from '../src/lib/constants';
import { SOURCE_SHORT_LABELS } from '../src/content/sourceLabels';
import { validateContent } from './validateContentCore';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(root, 'content');

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
  );
}

const files = existsSync(contentDir) ? walk(contentDir) : [];
const rel = (f: string) => relative(root, f);

const report = validateContent({
  sourceIds: parseSourceIds(readFileSync(join(root, 'docs/KNOWLEDGE_SOURCES.md'), 'utf8')),
  cards: files.filter((f) => f.endsWith('.md')).map((f) => ({ file: rel(f), raw: readFileSync(f, 'utf8') })),
  json: files.filter((f) => f.endsWith('.json')).map((f) => {
    try {
      return { file: rel(f), data: JSON.parse(readFileSync(f, 'utf8')) as unknown };
    } catch {
      return { file: rel(f), data: null };
    }
  }),
  constantSources: CONSTANT_SOURCES,
  sourceLabels: SOURCE_SHORT_LABELS,
});

for (const w of report.warnings) console.warn(`⚠ ${w}`);
if (report.errors.length > 0) {
  for (const e of report.errors) console.error(`✖ ${e}`);
  console.error(`\n内容校验失败：${report.errors.length} 个错误`);
  process.exit(1);
}
console.log(`✔ 内容校验通过（${files.length} 个文件，${report.drafts.length} 个待核对条目）`);
