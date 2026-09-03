import { site } from './site'

/**
 * Schema.org LocalBusiness (sous-type Plumber) — injecté une seule fois,
 * dans le layout racine. Contient NAP, horaires, zone d'intervention
 * et catalogue de prestations.
 */
export function localBusinessSchema() {
  const id = `${site.url}/#business`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Plumber', 'LocalBusiness'],
        '@id': id,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        telephone: site.phoneE164,
        email: site.email,
        founder: { '@type': 'Person', name: site.manager },
        description:
          'Plomberie Avetisyan, plombier à Marseille 9e : recherche de fuite non destructive, ' +
          'dépannage urgent et débouchage de canalisations. Intervention rapide sur Marseille et alentours.',
        priceRange: site.priceRange,
        currenciesAccepted: 'EUR',
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          postalCode: site.address.postalCode,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        openingHoursSpecification: site.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${h.jour}`,
          opens: h.opens,
          closes: h.closes,
        })),
        areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
        knowsLanguage: ['fr'],
        hasMap: site.google.maps,
        /**
         * Pas d'`aggregateRating` ici, volontairement. Reprendre en JSON-LD la
         * note Google de sa propre fiche est un balisage auto-déclaré : Google
         * l'interdit pour LocalBusiness et le sanctionne par une action
         * manuelle. La note est affichée en clair sur le site, ce qui est licite ;
         * les étoiles dans les résultats de recherche proviennent de la fiche.
         */
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Prestations de plomberie',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Recherche de fuite',
                description:
                  'Localisation de fuite non destructive : caméra thermique, gaz traceur, ' +
                  'inspection endoscopique, corrélation acoustique.',
                url: `${site.url}/recherche-de-fuite`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Dépannage plomberie urgent',
                description:
                  'Intervention rapide sur fuite, rupture de canalisation, chauffe-eau ou dégât des eaux.',
                url: `${site.url}/depannage-urgent`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Débouchage de canalisation',
                description:
                  'Débouchage haute pression, furet électromécanique et inspection caméra ' +
                  'des évacuations, WC, douches et colonnes.',
                url: `${site.url}/debouchage`,
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: 'fr-FR',
        publisher: { '@id': id },
      },
    ],
  }
}
