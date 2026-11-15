import { ButtonLink } from '@/components/ui/ButtonLink'
import { useMeta } from '@/hooks/useMeta'

export default function NotFound() {
  useMeta('Page not found')
  return (
    <section className="wrap grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-2">
      <div>
        <p className="label flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
          Sheet 00 · Off plan
        </p>
        <h1 className="display mt-6">
          This room is <em>not on the drawings</em>.
        </h1>
        <p className="lede mt-6 max-w-[44ch]">The page you were looking for has moved, or was never built. The front door is this way.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink to="/" arrow>
            Back to the home page
          </ButtonLink>
          <ButtonLink to="/calculator" variant="outline">
            Open the calculators
          </ButtonLink>
        </div>
      </div>

      {/* A floor plan with one room missing. */}
      <div className="mx-auto w-full max-w-md" aria-hidden="true">
        <svg viewBox="0 0 400 300" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="square" className="w-full">
          <path d="M40 40H360V150M360 260H40V40" pathLength="1" className="house-draw" />
          <path d="M200 40V120M200 160V260M40 150H110M150 150H200" strokeWidth="1.5" pathLength="1" className="house-draw" style={{ animationDelay: '300ms' }} />
          <path d="M110 150a40 40 0 0 1 40-40M200 120a40 40 0 0 0 40 40" strokeWidth="1" pathLength="1" className="house-draw" style={{ animationDelay: '700ms' }} />
          <rect x="230" y="160" width="130" height="100" stroke="var(--red)" strokeDasharray="6 5" strokeWidth="1.5" className="house-fade" style={{ animationDelay: '1100ms' }} />
          <g className="house-fade" style={{ animationDelay: '1300ms' }} stroke="none">
            <text x="295" y="206" textAnchor="middle" className="fill-red-ink font-mono text-[34px] font-medium">
              404
            </text>
            <text x="295" y="228" textAnchor="middle" className="fill-ink-3 font-mono text-[9px] tracking-[0.12em]">
              ROOM NOT FOUND
            </text>
            <text x="120" y="100" textAnchor="middle" className="fill-ink-3 font-mono text-[9px] tracking-[0.12em]">
              KITCHEN
            </text>
            <text x="120" y="210" textAnchor="middle" className="fill-ink-3 font-mono text-[9px] tracking-[0.12em]">
              LIVING
            </text>
            <text x="280" y="100" textAnchor="middle" className="fill-ink-3 font-mono text-[9px] tracking-[0.12em]">
              BEDROOM
            </text>
          </g>
        </svg>
      </div>
    </section>
  )
}
