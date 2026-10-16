import { pricing } from '../../data/pricing';
import { site } from '../../data/site';
import './Pricing.scss';

export function Pricing() {
  const gymHours = site.hours.map((item) => `${item.days} ${item.times}`).join(' ; ');
  return (
    <article className="pricing">
      <header className="pricing__hero">
        <nav aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true"> / </span><span aria-current="page">Tarifs</span></nav>
        <p className="pricing__eyebrow">{pricing.season}</p>
        <h1>Tarifs et formules</h1>
        <p className="pricing__introduction">Compare les formules du Club Athlétique Nantais : le tarif de chaque adhésion et les accès inclus, pour choisir en connaissance de cause.</p>
        <a className="pricing__button" href="/#inscription">S’inscrire avec MonClub</a>
      </header>
      <section className="pricing__section" aria-labelledby="table-title">
        <h2 id="table-title">Ce que comprend chaque formule</h2>
        <div className="pricing__table-wrap" role="region" aria-label="Formules et accès inclus, défilement horizontal" tabIndex={0}>
          <table className="pricing__table">
            <caption className="pricing__sr-only">Tarifs et accès inclus par formule, {pricing.season.toLowerCase()}.</caption>
            <thead>
              <tr>
                <th scope="col">Formule</th>
                <th scope="col">Tarif</th>
                {pricing.access.map((item) => <th key={item.id} scope="col">{item.label}<small>{item.id === 'muscu' ? gymHours : item.note}</small></th>)}
              </tr>
            </thead>
            <tbody>
              {pricing.offers.map((offer) => (
                <tr key={offer.id}>
                  <th scope="row">{offer.name}{offer.note && <small>{offer.note}</small>}</th>
                  <td className="pricing__price">{offer.price}</td>
                  {pricing.access.map((item) => {
                    const included = offer.includes.includes(item.id);
                    return (
                      <td key={item.id} data-included={included}>
                        <span aria-hidden="true">{included ? '✓' : '—'}</span>
                        <span className="pricing__sr-only">{included ? 'Oui' : 'Non'}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pricing__footnote">* {pricing.footnote} Les entraînements de lutte suivent le planning publié sur la <a href="/lutte/">page Lutte</a>, les cours collectifs ont lieu chaque jeudi de 18 h 30 à 20 h et la salle de musculation est accessible sur ses créneaux d’ouverture.</p>
      </section>
      <section className="pricing__section pricing__help" data-reveal aria-labelledby="help-title">
        <h2 id="help-title">Choisir ou vérifier sa formule</h2>
        <ul className="pricing__links">
          <li><a href="/lutte/">Voir le planning des entraînements de lutte</a></li>
          <li><a href="/cours-collectifs/">Découvrir les cours collectifs du jeudi</a></li>
          <li><a href="/musculation/">Découvrir la salle de musculation</a></li>
        </ul>
        <p>Une question sur une formule ou un tarif ? Écris-nous à <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. L’inscription se fait avec MonClub, depuis le guide d’inscription.</p>
        <a className="pricing__button" href="/#inscription">Voir le guide d’inscription</a>
      </section>
    </article>
  );
}
