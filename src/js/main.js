import { updateCartIcon, getLocalStorage, setLocalStorage, loadheaderFooter } from './utils.mjs';

/* 
Convert cart item in local storage from JSON to Array.
  If the length can't be return then it's not an array.
  Set the local storage to an empty array.
  This is so that we can add and remove items from the cart.
*/
if (!getLocalStorage('so-cart').length) {
  setLocalStorage('so-cart', []);
}

loadheaderFooter();
updateCartIcon();