class Grid {
  constructor(dim, size) {
    this.dim = dim;
    this.r = (dim - 1) / 2;
    this.size = size;
    this.slots = [];

    // Init the slots
    this.initSlots();
  }

  draw() {
    // Rotate to topdown view and Scale to size
    translate(0, -(this.r * this.size), -(this.r * this.size));
    rotateX(-45);
    rotateY(135);
    rotateZ(180);
    scale(this.size);

    // Draw the Grid
    for (var slot of this.slots) {
      push();
      slot.draw();
      pop();
    }
  }

  initSlots() {
    // Default starting options (all modules)
    var options = Object.keys(modules);
    // Build Slots with initial values
    for (var y = -this.r; y <= this.r; y++) {
      for (var x = -this.r; x <= this.r; x++) {
        for (var z = -this.r; z <= this.r; z++) {
          this.slots.push(new Slot(x, y, z, options));
        }
      }
    }
  }

  setupStartGrid() {
    // Calculate Neighbors
    for (const slot of this.slots) {
      slot.getNeighbours();
    }

    // Setup Starting position (vertical sides are air)
    for (const slot of this.slots) {
      if (slot.y == -this.r) {
        slot.options = ["water"];
        slot.collapse();
      } else {
        if (abs(slot.x) == this.r || abs(slot.z) == this.r) {
          slot.propegate(["air"]);
        }
      }
    }
  }

  getLeastEntropy() {
    // Filter Slots
    const slots = this.slots.slice().filter((a) => !a.collapsed);

    // Stop when there are no slots left
    if (slots.length == 0) return;

    // Sort slots based on options length
    slots.sort((a, b) => {
      return a.options.length - b.options.length;
    });

    // Get Slots with the least entropy
    var val = slots[0].options.length;
    var stopIndex = 0;
    for (const [i, s] of slots.entries()) {
      if (s.options.length > val) {
        stopIndex = i;
        break;
      }
    }
    if (stopIndex > 0) slots.splice(stopIndex);

    // Sort slots based on height (in the grid)
    slots.sort((a, b) => {
      return a.y - b.y;
    });

    // Get Slots with the lowest position
    val = slots[0].y;
    stopIndex = 0;
    for (const [i, s] of slots.entries()) {
      if (s.y > val) {
        stopIndex = i;
        break;
      }
    }
    if (stopIndex > 0) slots.splice(stopIndex);

    // Return a random Slot
    return random(slots);
  }

  startWave() {
    // Get slot with the least Entropy
    const slot = this.getLeastEntropy();

    if (slot !== undefined) {
      // Pick a random option
      const pickOption = this.pickNewOption(slot);

      // Propegate option (to neighbors)
      slot.propegate([pickOption]);
    } else {
      // Done no more picks left
      startWave = false;
    }
  }

  pickNewOption(slot) {
    var options = slot.options;
    var pickList = [];
    var weight = 0;

    for (const option of options) {
      // Trying to give options a weight value to influence picking chance
      // Could be improve though (based on Axis)
      if (option == "box") weight = gui.weights.box;
      else if (option == "air") weight = gui.weights.air;
      else if (option.startsWith("slope")) weight = gui.weights.slope;
      else if (option.startsWith("convex")) weight = gui.weights.corner;
      else if (option.startsWith("concave")) weight = gui.weights.corner;
      else weight = 0.01;

      weight = ceil(100 * round(weight,2));
      var tempList = Array(weight).fill(option);
      for (const temp of tempList) {
        pickList.push(temp);
      }
    }
    return random(pickList);
  }
}
