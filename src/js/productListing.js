import { updateCartIcon, loadheaderFooter, getParam } from './utils.mjs';
import ProductList from './ProductList.mjs';
import ExternalServices from './ExternalServices.mjs';


loadheaderFooter();
const category = getParam('category');

const dataSource = new ExternalServices();

const listElement = document.querySelector('.product-list');

const myList = new ProductList(category, dataSource, listElement);

myList.init();
updateCartIcon();