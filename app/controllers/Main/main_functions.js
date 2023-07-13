import * as api from '../../../assets/js/api.js';
import * as me from '../Main/main_event.js';
import CartList from '../../models/Cart.js';

const $ = document.querySelector.bind(document);

// Common: Set local
export function SetLocalStorages(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Common: Get Local
export function GetLocalStorages(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

// Common: Render quantity control form
export function qtyControlForm(selectorForm, selectorInput, selectorClosest, classMinus) {
    const quickViewQtyInput = $(selectorInput);
    $(selectorForm).onclick = e => {
        const controllers = e.target.closest(selectorClosest);
        let qtyValue = parseInt(quickViewQtyInput.value);

        if (controllers) {
            controllers.classList.contains(classMinus) ? (qtyValue > 1 ? (qtyValue -= 1) : null) : (qtyValue += 1);
            quickViewQtyInput.value = qtyValue;
        }
    };
}

// Common: Animation select size change
export function getSizeOption(inputsName, SelectedElement) {
    const sizeOptions = document.getElementsByName(inputsName);
    const sizeSelectedElement = $(SelectedElement);

    let sizeSelected = -1;
    sizeOptions.forEach(i => {
        if (i.checked) {
            sizeSelectedElement.innerHTML = i.value;
            sizeSelected = i.value;
        }
        i.onchange = () => {
            if (i.checked) {
                sizeSelectedElement.innerHTML = i.value;
                sizeSelected = i.value;
            }
        };
    });
    return sizeSelected;
}

// Search modal: Render UI
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
                                <span class="product-price ${discount ? 'sale' : null}">$${CartList.calcDiscount(discount, price)}</span>
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

// Quickview: Render UI
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
        salePrice.innerHTML = '$' + CartList.calcDiscount(discount, price);
        priceElement.classList.add('d-block');
        priceElement.innerHTML = price + '$';
    } else {
        salePrice.innerHTML = price;
        salePrice.classList.remove('sale');
        priceElement.classList.remove('d-block');
    }

    const sizeList = size.split('');
    const htmlSizeOptions = sizeList.map((s, index) => {
        return `
                <div>
                    <input type="radio" name="size-options" value="${s}" id="size-${s}" ${index === 0 ? 'checked' : null} />
                    <label for="size-${s}" class="label-size">${s}</label>
                </div>
        `;
    });
    $('#sizeOptions').innerHTML = htmlSizeOptions.join('');

    me.eventQuickView(product);
}

// Quickview: Handle add to cart
export function HandleAddToCart(product) {
    const { id: addedID, cartSize: addedSize, cartQty: addedQty } = product;

    if (CartList.list.length) {
        let isAdded = false;

        CartList.list = CartList.list.map(p => {
            if (p.id === addedID && p.cartSize === addedSize) {
                const productQty = parseInt(p.cartQty) + parseInt(addedQty);
                isAdded = true;
                return {
                    ...p,
                    cartQty: productQty,
                };
            }
            return p;
        });
        isAdded ? SetLocalStorages('cart', CartList.list) : null;

        if (!isAdded) {
            CartList.addToCartMethod(product);
            SetLocalStorages('cart', CartList.list);
        }
    } else {
        CartList.addToCartMethod(product);
        SetLocalStorages('cart', CartList.list);
    }

    handleRenderCart(CartList.list);
}

// Cart: Handle render cart
export function handleRenderCart(cartList = CartList.list) {
    const cartListElement = $('#shopping-cart-products');
    const truckProcess = $('.truck-process');
    const truckIcon = $('.truck-icon');
    const discountGroup = $('.cart-checkout .discount');
    const subtotalGroup = $('.cart-checkout .subtotal');

    function haveProductUI() {
        truckProcess.style.backgroundColor = '#d73f0f';
        truckIcon.style.right = '0';
        truckIcon.style.transform = 'translate(0, -50%)';
        discountGroup.classList.remove('d-none');
        subtotalGroup.classList.remove('d-none');
    }

    function nonProductUI() {
        truckProcess.style.backgroundColor = '#EBEBEB';
        truckIcon.style.right = '100%';
        truckIcon.style.transform = 'translate(100%, -50%)';
        discountGroup.classList.add('d-none');
        subtotalGroup.classList.add('d-none');
    }

    function cartIconQuantity() {
        const cartNum = cartList.reduce((acc, p) => {
            acc += parseInt(p.cartQty);
            return acc;
        }, 0);
        $('#cart-num').innerHTML = cartNum;
    }

    function renderHTMLCartList() {
        if (cartList.length) {
            const html = cartList.map((p, index) => {
                const { id, img, name, price, cartQty, cartSize, discount } = p;
                return `
                        <div class="product-item mt-3">
                            <div class="card mb-3 border-0">
                                <div class="d-flex">
                                    <div class="product-img">
                                        <img src="${img}" class="img-fluid" alt="Card title" />
                                    </div>
                                    <div class="product-info">
                                        <div class="card-body p-0">
                                            <h5 class="product-title mb-0">${name}</h5>
                                            <p class="product-size mb-0">${cartSize}</p>
                                            <p class="product-price">$${CartList.calcDiscount(discount, price)}</p>
                                            <div id="cart-form-${index}" class="cart-qty-form product-qty d-flex align-items-center">
                                                <button class="cart-qty-control qty-down">
                                                    <i class="fa-solid fa-minus"></i>
                                                </button>
                                                <input type="number" value="${cartQty}" class="qty-value bg-transparent border-0" />
                                                <button class="cart-qty-control qty-up">
                                                    <i class="fa-solid fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-btn">
                                        <button id="cart-del-${index}" class="product-del bg-transparent border-0 d-block mb-2">
                                            <i class="fa-regular fa-trash-can"></i>
                                        </button>
                                        <button id="cart-edit-${index}" class="product-edit bg-transparent border-0 d-block" data-bs-toggle="modal" data-bs-target="#editCartModal">
                                            <i class="fa-regular fa-pen-to-square"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                `;
            });
            cartListElement.innerHTML = html.join('');
            haveProductUI();
        } else {
            cartListElement.innerHTML = `
                <div class="text-center cart-empty-notice">
                    <svg width="62" height="69" viewBox="0 0 62 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2.08737 28.4645C2.08737 28.4645 2.08737 28.4645 2.08737 28.4645L2.73622 31.7945C2.84185 32.3366 2.48803 32.8616 1.94594 32.9673C1.40385 33.0729 0.878769 32.7191 0.773143 32.177L0.124283 28.847C-0.665369 24.7938 2.40693 21 6.52744 21H55.4733C59.5451 21 62.6061 24.7104 61.898 28.7297L55.7575 63.5715C55.2054 66.7055 52.5032 69 49.3328 69H13.9327C10.8871 69 8.25497 66.8784 7.57386 63.8981C7.57386 63.8981 7.57386 63.8981 7.57386 63.8981L6.61662 59.71C6.49356 59.1716 6.83027 58.6354 7.36867 58.5123C7.90707 58.3893 8.44328 58.726 8.56634 59.2644L9.52358 63.4524C9.99963 65.5355 11.8324 67 13.9327 67H49.3328C51.5189 67 53.4017 65.416 53.7878 63.2245L59.9283 28.3827C60.4248 25.565 58.2786 23 55.4733 23H6.52744C3.68849 23 1.53379 25.623 2.08737 28.4645Z"
                            fill="#DEDEDE"></path>
                        <path
                            d="M28.9027 2.47902C29.391 1.74918 29.1972 0.760308 28.4699 0.27033C27.7425 -0.219647 26.7571 -0.0251418 26.2688 0.704705L9.76598 25.3734C9.2777 26.1032 9.47153 27.0921 10.1988 27.5821C10.9262 28.072 11.9116 27.8775 12.3999 27.1477L28.9027 2.47902Z"
                            fill="#DEDEDE"></path>
                        <path
                            d="M49.6341 26.9818C50.3923 27.422 51.3625 27.162 51.8014 26.401C52.2397 25.6401 51.9806 24.6664 51.2224 24.2262L31.0853 12.5365C30.327 12.0963 29.3567 12.3563 28.9181 13.1173C28.4794 13.8781 28.7385 14.8518 29.4967 15.292L49.6341 26.9818Z"
                            fill="#DEDEDE"></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M31.0099 46.9028C30.7467 46.9639 30.423 47.2225 30.2155 47.4984C29.7609 48.1028 28.9649 48.1704 28.4376 47.6495C27.9102 47.1285 27.8512 46.2162 28.3058 45.6118C28.7285 45.0498 29.5089 44.3029 30.5098 44.0707C31.0378 43.9482 31.6328 43.9702 32.2308 44.2541C32.8242 44.5358 33.335 45.0345 33.7603 45.7078C34.1687 46.354 34.0425 47.2573 33.4786 47.7253C32.9147 48.1933 32.1266 48.0487 31.7183 47.4024C31.5084 47.0702 31.3454 46.9614 31.266 46.9237C31.1911 46.8882 31.114 46.8787 31.0099 46.9028Z"
                            fill="#DEDEDE"></path>
                        <path d="M22.5 42C23.3284 42 24 41.3284 24 40.5C24 39.6716 23.3284 39 22.5 39C21.6716 39 21 39.6716 21 40.5C21 41.3284 21.6716 42 22.5 42Z" fill="#DEDEDE"></path>
                        <path d="M39.5 42C40.3287 42 41 41.3284 41 40.5C41 39.6716 40.3287 39 39.5 39C38.6713 39 38 39.6716 38 40.5C38 41.3284 38.6713 42 39.5 42Z" fill="#DEDEDE"></path>
                    </svg>
                    <p class="heading mt-3">Your cart is empty.</p>
                    <p class="text">You may check out all the available products and buy some in the shop.</p>
                    <button id="cart-shopBtn" class="btn btn--large btn--primary">RETURN TO SHOP</button>
                </div>
            `;
            nonProductUI();
        }
    }

    function checkOutCart() {
        const total = cartList.reduce((acc, p) => {
            const { discount, cartQty, price } = p;
            acc += cartQty * CartList.calcDiscount(discount, price);
            return acc;
        }, 0);
        $('#cart-total').innerHTML = '$' + total.toFixed(2);
    }

    renderHTMLCartList();
    cartIconQuantity();
    checkOutCart();

    me.cartEvents();
}

// Cart: Handle edit quantity in cart
export function handleEditQtyCart(e) {
    if (e) {
        const formSelector = e.target.closest('.cart-qty-form').id;
        const controlBtn = e.target.closest('.cart-qty-control');

        const inputForm = $('#' + formSelector);
        let inputValue = inputForm.querySelector('.qty-value').value;

        if (controlBtn) {
            const index = formSelector.split('-')[2];
            if (controlBtn.classList.contains('qty-down')) {
                if (CartList.list[index].cartQty > 1) {
                    const editedProduct = {
                        ...CartList.list[index],
                        cartQty: CartList.list[index].cartQty - 1,
                    };
                    CartList.editCartMethod(index, editedProduct);
                    inputValue = CartList.list[index].cartQty;
                    SetLocalStorages('cart', CartList.list);
                } else {
                    CartList.deleteCartMethod(index);
                    SetLocalStorages('cart', CartList.list);
                }
                handleRenderCart(CartList.list);
            } else {
                const editedProduct = {
                    ...CartList.list[index],
                    cartQty: parseInt(CartList.list[index].cartQty) + 1,
                };
                CartList.editCartMethod(index, editedProduct);
                inputValue = CartList.list[index].cartQty;
                SetLocalStorages('cart', CartList.list);
                handleRenderCart(CartList.list);
            }
        }
    } else {
    }
}

// Cart: Render edit modal
export function renderEditModal(index) {
    const { img, name, size, price, discount, cartQty } = CartList.list[index];

    const editCartModal = $('#editCartModal');

    editCartModal.querySelector('.qty-value').value = cartQty;
    editCartModal.querySelector('.img').src = img;
    editCartModal.querySelector('.product-name').innerText = name;
    editCartModal.querySelector('.price').innerText = '$' + CartList.calcDiscount(discount, price);

    const sizeList = size.split('');
    const htmlSizeOptions = sizeList.map(s => {
        return `
               <div>
                    <input type="radio" name="edit-size-options" value="${s}" id="edit-size-${s}" ${CartList.list[index].cartSize === s ? 'checked' : null} />
                    <label for="edit-size-${s}" class="label-size">${s}</label>
               </div>
        `;
    });
    $('#editSizeOptions .size-options').innerHTML = htmlSizeOptions.join('');

    me.editOptionsEvents(index);
}

// Cart: Edit options
export function handleEditOptions(index) {
    const qtyValue = document.querySelector('.edit-qty-form .qty-value').value;
    const sizeSelected = getSizeOption('edit-size-options', '.edit-size-options .size');


    const editedProduct = {
        ...CartList.list[index],
        cartQty: qtyValue,
        cartSize: sizeSelected,
    };
    CartList.deleteCartMethod(index);
    HandleAddToCart(editedProduct);
    SetLocalStorages('cart', CartList.list);
    handleRenderCart();

    $('#closeEditBtn').click();
    $('#cartButton').click();
}
