// The eight campuses. All invented, all Central Valley towns.
//
// THEY ARE INVENTED ON PURPOSE AND THE SCREENS SAY SO. Jericho runs real
// facilities in Fresno and Madera counties, and this build shows staffing gaps,
// overdue follow ups and flagged residents. Putting invented problems on the
// name of a building Benjamin Carter is accountable for is not a risk worth
// taking for a little extra recognition in the room.
//
// Every ratio on every screen derives from these rows. Nothing is typed twice,
// so a headline cannot drift away from its own table.

import type { Level } from './jericho'

export interface Campus {
  id: string
  name: string
  town: string
  county: 'Fresno' | 'Madera'
  /** Residents in occupancy this morning, by level. */
  census: Record<Level, number>
  /** Licensed capacity, by level, so occupancy derives rather than being typed. */
  licensed: Record<Level, number>
  /** Names on this morning's watch list. */
  flagged: number

  // --- Operational counters the executive view reports ---------------------
  admissionsToday: number
  dischargesToday: number
  /** Unplanned transfers out to an emergency department, last seven days. */
  transfersOut7d: number
  /** Incidents recorded in the last seven days, both licence types. */
  incidents7d: number
  /** Assessments and care plan reviews past their due date. */
  overdueAssessments: number
  /** Open shifts in the next seven days. */
  openShifts: number
  /** Medication changes awaiting a review that has not happened. */
  medChangesToReview: number
  /** Family updates drafted and waiting on a named approver. */
  familyUpdatesPending: number
  /** Follow up tasks open past their due date. */
  overdueTasks: number

  // --- Rolling figures ------------------------------------------------------
  /** Unplanned transfers to an emergency department or hospital, July. */
  transfersJuly: number
  /** Of those, how many carried a signal chain of 3 or more sources over 5 or
   *  more days before the transfer, on retrospective replay. */
  chainedJuly: number
  /** Total direct care nursing hours per resident day, skilled nursing only. */
  hprd: number
  /** Certified nurse assistant hours per resident day, skilled nursing only. */
  cnaHprd: number

  /** Operational alerts surfaced to leadership, in plain language. */
  alerts: string[]
  /** Direction of travel over the last four weeks. Never green, see the palette. */
  trend: 'steady' | 'watch' | 'acute'
}

export const CAMPUSES: Campus[] = [
  {
    id: 'alder',
    name: 'Alder Grove',
    town: 'Fresno',
    county: 'Fresno',
    census: { SNF: 52, AL: 108, IL: 56 },
    licensed: { SNF: 58, AL: 120, IL: 62 },
    flagged: 9,
    admissionsToday: 1,
    dischargesToday: 0,
    transfersOut7d: 3,
    incidents7d: 7,
    overdueAssessments: 4,
    openShifts: 6,
    medChangesToReview: 5,
    familyUpdatesPending: 3,
    overdueTasks: 2,
    transfersJuly: 11,
    chainedJuly: 4,
    hprd: 3.61,
    cnaHprd: 2.44,
    alerts: ['Four service plan reviews past due on the assisted living side'],
    trend: 'watch',
  },
  {
    id: 'sycamore',
    name: 'Sycamore Bend',
    town: 'Clovis',
    county: 'Fresno',
    census: { SNF: 48, AL: 86, IL: 40 },
    licensed: { SNF: 52, AL: 96, IL: 44 },
    flagged: 7,
    admissionsToday: 2,
    dischargesToday: 1,
    transfersOut7d: 2,
    incidents7d: 5,
    overdueAssessments: 2,
    openShifts: 4,
    medChangesToReview: 4,
    familyUpdatesPending: 2,
    overdueTasks: 1,
    transfersJuly: 9,
    chainedJuly: 3,
    hprd: 3.58,
    cnaHprd: 2.41,
    alerts: [],
    trend: 'steady',
  },
  {
    id: 'camden',
    name: 'Camden Oaks',
    town: 'Madera',
    county: 'Madera',
    census: { SNF: 59, AL: 54, IL: 36 },
    licensed: { SNF: 64, AL: 60, IL: 40 },
    flagged: 6,
    admissionsToday: 0,
    dischargesToday: 2,
    transfersOut7d: 4,
    incidents7d: 9,
    overdueAssessments: 7,
    openShifts: 11,
    medChangesToReview: 6,
    familyUpdatesPending: 5,
    overdueTasks: 6,
    transfersJuly: 12,
    chainedJuly: 5,
    hprd: 3.52,
    cnaHprd: 2.4,
    alerts: [
      'Eleven open shifts in the next seven days, the highest in the group',
      'Six follow up tasks past their due date',
    ],
    trend: 'acute',
  },
  {
    id: 'kingsburg',
    name: 'Kingsburg Meadows',
    town: 'Kingsburg',
    county: 'Fresno',
    census: { SNF: 44, AL: 51, IL: 36 },
    licensed: { SNF: 48, AL: 56, IL: 40 },
    flagged: 4,
    admissionsToday: 1,
    dischargesToday: 0,
    transfersOut7d: 1,
    incidents7d: 3,
    overdueAssessments: 1,
    openShifts: 2,
    medChangesToReview: 3,
    familyUpdatesPending: 1,
    overdueTasks: 0,
    transfersJuly: 7,
    chainedJuly: 2,
    hprd: 3.63,
    cnaHprd: 2.47,
    alerts: [],
    trend: 'steady',
  },
  {
    id: 'willow',
    name: 'Willow Run',
    town: 'Sanger',
    county: 'Fresno',
    census: { SNF: 38, AL: 48, IL: 32 },
    licensed: { SNF: 42, AL: 54, IL: 36 },
    flagged: 5,
    admissionsToday: 0,
    dischargesToday: 1,
    transfersOut7d: 2,
    incidents7d: 6,
    overdueAssessments: 5,
    openShifts: 8,
    medChangesToReview: 2,
    familyUpdatesPending: 4,
    overdueTasks: 3,
    transfersJuly: 8,
    chainedJuly: 3,
    hprd: 3.49,
    cnaHprd: 2.38,
    alerts: ['Quarterly nursing hours below the California floor, reported in the pack'],
    trend: 'watch',
  },
  {
    id: 'reedley',
    name: 'Reedley Commons',
    town: 'Reedley',
    county: 'Fresno',
    census: { SNF: 36, AL: 40, IL: 26 },
    licensed: { SNF: 40, AL: 44, IL: 30 },
    flagged: 3,
    admissionsToday: 1,
    dischargesToday: 1,
    transfersOut7d: 1,
    incidents7d: 2,
    overdueAssessments: 0,
    openShifts: 1,
    medChangesToReview: 2,
    familyUpdatesPending: 1,
    overdueTasks: 0,
    transfersJuly: 6,
    chainedJuly: 2,
    hprd: 3.67,
    cnaHprd: 2.51,
    alerts: [],
    trend: 'steady',
  },
  {
    id: 'chowchilla',
    name: 'Chowchilla Bluff',
    town: 'Chowchilla',
    county: 'Madera',
    census: { SNF: 40, AL: 34, IL: 22 },
    licensed: { SNF: 44, AL: 38, IL: 26 },
    flagged: 4,
    admissionsToday: 0,
    dischargesToday: 0,
    transfersOut7d: 2,
    incidents7d: 4,
    overdueAssessments: 3,
    openShifts: 5,
    medChangesToReview: 1,
    familyUpdatesPending: 2,
    overdueTasks: 2,
    transfersJuly: 7,
    chainedJuly: 2,
    hprd: 3.55,
    cnaHprd: 2.42,
    alerts: [],
    trend: 'watch',
  },
  {
    id: 'kerman',
    name: 'Kerman Row',
    town: 'Kerman',
    county: 'Fresno',
    census: { SNF: 34, AL: 32, IL: 22 },
    licensed: { SNF: 36, AL: 36, IL: 24 },
    flagged: 2,
    admissionsToday: 0,
    dischargesToday: 0,
    transfersOut7d: 0,
    incidents7d: 1,
    overdueAssessments: 0,
    openShifts: 0,
    medChangesToReview: 1,
    familyUpdatesPending: 0,
    overdueTasks: 0,
    transfersJuly: 5,
    chainedJuly: 1,
    hprd: 3.71,
    cnaHprd: 2.53,
    alerts: [],
    trend: 'steady',
  },
]

/** The campus the whole demo is set at. */
export const HERO_CAMPUS = CAMPUSES[0]

// ---------------------------------------------------------------------------
// Derived. Nothing below is a typed total.
// ---------------------------------------------------------------------------

export const campusCensus = (c: Campus) => c.census.SNF + c.census.AL + c.census.IL

export const campusLicensed = (c: Campus) => c.licensed.SNF + c.licensed.AL + c.licensed.IL

export const occupancy = (c: Campus) => campusCensus(c) / campusLicensed(c)

export const groupCensus = () => CAMPUSES.reduce((t, c) => t + campusCensus(c), 0)

export const groupLicensed = () => CAMPUSES.reduce((t, c) => t + campusLicensed(c), 0)

export const groupOccupancy = () => groupCensus() / groupLicensed()

export const groupFlagged = () => CAMPUSES.reduce((t, c) => t + c.flagged, 0)

export const levelCensus = (level: Level) =>
  CAMPUSES.reduce((t, c) => t + c.census[level], 0)

export const flaggedShare = (c: Campus) => c.flagged / campusCensus(c)

export const groupFlaggedShare = () => groupFlagged() / groupCensus()

export const groupTransfersJuly = () => CAMPUSES.reduce((t, c) => t + c.transfersJuly, 0)

export const groupChainedJuly = () => CAMPUSES.reduce((t, c) => t + c.chainedJuly, 0)

/** Sum any operational counter across the group, so the executive tiles cannot
 *  drift from the facility table underneath them. */
export const groupSum = (key: keyof Campus) =>
  CAMPUSES.reduce((t, c) => t + (typeof c[key] === 'number' ? (c[key] as number) : 0), 0)

/** Residents who sit outside the 24 hour report entirely, because it is a
 *  skilled nursing artifact and they do not live on the skilled side. */
export const outsideTheReport = () => levelCensus('AL') + levelCensus('IL')

export const campusById = (id: string) => CAMPUSES.find((c) => c.id === id)

export const byCounty = () => {
  const counties = Array.from(new Set(CAMPUSES.map((c) => c.county)))
  return counties.map((county) => ({
    county,
    campuses: CAMPUSES.filter((c) => c.county === county).sort((a, b) =>
      a.town.localeCompare(b.town),
    ),
  }))
}

/** Campuses ranked by how much is waiting on somebody, which is the comparison
 *  leadership actually needs. Deliberately not a league table of quality. */
export const attentionScore = (c: Campus) =>
  c.overdueAssessments + c.overdueTasks + c.medChangesToReview + c.familyUpdatesPending + c.openShifts

export const rankedByAttention = () =>
  [...CAMPUSES].sort((a, b) => attentionScore(b) - attentionScore(a))

export const TREND_LABEL: Record<Campus['trend'], string> = {
  steady: 'Steady',
  watch: 'Watch',
  acute: 'Needs a call today',
}
