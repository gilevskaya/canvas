/// <reference path="../node_modules/three/src/three.d.ts" />

console.log("threejs", THREE);

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor("hsl(0, 0%, 95%)", 1.0);

// Setup a camera, we will update its settings on resize
const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
camera.position.set(2, 2, 2);
camera.lookAt(new THREE.Vector3());

// const controls = new THREE.OrbitControls(camera);
const scene = new THREE.Scene();

// Re-use the same Geometry across all our cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Basic "unlit" material with no depth
const material = new THREE.MeshNormalMaterial();
const material2 = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.75,
  flatShading: true,
});

// Create the mesh
const mesh = new THREE.Mesh(geometry, material2);

// Smaller cube
mesh.scale.setScalar(0.5);

// Then add the group to the scene
scene.add(mesh);

scene.add(new THREE.AmbientLight("#59314f"));
const light = new THREE.PointLight("#45caf7", 1, 15.5);
light.position.set(2, 2, -4).multiplyScalar(1.5);
scene.add(light);

const mesh2 = new THREE.Mesh(geometry, material2);
mesh2.scale.setScalar(0.5);
scene.add(mesh2);

renderer.render(scene, camera);
