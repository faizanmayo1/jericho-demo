import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { cn } from './ui'
import { NAV } from './Shell'
import { WATCH } from '../data/watch'
import { CAMPUSES, campusCensus } from '../data/campuses'
import { SUGGESTED } from '../data/copilot'
import { ROLES } from '../data/roles'
import { useRole } from './RoleContext'
import { num } from '../data/jericho'

interface Entry {
  id: string
  label: string
  detail: string
  group: string
  to: string
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { can, setRole } = useRole()

  const entries = useMemo<Entry[]>(
    () => [
      ...NAV.map((n) => ({
        id: `nav-${n.to}`,
        label: n.label,
        detail: n.hint,
        group: 'Screens',
        to: n.to,
      })),
      ...WATCH.map((w) => ({
        id: `res-${w.name}`,
        label: w.name,
        detail: `${w.unit}, ${w.owner === null ? 'no owner' : 'owned'}`,
        group: 'This morning',
        to: w.heroLink ? '/resident' : '/watch',
      })),
      ...CAMPUSES.map((c) => ({
        id: `camp-${c.id}`,
        label: c.name,
        detail: `${c.town}, ${num(campusCensus(c))} residents, ${c.flagged} flagged`,
        group: 'Campuses',
        to: '/watch',
      })),
      ...SUGGESTED.map((s, i) => ({
        id: `ask-${i}`,
        label: s,
        detail: 'Ask Almanac',
        group: 'Questions',
        to: '/almanac',
      })),
      ...ROLES.map((r) => ({
        id: `role-${r.id}`,
        label: `View as ${r.label}`,
        detail: `${r.person}, ${r.routes.length} screens`,
        group: 'Roles',
        to: `role:${r.id}`,
      })),
    ].filter((e) => e.to.startsWith('role:') || can(e.to)),
    [can],
  )

  const results = useMemo(() => {
    const needle = q.toLowerCase().trim()
    const hits = needle
      ? entries.filter((e) => `${e.label} ${e.detail} ${e.group}`.toLowerCase().includes(needle))
      : entries
    return hits.slice(0, needle ? 12 : 9)
  }, [q, entries])

  useEffect(() => {
    if (open) {
      setQ('')
      setCursor(0)
      const t = window.setTimeout(() => inputRef.current?.focus(), 20)
      return () => window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => setCursor(0), [q])

  if (!open) return null

  const choose = (e: Entry) => {
    if (e.to.startsWith('role:')) {
      setRole(e.to.slice(5) as Parameters<typeof setRole>[0])
    } else {
      navigate(e.to)
    }
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault()
      choose(results[cursor])
    }
  }

  let lastGroup = ''

  return (
    <div className="fixed inset-0 z-[70] flex justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
      />
      <div className="relative z-10 h-fit w-full max-w-xl animate-rise overflow-hidden rounded-card border border-line-strong bg-surface shadow-pop">
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Find a screen, a resident, a campus or a question"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-faint"
          />
          <span className="shrink-0 rounded border border-line-strong px-1.5 py-0.5 text-[10px] font-semibold text-ink-faint">
            ESC
          </span>
        </div>
        <div className="max-h-[52vh] overflow-y-auto py-1.5">
          {results.length === 0 && (
            <div className="px-4 py-6 text-center text-[12px] text-ink-faint">Nothing matches that.</div>
          )}
          {results.map((e, i) => {
            const header = e.group !== lastGroup ? e.group : null
            lastGroup = e.group
            return (
              <div key={e.id}>
                {header && <div className="eyebrow px-4 pb-1 pt-3">{header}</div>}
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => choose(e)}
                  className={cn(
                    'flex w-full items-baseline gap-3 px-4 py-2 text-left transition-colors',
                    i === cursor ? 'bg-plum-wash' : 'hover:bg-mist/60',
                  )}
                >
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">
                    {e.label}
                  </span>
                  <span className="shrink-0 truncate text-[11px] text-ink-faint">{e.detail}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
