var leisurely = function(options) {
    // parsing options
    var defaults = {
        elements: null,
        interval: 0,
        onload: function () {}
    };
    var options = Object.assign(defaults, options);

    // lazy load
    function load(element) {
        if (element.hasAttribute('data-onload')) {
            var onload = function () {
                eval(element.getAttribute('data-onload'));
            }
        } else {
            var onload = options.onload;
        }
        if (element.hasAttribute('data-method')) {
            switch (element.getAttribute('data-method')) {
                case 'svg':
                    loadSvg(element, onload);
                    break;
                default:
                    setSrc(element, onload);
                    break;
            }
        } else {
            // default method
            setSrc(element, onload);
        }
    }

    // set image src
    function setSrc(element, onload) {
        element.src = element.getAttribute("data-src");
        element.addEventListener("load", function (event) {
            onload();
            if (options.interval > 0) {
                setTimeout(function() {
                    loadNext();
                }, options.interval);
            } else {
                loadNext();
            }
        });
    }

    // svg loader
    function loadSvg(element, onload) {
        $.ajax({
            url: element.getAttribute('data-src'),
            dataType: 'html',
            type: 'GET',
            success: function (data) {
                $(element).replaceWith(data);
                onload();
                loadNext();
            }
        });
    }

    // iterate through elements
    var i = 0;
    var loadNext = function() {
        if (i < options.elements.length) {
            load(options.elements[i]);
            i++;
        }
    };
    loadNext();
};