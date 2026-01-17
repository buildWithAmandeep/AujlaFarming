(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    const $window = $(window);
    const $body = $('html, body');
    const $navbar = $('.glass-nav');
    const $navLinks = $('.glass-nav .navbar-nav a[href^="#"]');
    const $sections = $('section[id]');
    const navOffset = 90;

    const toggleNavbarState = () => {
        if ($window.scrollTop() > 120) {
            $navbar.addClass('nav-scrolled shadow-sm');
        } else {
            $navbar.removeClass('nav-scrolled shadow-sm');
        }
    };

    const setActiveNav = () => {
        const currentPos = $window.scrollTop() + navOffset + 10;
        let currentId = 'home';

        $sections.each(function () {
            const $section = $(this);
            if (currentPos >= $section.offset().top && currentPos < $section.offset().top + $section.outerHeight()) {
                currentId = $section.attr('id');
                return false;
            }
        });

        $navLinks.removeClass('active');
        $navLinks.filter(`[href="#${currentId}"]`).addClass('active');
    };

    const toggleBackToTop = () => {
        if ($window.scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    };

    toggleNavbarState();
    setActiveNav();
    toggleBackToTop();

    let scrollTimeout;
    $window.on('scroll', function () {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function () {
            toggleNavbarState();
            setActiveNav();
            toggleBackToTop();
        });
    });

    $navLinks.on('click', function (e) {
        const target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $body.animate({
                scrollTop: target.offset().top - navOffset
            }, 900, 'easeInOutExpo');
            $('.navbar-collapse').removeClass('show');
        }
    });

    $('.back-to-top').click(function () {
        $body.animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        margin: 30,
        autoHeight: true
    });

    
})(jQuery);

