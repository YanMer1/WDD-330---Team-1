
import { loadHeaderFooter, updateCartIcon } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();
const checkoutProcess = new CheckoutProcess('so-cart', '.order-summary');

document.querySelector('#checkout-submit').addEventListener('click', (event) => {
    event.preventDefault();
    checkoutProcess.checkout();
});

checkoutProcess.init();
updateCartIcon();