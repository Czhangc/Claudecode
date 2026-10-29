import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrow, IconBack, IconClose } from './Icons';
import { zh } from '../copy/zh';

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { size?: 'md' | 'lg' };

export function PrimaryButton({ className = '', size = 'md', ...p }: BtnProps) {
  return (
    <button
      type="button"
      className={`press flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[16px] font-extrabold text-paper disabled:opacity-40 ${size === 'lg' ? 'min-h-btn-lg' : 'min-h-btn'} ${className}`}
      {...p}
    />
  );
}

export function SecondaryButton({ className = '', size = 'md', ...p }: BtnProps) {
  return (
    <button
      type="button"
      className={`press flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-ink bg-transparent px-6 text-[16px] font-extrabold text-ink disabled:opacity-40 ${size === 'lg' ? 'min-h-btn-lg' : 'min-h-btn'} ${className}`}
      {...p}
    />
  );
}

export function IconButton({
  label,
  variant = 'paper',
  children,
  className = '',
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; variant?: 'paper' | 'ink' }) {
  const look = variant === 'ink' ? 'bg-ink text-paper' : 'bg-paper text-ink border border-line';
  return (
    <button
      type="button"
      aria-label={label}
      className={`press inline-flex size-tap shrink-0 items-center justify-center rounded-full ${look} ${className}`}
      {...p}
    >
      {children}
    </button>
  );
}

export function PageHeader({
  title,
  close,
  right,
  backTo,
}: {
  title?: string;
  close?: boolean;
  right?: ReactNode;
  backTo?: string;
}) {
  const navigate = useNavigate();
  const go = () => (backTo ? navigate(backTo) : window.history.length > 1 ? navigate(-1) : navigate('/'));
  const btn = (
    <IconButton label={close ? zh.common.close : zh.common.back} onClick={go}>
      {close ? <IconClose /> : <IconBack />}
    </IconButton>
  );
  return (
    <header className="flex items-center gap-3 pt-4 pb-2">
      {!close && btn}
      <h1 className="min-w-0 flex-1 text-[22px] leading-tight font-black">{title}</h1>
      {right}
      {close && btn}
    </header>
  );
}

export function Page({ children, quiet = false }: { children: ReactNode; quiet?: boolean }) {
  return (
    <div className={`min-h-dvh ${quiet ? 'zone-quiet' : 'bg-cream'}`}>
      <main className="mx-auto max-w-[480px] px-gutter pb-28">{children}</main>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-card bg-paper p-5 shadow-soft ${className}`}>{children}</section>;
}

export function StatusTag({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-paper px-2.5 py-1 text-[12px] font-extrabold text-on-module">{children}</span>;
}

export function DraftBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-draft-line px-2 py-0.5 text-[11px] font-semibold text-ink-2">
      {zh.common.draft}
    </span>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mt-7 mb-3 text-[18px] font-black">{children}</h2>;
}

export function LinkRow({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="press flex min-h-tap items-center justify-between gap-3 rounded-full border-[1.5px] border-ink px-5 py-3 font-extrabold">
      <span>{children}</span>
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-ink text-paper"><IconArrow width={18} height={18} /></span>
    </Link>
  );
}

/** Pill-style choice used for one-tap options. */
export function Choice({
  selected,
  onClick,
  children,
  className = '',
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`press min-h-tap rounded-full border-[1.5px] px-4 py-2 text-[15px] font-extrabold ${selected ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink'} ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint, children, error }: { label: string; hint?: string; children: ReactNode; error?: string }) {
  return (
    <div className="mt-5">
      <div className="mb-2 text-[14px] font-extrabold">{label}</div>
      {hint && <div className="-mt-1 mb-2 text-[13px] font-semibold text-ink-2">{hint}</div>}
      {children}
      {error && (
        <div role="alert" className="mt-2 text-[13px] font-semibold text-alert">
          {error}
        </div>
      )}
    </div>
  );
}

export const inputClass =
  'w-full min-h-tap rounded-[16px] border-[1.5px] border-line bg-paper px-4 py-3 text-[16px] font-semibold text-ink outline-none focus:border-ink';

export function ResultDisclaimer() {
  return <p className="mt-8 text-center text-[12px] font-semibold text-ink-2">{zh.disclaimer.footer}</p>;
}
