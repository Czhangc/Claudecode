import type { CatCareDB } from './schema';

export const BACKUP_FORMAT = 'cat-care-hub-backup';
export const BACKUP_VERSION = 1;

const TABLES = ['cats', 'weights', 'bcs', 'foods', 'feedingPlans', 'meta'] as const;
type TableName = (typeof TABLES)[number];

export interface Backup {
  format: typeof BACKUP_FORMAT;
  version: number;
  exportedAt: string;
  data: Record<TableName, unknown[]>;
}

/** Exports all user data except avatar images (kept on this device only). */
export async function exportData(db: CatCareDB): Promise<Backup> {
  const data = {} as Record<TableName, unknown[]>;
  for (const t of TABLES) data[t] = await db.table(t).toArray();
  return { format: BACKUP_FORMAT, version: BACKUP_VERSION, exportedAt: new Date().toISOString(), data };
}

export function parseBackup(text: string): Backup {
  const parsed = JSON.parse(text) as Partial<Backup>;
  if (parsed.format !== BACKUP_FORMAT || typeof parsed.version !== 'number' || !parsed.data) {
    throw new Error('not-a-backup');
  }
  if (parsed.version > BACKUP_VERSION) throw new Error('newer-version');
  for (const t of TABLES) {
    if (parsed.data[t] !== undefined && !Array.isArray(parsed.data[t])) throw new Error('not-a-backup');
  }
  return parsed as Backup;
}

/** Replaces all data with the backup's contents in one transaction. */
export async function importData(db: CatCareDB, backup: Backup): Promise<void> {
  await db.transaction('rw', TABLES.map((t) => db.table(t)), async () => {
    for (const t of TABLES) {
      await db.table(t).clear();
      const rows = backup.data[t] ?? [];
      if (rows.length) await db.table(t).bulkAdd(rows);
    }
  });
}
