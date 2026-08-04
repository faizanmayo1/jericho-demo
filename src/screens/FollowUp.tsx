import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { AiTag, Button, Cite, Panel, PanelHead, SectionTitle, Sheet, Tag } from '../components/ui'
import { useToast } from '../components/Toast'
import {
  ACTIONS,
  AUDIT,
  AUTONOMY,
  INCIDENT,
  STAGES,
  TASKS,
  actionsDone,
  actionsOverdue,
  layerStages,
  stagesDone,
  tasksBy,
  tasksByDepartment,
  type TaskState,
} from '../data/followup'

const STATE_TONE: Record<TaskState, 'baseline' | 'change' | 'acute' | 'plum'> = {
  Complete: 'baseline',
  'In progress': 'plum',
  Open: 'change',
  Overdue: 'acute',
}

export function FollowUp() {
  const [escalated, setEscalated] = useState(false)
  const navigate = useNavigate()
  const { push } = useToast()

  const escalate = () => {
    setEscalated(true)
    push({
      kind: 'warn',
      title: 'Escalated to the administrator',
      body: 'One action has been overdue since 3 August. Curtis Nakamura now owns it.',
    })
  }

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={`${INCIDENT.ref} · ${INCIDENT.campus}`}
        title="One incident, all the way through"
        sub="Today this loop runs on a phone call, an email, a whiteboard and a spreadsheet, and nobody above the unit can answer whether it is closed without asking somebody. Every stage below carries a timestamp and a named person."
        right={<AiTag>{layerStages()} of {STAGES.length} stages automated</AiTag>}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
        <Sheet>
          <div className="eyebrow">The incident</div>
          <h3 className="mt-1 text-[16px] font-semibold text-ink">
            {INCIDENT.what}, {INCIDENT.resident}
          </h3>
          <p className="tnum mt-1 text-[11.5px] text-ink-soft">
            {INCIDENT.unit} · {INCIDENT.when} · {INCIDENT.where} · {INCIDENT.injury}
          </p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-ink">{INCIDENT.summary}</p>
          <div className="mt-4 border-t border-line pt-3">
            <div className="eyebrow">Why this one matters</div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{INCIDENT.why}</p>
          </div>
        </Sheet>

        <Panel>
          <PanelHead
            eyebrow="Progress"
            title={`${stagesDone()} of ${STAGES.length} stages complete`}
            sub="Leadership can see where this sits without calling the unit, which is the entire point of the screen."
          />
          <div className="space-y-0">
            {STAGES.map((s, i) => (
              <div key={s.id} className="flex gap-3 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      s.done
                        ? s.byLayer
                          ? 'border-almanac bg-almanac text-white'
                          : 'border-plum bg-plum text-white'
                        : 'border-line-strong bg-surface'
                    }`}
                  >
                    {s.done &&
                      (s.byLayer ? (
                        <Sparkles className="h-2.5 w-2.5" />
                      ) : (
                        <Check className="h-3 w-3" />
                      ))}
                  </span>
                  {i < STAGES.length - 1 && (
                    <span className="mt-1 w-[2px] flex-1 bg-line" style={{ minHeight: 22 }} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[12.5px] font-semibold text-ink">{s.label}</span>
                    <span className="tnum text-[11px] text-ink-faint">{s.at}</span>
                    {s.byLayer && <Tag tone="ai">Almanac</Tag>}
                  </div>
                  <div className="text-[11.5px] text-ink-faint">{s.by}</div>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Assigned actions */}
      <Panel flush>
        <PanelHead
          eyebrow={`${actionsDone()} complete, ${actionsOverdue()} overdue`}
          title="Assigned actions"
          sub="Every one of these was assigned by a person. Almanac connected, routed and escalated, and did not assign or complete a single one."
          right={
            !escalated && actionsOverdue() > 0 ? (
              <Button variant="ai" icon={Sparkles} onClick={escalate}>
                Escalate the overdue action
              </Button>
            ) : escalated ? (
              <Tag tone="acute">Escalated to the administrator</Tag>
            ) : undefined
          }
        />
        <div className="xscroll border-t border-line">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-mist/40">
                {['Action', 'Owner', 'Due', 'State'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ACTIONS.map((a) => (
                <tr key={a.id} className="border-b border-line align-top last:border-b-0">
                  <td className="px-4 py-3 text-[12.5px] text-ink">
                    {a.what}
                    {a.note && (
                      <span className="mt-0.5 block text-[11.5px] text-ink-faint">{a.note}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-ink-soft">
                    {a.owner}
                    <span className="block text-[11px] text-ink-faint">{a.role}</span>
                  </td>
                  <td className="tnum whitespace-nowrap px-4 py-3 text-[12px] text-ink-soft">
                    {a.due}
                  </td>
                  <td className="px-4 py-3">
                    <Tag tone={STATE_TONE[a.state]}>{a.state}</Tag>
                    {escalated && a.state === 'Overdue' && (
                      <span className="mt-1 block text-[10.5px] font-semibold text-acute-deep">
                        Now with Curtis Nakamura
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Sheet>
          <div className="border-b border-line pb-3">
            <h3 className="text-[15px] font-semibold text-ink">Audit history</h3>
            <p className="mt-1 text-[11.5px] text-ink-soft">
              What happened, who did it and when. This is the artifact that makes "is that closed"
              a checkable question rather than a remembered one.
            </p>
          </div>
          <div className="mt-3 space-y-2">
            {AUDIT.map((a) => (
              <div
                key={`${a.at}-${a.what}`}
                className="flex flex-wrap gap-x-3 border-b border-line pb-2 text-[11.5px] leading-relaxed last:border-b-0"
              >
                <span className="tnum w-24 shrink-0 text-ink-faint">{a.at}</span>
                <span
                  className={`w-40 shrink-0 font-medium ${
                    a.who === 'Almanac' ? 'text-almanac-deep' : 'text-ink'
                  }`}
                >
                  {a.who}
                </span>
                <span className="min-w-0 flex-1 text-ink-soft">{a.what}</span>
              </div>
            ))}
          </div>
        </Sheet>

        <Panel tone="ai">
          <PanelHead
            eyebrow="Who did what"
            title="The line between the layer and the people"
            sub={AUTONOMY.note}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="eyebrow text-almanac-deep">Almanac did</div>
              <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-ink-soft">
                {AUTONOMY.layerDid.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">People did</div>
              <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-ink-soft">
                {AUTONOMY.peopleDid.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      </div>

      {/* The wider task board */}
      <Panel flush>
        <PanelHead
          eyebrow="Open work across the group"
          title={`${TASKS.length} tasks, ${tasksBy('Overdue')} of them overdue`}
          sub="Grouped by department, each one connected to the resident, incident or facility issue it came from. A task with nothing behind it is how a task list becomes a second inbox."
          right={
            <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/notification')}>
              The communication queue
            </Button>
          }
        />
        <div className="border-t border-line px-5 py-4">
          {tasksByDepartment().map((g) => (
            <div key={g.department} className="mb-5 last:mb-0">
              <div className="eyebrow mb-2">{g.department}</div>
              <div className="space-y-1.5">
                {g.tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-line py-1.5 last:border-b-0"
                  >
                    <span className="min-w-[240px] flex-1 text-[12.5px] text-ink">{t.what}</span>
                    <span className="w-32 shrink-0 text-[11.5px] text-ink-faint">{t.campus}</span>
                    <span className="w-40 shrink-0 text-[11.5px] text-ink-soft">{t.owner}</span>
                    <span className="tnum w-14 shrink-0 text-[11.5px] text-ink-faint">{t.due}</span>
                    <Tag tone={STATE_TONE[t.state]}>{t.state}</Tag>
                    <span className="w-full text-[11px] text-ink-faint sm:w-auto">{t.linkedTo}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Cite>
            {tasksBy('Overdue')} overdue, {tasksBy('Open')} open and {tasksBy('In progress')} in
            progress, counted from the rows above rather than typed.
          </Cite>
        </div>
      </Panel>
    </div>
  )
}
