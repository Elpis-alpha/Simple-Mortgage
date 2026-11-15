import { Sparkles } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HouseElevation } from '@/components/drawing/HouseElevation'
import { useToast } from '@/components/ui/Toast'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/lib/auth'

/** Where to go after signing in: back to the page that asked, or the dashboard. */
export function useAfterAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from
  return () => navigate(from ?? '/application', { replace: true, viewTransition: true })
}

export function AuthLayout({ sheet, title, lede, children, footer }: { sheet: string; title: ReactNode; lede: string; children: ReactNode; footer: ReactNode }) {
  const { theme } = useTheme()
  const { signInDemo } = useAuth()
  const toast = useToast()
  const done = useAfterAuth()
  const [share, setShare] = useState(0.15)

  useEffect(() => {
    const id = window.setTimeout(() => setShare(0.62), 1500)
    return () => window.clearTimeout(id)
  }, [])

  const demo = async () => {
    await signInDemo()
    toast('Signed in to the demo account')
    done()
  }

  return (
    <section className="wrap grid gap-8 pt-8 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-14 lg:pt-14">
      <div style={{ animation: 'fade-up 0.9s var(--ease-out-expo) both' }}>
        <p className="label flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
          {sheet}
        </p>
        <h1 className="display mt-6 text-[clamp(2.5rem,5vw,3.75rem)]">{title}</h1>
        <p className="lede mt-5">{lede}</p>

        <div className="mt-9">{children}</div>

        <div className="my-7 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-line-strong" />
          <span className="label">or</span>
          <span className="h-px flex-1 bg-line-strong" />
        </div>

        <button type="button" onClick={demo} className="btn btn-outline w-full">
          <Sparkles aria-hidden="true" />
          Explore with the demo account
        </button>
        <p className="mt-6 text-[0.9375rem] text-ink-2">{footer}</p>
        <p className="label mt-8 border-t border-line pt-5 leading-relaxed normal-case tracking-normal">
          Accounts on this concept site live in your browser only. Nothing is sent to a server, so please do not reuse a real password.
        </p>
      </div>

      <div
        data-theme={theme === 'dark' ? 'light' : 'dark'}
        className="ticks relative hidden min-h-[36rem] flex-col justify-between overflow-hidden rounded-md border border-line-strong bg-paper p-10 lg:flex"
        style={{
          animation: 'fade-up 1s var(--ease-out-expo) 120ms both',
          backgroundImage:
            'linear-gradient(var(--grid-major) 1px, transparent 1px), linear-gradient(90deg, var(--grid-major) 1px, transparent 1px), linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
        }}
      >
        <p className="label">Fig. 11 — Your plan, kept in one place</p>
        <HouseElevation share={share} className="mx-auto w-full max-w-lg" />
        <blockquote className="max-w-[30ch] font-serif text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ink">
          Every payment moves the line <em className="text-blue">a little higher</em>.
        </blockquote>
      </div>
    </section>
  )
}
