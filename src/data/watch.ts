// This morning's watch list at Alder Grove, and the reasoning behind its length.
//
// THE CUT IS CAPACITY BOUNDED, NOT THRESHOLD BOUNDED. The stand up runs 08:45 to
// 09:15 and the watch list gets twenty of those thirty minutes. A name that
// produces an actual decision takes about two minutes. So the list is nine names
// because the morning is thirty minutes long, not because nine residents crossed
// a score. If the room grows, the cut moves. It is a promise about the DON's
// morning rather than a measurement.
//
// AND THE RANKING RULE: rank by how little of it is already owned, not by
// severity. The 24 hour report already routes the loud things. A witnessed fall
// with a skin tear has a unit manager on it. A new pressure injury has a wound
// nurse and a clock on it. Marguerite Ellison has nobody, which is why she is
// first while two objectively sicker residents are not on the list at all.

export type Rung = 'baseline' | 'change' | 'acute'

export interface WatchRow {
  rank: number
  name: string
  age: number
  unit: string
  level: 'SNF' | 'AL' | 'IL'
  rung: Rung
  /** Why the name is here, in one line, always citing what it rests on. */
  why: string
  /** Who already has it, if anyone. Blank is the point. */
  owner: string | null
  /** Whether this resident appears anywhere on the 24 hour report. */
  onReport: boolean
  heroLink?: boolean
}

export const WATCH: WatchRow[] = [
  {
    rank: 1,
    name: 'Marguerite Ellison',
    age: 84,
    unit: 'AL 214',
    level: 'AL',
    rung: 'change',
    why: 'Twelve entries across eight logs in nineteen days. Seven sat under a rule that did not fire, five under no rule at all. Service plan is five months old and describes a different person.',
    owner: null,
    onReport: false,
    heroLink: true,
  },
  {
    rank: 2,
    name: 'Yvonne Castellano',
    age: 91,
    unit: 'AL 108',
    level: 'AL',
    rung: 'change',
    why: 'Three doses of as needed analgesia in forty eight hours, which is new for her. No pain score recorded after any of the three.',
    owner: null,
    onReport: false,
  },
  {
    rank: 3,
    name: 'Warren Adeyemi',
    age: 81,
    unit: 'SNF 112',
    level: 'SNF',
    rung: 'acute',
    why: 'Day three of empiric antibiotics. Two temperatures more than two degrees over his own baseline, both under the 100.4 call parameter. Intake at forty percent.',
    owner: 'Rosa Villareal, RN, DON. Provider notified 06:20.',
    onReport: true,
  },
  {
    rank: 4,
    name: 'Delphine Okoro',
    age: 88,
    unit: 'AL 131',
    level: 'AL',
    rung: 'change',
    why: 'Weight down 5.8 percent in twenty seven days, which is over the five percent rule rather than under it. Supplement declined six of nine offers.',
    owner: 'Priya Raman, LVN. Physician review requested 1 Aug.',
    onReport: false,
  },
  {
    rank: 5,
    name: 'Rosalind Fenn',
    age: 87,
    unit: 'AL 226',
    level: 'AL',
    rung: 'change',
    why: 'Sleep disruption logged five of seven nights. Night staff recorded her in the lobby twice after midnight, both times returned to her apartment without incident.',
    owner: null,
    onReport: false,
  },
  {
    rank: 6,
    name: 'Stanley Prewitt',
    age: 76,
    unit: 'SNF 140',
    level: 'SNF',
    rung: 'change',
    why: 'Second unwitnessed fall in nine days. Neurological checks complete and within normal limits, post fall huddle documented.',
    owner: 'Unit manager. F689 investigation open since 30 Jul.',
    onReport: true,
  },
  {
    rank: 7,
    name: 'Theodore Ruiz',
    age: 74,
    unit: 'SNF 133',
    level: 'SNF',
    rung: 'change',
    why: 'Antipsychotic on board ninety four days with no gradual dose reduction attempt documented, which is an F758 exposure before it is a clinical question.',
    owner: null,
    onReport: false,
  },
  {
    rank: 8,
    name: 'Alvin Brackett',
    age: 83,
    unit: 'SNF 121',
    level: 'SNF',
    rung: 'baseline',
    why: 'Section GG transfer performance coded 04 on the five day and 03 on the fourteen day. A two assessment descent, not yet a significant change.',
    owner: 'Teresa Nolan, RN, MDS Coordinator.',
    onReport: false,
  },
  {
    rank: 9,
    name: 'Nadine Hollister',
    age: 90,
    unit: 'IL 312',
    level: 'IL',
    rung: 'baseline',
    why: 'Two missed meal plan collections and a welfare check requested by a neighbour. Independent living, so there is no care record here at all and nothing further to read.',
    owner: null,
    onReport: false,
  },
]

/** Louder things that are deliberately NOT on the list, and why. */
export const BELOW_THE_LINE = [
  {
    what: 'Witnessed fall with a skin tear, SNF 118, yesterday 16:20',
    why: 'Unit manager assigned at the time of the fall. Treatment recorded, family notified, huddle done. It is loud and it is finished.',
  },
  {
    what: 'New stage two pressure injury, SNF 104, identified 2 Aug',
    why: 'Wound nurse assigned, weekly measurement scheduled, and an F686 clock already running. Naming it here would cost the names above it their meaning.',
  },
  {
    what: 'New antibiotic started this morning, SNF 127',
    why: 'Ordered at 07:05, on the report, provider aware. Day one of an antibiotic is not a signal. Day six with nothing confirmed is.',
  },
  {
    what: 'Sixty one residents with at least one entry worth reading',
    why: 'They stay on the record and they are one click away. They are not flagged, because flagging sixty one names is the same as flagging none.',
  },
]

/** Yesterday, disclosed on screen, including the ones that closed as nothing. */
export const YESTERDAY = {
  date: 'Monday 3 August',
  flagged: 9,
  producedAction: 5,
  closedAsStable: 3,
  stillOpen: 1,
  transfersAmongFlagged: 0,
  transfersAmongUnflagged: 1,
  unflaggedTransferReason:
    'A dialysis access failure, which is a scheduled treatment complication and is not what this layer is for.',
  almanacLine:
    'About one in three of these closes as nothing. That is the price of the cut. If it were zero I would have set the bar so high that I was only telling you things you already knew.',
}

/** Minutes arithmetic, derived, so the cut can be argued in the room. A buyer
 *  does this division in his head while you are talking, so it has to come out
 *  at the length of the list beside it. */
export const CAPACITY = {
  standUpMinutes: 30,
  minutesForWatch: 18,
  minutesPerName: 2,
}

/** How many names a stand up of a given length could hold, keeping the same
 *  share of the meeting back for the rest of the report. */
export const namesAt = (standUpMinutes: number) =>
  Math.floor(
    (standUpMinutes - (CAPACITY.standUpMinutes - CAPACITY.minutesForWatch)) /
      CAPACITY.minutesPerName,
  )

export const namesTheMorningHolds = () => namesAt(CAPACITY.standUpMinutes)

export const unowned = () => WATCH.filter((w) => w.owner === null).length

export const notOnReport = () => WATCH.filter((w) => !w.onReport).length

export const byRung = (rung: Rung) => WATCH.filter((w) => w.rung === rung).length

export const RUNG_LABEL: Record<Rung, string> = {
  baseline: 'Baseline',
  change: 'Change in condition',
  acute: 'Acute',
}
