import type { ReactNode } from 'react'

interface Segment {
  /** Fraction of the whole, 0-1. */
  share: number
  label: string
  value: ReactNode
  tone: 'blue' | 'ink'
}

const Tick = ({ style }: { style?: React.CSSProperties }) => (
  <span aria-hidden="true" className="absolute top-1/2 h-3 w-px -translate-y-1/2 rotate-45 bg-ink" style={style} />
)

/**
 * An architect's dimension line: a measured span with slash ticks at each
 * end. Here it measures money rather than millimetres.
 */
export function DimensionLine({ segments, className = '' }: { segments: [Segment, Segment]; className?: string }) {
  const [a, b] = segments
  const split = Math.min(0.97, Math.max(0.03, a.share)) * 100

  return (
    <div className={className}>
      <div className="relative h-3">
        <span aria-hidden="true" className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-blue transition-[width] duration-700 ease-(--ease-out-expo)" style={{ width: `${split}%` }} />
        <span aria-hidden="true" className="absolute top-1/2 right-0 h-px -translate-y-1/2 bg-ink transition-[left] duration-700 ease-(--ease-out-expo)" style={{ left: `${split}%` }} />
        <Tick style={{ left: 0 }} />
        <Tick style={{ left: `${split}%`, transition: 'left 0.7s var(--ease-out-expo)' }} />
        <Tick style={{ right: 0 }} />
      </div>
      <dl className="mt-2 flex justify-between gap-3">
        {[a, b].map((s, i) => (
          <div key={s.label} className={i === 1 ? 'text-right' : ''}>
            <dt className="label flex items-center gap-1.5" style={{ justifyContent: i === 1 ? 'flex-end' : undefined }}>
              <span aria-hidden="true" className={`inline-block h-0.5 w-2.5 ${s.tone === 'blue' ? 'bg-blue' : 'bg-ink'}`} />
              {s.label}
            </dt>
            <dd className="tnum mt-0.5 font-mono text-[0.8125rem] text-ink">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
