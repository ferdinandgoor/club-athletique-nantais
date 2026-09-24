// Informations issues des contenus MonClub et des visuels fournis par le club.
export const disciplines = [
  {
    id: 'musculation', path: '/musculation/', title: 'Musculation', subtitle: 'La salle près de chez toi',
    summary: 'Découvre la salle de musculation du CAN, à proximité de Saint-Herblain, et rejoins le club pour tes entraînements.',
    introduction: 'Envie de pratiquer la musculation près de chez toi ? Découvre la salle du Club Athlétique Nantais et prépare ta première venue avec nous.',
    heading: 'Découvre la salle',
    details: [
      { title: 'Ton entraînement', text: 'La musculation est une activité à part entière au CAN. Tu peux la choisir directement dans MonClub.' },
      { title: 'Le matériel', text: 'La salle dispose de machines de musculation, de bancs et de barres. Contacte-nous pour vérifier la disponibilité du matériel qui correspond à ta pratique.' },
      { title: 'Ton adhésion', text: 'Retrouve les formules et leurs tarifs dans MonClub, en sélectionnant « Musculation ».' },
    ],
  },
  {
    id: 'force-athletique', path: '/force-athletique/', title: 'Force athlétique', subtitle: 'Powerlifting',
    summary: 'Squat, développé couché, soulevé de terre : découvre la force athlétique, des premiers entraînements à la compétition.',
    introduction: 'Développe ta force dans une salle équipée, auprès d’un collectif qui accueille aussi bien les débutants que les compétiteurs.',
    heading: 'Trois mouvements, une discipline',
    details: [
      { title: 'Squat', text: 'Le mouvement de flexion de jambes avec une barre sur les épaules.' },
      { title: 'Développé couché', text: 'Un mouvement de poussée avec une barre, allongé sur un banc.' },
      { title: 'Soulevé de terre', text: 'Le mouvement qui consiste à soulever une barre depuis le sol.' },
    ],
  },
  {
    id: 'lutte', path: '/lutte/', title: 'Lutte', subtitle: 'Libre & gréco-romaine',
    summary: 'Découvre la lutte au CAN et les catégories proposées dans MonClub : lutte, lutte baby et lutte enfant.',
    introduction: 'Le CAN propose la lutte libre et la lutte gréco-romaine. Retrouve la section lutte et prépare ta première venue avec le club.',
    heading: 'Trouve ta catégorie',
    details: [
      { title: 'Lutte', text: 'La discipline figure parmi les activités du Club Athlétique Nantais dans MonClub.' },
      { title: 'Lutte baby', text: 'Une catégorie dédiée figure dans MonClub. Contacte le club pour connaître les âges et les créneaux correspondants.' },
      { title: 'Lutte enfant', text: 'Retrouve cette catégorie dans MonClub et renseigne-toi auprès du club pour choisir le groupe adapté.' },
    ],
  },
] as const;
export type DisciplineData = (typeof disciplines)[number];
