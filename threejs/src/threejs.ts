/// <reference path="../node_modules/three/src/three.d.ts" />

type TCandleParts = {
  candleBodyBuy: THREE.Mesh;
  candleBodySell: THREE.Mesh;
  candleWickBuy: any;
  candleWickSell: any;
};

type TCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

const OHLC: TCandle[] = [
  {
    timestamp: 5,
    open: 10,
    high: 15,
    low: 3,
    close: 5,
  },
  // {
  //   timestamp: 10,
  //   open: 5,
  //   high: 17,
  //   low: 4,
  //   close: 10,
  // },
  // {
  //   timestamp: 15,
  //   open: 10,
  //   high: 15,
  //   low: 3,
  //   close: 5,
  // },
  // {
  //   timestamp: 20,
  //   open: 5,
  //   high: 17,
  //   low: 4,
  //   close: 10,
  // },
];
const priceRange: [number, number] = [0, 20];
const timeRange: [number, number] = [5, 20];

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
const { height, width } = canvas;
console.log({ height, width });

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x141414, 1.0);

// Setup a camera, we will update its settings on resize
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
camera.position.z = 1;
// camera.lookAt(new THREE.Vector3(1, 1, 1));

const scene = new THREE.Scene();

const candleParts = getCandleParts();
// cubeA.position.set( 100, 100, 0 );

const scale: [number, number, number] = [0.9, 0.9, 1];

const grid = makeGrid(timeRange, 5, priceRange, 5);
grid.scale.set(...scale);
grid.position.setZ(-1);
scene.add(grid);

const candlesGroup = new THREE.Group();
const candles: THREE.Group[] = [];
OHLC.forEach((candleData) => {
  candles.push(makeCandle(candleParts, candleData, timeRange, priceRange));
});
candles.forEach((c) => candlesGroup.add(c));
candlesGroup.scale.set(...scale);
// scene.add(candlesGroup);

renderer.render(scene, camera);

// helper functions
function getCandleParts() {
  const materialBuy = new THREE.MeshBasicMaterial({ color: 0x22833d });
  const materialSell = new THREE.MeshBasicMaterial({ color: 0xb82e40 });
  const materialLineBuy = new THREE.LineBasicMaterial({ color: 0x22833d, linewidth: 2 });
  const materialLineSell = new THREE.LineBasicMaterial({ color: 0xb82e40, linewidth: 2 });

  const candleBodyGeometry = new THREE.PlaneGeometry(0.9, 1, 1); // rect proportional to canvas size

  const wick = new THREE.Path();
  wick.currentPoint = new THREE.Vector2(0, 1);
  wick.lineTo(0, -1);
  const points = wick.getPoints();
  const wickLine = new THREE.BufferGeometry().setFromPoints(points);

  const candleBodyBuy = new THREE.Mesh(candleBodyGeometry, materialBuy);
  const candleBodySell = new THREE.Mesh(candleBodyGeometry, materialSell);
  const candleWickBuy = new THREE.Line(wickLine, materialLineBuy);
  const candleWickSell = new THREE.Line(wickLine, materialLineSell);

  return { candleBodyBuy, candleBodySell, candleWickBuy, candleWickSell };
}

function makeCandle(
  candleParts: TCandleParts,
  candleData: TCandle,
  timeRange: [number, number],
  priceRange: [number, number]
) {
  const { candleBodyBuy, candleBodySell, candleWickBuy, candleWickSell } = candleParts;
  const { timestamp, open, high, low, close } = candleData;
  const [timeMin, timeMax] = timeRange;
  const [priceMin, priceMax] = priceRange;

  const candleBody = open > close ? candleBodySell : candleBodyBuy;
  const candleWick = open > close ? candleWickSell : candleWickBuy;
  const x = timestamp / (timeMax - timeMin);

  const wickH = Math.abs(low - high) / priceMax - priceMin;
  candleWick.scale.set(1, wickH * 2, 1);

  const candleGroup = new THREE.Group();
  candleGroup.add(candleBody.clone().translateX(x));
  candlesGroup.add(candleWick.clone().translateX(x));
  return candleGroup;
}

function makeGrid(timeRange, timeStep, priceRange, priceStep) {
  const [timeMin, timeMax] = timeRange;
  const stepX = timeStep / (timeMax - timeMin);
  const [priceMin, priceMax] = priceRange;
  const stepY = priceStep / (priceMax - priceMin);
  console.log({ stepX, stepY });

  const gridLineMaterial = new THREE.LineBasicMaterial({
    color: 0x393939,
    linewidth: 0.5,
  }); // 0x1d1d1d | 010101

  function getBaseLine(x1: number, y1: number, x2: number, y2: number) {
    const path = new THREE.Path();
    path.setFromPoints([new THREE.Vector2(x1, y1), new THREE.Vector2(x2, y2)]);
    const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints());
    return new THREE.Line(geometry, gridLineMaterial);
  }
  const gridGroup = new THREE.Group();
  const gridLineY = getBaseLine(c(0), c(0), c(0), c(1));
  const gridLineX = getBaseLine(c(0), c(0), c(1), c(0));

  for (let currXT = 0; currXT <= 1; currXT += stepX) {
    gridGroup.add(gridLineY.clone().translateX(currXT * 2));
  }
  for (let currYT = 0; currYT <= 1; currYT += stepY) {
    gridGroup.add(gridLineX.clone().translateY(currYT * 2));
  }
  return gridGroup;
}

function c(n: number) {
  return (n - 0.5) * 2;
}
