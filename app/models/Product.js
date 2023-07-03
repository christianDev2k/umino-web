class Product {
    constructor(name, img, size, price, desc, discount) {
        name, img, size, price, desc, discount, 
        stock = {
            // qty = 0,

        };
    }
    discountPrice() {
        return this.price * ((100 - this.discount) / 100);
    }
}
