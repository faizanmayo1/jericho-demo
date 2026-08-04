// Integration, permissions and the audit log.
//
// This screen answers the questions a buyer asks after they have decided they
// want it: what do you connect to, who can see what, and can I prove afterwards
// what happened. None of it is exciting and all of it is disqualifying if the
// answer is vague.
//
// We do not name the record system Jericho runs. It is very likely one of two,
// and asserting it would be the fastest way to be wrong out loud on a first call.

export interface Integration {
  system: string
  method: string
  direction: 'Read only' | 'Read and write back'
  cadence: string
  note: string
}

export const INTEGRATIONS: Integration[] = [
  {
    system: 'Electronic health record',
    method: 'Vendor API, or secure file exchange where the API is not licensed',
    direction: 'Read only',
    cadence: 'Every fifteen minutes',
    note: 'Assessments, care plans, progress notes, incidents, census. The largest single source and the one that decides the integration timeline.',
  },
  {
    system: 'Medication and pharmacy',
    method: 'Pharmacy partner API or nightly file',
    direction: 'Read only',
    cadence: 'Hourly',
    note: 'Administrations, refusals, as needed doses, new orders. Where two of the twelve entries on the hero record came from.',
  },
  {
    system: 'Staff scheduling',
    method: 'API or scheduled export',
    direction: 'Read only',
    cadence: 'Twice daily',
    note: 'Worked hours, open shifts, agency use. The same rows the quarterly staffing figures derive from.',
  },
  {
    system: 'Incident reporting',
    method: 'API, or the EHR module where incidents live inside it',
    direction: 'Read only',
    cadence: 'Every fifteen minutes',
    note: 'Falls, injuries and unusual incidents across both licence types.',
  },
  {
    system: 'Email and SMS',
    method: 'Outbound provider, sending under a named user',
    direction: 'Read and write back',
    cadence: 'On approval',
    note: 'The only outbound path in the platform, and it only fires after a named person approves. Nothing is sent by the layer.',
  },
  {
    system: 'Spreadsheets already in use',
    method: 'Watched folder or scheduled import',
    direction: 'Read only',
    cadence: 'Daily',
    note: 'Most groups have three or four operational spreadsheets that never made it into a system. Reading them is usually the fastest win in the first month.',
  },
  {
    system: 'Financial and operational systems',
    method: 'Database connection or scheduled import',
    direction: 'Read only',
    cadence: 'Weekly',
    note: 'Census, occupancy and payer mix for the executive view. Out of scope for the clinical watch.',
  },
]

export const CONTROLS = [
  {
    control: 'Role based access',
    how: 'Seven roles, each with an explicit list of screens. A nursing supervisor cannot open the quarterly pack and the family communication coordinator cannot open a resident record at all.',
  },
  {
    control: 'Facility level permissions',
    how: 'A campus administrator sees one campus. Group comparison is visible to executive and regional roles only, because a campus ranking other campuses is a conversation rather than a screen.',
  },
  {
    control: 'Care level permissions',
    how: 'The Director of Nursing is scoped to skilled nursing and the Wellness Director to assisted and independent living, which is what the two licences actually require.',
  },
  {
    control: 'Audit log',
    how: 'Every view, every draft, every approval and every escalation, with the person and the timestamp. Retained and exportable.',
  },
  {
    control: 'Human approval for sensitive communication',
    how: 'No message to a family or a physician leaves the platform without a named approver. There is no setting that turns this off.',
  },
  {
    control: 'Source of every alert',
    how: 'Each flag carries the entries it rests on, with the date, the log and the role of the person who wrote it. No score without its evidence.',
  },
  {
    control: 'No autonomous clinical decision making',
    how: 'The copilot declines diagnosis, prescribing and level of care determinations, and names the person each belongs to. Enforced in the product, not in a policy document.',
  },
  {
    control: 'Configurable rules per facility',
    how: 'Thresholds, watch list length, escalation timers and who gets notified are set per campus, because a fifty two bed skilled unit and a one hundred and twenty apartment assisted living building do not run the same morning.',
  },
]

export const AUDIT_LOG = [
  { at: '4 Aug 08:12', who: 'Almanac', role: 'Layer', what: 'Watch list generated for Alder Grove, 9 names', scope: 'Alder Grove' },
  { at: '4 Aug 08:14', who: 'Almanac', role: 'Layer', what: 'Incident notification routed to 3 recipients', scope: 'Alder Grove' },
  { at: '4 Aug 08:31', who: 'Rosa Villareal, RN', role: 'Director of Nursing', what: 'Opened resident record, SNF 140', scope: 'Alder Grove, skilled' },
  { at: '4 Aug 08:33', who: 'Priya Raman, LVN', role: 'Care coordinator', what: 'Opened resident record, AL 214', scope: 'Alder Grove, assisted' },
  { at: '4 Aug 08:47', who: 'Priya Raman, LVN', role: 'Care coordinator', what: 'Access denied, quarterly reporting pack', scope: 'Out of role' },
  { at: '4 Aug 08:52', who: 'Rosa Villareal, RN', role: 'Director of Nursing', what: '4 actions assigned on INC 2026 0804 011', scope: 'Alder Grove' },
  { at: '4 Aug 09:03', who: 'Almanac', role: 'Layer', what: 'Family update drafted for AL 214, held for approval', scope: 'Alder Grove' },
  { at: '4 Aug 09:40', who: 'Angela Pham, LCSW', role: 'Family communication', what: 'Responsible party notified, SNF 140, recorded', scope: 'Alder Grove' },
  { at: '4 Aug 09:44', who: 'Benjamin Carter', role: 'Executive leadership', what: 'Opened group view, 8 campuses', scope: 'All' },
]

export const totalIntegrations = () => INTEGRATIONS.length

export const readOnlyCount = () => INTEGRATIONS.filter((i) => i.direction === 'Read only').length

export const deniedEvents = () => AUDIT_LOG.filter((a) => a.what.startsWith('Access denied')).length
