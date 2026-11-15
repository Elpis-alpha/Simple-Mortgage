import { useId, type CSSProperties } from 'react'
import { useSpring } from '@/hooks/useSpring'

/*
 * Geometry of the elevation, in SVG user units. The fill level is solved
 * from these so that the shaded AREA matches the share owned: half the
 * house filled really is half the house.
 */
const VIEW = { w: 480, h: 306, top: 24 }
const GROUND = 290
const BODY = { x: 120, y: 140, w: 240, h: 150 }
const ROOF = { left: 100, right: 380, apexX: 240, apexY: 62, h: 78 }
const BODY_AREA = BODY.w * BODY.h
const ROOF_AREA = ((ROOF.right - ROOF.left) * ROOF.h) / 2
const TOTAL_AREA = BODY_AREA + ROOF_AREA

const WINDOWS = [
  { x: 146, y: 228 },
  { x: 286, y: 228 },
  { x: 146, y: 166 },
  { x: 286, y: 166 },
] as const
const WINDOW = { w: 48, h: 44 }
const ATTIC = { cx: 240, cy: 110, r: 13 }

/** Height of the fill line for a given owned share (0-1). */
export function levelFor(share: number): number {
  const area = Math.min(1, Math.max(0, share)) * TOTAL_AREA
  if (area <= BODY_AREA) return GROUND - area / BODY.w
  // Inside the gable the width narrows, so area grows with the square of height.
  const fraction = Math.min(1, (area - BODY_AREA) / ROOF_AREA)
  return BODY.y - ROOF.h * (1 - Math.sqrt(1 - fraction))
}

interface HouseElevationProps {
  /** Share of the home owned, 0-1. */
  share: number
  /** Skip the draw-on animation (used for small static copies). */
  still?: boolean
  /** Hide the percentage chip. */
  bare?: boolean
  className?: string
}

const draw = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms` })

/**
 * The house, drawn as an architect's front elevation. The part you own is
 * shaded from the ground up; the part still mortgaged is cross-hatched,
 * the way a drawing marks material that belongs to someone else.
 */
export function HouseElevation({ share, still = false, bare = false, className = '' }: HouseElevationProps) {
  const uid = useId().replace(/:/g, '')
  const animated = useSpring(share, { stiffness: 90, damping: 18 })
  const level = levelFor(animated)
  const percent = Math.round(animated * 100)
  const line = still ? '' : 'house-draw'

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
      <svg
        viewBox={`0 ${VIEW.top} ${VIEW.w} ${VIEW.h}`}
        className="absolute inset-0 size-full overflow-visible"
        role="img"
        aria-label={`Front elevation of a house, ${percent}% shaded to show the share you own`}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <clipPath id={`${uid}-shape`}>
            <rect x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} />
            <polygon points={`${ROOF.left},${BODY.y} ${ROOF.apexX},${ROOF.apexY} ${ROOF.right},${BODY.y}`} />
          </clipPath>
          <pattern id={`${uid}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--ink)" strokeWidth="1" opacity="0.2" />
          </pattern>
        </defs>

        {/* Lender's share: hatched. Your share: shaded, rising from the ground. */}
        <g clipPath={`url(#${uid}-shape)`} stroke="none" className={still ? '' : 'house-fade'} style={draw(900)}>
          <rect x={ROOF.left} y={ROOF.apexY} width={ROOF.right - ROOF.left} height={Math.max(0, level - ROOF.apexY)} fill={`url(#${uid}-hatch)`} />
          <rect x={ROOF.left} y={level} width={ROOF.right - ROOF.left} height={Math.max(0, GROUND - level)} fill="var(--blue)" opacity="0.2" />
        </g>

        {/* Ground line with earth hatching beneath it. */}
        <line x1="14" y1={GROUND} x2="466" y2={GROUND} pathLength="1" className={line} style={draw(0)} />
        <g strokeWidth="1" opacity="0.4" className={still ? '' : 'house-fade'} style={draw(500)}>
          {Array.from({ length: 23 }, (_, i) => (
            <line key={i} x1={26 + i * 19} y1={GROUND + 4} x2={18 + i * 19} y2={GROUND + 12} />
          ))}
        </g>

        {/* Tree and shrub */}
        <g>
          <line x1="58" y1={GROUND} x2="58" y2="222" pathLength="1" className={line} style={draw(700)} />
          <circle cx="58" cy="198" r="30" pathLength="1" className={line} style={draw(800)} />
          <path d="M58 244 L44 226 M58 234 L70 220" pathLength="1" strokeWidth="1" className={line} style={draw(1000)} />
        </g>

        {/* Windows glow once the fill reaches them. */}
        {WINDOWS.map((w, i) => {
          const lit = level <= w.y + WINDOW.h / 2
          return (
            <g key={i}>
              <rect
                x={w.x}
                y={w.y}
                width={WINDOW.w}
                height={WINDOW.h}
                stroke="none"
                fill="var(--glow)"
                style={{ opacity: lit ? 0.9 : 0, transition: 'opacity 0.7s ease' }}
              />
              <rect x={w.x} y={w.y} width={WINDOW.w} height={WINDOW.h} fill="var(--paper-raised)" fillOpacity={lit ? 0 : 0.55} pathLength="1" className={line} style={draw(500 + i * 90)} />
              <path
                d={`M${w.x + WINDOW.w / 2} ${w.y} V${w.y + WINDOW.h} M${w.x} ${w.y + WINDOW.h / 2} H${w.x + WINDOW.w}`}
                strokeWidth="1"
                pathLength="1"
                className={line}
                style={draw(700 + i * 90)}
              />
              <line x1={w.x - 4} y1={w.y + WINDOW.h + 3} x2={w.x + WINDOW.w + 4} y2={w.y + WINDOW.h + 3} pathLength="1" className={line} style={draw(800 + i * 90)} />
            </g>
          )
        })}
        <circle
          cx={ATTIC.cx}
          cy={ATTIC.cy}
          r={ATTIC.r}
          stroke="none"
          fill="var(--glow)"
          style={{ opacity: level <= ATTIC.cy ? 0.9 : 0, transition: 'opacity 0.7s ease' }}
        />
        <circle cx={ATTIC.cx} cy={ATTIC.cy} r={ATTIC.r} pathLength="1" className={line} style={draw(900)} />
        <path d={`M${ATTIC.cx} ${ATTIC.cy - ATTIC.r} V${ATTIC.cy + ATTIC.r} M${ATTIC.cx - ATTIC.r} ${ATTIC.cy} H${ATTIC.cx + ATTIC.r}`} strokeWidth="1" pathLength="1" className={line} style={draw(1000)} />

        {/* Door */}
        <rect x="220" y="222" width="40" height="68" fill="var(--paper-raised)" fillOpacity="0.55" pathLength="1" className={line} style={draw(600)} />
        <rect x="226" y="229" width="28" height="24" strokeWidth="1" pathLength="1" className={line} style={draw(800)} />
        <circle cx="252" cy="262" r="1.6" fill="var(--ink)" stroke="none" className={still ? '' : 'house-fade'} style={draw(1100)} />
        <line x1="212" y1={GROUND} x2="268" y2={GROUND} strokeWidth="3" pathLength="1" className={line} style={draw(900)} />

        {/* Walls, roof and chimney */}
        <path d={`M${BODY.x} ${GROUND} V${BODY.y} M${BODY.x + BODY.w} ${GROUND} V${BODY.y}`} pathLength="1" className={line} style={draw(150)} />
        <path d={`M${ROOF.left - 8} ${BODY.y + 4.5} L${ROOF.apexX} ${ROOF.apexY} L${ROOF.right + 8} ${BODY.y + 4.5}`} strokeWidth="2" pathLength="1" className={line} style={draw(300)} />
        <line x1={BODY.x} y1={BODY.y} x2={BODY.x + BODY.w} y2={BODY.y} strokeWidth="1" opacity="0.5" pathLength="1" className={line} style={draw(450)} />
        <path d="M298 94.3 V72 H324 V108.8 M294 72 H328" pathLength="1" className={line} style={draw(500)} />

        {/* Chimney smoke */}
        {!still && (
          <g stroke="var(--ink-3)" strokeWidth="1">
            {[0, 1.3, 2.6].map((delay) => (
              <circle key={delay} cx="311" cy="62" r="4" style={{ animation: `smoke 4s ease-out ${delay + 1.6}s infinite both`, transformOrigin: '311px 62px' }} />
            ))}
          </g>
        )}

        {/* The level line: a redline annotation marking how much is yours. */}
        {/* Fades away once the house is fully owned: there is no line left to draw. */}
        <g style={{ opacity: animated >= 0.995 ? 0 : 1, transition: 'opacity 0.6s ease' }}>
          <g className={still ? '' : 'house-fade'} style={draw(1300)}>
            <line x1="88" y1={level} x2="392" y2={level} stroke="var(--red)" strokeWidth="1.25" strokeDasharray="5 4" />
            <path d={`M392 ${level - 4} L399 ${level} L392 ${level + 4}`} stroke="var(--red)" strokeWidth="1.25" />
          </g>
        </g>
      </svg>

      {!bare && (
        <div
          className={`absolute left-[84%] -translate-y-[calc(100%+0.375rem)] ${still ? '' : 'house-fade'}`}
          style={{ top: `${((level - VIEW.top) / VIEW.h) * 100}%`, ...draw(1400) }}
          aria-hidden="true"
        >
          <p className="label text-red-ink">yours</p>
          <p className="tnum mt-0.5 text-[clamp(1.125rem,2.2vw,1.625rem)] leading-none font-semibold tracking-tight text-ink">{percent}%</p>
        </div>
      )}
    </div>
  )
}
