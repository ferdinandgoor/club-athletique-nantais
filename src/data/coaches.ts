// Coachs et animatrices du club disposant d'une page personnelle.
// Sacha Turpin et Tengiz Dalakishvili confirmés par le propriétaire du dépôt le 15 octobre 2026
// (Instagram personnels fournis le même jour : @sacha_powerlift, @tengiz_dalakishvili).
// Véronique L’hotellier, animatrice des cours communs : photo et demande de publication
// transmises par Sacha Turpin, président, le 16 octobre 2026 (uniquement sa page personnelle,
// pas la page « Qui sommes-nous ? » qui liste les membres du bureau).
// `clubRole` ne concerne que les membres du bureau : `clubRoleSince` donne alors
// leur ancienneté dans le bureau, affichée sur la page personnelle ; une animatrice
// sans fonction au bureau ne renseigne ni l'un ni l'autre.
// `courseLead` distingue le prof attitré d’un cours (lutte, cours communs : la page
// de la discipline le met en avant) du coach individuel sollicité sur demande
// (force athlétique : la page propose simplement de le trouver).
export type CoachData = {
  id: string;
  path: string;
  name: string;
  coachRole: string;
  clubRole?: string;
  clubRoleSince?: string;
  courseLead?: boolean;
  discipline: { id: string; title: string; noun: string; path: string };
  instagram?: string;
  instagramLabel?: string;
  photo: { src: string; width: number; height: number; alt: string };
  introduction: string;
  roleDescription: string;
};

export const coaches: CoachData[] = [
  {
    id: 'sacha-turpin',
    path: '/coach-sacha-turpin/',
    name: 'Sacha Turpin',
    clubRole: 'Président du club',
    clubRoleSince: 'Depuis l’AG du 31 octobre 2025.',
    coachRole: 'Coach de force athlétique',
    discipline: { id: 'force-athletique', title: 'Force athlétique', noun: 'la force athlétique', path: '/force-athletique/' },
    instagram: 'sacha_powerlift',
    instagramLabel: 'Le contacter pour du coaching ↗',
    photo: { src: '/images/bureau-sacha-turpin.jpg', width: 908, height: 1210, alt: 'Portrait de Sacha Turpin, président et coach de force athlétique du Club Athlétique Nantais' },
    introduction: 'Président du Club Athlétique Nantais, Sacha Turpin accompagne les athlètes de force athlétique qui le souhaitent, dans une salle où chacun s’entraîne en autonomie.',
    roleDescription: 'Il coache les athlètes de force athlétique qui le souhaitent ; les entraînements de la salle se pratiquent en autonomie.',
  },
  {
    id: 'tengiz-dalakishvili',
    path: '/coach-tengiz-dalakishvili/',
    name: 'Tengiz Dalakishvili',
    clubRole: 'Vice-président du club',
    clubRoleSince: 'Depuis l’AG du 31 octobre 2025.',
    coachRole: 'Coach de lutte',
    courseLead: true,
    discipline: { id: 'lutte', title: 'Lutte', noun: 'la lutte', path: '/lutte/' },
    instagram: 'tengiz_dalakishvili',
    instagramLabel: 'Suis-le sur Instagram ↗',
    photo: { src: '/images/bureau-tengiz-dalakishvili.jpg', width: 908, height: 1210, alt: 'Portrait de Tengiz Dalakishvili, vice-président et coach de lutte du Club Athlétique Nantais' },
    introduction: 'Vice-président du Club Athlétique Nantais, Tengiz Dalakishvili encadre les entraînements de lutte du club.',
    roleDescription: 'Il encadre les entraînements de lutte du club.',
  },
  {
    id: 'veronique-lhotellier',
    path: '/coach-veronique-lhotellier/',
    name: 'Véronique L’hotellier',
    coachRole: 'Coach des cours communs',
    courseLead: true,
    discipline: { id: 'cours-communs', title: 'Cours communs', noun: 'les cours communs', path: '/cours-communs/' },
    photo: { src: '/images/coach-veronique-lhotellier.jpg', width: 908, height: 1210, alt: 'Portrait de Véronique L’hotellier, animatrice des cours communs du Club Athlétique Nantais' },
    introduction: 'Véronique L’hotellier anime les cours communs du Club Athlétique Nantais : gym renforcement musculaire puis stretching, chaque jeudi soir.',
    roleDescription: 'Elle encadre chaque jeudi soir la gym renforcement musculaire puis le stretching, deux temps collectifs complémentaires.',
  },
];
