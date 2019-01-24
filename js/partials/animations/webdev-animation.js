function webdevAnimation(selector = "#webdev-animation") {
    var code = {
        targets: selector+' #Code *',
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 200 }
        ],
        easing: 'linear',
        delay: anime.stagger(70) // increase delay by 100ms for each elements.
    };

    var tl = anime.timeline({
        loop: true
    });

    // code
    tl.add(code);

    // window change
    tl.add({
        targets: selector+' #in-browser',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    });

    // hero
    tl.add({
        targets: [
            selector+' #in-browser #hero',
            selector+' #in-browser #Logo',
            selector+' #in-browser #menu',
            selector+' #in-browser #h1'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ],
        delay: anime.stagger(300)
    });

    // body
    tl.add({
        targets: [
            selector+' #in-browser #body_text *'
        ],
        opacity: [
            { value: 1, duration: 0 }
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 200 }
        ],
        easing: 'linear',
        delay: anime.stagger(50) // increase delay by 100ms for each elements.
    });

    // image
    tl.add({
        targets: selector+' #in-browser #image',
        opacity: [
            { value: 1, duration: 0 }
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1000 }
        ]
    });
}