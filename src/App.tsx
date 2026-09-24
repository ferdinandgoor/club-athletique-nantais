import { PageShell } from './components/PageShell/PageShell';
import { Discipline } from './pages/Discipline/Discipline';
import { disciplines } from './data/disciplines';
import { Home } from './pages/Home/Home';
import { Links } from './pages/Links/Links';
import { normalizePath } from './data/pages';

export function App({ path }: { path: string }) {
  const normalized = normalizePath(path);
  const discipline = disciplines.find((item) => item.path === normalized);
  return (
    <PageShell path={normalized}>
      {normalized === '/' ? <Home /> : normalized === '/links/' ? <Links /> : discipline ? <Discipline discipline={discipline} /> : <section><h1>Page introuvable</h1><p>Cette page n’existe pas ou a été déplacée.</p><a href="/">Revenir à l’accueil</a></section>}
    </PageShell>
  );
}
