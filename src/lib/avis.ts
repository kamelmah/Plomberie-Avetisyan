/**
 * Avis clients affichés sur la page « Recherche de fuite ».
 *
 * ⚠ À REMPLIR AVEC DE VRAIS AVIS — ce fichier est volontairement vide.
 *
 * Publier des témoignages inventés est une pratique commerciale trompeuse
 * (art. L121-2 et L121-4 du Code de la consommation ; contrôles DGCCRF).
 * Le risque n'est pas théorique : l'amende peut atteindre 300 000 € et
 * Google supprime les fiches concernées.
 *
 * Marche à suivre — 5 minutes :
 *   1. Ouvrez votre fiche Google Business Profile → onglet « Avis ».
 *   2. Repérez deux avis qui mentionnent une fuite trouvée après l'échec
 *      d'un autre intervenant.
 *   3. Copiez le texte à l'identique (sans le corriger ni le raccourcir).
 *   4. Renseignez le prénom + initiale tels qu'affichés par Google, la date
 *      et la note.
 *   5. Ajoutez l'URL publique de votre fiche dans `lienGoogle` ci-dessous.
 *
 * Tant que le tableau est vide, la section ne s'affiche pas : le site reste
 * cohérent, il lui manque juste cette preuve sociale.
 *
 * Exemple de forme attendue (à supprimer une fois rempli) :
 *
 *   export const avis: Array<Avis> = [
 *     {
 *       auteur: 'Prénom N.',
 *       date: '2026-05-14',
 *       note: 5,
 *       texte: 'Texte exact de l’avis Google, copié sans modification.',
 *     },
 *   ]
 */

export type Avis = {
  /** Nom tel qu'affiché sur Google, ex. « Sophie M. » */
  auteur: string
  /** Date de l'avis, format ISO AAAA-MM-JJ */
  date: string
  /** Note sur 5 */
  note: 1 | 2 | 3 | 4 | 5
  /** Texte copié à l'identique depuis Google */
  texte: string
}

export const avis: Array<Avis> = []

/** URL publique de la fiche Google Business Profile. Laisser vide si absente. */
export const lienGoogle = ''
