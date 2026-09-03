import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/lib/seo'
import { site } from '~/lib/site'
import { CallBand, CheckList, Card, PageHero, Section, Steps } from '~/components/ui'
import { IconAlert, IconClock, IconEuro, IconShield, IconWrench } from '~/components/Icons'

export const Route = createFileRoute('/depannage-urgent')({
  head: () =>
    seo({
      title: 'Plombier urgence Marseille — dépannage rapide 7j/7 | Plomberie Avetisyan',
      description:
        'Plombier d’urgence à Marseille : fuite, rupture de canalisation, dégât des eaux, chauffe-eau en panne. Mise en sécurité puis réparation, tarif annoncé avant. 06 60 60 05 00.',
      path: '/depannage-urgent',
    }),
  component: DepannageUrgent,
})

function DepannageUrgent() {
  return (
    <>
      <PageHero
        eyebrow="Intervention rapide"
        title="Dépannage plomberie urgent à Marseille"
        intro="Une fuite qui coule maintenant se traite maintenant. Appelez : on vous guide d’abord pour limiter les dégâts, puis on intervient."
      />

      <Section tone="tint">
        <div className="rounded-2xl border-2 border-ambre-500 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ambre-500 text-marine-950">
              <IconAlert className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-marine-900">
                À faire tout de suite, avant même d’appeler
              </h2>
              <ol className="mt-4 grid gap-3 text-marine-800">
                <li>
                  <strong>1. Coupez l’eau</strong> au robinet d’arrêt général du logement,
                  ou au compteur si vous n’y accédez pas.
                </li>
                <li>
                  <strong>2. Coupez l’électricité</strong> de la zone touchée si l’eau
                  approche d’une prise, d’un tableau ou d’un luminaire.
                </li>
                <li>
                  <strong>3. Photographiez</strong> les dégâts avant d’éponger : votre
                  assurance vous les demandera.
                </li>
                <li>
                  <strong>4. Prévenez le voisin du dessous</strong> si l’eau peut traverser
                  le plancher.
                </li>
              </ol>
              <p className="mt-5 text-marine-700">
                Ensuite seulement, appelez le {site.phone}. Ces quatre gestes coûtent deux
                minutes et évitent souvent l’essentiel des dommages.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Ce qu’on dépanne en urgence">
        <CheckList
          items={[
            'Fuite d’eau active, visible ou dans un mur',
            'Rupture ou percement de canalisation',
            'Dégât des eaux en cours, chez vous ou chez le voisin',
            'Chauffe-eau qui fuit, ne chauffe plus ou déclenche la sécurité',
            'WC bouché ou qui déborde',
            'Évacuation refoulée dans un évier, une douche ou une baignoire',
            'Robinet ou flexible cassé impossible à refermer',
            'Compteur qui tourne en continu, réseau à isoler',
            'Vanne d’arrêt bloquée ou grippée',
            'Radiateur ou réseau de chauffage qui fuit',
          ]}
        />
      </Section>

      <Section tone="tint" title="Comment se déroule une urgence">
        <Steps
          steps={[
            {
              title: 'Appel et pré-diagnostic',
              body: 'Grigor Avetisyan répond, évalue la gravité et vous guide immédiatement pour stopper ou contenir la fuite.',
            },
            {
              title: 'Tarif annoncé',
              body: 'Coût du déplacement et fourchette d’intervention donnés au téléphone, avant de vous engager.',
            },
            {
              title: 'Mise en sécurité',
              body: 'Arrivée sur place, isolement du réseau concerné, arrêt de l’écoulement. La priorité est de stopper les dégâts.',
            },
            {
              title: 'Réparation',
              body: 'Réparation dans la foulée si la pièce est disponible, sinon solution provisoire étanche et retour planifié.',
            },
          ]}
        />
      </Section>

      <Section title="Ce qui change avec nous">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={<IconClock className="h-5 w-5" />} title="Un seul interlocuteur">
            Vous parlez au gérant, pas à un standard qui revend l’appel à un sous-traitant
            inconnu.
          </Card>
          <Card icon={<IconEuro className="h-5 w-5" />} title="Pas de tarif surprise">
            Le prix est annoncé avant le déplacement. Ce qui est dit au téléphone est ce qui
            est facturé.
          </Card>
          <Card icon={<IconWrench className="h-5 w-5" />} title="Matériel embarqué">
            Détection et réparation dans le même camion : pas de second déplacement pour
            aller chercher un appareil.
          </Card>
          <Card icon={<IconShield className="h-5 w-5" />} title="Dossier assurance">
            Facture détaillée et rapport d’intervention, prêts pour votre déclaration de
            sinistre.
          </Card>
        </div>
      </Section>

      <CallBand
        title={`Ça coule maintenant ? Appelez le ${site.phone}`}
        body="Coupez l’eau, puis composez le numéro. On évalue la situation avec vous en deux minutes et on vous dit sous combien de temps on peut être là."
      />
    </>
  )
}
