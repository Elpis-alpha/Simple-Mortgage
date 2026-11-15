import { useState } from 'react'
import { useElementWidth } from '@/hooks/useElementWidth'
import { pounds } from '@/lib/format'
import type { YearRow } from '@/lib/mortgage'
import { ChartTooltip } from './ChartTooltip'
import { axisPounds, niceMax, tickValues, yearTicks } from './scale'

const M = { top: 14, right: 18, bottom: 30, left: 50 }
const GAP = 2

/** A column with a rounded top and a square foot, so it sits on the baseline. */
function topRounded(x: number, y: number, w: number, h: number, r: number) {
  const k = Math.min(r, w / 2, h)
  return `M${x},${y + h}V${y + k}Q${x},${y} ${x + k},${y}H${x + w - k}Q${x + w},${y} ${x + w},${y + k}V${y + h}Z`
}

/**
 * Each year's payments, split into capital repaid and interest. On a
 * repayment mortgage the interest shrinks as the capital grows.
 */
export function YearBars({ years, termYears, height = 240 }: { years: YearRow[]; termYears: number; height?: number }) {
  const [ref, width] = useElementWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)

  const max = niceMax(Math.max(1, ...years.map((r) => r.principalPaid + r.interestPaid)))
  const plotW = Math.max(10, width - M.left - M.right)
  const plotH = height - M.top - M.bottom
  const band = plotW / Math.max(1, termYears)
  const barW = Math.max(2, Math.min(16, band * 0.62))
  const cx = (year: number) => M.left + (year - 0.5) * band
  const h = (value: number) => (value / max) * plotH
  const base = M.top + plotH

  const row = active === null ? undefined : years[active]

  return (
    <div ref={ref} className="relative" style={{ height }} onPointerLeave={() => setActive(null)}>
      <svg width={width} height={height} role="img" aria-label={`Stacked column chart of capital and interest paid in each of ${years.length} years. The schedule table below lists every value.`} className="block">
        {tickValues(max).map((t) => (
          <g key={t}>
            <line x1={M.left} x2={width - M.right} y1={base - h(t)} y2={base - h(t)} stroke="var(--line)" />
            <text x={M.left - 10} y={base - h(t)} dy="0.32em" textAnchor="end" className="tnum fill-ink-3 font-mono text-[10.5px]">
              {axisPounds(t, max)}
            </text>
          </g>
        ))}
        {yearTicks(termYears)
          .filter((y) => y > 0)
          .map((y) => (
            <text key={y} x={cx(y)} y={height - 8} textAnchor="middle" className="tnum fill-ink-3 font-mono text-[10.5px]">
              Yr {y}
            </text>
          ))}

        {years.map((r, i) => {
          const capital = h(r.principalPaid)
          const interest = h(r.interestPaid)
          const x = cx(r.year) - barW / 2
          const gap = capital > 0 && interest > GAP ? GAP : 0
          const dim = active !== null && active !== i
          return (
            <g key={r.year} opacity={dim ? 0.45 : 1} style={{ transition: 'opacity 0.15s ease' }}>
              {capital > 0 && (interest > gap ? <rect x={x} y={base - capital} width={barW} height={capital} fill="var(--blue)" /> : <path d={topRounded(x, base - capital, barW, capital, 4)} fill="var(--blue)" />)}
              {interest > gap && <path d={topRounded(x, base - capital - interest, barW, interest - gap, 4)} fill="var(--red)" />}
              {/* Hit area is the whole column slot, not just the painted bar. */}
              <rect
                x={M.left + (r.year - 1) * band}
                y={M.top}
                width={band}
                height={plotH}
                fill="transparent"
                tabIndex={0}
                aria-label={`Year ${r.year}: ${pounds(r.principalPaid)} capital, ${pounds(r.interestPaid)} interest`}
                className="outline-none"
                onPointerEnter={() => setActive(i)}
                onPointerDown={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              />
              {active === i && <rect x={x - 3} y={M.top} width={barW + 6} height={plotH} fill="none" stroke="var(--line-strong)" rx="3" pointerEvents="none" />}
            </g>
          )
        })}
        <line x1={M.left} x2={width - M.right} y1={base} y2={base} stroke="var(--line-strong)" />
      </svg>

      {row && (
        <ChartTooltip
          x={cx(row.year)}
          y={height * 0.4}
          width={width}
          title={`Year ${row.year}`}
          rows={[
            { label: 'Interest', value: pounds(row.interestPaid), color: 'var(--red)' },
            { label: 'Capital', value: pounds(row.principalPaid), color: 'var(--blue)' },
          ]}
          footer={`${pounds(row.balance)} still owed`}
        />
      )}
    </div>
  )
}
