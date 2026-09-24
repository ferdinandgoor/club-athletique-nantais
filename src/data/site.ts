import { resolveSiteUrl } from '../utils/site-url';

// Les informations du club se modifient ici, sans toucher aux composants.
export const site = {
  name: 'Club Athlétique Nantais',
  url: resolveSiteUrl(import.meta.env.VITE_SITE_URL),
  description: 'Force athlétique et powerlifting à Nantes. Découvrez le Club Athlétique Nantais, sa salle et ses informations pratiques.',
  contact: {
    email: 'cannantais@gmail.com',
    address: '68 rue de la Durantière, 44100 Nantes',
    mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x4805ed4273092a11:0x5761dfc27104bf6f?sa=X&ved=1t:8290&ictx=111',
    mapEmbedUrl: 'https://www.google.com/maps?q=68%20rue%20de%20la%20Duranti%C3%A8re%2C%2044100%20Nantes&output=embed',
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
    appStoreUrl: 'https://apps.apple.com/fr/app/monclub-app/id1489706209',
    playStoreUrl: 'https://play.google.com/store/apps/details?hl=fr&id=eu.teamr.custom',
  },
  gallery: [
    { src: '/images/competition-force-athletique-01.jpg', width: 1170, height: 1463, alt: 'Une athlète du CAN se prépare à passer sous la barre de squat en compétition' },
    { src: '/images/competition-force-athletique-02.jpg', width: 1170, height: 1463, alt: 'Un athlète du CAN se concentre devant une barre chargée en compétition' },
    { src: '/images/competition-force-athletique-03.jpg', width: 1170, height: 1463, alt: 'Un athlète du CAN et son entraîneur se félicitent après un passage' },
    { src: '/images/competition-force-athletique-04.jpg', width: 1170, height: 1463, alt: 'Une athlète échange avec son entraîneur pendant la compétition' },
    { src: '/images/competition-force-athletique-05.jpg', width: 1170, height: 1463, alt: 'Un athlète du CAN se prépare près du plateau de développé couché' },
    { src: '/images/competition-force-athletique-06.jpg', width: 1170, height: 1463, alt: 'Un athlète du CAN célèbre la réussite de son soulevé de terre' },
    { src: '/images/competition-force-athletique-07.jpg', width: 1170, height: 1463, alt: 'Un athlète du CAN réalise un squat encouragé par les assistants de plateau' },
  ],
  home: {
    eyebrow: 'Powerlifting à Nantes',
    introduction: 'Découvre la force athlétique dans une salle équipée, auprès d’un collectif qui accueille aussi bien les débutants que les compétiteurs.',
  },
};
