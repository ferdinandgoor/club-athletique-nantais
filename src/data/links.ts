import { site } from './site';

export const clubLinks = {
  backLabel: 'Retour à l’accueil du site',
  introduction: site.home.eyebrow,
  items: [
    { platform: 'whatsapp', label: 'Communauté WhatsApp', description: 'Rejoins la communauté du club', href: 'https://chat.whatsapp.com/EeUBC9JdJKG1Mya8ZvV2Pv' },
    { platform: 'instagram', label: 'Instagram force athlétique', description: '@can_powerlifting', href: 'https://www.instagram.com/can_powerlifting/' },
    { platform: 'instagram', label: 'Instagram lutte', description: '@can_lutte_nantes', href: 'https://www.instagram.com/can_lutte_nantes/' },
    { platform: 'registration', label: 'Inscription', description: 'Rejoins le club avec MonClub', href: '/#inscription' },
    { platform: 'contact', label: 'Contacter le club', description: site.contact.email, href: `mailto:${site.contact.email}` },
  ],
};
