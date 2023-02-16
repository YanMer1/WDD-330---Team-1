import { loadheaderFooter, updateCartIcon } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadheaderFooter();
const checkoutProcess = new CheckoutProcess('so-cart', '.order-summary');

document.querySelector('#checkout-btn').addEventListener('click', (event) => {
    event.preventDefault();
    checkoutProcess.checkout();
});

checkoutProcess.init();
updateCartIcon();