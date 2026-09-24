import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App';
import { pages, normalizePath } from '../src/data/pages';
import { site } from '../src/data/site';
import { getSeo, renderHead } from '../src/seo';
import { resolveSiteUrl } from '../src/utils/site-url';

describe('Pages publiques', () => {
  it.each(pages)('rend $path avec un titre et une navigation accessible', (page) => {
    const html = renderToStaticMarkup(<App path={page.path} />);
    expect(html).toContain('<h1');
    expect(html).not.toContain('Page introuvable');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('href="#contenu"');
    expect(getSeo(page.path).canonical).toBe(site.url + page.path);
  });
  it('rend une page inconnue sans indexation ni URL canonique trompeuse', () => {
    expect(renderToStaticMarkup(<App path="/inconnue/" />)).toContain('Page introuvable');
    expect(renderHead('/inconnue/')).toContain('content="noindex"');
    expect(getSeo('/inconnue/').canonical).toBeUndefined();
  });
  it('normalise les chemins', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('/activites')).toBe('/activites/');
  });
});

describe('Configuration du domaine', () => {
  it('accepte un domaine HTTPS et retire le slash final', () => {
    expect(resolveSiteUrl('https://club.example.org/')).toBe('https://club.example.org');
  });
  it.each(['ftp://example.org', 'https://example.org/club/', 'https://example.org/?x=1', 'https://user:secret@example.org', 'invalide'])('refuse une URL incompatible : %s', (url) => {
    expect(() => resolveSiteUrl(url)).toThrow();
  });
  it('échappe les caractères spéciaux dans les métadonnées', async () => {
    const { escapeHtml } = await import('../src/seo');
    expect(escapeHtml('<club "sport" & amis>')).toBe('&lt;club &quot;sport&quot; &amp; amis&gt;');
  });
});
