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
  data/bureau.ts         Composition du bureau directeur (AG 2026)
  data/coaches.ts        Coachs du club, leurs disciplines et leurs profils
  components/            Éléments réutilisables, chacun avec son fichier SCSS
    Container/           Largeur et marges du contenu
    PageShell/           En-tête, navigation, contenu principal et pied de page
  pages/Home/            Page d’accueil et son SCSS
  pages/Discipline/      Modèle commun des pages musculation, force athlétique, lutte, haltérophilie et cours communs
  pages/About/           Page « Qui sommes-nous ? » et son SCSS
  pages/Coach/           Modèle commun des pages de coachs et son SCSS
  data/disciplines.ts    Résumés, chemins et contenus des disciplines
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

Chaque adresse publique correspond à un fichier généré, ce qui permet au site de fonctionner directement sans JavaScript. Après l’hydratation, `src/entry-client.tsx` intercepte les clics internes et utilise `history.pushState` : le contenu de la page change sans recharger le document, donc l’en-tête et le pied de page communs restent en place. Les boutons précédent/suivant du navigateur sont pris en charge par `popstate`. Un clic avec une touche modificatrice, un lien externe ou un lien vers la même page conserve le comportement HTML normal.

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

## Référencement local

Chaque page a un titre et une description uniques, définis dans `src/data/pages.ts`. Les pages de disciplines utilisent leur `metaTitle` spécifique (`src/data/disciplines.ts`), les pages de coachs dérivent du rôle du coach. Le build refuse deux titres ou deux descriptions identiques.

`renderHead` dans `src/seo.ts` émet pour chaque page le titre, la description, l’URL canonique, les balises Open Graph et une donnée structurée JSON-LD `SportsActivityLocation` construite depuis `schema` dans `src/data/site.ts` : nom du club, adresse, sports pratiqués et comptes Instagram (`sameAs`). Cette donnée aide les moteurs de recherche à associer le club à Nantes et à ses disciplines ; elle n’appelle aucun service externe.

Ne pas ajouter de coordonnées géographiques ni d’horaires au JSON-LD sans information confirmée : ils ne sont pas validés (position exacte) ou saisonniers (horaires). Le vrai classement dépend aussi du domaine définitif (`SITE_URL`, voir `docs/DEPLOIEMENT.md`) : les URL canoniques et le sitemap l’utilisent à chaque build. Aucune mesure d’audience n’est installée pour en vérifier l’effet.

## Orientation par discipline

L’accueil propose des liens HTML vers `/musculation/`, `/force-athletique/`, `/lutte/`, `/halterophilie/` et `/cours-communs/`. Les contenus sont centralisés dans `src/data/disciplines.ts`, les métadonnées dérivées dans `src/data/pages.ts`, et `App.tsx` associe ces chemins au modèle `Discipline`. La navigation principale est identique sur toutes les pages : les ancres vers les sections de l’accueil, « Qui sommes-nous ? » et le compte Instagram du club ; les disciplines sont accessibles par les cartes de l’accueil et les liens « Découvrir aussi » entre pages. Le champ `noun` porte l’article grammatical utilisé dans les phrases publiques. Chaque page est pré-rendue, avec son titre, sa description, son URL canonique et son entrée de sitemap. Aucun routeur supplémentaire n’est nécessaire. `PageShell` reçoit le chemin pour garder les liens vers les sections de l’accueil fonctionnels depuis une page de discipline et identifier la page active. Le bloc tarifs ne s’affiche que si la discipline a des tarifs confirmés.

Les animations au défilement sont une amélioration progressive : `useScrollReveal` observe les blocs `data-reveal` du contenu principal puis joue une animation native ponctuelle, sans masquer les blocs en attente. Il libère l’observateur au démontage, annule les effets au focus clavier et respecte les changements de préférence de réduction des animations. Les survols et animations d’entrée restent dans les SCSS des composants.

## Page de liens du club

`/links/` utilise le composant `src/pages/Links/Links.tsx` et la liste éditoriale `src/data/links.ts`. La route est déclarée dans `src/data/pages.ts` et associée dans `App.tsx`. Elle conserve `PageShell`, son `Container` et le lien d’évitement, mais `PageShell` omet l’en-tête et le pied de page sur cette route. Son accès reste présent dans le pied de page des autres pages. Le pré-rendu génère `dist/links/index.html` et les métadonnées habituelles. Les boutons sont de simples liens dans le même onglet : aucun service externe n’est contacté par cette page avant un clic vers Instagram, et aucune dépendance n’est ajoutée.

## Page « Qui sommes-nous ? »

`/qui-sommes-nous/` utilise le composant `src/pages/About/About.tsx`. Les informations du bureau directeur (rôles, noms, portraits) sont des données éditoriales centralisées dans `src/data/bureau.ts`, sourcées depuis le document officiel de l’AG du 1er octobre 2026 décrit dans `docs/CLUB.md`. La route est déclarée dans `src/data/pages.ts`, associée dans `App.tsx`, et accessible depuis la navigation principale de `PageShell` sur toutes les pages. Le pré-rendu génère `dist/qui-sommes-nous/index.html`, son URL canonique et son entrée de sitemap, contrôlés par `npm run check`. Aucune donnée personnelle au-delà des noms, rôles et portraits officiels du bureau n’est publiée ; la photo de groupe de l’AG sera ajoutée à cette page une fois fournie et documentée dans `docs/CLUB.md`.

## Pages des coachs

`/coach-sacha-turpin/`, `/coach-tengiz-dalakishvili/` et `/coach-veronique-lhotellier/` utilisent le modèle commun `src/pages/Coach/Coach.tsx`. Les coachs, leurs disciplines et leurs portraits sont des données éditoriales dans `src/data/coaches.ts`. Les routes sont dérivées dans `src/data/pages.ts` et associées dans `App.tsx` ; le pré-rendu génère leurs `index.html`, URLs canoniques et entrées de sitemap. Les pages des disciplines affichent le coach de deux façons selon `courseLead` dans `src/data/coaches.ts` : le prof attitré d’un cours (lutte, cours communs) a une section « Le prof du cours » en tête de page, juste après le héros ; le coach individuel sollicité sur demande (force athlétique) garde la section « Trouver un coach » après ces informations (la musculation n’a pas de coach déclaré). La page « Qui sommes-nous ? » relie aussi les membres du bureau qui sont coachs — un coach sans `clubRole` (Véronique L’hotellier) n’y figure pas, conformément à la demande du président du 16 octobre 2026. Le lien Instagram personnel d’un coach n’est rendu que si son identifiant est renseigné, et son ancienneté dans le bureau (`clubRoleSince`, par exemple « Depuis l’AG du 31 octobre 2025 ») que si `clubRole` et `clubRoleSince` sont renseignés : la page reste valide sans eux.
