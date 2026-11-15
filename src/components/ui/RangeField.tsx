import { useEffect, useId, useState, type CSSProperties } from 'react'
import { clamp, integer } from '@/lib/format'

interface RangeFieldProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  prefix?: string
  suffix?: string
  /** Decimal places shown in the text box. */
  decimals?: number
  /** Small note shown under the slider, e.g. "20% of the price". */
  hint?: string
  tone?: 'blue' | 'red'
}

const show = (n: number, decimals: number) => (decimals > 0 ? n.toFixed(decimals) : integer(n))

/**
 * A slider paired with a typed value. Dragging is quick; typing is exact.
 * The text box keeps whatever is being typed until it loses focus, then
 * snaps to a valid number.
 */
export function RangeField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix,
  suffix,
  decimals = 0,
  hint,
  tone = 'blue',
}: RangeFieldProps) {
  const id = useId()
  const [draft, setDraft] = useState<string | null>(null)

  // If the value changes from outside while typing, drop the stale draft.
  useEffect(() => setDraft(null), [value])

  const commit = (raw: string) => {
    const parsed = Number(raw.replace(/[^0-9.]/g, ''))
    setDraft(null)
    if (raw.trim() === '' || Number.isNaN(parsed)) return
    onChange(clamp(parsed, min, max))
  }

  const fill = max > min ? ((clamp(value, min, max) - min) / (max - min)) * 100 : 0
  const text = draft ?? show(value, decimals)

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.8125rem] font-medium text-ink-2">
          {label}
        </label>
        <div className="flex items-baseline border-b border-line-strong font-mono text-[0.9375rem] text-ink transition-colors focus-within:border-blue">
          {prefix && <span className="text-ink-3">{prefix}</span>}
          <input
            aria-label={`${label}, exact value`}
            inputMode={decimals > 0 ? 'decimal' : 'numeric'}
            className="tnum bg-transparent py-0.5 text-right outline-none"
            style={{ width: `${Math.max(text.length, 2) + 0.5}ch` }}
            value={text}
            onChange={(e) => setDraft(e.target.value)}
            onFocus={(e) => e.target.select()}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
            }}
          />
          {suffix && <span className="pl-1 text-ink-3">{suffix}</span>}
        </div>
      </div>
      <input
        id={id}
        type="range"
        className={`range mt-1 ${tone === 'red' ? 'range-red' : ''}`}
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--fill': `${fill}%` } as CSSProperties}
        aria-valuetext={`${prefix ?? ''}${show(value, decimals)}${suffix ? ` ${suffix}` : ''}`}
      />
      {hint && <p className="label -mt-0.5 normal-case tracking-normal">{hint}</p>}
    </div>
  )
}
