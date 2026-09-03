import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    // Les pages sont statiques : rien à recharger au retour.
    defaultStaleTime: Infinity,
    scrollRestoration: true,
  })
}
