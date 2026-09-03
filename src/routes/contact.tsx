import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/lib/seo'
import { site, telHref } from '~/lib/site'
import { DevisForm } from '~/components/DevisForm'
import { Section } from '~/components/ui'
import { Horaires, NoteGoogle } from '~/components/Horaires'
import { IconClock, IconMail, IconPhone, IconPin } from '~/components/Icons'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact & devis gratuit — Plombier Marseille 9e | Plomberie Avetisyan',
      description:
        'Contactez Plomberie Avetisyan à Marseille 9e : 06 60 60 05 00. Devis gratuit pour recherche de fuite, dépannage urgent ou débouchage. Réponse rapide.',
      path: '/contact',
    }),
  component: Contact,
})

function Contact() {
  return (
    <>
      <header className="bg-marine-900 text-white">
        <div className="wrap py-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-ambre-400">Contact</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl">
            Décrivez votre problème, on vous rappelle
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-marine-100">
            Pour une urgence, le téléphone reste le plus rapide. Pour un devis ou une
            situation à expliquer, le formulaire ci-dessous permet de tout détailler et
            d’envoyer des photos.
          </p>
          <div className="mt-7">
            <NoteGoogle />
          </div>
        </div>
      </header>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-marine-900">
              Demande de devis
            </h2>
            <p className="mt-2 text-marine-700">
              Les champs marqués d’une <span className="text-marine-500">*</span> sont
              obligatoires.
            </p>
            <div className="mt-8">
              <DevisForm />
            </div>
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-2xl bg-marine-900 p-6 text-white">
              <h2 className="text-lg font-extrabold">Coordonnées</h2>
              <ul className="mt-5 space-y-5 text-sm">
                <li>
                  <span className="flex items-center gap-2 font-bold text-marine-300">
                    <IconPhone className="h-4 w-4" />
                    Téléphone
                  </span>
                  <a href={telHref} className="mt-1 block text-xl font-extrabold text-ambre-400">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2 font-bold text-marine-300">
                    <IconMail className="h-4 w-4" />
                    E-mail
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block break-all underline underline-offset-2"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2 font-bold text-marine-300">
                    <IconPin className="h-4 w-4" />
                    Adresse
                  </span>
                  <p className="mt-1">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.locality}
                  </p>
                  <p className="mt-1 text-marine-300">{site.address.complement}</p>
                </li>
                <li>
                  <span className="flex items-center gap-2 font-bold text-marine-300">
                    <IconClock className="h-4 w-4" />
                    Horaires
                  </span>
                  <div className="mt-2">
                    <Horaires />
                  </div>
                  <p className="mt-2 font-semibold text-ambre-400">{site.hoursLabel}</p>
                </li>
              </ul>
            </div>

            <div className="mt-5 rounded-2xl border border-marine-200 bg-marine-50 p-6">
              <h2 className="text-base font-extrabold text-marine-900">Zone d’intervention</h2>
              <p className="mt-2 text-sm text-marine-700">{site.areaServed.join(' · ')}</p>
              <p className="mt-3 text-sm text-marine-600">
                Hors de cette zone, appelez : le déplacement est étudié au cas par cas.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
