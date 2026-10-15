// Coachs du club confirmés par le propriétaire du dépôt le 15 octobre 2026.
// Les identifiants Instagram personnels restent à fournir :
// le lien Instagram n'apparaît sur la page qu'une fois `instagram` renseigné.
export const coaches = [
  {
    id: 'sacha-turpin',
    path: '/coach-sacha-turpin/',
    name: 'Sacha Turpin',
    clubRole: 'Président du club',
    coachRole: 'Coach de force athlétique',
    discipline: { id: 'force-athletique', title: 'Force athlétique', path: '/force-athletique/' },
    instagram: '',
    photo: { src: '/images/bureau-sacha-turpin.jpg', width: 908, height: 1210, alt: 'Portrait de Sacha Turpin, président et coach de force athlétique du Club Athlétique Nantais' },
    introduction: 'Président du Club Athlétique Nantais, Sacha Turpin encadre les entraînements de force athlétique du club.',
  },
  {
    id: 'tengiz-dalakishvili',
    path: '/coach-tengiz-dalakishvili/',
    name: 'Tengiz Dalakishvili',
    clubRole: 'Vice-président du club',
    coachRole: 'Coach de lutte',
    discipline: { id: 'lutte', title: 'Lutte', path: '/lutte/' },
    instagram: '',
    photo: { src: '/images/bureau-tengiz-dalakishvili.jpg', width: 908, height: 1210, alt: 'Portrait de Tengiz Dalakishvili, vice-président et coach de lutte du Club Athlétique Nantais' },
    introduction: 'Vice-président du Club Athlétique Nantais, Tengiz Dalakishvili encadre les entraînements de lutte du club.',
  },
] as const;
export type CoachData = (typeof coaches)[number];
