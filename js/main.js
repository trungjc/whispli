var _mcgc = {
    init: function() {
        'use strict';
        if ($('.feature-post').length) _mcgc.widgetPostSlie.init();
        _mcgc.mobileMenu.init();
        _mcgc.topMenu.init();
    },
    topMenu: {
        init: function(ele) {
            'use strict';
            $('.parent-menu').hover(function() {
                    if ($('.navbar-toggle').css('display') == 'none') {
                        $(this).addClass('active').siblings().children('.dropdown-menu').hide();
                        var dropdownMenu = $(this).find('.dropdown-menu');
                        dropdownMenu.fadeIn(300);
                    }
                },
                function() {
                    if ($('.navbar-toggle').css('display') == 'none') {
                        var dropdownMenu = $(this).removeClass('active').find('.dropdown-menu');
                        dropdownMenu.fadeOut(300);
                    }
                });

            // Optional: Make the first link a working link! 
            // - expected behaviour on hover menus.
            $('.parent-menu').on('show.bs.dropdown', function() {
                if ($('.navbar-toggle').css('display') == 'none') {
                    var location = $(this).attr('href');
                    if(location) {

                    window.location.href = location;
                    }
                    return false;
                }
            });

            $(window).on('scroll', function() {
                //var navHeight = $(window).height() - $('.header.navbar').offset().top;
                if ($(window).scrollTop() > 100) {
                    $('.header.navbar').addClass('navbar-fixed-top');
                } else {
                    $('.header.navbar').removeClass('navbar-fixed-top');
                }
            });

        }
    },
    mobileMenu: {
        init: function(ele) {
            'use strict';
            $('body').on(' show.bs.collapse', function() {
                $(this).addClass('no-scroll-y')
            })
            $('body').on('hidden.bs.collapse', function() {
                $(this).removeClass('no-scroll-y')
            })

            $('.icon-cross').on('click', function() {
                $('.navbar-toggle').trigger('click');
            });

        }
    },
    widgetPostSlie: {
        init: function(ele) {
            'use strict';

            $('.feature-post').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 300,
                autoplaySpeed: 5000,
                slidesToShow: 3,
                adaptiveHeight: true,
                responsive: [

                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: false
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }

    }
};


function clearText(field) {
    if (field.defaultValue == field.value) field.value = '';
    else if (field.value == '') field.value = field.defaultValue;
    //<input type="text" onblur="clearText(this)" onfocus="clearText(this)" value="value"/>
}

//Smart Resize
(function($, sr) {
    var debounce = function(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 200);
        };
    };
    // smartresize
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');

$(document).ready(function() {
    'use strict';
    _mcgc.init();

});

$(function() {

    if ($("#slideshow-image").length) {
        var opts = {
            fx: 'scrollDown',
            speed: '300',
            timeout: 10000,
            pager: '#nav',
            slideResize: 0,
            fit: 1
        };

        $(window).load(function() {
            $("#slideshow-image").before('<div id="nav">').cycle(opts);
        });

        $(window).smartresize(function() {
            opts.height = $("#slideshow-image img:first-child").height();
            $("#slideshow-image").cycle('destroy');
            $("#slideshow-image").cycle(opts);
        });
    }


});
