// What the layer reads, and what it never writes.
//
// This screen exists to kill the first objection an operator raises, which is
// never "does it work". It is "what does it want from my building". The answer
// has to be a count, not a paragraph: zero new fields, zero new forms, zero new
// screens for anybody on the floor.
//
// We do not claim to know which record system Jericho runs. That is a question
// for the call, and asserting it would be the fastest way to be wrong out loud.

export interface SourceRow {
  module: string
  level: 'SNF' | 'AL' | 'IL' | 'All'
  /** Rows read in the last cycle. */
  rows: number
  lastRead: string
  kind: 'Structured' | 'Free text' | 'Mixed'
  note: string
}

export const SOURCES: SourceRow[] = [
  { module: 'Resident assessments', level: 'SNF', rows: 1840, lastRead: '08:04', kind: 'Structured', note: 'MDS 3.0 on the assessment schedule, including Section GG.' },
  { module: 'Service plans', level: 'AL', rows: 453, lastRead: '08:04', kind: 'Mixed', note: 'Six month cycle. The governing document in assisted living, and the thinnest one in the building.' },
  { module: 'Care plans', level: 'SNF', rows: 1122, lastRead: '08:05', kind: 'Mixed', note: 'Care area assessments and the interventions that came out of them.' },
  { module: 'Medication administration', level: 'All', rows: 9614, lastRead: '08:07', kind: 'Structured', note: 'Administrations, refusals, as needed doses and the follow up, or its absence.' },
  { module: 'Progress and shift notes', level: 'All', rows: 3287, lastRead: '08:08', kind: 'Free text', note: 'Where the earliest signal almost always lives, and the only place a language model earns its place.' },
  { module: 'Incident reports', level: 'All', rows: 74, lastRead: '08:08', kind: 'Mixed', note: 'Falls, injuries and unusual incidents, on both licences.' },
  { module: 'Staff schedules and worked hours', level: 'All', rows: 2410, lastRead: '08:09', kind: 'Structured', note: 'Coverage, continuity and agency use. The same rows the quarterly staffing figures derive from.' },
  { module: 'Dining and activities logs', level: 'AL', rows: 1966, lastRead: '08:10', kind: 'Mixed', note: 'Attendance and participation. Monitored nowhere, and the reason four of Marguerite Ellison’s twelve entries sat under no rule at all.' },
  { module: 'Weights and vital signs', level: 'All', rows: 812, lastRead: '08:10', kind: 'Structured', note: 'Monthly on the assisted living side, which is the cadence the whole problem hides inside.' },
  { module: 'Work orders and front desk logs', level: 'All', rows: 288, lastRead: '08:11', kind: 'Free text', note: 'Nobody thinks of these as clinical. Two of the twelve entries came from here.' },
]

export const WRITES = {
  heading: 'What it writes back',
  answer: 'Nothing.',
  detail:
    'Almanac is read only. It does not write to a chart, it does not close a task, it does not alter a code and it does not send a message. Every artifact it produces is a draft with a named human on it. If it were disconnected this afternoon, not one record in the building would be different.',
}

export const BURDEN = [
  { label: 'New fields for care staff', value: 0 },
  { label: 'New forms', value: 0 },
  { label: 'New screens on the floor', value: 0 },
  { label: 'Minutes added to a shift', value: 0 },
]

/** The honest limits. An expert buyer trusts the rest of it more for these. */
export const LIMITS = [
  'It reads what was written. If a shift was too short to write anything, there is nothing to read, and the quietest resident in a short staffed building is the one it will see last.',
  'Free text extraction carries a confidence floor. Below it, an entry is surfaced as unread text for a person to look at rather than as a finding, and it is never counted toward a flag.',
  'It has no vital signs on the assisted living side, because they are not routinely taken there. Several of the questions it raises can only be answered by somebody going to the apartment.',
  'It does not know what happened off campus. An outside cardiology prescription is invisible until somebody tells the building about it, which is exactly what went wrong on 30 July.',
]

export const totalRows = () => SOURCES.reduce((t, s) => t + s.rows, 0)

export const freeTextRows = () =>
  SOURCES.filter((s) => s.kind === 'Free text').reduce((t, s) => t + s.rows, 0)
