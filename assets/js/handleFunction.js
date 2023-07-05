import * as api from './call_API.js';

// Add và render product
export async function handleAddProduct(product) {
    $('#submitFormBtn').innerHTML = 'Add Now!';

    await api.postProduct(product);
    RenderDataList();
}

// Delete product và render product
export function handleDeleteProduct(id) {
    api.deleteProduct(id);

    const selectorChild = `[data-del="${id}"]`;
    const childElement = $(selectorChild);
    const parentElement = childElement.closest('tr');
    parentElement.remove();
}

// Get product and show modal
export async function getEditProduct(id) {
    const ProductList = await api.getProduct();
    const index = ProductList.findIndex(p => p.id === id);
    if (index !== -1) {
        $('#productName').value = ProductList[index].name;
        $('#productSize').value = ProductList[index].size;
        $('#productPrice').value = ProductList[index].price;
        $('#productDiscount').value = ProductList[index].discount;
        $('#productImg').value = ProductList[index].img;
        $('#productDesc').value = ProductList[index].desc;
        $('#productQty').value = ProductList[index].qty;

        const discount = $('#productDiscount').value;
        const price = $('#productPrice').value;
        $('#productSalePrice').value = discount ? price * ((100 - discount) / 100) : '';
    }
}

// Edit product và render product
export async function handleEditProduct(product, id) {
    await api.putProduct(product, id);
    RenderDataList();
}

// Render dashboard
export async function RenderDataList() {
    const productList = await api.getProduct();

    let html = productList.map(p => {
        const { name, img, size, price, discount, id, qty } = p;
        return `
            <tr>
                <th>${id}</th>
                <th>
                    <img src="${img}" alt="" class="img-fluid product-img" />
                </th>
                <th class="product-tb-name">${name}</th>
                <th>${size}</th>
                <th>${qty}</th>
                <th>${price}</th>
                <th>${discount}</th>
                <th>${discount !== '' ? price * ((100 - discount) / 100) : ''}</th>
                <th class="action-icon text-end">
                    <button class="navbar__toogle-sidebar border-0 bg-transparent">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button data-edit="${id}" class="navbar__toogle-sidebar border-0 bg-transparent">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button data-del="${id}" class="navbar__toogle-sidebar border-0 bg-transparent">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </th>
            </tr>
        `;
    });
    $('#productContent').innerHTML = html.join('');
}

// Reset form 
export function resetForm() {
    const inputs = $('#addProductForm').querySelectorAll('.form-group.invalid');
    const message = $('#addProductForm').querySelectorAll('.form-group.invalid .form-message');
    
    $('#addProductForm').reset();
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('invalid');
        message[i].innerHTML = '';
    }
}
