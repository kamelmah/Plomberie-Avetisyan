import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/lib/seo'
import { CallBand, Card, CheckList, PageHero, Section, Steps } from '~/components/ui'
import { IconPipe, IconScope, IconWave, IconWrench } from '~/components/Icons'

export const Route = createFileRoute('/debouchage')({
  head: () =>
    seo({
      title: 'Débouchage canalisation Marseille — WC, évier, colonne | Plomberie Avetisyan',
      description:
        'Débouchage de canalisation à Marseille : WC, évier, douche, colonne d’immeuble. Furet électromécanique, haute pression et contrôle caméra. Devis clair — 06 60 60 05 00.',
      path: '/debouchage',
    }),
  component: Debouchage,
})

function Debouchage() {
  return (
    <>
      <PageHero
        eyebrow="Évacuations"
        title="Débouchage de canalisation à Marseille"
        intro="Un bouchon se retire, il ne se dissout pas. On dégage l’évacuation mécaniquement, puis on vérifie à la caméra pourquoi elle s’est bouchée."
      />

      <Section
        title="Les méthodes, dans l’ordre"
        lead="On commence par le moins agressif pour vos canalisations et on monte en puissance seulement si nécessaire."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Card icon={<IconWrench className="h-5 w-5" />} title="Furet électromécanique">
            Un flexible rotatif motorisé perce et râcle le bouchon sur plusieurs dizaines de
            mètres. Efficace sur les amas de cheveux, graisses et lingettes.
          </Card>
          <Card icon={<IconWave className="h-5 w-5" />} title="Hydrocurage haute pression">
            Un jet d’eau haute pression décolle les dépôts collés à la paroi et remet la
            canalisation à son diamètre d’origine, sans produit chimique.
          </Card>
          <Card icon={<IconScope className="h-5 w-5" />} title="Inspection caméra">
            Après dégagement, la caméra montre l’état interne : racines, contre-pente,
            emboîtement décalé, canalisation fissurée.
          </Card>
        </div>
        <p className="mt-8 max-w-3xl text-marine-700">
          Les déboucheurs chimiques du commerce attaquent les joints et le PVC sans retirer
          le bouchon. Ils sont à éviter, en particulier avant une intervention : ils rendent
          le travail dangereux pour l’intervenant.
        </p>
      </Section>

      <Section tone="tint" title="Ce qu’on débouche">
        <CheckList
          items={[
            'WC bouché ou qui remonte',
            'Évier et lavabo qui s’écoulent lentement',
            'Douche ou baignoire qui stagne',
            'Machine à laver dont l’évacuation refoule',
            'Siphon de sol et regard extérieur',
            'Colonne d’évacuation d’immeuble',
            'Canalisation enterrée obstruée par des racines',
            'Odeurs d’égout persistantes malgré un siphon plein',
          ]}
        />
      </Section>

      <Section title="Le déroulé">
        <Steps
          steps={[
            {
              title: 'Repérage',
              body: 'On identifie quel tronçon est bouché en testant les points d’eau : un seul évier, ou toute la colonne.',
            },
            {
              title: 'Accès',
              body: 'Intervention par le regard, le siphon ou l’évacuation, en protégeant le sol et le mobilier.',
            },
            {
              title: 'Dégagement',
              body: 'Furet puis haute pression si nécessaire. On travaille jusqu’à l’écoulement franc, pas jusqu’au simple filet.',
            },
            {
              title: 'Contrôle',
              body: 'Test d’écoulement en charge et passage caméra si le bouchon a une cause structurelle.',
            },
          ]}
        />
      </Section>

      <Section tone="tint" title="Si ça se rebouche, c’est un symptôme">
        <div className="grid gap-5 md:grid-cols-2">
          <Card icon={<IconPipe className="h-5 w-5" />} title="Une cause mécanique">
            Contre-pente, emboîtement mal aligné, canalisation affaissée ou fissurée : le
            bouchon revient toujours au même endroit tant que la cause reste.
          </Card>
          <Card icon={<IconScope className="h-5 w-5" />} title="Un diagnostic filmé">
            L’inspection caméra situe le défaut au mètre près et permet de chiffrer une
            réparation ciblée plutôt qu’un débouchage tous les six mois.
          </Card>
        </div>
      </Section>

      <CallBand
        title="Évacuation bouchée ?"
        body="Décrivez ce qui refoule et depuis quand. On vous dit si c’est un bouchon local ou un problème de colonne, et ce que ça coûte."
      />
    </>
  )
}
