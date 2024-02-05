import { route } from './router.js';
import { menu } from './js/menu.js';

// https://en.wikipedia.org/wiki/Domino_Tiles

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#menu').innerHTML = menu();

  route(window.location.hash);

  window.addEventListener('hashchange', () => {
    route(window.location.hash);
  });
});