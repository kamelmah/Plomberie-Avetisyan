import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { CallBar } from '~/components/CallBar'
import { localBusinessSchema } from '~/lib/schema'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#0a2540' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Plomberie Avetisyan' },
      { name: 'geo.region', content: 'FR-13' },
      { name: 'geo.placename', content: 'Marseille' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/favicon.svg' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(localBusinessSchema()),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-marine-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <CallBar />
        <Scripts />
      </body>
    </html>
  )
}
