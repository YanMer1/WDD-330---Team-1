import {
  renderListWithTemplate
} from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price discount"><span class="suggested-price">$${product.SuggestedRetailPrice}</span> -${Math.round(100 - (product.FinalPrice / product.SuggestedRetailPrice * 100))}%</p>
      <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);

    // Set the document title
    // Make the category uppercase
    document.title += ` ${this.category[0].toUpperCase()}${this.category.substring(1)}`;

    document.querySelector('.title').textContent += `: ${this.category[0].toUpperCase()}${this.category.substring(1)}`;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  filterList(list, itemId) {
    let returnList = [];

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < itemId.length; j++) {
        if (list[i].Id === itemId[j]) {
          returnList.push(list[i]);
        }
      }
    }

    return returnList;
  }
}