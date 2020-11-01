(function () {
    var myAudio = document.getElementById("myAudio");
    var stopTime = 0;
    var autoPlayOn = false;
    myAudio.addEventListener("timeupdate", function () {
        if (this.currentTime > stopTime) {
            this.pause();
        }
    }, false);
    var playlist = {
        0: [18, 19],
        1: [16, 17],
        2: [14, 15],
        3: [12, 13],
        4: [10, 11],
        5: [8, 9],
        6: [6, 7],
        7: [4, 5],
        8: [2, 3],
        9: [0, 1]
    };
    function playDigit(n) {
        console.log("playDigit", n, myAudio);
        var _a = playlist[n], start = _a[0], stop = _a[1];
        console.log([start, stop]);
        myAudio.currentTime = start;
        stopTime = stop;
        myAudio.play();
    }
    // TODO: ...
    // const numsInput = document.getElementById("nums");
    // const numsButton = document.getElementById("nums-voice");
    // numsButton.addEventListener("click", () => {
    //   // playDigit(5);
    //   console.log("bbbbb");
    // });
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            myAudio.currentTime = +this.getAttribute("data-start");
            stopTime = +this.getAttribute("data-stop");
            myAudio.play();
        }, false);
    }
    var enableAutoPlay = function () {
        autoPlayOn = true;
        myAudio.play().then(function () {
            myAudio.pause();
        });
    };
    var buttonSoundsOn = document.getElementById("sounds-on");
    buttonSoundsOn.addEventListener("click", function () {
        enableAutoPlay();
    });
    setTimeout(function () {
        if (autoPlayOn) {
            playDigit(5);
            playDigit(9);
        }
    }, 4000);
    setTimeout(function () {
        if (autoPlayOn)
            playDigit(3);
    }, 7000);
})();
