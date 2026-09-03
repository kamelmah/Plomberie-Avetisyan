/**
 * Icônes SVG inline, tracé uniquement (`currentColor`, stroke 1.75).
 * Aucune requête réseau, aucune police d'icônes, aucune photo.
 */
type IconProps = { className?: string }

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  )
}

export function IconPhone({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3Z" />
    </Svg>
  )
}

export function IconDroplet({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 2.8c3.4 4 6 7 6 10a6 6 0 1 1-12 0c0-3 2.6-6 6-10Z" />
      <path d="M9.2 14.2a2.9 2.9 0 0 0 2.4 2.5" />
    </Svg>
  )
}

export function IconThermal({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M10 4a2 2 0 1 1 4 0v9a4.5 4.5 0 1 1-4 0Z" />
      <path d="M12 10v5.6" />
    </Svg>
  )
}

export function IconScope({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M11 8.2v5.6M8.2 11h5.6M16 16l4.5 4.5" />
    </Svg>
  )
}

export function IconWave({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2 9c2.2-2.4 4.4-2.4 6.6 0s4.4 2.4 6.6 0 4.4-2.4 6.6 0" />
      <path d="M2 15c2.2-2.4 4.4-2.4 6.6 0s4.4 2.4 6.6 0 4.4-2.4 6.6 0" />
    </Svg>
  )
}

export function IconPipe({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 7h6a4 4 0 0 1 4 4v2a4 4 0 0 0 4 4h4" />
      <path d="M3 4.5v5M21 14.5v5" />
    </Svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  )
}

export function IconShield({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3l7 2.6v5.6c0 4.3-2.9 7.7-7 9.2-4.1-1.5-7-4.9-7-9.2V5.6L12 3Z" />
      <path d="M9 12l2.1 2.1L15.2 10" />
    </Svg>
  )
}

export function IconCheck({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4.5 12.5 9.5 17.5 19.5 7" />
    </Svg>
  )
}

export function IconEuro({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M17.5 6.5A6.5 6.5 0 0 0 7.2 9m0 6a6.5 6.5 0 0 0 10.3 2.5" />
      <path d="M4.5 10.5h8M4.5 13.5h8" />
    </Svg>
  )
}

export function IconPin({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 21s7-5.3 7-10.4A7 7 0 0 0 5 10.6C5 15.7 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.6" />
    </Svg>
  )
}

export function IconWrench({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15.6 3.4a5.5 5.5 0 0 0-6.9 6.9L3.6 15.4a2.1 2.1 0 0 0 3 3l5.1-5.1a5.5 5.5 0 0 0 6.9-6.9l-3 3-2.9-.6-.6-2.9 2.5-2.5Z" />
    </Svg>
  )
}

export function IconMail({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 5.6L20.2 7" />
    </Svg>
  )
}

export function IconAlert({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4.2 21 19H3l9-14.8Z" />
      <path d="M12 10v4M12 16.6v.1" />
    </Svg>
  )
}
