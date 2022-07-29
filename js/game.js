'use strict';
var gameFlip = (function () {
    var score = 0,
        divScore = document.getElementById('pars_score'),
        felici = false,
        variantes = ["black", "pink", "blue", "green", "red", "yellow"],
        variantes2 = ["black", "pink", "blue", "green", "red", "yellow"],
        currentSet = [],
        gameArr = [];

    return {
        shuffleArr: function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
        getGameArr: function () {
            var gArr1 = this.shuffleArr(variantes);
            var gArr2 = this.shuffleArr(variantes2);
            var gameA = gArr1.concat(gArr2);
            return gameA;
        },
        checkMatch: function () {
            if (felici) {
                score += 1;
                gameFlip.viewScore();
               // console.log("match");
                felici = false;
            }
        },
        checkSet: function () {
            if ($(".fliped").length == 2) {
                $(".fliped").each(function () {
                    currentSet.push($(this).attr("rel"));
                });
                if (currentSet[0] === currentSet[1]) {
                    felici = true;
                    $('.box').find("[rel='" + currentSet[0] + "']").addClass('flit');
                    $('.box').find("[rel='" + currentSet[0] + "']").removeClass('fliped');
                    gameFlip.checkMatch();
                }
                //We remove all entries of our currentSet array
                currentSet = [];
            }
        },
        flipEndAll: function () {
            //console.log('complete end all');
        },
        flipStartAll: function () {
            //console.log('complete');
            TweenMax.staggerTo($(".card"), 1, {rotationY: 0, delay: 1}, 0.1, gameFlip.flipEndAll);
        },
        viewScore: function () {
            if (score === 6) {
                TweenLite.to($('.end_screen'),0, {display: 'block'});
                TweenLite.to($('.end_screen'), 1, {opacity: 1, ease: Back.easeOut});

                // score = 0;

            }
            divScore.innerHTML = score;
        },
        reset: function () {
            $(".box").each(function () {
                    $(this).remove();
                });

            score = 0;
            divScore.innerHTML = score;
            gameArr = this.shuffleArr(gameArr);
            for (var i = 0; i < gameArr.length; i++) {
                $("#canvas-game").append("<div class='box'><div class='card flip' rel='" + gameArr[i] + "'><div class='facet flips " + gameArr[i] + "'></div><div class='facet front'></div><div class='facet back " + gameArr[i] + "'></div></div></div>");
            }

            TweenLite.set(".box", {perspective: 800});
            TweenLite.set(".card", {transformStyle: "preserve-3d"});
            TweenLite.set(".back", {rotationY: 180});
            TweenLite.set([".back", ".front"], {backfaceVisibility: "hidden"});


            TweenMax.staggerTo($(".card"), 1, {rotationY: -180}, 0.1, gameFlip.flipStartAll);

            $(".card").click(function () {
                // $('#console').html($(".fliped").length);
                if ($(this).hasClass('fliped') || $(this).hasClass('flit')) {
                    return false;
                }
                console.log('cliclk');
                if ($(".fliped").length > 1) {
                    TweenLite.to($(".fliped"), 0.5, {
                        rotationY: 0, ease: Back.easeOut, onComplete: function () {
                            (this.target).removeClass("fliped");
                        }
                    });

                }
                TweenLite.to($(this), 1.2, {rotationY: 180, ease: Back.easeOut});
                $(this).addClass("fliped");

                gameFlip.checkSet();
            });

            $(".start_btn").click(function () {
                TweenLite.to($('.start_screen'), 1, {opacity: 0, ease: Back.easeOut});
                TweenLite.to($('.start_screen'),0, {display: 'none'});
                TweenMax.staggerTo($(".card"), 1, {rotationY: -180}, 0.1, gameFlip.flipStartAll);
            });

            $('.repeat_btn').click(function () {
                TweenLite.to($('.end_screen'), 1, {opacity: 0, ease: Back.easeOut});
                TweenLite.to($('.end_screen'),0, {display: 'none'});
                gameFlip.reset();
            });

        },
        init: function () {
            gameArr = gameFlip.getGameArr();
            for (var i = 0; i < gameArr.length; i++) {
                $("#canvas-game").append("<div class='box'><div class='card flip' rel='" + gameArr[i] + "'><div class='facet flips " + gameArr[i] + "'></div><div class='facet front'></div><div class='facet back " + gameArr[i] + "'></div></div></div>");
            }

            TweenLite.set(".box", {perspective: 800});
            TweenLite.set(".card", {transformStyle: "preserve-3d"});
            TweenLite.set(".back", {rotationY: 180});
            TweenLite.set([".back", ".front"], {backfaceVisibility: "hidden"});

            $(".card").click(function () {
                if ($(this).hasClass('fliped') || $(this).hasClass('flit')) {
                    return false;
                }
                if ($(".fliped").length > 1) {
                    TweenLite.to($(".fliped"), 0.5, {
                        rotationY: 0, ease: Back.easeOut, onComplete: function () {
                            (this.target).removeClass("fliped");
                        }
                    });

                }
                TweenLite.to($(this), 1.2, {rotationY: 180, ease: Back.easeOut});
                $(this).addClass("fliped");

                gameFlip.checkSet();
            });

            $(".start_btn").click(function () {
                TweenLite.to($('.start_screen'), 1, {opacity: 0, ease: Back.easeOut});
                TweenLite.to($('.start_screen'),0, {display: 'none'});
                TweenMax.staggerTo($(".card"), 1, {rotationY: -180}, 0.1, gameFlip.flipStartAll);
            });

            $('.repeat_btn').click(function () {
                TweenLite.to($('.end_screen'), 1, {opacity: 0, ease: Back.easeOut});
                TweenLite.to($('.end_screen'),0, {display: 'none'});
                gameFlip.reset();

            });

        }
    }
}());

gameFlip.init();