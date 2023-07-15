import * as f from '../../app/controllers/Homepages/fnc_Homepage.js';

const app = async() => {
    f.setUI();
}

app();

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
