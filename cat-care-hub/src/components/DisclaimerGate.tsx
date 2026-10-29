import type { ReactNode } from 'react';
import { META, setMeta } from '../db/schema';
import { useMeta } from '../hooks';
import { zh } from '../copy/zh';
import { IconCheck, IconClose } from './Icons';
import { PrimaryButton } from './ui';

export function DisclaimerScreen({ onAccept }: { onAccept: () => void }) {
  const d = zh.disclaimer;
  return (
    <div className="zone-quiet min-h-dvh">
      <main className="mx-auto flex min-h-dvh max-w-[480px] flex-col px-gutter pt-12 pb-8">
        <h1 className="text-[28px] leading-tight font-black">{d.title}</h1>
        <p className="mt-3 text-[16px]">{d.intro}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {d.can.map((t) => (
            <li key={t} className="flex gap-3"><IconCheck className="mt-0.5 shrink-0 text-ideal-ink" /><span>{t}</span></li>
          ))}
          {d.cannot.map((t) => (
            <li key={t} className="flex gap-3"><IconClose className="mt-0.5 shrink-0 text-alert" /><span className="font-extrabold">{t}</span></li>
          ))}
        </ul>
        <p className="mt-6 rounded-card border-[1.5px] border-quiet-line bg-quiet-surface p-4 font-extrabold">{d.emergency}</p>
        <p className="mt-4 text-[13px] font-semibold text-ink-2">{d.privacy}</p>
        <div className="flex-1" />
        <PrimaryButton className="mt-8" onClick={onAccept}>
          {d.accept}
        </PrimaryButton>
      </main>
    </div>
  );
}

/** Shows the first-run disclaimer until the owner taps "我知道了" (F0.1). */
export function DisclaimerGate({ children }: { children: ReactNode }) {
  const ack = useMeta<string>(META.disclaimerAck);
  if (!ack.loaded) return null;
  if (!ack.value) return <DisclaimerScreen onAccept={() => setMeta(META.disclaimerAck, new Date().toISOString())} />;
  return <>{children}</>;
}
