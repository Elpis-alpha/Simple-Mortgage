import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'

export interface FaqItem {
  q: string
  a: ReactNode
}

/** Questions and answers built on native <details>, so they work without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line-strong">
      {items.map((item, i) => (
        <details key={item.q} className="faq group border-b border-line" name="faq" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 [&::-webkit-details-marker]:hidden">
            <span className="label w-6 flex-none">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex-1 font-serif text-[1.3125rem] leading-snug tracking-[-0.015em] transition-colors group-hover:text-blue sm:text-2xl">{item.q}</span>
            <span className="grid size-8 flex-none translate-y-1 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-(--ease-out-expo) group-open:rotate-45 group-open:border-blue group-open:bg-blue group-open:text-white">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <div className="max-w-[62ch] pr-10 pb-6 pl-11 text-ink-2">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
