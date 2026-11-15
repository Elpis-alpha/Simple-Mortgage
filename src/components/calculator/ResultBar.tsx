import { useEffect, useState, type RefObject } from 'react'
import { ArrowUp } from 'lucide-react'

interface ResultBarProps {
  label: string
  value: string
  /** The full result panel. The bar hides while this is on screen. */
  target: RefObject<HTMLElement | null>
  active: boolean
}

/**
 * On small screens the inputs sit above the results, so the headline
 * figure would be out of sight while a slider moves. This bar keeps it
 * pinned to the bottom of the screen until the real result scrolls in.
 */
export function ResultBar({ label, value, target, active }: ResultBarProps) {
  const [resultVisible, setResultVisible] = useState(true)

  useEffect(() => {
    const el = target.current
    if (!el || !active) return
    const io = new IntersectionObserver(([entry]) => setResultVisible(entry?.isIntersecting ?? true), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, active])

  const show = active && !resultVisible

  return (
    <div
      className={`no-print fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-(--ease-out-expo) lg:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      aria-hidden={!show}
    >
      <button
        type="button"
        tabIndex={show ? 0 : -1}
        onClick={() => target.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="flex w-full items-center justify-between gap-4 rounded-full bg-solid py-2.5 pr-3 pl-5 text-on-solid shadow-sheet"
      >
        <span className="text-left">
          <span className="block font-mono text-[0.625rem] tracking-[0.09em] uppercase opacity-70">{label}</span>
          <span className="tnum block text-lg leading-tight font-semibold tracking-tight">{value}</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-on-solid/15 px-3 py-1.5 text-[0.8125rem] font-medium">
          Details
          <ArrowUp className="size-3.5 rotate-180" aria-hidden="true" />
        </span>
      </button>
    </div>
  )
}
