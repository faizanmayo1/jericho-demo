import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AiTag, Button, Cite, Panel, PanelHead, SectionTitle, Stat, Tag } from '../components/ui'
import { useRole } from '../components/RoleContext'
import {
  TREND_LABEL,
  attentionScore,
  campusCensus,
  campusLicensed,
  groupCensus,
  groupChainedJuly,
  groupFlagged,
  groupLicensed,
  groupOccupancy,
  groupSum,
  groupTransfersJuly,
  occupancy,
  outsideTheReport,
  rankedByAttention,
  type Campus,
} from '../data/campuses'
import { CLIENT, num, oneIn, pct } from '../data/jericho'

const TREND_TONE: Record<Campus['trend'], 'baseline' | 'change' | 'acute'> = {
  steady: 'baseline',
  watch: 'change',
  acute: 'acute',
}

export function Executive() {
  const navigate = useNavigate()
  const { role } = useRole()

  const ranked = rankedByAttention()
  const worst = ranked[0]

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={`${CLIENT.today} · eight campuses · ${role.person}`}
        title="Across the group this morning"
        sub="Ranked by how much is waiting on somebody, not by a quality score. A league table of care quality between your own buildings is a conversation to have with a regional director, not a number to put on a screen."
        right={
          <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/facility')}>
            Open Alder Grove
          </Button>
        }
      />

      {/* Census and movement */}
      <Panel tone="quiet">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Census"
            value={num(groupCensus())}
            note={`of ${num(groupLicensed())} licensed, ${pct(groupOccupancy(), 0)} occupancy`}
            tone="plum"
          />
          <Stat
            label="Admissions and discharges today"
            value={`${groupSum('admissionsToday')} in, ${groupSum('dischargesToday')} out`}
            note={`${groupSum('transfersOut7d')} unplanned transfers out in the last seven days`}
          />
          <Stat
            label="Residents requiring attention"
            value={groupFlagged()}
            tone="change"
            note={`${oneIn(groupFlagged(), groupCensus())} residents, and no campus above five percent of its own census`}
          />
          <Stat
            label="Incidents, last seven days"
            value={groupSum('incidents7d')}
            note="Falls, injuries and unusual incidents across both licence types"
          />
        </div>
      </Panel>

      {/* What is waiting on a person */}
      <Panel>
        <PanelHead
          eyebrow="Waiting on somebody"
          title="The queue behind the census"
          sub="These are the five counters that decide whether a campus is quietly falling behind. None of them is a clinical measure, and all of them are things a person has to do."
          right={<AiTag>Assembled 08:12</AiTag>}
        />
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          <Stat label="Overdue assessments" value={groupSum('overdueAssessments')} tone="change" />
          <Stat label="Open shifts, next 7 days" value={groupSum('openShifts')} tone="change" />
          <Stat label="Medication changes to review" value={groupSum('medChangesToReview')} />
          <Stat label="Family updates awaiting approval" value={groupSum('familyUpdatesPending')} />
          <Stat label="Follow-up tasks overdue" value={groupSum('overdueTasks')} tone="acute" />
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <Cite>
            Every figure above is the sum of the eight campus rows below it, so a headline cannot
            drift away from its own table.
          </Cite>
        </div>
      </Panel>

      {/* The comparison */}
      <Panel flush>
        <PanelHead
          eyebrow="Compare, and open any campus"
          title={`${worst.name} is the one to call today`}
          sub={`${worst.openShifts} open shifts in the next seven days, ${worst.overdueAssessments} assessments past due and ${worst.overdueTasks} follow-up tasks overdue, all the highest in the group.`}
        />
        <div className="xscroll border-t border-line">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-mist/40">
                {['Campus', 'Town', 'Census', 'Occupancy', 'Attention', 'Overdue', 'Open shifts', 'Comms', 'Trend'].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {ranked.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-b-0 hover:bg-mist/40">
                  <td className="px-4 py-3 text-[12.5px] font-semibold text-ink">{c.name}</td>
                  <td className="px-4 py-3 text-[11.5px] text-ink-faint">{c.town}</td>
                  <td className="tnum px-4 py-3 text-[12px] text-ink">
                    {num(campusCensus(c))}
                    <span className="text-ink-faint"> / {num(campusLicensed(c))}</span>
                  </td>
                  <td className="tnum px-4 py-3 text-[12px] text-ink-soft">{pct(occupancy(c), 0)}</td>
                  <td className="tnum px-4 py-3 text-[12px] font-semibold text-plum">{c.flagged}</td>
                  <td className="tnum px-4 py-3 text-[12px] text-ink-soft">
                    {c.overdueAssessments + c.overdueTasks}
                  </td>
                  <td className="tnum px-4 py-3 text-[12px] text-ink-soft">{c.openShifts}</td>
                  <td className="tnum px-4 py-3 text-[12px] text-ink-soft">
                    {c.familyUpdatesPending}
                  </td>
                  <td className="px-4 py-3">
                    <Tag tone={TREND_TONE[c.trend]}>{TREND_LABEL[c.trend]}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-line px-5 py-4">
          <p className="text-[11.5px] leading-relaxed text-ink-faint">
            Sorted by what is waiting on a person, which is {' '}
            <span className="tnum">{attentionScore(worst)}</span> items at {worst.name} against{' '}
            <span className="tnum">{attentionScore(ranked[ranked.length - 1])}</span> at{' '}
            {ranked[ranked.length - 1].name}. Eight campuses, typeset rather than mapped. There is
            real geography here and no coordinate data behind this demonstration, and an invented map
            of Fresno and Madera counties is exactly the detail that gets noticed.
          </p>
        </div>
      </Panel>

      {/* Alerts and the trend that matters */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel>
          <PanelHead
            eyebrow="Facility alerts"
            title="Things worth a call rather than a look"
            sub="Deliberately short. An alert list that runs to twenty entries is a list nobody opens."
          />
          <div className="space-y-3">
            {rankedByAttention()
              .filter((c) => c.alerts.length > 0)
              .map((c) =>
                c.alerts.map((a) => (
                  <div key={`${c.id}-${a}`} className="border-b border-line pb-3 last:border-b-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[12.5px] font-semibold text-ink">{c.name}</span>
                      <Tag tone={TREND_TONE[c.trend]}>{TREND_LABEL[c.trend]}</Tag>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{a}</p>
                  </div>
                )),
              )}
          </div>
        </Panel>

        <Panel tone="ai">
          <PanelHead
            eyebrow="The trend across facilities"
            title="Transfers that were legible in advance"
            sub="The only group level trend worth putting in front of leadership, because it is the one that connects the clinical work to the money."
          />
          <div className="grid grid-cols-2 gap-5">
            <Stat
              label="Unplanned transfers, July"
              value={groupTransfersJuly()}
              note="Across all eight campuses"
            />
            <Stat
              label="Carried a prior signal chain"
              value={`${groupChainedJuly()} of ${groupTransfersJuly()}`}
              tone="ai"
              note="Three or more sources spanning five or more days before the transfer"
            />
          </div>
          <p className="mt-4 border-t border-almanac-tint pt-3.5 text-[12.5px] leading-relaxed text-ink-soft">
            This is an observation about the record and not a claim that {groupChainedJuly()} were
            preventable. What it says is that {groupChainedJuly()} of them were readable beforehand
            and nothing was reading them.
          </p>
          <div className="mt-4">
            <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/watch')}>
              See who that looks like this morning
            </Button>
          </div>
        </Panel>
      </div>

      <Panel tone="quiet">
        <div className="eyebrow">One structural note before you go into a campus</div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
          {num(outsideTheReport())} of the {num(groupCensus())} residents above, which is{' '}
          {pct(outsideTheReport() / groupCensus(), 0)} of the group, live in assisted or independent
          living. None of them appear on a 24 hour report anywhere in the organisation, because that
          document is a skilled nursing artifact. Everything on this screen counts them. Almost
          nothing you have today does.
        </p>
      </Panel>
    </div>
  )
}
