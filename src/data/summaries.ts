// Summaries written for a role rather than for a database.
//
// The rule that makes these worth reading: highlight what changed and what is
// unresolved, never repeat every note in the system. A summary that restates the
// record is just the record again, at which point the reader goes back to the
// record and stops opening the summary.
//
// Each one is a different length on purpose. A shift handoff is read standing up
// in ninety seconds. A regional weekly is read sitting down.

export interface Summary {
  id: string
  label: string
  audience: string
  cadence: string
  readIn: string
  lines: string[]
  unresolved: string[]
  /** What the reader is actually being asked to do. */
  asks: string[]
}

export const SUMMARIES: Summary[] = [
  {
    id: 'handoff',
    label: 'Shift handoff',
    audience: 'Oncoming care staff, assisted living',
    cadence: 'Every shift change',
    readIn: '90 seconds',
    lines: [
      'Apartment 214, Marguerite Ellison, under review today. Record whether she comes to dinner and roughly how much she eats.',
      'Apartment 108, Yvonne Castellano, three as needed analgesia doses in forty eight hours. Record a pain score after any dose, which has not been happening.',
      'Apartment 226, Rosalind Fenn, found in the lobby twice after midnight this week. Night staff to note the time if it happens again.',
    ],
    unresolved: ['Marguerite Ellison has no vital signs recorded since February'],
    asks: ['Observe and record. No changes to anybody’s routine today.'],
  },
  {
    id: 'don',
    label: 'Director of Nursing, morning',
    audience: 'Rosa Villareal, RN',
    cadence: 'Daily before the stand up',
    readIn: '3 minutes',
    lines: [
      'Nine names on the watch list, four of them outside skilled nursing and owned by the Wellness Director.',
      'Stanley Prewitt, SNF 140, second unwitnessed fall in nine days. Neurological checks in progress. The environmental check raised after the first fall is still open.',
      'Warren Adeyemi, SNF 112, day three of empiric antibiotics with two temperatures over his own baseline and both under the call parameter. Provider notified 06:20.',
      'One admission overnight, one transfer out for a dialysis access failure.',
    ],
    unresolved: [
      'Environmental check overdue since 3 August',
      'Theodore Ruiz at ninety four days on an antipsychotic with no dose reduction attempt documented',
    ],
    asks: ['Assign the medication review for Stanley Prewitt', 'Decide whether Theodore Ruiz goes to the next committee'],
  },
  {
    id: 'admin',
    label: 'Administrator, daily',
    audience: 'Curtis Nakamura, Executive Director',
    cadence: 'Daily',
    readIn: '3 minutes',
    lines: [
      'Census 216 of 240, occupancy 90 percent. One admission, no discharges.',
      'Seven incidents in the last seven days, one of which is a repeat for the same resident.',
      'Four service plan reviews past due on the assisted living side, which is the highest it has been this quarter.',
      'Three family updates drafted and waiting on your approval, one of them for a resident whose daughter has not been told about a fall on 31 July.',
    ],
    unresolved: ['Six open shifts in the next seven days', 'One maintenance action overdue since 3 August'],
    asks: ['Approve or amend three family updates', 'Decide on the reappraisal for apartment 214'],
  },
  {
    id: 'regional',
    label: 'Regional leadership, weekly',
    audience: 'Denise Ashford, Regional Director',
    cadence: 'Weekly',
    readIn: '6 minutes',
    lines: [
      'Group census 1,074 of 1,210 licensed, occupancy 89 percent across eight campuses.',
      'Camden Oaks is the campus that needs a call. Eleven open shifts in the next seven days, seven assessments past due and six follow up tasks overdue, all the highest in the group.',
      'Willow Run sits below the California nursing hours floor on a quarterly average and is reported as such in the pack rather than absorbed into it.',
      'Forty residents on watch lists group wide, which is one in twenty seven, and no campus is above five percent of its own census.',
    ],
    unresolved: [
      'Camden Oaks staffing, unresolved for three weeks',
      'Twenty two of sixty five July transfers carried a documented signal chain beforehand',
    ],
    asks: ['Call Camden Oaks', 'Agree whether the transfer replay becomes a standing measure'],
  },
  {
    id: 'change',
    label: 'Resident change',
    audience: 'Anyone opening a resident record',
    cadence: 'On change',
    readIn: '45 seconds',
    lines: [
      'Marguerite Ellison, apartment 214. Since her last service plan review on 11 February, three entries describe assistance she did not previously need.',
      'In the last nineteen days: two refused evening doses, dining attendance down from seven of seven to three of seven, one unwitnessed fall, a grab bar request, two missed activity sessions and a note describing repeated disorientation to day.',
      'Nothing in her record has moved in the other direction.',
    ],
    unresolved: ['No vital signs since February', 'An outside cardiology prescription reported on 30 July that never reached the medication record'],
    asks: ['Physician review', 'Service plan reappraisal'],
  },
  {
    id: 'incident',
    label: 'Incident follow up',
    audience: 'Curtis Nakamura and Rosa Villareal',
    cadence: 'Until closed',
    readIn: '1 minute',
    lines: [
      'INC 2026 0804 011, Stanley Prewitt, SNF 140, unwitnessed fall at 02:15.',
      'Four actions assigned. Two complete, one in progress, one overdue.',
      'The overdue one is an environmental check raised after his first fall on 26 July and never closed.',
    ],
    unresolved: ['Environmental check, overdue since 3 August', 'Medication review not started, due 5 August'],
    asks: ['Close the environmental check today', 'Confirm the medication review is booked'],
  },
]

export const summaryById = (id: string) => SUMMARIES.find((s) => s.id === id) ?? SUMMARIES[0]

export const totalUnresolved = () => SUMMARIES.reduce((t, s) => t + s.unresolved.length, 0)
