import { getLocalStorage, setLocalStorage, updateCartIcon } from './utils.mjs';

let inCartItems = [];
let cartItemsDisplayed = [];

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  inCart(cartItems);
  console.log(cartItemsDisplayed);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  if (htmlItems.length == 0) {
    document.querySelector('.product-list').innerHTML = '<h1>Your cart is empty :(</h1>';
  } else {
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
}

function inCart(cartItems) {
  for (let item of cartItems) {
    if (!inCartItems.includes(item.Id)) {
      inCartItems.push(item.Id);
      cartItemsDisplayed.push([1, false]);
    } else {
      cartItemsDisplayed[inCartItems.indexOf(item.Id)][0] += 1;
    }
  }
}

function cartItemTemplate(item) {
  if (cartItemsDisplayed[inCartItems.indexOf(item.Id)][1]) {
    return '';
  } else {
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
  <p class="cart-card__quantity">qty: ${cartItemsDisplayed[inCartItems.indexOf(item.Id)][0]}</p>
  <p class="cart-card__price">Each: $${item.FinalPrice}</p>
  <p class="cart-card__subtotal">Subtotal: $${item.FinalPrice * cartItemsDisplayed[inCartItems.indexOf(item.Id)][0]}</p>
</li>
<button class="remove-item" id=${item.Id}>X</button>`;

    cartItemsDisplayed[inCartItems.indexOf(item.Id)][1] = true;
    return newItem;
  }
}

function removeCartItem(item) {
  const cartItems = getLocalStorage('so-cart');

  if (item.target.classList == 'remove-item') {
    for (let i = 0; i < cartItems.length; i++) {
      if (item.target.id == cartItems[i].Id) {

        cartItems.splice(i, 1);

        setLocalStorage('so-cart', cartItems);
        inCartItems = [];
        cartItemsDisplayed = [];
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