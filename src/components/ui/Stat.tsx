import type { ReactNode } from 'react'

/** A labelled figure. Numbers use the sans face and stay in text colours. */
export function Stat({ label, value, sub, className = '' }: { label: string; value: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="label">{label}</dt>
      <dd className="tnum mt-1.5 text-[1.375rem] leading-tight font-semibold tracking-[-0.025em] text-ink">{value}</dd>
      {sub && <dd className="mt-1 text-[0.8125rem] text-ink-3">{sub}</dd>}
    </div>
  )
}
