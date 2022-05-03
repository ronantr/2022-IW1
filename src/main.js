import page from "page";

import { getProducts, getProduct } from './api/products';
import "./views/app-home";

(async (root) => {

  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  const AppHome = main.querySelector('app-home');
  const AppProduct = main.querySelector('app-product');

  page('*', (ctx, next) => {
    skeleton.removeAttribute('hidden');

    AppHome.active = false;
    AppProduct.active = false;

    next();
  });

  page('/', async () => {
    const products = await getProducts();

    AppHome.products = products;
    AppHome.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page('/product/:id', async ({ params }) => {
    await import('./views/app-product');
    const product = await getProduct(params.id);

    AppProduct.product = product;
    AppProduct.active = true;

    skeleton.setAttribute('hidden', 'hiddle');
  });

  page();

})(document.querySelector('#app'));