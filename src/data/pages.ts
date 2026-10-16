import { site } from './site';
import { disciplines } from './disciplines';
import { coaches } from './coaches';

// Source unique des routes publiques, de la navigation et des métadonnées.
export const pages = [
  { path: '/', label: 'Accueil', title: `Powerlifting, musculation et lutte à Nantes — ${site.name}`, description: site.description },
  { path: '/qui-sommes-nous/', label: 'Qui sommes-nous', title: `Qui sommes-nous ? — ${site.name}`, description: 'Découvre le bureau du Club Athlétique Nantais, élu à l’unanimité lors de l’Assemblée Générale du 1er octobre 2026.' },
  { path: '/tarifs/', label: 'Tarifs', title: `Tarifs et formules — ${site.name}`, description: 'Compare les formules du Club Athlétique Nantais pour la saison 2026–2027 : tarif de chaque adhésion, licence fédérale et accès inclus aux entraînements, à la salle et aux cours.' },
  { path: '/links/', label: 'Links', title: `Nos liens — ${site.name}`, description: 'Retrouve le site du Club Athlétique Nantais et son compte Instagram : tous les liens du club au même endroit.' },
  ...disciplines.map((discipline) => ({ path: discipline.path, label: discipline.title, title: `${discipline.metaTitle} — ${site.name}`, description: discipline.summary })),
  ...coaches.map((coach) => ({ path: coach.path, label: coach.name, title: `${coach.name}, ${coach.coachRole.toLowerCase()} à Nantes — ${site.name}`, description: coach.introduction })),
] as const;

export function normalizePath(path: string): string {
  return path === '/' ? path : `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

export function findPage(path: string) {
  return pages.find((page) => page.path === normalizePath(path));
}
