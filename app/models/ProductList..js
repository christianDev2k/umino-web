class ProductList {
    constructor() {
        this.list = [];
    }

    // New Product
    addProductMethod(product) {
        this.list.push(product);
    }

    // Find index
    findIndexMethod(id) {
        let indexProduct = -1;
        this.list.forEach((product, index) => {
            indexProduct = product.id === id ? index : -1;
        });
        return indexProduct;
    }

    // Delete product
    deleteProductMethod(id) {
        const index = findIndexMethod(id);
        this.list.splice(index, 1);
    }
    
    // Edit product
    editProductMethod(product, index) {
        this.list[index] = product;
    }

    // Accesding product
    ascendingProduct() {
        this.list.sort((a, b) => {
            a.price - b.price;
        })    
    }

    // Decesding product
    ascendingProduct() {
        this.list.sort((a, b) => {
            b.price - a.price;
        })    
    }
}
