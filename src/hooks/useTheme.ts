import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'mym:theme'
const listeners = new Set<() => void>()

const read = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Follow the system until the visitor makes an explicit choice.
  const media = matchMedia('(prefers-color-scheme: dark)')
  const onSystem = (e: MediaQueryListEvent) => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(KEY)
    } catch {
      /* storage unavailable */
    }
    if (!saved) apply(e.matches ? 'dark' : 'light')
  }
  media.addEventListener('change', onSystem)
  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', onSystem)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme)

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage unavailable */
    }
    const swap = () => apply(next)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && 'startViewTransition' in document) document.startViewTransition(swap)
    else swap()
  }, [])

  return { theme, toggle }
}
