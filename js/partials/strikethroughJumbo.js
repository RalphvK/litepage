// strikethrough hero
function strikethroughJumbo(element, options) {

    // parsing options
    var defaults = {
        strikeDelay: 100,
        duration: 1000,
        maxHeight: '50px'
    };
    var config = Object.assign(defaults, options);

    function animDuration() {
        return (config.duration - config.strikeDelay) / 2;
    }

    var tl = anime.timeline({
        loop: false
    });

    // reveal
    tl.add({
        targets: element.querySelectorAll('.strikethrough'),
        maxHeight: [
            { value: 0, duration: 0 },
            { value: config.maxHeight, duration: animDuration() }
        ],
        opacity: [
            { value: 1, duration: 0, delay: anime.stagger(1000) },
            { value: 0.4, duration: 3000 },
        ],
        delay: anime.stagger(animDuration()),
        easing: 'cubicBezier(.6, 0, .1, 1)'
    }, 0);

    // strikethrough
    tl.add({
        targets: element.querySelectorAll('.strikethrough s'),
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: animDuration() }
        ],
        delay: anime.stagger(animDuration()),
        easing: 'cubicBezier(.6, 0, .1, 1)'
    }, config.strikeDelay);

    // title
    tl.add({
        targets: element.querySelectorAll('.title h2'),
        clipPath: [
            { value: 'inset(0 100% -10% 0)', duration: 0, delay: 500 },
            { value: 'inset(0 48% -10% 0)', duration: 0, delay: 500 },
            { value: 'inset(0 0% -10% 0)', duration: 0 },
        ],
        easing: 'linear'
    }, config.strikeDelay);

};

// jQuery alias
$.fn.strikethroughJumbo = function (options) {
    strikethroughJumbo(this[0], options);
}