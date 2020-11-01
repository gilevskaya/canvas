(function () {
  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  // @ts-ignore
  var resizeObserver = new ResizeObserver(function (entries) {
    var _a = entries[0].contentRect,
      width = _a.width,
      height = _a.height;
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    draw();
  });
  resizeObserver.observe(document.getElementById("container"));
  var rightPressed = false;
  var leftPressed = false;
  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
      }
    },
    false
  );
  document.addEventListener(
    "keyup",
    function (e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
      }
    },
    false
  );
  document.addEventListener(
    "mousemove",
    function (e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    },
    false
  );
  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var dx = 2;
  var dy = -2;
  var ballRadius = 10;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var drawBall = function () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };
  var drawPaddle = function () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };
  var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // DEBUG: borders, h&w
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.fillText("w: " + canvas.width, 20, 30);
    ctx.fillText("h: " + canvas.height, 20, 50);
    // end of DEBUG
    drawBall();
    drawPaddle();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    }
    if (rightPressed) {
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    } else if (leftPressed) {
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
    }
    x += dx;
    y += dy;
  };
  var interval = setInterval(draw, 10);
})();
