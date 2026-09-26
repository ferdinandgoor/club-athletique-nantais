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
    if (page.path === '/links/') {
      expect(html).not.toContain('<header');
      expect(html).not.toContain('<footer');
    } else {
      expect(html).toContain('aria-label="Navigation principale"');
      expect(html).toContain(page.path === '/' ? 'href="#inscription"' : 'href="/#inscription"');
      expect(html).toContain('<footer');
    }
    expect(html).toContain('href="#contenu"');
    expect(getSeo(page.path).canonical).toBe(site.url + page.path);
  });
  it('rend une page inconnue sans indexation ni URL canonique trompeuse', () => {
    expect(renderToStaticMarkup(<App path="/inconnue/" />)).toContain('Page introuvable');
    expect(renderHead('/inconnue/')).toContain('content="noindex"');
    expect(getSeo('/inconnue/').canonical).toBeUndefined();
  });
  it('oriente vers les disciplines sans attribuer les modalités de force à la lutte', () => {
    const home = renderToStaticMarkup(<App path="/" />);
    const wrestling = renderToStaticMarkup(<App path="/lutte/" />);
    const powerlifting = renderToStaticMarkup(<App path="/force-athletique/" />);
    expect(home).toContain('href="/lutte/"');
    expect(home).toContain('href="/force-athletique/"');
    expect(wrestling).toContain('Lutte baby');
    expect(wrestling).toContain('href="/#inscription"');
    expect(wrestling).not.toContain(site.registration.trialPrice);
    expect(wrestling).not.toContain(site.hours[0].times);
    expect(powerlifting).toContain(site.registration.trialPrice);
    expect(powerlifting).toContain(site.hours[0].times);
  });
  it('regroupe les liens validés et réserve son accès au pied de page', () => {
    const html = renderToStaticMarkup(<App path="/links/" />);
    const content = html.split('<main')[1].split('</main>')[0];
    expect(content).toContain('href="/"');
    expect(content).toContain('href="/#inscription"');
    expect(content).toContain(`href="${site.contact.instagramUrl}"`);
    expect(content).toContain('href="https://www.instagram.com/can_lutte_nantes/"');
    expect(content).toContain('href="https://chat.whatsapp.com/EeUBC9JdJKG1Mya8ZvV2Pv"');
    expect(content.match(/<a /g)).toHaveLength(6);
    expect(content).toContain('href="/">Retour à l’accueil</a>');
    const home = renderToStaticMarkup(<App path="/" />);
    expect(home.split('<footer')[1]).toContain('href="/links/"');
    expect(home.split('</header>')[0]).not.toContain('href="/links/"');
  });
  it('normalise les chemins', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('/activites')).toBe('/activites/');
  });
  it('présente les informations essentielles du club', () => {
    const html = renderToStaticMarkup(<App path="/" />);
    expect(html).toContain('musculation, force athlétique et lutte à Nantes');
    expect(html).toContain('/images/logo-can-officiel.png');
    expect(html).toContain('68 rue de la Durantière');
    expect(html).toContain('À l’ouest de Nantes');
    expect(html).toContain('CANNANTES');
    expect(html).toContain('id1489706209');
    expect(html).toContain('id=eu.teamr.custom');
    expect(html).toContain('Télécharger MonClub dans l’App Store');
    expect(html).toContain('Télécharger MonClub sur Google Play');
    expect(html).toContain('title="Localisation du Club Athlétique Nantais sur Google Maps"');
    expect(html).toContain('Mettre le carrousel en pause');
    expect(html).toContain('cannantais@gmail.com');
    expect(html).toContain('https://www.instagram.com/can_powerlifting/');
    expect(html).toContain('aria-label="Instagram du Club Athlétique Nantais"');
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
