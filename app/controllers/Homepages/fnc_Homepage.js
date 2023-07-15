import * as mf from '../Main/main_functions.js';
import * as api from '../../../assets/js/api.js';

const $ = document.querySelector.bind(document);

// Common: Set UI
export async function setUI() {
    const data = await api.getProduct();

    mf.renderPopularProducts(data);
}

