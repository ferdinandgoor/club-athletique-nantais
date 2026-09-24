import { site } from '../../data/site';
import './Home.scss';

export function Home() {
  return (
    <section className="home" aria-labelledby="home-title">
      <p className="home__eyebrow">{site.home.eyebrow}</p>
      <h1 id="home-title">{site.home.title}</h1>
      <p className="home__introduction">{site.home.introduction}</p>
      <p className="home__notice">{site.home.notice}</p>
    </section>
  );
}
