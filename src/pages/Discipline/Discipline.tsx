import { disciplines, type DisciplineData } from '../../data/disciplines';
import { site } from '../../data/site';
import './Discipline.scss';

const wrestlingSchedule = [
  { day: 'Lundi', entries: [['17:00–21:00', 'Salle de musculation'], ['19:00–19:30', 'Wrestling training / PPG'], ['19:30–21:00', 'Lutte libre — ados et adultes']] },
  { day: 'Mardi', entries: [['17:00–21:00', 'Salle de musculation'], ['17:30–19:00', 'Lutte libre et gréco — ados et adultes'], ['19:00–20:30', 'Tapis A : lutte libre et gréco — ados et adultes'], ['19:00–20:30', 'Tapis B : lutte féminine'], ['20:30–21:00', 'PPG — ados et adultes']] },
  { day: 'Mercredi', entries: [['17:00–21:00', 'Salle de musculation'], ['17:00–18:00', 'Lutte enfants — 4 à 13 ans'], ['18:00–19:00', 'Tapis A : lutte gréco-romaine — ados et adultes'], ['18:00–19:00', 'Tapis B : lutte féminine'], ['19:00–19:30', 'Wrestling training / PPG'], ['19:30–21:00', 'Lutte libre — ados et adultes']] },
  { day: 'Jeudi', entries: [['17:00–21:00', 'Salle de musculation'], ['17:00–18:00', 'Lutte enfants — 4 à 13 ans'], ['20:00–21:00', 'Matchs arbitrés — tous niveaux, ados et adultes']] },
  { day: 'Vendredi', entries: [['17:00–21:00', 'Salle de musculation'], ['17:30–18:30', 'Lutte enfants — 4 à 13 ans'], ['18:30–19:40', 'Lutte gréco-romaine — ados et adultes'], ['19:40–21:00', 'PPG — ados et adultes'], ['20:00–21:00', 'Lutte féminine']] },
  { day: 'Samedi', entries: [['10:00–14:00', 'Salle de musculation']] },
  { day: 'Dimanche', entries: [['10:00–12:00', 'Salle de musculation'], ['Toute la semaine', 'Open mat : MMA, grappling et fight']] },
] as const;

export function Discipline({ discipline }: { discipline: DisciplineData }) {
  const isForce = discipline.id === 'force-athletique';
  const hasGymHours = isForce || discipline.id === 'musculation';
  const others = disciplines.filter((item) => item.id !== discipline.id);
  const isWrestling = discipline.id === 'lutte';
  const instagramUrl = isWrestling ? 'https://www.instagram.com/can_lutte_nantes/' : site.contact.instagramUrl;
  return (
    <article className="discipline">
      <header className="discipline__hero">
        <nav aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true"> / </span><span aria-current="page">{discipline.title}</span></nav>
        <p className="discipline__eyebrow">{discipline.subtitle}</p>
        <h1>{discipline.title}</h1>
        <p className="discipline__introduction">{discipline.introduction}</p>
        <a className="discipline__button" href="/#inscription">S’inscrire avec MonClub</a>
        {(isForce || isWrestling) && <a className="discipline__instagram" href={instagramUrl} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>Nous suivre sur Instagram ↗</a>}
      </header>
      <section className="discipline__section" aria-labelledby="practice-title">
        <h2 id="practice-title">{discipline.heading}</h2>
        <div className="discipline__details">
          {discipline.details.map((detail, index) => <div key={detail.title} data-reveal><span className="discipline__eyebrow">0{index + 1}</span><h3>{detail.title}</h3><p>{detail.text}</p></div>)}
        </div>
        <div className="discipline__prices" data-reveal>
          <p className="discipline__eyebrow">Saison 2026–2027</p>
          <h3>Tarifs</h3>
          <ul>{discipline.prices.map((price) => <li key={price.label}><span>{price.label}{price.note && <small>{price.note}</small>}</span><strong>{price.amount}</strong></li>)}</ul>
        </div>
        {isWrestling && <div className="discipline__schedule" data-reveal>
          <p className="discipline__eyebrow">Saison 2026–2027</p>
          <h3>Planning des entraînements</h3>
          <div className="discipline__schedule-grid">
            {wrestlingSchedule.map(({ day, entries }) => <section key={day} aria-labelledby={`schedule-${day}`}>
              <h4 id={`schedule-${day}`}>{day}</h4>
              <ul>{entries.map(([time, title]) => <li key={`${time}-${title}`}><time>{time}</time><span>{title}</span></li>)}</ul>
            </section>)}
          </div>
        </div>}
      </section>
      <section className="discipline__section discipline__practical" data-reveal id="infos" aria-labelledby="practice-info-title">
        <h2 id="practice-info-title">Préparer ta venue</h2>
        {hasGymHours ? <div className="discipline__details discipline__details--two">
          <div><h3>Horaires de la salle</h3><dl>{site.hours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.times}</dd></div>)}</dl><p>Toute l’année, hors vacances scolaires.</p><address>{site.contact.address}</address><a href={site.contact.mapUrl} target="_blank" rel="noreferrer">Préparer mon itinéraire ↗</a></div>
          {isForce && <div><h3>Teste la salle</h3><p className="discipline__price">{site.registration.trialPrice}<small> la séance</small></p><p>Préviens-nous à l’avance pour organiser ta venue et découvrir la salle.</p><a className="discipline__button" href={`mailto:${site.contact.email}`}>Organiser ma séance</a></div>}
        </div> : <div className="discipline__contact"><h3>Comment découvrir la {discipline.title.toLowerCase()} ?</h3>{isWrestling ? <p>L’entraîneur est présent sur tous les créneaux. Viens voir un cours et pose-lui directement tes questions.</p> : <p>Viens pendant les horaires de la salle. Demande à un adhérent de t’orienter vers un bénévole pour t’accueillir et répondre à tes questions.</p>}<p>Tu peux aussi t’inscrire directement avec MonClub grâce au guide ci-dessous.</p><a className="discipline__button" href="/#inscription">Voir le guide d’inscription</a><a className="discipline__other" href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Renseignements ' + discipline.title)}`}>Écrire au club si besoin</a></div>}
      </section>
      <section className="discipline__section discipline__join" data-reveal aria-labelledby="join-title">
        <h2 id="join-title">Rejoins la section</h2>
        <p>Dans MonClub, utilise le code <strong>{site.registration.clubCode}</strong>, ouvre « Nos formules », puis sélectionne {isForce ? '« Force athlétique »' : !isWrestling ? '« Musculation »' : 'la catégorie « Lutte », « Lutte baby » ou « Lutte enfant » correspondant à ton profil'}.</p>
        <a className="discipline__button" href="/#inscription">Voir le guide d’inscription</a>
        {others.map((other) => <a className="discipline__other" href={other.path} key={other.id}>Découvrir aussi la {other.title.toLowerCase()} →</a>)}
      </section>
    </article>
  );
}
