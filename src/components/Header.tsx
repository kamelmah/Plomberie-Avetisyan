import { Link } from '@tanstack/react-router'
import { site, telHref } from '~/lib/site'
import { IconPhone } from './Icons'
import { Logo } from './Logo'

const nav = [
  { to: '/', label: 'Accueil' },
  { to: '/recherche-de-fuite', label: 'Recherche de fuite' },
  { to: '/depannage-urgent', label: 'Dépannage urgent' },
  { to: '/debouchage', label: 'Débouchage' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  return (
    <div className="border-b border-marine-100 bg-white">
      <div className="wrap flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link to="/" aria-label={`${site.name} — accueil`}>
          <Logo />
        </Link>

        <a
          href={telHref}
          className="hidden items-center gap-2 rounded-lg bg-ambre-500 px-4 py-2.5 text-[0.95rem] font-bold text-marine-950 transition-colors hover:bg-ambre-400 md:inline-flex"
        >
          <IconPhone className="h-5 w-5" />
          {site.phone}
        </a>
      </div>

      <nav aria-label="Navigation principale" className="border-t border-marine-100">
        <div className="wrap">
          <ul className="-mx-1 flex gap-1 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {nav.map((item) => (
              <li key={item.to} className="shrink-0">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === '/' }}
                  activeProps={{
                    className:
                      'bg-marine-900 text-white hover:bg-marine-900 hover:text-white',
                  }}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-marine-700 transition-colors hover:bg-marine-50 hover:text-marine-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
