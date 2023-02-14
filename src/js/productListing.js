import { updateCartIcon, loadheaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';


loadheaderFooter();
const category = getParam('category');

const dataSource = new ProductData();

const listElement = document.querySelector('.product-list');

const myList = new ProductList(category, dataSource, listElement);

function init() {
  myList.init();
  
  updateCartIcon();
}

setTimeout(init, 250);