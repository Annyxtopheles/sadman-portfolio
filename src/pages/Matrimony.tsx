import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Phone, Mail, MessageCircle, Send, Instagram, Linkedin, Github, Globe, MapPin, ArrowRight, RotateCcw } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { Footer } from '@/components/Footer';
import { MorphingText } from '@/components/MorphingText';
import { GalleryCarousel } from '@/components/matrimony/GalleryCarousel';
import { FaqAccordion, normalizeFaq } from '@/components/matrimony/FaqAccordion';
import { useAudio } from '@/context/AudioContext';
import QRCode from 'qrcode';
import { normalizeFocal } from '@/lib/focal';
import {
  fetchProfile,
  type MatrimonyPayload,
  type MatrimonyPhoto,
  type MatrimonySkill,
  type MatrimonyQuizQuestion,
  type MatrimonyFamilyNode,
  type MatrimonyAmbient,
} from '@/lib/matrimony';

const Section: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({
  title,
  children,
  className = '',
}) => (
  <section className={`mt-20 md:mt-28 ${className}`}>
    {title && (
      <h2 className="font-scanport text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-8 lowercase">
        {title}
      </h2>
    )}
    {children}
  </section>
);

/** Category rows: filled dark chip label, then subtle editorial pills */
type ChipItem = { label: string; url?: string | null };
function normalizeChipCategories(data: unknown): Array<[string, ChipItem[]]> {
  if (!data || typeof data !== 'object') return [];
  const out: Array<[string, ChipItem[]]> = [];
  for (const [k, raw] of Object.entries(data as Record<string, unknown>)) {
    let items: ChipItem[] = [];
    if (Array.isArray(raw)) {
      items = raw
        .map((it) => {
          if (it && typeof it === 'object' && 'label' in (it as any)) {
            const o = it as any;
            const label = String(o.label ?? '').trim();
            if (!label) return null;
            const url = typeof o.url === 'string' && o.url.trim() ? o.url.trim() : null;
            return { label, url };
          }
          const s = String(it ?? '').trim();
          return s ? { label: s, url: null } : null;
        })
        .filter(Boolean) as ChipItem[];
    } else if (typeof raw === 'string') {
      items = raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((label) => ({ label, url: null }));
    }
    if (k.trim()) out.push([k, items]);
  }
  return out;
}

const CategoryChipRows: React.FC<{ data: unknown }> = ({ data }) => {
  const rows = normalizeChipCategories(data);
  if (!rows.length) return null;
  return (
    <ul className="flex flex-col gap-4">
      {rows.map(([cat, items]) => (
        <li key={cat} className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center px-4 py-1.5 bg-foreground text-background text-xs font-medium rounded-full shadow-sm">
            {cat}
          </span>
          {items.map((it, i) => {
            const cls =
              'inline-flex items-center px-4 py-1.5 bg-foreground/5 text-foreground text-xs font-normal rounded-full transition-colors hover:bg-foreground hover:text-background';
            return it.url ? (
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className={cls}>
                <span>{it.label}</span>
                <span className="ml-1 opacity-60">↗</span>
              </a>
            ) : (
              <span key={i} className={cls}>
                {it.label}
              </span>
            );
          })}
        </li>
      ))}
    </ul>
  );
};

/* -------------------- Contact icons -------------------- */
type ContactItem = { value: string; icon?: string; iconUrl?: string | null; label?: string };

const LUCIDE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  mail: Mail,
  'message-circle': MessageCircle,
  send: Send,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  globe: Globe,
  'map-pin': MapPin,
};

function guessIcon(key: string): string {
  const k = key.toLowerCase();
  if (/(phone|cell|mobile|tel)/.test(k)) return 'phone';
  if (/(mail|email)/.test(k)) return 'mail';
  if (/whatsapp/.test(k)) return 'message-circle';
  if (/telegram/.test(k)) return 'send';
  if (/insta/.test(k)) return 'instagram';
  if (/linkedin/.test(k)) return 'linkedin';
  if (/github/.test(k)) return 'github';
  if (/(address|location|map)/.test(k)) return 'map-pin';
  return 'globe';
}

function normalizeContact(contact: Record<string, any>): ContactItem[] {
  if (!contact) return [];
  if (Array.isArray(contact.items)) {
    return contact.items.filter((i: any) => i && typeof i.value === 'string' && i.value.trim()) as ContactItem[];
  }
  return Object.entries(contact)
    .filter(([, v]) => v !== null && v !== '' && v !== undefined)
    .map(([k, v]) => ({ value: String(v), icon: guessIcon(k), label: k }));
}

function hrefFor(item: ContactItem): string | null {
  const v = item.value.trim();
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  if (item.icon === 'phone') return `tel:${v.replace(/[^\d+]/g, '')}`;
  if (item.icon === 'mail' || v.includes('@')) return `mailto:${v}`;
  return null;
}

function fallbackLabelFor(item: ContactItem): string {
  const v = item.value.trim();
  switch (item.icon) {
    case 'phone': return v;
    case 'mail': return v.replace(/^mailto:/i, '');
    case 'message-circle': return 'WhatsApp';
    case 'send': return 'Telegram';
    case 'instagram': return v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '@').replace(/\/$/, '');
    case 'linkedin': return 'LinkedIn';
    case 'github': return v.replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/\/$/, '');
    case 'map-pin': return v;
    default:
      try { return new URL(v).hostname.replace(/^www\./, ''); } catch { return v; }
  }
}

const ContactList: React.FC<{ contact: Record<string, any> }> = ({ contact }) => {
  const items = normalizeContact(contact);
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {items.map((it, i) => {
        const href = hrefFor(it);
        const label = it.label && it.label.trim() ? it.label : fallbackLabelFor(it);
        const Icon = it.icon ? LUCIDE_ICONS[it.icon] ?? Globe : Globe;
        const inner = it.iconUrl
          ? <img src={it.iconUrl} alt="" className="w-4 h-4 object-contain" />
          : <Icon className="w-4 h-4" />;
        const content = (
          <span className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm font-medium">
            <span className="opacity-70">{inner}</span>
            <span>{label}</span>
            {href && <span className="opacity-40 text-xs ml-0.5">↗</span>}
          </span>
        );
        return (
          <li key={i}>
            {href ? (
              <a href={href} target={/^https?:/i.test(href) ? '_blank' : undefined} rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* -------------------- Lightbox -------------------- */
const Lightbox: React.FC<{
  photos: MatrimonyPhoto[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}> = ({ photos, index, onClose, onIndex }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, photos.length, onClose, onIndex]);

  const p = photos[index];
  if (!p) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-6 right-6 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground hover:text-background transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="absolute top-6 left-6 z-10 text-xs uppercase tracking-wider opacity-60">
        {index + 1} / {photos.length} {p.category ? `· ${p.category}` : ''}
      </div>
      <div className="relative max-h-[85vh] max-w-4xl w-full flex items-center justify-center pointer-events-none">
        {p.url && (
          <img
            src={p.url}
            alt={p.caption ?? ''}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl pointer-events-auto border border-foreground/10"
          />
        )}
      </div>
      <div className="absolute bottom-6 left-0 right-0 px-6 md:px-12 flex justify-between items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + photos.length) % photos.length); }}
          className="px-4 py-2 rounded-full bg-foreground/10 hover:bg-foreground hover:text-background text-xs font-medium uppercase tracking-wider transition-colors"
          aria-label="Previous photo"
        >
          ← Prev
        </button>
        <div className="text-xs uppercase tracking-wider opacity-75 text-center truncate max-w-md">
          {p.caption ?? ''}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % photos.length); }}
          className="px-4 py-2 rounded-full bg-foreground/10 hover:bg-foreground hover:text-background text-xs font-medium uppercase tracking-wider transition-colors"
          aria-label="Next photo"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

/* -------------------- Skills / languages as interest chips -------------------- */
const SKILL_GROUP_LABELS: Record<string, string> = {
  language: 'Languages',
  skill: 'Skills',
  certification: 'Certifications',
  testimonial_link: 'References',
};

function skillsToChipCategories(skills: MatrimonySkill[]): Record<string, ChipItem[]> {
  const out: Record<string, ChipItem[]> = {};
  for (const s of skills) {
    const cat = SKILL_GROUP_LABELS[s.kind] ?? 'Skills';
    (out[cat] ??= []).push({ label: s.label, url: s.url ?? null });
  }
  return out;
}

/* -------------------- Quiz -------------------- */
const QuizBlock: React.FC<{ quiz: MatrimonyQuizQuestion[] }> = ({ quiz }) => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const done = started && step >= quiz.length;

  const axes = useMemo(() => {
    const map: Record<string, { visitorSum: number; visitorCount: number; ownerSum: number; ownerCount: number }> = {};
    for (const q of quiz) {
      const a = (map[q.axis] ??= { visitorSum: 0, visitorCount: 0, ownerSum: 0, ownerCount: 0 });
      const v = answers[q.id];
      if (typeof v === 'number') { a.visitorSum += v * q.weight; a.visitorCount += q.weight; }
      if (typeof q.owner_ideal_score === 'number') { a.ownerSum += q.owner_ideal_score * q.weight; a.ownerCount += q.weight; }
    }
    return Object.entries(map).map(([axis, v]) => ({
      axis,
      visitor: v.visitorCount ? v.visitorSum / v.visitorCount : 0,
      owner: v.ownerCount ? v.ownerSum / v.ownerCount : 0,
    }));
  }, [quiz, answers]);

  if (!quiz.length) return null;

  const scale = Math.max(3, ...axes.flatMap((a) => [a.visitor, a.owner]));

  if (!started) {
    return (
      <Section title="alignment & values quiz">
        <div className="p-8 rounded-lg bg-foreground/[0.03] border border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-base sm:text-lg opacity-85 leading-relaxed">
              Explore how our perspectives, communication styles, and values align across {quiz.length} questions.
            </p>
            <p className="text-xs opacity-50 mt-1">Anonymous · No personal data is stored.</p>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="bg-foreground text-background px-6 py-3 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-foreground/80 transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <span>Start quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Section>
    );
  }

  if (done) {
    return (
      <Section title="quiz results">
        <div className="p-6 md:p-8 rounded-lg bg-foreground/[0.03] border border-foreground/10 space-y-8">
          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-wider opacity-70 pb-4 border-b border-foreground/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-foreground/40" />
              <span>Your answers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-foreground" />
              <span>My perspective</span>
            </div>
          </div>

          <div className="space-y-6">
            {axes.map((a) => {
              const delta = a.visitor - a.owner;
              const deltaLabel = Math.abs(delta) < 0.05 ? 'Match ✦' : `${delta > 0 ? '+' : ''}${delta.toFixed(1)}`;
              const visitorPct = Math.min(100, (a.visitor / scale) * 100);
              const ownerPct = Math.min(100, (a.owner / scale) * 100);
              return (
                <div key={a.axis} className="space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-medium uppercase tracking-wider text-foreground">{a.axis}</span>
                    <span className="opacity-70 font-mono">{deltaLabel}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-[48px_1fr_48px] items-center gap-3 text-xs opacity-75">
                      <span>You</span>
                      <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                        <div className="h-full bg-foreground/50 rounded-full" style={{ width: `${visitorPct}%` }} />
                      </div>
                      <span className="font-mono text-right">{a.visitor.toFixed(1)}</span>
                    </div>
                    <div className="grid grid-cols-[48px_1fr_48px] items-center gap-3 text-xs opacity-75">
                      <span>Me</span>
                      <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                        <div className="h-full bg-foreground rounded-full" style={{ width: `${ownerPct}%` }} />
                      </div>
                      <span className="font-mono text-right">{a.owner.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => { setStarted(false); setStep(0); setAnswers({}); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/10 hover:bg-foreground hover:text-background text-xs font-medium uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </Section>
    );
  }

  const q = quiz[step];
  return (
    <Section title={`question ${step + 1} of ${quiz.length}`}>
      <div className="p-6 md:p-8 rounded-lg bg-foreground/[0.03] border border-foreground/10 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest opacity-50">{q.axis}</span>
          <h3 className="text-xl sm:text-2xl font-medium mt-1 text-foreground">{q.prompt}</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setAnswers((prev) => ({ ...prev, [q.id]: opt.score }));
                setStep((s) => s + 1);
              }}
              className="text-left p-4 rounded-lg bg-foreground/5 hover:bg-foreground hover:text-background transition-colors text-sm font-medium"
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
          <div className="h-full bg-foreground transition-all duration-300" style={{ width: `${((step + 1) / quiz.length) * 100}%` }} />
        </div>
      </div>
    </Section>
  );
};

/* -------------------- Family tree -------------------- */
const QRSvg: React.FC<{ value: string; size?: number }> = ({ value, size = 88 }) => {
  const [svg, setSvg] = useState<string>('');
  useEffect(() => {
    let cancelled = false;
    QRCode.toString(value, { type: 'svg', margin: 1, width: size, color: { dark: '#000000ff', light: '#00000000' } })
      .then((s) => { if (!cancelled) setSvg(s); })
      .catch(() => { if (!cancelled) setSvg(''); });
    return () => { cancelled = true; };
  }, [value, size]);
  if (!svg) return <div style={{ width: size, height: size }} className="border border-foreground/20 rounded-lg opacity-40" aria-hidden />;
  return (
    <div
      aria-label={`QR code for ${value}`}
      style={{ width: size, height: size }}
      className="p-1 rounded-lg bg-background border border-foreground/20 [&_svg]:w-full [&_svg]:h-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

const Avatar: React.FC<{ url: string | null; name: string; size: number }> = ({ url, name, size }) => {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  return (
    <div
      className="rounded-full border border-foreground/20 overflow-hidden flex items-center justify-center bg-foreground/5 shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {url ? (
        <img src={url} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="opacity-60 font-medium" style={{ fontSize: size * 0.4 }}>{initial}</span>
      )}
    </div>
  );
};

const SLOT_W = 112;
const SLOT_H = 104;
const ORB = 56;

const FamilyOrb = React.forwardRef<HTMLDivElement, {
  n: MatrimonyFamilyNode;
  highlight?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}>(({ n, highlight, onClick, style }, ref) => {
  const initial = (n.name || n.relation || '?').trim().charAt(0).toUpperCase();
  return (
    <div ref={ref} className="relative shrink-0 group hover:z-30 focus-within:z-30" style={{ width: SLOT_W, height: SLOT_H, ...style }}>
      <button
        type="button"
        onClick={onClick}
        aria-label={`${n.name || n.relation} — view details`}
        className="absolute left-1/2 top-0 -translate-x-1/2 z-10 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-full"
      >
        <span
          className={`rounded-full overflow-hidden flex items-center justify-center bg-foreground/10 text-foreground border transition-transform duration-300 ease-out group-hover:scale-[1.3] group-focus-within:scale-[1.3] ${
            highlight ? 'border-foreground ring-2 ring-foreground/40 shadow-lg' : 'border-foreground/20'
          }`}
          style={{ width: ORB, height: ORB }}
        >
          {n.photoUrl ? (
            <img src={n.photoUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300" />
          ) : (
            <span style={{ fontSize: ORB * 0.4 }} className="opacity-70 font-medium">{initial}</span>
          )}
        </span>
        <span className="mt-3 flex flex-col items-center whitespace-nowrap opacity-0 translate-y-1 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100">
          <span className="text-[10px] uppercase tracking-wider opacity-60">{highlight ? 'Me' : n.relation}</span>
          <span className="text-xs leading-tight font-medium mt-0.5">{n.name || '—'}</span>
        </span>
      </button>
    </div>
  );
});
FamilyOrb.displayName = 'FamilyOrb';

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] uppercase tracking-wider opacity-50">{label}</span>
    <span className="text-sm leading-snug">{value}</span>
  </div>
);

const FamilyDetailModal: React.FC<{
  nodes: MatrimonyFamilyNode[];
  index: number;
  onClose: () => void;
}> = ({ nodes, index, onClose }) => {
  const n = nodes[index];
  useEffect(() => {
    if (!n) { onClose(); return; }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [n, onClose]);

  if (!n) return null;
  const links = n.contact_info ?? [];
  const hasDetails = !!(n.bio || n.birth_place || n.birth_year || n.education || n.occupation_detail || links.length || n.achievements.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${n.name || n.relation} — details`}
    >
      <div
        className="relative bg-background text-foreground border border-foreground/15 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col md:flex-row gap-6 p-8">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <Avatar url={n.photoUrl ?? null} name={n.name} size={110} />
            {n.is_self && (
              <span className="text-[10px] uppercase tracking-wider opacity-70 bg-foreground/10 rounded-full px-3 py-1 font-medium">
                This is me
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="text-xs uppercase tracking-wider opacity-50">{n.relation}</div>
            <h3 className="font-scanport text-2xl font-medium leading-tight mt-1">{n.name || '—'}</h3>
            {n.profession && <div className="text-sm opacity-75 mt-1">{n.profession}</div>}
            {n.location_label && (
              <div className="text-xs opacity-50 mt-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {n.location_label}
              </div>
            )}

            {hasDetails && (
              <div className="mt-6 flex flex-col gap-4">
                {n.bio && <p className="text-sm leading-relaxed whitespace-pre-wrap">{n.bio}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  {n.birth_place && <DetailItem label="Birth place" value={n.birth_place} />}
                  {n.birth_year && <DetailItem label="Birth year" value={String(n.birth_year)} />}
                  {n.education && <DetailItem label="Education" value={n.education} />}
                  {n.occupation_detail && <DetailItem label="Occupation" value={n.occupation_detail} />}
                  {n.note && <DetailItem label="Note" value={n.note} />}
                </div>
                {links.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="text-xs uppercase tracking-wider opacity-50">Contact</div>
                    {links.map((link, i) => (
                      <div key={i} className="text-sm flex items-center gap-2">
                        <span className="text-xs opacity-50 w-16 shrink-0">{link.label}</span>
                        {link.url ? (
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">
                            {link.value}
                          </a>
                        ) : (
                          <span>{link.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {n.achievements.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="text-xs uppercase tracking-wider opacity-50">Achievements</div>
                    {n.achievements.map((a) => (
                      <div key={a.id} className="flex items-center gap-3">
                        {a.url ? (
                          <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-sm underline hover:opacity-70 transition-opacity flex-1">
                            {a.title}
                          </a>
                        ) : (
                          <span className="text-sm flex-1">{a.title}</span>
                        )}
                        {a.url && <QRSvg value={a.url} size={48} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!hasDetails && n.note && <p className="text-sm leading-relaxed opacity-75 mt-4">{n.note}</p>}
            {!hasDetails && !n.note && <p className="text-sm opacity-50 mt-4">No additional details.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const MEMBER_GAP = 56;
const SIB_GAP = 44;
const LEVEL_H = 150;
const TREE_PAD = 48;

const FamilyTree: React.FC<{ nodes: MatrimonyFamilyNode[] }> = ({ nodes }) => {
  const [detailIndex, setDetailIndex] = useState<number | null>(null);

  const layout = useMemo(() => {
    if (!nodes.length) return null;
    const byId = new Map(nodes.map((n) => [n.id, n]));

    const units: Array<{ parents: string[]; children: string[] }> = [];
    const unitMap = new Map<string, { parents: string[]; children: string[] }>();
    for (const n of nodes) {
      if (!n.father_id && !n.mother_id) continue;
      const key = `${n.father_id ?? '-'}|${n.mother_id ?? '-'}`;
      let u = unitMap.get(key);
      if (!u) {
        u = { parents: [n.father_id, n.mother_id].filter((p): p is string => !!p && byId.has(p)), children: [] };
        if (!u.parents.length) continue;
        unitMap.set(key, u);
        units.push(u);
      }
      u.children.push(n.id);
    }

    const blocks: string[][] = [];
    const blockOf = new Map<string, number>();
    const addBlock = (members: string[]) => {
      const idx = blocks.length;
      blocks.push(members);
      members.forEach((m) => blockOf.set(m, idx));
      return idx;
    };
    for (const u of units) {
      if (u.parents.some((p) => blockOf.has(p))) continue;
      addBlock([...u.parents]);
    }
    for (const n of nodes) if (!blockOf.has(n.id)) addBlock([n.id]);

    const claimed = new Set<number>();
    const kidsOf = new Map<number, number[]>();
    for (const u of units) {
      const pb = blockOf.get(u.parents[0]);
      if (pb === undefined) continue;
      const list = kidsOf.get(pb) ?? [];
      for (const c of u.children) {
        const cb = blockOf.get(c);
        if (cb === undefined || cb === pb || claimed.has(cb)) continue;
        claimed.add(cb);
        list.push(cb);
      }
      kidsOf.set(pb, list);
    }

    const blockWidth = (i: number) => blocks[i].length * ORB + (blocks[i].length - 1) * MEMBER_GAP;
    const sortKey = (i: number) => Math.min(...blocks[i].map((id) => byId.get(id)?.sort_order ?? 0));
    for (const [k, v] of kidsOf) kidsOf.set(k, v.sort((a, b) => sortKey(a) - sortKey(b)));

    const spanW = new Map<number, number>();
    const calc = (i: number): number => {
      if (spanW.has(i)) return spanW.get(i)!;
      spanW.set(i, blockWidth(i));
      const kids = kidsOf.get(i) ?? [];
      const kidsW = kids.reduce((acc, k, idx) => acc + calc(k) + (idx ? SIB_GAP : 0), 0);
      const w = Math.max(blockWidth(i), kidsW);
      spanW.set(i, w);
      return w;
    };

    const roots = blocks.map((_, i) => i).filter((i) => !claimed.has(i));
    roots.sort((a, b) => sortKey(a) - sortKey(b));
    roots.forEach(calc);

    const pos = new Map<string, { x: number; y: number }>();
    const place = (i: number, left: number, depth: number) => {
      const kids = kidsOf.get(i) ?? [];
      const w = spanW.get(i) ?? blockWidth(i);
      const bw = blockWidth(i);
      let blockLeft = left + (w - bw) / 2;
      if (kids.length) {
        const kidsW = kids.reduce((acc, k, idx) => acc + (spanW.get(k) ?? 0) + (idx ? SIB_GAP : 0), 0);
        let cursor = left + (w - kidsW) / 2;
        const centers: number[] = [];
        for (const k of kids) {
          const kw = spanW.get(k) ?? 0;
          place(k, cursor, depth + 1);
          centers.push(cursor + kw / 2);
          cursor += kw + SIB_GAP;
        }
        const span = (Math.min(...centers) + Math.max(...centers)) / 2;
        blockLeft = span - bw / 2;
        blockLeft = Math.max(left, Math.min(blockLeft, left + w - bw));
      }
      blocks[i].forEach((id, mi) => {
        pos.set(id, { x: blockLeft + mi * (ORB + MEMBER_GAP) + ORB / 2, y: depth * LEVEL_H + ORB / 2 });
      });
    };

    let cursor = TREE_PAD;
    for (const r of roots) {
      place(r, cursor, 0);
      cursor += (spanW.get(r) ?? 0) + SIB_GAP * 2;
    }

    const childBlocksWithParents = new Set<number>();
    for (const u of units) {
      if (!u.children.length) continue;
      const cb = blockOf.get(u.children[0]);
      if (cb !== undefined) childBlocksWithParents.add(cb);
    }

    for (const cb of childBlocksWithParents) {
      const childBlock = blocks[cb];
      const parentUnits = units.filter((ou) => ou.children.some((c) => blockOf.get(c) === cb));

      if (parentUnits.length > 1) {
        const cbXs = childBlock.map((id) => pos.get(id)?.x ?? 0);
        const cbCenter = (Math.min(...cbXs) + Math.max(...cbXs)) / 2;

        parentUnits.sort((a, b) => {
          const ax = pos.get(a.children[0])?.x ?? 0;
          const bx = pos.get(b.children[0])?.x ?? 0;
          return ax - bx;
        });

        let totalWidth = 0;
        parentUnits.forEach((u, i) => {
          const pb = blockOf.get(u.parents[0]);
          if (pb === undefined) return;
          totalWidth += blockWidth(pb) + (i > 0 ? SIB_GAP * 2 : 0);
        });

        let currentX = cbCenter - totalWidth / 2;
        parentUnits.forEach((u) => {
          const pb = blockOf.get(u.parents[0]);
          if (pb === undefined) return;
          const bw = blockWidth(pb);
          const pbLeft = currentX;
          const childY = pos.get(u.children[0])?.y ?? LEVEL_H;
          blocks[pb].forEach((id, mi) => {
            pos.set(id, { x: pbLeft + mi * (ORB + MEMBER_GAP) + ORB / 2, y: childY - LEVEL_H });
          });
          currentX += bw + SIB_GAP * 2;
        });
      }
    }

    const xs = Array.from(pos.values());
    if (!xs.length) return null;
    const minX = Math.min(...xs.map((p) => p.x));
    const shiftX = (TREE_PAD + ORB / 2) - minX;
    if (Math.abs(shiftX) > 0.5) {
      for (const [id, p] of pos) pos.set(id, { x: p.x + shiftX, y: p.y });
    }
    const width = Math.max(...Array.from(pos.values()).map((p) => p.x)) + ORB / 2 + TREE_PAD;
    const height = Math.max(...xs.map((p) => p.y)) + ORB / 2 + 70;

    const snap = (v: number) => Math.round(v) + 0.5;
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    for (const b of blocks) {
      for (let i = 1; i < b.length; i++) {
        const a = pos.get(b[i - 1]);
        const c = pos.get(b[i]);
        if (a && c) lines.push({ x1: snap(a.x + ORB / 2), y1: snap(a.y), x2: snap(c.x - ORB / 2), y2: snap(c.y) });
      }
    }
    for (const u of units) {
      const pr = u.parents.map((p) => pos.get(p)).filter(Boolean) as { x: number; y: number }[];
      const cr = u.children.map((c) => pos.get(c)).filter(Boolean) as { x: number; y: number }[];
      if (!pr.length || !cr.length) continue;
      const dropX = snap((Math.min(...pr.map((p) => p.x)) + Math.max(...pr.map((p) => p.x))) / 2);
      const parentBottom = Math.max(...pr.map((p) => p.y)) + ORB / 2;
      const childTop = Math.min(...cr.map((p) => p.y)) - ORB / 2;
      if (childTop <= parentBottom) continue;
      const midY = snap((parentBottom + childTop) / 2);
      const startY = snap(pr.length > 1 ? pr[0].y : parentBottom);
      lines.push({ x1: dropX, y1: startY, x2: dropX, y2: midY });
      const cxs = cr.map((r) => snap(r.x));
      const minX = Math.min(dropX, ...cxs);
      const maxX = Math.max(dropX, ...cxs);
      if (maxX - minX > 1) lines.push({ x1: minX, y1: midY, x2: maxX, y2: midY });
      for (const x of cxs) lines.push({ x1: x, y1: midY, x2: x, y2: snap(childTop) });
    }

    return { pos, width, height, lines };
  }, [nodes]);

  const openDetail = (nodeId: string) => {
    const idx = nodes.findIndex((n) => n.id === nodeId);
    if (idx >= 0) setDetailIndex(idx);
  };

  if (!nodes.length || !layout) return null;

  return (
    <Section title="family & lineage">
      <div className="overflow-x-auto no-scrollbar py-6">
        <div
          className="relative"
          style={{
            width: layout.width,
            height: layout.height,
            marginLeft: `max(0px, calc(50% - ${layout.width / 2}px))`,
          }}
        >
          <svg className="absolute left-0 top-0 pointer-events-none" width={layout.width} height={layout.height} style={{ zIndex: 0 }} aria-hidden>
            {layout.lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1} shapeRendering="crispEdges" />
            ))}
          </svg>

          {nodes.map((n) => {
            const p = layout.pos.get(n.id);
            if (!p) return null;
            return (
              <FamilyOrb
                key={n.id}
                n={n}
                highlight={n.is_self}
                onClick={() => openDetail(n.id)}
                style={{ position: 'absolute', left: p.x - SLOT_W / 2, top: p.y - ORB / 2 }}
              />
            );
          })}
        </div>
      </div>

      {detailIndex !== null && (
        <FamilyDetailModal nodes={nodes} index={detailIndex} onClose={() => setDetailIndex(null)} />
      )}
    </Section>
  );
};

/* -------------------- Ambient music player -------------------- */
function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0] || null;
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const i = parts.indexOf('embed');
      if (i >= 0 && parts[i + 1]) return parts[i + 1];
    }
    return null;
  } catch { return null; }
}

function useAmbient(ambient: MatrimonyAmbient) {
  const { setHasAudio, muted, setMuted } = useAudio();
  const enabled = !!ambient?.enabled && !!ambient?.url;
  const volume = typeof ambient?.volume === 'number' ? ambient.volume : 0.25;
  const loop = ambient?.loop !== false;
  const ytId = ambient?.url ? youtubeId(ambient.url) : null;
  const isYouTube = !!ytId;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHasAudio(enabled);
    return () => setHasAudio(false);
  }, [enabled, setHasAudio]);

  useEffect(() => {
    if (!enabled || isYouTube) return;
    const a = audioRef.current; if (!a) return;
    a.volume = Math.max(0, Math.min(1, volume));
    a.muted = true;
    a.play().catch(() => {});
  }, [enabled, isYouTube, volume]);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    a.muted = muted;
    if (!muted) a.play().catch(() => setMuted(true));
  }, [muted, setMuted]);

  useEffect(() => {
    if (!enabled) return;
    const unmute = () => {
      setMuted(false);
      window.removeEventListener('pointerdown', unmute);
      window.removeEventListener('keydown', unmute);
    };
    window.addEventListener('pointerdown', unmute, { once: true });
    window.addEventListener('keydown', unmute, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unmute);
      window.removeEventListener('keydown', unmute);
    };
  }, [enabled, setMuted]);

  const element = enabled ? (
    <>
      {!isYouTube && (
        <audio ref={audioRef} src={ambient.url as string} loop={loop} autoPlay muted preload="auto" />
      )}
      {isYouTube && (
        <iframe
          key={muted ? 'muted' : 'audible'}
          title="Ambient audio"
          src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&controls=0&loop=${loop ? 1 : 0}&playlist=${ytId}&mute=${muted ? 1 : 0}&modestbranding=1&rel=0`}
          allow="autoplay"
          className="fixed w-px h-px opacity-0 pointer-events-none -z-10 left-0 top-0"
          aria-hidden
        />
      )}
    </>
  ) : null;

  return { element };
}

/* -------------------- Profile view -------------------- */
const ProfileView: React.FC<{ data: MatrimonyPayload }> = ({ data }) => {
  const { profile, photos, skills, quiz, familyNodes } = data;
  const [lightbox, setLightbox] = useState<{ photos: MatrimonyPhoto[]; index: number } | null>(null);
  const ambient = useAmbient(profile.ambient ?? {});

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SEOHead
        title="Sadman Zaman Khan — Matrimonial Profile"
        description="Personal matrimonial profile of Sadman Zaman Khan — background, values, family, and interests."
        url="/matrimony"
      />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-36 md:pt-44 lg:pt-52 pb-24 flex-1 w-full">
        {/* ---- HERO ---- */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="font-scanport text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-2">
            <MorphingText
              texts={["Sadman Zaman Khan", "সাদমান জামান খান"]}
              align="left"
              className="text-left"
            />
          </h1>
          <p className="text-lg md:text-xl opacity-75 font-normal">
            UI/UX Designer <span className="opacity-40">/</span> Writer <span className="opacity-40">/</span> Creative Technology
          </p>
          {profile.bio && (
            <div className="whitespace-pre-wrap leading-relaxed text-base sm:text-lg opacity-85 mt-4">
              {profile.bio}
            </div>
          )}
        </div>

        {/* ---- Interests & Pursuits ---- */}
        {(() => {
          const merged = {
            ...(normalizeChipCategories(profile.interests).reduce<Record<string, ChipItem[]>>((acc, [k, v]) => { acc[k] = v; return acc; }, {})),
            ...skillsToChipCategories(skills),
          };
          if (!Object.keys(merged).length) return null;
          return (
            <Section title="interests & pursuits">
              <CategoryChipRows data={merged} />
            </Section>
          );
        })()}

        {/* ---- Goals ---- */}
        {normalizeChipCategories((profile as any).goals).length > 0 && (
          <Section title="aspirations & goals">
            <CategoryChipRows data={(profile as any).goals} />
          </Section>
        )}

        {/* ---- Gallery ---- */}
        {photos.length > 0 && (
          <Section title="visual journal">
            <GalleryCarousel
              photos={photos as any}
              focalOf={(p: any) => normalizeFocal(p.focal_position)}
              onOpen={(i) => setLightbox({ photos, index: i })}
            />
          </Section>
        )}

        {/* ---- Family Tree ---- */}
        <FamilyTree nodes={familyNodes ?? []} />

        {/* ---- FAQ / Perspective ---- */}
        {normalizeFaq((profile as any).faq).length > 0 && (
          <Section title="perspective & questions">
            <FaqAccordion items={normalizeFaq((profile as any).faq)} />
          </Section>
        )}

        {/* ---- Alignment Quiz ---- */}
        <QuizBlock quiz={quiz} />

        {/* ---- Contact & Resume ---- */}
        <Section title="reach out">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-lg bg-foreground/[0.03] border border-foreground/10">
            <ContactList contact={profile.contact ?? {}} />
            {profile.pdfUrl && (
              <a
                href={profile.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background px-6 py-3 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-foreground/80 transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                <span>Download Resume (pdf)</span>
                <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
        </Section>
      </main>

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndex={(i) => setLightbox({ ...lightbox, index: i })}
        />
      )}

      {ambient.element}
      <Footer />
    </div>
  );
};

const Matrimony: React.FC = () => {
  const [data, setData] = useState<MatrimonyPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancel = false;
    fetchProfile().then((res) => {
      if (cancel) return;
      setData(res);
      setLoading(false);
    });
    return () => { cancel = true; };
  }, []);

  return (
    <>
      <SEOHead
        title="Sadman Zaman Khan — Matrimonial Profile"
        description="Personal matrimonial profile of Sadman Zaman Khan — background, values, family, and interests."
        url="/matrimony"
      />

      {loading && (
        <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
          <div className="flex-1 flex items-center justify-center pt-36">
            <div className="text-xs uppercase tracking-widest opacity-60">Loading profile…</div>
          </div>
          <Footer />
        </div>
      )}

      {!loading && data && <ProfileView data={data} />}

      {!loading && !data && (
        <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center pt-36">
            <div className="text-xs uppercase tracking-widest opacity-60">This profile is not available</div>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-medium uppercase tracking-wider hover:bg-foreground/80 transition-colors"
            >
              Return Home
            </Link>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Matrimony;