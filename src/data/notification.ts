// One event, three audiences, zero autonomy.
//
// Every draft below is UNSENT and each one names the human who sends it. That is
// not a disclaimer bolted on the end, it is the design. A layer that notifies a
// family on its own is a liability, and every operator in the room knows it.
//
// Note the routing, because it is the part that proves we understand the
// licence. Marguerite is a residential care facility resident, so there is no
// facility physician and no facility nurse practitioner to escalate to. Her
// doctor is her own, in the community. The campus decides whether to reappraise
// her service plan and whether her needs now exceed what the licence permits it
// to retain. Those are two different people and two different decisions.

export interface Draft {
  id: string
  kind: 'SBAR' | 'Handoff' | 'Family'
  title: string
  to: string
  sentBy: string
  /** Nothing sends itself. */
  status: 'Held, unsent'
  note: string
  body: { label: string; text: string }[]
}

export const DRAFTS: Draft[] = [
  {
    id: 'sbar',
    kind: 'SBAR',
    title: 'Clinical escalation, structured',
    to: 'Alan Whitfield, MD, her own primary care physician',
    sentBy: 'Priya Raman, LVN, Wellness Director',
    status: 'Held, unsent',
    note: 'Assisted living has no house physician. This goes to her doctor in the community, and it goes over the Wellness Director’s name because she is the one who can answer the questions that come back.',
    body: [
      {
        label: 'Situation',
        text: 'Marguerite Ellison, 84, assisted living apartment 214 at Alder Grove. Nineteen days of change recorded across eight separate logs, none of which triggered an escalation rule. Requesting review.',
      },
      {
        label: 'Background',
        text: 'Service plan last reviewed 11 February 2026, reads independent with ambulation and medication management only. Skilled rehabilitation at Sycamore Bend 12 to 29 November 2025 after a left wrist fracture, during which brief overnight confusion was documented on day three and resolved without intervention. Discharged on metoprolol. Her daughter reported a new cardiology prescription on 30 July that does not appear in the medication record.',
      },
      {
        label: 'Assessment',
        text: 'Two refused evening metoprolol doses. Weight 142.9 lb from 148.6 lb over thirty one days, which is 3.8 percent and under the five percent trigger. Dining attendance three of seven from seven of seven. First requests for assistance with ambulation and bathing, recorded as shift notes rather than as a service plan change. One unwitnessed fall on 1 August without injury. A note on 3 August describing repeated disorientation to day. No vital signs since February and no cognitive screen since March 2023.',
      },
      {
        label: 'Recommendation',
        text: 'Requesting review including lying and standing blood pressure, medication reconciliation covering the outside cardiology prescription, and a cognitive screen. Almanac has not proposed a diagnosis and has not proposed a medication change.',
      },
    ],
  },
  {
    id: 'handoff',
    kind: 'Handoff',
    title: 'Shift handoff, day to evening',
    to: 'Evening care staff, assisted living, Alder Grove',
    sentBy: 'Priya Raman, LVN, Wellness Director',
    status: 'Held, unsent',
    note: 'Written to be read in thirty seconds by somebody putting a bag down. It asks for observation, not for judgement.',
    body: [
      {
        label: 'Apartment 214, Marguerite Ellison',
        text: 'Under review today. Please record whether she comes to dinner and roughly how much she eats. If she refuses her evening metoprolol, note the reason she gives rather than only the refusal. If she asks for a hand with anything she used to do alone, write down what it was.',
      },
      {
        label: 'Do not',
        text: 'Do not change anything about her routine and do not discuss the review with her family. Curtis Nakamura is speaking to her daughter.',
      },
    ],
  },
  {
    id: 'family',
    kind: 'Family',
    title: 'Family update',
    to: 'Diane Ward, daughter and responsible party, Visalia',
    sentBy: 'Curtis Nakamura, Executive Director',
    status: 'Held, unsent',
    note: 'Written in the register a family actually reads, which is not a chart note. It says what was noticed, what is being done, and what is being asked of her. It does not speculate, because speculating to a family is how you lose one.',
    body: [
      {
        label: 'Draft',
        text: 'Dear Diane, I wanted to reach you before you heard anything second hand, and before there is anything alarming to tell you. Over the past three weeks our staff have noticed some small changes in your mother. She has been coming to dinner less often, she has twice asked for a hand with things she has always managed on her own, and she has lost a little weight. None of these on their own would worry us. Together they are worth a proper look, so we have asked Dr. Whitfield to review her this week.',
      },
      {
        label: 'The ask',
        text: 'You mentioned at the desk on 30 July that she had seen a cardiologist. If you have the name of what she was prescribed, or the practice, that would genuinely help. It has not reached us and we would rather not guess.',
      },
      {
        label: 'Also',
        text: 'She had a fall in her bathroom on the night of 31 July. She was not hurt and she asked us not to call you at the time. I would rather you heard it from me than not at all.',
      },
      {
        label: 'Held for',
        text: 'Curtis Nakamura to approve and send. Almanac drafted this and cannot send it.',
      },
    ],
  },
]

/** The notification duty, stated correctly for the licence she lives under. */
export const DUTY = {
  heading: 'What the licence actually requires',
  lines: [
    'A residential care facility for the elderly must reappraise a resident when there is a significant change in condition, and must notify the responsible party. The appraisal drives whether the facility may continue to care for her at all.',
    'Where a resident develops a condition a residential care facility may not retain, the campus must arrange an appropriate level of care. That is an administrator decision taken with a physician, and it is not a decision any software should be making.',
    'The 24 hour report, the F tag framework and the MDS assessment schedule are skilled nursing instruments under CDPH. None of them apply to apartment 214, which is one of the reasons nothing fired.',
  ],
}

export const heldCount = () => DRAFTS.filter((d) => d.status === 'Held, unsent').length
