import * as f from '../../assets/js/handleFunction.js';
import * as api from '../../assets/js/call_API.js';
import Validator from '../../app/util/validator.js';
import Product from '../../app/models/Product.js';

const ValidateAddForm = new Validator('#addProductForm');
let editID = -1;

const event = index => {
    // Get infor from input fields and validate
    ValidateAddForm.onSubmit = product => {
        $('#closeModalAddBtn').click();
        const { name, img, size, price, desc, discount, qty } = product;
        const newProduct = new Product(name, img, size, price, desc, discount, qty);

        editID === -1 ? f.handleAddProduct(newProduct, index) : f.handleEditProduct(newProduct, editID, index);
    };

    // Reset form when add product
    $('#addNewBtn').onclick = () => {
        f.resetForm();
    };

    // Calculate discount on modal add product
    $('#productDiscount').onblur = () => {
        const price = $('#productPrice').value;
        const discount = $('#productDiscount').value;

        $('#productSalePrice').value = price && discount ? (price * (100 - discount).toFixed(2)) / 100 : '';
    };

    // Arrange product
    const sortButton = document.getElementsByName('sort-price');
    sortButton.forEach(b => {
        b.onchange = () => {
            b.value === 'ascending' ? f.sortAscending() : f.sortDescending();
        };
    });

    // Search by name
    $('#search-btn').onclick = () => {
        f.searchByName();
    };

    $('#clearFilter').onclick = () => {
        f.setUIDashboard(0);
    };

    $('#searchNameInput').oninput = () => {
        const inputValue = $('#searchNameInput').value;
        if (!inputValue) {
            f.showNotice('No results found!', 'no result');
            f.setUIDashboard(0);
        }
    };

    // Edit, Delete product
    $('#productContent').onclick = e => {
        if (e.target.parentElement.getAttribute('data-del')) {
            f.handleDeleteProduct(e.target.parentElement.dataset.del, index);
        }

        if (e.target.parentElement.getAttribute('data-edit')) {
            $('#addNewBtn').click();
            $('#submitFormBtn').innerHTML = 'Edit Now!';

            editID = e.target.parentElement.dataset.edit;
            f.getEditProduct(editID);
        }
    };

    // handle pagination button
    $('#dbPagination').onclick = async e => {
        const data = await api.getProduct();
        const paginateLength = f.Paginate(data).length;
        const targetElement = e.target.dataset.index;

        if (targetElement) {
            // if (targetElement === 'pre') {
            //     index = index === 0 ? paginateLength - 1 : index - 1;
            // } else if (targetElement === 'next') {
            //     index = index === paginateLength - 1 ? 0 : index + 1;
            // } else {
            //     index = targetElement;
            // }
            index = targetElement === 'pre' ? (index <= 0 ? paginateLength - 1 : index - 1) : targetElement === 'next' ? (index >= paginateLength - 1 ? 0 : parseInt(index) + 1) : (index = targetElement);
            f.setUIDashboard(parseInt(index));
        }
    };
};

export default event;
