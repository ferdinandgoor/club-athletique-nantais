import type { PropsWithChildren } from 'react';
import { Container } from '../Container/Container';
import { site } from '../../data/site';
import { pages } from '../../data/pages';
import './PageShell.scss';

export function PageShell({ children, path }: PropsWithChildren<{ path: string }>) {
  return (
    <div className="page-shell">
      <a className="page-shell__skip" href="#contenu">Aller au contenu</a>
      <header className="page-shell__header">
        <Container>
          <a className="page-shell__brand" href="/">{site.name}</a>
          <nav aria-label="Navigation principale">
            {pages.map((page) => <a key={page.path} href={page.path} aria-current={path === page.path ? 'page' : undefined}>{page.label}</a>)}
          </nav>
        </Container>
      </header>
      <main id="contenu" tabIndex={-1}><Container>{children}</Container></main>
      <footer className="page-shell__footer"><Container>{site.name} · Nantes</Container></footer>
    </div>
  );
}
