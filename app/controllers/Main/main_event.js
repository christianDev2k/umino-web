import * as mf from '../Main/main_functions.js';
import CartList from '../../models/Cart.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const event = e => {};

export const eventQuickView = product => {
    const checkedPolicy = $('#checkbox-policy');
    const buyBtn = $('#qv-buy-btn');
    const quickViewQtyInput = $('#qv-qty-value');

    // Reset value
    checkedPolicy.checked = false;
    buyBtn.disabled = true;
    quickViewQtyInput.value = 1;

    // Label size active UI
    const sizeSelected = mf.sizeSelectedUI('size-options', '#sizeSelected', '.label-size')
    console.log(sizeSelected);
    
    // Quickview quantity form
    mf.qtyControlForm('#qv-qtyInput', '#qv-qty-value', '.control-value', 'minus-qty');

    // handle check policy
    checkedPolicy.onchange = () => {
        checkedPolicy.checked ? (buyBtn.disabled = false) : (buyBtn.disabled = true);
    };

    // handle UI circle actions
    $('.circle-action').onclick = e => {
        const icon = e.target.closest('.icon-action');
        icon ? icon.classList.toggle('active') : null;
    };

    // event add to cart
    $('#addToCartBtn').onclick = () => {
        $('#qv-close-modal').click();
        $('#cartButton').click();

        product.cartQty = quickViewQtyInput.value;
        product.cartSize = sizeSelected;

        mf.HandleAddToCart(product);
    };
};

// Cart Modal Event
export const cartEvents = () => {
    const formElement = $$('.cart-qty-form');

    if ($('#cart-shopBtn')) {
        $('#cart-shopBtn').onclick = () => {
            $('#closeCartIcon').click();
        };
    }

    const cartEditBtns = $$('.product-btn');
    cartEditBtns.forEach(edit => {
        edit.onclick = e => {
            e.stopPropagation();

            const btnDel = e.target.closest('.product-del');
            if (btnDel) {
                const elementID = btnDel.id;
                const id = elementID.split('-')[2];
                const index = CartList.list.findIndex(p => p.id === id);

                CartList.deleteCartMethod(index);
                mf.SetLocalStorages('cart', CartList.list);
                mf.renderCart();
            }

            const btnEdit = e.target.closest('.product-edit');
            if (btnEdit) {
                const elementID = btnEdit.id;
                const id = elementID.split('-')[2];

                mf.renderEditModal(id);
            }
        };
    });

    formElement.forEach(f => {
        f.onclick = e => {
            e.stopPropagation();

            mf.handleEditQtyCart(e);
        };
    });

    // Edit modal quantity edit
    mf.qtyControlForm('.edit-qty-form', '#edit-qty-input', '.cart-qty-control', 'qty-down');

    // Edit size options in edit options modal
    // mf.sizeSelectedUI('size-options', '#sizeSelected')
    
};

export default event;
