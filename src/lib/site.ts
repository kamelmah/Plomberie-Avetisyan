/**
 * Source unique de vérité pour toutes les données de l'entreprise.
 * Ces valeurs alimentent l'affichage, les balises meta et le schema LocalBusiness.
 *
 * ⚠ À VÉRIFIER AVANT MISE EN LIGNE (valeurs par défaut, pas fournies) :
 *   - `url`        : le nom de domaine réel
 *   - `email`      : l'adresse qui reçoit les devis
 *   - `hours`      : les horaires réels (ils sont publiés dans le schema
 *                    LocalBusiness et doivent correspondre à la fiche
 *                    Google Business Profile, sinon Google signale l'écart)
 *   - `geo`        : coordonnées approximatives du 13009, à affiner
 *   - `siret`, `insurance` : mentions légales
 */

export const site = {
  name: 'Plomberie Avetisyan',
  legalName: 'Plomberie Avetisyan',
  manager: 'Grigor Avetisyan',

  url: 'https://plomberie-avetisyan.fr',

  phone: '06 60 60 05 00',
  /** Format E.164, pour les liens tel: et le schema */
  phoneE164: '+33660600500',

  email: 'contact@plomberie-avetisyan.fr',

  address: {
    /**
     * Numéro et rue. Laissé vide : non fourni, et les annuaires tiers ne font
     * pas foi. Tant que ce champ est vide, `streetAddress` est absent du schema
     * LocalBusiness — mieux vaut une adresse absente qu'une adresse fausse.
     * Candidat à confirmer sur la fiche Google : « 10 Rue Rabutin Chantal ».
     */
    street: '',
    locality: 'Marseille',
    postalCode: '13009',
    region: 'Provence-Alpes-Côte d’Azur',
    country: 'FR',
  },

  /** Centre approximatif du 9e arrondissement de Marseille. */
  geo: { latitude: 43.2506, longitude: 5.4048 },

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

  /** Horaires d'ouverture — au format schema.org. */
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '19:30' },
    { days: ['Saturday'], opens: '08:00', closes: '18:00' },
  ],
  hoursLabel: 'Lun–Ven 7h30–19h30 · Sam 8h–18h',
  /** Astreinte hors horaires : décrite en clair, pas dans openingHours. */
  emergencyLabel: 'Urgences : appel possible 7j/7',

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
