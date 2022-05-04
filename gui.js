var restartFill = 200;
var restartMouseOver = false;
function initGui() {
  gui.title = createGraphics(200, 32);
  gui.controls = createGraphics(200, 200);
  gui.weightctl = createGraphics(200, 200);
  gui.speed = 500;
  gui.dim = DIM;
  gui.weights = {
    box: 2,
    air: 0.01,
    slope: 1,
    corner: 0.02
  };
}

function drawGui() {
  push();
  // 2D, so translate back to top left
  translate(-WIDTH / 2, -HEIGHT / 2);
  // Draw GUI Components
  drawTitle();
  drawControls();
  drawWeights();
  pop();
}

function drawTitle() {
  // Title
  gui.title.textSize(24);
  gui.title.fill(150);
  gui.title.text("Pretty Bad North", 10, 30);

  // Show Graphics
  image(gui.title, 0, 0);
}

function drawControls() {
  // Speed Size Control
  gui.controls.noStroke();
  gui.controls.fill(200);
  gui.controls.rect(0, 0, 100, 30);
  gui.controls.rect(0, 40, 100, 30);
  
  gui.controls.fill(150);
  gui.controls.rect(3, 3, map(gui.speed, 5, 1000, 0, 94), 24);
  gui.controls.rect(3, 43, map(gui.dim, 9, 15, 0, 94), 24);
  // Restart Control
  if (startWave || restartMouseOver) restartFill = 150;
  else restartFill = 200;
  gui.controls.fill(restartFill);
  gui.controls.rect(110, 0, 70, 70);
  
  gui.controls.fill(50);
  gui.controls.text("Speed", 30, 19);
  gui.controls.text("Size", 37, 60);
  gui.controls.text("Restart", 125, 40);

  // Show Graphics
  image(gui.controls, 5, HEIGHT - 75);
}

function drawWeights() {
  // Speed Control
  gui.weightctl.noStroke();
  gui.weightctl.fill(200);
  gui.weightctl.rect(0, 0, 100, 20);
  gui.weightctl.rect(0, 25, 100, 20);
  gui.weightctl.rect(0, 50, 100, 20);
  gui.weightctl.rect(0, 75, 100, 20);
  
  gui.weightctl.fill(150);
  gui.weightctl.rect(3, 3, map(gui.weights.air, 0.01, 0.05, 0, 94), 14);
  gui.weightctl.rect(3, 28, map(gui.weights.box, 0.01, 3, 0, 94), 14);
  gui.weightctl.rect(3, 53, map(gui.weights.slope, 0.01, 1, 0, 94), 14);
  gui.weightctl.rect(3, 78, map(gui.weights.corner, 0.01, 1, 0, 94), 14);
  gui.weightctl.fill(50);

  textSize(16);
  gui.weightctl.text("Air", 40, 14);
  gui.weightctl.text("Block", 35, 39);
  gui.weightctl.text("Slope", 35, 64);
  gui.weightctl.text("Corner", 33, 90);
  
  
  image(gui.weightctl, WIDTH-105, HEIGHT - 100);

}

function mousePressed() {
  // Restart
  if (
    mouseX > 115 &&
    mouseX < 185 &&
    mouseY > HEIGHT - 75 &&
    mouseY < HEIGHT - 5
  ) {
    if (!startWave) {
      startOver();
    }
  } else controlDragPress();
}

function mouseMoved() {
  // Restart
  if (
    mouseX > 115 &&
    mouseX < 185 &&
    mouseY > HEIGHT - 75 &&
    mouseY < HEIGHT - 5
  ) {
    restartMouseOver = true;
  } else {
    restartMouseOver = false;
  }
}

function mouseDragged() {
  controlDragPress();
}

function controlDragPress() {
  if (
    mouseX > 5 &&
    mouseX < 105 &&
    mouseY > HEIGHT - 75 &&
    mouseY < HEIGHT - 45
  ) {
    gui.speed = map(mouseX, 5, 105, 50, 1000);
  } else if (
    mouseX > 5 &&
    mouseX < 105 &&
    mouseY > HEIGHT - 35 &&
    mouseY < HEIGHT - 5
  ) {
    gui.dim = ceil(map(mouseX, 5, 105, 8, 15));
  } else if (
    mouseX > WIDTH -105 &&
    mouseX < WIDTH - 5 &&
    mouseY > HEIGHT - 100 &&
    mouseY < HEIGHT - 80
  ) {
    gui.weights.air = map(mouseX, WIDTH -105, WIDTH-5, 0.01, 0.05);
  } else if (
    mouseX > WIDTH -105 &&
    mouseX < WIDTH - 5 &&
    mouseY > HEIGHT - 75 &&
    mouseY < HEIGHT - 55
  ) {
    gui.weights.box = map(mouseX, WIDTH -105, WIDTH-5, 0.01, 3);
  } else if (
    mouseX > WIDTH -105 &&
    mouseX < WIDTH - 5 &&
    mouseY > HEIGHT - 50 &&
    mouseY < HEIGHT - 30
  ) {
    gui.weights.slope = map(mouseX, WIDTH -105, WIDTH-5, 0.01, 1);
  } else if (
    mouseX > WIDTH -105 &&
    mouseX < WIDTH - 5 &&
    mouseY > HEIGHT - 25 &&
    mouseY < HEIGHT - 5
  ) {
    gui.weights.corner = map(mouseX, WIDTH -105, WIDTH-5, 0.01, 1);
  }
}
