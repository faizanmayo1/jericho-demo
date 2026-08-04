import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Cite, Panel, PanelHead, SectionTitle, Stat, Tag } from '../components/ui'
import {
  BELOW_THE_LINE,
  CAPACITY,
  RUNG_LABEL,
  WATCH,
  YESTERDAY,
  namesAt,
  namesTheMorningHolds,
  notOnReport,
  unowned,
} from '../data/watch'
import {
  CAMPUSES,
  HERO_CAMPUS,
  byCounty,
  campusCensus,
  flaggedShare,
  groupCensus,
  groupChainedJuly,
  groupFlagged,
  groupTransfersJuly,
} from '../data/campuses'
import { CLIENT, num, oneIn, pct } from '../data/jericho'

export function Watch() {
  const navigate = useNavigate()

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow={`${HERO_CAMPUS.name} · ${CLIENT.today}`}
        title="Where the line falls"
        sub={`${WATCH.length} names out of ${num(campusCensus(HERO_CAMPUS))} residents. The length of this list is set by how long your stand up is, not by a score. That is the whole reason it is worth reading.`}
      />

      {/* The cut, argued in minutes rather than in thresholds */}
      <Panel tone="quiet">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Stand-up"
            value={`${CAPACITY.standUpMinutes}`}
            unit="min"
            note={`${CLIENT.standUp} to ${CLIENT.standUpEnds}, of which the watch list gets ${CAPACITY.minutesForWatch}`}
          />
          <Stat
            label="A name that produces a decision"
            value={`${CAPACITY.minutesPerName}`}
            unit="min"
            note={`So the morning holds ${namesTheMorningHolds()} names, and the next one would cost the others their meaning`}
          />
          <Stat
            label="This morning"
            value={`${WATCH.length} of ${num(campusCensus(HERO_CAMPUS))}`}
            tone="plum"
            note={`${oneIn(WATCH.length, campusCensus(HERO_CAMPUS))} residents, ${pct(WATCH.length / campusCensus(HERO_CAMPUS))} of census`}
          />
          <Stat
            label="Names with nobody on them"
            value={`${unowned()}`}
            tone="change"
            note={`And ${notOnReport()} of the ${WATCH.length} do not appear on the 24 hour report at all`}
          />
        </div>
        <p className="mt-5 border-t border-line pt-4 text-[12.5px] leading-relaxed text-ink-soft">
          The cut is capacity bounded, not threshold bounded. If the room grew to forty minutes the
          list would grow to {namesAt(40)}. It is a promise about somebody's morning rather than a
          measurement of anybody's condition, and everything below the line stays on the record one
          click away.
        </p>
        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
          One thing worth saying out loud, because it is the first question an operator asks. The
          stand up is a skilled nursing meeting and the DON compiles the report, so she does not run
          assisted living and should not be handed it. The {WATCH.filter((w) => w.level !== 'SNF').length}{' '}
          names below that sit outside skilled nursing carry the Wellness Director and the Executive
          Director as their owners, not the DON. They are on one list because the resident is one
          person, and they are routed to two different people because the licence says so.
        </p>
      </Panel>

      {/* The list, ranked by unownedness */}
      <Panel flush>
        <PanelHead
          eyebrow="Ranked by how little of it is already owned"
          title="This morning's list"
          sub="The 24 hour report already routes the loud things. A witnessed fall has a unit manager on it before anybody sits down. This list is for what nobody has."
        />
        <div className="border-t border-line">
          {WATCH.map((w) => (
            <button
              key={w.name}
              type="button"
              onClick={() => w.heroLink && navigate('/resident')}
              className={`flex w-full gap-4 border-b border-line px-5 py-4 text-left transition-colors last:border-b-0 ${
                w.heroLink ? 'cursor-pointer bg-plum-wash/50 hover:bg-plum-wash' : 'hover:bg-mist/50'
              }`}
            >
              <span className="tnum w-6 shrink-0 pt-0.5 text-[13px] font-semibold text-ink-faint">
                {w.rank}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="text-[13.5px] font-semibold text-ink">{w.name}</span>
                  <span className="tnum text-[11.5px] text-plum">{w.unit}</span>
                  <span className="tnum text-[11px] text-ink-faint">{w.age}</span>
                  <Tag tone={w.rung}>{RUNG_LABEL[w.rung]}</Tag>
                  {!w.onReport && (
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-ink-faint">
                      not on the report
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-[12px] leading-relaxed text-ink-soft">{w.why}</span>
                <span className="mt-1.5 block text-[11.5px] leading-relaxed">
                  {w.owner ? (
                    <span className="text-ink-faint">Owned by {w.owner}</span>
                  ) : (
                    <span className="font-semibold text-change-deep">Nobody has this one</span>
                  )}
                </span>
              </span>
              {w.heroLink && (
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-plum" />
              )}
            </button>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHead
            eyebrow="Deliberately not on the list"
            title="Louder things that stayed below the line"
            sub={`Each of these is more dramatic than most of the ${WATCH.length} above. Every one of them already has a person, a clock and a next step.`}
          />
          <div className="space-y-3">
            {BELOW_THE_LINE.map((b) => (
              <div key={b.what} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
                <div className="text-[12.5px] font-semibold text-ink">{b.what}</div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{b.why}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHead
            eyebrow={`Yesterday, ${YESTERDAY.date}`}
            title="Including the ones that closed as nothing"
            sub="A watch list that never closes anything as nothing is a watch list with the bar set too high."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Flagged" value={YESTERDAY.flagged} />
            <Stat label="Produced action" value={YESTERDAY.producedAction} tone="plum" />
            <Stat label="Closed as stable" value={YESTERDAY.closedAsStable} tone="baseline" />
            <Stat label="Still open" value={YESTERDAY.stillOpen} tone="change" />
          </div>
          <div className="mt-4 space-y-2 border-t border-line pt-4">
            <Cite>
              Of the {YESTERDAY.flagged} flagged, {YESTERDAY.transfersAmongFlagged} transferred. Of
              the rest, {YESTERDAY.transfersAmongUnflagged} did. {YESTERDAY.unflaggedTransferReason}
            </Cite>
          </div>
          <blockquote className="mt-4 border-l-2 border-almanac bg-almanac-wash py-2.5 pl-3 pr-3 text-[12.5px] italic leading-relaxed text-almanac-deep">
            {YESTERDAY.almanacLine}
          </blockquote>
        </Panel>
      </div>

      {/* The group, typeset as a list rather than drawn as a grid of tiles */}
      <Panel flush>
        <PanelHead
          eyebrow="The same cut, across the group"
          title={`${groupFlagged()} names out of ${num(groupCensus())} residents`}
          sub={`No campus above five percent of its own census. In July there were ${groupTransfersJuly()} unplanned transfers across the eight, and on retrospective replay ${groupChainedJuly()} of them carried three or more documented signals over five or more days beforehand. That is an observation about the record, not a claim that ${groupChainedJuly()} were preventable.`}
        />
        <div className="border-t border-line px-5 pb-5 pt-4">
          {byCounty().map((group) => (
            <div key={group.county} className="mb-5 last:mb-0">
              <div className="eyebrow mb-2">{group.county} County</div>
              <div className="space-y-1.5">
                {group.campuses.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-line py-1.5 last:border-b-0"
                  >
                    <span className="w-40 shrink-0 text-[12.5px] font-semibold text-ink">
                      {c.name}
                    </span>
                    <span className="w-20 shrink-0 text-[11.5px] text-ink-faint">{c.town}</span>
                    <span className="tnum w-24 shrink-0 text-[11.5px] text-ink-soft">
                      {num(campusCensus(c))} residents
                    </span>
                    <span className="tnum w-20 shrink-0 text-[11.5px] font-semibold text-plum">
                      {c.flagged} flagged
                    </span>
                    <span className="tnum w-16 shrink-0 text-[11.5px] text-ink-faint">
                      {pct(flaggedShare(c))}
                    </span>
                    <span className="tnum text-[11.5px] text-ink-faint">
                      {c.chainedJuly} of {c.transfersJuly} July transfers carried a chain
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="mt-3 text-[11.5px] leading-relaxed text-ink-faint">
            Eight campuses, typeset rather than mapped. There is real geography here and no
            coordinate data behind this demo, and an invented map of Fresno and Madera counties is
            exactly the detail that gets noticed. {CAMPUSES.length} campuses, sorted by town.
          </p>
        </div>
      </Panel>
    </div>
  )
}
