import { LogOut, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'
import { nav, site } from '@/lib/site'
import { ButtonLink } from '../ui/ButtonLink'
import { useToast } from '../ui/Toast'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { user, signOut } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleSignOut = () => {
    signOut()
    setOpen(false)
    toast('You have been signed out')
    navigate('/', { viewTransition: true })
  }

  const links = [...nav, ...(user ? [{ to: '/application', label: 'Your application' }] : [])]

  return (
    <>
    <header
      className={`no-print sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-line bg-paper/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <a href="#main" className="btn btn-solid btn-sm sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]">
        Skip to content
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              viewTransition
              className={({ isActive }) =>
                `group relative rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 bottom-1 h-px origin-left bg-blue transition-transform duration-500 ease-(--ease-out-expo) ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <>
                <span className="label mx-2 max-w-40 truncate normal-case tracking-normal" title={user.email}>
                  {user.name}
                </span>
                <button type="button" onClick={handleSignOut} className="btn btn-outline btn-sm">
                  <LogOut aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <ButtonLink to="/login" variant="ghost" size="sm">
                  Sign in
                </ButtonLink>
                <ButtonLink to="/signup" size="sm" arrow>
                  Get started
                </ButtonLink>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink lg:hidden"
          >
            {open ? <X className="size-[1.125rem]" aria-hidden="true" /> : <Menu className="size-[1.125rem]" aria-hidden="true" />}
          </button>
        </div>
      </div>

    </header>

      {/*
        Mobile menu: a full sheet with the index of pages. It sits outside the
        header because the header's backdrop blur would otherwise become the
        containing block for this fixed panel and collapse it.
      */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="no-print fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pt-6 pb-10">
          <p className="label">Index</p>
          <ul className="mt-3">
            {[{ to: '/', label: 'Home' }, ...links].map((item, i) => (
              <li key={item.to} className="border-b border-line" style={{ animation: `fade-up 0.6s var(--ease-out-expo) ${i * 60}ms both` }}>
                <NavLink to={item.to} viewTransition end className="flex items-baseline gap-4 py-4">
                  {({ isActive }) => (
                    <>
                      <span className="label w-6">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`font-serif text-[2rem] leading-none tracking-[-0.025em] ${isActive ? 'text-blue italic' : 'text-ink'}`}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            {user ? (
              <button type="button" onClick={handleSignOut} className="btn btn-outline">
                <LogOut aria-hidden="true" />
                Sign out {user.name.split(' ')[0]}
              </button>
            ) : (
              <>
                <ButtonLink to="/signup" arrow>
                  Get started
                </ButtonLink>
                <ButtonLink to="/login" variant="outline">
                  Sign in
                </ButtonLink>
              </>
            )}
          </div>
          <p className="label mt-auto pt-10 normal-case tracking-normal">
            {site.phone} · {site.email}
          </p>
        </nav>
      </div>
    </>
  )
}
