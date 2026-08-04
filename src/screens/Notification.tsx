import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Sparkles } from 'lucide-react'
import { AiTag, Button, Panel, PanelHead, SectionTitle, Sheet, Tag } from '../components/ui'
import { useToast } from '../components/Toast'
import { DRAFTS, DUTY, heldCount } from '../data/notification'
import { SUMMARIES, summaryById, totalUnresolved } from '../data/summaries'

export function Notification() {
  const [open, setOpen] = useState<string>('sbar')
  const [summaryId, setSummary] = useState<string>('don')
  const navigate = useNavigate()
  const { push } = useToast()

  const attemptSend = (to: string, sender: string) => {
    push({
      kind: 'warn',
      title: 'Almanac cannot send this',
      body: `The message to ${to} sends over ${sender}'s name, from ${sender}'s hands.`,
    })
  }

  const draft = DRAFTS.find((d) => d.id === open) ?? DRAFTS[0]
  const current = summaryById(summaryId)

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow="One event, three audiences"
        title="Notification and handoff"
        sub="The same nineteen days produce a clinical escalation, a shift handoff and a family update. All three are drafted. None of them are sent, and each one names the person whose name it goes out under."
        right={<AiTag>{heldCount()} drafts held</AiTag>}
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="space-y-3">
          {DRAFTS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setOpen(d.id)}
              className={`w-full rounded-card border p-4 text-left transition-colors duration-200 ease-round ${
                d.id === open
                  ? 'border-plum bg-plum-wash shadow-card'
                  : 'border-line bg-surface hover:bg-mist/50'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="eyebrow">{d.kind}</span>
                <Tag tone="quiet">
                  <Lock className="h-2.5 w-2.5" />
                  Unsent
                </Tag>
              </div>
              <div className="mt-1.5 text-[13px] font-semibold text-ink">{d.title}</div>
              <div className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">To {d.to}</div>
            </button>
          ))}

          <Panel tone="quiet">
            <div className="eyebrow">Why none of them send</div>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
              A layer that notifies a family on its own is a liability, and every operator in the
              room already knows it. Almanac writes the draft, names the sender and stops. If it were
              switched off this afternoon, nothing in this building would have gone out that should
              not have.
            </p>
          </Panel>
        </div>

        <div className="space-y-5">
          <Sheet flush className="overflow-hidden">
            <div className="border-b border-line-strong bg-canvas px-6 py-4 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="eyebrow">{draft.kind}</div>
                  <h3 className="mt-1 text-[16px] font-semibold text-ink">{draft.title}</h3>
                </div>
                <Tag tone="change">
                  <Lock className="h-2.5 w-2.5" />
                  {draft.status}
                </Tag>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                To {draft.to}. Sends over the name of {draft.sentBy}.
              </p>
            </div>

            <div className="space-y-4 px-6 py-5 sm:px-8">
              {draft.body.map((b) => (
                <div key={b.label}>
                  <div className="eyebrow">{b.label}</div>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-line px-6 py-4 sm:px-8">
              <Button
                variant="quiet"
                icon={Lock}
                onClick={() => attemptSend(draft.to, draft.sentBy)}
              >
                Send
              </Button>
              <span className="text-[11.5px] leading-relaxed text-ink-faint">
                Held for {draft.sentBy}. Almanac drafted this and cannot send it.
              </span>
            </div>
          </Sheet>

          <Panel tone="ai">
            <div className="flex items-start gap-2.5">
              <Sparkles className="mt-[3px] h-3.5 w-3.5 shrink-0 text-almanac-deep" />
              <p className="text-[12.5px] leading-relaxed text-ink-soft">{draft.note}</p>
            </div>
          </Panel>
        </div>
      </div>

      {/* Section 7: summaries written for a role rather than for a database */}
      <Panel flush>
        <PanelHead
          eyebrow="Written for a role, not for a database"
          title="Summaries"
          sub="The rule that makes these worth reading is that they report what changed and what is unresolved, and never repeat every note in the system. A summary that restates the record is the record again, at which point people go back to the record and stop opening the summary."
          right={<Tag tone="quiet">{totalUnresolved()} unresolved items across all six</Tag>}
        />
        <div className="border-t border-line">
          <div className="xscroll flex gap-1 border-b border-line px-5 py-2">
            {SUMMARIES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSummary(s.id)}
                className={`whitespace-nowrap rounded-card px-2.5 py-1 text-[12px] font-semibold transition-colors ${
                  s.id === summaryId
                    ? 'bg-plum text-white'
                    : 'text-ink-soft hover:bg-mist hover:text-ink'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-[13.5px] font-semibold text-ink">{current.audience}</span>
                <span className="text-[11.5px] text-ink-faint">{current.cadence}</span>
                <Tag tone="quiet">Reads in {current.readIn}</Tag>
              </div>
              <ul className="mt-3 space-y-2">
                {current.lines.map((l, i) => (
                  <li key={i} className="text-[12.5px] leading-relaxed text-ink">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <div className="eyebrow">Still unresolved</div>
                <ul className="mt-1.5 space-y-1">
                  {current.unresolved.map((u) => (
                    <li key={u} className="text-[12px] leading-relaxed text-change-deep">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-line pt-3">
                <div className="eyebrow">What you are being asked to do</div>
                <ul className="mt-1.5 space-y-1">
                  {current.asks.map((a) => (
                    <li key={a} className="text-[12px] leading-relaxed text-ink-soft">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHead
          eyebrow="Getting the licence right"
          title={DUTY.heading}
          sub="Marguerite lives in an apartment under a residential care licence, not in a skilled nursing bed. That single fact changes who may act, and it is the reason none of the usual instruments applied."
        />
        <div className="space-y-3">
          {DUTY.lines.map((l, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed text-ink-soft">
              {l}
            </p>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
          <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/sources')}>
            What the layer reads
          </Button>
          <Button variant="ghost" onClick={() => navigate('/almanac')}>
            Ask Almanac
          </Button>
        </div>
      </Panel>
    </div>
  )
}
