(() => {
  window.addEventListener("load", setupAnimation, false);

  let gl: WebGLRenderingContext;
  let position: [number, number];
  let color = [Math.random(), Math.random(), Math.random()];

  function setupAnimation(evt) {
    window.removeEventListener(evt.type, setupAnimation, false);
    gl = getRenderingContext();
    if (!gl) return;

    gl.enable(gl.SCISSOR_TEST);
    gl.clearColor(color[0], color[1], color[2], 1.0);
    position = [0, gl.drawingBufferHeight];

    const button = document.getElementById("webgl-button");
    let timer;

    function startAnimation(evt) {
      button.removeEventListener(evt.type, startAnimation, false);
      button.addEventListener("click", stopAnimation, false);
      timer = setInterval(drawAnimation, 17);
      drawAnimation();
    }

    function stopAnimation(evt) {
      button.removeEventListener(evt.type, stopAnimation, false);
      button.addEventListener("click", startAnimation, false);
      clearInterval(timer);
    }

    startAnimation({ type: "click" });
  }

  const size = [60, 60];
  let velocity = 3.0;

  function drawAnimation() {
    gl.scissor(position[0], position[1], size[0], size[1]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    position[1] -= velocity;

    if (position[1] < 0) {
      position = [
        Math.random() * (gl.drawingBufferWidth - size[0]),
        gl.drawingBufferHeight,
      ];
      // Random velocity between 1.0 and 7.0
      velocity = 1.0 + 6.0 * Math.random();
      color = [Math.random(), Math.random(), Math.random()];
      gl.clearColor(color[0], color[1], color[2], 1.0);
    }
  }

  function getRenderingContext() {
    const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
    canvas.width = canvas.clientWidth; // doesn't make a diff?
    canvas.height = canvas.clientHeight;
    const gl = canvas.getContext("webgl");
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    // gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
  }
})();
