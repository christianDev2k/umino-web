class Product {
    constructor(id, vendor, name, img, size, price, desc, qty, discount, stock) {
        id, vendor, name, img, size, price, desc, qty, discount, stock;
    }
    discountPrice() {
        return this.price * ((100 - this.discount) / 100);
    }
}
