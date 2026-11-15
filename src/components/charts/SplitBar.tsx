import { pounds } from '@/lib/format'

export interface SplitPart {
  label: string
  value: number
  /** CSS colour for the block. */
  color: string
}

/**
 * One whole split into its parts: a tall segmented bar with each share
 * printed inside its block when there is room, and a legend naming them.
 */
export function SplitBar({ parts, ariaLabel }: { parts: SplitPart[]; ariaLabel: string }) {
  const visible = parts.filter((p) => p.value > 0)
  const total = visible.reduce((sum, p) => sum + p.value, 0)
  if (total <= 0) return null

  const summary = visible.map((p) => `${p.label} ${pounds(p.value)} (${Math.round((p.value / total) * 100)}%)`).join(', ')

  return (
    <div>
      <div role="img" aria-label={`${ariaLabel}: ${summary}`} className="flex h-7 gap-0.5">
        {visible.map((p) => {
          const share = (p.value / total) * 100
          return (
            <div
              key={p.label}
              title={`${p.label}: ${pounds(p.value)} (${Math.round(share)}%)`}
              className="flex min-w-1 items-center rounded-[4px] px-2 transition-[flex-basis] duration-700 ease-(--ease-out-expo)"
              style={{ flexBasis: `${share}%`, background: p.color }}
            >
              {share >= 12 && <span className="tnum text-[0.75rem] font-semibold text-white">{Math.round(share)}%</span>}
            </div>
          )
        })}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
        {visible.map((p) => (
          <li key={p.label} className="flex items-center gap-2 text-[0.8125rem] text-ink-2">
            <span aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ background: p.color }} />
            {p.label}
            <span className="tnum font-medium text-ink">{pounds(p.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
