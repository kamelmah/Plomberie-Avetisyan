import { createServerFn } from '@tanstack/react-start'
import { PHOTOS_MAX, PHOTO_MAX_OCTETS, nomSur } from '~/lib/photos'

/**
 * Téléversement des photos jointes à une demande de devis.
 *
 * Le fichier ne transite PAS par la fonction serveur : celle-ci délivre des URL
 * de téléversement signées, et le navigateur écrit directement dans Supabase
 * Storage. Deux raisons :
 *   - la limite de 6 Mo sur le corps d'une requête de fonction Netlify est
 *     contournée,
 *   - aucune clé Supabase n'est exposée au client.
 *
 * Le bucket doit être PRIVÉ. Voir README pour sa configuration (limite de
 * taille et types MIME autorisés côté Supabase — c'est là que la contrainte
 * de 5 Mo est réellement appliquée).
 */

const BUCKET = process.env.SUPABASE_BUCKET || 'devis-photos'
/** Durée de validité des liens envoyés par e-mail et SMS : 30 jours. */
const LIEN_VALIDITE_SECONDES = 30 * 24 * 3600

/** Forme imposée aux chemins délivrés — rejoue la validation au retour du client. */
const CHEMIN_ATTENDU =
  /^demandes\/\d{4}-\d{2}-\d{2}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/[0-2]-[A-Za-z0-9._-]{1,60}$/

const TYPES_AUTORISES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
])

export type UploadCible = { chemin: string; url: string }

export function storageConfigure(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function client() {
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

type DemandeUpload = { nom: string; type: string; taille: number }

function validerDemandes(raw: unknown): Array<DemandeUpload> {
  const liste = Array.isArray(raw) ? raw : []
  if (liste.length > PHOTOS_MAX) {
    throw new Error(`${PHOTOS_MAX} photos au maximum.`)
  }

  return liste.map((item, index) => {
    const d = (item ?? {}) as Record<string, unknown>
    const type = typeof d.type === 'string' ? d.type : ''
    const taille = typeof d.taille === 'number' ? d.taille : Number.NaN

    if (!TYPES_AUTORISES.has(type)) {
      throw new Error(`Photo ${index + 1} : format d’image non accepté.`)
    }
    if (!Number.isFinite(taille) || taille <= 0 || taille > PHOTO_MAX_OCTETS) {
      throw new Error(`Photo ${index + 1} : 5 Mo maximum après compression.`)
    }
    return {
      nom: typeof d.nom === 'string' ? d.nom : 'photo',
      type,
      taille,
    }
  })
}

/**
 * Délivre une URL de téléversement signée par photo.
 * Le client y envoie ensuite le blob compressé en PUT.
 */
export const preparerUploadPhotos = createServerFn({ method: 'POST' })
  .validator(validerDemandes)
  .handler(async ({ data }): Promise<Array<UploadCible>> => {
    if (data.length === 0) return []
    if (!storageConfigure()) {
      throw new Error('L’envoi de photos est indisponible. Envoyez votre demande sans photo.')
    }

    const supabase = await client()
    const jour = new Date().toISOString().slice(0, 10)
    const dossier = `demandes/${jour}/${crypto.randomUUID()}`

    const cibles: Array<UploadCible> = []
    for (const [index, photo] of data.entries()) {
      const extension = photo.type === 'image/png' ? 'png' : photo.type === 'image/webp' ? 'webp' : 'jpg'
      const chemin = `${dossier}/${index}-${nomSur(photo.nom, extension)}`

      const { data: signe, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUploadUrl(chemin)

      if (error || !signe) {
        console.error('[storage] création d’URL signée impossible', error)
        throw new Error('L’envoi de photos a échoué. Envoyez votre demande sans photo.')
      }
      cibles.push({ chemin: signe.path, url: signe.signedUrl })
    }

    return cibles
  })

/**
 * Transforme les chemins renvoyés par le client en liens de consultation signés,
 * valables 30 jours, à insérer dans l'e-mail et le SMS.
 * Les chemins qui ne correspondent pas au format délivré sont ignorés.
 */
export async function lienPhotos(chemins: Array<string>): Promise<Array<string>> {
  const valides = chemins.filter((c) => CHEMIN_ATTENDU.test(c)).slice(0, PHOTOS_MAX)
  if (valides.length === 0 || !storageConfigure()) return []

  const supabase = await client()
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrls(valides, LIEN_VALIDITE_SECONDES)

  if (error || !data) {
    console.error('[storage] signature des liens de consultation impossible', error)
    return []
  }

  return data
    .map((entree) => entree.signedUrl)
    .filter((url): url is string => typeof url === 'string' && url.length > 0)
}
