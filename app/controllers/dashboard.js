const $ = document.querySelector.bind(document);

$('.navbar__toogle-sidebar').onclick = () => {
    $('.sidebar').classList.toggle('show');
}