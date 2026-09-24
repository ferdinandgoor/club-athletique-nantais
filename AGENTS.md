# Consignes pour les contributions automatisées

- Documenter les commandes et procédures en français simple dans `docs/` et garder le README à jour.
- Conserver React, TypeScript, Vite et SCSS, sans framework CSS.
- Placer les données éditoriales dans `src/data/`, les composants réutilisables dans des dossiers avec SCSS associé.
- Chaque page utilise `PageShell` et `Container`. Déclarer les routes publiques et leurs métadonnées dans `src/data/pages.ts`, puis leur composant dans `src/App.tsx`.
- Réutiliser les variables de `src/styles/tokens.scss`, les classes BEM et une imbrication SCSS peu profonde.
- Préserver navigation clavier, focus visible, titres structurés, textes alternatifs et réduction des animations.
- Exécuter `npm run check` avant livraison. Après une modification visuelle, vérifier une largeur mobile et une largeur ordinateur.
- Ne jamais versionner de secrets ni modifier manuellement les fichiers générés dans `dist/`.
- Ne pas inventer d’informations sur le club : conserver des textes provisoires explicites lorsque les données manquent.
