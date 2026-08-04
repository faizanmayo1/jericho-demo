import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AiTag, Button, Cite, Panel, PanelHead, SectionTitle, Sheet, Tag } from '../components/ui'
import {
  DEAD_RULE,
  PACK,
  PROVENANCE,
  QAPI,
  QUALITY,
  REGULATORY,
  STAFFING,
  type Figure,
  staffingExceptions,
} from '../data/reporting'

function FigureRow({ f }: { f: Figure }) {
  return (
    <div className="border-b border-line py-3 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="min-w-0 text-[12.5px] font-medium text-ink">{f.label}</span>
        <span
          className={`tnum shrink-0 text-[15px] font-semibold ${
            f.ok ? 'text-ink' : 'text-change-deep'
          }`}
        >
          {f.value}
        </span>
      </div>
      {f.against && (
        <p className="mt-1 text-[11.5px] leading-relaxed text-ink-soft">{f.against}</p>
      )}
      <Cite>{f.source}</Cite>
    </div>
  )
}

export function Reporting() {
  const navigate = useNavigate()

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={PACK.quarter}
        title="Quarterly reporting pack"
        sub={`${PACK.entity}. ${PACK.scope}. ${PACK.assembled}, from the same records every other screen in this demonstration reads.`}
        right={<AiTag>Assembled, not authored</AiTag>}
      />

      <Panel tone="quiet">
        <div className="eyebrow">How to read this pack</div>
        <div className="mt-2 space-y-2">
          {PROVENANCE.lines.map((l, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed text-ink-soft">
              {l}
            </p>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet>
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <h3 className="text-[15px] font-semibold text-ink">Staffing</h3>
            {staffingExceptions() > 0 && (
              <Tag tone="change">{staffingExceptions()} reported exceptions</Tag>
            )}
          </div>
          <div className="mt-1">
            {STAFFING.map((f) => (
              <FigureRow key={f.label} f={f} />
            ))}
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-soft">
            The eleven days below the floor are listed individually in the appendix rather than
            absorbed into a quarterly average, because a quarterly average is not what the floor is
            measured against.
          </p>
        </Sheet>

        <Sheet>
          <div className="border-b border-line pb-3">
            <h3 className="text-[15px] font-semibold text-ink">Quality metrics</h3>
          </div>
          <div className="mt-1">
            {QUALITY.map((f) => (
              <FigureRow key={f.label} f={f} />
            ))}
          </div>
        </Sheet>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Sheet>
          <div className="border-b border-line pb-3">
            <h3 className="text-[15px] font-semibold text-ink">Licensing and regulatory actions</h3>
          </div>
          <div className="mt-3 space-y-3.5">
            {REGULATORY.map((r) => (
              <div key={`${r.campus}-${r.item}`} className="border-b border-line pb-3 last:border-b-0">
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className="text-[12.5px] font-semibold text-ink">{r.campus}</span>
                  <span className="text-[11.5px] text-plum">{r.item}</span>
                </div>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-soft">{r.scope}</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-faint">{r.status}</p>
              </div>
            ))}
          </div>
        </Sheet>

        <div className="space-y-5">
          <Panel tone="ai">
            <PanelHead
              eyebrow={QAPI.heading}
              title={QAPI.title}
              sub={QAPI.aim}
            />
            <div className="space-y-3 border-t border-almanac-tint pt-3.5">
              <div>
                <div className="eyebrow">Root cause</div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{QAPI.rootCause}</p>
              </div>
              <div>
                <div className="eyebrow">Measure</div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{QAPI.measure}</p>
              </div>
              <div>
                <div className="eyebrow">Evidence attached</div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">{QAPI.evidence}</p>
              </div>
            </div>
            <div className="mt-4 border-t border-almanac-tint pt-3.5">
              <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/resident')}>
                Open the attached example
              </Button>
            </div>
          </Panel>

          <Panel>
            <div className="eyebrow">{DEAD_RULE.heading}</div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{DEAD_RULE.text}</p>
          </Panel>
        </div>
      </div>

      <Panel tone="quiet">
        <p className="text-[12px] leading-relaxed text-ink-soft">
          {PACK.signatories}. Every figure in this pack traces to a primary record, and nothing in it
          selects a window, chooses which campuses appear or decides what counts as an exception.
          Those definitions are fixed and printed in the appendix. A pack that could be tuned would
          not be worth furnishing.
        </p>
      </Panel>
    </div>
  )
}
