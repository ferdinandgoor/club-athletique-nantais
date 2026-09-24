# Publier le site par FTP

## Principe

GitHub vérifie le projet lors des pull requests et des envois sur `main`. Après un build réussi sur `main`, il publie les fichiers si `FTP_DEPLOY_ENABLED` vaut exactement `true`. Un lancement manuel est aussi possible dans **Actions → Vérifier et publier le site → Run workflow**, sur `main`.

Chaque exécution conserve le site construit pendant 30 jours sous le nom `site-<identifiant du commit>`. La publication télécharge cet artefact : les fichiers envoyés sont ceux qui ont passé les contrôles.

## Première configuration

Demander à l’hébergeur le nom du serveur FTP, le protocole, le port, l’identifiant, le mot de passe et le dossier correspondant au domaine. Le site doit être servi à la racine du domaine, avec HTTPS configuré par l’hébergeur.

Dans le dépôt GitHub, ouvrir **Settings → Secrets and variables → Actions**.

### Variables du dépôt (onglet Variables)

| Nom | Valeur attendue |
| --- | --- |
| `SITE_URL` | Véritable URL HTTPS publique, sans chemin, par exemple `https://votre-domaine.fr` |
| `FTP_SERVER_DIR` | Dossier dédié au site, avec `/` final ; souvent `www/` ou `public_html/`, à confirmer auprès de l’hébergeur |
| `FTP_PROTOCOL` | `ftps` par défaut ; `ftp` ou `ftps-legacy` seulement si requis par l’hébergeur |
| `FTP_PORT` | `21` par défaut ; adapter à l’hébergement |
| `FTP_DEPLOY_ENABLED` | Laisser absent pendant la préparation, puis mettre `true` pour activer la publication |

Créer ces variables **au niveau du dépôt**, notamment `SITE_URL` et `FTP_DEPLOY_ENABLED` : elles sont utilisées avant l’entrée dans l’environnement de production. Ne pas créer de variables de même nom avec des valeurs différentes dans l’environnement.

### Environnement et secrets

Dans **Settings → Environments**, créer un environnement nommé `production`. Y ajouter les secrets suivants (les secrets du dépôt sont également acceptés) :

| Secret | Contenu |
| --- | --- |
| `FTP_SERVER` | Nom d’hôte, sans `ftp://` ni chemin |
| `FTP_USERNAME` | Identifiant fourni par l’hébergeur |
| `FTP_PASSWORD` | Mot de passe FTP |

Selon les possibilités du compte GitHub, limiter l’environnement à la branche `main`. Aucune validation manuelle n’est imposée par le workflow ; l’équipe peut en configurer une dans l’environnement si elle le souhaite.

FTPS chiffre la connexion. FTP simple ne la chiffre pas. **SFTP est un autre protocole, non pris en charge par cette action** : si l’hébergeur propose uniquement SFTP, il faudra adapter le workflow.

## Première publication, étape par étape

1. Faire valider le contenu destiné au public : le socle actuel contient une page d’attente.
2. Sauvegarder le site existant depuis l’hébergement, s’il y en a un.
3. Confirmer que `FTP_SERVER_DIR` désigne le bon dossier, réservé à ce site. Les paramètres du projet `the-dislockers` n’ont pas été copiés.
4. Configurer le domaine, les variables et les secrets ci-dessus.
5. Exécuter une première vérification GitHub avec le déploiement encore désactivé, puis consulter l’artefact généré.
6. Mettre `FTP_DEPLOY_ENABLED=true` et lancer le workflow sur `main`.
7. Vérifier le résultat dans Actions puis sur le domaine public : accueil, navigation, images, `sitemap.xml`, `robots.txt` et une URL inexistante.

Le workflow refuse les domaines locaux ou d’exemple, les paramètres manquants, les chemins FTP racine ou contenant `..`. Il utilise la synchronisation standard et ne demande pas de nettoyage intégral du serveur. L’action peut supprimer les anciens fichiers qu’elle suivait : conserver son fichier d’état `.ftp-deploy-sync-state.json` sur le serveur et utiliser un dossier dédié. Les fichiers antérieurs non suivis peuvent rester présents et doivent être examinés lors d’une migration.

## Pages et erreurs 404

Sur Apache, `public/.htaccess` est copié dans `dist/` et envoyé avec le reste. Il sélectionne `index.html` et la page d’erreur `/404.html`. L’hébergeur doit autoriser ces directives.

Sur un autre serveur, faire configurer l’équivalent par l’hébergeur : servir les `index.html` dans les dossiers et renvoyer `/404.html` avec le statut HTTP **404** pour une page inexistante. Ne pas rediriger toutes les erreurs vers l’accueil. Le serveur Vite de prévisualisation n’est pas une vérification des règles Apache.

## Publication manuelle de secours

1. Récupérer le commit voulu et exécuter `npm ci`.
2. Définir le vrai domaine dans `.env.local` avec `VITE_SITE_URL=https://votre-domaine.fr`.
3. Exécuter `npm run check` et `npm run preview`.
4. Dans un client FTP/FTPS, ouvrir le dossier distant confirmé.
5. Envoyer **le contenu** de `dist/`, y compris `.htaccess` (fichier caché), et non le dossier `dist` lui-même.
6. Ne jamais envoyer `.env.local`, `src/`, `node_modules/`, `.git/` ni les secrets.

Une copie manuelle ne supprime pas automatiquement les anciennes pages. Vérifier les fichiers obsolètes et le résultat public ; noter cette intervention pour la personne qui fera le prochain déploiement automatique.

## Annuler une modification publiée

La méthode habituelle est d’annuler le commit fautif avec `git revert <identifiant>`, de vérifier la correction puis de l’intégrer dans `main`. La chaîne publie alors un nouveau build de la version corrigée.

En urgence, récupérer l’artefact d’une exécution réussie dans Actions, le décompresser et envoyer son contenu par FTP. Si l’artefact a expiré, reconstruire l’ancien commit avec le même domaine. Garder le dépôt cohérent avec la version restaurée pour éviter que le prochain envoi réintroduise le problème.

Un transfert FTP n’est pas atomique : le serveur peut présenter brièvement un mélange d’anciens et nouveaux fichiers. Le workflow sérialise les publications sur `main` et ne les interrompt pas automatiquement.

## Références

- [Publication statique avec Vite](https://vite.dev/guide/static-deploy.html)
- [Paramètres et fonctionnement de FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)
