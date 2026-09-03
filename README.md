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
  lib/avis.ts        Avis Google — À REMPLIR (voir plus bas)
  lib/photos.ts      Compression d'image côté navigateur
  routes/            Une page par fichier
  components/        Header, Footer, CallBar, formulaire, icônes, UI
  server/devis.ts    Server function : validation + e-mail Resend + SMS
  server/sms.ts      Notification SMS (Brevo ou Twilio)
  server/storage.ts  URL signées Supabase Storage
```

---

## ⚠ À faire avant la mise en ligne

### 1. Vérifier les données de l'entreprise — `src/lib/site.ts`

Ces valeurs n'ont pas été fournies et portent des valeurs par défaut :

| Champ | Valeur actuelle | Pourquoi c'est important |
| --- | --- | --- |
| `url` | `https://plomberie-avetisyan.fr` | Sert aux canonicals et au sitemap |
| `email` | `contact@plomberie-avetisyan.fr` | Adresse affichée et destinataire par défaut |
| `hours` | Lun–Ven 7h30–19h30, Sam 8h–18h | **Publié dans le schema LocalBusiness** : doit correspondre exactement à la fiche Google Business Profile, sinon Google signale l'écart |
| `geo` | Centre approximatif du 13009 | À affiner sur la vraie adresse |
| `legal.siret`, `legal.insurance` | « À compléter » | Obligation légale, affiché en mentions légales |

Le domaine apparaît aussi dans `vite.config.ts` (`sitemap.host`) et
`public/robots.txt` — pensez à les modifier ensemble.

### 2. Coller deux vrais avis Google — `src/lib/avis.ts`

Le fichier est **volontairement vide**. Publier des témoignages inventés est une
pratique commerciale trompeuse (art. L121-2 et L121-4 du Code de la consommation),
sanctionnable et détectée par Google. La marche à suivre est détaillée en tête du
fichier : ouvrir la fiche Google Business Profile, copier deux avis à l'identique,
renseigner auteur / date / note.

Tant que le tableau est vide, la section « Ils nous ont appelés en second » de la page
Recherche de fuite ne s'affiche pas. Le reste du site est cohérent sans elle.

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

## Points connus

- `npm audit` signale des vulnérabilités dans `sharp`/`libvips`, tirées par
  `@netlify/vite-plugin-tanstack-start` → `@netlify/dev`. Cette chaîne est une
  **dépendance de développement** utilisée pour l'émulation locale ; elle n'est pas
  embarquée dans le site déployé.
- TypeScript est épinglé en 5.x : la 7.x casse `ts-api-utils`, tiré transitivement par
  l'outillage Netlify.
