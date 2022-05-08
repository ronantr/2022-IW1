import { html } from 'lit';
import { Base } from '../Base';
import {addItemToCart} from "../api/cart";
import {getCart, setCart} from "../idbHelpers";

export class ProductCard extends Base {
  constructor() {
    super();


    this.product = {};
    this.loaded = false;
  }

  static get properties() {
    return {
      product: { type: Object },
      loaded: { type: Boolean, state: true },
      removeProduct: Function,
      decrProduct: Function
    };
  }

  firstUpdated() {
    const img = this.querySelector('img');
    img.addEventListener('load', () => {
      this.loaded = true;
    });
  }

  render() {
    return html`
      <a href="/product/${this.product.id}" class="card">
        <header>
          <figure>
            <div class="placeholder ${this.loaded ? "fade" : ""}" style="background-image: url(http://localhost:9000/image/24/${this.product.image})"></div>
            <img src="${this.product.image}" alt="${this.product.title}" loading="lazy">
          </figure>
        </header>
        <main>
          <h1>${this.product.title}</h1>
          <p>${this.product.description}</p>
        </main>
      </a>
      <button @click="${this.addToCart}">Add to cart</button>
    `;
  }

  async addToCart(event) {
    event.preventDefault();
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
}
customElements.define('product-card', ProductCard);