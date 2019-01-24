function designAnimation(selector = "#design-animation") {
    var tl = anime.timeline({
        loop: false
    });

    // mobile hero
    tl.add({
        targets: [
            selector+' #mobile #hero *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    });

    // mobile content bg
    tl.add({
        targets: selector+' #mobile #pagebg',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    });

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
    }, '-=500');

    // device fade
    tl.add({
        targets: [
            selector+' #mobile #device'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 1500 }
        ]
    });

    //desktop hero
    tl.add({
        targets: [
            selector+' #Desktop #navbar',
            selector+' #Desktop #navbar *',
            selector+' #Desktop #hero-2 #h1-2 *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    }, '-=750');

    tl.add({
        targets: [
            selector+' #Desktop #hero-2 #hero-bg-2'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    }, '-=2000');

    // body
    tl.add({
        targets: [
            selector+' #Desktop #bodybg'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ]
    }, '-=1500');
    tl.add({
        targets: [
            selector+' #Desktop #p1-2',
            selector+' #Desktop #p2',
            selector+' #Desktop #sidebar'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 700 }
        ],
        delay: anime.stagger(100)
    }, '-=1000');

    // monitor
    tl.add({
        targets: [
            selector+' #monitor'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    }, '-=2000');

    // end
    tl.add({
        targets: [
            selector+' #mobile #device'
        ],
        opacity: 1,
        duration: 0
    }, '-=500');

    // scale both
    tl.add({
        targets: [
            selector+' #mobile'
        ],
        translateX: [
            { value: 0, duration: 0 },
            { value: -100, duration: 1000 }
        ],
        duration: 1000
    }, '-=1000');
    tl.add({
        targets: [
            selector+' #desktop-monitor'
        ],
        translateX: [
            { value: 0, duration: 0 },
            { value: -50, duration: 1000 }
        ],
        duration: 1000
    });
    tl.add({
        targets: [
            selector+' #mobile',
            selector+' #desktop-monitor'
        ],
        scale: 0.7,
        duration: 1000
    }, '-=900');
}