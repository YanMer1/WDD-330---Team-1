import { getLocalStorage } from './utils.mjs';

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
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        this.list.forEach((item) => {
            this.itemTotal += item.FinalPrice;

            if (this.shipping == 0) {
                this.shipping = 10;
            } else {
                this.shipping += 2;
            }

            this.tax = Math.round(this.itemTotal * 0.06 * 100) / 100;
        })

        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        document.querySelector(this.outputSelector).innerHTML =
            `<legend>Order Summary</legend>
        <label for="subtotal" name="subtotal">
          <p>Item Subtotal(${this.list.length})</p>
          <p>$${this.itemTotal}</p>
        </label>

        <label for="shipping-estimate" name="shipping-estimate">
          <p>Shipping estimate</p>
          <p>$${this.shipping}</p>
        </label>

        <label for="tax" name="tax">
          <p>Tax</p>
          <p>$${this.tax}</p>
        </label>

        <label for="order-total" name="order-total">
          <p>Order Total</p>
          <p>$${this.orderTotal}</p>
        </label>`;
    }

    calculateOrderTotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        // display the totals.
        this.displayOrderTotal();
    }

    displayOrderTotal() {
        // once the totals are all calculated display them in the order summary page

    }
}