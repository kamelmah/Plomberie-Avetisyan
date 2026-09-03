/**
 * Marque : goutte d'eau bleue (#378ADD) puis, en colonne,
 * « PLOMBERIE » (gris secondaire, 12px, interlettrage 3.5px)
 * et « AVETISYAN » (#378ADD, 23px, poids 500).
 * Goutte en SVG inline — aucune image chargée.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Goutte className="h-9 w-9 shrink-0 text-goutte sm:h-10 sm:w-10" />
      <span className="flex flex-col">
        <span className="text-[12px] font-semibold uppercase leading-none tracking-[3.5px] text-marine-500">
          Plomberie
        </span>
        <span className="mt-1 text-[23px] font-medium leading-none tracking-tight text-goutte">
          Avetisyan
        </span>
      </span>
    </span>
  )
}

export function Goutte({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 3.5c6.9 8.2 12.1 14.2 12.1 20A12.1 12.1 0 1 1 7.9 23.5c0-5.8 5.2-11.8 12.1-20Z"
        fill="currentColor"
      />
      <path
        d="M14.2 25.6a5.9 5.9 0 0 0 4.6 5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity=".85"
      />
    </svg>
  )
}
