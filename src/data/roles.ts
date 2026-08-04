// The seven user types, and what each one is allowed to see.
//
// "Each user should only see the information relevant to their role and
// facility." That is a real constraint rather than a slide, and the cheapest way
// to prove it on a call is to let somebody in the room change role and watch the
// navigation and the census shrink in front of them.
//
// Two of these roles are deliberately uncomfortable. A nursing supervisor cannot
// open the quarterly pack, and the family communication coordinator cannot open
// a resident record at all. Showing a role that is locked out of most of the
// product is what makes the other six credible.

export type RoleId =
  | 'exec'
  | 'regional'
  | 'admin'
  | 'don'
  | 'supervisor'
  | 'coordinator'
  | 'family'

export interface Role {
  id: RoleId
  label: string
  person: string
  /** 'all' or a campus id. */
  scope: 'all' | string
  /** Which care levels this role may see residents in. */
  levels: ('SNF' | 'AL' | 'IL')[]
  /** Routes this role may open. */
  routes: string[]
  note: string
}

export const ROLES: Role[] = [
  {
    id: 'exec',
    label: 'Executive leadership',
    person: 'Benjamin Carter, Co-Founder',
    scope: 'all',
    levels: ['SNF', 'AL', 'IL'],
    routes: ['/', '/facility', '/watch', '/resident', '/followup', '/notification', '/platform', '/reporting', '/almanac'],
    note: 'Everything across all eight campuses, including the quarterly pack and the audit log.',
  },
  {
    id: 'regional',
    label: 'Regional operations',
    person: 'Denise Ashford, Regional Director',
    scope: 'all',
    levels: ['SNF', 'AL', 'IL'],
    routes: ['/', '/facility', '/watch', '/resident', '/followup', '/notification', '/platform', '/reporting', '/almanac'],
    note: 'All campuses, all levels. The same view as executive leadership, because the difference between them is what they do with it rather than what they may see.',
  },
  {
    id: 'admin',
    label: 'Facility administrator',
    person: 'Curtis Nakamura, Alder Grove',
    scope: 'alder',
    levels: ['SNF', 'AL', 'IL'],
    routes: ['/facility', '/watch', '/resident', '/followup', '/notification', '/almanac'],
    note: 'One campus, all three levels. No group comparison, because a campus administrator ranking other campuses is a conversation for their regional director rather than a screen.',
  },
  {
    id: 'don',
    label: 'Director of Nursing',
    person: 'Rosa Villareal, RN, Alder Grove',
    scope: 'alder',
    levels: ['SNF'],
    routes: ['/facility', '/watch', '/resident', '/followup', '/almanac'],
    note: 'Skilled nursing at one campus. She compiles the 24 hour report and she does not run assisted living, so the assisted living names on the watch list are visible to her as context and owned by somebody else.',
  },
  {
    id: 'supervisor',
    label: 'Nursing supervisor',
    person: 'Marcus Bell, RN, Alder Grove',
    scope: 'alder',
    levels: ['SNF'],
    routes: ['/facility', '/watch', '/resident', '/followup'],
    note: 'Shift level. Residents, incidents and tasks, with no access to the quarterly pack, the platform configuration or the copilot.',
  },
  {
    id: 'coordinator',
    label: 'Care coordinator',
    person: 'Priya Raman, LVN, Alder Grove',
    scope: 'alder',
    levels: ['AL', 'IL'],
    routes: ['/facility', '/watch', '/resident', '/followup', '/notification', '/almanac'],
    note: 'Assisted and independent living at one campus. She is the Wellness Director, so the residents nobody else owns are hers.',
  },
  {
    id: 'family',
    label: 'Family communication',
    person: 'Angela Pham, LCSW',
    scope: 'alder',
    levels: [],
    routes: ['/notification'],
    note: 'Drafts and approvals only. No resident record, no clinical detail, no watch list. She prepares what families are told and she does not need the chart to do it.',
  },
]

export const roleById = (id: RoleId) => ROLES.find((r) => r.id === id) ?? ROLES[0]

export const canOpen = (role: Role, route: string) => role.routes.includes(route)

export const DEFAULT_ROLE: RoleId = 'exec'
