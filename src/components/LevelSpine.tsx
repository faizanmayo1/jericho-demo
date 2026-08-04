import { LEVEL_HISTORY } from '../data/marguerite'

// Three and a half years of one resident, banded by the level of care she was
// living in, with the height of each band set by how densely that level is
// documented.
//
// This is the cross level argument rendered rather than asserted. Seventeen days
// of skilled nursing produced more record than thirty two months of independent
// living and eight months of assisted living put together. She is standing in
// the thinnest part of her own history, which is the part where nothing fires.

const W = 1040
const PAD_L = 8
const PAD_R = 8
const PAD_T = 30
const BASE_H = 120

const LEVEL_FILL: Record<string, string> = {
  IL: '#E7DAE3',
  AL: '#F0D8E5',
  SNF: '#6E2150',
}

const LEVEL_TEXT: Record<string, string> = {
  IL: '#544A51',
  AL: '#3A1730',
  SNF: '#FFFFFF',
}

const LEVEL_NAME: Record<string, string> = {
  IL: 'Independent living',
  AL: 'Assisted living',
  SNF: 'Skilled nursing',
}

export function LevelSpine() {
  const maxTouch = Math.max(...LEVEL_HISTORY.map((l) => l.touchesPerMonth))
  // Width is time, height is documentation density. Log scale on the height, or
  // the skilled band would be two hundred times the assisted one and the
  // assisted band would vanish, which would overstate a point that is already
  // strong enough.
  const heightOf = (t: number) =>
    18 + (Math.log(t + 1) / Math.log(maxTouch + 1)) * (BASE_H - 18)
  const totalMonths = LEVEL_HISTORY.reduce((t, l) => t + l.months, 0)
  const usable = W - PAD_L - PAD_R

  let cursor = PAD_L

  return (
    <div className="xscroll -mx-1 px-1">
      <svg
        viewBox={`0 0 ${W} ${PAD_T + BASE_H + 58}`}
        className="h-auto w-full min-w-[760px]"
        role="img"
        aria-label="Care level history, where band width is time and band height is how densely that level is documented"
      >
        <text x={PAD_L} y={14} fontSize="10" fill="#796D75">
          Width is time. Height is how much record that level produces per month.
        </text>

        {LEVEL_HISTORY.map((l) => {
          const w = (l.months / totalMonths) * usable
          const h = heightOf(l.touchesPerMonth)
          const y = PAD_T + BASE_H - h
          const rect = (
            <g key={`${l.level}-${l.from}`} className="animate-fade-in">
              <rect
                x={cursor}
                y={y}
                width={w}
                height={h}
                fill={LEVEL_FILL[l.level]}
                stroke="#C4B0BE"
                strokeWidth="0.8"
              />
              {w > 90 && (
                <>
                  <text
                    x={cursor + 10}
                    y={y + 16}
                    fontSize="10.5"
                    fontWeight="600"
                    fill={LEVEL_TEXT[l.level]}
                  >
                    {LEVEL_NAME[l.level]}
                  </text>
                  <text
                    x={cursor + 10}
                    y={y + 30}
                    fontSize="9.5"
                    fill={l.level === 'SNF' ? '#C888A9' : '#796D75'}
                    className="tnum"
                  >
                    {l.touchesPerMonth} entries a month
                  </text>
                </>
              )}
              <text
                x={cursor + 2}
                y={PAD_T + BASE_H + 14}
                fontSize="9.5"
                fill="#544A51"
                className="tnum"
              >
                {l.from}
              </text>
              <text x={cursor + 2} y={PAD_T + BASE_H + 26} fontSize="9" fill="#796D75">
                {l.campus}
              </text>
            </g>
          )
          cursor += w
          return rect
        })}

        {/* Where she is standing now */}
        <g>
          <line
            x1={W - PAD_R}
            x2={W - PAD_R}
            y1={PAD_T - 6}
            y2={PAD_T + BASE_H + 4}
            stroke="#1F63EE"
            strokeWidth="1.6"
          />
          <circle cx={W - PAD_R} cy={PAD_T - 6} r="3.4" fill="#1F63EE" />
          <text
            x={W - PAD_R - 6}
            y={PAD_T + BASE_H + 42}
            textAnchor="end"
            fontSize="9.5"
            fontWeight="600"
            fill="#1547AF"
          >
            She is here, in the thinnest part of her own record
          </text>
        </g>
      </svg>
    </div>
  )
}
