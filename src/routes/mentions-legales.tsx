import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/lib/seo'
import { site } from '~/lib/site'

export const Route = createFileRoute('/mentions-legales')({
  head: () => {
    const base = seo({
      title: 'Mentions légales — Plomberie Avetisyan',
      description:
        'Mentions légales du site de Plomberie Avetisyan, plombier à Marseille 9e : éditeur, hébergeur et traitement des données personnelles.',
      path: '/mentions-legales',
    })
    // Page utile aux visiteurs mais sans valeur en référencement.
    return { ...base, meta: [...base.meta, { name: 'robots', content: 'noindex, follow' }] }
  },
  component: MentionsLegales,
})

function MentionsLegales() {
  return (
    <>
      <header className="bg-marine-900 text-white">
        <div className="wrap py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mentions légales</h1>
        </div>
      </header>

      <div className="wrap grid max-w-3xl gap-8 py-12 sm:py-16">
        <Bloc titre="Éditeur du site">
          <p>
            {site.legalName} — {site.legal.form}
            <br />
            Représentant légal : {site.manager}
            <br />
            {site.address.postalCode} {site.address.locality}, France
            <br />
            Téléphone : {site.phone}
            <br />
            E-mail : {site.email}
            <br />
            SIRET : {site.legal.siret}
            <br />
            Assurance professionnelle : {site.legal.insurance}
          </p>
        </Bloc>

        <Bloc titre="Directeur de la publication">
          <p>{site.manager}</p>
        </Bloc>

        <Bloc titre="Hébergement">
          <p>{site.legal.host}</p>
        </Bloc>

        <Bloc titre="Données personnelles">
          <p>
            Les informations saisies dans le formulaire de contact (nom, téléphone, e-mail,
            code postal, description du problème et photos éventuelles) sont utilisées
            uniquement pour répondre à votre demande et établir un devis. Elles ne sont ni
            cédées ni revendues à des tiers.
          </p>
          <p>
            Elles transitent par Resend (envoi de l’e-mail), par le fournisseur SMS utilisé
            pour la notification, et les photos sont stockées chez Supabase. Elles sont
            conservées le temps du traitement de la demande, puis au maximum trois ans à
            compter du dernier contact.
          </p>
          <p>
            Conformément au RGPD, vous disposez d’un droit d’accès, de rectification,
            d’effacement, de limitation et d’opposition sur vos données. Pour l’exercer,
            écrivez à {site.email}. Vous pouvez également introduire une réclamation auprès de
            la CNIL.
          </p>
        </Bloc>

        <Bloc titre="Cookies">
          <p>
            Ce site ne dépose aucun cookie publicitaire ni traceur de mesure d’audience. Aucun
            consentement n’est donc requis.
          </p>
        </Bloc>

        <Bloc titre="Propriété intellectuelle">
          <p>
            L’ensemble des contenus de ce site (textes, illustrations, code) est la propriété
            de {site.legalName}. Toute reproduction sans autorisation est interdite.
          </p>
        </Bloc>
      </div>
    </>
  )
}

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-extrabold text-marine-900">{titre}</h2>
      <div className="mt-3 space-y-3 text-marine-700">{children}</div>
    </section>
  )
}
