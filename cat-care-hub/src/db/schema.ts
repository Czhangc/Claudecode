import Dexie, { type EntityTable } from 'dexie';
import type { BcsAssessment, Cat, FeedingPlan, Food, WeightEntry } from '../lib/types';

export interface MetaRow {
  key: string;
  value: unknown;
}

export interface BlobRow {
  id: string;
  blob: Blob;
}

export class CatCareDB extends Dexie {
  cats!: EntityTable<Cat, 'id'>;
  weights!: EntityTable<WeightEntry, 'id'>;
  bcs!: EntityTable<BcsAssessment, 'id'>;
  foods!: EntityTable<Food, 'id'>;
  feedingPlans!: EntityTable<FeedingPlan, 'id'>;
  meta!: EntityTable<MetaRow, 'key'>;
  blobs!: EntityTable<BlobRow, 'id'>;

  constructor(name = 'cat-care-hub') {
    super(name);
    this.version(1).stores({
      cats: 'id, createdAt',
      weights: 'id, catId, date, [catId+date]',
      bcs: 'id, catId, date',
      foods: 'id',
      feedingPlans: 'id, catId, startDate',
      meta: 'key',
      blobs: 'id',
    });
  }
}

export const db = new CatCareDB();

export const META = {
  disclaimerAck: 'disclaimerAck',
  activeCatId: 'activeCatId',
  vetPhone: 'vetPhone',
  vetName: 'vetName',
} as const;

export async function getMeta<T>(key: string): Promise<T | undefined> {
  return (await db.meta.get(key))?.value as T | undefined;
}

export async function setMeta(key: string, value: unknown): Promise<void> {
  await db.meta.put({ key, value });
}

export const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
