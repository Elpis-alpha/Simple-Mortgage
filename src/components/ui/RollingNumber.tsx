import { memo } from 'react'

interface RollingNumberProps {
  /** Already formatted text, e.g. "£1,432". */
  text: string
  className?: string
}

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

/**
 * An odometer. Each digit is a column of 0-9 that slides to the right
 * number, so a changing figure rolls instead of flickering. Columns are
 * keyed from the right so the pence and thousands stay put as the number
 * grows or shrinks.
 */
export const RollingNumber = memo(function RollingNumber({ text, className = '' }: RollingNumberProps) {
  const chars = Array.from(text)
  return (
    <span className={`inline-flex tnum ${className}`} style={{ lineHeight: 1.1 }}>
      <span className="sr-only">{text}</span>
      {chars.map((char, i) => {
        const key = chars.length - i
        const digit = DIGITS.indexOf(char)
        if (digit === -1) {
          return (
            <span key={`s${key}`} aria-hidden="true">
              {char}
            </span>
          )
        }
        return (
          <span key={`d${key}`} aria-hidden="true" className="inline-block overflow-hidden" style={{ height: '1.1em' }}>
            <span
              className="flex flex-col transition-transform duration-700 ease-(--ease-out-expo)"
              style={{ transform: `translateY(-${digit * 10}%)` }}
            >
              {DIGITS.map((d) => (
                <span key={d} style={{ height: '1.1em' }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
})
