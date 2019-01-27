var leisurely = function(options) {
    // parsing options
    var defaults = {
        elements: null,
        interval: 100
    };
    var options = Object.assign(defaults, options);

    // set image src
    function setSrc(element) {
        element.src = element.getAttribute("data-src");
        element.addEventListener("load", function (event) {
            loadNext();
        });
    }

    // iterate through elements
    var i = 0;
    var loadNext = function() {
        if (i < options.elements.length) {
            setSrc(options.elements[i]);
            i++;
        }
    };
    loadNext();
};