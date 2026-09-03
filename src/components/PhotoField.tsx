import { useEffect, useRef, useState } from 'react'
import {
  PHOTOS_MAX,
  PHOTO_ACCEPT,
  PHOTO_MAX_OCTETS,
  PHOTO_SOURCE_MAX_OCTETS,
  compresserImage,
  formaterOctets,
} from '~/lib/photos'

export type PhotoPrete = {
  id: string
  nom: string
  type: string
  taille: number
  blob: Blob
  apercu: string
}

const bouton =
  'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-marine-300 bg-white px-5 py-3 text-base font-bold text-marine-800 transition-colors hover:border-marine-500 hover:bg-marine-50'

export function PhotoField({
  photos,
  onChange,
  disabled,
}: {
  photos: Array<PhotoPrete>
  onChange: (photos: Array<PhotoPrete>) => void
  disabled?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [erreur, setErreur] = useState<string | null>(null)
  const [traitement, setTraitement] = useState(false)

  // Libère les URL d'aperçu quand le composant disparaît.
  const photosRef = useRef(photos)
  photosRef.current = photos
  useEffect(
    () => () => {
      for (const photo of photosRef.current) URL.revokeObjectURL(photo.apercu)
    },
    [],
  )

  async function ajouter(fichiers: FileList | null) {
    if (!fichiers || fichiers.length === 0) return
    setErreur(null)

    const place = PHOTOS_MAX - photos.length
    if (place <= 0) {
      setErreur(`${PHOTOS_MAX} photos au maximum.`)
      return
    }

    const aTraiter = Array.from(fichiers).slice(0, place)
    const ignores = fichiers.length - aTraiter.length
    setTraitement(true)

    const ajoutees: Array<PhotoPrete> = []
    const problemes: Array<string> = []

    for (const fichier of aTraiter) {
      if (!fichier.type.startsWith('image/')) {
        problemes.push(`${fichier.name} : ce n’est pas une image.`)
        continue
      }
      if (fichier.size > PHOTO_SOURCE_MAX_OCTETS) {
        problemes.push(`${fichier.name} : fichier trop volumineux.`)
        continue
      }

      let blob: Blob
      try {
        blob = await compresserImage(fichier)
      } catch {
        problemes.push(`${fichier.name} : image illisible.`)
        continue
      }

      if (blob.size > PHOTO_MAX_OCTETS) {
        problemes.push(`${fichier.name} : encore ${formaterOctets(blob.size)} après compression, 5 Mo maximum.`)
        continue
      }

      ajoutees.push({
        id: `${fichier.name}-${fichier.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        nom: fichier.name,
        type: blob.type || fichier.type,
        taille: blob.size,
        blob,
        apercu: URL.createObjectURL(blob),
      })
    }

    if (ignores > 0) problemes.push(`${PHOTOS_MAX} photos au maximum : ${ignores} fichier(s) ignoré(s).`)

    setTraitement(false)
    setErreur(problemes.length ? problemes.join(' ') : null)
    if (ajoutees.length) onChange([...photos, ...ajoutees])
    if (inputRef.current) inputRef.current.value = ''
  }

  function retirer(id: string) {
    const cible = photos.find((p) => p.id === id)
    if (cible) URL.revokeObjectURL(cible.apercu)
    onChange(photos.filter((p) => p.id !== id))
    setErreur(null)
  }

  const complet = photos.length >= PHOTOS_MAX

  return (
    <div>
      <span className="block text-sm font-bold text-marine-800">
        Photos <span className="font-medium text-marine-600">(facultatif)</span>
      </span>
      <p className="mt-1 text-sm text-marine-600">
        Jusqu’à {PHOTOS_MAX} photos du problème — tache d’humidité, compteur, canalisation.
        Elles sont compressées dans votre navigateur avant l’envoi.
      </p>

      <input
        ref={inputRef}
        id="photos"
        type="file"
        accept={PHOTO_ACCEPT}
        multiple
        className="sr-only"
        disabled={disabled || complet}
        onChange={(event) => void ajouter(event.currentTarget.files)}
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label
          htmlFor="photos"
          aria-disabled={disabled || complet || traitement}
          className={`${bouton} ${disabled || complet || traitement ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <rect x="3" y="6" width="18" height="14" rx="2.5" />
            <circle cx="12" cy="13" r="3.4" />
            <path d="M8.5 6 10 3.6h4L15.5 6" />
          </svg>
          {traitement ? 'Préparation…' : photos.length ? 'Ajouter une photo' : 'Ajouter des photos'}
        </label>
        <span className="text-sm text-marine-600">
          {photos.length}/{PHOTOS_MAX}
        </span>
      </div>

      {erreur ? (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
          {erreur}
        </p>
      ) : null}

      {photos.length > 0 ? (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:max-w-md">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className="relative overflow-hidden rounded-xl border border-marine-200 bg-marine-50"
            >
              <img
                src={photo.apercu}
                alt={`Aperçu : ${photo.nom}`}
                width={200}
                height={200}
                className="aspect-square w-full object-cover"
              />
              <button
                type="button"
                onClick={() => retirer(photo.id)}
                aria-label={`Retirer ${photo.nom}`}
                className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-marine-950/80 text-white hover:bg-marine-950"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path d="M6 6 18 18M18 6 6 18" />
                </svg>
              </button>
              <span className="block px-2 py-1.5 text-center text-xs font-semibold text-marine-700">
                {formaterOctets(photo.taille)}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
