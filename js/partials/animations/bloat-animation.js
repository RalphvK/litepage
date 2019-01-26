function bloatAnimation(selector = "#bloat-animation") {

    var config = {
        loadingTime: 10000,
        loopDelay: 2000,
        spinner: {
            loopDuration: 1000,
            outDelay: 1000
        },
        modal: {
            fade: {
                time: 700,
                easing: 'cubicBezier(.5, .05, .1, .3)'
            },
            pop: {
                time: 1000,
                delay: 100,
                easing: 'spring(1, 80, 10, 0)'
            }
        },
        button: {
            time: 200,
            scale: 1.15
        }
    };

    var mouseKeyframes = {
        x: [
            { value: 0, duration: 500 },
            { value: -40, duration: 500 },
            { value: -40, duration: 1700 },
            { value: -150, duration: 500 },
            { value: -149, duration: 800 },
            { value: -270, duration: 600 },
            { value: -271, duration: 400 },
            { value: -300, duration: 1200 },
            { value: -150, duration: 600 },
            { value: -155, duration: 500 },
            { value: -155, duration: 1300 },
            { value: -200, duration: 1100 },
            { value: -80, duration: 800 },
            { value: -55, duration: 400 },
            { value: -55, duration: 300 },
            { value: -20, duration: 500 },
            { value: 0, duration: 1000 },
            { value: -10, duration: 600 },
            { value: -10, duration: 600 },
            { value: -50, duration: 1200 },
            { value: -150, duration: 800 },
            { value: -137, duration: 1300 },
            { value: -100, duration: 1300 },
            { value: -100, duration: 1300 },
            { value: -78, duration: 200 },
            { value: -480, duration: 1000 },
            { value: -490, duration: 100 },
            { value: -500, duration: 200 },
            { value: -495, duration: 200 },
            { value: -495, duration: 400 },
            { value: 0, duration: 800 }
        ],
        y: [
            { value: 0, duration: 500 },
            { value: -20, duration: 500 },
            { value: -20, duration: 1700 },
            { value: -50, duration: 500 },
            { value: 0, duration: 800 },
            { value: -90, duration: 600 },
            { value: -85, duration: 400 },
            { value: -20, duration: 1200 },
            { value: -50, duration: 600 },
            { value: -50, duration: 500 },
            { value: -50, duration: 1300 },
            { value: -20, duration: 1100 },
            { value: -230, duration: 800 },
            { value: -220, duration: 400 },
            { value: -220, duration: 300 },
            { value: -30, duration: 500 },
            { value: 0, duration: 1000 },
            { value: 60, duration: 600 },
            { value: 60, duration: 600 },
            { value: 0, duration: 1200 },
            { value: -40, duration: 800 },
            { value: -37, duration: 1300 },
            { value: 55, duration: 1300 },
            { value: 55, duration: 1300 },
            { value: 43, duration: 200 },
            { value: -300, duration: 1000 },
            { value: -280, duration: 100 },
            { value: -280, duration: 200 },
            { value: -280, duration: 200 },
            { value: -280, duration: 400 },
            { value: 0, duration: 800 }
        ]
    };

    var tl = anime.timeline({
        loop: true
    });

    // loading bar
    tl.add({
        targets: [
            selector+' #Loading_Bar'
        ],
        scaleX: [
            { value: 0, duration: 0 },
            { value: 0.43, duration: config.loadingTime * 0.13 },
            { value: 0.75, duration: config.loadingTime * 0.39 },
            { value: 0.91, duration: config.loadingTime * 0.33 },
            { value: 0.94, duration: config.loadingTime * 0.03 },
            { value: 1, duration: config.loadingTime * 0.12 }
        ],
        easing: 'easeInOutQuart'
    }, 0);
    // spinner
    tl.add({
        targets: [
            selector+' #Spinner'
        ],
        rotate: 360 * ((config.loadingTime + config.spinner.outDelay) / config.spinner.loopDuration),
        duration: config.loadingTime + config.spinner.outDelay,
        easing: 'linear'
    }, 0);
    // loading done
    tl.add({
        targets: [
            selector+' #Loading_Bar'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 500 }
        ],
        easing: 'easeInOutQuart',
        delay: 200,
    }, config.loadingTime);
    tl.add({
        targets: [
            selector+' #Spinner'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 2000 }
        ],
        easing: 'easeInOutQuart',
        delay: config.spinnerOutDelay,
    }, config.loadingTime);

    // mouse
    tl.add({
        targets: [
            selector+' #Cursor'
        ],
        translateX: mouseKeyframes.x,
        translateY: mouseKeyframes.y,
        easing: 'easeInOutQuart',
    }, 0);

    // cookie modal
    tl.add({
        targets: [
            selector+' #Cookies'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 3000);
    tl.add({
        targets: [
            selector+' #Cookie_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 3000 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #checkmark'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: 300 }
        ],
        easing: config.modal.pop.easing
    }, 4800);
    tl.add({
        targets: [
            selector+' #cookiebutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 6800);
    tl.add({
        targets: [
            selector+' #Cookies'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 7200);

    // newsletter modal
    tl.add({
        targets: [
            selector+' #Newsletter'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 8000);
    tl.add({
        targets: [
            selector+' #Newsletter_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 8000 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #Newsletter'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 11100);

    // privacy modal
    tl.add({
        targets: [
            selector+' #Privacy'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 11700);
    tl.add({
        targets: [
            selector+' #Privacy_Notice'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 11700 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #privacybutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 13400);
    tl.add({
        targets: [
            selector+' #Privacy'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 13800);

    // adblock modal
    tl.add({
        targets: [
            selector+' #Adblocker'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 14100);
    tl.add({
        targets: [
            selector+' #Adblocker_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 14100 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #adblockbutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 15800);
    tl.add({
        targets: [
            selector+' #Adblocker'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 16300);

    // push notifications modal
    tl.add({
        targets: [
            selector+' #Notifications'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 16800);
    tl.add({
        targets: [
            selector+' #Notifications_Modal'
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1, duration: config.modal.pop.time }
        ],
        easing: config.modal.pop.easing
    }, 16800 + config.modal.pop.delay);
    tl.add({
        targets: [
            selector+' #adbbutton'
        ],
        scale: [
            { value: 1, duration: 0 },
            { value: config.button.scale, duration: config.button.time },
            { value: 1, duration: config.button.time }
        ],
        easing: config.modal.pop.easing
    }, 18600);
    tl.add({
        targets: [
            selector+' #Notifications'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: config.modal.fade.time }
        ],
        easing: config.modal.fade.easing
    }, 19000);

    // app banner
    tl.add({
        targets: [
            selector+' #App_Banner'
        ],
        scaleY: [
            { value: 0, duration: 0 },
            { value: 1, duration: 400 }
        ],
        easing: config.modal.pop.easing
    }, 16500);
    tl.add({
        targets: [
            selector+' #App_Banner'
        ],
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 200 }
        ],
        easing: 'linear',
        endDelay: config.loopDelay
    }, 22000);

    // actual content
    tl.add({
        targets: [
            selector+' #Actual_Content'
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 1500 }
        ],
        easing: 'linear'
    }, config.loadingTime - 2000);

    return tl;

}