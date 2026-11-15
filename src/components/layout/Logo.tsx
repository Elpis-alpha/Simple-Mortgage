import { Link } from 'react-router-dom'
import { site } from '@/lib/site'

/** The mark is the idea in miniature: a house, part of it filled in as yours. */
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden="true">
      <path d="M4.5 16.5h19V24h-19z" fill="var(--blue)" />
      <path d="M4.5 24V12.5L14 4l9.5 8.5V24z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M2 14.2 14 3.5l12 10.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" viewTransition onClick={onClick} className="group flex items-center gap-2.5 text-ink" aria-label={`${site.name}, home`}>
      <LogoMark className="size-7 transition-transform duration-500 ease-(--ease-spring) group-hover:-translate-y-0.5" />
      <span className="font-serif text-[1.1875rem] leading-none tracking-[-0.02em]">
        Master <em className="text-blue">Your</em> Mortgage
      </span>
    </Link>
  )
}
