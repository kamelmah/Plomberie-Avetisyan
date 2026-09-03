import { createFileRoute, Link } from '@tanstack/react-router'
import { seo } from '~/lib/seo'
import { horairesGroupes, site } from '~/lib/site'
import { CallBand, CallButton, Card, CheckList, GhostButton, Section } from '~/components/ui'
import { NoteGoogle } from '~/components/Horaires'
import {
  IconAlert,
  IconClock,
  IconDroplet,
  IconEuro,
  IconPin,
  IconScope,
  IconShield,
  IconWave,
} from '~/components/Icons'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'Plombier Marseille 9e — Recherche de fuite & urgences | Plomberie Avetisyan',
      description:
        'Plombier à Marseille 9e spécialisé en recherche de fuite difficile et dépannage urgent. Localisation non destructive, intervention rapide. Devis gratuit — 06 60 60 05 00.',
      path: '/',
    }),
  component: Accueil,
})

function Accueil() {
  return (
    <>
      <header className="bg-marine-900 text-white">
        <div className="wrap py-14 sm:py-20">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="inline-flex items-center gap-2 rounded-full bg-marine-800 px-3.5 py-1.5 text-sm font-bold text-ambre-400">
              <IconPin className="h-4 w-4" />
              Marseille 9e et alentours
            </p>
            <NoteGoogle />
          </div>
          <h1 className="mt-5 max-w-3xl text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.75rem] lg:text-5xl">
            Le plombier qu’on appelle quand les autres n’ont pas trouvé la fuite
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-marine-100 sm:text-xl">
            Plomberie Avetisyan localise les fuites que personne ne trouve, sans casser
            vos murs. Recherche de fuite, dépannage urgent et débouchage à Marseille.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton sublabel={site.hoursLabel} />
            <GhostButton to="/contact">Demander un devis gratuit</GhostButton>
          </div>
          <p className="mt-6 text-sm text-marine-300">
            {horairesGroupes()
              .map((g) => `${g.jours} ${g.plage}`)
              .join(' · ')}
          </p>
        </div>
      </header>

      <Section
        title="Trois urgences, une seule intervention"
        lead="Une spécialité principale — la fuite difficile — et les deux dépannages qui vont avec."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <ServiceCard
            to="/recherche-de-fuite"
            icon={<IconScope className="h-6 w-6" />}
            title="Recherche de fuite"
            body="Caméra thermique, gaz traceur, écoute acoustique, inspection endoscopique. On localise avant de percer."
          />
          <ServiceCard
            to="/depannage-urgent"
            icon={<IconAlert className="h-6 w-6" />}
            title="Dépannage urgent"
            body="Rupture de canalisation, dégât des eaux, chauffe-eau HS, robinetterie. Mise en sécurité puis réparation."
          />
          <ServiceCard
            to="/debouchage"
            icon={<IconWave className="h-6 w-6" />}
            title="Débouchage"
            body="Évier, douche, WC, colonne d’immeuble. Furet électromécanique, haute pression, contrôle caméra."
          />
        </div>
      </Section>

      <Section
        tone="tint"
        title="Pourquoi les fuites difficiles finissent ici"
        lead="Une fuite qui résiste, c’est presque toujours un problème de méthode, pas de chance."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={<IconDroplet className="h-5 w-5" />} title="Non destructif d’abord">
            Aucun mur ouvert tant que la fuite n’est pas localisée précisément. On perce à
            l’endroit exact, ou pas du tout.
          </Card>
          <Card icon={<IconScope className="h-5 w-5" />} title="Plusieurs technologies">
            Thermique, acoustique, gaz traceur, caméra : quand une méthode échoue, on croise
            avec la suivante au lieu d’abandonner.
          </Card>
          <Card icon={<IconEuro className="h-5 w-5" />} title="Prix annoncé avant">
            Le tarif de la recherche est donné au téléphone, avant le déplacement. Pas de
            surprise sur la facture.
          </Card>
          <Card icon={<IconShield className="h-5 w-5" />} title="Rapport pour l’assurance">
            Compte rendu écrit avec localisation et clichés techniques, exploitable pour votre
            déclaration de sinistre.
          </Card>
        </div>
      </Section>

      <Section title="Les signes qui doivent vous alerter">
        <CheckList
          items={[
            'Le compteur d’eau tourne alors que tout est fermé',
            'Une tache d’humidité qui s’étend au plafond ou en bas d’un mur',
            'Le sol est tiède par endroits (fuite sur plancher chauffant)',
            'La facture d’eau a doublé sans explication',
            'Une odeur de moisi persistante dans une pièce',
            'Le voisin du dessous signale une infiltration',
            'La pression d’eau chaude baisse sans raison',
            'Un plombier est déjà passé et n’a rien trouvé',
          ]}
        />
        <p className="mt-8 text-marine-700">
          Un seul de ces signes suffit pour appeler. Une fuite laissée en place abîme la
          structure et fait grimper la facture chaque jour.
        </p>
      </Section>

      <Section tone="tint" title="Comment ça se passe">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Vous appelez',
              body: 'Grigor Avetisyan prend l’appel et pose les bonnes questions. Diagnostic préliminaire et tarif au téléphone.',
            },
            {
              title: 'Intervention sur place',
              body: 'Déplacement sur Marseille et alentours. Le matériel de détection est dans le camion, pas à commander.',
            },
            {
              title: 'Localisation exacte',
              body: 'La fuite est marquée au point près. Vous voyez la mesure, on vous explique ce qui a été trouvé.',
            },
            {
              title: 'Réparation',
              body: 'Réparation immédiate quand c’est possible, sinon devis chiffré et rapport écrit pour l’assurance.',
            },
          ].map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-marine-900 p-6 text-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ambre-500 text-base font-extrabold text-marine-950">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-marine-100">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Zone d’intervention">
        <div className="flex flex-wrap gap-2.5">
          {site.areaServed.map((zone) => (
            <span
              key={zone}
              className="inline-flex items-center gap-2 rounded-lg border border-marine-200 bg-marine-50 px-3.5 py-2 text-sm font-semibold text-marine-800"
            >
              <IconPin className="h-4 w-4 text-marine-500" />
              {zone}
            </span>
          ))}
        </div>
        <p className="mt-6 flex items-start gap-2.5 text-marine-700">
          <IconClock className="mt-1 h-5 w-5 shrink-0 text-marine-500" />
          <span>
            Base au 13009. Sur Marseille 9e et les arrondissements limitrophes, le délai
            d’intervention est le plus court. Ailleurs, appelez : le déplacement est étudié
            au cas par cas.
          </span>
        </p>
      </Section>

      <CallBand
        title="Une fuite ne s’arrête pas toute seule"
        body="Décrivez la situation en deux minutes au téléphone. Vous saurez immédiatement s’il faut intervenir en urgence et combien ça coûte."
      />
    </>
  )
}

function ServiceCard({
  to,
  icon,
  title,
  body,
}: {
  to: string
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-2xl border border-marine-200 bg-white p-6 transition-colors hover:border-marine-400 hover:bg-marine-50"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-marine-900 text-white">
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-marine-900">{title}</h3>
      <p className="mt-2 flex-1 text-marine-700">{body}</p>
      <span className="mt-4 text-sm font-bold text-marine-600 group-hover:text-marine-800">
        En savoir plus →
      </span>
    </Link>
  )
}
