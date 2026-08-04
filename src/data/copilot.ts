// Almanac, and the two things it will not do.
//
// The refusals are the product working, not a caveat on the end of it. In a
// clinical setting an assistant that will answer anything is an assistant nobody
// senior will let near a resident. Both refusals below name a specific human who
// owns the decision, because naming a principle is not the same as naming a
// person, and only one of those is useful at 08:45 on a Tuesday.

export interface Turn {
  q: string
  lead: string
  body: string[]
  /** What the answer rests on. Every answer has one. */
  evidence?: { label: string; detail: string }[]
  /** A refusal, rendered in the dashed block with its owners. */
  declines?: boolean
  owners?: { name: string; role: string; owns: string }[]
  /** What it offers instead of the thing it would not do. */
  offer?: string
  /** Walks the demo to another screen. */
  action?: { label: string; to: string }
  /** Reveals the generated family letter. */
  artifact?: boolean
}

export const SUGGESTED = [
  'Why is Marguerite Ellison first this morning?',
  'Does she have a urinary tract infection, and should we change her metoprolol?',
  'Has anything like this happened to her before?',
  'Should we move her to the skilled side?',
  'Which facilities have the most overdue follow ups?',
  'Which facility has the greatest staffing gap?',
  'Which incidents are still unresolved?',
  'Which residents had medication changes this week?',
  'How many residents across the group look like this?',
  'Draft the note to her daughter.',
  'Which part of this should we test first?',
]

export const SCRIPT: Turn[] = [
  {
    q: 'Why is Marguerite Ellison first this morning?',
    lead: 'Because nobody has her, and because nothing fired.',
    body: [
      'Twelve entries across eight logs in nineteen days, written by six people over three shifts. Seven of the twelve sat under a rule that did not reach its threshold. Five sat under no rule at all, because dining attendance, activities attendance and work orders are not monitored fields anywhere in assisted living.',
      'She is first rather than the sickest resident in the building because the ranking is by how little of this is already owned. Warren Adeyemi is more acutely unwell and he is third, because his provider was notified at 06:20 and the DON has him. Marguerite has nobody, no owner, no open review and no scheduled touchpoint before her service plan comes due on 11 August.',
      'She is also not on the 24 hour report, and she never has been. That document covers skilled nursing. She lives in an apartment on the other side of the same campus.',
    ],
    evidence: [
      { label: 'Twelve entries, 16 Jul to 3 Aug', detail: 'Dining, medication pass, activities, care aide notes, work orders, front desk, incidents and the monthly weight' },
      { label: 'Service plan reviewed 11 Feb 2026', detail: 'Reads independent with ambulation, no assistance with transfers or bathing. Three entries since 23 July describe otherwise.' },
      { label: 'Weight 142.9 lb from 148.6 lb', detail: '3.8 percent over thirty one days, against a five percent in thirty days rule' },
    ],
    action: { label: 'Open her record', to: '/resident' },
  },
  {
    q: 'Does she have a urinary tract infection, and should we change her metoprolol?',
    lead: 'I will not answer either half of that.',
    declines: true,
    body: [
      'Whether she has an infection is a diagnosis, and I do not make diagnoses. Whether the metoprolol should change is a prescribing decision, and I do not make those either.',
      'It is not only that I am not permitted to. There is nothing in this record that could settle either question. She has had no vital signs taken since her annual in February, no laboratory work at all, and no cognitive screen in twenty nine months. The cardiology prescription her daughter mentioned at the desk on 30 July has never reached the medication record, so I cannot even tell you what she is currently taking.',
      'What I will say is narrower, and it is a statement about the record rather than about her. Over nineteen days, every entry that moved has moved in the same direction, and the document that governs her care describes a resident who no longer matches the notes.',
    ],
    owners: [
      { name: 'Alan Whitfield, MD', role: 'Her own primary care physician, in the community', owns: 'Any diagnosis, and any change to her medication' },
      { name: 'Priya Raman, LVN', role: 'Wellness Director, Alder Grove', owns: 'Whether the service plan is reappraised, and what is asked of the physician' },
    ],
    offer:
      'I have put an SBAR in front of Priya Raman naming the four things that would settle it. It is unsent. She sends it or she does not.',
    action: { label: 'See the unsent drafts', to: '/notification' },
  },
  {
    q: 'Has anything like this happened to her before?',
    lead: 'Yes, and it is in your own records at a different campus.',
    body: [
      'She had a skilled stay at Sycamore Bend from 12 to 29 November 2025, seventeen days of rehabilitation after a left wrist fracture. On day three the notes record brief overnight confusion that resolved by morning with no cause identified. She was discharged on metoprolol.',
      'Nobody on the assisted living side at Alder Grove has seen that. It is a different campus, a different licence type and a different chart. The wrist fracture came with her because it was on the transfer paperwork. The overnight confusion did not, because it was a line in a progress note that resolved before anyone wrote it up as anything.',
      'This is the part that is actually about coordinating care across facilities. It is not a comparison of one campus against another. It is that the history follows the person, or it does not follow at all.',
    ],
    evidence: [
      { label: 'Sycamore Bend, 12 to 29 Nov 2025', detail: 'Skilled rehabilitation, left wrist fracture' },
      { label: 'Day three progress note', detail: 'Brief overnight confusion, resolved by morning, no cause identified' },
      { label: 'Discharge medication', detail: 'Metoprolol, which is the same medication refused twice in the past three weeks' },
    ],
  },
  {
    q: 'Should we move her to the skilled side?',
    lead: 'That is a level of care determination, and it is not mine to make.',
    declines: true,
    body: [
      'A residential care facility for the elderly may not retain a resident whose needs exceed what the licence permits, and deciding where that line falls for a particular person is a determination made by the administrator with a physician. It requires an appraisal, and an appraisal requires somebody to go to the apartment and assess her.',
      'I can tell you that her service plan no longer matches her notes and that a reappraisal is due on the record. I cannot tell you what the reappraisal will find, and I should not be the reason a resident moves out of her own apartment.',
    ],
    owners: [
      { name: 'Curtis Nakamura', role: 'Executive Director, Alder Grove', owns: 'The level of care determination and notification of the responsible party' },
      { name: 'Priya Raman, LVN', role: 'Wellness Director, Alder Grove', owns: 'The reappraisal itself' },
    ],
    offer:
      'What I can do is make sure the appraisal happens with the whole nineteen days in front of it, including the November 2025 stay that is not in her Alder Grove chart.',
  },
  {
    q: 'How many residents across the group look like this?',
    lead: 'Forty this morning, out of one thousand and seventy four.',
    body: [
      'That is roughly one in twenty seven. The number is set by how long your stand ups run, not by a score. Each campus gets a list its morning can actually hold, which at Alder Grove is nine names in the twenty minutes the watch list gets out of a thirty minute stand up. If the room grew, the cut would move.',
      'On July, across all eight campuses, there were sixty five unplanned transfers. Replaying the records backwards, twenty two of the sixty five carried three or more documented signals spanning five or more days before the transfer. I am not claiming twenty two were preventable. I am saying twenty two were legible in advance and nothing was reading them.',
    ],
    evidence: [
      { label: 'Forty flagged, 1,074 residents', detail: 'No campus above five percent of its own census' },
      { label: 'Two thirds of the group is outside the report', detail: 'Assisted living and independent living have no 24 hour report of any kind' },
    ],
    action: { label: 'See the group view', to: '/watch' },
  },
  {
    q: 'Draft the note to her daughter.',
    lead: 'Drafted. It is held, and Curtis Nakamura sends it.',
    body: [
      'It says what was noticed, what is being done about it and what we are asking her for. It does not speculate about a cause, because speculating to a family is how you lose one.',
      'It also tells her about the fall on the night of 31 July. Her mother asked us not to call at the time and that was respected, but a daughter finding out about a fall three weeks later from her mother is worse than hearing it from the Executive Director today.',
    ],
    artifact: true,
    action: { label: 'Open the drafts', to: '/notification' },
  },
]


// --- Operational questions, section 11 -------------------------------------
// Leadership asks aggregate questions, not clinical ones, and every answer has
// to land on a record they can open rather than a number they have to trust.

SCRIPT.push(
  {
    q: 'Which facilities have the most overdue follow ups?',
    lead: 'Camden Oaks, and it is not close.',
    body: [
      'Camden Oaks has seven assessments past due and six follow up tasks overdue, both the highest in the group. Willow Run is next with five and three. Kerman Row and Reedley Commons have none of either.',
      'The two are usually the same story. A campus that is behind on assessments is generally a campus that is short of people, and Camden Oaks also has the most open shifts in the group.',
    ],
    evidence: [
      { label: 'Camden Oaks', detail: '7 assessments past due, 6 tasks overdue, 11 open shifts in the next seven days' },
      { label: 'Willow Run', detail: '5 assessments past due, 3 tasks overdue, 8 open shifts' },
      { label: 'Kerman Row and Reedley Commons', detail: 'Nothing overdue at either' },
    ],
    action: { label: 'Open the group view', to: '/' },
  },
  {
    q: 'Which facility has the greatest staffing gap?',
    lead: 'Camden Oaks, with eleven open shifts in the next seven days.',
    body: [
      'Camden Oaks is at 3.52 nursing hours per resident day against the California floor of 3.5, so it is above the line and has the least room in the group. Willow Run is at 3.49 and is below it on a quarterly average, which is reported as an exception in the pack rather than absorbed into it.',
      'I am reporting hours and open shifts. I am not telling you the building is unsafe, because that is a judgement about a specific shift on a specific unit and it belongs to the people who were on it.',
    ],
    evidence: [
      { label: 'Camden Oaks', detail: '11 open shifts, 3.52 nursing hours per resident day' },
      { label: 'Willow Run', detail: '8 open shifts, 3.49 hours, below the 3.5 floor on a quarterly average' },
      { label: 'The binding standard', detail: 'California Health and Safety Code 1276.5. The federal rule was repealed in December 2025.' },
    ],
    action: { label: 'See the quarterly pack', to: '/reporting' },
  },
  {
    q: 'Which incidents are still unresolved?',
    lead: 'One at Alder Grove, and the open piece of it is nine days old.',
    body: [
      'INC 2026 0804 011, Stanley Prewitt, SNF 140, unwitnessed fall at 02:15 this morning. Four actions assigned, two complete, one in progress and one overdue.',
      'The overdue one is an environmental check of his bathroom that was raised after his first fall on 26 July and never closed. It has been escalated to the administrator this morning.',
    ],
    evidence: [
      { label: 'Two complete', detail: 'Post fall huddle at 07:05, responsible party notified at 09:40' },
      { label: 'One in progress', detail: 'Neurological checks, six of nine done, all within normal limits' },
      { label: 'One overdue', detail: 'Environmental check, due 3 August, raised after the 26 July fall' },
    ],
    action: { label: 'Open the incident', to: '/followup' },
  },
  {
    q: 'Which residents had medication changes this week?',
    lead: 'Twenty four across the group, and five of them have no review recorded.',
    body: [
      'Alder Grove has five awaiting review, Camden Oaks six, Sycamore Bend four. The rest are spread across the other five campuses.',
      'The one worth your attention is not on that list. Marguerite Ellison in apartment 214 had a medication change her daughter reported at the front desk on 30 July, from a cardiologist outside the building. It never reached the medication record, so it does not count as a change here and it does not count anywhere else either.',
    ],
    evidence: [
      { label: '24 changes this week', detail: 'Across eight campuses, from the medication record' },
      { label: '5 with no review recorded', detail: 'At Alder Grove alone' },
      { label: 'One that is invisible', detail: 'Reported verbally at a front desk on 30 July, never entered' },
    ],
    action: { label: 'Open her record', to: '/resident' },
  },
  {
    q: 'Which part of this should we test first?',
    lead: 'The assisted living side of one campus, for one quarter.',
    body: [
      'It is the part with no equivalent today. Your skilled side already has a 24 hour report, a stand up and an assessment schedule, so a pilot there competes with something that already works. Assisted living has a six month service plan and free text, which is the whole reason nothing fires.',
      'It is also the smallest integration. Service plans, the medication pass, incident reports and the dining, activities and front desk logs. No assessment schedule, no billing, and nothing asked of care staff.',
      'What I would not start with is the executive view. It is the most useful screen in the product and the least useful pilot, because it needs all eight campuses connected before it says anything true.',
    ],
    evidence: [
      { label: 'Scope', detail: 'One campus, assisted and independent living, around 160 residents' },
      { label: 'The measure that should move first', detail: 'Days between the first recorded signal and a review being opened' },
      { label: 'What would count as failure', detail: 'Care staff being asked to record anything new, or nothing opening earlier than it used to' },
    ],
  },
)

export const FALLBACK: Turn = {
  q: '',
  lead: 'I only know this morning at Alder Grove.',
  body: [
    'This is a demonstration built on one invented campus on one invented Tuesday. I can answer on Marguerite Ellison, the watch list, the 24 hour report, the group figures and the quarterly pack.',
    'Ask me one of the questions on the right, or ask about a resident by name.',
  ],
}

/** Word overlap match, so free typing lands somewhere sensible. */
export const findTurn = (q: string): Turn => {
  const norm = q.toLowerCase().trim()
  const exact = SCRIPT.find((t) => t.q.toLowerCase() === norm)
  if (exact) return exact
  const words = norm.split(/\s+/).filter((w) => w.length > 4)
  let best: Turn | null = null
  let bestScore = 0
  for (const t of SCRIPT) {
    const hay = t.q.toLowerCase()
    const score = words.filter((w) => hay.includes(w)).length
    if (score > bestScore) {
      bestScore = score
      best = t
    }
  }
  return bestScore >= 1 && best ? best : FALLBACK
}

export const refusalCount = () => SCRIPT.filter((t) => t.declines).length
