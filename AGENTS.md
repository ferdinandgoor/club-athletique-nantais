# Consignes pour les agents

Ce fichier s’applique à tout le dépôt. Il doit être lu avant toute modification. L’objectif est de laisser un site compréhensible et exploitable par une personne qui ne connaît ni le code ni l’historique du projet.

## Règle principale : documenter en même temps que le code

Une tâche n’est pas terminée si elle modifie le fonctionnement, le contenu, l’architecture, les commandes, la configuration ou le déploiement sans mettre à jour la documentation correspondante.

Écrire la documentation en français simple. Expliquer le but, le fichier concerné, la procédure normale, la vérification et, quand c’est utile, le retour arrière. Ne pas recopier le code sans expliquer ce que la personne doit en faire.

Avant livraison, contrôler les documents suivants :

| Sujet modifié | Documentation à relire ou mettre à jour |
| --- | --- |
| Informations publiques ou administratives du club | `docs/CLUB.md`, puis `src/data/` si l’information est publiée |
| Structure, dépendances, rendu ou flux de données | `docs/ARCHITECTURE.md` |
| Commandes d’installation ou d’utilisation | `README.md` |
| Ajout de page, contenu, composant ou convention | `docs/CONTRIBUER.md` |
| GitHub Actions, FTP, domaine, variables ou secrets | `docs/DEPLOIEMENT.md` |
| Passation, versions, sauvegarde ou dépannage | `docs/MAINTENANCE.md` |
| Règle durable destinée aux futurs agents | `AGENTS.md` |

Si un nouveau document est créé, l’ajouter à la liste « Où trouver les informations ? » du `README.md`.

## Informations sur le club

`docs/CLUB.md` est l’inventaire de référence des informations connues, manquantes et à confirmer. Le tenir à jour dès que le propriétaire du projet fournit une information sur le club, même si cette information n’apparaît pas encore sur le site.

- Indiquer la source et la date de vérification quand elles sont connues.
- Distinguer clairement les données publiques, internes et sensibles.
- Ne jamais inventer un horaire, une adresse, une discipline, un tarif, un contact, un statut juridique, un partenaire ou une mention légale.
- Utiliser `À fournir` ou `À confirmer` tant qu’une information fiable manque.
- Ne publier dans `src/data/` que les informations validées pour le public.
- Ne jamais placer dans le dépôt des données personnelles non destinées au public, des listes d’adhérents, des informations médicales, des mots de passe ou des clés.
- Pour une photo, documenter si possible le crédit, l’autorisation d’utilisation, le texte alternatif et la date ou saison concernée.
- Quand une information devient obsolète, mettre à jour le site et `docs/CLUB.md` dans le même changement.

## Architecture et stack à préserver

Le site utilise React, TypeScript, Vite et SCSS. Vitest assure les tests, ESLint le lint, et GitHub Actions la vérification et le déploiement FTP/FTPS. Le site est pré-rendu en HTML et ne nécessite pas de serveur Node.js en production.

Les détails et le chemin du build sont décrits dans `docs/ARCHITECTURE.md`. Toute modification de cette architecture doit y être expliquée avec sa raison et ses conséquences pour la maintenance et l’hébergement.

Respecter ces règles :

- Garder les données éditoriales dans `src/data/` et l’interface dans les composants et pages.
- Placer chaque composant réutilisable dans son dossier avec son fichier SCSS associé.
- Faire utiliser `PageShell` et `Container` à toutes les pages publiques.
- Déclarer chaque route publique et ses métadonnées uniques dans `src/data/pages.ts`, puis associer son composant dans `src/App.tsx`.
- Vérifier qu’une nouvelle route produit bien son fichier `dist/**/index.html`, son URL canonique et son entrée de sitemap.
- Réutiliser les variables de `src/styles/tokens.scss` avant d’ajouter une valeur visuelle répétée.
- Utiliser des classes BEM, une seule classe racine par composant et une imbrication SCSS peu profonde.
- Ne pas ajouter de framework CSS, de routeur, de CMS ou de dépendance sans bénéfice clair pour ce site et sans documenter le choix.
- Ne pas modifier à la main `dist/`, `.ssr/`, `node_modules/`, `sitemap.xml` ou `robots.txt` générés.
- Fixer précisément les dépendances et enregistrer ensemble `package.json` et `package-lock.json`.

## Qualité, accessibilité et référencement

- Conserver une navigation clavier complète, un focus visible, un lien d’évitement, des titres hiérarchisés et des liens compréhensibles hors contexte.
- Donner aux images utiles un texte alternatif pertinent et leurs dimensions. Utiliser un `alt` vide pour une image uniquement décorative.
- Maintenir des zones interactives d’au moins 44 px lorsque c’est possible et un contraste suffisant.
- Respecter `prefers-reduced-motion` et éviter les animations indispensables à la compréhension.
- Vérifier les mises en page à une largeur mobile et une largeur ordinateur après toute modification visuelle.
- Fournir à chaque page un titre, une description et une URL canonique propres.
- Ne pas ajouter de mesure d’audience, cookie, formulaire ou service externe sans documenter les données transmises et les conséquences légales.
- Écrire des tests qui vérifient un comportement utile. Ne pas dupliquer simplement l’implémentation dans les assertions.

## Travail local et vérifications

Utiliser la version de Node.js indiquée par `.nvmrc`. Installer les dépendances avec `npm ci` pour reproduire le fichier de verrouillage.

Commandes de référence :

```sh
npm run dev
npm run check
npm run preview
```

`npm run check` lance le lint, les tests, la vérification TypeScript, le build, le pré-rendu et le contrôle des fichiers générés. Il est obligatoire avant toute livraison ou tout push demandé par le propriétaire.

Après une modification du workflow, contrôler aussi :

- l’absence d’ancien numéro de version d’action resté dans un autre job ;
- la cohérence entre les noms utilisés dans le YAML, `scripts/validate-deploy.mjs` et `docs/DEPLOIEMENT.md` ;
- le maintien de `ubuntu-24.04` tant qu’une migration n’a pas été testée volontairement ;
- que le job de déploiement dépend toujours du job de vérification.

Ne jamais prétendre avoir testé un transfert FTP, une règle Apache ou un secret GitHub si seule la configuration locale a été testée. Signaler clairement ce qui nécessite encore une vérification sur l’hébergement réel.

## Git, commits et push

Avant un commit :

1. Lire `git status` et préserver les changements qui ne concernent pas la tâche.
2. Exécuter `npm run check` et `git diff --check`.
3. Relire le diff, y compris la documentation et le workflow.
4. Utiliser un message de commit court en français décrivant le résultat.

Ne pas réécrire l’historique, forcer un push, supprimer une branche distante ou annuler les changements d’un tiers sans demande explicite. Ne pousser que lorsqu’un push est demandé ou fait clairement partie de la tâche confiée. Après le push, vérifier que la branche locale et sa branche distante sont synchronisées.

La branche de production est `main`. Un push sur `main` lance le workflow `.github/workflows/site.yml` et publie le site si le build et la validation des paramètres réussissent ; relire `docs/DEPLOIEMENT.md` avant toute modification de ce mécanisme.

## Déploiement et secrets GitHub

Le workflow vérifie toujours le site. Il ne déploie sur FTP que depuis `main`, hors pull request, après la réussite du job de vérification. Si la configuration manque, le job doit échouer avec un message précis avant le transfert, pas être silencieusement ignoré.

Les paramètres publics de publication se trouvent dans GitHub :

**Dépôt → Settings → Secrets and variables → Actions → Variables**

- `SITE_URL`
- `FTP_SERVER_DIR`
- `FTP_PROTOCOL`
- `FTP_PORT`

Les paramètres sensibles se trouvent dans GitHub :

**Dépôt → Settings → Secrets and variables → Actions → Secrets → Repository secrets**

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

L’environnement GitHub `production` est utilisé pour identifier et éventuellement protéger le job de publication. Ne jamais lire, afficher, copier dans un journal, envoyer dans une conversation ou versionner la valeur d’un secret. Les agents documentent uniquement le nom, le rôle et l’emplacement du secret.

Les fichiers `.env` et `.env.*` sont ignorés, sauf `.env.example`. `VITE_SITE_URL` est une valeur publique utilisée au build. Toute variable préfixée `VITE_` peut se retrouver dans le navigateur : n’y mettre aucun secret.

Pour modifier le déploiement :

1. Lire `.github/workflows/site.yml`, `scripts/validate-deploy.mjs` et `docs/DEPLOIEMENT.md`.
2. Conserver la validation des paramètres avant le transfert et l’envoi exclusif de `dist/`.
3. Ne jamais activer un nettoyage intégral du serveur sans sauvegarde, cible confirmée et demande explicite.
4. Garder le déploiement limité à `main`, hors pull request, et dépendant du job de vérification.
5. Documenter tout nouveau paramètre, son emplacement GitHub et sa sensibilité.
6. Prévoir et documenter le retour arrière.

## Fin de tâche et passation

Le compte rendu final doit indiquer :

- ce qui a changé pour le site ou sa maintenance ;
- les documents mis à jour ;
- les vérifications réellement exécutées et leur résultat ;
- les limites ou informations encore à fournir ;
- le commit et le push, seulement s’ils ont réellement été effectués.

Laisser des instructions actionnables. Une personne reprenant le projet doit pouvoir trouver le contenu du club dans `docs/CLUB.md`, comprendre la technique dans `docs/ARCHITECTURE.md`, modifier le site avec `docs/CONTRIBUER.md`, publier avec `docs/DEPLOIEMENT.md` et assurer la suite avec `docs/MAINTENANCE.md`.
