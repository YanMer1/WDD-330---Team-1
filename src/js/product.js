import { getParam, loadheaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadheaderFooter();
const category = getParam('category');

const productId = getParam('product');
const dataSource = new ExternalServices(category);

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();