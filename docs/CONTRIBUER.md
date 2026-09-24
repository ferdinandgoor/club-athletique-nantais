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

L’entrée dans `pages.ts` alimente automatiquement le pré-rendu, les métadonnées et le sitemap. Les liens de navigation sont définis séparément dans `PageShell`. Chaque page a un titre et une description uniques ; le build vérifie leur unicité.

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

### Lecture vidéo sur téléphone

Le héros demande une lecture silencieuse et intégrée (`muted`, `playsInline`) après avoir vérifié la préférence de réduction des animations. Cette préférence désactive le lancement automatique mais autorise une lecture volontaire. Le bouton « Lire la vidéo » reste disponible si le navigateur refuse l’autoplay ; il devient « Pause vidéo » pendant la lecture. Les refus automatiques ne doivent jamais supprimer ce bouton. Un échec après clic affiche un message. Vérifier la progression de la vidéo en vue mobile, la pause/reprise, puis le lancement manuel avec `prefers-reduced-motion` activé. Le fichier MP4 est H.264/yuv420p sans audio, avec ses métadonnées en tête pour le chargement progressif.

Les restrictions du téléphone peuvent encore empêcher le lancement automatique : voir les [règles vidéo de WebKit](https://webkit.org/blog/6784/new-video-policies-for-ios/). Un test dans un navigateur simulé ne remplace pas un essai sur iPhone physique et sur l’hébergement réel.

Le fond vidéo du héros reçoit un flou de `4px` dans `.home__hero-video` (`Home.scss`) pour adoucir sa définition actuelle. Un agrandissement de `1.03` évite les bordures du flou. Le logo, le texte et les commandes restent nets ; aucun voile sombre supplémentaire n’est ajouté. Retirer `filter` et `transform` de cette règle pour revenir au rendu original lors du remplacement de la vidéo.

### Accueil et pages de disciplines

Modifier les résumés et les détails de la musculation, de la force athlétique et de la lutte dans `src/data/disciplines.ts`. L’accueil affiche trois grandes entrées dans cet ordre : Musculation, Force athlétique, Lutte ; le modèle `src/pages/Discipline/Discipline.tsx` présente les informations de chaque activité. Les horaires et l’essai à 10 € concernent uniquement la force athlétique. Pour la musculation et la lutte, remplacer le bloc de prise de contact par des informations pratiques seulement après leur confirmation dans `docs/CLUB.md`.

Le tutoriel `src/data/registration.ts` est commun aux disciplines. Ne pas le recentrer exclusivement sur la force athlétique. Vérifier le parcours accueil → discipline → guide d’inscription, les liens du menu mobile, les titres uniques, le pré-rendu et le sitemap avec `npm run check`. Pour ajouter une discipline, compléter ses contenus validés et adapter les informations pratiques du modèle avant de déclarer sa route.

Le héros d’accueil utilise une hauteur fixe de `100dvh` (avec repli `100vh`) pour suivre exactement la hauteur visible, y compris quand les barres du navigateur mobile changent de taille. Le logo se redimensionne dans l’espace disponible ; sur une fenêtre exceptionnellement basse ou avec un texte agrandi, le contenu central reste défilable pour conserver l’accès aux liens. Vérifier aussi une orientation paysage et les écrans mobiles courts.

### Animations

Les blocs marqués `data-reveal` apparaissent une seule fois à l’entrée dans le viewport, avec un fondu et un déplacement de 18 px pendant 650 ms. Le hook `src/hooks/useScrollReveal.ts`, appelé par `PageShell`, utilise IntersectionObserver et l’API native d’animation : aucune dépendance ni donnée transmise. Éviter d’imbriquer deux blocs animés. Le contenu reste visible sans JavaScript ; une prise de focus clavier arrête les apparitions pour faciliter la navigation.

Les SCSS de Home, RegistrationGuide et PageShell gèrent l’arrivée du logo, les survols des cartes et des écrans du tutoriel, et l’ouverture du menu mobile. Les effets sont désactivés avec `prefers-reduced-motion`, y compris lors d’un changement de préférence en cours de visite. Pour supprimer les apparitions, retirer l’appel à `useScrollReveal` dans PageShell ; les attributs sont alors sans effet. Vérifier le défilement, le clavier et le mode de réduction des animations sur mobile et ordinateur.

### Page de liens

La page `/links/` regroupe les liens publics sous forme de grands boutons. Elle est accessible par « Links » dans le pied de page des autres pages, sans entrée supplémentaire dans le menu principal. La page Links elle-même n’affiche ni en-tête ni pied de page ; cette exception est gérée dans `PageShell`. Le bouton « Le site du club » et le lien discret « Retour à l’accueil » sous les boutons permettent de revenir à l’accueil. Le libellé de ce dernier se modifie dans `backLabel` de `src/data/links.ts`. Modifier les libellés, descriptions et destinations dans `src/data/links.ts` ; le lien Instagram reprend l’adresse de `src/data/site.ts` et le bouton du site revient à `/` sur le domaine courant.

Pour ajouter un lien, faire confirmer sa destination publique, la noter dans `docs/CLUB.md`, puis ajouter une entrée à `items`. Ne pas afficher de bouton en attente. La présentation se trouve dans `src/pages/Links/`. Vérifier chaque destination, le focus clavier et les vues mobile et ordinateur, puis lancer `npm run check` : ce contrôle vérifie aussi `dist/links/index.html`, son URL canonique et le sitemap. Pour retirer un lien, supprimer son entrée de la liste.
