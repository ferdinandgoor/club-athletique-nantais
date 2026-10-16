import type { CoachData } from '../../data/coaches';
import './Coach.scss';

export function Coach({ coach }: { coach: CoachData }) {
  return (
    <article className="coach">
      <header className="coach__hero">
        <nav aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true"> / </span><a href={coach.discipline.path}>{coach.discipline.title}</a><span aria-hidden="true"> / </span><span aria-current="page">{coach.name}</span></nav>
        <p className="coach__eyebrow">{coach.coachRole}</p>
        <h1>{coach.name}</h1>
        <p className="coach__introduction">{coach.introduction}</p>
        <div className="coach__actions">
          <a className="coach__button" href="/#inscription">S’inscrire avec MonClub</a>
          {coach.instagram && <a className="coach__instagram" href={`https://www.instagram.com/${coach.instagram}/`} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>{coach.instagramLabel}</a>}
        </div>
      </header>
      <section className="coach__section" aria-labelledby="role-title">
        <div className="coach__portrait" data-reveal>
          <img src={coach.photo.src} width={coach.photo.width} height={coach.photo.height} alt={coach.photo.alt} />
        </div>
        <div data-reveal>
          <p className="coach__eyebrow coach__eyebrow--dark">Au sein du club</p>
          <h2 id="role-title">Son rôle au Club Athlétique Nantais</h2>
          <ul className="coach__roles">
            {coach.clubRole && <li><strong>{coach.clubRole}</strong><span>Élu lors de l’Assemblée Générale du 1er octobre 2026.</span></li>}
            <li><strong>{coach.coachRole}</strong><span>{coach.roleDescription}</span></li>
          </ul>
          <a className="coach__button" href={coach.discipline.path}>Découvrir {coach.discipline.noun}</a>
        </div>
      </section>
    </article>
  );
}
