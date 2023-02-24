import { setLocalStorage, getLocalStorage, updateCartIcon } from './utils.mjs';

function productDetailsTemaplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price discount">
    <span class="suggested-price">$${product.SuggestedRetailPrice}</span>
     -${Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice * 100))}%
    </p>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id=${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productID, dataSource) {
    this.productID = productID;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    updateCartIcon();
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.product = await this.dataSource.findProductById(this.productID);

    
    // Set the document title
    document.title += ` ${this.product.Name}`;

    this.renderProductDetails('main');

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let cartItems = getLocalStorage('so-cart');

    if (!cartItems) {
      cartItems = [];
    }

    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);

    updateCartIcon();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterbegin', productDetailsTemaplate(this.product));
  }
}