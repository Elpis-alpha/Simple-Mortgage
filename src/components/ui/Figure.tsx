import type { ReactNode } from 'react'

/** The mono caption that sits above drawings and charts: "FIG. 02 — BALANCE". */
export function FigLabel({ n, children, aside }: { n?: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
      <p className="label flex items-center gap-2 whitespace-nowrap">
        {n && <span className="text-ink">Fig. {n}</span>}
        {n && <span aria-hidden="true" className="hidden h-px w-5 bg-line-strong sm:block" />}
        <span>{children}</span>
      </p>
      {aside && <div className="label whitespace-nowrap">{aside}</div>}
    </div>
  )
}

/** Section opener: a numbered mono eyebrow over a serif heading. */
export function SectionHeading({
  index,
  eyebrow,
  children,
  lede,
  className = '',
}: {
  index?: string
  eyebrow: string
  children: ReactNode
  lede?: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="label flex items-center gap-3">
        {index && <span className="text-blue-ink">{index}</span>}
        {index && <span aria-hidden="true" className="h-px w-8 bg-line-strong" />}
        {eyebrow}
      </p>
      <h2 className="h-section mt-5 max-w-[18ch]">{children}</h2>
      {lede && <p className="lede mt-5 max-w-[52ch]">{lede}</p>}
    </div>
  )
}
