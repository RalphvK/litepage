function envelopeAnimation(selector = "#envelope-animation") {

    var tl = anime.timeline({
        loop: false,
        autoplay: false
    });

    // flip closed
    tl.add({
        targets: selector,
        rotateX: [
            { value: '-90deg', duration: 0 },
            { value: '180deg', duration: 1000 }
        ],
        easing: 'easeInOutSine'
    });
    tl.add({
        targets: '#contactform #shadow',
        maxHeight: [
            { value: '0px', duration: 0 },
            { value: '100%', duration: 600 }
        ],
        opacity: [
            { value: 0.5, duration: 0, delay: 200 },
            { value: 0.2, duration: 500 }
        ],
        easing: 'easeInOutSine'
    }, '-=700');

    // zoom and fade
    tl.add({
        targets: '#contactform',
        scale: [
            { value: 1, duration: 0 },
            { value: 1.05, duration: 1000 },
            { value: 0.8, duration: 1000 }
        ],
        boxShadow: [
            { value: '0px 0px 71px 0px rgba(0,0,0,0)', duration: 0 },
            { value: '0px 0px 71px 0px rgba(0,0,0,0.1)', duration: 500 }
        ],
        opacity: [
            { value: 1, duration: 0, delay: 1000 },
            { value: 0, duration: 1000 }
        ],
        easing: 'easeInOutSine'
    }, '-=1000');

    // thank you
    tl.add({
        targets: '#thankyou-message',
        maxHeight: [
            { value: '0px', duration: 0 },
            { value: '999px', duration: 1 }
        ],
        scale: [
            { value: 0.7, duration: 0 },
            { value: 1, duration: 1000 }
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ],
        easing: 'easeInOutSine'
    });

    return tl;
}