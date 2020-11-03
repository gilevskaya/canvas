(() => {
  window.addEventListener("load", function setupWebGL(evt) {
    window.removeEventListener(evt.type, setupWebGL, false);

    const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl");

    var color = [Math.random(), Math.random(), Math.random()];
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    // Set the clear color to darkish green.
    gl.clearColor(color[0], color[1], color[2], 1.0);
    // Clear the context with the newly set color. This is
    // the function call that actually does the drawing.
    gl.clear(gl.COLOR_BUFFER_BIT);
  });
})();
