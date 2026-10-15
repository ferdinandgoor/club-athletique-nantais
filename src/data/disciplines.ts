// Informations issues des contenus MonClub et des visuels fournis par le club.
// `noun` donne le titre avec son article pour les phrases publiques (« la force athlétique »).
export const disciplines = [
  {
    id: 'force-athletique', path: '/force-athletique/', title: 'Force athlétique', subtitle: 'Powerlifting', noun: 'la force athlétique',
    metaTitle: 'Force athlétique & Powerlifting à Nantes',
    summary: 'Powerlifting à Nantes : squat, développé couché, soulevé de terre. Découvre la force athlétique au CAN, du premier entraînement à la compétition.',
    introduction: 'Développe ta force en powerlifting à Nantes, dans une salle équipée, auprès d’un collectif qui accueille aussi bien les débutants que les compétiteurs.',
    heading: 'Powerlifting : trois mouvements, une discipline',
    joinSelection: '« Force athlétique »',
    details: [
      { title: 'Squat', text: 'Le mouvement de flexion de jambes avec une barre sur les épaules.' },
      { title: 'Développé couché', text: 'Un mouvement de poussée avec une barre, allongé sur un banc.' },
      { title: 'Soulevé de terre', text: 'Le mouvement qui consiste à soulever une barre depuis le sol.' },
    ],
    prices: [
      { label: 'Force athlétique compétition', amount: '200 €', note: '' },
      { label: 'Haltérophilie compétition', amount: '200 €', note: '' },
      { label: 'Musculation / force athlétique loisir / haltérophilie loisir', amount: '170 €', note: '' },
      { label: 'Cours communs', amount: '170 €', note: 'accès salle de muscu inclus' },
    ],
  },
  {
    id: 'lutte', path: '/lutte/', title: 'Lutte', subtitle: 'Libre & gréco-romaine', noun: 'la lutte',
    metaTitle: 'Lutte libre et gréco-romaine à Nantes',
    summary: 'Club de lutte à Nantes : lutte libre et gréco-romaine au CAN, avec les catégories lutte, lutte baby et lutte enfant dans MonClub.',
    introduction: 'Le CAN, club de lutte à Nantes, propose la lutte libre et la lutte gréco-romaine. Retrouve la section lutte et prépare ta première venue avec le club.',
    heading: 'Trouve ta catégorie',
    joinSelection: 'la catégorie « Lutte », « Lutte baby » ou « Lutte enfant » correspondant à ton profil',
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
  {
    id: 'musculation', path: '/musculation/', title: 'Musculation', subtitle: 'La salle près de chez toi', noun: 'la musculation',
    metaTitle: 'Salle de musculation à Nantes',
    summary: 'Salle de musculation à Nantes : découvre celle du Club Athlétique Nantais, à proximité de Saint-Herblain, et rejoins le club pour tes entraînements.',
    introduction: 'Envie de pratiquer la musculation à Nantes ? Découvre la salle du Club Athlétique Nantais, à l’ouest de la ville, et prépare ta première venue avec nous.',
    heading: 'Découvre la salle',
    joinSelection: '« Musculation »',
    details: [
      { title: 'Ton entraînement', text: 'La musculation est une activité à part entière au CAN. Tu peux la choisir directement dans MonClub.' },
      { title: 'Le matériel', text: 'La salle dispose de machines de musculation, de bancs et de barres. Contacte-nous pour vérifier la disponibilité du matériel qui correspond à ta pratique.' },
      { title: 'Ton adhésion', text: 'Retrouve les formules et leurs tarifs dans MonClub, en sélectionnant « Musculation ».' },
    ],
    prices: [
      { label: 'Musculation / force athlétique loisir / haltérophilie loisir', amount: '170 €', note: '' },
      { label: 'Cours communs', amount: '170 €', note: 'accès salle de muscu inclus' },
    ],
  },
  {
    id: 'halterophilie', path: '/halterophilie/', title: 'Haltérophilie', subtitle: 'Mouvements olympiques', noun: 'l’haltérophilie',
    metaTitle: 'Haltérophilie à Nantes',
    summary: 'Apprendre et perfectionner les mouvements olympiques dans un espace équipé : découvre l’haltérophilie au Club Athlétique Nantais.',
    introduction: 'Découvre l’haltérophilie au Club Athlétique Nantais et prépare ta première venue en contactant le club.',
    heading: 'Deux mouvements, une discipline',
    joinSelection: '« Haltérophilie »',
    details: [
      { title: 'Arraché', text: 'Le mouvement qui consiste à soulever la barre du sol au-dessus de la tête en un seul geste.' },
      { title: 'Épaulé-jeté', text: 'Le mouvement en deux temps : amener la barre aux épaules, puis la pousser au-dessus de la tête.' },
      { title: 'Ton adhésion', text: 'L’adhésion permet d’avoir sa licence compétition.' },
    ],
    prices: [
      { label: 'Haltérophilie compétition', amount: '200 €', note: '' },
      { label: 'Musculation / force athlétique loisir / haltérophilie loisir', amount: '170 €', note: '' },
    ],
  },
  {
    id: 'pilates', path: '/pilates/', title: 'Pilates', subtitle: 'Renforcement et mobilité', noun: 'le Pilates',
    metaTitle: 'Pilates à Nantes',
    summary: 'Renforcement, mobilité et maîtrise du mouvement : le Pilates fait partie des activités du Club Athlétique Nantais.',
    introduction: 'Le Pilates fait partie des activités du Club Athlétique Nantais. Contacte le club pour préparer ta venue et connaître les modalités.',
    heading: 'Renforcement, mobilité, maîtrise',
    joinSelection: '« Pilates »',
    details: [
      { title: 'Renforcement', text: 'Des exercices pour renforcer le corps.' },
      { title: 'Mobilité', text: 'Des exercices pour travailler la mobilité.' },
      { title: 'Maîtrise du mouvement', text: 'Apprendre à contrôler ses mouvements.' },
    ],
    prices: [],
  },
  {
    id: 'cours-communs', path: '/cours-communs/', title: 'Cours communs', subtitle: 'Temps collectifs', noun: 'les cours communs',
    metaTitle: 'Cours communs à Nantes',
    summary: 'Chaque jeudi soir, gym renforcement musculaire puis stretching : les cours communs du Club Athlétique Nantais pour progresser ensemble.',
    introduction: 'Les cours communs réunissent les adhérents du Club Athlétique Nantais chaque jeudi soir autour de deux temps collectifs.',
    heading: 'Deux cours, le jeudi soir',
    joinSelection: '« Cours communs »',
    details: [
      { title: 'Gym renforcement musculaire', text: 'Jeudi, 18 h 30–19 h 15. Le renforcement musculaire est une activité physique qui permet de travailler les muscles du corps en améliorant l’équilibre, la posture et la force. Il peut se pratiquer avec le poids du corps ou du petit matériel.' },
      { title: 'Stretching', text: 'Jeudi, 19 h 15–20 h 00. Exercices d’étirements permettant d’améliorer la souplesse tout en travaillant en douceur.' },
      { title: 'Deux activités complémentaires', text: 'Deux activités différentes mais complémentaires pour garder un corps fort, souple et en bonne santé.' },
    ],
    prices: [
      { label: 'Cours communs', amount: '170 €', note: 'accès salle de muscu inclus' },
    ],
  },
] as const;
export type DisciplineData = (typeof disciplines)[number];
