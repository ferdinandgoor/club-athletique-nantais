import type { PropsWithChildren } from 'react';
import { Container } from '../Container/Container';
import { site } from '../../data/site';
import './PageShell.scss';

const navigation = [
  { href: '/#disciplines', label: 'Disciplines' },
  { href: '/#infos', label: 'Infos pratiques' },
  { href: '/#inscription', label: 'Inscription' },
];

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="page-shell">
      <a className="page-shell__skip" href="#contenu">Aller au contenu</a>
      <header className="page-shell__header">
        <Container>
          <a className="page-shell__brand" href="/" aria-label={`${site.name} — Accueil`}>
            <img src="/images/logo-can-horizontal-white.png" width="1400" height="521" alt="" />
          </a>
          <nav aria-label="Navigation principale">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a className="page-shell__instagram" href={site.contact.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram du Club Athlétique Nantais">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle className="page-shell__instagram-dot" cx="17.4" cy="6.7" r="1" />
              </svg>
            </a>
          </nav>
        </Container>
      </header>
      <main id="contenu" tabIndex={-1}><Container>{children}</Container></main>
      <footer className="page-shell__footer">
        <Container>
          <strong>{site.name}</strong>
          <address>{site.contact.address}</address>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={site.contact.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
        </Container>
      </footer>
    </div>
  );
}
