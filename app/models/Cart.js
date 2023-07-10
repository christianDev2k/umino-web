import * as api from '../../assets/js/call_API.js';

class Cart {
    constructor() {
        this.cartList = [];
    }

    addToCartMethod(id) {
        const product = api.getProduct(id);
        this.cartList.push(product);
    }
}