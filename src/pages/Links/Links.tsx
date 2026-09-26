import { clubLinks } from '../../data/links';
import { site } from '../../data/site';
import './Links.scss';

function LinkIcon({ platform }: { platform: string }) {
  if (platform === 'official') return <img src="/images/favicon-source.png" width="1248" height="1248" alt="" />;
  if (platform === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="links__icon-dot" /></svg>;
  if (platform === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.3-.4.7-.4 1-.1l1 1.3c.2.3.2.6 0 .9l-.5.6c.6 1 1.4 1.7 2.5 2.2l.6-.6c.2-.2.6-.3.9-.1l1.4.8c.4.2.4.7.2 1-.5.7-1.3 1-2.2.8-3-.6-5.8-3.5-6.2-5.9-.2-.4.1-.7.3-.9Z" /></svg>;
  if (platform === 'contact') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z" /><path d="m7 9 5 4 5-4M7 17h10" /></svg>;
}

export function Links() {
  return (
    <section className="links" aria-labelledby="links-title">
      <div className="links__profile">
        <img className="links__logo" src="/images/logo-can-officiel.png" width="1200" height="1200" alt="" />
        <h1 id="links-title">{site.name}</h1>
        <p>{clubLinks.introduction}</p>
      </div>
      <ul className="links__list">
        {clubLinks.items.map((link) => (
          <li key={link.href}>
            <a className={`links__card links__card--${link.platform}`} href={link.href}>
              <span className="links__icon"><LinkIcon platform={link.platform} /></span>
              <span>
                <strong className="links__label">{link.label}</strong>
                <span className="links__description">{link.description}</span>
              </span>
              <span className="links__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <a className="links__back" href="/">{clubLinks.backLabel}</a>
    </section>
  );
}
