// The quarterly reporting pack.
//
// A group that has taken on distressed communities carries recurring reporting
// obligations on staffing, licensing, quality metrics and regulatory actions,
// furnished to an independent monitor and to the state. This screen assembles
// that pack from the same records everything else on this demo reads.
//
// TONE RULE, AND IT MATTERS. A monitor is FURNISHED, never managed. Everything
// here is an evidence pack drawn from primary records with provenance on every
// figure. Nothing here shapes a narrative, selects a favourable window or
// smooths a number, and the screen says so in those words. An operator who has
// lived under one of these will notice immediately if the tone is wrong.

import { groupChainedJuly, groupTransfersJuly } from './campuses'

export interface Figure {
  label: string
  value: string
  /** Where the number came from. Every figure carries this. */
  source: string
  /** Optional comparison against the binding standard. */
  against?: string
  ok: boolean
}

export const PACK = {
  quarter: 'Q2 2026, 1 April to 30 June, with July detail attached',
  entity: 'Bayshire Central Valley, LLC',
  scope: 'Eight campuses, Fresno and Madera counties',
  assembled: 'Assembled 4 August 2026 from primary records',
  signatories: 'For signature by the Co-Founders',
}

export const STAFFING: Figure[] = [
  {
    label: 'Total direct care nursing hours per resident day, group',
    value: '3.60',
    source: 'Worked hours reconciled to payroll, skilled nursing only',
    against: 'California Health and Safety Code 1276.5 requires 3.5',
    ok: true,
  },
  {
    label: 'Certified nurse assistant hours per resident day, group',
    value: '2.45',
    source: 'Worked hours reconciled to payroll, by classification',
    against: 'Health and Safety Code 1276.65 sets a 2.4 assistant sub minimum',
    ok: true,
  },
  {
    label: 'Campus days below the 3.5 floor in the quarter',
    value: '11 of 728',
    source: 'Daily census against daily worked hours, every campus, every day',
    against: 'Each of the eleven is listed by campus and date in the appendix, with the census and hours that produced it',
    ok: false,
  },
  {
    label: 'Lowest campus, quarterly average',
    value: '3.49 at Willow Run',
    source: 'Campus level worked hours',
    against: 'Below the 3.5 floor on a quarterly average, and reported as such',
    ok: false,
  },
  {
    label: 'Total nurse turnover, rolling twelve months',
    value: '44.8%',
    source: 'Terminations against average headcount, by classification',
    ok: true,
  },
  {
    label: 'Agency hours as a share of total nursing hours',
    value: '9.2%',
    source: 'Contracted hours flagged at source in the schedule',
    ok: true,
  },
]

export const QUALITY: Figure[] = [
  {
    // Derived from the campus rows so this cannot drift from the same figure on
    // the watch screen. Both are the July count, and the pack says July rather
    // than borrowing a month and calling it a quarter.
    label: 'Unplanned transfers to an emergency department or hospital, July',
    value: `${groupTransfersJuly()} in July`,
    source: 'Transfer log across all eight campuses, skilled nursing. Reported by month, with the quarter totalled in the appendix.',
    ok: true,
  },
  {
    label: 'Of those, carrying a documented signal chain before transfer',
    value: `${groupChainedJuly()} of ${groupTransfersJuly()}`,
    source: 'Retrospective replay, three or more sources spanning five or more days',
    against: 'This is an observation about the record, not a claim that any of them were preventable',
    ok: true,
  },
  {
    label: 'Falls with major injury, long stay',
    value: '1.6%',
    source: 'Incident reports reconciled to the assessment record',
    ok: true,
  },
  {
    label: 'Antipsychotic use, long stay',
    value: '13.1%',
    source: 'Medication record, excluding the three protected diagnoses',
    ok: true,
  },
  {
    label: 'Change in condition reviews opened and closed within the quarter',
    value: '318 opened, 301 closed',
    source: 'Review records, both licence types',
    against: 'Includes the reviews that closed as no change, which are 34 percent of the total',
    ok: true,
  },
]

export const REGULATORY = [
  {
    campus: 'Camden Oaks',
    item: 'F689, free of accident hazards and adequate supervision',
    scope: 'Scope and severity D, no actual harm with potential for more than minimal harm',
    status: 'Plan of correction accepted. Revisit completed, deficiency cleared.',
  },
  {
    campus: 'Willow Run',
    item: 'F657, care plan timing and revision',
    scope: 'Scope and severity D',
    status: 'Plan of correction accepted. Monthly audit continuing through Q4.',
  },
  {
    campus: 'Alder Grove',
    item: 'No deficiencies cited at the standard survey',
    scope: 'Standard survey completed in the quarter',
    status: 'No plan of correction required.',
  },
]

export const QAPI = {
  heading: 'Performance improvement project, opened this quarter',
  title: 'Unplanned transfers carrying a prior signal chain',
  aim: 'Reduce transfers that carried three or more documented signals across five or more days, by opening a change in condition review before the fifth day.',
  rootCause:
    'The 24 hour report is a twenty four hour window by construction and therefore holds no memory across days. Residents outside skilled nursing have no equivalent document at all, which is roughly two thirds of the group census.',
  measure: 'Reviews opened before day five, as a share of chains eventually reaching transfer.',
  evidence:
    'One dated example from 4 August 2026 is attached at the appendix, showing a chain of twelve entries across eight logs opened for review on day nineteen.',
}

/** The line that stops a sophisticated operator wincing. */
export const DEAD_RULE = {
  heading: 'What is deliberately not in this pack',
  text: 'The federal minimum staffing rule is not here. It was vacated in 2025, repealed with effect from December 2025, and Congress has barred reissue until 2034. Reporting against a standard that does not exist would be noise. California Health and Safety Code 1276.5 is the binding floor, and this pack reports against it every day of the quarter, including the days we did not meet it.',
}

export const PROVENANCE = {
  heading: 'How to read this pack',
  lines: [
    'Every figure above carries the record it came from. Nothing is keyed in and nothing is adjusted.',
    'The eleven days below the staffing floor are listed individually rather than absorbed into the quarterly average, because a quarterly average is not what the floor is measured against.',
    'Almanac assembles this. It does not select the window, choose which campuses appear or decide what counts as an exception. Those are fixed in the reporting definition and the definition is printed in the appendix.',
  ],
}

export const staffingExceptions = () => STAFFING.filter((f) => !f.ok).length
