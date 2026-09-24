# Reprendre et entretenir le site

## Passation à une nouvelle personne

Transmettre ces éléments par les canaux adaptés ; les mots de passe restent dans un gestionnaire de mots de passe, jamais dans Git :

- L’accès au dépôt GitHub et le nom d’une personne pouvant gérer les droits.
- L’accès à l’hébergement, au FTP et au gestionnaire du nom de domaine.
- Le domaine public, le dossier FTP utilisé, le protocole et le port.
- Les informations de renouvellement du domaine et de l’hébergement, ainsi que leur responsable au club.
- L’emplacement des sauvegardes et la date de la dernière publication réussie.
- La personne qui valide les textes, photos et informations du club.

Au moment de la passation, compléter ces informations dans l’outil interne du club : elles ne sont pas encore connues dans ce dépôt. Faire réaliser à la personne une petite modification locale, lancer `npm run check`, puis lui montrer une publication et la procédure de retour arrière. Retirer les accès devenus inutiles et renouveler les secrets si nécessaire.

## Entretien régulier

- Vérifier que les horaires, contacts et informations du club sont à jour.
- Contrôler les échéances du domaine, de l’hébergement et du certificat HTTPS.
- Conserver une sauvegarde du site et des éventuels fichiers hébergés hors dépôt.
- Examiner les mises à jour et alertes de dépendances ; les appliquer sur une branche et exécuter `npm run check` avant fusion.
- Vérifier les versions des actions GitHub lors de la maintenance.
- Tester volontairement une nouvelle version d’Ubuntu avant de modifier la version figée dans `.github/workflows/site.yml`.

`package.json` fixe les versions directes ; `package-lock.json` fixe l’ensemble des dépendances. Utiliser `npm ci` au quotidien. Pour une mise à jour volontaire, utiliser `npm install --save-exact paquet@version` (ajouter `--save-dev` pour un outil de développement), puis enregistrer les deux fichiers. Éviter `npm audit fix --force` sans examen des changements.

Une évolution de Node.js doit être reportée dans `.nvmrc`, `package.json` et le README. GitHub utilise automatiquement `.nvmrc`.

## Dépannage

| Problème | Vérification à faire |
| --- | --- |
| `npm ci` échoue | Vérifier `node --version`, l’accès au registre npm et la cohérence entre `package.json` et `package-lock.json` |
| Le port local est occupé | Utiliser l’autre adresse proposée par Vite ou arrêter l’ancien serveur |
| Le lint échoue | Lire le fichier et la ligne indiqués ; les avertissements bloquent également la vérification |
| Les tests échouent | Lancer `npm run test:watch` et corriger le comportement concerné |
| Le build échoue | Lire la première erreur ; vérifier les types, les routes, les titres et descriptions uniques |
| La publication est « skipped » | Vérifier la branche `main` et la variable de dépôt `FTP_DEPLOY_ENABLED=true` |
| Le workflow attend une validation | Consulter les règles de protection de l’environnement GitHub `production` |
| Connexion FTP refusée | Vérifier les secrets, le protocole, le port et les restrictions réseau de l’hébergeur |
| Erreur de certificat FTPS | Faire corriger le certificat ou le nom du serveur ; ne pas désactiver sa vérification |
| Mauvais domaine dans le sitemap | Corriger `SITE_URL` dans GitHub ou `VITE_SITE_URL` en local, puis refaire un build |
| Page blanche ou ressources absentes | Vérifier que le contenu de `dist/` est à la racine web attendue, avec `assets/` |
| Erreur 500 après transfert | Faire vérifier par l’hébergeur la compatibilité des directives `.htaccess` |
| Une adresse inconnue renvoie l’accueil | Faire configurer une vraie réponse 404 ; voir le guide de déploiement |

## Limites du socle

Il n’y a pas encore d’espace d’administration, de formulaire, de comptes adhérents, de paiement ni de suivi d’audience. Le contenu se modifie dans le dépôt. Les accès FTP et le domaine réels doivent encore être renseignés ; leur fonctionnement dépendra de l’hébergement choisi.

La documentation décrit une procédure de publication préparée, pas la confirmation d’une mise en ligne déjà effectuée.
