(() => {
  const myAudio = document.getElementById("myAudio") as HTMLAudioElement;
  let stopTime = 0;
  let autoPlayOn = false;

  myAudio.addEventListener(
    "timeupdate",
    function () {
      if (this.currentTime > stopTime) {
        this.pause();
      }
    },
    false
  );

  const playlist: Record<number, [start: number, stop: number]> = {
    0: [18, 19],
    1: [16, 17],
    2: [14, 15],
    3: [12, 13],
    4: [10, 11],
    5: [8, 9],
    6: [6, 7],
    7: [4, 5],
    8: [2, 3],
    9: [0, 1],
  };

  function playDigit(n: number) {
    console.log("playDigit", n, myAudio);
    const [start, stop] = playlist[n];
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

  const buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener(
      "click",
      function () {
        myAudio.currentTime = +this.getAttribute("data-start");
        stopTime = +this.getAttribute("data-stop");
        myAudio.play();
      },
      false
    );
  }

  const enableAutoPlay = () => {
    autoPlayOn = true;
    myAudio.play().then(() => {
      myAudio.pause();
    });
  };

  const buttonSoundsOn = document.getElementById("sounds-on");
  buttonSoundsOn.addEventListener("click", () => {
    enableAutoPlay();
  });

  setTimeout(() => {
    if (autoPlayOn) {
      playDigit(5);
      playDigit(9);
    }
  }, 4000);

  setTimeout(() => {
    if (autoPlayOn) playDigit(3);
  }, 7000);
})();
