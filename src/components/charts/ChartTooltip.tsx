import type { ReactNode } from 'react'

export interface TooltipRow {
  label: string
  value: string
  /** CSS colour of the series, drawn as a short stroke beside the label. */
  color?: string
  dashed?: boolean
}

interface ChartTooltipProps {
  /** Position of the anchor point inside the chart, in pixels. */
  x: number
  y: number
  /** Width of the chart, used to flip the tooltip before it leaves the edge. */
  width: number
  title: string
  rows: TooltipRow[]
  footer?: ReactNode
}

/** One tooltip for the whole chart. Values lead; the series name follows. */
export function ChartTooltip({ x, y, width, title, rows, footer }: ChartTooltipProps) {
  const flip = x > width * 0.58
  return (
    <div
      role="presentation"
      className="pointer-events-none absolute z-10 min-w-44 rounded-md border border-line-strong bg-raised px-3.5 py-3 shadow-sheet"
      style={{
        left: x,
        top: Math.max(0, y),
        transform: `translate(${flip ? 'calc(-100% - 14px)' : '14px'}, -50%)`,
      }}
    >
      <p className="label">{title}</p>
      <dl className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-5">
            <dt className="flex items-center gap-2 text-[0.8125rem] text-ink-2">
              {row.color && (
                <span
                  aria-hidden="true"
                  className="inline-block h-0.5 w-3.5 rounded-full"
                  style={row.dashed ? { backgroundImage: `linear-gradient(90deg, ${row.color} 60%, transparent 60%)`, backgroundSize: '5px 2px' } : { background: row.color }}
                />
              )}
              {row.label}
            </dt>
            <dd className="tnum text-[0.9375rem] font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
      {footer && <p className="mt-2.5 border-t border-line pt-2 text-[0.8125rem] text-ink-2">{footer}</p>}
    </div>
  )
}
