import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  AiTag,
  Button,
  DeferTo,
  Panel,
  PanelHead,
  SectionTitle,
  Sheet,
  Stat,
  Tag,
} from '../components/ui'
import { useToast } from '../components/Toast'
import { ConvergenceLanes } from '../components/ConvergenceLanes'
import { LevelSpine } from '../components/LevelSpine'
import {
  CARE_PLAN,
  CARE_TEAM,
  COMMS_HISTORY,
  HOSPITALISATIONS,
  LEVEL_HISTORY,
  PRIOR_STAY,
  RESIDENT_TASKS,
  WHAT_CHANGED,
  READ,
  RESIDENT,
  SIGNALS,
  type Signal,
  distinctAuthors,
  distinctLanes,
  signalsWithNoRule,
  signalsUnderARule,
  windowDays,
} from '../data/marguerite'
import { dayOf, weekdayOf } from '../data/jericho'

export function Resident() {
  const [picked, setPicked] = useState<Signal | null>(null)
  const [priorOpen, setPriorOpen] = useState(false)
  const navigate = useNavigate()
  const { push } = useToast()

  const openPrior = () => {
    setPriorOpen(true)
    push({
      kind: 'ai',
      title: 'Found a prior stay at another campus',
      body: 'Sycamore Bend, November 2025. It is in the group record and not in her Alder Grove chart.',
    })
  }

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={`${RESIDENT.unit} · ${RESIDENT.campus} · ${RESIDENT.licence}`}
        title={RESIDENT.name}
        sub={`${RESIDENT.age}, resident since ${RESIDENT.movedIn}. Responsible party ${RESIDENT.responsibleParty}. Physician ${RESIDENT.physician}.`}
        right={
          <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/notification')}>
            The drafts this produced
          </Button>
        }
      />

      {/* The count, and the shape of the claim */}
      <Panel tone="quiet">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <Stat label="Entries" value={SIGNALS.length} tone="plum" note="Every one of them seen by the person who wrote it" />
          <Stat label="Separate logs" value={distinctLanes()} note="None of which read each other" />
          <Stat label="People" value={distinctAuthors()} note="Across three shifts, not one of them a clinician" />
          <Stat label="Days" value={windowDays()} note="16 July to this morning" />
          <Stat
            label="Rules that fired"
            value="0"
            tone="change"
            note={`${signalsUnderARule()} sat under a threshold, ${signalsWithNoRule()} under no rule at all`}
          />
        </div>
      </Panel>

      {/* The service plan against the notes */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Sheet>
          <div className="eyebrow">Service plan, the governing document in assisted living</div>
          <p className="mt-2 text-[11.5px] text-ink-faint">
            Reviewed {RESIDENT.servicePlan.reviewed}. Next due {RESIDENT.servicePlan.nextDue}.
          </p>
          <blockquote className="mt-3 border-l-2 border-line-strong pl-3 text-[13.5px] italic leading-relaxed text-ink">
            {RESIDENT.servicePlan.reads}
          </blockquote>
          <p className="mt-3 text-[12px] leading-relaxed text-ink-soft">
            It is on a six month cycle, which is the correct cycle. It is also five months old, and
            three entries since 23 July describe a different person. Nothing in the building is
            designed to notice that gap, because noticing it would mean reading a shift note against
            a service plan, and nothing reads across those two things.
          </p>
        </Sheet>

        <Panel>
          <PanelHead
            eyebrow="Last cognitive screen"
            title={RESIDENT.cognitiveScreen}
            sub="Assisted living has no scheduled cognitive assessment outside the service plan cycle. In skilled nursing she would have had a BIMS on the MDS assessment schedule. She is forty feet away from that schedule and not on it."
          />
          <div className="rounded-card bg-mist/60 p-4">
            <div className="eyebrow">What is not in this record at all</div>
            <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-ink-soft">
              <li>No vital signs since her annual in February</li>
              <li>No laboratory work of any kind</li>
              <li>No record of the cardiology prescription mentioned on 30 July</li>
              <li>No orthostatic blood pressure, ever</li>
            </ul>
          </div>
        </Panel>
      </div>

      {/* SIGNATURE: the convergence lanes */}
      <Panel>
        <PanelHead
          eyebrow="Signature view"
          title="Nineteen days, eight logs, twelve entries"
          sub="Each lane carries the rule that would have escalated it, drawn at the height it fires. Every mark sits underneath. Three lanes have no rule at all, which is worse, because a field nobody monitors cannot have a near miss."
          right={<AiTag>Correlated by Almanac</AiTag>}
        />
        <ConvergenceLanes onPick={setPicked} />

        {picked && (
          <div className="mt-5 animate-rise rounded-card border border-plum-tint bg-plum-wash p-4">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="tnum text-[11.5px] font-semibold text-plum">
                {weekdayOf(picked.date)} {dayOf(picked.date)}
                {picked.time ? ` ${picked.time}` : ''}
              </span>
              <span className="text-[12.5px] font-semibold text-ink">{picked.lane}</span>
              <span className="text-[11.5px] text-ink-faint">
                {picked.author}, {picked.role}, {picked.shift.toLowerCase()} shift
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink">
              {picked.quoted ? `“${picked.entry}”` : picked.entry}
            </p>
            <div className="mt-3 border-t border-plum-tint pt-3">
              <div className="eyebrow">The rule it sat under</div>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{picked.rule}</p>
              {picked.value && (
                <p className="tnum mt-1.5 text-[12px] font-semibold text-change-deep">{picked.value}</p>
              )}
            </div>
          </div>
        )}
      </Panel>

      {/* The full ledger */}
      <Panel flush>
        <PanelHead
          eyebrow="Every entry, with the rule it sat beneath"
          title="The ledger"
          sub="This is the part that has to survive somebody who has run fifty buildings. The claim is not that these were missed. The claim is that each one was under its own line, and that no line reads another."
        />
        <div className="xscroll border-t border-line">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-mist/40">
                <th className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Date</th>
                <th className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Log</th>
                <th className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Who</th>
                <th className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Entry</th>
                <th className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">The rule it sat under</th>
              </tr>
            </thead>
            <tbody>
              {SIGNALS.map((s) => (
                <tr key={s.id} className="border-b border-line align-top last:border-b-0">
                  <td className="tnum whitespace-nowrap px-4 py-3 text-[11.5px] font-semibold text-plum">
                    {dayOf(s.date)}
                    {s.time && <span className="ml-1 font-normal text-ink-faint">{s.time}</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[11.5px] text-ink">{s.lane}</td>
                  <td className="px-4 py-3 text-[11.5px] text-ink-soft">
                    {s.author}
                    <span className="block text-ink-faint">{s.role}</span>
                  </td>
                  <td className="max-w-[280px] px-4 py-3 text-[12px] leading-relaxed text-ink">
                    {s.quoted ? `“${s.entry}”` : s.entry}
                  </td>
                  <td className="max-w-[300px] px-4 py-3 text-[11.5px] leading-relaxed text-ink-soft">
                    {s.rule}
                    {s.value && (
                      <span className="tnum mt-1 block font-semibold text-change-deep">{s.value}</span>
                    )}
                    {s.noRule && <Tag tone="change" className="mt-1.5">No rule exists</Tag>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* SIGNATURE 2: the cross level spine */}
      <Panel>
        <PanelHead
          eyebrow="Why the record is thin"
          title="Three and a half years, banded by level of care"
          sub="Seventeen days of skilled nursing produced more record than thirty two months of independent living and eight months of assisted living put together. She is standing in the thinnest part of her own history."
        />
        <LevelSpine />
        <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
          {LEVEL_HISTORY.map((l) => (
            <div key={`${l.level}-${l.from}`}>
              <div className="eyebrow">
                {l.campus} · {l.from} to {l.to}
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{l.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* The prior stay */}
      <Panel tone={priorOpen ? 'ai' : 'surface'} className="transition-colors duration-500">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="eyebrow">Coordinating care across campuses</div>
            <h3 className="mt-1 text-[16px] font-semibold text-ink">
              She has been through this building group before
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
              Not a comparison of one campus against another. The question is whether her own history
              followed her from one to the next.
            </p>
          </div>
          {!priorOpen && (
            <Button variant="ai" icon={Sparkles} onClick={openPrior}>
              Look across the group record
            </Button>
          )}
        </div>

        {priorOpen && (
          <div className="mt-5 animate-rise border-t border-almanac-tint pt-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="text-[13.5px] font-semibold text-ink">{PRIOR_STAY.campus}</span>
              <span className="text-[11.5px] text-ink-faint">{PRIOR_STAY.town}</span>
              <span className="tnum text-[11.5px] text-plum">{PRIOR_STAY.dates}</span>
            </div>
            <p className="mt-1 text-[12.5px] text-ink-soft">{PRIOR_STAY.reason}</p>
            <blockquote className="mt-3 border-l-2 border-almanac bg-sheet py-2.5 pl-3 pr-3 text-[13px] leading-relaxed text-ink">
              {PRIOR_STAY.buried}
            </blockquote>
            <p className="mt-3 text-[12.5px] leading-relaxed text-almanac-deep">{PRIOR_STAY.why}</p>
          </div>
        )}
      </Panel>

      {/* Section 6: what changed, which is the summary a person actually opens */}
      <Panel tone="ai">
        <PanelHead
          eyebrow="What changed"
          title="Since the last shift, yesterday and last week"
          sub="Reported as change rather than as state. A summary that restates the whole record is the record again."
          right={<AiTag />}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {WHAT_CHANGED.map((w) => (
            <div key={w.period} className="border-l-2 border-almanac-tint pl-3">
              <div className="eyebrow text-almanac-deep">{w.period}</div>
              <ul className="mt-1.5 space-y-1">
                {w.lines.map((l) => (
                  <li key={l} className="text-[12px] leading-relaxed text-ink-soft">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      {/* Section 6: the rest of the 360 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHead
            eyebrow={`Care plan · ${CARE_PLAN.status}`}
            title="Goals, against what the record says"
            sub={CARE_PLAN.note}
          />
          <div className="space-y-3">
            {CARE_PLAN.goals.map((g) => (
              <div key={g.goal} className="border-b border-line pb-3 last:border-b-0">
                <div className="text-[12.5px] leading-snug text-ink">{g.goal}</div>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="tnum text-[11px] text-ink-faint">Set {g.set}</span>
                  <span className="text-[11.5px] font-medium text-change-deep">{g.state}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHead
              eyebrow="Hospitalisations and transfers"
              title="Two, and neither is in her Alder Grove chart"
              sub="Both sit in the group record under a different campus and a different licence type."
            />
            <div className="space-y-3">
              {HOSPITALISATIONS.map((h) => (
                <div key={h.when} className="border-b border-line pb-3 last:border-b-0">
                  <div className="flex flex-wrap items-baseline gap-x-2.5">
                    <span className="tnum text-[11.5px] font-semibold text-plum">{h.when}</span>
                    <span className="text-[12.5px] font-semibold text-ink">{h.where}</span>
                    {!h.visible && <Tag tone="change">Not visible here</Tag>}
                  </div>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{h.why}</p>
                  <p className="text-[11.5px] leading-relaxed text-ink-faint">{h.outcome}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHead
              eyebrow="Assigned follow-up"
              title={`${RESIDENT_TASKS.length} open tasks`}
              sub="Each connected to this resident, with an owner and a due date."
            />
            <div className="space-y-2">
              {RESIDENT_TASKS.map((t) => (
                <div
                  key={t.what}
                  className="flex flex-wrap items-baseline gap-x-3 border-b border-line pb-2 last:border-b-0"
                >
                  <span className="min-w-[200px] flex-1 text-[12px] text-ink">{t.what}</span>
                  <span className="text-[11.5px] text-ink-soft">{t.owner}</span>
                  <span className="tnum text-[11.5px] text-ink-faint">{t.due}</span>
                  <Tag tone="change">{t.state}</Tag>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHead
            eyebrow="Communication history"
            title="What her family has been told, and when"
            sub="Including the two occasions where something was said to a member of staff and went no further."
          />
          <div className="space-y-2.5">
            {COMMS_HISTORY.map((c) => (
              <div key={c.when} className="border-b border-line pb-2.5 last:border-b-0">
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="tnum text-[11.5px] font-semibold text-plum">{c.when}</span>
                  <span className="text-[11.5px] text-ink-faint">{c.who}</span>
                </div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{c.what}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead
            eyebrow="Responsible care team"
            title="Who owns what"
            sub="Five people, and the two decisions that matter most belong to somebody who does not work for Jericho."
          />
          <div className="space-y-2.5">
            {CARE_TEAM.map((m) => (
              <div key={m.name} className="border-b border-line pb-2.5 last:border-b-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[12.5px] font-semibold text-ink">{m.name}</span>
                  <span className="text-[11.5px] text-ink-faint">{m.role}</span>
                </div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{m.owns}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* What Almanac says, and what it will not */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel tone="ai">
          <PanelHead eyebrow="What Almanac says" title={READ.headline} />
          <div className="space-y-3">
            {READ.says.map((s, i) => (
              <p key={i} className="text-[12.5px] leading-relaxed text-ink-soft">
                {s}
              </p>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <DeferTo
            question="What is causing this?"
            why={
              <>
                <p>{READ.refusesToSay}</p>
                <p className="mt-2 font-medium text-ink">These four would settle it:</p>
                <ul className="mt-1 space-y-1">
                  {READ.wouldSettleIt.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </>
            }
            owners={READ.owners}
            offer="I have put an SBAR in front of the Wellness Director naming exactly those four. It is unsent."
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" icon={ArrowRight} onClick={() => navigate('/notification')}>
              See the three drafts
            </Button>
            <Button variant="ghost" onClick={() => navigate('/almanac')}>
              Ask Almanac about her
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
