import type { ReactNode } from 'react'

/** The opening block shared by the inner pages. */
export function PageHeader({ sheet, title, lede, children }: { sheet: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <header className="wrap pt-10 pb-10 lg:pt-16 lg:pb-14">
      <p className="label flex items-center gap-3" style={{ animation: 'fade-up 0.8s var(--ease-out-expo) both' }}>
        <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
        {sheet}
      </p>
      <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)]" style={{ animation: 'fade-up 1s var(--ease-out-expo) 80ms both' }}>
        {title}
      </h1>
      {lede && (
        <p className="lede mt-6 max-w-[54ch]" style={{ animation: 'fade-up 1s var(--ease-out-expo) 160ms both' }}>
          {lede}
        </p>
      )}
      {children && (
        <div className="mt-9" style={{ animation: 'fade-up 1s var(--ease-out-expo) 240ms both' }}>
          {children}
        </div>
      )}
    </header>
  )
}
