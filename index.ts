(() => {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  // @ts-ignore
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    draw();
  });
  resizeObserver.observe(document.getElementById("container"));

  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let dx = 2;
  let dy = -2;
  const ballRadius = 10;

  const drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };

  const draw = () => {
    // DEBUG: borders, h&w
    // ctx.beginPath();
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.stroke();
    // ctx.closePath();

    // ctx.fillStyle = "black";
    // ctx.font = "15px Arial";
    // ctx.fillText(`w: ${canvas.width}`, 20, 30);
    // ctx.fillText(`h: ${canvas.height}`, 20, 50);
    // end of DEBUG
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }

    x += dx;
    y += dy;
  };
  setInterval(draw, 10);
})();
