import { resolveSiteUrl } from '../utils/site-url';

// Les informations du club se modifient ici, sans toucher aux composants.
export const site = {
  name: 'Club Athlétique Nantais',
  url: resolveSiteUrl(import.meta.env.VITE_SITE_URL),
  description: 'Le site du Club Athlétique Nantais. Retrouvez prochainement les informations et les actualités du club.',
  home: {
    eyebrow: 'Sport à Nantes',
    title: 'Club Athlétique Nantais',
    introduction: 'Bienvenue sur le site du club.',
    notice: 'Notre site se prépare. Vous retrouverez bientôt ici les activités, les informations pratiques et les actualités du club.',
  },
};
