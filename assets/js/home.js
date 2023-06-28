const $ = document.querySelector.bind(document);
// Show / hide mobile navbar
(function showMobile() {
    $('#nav-toggle-icon').onclick = () => {
        $('.navModal').classList.toggle('show');
    };

    $('#navModalClose').onclick = () => {
        $('.navModal').classList.remove('show');
    };

    $('.navModal').onclick = () => {
        $('.navModal').classList.remove('show');
    };

    $('.nav-mobile').onclick = e => {
        e.stopPropagation();
    };
})();

// Show / hide search modal
(function showNavSearch() {
    $('#navSearch').onclick = () => {
        $('.searchModal').classList.add('show');
    };

    $('.searchModalClose').onclick = () => {
        $('.searchModal').classList.remove('show');
    };
})();

// Show / hide giỏ hàng
(function showCartSearch() {
    $('#cartButton').onclick = () => {
        $('.cartModal').classList.add('show');
    };

    $('#closeCartIcon').onclick = () => {
        $('.cartModal').classList.remove('show');
    };

    $('.cartModal').onclick = () => {
        $('.cartModal').classList.remove('show');
    };

    $('#cartContainer').onclick = e => {
        e.stopPropagation();
    };
})();
