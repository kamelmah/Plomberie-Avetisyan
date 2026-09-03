import { useState } from 'react'
import { site, telHref } from '~/lib/site'
import { envoyerDevis, prestationOptions, urgenceOptions } from '~/server/devis'
import { preparerUploadPhotos } from '~/server/storage'
import { PhotoField, type PhotoPrete } from './PhotoField'
import { IconCheck, IconPhone } from './Icons'

const field =
  'mt-1.5 w-full rounded-xl border border-marine-200 bg-white px-4 py-3 text-base text-marine-900 placeholder:text-marine-400 focus:border-marine-600 focus:outline-none focus:ring-2 focus:ring-marine-200'
const label = 'block text-sm font-bold text-marine-800'

type State =
  | { status: 'idle' }
  | { status: 'uploading' }
  | { status: 'sending' }
  | { status: 'sent' }
  | { status: 'error'; message: string }

/**
 * Téléverse les photos compressées directement dans Supabase Storage via des
 * URL signées délivrées par le serveur, et renvoie leurs chemins.
 */
async function televerser(photos: Array<PhotoPrete>): Promise<Array<string>> {
  if (photos.length === 0) return []

  const cibles = await preparerUploadPhotos({
    data: photos.map((p) => ({ nom: p.nom, type: p.type, taille: p.taille })),
  })

  await Promise.all(
    cibles.map(async (cible, index) => {
      const photo = photos[index]
      if (!photo) return
      const reponse = await fetch(cible.url, {
        method: 'PUT',
        headers: { 'content-type': photo.type || 'image/jpeg' },
        body: photo.blob,
      })
      if (!reponse.ok) {
        throw new Error(`L’envoi de « ${photo.nom} » a échoué. Réessayez ou envoyez la demande sans photo.`)
      }
    }),
  )

  return cibles.map((cible) => cible.chemin)
}

export function DevisForm() {
  const [state, setState] = useState<State>({ status: 'idle' })
  const [photos, setPhotos] = useState<Array<PhotoPrete>>([])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>

    try {
      setState({ status: photos.length ? 'uploading' : 'sending' })
      const chemins = await televerser(photos)

      setState({ status: 'sending' })
      const result = await envoyerDevis({ data: { ...values, photos: chemins } })
      if (result.ok) {
        for (const photo of photos) URL.revokeObjectURL(photo.apercu)
        setPhotos([])
        setState({ status: 'sent' })
        form.reset()
      } else {
        setState({ status: 'error', message: result.error })
      }
    } catch (cause) {
      setState({
        status: 'error',
        message:
          cause instanceof Error && cause.message
            ? cause.message
            : `Une erreur est survenue. Appelez le ${site.phone}.`,
      })
    }
  }

  if (state.status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-marine-200 bg-marine-50 p-6 sm:p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-marine-900 text-white">
          <IconCheck className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-marine-900">Demande envoyée</h3>
        <p className="mt-2 text-marine-700">
          Grigor Avetisyan vous rappelle dès que possible. Si votre situation est urgente,
          n’attendez pas le rappel : appelez directement.
        </p>
        <a
          href={telHref}
          className="mt-5 inline-flex items-center gap-2.5 rounded-xl bg-ambre-500 px-6 py-3.5 text-base font-bold text-marine-950 hover:bg-ambre-400"
        >
          <IconPhone className="h-5 w-5" />
          {site.phone}
        </a>
      </div>
    )
  }

  const busy = state.status === 'sending' || state.status === 'uploading'

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {/* Honeypot : masqué visuellement et retiré de l'ordre de tabulation. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="societe">Société</label>
        <input id="societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="nom">
            Nom <span className="text-marine-500">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            required
            autoComplete="name"
            className={field}
            placeholder="Prénom et nom"
          />
        </div>
        <div>
          <label className={label} htmlFor="telephone">
            Téléphone <span className="text-marine-500">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className={field}
            placeholder="06 12 34 56 78"
          />
        </div>
        <div>
          <label className={label} htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={field}
            placeholder="facultatif"
          />
        </div>
        <div>
          <label className={label} htmlFor="codePostal">
            Code postal
          </label>
          <input
            id="codePostal"
            name="codePostal"
            inputMode="numeric"
            autoComplete="postal-code"
            className={field}
            placeholder="13009"
          />
        </div>
        <div>
          <label className={label} htmlFor="prestation">
            Prestation
          </label>
          <select id="prestation" name="prestation" defaultValue={prestationOptions[0]} className={field}>
            {prestationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="urgence">
            Délai souhaité
          </label>
          <select id="urgence" name="urgence" defaultValue={urgenceOptions[1]} className={field}>
            {urgenceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Décrivez le problème <span className="text-marine-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={field}
          placeholder="Ex. : tache d’humidité au plafond de la salle de bain depuis une semaine, le compteur tourne au ralenti même robinets fermés."
        />
        <p className="mt-2 text-sm text-marine-600">
          Plus la description est précise, plus le diagnostic au téléphone est fiable.
        </p>
      </div>

      <PhotoField photos={photos} onChange={setPhotos} disabled={busy} />

      {state.status === 'error' ? (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center rounded-xl bg-marine-900 px-7 py-4 text-lg font-bold text-white transition-colors hover:bg-marine-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.status === 'uploading'
            ? 'Envoi des photos…'
            : state.status === 'sending'
              ? 'Envoi en cours…'
              : 'Envoyer ma demande'}
        </button>
        <p className="text-sm text-marine-600">
          Urgent ? Appelez plutôt le{' '}
          <a href={telHref} className="font-bold text-marine-900 underline underline-offset-2">
            {site.phone}
          </a>
          .
        </p>
      </div>
    </form>
  )
}
