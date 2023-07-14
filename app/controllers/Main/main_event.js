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
    mf.getSizeOption('qv-size-options', '#sizeSelected');

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
        product.cartSize = mf.getSizeOption('qv-size-options', '#sizeSelected');
        mf.HandleAddToCart(product);
    };
};

// Cart Modal Event
export const cartEvents = () => {
    // Close cart modal on click button when cart have't products
    if ($('#cart-shopBtn')) {
        $('#cart-shopBtn').onclick = () => {
            $('#closeCartIcon').click();
        };
    }

    // Handle delete and edit products in cart.
    const cartEditBtns = $$('.product-btn');
    cartEditBtns.forEach(edit => {
        edit.onclick = e => {
            e.stopPropagation();

            const btnDel = e.target.closest('.product-del');
            if (btnDel) {
                const elementID = btnDel.id;
                const index = elementID.split('-')[2];

                CartList.deleteCartMethod(index);
                mf.SetLocalStorages('cart', CartList.list);
                mf.handleRenderCart();
            }

            const btnEdit = e.target.closest('.product-edit');
            if (btnEdit) {
                const elementID = btnEdit.id;
                const index = elementID.split('-')[2];

                mf.renderEditModal(index);
            }
        };
    });

    // Edit qty product in cart when click
    const formElement = $$('.cart-qty-form');
    formElement.forEach(f => {
        f.onclick = e => {
            e.stopPropagation();

            mf.handleEditQtyCart(e);
        };
    });

    // Edit qty product in cart when change
    const inputQtyElements = document.querySelectorAll('.cart-list .qty-value');
    inputQtyElements.forEach((i, index) => {
        i.onblur = () => {
            const editedProduct = {
                ...CartList.list[index],
                cartQty: i.value,
            };

            CartList.editCartMethod(index, editedProduct);
            mf.SetLocalStorages('cart', CartList.list);
            mf.handleRenderCart();
        };
    });

    // Checkout cart
    const cartPolicy = $('#cart-policy');
    const checkoutCart = $('#checkoutCart');
    cartPolicy.onchange = () => {
        cartPolicy.checked ? checkoutCart.disabled = false : checkoutCart.disabled = true;
    };

    checkoutCart.onclick = () => {
        CartList.list = [];
        mf.SetLocalStorages('cart', CartList.list);
        mf.handleRenderCart();
    }
};

export const editOptionsEvents = index => {
    // Edit quantity UI
    mf.qtyControlForm('.edit-qty-form', '#edit-qty-input', '.cart-qty-control', 'qty-down');

    // Edit size UI
    mf.getSizeOption('edit-size-options', '.edit-size-options .size');

    // Edit event
    $('#editBtnModal').onclick = () => {
        mf.handleEditOptions(index);
    };
};

export default event;
