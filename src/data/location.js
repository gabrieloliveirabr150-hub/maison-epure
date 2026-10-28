export const location = {
  addressLines: {
    fr: ['Rue du Rhône 12', '1204 Genève, Suisse'],
    en: ['12 Rue du Rhône', '1204 Geneva, Switzerland'],
  },
  phone: '+41 22 345 67 89',
  phoneHref: 'tel:+41223456789',
  email: 'reservations@maisonepure.ch',
  mapQuery: 'Rue du Rhône 12, 1204 Genève, Suisse',
};

export function getMapEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&output=embed`;
}
