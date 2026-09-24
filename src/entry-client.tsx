import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { getSeo } from './seo';
import './styles/global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('Le conteneur principal du site est introuvable.');
const app = <StrictMode><App path={window.location.pathname} /></StrictMode>;
// En développement Vite sert un modèle vide ; en production, le HTML existe déjà.
if (root.querySelector('*')) hydrateRoot(root, app);
else createRoot(root).render(app);
document.title = getSeo(window.location.pathname).title;
