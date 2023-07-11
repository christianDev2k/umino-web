import * as mf from '../Main/main_functions.js';

//-----------------------------------------------------------------

const eventCollection = () => {
    const $ = document.querySelector.bind(document);

    const toggleButton = document.querySelector('#toggleButton');
    const contentNone = document.querySelector('#contentNone');

    let isContentExpanded = true;

    toggleButton.addEventListener('click', function () {
        if (isContentExpanded) {
            // Mở rộng nội dung
            contentNone.style.maxHeight = '800px';
            toggleButton.innerHTML = '<i class="fa-solid fa-xmark"></i> Filter';
            toggleButton.style.backgroundColor = 'white';
            toggleButton.style.borderColor = 'black';
            toggleButton.style.color = 'black';
        } else {
            // thu gọn nội dung
            contentNone.style.maxHeight = '0';
            toggleButton.innerHTML = '<i class="fa-solid fa-filter"></i> Filter';
            toggleButton.style.backgroundColor = 'black';
            toggleButton.style.borderColor = 'white';
            toggleButton.style.color = 'white';
        }

        isContentExpanded = !isContentExpanded;
    });

    // Handle layout all products
    const eventLayouts = $('#all-product');
    eventLayouts.onclick = e => {
        const id = e.target.closest('.cart-icon') ? e.target.closest('.cart-icon').dataset.id : null;

        id ? mf.renderQuickView(id) : null;
    };
};

export default eventCollection;
