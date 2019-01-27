// services
var animation = {

    development: function () {
        var timeline = webdevAnimation();
        $('#development').inView({
            in: function () {
                timeline.play();
            },
            out: function () {
                timeline.pause();
            },
            threshold: 300
        });
    },

    design: function () {
        var timeline = designAnimation();
        $('#design').inView({
            in: function () {
                timeline.play();
            },
            out: function () {
                timeline.pause();
            },
            threshold: 300
        });
    },

    branding: function () {
        var timeline = brandingAnimation();
        $('#branding').inView({
            in: function () {
                timeline.play();
            },
            out: function () {
                timeline.pause();
            },
            threshold: 300
        });
    }

};