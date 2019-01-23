var typeWriter = {

    // separate chars
    separateChars(str) {
        var output = '';
        for (var i = 0; i < str.length; i++) {
            output += '<span class="typechar">' + str.charAt(i) + '</span>';
        }
        return output;
    },

    css(element, options) {
        // get text
        var text = element.textContent;

        // update html 
        element.innerHTML = this.separateChars(text);

        // get all letters as DOM nodes
        var animeLetters = element.querySelectorAll('.typechar');

        // animate letters using anime.js
        anime({
            targets: animeLetters,
            opacity: [
                { value: 0, duration: 0 },
                { value: 1, duration: 0 },
            ],
            delay: anime.stagger(options.delay, { start: options.beginDelay }),
        });
    },

    html(element, options) {
        // get text
        var text = element.textContent;

        // remove text, add wrapper, add cursor
        element.innerHTML = '<span class="typeWriterText"></span>';
        typewriterTextEl = element.querySelector('.typeWriterText');
        function addCursor() {
            if (options.cursor) {
                element.insertAdjacentHTML('beforeend', '<span class="blinking-cursor"></span>');
            }
        }
        if (options.beginCursor) {
            addCursor();
        }

        // beginDelay
        setTimeout(function () {
            // add cursor if beginCursor option is set to false
            if (!options.beginCursor) {
                addCursor();
            }
            // loop through
            var i = 0;
            var tid = setInterval(function () {
                if (i < text.length) {
                    typewriterTextEl.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(tid);
                }
            }, options.delay);
        }, options.beginDelay);
    }
}

// jQuery plugin
$.fn.typeWriter = function (options) {

    // parsing options
    var defaults = {
        delay: 50,
        beginDelay: 0,
        method: 'css',
        cursor: true, // only available with html method
        beginCursor: true // show cursor during beginDelay
    };
    var options = Object.assign(defaults, options);

    // opacity variant
    if (options.method == 'css') {
        typeWriter.css(this[0], options);
    } else if (options.method == 'html') {
        typeWriter.html(this[0], options);
    }

}