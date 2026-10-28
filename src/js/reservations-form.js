import { t, onLangChange } from '../i18n/index.js';

export function initReservationsForm() {
  const form = document.querySelector('[data-reservation-form]');
  const status = document.querySelector('[data-form-status]');
  if (!form || !status) return;

  let submitted = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitted = true;
    status.textContent = t('reservations.formSuccess');
    status.hidden = false;
    form.reset();
  });

  onLangChange(() => {
    if (submitted) status.textContent = t('reservations.formSuccess');
  });
}
