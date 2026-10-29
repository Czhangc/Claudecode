import { IconPaw } from './Icons';

export function ProgressRing({ value, total, label }: { value: number; total: number; label: string }) {
  const r = 19;
  const c = 2 * Math.PI * r;
  return (
    <svg width={44} height={44} viewBox="0 0 44 44" role="img" aria-label={label}>
      <circle cx={22} cy={22} r={r} fill="none" strokeWidth={3} className="stroke-line" />
      <circle
        cx={22}
        cy={22}
        r={r}
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-ink transition-[stroke-dashoffset] duration-300"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / total)}
        transform="rotate(-90 22 22)"
      />
      <text x={22} y={26.5} textAnchor="middle" className="fill-ink font-num text-[12px] font-black">
        {value}/{total}
      </text>
    </svg>
  );
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export function WeekStrip({ days }: { days: { date: string; recorded: boolean; isToday: boolean }[] }) {
  return (
    <ol className="flex justify-between rounded-full bg-paper px-3 py-2">
      {days.map((d) => {
        const wd = WEEKDAYS[new Date(`${d.date}T12:00:00`).getDay()];
        const look = d.recorded
          ? 'bg-ink text-cream'
          : d.isToday
            ? 'bg-today text-white'
            : 'border-[1.5px] border-dashed border-line text-ink-2';
        return (
          <li key={d.date} className="flex flex-col items-center gap-0.5">
            <span
              className={`flex size-8 items-center justify-center rounded-full text-[12px] font-extrabold ${look}`}
              aria-label={`${d.date}${d.recorded ? ' 已记录' : ' 未记录'}${d.isToday ? '（今天）' : ''}`}
            >
              {d.recorded ? <IconPaw width={15} height={15} /> : wd}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
