import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { render, pages, site, escapeHtml } from '../.ssr/entry-server.js';

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`Repère absent du modèle HTML : ${marker}`);
}
for (const path of [...pages.map((page) => page.path), '/404.html']) {
  const { html, head } = render(path);
  const target = new URL(path === '/404.html' ? '404.html' : `${path.slice(1)}index.html`, dist);
  await mkdir(new URL('.', target), { recursive: true });
  await writeFile(target, template.replace('<!--app-head-->', () => head).replace('<!--app-html-->', () => html));
}
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escapeHtml(site.url + page.path)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`${pages.length} page(s) pré-rendue(s), page 404 et fichiers de référencement générés.`);
