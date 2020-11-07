const canvasSketch = require("canvas-sketch");
import * as random from "canvas-sketch-util/random";
import palettes from "nice-color-palettes";
import * as eases from "eases";
const glslify = require("glslify");
global.THREE = require("three");

const settings = {
  animate: true,
  dimensions: [512, 512],
  fps: 24,
  duration: 4,
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context,
  });

  // WebGL background color
  renderer.setClearColor("hsl(0, 0%, 95%)", 1.0); // "black", 0.1

  // Setup a camera, we will update its settings on resize
  const camera = new THREE.OrthographicCamera();

  // const controls = new THREE.OrbitControls(camera);
  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const palette = random.pick(palettes);
  const fragmentShader = /* glsl */ `
    varying vec2 vUv; 
    uniform vec3 color;

    void main () {
        gl_FragColor = vec4(color * vUv.x, 1.0);
    }
  `;

  const vertexShader = glslify(/* glsl */ `
    varying vec2 vUv;
    uniform float time;
    #pragma glslify: noise = require('glsl-noise/simplex/4d');

    void main () {
      vUv = uv;
      vec3 pos = position.xyz * sin(time);
      pos += noise(vec4(position.xyz, time));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `);

  const meshes = [];
  for (let i = 0; i < 40; i++) {
    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(random.pick(palette)) },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.multiplyScalar(0.4);
    scene.add(mesh);
    meshes.push(mesh);
  }

  const light = new THREE.DirectionalLight("white", 1);
  light.position.set(2, 1, 3).multiplyScalar(1.5);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      // Setup an isometric perspective
      const aspect = viewportWidth / viewportHeight;
      const zoom = 1.85;
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      camera.near = -100;
      camera.far = 100;
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update camera properties
      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ playhead, time }) {
      const t = Math.cos(playhead * Math.PI * 2);
      // scene.rotation.y = eases.expoInOut(t);

      meshes.forEach((mesh) => {
        // mesh.rotation.y = eases.expoIn(t);
        // mesh.rotation.z = eases.expoIn(t);
        mesh.material.uniforms.time.value = time;
      });
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
