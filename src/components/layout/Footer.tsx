import { ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { site } from '@/lib/site'
import { Logo } from './Logo'

const sheets: Record<string, string> = {
  '/': '01 · Home',
  '/calculator': '02 · Calculators',
  '/about': '03 · About',
  '/contact': '04 · Contact',
  '/login': '05 · Sign in',
  '/signup': '05 · Create account',
  '/application': '06 · Your application',
  '/application/new': '06 · Agreement in principle',
}

function Cell({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-line px-4 py-3 ${className}`}>
      <p className="label">{label}</p>
      <p className="mt-1 font-mono text-[0.8125rem] text-ink">{children}</p>
    </div>
  )
}

export function Footer() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const revision = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(new Date())

  const columns = [
    {
      title: 'Explore',
      links: [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Calculators',
      links: [
        { to: '/calculator', label: 'Repayments' },
        { to: '/calculator?tab=borrow', label: 'How much can I borrow' },
        { to: '/calculator?tab=stamp-duty', label: 'Stamp duty' },
      ],
    },
    {
      title: 'Account',
      links: user
        ? [
            { to: '/application', label: 'Your application' },
            { to: '/application/new', label: 'Agreement in principle' },
          ]
        : [
            { to: '/signup', label: 'Create an account' },
            { to: '/login', label: 'Sign in' },
          ],
    },
  ]

  return (
    <footer className="no-print mt-24 border-t border-line bg-paper-raised/60">
      <div className="wrap pt-14 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] text-ink-2">
              Mortgage advice drawn around you. We do the sums in the open, so you always know what you owe and what you own.
            </p>
            <address className="mt-6 space-y-1 text-[0.9375rem] text-ink-2 not-italic">
              <p>
                <a href={site.phoneHref} className="link text-ink">
                  {site.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="link text-ink">
                  {site.email}
                </a>
              </p>
              <p>{site.address.join(', ')}</p>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="label">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} viewTransition className="link text-[0.9375rem] text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Title block, as found in the corner of every architectural drawing. */}
        <div className="ticks mt-14 grid grid-cols-2 border border-line-strong sm:grid-cols-3 lg:grid-cols-6">
          <Cell label="Project" className="border-r border-b lg:border-b-0">
            {site.name}
          </Cell>
          <Cell label="Sheet" className="border-b sm:border-r lg:border-b-0">
            {sheets[pathname] ?? '00 · Off plan'}
          </Cell>
          <Cell label="Drawn by" className="border-r border-b lg:border-b-0">
            <a href={site.author.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
              {site.author.name}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </Cell>
          <Cell label="Scale" className="border-b sm:border-b-0 lg:border-r">
            1 : 1
          </Cell>
          <Cell label="Revision" className="border-r">
            {revision}
          </Cell>
          <Cell label="Status">Concept</Cell>
        </div>

        <div className="mt-8 grid gap-4 text-[0.8125rem] leading-relaxed text-ink-3 lg:grid-cols-[2fr_1fr]">
          <p>
            <strong className="font-medium text-ink-2">This is a concept project.</strong> {site.name} is a fictional broker, built as a design and engineering
            study. Rates, decisions and figures are illustrative, nothing here is financial advice, and anything you enter stays in your own browser. Your home
            may be repossessed if you do not keep up repayments on a real mortgage.
          </p>
          <p className="lg:text-right">
            © {new Date().getFullYear()} {site.name}.{' '}
            <a href={site.repo} target="_blank" rel="noreferrer" className="link">
              Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
