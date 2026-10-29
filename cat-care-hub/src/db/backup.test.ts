import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { CatCareDB } from './schema';
import { exportData, importData, parseBackup } from './backup';

describe('backup', () => {
  it('round-trips all tables through JSON', async () => {
    const a = new CatCareDB('backup-a');
    await a.cats.add({
      id: 'c1', name: '咪宝', sex: 'female', neutered: true, activity: 'normal',
      hasKnownHealthCondition: false, estimatedAgeYears: 3, createdAt: '2026-10-29',
    });
    await a.weights.add({ id: 'w1', catId: 'c1', date: '2026-10-29', weightKg: 4.54 });
    await a.meta.put({ key: 'activeCatId', value: 'c1' });
    const text = JSON.stringify(await exportData(a));

    const b = new CatCareDB('backup-b');
    await b.weights.add({ id: 'old', catId: 'x', date: '2020-01-01', weightKg: 9 });
    await importData(b, parseBackup(text));
    expect(await b.cats.toArray()).toHaveLength(1);
    expect((await b.weights.toArray()).map((w) => w.id)).toEqual(['w1']);
    expect((await b.meta.get('activeCatId'))?.value).toBe('c1');
  });

  it('rejects files that are not backups', () => {
    expect(() => parseBackup('{"hello":1}')).toThrow('not-a-backup');
    expect(() => parseBackup(JSON.stringify({ format: 'cat-care-hub-backup', version: 99, data: {} }))).toThrow(
      'newer-version',
    );
    expect(() => parseBackup(JSON.stringify({ format: 'cat-care-hub-backup', version: 1, data: { cats: 3 } }))).toThrow(
      'not-a-backup',
    );
  });
});
