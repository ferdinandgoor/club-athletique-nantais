// Parcours confirmé par les captures du tutoriel fournies par le club.
export const registrationSteps = [
  { kind: 'code', title: 'Entre le code du club', description: 'Ouvre MonClub, choisis « J’ai un code club », puis saisis CANNANTES et valide.' },
  { kind: 'profile', title: 'Crée ton profil', description: 'Renseigne les informations demandées pour ton profil adulte ou enfant, puis valide.' },
  { kind: 'club', title: 'Retrouve le CAN', description: 'Dans tes clubs, ouvre « Club Athlétique Nantais », puis appuie sur « Nos formules ».' },
  { kind: 'formula', title: 'Choisis ton activité', description: 'Sélectionne « Musculation », « Force athlétique », « Lutte », « Lutte baby » ou « Lutte enfant », puis la formule qui correspond à ta pratique. Les tarifs sont indiqués dans l’application.' },
  { kind: 'payment', title: 'Finalise ton inscription', description: 'Ajoute ta photo et les documents demandés, puis choisis ton mode de paiement. Pour les espèces, la Carte blanche ou le Pass’Sport, sélectionne le paiement au club.' },
] as const;
