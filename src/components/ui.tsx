import { Link } from '@tanstack/react-router'
import { site, telHref } from '~/lib/site'
import { IconPhone } from './Icons'

/** Gros bouton d'appel — l'élément le plus important du site. */
export function CallButton({
  size = 'lg',
  className = '',
  label = 'Appeler',
  sublabel,
}: {
  size?: 'md' | 'lg'
  className?: string
  label?: string
  sublabel?: string
}) {
  const pad = size === 'lg' ? 'px-7 py-4 text-lg' : 'px-5 py-3 text-base'
  return (
    <a
      href={telHref}
      data-call-cta
      className={`inline-flex items-center justify-center gap-3 rounded-xl bg-ambre-500 font-bold text-marine-950 shadow-sm transition-colors hover:bg-ambre-400 active:bg-ambre-600 ${pad} ${className}`}
    >
      <IconPhone className="h-6 w-6 shrink-0" />
      <span className="flex flex-col items-start leading-tight">
        <span>
          {label} {site.phone}
        </span>
        {sublabel ? (
          <span className="text-[0.72em] font-semibold text-marine-900/75">{sublabel}</span>
        ) : null}
      </span>
    </a>
  )
}

export function GhostButton({
  to,
  children,
  className = '',
}: {
  to: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-xl border-2 border-white/35 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 ${className}`}
    >
      {children}
    </Link>
  )
}

/** Bandeau de titre de page — aplat bleu profond, pas de photo. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <header className="bg-marine-900 text-white">
      <div className="wrap py-12 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-ambre-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-marine-100">{intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CallButton sublabel={site.emergencyLabel} />
          <GhostButton to="/contact">Demander un devis</GhostButton>
        </div>
      </div>
    </header>
  )
}

export function Section({
  title,
  lead,
  children,
  tone = 'white',
  id,
}: {
  title?: string
  lead?: string
  children: React.ReactNode
  tone?: 'white' | 'tint'
  id?: string
}) {
  return (
    <section id={id} className={tone === 'tint' ? 'bg-marine-50' : 'bg-white'}>
      <div className="wrap py-12 sm:py-16">
        {title ? (
          <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-marine-900 sm:text-3xl">
            {title}
          </h2>
        ) : null}
        {lead ? <p className="mt-3 max-w-2xl text-marine-700">{lead}</p> : null}
        <div className={title || lead ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  )
}

export function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-marine-100 bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-marine-900 text-white">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-marine-900">{title}</h3>
      <p className="mt-2 text-marine-700">{children}</p>
    </div>
  )
}

export function CheckList({ items }: { items: Array<string> }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-marine-500"
          >
            <path d="M4.5 12.5 9.5 17.5 19.5 7" />
          </svg>
          <span className="text-marine-800">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Étapes numérotées, sans image. */
export function Steps({ steps }: { steps: Array<{ title: string; body: string }> }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-2xl bg-marine-900 p-6 text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ambre-500 text-base font-extrabold text-marine-950">
            {i + 1}
          </span>
          <h3 className="mt-4 text-base font-bold">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-marine-100">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

/** Bloc de rappel téléphonique en fin de page. */
export function CallBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-marine-950 text-white">
      <div className="wrap py-12 sm:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
            <p className="mt-3 text-marine-100">{body}</p>
          </div>
          <CallButton className="w-full md:w-auto" sublabel={site.hoursLabel} />
        </div>
      </div>
    </section>
  )
}
