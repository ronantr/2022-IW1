import { html } from 'lit';
import { Base } from '../Base';
import {getCart, removeItemFromCart} from "../api/cart";

export class AppCart extends Base {
    constructor() {
        super();
        this.products = [];
        this.loaded = false;

    }
    static get properties() {
        return {
            cart: {type: Object},
        }
    }
    firstUpdated() {
        const img = this.querySelector('img');
        img?.addEventListener('load', () => {
            this.loaded = true;
        });
    }
    async removeProduct(product) {
        await removeItemFromCart(product)
        this.cart = await getCart();
    }
    render() {
        return this.products.map((product) => html`
      <product-card
        .product="${product}"
      ></product-card>
      <button
              class="cart__product__control__remove"
              @click="${() => this.removeProduct(product)}">
          Remove
      </button>
    `);
    }
}
customElements.define('app-cart', AppCart);
