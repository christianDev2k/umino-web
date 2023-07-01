const _$ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

// Wow library
const wow = new WOW();
wow.init();

// Owl library
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    responsive: {
        0: {
            items: 2,
        },
        768: {
            items: 3,
        },
        1200: {
            items: 4,
        },
    },
});

// Show / hide mobile navbar
showModal('.navModal', '.nav-mobile', '#navModalClose', '#nav-toggle-icon');

// Show / hide search modal
showModal('.searchModal', '.searchModal .modalContainer', '.searchModalClose', '#navSearch');

// Show / hide giỏ hàng
showModal('.cartModal', '.cartModal .modalContainer', '#closeCartIcon', '#cartButton');

// Show / hide login
handAccountModal();

// Header nav active
navActive('header .navbar-nav');

// Trend product tabs active
navActive('.trendProduct .nav-tabs');

// =================================================================

function handAccountModal() {
    showModal('.loginModal', '.loginModal .modalContainer', '.closeLoginIcon', '#loginBtn');
    _$('#register__btn').onclick = e => {
        e.preventDefault();
        _$('.modalContainer.login').classList.remove('login');
        _$('#register').classList.add('register');
    };

    _$('#closeRegisterIcon').onclick = () => {
        _$('#register').classList.remove('register');
        _$('#login').classList.add('login');
    };
}

function showModal(modal, modalContainer, closeButton, modalIcon) {
    _$(modalIcon).onclick = () => {
        _$(modal).classList.add('show');
    };

    _$(closeButton).onclick = () => {
        _$(modal).classList.remove('show');
    };

    _$(modal).onclick = () => {
        _$(modal).classList.remove('show');
    };

    _$(modalContainer).onclick = e => {
        e.stopPropagation();
    };
}

function navActive(navTabSelector) {
    const navTab = _$(navTabSelector);
    const navLink = navTab.querySelectorAll('.nav-link');

    navLink.forEach(nav => {
        nav.onclick = () => {
            navTab.querySelector('.nav-link.active').classList.remove('active');
            nav.classList.add('active');
        };
    });
}
