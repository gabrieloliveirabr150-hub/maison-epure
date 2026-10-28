import { setLang, t, onLangChange } from '../i18n/index.js';

export function initNav() {
  const header = document.querySelector('[data-nav]');
  if (!header) return;

  const toggle = header.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setToggleLabel = (isOpen) => {
    if (!toggle) return;
    toggle.setAttribute('aria-label', isOpen ? t('a11y.closeMenu') : t('a11y.openMenu'));
  };

  if (toggle && mobileNav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.dataset.open = 'false';
      mobileNav.hidden = true;
      header.classList.remove('is-open');
      document.body.style.overflow = '';
      setToggleLabel(false);
    };

    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      mobileNav.hidden = false;
      mobileNav.dataset.open = 'true';
      header.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setToggleLabel(true);
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu();
      else openMenu();
    });

    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    setToggleLabel(false);
    onLangChange(() => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setToggleLabel(isOpen);
    });
  }

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langSwitch));
  });
}
