# Modifier le site

## Une modification habituelle

1. Récupérer la dernière version avec `git pull` sur `main`, après avoir sauvegardé son travail local.
2. Créer une branche : `git switch -c modification-accueil`.
3. Lancer `npm ci`, puis `npm run dev`.
4. Modifier les fichiers utiles et vérifier le résultat sur un écran étroit et un écran large.
5. Exécuter `npm run check`, puis `npm run preview` pour relire le site construit.
6. Enregistrer les changements dans Git, envoyer la branche et ouvrir une pull request sur GitHub.
7. Après relecture et vérifications réussies, fusionner dans `main`. Cette fusion publie automatiquement le site si les paramètres FTP sont correctement configurés.

Une « pull request » est une proposition de modification consultable avant son intégration au site.

## Changer les textes et les images

Les informations connues et manquantes sur le club sont suivies dans `docs/CLUB.md`. Mettre ce document à jour lorsqu’une information est fournie ou validée, puis publier uniquement les informations validées dans `src/data/`.

Les textes de l’accueil se trouvent dans `src/data/site.ts`. Modifier uniquement les valeurs entre guillemets, en conservant la structure et les virgules. L’apostrophe d’un texte entouré d’apostrophes doit être échappée (`l\'équipe`) ou remplacée par une apostrophe typographique (`l’équipe`).

Ajouter les images dans `public/images/`, avec des noms simples, par exemple `entrainement-nantes.webp`. Les utiliser dans les composants avec une adresse `/images/entrainement-nantes.webp`. Prévoir un texte alternatif utile (`alt`) et des dimensions `width` et `height`. Vérifier que le club dispose des autorisations nécessaires avant publication.

Le héros utilise `public/images/visite-salle-can.mp4` avec `public/images/salle-can-poster.jpg` comme image de remplacement. Le carrousel lit la liste `gallery` dans `src/data/site.ts` : ajouter une entrée avec le chemin, les dimensions réelles et un texte alternatif, puis vérifier les boutons au clavier et sur mobile. Il avance automatiquement toutes les cinq secondes et propose une commande pause/reprise. Le défilement automatique est désactivé si le visiteur demande une réduction des animations.

Les liens officiels de téléchargement de MonClub et le code du club se trouvent dans `registration` dans `src/data/site.ts`. Vérifier les fiches officielles avant de remplacer ces URL. L’intégration de la carte Google Maps et ses conséquences pour les visiteurs sont décrites dans `docs/ARCHITECTURE.md`.

## Ajouter une page

Exemple : une page « Activités » accessible à `/activites/`.

1. Créer `src/pages/Activities/Activities.tsx` et `Activities.scss` en prenant `Home` comme exemple.
2. Ajouter une entrée dans `src/data/pages.ts` :

```ts
{ path: '/activites/', label: 'Activités', title: 'Nos activités — Club Athlétique Nantais', description: 'Les activités proposées par le Club Athlétique Nantais.' },
```

3. Importer le composant dans `src/App.tsx` et ajouter son cas dans le choix du contenu. Conserver le `PageShell` commun et la page introuvable pour les autres chemins.
4. Placer les données éditoriales de cette page dans `src/data/`.
5. Ajouter un test portant sur son contenu ou son comportement dans `tests/`.
6. Exécuter `npm run check`. Vérifier que `dist/activites/index.html` existe et ouvrir directement `/activites/` avec le serveur de prévisualisation.

L’entrée dans `pages.ts` alimente automatiquement la navigation, le pré-rendu, les métadonnées et le sitemap. Chaque page a un titre et une description uniques ; le build vérifie leur unicité.

## Conventions simples

- Un composant dans son dossier avec son fichier `.scss` associé.
- Les couleurs et espacements partagés vont dans `src/styles/tokens.scss`.
- Utiliser des classes BEM, par exemple `.home`, `.home__notice`, `.home--compact` ; limiter l’imbrication SCSS.
- Garder des titres structurés, des liens compréhensibles et un focus clavier visible.
- Éviter les animations inutiles et respecter `prefers-reduced-motion`.
- Conserver le code et les tests lisibles ; commenter surtout les décisions qui ne sont pas évidentes.
- Mettre à jour la documentation quand une commande, un dossier ou une procédure change.

## Ce que les tests vérifient

Vitest vérifie le rendu des pages déclarées, la navigation active, le lien d’accès au contenu, la page inconnue, la validation du domaine et l’échappement HTML. Il vérifie aussi le refus des configurations FTP incomplètes ou incompatibles, sans connexion au serveur. Le build vérifie les fichiers réellement générés et leurs ressources.

Ces contrôles ne remplacent pas une relecture sur téléphone et ordinateur, ni un essai au clavier. Ils ne testent pas la connexion réelle à l’hébergeur FTP.

### Tutoriel visuel d’inscription

`RegistrationGuide` commence directement par le téléchargement : logo MonClub, puis liens App Store et Google Play. Les cinq étapes suivantes utilisent des illustrations HTML/CSS simplifiées et des instructions lisibles. Ces aperçus ne sont pas des formulaires : aucune information d’adhérent n’est saisie sur le site. Le bouton « Copier CANNANTES » copie le code public et annonce le résultat ; si le presse-papiers est indisponible, le code reste sélectionnable.

Modifier les instructions dans `src/data/registration.ts`, les liens dans `src/data/site.ts`, et la présentation dans `src/components/RegistrationGuide/`. Vérifier les six étapes sur mobile et ordinateur, les deux liens de téléchargement et la copie du code. Les aperçus décoratifs sont masqués aux lecteurs d’écran, qui disposent de la liste ordonnée et des instructions complètes.

### Favicon

Le favicon reprend la tête d’éléphant du logo, sans texte, sur fond bleu marine. L’adaptation générée à partir du logo officiel est conservée dans `public/images/favicon-source.png`. Les exports sont `public/favicon.ico` (16, 32 et 48 px), `public/favicon-32.png` et `public/apple-touch-icon.png` (180 px). Leurs liens dans `index.html` sont conservés par le pré-rendu sur toutes les pages, y compris la page 404. Pour les remplacer, exporter les mêmes tailles depuis la source choisie, conserver les noms, puis lancer `npm run check`. Vérifier la lisibilité à 16 et 32 px et l’icône mobile ; le navigateur peut garder l’ancien favicon en cache.
