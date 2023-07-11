import * as mf from '../Main/main_functions.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const event = e => {};

export const eventQuickView = product => {
    // Label size active UI
    const sizeLabels = $$('.label-size');
    sizeLabels.forEach(s => {
        s.onclick = () => {
            const labelActive = document.querySelector('.label-size.active');
            labelActive.classList.remove('active');

            s.classList.add('active');
        };
    });

    // UI size selected
    const sizeOptions = document.getElementsByName('size-options');
    let sizeSelected = -1;
    sizeOptions.forEach(i => {
        if (i.checked) {
            $('#sizeSelected').innerHTML = i.value;
            sizeSelected = i.value;
        }
        i.onchange = () => {
            if (i.checked) {
                $('#sizeSelected').innerHTML = i.value;
                sizeSelected = i.value;
            }
        };
    });

    // UI Quantity products
    let qtyValue = 1;
    $('#qv-qtyInput').onclick = e => {
        const controllers = e.target.closest('.control-value');
        qtyValue = parseInt($('#qv-qty-value').value);

        if (controllers) {
            controllers.classList.contains('minus-qty') ? (qtyValue > 1 ? (qtyValue -= 1) : null) : (qtyValue += 1);
            $('#qv-qty-value').value = qtyValue;
        }
    };

    // handle check policy
    const checkedPolicy = $('#checkbox-policy');
    const buyBtn = $('#qv-buy-btn');

    checkedPolicy.checked = false;
    buyBtn.disabled = true;
    checkedPolicy.onchange = () => {
        checkedPolicy.checked ? (buyBtn.disabled = false) : (buyBtn.disabled = true);
    };

    // handle UI circle actions
    $('.circle-action').onclick = e => {
        const icon = e.target.closest('.icon-action');
        icon ? icon.classList.toggle('active') : null;
    };

    const addButton = $('#addToCartBtn');
    addButton.onclick = () => {
        product.cartQty = qtyValue;
        product.cartSize = sizeSelected;
        
        mf.addToCart(product);
    };
};

export default event;
