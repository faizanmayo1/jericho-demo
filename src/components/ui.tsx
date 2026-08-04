import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Sparkles, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

// ---------------------------------------------------------------------------
// Surfaces. The two radii are load bearing: anything Almanac generated as a
// document is square and white, anything that is software is rounded and warm.
// ---------------------------------------------------------------------------

export function Panel({
  children,
  className,
  flush,
  tone = 'surface',
}: {
  children: ReactNode
  className?: string
  flush?: boolean
  tone?: 'surface' | 'quiet' | 'dusk' | 'ai'
}) {
  const tones = {
    surface: 'bg-surface border-line',
    quiet: 'bg-mist/70 border-line-strong/60',
    dusk: 'bg-dusk border-dusk-line text-dusk-faint dusk-ground',
    ai: 'bg-almanac-wash border-almanac-tint',
  }
  return (
    <div
      className={cn(
        'min-w-0 rounded-card border shadow-card',
        tones[tone],
        !flush && 'p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Paper. Square corners, pure white, a contact shadow so it reads as lying on
 *  the canvas, and the optional ruled margin that is this product's signature. */
export function Sheet({
  children,
  className,
  flush,
  ledger,
}: {
  children: ReactNode
  className?: string
  flush?: boolean
  ledger?: boolean
}) {
  return (
    <div
      className={cn(
        'min-w-0 rounded-sheet bg-sheet shadow-paper',
        ledger && 'ledger',
        !flush && 'p-6 sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** One row of a ruled page: the heading sits out in the margin, the content
 *  sits inside the rule. Collapses to a single column below large screens. */
export function LedgerRow({
  margin,
  children,
  className,
}: {
  margin: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('ledger-row', className)}>
      <div className="mb-2 min-w-0 lg:mb-0 lg:text-right">{margin}</div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export function PanelHead({
  eyebrow,
  title,
  sub,
  right,
  onDusk,
}: {
  eyebrow?: string
  title: string
  sub?: string
  right?: ReactNode
  onDusk?: boolean
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className={onDusk ? 'eyebrow-lit' : 'eyebrow'}>{eyebrow}</div>}
        <h3
          className={cn(
            'mt-2 font-display text-[17px] font-semibold leading-snug tracking-[-0.012em]',
            onDusk ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h3>
        {sub && (
          <p
            className={cn(
              'mt-1.5 max-w-2xl text-[12.5px] leading-relaxed',
              onDusk ? 'text-dusk-faint' : 'text-ink-soft',
            )}
          >
            {sub}
          </p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  sub,
  right,
}: {
  eyebrow?: string
  title: string
  sub?: string
  right?: ReactNode
}) {
  return (
    <div className="rule-under mb-7 flex flex-wrap items-end justify-between gap-5">
      <div className="min-w-0 max-w-3xl">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="mt-3 text-title font-normal text-ink">{title}</h2>
        {sub && <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">{sub}</p>}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Chips and marks
// ---------------------------------------------------------------------------

export type TagTone = 'baseline' | 'change' | 'acute' | 'plum' | 'quiet' | 'ai'

const TAG_TONE: Record<TagTone, string> = {
  baseline: 'bg-baseline-tint text-baseline-deep border-baseline/25',
  change: 'bg-change-tint text-change-deep border-change/25',
  acute: 'bg-acute-tint text-acute-deep border-acute/25',
  plum: 'bg-plum-tint text-plum-deep border-plum/25',
  quiet: 'bg-mist text-ink-soft border-line-strong',
  ai: 'bg-almanac-tint text-almanac-deep border-almanac/25',
}

export function Tag({
  children,
  tone = 'quiet',
  className,
}: {
  children: ReactNode
  tone?: TagTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-[2px] text-[10.5px] font-semibold uppercase tracking-[0.06em]',
        TAG_TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Anything wearing this was worked out by the layer. */
export function AiTag({ children = 'Almanac' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-almanac/25 bg-almanac-tint px-2 py-[2px] text-[10.5px] font-semibold uppercase tracking-[0.06em] text-almanac-deep">
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-almanac" />
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

export function Stat({
  label,
  value,
  unit,
  note,
  tone = 'ink',
  size = 'md',
}: {
  label: string
  value: ReactNode
  unit?: string
  note?: ReactNode
  tone?: 'ink' | 'plum' | 'ai' | 'change' | 'acute' | 'baseline'
  size?: 'md' | 'lg'
}) {
  const tones = {
    ink: 'text-ink',
    plum: 'text-plum',
    ai: 'text-almanac-deep',
    change: 'text-change-deep',
    acute: 'text-acute-deep',
    baseline: 'text-baseline-deep',
  }
  return (
    <div className="min-w-0">
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </div>
      <div
        className={cn(
          'tnum mt-2.5 font-semibold leading-none',
          size === 'lg' ? 'text-figure' : 'text-figure-sm',
          tones[tone],
        )}
      >
        {value}
        {unit && <span className="ml-1 text-[13px] font-medium text-ink-faint">{unit}</span>}
      </div>
      {note && <div className="mt-2.5 text-[11.5px] leading-relaxed text-ink-soft">{note}</div>}
    </div>
  )
}

export function Meter({ value, tone = 'plum' }: { value: number; tone?: 'plum' | 'ai' | 'change' | 'acute' | 'baseline' }) {
  const tones = {
    plum: 'bg-plum',
    ai: 'bg-almanac',
    change: 'bg-change',
    acute: 'bg-acute',
    baseline: 'bg-baseline',
  }
  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full bg-mist">
      <div
        className={cn('h-full rounded-full transition-all duration-700 ease-round', tones[tone])}
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  )
}

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0">
      <span className="shrink-0 text-[11.5px] font-medium text-ink-faint">{label}</span>
      <span className="tnum min-w-0 text-right text-[12.5px] text-ink">{children}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Buttons
// ---------------------------------------------------------------------------

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ai' | 'ghost' | 'quiet'
  size?: 'sm' | 'md'
  icon?: LucideIcon
  className?: string
  type?: 'button' | 'submit'
}) {
  const variants = {
    primary: 'bg-plum text-white border-plum hover:bg-plum-deep',
    ai: 'bg-almanac text-white border-almanac hover:bg-almanac-deep shadow-glow',
    ghost: 'bg-transparent text-ink-soft border-line-strong hover:bg-mist hover:text-ink',
    quiet: 'bg-mist text-ink border-line-strong hover:bg-line',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-card border font-semibold transition-colors duration-200 ease-round',
        size === 'sm' ? 'px-2.5 py-1 text-[11.5px]' : 'px-3.5 py-[7px] text-[12.5px]',
        variants[variant],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// The refusal block. Dashed, in the AI colour, and it always names a person.
// ---------------------------------------------------------------------------

export function DeferTo({
  question,
  why,
  owners,
  offer,
}: {
  question: string
  why?: ReactNode
  owners: { name: string; role: string; owns: string }[]
  offer?: string
}) {
  return (
    <div className="rounded-card border-2 border-dashed border-almanac/45 bg-almanac-wash p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-almanac-deep" />
        <span className="eyebrow text-almanac-deep">Almanac declines</span>
      </div>
      <p className="mt-2 text-[14px] font-semibold leading-snug text-ink">{question}</p>
      {why && <div className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{why}</div>}
      <div className="mt-4 space-y-2.5 border-t border-almanac-tint pt-3.5">
        {owners.map((o) => (
          <div key={o.name} className="text-[12px] leading-relaxed">
            <span className="font-semibold text-ink">Sits with {o.name}</span>
            <span className="text-ink-faint">, {o.role}</span>
            <div className="text-ink-soft">{o.owns}</div>
          </div>
        ))}
      </div>
      {offer && (
        <p className="mt-3 border-t border-almanac-tint pt-3 text-[12px] leading-relaxed text-almanac-deep">
          {offer}
        </p>
      )}
    </div>
  )
}

/** A small provenance chip that sits under a figure. */
export function Cite({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-1 text-[11px] leading-relaxed text-ink-faint">
      <span className="mt-[5px] inline-block h-1 w-1 shrink-0 rounded-full bg-line-strong" />
      {children}
    </span>
  )
}

export function Placeholder({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-card border-2 border-dashed border-line-strong bg-mist/40 p-8 text-center">
      <div className="text-[13px] font-semibold text-ink-soft">{title}</div>
      {note && <div className="mt-1.5 max-w-sm text-[11.5px] leading-relaxed text-ink-faint">{note}</div>}
    </div>
  )
}
