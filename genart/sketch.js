const canvasSketch = require("canvas-sketch");
import * as random from "canvas-sketch-util/random";
import palettes from "nice-color-palettes";

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  // random.setSeed(512);
  const createGrid = () => {
    const points = [];
    const inner = [];
    const count = 6;
    for (let x = 0; x < count; x++) {
      inner.push(x / (count - 1));
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v],
        });
      }
    }
    return { points, inner };
  };
  const { /*points,*/ inner } = createGrid();
  const margin = 200;

  const createTrap = (inner) => {
    const [u1, u2] = random.shuffle(inner).slice(0, 2);
    const [v1, v2] = random.shuffle(inner).slice(0, 2);
    const xy = random.pick(["x", "y"]);
    const si = random.pick([0, 1]);
    return [
      [u1, v1],
      [u2, v2],
      xy === "x" ? [si, v2] : [u2, si],
      xy === "x" ? [si, v1] : [u1, si],
    ];
  };

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    const xf = (u) => u * (width - 2 * margin) + margin;
    const yf = (v) => v * (height - 2 * margin) + margin;

    // points.forEach(({ position }) => {
    //   const [u, v] = position;
    //   const x = xf(u);
    //   const y = yf(v);
    //   context.beginPath();
    //   context.arc(x, y, 15, 0, Math.PI * 2, false);
    //   context.fillStyle = "black";
    //   context.fill();
    // });

    const trapCount = 10;
    const trapColors = random.pick(palettes);
    for (let i = 0; i < trapCount; i++) {
      const trap = createTrap(inner);
      const [[u1, v1], [u2, v2], [u3, v3], [u4, v4]] = trap;

      context.beginPath();
      context.moveTo(xf(u1), yf(v1));
      context.lineTo(xf(u2), yf(v2));
      context.lineTo(xf(u3), yf(v3));
      context.lineTo(xf(u4), yf(v4));
      context.lineTo(xf(u1), yf(v1));
      context.fillStyle = random.pick(trapColors);
      context.fill();
      context.lineWidth = 10;
      context.strokeStyle = "white";
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
