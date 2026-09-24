import { site } from './site';
import { disciplines } from './disciplines';

// Source unique des routes publiques, de la navigation et des métadonnées.
export const pages = [
  { path: '/', label: 'Accueil', title: `Musculation, force athlétique et lutte à Nantes — ${site.name}`, description: site.description },
  { path: '/links/', label: 'Links', title: `Nos liens — ${site.name}`, description: 'Retrouve le site du Club Athlétique Nantais et son compte Instagram : tous les liens du club au même endroit.' },
  ...disciplines.map((discipline) => ({ path: discipline.path, label: discipline.title, title: `${discipline.title} à Nantes — ${site.name}`, description: discipline.summary })),
] as const;

export function normalizePath(path: string): string {
  return path === '/' ? path : `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

export function findPage(path: string) {
  return pages.find((page) => page.path === normalizePath(path));
}
