export default class ProductDetails {
constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

async init() {
    this.product = await this.dataSource.getProduct(this.productId);

    this.renderProductDetails()

    document.getElementById('addToCart')
    .addEventListener('click', this.addToCart.bind(this));
}

addToCart() {}

renderProductDetails() {
    let ProductDetails = document.querySelector('productDetails');
    let h3 = document.createElement('h3');
    let h2 = document.createElement('h2');
    let img = document.createElement('img');
    let price = document.createElement('p');
    let color = document.createElement('p');
    let desc = document.createElement('p');
    let divAdd = document.createElement('div');
    let buttonAdd = document.createElement('button');

    h3.textContent = this.product.Brand.name;

    h2.setAttribute('class', 'divider');
    h2.textContent = this.product.NameWithoutBrand;

    img.setAttribute('class', 'divider');
    img.setAttribute('src', this.product.Image);
    img.setAttribute('alt', this.product.NameWithoutBrand);

    price.setAttribute ('class', 'product-card-price');
    price.textContent = `$${this.product.FinalPrice}`;

    color.setAttribute('class', 'product-color');
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