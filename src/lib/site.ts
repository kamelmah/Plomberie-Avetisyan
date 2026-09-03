/**
 * Source unique de vérité pour toutes les données de l'entreprise.
 * Ces valeurs alimentent l'affichage, les balises meta et le schema LocalBusiness.
 *
 * Origine : fiche Google Business Profile, relevée le 2026-09-03.
 * Toute modification de la fiche doit être répercutée ici, et inversement :
 * un écart entre les deux est signalé par Google.
 *
 * ⚠ Restent à compléter : `legal.siret` et `legal.insurance`.
 */

export type Jour =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type Horaire = { jour: Jour; libelle: string; opens: string; closes: string }

export const site = {
  name: 'Plomberie Avetisyan',
  legalName: 'Plomberie Avetisyan Grigor',
  manager: 'Grigor Avetisyan',

  /** ⚠ À remplacer par le domaine réel avant mise en ligne. */
  url: 'https://plomberie-avetisyan.fr',

  phone: '06 60 60 05 00',
  /** Format E.164, pour les liens tel: et le schema */
  phoneE164: '+33660600500',

  /** ⚠ Adresse non présente sur la fiche Google : à confirmer. */
  email: 'contact@plomberie-avetisyan.fr',

  address: {
    street: '10 Rue Rabutin Chantal',
    complement: 'Nouveau Parc Sévigné',
    locality: 'Marseille',
    postalCode: '13009',
    region: 'Provence-Alpes-Côte d’Azur',
    country: 'FR',
  },

  geo: { latitude: 43.263395, longitude: 5.4013598 },

  /** Fiche Google Business Profile. */
  google: {
    placeId: 'ChIJFbEbJFC5yRIR5gNXhEbp8oY',
    maps: 'https://www.google.com/maps/place/?q=place_id:ChIJFbEbJFC5yRIR5gNXhEbp8oY',
    avis: 'https://search.google.com/local/reviews?placeid=ChIJFbEbJFC5yRIR5gNXhEbp8oY',
    laisserUnAvis:
      'https://search.google.com/local/writereview?placeid=ChIJFbEbJFC5yRIR5gNXhEbp8oY',
  },

  /**
   * Note et volume d'avis, relevés le 2026-09-03.
   * Affichés en clair sur le site — mais volontairement absents du JSON-LD :
   * Google interdit le balisage AggregateRating auto-déclaré reprenant sa
   * propre note, et le sanctionne par une action manuelle. Les étoiles dans
   * les résultats viennent de la fiche, pas du site. Voir src/lib/schema.ts.
   */
  avisGoogle: { note: 5.0, nombre: 301 },

  /** Communes / secteurs desservis — sert au schema et au maillage sémantique. */
  areaServed: [
    'Marseille 9e',
    'Marseille 8e',
    'Marseille 10e',
    'Marseille 11e',
    'Marseille 12e',
    'Aubagne',
    'Cassis',
    'Allauch',
    'La Penne-sur-Huveaune',
  ],

  /** Horaires d'ouverture, un enregistrement par jour. */
  hours: [
    { jour: 'Monday', libelle: 'Lundi', opens: '08:00', closes: '23:00' },
    { jour: 'Tuesday', libelle: 'Mardi', opens: '08:00', closes: '20:00' },
    { jour: 'Wednesday', libelle: 'Mercredi', opens: '08:00', closes: '20:00' },
    { jour: 'Thursday', libelle: 'Jeudi', opens: '08:00', closes: '20:00' },
    { jour: 'Friday', libelle: 'Vendredi', opens: '08:00', closes: '20:00' },
    { jour: 'Saturday', libelle: 'Samedi', opens: '08:00', closes: '23:00' },
    { jour: 'Sunday', libelle: 'Dimanche', opens: '09:00', closes: '19:00' },
  ] satisfies Array<Horaire>,

  /** Résumé court, pour les zones où le tableau complet ne tient pas. */
  hoursLabel: 'Ouvert 7j/7',
  /** Fait vérifiable sur les horaires, pas une promesse d'astreinte 24h/24. */
  emergencyLabel: 'Ouvert 7j/7, jusqu’à 23h lundi et samedi',

  priceRange: '€€',

  /** Mentions légales — à compléter. */
  legal: {
    siret: 'À compléter',
    form: 'Entreprise individuelle',
    insurance: 'À compléter (assurance décennale)',
    host: 'Netlify, Inc. — 512 2nd Street, Suite 200, San Francisco, CA 94107, USA',
  },
} as const

export const telHref = `tel:${site.phoneE164}`

/** « 8h–23h » à partir de « 08:00 » / « 23:00 ». */
export function formaterPlage(opens: string, closes: string): string {
  const h = (v: string) => {
    const [heures, minutes] = v.split(':')
    return minutes === '00' ? `${Number(heures)}h` : `${Number(heures)}h${minutes}`
  }
  return `${h(opens)}–${h(closes)}`
}

/**
 * Regroupe les jours consécutifs partageant les mêmes horaires,
 * pour un affichage compact : « Mardi – Vendredi · 8h–20h ».
 * Dérivé de `site.hours` : il n'y a qu'une source de vérité.
 */
export function horairesGroupes(): Array<{ jours: string; plage: string }> {
  const groupes: Array<{ debut: string; fin: string; plage: string }> = []

  for (const h of site.hours) {
    const plage = formaterPlage(h.opens, h.closes)
    const dernier = groupes[groupes.length - 1]
    if (dernier && dernier.plage === plage) {
      dernier.fin = h.libelle
    } else {
      groupes.push({ debut: h.libelle, fin: h.libelle, plage })
    }
  }

  return groupes.map((g) => ({
    jours: g.debut === g.fin ? g.debut : `${g.debut} – ${g.fin}`,
    plage: g.plage,
  }))
}
