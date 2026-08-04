import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_ROLE, ROLES, roleById, type Role, type RoleId } from '../data/roles'
import { CAMPUSES, type Campus } from '../data/campuses'
import type { Level } from '../data/jericho'

interface RoleCtxValue {
  role: Role
  setRole: (id: RoleId) => void
  /** Campuses this role may see. */
  campuses: Campus[]
  /** Care levels this role may see residents in. */
  levels: Level[]
  can: (route: string) => boolean
  isScoped: boolean
}

const RoleCtx = createContext<RoleCtxValue>({
  role: ROLES[0],
  setRole: () => {},
  campuses: CAMPUSES,
  levels: ['SNF', 'AL', 'IL'],
  can: () => true,
  isScoped: false,
})

export const useRole = () => useContext(RoleCtx)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<RoleId>(DEFAULT_ROLE)
  const role = roleById(id)

  const value = useMemo<RoleCtxValue>(() => {
    const campuses = role.scope === 'all' ? CAMPUSES : CAMPUSES.filter((c) => c.id === role.scope)
    return {
      role,
      setRole: setId,
      campuses,
      levels: role.levels as Level[],
      can: (route: string) => role.routes.includes(route),
      isScoped: role.scope !== 'all',
    }
  }, [role])

  return <RoleCtx.Provider value={value}>{children}</RoleCtx.Provider>
}
