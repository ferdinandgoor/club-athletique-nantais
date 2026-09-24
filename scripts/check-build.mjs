import assert from 'node:assert/strict';
import { readFile, rm } from 'node:fs/promises';
import { pages, site, escapeHtml } from '../.ssr/entry-server.js';

const dist = new URL('../dist/', import.meta.url);
const titles = new Set();
const descriptions = new Set();
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
for (const page of pages) {
  const html = await readFile(new URL(`${page.path.slice(1)}index.html`, dist), 'utf8');
  assert.ok(html.includes('<h1'), `Contenu absent : ${page.path}`);
  assert.ok(html.includes(`<title>${escapeHtml(page.title)}</title>`));
  assert.ok(html.includes(`rel="canonical" href="${escapeHtml(site.url + page.path)}"`));
  assert.ok(!html.includes('<!--app-') && !html.includes('/src/entry-client'));
  assert.ok(sitemap.includes(`<loc>${escapeHtml(site.url + page.path)}</loc>`));
  assert.ok(!titles.has(page.title), 'Chaque page doit avoir un titre unique.');
  assert.ok(!descriptions.has(page.description), 'Chaque page doit avoir une description unique.');
  titles.add(page.title);
  descriptions.add(page.description);
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) {
    await readFile(new URL(match[1].slice(1), dist));
  }
}
const notFound = await readFile(new URL('404.html', dist), 'utf8');
assert.ok(notFound.includes('name="robots" content="noindex"'));
assert.ok(!notFound.includes('rel="canonical"'));
assert.ok((await readFile(new URL('robots.txt', dist), 'utf8')).includes(`${site.url}/sitemap.xml`));
await rm(new URL('../.ssr/', import.meta.url), { recursive: true, force: true });
console.log('Build vérifié : pages, métadonnées, ressources, sitemap et page 404.');
