class Cart {
    constructor() {
        this.list = [];
    }

    addToCartMethod(product) {
        this.list.push(product);
    }

    editCartMethod(index, product) {
        this.list[index] = product;
    }

    deleteCartMethod(index) {
        this.list.splice(index, 1);
    }

    calcDiscount(discount, price) {
        return discount ? (price * ((100 - discount) / 100)).toFixed(2) : price;
    }
}
const CartList = new Cart();
export default CartList;
