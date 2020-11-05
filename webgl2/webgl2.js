window.addEventListener("load", setupWebGL, false);

const vertexSource = /* glsl */ `#version 300 es
  // an attribute is an input (in) to a vertex shader.
  // It will receive data from a buffer
  in vec2 a_position;
  
  // all shaders have a main function
  void main() {
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    
    vec2 zeroToTwo = a_position * 2.0; // convert from 0->1 to 0->2
    vec2 clipSpace = zeroToTwo - 1.0; // convert from 0->2 to -1->+1 (clip space)

    gl_Position = vec4(clipSpace, 0, 1);
  }
`;
const fragmentSource = /* glsl */ `#version 300 es
  // fragment shaders don't have a default precision so we need
  // to pick one. highp is a good default. It means "high precision"
  precision highp float;
  // we need to declare an output for the fragment shader
  uniform vec4 u_color;
  out vec4 outColor;
  
  void main() {
    // Just set the output to a constant reddish-purple
    outColor = u_color;
  }
`;

function setupWebGL(evt) {
  window.removeEventListener(evt.type, setupWebGL, false);

  const canvas = document.getElementById("webgl-canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) return;

  const program = createProgram(gl, vertexSource, fragmentSource);

  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);

  {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    const size = 2; // 2 components per iteration
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
    gl.bindVertexArray(vao);

    // draw 50 random rectangles in random colors
    for (var ii = 0; ii < 50; ++ii) {
      const color = [Math.random(), Math.random(), Math.random()];
      const positions = getRandomRectangle();
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );
      gl.uniform4f(colorUniformLocation, ...color, 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6); // primitiveType, offset, count
    }
  }
}
/////////
// utils
/////////
function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    console.error("Error creating a program: " + gl.getProgramInfoLog(program));
    return;
  }
  return program;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "Error compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function getRandomRectangle() {
  const width = Math.random() / 2;
  const height = Math.random() / 2;

  var x1 = Math.random() / 2;
  var x2 = x1 + width;
  var y1 = Math.random() / 2;
  var y2 = y1 + height;

  return [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
}
