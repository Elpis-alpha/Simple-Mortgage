import { useEffect, useState } from 'react'
import { HouseElevation } from '@/components/drawing/HouseElevation'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/lib/auth'

/**
 * Closing band. It flips to the opposite theme, so on vellum it is a slab
 * of blueprint, and the house is shown fully owned with every window lit.
 */
export function CallToAction() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [ref, inView] = useInView<HTMLDivElement>('0px 0px -25% 0px')
  const [share, setShare] = useState(0.1)

  // Once the drawing has sketched itself in, let the fill climb to the roof.
  useEffect(() => {
    if (!inView) return
    const id = window.setTimeout(() => setShare(1), 1300)
    return () => window.clearTimeout(id)
  }, [inView])

  return (
    <section className="wrap mt-28">
      <div
        data-theme={theme === 'dark' ? 'light' : 'dark'}
        className="ticks relative grid items-center gap-10 overflow-hidden rounded-md border border-line-strong bg-paper px-6 py-12 sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:py-16"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid-major) 1px, transparent 1px), linear-gradient(90deg, var(--grid-major) 1px, transparent 1px), linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
        }}
      >
        <Reveal>
          <p className="label">Next sheet</p>
          <h2 className="h-section mt-5 max-w-[14ch]">
            Ready to draw up <em>your</em> plan?
          </h2>
          <p className="lede mt-5 max-w-[44ch]">Four short steps, a soft check and an answer on screen. It takes about as long as making a cup of tea.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to={user ? '/application' : '/signup'} variant="blue" arrow>
              {user ? 'Go to your application' : 'Start your agreement in principle'}
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline">
              Talk to an adviser
            </ButtonLink>
          </div>
        </Reveal>
        <div ref={ref} className="mx-auto w-full max-w-md">
          {/* Mounts when scrolled into view so the drawing animates on arrival. */}
          {inView ? <HouseElevation share={share} bare /> : <div style={{ aspectRatio: '480 / 306' }} />}
          <p className="label mt-2 text-center">Fig. 99 — Paid off</p>
        </div>
      </div>
    </section>
  )
}
