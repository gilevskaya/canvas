(function () {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    // @ts-ignore
    var resizeObserver = new ResizeObserver(function (entries) {
        var _a = entries[0].contentRect, width = _a.width, height = _a.height;
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
        draw();
    });
    resizeObserver.observe(document.getElementById("container"));
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var ballRadius = 10;
    var drawBall = function () {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };
    var draw = function () {
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
