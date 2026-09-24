import { StrictMode, useEffect, useState } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { getSeo } from './seo';
import './styles/global.scss';

function ClientApp() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      event.preventDefault();
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
      setPath(url.pathname);
      window.requestAnimationFrame(() => {
        if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
        else window.scrollTo(0, 0);
      });
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    document.title = getSeo(path).title;
  }, [path]);

  return <App path={path} />;
}

const root = document.getElementById('root');
if (!root) throw new Error('Le conteneur principal du site est introuvable.');
const app = <StrictMode><ClientApp /></StrictMode>;
// En développement Vite sert un modèle vide ; en production, le HTML existe déjà.
if (root.querySelector('*')) hydrateRoot(root, app);
else createRoot(root).render(app);
