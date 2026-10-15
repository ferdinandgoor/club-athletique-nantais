// Informations issues des contenus MonClub et des visuels fournis par le club.
export const disciplines = [
  {
    id: 'musculation', path: '/musculation/', title: 'Musculation', subtitle: 'La salle près de chez toi',
    metaTitle: 'Salle de musculation à Nantes',
    summary: 'Salle de musculation à Nantes : découvre celle du Club Athlétique Nantais, à proximité de Saint-Herblain, et rejoins le club pour tes entraînements.',
    introduction: 'Envie de pratiquer la musculation à Nantes ? Découvre la salle du Club Athlétique Nantais, à l’ouest de la ville, et prépare ta première venue avec nous.',
    heading: 'Découvre la salle',
    details: [
      { title: 'Ton entraînement', text: 'La musculation est une activité à part entière au CAN. Tu peux la choisir directement dans MonClub.' },
      { title: 'Le matériel', text: 'La salle dispose de machines de musculation, de bancs et de barres. Contacte-nous pour vérifier la disponibilité du matériel qui correspond à ta pratique.' },
      { title: 'Ton adhésion', text: 'Retrouve les formules et leurs tarifs dans MonClub, en sélectionnant « Musculation ».' },
    ],
    prices: [
      { label: 'Musculation / force athlétique loisir / haltérophilie loisir', amount: '170 €', note: '' },
      { label: 'Cours communs', amount: '170 €', note: '' },
    ],
  },
  {
    id: 'force-athletique', path: '/force-athletique/', title: 'Force athlétique', subtitle: 'Powerlifting',
    metaTitle: 'Force athlétique & Powerlifting à Nantes',
    summary: 'Powerlifting à Nantes : squat, développé couché, soulevé de terre. Découvre la force athlétique au CAN, du premier entraînement à la compétition.',
    introduction: 'Développe ta force en powerlifting à Nantes, dans une salle équipée, auprès d’un collectif qui accueille aussi bien les débutants que les compétiteurs.',
    heading: 'Powerlifting : trois mouvements, une discipline',
    details: [
      { title: 'Squat', text: 'Le mouvement de flexion de jambes avec une barre sur les épaules.' },
      { title: 'Développé couché', text: 'Un mouvement de poussée avec une barre, allongé sur un banc.' },
      { title: 'Soulevé de terre', text: 'Le mouvement qui consiste à soulever une barre depuis le sol.' },
    ],
    prices: [
      { label: 'Force athlétique compétition', amount: '200 €', note: '' },
      { label: 'Haltérophilie compétition', amount: '200 €', note: '' },
      { label: 'Musculation / force athlétique loisir / haltérophilie loisir', amount: '170 €', note: '' },
      { label: 'Cours communs', amount: '170 €', note: '' },
    ],
  },
  {
    id: 'lutte', path: '/lutte/', title: 'Lutte', subtitle: 'Libre & gréco-romaine',
    metaTitle: 'Lutte libre et gréco-romaine à Nantes',
    summary: 'Club de lutte à Nantes : lutte libre et gréco-romaine au CAN, avec les catégories lutte, lutte baby et lutte enfant dans MonClub.',
    introduction: 'Le CAN, club de lutte à Nantes, propose la lutte libre et la lutte gréco-romaine. Retrouve la section lutte et prépare ta première venue avec le club.',
    heading: 'Trouve ta catégorie',
    details: [
      { title: 'Lutte', text: 'La discipline figure parmi les activités du Club Athlétique Nantais dans MonClub.' },
      { title: 'Lutte baby', text: 'Une catégorie dédiée figure dans MonClub. Contacte le club pour connaître les âges et les créneaux correspondants.' },
      { title: 'Lutte enfant', text: 'Retrouve cette catégorie dans MonClub et renseigne-toi auprès du club pour choisir le groupe adapté.' },
    ],
    prices: [
      { label: 'Lutte baby (4 à 6 ans)', amount: '200 €', note: '' },
      { label: 'Lutte enfant (7 à 13 ans)', amount: '200 €', note: '' },
      { label: 'Lutte adulte (à partir de 14 ans)', amount: '250 €', note: 'accès muscu inclus' },
      { label: 'Lutte féminine (à partir de 14 ans)', amount: '170 €', note: 'accès muscu inclus' },
    ],
  },
] as const;
export type DisciplineData = (typeof disciplines)[number];
