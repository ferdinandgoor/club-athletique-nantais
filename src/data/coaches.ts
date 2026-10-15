// Coachs du club confirmés par le propriétaire du dépôt le 15 octobre 2026.
// Instagram personnels fournis le 15 octobre 2026 :
// Sacha Turpin : @sacha_powerlift (contact pour du coaching),
// Tengiz Dalakishvili : @tengiz_dalakishvili.
export const coaches = [
  {
    id: 'sacha-turpin',
    path: '/coach-sacha-turpin/',
    name: 'Sacha Turpin',
    clubRole: 'Président du club',
    coachRole: 'Coach de force athlétique',
    discipline: { id: 'force-athletique', title: 'Force athlétique', path: '/force-athletique/' },
    instagram: 'sacha_powerlift',
    instagramLabel: 'Le contacter pour du coaching ↗',
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
    instagram: 'tengiz_dalakishvili',
    instagramLabel: 'Suis-le sur Instagram ↗',
    photo: { src: '/images/bureau-tengiz-dalakishvili.jpg', width: 908, height: 1210, alt: 'Portrait de Tengiz Dalakishvili, vice-président et coach de lutte du Club Athlétique Nantais' },
    introduction: 'Vice-président du Club Athlétique Nantais, Tengiz Dalakishvili encadre les entraînements de lutte du club.',
  },
] as const;
export type CoachData = (typeof coaches)[number];
