import { useState } from 'react';
import { site } from '../../data/site';
import { registrationSteps } from '../../data/registration';
import './RegistrationGuide.scss';

export function RegistrationGuide() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(site.registration.clubCode);
      setCopyStatus('Code copié !');
    } catch {
      setCopyStatus('Sélectionne le code CANNANTES pour le copier.');
    }
  }

  return (
    <section className="registration-guide" id="inscription" aria-labelledby="registration-title">
      <h2 className="registration-guide__hidden" id="registration-title">Inscription au Club Athlétique Nantais</h2>
      <ol className="registration-guide__list">
        <li className="registration-guide__download" data-reveal>
          <div className="registration-guide__intro">
            <span className="registration-guide__number" aria-hidden="true">01</span>
            <h3>Télécharge MonClub</h3>
            <p>Ton inscription commence ici. Installe l’application sur ton téléphone, puis suis le guide.</p>
            <p className="registration-guide__note">Déjà un compte ? Connecte-toi dans l’application avec tes identifiants.</p>
          </div>
          <div className="registration-guide__app">
            <img src="/images/monclub-app.png" alt="Logo de l’application MonClub" width="512" height="512" />
          <div className="registration-guide__store-links" aria-label="Télécharger MonClub">
            <a href={site.registration.appStoreUrl} target="_blank" rel="noreferrer" aria-label="Télécharger MonClub dans l’App Store">
              <svg className="registration-guide__store-logo registration-guide__store-logo--apple" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.1 12.5c0-2.8 2.3-4.1 2.4-4.2a5.1 5.1 0 0 0-4-2.2c-1.7-.2-3.3 1-4.2 1-.9 0-2.3-1-3.8-.9a5.6 5.6 0 0 0-4.7 2.9c-2 3.5-.5 8.7 1.4 11.5.9 1.4 2 3 3.5 2.9 1.4-.1 2-1 3.7-1s2.2 1 3.7 1c1.5 0 2.5-1.4 3.4-2.8a12.6 12.6 0 0 0 1.6-3.3 4.9 4.9 0 0 1-3-4.9ZM14.4 4.3A4.9 4.9 0 0 0 15.5.8a5 5 0 0 0-3.3 1.7A4.7 4.7 0 0 0 11 5.9a4.1 4.1 0 0 0 3.4-1.6Z" /></svg>
              <span><small>Télécharger dans</small><strong>l’App Store</strong></span>
            </a>
            <a href={site.registration.playStoreUrl} target="_blank" rel="noreferrer" aria-label="Télécharger MonClub sur Google Play">
              <svg className="registration-guide__store-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#34a853" d="M3.4 2.3A2 2 0 0 0 3 3.5v17a2 2 0 0 0 .4 1.2l9.4-9.7-9.4-9.7Z"/><path fill="#4285f4" d="m16 8.7-3.2 3.3 3.2 3.3 4-2.3c1.2-.7 1.2-1.3 0-2l-4-2.3Z"/><path fill="#fbbc04" d="m3.4 21.7 12.6-6.4-3.2-3.3-9.4 9.7Z"/><path fill="#ea4335" d="M3.4 2.3 12.8 12 16 8.7 3.4 2.3Z"/></svg>
              <span><small>Disponible sur</small><strong>Google Play</strong></span>
            </a>
          </div>
          </div>
        </li>
        {registrationSteps.map((step, index) => (
          <li className="registration-guide__step" data-reveal key={step.title}>
            <div className="registration-guide__screen" aria-hidden="true">
              <span className="registration-guide__speaker" />
              <span className="registration-guide__screen-label">MONCLUB / {String(index + 2).padStart(2, '0')}</span>
              {step.kind === 'code' && <><span className="registration-guide__mock-link">J’ai un code club →</span><small>Code club</small><strong className="registration-guide__code">{site.registration.clubCode}</strong><span className="registration-guide__mock-button">Valider →</span></>}
              {step.kind === 'profile' && <><span className="registration-guide__avatar">＋</span><strong>Créer mon profil</strong><span className="registration-guide__field">Prénom · Nom</span><span className="registration-guide__field">Date de naissance</span><span className="registration-guide__mock-button">Valider le profil →</span></>}
              {step.kind === 'club' && <><img src="/images/logo-can-officiel.png" width="1200" height="1200" alt="" /><strong>Club Athlétique Nantais</strong><span className="registration-guide__mock-button">Nos formules →</span></>}
              {step.kind === 'formula' && <><span className="registration-guide__pill">Musculation · Force · Lutte</span><strong>Choisis ta formule</strong><span className="registration-guide__choice">Ta pratique<br /><small>Ta formule d’adhésion</small></span><span className="registration-guide__mock-button">Continuer →</span></>}
              {step.kind === 'payment' && <><span className="registration-guide__avatar">✓</span><strong>Dernière étape</strong><span className="registration-guide__field">＋ Ajouter ma photo</span><span className="registration-guide__field">○ Choisir mon paiement</span><span className="registration-guide__mock-button">Finaliser l’inscription →</span></>}
            </div>
            <div className="registration-guide__caption">
              <span className="registration-guide__number" aria-hidden="true">{String(index + 2).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {step.kind === 'code' && <><button className="registration-guide__copy" type="button" onClick={() => void copyCode()}>Copier {site.registration.clubCode} <span aria-hidden="true">⧉</span></button><span className="registration-guide__status" role="status">{copyStatus}</span></>}
            </div>
          </li>
        ))}
      </ol>
      <p className="registration-guide__help">Besoin d’un coup de main ? <a href={`mailto:${site.contact.email}`}>Contacte le club</a>.</p>
    </section>
  );
}
