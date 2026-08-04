import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Command, Lock } from 'lucide-react'
import { CommandPalette } from './CommandPalette'
import { cn, Tag } from './ui'
import { useRole } from './RoleContext'
import { CLIENT } from '../data/jericho'
import { ROLES } from '../data/roles'
import { HERO_CAMPUS } from '../data/campuses'
import { WATCH, RUNG_LABEL } from '../data/watch'
import { windowDays } from '../data/marguerite'

export const NAV = [
  { to: '/', label: 'Executive', hint: 'All eight campuses at a glance' },
  { to: '/facility', label: 'Facility', hint: 'Alder Grove, and the 24 hour report' },
  { to: '/watch', label: 'Watch List', hint: 'Where the line falls this morning' },
  { to: '/resident', label: 'Resident', hint: 'Marguerite Ellison, AL 214' },
  { to: '/followup', label: 'Follow-Up', hint: 'One incident end to end, and the task board' },
  { to: '/notification', label: 'Communication', hint: 'Summaries and family updates, none sent' },
  { to: '/platform', label: 'Platform', hint: 'Integration, permissions and the audit log' },
  { to: '/reporting', label: 'Quarterly Pack', hint: 'Staffing, quality and regulatory' },
  { to: '/almanac', label: 'Almanac', hint: 'Ask the record' },
]

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-[22px] w-[22px] shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#6E2150" />
        <rect x="9" y="7" width="14" height="18" rx="1.5" fill="#FAEEF4" />
        <g stroke="#A04C7C" strokeWidth="1.4" strokeLinecap="round">
          <path d="M12 12h8M12 16h8M12 20h5" />
        </g>
        <circle cx="21.4" cy="20" r="2.1" fill="#1F63EE" />
      </svg>
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-[13.5px] font-medium tracking-[-0.01em] text-white">
          {CLIENT.name}
        </span>
        <span className="mt-[3px] block text-[9.5px] font-semibold uppercase tracking-[0.22em] text-dusk-mute">
          {CLIENT.ai} {CLIENT.aiRole}
        </span>
      </span>
    </span>
  )
}

/** Section 2 asks that each user only sees what is relevant to their role and
 *  facility. The cheapest way to prove that on a call is to let somebody change
 *  role in the room and watch the navigation and the census shrink. */
function RolePicker() {
  const { role, setRole } = useRole()
  return (
    <label className="flex min-w-0 items-center gap-2">
      <span className="sr-only">Viewing as</span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-dusk-mute lg:inline">
        Viewing as
      </span>
      <select
        value={role.id}
        onChange={(e) => setRole(e.target.value as typeof role.id)}
        className="min-w-0 max-w-[190px] truncate rounded-card border border-dusk-line bg-dusk-soft px-2 py-1 text-[11.5px] font-medium text-white outline-none"
      >
        {ROLES.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
      </select>
    </label>
  )
}

/** Whoever is selected stays pinned in the chrome on every screen, so the chrome
 *  argues the thesis instead of decorating it: the person persists, the screen
 *  changes. Hidden for roles that may not open a resident record at all. */
function ResidentCarrier() {
  const [i, setI] = useState(0)
  const { levels, can } = useRole()
  const navigate = useNavigate()

  const visible = WATCH.filter((w) => levels.includes(w.level))
  if (!can('/resident') || visible.length === 0) return null

  const r = visible[Math.min(i, visible.length - 1)]
  const step = (d: number) => setI((prev) => (prev + d + visible.length) % visible.length)

  return (
    <div className="border-b border-line bg-plum-wash">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2 sm:px-6">
        <span className="eyebrow shrink-0 text-plum">Carrying</span>
        <button
          type="button"
          onClick={() => navigate('/resident')}
          className="min-w-0 truncate text-[12.5px] font-semibold text-ink transition-colors hover:text-plum"
        >
          {r.name}
        </button>
        <span className="tnum shrink-0 text-[11.5px] text-ink-soft">{r.unit}</span>
        <span className="hidden shrink-0 text-[11.5px] text-ink-faint sm:inline">
          {HERO_CAMPUS.name}
        </span>
        {r.heroLink && (
          <span className="tnum hidden shrink-0 text-[11.5px] text-ink-faint md:inline">
            day {windowDays()} of the window
          </span>
        )}
        <Tag tone={r.rung}>{RUNG_LABEL[r.rung]}</Tag>
        {r.owner === null && (
          <span className="hidden shrink-0 text-[11px] font-medium text-change-deep lg:inline">
            No owner
          </span>
        )}
        <span className="ml-auto flex shrink-0 items-center gap-1">
          <span className="tnum mr-1 text-[11px] text-ink-faint">
            {visible.indexOf(r) + 1} of {visible.length}
          </span>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous resident"
            className="rounded border border-line-strong bg-surface p-1 text-ink-soft transition-colors hover:bg-mist hover:text-ink"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next resident"
            className="rounded border border-line-strong bg-surface p-1 text-ink-soft transition-colors hover:bg-mist hover:text-ink"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>
    </div>
  )
}

export function Shell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { pathname } = useLocation()
  const { role, can, campuses, isScoped } = useRole()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
      if (e.key === 'Escape') setPaletteOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allowed = NAV.filter((n) => can(n.to))
  const hidden = NAV.length - allowed.length

  return (
    <div className="light-ground flex min-h-screen flex-col">
      <header className="sticky top-0 z-40">
        <div className="dusk-ground border-b border-plum-lit/20 shadow-band">
          <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
            <Link to="/" className="min-w-0">
              <Wordmark />
            </Link>
            <div className="ml-auto flex shrink-0 items-center gap-3">
              <RolePicker />
              <span className="hidden text-right leading-tight lg:block">
                <span className="block text-[11.5px] font-medium text-white">{CLIENT.today}</span>
                <span className="tnum block text-[10.5px] text-dusk-faint">
                  Stand-up {CLIENT.standUp} at {HERO_CAMPUS.name}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="flex items-center gap-1.5 rounded-card border border-dusk-line bg-dusk-soft px-2 py-1 text-[11px] font-medium text-dusk-faint transition-colors hover:text-white"
              >
                <Command className="h-3 w-3" />K
              </button>
            </div>
          </div>
        </div>

        <nav className="border-b border-line bg-surface/95 backdrop-blur-sm">
          <div className="xscroll mx-auto max-w-[1360px] px-4 sm:px-6">
            <div className="flex items-stretch gap-1">
              {allowed.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[12.5px] font-semibold transition-colors duration-200 ease-round',
                      isActive
                        ? 'border-plum bg-plum-wash/70 text-plum'
                        : 'border-transparent text-ink-soft hover:bg-mist/50 hover:text-ink',
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              {hidden > 0 && (
                <span className="flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2.5 text-[11.5px] text-ink-faint">
                  <Lock className="h-3 w-3" />
                  {hidden} hidden for this role
                </span>
              )}
            </div>
          </div>
        </nav>

        {isScoped && (
          <div className="border-b border-change/20 bg-change-tint/50">
            <div className="mx-auto max-w-[1360px] px-4 py-1.5 text-[11.5px] leading-relaxed text-change-deep sm:px-6">
              <span className="font-semibold">{role.person}</span>. Scoped to{' '}
              {campuses.map((c) => c.name).join(', ')}
              {role.levels.length > 0
                ? ` and to ${role.levels.join(', ')}.`
                : ', with no resident record access at all.'}{' '}
              {role.note}
            </div>
          </div>
        )}

        <ResidentCarrier />
      </header>

      <main className="mx-auto w-full max-w-[1360px] flex-1 px-4 py-7 sm:px-6 sm:py-9">
        {children}
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-[1360px] px-4 py-5 text-[11px] leading-relaxed text-ink-faint sm:px-6">
          An illustrative demonstration prepared for {CLIENT.principal} at {CLIENT.name} by{' '}
          {CLIENT.rep}. Every campus, resident, member of staff and figure in it is invented, and
          Jericho's real facilities deliberately do not appear. Nothing here is a clinical system or
          a source of clinical advice.
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
