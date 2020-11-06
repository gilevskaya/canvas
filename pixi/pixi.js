//Create a Pixi Application
let app = new PIXI.Application({
  // width: 256, // default: 800
  // height: 256, // default: 600
  antialias: true, // default: false
  transparent: true, // default: false
  resolution: window.devicePixelRatio || 1, // default: 1
  autoDensity: true,
});

document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);

const container = new PIXI.Container();
app.stage.addChild(container);

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
  let line = new PIXI.Graphics();
  line.lineStyle(4, 0xffffff, 1);
  line.moveTo(0, 0);
  line.lineTo(80, 50);

  app.stage.addChild(line);

  line.x = (i % 5) * 40;
  line.y = Math.floor(i / 5) * 40;

  container.addChild(line);

  let triangle = new PIXI.Graphics();
  triangle.beginFill(0x66ff33);

  //Use `drawPolygon` to define the triangle as
  //a path array of x/y positions

  triangle.drawPolygon([
    -32,
    64, //First point
    32,
    64, //Second point
    0,
    0, //Third point
  ]);

  //Fill shape's color
  triangle.endFill();

  //Position the triangle after you've drawn it.
  //The triangle's x/y position is anchored to its first point in the path
  triangle.x = 180;
  triangle.y = 22;

  app.stage.addChild(triangle);

  // triangle.anchor.set(0.5);
  triangle.x = (i % 5) * 40;
  triangle.y = Math.floor(i / 5) * 40;
  container.addChild(triangle);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform
  container.x -= 0.1 * delta;
});

// var renderer = PIXI.autoDetectRenderer(480, 320, { antialias: true });
// document.body.appendChild(renderer.view);

// let rectangle = new PIXI.Graphics();
// rectangle.lineStyle(4, 0xff3300, 1);
// rectangle.beginFill(0x66ccff);
// rectangle.drawRect(0, 0, 64, 64);
// rectangle.endFill();
// rectangle.x = 170;
// rectangle.y = 170;
// app.stage.addChild(rectangle);

// let line = new PIXI.Graphics();
// line.lineStyle(4, 0xffffff, 1);
// line.moveTo(0, 0);
// line.lineTo(80, 50);
// line.x = 32;
// line.y = 32;
// app.stage.addChild(line);

// let triangle = new PIXI.Graphics();
// triangle.beginFill(0x66ff33);

// //Use `drawPolygon` to define the triangle as
// //a path array of x/y positions

// triangle.drawPolygon([
//   -32,
//   64, //First point
//   32,
//   64, //Second point
//   0,
//   0, //Third point
// ]);

// //Fill shape's color
// triangle.endFill();

// //Position the triangle after you've drawn it.
// //The triangle's x/y position is anchored to its first point in the path
// triangle.x = 180;
// triangle.y = 22;

// app.stage.addChild(triangle);
