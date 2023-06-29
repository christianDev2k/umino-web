const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Wow library
const wow = new WOW();
wow.init();

// Owl library
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
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
    $('#register__btn').onclick = e => {
        e.preventDefault();
        $('.modalContainer.login').classList.remove('login');
        $('#register').classList.add('register');
    };

    $('#closeRegisterIcon').onclick = () => {
        $('#register').classList.remove('register');
        $('#login').classList.add('login');
    };
}

function showModal(modal, modalContainer, closeButton, modalIcon) {
    $(modalIcon).onclick = () => {
        $(modal).classList.add('show');
    };

    $(closeButton).onclick = () => {
        $(modal).classList.remove('show');
    };

    $(modal).onclick = () => {
        $(modal).classList.remove('show');
    };

    $(modalContainer).onclick = e => {
        e.stopPropagation();
    };
}

function navActive(navTabSelector) {
    const navTab = $(navTabSelector);
    const navLink = navTab.querySelectorAll('.nav-link');

    navLink.forEach(nav => {
        nav.onclick = () => {
            navTab.querySelector('.nav-link.active').classList.remove('active');
            nav.classList.add('active');
        };
    });
}
