import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  let addedItems = [];
  items.forEach((item) => {
      if (addedItems.find((itm) => itm[0] === item.Id)) {
          let quantity = addedItems.find((itm) => itm[0] === item.Id)[1] + 1;
          for (let i = 0; i < addedItems.length; i++) {
              if (addedItems[i].indexOf(item.Id) == 0) {
                  addedItems[i] = [item.Id, quantity];
              }
          }
      } else {
          addedItems.push([item.Id, 1]);
      }
  });
  
  const objectItems = addedItems.map((item) => {
      let currentItem = items.find((itm) => itm[0] === item.Id);
      console.log(currentItem);
      return {
          id: currentItem.Id,
          price: currentItem.FinalPrice,
          name: currentItem.Name,
          quantity: item[1]
      };
  });
  return objectItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
  }

  init() {
      this.list = getLocalStorage(this.key);
      this.calculateOrderTotal();
      this.displayOrderTotal();
  }

  calculateOrderTotal() {
      this.list.forEach((item) => {
          this.itemTotal += item.FinalPrice;

          if (this.shipping == 0) {
              this.shipping = 10;
          } else {
              this.shipping += 2;
          }
      });

      this.tax = Math.round(this.itemTotal * 0.06 * 100) / 100;

      this.orderTotal = this.itemTotal + this.shipping + this.tax;
  }

  displayOrderTotal() {
      document.querySelector(this.outputSelector).innerHTML =
          `<legend>Order Summary</legend>
          <label for="subtotal">
            Item Subtotal(${this.list.length})
            <input value="$${this.itemTotal}" readonly></input>
          </label>
          <label for="shipping">
            Shipping estimate
            <input name="shipping" value="$${this.shipping}" readonly></input>
          </label>
          <label for="tax">
            Tax
            <input name="tax" value="$${this.tax}" readonly></input>
          </label>
          <label for="orderTotal">
            Order Total
            <input name="orderTotal" value="$${this.orderTotal}" readonly></input>
          </label>`;
  }

  async checkout() {
      const formElement = document.forms['checkout'];

      const json = formDataToJSON(formElement);

      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      console.log(json);

      try {
          const response = await services.checkout(json);
          console.log(response);
      } catch (error) {
          console.log(error);
      }
  }
}