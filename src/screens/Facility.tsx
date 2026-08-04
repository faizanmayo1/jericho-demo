import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  AiTag,
  Button,
  Cite,
  LedgerRow,
  Panel,
  SectionTitle,
  Sheet,
  Stat,
  Tag,
} from '../components/ui'
import { useToast } from '../components/Toast'
import {
  ASSEMBLY,
  REPORT,
  SECTIONS,
  THE_GAP,
  marginMarks,
  reportRowCount,
} from '../data/standup'
import { CLIENT, num, pct } from '../data/jericho'
import {
  HERO_CAMPUS,
  campusCensus,
  campusLicensed,
  levelCensus,
  occupancy,
  outsideTheReport,
} from '../data/campuses'

/** The facility view opens with the operational counters an administrator needs
 *  as a starting point, and then hands over to the report.
 *
 *  THE REPORT ITSELF STAYS A DOCUMENT. Dated sections, real rows, numbers inside
 *  the prose rather than in tiles. The counters sit above it and never inside
 *  it, because the moment the report becomes a set of cards it stops being the
 *  artifact the building already reads aloud and becomes another dashboard
 *  nobody opens. */
export function Facility() {
  const [gapOpen, setGapOpen] = useState(false)
  const navigate = useNavigate()
  const { push } = useToast()

  const openGap = () => {
    setGapOpen(true)
    push({
      kind: 'ai',
      title: 'Almanac read the other side of the campus',
      body: `${num(outsideTheReport())} residents across the group have never had a report of their own.`,
    })
  }

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={`${CLIENT.today} · assembled ${REPORT.assembledAt}`}
        title={`${HERO_CAMPUS.name}, this morning`}
        sub={`Covering ${REPORT.covers}. The 24 hour report is compiled by ${REPORT.compiledBy}. This is the document the building already reads aloud at ${CLIENT.standUp}, and Almanac has not changed a word of what it says.`}
        right={
          <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/watch')}>
            This morning's watch list
          </Button>
        }
      />

      {/* The operational starting point, above the report itself */}
      <Panel tone="quiet">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <Stat
            label="Census"
            value={num(campusCensus(HERO_CAMPUS))}
            note={`of ${num(campusLicensed(HERO_CAMPUS))}, ${pct(occupancy(HERO_CAMPUS), 0)} occupancy`}
            tone="plum"
          />
          <Stat
            label="Admissions today"
            value={HERO_CAMPUS.admissionsToday}
            note={`${HERO_CAMPUS.dischargesToday} discharges, ${HERO_CAMPUS.transfersOut7d} transfers out this week`}
          />
          <Stat label="Needing attention" value={HERO_CAMPUS.flagged} tone="change" />
          <Stat label="Overdue care activities" value={HERO_CAMPUS.overdueAssessments} tone="change" />
          <Stat
            label="Family updates pending"
            value={HERO_CAMPUS.familyUpdatesPending}
            note={`Drafted and waiting on a named approver. ${HERO_CAMPUS.openShifts} open shifts in the next seven days.`}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
          <Button variant="ghost" icon={ArrowRight} onClick={() => navigate('/followup')}>
            Open follow-up and tasks
          </Button>
          <Button variant="ghost" onClick={() => navigate('/notification')}>
            Pending communication
          </Button>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1.62fr_1fr]">
        {/* The report itself, as paper */}
        {/* THE SIGNATURE. A ruled page: section names sit out in the margin,
            the entries sit inside the rule, and where Almanac wrote something
            its mark appears in the margin beside the section it belongs to.
            The layout says the thesis before a word of copy does. */}
        <Sheet flush ledger className="overflow-hidden">
          <div className="border-b border-line-strong bg-canvas px-6 py-5 sm:px-8">
            <div className="eyebrow">{REPORT.campus}</div>
            <h3 className="mt-2.5 font-display text-lede font-normal text-ink">
              Twenty four hour report
            </h3>
            <p className="tnum mt-2 text-[11.5px] text-ink-soft">
              {REPORT.covers} · {REPORT.scope} · {reportRowCount()} entries
            </p>
          </div>

          <div className="px-6 py-6 sm:px-8">
            {SECTIONS.map((s) => {
              const annotated = s.rows.some((r) => r.margin)
              return (
                <LedgerRow
                  key={s.title}
                  className="border-b border-line py-5 first:pt-0 last:border-b-0"
                  margin={
                    <>
                      <h4 className="font-display text-[13.5px] font-semibold leading-snug text-ink">
                        {s.title}
                      </h4>
                      <div className="tnum mt-1 text-[11px] text-ink-faint">
                        {s.rows.length === 0 ? 'none' : s.rows.length}
                      </div>
                      {annotated && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-almanac-deep">
                          <Sparkles className="h-3 w-3" />
                          Almanac
                        </div>
                      )}
                    </>
                  }
                >
                  {s.rows.length === 0 ? (
                    <p className="text-[12px] italic text-ink-faint">{s.emptyNote}</p>
                  ) : (
                    <div className="space-y-4">
                      {s.rows.map((r) => (
                        <div key={`${s.title}-${r.name}`}>
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="tnum text-[11.5px] font-semibold text-plum">
                              {r.unit}
                            </span>
                            <span className="text-[12.5px] font-semibold text-ink">{r.name}</span>
                          </div>
                          <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
                            {r.detail}
                          </p>
                          {r.margin && (
                            <p className="mt-2 border-l border-almanac pl-3 text-[11.5px] leading-relaxed text-almanac-deep">
                              {r.margin}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </LedgerRow>
              )
            })}
          </div>
        </Sheet>

        {/* The argument, alongside the document */}
        <div className="space-y-5">
          <Panel>
            <div className="eyebrow">The report is correct</div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
              Everything on it was seen, worked and closed properly. The fall had a huddle by 07:05.
              The antibiotic has a pending culture. Nobody in this building missed anything.
            </p>
            <div className="mt-4 border-t border-line pt-4">
              <div className="eyebrow">And it has no memory</div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                It is a twenty four hour window by construction. A resident who appears three times
                in nine days, in three different sections, never appears as a trend. Nobody owns the
                ninth day. That is a property of the artifact, not a criticism of anybody reading it.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <AiTag>{marginMarks()} marks in the margin</AiTag>
                <span className="text-[11px] text-ink-faint">
                  the only thing on that page not from the report
                </span>
              </div>
            </div>
          </Panel>

          <Panel tone="quiet">
            <div className="eyebrow">How it gets made</div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">{ASSEMBLY.note}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div className="tnum text-figure-sm font-semibold text-ink">
                  {ASSEMBLY.exportsToday}
                </div>
                <div className="text-[11px] text-ink-faint">exports pulled by hand</div>
              </div>
              <div>
                <div className="tnum text-figure-sm font-semibold text-ink">
                  {ASSEMBLY.minutesByHand}
                </div>
                <div className="text-[11px] text-ink-faint">minutes, before seven each morning</div>
              </div>
            </div>
          </Panel>

          <Panel>
            <div className="eyebrow">Who this report covers</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-baseline justify-between border-b border-line pb-2">
                <span className="text-[12.5px] text-ink">Skilled nursing, {REPORT.campus}</span>
                <span className="tnum text-[12.5px] font-semibold text-ink">
                  {HERO_CAMPUS.census.SNF}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-line pb-2">
                <span className="text-[12.5px] text-ink">
                  Assisted and independent, same campus
                </span>
                <span className="tnum text-[12.5px] font-semibold text-change-deep">
                  {campusCensus(HERO_CAMPUS) - HERO_CAMPUS.census.SNF}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-[12.5px] text-ink">Across all eight campuses</span>
                <span className="tnum text-[12.5px] font-semibold text-change-deep">
                  {num(outsideTheReport())}
                </span>
              </div>
            </div>
            <Cite>
              {num(levelCensus('AL'))} in assisted living and {num(levelCensus('IL'))} in independent
              living, none of whom appear on any report of this kind
            </Cite>
          </Panel>
        </div>
      </div>

      {/* The section the report has never had */}
      <Panel tone={gapOpen ? 'ai' : 'surface'} className="transition-colors duration-500">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="eyebrow">{gapOpen ? 'Added this morning' : 'The missing section'}</div>
            <h3 className="mt-1 text-[16px] font-semibold text-ink">{THE_GAP.title}</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
              {gapOpen ? THE_GAP.after : THE_GAP.before}
            </p>
          </div>
          {!gapOpen && (
            <Button variant="ai" icon={Sparkles} onClick={openGap}>
              Read the other side of the campus
            </Button>
          )}
        </div>

        {gapOpen && (
          <div className="mt-5 animate-rise space-y-3 border-t border-almanac-tint pt-4">
            {THE_GAP.rows.map((r) => (
              <div key={r.name} className="border-b border-almanac-tint pb-3 last:border-b-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="tnum text-[11.5px] font-semibold text-plum">{r.unit}</span>
                  <span className="text-[12.5px] font-semibold text-ink">{r.name}</span>
                  {r.name === 'Marguerite Ellison' && <Tag tone="change">Change in condition</Tag>}
                </div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{r.detail}</p>
                {r.margin && (
                  <p className="mt-1 text-[11.5px] font-medium leading-relaxed text-almanac-deep">
                    {r.margin}
                  </p>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button variant="primary" icon={ArrowRight} onClick={() => navigate('/resident')}>
                Open Marguerite Ellison
              </Button>
              <Button variant="ghost" onClick={() => navigate('/watch')}>
                See the whole list
              </Button>
            </div>
          </div>
        )}
      </Panel>
    </div>
  )
}
