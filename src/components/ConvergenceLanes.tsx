import { useState } from 'react'
import { LANES, SIGNALS, type Signal } from '../data/marguerite'

// Nineteen days, eight lanes, twelve marks.
//
// This is not a chart and it could not be one. The content is eight
// heterogeneous data types on a shared time axis: a meal attendance count, a
// medication refusal, an absence from a sign in sheet, a sentence somebody
// typed, a work order, a weight in pounds. They cannot share a y axis, and any
// charting library would either force one or collapse into eight sparklines
// with no shared meaning.
//
// The hairline across each lane is the thing no chart library gives you, and it
// is the whole argument. It sits at the height that lane's own rule would have
// fired. Every mark is visibly underneath it. Three lanes have no rule at all, so
// their hairline is absent and labelled as absent, which is worse.

const START = '2026-07-16'
const END = '2026-08-04'

const dayIndex = (iso: string) =>
  Math.round(
    (new Date(`${iso}T12:00:00`).getTime() - new Date(`${START}T12:00:00`).getTime()) / 86400000,
  )

const TOTAL_DAYS = dayIndex(END)

const W = 1040
const PAD_L = 132
const PAD_R = 20
const PAD_T = 34
const LANE_H = 44
const H = PAD_T + LANES.length * LANE_H + 30

const x = (d: number) => PAD_L + (d / TOTAL_DAYS) * (W - PAD_L - PAD_R)
const laneTop = (i: number) => PAD_T + i * LANE_H

/** Lanes where no monitoring rule exists at all for the field. */
const NO_RULE_LANES = new Set(
  LANES.filter((lane) => SIGNALS.filter((s) => s.lane === lane).every((s) => s.noRule)),
)

export function ConvergenceLanes({ onPick }: { onPick?: (s: Signal) => void }) {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div className="xscroll -mx-1 px-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[860px]"
        role="img"
        aria-label="Twelve entries across eight logs over nineteen days, each sitting under the rule that would have escalated it"
      >
        {/* Day ruling */}
        {Array.from({ length: TOTAL_DAYS + 1 }, (_, d) => (
          <line
            key={d}
            x1={x(d)}
            x2={x(d)}
            y1={PAD_T - 8}
            y2={PAD_T + LANES.length * LANE_H}
            stroke="#DFD1DA"
            strokeWidth={d % 7 === 0 ? 1.2 : 0.6}
          />
        ))}

        {/* Date labels, every third day */}
        {Array.from({ length: TOTAL_DAYS + 1 }, (_, d) => d)
          .filter((d) => d % 3 === 0 || d === TOTAL_DAYS)
          .map((d) => {
            const date = new Date(new Date(`${START}T12:00:00`).getTime() + d * 86400000)
            return (
              <text
                key={d}
                x={x(d)}
                y={PAD_T - 14}
                textAnchor="middle"
                className="tnum"
                fontSize="9.5"
                fill="#796D75"
              >
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            )
          })}

        {/* The correlation window Almanac drew, 23 Jul to today */}
        <rect
          x={x(dayIndex('2026-07-23'))}
          y={PAD_T - 6}
          width={x(TOTAL_DAYS) - x(dayIndex('2026-07-23'))}
          height={LANES.length * LANE_H + 6}
          fill="#1F63EE"
          opacity="0.05"
        />
        <line
          x1={x(dayIndex('2026-07-23'))}
          x2={x(TOTAL_DAYS)}
          y1={PAD_T + LANES.length * LANE_H + 12}
          y2={PAD_T + LANES.length * LANE_H + 12}
          stroke="#1F63EE"
          strokeWidth="1.4"
          strokeDasharray="760"
          className="animate-thread"
        />
        <text
          x={(x(dayIndex('2026-07-23')) + x(TOTAL_DAYS)) / 2}
          y={PAD_T + LANES.length * LANE_H + 25}
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
          fill="#1547AF"
        >
          The window Almanac read across
        </text>

        {/* Lanes */}
        {LANES.map((lane, i) => {
          const top = laneTop(i)
          const noRule = NO_RULE_LANES.has(lane)
          return (
            <g key={lane}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={top + LANE_H}
                y2={top + LANE_H}
                stroke="#DFD1DA"
                strokeWidth="0.8"
              />
              <text x={0} y={top + LANE_H / 2 + 3} fontSize="10.5" fill="#544A51" fontWeight="500">
                {lane}
              </text>
              {/* The rule this lane escalates on, drawn at the height it fires */}
              {!noRule ? (
                <line
                  x1={PAD_L}
                  x2={W - PAD_R}
                  y1={top + 7}
                  y2={top + 7}
                  stroke="#BC3A1D"
                  strokeWidth="0.9"
                  strokeDasharray="3 3"
                  opacity="0.55"
                />
              ) : (
                <text x={PAD_L + 4} y={top + 10} fontSize="8.5" fill="#796D75" fontStyle="italic">
                  no rule exists for this field
                </text>
              )}
            </g>
          )
        })}

        {/* Marks */}
        {SIGNALS.map((s) => {
          const li = LANES.indexOf(s.lane)
          const top = laneTop(li)
          const cx = x(dayIndex(s.date))
          const cy = top + LANE_H - 6 - s.level * (LANE_H - 20)
          const on = hover === s.id
          return (
            <g
              key={s.id}
              className="animate-mark cursor-pointer"
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onPick?.(s)}
            >
              <line x1={cx} x2={cx} y1={top + LANE_H - 4} y2={cy} stroke="#A04C7C" strokeWidth="1" />
              {s.quoted ? (
                <rect
                  x={cx - 4}
                  y={cy - 4}
                  width="8"
                  height="8"
                  transform={`rotate(45 ${cx} ${cy})`}
                  fill={on ? '#6E2150' : '#FCF9FB'}
                  stroke="#6E2150"
                  strokeWidth="1.4"
                />
              ) : (
                <rect
                  x={cx - 3.6}
                  y={cy - 3.6}
                  width="7.2"
                  height="7.2"
                  fill={on ? '#6E2150' : '#A04C7C'}
                />
              )}
              {on && (
                <text
                  x={cx}
                  y={cy - 9}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill="#6E2150"
                >
                  {s.value ?? ''}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 bg-plum-soft" /> Recorded value
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rotate-45 border-[1.4px] border-plum bg-surface" />{' '}
          Free text somebody typed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-4 border-t border-dashed border-acute" /> Where
          that lane’s rule fires
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-4 bg-almanac" /> Almanac
        </span>
      </div>
    </div>
  )
}
