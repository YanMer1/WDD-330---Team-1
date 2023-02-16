import { loadheaderFooter, updateCartIcon } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadheaderFooter();
const checkoutProcess = new CheckoutProcess('so-cart', '.order-summary');

checkoutProcess.init();
updateCartIcon();