
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            800:{
                items:3
            },
            1100: {
                items: 4
            },
            1300: {
                items: 4
            },
            1500: {
                items: 5
            },
            1800: {
                items: 5
            }
        }
    });
});