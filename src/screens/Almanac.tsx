import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react'
import {
  AiTag,
  Button,
  Cite,
  DeferTo,
  Panel,
  PanelHead,
  SectionTitle,
  Sheet,
} from '../components/ui'
import { useToast } from '../components/Toast'
import { FALLBACK, SCRIPT, SUGGESTED, findTurn, refusalCount, type Turn } from '../data/copilot'
import { DRAFTS } from '../data/notification'
import { CLIENT } from '../data/jericho'
import { MEASURES, NOT_FIRST, RECOMMENDATION, WOULD_FAIL } from '../data/pilot'

// Module level so the thread survives navigating away and back mid demo. The
// worst thing that can happen on a call is clicking into another screen and
// coming back to an empty conversation.
let asked: Turn[] = []

export function Almanac() {
  const [turns, setTurns] = useState<Turn[]>(asked)
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { push } = useToast()

  useEffect(() => {
    asked = turns
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [turns])

  const ask = (q: string) => {
    if (!q.trim()) return
    setInput('')
    setThinking(true)
    window.setTimeout(() => {
      const turn = findTurn(q)
      const asked_ = turn === FALLBACK ? { ...FALLBACK, q } : turn
      setTurns((prev) => [...prev, asked_])
      setThinking(false)
      if (turn.declines) {
        push({
          kind: 'warn',
          title: 'Almanac declined',
          body: 'It named the person the decision belongs to instead.',
        })
      } else if (turn.artifact) {
        push({ kind: 'ai', title: 'Family note drafted', body: 'Held for the Executive Director.' })
      }
    }, 620)
  }

  const remaining = SUGGESTED.filter((s) => !turns.some((t) => t.q === s))
  const family = DRAFTS.find((d) => d.kind === 'Family')

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={`${CLIENT.ai} · grounded in this morning at Alder Grove`}
        title="Ask the record"
        sub={`It answers from the entries on the other screens and it shows what each answer rests on. It also declines things, ${refusalCount()} of them in the script below, and each refusal names the person the decision actually belongs to.`}
        right={<AiTag />}
      />

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-4">
          {turns.length === 0 && (
            <Panel tone="quiet">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-almanac-deep" />
                <p className="text-[12.5px] leading-relaxed text-ink-soft">
                  Start with the first question on the right. The second one is the one worth
                  watching, because it is the one Almanac will not answer.
                </p>
              </div>
            </Panel>
          )}

          {turns.map((t, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-card bg-plum px-3.5 py-2 text-[12.5px] font-medium text-white">
                  {t.q}
                </div>
              </div>

              {t.declines ? (
                <DeferTo
                  question={t.lead}
                  why={
                    <>
                      {t.body.map((b, j) => (
                        <p key={j} className={j > 0 ? 'mt-2' : ''}>
                          {b}
                        </p>
                      ))}
                    </>
                  }
                  owners={t.owners ?? []}
                  offer={t.offer}
                />
              ) : (
                <Panel>
                  <p className="text-[13.5px] font-semibold leading-snug text-ink">{t.lead}</p>
                  <div className="mt-2 space-y-2">
                    {t.body.map((b, j) => (
                      <p key={j} className="text-[12.5px] leading-relaxed text-ink-soft">
                        {b}
                      </p>
                    ))}
                  </div>

                  {t.evidence && (
                    <div className="mt-4 border-t border-line pt-3">
                      <div className="eyebrow">What this rests on</div>
                      <div className="mt-1.5 space-y-1">
                        {t.evidence.map((e) => (
                          <div key={e.label} className="text-[11.5px] leading-relaxed">
                            <span className="font-semibold text-ink">{e.label}</span>
                            <span className="text-ink-soft">, {e.detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {t.artifact && family && (
                    <Sheet className="mt-4 animate-rise" flush>
                      <div className="border-b border-line-strong bg-canvas px-5 py-3">
                        <div className="eyebrow">Generated draft</div>
                        <div className="mt-0.5 text-[13.5px] font-semibold text-ink">
                          {family.title}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-ink-soft">
                          To {family.to}. Held for {family.sentBy}.
                        </div>
                      </div>
                      <div className="space-y-3 px-5 py-4">
                        {family.body.map((b) => (
                          <div key={b.label}>
                            <div className="eyebrow">{b.label}</div>
                            <p className="mt-1 text-[12.5px] leading-relaxed text-ink">{b.text}</p>
                          </div>
                        ))}
                      </div>
                    </Sheet>
                  )}

                  {t.action && (
                    <div className="mt-4 border-t border-line pt-3">
                      <Button
                        variant="ghost"
                        icon={ArrowRight}
                        onClick={() => navigate(t.action!.to)}
                      >
                        {t.action.label}
                      </Button>
                    </div>
                  )}
                </Panel>
              )}

              {t.declines && t.action && (
                <Button variant="ghost" icon={ArrowRight} onClick={() => navigate(t.action!.to)}>
                  {t.action.label}
                </Button>
              )}
            </div>
          ))}

          {thinking && (
            <Panel tone="ai">
              <div className="flex items-center gap-2.5 text-[12px] text-almanac-deep">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-almanac" />
                Reading the entries
              </div>
            </Panel>
          )}

          <div ref={endRef} />

          <form
            onSubmit={(e) => {
              e.preventDefault()
              ask(input)
            }}
            className="flex items-center gap-2 rounded-card border border-line-strong bg-surface p-2 shadow-rail"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a resident, the list, or the quarterly pack"
              className="min-w-0 flex-1 bg-transparent px-2 text-[12.5px] text-ink outline-none placeholder:text-ink-faint"
            />
            <Button variant="ai" size="sm" icon={CornerDownLeft} type="submit">
              Ask
            </Button>
          </form>
        </div>

        <div className="space-y-5">
          <Panel>
            <PanelHead eyebrow="Try these" title="Questions worth asking on the call" />
            <div className="space-y-2">
              {(remaining.length ? remaining : SUGGESTED).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="w-full rounded-card border border-line bg-surface px-3 py-2.5 text-left text-[12px] leading-relaxed text-ink-soft transition-colors hover:border-plum-tint hover:bg-plum-wash hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </Panel>

          <Panel tone="quiet">
            <PanelHead
              eyebrow="What it will not do"
              title="The refusals are the product"
              sub="An assistant that answers anything is an assistant nobody senior lets near a resident."
            />
            <ul className="space-y-2 text-[12px] leading-relaxed text-ink-soft">
              <li>It does not name a diagnosis, ever.</li>
              <li>It does not recommend starting, stopping or changing a medication.</li>
              <li>
                It does not decide whether a resident needs a different level of care, because that
                determination moves somebody out of their own apartment.
              </li>
              <li>It does not send anything to a family or a physician on its own.</li>
              <li>It does not write to a chart, close a task or alter a code.</li>
            </ul>
            <div className="mt-4 border-t border-line pt-3">
              <Cite>
                Every refusal on this screen names a specific person and what they own, because
                naming a principle is not the same as naming a person, and only one of those is
                useful at {CLIENT.standUp} on a Tuesday.
              </Cite>
            </div>
          </Panel>

          <Panel>
            <PanelHead
              eyebrow="Where to start"
              title={RECOMMENDATION.headline}
              sub="Answering this with all of it is how a proposal dies in procurement, so here is one thing, what it would cost you, and what would count as failure."
            />
            <div className="space-y-2 border-b border-line pb-3">
              {RECOMMENDATION.why.map((w, i) => (
                <p key={i} className="text-[12px] leading-relaxed text-ink-soft">
                  {w}
                </p>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              {RECOMMENDATION.shape.map((s) => (
                <div
                  key={s.label}
                  className="flex items-baseline justify-between gap-3 border-b border-line pb-1.5 last:border-b-0"
                >
                  <span className="shrink-0 text-[11.5px] font-medium text-ink-faint">{s.label}</span>
                  <span className="text-right text-[12px] text-ink">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-line pt-3">
              <div className="eyebrow">How you would judge it</div>
              <div className="mt-2 space-y-2.5">
                {MEASURES.map((m) => (
                  <div key={m.measure}>
                    <div className="text-[12px] font-semibold text-ink">{m.measure}</div>
                    <p className="text-[11.5px] leading-relaxed text-ink-soft">{m.how}</p>
                    <p className="text-[11.5px] leading-relaxed text-change-deep">{m.honest}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 border-t border-line pt-3">
              <div className="eyebrow">What would mean it failed</div>
              <ul className="mt-1.5 space-y-1">
                {WOULD_FAIL.map((w) => (
                  <li key={w} className="text-[11.5px] leading-relaxed text-ink-soft">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 border-t border-line pt-3">
              <div className="eyebrow">And what we would not start with</div>
              <div className="mt-1.5 space-y-2">
                {NOT_FIRST.map((n) => (
                  <div key={n.what}>
                    <span className="text-[12px] font-semibold text-ink">{n.what}. </span>
                    <span className="text-[11.5px] leading-relaxed text-ink-soft">{n.why}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel tone="quiet">
            <div className="eyebrow">Scope of this demonstration</div>
            <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
              One invented campus on one invented Tuesday, with {SCRIPT.length} scripted answers.
              Free typing matches to the nearest of them. Everything it cites appears somewhere else
              in this build, so any figure it quotes can be checked against the screen it came from.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
