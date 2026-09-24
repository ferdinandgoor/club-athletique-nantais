import { clubLinks } from '../../data/links';
import { site } from '../../data/site';
import './Links.scss';

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
            <a className="links__card" href={link.href}>
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
