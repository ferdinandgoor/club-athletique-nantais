# Comprendre le projet

## Les outils, en quelques mots

- **React** assemble l’interface à partir de composants réutilisables.
- **TypeScript** repère des erreurs dans les données et le code avant publication.
- **SCSS** décrit l’apparence du site. Aucun framework CSS n’est utilisé.
- **Vite** lance le serveur de développement et prépare les fichiers de production.
- **Vitest** exécute les tests ; **ESLint** contrôle le JavaScript et le TypeScript. Le lint ne contrôle pas le SCSS ; celui-ci est compilé au build.
- **GitHub Actions** lance ces vérifications et peut transférer le site par FTP/FTPS.

## Organisation des fichiers

```text
src/
  data/site.ts           Nom, domaine et textes du club
  data/pages.ts          Liste des pages, titres, descriptions et navigation
  components/            Éléments réutilisables, chacun avec son fichier SCSS
    Container/           Largeur et marges du contenu
    PageShell/           En-tête, navigation, contenu principal et pied de page
  pages/Home/            Page d’accueil et son SCSS
  styles/tokens.scss     Couleurs et espacements partagés
  styles/global.scss     Règles communes et accessibilité
  utils/site-url.ts      Validation de l’URL du site
  App.tsx                Choix de la page selon son adresse
  seo.ts                 Métadonnées pour moteurs de recherche et partage
  entry-client.tsx       Démarrage dans le navigateur
  entry-server.tsx       Rendu HTML pendant la construction du site
public/
  images/                Images à ajouter par le club
  .htaccess              Page 404 pour un hébergement Apache
scripts/
  prerender.mjs          Génération du HTML, sitemap et robots.txt
  check-build.mjs        Vérification des fichiers générés
  validate-deploy.mjs    Vérification de la configuration FTP avant transfert
tests/                   Tests automatisés
.github/workflows/       Vérification et publication GitHub Actions
docs/                    Guides en français
  CLUB.md                Informations connues, manquantes et à confirmer sur le club
```

`dist/`, `.ssr/` et `node_modules/` sont générés automatiquement et ignorés par Git. Ne jamais modifier `dist/` à la main : le prochain build remplace son contenu.

## Du code au site public

1. Vite compile le code du navigateur et les styles dans `dist/assets/`.
2. Un second build crée un module temporaire dans `.ssr/`.
3. `prerender.mjs` utilise ce module pour générer un `index.html` complet par route déclarée dans `src/data/pages.ts`, ainsi que `404.html`, `sitemap.xml` et `robots.txt`.
4. `check-build.mjs` contrôle les contenus, les métadonnées, les ressources et le référencement, puis supprime `.ssr/` si les vérifications réussissent.
5. Seul le contenu de `dist/` est envoyé à l’hébergeur.

Le contenu initial est lisible sans JavaScript. React prend ensuite le relais dans le navigateur : c’est l’« hydratation ». En développement, React crée directement l’interface puisque le pré-rendu n’a pas encore eu lieu.

Les liens utilisent une navigation HTML normale : chaque adresse publique doit correspondre à un fichier généré. Cette simplicité évite un routeur supplémentaire et les règles serveur de repli vers la page d’accueil.

## Choix repris et adaptations

Le projet reprend de `the-dislockers` la pile technique, les composants avec SCSS associé, la séparation des données et le pré-rendu statique. Les routes et métadonnées ont ici une source commune pour éviter les oublis. Des tests, un contrôle du build, un verrouillage des versions npm et une chaîne de publication conditionnelle ont été ajoutés.

L’hébergement prévu sert le site **à la racine d’un domaine**, pas dans un sous-dossier d’URL. Le répertoire FTP `www/` est un dossier disque : il ne signifie pas que l’adresse publique finit par `/www/`.

## Configuration publique

`VITE_SITE_URL` fournit le domaine aux URL canoniques et au sitemap. En local, elle est facultative (valeur par défaut : `http://localhost:5173`). Pour une publication, la variable GitHub `SITE_URL` fournit cette valeur au build.

Toute variable préfixée `VITE_` peut se retrouver dans les fichiers publics. Ne jamais y placer de mot de passe ou de clé privée. Le domaine est fixé pendant le build : le changer exige de reconstruire et republier.

## Services externes présents sur l’accueil

La page d’accueil charge une carte intégrée depuis `google.com` et propose des liens vers l’App Store, Google Play, Instagram et Google Maps. Les liens simples ne contactent ces services qu’après un clic. La carte intégrée, elle, contacte Google au chargement de la section, même si elle utilise `loading="lazy"` pour différer la requête.

Le chargement de la carte peut transmettre à Google l’adresse IP du visiteur, des informations sur son navigateur et la page d’origine selon les règles du navigateur et de Google. Il peut aussi permettre à Google de déposer ou lire des traceurs selon le contexte du visiteur. Ce point doit apparaître dans la future politique de confidentialité et doit être revu avant l’ajout d’un outil de consentement. Pour supprimer cette transmission, retirer l’`iframe` dans `src/pages/Home/Home.tsx` et conserver uniquement le lien d’itinéraire.

Le header et le carrousel utilisent uniquement React et les API du navigateur. Aucun script tiers, aucune bibliothèque de carrousel et aucun outil de mesure d’audience ne sont chargés.

Le tutoriel d’inscription est isolé dans `RegistrationGuide` et ses instructions dans `src/data/registration.ts`. Les écrans illustratifs sont rendus en HTML/SCSS et le logo MonClub est servi localement : aucun appel aux stores avant le clic sur leurs liens. La copie du code utilise le presse-papiers après action explicite, sans transmettre de données.
