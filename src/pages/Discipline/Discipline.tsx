import { disciplines, type DisciplineData } from '../../data/disciplines';
import { site } from '../../data/site';
import './Discipline.scss';

export function Discipline({ discipline }: { discipline: DisciplineData }) {
  const isForce = discipline.id === 'force-athletique';
  const hasGymHours = isForce || discipline.id === 'musculation';
  const others = disciplines.filter((item) => item.id !== discipline.id);
  const isWrestling = discipline.id === 'lutte';
  return (
    <article className="discipline">
      <header className="discipline__hero">
        <nav aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true"> / </span><span aria-current="page">{discipline.title}</span></nav>
        <p className="discipline__eyebrow">{discipline.subtitle}</p>
        <h1>{discipline.title}</h1>
        <p className="discipline__introduction">{discipline.introduction}</p>
        <a className="discipline__button" href="/#inscription">S’inscrire avec MonClub</a>
      </header>
      <section className="discipline__section" aria-labelledby="practice-title">
        <h2 id="practice-title">{discipline.heading}</h2>
        <div className="discipline__details">
          {discipline.details.map((detail, index) => <div key={detail.title} data-reveal><span className="discipline__eyebrow">0{index + 1}</span><h3>{detail.title}</h3><p>{detail.text}</p></div>)}
        </div>
      </section>
      <section className="discipline__section discipline__practical" data-reveal id="infos" aria-labelledby="practice-info-title">
        <h2 id="practice-info-title">Préparer ta venue</h2>
        {hasGymHours ? <div className="discipline__details discipline__details--two">
          <div><h3>Horaires de la salle</h3><dl>{site.hours.map((item) => <div key={item.days}><dt>{item.days}</dt><dd>{item.times}</dd></div>)}</dl><p>Toute l’année, hors vacances scolaires.</p><address>{site.contact.address}</address><a href={site.contact.mapUrl} target="_blank" rel="noreferrer">Préparer mon itinéraire ↗</a></div>
          {isForce && <div><h3>Teste la salle</h3><p className="discipline__price">{site.registration.trialPrice}<small> la séance</small></p><p>Préviens-nous à l’avance pour organiser ta venue et découvrir la salle.</p><a className="discipline__button" href={`mailto:${site.contact.email}`}>Organiser ma séance</a></div>}
        </div> : <div className="discipline__contact"><h3>Parlons de ta première séance</h3><p>Contacte le club pour connaître le groupe adapté, les horaires, le lieu des séances et les modalités d’essai {isWrestling ? 'en lutte' : 'en musculation'}.</p><a className="discipline__button" href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Renseignements ' + discipline.title)}`}>Me renseigner sur la {discipline.title.toLowerCase()}</a></div>}
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
