import { updateCartIcon, getLocalStorage, setLocalStorage, loadheaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

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

const dataSource = new ProductData('tents');

const productList = new ProductList('tents', dataSource, document.querySelector('.product-list'));

function init() {
  productList.init();
  
  updateCartIcon();
}

setTimeout(init, 50);