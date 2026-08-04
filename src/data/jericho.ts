// Jericho Care Group, and the formatters every screen shares.
//
// EVERYTHING IN THIS DEMO IS INVENTED. Jericho operates real campuses in Fresno
// and Madera counties and none of them appear here under their own names. No
// real facility, resident, member of staff or clinician carries a figure, a flag
// or a deficiency anywhere in this build.

export const CLIENT = {
  name: 'Jericho Care Group',
  short: 'Jericho',
  legal: 'Bayshire Central Valley, LLC',
  region: 'Fresno and Madera counties, California',
  ai: 'Almanac',
  aiRole: 'Care Intelligence Layer',
  principal: 'Benjamin Carter',
  rep: 'Awais',
  // The demo is set on one morning, so every screen agrees on the clock.
  today: 'Tuesday 4 August 2026',
  todayShort: '4 Aug 2026',
  // The report is assembled before the room fills. The stand up is the deadline.
  reportAt: '08:12',
  standUp: '08:45',
  standUpEnds: '09:15',
  // Two regulators, because this operator runs two licence types on one campus.
  // Getting this wrong is the fastest way to lose an operator's attention.
  snfRegulator: 'CDPH Licensing and Certification',
  rcfeRegulator: 'CDSS Community Care Licensing',
}

export type Level = 'SNF' | 'AL' | 'IL'

export const LEVEL_LABEL: Record<Level, string> = {
  SNF: 'Skilled nursing',
  AL: 'Assisted living',
  IL: 'Independent living',
}

/** The licence each level actually sits under in California. */
export const LEVEL_LICENCE: Record<Level, string> = {
  SNF: 'Skilled nursing facility, licensed by CDPH',
  AL: 'Residential care facility for the elderly, licensed by CDSS',
  IL: 'Unlicensed residential apartments',
}

export const num = (n: number) => n.toLocaleString('en-US')

export const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`

export const hprd = (n: number) => n.toFixed(2)

export const lb = (n: number) => `${n.toFixed(1)} lb`

export const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`

/** "1 in 24", which reads better to a DON than a percentage does. */
export const oneIn = (part: number, whole: number) =>
  part === 0 ? 'none' : `1 in ${Math.round(whole / part)}`

export const dayOf = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export const weekdayOf = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' })
