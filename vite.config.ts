import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Les 6 pages sont générées en HTML statique au build : Netlify les sert
      // depuis son CDN sans jamais réveiller de fonction serveur.
      // Seul l'envoi du formulaire (server function -> Resend) tape le serveur.
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      sitemap: { enabled: true, host: 'https://plomberie-avetisyan.fr' },
      // Page en noindex : elle n'a rien à faire dans le sitemap.
      pages: [{ path: '/mentions-legales', sitemap: { exclude: true } }],
    }),
    react(),
    netlify(),
  ],
})
