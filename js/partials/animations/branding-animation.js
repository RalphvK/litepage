function brandingAnimation(selector = "#branding-animation") {
    var tl = anime.timeline({
        loop: false,
        autoplay: false
    });

    // logo drawing
    tl.add({
        targets: selector+' #line-logo *',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3000,
        delay: function (el, i) { return i * 250 }
    });

    // color strips
    tl.add({
        targets: [
            selector+' #strip-blue',
            selector+' #strip-green',
            selector+' #strip-purple',
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 2000 }
        ],
        rotate: anime.stagger([0, -30]),
        duration: 2000
    }, '-=500');

    // business card
    tl.add({
        targets: [
            selector+' #business-card',
            selector+' #business-card-back'
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 }
        ],
        delay: anime.stagger(250)
    }, '-=1500');

    // mobile device
    tl.add({
        targets: [
            '#branding-animation #mobile'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    }, '-=1000');
    // mobile hero
    tl.add({
        targets: [
            '#branding-animation #mobile #hero *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 }
        ],
        delay: anime.stagger(100)
    }, '-=1000');
    // mobile content bg
    tl.add({
        targets: '#branding-animation #mobile #pagebg',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 }
        ],
        easing: 'easeInOutSine'
    }, '-=1000');
    // mobile content
    tl.add({
        targets: [
            selector+' #mobile #p1 *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 400 }
        ],
        delay: anime.stagger(50)
    }, '-=1000');

    // booklet
    tl.add({
        targets: [
            selector+' #page-left',
            selector+' #page-right'
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ],
        delay: anime.stagger(250),
        endDelay: 2000
    }, '-=1000');

    return tl;
}