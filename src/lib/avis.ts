import { site } from './site'

/**
 * Avis clients affichés sur la page « Recherche de fuite ».
 *
 * Ces avis sont réels, copiés à l'identique depuis la fiche Google Business
 * Profile de Plomberie Avetisyan Grigor (relevé du 2026-09-03). Ne jamais les
 * reformuler, les raccourcir ni les corriger : un avis retouché n'est plus un
 * avis, et publier un témoignage modifié ou inventé est une pratique
 * commerciale trompeuse (art. L121-2 et L121-4 du Code de la consommation).
 *
 * Pour en ajouter : fiche Google → onglet Avis → copier le texte exact,
 * l'auteur tel qu'affiché, et la note.
 */

export type Avis = {
  /** Nom tel qu'affiché sur Google */
  auteur: string
  /**
   * Mois de publication, format ISO AAAA-MM-JJ.
   * Google n'expose qu'une date relative (« il y a 4 mois ») : cette valeur en
   * est la conversion au mois près, calculée depuis le relevé du 2026-09-03.
   */
  date: string
  /** Note sur 5 */
  note: 1 | 2 | 3 | 4 | 5
  /** Texte copié à l'identique depuis Google */
  texte: string
}

export const avis: Array<Avis> = [
  {
    auteur: 'Anne Michelin',
    date: '2026-05-01',
    note: 5,
    texte:
      'Très sérieux, efficace et très performant. Cela faisait plus de 6 ans que j’avais des fuites d’eau ayant fait appel à différents artisans sans succès. Le problème était complexe. Monsieur Avetisyan a su investiguer au bon endroit avec les bons équipements. Un grand merci à lui. Mon appartement est maintenant sécurisé. Je le recommande vivement.',
  },
  {
    auteur: 'robert pekmezian',
    date: '2026-06-01',
    note: 5,
    texte:
      'Un grand merci à Monsieur Avetisyan. Il a réussi à force de patience à trouver une fuite que les nombreux experts envoyés par l’assurance n’ont pas réussi à déceler.',
  },
]

/** Page publique des avis de la fiche Google. */
export const lienGoogle = site.google.avis
