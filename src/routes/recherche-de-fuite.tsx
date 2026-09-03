import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/lib/seo'
import { AvisClients } from '~/components/Avis'
import { CallBand, Card, CheckList, PageHero, Section, Steps } from '~/components/ui'
import {
  IconAlert,
  IconDroplet,
  IconPipe,
  IconScope,
  IconShield,
  IconThermal,
  IconWave,
} from '~/components/Icons'

export const Route = createFileRoute('/recherche-de-fuite')({
  head: () =>
    seo({
      title: 'Recherche de fuite Marseille — Plomberie Avetisyan',
      description:
        'Recherche de fuite non visible à Marseille : fuite en cloison, sous dalle, sous chape. Détection non destructive par caméra thermique, gaz traceur et acoustique. 06 60 60 05 00.',
      path: '/recherche-de-fuite',
    }),
  component: RechercheDeFuite,
})

function RechercheDeFuite() {
  return (
    <>
      <PageHero
        eyebrow="Spécialité principale"
        title="Recherche de fuite à Marseille : trouver ce qui ne se voit pas"
        intro="Une fuite non visible ne se devine pas, elle se mesure. On la localise au point près avant qu’un seul carreau ne soit déposé — y compris quand une première intervention a échoué."
      />

      <Section
        title="Une fuite non visible, c’est quoi exactement"
        lead="L’eau apparaît rarement là où elle s’échappe. Elle suit une gaine, une dalle, un joint de carrelage, et ressort trois mètres plus loin."
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-4 text-marine-800">
            <p>
              C’est ce décalage qui rend ces fuites difficiles. Une tache au plafond de la
              cuisine peut venir d’un raccord de douche à l’étage, d’une colonne encastrée
              dans le mur mitoyen, ou d’une canalisation enterrée sous la dalle. Trois causes,
              trois réparations sans rapport entre elles.
            </p>
            <p>
              Ouvrir le mur sous la tache est donc le pire réflexe : dans la majorité des cas,
              il n’y a rien derrière. Deux jours de travaux, un mur à refaire, et la fuite
              continue.
            </p>
            <p>
              La méthode inverse consiste à instrumenter avant de toucher. Test de mise sous
              pression pour confirmer la fuite et mesurer son débit, isolement du tronçon
              concerné, puis localisation physique. Le mur n’est ouvert qu’une fois, à
              l’endroit exact.
            </p>
          </div>

          <div className="rounded-2xl bg-marine-900 p-6 text-white sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ambre-500 text-marine-950">
              <IconAlert className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Les indices d’une fuite non visible</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-marine-100">
              <li>Le compteur avance alors que tous les robinets sont fermés</li>
              <li>Une tache d’humidité qui grandit lentement, sans source apparente</li>
              <li>Une zone de sol tiède au pied nu</li>
              <li>La facture d’eau qui double d’un relevé à l’autre</li>
              <li>Une odeur de moisi qui revient malgré l’aération</li>
              <li>De la peinture qui cloque en bas d’un mur</li>
              <li>Une pression d’eau chaude qui baisse sans raison</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        tone="tint"
        title="Fuite en cloison"
        lead="Le cas le plus fréquent en appartement marseillais : une canalisation encastrée dans une cloison ou un doublage."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <Card icon={<IconPipe className="h-5 w-5" />} title="Ce qui lâche">
            Un raccord à sertir mal fait, un coude de cuivre percé par corrosion, une
            alimentation de chasse d’eau, une colonne montante ancienne. Le débit est souvent
            minuscule : quelques gouttes par minute, invisibles pendant des mois.
          </Card>
          <Card icon={<IconThermal className="h-5 w-5" />} title="Comment on la trouve">
            La caméra thermique lit l’écart de température entre la zone humide et le reste
            de la cloison — franc sur l’eau chaude, plus subtil sur l’eau froide. On confirme
            au gaz traceur, qui ressort exactement au point percé.
          </Card>
          <Card icon={<IconShield className="h-5 w-5" />} title="Ce que ça évite">
            Une ouverture ciblée de 30 × 30 cm au lieu du démontage d’un mur entier. Sur du
            carrelage mural ancien qu’on ne retrouve plus, la différence est décisive.
          </Card>
        </div>
      </Section>

      <Section
        title="Fuite sous dalle et sous chape"
        lead="Le cas le plus redouté, et celui pour lequel on nous appelle le plus souvent en second."
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 text-marine-800">
            <p>
              Sous une dalle béton ou une chape, la canalisation est noyée : aucun accès,
              aucun repère visuel. L’eau chemine dans le lit de sable, migre parfois sur
              plusieurs mètres, et ressort au pied d’un mur ou chez le voisin du dessous.
            </p>
            <p>
              C’est là que la recherche à l’aveugle coûte le plus cher. Piquer une chape au
              hasard, c’est plusieurs jours de chantier, du carrelage à remplacer, et souvent
              rien au bout.
            </p>
            <p>
              La localisation se fait en croisant trois signaux : la thermographie révèle le
              tracé chaud d’une fuite d’eau chaude sanitaire ou de plancher chauffant,
              l’écoute acoustique amplifiée capte le sifflement de l’eau sous pression à
              travers le béton, et le gaz traceur injecté dans le réseau vidé remonte au
              travers de la chape jusqu’au joint le plus proche du percement.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-marine-200 bg-marine-50 p-6">
              <h3 className="text-base font-extrabold text-marine-900">
                Plancher chauffant : cas particulier
              </h3>
              <p className="mt-2 text-marine-700">
                Sur un plancher chauffant, la thermographie devient très lisible : le circuit
                entier est chaud, et la fuite crée une anomalie franche dans le dessin des
                boucles. On identifie la boucle percée, ce qui permet souvent de l’isoler et
                de la condamner plutôt que d’ouvrir la chape.
              </p>
            </div>
            <div className="rounded-2xl border border-marine-200 bg-marine-50 p-6">
              <h3 className="text-base font-extrabold text-marine-900">
                Canalisation enterrée extérieure
              </h3>
              <p className="mt-2 text-marine-700">
                En cour ou en jardin, la corrélation acoustique entre deux points d’écoute
                situe la fuite le long du tracé. La tranchée est alors ouverte sur un mètre,
                pas sur toute la longueur.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="tint"
        title="Quand un autre plombier n’a rien trouvé"
        lead="C’est le motif d’appel le plus courant ici. Dans presque tous les cas, l’échec vient de la méthode, pas de la fuite."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Card icon={<IconScope className="h-5 w-5" />} title="Une seule technologie essayée">
            La caméra thermique seule ne voit rien sur une fuite d’eau froide à faible débit
            dans un mur épais. Il faut basculer sur le gaz traceur — encore faut-il l’avoir
            dans le camion.
          </Card>
          <Card icon={<IconWave className="h-5 w-5" />} title="Recherche sans mise sous pression">
            Sans test d’étanchéité préalable, on ne sait ni si la fuite est active, ni sur
            quel réseau. On cherche partout au lieu de chercher sur le bon tronçon.
          </Card>
          <Card icon={<IconDroplet className="h-5 w-5" />} title="Confusion avec une infiltration">
            Toutes les humidités ne sont pas des fuites : condensation, remontée capillaire,
            infiltration en façade. Le compteur et le test de pression tranchent en dix minutes.
          </Card>
          <Card icon={<IconAlert className="h-5 w-5" />} title="Fuite intermittente">
            Une fuite qui ne coule qu’en cas de forte pression ou à l’usage d’un appareil
            précis échappe à une visite rapide. Il faut reproduire les conditions, pas
            constater à un instant donné.
          </Card>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-marine-300 bg-white p-6 sm:p-8">
          <h3 className="text-lg font-extrabold text-marine-900">
            Ce qu’on vous demandera au téléphone
          </h3>
          <p className="mt-2 text-marine-700">
            Si quelqu’un est déjà passé, l’intervention précédente est une information utile,
            pas un handicap : elle élimine des pistes. Préparez ces quatre éléments, on gagne
            une heure sur place.
          </p>
          <ol className="mt-5 grid gap-3 text-marine-800 sm:grid-cols-2">
            <li>
              <strong>1.</strong> Ce qui a été testé, et avec quel appareil
            </li>
            <li>
              <strong>2.</strong> Le comportement du compteur, tout fermé, sur 30 minutes
            </li>
            <li>
              <strong>3.</strong> Depuis quand la tache existe et à quelle vitesse elle grandit
            </li>
            <li>
              <strong>4.</strong> Ce qui a déjà été ouvert ou refait
            </li>
          </ol>
        </div>
      </Section>

      <AvisClients
        titre="Ils nous ont appelés en second"
        lead="Avis publiés sur notre fiche Google."
      />

      <Section title="Le déroulé d’une recherche" tone="tint">
        <Steps
          steps={[
            {
              title: 'Diagnostic au téléphone',
              body: 'Symptômes, historique, comportement du compteur. On sait déjà quelles pistes écarter avant d’arriver.',
            },
            {
              title: 'Test d’étanchéité',
              body: 'Mise sous pression du réseau pour confirmer la fuite, mesurer son débit et isoler la portion concernée.',
            },
            {
              title: 'Localisation',
              body: 'Thermique, acoustique ou gaz traceur selon le contexte, croisés si nécessaire. Le point est marqué physiquement.',
            },
            {
              title: 'Rapport et suite',
              body: 'Compte rendu écrit avec clichés, devis de réparation, ou réparation immédiate si l’accès le permet.',
            },
          ]}
        />
        <p className="mt-8 max-w-3xl text-marine-700">
          Comptez une à trois heures selon l’accessibilité du réseau. Le tarif de la recherche
          est annoncé au téléphone, avant le déplacement.
        </p>
      </Section>

      <Section title="Les quatre méthodes de détection">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card icon={<IconThermal className="h-5 w-5" />} title="Caméra thermique">
            L’eau modifie la température des matériaux. L’infrarouge révèle le tracé humide
            derrière une cloison, sous une chape ou dans un plancher chauffant, sans contact.
          </Card>
          <Card icon={<IconDroplet className="h-5 w-5" />} title="Gaz traceur">
            Un mélange hydrogène-azote, inoffensif, est injecté dans le réseau vidé. Il
            traverse le revêtement et ressort au point de fuite, où un détecteur le capte.
          </Card>
          <Card icon={<IconWave className="h-5 w-5" />} title="Écoute acoustique">
            Le bruit de l’eau sous pression s’entend au sol. Amplification et corrélation
            entre deux points situent la fuite sur les canalisations enterrées.
          </Card>
          <Card icon={<IconScope className="h-5 w-5" />} title="Inspection endoscopique">
            Une micro-caméra passée dans les canalisations et les vides de construction montre
            l’état réel du réseau : fissure, joint, raccord corrodé.
          </Card>
        </div>
      </Section>

      <Section tone="tint" title="Les cas qu’on traite le plus souvent">
        <CheckList
          items={[
            'Fuite encastrée dans un mur ou une cloison',
            'Fuite sous dalle, sous chape ou sous carrelage',
            'Fuite sur plancher chauffant',
            'Infiltration chez le voisin du dessous',
            'Fuite sur canalisation enterrée en jardin ou en cour',
            'Fuite sur colonne montante d’immeuble',
            'Fuite après compteur, en amont du logement',
            'Fuite sur réseau d’eau chaude sanitaire',
            'Remontée d’humidité en pied de mur',
            'Recherche déjà tentée sans résultat par un autre intervenant',
          ]}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card icon={<IconPipe className="h-5 w-5" />} title="Localisation précise">
            Le point de fuite marqué sur place, avec la profondeur et le type de canalisation
            concernée.
          </Card>
          <Card icon={<IconShield className="h-5 w-5" />} title="Rapport écrit">
            Un document daté décrivant la méthode employée, les mesures relevées et les
            clichés, transmissible à votre assureur.
          </Card>
          <Card icon={<IconScope className="h-5 w-5" />} title="Devis de réparation">
            Le coût de la réparation, chiffré, sans obligation de nous la confier.
          </Card>
        </div>
        <p className="mt-8 max-w-3xl text-marine-700">
          En cas de dégât des eaux, la plupart des contrats multirisque habitation prennent en
          charge la recherche de fuite. Le rapport est rédigé dans ce but : conservez-le et
          transmettez-le à votre assureur avec votre déclaration.
        </p>
      </Section>

      <CallBand
        title="Un autre plombier n’a rien trouvé ?"
        body="Dites-nous ce qui a déjà été testé. On repart des mesures, pas de zéro — et on choisit une méthode différente."
      />
    </>
  )
}
