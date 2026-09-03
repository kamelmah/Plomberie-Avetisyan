# Plomberie Avetisyan — site vitrine

Site vitrine de **Plomberie Avetisyan** (gérant : Grigor Avetisyan), plombier à
Marseille 9e — recherche de fuite difficile, dépannage urgent, débouchage.

TanStack Start + Tailwind v4, déployé sur Netlify.

---

## Architecture, en deux phrases

Les six pages sont **pré-rendues en HTML statique au build** et servies par le CDN
Netlify : aucune fonction serveur n'est réveillée pour afficher une page. Seuls le
formulaire de devis (e-mail Resend + SMS) et la délivrance des URL d'envoi de photos
passent par une fonction serveur.

Aucune photo, aucune police web, aucun tracker : l'identité visuelle repose sur des
aplats de bleu profond, des icônes SVG inline et la pile de polices système.

## Démarrer

```bash
npm install
cp .env.example .env      # puis renseigner les clés
npm run dev               # http://localhost:3000
npm run build             # build + pré-rendu + sitemap
npm run typecheck
```

## Structure

```
src/
  lib/site.ts        Coordonnées, horaires, zone d'intervention — SOURCE UNIQUE
  lib/schema.ts      JSON-LD LocalBusiness (sous-type Plumber)
  lib/seo.ts         title / description / canonical / Open Graph par page
  lib/avis.ts        Avis Google réels, copiés depuis la fiche
  lib/photos.ts      Compression d'image côté navigateur
  routes/            Une page par fichier
  components/        Header, Footer, CallBar, horaires, avis, formulaire, UI
  server/devis.ts    Server function : validation + e-mail Resend + SMS
  server/sms.ts      Notification SMS (Brevo ou Twilio)
  server/storage.ts  URL signées Supabase Storage
```

---

## ⚠ À faire avant la mise en ligne

### 1. Ce qui reste à compléter — `src/lib/site.ts`

Les coordonnées, horaires, adresse et géolocalisation proviennent de la **fiche Google
Business Profile** (relevé du 2026-09-03) et sont donc alignées avec elle. Restent
ouverts :

| Champ | Valeur actuelle | Pourquoi |
| --- | --- | --- |
| `url` | `https://plomberie-avetisyan.fr` | Domaine réel — sert aux canonicals et au sitemap |
| `email` | `contact@plomberie-avetisyan.fr` | Absent de la fiche Google : à confirmer |
| `legal.siret` | « À compléter » | Obligation légale, affiché en mentions légales |
| `legal.insurance` | « À compléter » | Assurance décennale |

Le domaine apparaît aussi dans `vite.config.ts` (`sitemap.host`) et
`public/robots.txt` — pensez à les modifier ensemble.

**Toute modification des horaires sur la fiche Google doit être répercutée dans
`site.hours`**, et inversement : Google signale les écarts entre la fiche et le schema
LocalBusiness du site. Les horaires affichés (footer, page contact, accueil) sont tous
dérivés de ce tableau par `horairesGroupes()` — il n'y a rien d'autre à modifier.

### 2. Renseigner le site sur la fiche Google

La fiche n'a **aucun site web déclaré**. Une fois le domaine en ligne, ajoutez-le dans
Google Business Profile : c'est le lien qui transfère l'autorité des 301 avis vers le
site.

### 3. Avis clients — `src/lib/avis.ts`

Le fichier contient **deux avis réels**, copiés à l'identique depuis la fiche Google
(Anne Michelin et robert pekmezian), tous deux sur une fuite trouvée après l'échec
d'autres intervenants. Ils s'affichent sur la page Recherche de fuite.

Ne jamais les reformuler, raccourcir ni corriger. Pour en ajouter : fiche Google →
onglet Avis → copier le texte exact, l'auteur tel qu'affiché et la note.

La note globale (5,0 sur 301 avis) est affichée sur l'accueil et la page contact, mais
**volontairement absente du JSON-LD** : Google interdit le balisage `aggregateRating`
auto-déclaré reprenant sa propre note et le sanctionne par une action manuelle. Les
étoiles dans les résultats de recherche viennent de la fiche, pas d'un balisage.

---

## Variables d'environnement

À renseigner dans **Netlify → Site configuration → Environment variables**, et en local
dans `.env`. Voir `.env.example` pour la liste complète et commentée.

### E-mail — Resend (obligatoire)

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend |
| `RESEND_FROM` | Expéditeur — doit appartenir à un domaine vérifié dans Resend |
| `RESEND_TO` | Adresse qui reçoit les demandes |

Sans `RESEND_API_KEY`, le formulaire affiche un message clair invitant à téléphoner.

### SMS au gérant (facultatif)

`SMS_TO` (format E.164) plus **l'un** des deux fournisseurs :

- **Brevo** — `BREVO_API_KEY`, `BREVO_SMS_SENDER` (expéditeur alphanumérique à faire
  déclarer auprès de Brevo pour la France, 11 caractères maximum). Retenu en priorité.
- **Twilio** — `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`. Utilisé si
  Brevo n'est pas configuré.

Le SMS contient le nom, le téléphone, les 100 premiers caractères de la demande et les
liens vers les photos. **Un échec d'envoi SMS ne bloque jamais l'e-mail ni la réponse au
client** : l'erreur est journalisée dans les logs de la fonction Netlify et la demande
est comptée comme reçue.

> Note de coût : les liens photo signés sont longs. Un SMS avec trois photos occupe
> plusieurs segments facturés. Si le coût devient gênant, retirez `photos` de l'appel à
> `composerSms` dans `src/server/devis.ts` — les liens resteront dans l'e-mail.

### Photos — Supabase Storage (facultatif)

| Variable | Rôle |
| --- | --- |
| `SUPABASE_URL` | URL du projet |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé `service_role` — **secrète**, jamais préfixée `VITE_` |
| `SUPABASE_BUCKET` | Nom du bucket (défaut : `devis-photos`) |

Configuration du bucket, côté Supabase :

1. Créez un bucket **privé** nommé `devis-photos`.
2. Réglez sa **limite de taille de fichier à 5 Mo**.
3. Restreignez les **types MIME** à `image/jpeg`, `image/png`, `image/webp`,
   `image/heic`, `image/heif`.

Les points 2 et 3 sont l'application réelle de la contrainte : la validation dans la
fonction serveur porte sur les tailles déclarées par le client, celle de Supabase porte
sur l'octet reçu.

**Comment ça marche.** Le navigateur compresse chaque image (1600 px au plus long côté,
JPEG qualité 0,72 — une photo de smartphone de 6 Mo tombe typiquement sous 500 Ko), puis
la fonction serveur délivre une URL de téléversement signée par photo et le navigateur
écrit **directement** dans Supabase. Deux conséquences : la limite de 6 Mo sur le corps
d'une requête de fonction Netlify ne s'applique pas, et aucune clé Supabase n'atteint le
navigateur. Les liens insérés dans l'e-mail et le SMS sont des URL signées valables
30 jours.

Sans ces variables, le champ photo renvoie une erreur explicite et la demande reste
envoyable sans photo.

---

## Déploiement Netlify

Le dépôt contient déjà `netlify.toml` (commande de build, Node 22, en-têtes de cache).
`@netlify/vite-plugin-tanstack-start` écrit la fonction serveur dans
`.netlify/v1/functions/` au build.

1. Connectez le dépôt à Netlify. La commande (`npm run build`) et le répertoire de
   publication sont lus depuis `netlify.toml`.
2. Renseignez les variables d'environnement ci-dessus.
3. Ajoutez le domaine, puis mettez à jour `site.url`, `sitemap.host` et `robots.txt`.
4. Déclarez le sitemap (`/sitemap.xml`) dans la Google Search Console.

## Performance

- Six pages en HTML statique, servies par le CDN — le premier rendu ne dépend d'aucun JS.
- Aucune police web (pile système), aucune image bitmap, aucun tracker.
- CSS ≈ 24 Ko avant compression, une seule feuille.
- Le JS d'hydratation est différé et découpé par route.

Les en-têtes de `netlify.toml` mettent les assets fingerprintés en cache immuable un an.

## Pistes non traitées

- **Chauffe-eau.** C'est le troisième mot-clé des avis (18 occurrences, derrière
  « réactif » et « recherche de fuite »), et le site n'a pas de page dédiée — seulement
  une ligne dans la page Dépannage urgent. Une page `/chauffe-eau` ciblant
  « remplacement chauffe-eau Marseille » correspondrait à une demande déjà démontrée.
- **Photos de la fiche Google.** La fiche porte 15 photos haute résolution. Elles ne
  sont pas utilisées : les URL `lh3.googleusercontent.com` sont instables, un appel
  externe par image contredit l'objectif de vitesse, et les droits ne sont pas établis
  (certaines peuvent avoir été déposées par des clients). Pour les exploiter :
  télécharger, vérifier qu'elles vous appartiennent, convertir en AVIF/WebP et les
  héberger dans `public/`.
- **Autres avis exploitables.** Trois autres avis mentionnent une fuite trouvée après
  échec d'un confrère (Malika AMEDDAH, Brunovalp Perez, prospectionyannpersoglio) et
  peuvent être ajoutés à `src/lib/avis.ts` sans modifier le code.

## Points connus

- `npm audit` signale des vulnérabilités dans `sharp`/`libvips`, tirées par
  `@netlify/vite-plugin-tanstack-start` → `@netlify/dev`. Cette chaîne est une
  **dépendance de développement** utilisée pour l'émulation locale ; elle n'est pas
  embarquée dans le site déployé.
- TypeScript est épinglé en 5.x : la 7.x casse `ts-api-utils`, tiré transitivement par
  l'outillage Netlify.
