import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { ChevronDown, CircleAlert } from 'lucide-react'

interface FieldShellProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  children: ReactNode
}

function FieldShell({ id, label, error, hint, optional, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-3">optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-red-ink">
          <CircleAlert className="size-3.5 flex-none" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-ink-3">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

const describe = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined)

type Common = { label: string; error?: string; hint?: string; optional?: boolean }

export function TextField({ label, error, hint, optional, className = '', ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input id={id} className={`input ${className}`} aria-invalid={error ? true : undefined} aria-describedby={describe(id, error, hint)} {...props} />
    </FieldShell>
  )
}

export function TextArea({ label, error, hint, optional, className = '', ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea id={id} className={`input ${className}`} aria-invalid={error ? true : undefined} aria-describedby={describe(id, error, hint)} {...props} />
    </FieldShell>
  )
}

export function SelectField({ label, error, hint, optional, className = '', children, ...props }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <div className="relative">
        <select id={id} className={`input appearance-none pr-10 ${className}`} aria-invalid={error ? true : undefined} aria-describedby={describe(id, error, hint)} {...props}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
      </div>
    </FieldShell>
  )
}

interface MoneyFieldProps extends Common {
  value: number
  onChange: (value: number) => void
  suffix?: string
  prefix?: string
  max?: number
}

/** A number with a unit attached. Shows thousands separators and accepts them when typed. */
export function MoneyField({ label, error, hint, optional, value, onChange, prefix = '£', suffix, max = 100_000_000 }: MoneyFieldProps) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <div className="input affix" aria-invalid={error ? true : undefined}>
        {prefix && <span>{prefix}</span>}
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value === 0 ? '' : value.toLocaleString('en-GB')}
          placeholder="0"
          aria-describedby={describe(id, error, hint)}
          aria-invalid={error ? true : undefined}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^0-9]/g, ''))
            onChange(Number.isFinite(n) ? Math.min(n, max) : 0)
          }}
        />
        {suffix && <span>{suffix}</span>}
      </div>
    </FieldShell>
  )
}
