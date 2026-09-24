import { renderToString } from 'react-dom/server';
import { App } from './App';
import { renderHead } from './seo';
export { pages } from './data/pages';
export { site } from './data/site';
export { escapeHtml } from './seo';

export function render(path: string) {
  return { html: renderToString(<App path={path} />), head: renderHead(path) };
}
