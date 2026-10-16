import { resolveSiteUrl } from '../utils/site-url';

// Les informations du club se modifient ici, sans toucher aux composants.
export const site = {
  name: 'Club Athlétique Nantais',
  url: resolveSiteUrl(import.meta.env.VITE_SITE_URL),
  description: 'Club de powerlifting et force athlétique, musculation et lutte à Nantes : découvre les activités du Club Athlétique Nantais, les informations pratiques et les inscriptions.',
  contact: {
    email: 'cannantais@gmail.com',
    address: '68 rue de la Durantière, 44100 Nantes',
    mapUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x4805ed4273092a11:0x5761dfc27104bf6f?sa=X&ved=1t:8290&ictx=111',
    mapEmbedUrl: 'https://www.google.com/maps?q=68%20rue%20de%20la%20Duranti%C3%A8re%2C%2044100%20Nantes&output=embed',
    instagramUrl: 'https://www.instagram.com/club_athletique_nantais',
  },
  // Données structurées pour le référencement local, rendues sur chaque page.
  schema: {
    sports: ['Force athlétique', 'Powerlifting', 'Musculation', 'Lutte'],
    postalAddress: { streetAddress: '68 rue de la Durantière', addressLocality: 'Nantes', postalCode: '44100', addressCountry: 'FR' },
    sameAs: [
      'https://www.instagram.com/club_athletique_nantais',
      'https://www.instagram.com/can_powerlifting/',
      'https://www.instagram.com/can_lutte_nantes/',
    ],
  },
  activities: [
    { title: 'Haltérophilie', eyebrow: 'Mouvements olympiques', text: 'Apprendre et perfectionner les mouvements olympiques dans un espace équipé.' },
    { title: 'Force athlétique', eyebrow: 'Powerlifting', text: 'Développer sa force sur le squat, le développé couché et le soulevé de terre.' },
    { title: 'Lutte', eyebrow: 'Libre & gréco-romaine', text: 'Lutte libre et gréco-romaine, avec des pratiques adaptées aux différents âges.' },
    { title: 'Musculation', eyebrow: 'La salle près de chez toi', text: 'Un espace complet pour une pratique encadrée ou autonome.' },
    { title: 'Cours collectifs', eyebrow: 'Temps collectifs', text: 'Des temps collectifs pour progresser ensemble au sein du club.' },
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
    eyebrow: 'Powerlifting · Lutte · Musculation',
    introduction: 'Découvre les activités du Club Athlétique Nantais, un collectif qui accueille aussi bien les débutants que les compétiteurs.',
  },
  // Développeur du site, contact public pour les modifications ou la reprise du projet.
  developer: {
    name: 'Ferdinand Goor',
    email: 'ferdinand.goor@gmail.com',
    websiteUrl: 'https://ferd.fr/developpeur-freelance',
    githubUrl: 'https://github.com/ferdinandgoor/club-athletique-nantais',
  },
};
