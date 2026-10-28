# Maison Épure

Fictional fine-dining restaurant website for the **OLVER** web design portfolio. Contemporary cuisine, Geneva — deep charcoal, warm ivory, earthy accents, editorial typography and large-format photography placeholders.

This is a design/portfolio concept. The restaurant, its menu, and its contact details are entirely fictional.

## Stack

- [Vite](https://vitejs.dev/) + vanilla JavaScript (ES modules), no framework
- Plain multi-page HTML (`index.html`, `menu.html`, `reservations.html`, `about.html`, `contact.html`)
- Hand-rolled, dependency-free bilingual (FR / EN) i18n system — see `src/i18n/`

## Running locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
index.html / menu.html / reservations.html / about.html / contact.html
public/
  favicon.svg
  images/
    photos/           licensed Unsplash photography, JPEG + WebP (see Credits)
src/
  i18n/
    fr.js / en.js     translation dictionaries (fr is default)
    index.js          i18n engine: get/set language, persistence, DOM sync
  data/
    menu.js            bilingual dish data
    hours.js            opening hours data
    location.js        address / phone / email / map query
  js/
    main.js             entry point, initializes everything below
    nav.js               header, mobile menu, language switcher
    site-info.js        renders footer + hours/address/phone/email blocks
    menu-render.js       renders the menu page from data/menu.js
    reservations-form.js  demo-only reservation form handling
    reveal.js            scroll-reveal animations
  styles/
    tokens.css           palette, type scale, spacing
    base.css              resets, base type, accessibility helpers
    components.css       header, footer, buttons, media placeholders
    page-hero.css, home.css, menu.css, reservations.css, about.css, contact.css
```

## Language switching

- French is the default language; English is available via the **FR / EN** switcher in the header (visible on desktop and mobile, not hidden inside the hamburger menu).
- Switching languages re-renders all text in place — no page reload, no navigation, scroll position is preserved.
- The choice is remembered in `localStorage` and re-applied on every page load/navigation.
- `<html lang>` is kept in sync with the active language.
- Static copy uses `data-i18n="key.path"` attributes resolved against `src/i18n/{fr,en}.js`; data-driven content (menu dishes, hours) re-renders from bilingual fields in `src/data/` on language change.

## Photography

All 15 photo slots use real photographs licensed from [Unsplash](https://unsplash.com/) (Unsplash License — free to use, no attribution legally required; credited below anyway). Each was downloaded, trimmed/resized and re-encoded locally to WebP (with a JPEG fallback via `<picture>`) using Pillow — nothing is hotlinked, and no image is served from an external URL at runtime.

### Credits

| File | Photo | Photographer |
| --- | --- | --- |
| `hero-signature-dish` | [Pasta dish on white ceramic plate](https://unsplash.com/photos/pasta-dish-on-white-ceramic-plate--5FECW242og) | Zoran Borojevic |
| `intro-seasonal-vegetables` | [Green and red vegetable salad](https://unsplash.com/photos/green-and-red-vegetable-salad-on-white-ceramic-plate-g5heoq03X_M) | Farhad Ibrahimzade |
| `highlight-fire-roasted-vegetables` | [Green and brown vegetable barbecue](https://unsplash.com/photos/green-and-brown-vegetable-barbecue-4KR_xkfDnNE) | Chris Lawton |
| `highlight-lake-fish` | [Fish dish on white ceramic plate](https://unsplash.com/photos/fish-dish-on-white-ceramic-plate-D1Rez3AjeVo) | Farhad Ibrahimzade |
| `highlight-dessert` | [Black plate topped with pastries](https://unsplash.com/photos/a-black-plate-topped-with-pastries-on-top-of-a-table-5C0ev9m9lbo) | Mia Truong |
| `story-table-setting` | [Clear wine glasses on dining table](https://unsplash.com/photos/clear-wine-glasses-on-top-of-dining-table-PCE0T5i4pDI) | Ronan |
| `menu-hero-dish` | [Chef presents a beautifully plated dish](https://unsplash.com/photos/a-chef-presents-a-beautifully-plated-dish-6jVutqtcgQs) | Tommaso Ubezio |
| `menu-starters` | [Small appetizers on a silver plate](https://unsplash.com/photos/small-appetizers-are-arranged-on-a-silver-plate-ZGgIYaL9lYk) | Sebastian Coman Photography |
| `menu-mains` | [Grilled steak on a wooden board](https://unsplash.com/photos/delicious-grilled-steak-served-on-a-wooden-board-BQSFv7b47CU) | engin akyurt |
| `menu-desserts` | [Chocolate cake with white icing](https://unsplash.com/photos/chocolate-cake-with-white-icing-on-white-ceramic-plate-dKT6Q7q2UKs) | Shivansh Sethi |
| `about-hero-interior` | [Empty restaurant with green tables and chairs](https://unsplash.com/photos/an-empty-restaurant-with-green-tables-and-chairs--UL713I8tQk) | Polina Kuzovkova |
| `about-philosophy-ingredients` | [Pile of vegetables on a table](https://unsplash.com/photos/a-pile-of-vegetables-sitting-on-top-of-a-table-lzyaeNQ9wU4) | Collab Media |
| `about-chef-hands` | [Person putting food on plate](https://unsplash.com/photos/person-putting-food-on-plate-cQbOSRpElxw) | Sebastian Coman Photography |
| `about-atmosphere-dining-room` | [Cozy restaurant interior with string lights](https://unsplash.com/photos/a-cozy-restaurant-interior-with-string-lights-Wzo_34cS5bA) | Raymond Yeung |
| `reservations-hero-table` | [Table with plates and candles in a restaurant](https://unsplash.com/photos/a-table-with-plates-and-candles-in-a-restaurant-wO5DwEoyKjI) | Alena Torgonskaya |

To replace any of these with different photography later: drop the new file(s) into `public/images/photos/` (same naming convention), update the `<picture>`/`<source>` paths referencing them, and update the matching `*ImageAlt` key in `src/i18n/fr.js` / `src/i18n/en.js`.

## Keeping this separate from other OLVER projects

This is a standalone project: its own `package.json`, its own dependencies, no shared code or git history with other OLVER portfolio sites (e.g. Fade District).
