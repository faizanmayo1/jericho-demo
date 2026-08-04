import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ToastProvider } from './components/Toast'
import { Shell } from './components/Shell'
import { RoleProvider, useRole } from './components/RoleContext'
import { Panel } from './components/ui'
import { Executive } from './screens/Executive'
import { Facility } from './screens/Facility'
import { Watch } from './screens/Watch'
import { Resident } from './screens/Resident'
import { FollowUp } from './screens/FollowUp'
import { Notification } from './screens/Notification'
import { Platform } from './screens/Platform'
import { Reporting } from './screens/Reporting'
import { Almanac } from './screens/Almanac'

/** Permissions are enforced at the route, not only hidden in the navigation.
 *  A demo that only hides the link is a demo that loses the argument the moment
 *  somebody types the URL. */
function Guard({ children }: { children: ReactNode }) {
  const { can, role } = useRole()
  const { pathname } = useLocation()

  if (can(pathname)) return <>{children}</>

  const firstAllowed = role.routes[0] ?? '/'
  return (
    <div className="mx-auto max-w-xl">
      <Panel tone="quiet">
        <div className="eyebrow">Access denied</div>
        <h2 className="mt-1.5 text-lede font-semibold text-ink">
          Not available to {role.label.toLowerCase()}
        </h2>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
          {role.person} is scoped to {role.routes.length} screen
          {role.routes.length === 1 ? '' : 's'}. {role.note}
        </p>
        <p className="mt-3 text-[12px] leading-relaxed text-ink-faint">
          The attempt was written to the audit log, which is the point of having one.
        </p>
        <div className="mt-4">
          <a
            href={firstAllowed}
            className="text-[12.5px] font-semibold text-plum underline underline-offset-2"
          >
            Go to what this role can open
          </a>
        </div>
      </Panel>
    </div>
  )
}

function Routed() {
  const { can } = useRole()
  return (
    <Shell>
      <Guard>
        <Routes>
          <Route path="/" element={can('/') ? <Executive /> : <Navigate to="/facility" replace />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/resident" element={<Resident />} />
          <Route path="/followup" element={<FollowUp />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/almanac" element={<Almanac />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Guard>
    </Shell>
  )
}

export default function App() {
  return (
    <RoleProvider>
      <ToastProvider>
        <Routed />
      </ToastProvider>
    </RoleProvider>
  )
}
