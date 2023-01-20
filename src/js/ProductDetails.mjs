export default class ProductDetails {
  constructor(productID, dataSource) {
    this.productID = productID;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.product = await this.dataSource.findProductById(this.productID);

    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addtoCart() {}

  renderProductDetails() {
    let productDetail = document.querySelector('.product-detail');
    let h3 = document.createElement('h3');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let price = document.createElement('p');
    let color = document.createElement('p');
    let desc = document.createElement('p');
    let divAdd = document.createElement('div');
    let buttonAdd = document.createElement('button');

    h3.textContent = this.product.Brand.Name;

    h2.setAttribute('class', 'divider');
    h2.textContent = this.product.NameWithoutBrand;

    img.setAttribute('class', 'divider');
    img.setAttribute('src', this.product.Image);
    img.setAttribute('alt', this.product.NameWithoutBrand);

    price.setAttribute('class', 'product-card_price');
    price.textContent = `$${this.product.FinalPrice}`;

    color.setAttribute('class', 'product__color');
    color.textContent = this.product.Colors[0].ColorName;

    desc.setAttribute('class', 'product__description');
    desc.innerHTML = this.product.DescriptionHtmlSimple;

    divAdd.setAttribute('class', 'product-detail_add');

    buttonAdd.setAttribute('id', 'addToCart');
    buttonAdd.setAttribute('data-id', this.product.Id);
    buttonAdd.textContent = 'Add to Cart';

    divAdd.appendChild(buttonAdd);

    productDetail.appendChild(h3);
    productDetail.appendChild(h2);
    productDetail.appendChild(img);
    productDetail.appendChild(price);
    productDetail.appendChild(color);
    productDetail.appendChild(desc);
    productDetail.appendChild(divAdd);
  }
}
