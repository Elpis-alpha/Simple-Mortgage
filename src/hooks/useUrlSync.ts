import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { clamp } from '@/lib/format'

/** Reads a number from the query string, falling back when missing or out of range. */
export function readNumber(params: URLSearchParams, key: string, fallback: number, min: number, max: number): number {
  const raw = params.get(key)
  if (raw === null || raw.trim() === '') return fallback
  const n = Number(raw)
  return Number.isFinite(n) ? clamp(n, min, max) : fallback
}

export function readChoice<T extends string>(params: URLSearchParams, key: string, options: readonly T[], fallback: T): T {
  const raw = params.get(key)
  return options.includes(raw as T) ? (raw as T) : fallback
}

/**
 * Mirrors calculator inputs into the address bar, so a result can be
 * bookmarked or shared. Writes are debounced and replace the history entry
 * rather than adding one per slider movement.
 */
export function useUrlSync(values: Record<string, string | number>, active = true) {
  const [, setParams] = useSearchParams()
  const serialised = JSON.stringify(values)

  useEffect(() => {
    if (!active) return
    const id = window.setTimeout(() => {
      const current = new URLSearchParams(window.location.search)
      const next = new URLSearchParams()
      const tab = current.get('tab')
      if (tab) next.set('tab', tab)
      for (const [key, value] of Object.entries(JSON.parse(serialised) as Record<string, string | number>)) next.set(key, String(value))
      if (next.toString() !== current.toString()) setParams(next, { replace: true, preventScrollReset: true })
    }, 300)
    return () => window.clearTimeout(id)
    // setParams changes identity whenever the query changes; it is deliberately left out.
  }, [serialised, active])
}
