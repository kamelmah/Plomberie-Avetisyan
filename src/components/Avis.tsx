import { avis, lienGoogle, type Avis as AvisType } from '~/lib/avis'

/**
 * Avis clients. La section ne s'affiche que si `src/lib/avis.ts` contient
 * de vrais avis — voir les instructions dans ce fichier.
 *
 * Pas de balisage schema.org Review ici : Google ignore (et sanctionne) le
 * balisage d'avis auto-déclarés sur le site de l'entreprise elle-même. Les
 * étoiles dans les résultats de recherche viennent de la fiche Google
 * Business Profile, pas d'un JSON-LD.
 */
export function AvisClients({ titre, lead }: { titre: string; lead?: string }) {
  if (avis.length === 0) return null

  return (
    <section className="bg-white">
      <div className="wrap py-12 sm:py-16">
        <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-marine-900 sm:text-3xl">
          {titre}
        </h2>
        {lead ? <p className="mt-3 max-w-2xl text-marine-700">{lead}</p> : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {avis.map((item) => (
            <CarteAvis key={`${item.auteur}-${item.date}`} avis={item} />
          ))}
        </div>

        {lienGoogle ? (
          <a
            href={lienGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-bold text-marine-700 underline underline-offset-2 hover:text-marine-900"
          >
            Voir tous les avis sur Google
          </a>
        ) : null}
      </div>
    </section>
  )
}

function CarteAvis({ avis: item }: { avis: AvisType }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-marine-200 bg-marine-50 p-6">
      <Etoiles note={item.note} />
      <blockquote className="mt-4 flex-1 text-marine-800">« {item.texte} »</blockquote>
      <figcaption className="mt-5 text-sm font-bold text-marine-700">
        {item.auteur}
        <span className="ml-2 font-medium text-marine-500">
          <time dateTime={item.date}>
            {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(
              new Date(item.date),
            )}
          </time>
          {' · avis Google'}
        </span>
      </figcaption>
    </figure>
  )
}

function Etoiles({ note }: { note: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${note} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-5 w-5 ${i <= note ? 'text-ambre-500' : 'text-marine-200'}`}
          fill="currentColor"
        >
          <path d="m12 3.2 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.6l6-.8L12 3.2Z" />
        </svg>
      ))}
    </span>
  )
}
