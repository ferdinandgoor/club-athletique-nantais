// Ne jamais afficher les valeurs des secrets dans les journaux GitHub.
const required = ['SITE_URL', 'FTP_SERVER', 'FTP_USERNAME', 'FTP_PASSWORD', 'FTP_SERVER_DIR'];
for (const name of required) {
  if (!process.env[name]?.trim()) throw new Error(`Configuration manquante : ${name}`);
}
const url = new URL(process.env.SITE_URL);
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || /(^|\.)(localhost|example\.(org|com|net))$/.test(url.hostname) || url.hostname === '127.0.0.1') {
  throw new Error('SITE_URL doit désigner le véritable domaine HTTPS, sans chemin.');
}
const directory = process.env.FTP_SERVER_DIR;
if (!directory.endsWith('/') || directory === '/' || directory.split('/').some((part) => part === '.' || part === '..')) {
  throw new Error('FTP_SERVER_DIR doit être un dossier dédié terminé par /, par exemple www/.');
}
if (!['ftp', 'ftps', 'ftps-legacy'].includes(process.env.FTP_PROTOCOL)) {
  throw new Error('FTP_PROTOCOL doit valoir ftp, ftps ou ftps-legacy (SFTP non pris en charge).');
}
const port = Number(process.env.FTP_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('FTP_PORT invalide.');
console.log('Les paramètres nécessaires à la publication sont présents et valides.');
