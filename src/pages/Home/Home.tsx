import { site } from '../../data/site';
import './Home.scss';

export function Home() {
  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-title">
        <div className="home__hero-copy">
          <p className="home__eyebrow">{site.home.eyebrow}</p>
          <h1 id="home-title">{site.home.title}</h1>
          <p className="home__introduction">{site.home.introduction}</p>
          <div className="home__actions">
            <a className="home__button" href="#disciplines">Découvrir les disciplines</a>
            <a className="home__text-link" href="#infos">Préparer ma venue</a>
          </div>
        </div>
        <img className="home__hero-logo" src="/images/logo-can-officiel.png" width="1200" height="1200" alt="Logo du Club Athlétique Nantais, un éléphant" />
      </section>

      <section className="home__section" id="disciplines" aria-labelledby="activities-title">
        <header className="home__section-heading">
          <p className="home__eyebrow">À chacun sa pratique</p>
          <h2 id="activities-title">Les disciplines du club</h2>
          <p>Pour découvrir, progresser, se dépasser ou préparer la compétition.</p>
        </header>
        <div className="home__activity-grid">
          {site.activities.map((activity, index) => (
            <article className="home__activity" key={activity.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{activity.title}</h3>
              <p>{activity.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home__media" aria-labelledby="club-title">
        <div className="home__photo-wrap">
          <img src="/images/equipe-club-athletique-nantais.jpg" width="904" height="1200" alt="Un groupe de membres du Club Athlétique Nantais dans la salle d’entraînement" loading="lazy" />
        </div>
        <div className="home__media-copy">
          <p className="home__eyebrow">Une salle, plusieurs pratiques</p>
          <h2 id="club-title">S’entraîner ensemble</h2>
          <p>Le CAN réunit des pratiquantes et pratiquants de plusieurs disciplines dans une salle dédiée à la force et au mouvement.</p>
          <video controls playsInline preload="metadata" poster="/images/salle-can-poster.jpg" aria-label="Visite vidéo des espaces d’entraînement du club">
            <source src="/images/visite-salle-can.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="home__section home__section--practical" id="infos" aria-labelledby="infos-title">
        <header className="home__section-heading">
          <p className="home__eyebrow">Venir au CAN</p>
          <h2 id="infos-title">Informations pratiques</h2>
        </header>
        <div className="home__info-grid">
          <article className="home__info-card">
            <h3>Horaires du club</h3>
            <dl>
              {site.hours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.times}</dd></div>)}
            </dl>
            <p className="home__fine-print">Horaires communiqués par le club, hors vacances scolaires.</p>
          </article>
          <article className="home__info-card">
            <h3>Adresse</h3>
            <address>{site.contact.address}</address>
            <a className="home__text-link" href={site.contact.mapUrl} target="_blank" rel="noreferrer">Ouvrir dans Google Maps</a>
          </article>
          <article className="home__info-card home__info-card--accent">
            <h3>Tester la salle</h3>
            <p className="home__price">{site.registration.trialPrice}<span> la séance</span></p>
            <p>Préviens-nous à l’avance pour organiser ta venue.</p>
            <a className="home__button home__button--light" href={`mailto:${site.contact.email}`}>Contacter le club</a>
          </article>
        </div>
      </section>

      <section className="home__registration" id="inscription" aria-labelledby="registration-title">
        <div>
          <p className="home__eyebrow">Rejoindre le club</p>
          <h2 id="registration-title">Inscription via {site.registration.service}</h2>
          <p>Télécharge l’application MonClub, choisis « J’ai un code club », puis renseigne le code du CAN.</p>
        </div>
        <div className="home__club-code">
          <span>Code club</span>
          <strong>{site.registration.clubCode}</strong>
        </div>
      </section>
    </div>
  );
}
