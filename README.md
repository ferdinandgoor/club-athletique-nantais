# Club Athlétique Nantais

Le site internet du club, conçu pour pouvoir être repris facilement par un autre bénévole ou développeur.

Le socle reprend l’architecture de `the-dislockers` : **React, TypeScript, Vite et SCSS**, avec des pages HTML générées lors du build et publiées sur un hébergement FTP. Aucun serveur Node.js ni base de données n’est nécessaire chez l’hébergeur.

À ce stade, le site contient une **page d’accueil provisoire** et une page d’erreur 404. Les activités, horaires, contacts, visuels et mentions légales restent à renseigner avec les informations validées du club. La charte graphique est provisoire.

## Démarrer en local

Installer [Node.js](https://nodejs.org/) **24.13.0** (version indiquée dans `.nvmrc`) et Git, puis ouvrir un terminal :

```sh
git clone git@github.com:ferdinandgoor/club-athletique-nantais.git
cd club-athletique-nantais
npm ci
npm run dev
```

Ouvrir l’adresse affichée dans le terminal, généralement `http://localhost:5173`. Les modifications apparaissent automatiquement. `Ctrl+C` arrête le serveur. Avec nvm, `nvm install` puis `nvm use` sélectionnent la bonne version de Node.js.

Aucun fichier de configuration n’est nécessaire pour démarrer. Pour préparer une publication, copier `.env.example` vers `.env.local` et remplacer le domaine fictif par le vrai domaine du club. Ne pas ajouter d’identifiants FTP dans ce fichier.

## Commandes utiles

| Commande | À quoi elle sert |
| --- | --- |
| `npm ci` | Installer les versions exactes du fichier `package-lock.json` |
| `npm run dev` | Travailler sur le site avec mise à jour automatique |
| `npm run typecheck` | Vérifier les types TypeScript |
| `npm run lint` | Détecter les erreurs et avertissements JavaScript/TypeScript |
| `npm test` | Exécuter les tests une fois |
| `npm run test:watch` | Relancer les tests à chaque modification |
| `npm run build` | Vérifier les types, générer et contrôler le dossier `dist/` |
| `npm run preview` | Consulter le dernier build, généralement sur `http://localhost:4173` |
| `npm run check` | Lancer lint, tests et build : à faire avant de proposer une modification |

## Où trouver les informations ?

- [Comprendre la structure du site](docs/ARCHITECTURE.md)
- [Modifier le contenu et ajouter une page](docs/CONTRIBUER.md)
- [Configurer le déploiement FTP et publier](docs/DEPLOIEMENT.md)
- [Transmettre le projet, entretenir le site et résoudre les problèmes](docs/MAINTENANCE.md)

Le déploiement est préparé dans GitHub Actions. Il reste **désactivé tant que `FTP_DEPLOY_ENABLED` ne vaut pas `true`**. Le domaine, le dossier de destination et les accès de l’hébergeur doivent d’abord être configurés selon le guide. Aucun accès du projet de référence n’a été repris.
