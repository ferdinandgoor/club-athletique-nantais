import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App';
import { pages, normalizePath } from '../src/data/pages';
import { site } from '../src/data/site';
import { bureau } from '../src/data/bureau';
import { coaches } from '../src/data/coaches';
import { pricing } from '../src/data/pricing';
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
    expect(home.indexOf('href="/force-athletique/"')).toBeLessThan(home.indexOf('href="/lutte/"'));
    expect(home.indexOf('href="/lutte/"')).toBeLessThan(home.indexOf('href="/musculation/"'));
    expect(home).toContain('Powerlifting · Lutte · Musculation');
    expect(home).toContain('<h3>Haltérophilie</h3>');
    expect(home).not.toContain('Pilates');
    expect(home).toContain('<h3>Cours collectifs</h3>');
    expect(home).toContain('Mouvements olympiques');
    expect(home).toContain('href="/halterophilie/"');
    expect(home).not.toContain('href="/pilates/"');
    expect(home).toContain('href="/cours-collectifs/"');
    const halterophilie = renderToStaticMarkup(<App path="/halterophilie/" />);
    expect(halterophilie).toContain('Arraché');
    expect(halterophilie).toContain('Haltérophilie compétition');
    expect(halterophilie).toContain('licence compétition');
    expect(halterophilie).toContain('Horaires de la salle');
    const pilates = renderToStaticMarkup(<App path="/pilates/" />);
    expect(pilates).toContain('Page introuvable');
    const coursCommuns = renderToStaticMarkup(<App path="/cours-collectifs/" />);
    expect(coursCommuns).toContain('Cours collectifs');
    expect(coursCommuns).toContain('170 €');
    expect(coursCommuns).toContain('Jeudi');
    expect(coursCommuns).toContain('18 h 30–19 h 15');
    expect(coursCommuns).toContain('19 h 15–20 h 00');
    expect(coursCommuns).toContain('accès salle de muscu inclus');
    expect(coursCommuns).toContain('Horaires de la salle');
    expect(coursCommuns).toContain(site.hours[0].times);
    expect(coursCommuns).toContain('Accès libre à la salle de musculation sur ces créneaux d’ouverture');
    expect(coursCommuns).toContain('Le prof du cours');
    expect(coursCommuns.indexOf('Le prof du cours')).toBeLessThan(coursCommuns.indexOf('Deux cours, le jeudi soir'));
    expect(coursCommuns).toContain('Véronique L’hotellier');
    expect(coursCommuns).toContain('href="/coach-veronique-lhotellier/"');
    expect(wrestling).toContain('Lutte baby');
    expect(wrestling).toContain('href="/#inscription"');
    expect(wrestling).toContain('discipline__hero--lutte');
    expect(wrestling).not.toContain(site.registration.trialPrice);
    expect(wrestling).not.toContain(site.hours[0].times);
    expect(powerlifting).toContain(site.registration.trialPrice);
    expect(powerlifting).toContain(site.hours[0].times);
    expect(powerlifting).toContain('discipline__hero--force-athletique');
    const disciplineHeader = powerlifting.split('</header>')[0];
    const homeHeader = home.split('</header>')[0];
    for (const id of ['localisation', 'activites', 'inscription', 'infos', 'galerie']) {
      expect(disciplineHeader).toContain(`href="/#${id}"`);
    }
    const disciplineNav = disciplineHeader.split('<nav')[1].split('</nav>')[0];
    const homeNav = homeHeader.split('<nav')[1].split('</nav>')[0];
    expect(disciplineNav.replaceAll('/#', '#')).toEqual(homeNav.replaceAll('/#', '#'));
    expect(disciplineHeader).not.toContain('href="/lutte/"');
  });
  it('présente le bureau élu lors de l’AG 2026 avec un portrait par membre', () => {
    const html = renderToStaticMarkup(<App path="/qui-sommes-nous/" />);
    expect(html).toContain('Le bureau directeur');
    expect(html).toContain('élu à l’unanimité');
    for (const member of bureau.members) {
      expect(html).toContain(`alt="${member.photo.alt}"`);
      expect(html).toContain(`src="${member.photo.src}"`);
      expect(html).toContain(member.role);
      expect(html).toContain(member.name);
    }
    const order = ['Sacha Turpin', 'Adrien Bolle', 'Maryne Melart', 'Tengiz Dalakishvili', 'Emma Houédé', 'Marie Boennec'];
    const positions = order.map((name) => html.indexOf(name));
    for (let index = 1; index < positions.length; index += 1) {
      expect(positions[index]).toBeGreaterThan(positions[index - 1]);
    }
    expect(html).not.toContain('Depuis l’AG');
    expect(html).toContain('href="/#inscription"');
    expect(html).toContain('aria-current="page">Qui sommes-nous ?</a>');
    const home = renderToStaticMarkup(<App path="/" />);
    expect(home.split('</header>')[0]).toContain('href="/qui-sommes-nous/"');
    expect(home).toContain('<li><a href="/qui-sommes-nous/">Découvre aussi l’équipe qui fait vivre le club.</a></li>');
  });
  it('présente chaque coach avec sa discipline et relie les pages concernées', () => {
    for (const coach of coaches) {
      const html = renderToStaticMarkup(<App path={coach.path} />);
      expect(html).toContain(`<h1>${coach.name}</h1>`);
      expect(html).toContain(coach.coachRole);
      expect(html).toContain(`href="${coach.discipline.path}"`);
      expect(html).toContain(`src="${coach.photo.src}"`);
      expect(html).toContain('href="/#inscription"');
      if (coach.clubRoleSince) {
        expect(html).toContain(coach.clubRoleSince);
      } else {
        expect(html).not.toContain('Depuis l’AG');
      }
      if (coach.instagram) {
        expect(html).toContain(`https://www.instagram.com/${coach.instagram}/`);
        expect(html).toContain(coach.instagramLabel);
      }
    }
    const force = renderToStaticMarkup(<App path="/force-athletique/" />);
    expect(force).toContain('Trouver un coach');
    expect(force).not.toContain('Le prof du cours');
    expect(force.indexOf('Préparer ta venue')).toBeLessThan(force.indexOf('Trouver un coach'));
    expect(force).toContain('href="/coach-sacha-turpin/"');
    const wrestling = renderToStaticMarkup(<App path="/lutte/" />);
    expect(wrestling).toContain('Le prof du cours');
    expect(wrestling).not.toContain('Trouver un coach');
    expect(wrestling.indexOf('Le prof du cours')).toBeLessThan(wrestling.indexOf('Trouve ta catégorie'));
    expect(wrestling).toContain('Il encadre les entraînements de lutte du club.');
    expect(wrestling).toContain('href="/coach-tengiz-dalakishvili/"');
    const musculation = renderToStaticMarkup(<App path="/musculation/" />);
    expect(musculation).not.toContain('Le prof du cours');
    expect(musculation).not.toContain('Trouver un coach');
    const about = renderToStaticMarkup(<App path="/qui-sommes-nous/" />);
    expect(about).toContain('href="/coach-sacha-turpin/"');
    expect(about).toContain('href="/coach-tengiz-dalakishvili/"');
  });
  it('publie la page personnelle de l’animatrice des cours collectifs sans l’ajouter au bureau', () => {
    const veronique = renderToStaticMarkup(<App path="/coach-veronique-lhotellier/" />);
    expect(veronique).toContain('<h1>Véronique L’hotellier</h1>');
    expect(veronique).toContain('Coach des cours collectifs');
    expect(veronique).toContain('src="/images/coach-veronique-lhotellier.jpg"');
    expect(veronique).toContain('href="/cours-collectifs/"');
    expect(veronique).toContain('Découvrir les cours collectifs');
    expect(veronique).not.toContain('Depuis l’AG');
    expect(veronique).not.toContain('coach__instagram');
    const about = renderToStaticMarkup(<App path="/qui-sommes-nous/" />);
    expect(about).not.toContain('L’hotellier');
    expect(about).not.toContain('href="/coach-veronique-lhotellier/"');
  });
  it('publie la page des tarifs avec les formules et leurs accès', () => {
    const html = renderToStaticMarkup(<App path="/tarifs/" />);
    expect(html).toContain('<h1>Tarifs et formules</h1>');
    expect(html).toContain(pricing.season);
    for (const offer of pricing.offers) {
      expect(html).toContain(`>${offer.name}`);
      expect(html).toContain(offer.price);
    }
    const totalChecks = pricing.offers.reduce((total, offer) => total + offer.includes.length, 0);
    expect(html.match(/✓/g)).toHaveLength(totalChecks);
    expect(html).toContain('role="region"');
    expect(html).toContain('Oui');
    expect(html).toContain('Non');
    expect(html).toContain(pricing.footnote);
    expect(html).toContain(site.hours[0].days);
    expect(html).toContain('18 h 30–20 h');
    expect(html.split('</header>')[0]).toContain('aria-current="page">Tarifs</a>');
    expect(html).toContain('href="/lutte/"');
    const force = renderToStaticMarkup(<App path="/force-athletique/" />);
    expect(force).toContain('href="/tarifs/"');
    expect(force).toContain('Voir toutes les formules et leurs accès');
    const home = renderToStaticMarkup(<App path="/" />);
    expect(home).toContain('<li><a href="/tarifs/">Compare les formules, leurs tarifs et leurs accès.</a></li>');
  });
  it('optimise le référencement local avec des métadonnées riches', () => {
    const home = renderHead('/');
    expect(home).toContain('<title>Powerlifting, musculation et lutte à Nantes');
    const force = renderHead('/force-athletique/');
    expect(force).toContain('Force athlétique &amp; Powerlifting à Nantes');
    expect(force).toContain('Powerlifting à Nantes');
    expect(renderHead('/musculation/')).toContain('Salle de musculation à Nantes');
    expect(renderHead('/lutte/')).toContain('Lutte libre et gréco-romaine à Nantes');
    for (const page of pages) {
      const head = renderHead(page.path);
      expect(head).toContain('application/ld+json');
      expect(head).toContain('"@type":"SportsActivityLocation"');
      expect(head).toContain('"addressLocality":"Nantes"');
    }
  });
  it('regroupe les liens validés et réserve son accès au pied de page', () => {
    const html = renderToStaticMarkup(<App path="/links/" />);
    const content = html.split('<main')[1].split('</main>')[0];
    expect(content).toContain(`href="mailto:${site.contact.email}"`);
    expect(content).toContain('href="/#inscription"');
    expect(content).toContain('href="https://www.instagram.com/can_powerlifting/"');
    expect(content).toContain('href="https://www.instagram.com/can_lutte_nantes/"');
    expect(content).toContain('href="https://chat.whatsapp.com/EeUBC9JdJKG1Mya8ZvV2Pv"');
    expect(content).toContain('links__card--official');
    expect(content).toContain('Site officiel du club');
    expect(content).toContain('src="/images/favicon-source.png"');
    expect(content.match(/<a /g)).toHaveLength(7);
    expect(content).toContain('href="/">Retour à l’accueil du site</a>');
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
    expect(html).toContain('https://www.instagram.com/club_athletique_nantais');
    expect(html).toContain('aria-label="Instagram du Club Athlétique Nantais"');
  });
  it('publie le contact du développeur et le code source dans le pied de page', () => {
    const html = renderToStaticMarkup(<App path="/" />);
    const footer = html.split('<footer')[1];
    expect(footer).toContain('Ferdinand Goor');
    expect(footer).toContain(`href="mailto:${site.developer.email}?subject=`);
    expect(footer).toContain('Proposer une modification du site');
    expect(footer).toContain(`href="${site.developer.githubUrl}"`);
    expect(footer).toContain('Code source sur GitHub');
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
