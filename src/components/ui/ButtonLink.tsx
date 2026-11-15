import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

interface ButtonLinkProps extends Omit<LinkProps, 'className'> {
  variant?: 'solid' | 'blue' | 'outline' | 'ghost'
  size?: 'md' | 'sm'
  arrow?: boolean
  className?: string
  children: ReactNode
}

/** A router link styled as a button. Page changes cross-fade where supported. */
export function ButtonLink({ variant = 'solid', size = 'md', arrow, className = '', children, ...props }: ButtonLinkProps) {
  return (
    <Link viewTransition className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`} {...props}>
      {children}
      {arrow && <ArrowRight className="btn-arrow" aria-hidden="true" />}
    </Link>
  )
}
