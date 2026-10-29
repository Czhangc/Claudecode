import { useId, useState } from 'react';
import type { CalcStep } from '../lib/types';
import { zh } from '../copy/zh';
import { IconDown } from './Icons';
import { SourceList } from './Sources';

const show = (n: number, unit: string) => (unit === 'kg' ? n.toFixed(2) : n.toFixed(1));

export function HowCalculated({ steps }: { steps: CalcStep[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="press flex min-h-btn w-full items-center justify-between rounded-full border-[1.5px] border-ink pr-2 pl-6 font-extrabold"
      >
        <span>{open ? zh.howCalculated.hide : zh.howCalculated.toggle}</span>
        <span
          className={`inline-flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 ease-bounce ${open ? 'rotate-180' : ''}`}
        >
          <IconDown width={20} height={20} />
        </span>
      </button>
      {open && (
        <ol id={id} className="mt-3 flex flex-col gap-2">
          {steps.map((s, i) => (
            <li key={s.label} className="rounded-card bg-paper p-4 shadow-soft">
              <div className="flex items-baseline gap-2">
                <span className="font-num text-[14px] font-black text-ink-2">{i + 1}</span>
                <span className="text-[14px] font-extrabold">{s.label}</span>
              </div>
              <div className="mt-1 font-num text-[15px] font-extrabold">
                {s.formula} = {show(s.value, s.unit)} {s.unit}
              </div>
              <div className="mt-2">
                <SourceList sources={s.sourceIds} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
