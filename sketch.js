// Pretty Bad North (by Gabrz)
// https://github.com/Gabrz/PrettyBadNorth

// 3D Island generation using the Wave Function Collapse Algorithm

// TODO:
//  - Come up with a better weight system.
//    (based on Axis? instead of just some random numbers because they work)
//  - Fiddle around with adjacencies.
//    (box next to air)
//  - Make new Meshes.
//    (corner that is not a slope)
//  - Convert box to Geometry with vertices.
//    (so top and side can have separate colors)
//  - Refactor the gui.
//    (more structured)
//  - 

const DEBUG = true;
const WIDTH = 600;
const HEIGHT = 400;
const DIM = 13;
const SIZE = 50;

var cam;
var gui = {};
var modules = {};
var grid;

var sinWater = 0.0;
var startWave = false;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  cam = createCamera();
  
  // Init Stuff
  initGui();
  initModules();
  
  // Start
  startOver();
}

function draw() {
  angleMode(DEGREES);
  background(220);
  //orbitControl(2, 1, 0.05);

  // Draw Stuff
  drawLight();
  drawGui();
  grid.draw();

  // Start the Wave
  for (var i = 0; i <= gui.speed; i++) {
    if (startWave) grid.startWave();
  }
}

function startOver() {
  // Create Grid and set Slots
  grid = new Grid(gui.dim, SIZE);
  grid.setupStartGrid();
  startWave = true;  
}

function drawLight() {
  ambientLight(50);
  normalMaterial();
  directionalLight(
    240,
    240,
    240,
    cam.centerX - cam.eyeX,
    cam.centerY - cam.eyeY,
    cam.centerZ - cam.eyeZ
  );
}