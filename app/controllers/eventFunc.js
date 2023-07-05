import * as f from '../../assets/js/handleFunction.js';
import Validator from '../../app/util/validator.js';
import Product from '../../app/models/Product.js';

const ValidateAddForm = new Validator('#addProductForm');
let editID = -1;

ValidateAddForm.onSubmit = product => {
    $('#closeModalAddBtn').click();
    const { name, img, size, price, desc, discount, qty } = product;
    const newProduct = new Product(name, img, size, price, desc, discount, qty);

    editID === -1 ? f.handleAddProduct(newProduct) : f.handleEditProduct(newProduct, editID);
};

const event = () => {
    // Reset form khi thêm sản phẩm mới
    $('#addNewBtn').onclick = () => {
        f.resetForm();
    };

    $('#productDiscount').onblur = () => {
        const price = $('#productPrice').value;
        const discount = $('#productDiscount').value;

        $('#productSalePrice').value = price && discount ? price * ((100 - discount) / 100) : '';
    };

    // Sắp xếp
    const sortButton = document.getElementsByName('sort-price');
    sortButton.forEach(b => {
        b.onchange = () => {
            b.value === 'ascending' ? f.sortAscending() : f.sortDescending();
        };
    });

    $('#search-btn').onclick = () => {
        f.searchByName();
    };

    $('#productContent').onclick = e => {
        // Event ấn vào nút Xóa
        if (e.target.parentElement.getAttribute('data-del')) {
            f.handleDeleteProduct(e.target.parentElement.dataset.del);
        }

        // Event ấn vào nút edit
        if (e.target.parentElement.getAttribute('data-edit')) {
            $('#addNewBtn').click();
            $('#submitFormBtn').innerHTML = 'Edit Now!';

            editID = e.target.parentElement.dataset.edit;
            f.getEditProduct(editID);
        }
    };
};

export default event;
