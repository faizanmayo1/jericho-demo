// What to test first.
//
// The requirements doc asks the demo to end with a view on which part makes most
// sense to pilot. Answering that with "all of it" is how a proposal dies in
// procurement, so this picks one thing, says what it would cost them, and names
// what would count as failure.
//
// The recommendation is deliberately the narrowest useful slice: the part with
// no integration dependency on the record system, at one campus, measured
// against something they already count.

export const RECOMMENDATION = {
  headline: 'Start with the assisted living side of one campus',
  why: [
    'It is the part with no equivalent today. The skilled side already has a 24 hour report, a stand up and an assessment schedule, so a pilot there competes with something that works. Assisted living has a six month service plan and free text, which is why nothing fires.',
    'It is the smallest integration. Service plans, the medication pass, incident reports and the dining, activities and front desk logs. No MDS, no assessment schedule, no billing.',
    'It is the fastest thing to judge. Within one quarter you either see reviews opening earlier than they used to or you do not.',
  ],
  shape: [
    { label: 'Scope', value: 'One campus, assisted and independent living only' },
    { label: 'Residents', value: 'Around 160 on one site' },
    { label: 'Length', value: 'One quarter, with a decision point at week six' },
    { label: 'People involved', value: 'The Wellness Director, the administrator, and whoever runs the morning' },
    { label: 'Asked of care staff', value: 'Nothing. No new fields, no new forms, no new screens' },
  ],
}

export const MEASURES = [
  {
    measure: 'Reviews opened earlier',
    how: 'Days between the first recorded signal and a review being opened, before and during.',
    honest: 'This is the one that should move first. If it does not move by week six, the rest will not follow.',
  },
  {
    measure: 'Watch list precision',
    how: 'Share of flagged residents that produced a care plan change or a new order.',
    honest: 'Expect roughly two in three. If it reaches five in five, the bar is set too high and it is only telling you what you already knew.',
  },
  {
    measure: 'Unplanned transfers carrying a prior signal chain',
    how: 'The same retrospective replay, run forward instead of backward.',
    honest: 'The slowest measure and the one most easily confounded. Worth tracking, not worth deciding on inside one quarter.',
  },
  {
    measure: 'Time spent assembling the morning',
    how: 'Minutes between the first export and the report being ready.',
    honest: 'The easiest to move and the least important. Include it because it is what the people doing it will notice first.',
  },
]

export const WOULD_FAIL = [
  'Care staff are asked to record anything new. If that happens the pilot has already failed, whatever the numbers say.',
  'The watch list is longer than the morning can hold, at which point people stop reading it and it becomes another report nobody opens.',
  'Flags arrive without the entries they rest on, because a clinician will not act on a score they cannot check.',
  'Nothing opens earlier. If reviews happen on the same day they would have anyway, the layer is describing the problem rather than changing it.',
]

export const NOT_FIRST = [
  { what: 'The executive multi facility view', why: 'It is the most useful screen in the product and the least useful pilot, because it needs all eight campuses connected before it says anything true.' },
  { what: 'The quarterly reporting pack', why: 'High value and entirely dependent on staffing and payroll integration, which is the slowest connection to make.' },
  { what: 'Task management', why: 'Worth having and easy to build. It is also the part most likely to duplicate something Jericho already does in another tool, and that is a conversation to have before building it, not after.' },
]
