/** Contraintes partagées client / serveur pour les photos jointes au devis. */
export const PHOTOS_MAX = 3
/** Taille maximale de ce qui est effectivement téléversé (après compression). */
export const PHOTO_MAX_OCTETS = 5 * 1024 * 1024
/** Garde-fou navigateur : au-delà, on refuse avant même de décoder l'image. */
export const PHOTO_SOURCE_MAX_OCTETS = 25 * 1024 * 1024
/** Plus grande dimension conservée après compression. */
const COTE_MAX = 1600
const QUALITE_JPEG = 0.72

export const PHOTO_ACCEPT = 'image/jpeg,image/png,image/webp,image/heic,image/heif'

export function formaterOctets(octets: number): string {
  if (octets < 1024) return `${octets} o`
  if (octets < 1024 * 1024) return `${Math.round(octets / 1024)} Ko`
  return `${(octets / (1024 * 1024)).toFixed(1)} Mo`
}

/**
 * Compresse une image dans le navigateur avant téléversement : redimensionne au
 * plus long côté puis ré-encode en JPEG. Une photo de smartphone de 4 à 8 Mo
 * tombe typiquement sous 500 Ko, ce qui rend l'envoi utilisable en 4G.
 *
 * Si le format n'est pas décodable par le navigateur (HEIC sur certains
 * appareils), on renvoie le fichier d'origine tel quel.
 */
export async function compresserImage(file: File): Promise<Blob> {
  if (typeof createImageBitmap !== 'function') return file

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return file
  }

  try {
    const facteur = Math.min(1, COTE_MAX / Math.max(bitmap.width, bitmap.height))
    const largeur = Math.max(1, Math.round(bitmap.width * facteur))
    const hauteur = Math.max(1, Math.round(bitmap.height * facteur))

    const canvas = document.createElement('canvas')
    canvas.width = largeur
    canvas.height = hauteur
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, largeur, hauteur)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', QUALITE_JPEG),
    )
    if (!blob) return file
    return blob.size < file.size ? blob : file
  } finally {
    bitmap.close()
  }
}

/** Nom de fichier sûr pour un chemin de stockage. */
export function nomSur(nom: string, extension: string): string {
  const base = nom
    .replace(/\.[^.]+$/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
  return `${base || 'photo'}.${extension}`
}
