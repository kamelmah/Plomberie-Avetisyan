import { telHref } from '~/lib/site'
import { IconPhone } from './Icons'

/**
 * Barre d'appel fixe, pleine largeur, affichée sous 768px uniquement.
 * Le lien mesure exactement 56px ; la zone sûre iOS est ajoutée par le
 * conteneur, si bien que la hauteur totale vaut 56px + safe-area — soit
 * exactement le `padding-bottom` réservé sur le body (src/styles/app.css).
 */
export function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-goutte pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={telHref}
        className="flex h-14 items-center justify-center gap-3 text-lg font-bold text-white active:brightness-90"
      >
        <IconPhone className="h-6 w-6 shrink-0" />
        Appeler maintenant
      </a>
    </div>
  )
}
