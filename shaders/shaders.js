(() => {
  window.addEventListener("load", setupWebGL, false);

  let gl;
  let program;

  var buffer;

  function setupWebGL(evt) {
    window.removeEventListener(evt.type, setupWebGL, false);
    if (!(gl = getRenderingContext())) return;

    var source = document.querySelector("#vertex-shader").innerHTML;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, source);
    gl.compileShader(vertexShader);
    source = document.querySelector("#fragment-shader").innerHTML;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, source);
    gl.compileShader(fragmentShader);
    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var linkErrLog = gl.getProgramInfoLog(program);
      cleanup();
      console.error(linkErrLog);
      return;
    }

    initializeAttributes();
    gl.useProgram(program);
    gl.drawArrays(gl.POINTS, 0, 1);

    document.querySelector("canvas").addEventListener(
      "click",
      function (evt) {
        var clickXrelativToCanvas = evt.pageX - evt.target.offsetLeft;
        var clickXinWebGLCoords =
          (2.0 * (clickXrelativToCanvas - gl.drawingBufferWidth / 2)) /
          gl.drawingBufferWidth;
        console.log("clickXinWebGLCoords", clickXinWebGLCoords);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([clickXinWebGLCoords]),
          gl.STATIC_DRAW
        );
        gl.drawArrays(gl.POINTS, 0, 1);
      },
      false
    );
  }

  function initializeAttributes() {
    gl.enableVertexAttribArray(0);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.8]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
  }

  function cleanup() {
    gl.useProgram(null);
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
  }

  function getRenderingContext() {
    const canvas = document.getElementById("webgl-canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const gl = canvas.getContext("webgl");
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
  }
})();
