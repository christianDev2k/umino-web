class Cart {
    constructor() {
        this.list = [];
    }

    addToCartMethod(product) {
        this.list.push(product);
    }
}
const CartList = new Cart();
export default CartList;