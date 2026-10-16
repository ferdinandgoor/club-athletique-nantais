// Tarifs et accès inclus par formule, saison 2026–2027.
// Tableau fourni par Sacha Turpin, président, le 16 octobre 2026 (document Google
// « Tarifs Activité CAN », aussi transmis en PDF) ; la lecture case par case du
// tableau et les points restant à confirmer sont documentés dans docs/CLUB.md.
// Mettre à jour ces données avec docs/CLUB.md au changement de saison.
export type AccessId = 'licence' | 'lutte' | 'muscu' | 'collectifs';

export type Access = { id: AccessId; label: string; note: string };

export type Offer = {
  id: string;
  name: string;
  note: string;
  price: string;
  includes: readonly AccessId[];
};

export const pricing: {
  season: string;
  access: Access[];
  offers: Offer[];
  footnote: string;
} = {
  season: 'Saison 2026–2027',
  access: [
    { id: 'licence', label: 'Licence fédérale incluse', note: '' },
    { id: 'lutte', label: 'Entraînements de lutte', note: 'Planning détaillé sur la page Lutte.' },
    { id: 'muscu', label: 'Salle de musculation', note: 'Sur les créneaux d’ouverture de la salle.' },
    { id: 'collectifs', label: 'Cours collectifs', note: 'Chaque jeudi, 18 h 30–20 h.' },
  ],
  offers: [
    { id: 'lutte-enfant', name: 'Lutte enfant', note: '', price: '200 €', includes: ['licence', 'lutte'] },
    { id: 'lutte-adulte', name: 'Lutte adulte', note: '', price: '250 €', includes: ['licence', 'lutte', 'muscu', 'collectifs'] },
    { id: 'lutte-feminine', name: 'Lutte féminine', note: '', price: '170 €', includes: ['licence', 'lutte', 'muscu', 'collectifs'] },
    { id: 'force-halterophilie', name: 'Force athlétique et haltérophilie', note: '', price: '200 €', includes: ['licence', 'muscu', 'collectifs'] },
    { id: 'licence-force-seule', name: 'Licence force athlétique seule', note: '', price: '125 €', includes: ['licence'] },
    { id: 'muscu-collectifs-loisirs', name: 'Musculation, cours collectifs ou pratiques loisirs*', note: '', price: '170 €', includes: ['muscu', 'collectifs'] },
  ],
  footnote: 'Pratiques loisirs : haltérophilie, force athlétique ou streetlifting, sans licence fédérale incluse.',
};
