// One complete incident, end to end, and the task board it feeds.
//
// The point of this screen is not that software can hold a checklist. It is that
// today this loop runs on a phone call, an email, a whiteboard and a spreadsheet,
// and nobody above the unit can answer "is that closed" without asking somebody.
// Every stage below carries a real timestamp and a named person, and the audit
// history is the artifact that makes the answer checkable rather than remembered.

export type TaskState = 'Open' | 'In progress' | 'Complete' | 'Overdue'

export interface Stage {
  id: string
  label: string
  at: string
  by: string
  detail: string
  done: boolean
  /** True where Almanac did this rather than a person. */
  byLayer?: boolean
}

export interface Action {
  id: string
  what: string
  owner: string
  role: string
  due: string
  state: TaskState
  note?: string
}

export const INCIDENT = {
  ref: 'INC 2026 0804 011',
  what: 'Unwitnessed fall',
  resident: 'Stanley Prewitt',
  unit: 'SNF 140',
  campus: 'Alder Grove',
  when: 'Tuesday 4 August, 02:15',
  where: 'Bathroom, own room',
  injury: 'No apparent injury',
  summary:
    'Second unwitnessed fall in nine days. Neurological checks complete and within normal limits. Post fall huddle documented at 07:05.',
  // The reason this one matters, which is not the fall itself.
  why:
    'The first fall on 26 July was investigated for environmental hazard and closed correctly. Nothing in that investigation asked whether anything about the resident had changed, because the 24 hour report holds one day and the two falls are nine days apart.',
}

export const STAGES: Stage[] = [
  {
    id: 'st1',
    label: 'Recorded',
    at: '4 Aug 02:31',
    by: 'Rosa Delgado, LVN, night shift',
    detail: 'Incident report filed sixteen minutes after the resident was found. Neurological checks started immediately.',
    done: true,
  },
  {
    id: 'st2',
    label: 'Surfaced',
    at: '4 Aug 08:12',
    by: 'Almanac',
    byLayer: true,
    detail: 'Raised on the watch list as a second event in nine days, with the 26 July incident attached. That link is the only part of this that the 24 hour report could not produce.',
    done: true,
  },
  {
    id: 'st3',
    label: 'Notified',
    at: '4 Aug 08:14',
    by: 'Almanac, to three named people',
    byLayer: true,
    detail: 'Routed to the unit manager, the Director of Nursing and the rounding provider. Nobody had to decide who needed to know.',
    done: true,
  },
  {
    id: 'st4',
    label: 'Actions assigned',
    at: '4 Aug 08:52',
    by: 'Rosa Villareal, RN, Director of Nursing',
    detail: 'Four actions assigned at the stand up, each with an owner and a due time. Assignment is a person, never the layer.',
    done: true,
  },
  {
    id: 'st5',
    label: 'In progress',
    at: 'Now',
    by: 'Three owners',
    detail: 'Two actions complete, one in progress, one not yet started and not yet due.',
    done: false,
  },
  {
    id: 'st6',
    label: 'Resolved and reviewed',
    at: 'Due 7 Aug',
    by: 'Curtis Nakamura, Executive Director',
    detail: 'Closes only when every action is complete and the administrator has reviewed it. Leadership can see the state without asking anybody.',
    done: false,
  },
]

export const ACTIONS: Action[] = [
  {
    id: 'a1',
    what: 'Neurological checks every shift for seventy two hours',
    owner: 'Marcus Bell, RN',
    role: 'Nursing supervisor',
    due: '7 Aug 06:00',
    state: 'In progress',
    note: 'Six of nine complete, all within normal limits.',
  },
  {
    id: 'a2',
    what: 'Post fall huddle with the night shift',
    owner: 'Rosa Villareal, RN',
    role: 'Director of Nursing',
    due: '4 Aug 09:00',
    state: 'Complete',
    note: 'Completed 07:05, ahead of the stand up.',
  },
  {
    id: 'a3',
    what: 'Medication review, given two falls in nine days',
    owner: 'Karen Voss, FNP',
    role: 'Rounding provider',
    due: '5 Aug 17:00',
    state: 'Open',
  },
  {
    id: 'a4',
    what: 'Notify responsible party and record the conversation',
    owner: 'Angela Pham, LCSW',
    role: 'Family communication',
    due: '4 Aug 12:00',
    state: 'Complete',
    note: 'Spoke with his son at 09:40. Recorded.',
  },
  {
    id: 'a5',
    what: 'Environmental check of the bathroom, second occurrence',
    owner: 'Ray Solano',
    role: 'Maintenance',
    due: '3 Aug 17:00',
    state: 'Overdue',
    note: 'Raised after the 26 July fall and not yet closed. Escalated to the administrator this morning.',
  },
]

export const AUDIT = [
  { at: '4 Aug 02:31', who: 'Rosa Delgado, LVN', what: 'Incident report created' },
  { at: '4 Aug 02:34', who: 'Rosa Delgado, LVN', what: 'Neurological checks started' },
  { at: '4 Aug 07:05', who: 'Rosa Villareal, RN', what: 'Post fall huddle recorded' },
  { at: '4 Aug 08:12', who: 'Almanac', what: 'Linked to incident of 26 July and raised on the watch list' },
  { at: '4 Aug 08:14', who: 'Almanac', what: 'Notification routed to three named recipients' },
  { at: '4 Aug 08:52', who: 'Rosa Villareal, RN', what: 'Four actions assigned with owners and due times' },
  { at: '4 Aug 08:53', who: 'Almanac', what: 'Escalated one action overdue since 3 Aug to the administrator' },
  { at: '4 Aug 09:40', who: 'Angela Pham, LCSW', what: 'Responsible party notified, conversation recorded' },
]

// ---------------------------------------------------------------------------
// The wider task board
// ---------------------------------------------------------------------------

export interface Task {
  id: string
  what: string
  campus: string
  department: string
  owner: string
  due: string
  priority: 'Routine' | 'Priority' | 'Urgent'
  state: TaskState
  linkedTo: string
}

export const TASKS: Task[] = [
  { id: 't1', what: 'Environmental check of the bathroom, second occurrence', campus: 'Alder Grove', department: 'Maintenance', owner: 'Ray Solano', due: '3 Aug', priority: 'Priority', state: 'Overdue', linkedTo: 'Incident INC 2026 0804 011' },
  { id: 't2', what: 'Service plan reappraisal following a change in condition', campus: 'Alder Grove', department: 'Assisted living', owner: 'Priya Raman, LVN', due: '5 Aug', priority: 'Urgent', state: 'Open', linkedTo: 'Resident Marguerite Ellison, AL 214' },
  { id: 't3', what: 'Medication review, two falls in nine days', campus: 'Alder Grove', department: 'Clinical', owner: 'Karen Voss, FNP', due: '5 Aug', priority: 'Urgent', state: 'Open', linkedTo: 'Incident INC 2026 0804 011' },
  { id: 't4', what: 'Neurological checks every shift for seventy two hours', campus: 'Alder Grove', department: 'Nursing', owner: 'Marcus Bell, RN', due: '7 Aug', priority: 'Priority', state: 'In progress', linkedTo: 'Incident INC 2026 0804 011' },
  { id: 't5', what: 'Gradual dose reduction attempt overdue at ninety four days', campus: 'Alder Grove', department: 'Clinical', owner: 'Karen Voss, FNP', due: '8 Aug', priority: 'Priority', state: 'Open', linkedTo: 'Resident Theodore Ruiz, SNF 133' },
  { id: 't6', what: 'Six follow up tasks past due, review with the administrator', campus: 'Camden Oaks', department: 'Administration', owner: 'Denise Ashford', due: '4 Aug', priority: 'Urgent', state: 'Overdue', linkedTo: 'Facility alert' },
  { id: 't7', what: 'Cover eleven open shifts in the next seven days', campus: 'Camden Oaks', department: 'Scheduling', owner: 'Staffing coordinator', due: '6 Aug', priority: 'Urgent', state: 'In progress', linkedTo: 'Facility alert' },
  { id: 't8', what: 'Family update awaiting approval', campus: 'Alder Grove', department: 'Social services', owner: 'Curtis Nakamura', due: '4 Aug', priority: 'Priority', state: 'Open', linkedTo: 'Resident Marguerite Ellison, AL 214' },
  { id: 't9', what: 'Two service plan reviews past their due date', campus: 'Willow Run', department: 'Assisted living', owner: 'Wellness Director', due: '2 Aug', priority: 'Priority', state: 'Overdue', linkedTo: 'Facility alert' },
  { id: 't10', what: 'Quarterly staffing appendix, eleven days below the floor', campus: 'Group', department: 'Compliance', owner: 'Denise Ashford', due: '15 Aug', priority: 'Routine', state: 'Open', linkedTo: 'Quarterly pack' },
]

// ---------------------------------------------------------------------------
// Derived
// ---------------------------------------------------------------------------

export const actionsDone = () => ACTIONS.filter((a) => a.state === 'Complete').length

export const actionsOverdue = () => ACTIONS.filter((a) => a.state === 'Overdue').length

export const stagesDone = () => STAGES.filter((s) => s.done).length

export const layerStages = () => STAGES.filter((s) => s.byLayer).length

export const tasksBy = (state: TaskState) => TASKS.filter((t) => t.state === state).length

export const tasksOverdue = () => TASKS.filter((t) => t.state === 'Overdue')

export const tasksByDepartment = () => {
  const depts = Array.from(new Set(TASKS.map((t) => t.department))).sort()
  return depts.map((d) => ({ department: d, tasks: TASKS.filter((t) => t.department === d) }))
}

/** What the layer did and did not do in this workflow, stated as a count so
 *  nobody has to take it on trust. */
export const AUTONOMY = {
  layerDid: ['Linked two incidents nine days apart', 'Routed the notification to three named people', 'Escalated one action that was already overdue'],
  peopleDid: ['Recorded the incident', 'Assigned every action', 'Completed every action', 'Will decide when it closes'],
  note:
    'Almanac connected, routed and escalated. It did not assign a single action, complete one, or close anything. Assignment is a person deciding another person is accountable, and that is not a decision to automate.',
}
