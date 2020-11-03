(() => {
  window.addEventListener("load", function setupWebGL(evt) {
    window.removeEventListener(evt.type, setupWebGL, false);

    let timer;
    const button = document.getElementById("webgl-button");

    function startAnimation(evt) {
      button.removeEventListener(evt.type, startAnimation, false);
      button.addEventListener("click", stopAnimation, false);
      // Setup animation loop by redrawing every second.
      timer = setInterval(drawAnimation, 1000);
      // Give immediate feedback to user after clicking, by
      // drawing one animation frame.
      drawAnimation();
    }

    function stopAnimation(evt) {
      button.removeEventListener(evt.type, stopAnimation, false);
      button.addEventListener("click", startAnimation, false);
      // Stop animation by clearing the timer.
      clearInterval(timer);
    }
    // Call stopAnimation() once to setup the initial event
    // handlers for canvas and button.
    startAnimation({ type: "click" });

    let gl: WebGLRenderingContext;
    function drawAnimation() {
      if (!gl) {
        const canvas = document.getElementById(
          "webgl-canvas"
        ) as HTMLCanvasElement;
        console.log("*", canvas.clientWidth, canvas.clientHeight);
        // canvas.width = canvas.clientWidth;
        // canvas.height = canvas.clientHeight;
        gl = canvas.getContext("webgl");
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        // Enable scissoring operation and define the position and
        // size of the scissoring area.
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(40, 20, 40, 280);
      }

      var color = [Math.random(), Math.random(), Math.random()];
      // Set the clear color to darkish green.
      gl.clearColor(color[0], color[1], color[2], 1.0);
      // Clear the context with the newly set color. This is
      // the function call that actually does the drawing.
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  });
})();
