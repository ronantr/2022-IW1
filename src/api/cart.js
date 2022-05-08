import { createRequest } from "./api.js";

const request = createRequest();

export function getCart() {
    return request.get("/cart")
        .then(({ data }) => ({id: 'cart', ...data}))
        .catch(console.error);
}

export async function addItemToCart(product) {
    const cart = await getCart();
    if (cart?.products.length) {
        cart.products.push(product);
    } else {
        cart.products = [product];
    }
    return request.post(`/cart`, cart)
        .then(({ data }) => data)
        .catch(console.error);
}

export async function removeItemFromCart(product) {
    const cart = await getCart();
    cart.products = cart.products.filter(p => p.id !== product.id);
    return request.post(`/cart`, cart)
        .then(({ data }) => data)
        .catch(console.error);
}
