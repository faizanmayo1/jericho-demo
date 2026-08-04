// Marguerite Ellison, and the nineteen days nobody assembled.
//
// The whole demo rests on one claim, so the claim has to survive an operator who
// ran fifty buildings. The claim is NOT "none of this was seen". Every one of
// these rows was seen by somebody. The claim is narrower and harder to argue
// with:
//
//   1. Every signal sat just UNDER its own rule, or under no rule at all. Each
//      row carries the rule it sat beneath, printed next to the value.
//   2. The 24 hour report is a skilled nursing artifact. Marguerite lives in
//      assisted living, so she was never on it. There is no equivalent document
//      for her at all.
//   3. Six people, eight logs, three shifts. Every one was seen. None were
//      assembled.
//
// She is a residential care facility for the elderly resident, licensed under
// CDSS, not a skilled nursing resident under CDPH. That distinction drives who
// may act and is the reason the refusal on the copilot screen is honest rather
// than decorative.

export interface Signal {
  id: string
  date: string
  time?: string
  /** The log it landed in. One lane on the convergence chart. */
  lane: string
  /** Who wrote it, and on which shift. Not one of them is a clinician. */
  author: string
  role: string
  shift: 'Day' | 'Eve' | 'Noc'
  /** What was recorded. Free text is quoted; measured values are stated. */
  entry: string
  quoted?: boolean
  /** The rule that would have escalated this, and why it did not fire. */
  rule: string
  /** Where the value sat against that rule, for the threshold line on the lane. */
  value?: string
  /** 0 to 1, height of the mark within its lane. */
  level: number
  /** True where the rule genuinely does not exist for this field. */
  noRule?: boolean
}

export const RESIDENT = {
  name: 'Marguerite Ellison',
  age: 84,
  unit: 'AL 214',
  campus: 'Alder Grove',
  level: 'AL' as const,
  licence: 'Residential care facility for the elderly, licensed by CDSS',
  movedIn: 'March 2023',
  responsibleParty: 'Diane Ward, daughter, Visalia',
  physician: 'Alan Whitfield, MD, community primary care',
  // The service plan is the governing document in assisted living, and it is a
  // six month cycle. Hers is five months old and describes a different person.
  servicePlan: {
    reviewed: '11 February 2026',
    nextDue: '11 August 2026',
    reads:
      'Ambulates independently. Medication management only. No assistance required with transfers, bathing or dressing.',
  },
  cognitiveScreen: 'At move in, March 2023. None since.',
}

/** The nineteen days, oldest first. */
export const SIGNALS: Signal[] = [
  {
    id: 's1',
    date: '2026-07-16',
    lane: 'Dining services',
    author: 'Marco Tenorio',
    role: 'Dining server',
    shift: 'Eve',
    entry: 'Missed dinner. Told me she was not hungry.',
    quoted: true,
    rule: 'Assisted living has no meal attendance rule. Weight is the monitored field, and it is weighed monthly.',
    value: 'Attendance 5 of 7 that week, from 7 of 7 in June',
    level: 0.42,
    noRule: true,
  },
  {
    id: 's2',
    date: '2026-07-19',
    time: '18:40',
    lane: 'Medication pass',
    author: 'Alina Boateng',
    role: 'Medication technician',
    shift: 'Eve',
    entry: 'Evening metoprolol refused. Resident said she felt light headed earlier.',
    rule: 'The pharmacy exception report escalates at three refusals of the same medication inside seven days.',
    value: 'First refusal',
    level: 0.33,
  },
  {
    id: 's3',
    date: '2026-07-21',
    lane: 'Activities sign in',
    author: 'Dee Whitlock',
    role: 'Activities assistant',
    shift: 'Day',
    entry: 'Absent from Tuesday chair exercise. First miss in eleven months.',
    rule: 'Activities attendance is not a monitored field in any care system. It is a sign in sheet.',
    value: 'First absence since Aug 2025',
    level: 0.5,
    noRule: true,
  },
  {
    id: 's4',
    date: '2026-07-23',
    lane: 'Care aide notes',
    author: 'Jonah Pike',
    role: 'Care aide',
    shift: 'Day',
    entry:
      'Held the rail the whole way down the hall. Asked for a hand getting into the shower. First time I have seen that from her.',
    quoted: true,
    rule: 'A change in assistance level requires a service plan update when it is recorded as a change. This was recorded as a shift note, which is free text and is not a service plan field.',
    value: 'Service plan still reads no assistance required',
    level: 0.68,
  },
  {
    id: 's5',
    date: '2026-07-25',
    lane: 'Work orders',
    author: 'Ray Solano',
    role: 'Maintenance',
    shift: 'Day',
    entry: 'Grab bar requested for bathroom. Resident says she feels unsteady standing.',
    quoted: true,
    rule: 'Work orders route to maintenance. Nothing on a work order routes to care staff.',
    value: 'Completed 28 Jul, closed',
    level: 0.55,
    noRule: true,
  },
  {
    id: 's6',
    date: '2026-07-27',
    time: '18:25',
    lane: 'Medication pass',
    author: 'Alina Boateng',
    role: 'Medication technician',
    shift: 'Eve',
    entry: 'Evening metoprolol refused again.',
    rule: 'Still two refusals, and the rule counts three inside seven days. These were eight days apart.',
    value: 'Second refusal, 8 days after the first',
    level: 0.46,
  },
  {
    id: 's7',
    date: '2026-07-28',
    lane: 'Activities sign in',
    author: 'Dee Whitlock',
    role: 'Activities assistant',
    shift: 'Day',
    entry: 'Absent again. Second consecutive Tuesday.',
    rule: 'Still not a monitored field.',
    value: 'Two consecutive absences',
    level: 0.62,
    noRule: true,
  },
  {
    id: 's8',
    date: '2026-07-30',
    time: '11:05',
    lane: 'Front desk log',
    author: 'Kim Halloran',
    role: 'Front desk',
    shift: 'Day',
    entry:
      'Daughter mentioned at the desk that her mother saw a cardiologist last week and came away with something new.',
    quoted: true,
    rule: 'An outside prescription reaches the campus record when the pharmacy is notified. This was mentioned to a receptionist.',
    value: 'Not in the medication record as of this morning',
    level: 0.74,
  },
  {
    id: 's9',
    date: '2026-08-01',
    time: '06:50',
    lane: 'Incident reports',
    author: 'Jonah Pike',
    role: 'Care aide',
    shift: 'Day',
    entry:
      'Resident reported she went down in the bathroom during the night. Unwitnessed. No apparent injury. Declined to have her daughter called.',
    rule: 'An unusual incident report to CDSS is required where there is injury requiring medical treatment. There was none, so no report was due. That was the correct call.',
    value: 'Logged, reviewed, closed same day',
    level: 0.86,
  },
  {
    id: 's10',
    date: '2026-08-02',
    lane: 'Monthly weight',
    author: 'Care staff',
    role: 'Monthly weight check',
    shift: 'Day',
    entry: 'Weight 142.9 lb, from 148.6 lb on 2 July.',
    rule: 'Significant weight loss is five percent in thirty days. This is 3.8 percent in thirty one days.',
    value: '3.8% in 31 days, against a 5% rule',
    level: 0.79,
  },
  {
    id: 's11',
    date: '2026-08-02',
    lane: 'Dining services',
    author: 'Marco Tenorio',
    role: 'Dining server',
    shift: 'Eve',
    entry: 'Down to three dinners this week.',
    quoted: true,
    rule: 'Still no meal attendance rule.',
    value: 'Attendance 3 of 7, from 7 of 7 in June',
    level: 0.82,
    noRule: true,
  },
  {
    id: 's12',
    date: '2026-08-03',
    time: '15:30',
    lane: 'Care aide notes',
    author: 'Jonah Pike',
    role: 'Care aide',
    shift: 'Day',
    entry: 'She asked me twice what day it was. Laughed it off both times.',
    quoted: true,
    rule: 'No cognitive screen is scheduled in assisted living outside the service plan cycle. Hers was at move in, in March 2023.',
    value: 'Last screen 29 months ago',
    level: 0.93,
  },
]

/** The lanes, in the order they stack on the convergence chart. */
export const LANES = [
  'Dining services',
  'Medication pass',
  'Activities sign in',
  'Care aide notes',
  'Work orders',
  'Front desk log',
  'Incident reports',
  'Monthly weight',
]

// ---------------------------------------------------------------------------
// Care level history. This is the cross level argument, and it is the reason
// the record is thin: she is in the sparsest documented level in the building.
// ---------------------------------------------------------------------------

export interface LevelSpan {
  level: 'IL' | 'AL' | 'SNF'
  campus: string
  from: string
  to: string
  months: number
  /** Documented entries per month at this level, of any kind. */
  touchesPerMonth: number
  note: string
}

export const LEVEL_HISTORY: LevelSpan[] = [
  {
    level: 'IL',
    campus: 'Alder Grove',
    from: 'Mar 2023',
    to: 'Nov 2025',
    months: 32,
    touchesPerMonth: 3,
    note: 'Independent apartment. A lease, a meal plan and a wellness check. No care record exists for this period because none was required.',
  },
  {
    level: 'SNF',
    campus: 'Sycamore Bend',
    from: '12 Nov 2025',
    to: '29 Nov 2025',
    months: 1,
    touchesPerMonth: 612,
    note: 'Seventeen days of skilled rehabilitation after a left wrist fracture. MDS 3.0 on the assessment schedule, daily charting, eMAR. The densest record she has ever had, at a different campus, under a different licence.',
  },
  {
    level: 'AL',
    campus: 'Alder Grove',
    from: 'Dec 2025',
    to: 'Today',
    months: 8,
    touchesPerMonth: 34,
    note: 'Assisted living. A six month service plan, a medication pass, and free text from people who are not clinicians. This is where she is, and it is where the record goes quiet.',
  },
]

/** The prior stay nobody at Alder Grove can see. */
export const PRIOR_STAY = {
  campus: 'Sycamore Bend',
  town: 'Clovis',
  dates: '12 to 29 November 2025',
  reason: 'Skilled rehabilitation after a left wrist fracture',
  buried:
    'Brief overnight confusion on day three, resolved by morning without intervention. No cause identified. Discharged on metoprolol.',
  why:
    'It is in the group record, at another campus, under a different licence type and a different chart. Nobody on the assisted living side at Alder Grove has ever seen it. The history follows the person, or it does not follow at all.',
}

// ---------------------------------------------------------------------------
// What Almanac says, and carefully does not say.
// ---------------------------------------------------------------------------

export const READ = {
  headline: 'Twelve entries, eight logs, six people, three shifts, nineteen days.',
  says: [
    'Every entry above was seen by the person who wrote it. Seven of the twelve sat under a rule that did not fire. Five sat under no rule at all, because the field they landed in is not monitored anywhere in assisted living.',
    'Her service plan was last reviewed on 11 February and describes a resident who ambulates independently and needs no assistance with transfers or bathing. Three separate entries since 23 July describe someone else.',
    'She is not on the 24 hour report. Nobody in assisted living is. The report is a skilled nursing document and she does not live on the skilled side.',
  ],
  refusesToSay:
    'What is causing this. That is a diagnosis, and there is nothing in this record that could settle it. No vital signs since her annual in February. No laboratory work. No cognitive screen in twenty nine months. No record of the cardiology prescription her daughter mentioned on 30 July.',
  wouldSettleIt: [
    'Vital signs including lying and standing blood pressure',
    'Medication reconciliation covering the outside cardiology prescription',
    'A cognitive screen, given the 3 August note and the November 2025 history',
    'A physician review, which in assisted living means her own doctor, not the campus',
  ],
  owners: [
    {
      name: 'Priya Raman, LVN',
      role: 'Wellness Director, Alder Grove',
      owns: 'Whether the service plan is reappraised, and whether her needs now exceed what a residential care facility may retain',
    },
    {
      name: 'Alan Whitfield, MD',
      role: 'Her own primary care physician, in the community',
      owns: 'Any diagnosis, and any change to her medication',
    },
    {
      name: 'Curtis Nakamura',
      role: 'Executive Director, Alder Grove',
      owns: 'Notification of the responsible party, and any change in level of care',
    },
  ],
}

/** Nineteen days between the first entry and this morning, derived not typed. */
export const windowDays = () => {
  const first = new Date(`${SIGNALS[0].date}T12:00:00`).getTime()
  const last = new Date('2026-08-04T12:00:00').getTime()
  return Math.round((last - first) / 86400000)
}

export const signalsUnderARule = () => SIGNALS.filter((s) => !s.noRule).length

export const signalsWithNoRule = () => SIGNALS.filter((s) => s.noRule).length

export const distinctAuthors = () =>
  Array.from(new Set(SIGNALS.map((s) => s.author))).filter((a) => a !== 'Care staff').length

export const distinctLanes = () => Array.from(new Set(SIGNALS.map((s) => s.lane))).length

// ---------------------------------------------------------------------------
// The rest of the 360 view. Care plan, history, tasks, communication and the
// people who are actually responsible for her.
// ---------------------------------------------------------------------------

export const CARE_PLAN = {
  status: 'Current, and five months old',
  goals: [
    { goal: 'Maintain independent ambulation within the apartment and to the dining room', set: '11 Feb 2026', state: 'Contradicted by three entries since 23 July' },
    { goal: 'Medication management by campus staff, evening and morning pass', set: '11 Feb 2026', state: 'Two evening refusals in the window' },
    { goal: 'Attend at least two social activities each week', set: '11 Feb 2026', state: 'No attendance recorded for two consecutive weeks' },
    { goal: 'Maintain weight within 5 percent of 148 lb', set: '11 Feb 2026', state: 'At 142.9 lb, a 3.8 percent fall over thirty one days' },
  ],
  note:
    'Three of four goals are no longer being met, and not one of the misses reached a threshold that would have opened a review. The plan is not wrong. It is simply describing February.',
}

export const HOSPITALISATIONS = [
  {
    when: '12 to 29 November 2025',
    where: 'Sycamore Bend, skilled nursing',
    why: 'Rehabilitation following a left wrist fracture',
    outcome: 'Discharged back to assisted living at Alder Grove on metoprolol',
    visible: false,
  },
  {
    when: '8 to 11 November 2025',
    where: 'Acute hospital, outside the group',
    why: 'Left wrist fracture following a fall at home in her apartment',
    outcome: 'Surgical fixation, discharged to skilled rehabilitation',
    visible: false,
  },
]

export const RESIDENT_TASKS = [
  { what: 'Service plan reappraisal following a change in condition', owner: 'Priya Raman, LVN', due: '5 Aug', state: 'Open' },
  { what: 'Physician review request, four specific questions attached', owner: 'Priya Raman, LVN', due: '4 Aug', state: 'Open' },
  { what: 'Family update awaiting approval', owner: 'Curtis Nakamura', due: '4 Aug', state: 'Open' },
  { what: 'Obtain the outside cardiology prescription from the family', owner: 'Kim Halloran', due: '5 Aug', state: 'Open' },
]

export const COMMS_HISTORY = [
  { when: '30 Jul 11:05', who: 'Kim Halloran, front desk', what: 'Daughter mentioned a new cardiology prescription at the desk. Logged, not routed.' },
  { when: '1 Aug 07:10', who: 'Jonah Pike, care aide', what: 'Resident declined to have her daughter called about the fall. Respected and recorded.' },
  { when: '18 Jul 16:20', who: 'Activities team', what: 'Routine monthly newsletter, sent to all responsible parties.' },
  { when: 'Today', who: 'Curtis Nakamura', what: 'Family update drafted by Almanac, held for approval. Not sent.' },
]

export const CARE_TEAM = [
  { name: 'Priya Raman, LVN', role: 'Wellness Director, assisted living', owns: 'Service plan and reappraisal' },
  { name: 'Curtis Nakamura', role: 'Executive Director', owns: 'Level of care and family notification' },
  { name: 'Alan Whitfield, MD', role: 'Her own physician, in the community', owns: 'Diagnosis and prescribing' },
  { name: 'Angela Pham, LCSW', role: 'Social services', owns: 'Family communication support' },
  { name: 'Jonah Pike', role: 'Care aide, day shift', owns: 'Daily assistance and shift notes' },
]

/** What changed since the previous shift, day and week. Section 6 asks for this
 *  explicitly, and the discipline is that it reports change rather than state. */
export const WHAT_CHANGED = [
  {
    period: 'Since the last shift',
    lines: ['One care aide note describing repeated disorientation to day, which is new.'],
  },
  {
    period: 'Since yesterday',
    lines: [
      'Monthly weight recorded at 142.9 lb, down 5.7 lb from 2 July.',
      'Dining attendance down to three of seven for the week.',
    ],
  },
  {
    period: 'Since last week',
    lines: [
      'One unwitnessed fall, no injury, reported the following morning.',
      'An outside cardiology prescription reported by her daughter that has not reached the medication record.',
      'A second refused evening dose.',
      'A second consecutive missed activity session.',
    ],
  },
]
