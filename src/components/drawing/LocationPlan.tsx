/**
 * A location plan in the manner of a planning drawing: the bend of the
 * river, the docks and a redline around the site. Schematic, not to scale.
 */
export function LocationPlan({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 290" className={className} fill="none" role="img" aria-label="Schematic location plan showing the office beside the docks in Canary Wharf, inside a bend of the River Thames">
      {/* River */}
      <path d="M-20 50 C 70 20, 130 110, 112 190 C 96 268, 214 304, 292 250 C 356 206, 322 110, 420 76" stroke="var(--blue)" strokeOpacity="0.16" strokeWidth="34" strokeLinecap="round" />
      <path d="M-20 50 C 70 20, 130 110, 112 190 C 96 268, 214 304, 292 250 C 356 206, 322 110, 420 76" stroke="var(--blue)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 5" />

      {/* Docks */}
      <g fill="var(--blue)" fillOpacity="0.12" stroke="var(--blue)" strokeOpacity="0.45">
        <rect x="150" y="92" width="150" height="14" />
        <rect x="150" y="138" width="150" height="14" />
        <rect x="186" y="184" width="74" height="40" />
      </g>

      {/* Street blocks */}
      <g stroke="var(--ink)" strokeOpacity="0.5">
        <rect x="156" y="112" width="26" height="20" />
        <rect x="188" y="112" width="20" height="20" />
        <rect x="246" y="112" width="22" height="20" />
        <rect x="274" y="112" width="20" height="20" />
        <rect x="156" y="158" width="24" height="18" />
        <rect x="186" y="158" width="34" height="18" />
        <rect x="270" y="158" width="26" height="18" />
        <rect x="150" y="60" width="40" height="22" />
        <rect x="198" y="56" width="30" height="26" />
        <rect x="236" y="60" width="52" height="22" />
        <rect x="30" y="100" width="40" height="26" />
        <rect x="26" y="136" width="34" height="30" />
        <rect x="330" y="150" width="44" height="26" />
        <rect x="336" y="186" width="34" height="34" />
        <path d="M0 88H78M346 136H400M130 44 300 44" strokeDasharray="1 4" />
      </g>

      {/* The site, redlined */}
      <rect x="214" y="110" width="26" height="24" fill="var(--red)" fillOpacity="0.18" stroke="var(--red)" strokeWidth="1.75" />
      <circle cx="227" cy="122" r="16" stroke="var(--red)" strokeWidth="1">
        <animate attributeName="r" values="12;26" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <path d="M240 110 L286 36 H352" stroke="var(--red)" strokeWidth="1" />
      <text x="290" y="30" className="fill-red-ink font-mono text-[8.5px] font-medium tracking-[0.1em]">
        30 CHURCHILL PL.
      </text>

      {/* Labels */}
      <g className="fill-ink-3 font-mono text-[8px] tracking-[0.14em]">
        <text x="66" y="62" transform="rotate(24 66 62)">
          RIVER THAMES
        </text>
        <text x="158" y="103" className="fill-blue-ink">
          NORTH DOCK
        </text>
        <text x="158" y="149" className="fill-blue-ink">
          SOUTH DOCK
        </text>
        <text x="150" y="252">ISLE OF DOGS</text>
      </g>

      {/* North point and scale */}
      <g stroke="var(--ink)" strokeWidth="1">
        <circle cx="366" cy="258" r="13" />
        <path d="M366 268V248M366 248l-4 7M366 248l4 7" />
      </g>
      <text x="366" y="240" textAnchor="middle" className="fill-ink font-mono text-[9px]">
        N
      </text>
      <g stroke="var(--ink)" strokeWidth="1">
        <path d="M20 268H100M20 264V272M60 265V271M100 264V272" />
      </g>
      <text x="20" y="282" className="fill-ink-3 font-mono text-[7.5px] tracking-[0.12em]">
        NOT TO SCALE
      </text>
    </svg>
  )
}
