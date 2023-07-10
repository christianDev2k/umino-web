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