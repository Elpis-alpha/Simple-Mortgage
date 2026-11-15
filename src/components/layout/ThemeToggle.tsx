import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to the vellum (light) theme' : 'Switch to the blueprint (dark) theme'}
      title={dark ? 'Vellum' : 'Blueprint'}
      className={`relative grid size-10 place-items-center overflow-hidden rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-raised ${className}`}
    >
      <Sun
        className={`absolute size-[1.125rem] transition-all duration-500 ease-(--ease-out-expo) ${dark ? 'translate-y-6 rotate-90 opacity-0' : ''}`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute size-[1.125rem] transition-all duration-500 ease-(--ease-out-expo) ${dark ? '' : '-translate-y-6 -rotate-90 opacity-0'}`}
        aria-hidden="true"
      />
    </button>
  )
}
