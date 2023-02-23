
import { getParam, loadheaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadheaderFooter();
const category = getParam('category');

const productId = getParam('product');
const dataSource = new ProductData(category);

const productDetails = new ProductDetails(productId, dataSource);

function init() {
    productDetails.init();
}
setTimeout(init, 250);
