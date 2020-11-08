/// <reference path="../node_modules/three/src/three.d.ts" />

type TCandleParts = {
  candleBodyBuy: THREE.Mesh;
  candleBodySell: THREE.Mesh;
  candleWickBuy: THREE.Line;
  candleWickSell: THREE.Line;
  candleBodyFlatBuy: THREE.Line;
  candleBodyFlatSell: THREE.Line;
};

type TCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

// const OHLC: TCandle[] = [
//   {
//     timestamp: 5,
//     high: 15,
//     open: 12,
//     close: 3,
//     low: 2,
//   },
//   {
//     timestamp: 10,
//     high: 20,
//     close: 17,
//     open: 5,
//     low: 4,
//   },
//   {
//     timestamp: 15,
//     high: 18,
//     open: 8,
//     close: 2,
//     low: 0,
//   },
//   {
//     timestamp: 20,
//     open: 5,
//     high: 17,
//     low: 4,
//     close: 10,
//   },
// ];

const OHLC: TCandle[] = [
  {
    close: 13652.5,
    closeTime: "2020-10-31T21:18:36.745245Z",
    high: 13652.5,
    low: 13638.5,
    open: 13640,
    openTime: "2020-10-31T21:17:36.745207Z",
    to: 1604179056,
  },
  {
    close: 13658,
    closeTime: "2020-10-31T21:19:36.745286Z",
    high: 13659.5,
    low: 13652.5,
    open: 13652.5,
    openTime: "2020-10-31T21:18:36.745245Z",
    to: 1604179116,
  },
  {
    close: 13658,
    closeTime: "2020-10-31T21:20:36.745283Z",
    high: 13658,
    low: 13647,
    open: 13658,
    openTime: "2020-10-31T21:19:36.745286Z",
    to: 1604179176,
  },
  {
    close: 13661.5,
    closeTime: "2020-10-31T21:21:36.745269Z",
    high: 13663.5,
    low: 13658,
    open: 13658,
    openTime: "2020-10-31T21:20:36.745283Z",
    to: 1604179236,
  },
  {
    close: 13664,
    closeTime: "2020-10-31T21:22:36.745229Z",
    high: 13664,
    low: 13661.5,
    open: 13661.5,
    openTime: "2020-10-31T21:21:36.745269Z",
    to: 1604179296,
  },
  {
    close: 13666,
    closeTime: "2020-10-31T21:23:36.745196Z",
    high: 13666,
    low: 13664,
    open: 13664,
    openTime: "2020-10-31T21:22:36.745229Z",
    to: 1604179356,
  },
  {
    close: 13665.5,
    closeTime: "2020-10-31T21:24:36.745262Z",
    high: 13669.5,
    low: 13656.5,
    open: 13666,
    openTime: "2020-10-31T21:23:36.745196Z",
    to: 1604179416,
  },
  {
    close: 13673,
    closeTime: "2020-10-31T21:25:36.745231Z",
    high: 13675,
    low: 13665.5,
    open: 13665.5,
    openTime: "2020-10-31T21:24:36.745262Z",
    to: 1604179476,
  },
  {
    close: 13662,
    closeTime: "2020-10-31T21:26:36.745124Z",
    high: 13676,
    low: 13662,
    open: 13673,
    openTime: "2020-10-31T21:25:36.745231Z",
    to: 1604179536,
  },
  {
    close: 13660.5,
    closeTime: "2020-10-31T21:27:36.745254Z",
    high: 13662,
    low: 13660.5,
    open: 13662,
    openTime: "2020-10-31T21:26:36.745124Z",
    to: 1604179596,
  },
  {
    close: 13660.5,
    closeTime: "2020-10-31T21:28:36.754953Z",
    high: 13660.5,
    low: 13660,
    open: 13660.5,
    openTime: "2020-10-31T21:27:36.745254Z",
    to: 1604179656,
  },
  {
    close: 13667.5,
    closeTime: "2020-10-31T21:29:36.745133Z",
    high: 13668,
    low: 13660,
    open: 13660.5,
    openTime: "2020-10-31T21:28:36.754953Z",
    to: 1604179716,
  },
  {
    close: 13666,
    closeTime: "2020-10-31T21:30:36.745226Z",
    high: 13671,
    low: 13666,
    open: 13667.5,
    openTime: "2020-10-31T21:29:36.745133Z",
    to: 1604179776,
  },
  {
    close: 13675,
    closeTime: "2020-10-31T21:31:36.745207Z",
    high: 13675,
    low: 13666,
    open: 13666,
    openTime: "2020-10-31T21:30:36.745226Z",
    to: 1604179836,
  },
  {
    close: 13682,
    closeTime: "2020-10-31T21:32:36.745165Z",
    high: 13685.5,
    low: 13674.5,
    open: 13675,
    openTime: "2020-10-31T21:31:36.745207Z",
    to: 1604179896,
  },
  {
    close: 13682.5,
    closeTime: "2020-10-31T21:33:36.745241Z",
    high: 13682.5,
    low: 13681.5,
    open: 13682,
    openTime: "2020-10-31T21:32:36.745165Z",
    to: 1604179956,
  },
  {
    close: 13681,
    closeTime: "2020-10-31T21:34:36.745248Z",
    high: 13684.5,
    low: 13681,
    open: 13682.5,
    openTime: "2020-10-31T21:33:36.745241Z",
    to: 1604180016,
  },
  {
    close: 13680.5,
    closeTime: "2020-10-31T21:35:36.745302Z",
    high: 13681,
    low: 13680.5,
    open: 13681,
    openTime: "2020-10-31T21:34:36.745248Z",
    to: 1604180076,
  },
  {
    close: 13683.5,
    closeTime: "2020-10-31T21:36:36.745214Z",
    high: 13683.5,
    low: 13680.5,
    open: 13680.5,
    openTime: "2020-10-31T21:35:36.745302Z",
    to: 1604180136,
  },
  {
    close: 13685,
    closeTime: "2020-10-31T21:37:36.745201Z",
    high: 13685.5,
    low: 13683.5,
    open: 13683.5,
    openTime: "2020-10-31T21:36:36.745214Z",
    to: 1604180196,
  },
  {
    close: 13685.5,
    closeTime: "2020-10-31T21:38:36.745215Z",
    high: 13685.5,
    low: 13685,
    open: 13685,
    openTime: "2020-10-31T21:37:36.745201Z",
    to: 1604180256,
  },
  {
    close: 13681.5,
    closeTime: "2020-10-31T21:39:36.745217Z",
    high: 13685.5,
    low: 13678,
    open: 13685.5,
    openTime: "2020-10-31T21:38:36.745215Z",
    to: 1604180316,
  },
  {
    close: 13681.5,
    closeTime: "2020-10-31T21:40:36.745226Z",
    high: 13681.5,
    low: 13681.5,
    open: 13681.5,
    openTime: "2020-10-31T21:39:36.745217Z",
    to: 1604180376,
  },
  {
    close: 13681,
    closeTime: "2020-10-31T21:41:36.745215Z",
    high: 13681.5,
    low: 13680.5,
    open: 13681.5,
    openTime: "2020-10-31T21:40:36.745226Z",
    to: 1604180436,
  },
  {
    close: 13682,
    closeTime: "2020-10-31T21:42:36.745226Z",
    high: 13685,
    low: 13681,
    open: 13681,
    openTime: "2020-10-31T21:41:36.745215Z",
    to: 1604180496,
  },
  {
    close: 13683.5,
    closeTime: "2020-10-31T21:43:36.745217Z",
    high: 13683.5,
    low: 13682,
    open: 13682,
    openTime: "2020-10-31T21:42:36.745226Z",
    to: 1604180556,
  },
  {
    close: 13681.5,
    closeTime: "2020-10-31T21:44:36.745251Z",
    high: 13683.5,
    low: 13681.5,
    open: 13683.5,
    openTime: "2020-10-31T21:43:36.745217Z",
    to: 1604180616,
  },
  {
    close: 13681.5,
    closeTime: "2020-10-31T21:45:36.745247Z",
    high: 13681.5,
    low: 13681.5,
    open: 13681.5,
    openTime: "2020-10-31T21:44:36.745251Z",
    to: 1604180676,
  },
  {
    close: 13685.5,
    closeTime: "2020-10-31T21:46:36.745246Z",
    high: 13685.5,
    low: 13681.5,
    open: 13681.5,
    openTime: "2020-10-31T21:45:36.745247Z",
    to: 1604180736,
  },
  {
    close: 13685.5,
    closeTime: "2020-10-31T21:47:36.745218Z",
    high: 13685.5,
    low: 13685,
    open: 13685.5,
    openTime: "2020-10-31T21:46:36.745246Z",
    to: 1604180796,
  },
  {
    close: 13690,
    closeTime: "2020-10-31T21:48:36.745241Z",
    high: 13690,
    low: 13685.5,
    open: 13685.5,
    openTime: "2020-10-31T21:47:36.745218Z",
    to: 1604180856,
  },
  {
    close: 13693,
    closeTime: "2020-10-31T21:49:36.745201Z",
    high: 13693,
    low: 13689.5,
    open: 13690,
    openTime: "2020-10-31T21:48:36.745241Z",
    to: 1604180916,
  },
  {
    close: 13694,
    closeTime: "2020-10-31T21:50:36.745213Z",
    high: 13702.5,
    low: 13693,
    open: 13693,
    openTime: "2020-10-31T21:49:36.745201Z",
    to: 1604180976,
  },
  {
    close: 13694,
    closeTime: "2020-10-31T21:51:36.745247Z",
    high: 13694.5,
    low: 13694,
    open: 13694,
    openTime: "2020-10-31T21:50:36.745213Z",
    to: 1604181036,
  },
  {
    close: 13689.5,
    closeTime: "2020-10-31T21:52:36.745219Z",
    high: 13694,
    low: 13689.5,
    open: 13694,
    openTime: "2020-10-31T21:51:36.745247Z",
    to: 1604181096,
  },
  {
    close: 13686.5,
    closeTime: "2020-10-31T21:53:36.745221Z",
    high: 13689.5,
    low: 13686.5,
    open: 13689.5,
    openTime: "2020-10-31T21:52:36.745219Z",
    to: 1604181156,
  },
  {
    close: 13689,
    closeTime: "2020-10-31T21:54:36.74523Z",
    high: 13698,
    low: 13686.5,
    open: 13686.5,
    openTime: "2020-10-31T21:53:36.745221Z",
    to: 1604181216,
  },
  {
    close: 13695,
    closeTime: "2020-10-31T21:55:36.745202Z",
    high: 13695,
    low: 13689,
    open: 13689,
    openTime: "2020-10-31T21:54:36.74523Z",
    to: 1604181276,
  },
].map(({ open, close, high, low }, i) => ({
  open,
  close,
  high,
  low,
  timestamp: (i + 1) * 5,
}));
console.log("ohlc", OHLC);

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
const { height, width } = canvas;
const scale = getOhlcRangeStep(OHLC);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.setClearColor(0x141414, 1.0);

// Setup a camera, we will update its settings on resize
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
camera.position.z = 1;
// camera.lookAt(new THREE.Vector3(1, 1, 1));

const scene = new THREE.Scene();

const candleParts = getCandleParts();
// cubeA.position.set( 100, 100, 0 );

const sceneScale: [number, number, number] = [0.6, 0.8, 1];

const grid = makeGrid(scale);
grid.scale.set(...sceneScale);
grid.position.setZ(-1);
scene.add(grid);

const candlesGroup = new THREE.Group();
const candles: THREE.Group[] = [];
OHLC.forEach((candleData) => {
  candles.push(makeCandle(candleParts, candleData, scale));
});
candles.forEach((c) => candlesGroup.add(c));
candlesGroup.scale.set(...sceneScale);
scene.add(candlesGroup);

renderer.render(scene, camera);

// helper functions
function getCandleParts() {
  const materialBuy = new THREE.MeshBasicMaterial({ color: 0x22833d });
  const materialSell = new THREE.MeshBasicMaterial({ color: 0xb82e40 });
  const materialLineBuy = new THREE.LineBasicMaterial({ color: 0x22833d, linewidth: 2 });
  const materialLineSell = new THREE.LineBasicMaterial({ color: 0xb82e40, linewidth: 2 });

  const makeCandleBody = (() => {
    const shape = new THREE.Shape();
    shape.currentPoint = new THREE.Vector2(0, 0);
    shape.setFromPoints([
      new THREE.Vector2(c(0), c(0)),
      new THREE.Vector2(c(0), c(1)),
      new THREE.Vector2(c(1), c(1)),
      new THREE.Vector2(c(1), c(0)),
    ]);
    const geometry = new THREE.ShapeBufferGeometry(shape);
    return (material) => new THREE.Mesh(geometry, material);
  })();

  const makeCandleBodyFlat = (() => {
    const path = new THREE.Path();
    path.setFromPoints([new THREE.Vector2(-1, 0), new THREE.Vector2(1, 0)]);
    const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints());
    return (material) => new THREE.Line(geometry, material);
  })();

  const makeCandleWick = (() => {
    const path = new THREE.Path();
    path.setFromPoints([new THREE.Vector2(0, -1), new THREE.Vector2(0, 1)]);
    const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints());
    return (material) => new THREE.Line(geometry, material);
  })();

  const candleBodyBuy = makeCandleBody(materialBuy);
  const candleBodySell = makeCandleBody(materialSell);
  const candleBodyFlatBuy = makeCandleBodyFlat(materialBuy);
  const candleBodyFlatSell = makeCandleBodyFlat(materialSell);
  const candleWickBuy = makeCandleWick(materialLineBuy);
  const candleWickSell = makeCandleWick(materialLineSell);

  return {
    candleBodyBuy,
    candleBodySell,
    candleBodyFlatBuy,
    candleBodyFlatSell,
    candleWickBuy,
    candleWickSell,
  };
}

function makeCandle(candleParts: TCandleParts, candleData: TCandle, { price, time }) {
  const {
    candleBodyBuy,
    candleBodySell,
    candleWickBuy,
    candleWickSell,
    candleBodyFlatBuy,
    candleBodyFlatSell,
  } = candleParts;
  const { timestamp, open, high, low, close } = candleData;
  const candleBody = (open > close ? candleBodySell : candleBodyBuy).clone();
  const candleBodyFlat = (open > close ? candleBodyFlatSell : candleBodyFlatBuy).clone();
  const candleWick = (open > close ? candleWickSell : candleWickBuy).clone();
  const candleGroup = new THREE.Group();

  const bodyH = Math.abs(open - close) / (price.max - price.min);
  const wickH = Math.abs(low - high) / (price.max - price.min);

  const deltaX = (timestamp - time.step) / (time.max - time.min);
  const iY = 1 / (price.max - price.min);
  const bodyDeltaY =
    (Math.abs(open - close) / 2 + (Math.min(open, close) - price.min)) * iY;
  const wickDeltaY = (Math.abs(low - high) / 2 + (Math.min(low, high) - price.min)) * iY;

  if (bodyH > 0) {
    candleBody.scale.set(1, bodyH, 1);
    candleBody.translateY(c(bodyDeltaY));
    candleGroup.add(candleBody);
  } else {
    candleBodyFlat.translateY(c(bodyDeltaY));
    candleGroup.add(candleBodyFlat);
  }

  candleWick.scale.set(1, wickH, 1);
  candleWick.translateX(c(deltaX));
  candleWick.translateY(c(wickDeltaY));

  candlesGroup.add(candleWick);
  candleGroup.scale.set(0.85 / time.count, 1, 1);
  candleGroup.position.set(c(deltaX), 0, 0);
  return candleGroup;
}

function makeGrid({ time, price }) {
  const stepX = time.step / (time.max - time.min);
  const stepY = price.step / (price.max - price.min);

  const gridLineMaterial = new THREE.LineBasicMaterial({
    color: 0x252525,
    linewidth: 0.5,
  }); // 0x1d1d1d | 010101 | 0x393939

  function makeBaseLine(x1: number, y1: number, x2: number, y2: number) {
    const path = new THREE.Path();
    path.setFromPoints([new THREE.Vector2(x1, y1), new THREE.Vector2(x2, y2)]);
    const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints());
    return new THREE.Line(geometry, gridLineMaterial);
  }
  const gridGroup = new THREE.Group();
  const gridLineY = makeBaseLine(c(0), c(0), c(0), c(1));
  const gridLineX = makeBaseLine(c(0), c(0), c(1), c(0));

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

function getOhlcRangeStep(ohlc: TCandle[]) {
  const price = { min: +Infinity, max: -Infinity, step: 10 };
  const time = { min: +Infinity, max: -Infinity, step: 5, count: ohlc.length };
  ohlc.forEach((c) => {
    if (c.high > price.max) price.max = c.high;
    if (c.low < price.min) price.min = c.low;

    if (c.timestamp > time.max) time.max = c.timestamp;
    if (c.timestamp < time.min) time.min = c.timestamp;
  });
  price.min = Math.floor(price.min / 10) * 10;
  price.max = Math.ceil(price.max / 10) * 10;
  console.log({ price, time });
  return { price, time };
}
