import { renderTopTrending } from './fnc_Homepage.js';
import { renderQuickView } from '../Main/main_functions.js';

const event = data => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const navTabs = $$('.nav-tabs .nav-link');
    navTabs.forEach(n => {
        n.onclick = () => {
            renderTopTrending(data);
            const tabpanes = $$('.tab-pane:not(.active) .wrapper');

            tabpanes.forEach(t => {
                t.remove();
            });
        };
    });

    // Handle layout all products
    const eventLayouts = $('.tab-content');
    eventLayouts.onclick = e => {
        const id = e.target.closest('.cart-icon') ? e.target.closest('.cart-icon').dataset.id : null;

        id ? renderQuickView(id) : null;
    };

    const mayyoulike = $('#mayyoulike-slider');
    mayyoulike.onclick = e => {
        const id = e.target.closest('.cart-icon') ? e.target.closest('.cart-icon').dataset.id : null;

        id ? renderQuickView(id) : null;
    };
};

export default event;
