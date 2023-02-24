import { updateCartIcon, loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';
import { removeCartItem } from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');

function removeItemHandler(item) {
  let removed = removeCartItem(item);
  if (removed) {
    cart.renderCartContents();
    updateCartIcon();
  }
}

cart.renderCartContents();
document.body.addEventListener('click', removeItemHandler);

updateCartIcon();
