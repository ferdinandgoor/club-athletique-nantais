import { resolveSiteUrl } from '../utils/site-url';

// Les informations du club se modifient ici, sans toucher aux composants.
export const site = {
  name: 'Club Athlétique Nantais',
  url: resolveSiteUrl(import.meta.env.VITE_SITE_URL),
  description: 'Haltérophilie, force athlétique, lutte et musculation à Nantes. Découvrez le Club Athlétique Nantais, ses disciplines et ses informations pratiques.',
  contact: {
    email: 'cannantais@gmail.com',
    address: '68 rue de la Durantière, 44100 Nantes',
    mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x4805ed4273092a11:0x5761dfc27104bf6f?sa=X&ved=1t:8290&ictx=111',
    instagramUrl: 'https://www.instagram.com/can_powerlifting/',
  },
  activities: [
    { title: 'Haltérophilie', text: 'Apprendre et perfectionner les mouvements olympiques dans un espace équipé.' },
    { title: 'Force athlétique', text: 'Développer sa force sur le squat, le développé couché et le soulevé de terre.' },
    { title: 'Lutte', text: 'Lutte libre et gréco-romaine, avec des pratiques adaptées aux différents âges.' },
    { title: 'Musculation', text: 'Un espace complet pour une pratique encadrée ou autonome.' },
    { title: 'Pilates', text: 'Renforcement, mobilité et maîtrise du mouvement.' },
    { title: 'Cours communs', text: 'Des temps collectifs pour progresser ensemble au sein du club.' },
  ],
  hours: [
    { days: 'Lundi et vendredi', times: '17 h – 21 h' },
    { days: 'Samedi', times: '9 h 30 – 14 h' },
    { days: 'Dimanche', times: '9 h 30 – 12 h' },
  ],
  registration: {
    service: 'MonClub',
    clubCode: 'CANNANTES',
    trialPrice: '10 €',
  },
  home: {
    eyebrow: 'Force · mouvement · collectif',
    title: 'Club Athlétique Nantais',
    introduction: 'Un club nantais où l’on pratique la force, la technique et le mouvement, du loisir à la compétition.',
  },
};
