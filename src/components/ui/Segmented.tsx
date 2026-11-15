import { useId, type CSSProperties } from 'react'

interface Option<T extends string> {
  value: T
  label: string
}

interface SegmentedProps<T extends string> {
  label: string
  options: readonly Option<T>[]
  value: T
  onChange: (value: T) => void
  /** Hide the visible label but keep it for screen readers. */
  hideLabel?: boolean
  size?: 'md' | 'lg'
}

/** A radio group drawn as one control, with a pill that slides to the choice. */
export function Segmented<T extends string>({ label, options, value, onChange, hideLabel, size = 'md' }: SegmentedProps<T>) {
  const name = useId()
  const index = Math.max(0, options.findIndex((o) => o.value === value))

  return (
    <fieldset>
      <legend className={hideLabel ? 'sr-only' : 'field-label'}>{label}</legend>
      <div
        className="relative grid rounded-full border border-line-strong bg-raised p-1"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-solid transition-transform duration-500 ease-(--ease-out-expo)"
          style={
            {
              width: `calc((100% - 0.5rem) / ${options.length})`,
              transform: `translateX(${index * 100}%)`,
            } as CSSProperties
          }
        />
        {options.map((option) => {
          const checked = option.value === value
          return (
            <label
              key={option.value}
              className={`relative z-10 cursor-pointer rounded-full px-3 text-center font-medium transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus) ${
                size === 'lg' ? 'py-2.5 text-[0.9375rem]' : 'py-2 text-[0.8125rem]'
              } ${checked ? 'text-on-solid' : 'text-ink-2 hover:text-ink'}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="block truncate">{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
