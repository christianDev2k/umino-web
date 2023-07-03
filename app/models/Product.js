class Product {
    constructor(id, name, img, size, price, desc, qty, discount, stock) {
        id, name, img, size, price, desc, qty, discount, stock;
    }
    discountPrice() {
        return this.price * ((100 - this.discount) / 100);
    }
}
