import { html } from "lit";
import { Base } from '../Base';
import {addItemToCart} from "../api/cart";
import {getCart, setCart} from "../idbHelpers";

export class AppProduct extends Base {
  constructor() {
    super();
    this.product = {};

    this.loaded = false;
  }
  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true }
    };
  }
  async addToCart() {
    if (!navigator.onLine) {
      const storedCart = getCart('cart');
      storedCart.products.products.push(this.product);
      await setCart(storedCart);
      alert('Product added to cart');
    } else {
      await addItemToCart(this.product);
      alert('Product added to cart');
    }
  }
  firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  render() {
    return html`
      <section class="product">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? 'fade' : ''}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img
              loading="lazy"
              src="http://localhost:9000/image/500/${this.product.image}"
              alt="${this.product.description}"
              data-src="http://localhost:9000/image/500/${this.product.image}"
              width="1280"
              height="720">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
          <button @click="${this.addToCart}">Add to cart</button>
        </main>
      </section>
    `;
  }
}
customElements.define('app-product', AppProduct);