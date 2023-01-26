import { updateCartIcon, getLocalStorage, setLocalStorage } from './utils.mjs';

if (!getLocalStorage('so-cart').length) {
  setLocalStorage('so-cart'), []);
}

updateCartIcon();
