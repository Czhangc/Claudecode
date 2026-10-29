import { Fragment, type ReactNode } from 'react';

// Minimal renderer for our own card bodies: paragraphs, - and 1. lists, **bold**.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <div className="md">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*-\s+/.test(l))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*-\s+/, ''))}</li>)}</ul>;
        }
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*\d+\.\s+/, ''))}</li>)}</ol>;
        }
        return <p key={i}>{inline(lines.join(''))}</p>;
      })}
    </div>
  );
}
