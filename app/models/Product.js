export default class Product {
    constructor(name, img, size, price, desc, discount) {
        this.name = name;
        this.img = img;
        this.size = size;
        this.price = price;
        this.desc = desc;
        this.discount = discount;
    }
    discountPrice() {
        return this.price * ((100 - this.discount) / 100);
    }
}
