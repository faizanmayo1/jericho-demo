// The 24 hour report for Alder Grove, covering 08:00 Monday to 08:00 Tuesday.
//
// This is the single most important artifact in the building. It is compiled by
// the DON or the nursing supervisor and read at the morning stand up to the
// administrator, the MDS coordinator, therapy, dietary, social services and
// activities. Today it is assembled by hand out of six separate exports.
//
// It renders as a DOCUMENT, not as tiles. Dated sections, real rows, numbers
// inside the prose rather than in cards above it. Two things are true about it
// at once, and holding both is the whole argument:
//
//   1. It is correct. Everything on it was seen, worked and closed properly.
//   2. It has no memory. It is a twenty four hour window by construction, so a
//      resident who appears three times in nine days, in three different
//      sections, never appears as a trend. Nobody owns the ninth day.
//
// And it covers the skilled side only, because that is what it has always been.

export interface ReportRow {
  unit: string
  name: string
  detail: string
  /** What Almanac wrote in the margin. Nothing else on this screen is from
   *  Almanac, and the margin is the only place the report gains a memory. */
  margin?: string
}

export interface ReportSection {
  title: string
  /** The count is derived from rows, never typed. */
  rows: ReportRow[]
  /** Shown when a section is legitimately empty, the way a real report does. */
  emptyNote?: string
}

export const REPORT = {
  campus: 'Alder Grove',
  covers: '08:00 Monday 3 August to 08:00 Tuesday 4 August 2026',
  compiledBy: 'Rosa Villareal, RN, Director of Nursing',
  assembledAt: '08:12',
  scope: 'Skilled nursing, 52 residents',
}

export const SECTIONS: ReportSection[] = [
  {
    title: 'Admissions',
    rows: [
      {
        unit: 'SNF 127',
        name: 'Everett Lindqvist',
        detail: 'Admitted 14:20 from Cottonwood Regional, Medicare Part A, right total knee. Five day assessment reference date set for 8 Aug.',
      },
    ],
  },
  {
    title: 'Returns from hospital',
    rows: [],
    emptyNote: 'None in the period.',
  },
  {
    title: 'Transfers out',
    rows: [
      {
        unit: 'SNF 119',
        name: 'Corinne Baptiste',
        detail: 'Sent to emergency 19:40 for dialysis access failure. Scheduled treatment complication. Family notified 19:52.',
      },
    ],
  },
  {
    title: 'Falls',
    rows: [
      {
        unit: 'SNF 140',
        name: 'Stanley Prewitt',
        detail: 'Unwitnessed, bathroom, 02:15. No apparent injury. Neurological checks every fifteen minutes for one hour then each shift, all within normal limits. Post fall huddle documented 07:05.',
        margin: 'Third appearance in nine days. 26 Jul under Falls, 30 Jul under New orders, today under Falls.',
      },
      {
        unit: 'SNF 118',
        name: 'Halvard Osgood',
        detail: 'Witnessed, dining room, 16:20. Skin tear to left forearm, dressed. Family notified 16:45. Unit manager assigned.',
      },
    ],
  },
  {
    title: 'New wounds and skin',
    rows: [
      {
        unit: 'SNF 104',
        name: 'Beatriz Cardenas',
        detail: 'Stage two pressure injury, left heel, identified 2 Aug. Wound nurse assigned, weekly measurement scheduled, offloading boot in place.',
      },
    ],
  },
  {
    title: 'New antibiotics and infections',
    rows: [
      {
        unit: 'SNF 112',
        name: 'Warren Adeyemi',
        detail: 'Day three of empiric cephalexin, suspected urinary source. Culture sent 1 Aug, still pending.',
        margin: 'Second appearance in six days. 30 Jul under New orders, today under New antibiotics. Two temperatures logged since, both over two degrees above his own baseline and both under the 100.4 call parameter.',
      },
      {
        unit: 'SNF 127',
        name: 'Everett Lindqvist',
        detail: 'Cefazolin on admission, surgical prophylaxis, three doses ordered.',
      },
    ],
  },
  {
    title: 'Weight changes',
    rows: [
      {
        unit: 'SNF 133',
        name: 'Theodore Ruiz',
        detail: 'Down 2.1 lb over the week. 1.4 percent, under the five percent in thirty days trigger.',
      },
    ],
  },
  {
    title: 'Medication errors',
    rows: [],
    emptyNote: 'None in the period.',
  },
  {
    title: 'Behaviours',
    rows: [
      {
        unit: 'SNF 133',
        name: 'Theodore Ruiz',
        detail: 'Calling out during the evening pass, redirected. No pharmacological intervention.',
        margin: 'Antipsychotic on board ninety four days with no gradual dose reduction attempt documented.',
      },
    ],
  },
]

/** The section the report has never had. */
export const THE_GAP = {
  title: 'Assisted living and independent living, same campus, same morning',
  before:
    'There is no such section. The 24 hour report is a skilled nursing document and it always has been. The residents on the other side of the campus have no equivalent anywhere.',
  after:
    'Almanac reads the assisted living and independent living logs on the same cycle and on the same page. Nothing was added to anybody’s shift to make that possible.',
  rows: [
    {
      unit: 'AL 214',
      name: 'Marguerite Ellison',
      detail: 'Twelve entries across eight logs in nineteen days. Seven sat under a rule that did not fire, five under no rule at all.',
      margin: 'First appearance anywhere. She has never been on a report, because there was never a report she could be on.',
    },
    {
      unit: 'AL 108',
      name: 'Yvonne Castellano',
      detail: 'Three doses of as needed analgesia in forty eight hours, new for her. No pain score recorded after any of them.',
    },
    {
      unit: 'AL 226',
      name: 'Rosalind Fenn',
      detail: 'Sleep disruption five of seven nights, twice recorded in the lobby after midnight.',
    },
    {
      unit: 'IL 312',
      name: 'Nadine Hollister',
      detail: 'Two missed meal plan collections and a welfare check requested by a neighbour.',
    },
  ] as ReportRow[],
}

// ---------------------------------------------------------------------------
// Derived
// ---------------------------------------------------------------------------

export const sectionCount = (s: ReportSection) => s.rows.length

export const reportRowCount = () => SECTIONS.reduce((t, s) => t + s.rows.length, 0)

export const marginMarks = () =>
  SECTIONS.reduce((t, s) => t + s.rows.filter((r) => r.margin).length, 0) +
  THE_GAP.rows.filter((r) => r.margin).length

/** How the report was put together before, and what that costs. */
export const ASSEMBLY = {
  exportsToday: 6,
  minutesByHand: 40,
  minutesAssembled: 0,
  note: 'Six exports, pulled and pasted before seven each morning. Almanac assembles the same document from the same records. It does not change what the report says. It changes who spends forty minutes making it, and it gives the document a memory it has never had.',
}
