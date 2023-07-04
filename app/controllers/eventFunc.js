import * as f from '../../assets/js/handleFunction.js';
import Validator from '../../app/util/validator.js';
import Product from '../../app/models/Product.js';

const ValidateAddForm = new Validator('#addProductForm');
let editID = -1;

ValidateAddForm.onSubmit = product => {
    $('#closeModalAddBtn').click();
    const { name, img, size, price, desc, discount } = product;
    const newProduct = new Product(name, img, size, price, desc, discount);

    editID === -1 ? f.handleAddProduct(newProduct) : f.handleEditProduct(newProduct, editID);
};

const event = e => {
    $('#productContent').addEventListener('click', e => {
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
    });
};

export default event;
