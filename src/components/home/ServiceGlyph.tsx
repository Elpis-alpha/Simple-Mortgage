export type ServiceKind = 'first-home' | 'moving' | 'remortgage' | 'buy-to-let'

/** Small line drawings for each kind of mortgage, in the same hand as the hero elevation. */
export function ServiceGlyph({ kind, className = '' }: { kind: ServiceKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 72 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="2" y1="42" x2="70" y2="42" />
      {kind === 'first-home' && (
        <>
          <path d="M14 42V22l14-12 14 12v20" />
          <path d="M10 25.5 28 10l18 15.5" />
          <path d="M24 42V30h8v12" />
          {/* key */}
          <circle cx="56" cy="20" r="5" stroke="var(--red)" />
          <path d="M56 25v13m0-4h4m-4-4h3" stroke="var(--red)" />
        </>
      )}
      {kind === 'moving' && (
        <>
          <path d="M6 42V28l9-8 9 8v14" strokeDasharray="3 3" />
          <path d="M44 42V22l11-10 11 10v20" />
          <path d="M41 24.5 55 12l14 12.5" />
          <path d="M52 42V32h6v10" />
          <path d="M27 30h11m-4-4 4 4-4 4" stroke="var(--red)" />
        </>
      )}
      {kind === 'remortgage' && (
        <>
          <path d="M24 42V24l12-10 12 10v18" />
          <path d="M21 26.5 36 14l15 12.5" />
          <path d="M32 42V32h8v10" />
          <path d="M58 22a23 23 0 0 0-40-9" stroke="var(--red)" />
          <path d="M17 6.5V13.5h7" stroke="var(--red)" />
        </>
      )}
      {kind === 'buy-to-let' && (
        <>
          <path d="M8 42V24l10-9 10 9v18" />
          <path d="M26 42V24l10-9 10 9v18" />
          <path d="M44 42V24l10-9 10 9v18" />
          <path d="M15 42v-9h6v9M33 42v-9h6v9M51 42v-9h6v9" />
          <path d="M5 26.5 18 15l9 8 9-8 9 8 9-8 13 11.5" />
          <circle cx="36" cy="6" r="2.5" stroke="var(--red)" />
          <circle cx="18" cy="6" r="2.5" stroke="var(--red)" opacity="0.5" />
          <circle cx="54" cy="6" r="2.5" stroke="var(--red)" opacity="0.5" />
        </>
      )}
    </svg>
  )
}
