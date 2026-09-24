import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const valid = {
  SITE_URL: 'https://club.test',
  FTP_SERVER: 'ftp.club.test',
  FTP_USERNAME: 'test-user',
  FTP_PASSWORD: 'test-secret-never-print',
  FTP_SERVER_DIR: 'www/',
  FTP_PROTOCOL: 'ftps',
  FTP_PORT: '21',
};

function validate(overrides: Record<string, string | undefined> = {}) {
  return spawnSync(process.execPath, ['scripts/validate-deploy.mjs'], {
    env: { ...process.env, ...valid, ...overrides },
    encoding: 'utf8',
  });
}

describe('Configuration de publication', () => {
  it('accepte une configuration complète sans contacter le serveur', () => {
    expect(validate().status).toBe(0);
  });
  it.each([
    { FTP_PASSWORD: '' },
    { SITE_URL: 'https://club.example.org' },
    { SITE_URL: 'http://localhost:5173' },
    { FTP_SERVER_DIR: '/' },
    { FTP_SERVER_DIR: '../www/' },
    { FTP_SERVER_DIR: 'www' },
    { FTP_PROTOCOL: 'sftp' },
    { FTP_PORT: '0' },
  ])('bloque une configuration incorrecte : %j', (overrides) => {
    const result = validate(overrides);
    expect(result.status).not.toBe(0);
    expect(result.stdout + result.stderr).not.toContain(valid.FTP_PASSWORD);
  });
});
