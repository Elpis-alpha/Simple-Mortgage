import { Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'
import { CircleAlert } from 'lucide-react'

interface PasswordFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete: 'current-password' | 'new-password'
  /** Show a strength meter under the field. */
  meter?: boolean
}

/** 0-4, from length and variety. A nudge, not a security guarantee. */
function strength(password: string): number {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++
  return Math.max(1, score)
}

const words = ['', 'Weak', 'Fair', 'Good', 'Strong']

export function PasswordField({ label, value, onChange, error, autoComplete, meter }: PasswordFieldProps) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const score = strength(value)

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="input pr-12"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : meter ? `${id}-meter` : undefined}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink-3 transition-colors hover:bg-blue-wash hover:text-ink"
        >
          {visible ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
        </button>
      </div>
      {meter && (
        <div id={`${id}-meter`} className="mt-2 flex items-center gap-3">
          <div className="flex flex-1 gap-1" aria-hidden="true">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${score >= n ? (score <= 1 ? 'bg-red' : score === 2 ? 'bg-blue/60' : 'bg-good') : 'bg-line-strong'}`} />
            ))}
          </div>
          <span className="label w-12 text-right">{words[score] || 'Min. 8'}</span>
        </div>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-red-ink">
          <CircleAlert className="size-3.5 flex-none" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
