import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zh } from '../copy/zh';
import { META, db, newId, setMeta } from '../db/schema';
import { todayISO } from '../lib/date';
import type { Cat } from '../lib/types';
import { Choice, Field, Page, PageHeader, PrimaryButton, inputClass } from '../components/ui';
import { useAvatarUrl } from '../components/Avatar';

type Draft = {
  name: string;
  ageMode: 'birth' | 'estimate';
  birthDate: string;
  estimatedAgeYears: string;
  sex: Cat['sex'];
  neutered: boolean;
  activity: Cat['activity'];
  hasKnownHealthCondition: boolean;
  isPregnantOrLactating: boolean;
  avatarBlobId?: string;
};

const empty: Draft = {
  name: '',
  ageMode: 'birth',
  birthDate: '',
  estimatedAgeYears: '',
  sex: 'female',
  neutered: true,
  activity: 'normal',
  hasKnownHealthCondition: false,
  isPregnantOrLactating: false,
};

export function validateCatDraft(d: Draft, today: string): Partial<Record<'name' | 'age', string>> {
  const errors: Partial<Record<'name' | 'age', string>> = {};
  const c = zh.cat;
  if (!d.name.trim()) errors.name = c.errName;
  if (d.ageMode === 'birth') {
    if (!d.birthDate) errors.age = c.errAge;
    else if (d.birthDate > today) errors.age = c.errBirthFuture;
  } else {
    const n = Number(d.estimatedAgeYears);
    if (d.estimatedAgeYears.trim() === '') errors.age = c.errAge;
    else if (!Number.isFinite(n) || n < 0 || n > 30) errors.age = c.errEstimate;
  }
  return errors;
}

export function CatFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const c = zh.cat;
  const [d, setD] = useState<Draft>(empty);
  const [existing, setExisting] = useState<Cat | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const today = todayISO();
  const avatarUrl = useAvatarUrl(d.avatarBlobId);

  useEffect(() => {
    if (!id) return;
    db.cats.get(id).then((cat) => {
      if (!cat) return;
      setExisting(cat);
      setD({
        name: cat.name,
        ageMode: cat.birthDate ? 'birth' : 'estimate',
        birthDate: cat.birthDate ?? '',
        estimatedAgeYears: cat.estimatedAgeYears?.toString() ?? '',
        sex: cat.sex,
        neutered: cat.neutered,
        activity: cat.activity,
        hasKnownHealthCondition: cat.hasKnownHealthCondition,
        isPregnantOrLactating: cat.isPregnantOrLactating ?? false,
        avatarBlobId: cat.avatarBlobId,
      });
    });
  }, [id]);

  const errors = validateCatDraft(d, today);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((prev) => ({ ...prev, [k]: v }));

  const pickAvatar = async (file: File | undefined) => {
    if (!file) return;
    const blobId = newId();
    await db.blobs.put({ id: blobId, blob: file });
    set('avatarBlobId', blobId);
  };

  const save = async () => {
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    const cat: Cat = {
      id: existing?.id ?? newId(),
      name: d.name.trim(),
      birthDate: d.ageMode === 'birth' ? d.birthDate : undefined,
      estimatedAgeYears: d.ageMode === 'estimate' ? Number(d.estimatedAgeYears) : undefined,
      sex: d.sex,
      neutered: d.neutered,
      activity: d.activity,
      hasKnownHealthCondition: d.hasKnownHealthCondition,
      isPregnantOrLactating: d.sex === 'female' ? d.isPregnantOrLactating : undefined,
      avatarBlobId: d.avatarBlobId,
      createdAt: existing?.createdAt ?? today,
    };
    await db.cats.put(cat);
    await setMeta(META.activeCatId, cat.id);
    navigate('/cat', { replace: true });
  };

  const yesNo = (value: boolean, onChange: (v: boolean) => void) => (
    <div className="flex gap-2">
      <Choice selected={value} onClick={() => onChange(true)}>{c.yes}</Choice>
      <Choice selected={!value} onClick={() => onChange(false)}>{c.no}</Choice>
    </div>
  );

  return (
    <Page>
      <PageHeader title={id ? c.editTitle : c.newTitle} />
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <Field label={c.name} error={submitted ? errors.name : undefined}>
          <input className={inputClass} value={d.name} placeholder={c.namePlaceholder} onChange={(e) => set('name', e.target.value)} aria-label={c.name} />
        </Field>

        <Field label={c.age} error={submitted ? errors.age : undefined}>
          <div className="mb-3 flex gap-2">
            <Choice selected={d.ageMode === 'birth'} onClick={() => set('ageMode', 'birth')}>{c.ageKnown}</Choice>
            <Choice selected={d.ageMode === 'estimate'} onClick={() => set('ageMode', 'estimate')}>{c.ageEstimate}</Choice>
          </div>
          {d.ageMode === 'birth' ? (
            <input type="date" className={inputClass} max={today} value={d.birthDate} onChange={(e) => set('birthDate', e.target.value)} aria-label={c.birthDate} />
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={30}
                step={0.5}
                className={inputClass}
                value={d.estimatedAgeYears}
                onChange={(e) => set('estimatedAgeYears', e.target.value)}
                aria-label={c.estimatedAge}
              />
              <span className="font-extrabold">{c.years}</span>
            </div>
          )}
        </Field>

        <Field label={c.sex}>
          <div className="flex gap-2">
            <Choice selected={d.sex === 'female'} onClick={() => set('sex', 'female')}>{c.female}</Choice>
            <Choice selected={d.sex === 'male'} onClick={() => set('sex', 'male')}>{c.male}</Choice>
          </div>
        </Field>

        <Field label={c.neutered}>{yesNo(d.neutered, (v) => set('neutered', v))}</Field>

        <Field label={c.activity}>
          <div className="flex gap-2">
            <Choice selected={d.activity === 'normal'} onClick={() => set('activity', 'normal')}>{c.activityNormal}</Choice>
            <Choice selected={d.activity === 'low'} onClick={() => set('activity', 'low')}>{c.activityLow}</Choice>
          </div>
        </Field>

        <Field label={c.health} hint={c.healthHint}>{yesNo(d.hasKnownHealthCondition, (v) => set('hasKnownHealthCondition', v))}</Field>

        {d.sex === 'female' && <Field label={c.pregnant}>{yesNo(d.isPregnantOrLactating, (v) => set('isPregnantOrLactating', v))}</Field>}

        <Field label={c.avatar}>
          <div className="flex items-center gap-3">
            {avatarUrl && <img src={avatarUrl} alt="" className="size-14 rounded-full object-cover" />}
            <label className="press inline-flex min-h-tap cursor-pointer items-center rounded-full border-[1.5px] border-line bg-paper px-4 font-extrabold">
              {c.avatarPick}
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => void pickAvatar(e.target.files?.[0])} />
            </label>
            {d.avatarBlobId && (
              <button type="button" className="min-h-tap px-2 text-[14px] font-extrabold text-ink-2" onClick={() => set('avatarBlobId', undefined)}>
                {c.avatarRemove}
              </button>
            )}
          </div>
        </Field>

        <PrimaryButton type="submit" className="mt-8">{c.save}</PrimaryButton>
      </form>
    </Page>
  );
}
