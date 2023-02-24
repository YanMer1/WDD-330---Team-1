
import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();
const category = getParam('category');

const productId = getParam('product');
const dataSource = new ProductData(category);

const productDetails = new ProductDetails(productId, dataSource);

productDetails.init();
