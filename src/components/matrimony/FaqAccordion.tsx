import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type FaqItem = { question: string; answer: string };

export function normalizeFaq(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((it) => {
      if (!it || typeof it !== 'object') return null;
      const o = it as Record<string, unknown>;
      const question = String(o.question ?? '').trim();
      const answer = String(o.answer ?? '').trim();
      if (!question) return null;
      return { question, answer };
    })
    .filter(Boolean) as FaqItem[];
}

export const FaqAccordion: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(null);
  if (!items.length) return null;
  return (
    <ul className="border border-foreground/20 rounded-lg overflow-hidden">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className={i < items.length - 1 ? 'border-b border-foreground/20' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-4 py-4 px-4 md:px-5 text-left group"
            >

              <span className="text-[15px] leading-snug">{it.question}</span>
              <span className="shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pb-4 px-4 md:px-5 pr-8 text-[14px] leading-[1.7] opacity-75 whitespace-pre-wrap">{it.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
