export function resolveSiteUrl(value?: string): string {
  const url = new URL(value || 'http://localhost:5173');
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('VITE_SITE_URL doit être une URL HTTP(S) sans chemin, identifiants, paramètres ni fragment.');
  }
  return url.origin;
}
