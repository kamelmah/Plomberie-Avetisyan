import { horairesGroupes, site } from '~/lib/site'

/**
 * Tableau des horaires, dérivé de `site.hours` — jours consécutifs regroupés.
 * Une seule source de vérité, alignée sur la fiche Google Business Profile.
 */
export function Horaires({ tone = 'sombre' }: { tone?: 'sombre' | 'clair' }) {
  const sombre = tone === 'sombre'
  return (
    <dl className={`space-y-1.5 text-sm ${sombre ? 'text-marine-100' : 'text-marine-800'}`}>
      {horairesGroupes().map((groupe) => (
        <div key={groupe.jours} className="flex justify-between gap-4">
          <dt className={sombre ? 'text-marine-300' : 'text-marine-600'}>{groupe.jours}</dt>
          <dd className="font-semibold tabular-nums">{groupe.plage}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Pastille « 5,0 ★ · 301 avis Google » — la note est affichée, jamais balisée. */
export function NoteGoogle({ className = '' }: { className?: string }) {
  const note = site.avisGoogle.note.toLocaleString('fr-FR', { minimumFractionDigits: 1 })
  return (
    <a
      href={site.google.avis}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full bg-marine-800 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-marine-700 ${className}`}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-ambre-500">
            <path d="m12 3.2 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.6l6-.8L12 3.2Z" />
          </svg>
        ))}
      </span>
      <span>
        {note} sur {site.avisGoogle.nombre} avis Google
      </span>
    </a>
  )
}
