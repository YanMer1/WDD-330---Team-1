import { getParam, loadheaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadheaderFooter();

const productId = getParam('product');
const dataSource = new ProductData('tents');

const productDetails = new ProductDetails(productId, dataSource);

function init() {
    productDetails.init();
}
setTimeout(init, 50);