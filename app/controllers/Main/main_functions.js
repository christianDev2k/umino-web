import * as api from '../../../assets/js/api.js';
import * as mf from '../Main/main_event.js';
import CartList from '../../models/Cart.js';

const $ = document.querySelector.bind(document);

export function renderPopularProducts(productsList) {
    const container = $('#popular-products');
    const html = productsList.map(p => {
        const { id, img, name, price, discount } = p;
        return `
            <div class="col-6 col-md-4 col-lg-2 mt-4">
                <a href="#" data-id="${id}" class="card-product-link">
                    <div class="card">
                        <img class="card-img-top" src="${img}" alt="Title" />
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
                                <span class="product-price ${discount ? 'sale' : null}">$${discount ? (price * ((100 - discount) / 100)).toFixed(2) : price}</span>
                                <span class="product-price-sale ${discount ? null : 'd-none'} ">$${price}</span>              
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    });
    container.innerHTML = html.join('');
}

export async function renderQuickView(id) {
    const product = await api.getProduct(id);
    const salePrice = $('#qvPriceSale');
    const priceElement = $('#qvPrice');

    const { img, name, price, discount, size, desc } = product;

    $('#qvImg').style.backgroundImage = `url(" ${img} ")`;
    $('#qv-name').innerHTML = name;
    $('#qvDesc').innerHTML = desc;

    if (discount) {
        salePrice.classList.add('sale');
        salePrice.innerHTML = '$' + (price * ((100 - discount) / 100)).toFixed(2);
        priceElement.classList.add('d-block');
        priceElement.innerHTML = price + '$';
    } else {
        salePrice.innerHTML = price;
        salePrice.classList.remove('sale');
        priceElement.classList.remove('d-block');
    }

    const sizeList = size.split('');
    const htmlSizeOptions = await sizeList.map((s, index) => {
        return `
                <label for="size-${s}" class="label-size ${index === 0 ? 'active' : null}">${s}</label>
                <input type="radio" name="size-options" value="${s}" id="size-${s}" ${index === 0 ? 'checked' : null} />
        `;
    });
    $('#sizeOptions').innerHTML = htmlSizeOptions.join('');

    mf.eventQuickView(product);
}

export function addToCart(product) {
    const { id: idProduct, cartSize: productSize } = product;

    if (CartList.list.length) {
        let isAdded = false;
        CartList.list = CartList.list.map(p => {
            if (p.id === idProduct && p.cartSize === productSize) {
                const newQty = p.cartQty + 1;
                isAdded = true;
                return {
                    ...p,
                    cartQty: newQty,
                };
            }
        });
        console.log(CartList);
        !isAdded ? CartList.addToCartMethod(product) : null;
    } else {
        CartList.addToCartMethod(product);
    }
    console.log(CartList.list);

    // renderCart(CartList.list);
}

function renderCart(cartList) {
    console.log(cartList);
    if (!cartList.length) {
    } else {
    }
}
