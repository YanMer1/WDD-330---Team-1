import { getLocalStorage, setLocalStorage, updateCartIcon } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>
<button class="remove-item" id=${item.Id}>X</button>`;

  return newItem;
}

function removeCartItem(item) {
  const cartItems = getLocalStorage('so-cart');
  console.log(cartItems);

  if (item.target.classList == 'remove-item') {
    for (let i = 0; i < cartItems.length; i++) {
      if (item.target.id == cartItems[i].Id) {

        cartItems.splice(i, 1);

        setLocalStorage('so-cart', cartItems);

        renderCartContents();
        updateCartIcon();
        return;
      }
    }
  }
}

renderCartContents();
updateCartIcon();
document.body.addEventListener('click', removeCartItem);