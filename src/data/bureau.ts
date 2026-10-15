// Composition du bureau, issue du document officiel de l'AG du 1er octobre 2026.
export const bureau = {
  assembly: {
    date: '1er octobre 2026',
    introduction: 'À l’issue de l’Assemblée Générale du 1er octobre 2026, le conseil d’administration a été élu à l’unanimité.',
    note: 'Cette équipe aura à cœur de poursuivre le développement du club et de porter ses projets aux côtés des adhérents, des bénévoles et des entraîneurs.',
  },
  members: [
    { role: 'Président', name: 'Sacha Turpin', photo: { src: '/images/bureau-sacha-turpin.jpg', width: 908, height: 1210, alt: 'Portrait de Sacha Turpin, président du Club Athlétique Nantais' } },
    { role: 'Vice-président', name: 'Tengiz Dalakishvili', photo: { src: '/images/bureau-tengiz-dalakishvili.jpg', width: 908, height: 1210, alt: 'Portrait de Tengiz Dalakishvili, vice-président du Club Athlétique Nantais' } },
    { role: 'Trésorier', name: 'Adrien Bolle', photo: { src: '/images/bureau-adrien-bolle.jpg', width: 908, height: 1210, alt: 'Portrait d’Adrien Bolle, trésorier du Club Athlétique Nantais' } },
    { role: 'Trésorière adjointe', name: 'Emma Houédé', photo: { src: '/images/bureau-emma-houede.jpg', width: 908, height: 1210, alt: 'Portrait d’Emma Houédé, trésorière adjointe du Club Athlétique Nantais' } },
    { role: 'Secrétaire générale', name: 'Maryne Melart', photo: { src: '/images/bureau-maryne-melart.jpg', width: 908, height: 1210, alt: 'Portrait de Maryne Melart, secrétaire générale du Club Athlétique Nantais' } },
    { role: 'Secrétaire adjointe', name: 'Marie Boennec', photo: { src: '/images/bureau-marie-boennec.jpg', width: 908, height: 1210, alt: 'Portrait de Marie Boennec, secrétaire adjointe du Club Athlétique Nantais' } },
  ],
} as const;
