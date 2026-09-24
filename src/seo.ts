import { findPage } from './data/pages';
import { site } from './data/site';

export function getSeo(path: string) {
  const page = findPage(path);
  return {
    title: page?.title ?? `Page introuvable — ${site.name}`,
    description: page?.description ?? 'La page demandée est introuvable.',
    canonical: page ? `${site.url}${page.path}` : undefined,
    noindex: !page,
  };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export function renderHead(path: string) {
  const seo = getSeo(path);
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}">`,
    seo.canonical ? `<link rel="canonical" href="${escapeHtml(seo.canonical)}">` : '',
    seo.noindex ? '<meta name="robots" content="noindex">' : '',
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="fr_FR">',
    `<meta property="og:title" content="${escapeHtml(seo.title)}">`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}">`,
    seo.canonical ? `<meta property="og:url" content="${escapeHtml(seo.canonical)}">` : '',
  ].join('\n    ');
}
