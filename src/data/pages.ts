import { site } from './site';

// Source unique des routes publiques, de la navigation et des métadonnées.
export const pages = [
  { path: '/', label: 'Accueil', title: `${site.name} — Accueil`, description: site.description },
] as const;

export function normalizePath(path: string): string {
  return path === '/' ? path : `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

export function findPage(path: string) {
  return pages.find((page) => page.path === normalizePath(path));
}
