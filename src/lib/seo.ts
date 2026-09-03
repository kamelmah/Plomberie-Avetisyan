import { site } from './site'

type SeoInput = {
  title: string
  description: string
  /** Chemin absolu du canonical, ex. "/recherche-de-fuite" */
  path: string
}

/**
 * Construit le bloc `head` d'une route : title, description, canonical
 * et Open Graph. Pas d'image OG binaire (aucune photo disponible) —
 * on s'appuie sur le titre et la description.
 */
export function seo({ title, description, path }: SeoInput) {
  const canonical = `${site.url}${path === '/' ? '/' : path}`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: canonical }],
  }
}
