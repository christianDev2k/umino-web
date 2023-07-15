import * as mf from '../Main/main_functions.js';
import * as f from '../Collections/fnc_collections.js';
import CartList from '../../models/Cart.js';

//-----------------------------------------------------------------
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const eventCollection = () => {
    // Filter sidebar
    const filterTitleIcon = $$('.filter-title-icon');
    filterTitleIcon.forEach(icon => {
        icon.onclick = () => {
            const filterTitle = icon.closest('.filter-title');
            const icon1 = icon.querySelector('.icon-1');
            const icon2 = icon.querySelector('.icon-2');

            // icon1.style.transform = 'rotate(-180deg)';
            icon2.classList.toggle('opacity-0');
            icon1.classList.toggle('nev-rotate-180');

            filterTitle.classList.toggle('active');
        };
    });

    // Handle layout all products
    const eventLayouts = $('#all-product');
    eventLayouts.onclick = e => {
        const id = e.target.closest('.cart-icon') ? e.target.closest('.cart-icon').dataset.id : null;

        id ? mf.renderQuickView(id) : null;
    };
};

export function EventSideBar(data) {
    const filterElement = $$('.filter-element');
    const clearElement = $('#clear-btn');
    const filterNotice = $('#filter-notice');
    const filterNum = $('#filter-num');

    filterElement.forEach(e => {
        e.onchange = () => {
            const product = f.handleFilter(data, filterElement);
            f.renderAllProducts(product);
            
            clearElement.classList.remove('d-none');
            filterNotice.classList.remove('d-none');
            filterNum.innerText = product.length;
        };
    });

    const clearAll = $('#clear-all');
    clearAll.onclick = () => {
        clearElement.classList.add('d-none');
        filterNotice.classList.add('d-none');
        
        f.renderAllProducts(data);
        
        filterElement.forEach(i => {
            i.checked ? (i.checked = false) : null;
        });
    };
}

export default eventCollection;
