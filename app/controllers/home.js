const $ = document.querySelector.bind(document);
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
// Show / hide mobile navbar
showModal('.navModal', '.nav-mobile', '#navModalClose', '#nav-toggle-icon');

// Show / hide search modal
showModal('.searchModal', '.searchModal .modalContainer', '.searchModalClose', '#navSearch');

// Show / hide giỏ hàng
showModal('.cartModal', '.cartModal .modalContainer', '#closeCartIcon', '#cartButton');

// Show / hide login
handAccountModal();
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

