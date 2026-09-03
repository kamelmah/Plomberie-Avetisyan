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
          // Champ omis tant que la rue n'est pas confirmée.
          ...(site.address.street ? { streetAddress: site.address.street } : {}),
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
          dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: h.closes,
        })),
        areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
        knowsLanguage: ['fr'],
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
