import fr from './fr.js';
import en from './en.js';

const dictionaries = { fr, en };
const STORAGE_KEY = 'me-lang';
const DEFAULT_LANG = 'fr';
const listeners = new Set();

function getStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'fr' ? stored : null;
  } catch {
    return null;
  }
}

let currentLang = getStoredLang() || DEFAULT_LANG;

export function getLang() {
  return currentLang;
}

function lookup(key, lang) {
  return key.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dictionaries[lang]);
}

export function t(key) {
  const value = lookup(key, currentLang);
  if (value === undefined) {
    const fallback = lookup(key, DEFAULT_LANG);
    return fallback !== undefined ? fallback : key;
  }
  return value;
}

function applyMeta() {
  const metaKey = document.body?.dataset.i18nMeta;
  if (!metaKey) return;

  const title = t(`meta.${metaKey}.title`);
  if (typeof title === 'string') document.title = title;

  const description = t(`meta.${metaKey}.description`);
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && typeof description === 'string') {
    metaDescription.setAttribute('content', description);
  }
}

function applyToDOM() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = t(el.dataset.i18n);
    if (typeof value === 'string') el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((part) => part.trim());
      const value = t(key);
      if (attr && typeof value === 'string') el.setAttribute(attr, value);
    });
  });

  document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
    const isActive = btn.dataset.langSwitch === currentLang;
    btn.setAttribute('aria-pressed', String(isActive));
  });

  applyMeta();
}

export function setLang(lang) {
  if (lang !== 'fr' && lang !== 'en') return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* localStorage unavailable — preference just won't persist */
  }
  applyToDOM();
  listeners.forEach((callback) => callback(currentLang));
}

export function onLangChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function initI18n() {
  applyToDOM();
}
