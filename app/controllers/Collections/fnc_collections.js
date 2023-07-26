import * as api from '../../../assets/js/api.js';
import * as mf from '../Main/main_functions.js';
import * as e from '../Collections/event_collections.js';
import CartList from '../../models/Cart.js';

const $ = document.querySelector.bind(document);

export async function setUI() {
    const localData = mf.GetLocalStorages('cart');
    const products = await api.getProduct();
    const popularProducts = products.slice(0, 6);

    CartList.list = localData;

    renderAllProducts(products);
    rangeFilter();
    mf.renderPopularProducts(popularProducts);
    mf.handleRenderCart(CartList.list);
}

export function renderAllProducts(productsList) {
    const container = $('#all-product');
    const html = productsList.map(p => {
        const { id, img, name, price, discount } = p;
        return `
                <div id="layout-item" class="mb-5 col-6 col-lg-4">
                    <a href="#" class="card-product-link">
                        <div class="card">
                            <div class="card-img">
                                <img class="card-img-top" src="${img}" alt="Title" />
                                <div class="card-product-icon">
                                    <button class="cart-icon icon-bg" data-id=${id} name="addToCartBtn" data-bs-toggle="modal" data-bs-target="#modalAddToCart">
                                        <svg class="product-svg" width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.5454 11.3287C10.3922 11.3287 10.2452 11.2672 10.1369 11.1576C10.0285 11.048 9.96763 10.8994 9.96763 10.7444H8.81201C8.81201 11.2093 8.99464 11.6552 9.31972 11.984C9.6448 12.3128 10.0857 12.4975 10.5454 12.4975C11.0052 12.4975 11.4461 12.3128 11.7711 11.984C12.0962 11.6552 12.2789 11.2093 12.2789 10.7444H11.1232C11.1232 10.8994 11.0624 11.048 10.954 11.1576C10.8456 11.2672 10.6987 11.3287 10.5454 11.3287Z"
                                                fill="#111"></path>
                                            <path
                                                d="M6.47907 11.3287C6.32583 11.3287 6.17886 11.2672 6.0705 11.1576C5.96214 11.048 5.90127 10.8994 5.90127 10.7444H4.74023C4.74023 10.9749 4.78514 11.2032 4.87238 11.4162C4.95962 11.6292 5.08748 11.8228 5.24868 11.9858C5.40988 12.1488 5.60125 12.2782 5.81186 12.3664C6.02248 12.4546 6.24822 12.5 6.47618 12.5C6.70415 12.5 6.92989 12.4546 7.1405 12.3664C7.35112 12.2782 7.54249 12.1488 7.70368 11.9858C7.86488 11.8228 7.99275 11.6292 8.07999 11.4162C8.16723 11.2032 8.21213 10.9749 8.21213 10.7444H7.05652C7.05652 10.8993 6.99569 11.0479 6.88741 11.1575C6.77913 11.267 6.63225 11.3286 6.47907 11.3287Z"
                                                fill="#111"></path>
                                            <path
                                                d="M14.0173 1.66048C13.9858 1.65506 13.9539 1.65237 13.9219 1.65244H4.67702C4.52377 1.65244 4.37681 1.71401 4.26845 1.8236C4.16009 1.93319 4.09921 2.08182 4.09921 2.23681C4.09921 2.39179 4.16009 2.54042 4.26845 2.65001C4.37681 2.7596 4.52377 2.82117 4.67702 2.82117H13.2398L13.087 3.74811L12.277 8.66477H4.73949L2.77495 3.74811L1.60308 0.840914C1.54111 0.70415 1.42937 0.596826 1.29113 0.541284C1.15289 0.485742 0.998786 0.486261 0.860911 0.542733C0.723035 0.599206 0.612007 0.70728 0.550938 0.844458C0.489868 0.981637 0.483464 1.13735 0.533058 1.27918L2.40407 5.9223L3.68102 9.34519C3.77528 9.63335 3.96993 9.83349 4.25088 9.83349H12.7663C12.9031 9.83356 13.0355 9.78452 13.14 9.6951C13.2444 9.60568 13.314 9.48168 13.3365 9.34519L14.2589 3.74811L14.4921 2.33286C14.5173 2.18001 14.4814 2.02331 14.3924 1.89722C14.3033 1.77113 14.1684 1.68598 14.0173 1.66048Z"
                                                fill="#111"></path>
                                        </svg>
                                    </button>
                                    <span class="icon-bg">
                                        <svg class="product-svg" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.7441 2.26562C11.9993 2.52083 12.1908 2.8125 12.3184 3.14062C12.446 3.45964 12.5098 3.78776 12.5098 4.125C12.5098 4.46224 12.446 4.79492 12.3184 5.12305C12.1908 5.44206 11.9993 5.72917 11.7441 5.98438L7 10.7285L2.25586 5.98438C2.00065 5.72917 1.80924 5.44206 1.68164 5.12305C1.55404 4.79492 1.49023 4.46224 1.49023 4.125C1.49023 3.78776 1.55404 3.45964 1.68164 3.14062C1.80924 2.8125 2.00065 2.52083 2.25586 2.26562C2.51107 2.01042 2.79818 1.81901 3.11719 1.69141C3.44531 1.5638 3.77799 1.5 4.11523 1.5C4.45247 1.5 4.7806 1.5638 5.09961 1.69141C5.41862 1.81901 5.71029 2.01042 5.97461 2.26562L6.58984 2.88086C6.69922 2.99935 6.83594 3.05859 7 3.05859C7.16406 3.05859 7.30078 2.99935 7.41016 2.88086L8.02539 2.26562C8.28971 2.01042 8.58138 1.81901 8.90039 1.69141C9.2194 1.5638 9.54753 1.5 9.88477 1.5C10.222 1.5 10.5501 1.5638 10.8691 1.69141C11.1973 1.81901 11.4889 2.01042 11.7441 2.26562ZM12.5645 1.44531C12.1999 1.07161 11.7806 0.79362 11.3066 0.611328C10.8418 0.429036 10.3678 0.337891 9.88477 0.337891C9.40169 0.337891 8.92773 0.429036 8.46289 0.611328C7.99805 0.79362 7.57878 1.07161 7.20508 1.44531L7 1.65039L6.79492 1.44531C6.42122 1.07161 6.00195 0.79362 5.53711 0.611328C5.07227 0.429036 4.59831 0.337891 4.11523 0.337891C3.63216 0.337891 3.15365 0.429036 2.67969 0.611328C2.21484 0.79362 1.80013 1.07161 1.43555 1.44531C1.06185 1.8099 0.779297 2.22917 0.587891 2.70312C0.405599 3.16797 0.314453 3.64193 0.314453 4.125C0.314453 4.60807 0.405599 5.08659 0.587891 5.56055C0.779297 6.02539 1.06185 6.4401 1.43555 6.80469L6.58984 11.959C6.69922 12.0775 6.83594 12.1367 7 12.1367C7.16406 12.1367 7.30078 12.0775 7.41016 11.959L12.5645 6.80469C12.9382 6.4401 13.2161 6.02539 13.3984 5.56055C13.5898 5.08659 13.6855 4.60807 13.6855 4.125C13.6855 3.64193 13.5898 3.16797 13.3984 2.70312C13.2161 2.23828 12.9382 1.81901 12.5645 1.44531Z"
                                                fill="#111111"></path>
                                        </svg>
                                    </span>
                                    <span class="icon-bg">
                                        <svg class="product-svg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7 1.98047L11.5254 4.25L7 6.51953L2.47461 4.25L7 1.98047ZM6.74023 0.818359L0.902344 3.73047C0.75651 3.80339 0.65625 3.91732 0.601562 4.07227C0.55599 4.2181 0.569661 4.36393 0.642578 4.50977C0.669922 4.57357 0.70638 4.62826 0.751953 4.67383C0.797526 4.71029 0.847656 4.74219 0.902344 4.76953L6.74023 7.68164C6.82227 7.72721 6.90885 7.75 7 7.75C7.09115 7.75 7.17773 7.72721 7.25977 7.68164L13.0977 4.76953C13.2435 4.69661 13.3392 4.58724 13.3848 4.44141C13.4395 4.28646 13.4303 4.13607 13.3574 3.99023C13.3301 3.92643 13.2936 3.8763 13.248 3.83984C13.2025 3.79427 13.1523 3.75781 13.0977 3.73047L7.25977 0.804688C7.17773 0.768229 7.09115 0.75 7 0.75C6.90885 0.75 6.82227 0.768229 6.74023 0.804688V0.818359ZM0.902344 10.6074L6.74023 13.5195C6.82227 13.5651 6.90885 13.5833 7 13.5742C7.09115 13.5742 7.17773 13.556 7.25977 13.5195L13.0977 10.6074C13.2435 10.5345 13.3392 10.4206 13.3848 10.2656C13.4395 10.1107 13.4303 9.96484 13.3574 9.82812C13.2845 9.68229 13.1706 9.58659 13.0156 9.54102C12.8607 9.48633 12.7148 9.49089 12.5781 9.55469L7 12.3438L1.42188 9.56836C1.28516 9.49544 1.13932 9.48633 0.984375 9.54102C0.829427 9.58659 0.715495 9.68229 0.642578 9.82812C0.569661 9.96484 0.55599 10.1107 0.601562 10.2656C0.65625 10.4206 0.75651 10.5345 0.902344 10.6074ZM0.902344 7.68164L6.74023 10.6074C6.82227 10.6439 6.90885 10.6621 7 10.6621C7.09115 10.6621 7.17773 10.6439 7.25977 10.6074L13.0977 7.68164C13.2435 7.61784 13.3392 7.50846 13.3848 7.35352C13.4395 7.19857 13.4303 7.04818 13.3574 6.90234C13.2845 6.75651 13.1706 6.66081 13.0156 6.61523C12.8607 6.56055 12.7148 6.56966 12.5781 6.64258L7 9.43164L1.42188 6.64258C1.28516 6.56966 1.13932 6.56055 0.984375 6.61523C0.829427 6.66081 0.715495 6.75651 0.642578 6.90234C0.569661 7.04818 0.55599 7.19857 0.601562 7.35352C0.65625 7.50846 0.75651 7.6224 0.902344 7.69531V7.68164Z"
                                                fill="#111111"></path>
                                        </svg>
                                    </span>
                                    <span class="icon-bg">
                                        <svg class="product-svg" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.0683594 5.90234C0.0227865 5.98438 0 6.07096 0 6.16211C0 6.25326 0.0227865 6.33984 0.0683594 6.42188C0.0683594 6.42188 0.123047 6.52669 0.232422 6.73633C0.341797 6.93685 0.501302 7.19206 0.710938 7.50195C0.847656 7.69336 0.998047 7.90299 1.16211 8.13086C1.33529 8.34961 1.52669 8.57292 1.73633 8.80078C2.00065 9.08333 2.29232 9.36589 2.61133 9.64844C2.93945 9.93099 3.29492 10.1908 3.67773 10.4277C4.14258 10.7194 4.65299 10.9564 5.20898 11.1387C5.76497 11.321 6.36198 11.4121 7 11.4121C7.63802 11.4121 8.23503 11.321 8.79102 11.1387C9.34701 10.9564 9.85742 10.7194 10.3223 10.4277C10.7051 10.1908 11.056 9.93099 11.375 9.64844C11.7031 9.36589 11.9993 9.08333 12.2637 8.80078C12.4733 8.57292 12.6602 8.34961 12.8242 8.13086C12.9974 7.90299 13.1523 7.69336 13.2891 7.50195C13.4987 7.19206 13.6582 6.93685 13.7676 6.73633C13.877 6.52669 13.9316 6.42188 13.9316 6.42188C13.9772 6.34896 14 6.26693 14 6.17578C14 6.08464 13.9772 5.99349 13.9316 5.90234C13.9316 5.90234 13.877 5.80208 13.7676 5.60156C13.6582 5.39193 13.4987 5.13672 13.2891 4.83594C13.1523 4.64453 12.9974 4.43945 12.8242 4.2207C12.6602 3.99284 12.4733 3.76497 12.2637 3.53711C11.9993 3.25456 11.7031 2.97201 11.375 2.68945C11.056 2.4069 10.7051 2.14714 10.3223 1.91016C9.85742 1.61849 9.34701 1.38151 8.79102 1.19922C8.23503 1.00781 7.63802 0.912109 7 0.912109C6.36198 0.912109 5.76497 1.00781 5.20898 1.19922C4.65299 1.38151 4.14258 1.61849 3.67773 1.91016C3.29492 2.14714 2.93945 2.4069 2.61133 2.68945C2.29232 2.97201 2.00065 3.25456 1.73633 3.53711C1.52669 3.76497 1.33529 3.99284 1.16211 4.2207C0.998047 4.43945 0.847656 4.64453 0.710938 4.83594C0.501302 5.13672 0.341797 5.39193 0.232422 5.60156C0.123047 5.80208 0.0683594 5.90234 0.0683594 5.90234ZM1.24414 6.16211C1.29883 6.08008 1.35807 5.98438 1.42188 5.875C1.49479 5.75651 1.58138 5.62891 1.68164 5.49219C1.80013 5.31901 1.93685 5.13216 2.0918 4.93164C2.24674 4.73112 2.41536 4.5306 2.59766 4.33008C2.83464 4.06576 3.0944 3.81055 3.37695 3.56445C3.65951 3.31836 3.96484 3.09505 4.29297 2.89453C4.6849 2.64844 5.10417 2.45247 5.55078 2.30664C6.00651 2.16081 6.48958 2.08789 7 2.08789C7.51042 2.08789 7.98893 2.16081 8.43555 2.30664C8.89128 2.45247 9.3151 2.64844 9.70703 2.89453C10.0352 3.09505 10.3405 3.31836 10.623 3.56445C10.9056 3.81055 11.1654 4.06576 11.4023 4.33008C11.5846 4.5306 11.7533 4.73112 11.9082 4.93164C12.0632 5.13216 12.1999 5.31901 12.3184 5.49219C12.4186 5.62891 12.5007 5.75651 12.5645 5.875C12.6374 5.98438 12.7012 6.08008 12.7559 6.16211C12.7012 6.24414 12.6374 6.3444 12.5645 6.46289C12.5007 6.57227 12.4186 6.69987 12.3184 6.8457C12.1999 7.01888 12.0632 7.20573 11.9082 7.40625C11.7533 7.60677 11.5846 7.80729 11.4023 8.00781C11.1654 8.26302 10.9056 8.51367 10.623 8.75977C10.3405 9.00586 10.0352 9.23372 9.70703 9.44336C9.3151 9.68034 8.89128 9.8763 8.43555 10.0312C7.98893 10.1771 7.51042 10.25 7 10.25C6.48958 10.25 6.00651 10.1771 5.55078 10.0312C5.10417 9.8763 4.6849 9.68034 4.29297 9.44336C3.96484 9.23372 3.65951 9.00586 3.37695 8.75977C3.0944 8.51367 2.83464 8.26302 2.59766 8.00781C2.41536 7.80729 2.24674 7.60677 2.0918 7.40625C1.93685 7.20573 1.80013 7.01888 1.68164 6.8457C1.58138 6.69987 1.49479 6.57227 1.42188 6.46289C1.35807 6.3444 1.29883 6.24414 1.24414 6.16211ZM9.33789 6.16211C9.33789 5.8431 9.27409 5.54232 9.14648 5.25977C9.02799 4.97721 8.86393 4.73112 8.6543 4.52148C8.44466 4.31185 8.19401 4.14779 7.90234 4.0293C7.61979 3.90169 7.31901 3.83789 7 3.83789C6.68099 3.83789 6.37565 3.90169 6.08398 4.0293C5.80143 4.14779 5.55534 4.31185 5.3457 4.52148C5.13607 4.73112 4.96745 4.97721 4.83984 5.25977C4.72135 5.54232 4.66211 5.8431 4.66211 6.16211C4.66211 6.49023 4.72135 6.79557 4.83984 7.07812C4.96745 7.36068 5.13607 7.60677 5.3457 7.81641C5.55534 8.02604 5.80143 8.19466 6.08398 8.32227C6.37565 8.44076 6.68099 8.5 7 8.5C7.31901 8.5 7.61979 8.44076 7.90234 8.32227C8.19401 8.19466 8.44466 8.02604 8.6543 7.81641C8.86393 7.60677 9.02799 7.36068 9.14648 7.07812C9.27409 6.79557 9.33789 6.49023 9.33789 6.16211ZM8.16211 6.16211C8.16211 6.32617 8.13021 6.48112 8.06641 6.62695C8.01172 6.76367 7.92969 6.88672 7.82031 6.99609C7.72005 7.09635 7.59701 7.17839 7.45117 7.24219C7.31445 7.30599 7.16406 7.33789 7 7.33789C6.83594 7.33789 6.68099 7.30599 6.53516 7.24219C6.39844 7.17839 6.27995 7.09635 6.17969 6.99609C6.07031 6.88672 5.98372 6.76367 5.91992 6.62695C5.86523 6.48112 5.83789 6.32617 5.83789 6.16211C5.83789 6.00716 5.86523 5.86133 5.91992 5.72461C5.98372 5.57878 6.07031 5.45117 6.17969 5.3418C6.27995 5.23242 6.39844 5.15039 6.53516 5.0957C6.68099 5.0319 6.83594 5 7 5C7.16406 5 7.31445 5.0319 7.45117 5.0957C7.59701 5.15039 7.72005 5.23242 7.82031 5.3418C7.92969 5.45117 8.01172 5.57878 8.06641 5.72461C8.13021 5.86133 8.16211 6.00716 8.16211 6.16211Z"
                                                fill="#111111"></path>
                                        </svg>
                                </span>
                                </div>
                                <div class="card-product-discount">
                                    <div class="red ${!discount ? 'd-none' : null}">-${discount}%</div>
                                    <div class="blue">Pre-Order</div>
                                </div>
                            </div>
                            <div class="card-body">
                                <h6 class="product-vendor">UMINO</h6>
                                <h4 class="card-title mb-0">${name}</h4>
                                <div class="product-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <div>
                                    <span class="product-price ${
                                        discount ? 'sale' : null
                                    }">$${CartList.calcDiscount.call(CartList, discount, price)}</span>
                                    <span class="product-price-sale ${
                                        discount ? null : 'd-none'
                                    } ">$${price}</span>              
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
        `;
    });
    container.innerHTML = html.join('');
}

async function rangeFilter() {
    async function renderPriceInput() {
        let maxPrice = data.reduce((max, p) => {
            const price = CartList.calcDiscount(p.discount, p.price);
            return (max = price > max ? price : max);
        }, 0);

        
        maxPrice = Math.ceil(maxPrice);

        const filterPrice = $('#filter-price');
        filterPrice.innerHTML = `
            <div class="range-slider">
                <input type="range" class="min-price filter-element" value="10" min="0" max="${maxPrice}" step="1" />
                <input type="range" class="max-price filter-element" value="${
                    maxPrice - 10
                }" min="0" max="${maxPrice}" step="1" />
            </div>
            <div class="price-content">
                <span class="filter-link">Price:</span> 
                <span class="mx-2" id="min-value"></span> - <span class="mx-2" id="max-value"></span>
            </div>`;
    }

    function processInputPrice() {
        let minValue = document.getElementById('min-value');
        let maxValue = document.getElementById('max-value');

        function validateRange(minPrice, maxPrice) {
            if (minPrice > maxPrice) {
                // Swap to Values
                let tempValue = maxPrice;
                maxPrice = minPrice;
                minPrice = tempValue;
            }

            minValue.value = minPrice;
            maxValue.value = maxPrice;

            minValue.innerHTML = '$' + minPrice;
            maxValue.innerHTML = '$' + maxPrice;
        }

        const inputElements = document.querySelectorAll('.range-slider input');

        inputElements.forEach(element => {
            element.addEventListener('change', e => {
                let minPrice = parseInt(inputElements[0].value);
                let maxPrice = parseInt(inputElements[1].value);

                validateRange(minPrice, maxPrice);
            });
        });
        validateRange(inputElements[0].value, inputElements[1].value);
    }

    function renderSizeOptions() {
        let sizeList = [];

        for (let i = 0; i < data.length; i++) {
            const productSize = mf.handleInputSize(data[i].size);

            for (let j = 0; j < productSize.length; j++) {
                let isTrue = true;

                for (let k = 0; k < sizeList.length; k++) {
                    if (sizeList[k] === productSize[j]) {
                        isTrue = false;
                    }
                }

                isTrue ? sizeList.push(productSize[j]) : null;
            }
        }
        sizeList = sizeList.sort();

        const html = sizeList.map(s => {
            return `
                <div class="d-inline-block">
                    <input type="checkbox" name="filter-size-options" value="${s}" id="size-${s}" class="filter-element"/>
                    <label for="size-${s}" class="label-size">${s}</label>
                </div>
            `;
        });
        const filterSize = $('#filter-size');
        filterSize.innerHTML = html.join('');
    }

    function renderFeatureProduct() {
        const products = data.slice(0, 3);
        const html = products.map(p => {
            const { img, name, price, discount } = p;
            return `
                <li class="filter-item">
                    <a href="#" class="filter-link">
                        <div class="card border-0">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${img}" class="img-fluid" alt="Featured product" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body pt-0">
                                        <h5 class="card-title">${name}</h5>
                                        <div class="icon_star me-2">
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div class="d-flex align-items-center price-group">
                                            <p class="mb-0 me-2 price price-product ${
                                                discount ? 'sale' : null
                                            }">$${CartList.calcDiscount.call(CartList, discount, price)}</p>
                                            <p class="mb-0 price price-product-discount ${
                                                discount ? 'd-block' : null
                                            }">$${price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            `;
        });
        const featuredProduct = $('#featuredProduct');
        featuredProduct.innerHTML = html.join('');
    }

    const data = await api.getProduct();
    await renderPriceInput();
    processInputPrice();
    renderSizeOptions();
    renderFeatureProduct();
    e.EventSideBar(data);
}

export function handleFilter(data, filterElement) {
    const value = [];
    const sizeConditions = [];
    let i = 0;

    filterElement.forEach((e, index) => {
        if (e.type === 'range') {
            value[index] = e.value;
        } else {
            e.checked ? (sizeConditions[i++] = e.value) : null;
        }
    });

    let min = Number(value[0]);
    let max = Number(value[1]);

    if (min > max) {
        let tempValue = max;
        max = min;
        min = tempValue;
    }

    let products = [];
    if (sizeConditions.length) {
        for (let i = 0; i < data.length; i++) {
            const { size, price, discount } = data[i];
            const priceDiscount = CartList.calcDiscount.call(CartList, discount, price);
            const sizeArray = mf.handleInputSize(size);

            if (priceDiscount >= min && priceDiscount <= max) {
                let isTrue = false;
                for (let j = 0; j < sizeArray.length; j++) {
                    for (let k = 0; k < sizeConditions.length; k++) {
                        if (sizeConditions[k] === sizeArray[j]) {
                            isTrue = true;
                            break;
                        }
                    }
                }
                isTrue ? products.push(data[i]) : null;
            }
        }
    } else {
        data.forEach(p => {
            const { discount, price: priceProduct } = p;
            const price = CartList.calcDiscount.call(CartList, discount, priceProduct);
            price >= min && price <= max ? products.push(p) : null;
        });
    }

    return products;
}
