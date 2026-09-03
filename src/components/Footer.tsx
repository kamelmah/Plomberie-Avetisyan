import { Link } from '@tanstack/react-router'
import { site, telHref } from '~/lib/site'
import { IconMail, IconPhone, IconPin } from './Icons'
import { Goutte } from './Logo'

export function Footer() {
  return (
    <footer className="bg-marine-950 text-marine-100">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Goutte className="h-9 w-9 shrink-0 text-goutte" />
            <span className="flex flex-col">
              <span className="text-[12px] font-semibold uppercase leading-none tracking-[3.5px] text-marine-400">
                Plomberie
              </span>
              <span className="mt-1 text-[23px] font-medium leading-none tracking-tight text-goutte">
                Avetisyan
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm">Gérant : {site.manager}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={telHref} className="inline-flex items-center gap-2.5 font-bold text-ambre-400">
                <IconPhone className="h-4.5 w-4.5" />
                {site.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <IconMail className="h-4.5 w-4.5 text-marine-400" />
              <a href={`mailto:${site.email}`} className="underline-offset-2 hover:underline">
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <IconPin className="h-4.5 w-4.5 text-marine-400" />
              <span>
                {site.address.postalCode} {site.address.locality}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-marine-400">Prestations</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/recherche-de-fuite" className="underline-offset-2 hover:underline">
                Recherche de fuite
              </Link>
            </li>
            <li>
              <Link to="/depannage-urgent" className="underline-offset-2 hover:underline">
                Dépannage urgent
              </Link>
            </li>
            <li>
              <Link to="/debouchage" className="underline-offset-2 hover:underline">
                Débouchage de canalisation
              </Link>
            </li>
            <li>
              <Link to="/contact" className="underline-offset-2 hover:underline">
                Devis gratuit
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-marine-400">Horaires</p>
          <p className="mt-4 text-sm">{site.hoursLabel}</p>
          <p className="mt-1 text-sm text-ambre-400">{site.emergencyLabel}</p>

          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-marine-400">
            Zone d’intervention
          </p>
          <p className="mt-3 text-sm">{site.areaServed.join(' · ')}</p>
        </div>
      </div>

      <div className="border-t border-marine-800">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-marine-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name} — Plombier à Marseille 9e</p>
          <Link to="/mentions-legales" className="underline-offset-2 hover:underline">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  )
}
