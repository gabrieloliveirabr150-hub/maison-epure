import { getLang, t, onLangChange } from '../i18n/index.js';
import { hours } from '../data/hours.js';
import { location, getMapEmbedUrl } from '../data/location.js';

function renderHours() {
  const lists = document.querySelectorAll('[data-hours-list]');
  if (!lists.length) return;

  const items = hours
    .map(({ day, open, close, closed }) => {
      const label = t(`hours.days.${day}`);
      const value = closed ? t('hours.closed') : `${open} – ${close}`;
      return `<li><span>${label}</span><span>${value}</span></li>`;
    })
    .join('');

  lists.forEach((list) => {
    list.innerHTML = items;
  });
}

function renderLocation() {
  const lang = getLang();
  const addressLines = location.addressLines[lang] || location.addressLines.fr;

  document.querySelectorAll('[data-location-address]').forEach((el) => {
    el.innerHTML = addressLines.join('<br />');
  });

  document.querySelectorAll('[data-location-phone]').forEach((el) => {
    el.textContent = location.phone;
    el.setAttribute('href', location.phoneHref);
  });

  document.querySelectorAll('[data-location-phone-text]').forEach((el) => {
    el.textContent = location.phone;
  });

  document.querySelectorAll('[data-location-phone-href]').forEach((el) => {
    el.setAttribute('href', location.phoneHref);
  });

  document.querySelectorAll('[data-location-email]').forEach((el) => {
    el.textContent = location.email;
    el.setAttribute('href', `mailto:${location.email}`);
  });
}

function setupMap() {
  document.querySelectorAll('[data-map-frame]').forEach((frame) => {
    frame.src = getMapEmbedUrl();
  });
}

export function initSiteInfo() {
  renderHours();
  renderLocation();
  setupMap();
  onLangChange(() => {
    renderHours();
    renderLocation();
  });
}
