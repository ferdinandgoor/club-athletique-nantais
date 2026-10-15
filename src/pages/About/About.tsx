import { bureau } from '../../data/bureau';
import { disciplines } from '../../data/disciplines';
import './About.scss';

export function About() {
  return (
    <article className="about">
      <header className="about__hero">
        <nav aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true"> / </span><span aria-current="page">Qui sommes-nous ?</span></nav>
        <p className="about__eyebrow">L’équipe du club</p>
        <h1>Qui sommes-nous ?</h1>
        <p className="about__introduction">Le Club Athlétique Nantais est porté par une équipe élue par les adhérents lors de l’Assemblée Générale.</p>
        <a className="about__button" href="/#inscription">Rejoindre le club</a>
      </header>
      <section className="about__section" aria-labelledby="board-title">
        <header data-reveal>
          <p className="about__eyebrow about__eyebrow--dark">Assemblée Générale {bureau.assembly.date}</p>
          <h2 id="board-title">Le bureau directeur</h2>
          <p className="about__lead">{bureau.assembly.introduction} {bureau.assembly.note}</p>
        </header>
        <ul className="about__board">
          {bureau.members.map((member) => (
            <li className="about__member" key={member.name} data-reveal>
              <img className="about__member-photo" src={member.photo.src} width={member.photo.width} height={member.photo.height} alt={member.photo.alt} />
              <p className="about__eyebrow about__eyebrow--dark">{member.role}</p>
              <h3>{member.name}</h3>
            </li>
          ))}
        </ul>
      </section>
      <section className="about__section about__join" data-reveal aria-labelledby="join-title">
        <h2 id="join-title">Envie de nous rejoindre ?</h2>
        <p>Tu peux découvrir nos activités, venir voir la salle ou t’inscrire directement avec MonClub.</p>
        <div className="about__actions">
          <a className="about__button" href="/#inscription">S’inscrire avec MonClub</a>
          {disciplines.map((discipline) => <a className="about__other" href={discipline.path} key={discipline.id}>Découvrir la {discipline.title.toLowerCase()} →</a>)}
        </div>
      </section>
    </article>
  );
}
