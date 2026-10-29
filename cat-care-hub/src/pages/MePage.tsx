import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zh } from '../copy/zh';
import { META, db, getMeta, setMeta } from '../db/schema';
import { exportData, importData, parseBackup } from '../db/backup';
import { useActiveCatData } from '../hooks';
import { todayISO } from '../lib/date';
import { CatAvatar } from '../components/Avatar';
import { DisclaimerScreen } from '../components/DisclaimerGate';
import { Card, Field, Page, PageHeader, PrimaryButton, SecondaryButton, SectionTitle, inputClass } from '../components/ui';

export function MePage() {
  const me = zh.me;
  const navigate = useNavigate();
  const { cats, cat } = useActiveCatData();
  const [vetName, setVetName] = useState('');
  const [vetPhone, setVetPhone] = useState('');
  const [vetSaved, setVetSaved] = useState(false);
  const [message, setMessage] = useState<string>();
  const [showIntro, setShowIntro] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void getMeta<string>(META.vetName).then((v) => setVetName(v ?? ''));
    void getMeta<string>(META.vetPhone).then((v) => setVetPhone(v ?? ''));
  }, []);

  if (showIntro) return <DisclaimerScreen onAccept={() => setShowIntro(false)} />;

  const doExport = async () => {
    const backup = await exportData(db);
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cat-care-hub-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const doImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      const backup = parseBackup(await file.text());
      if (!window.confirm(me.importConfirm)) return;
      await importData(db, backup);
      setMessage(me.importDone);
    } catch (e) {
      setMessage((e as Error).message === 'newer-version' ? me.importNewer : me.importError);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const deleteCat = async (id: string, name: string) => {
    if (!window.confirm(zh.cat.deleteConfirm(name))) return;
    await db.transaction('rw', [db.cats, db.weights, db.bcs, db.feedingPlans, db.meta], async () => {
      await db.weights.where('catId').equals(id).delete();
      await db.bcs.where('catId').equals(id).delete();
      await db.feedingPlans.where('catId').equals(id).delete();
      await db.cats.delete(id);
      if ((await getMeta(META.activeCatId)) === id) await db.meta.delete(META.activeCatId);
    });
  };

  return (
    <Page>
      <PageHeader title={me.title} backTo="/" />

      <SectionTitle>{me.cats}</SectionTitle>
      <ul className="flex flex-col gap-3">
        {cats.map((c) => (
          <li key={c.id} className="flex items-center gap-3 rounded-card bg-paper p-3 shadow-soft">
            <CatAvatar blobId={c.avatarBlobId} className="size-12" />
            <span className="flex-1 font-black">
              {c.name}
              {c.id === cat?.id && <span className="ml-2 rounded-full bg-chip px-2 py-0.5 text-[11px] font-extrabold">{me.current}</span>}
            </span>
            {c.id !== cat?.id && (
              <button type="button" className="min-h-tap rounded-full border-[1.5px] border-ink px-3 text-[13px] font-extrabold" onClick={() => void setMeta(META.activeCatId, c.id)}>
                {me.switchTo}
              </button>
            )}
            <Link to={`/cat/${c.id}/edit`} className="flex min-h-tap items-center px-2 text-[13px] font-extrabold text-ink-2">{zh.common.edit}</Link>
            <button type="button" className="min-h-tap px-2 text-[13px] font-extrabold text-ink-2" onClick={() => void deleteCat(c.id, c.name)} aria-label={`${zh.cat.deleteCat}：${c.name}`}>
              {zh.common.delete}
            </button>
          </li>
        ))}
      </ul>
      <SecondaryButton className="mt-3" onClick={() => navigate('/cat/new')}>+ {cats.length ? me.addCat : zh.home.noCatCta}</SecondaryButton>

      <SectionTitle>{me.vet}</SectionTitle>
      <Card>
        <Field label={me.vetName}>
          <input className={inputClass} value={vetName} onChange={(e) => { setVetName(e.target.value); setVetSaved(false); }} />
        </Field>
        <Field label={me.vetPhone}>
          <input type="tel" inputMode="tel" className={inputClass} value={vetPhone} onChange={(e) => { setVetPhone(e.target.value); setVetSaved(false); }} />
        </Field>
        <PrimaryButton
          className="mt-5"
          onClick={async () => {
            await setMeta(META.vetName, vetName.trim());
            await setMeta(META.vetPhone, vetPhone.trim());
            setVetSaved(true);
          }}
        >
          {vetSaved ? me.vetSaved : me.vetSave}
        </PrimaryButton>
      </Card>

      <SectionTitle>{me.data}</SectionTitle>
      <Card>
        <p className="text-[14px] text-ink-2">{me.dataHint}</p>
        <div className="mt-4 flex flex-col gap-3">
          <PrimaryButton onClick={() => void doExport()}>{me.export}</PrimaryButton>
          <SecondaryButton onClick={() => fileRef.current?.click()}>{me.import}</SecondaryButton>
          <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" aria-label={me.import} onChange={(e) => void doImport(e.target.files?.[0])} />
        </div>
        {message && <p role="status" className="mt-3 text-center text-[13px] font-extrabold">{message}</p>}
      </Card>

      <SectionTitle>{me.about}</SectionTitle>
      <Card>
        <p className="text-[14px] text-ink-2">{zh.disclaimer.footer}</p>
        <SecondaryButton className="mt-4" onClick={() => setShowIntro(true)}>{me.reread}</SecondaryButton>
      </Card>
    </Page>
  );
}
