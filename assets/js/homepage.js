import MainEvents from '../../app/controllers/Main/main_event.js';


MainEvents();

// Owl library
$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
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
