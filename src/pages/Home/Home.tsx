import { useEffect, useRef, useState } from 'react';
import { site } from '../../data/site';
import './Home.scss';
import { RegistrationGuide } from '../../components/RegistrationGuide/RegistrationGuide';

export function Home() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const photo = site.gallery[currentPhoto];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => {
      if (reduceMotion.matches) {
        heroVideo.current?.pause();
        setIsAutoPlaying(false);
      } else {
        void heroVideo.current?.play().catch(() => undefined);
      }
    };
    updatePlayback();
    reduceMotion.addEventListener('change', updatePlayback);
    return () => reduceMotion.removeEventListener('change', updatePlayback);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    const interval = window.setInterval(() => {
      setCurrentPhoto((index) => (index + 1) % site.gallery.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isAutoPlaying]);

  const showPreviousPhoto = () => setCurrentPhoto((index) => (index - 1 + site.gallery.length) % site.gallery.length);
  const showNextPhoto = () => setCurrentPhoto((index) => (index + 1) % site.gallery.length);

  return (
    <div className="home">
      <section className="home__hero" id="accueil" aria-labelledby="home-title">
        <video ref={heroVideo} className="home__hero-video" autoPlay muted loop playsInline preload="metadata" poster="/images/salle-can-poster.jpg" aria-hidden="true">
          <source src="/images/visite-salle-can.mp4" type="video/mp4" />
        </video>
        <div className="home__hero-overlay" />
        <div className="home__hero-copy">
          <p className="home__eyebrow">{site.home.eyebrow}</p>
          <h1 className="home__visually-hidden" id="home-title">{site.name}, club de force athlétique à Nantes</h1>
          <img className="home__hero-logo" src="/images/logo-can-officiel.png" width="1200" height="1200" alt="" />
          <p className="home__introduction">{site.home.introduction}</p>
          <a className="home__button home__button--light" href="#inscription">Rejoindre le club</a>
        </div>
        <a className="home__scroll-hint" href="#localisation">Découvrir le club <span aria-hidden="true">↓</span></a>
      </section>

      <section className="home__location home__full-width" id="localisation" aria-labelledby="location-title">
        <iframe
          className="home__map"
          src={site.contact.mapEmbedUrl}
          title="Localisation du Club Athlétique Nantais sur Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="home__location-copy">
          <p className="home__eyebrow">La salle</p>
          <h2 id="location-title">À l’ouest de Nantes</h2>
          <address>{site.contact.address}</address>
          <p>À proximité de Saint-Herblain, un espace consacré à la force avec le matériel nécessaire pour apprendre, progresser et préparer ses objectifs.</p>
          <a className="home__text-link" href={site.contact.mapUrl} target="_blank" rel="noreferrer">Préparer mon itinéraire <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <RegistrationGuide />

      <section className="home__practical home__full-width" id="infos" aria-labelledby="infos-title">
        <div className="home__practical-inner">
          <header className="home__section-heading">
            <p className="home__eyebrow">Avant de venir</p>
            <h2 id="infos-title">Informations pratiques</h2>
          </header>
          <div className="home__info-grid">
            <article className="home__info-card">
              <span className="home__card-number">01</span>
              <h3>Horaires du club</h3>
              <dl>{site.hours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.times}</dd></div>)}</dl>
              <p className="home__fine-print">Toute l’année, hors vacances scolaires.</p>
            </article>
            <article className="home__info-card home__info-card--accent">
              <span className="home__card-number">02</span>
              <h3>Teste la salle</h3>
              <p className="home__price">{site.registration.trialPrice}<small> la séance</small></p>
              <p>Préviens-nous à l’avance pour organiser ta venue et découvrir la salle.</p>
              <a className="home__button home__button--light" href={`mailto:${site.contact.email}`}>Contacter le club</a>
            </article>
          </div>
        </div>
      </section>

      <section className="home__section home__gallery" id="galerie" aria-labelledby="gallery-title">
        <header className="home__section-heading">
          <p className="home__eyebrow">Dans la salle</p>
          <h2 id="gallery-title">Le CAN en images</h2>
        </header>
        <div className="home__carousel" aria-roledescription="carrousel" aria-label="Photos du Club Athlétique Nantais">
          <div className="home__carousel-frame" aria-live={isAutoPlaying ? 'off' : 'polite'}>
            <img key={photo.src} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} />
            <p><span>{String(currentPhoto + 1).padStart(2, '0')}</span> / {String(site.gallery.length).padStart(2, '0')}</p>
          </div>
          <div className="home__carousel-controls">
            <button type="button" onClick={showPreviousPhoto} aria-label="Afficher la photo précédente">←</button>
            <button className="home__carousel-toggle" type="button" onClick={() => setIsAutoPlaying((playing) => !playing)} aria-label={isAutoPlaying ? 'Mettre le carrousel en pause' : 'Relancer le carrousel'} aria-pressed={!isAutoPlaying}>
              {isAutoPlaying ? 'Pause' : 'Lecture'}
            </button>
            <button type="button" onClick={showNextPhoto} aria-label="Afficher la photo suivante">→</button>
          </div>
          <div className="home__carousel-dots" aria-label="Choisir une photo">
            {site.gallery.map((item, index) => (
              <button key={item.src} type="button" onClick={() => setCurrentPhoto(index)} aria-label={`Afficher la photo ${index + 1}`} aria-current={currentPhoto === index ? 'true' : undefined} />
            ))}
          </div>
        </div>
        <p className="home__gallery-credit">Photos : White Lights Media</p>
      </section>
    </div>
  );
}
