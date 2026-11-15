import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** Delay in milliseconds, for staggering siblings. */
  delay?: number
  className?: string
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
