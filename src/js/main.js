
import { updateCartIcon, getLocalStorage, setLocalStorage, loadheaderFooter } from './utils.mjs';

if (!getLocalStorage('so-cart').length) {
  setLocalStorage('so-cart', []);
}

loadheaderFooter();


function init() {
  
  updateCartIcon();
}

setTimeout(init, 250);