import { useEffect, useRef, useState } from 'react';
import { disciplines } from '../../data/disciplines';
import { site } from '../../data/site';
import './Home.scss';
import { RegistrationGuide } from '../../components/RegistrationGuide/RegistrationGuide';

export function Home() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const photo = site.gallery[currentPhoto];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = heroVideo.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const updatePlayback = () => {
      if (reduceMotion.matches) {
        video.autoplay = false;
        video.pause();
        setIsAutoPlaying(false);
      } else {
        video.autoplay = true;
        void video.play().catch(() => undefined);
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

  const toggleVideo = () => {
    const video = heroVideo.current;
    if (!video) return;
    setVideoError(false);
    if (!video.paused) {
      video.pause();
    } else {
      video.muted = true;
      void video.play().catch(() => setVideoError(true));
    }
  };

  const showPreviousPhoto = () => setCurrentPhoto((index) => (index - 1 + site.gallery.length) % site.gallery.length);
  const showNextPhoto = () => setCurrentPhoto((index) => (index + 1) % site.gallery.length);

  return (
    <div className="home">
      <section className="home__hero" id="accueil" aria-labelledby="home-title">
        <video ref={heroVideo} className={`home__hero-video${isVideoPlaying ? " home__hero-video--playing" : ""}`} onPlaying={() => setIsVideoPlaying(true)} onPause={() => setIsVideoPlaying(false)} muted loop playsInline preload="metadata" poster="/images/salle-can-poster.jpg" aria-hidden="true">
          <source src="/images/visite-salle-can.mp4" type="video/mp4" />
        </video>
        <div className="home__hero-overlay" />
        <div className="home__hero-copy">
          <p className="home__eyebrow">{site.home.eyebrow}</p>
          <h1 className="home__visually-hidden" id="home-title">{site.name}, musculation, force athlétique et lutte à Nantes</h1>
          <img className="home__hero-logo" src="/images/logo-can-officiel.png" width="1200" height="1200" alt="" />
          <p className="home__introduction">{site.home.introduction}</p>
          <a className="home__button home__button--light" href="#activites">Découvrir les activités</a>
        </div>
        <div className="home__video-controls">
          <button type="button" onClick={toggleVideo} aria-label={isVideoPlaying ? 'Mettre la vidéo en pause' : 'Lire la vidéo de la salle'}>
            <span aria-hidden="true">{isVideoPlaying ? 'Ⅱ' : '▶'}</span> {isVideoPlaying ? 'Pause vidéo' : 'Lire la vidéo'}
          </button>
          {videoError && <span role="status">Lecture indisponible. Réessaie dans ton navigateur.</span>}
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
        <div className="home__location-copy" data-reveal>
          <p className="home__eyebrow">La salle</p>
          <h2 id="location-title">À l’ouest de Nantes</h2>
          <address>{site.contact.address}</address>
          <p>À proximité de Saint-Herblain, retrouve le Club Athlétique Nantais et renseigne-toi auprès du club sur le lieu de pratique de ton activité.</p>
          <a className="home__text-link" href={site.contact.mapUrl} target="_blank" rel="noreferrer">Préparer mon itinéraire <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="home__section home__activities" id="activites" aria-labelledby="activities-title">
        <header className="home__section-heading" data-reveal>
          <p className="home__eyebrow">Un club, plusieurs pratiques</p>
          <h2 id="activities-title">Trouve ta discipline</h2>
        </header>
        <div className="home__activity-grid">
          {disciplines.map((discipline, index) => (
            <a className={`home__activity-card home__activity-card--${discipline.id}`} href={discipline.path} key={discipline.id} data-reveal>
              <span className="home__activity-number">0{index + 1}</span>
              <span className="home__eyebrow">{discipline.subtitle}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.summary}</p>
              <span className="home__activity-link">Découvrir la {discipline.title.toLowerCase()} <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </section>

      <RegistrationGuide />

      <section className="home__section" data-reveal id="infos" aria-labelledby="contact-title">
        <p className="home__eyebrow">Préparer ta venue</p>
        <h2 id="contact-title">Échange avec le club</h2>
        <p>Les créneaux et les modalités d’essai dépendent de l’activité. Retrouve les informations sur la page de ta discipline ou contacte-nous avant de venir.</p>
        <a className="home__button" href={`mailto:${site.contact.email}`}>Contacter le CAN</a>
      </section>

      <section className="home__section home__gallery" id="galerie" aria-labelledby="gallery-title">
        <header className="home__section-heading" data-reveal>
          <p className="home__eyebrow">Côté force athlétique</p>
          <h2 id="gallery-title">La force en images</h2>
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
