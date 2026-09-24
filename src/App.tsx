import { PageShell } from './components/PageShell/PageShell';
import { Home } from './pages/Home/Home';
import { normalizePath } from './data/pages';

export function App({ path }: { path: string }) {
  const normalized = normalizePath(path);
  return (
    <PageShell path={normalized}>
      {normalized === '/' ? <Home /> : <section><h1>Page introuvable</h1><p>Cette page n’existe pas ou a été déplacée.</p><a href="/">Revenir à l’accueil</a></section>}
    </PageShell>
  );
}
