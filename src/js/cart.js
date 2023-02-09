import { updateCartIcon, loadheaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';
import { removeCartItem } from './ShoppingCart.mjs';


loadheaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');

function removeItemHandler(item) {
  let removed = removeCartItem(item);
  if (removed) {
    cart.renderCartContents();
    updateCartIcon();
  }
}

function init() {
  cart.renderCartContents();
  updateCartIcon();
  document.body.addEventListener('click', removeItemHandler);
}

setTimeout(init, 50);