import { getLang, t, onLangChange } from '../i18n/index.js';
import { menu } from '../data/menu.js';

const CATEGORIES = [
  { key: 'starters', labelKey: 'menu.categoryStarters', altKey: 'menu.categoryStartersImageAlt', image: 'menu-starters' },
  { key: 'mains', labelKey: 'menu.categoryMains', altKey: 'menu.categoryMainsImageAlt', image: 'menu-mains' },
  { key: 'desserts', labelKey: 'menu.categoryDesserts', altKey: 'menu.categoryDessertsImageAlt', image: 'menu-desserts' },
];

function renderMenu() {
  const container = document.querySelector('[data-menu-list]');
  if (!container) return;

  const lang = getLang();
  const priceLabel = t('menu.priceLabel');

  container.innerHTML = CATEGORIES.map(({ key, labelKey, altKey, image }) => {
    const items = menu.filter((dish) => dish.category === key);
    const dishItems = items
      .map(
        (dish) => `
          <li class="dish">
            <div class="dish__head">
              <h3>${dish.name[lang]}</h3>
              <span class="dish__price">${dish.price} ${priceLabel}</span>
            </div>
            <p>${dish.description[lang]}</p>
          </li>`
      )
      .join('');

    return `
      <section class="menu-category" data-reveal>
        <div class="menu-category__media media media--16-9">
          <picture>
            <source srcset="/images/photos/${image}.webp" type="image/webp" />
            <img src="/images/photos/${image}.jpg" alt="${t(altKey)}" />
          </picture>
        </div>
        <div class="menu-category__body">
          <h2>${t(labelKey)}</h2>
          <ul class="dish-list">${dishItems}</ul>
        </div>
      </section>`;
  }).join('');
}

export function initMenu() {
  renderMenu();
  onLangChange(renderMenu);
}
