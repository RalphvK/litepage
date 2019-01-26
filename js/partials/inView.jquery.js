$.fn.isInView = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.inView = function (options) {
    // parsing options
    var defaults = {
        in: function() {},
        out: function () {}
    };
    var callback = Object.assign(defaults, options);

    // persistent variables
    var element = $(this);
    var inView = false; // state

    // update function to check if in view and execute callbacks
    function update() {
        // check for change
        var newState = element.isInView();
        if (inView !== newState) {
            inView = newState;
            inView ? callback.in() : callback.out();
        }
    }
    update(); // run on execution

    // run on change
    $(window).on('resize scroll', function () {
        update();
    });
};