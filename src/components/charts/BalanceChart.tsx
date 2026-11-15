import { useState, type KeyboardEvent, type PointerEvent } from 'react'
import { useElementWidth } from '@/hooks/useElementWidth'
import { clamp, pounds } from '@/lib/format'
import { ChartTooltip, type TooltipRow } from './ChartTooltip'
import { axisPounds, niceMax, tickValues, yearTicks } from './scale'

interface BalanceChartProps {
  /** Monthly balances for the plan being shown. Index 0 is the opening balance. */
  balances: number[]
  /** Monthly balances without overpayments, drawn for comparison when given. */
  baseline?: number[]
  termYears: number
  propertyValue: number
  height?: number
}

const M = { top: 14, right: 18, bottom: 30, left: 50 }

/**
 * What is still owed, year by year. A crosshair snaps to the nearest year
 * and reads out every series; arrow keys move it for keyboard users.
 */
export function BalanceChart({ balances, baseline, termYears, propertyValue, height = 300 }: BalanceChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)

  const months = termYears * 12
  const max = niceMax(balances[0] ?? 0)
  const plotW = Math.max(10, width - M.left - M.right)
  const plotH = height - M.top - M.bottom
  const x = (month: number) => M.left + (month / months) * plotW
  const y = (value: number) => M.top + plotH - (value / max) * plotH
  const at = (series: number[], month: number) => series[Math.min(month, series.length - 1)] ?? 0

  const path = (series: number[]) => series.map((v, m) => `${m === 0 ? 'M' : 'L'}${x(m).toFixed(1)},${y(v).toFixed(1)}`).join('')
  const line = path(balances)
  const lastMonth = balances.length - 1
  const area = `${line}L${x(lastMonth).toFixed(1)},${y(0)}L${x(0)},${y(0)}Z`

  const setFromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - box.left
    setActive(clamp(Math.round(((px - M.left) / plotW) * termYears), 0, termYears))
  }

  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const current = active ?? 0
    setActive(e.key === 'Home' ? 0 : e.key === 'End' ? termYears : clamp(current + (e.key === 'ArrowRight' ? 1 : -1), 0, termYears))
  }

  const activeMonth = active === null ? null : active * 12
  const rows: TooltipRow[] =
    activeMonth === null
      ? []
      : [
          { label: baseline ? 'With overpayments' : 'Balance', value: pounds(at(balances, activeMonth)), color: 'var(--blue)' },
          ...(baseline ? [{ label: 'Without', value: pounds(at(baseline, activeMonth)), color: 'var(--ink-3)', dashed: true }] : []),
        ]
  const owned = activeMonth === null || propertyValue <= 0 ? 0 : Math.round((1 - at(balances, activeMonth) / propertyValue) * 100)

  return (
    <div ref={ref} className="relative" style={{ height }}>
      <svg
        width={width}
        height={height}
        role="img"
        tabIndex={0}
        aria-label={`Line chart of the balance owed over ${termYears} years, falling from ${pounds(balances[0] ?? 0)} to ${pounds(at(balances, months))}. Use the arrow keys to read each year.`}
        className="block touch-pan-y rounded-sm outline-offset-4"
        onPointerMove={setFromPointer}
        onPointerDown={setFromPointer}
        onPointerLeave={() => setActive(null)}
        onBlur={() => setActive(null)}
        onKeyDown={onKey}
      >
        {/* Horizontal grid and money axis */}
        {tickValues(max).map((t) => (
          <g key={t}>
            <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke="var(--line)" />
            <text x={M.left - 10} y={y(t)} dy="0.32em" textAnchor="end" className="tnum fill-ink-3 font-mono text-[10.5px]">
              {axisPounds(t, max)}
            </text>
          </g>
        ))}
        {/* Year axis */}
        {yearTicks(termYears).map((yr) => (
          <text key={yr} x={x(yr * 12)} y={height - 8} textAnchor="middle" className="tnum fill-ink-3 font-mono text-[10.5px]">
            {yr === 0 ? 'Now' : `Yr ${yr}`}
          </text>
        ))}

        <path d={area} fill="var(--blue)" opacity="0.1" />
        {baseline && <path d={path(baseline)} fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="5 4" strokeLinejoin="round" />}
        <path d={line} fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Direct label where the plan finishes */}
        {baseline && lastMonth < months && (
          <g>
            <circle cx={x(lastMonth)} cy={y(0)} r="5" fill="var(--blue)" stroke="var(--paper-raised)" strokeWidth="2" />
            <text x={x(lastMonth)} y={y(0) - 14} textAnchor="middle" className="fill-ink text-[11.5px] font-medium">
              Paid off
            </text>
          </g>
        )}

        {activeMonth !== null && (
          <g pointerEvents="none">
            <line x1={x(activeMonth)} x2={x(activeMonth)} y1={M.top} y2={M.top + plotH} stroke="var(--line-strong)" />
            {baseline && <circle cx={x(activeMonth)} cy={y(at(baseline, activeMonth))} r="4" fill="var(--ink-3)" stroke="var(--paper-raised)" strokeWidth="2" />}
            <circle cx={x(activeMonth)} cy={y(at(balances, activeMonth))} r="5" fill="var(--blue)" stroke="var(--paper-raised)" strokeWidth="2" />
          </g>
        )}
      </svg>

      {activeMonth !== null && active !== null && (
        <ChartTooltip
          x={x(activeMonth)}
          y={clamp(y(at(balances, activeMonth)), 60, height - 70)}
          width={width}
          title={active === 0 ? 'Today' : `After ${active} ${active === 1 ? 'year' : 'years'}`}
          rows={rows}
          footer={`You own ${owned}% of the home`}
        />
      )}
    </div>
  )
}
