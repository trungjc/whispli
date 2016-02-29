/**
 * Created by KienNguyen on 4/2/2015.
 */

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
//=================================================================

function clearText(field) {
    if (field.defaultValue == field.value) field.value = '';
    else if (field.value == '') field.value = field.defaultValue;
    //<input type="text" onblur="clearText(this)" onfocus="clearText(this)" value="value"/>
}

//=================================================================

function equalheight(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {
        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}
//=====================================================================
var tablet = 768;

var _mcgc = {
    init: function() {
        'use strict';
        _mcgc.widgetPostSlie.init();
        //_mcgc.heroBanner.init();
        _mcgc.mobileMenu.init();
    },
    heroBanner: {
        init: function(ele) {
            'use strict';
            if ( $(".slideshow-image").length > 0) {
                var opts = {
                    fx: 'scrollDown',
                    speed: '300',
                    timeout: 3000,
                    pager: '#nav',
                    slideResize: 0,
                    fit: 1
                }
                $(".slideshow-image").before('<div id="nav">').cycle(opts);
            }

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

$(document).ready(function() {
    'use strict';
    _mcgc.init();

});

$(window).load(function() {
    'use strict';
    // HERO BANNER - INIT
});
