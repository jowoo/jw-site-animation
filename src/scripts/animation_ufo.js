'use strict';

var Animation = {

    /**
     *
     * Animation Frames
     *
     **/

    init: function () {
        TweenLite.delayedCall(0.25, function (scope) {
            
            $('.ufo-container__content').toggleClass('hide show');

            // TweenLite.set('.ufo-container__ufo-shine', {
            //     autoAlpha: 0,
            // });

            $('.ufo-container__landed-shine img').each(function(index){
              TweenLite.set(this, {
                  autoAlpha: 0,
              });
            })
            $('.ufo-container__logo-shine img').each(function(index){
              TweenLite.set(this, {
                  autoAlpha: 0,
              });
            })
            // first position
            TweenLite.set('.ufo-container__ufo-svg', {
                autoAlpha: 1,
                width:'50%',
                height:'50%',
                y:'0'
            });

            TweenLite.set('.ufo-container__logo-text', {
                autoAlpha: 0,
                width:'30%',
                height:'30%'
            });

            TweenLite.set('.ufo-container__landed-text', {
                autoAlpha: 0,
                width:'50%',
                height:'50%'
            });

            scope.frameOne();
            // scope.frameTwo();
        }, [this], this);
    },
    
    frameOne: function() {
        //svg elements
        TweenLite.from('.ufo-container__ufo-svg', 1, {
            scale: 0,
            force3D:false,
            onComplete: function(scope) {
              TweenLite.delayedCall(1, scope.frameTwo, [scope]);
            },
            onCompleteParams: [this],
            ease: Power4.easeIn
        });
        TweenLite.delayedCall(0.5, this.ufoSpin, [this]);

    },

    frameTwo: function(scope) {

        TweenLite.to('.ufo-container__ufo-svg', 0.25, {
            scale: 1,
            onComplete: function(scope) {
                TweenLite.to('.ufo-container__ufo-svg', 0.5, {
                    autoAlpha: 0,
                    scale: 10,
                    onComplete: function(scope) {
                        //final position
                        TweenLite.set('.ufo-container__ufo-svg', {
                           autoAlpha: 1,
                           width:'25%',
                           height:'25%',
                           scale:1,
                           y:0,
                        });

                        TweenLite.from('.ufo-container__ufo-svg', 1, {
                            // autoAlpha: 0,
                            scale: 0,
                            delay: 1,
                        });

                        scope.ufoSpin();
                        
                        TweenLite.to('.ufo-container__logo-text', 1, {
                            autoAlpha: 1,
                            delay: 1,
                            ease: Power4.easeIn
                        });
                        
                        TweenLite.to('.ufo-container__landed-text', 1, {
                            autoAlpha: 1,
                            delay: 1,
                            ease: Power4.easeIn
                        });
                        TweenLite.set($('.ufo-container__logo-shine'), {
                            autoAlpha: 1,
                        });
                        
                        TweenLite.set($('.ufo-container__landed-shine'), {
                            autoAlpha: 1,
                        });
                        $('.ufo-container__logo-shine img').each(function(index){
                          TweenLite.to(this, 1, {
                              autoAlpha: 1,
                              delay: 1.5 + (index * 0.75),
                              ease: Sine.easeIn
                          });
                        })
                        $('.ufo-container__landed-shine img').each(function(index){
                          TweenLite.to(this, 1, {
                              autoAlpha: 1,
                              delay: 1.5 + (index * 0.75),
                              ease: Sine.easeIn
                          });
                        })
                    },
                    onCompleteParams: [scope],
                    ease: Sine.easeOut
                });
            },
            onCompleteParams: [scope],
            delay: 1,
            ease: Strong.easeIn
        });
    },

    ufoSpin: function() {

        TweenLite.set('.ufo-container__ufo-shinetwo', {
            x: 80
        });

        TweenLite.set('.ufo-container__ufo-shineleft', {
            transformOrigin: "0% 100%",
            x: 0,
            scale: 1,
        });

        TweenLite.from('.ufo-container__ufo-shineone', 2, {
            x: -50,
            delay:0.5,
            ease: Sine.easeOut
        });

        TweenLite.from('.ufo-container__ufo-shinetwo', 2, {
            x: 0,
            delay:0.5,
            ease: Sine.easeOut
        });

        TweenLite.from('.ufo-container__ufo-shinethree', 2, {
            transformOrigin: "50% 50%",
            x: -10,
            scaleX: 0.7,
            delay:0.5,
            ease: Sine.easeOut
        });

        TweenLite.to('.ufo-container__ufo-shineleft', 3, {
            transformOrigin: "0% 100%",
            x: 15,
            delay:0.5,
            scale: 0,
        });

        TweenLite.from('.ufo-container__ufo-shinemiddle', 3, {
            transformOrigin: "0% 0%",
            autoAlpha: 0,
            delay: 0.5,
            ease: Sine.easeOut
        });

    },

};
