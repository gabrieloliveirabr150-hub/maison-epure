import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = import.meta.dirname;

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        menu: resolve(root, 'menu.html'),
        reservations: resolve(root, 'reservations.html'),
        about: resolve(root, 'about.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
});
