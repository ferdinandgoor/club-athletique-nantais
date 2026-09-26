import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { Container } from '../Container/Container';
import { disciplines } from '../../data/disciplines';
import { site } from '../../data/site';
import './PageShell.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const navigation = [
  { id: 'localisation', label: 'Le club' },
  { id: 'activites', label: 'Activités' },
  { id: 'inscription', label: 'Inscription' },
  { id: 'infos', label: 'Infos pratiques' },
  { id: 'galerie', label: 'Galerie' },
];

export function PageShell({ children, path = '/' }: PropsWithChildren<{ path?: string }>) {
  const isHome = path === '/';
  const isLinks = path === '/links/';
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const updateNavigation = () => {
      setIsCompact(window.scrollY > 32);
      const offset = window.innerHeight * 0.35;
      const visible = navigation
        .map(({ id }) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .filter((section) => section.getBoundingClientRect().top <= offset)
        .at(-1);
      setActiveSection(visible?.id ?? 'accueil');
    };

    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    return () => window.removeEventListener('scroll', updateNavigation);
  }, []);

  return (
    <div className="page-shell">
      <a className="page-shell__skip" href="#contenu">Aller au contenu</a>
      {!isLinks && <header className={`page-shell__header${isCompact || !isHome ? ' page-shell__header--compact' : ''}`}>
        <Container>
          <a className="page-shell__brand" href={isHome ? "#accueil" : "/"} aria-label={`${site.name} — Accueil`} aria-current={isHome && activeSection === 'accueil' ? 'page' : undefined}>
            <img src="/images/logo-can-horizontal-white.png" width="1400" height="521" alt="" />
          </a>
          <button className="page-shell__menu-button" type="button" aria-expanded={isMenuOpen} aria-controls="navigation-principale" onClick={() => setIsMenuOpen((open) => !open)}>
            <span className="page-shell__menu-icon" aria-hidden="true" />
            <span>Menu</span>
          </button>
          <nav id="navigation-principale" aria-label="Navigation principale" data-open={isMenuOpen}>
            {!isHome && disciplines.map((item) => <a key={item.path} href={item.path} aria-current={path === item.path ? 'page' : undefined}>{item.title}</a>)}
            {(isHome ? navigation : navigation.filter((item) => item.id === 'activites' || item.id === 'inscription')).map((item) => (
              <a key={item.id} href={`${isHome ? "" : "/"}#${item.id}`} aria-current={isHome && activeSection === item.id ? 'location' : undefined} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="page-shell__instagram" href={site.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram du Club Athlétique Nantais">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle className="page-shell__instagram-dot" cx="17.4" cy="6.7" r="1" />
              </svg>
            </a>
          </nav>
        </Container>
      </header>}
      <main ref={mainRef} id="contenu" tabIndex={-1}><Container>{children}</Container></main>
      {!isLinks && <footer className="page-shell__footer">
        <Container>
          <div className="page-shell__footer-column page-shell__footer-brand">
            <strong>{site.name}</strong>
            <p>Musculation · Force athlétique · Lutte</p>
            <a href="https://ferd.fr/developpeur-freelance" target="_blank" rel="noreferrer">Site développé par Ferd</a>
          </div>
          <div className="page-shell__footer-column">
            <h2>Contact</h2>
            <address>{site.contact.address}</address>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
          <div className="page-shell__footer-column">
            <h2>Nous suivre</h2>
            <a href={site.contact.instagramUrl} target="_blank" rel="noreferrer">Instagram du club</a>
            <a href="https://www.instagram.com/can_powerlifting/" target="_blank" rel="noreferrer">Instagram force athlétique</a>
            <a href="https://www.instagram.com/can_lutte_nantes/" target="_blank" rel="noreferrer">Instagram lutte</a>
            <a href="/links/" aria-current={path === '/links/' ? 'page' : undefined}>Tous les liens</a>
          </div>
        </Container>
      </footer>}
    </div>
  );
}
