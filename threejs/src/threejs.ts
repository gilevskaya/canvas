/// <reference path="../node_modules/three/src/three.d.ts" />

const OHLC = [
  {
    price: 9900,
    open: 10,
    high: 15,
    low: 3,
    close: 5,
  },
];

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
const { height, width } = canvas;
console.log({ height, width });

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x010101, 1.0);

// Setup a camera, we will update its settings on resize
const camera = new THREE.OrthographicCamera(
  width / -width,
  width / width,
  height / height,
  height / -height,
  1,
  1000
);
camera.position.z = 1;
// camera.position.set(2, 2, 2);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

const scene = new THREE.Scene();

const {
  candleBodyBuy,
  candleBodySell,
  candleWickBuy,
  candleWickSell,
} = getCandleParts();

scene.add(candleBodyBuy.translateX(-0.5));
scene.add(candleWickBuy.translateX(-0.5));
scene.add(candleBodySell.translateX(0.5));
scene.add(candleWickSell.translateX(0.5));

// var path = new THREE.Shape();
// path.currentPoint = new THREE.Vector2(-1, 1);
// path.lineTo(1, 1);
// path.lineTo(1, -1);
// path.lineTo(-1, -1);
// path.autoClose = true;

// var candleGeometry = new THREE.ShapeBufferGeometry(path);
// var ellipse = new THREE.Mesh(candleGeometry, materialGreen);
// scene.add(ellipse);

renderer.render(scene, camera);

function getCandleParts() {
  const materialBuy = new THREE.MeshBasicMaterial({ color: 0x22833d });
  const materialSell = new THREE.MeshBasicMaterial({ color: 0xb82e40 });

  const candleBodyGeometry = new THREE.PlaneGeometry(1, 1, 1); // rect proportional to canvas size

  const wick = new THREE.Path();
  wick.currentPoint = new THREE.Vector2(0, 1);
  wick.lineTo(0, -1);
  const points = wick.getPoints();
  const wickLine = new THREE.BufferGeometry().setFromPoints(points);

  const candleBodyBuy = new THREE.Mesh(candleBodyGeometry, materialBuy);
  const candleBodySell = new THREE.Mesh(candleBodyGeometry, materialSell);
  const candleWickBuy = new THREE.Line(wickLine, materialBuy);
  const candleWickSell = new THREE.Line(wickLine, materialSell);

  return { candleBodyBuy, candleBodySell, candleWickBuy, candleWickSell };
}
