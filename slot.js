class Slot {
  constructor(x, y, z, opt) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.collapsed = false;
    this.mesh = null;
    this.angle = 0;
    this.options = opt;
    this.neighbours = {};
  }

  draw() {
    // Only Draw if Slot is fully collapsed
    if (!this.collapsed) return;

    // Adding a wave effect for the water
    var y = this.y;
    if (!startWave && this.mesh.name=="water") {
      y = this.y + map(sin(sinWater),-1,1,0,0.3);
      sinWater += 0.04;
    }

    // Translate and Rotate
    translate(this.x, y, this.z);
    push();
    rotateY(this.angle);

    // Set Colors
    switch (this.mesh.name) {
      case "water":
        fill(152,210,234);
        break;
      case "box":
      case "slope":
      case "convex":
      case "convex1":
      case "concave":
      case "concave1":
        if (this.y==-grid.r+1) fill (253,228,161);
        else if (this.y>=-grid.r+4) fill (245,248,251);
        else fill(187,216,158);
        break;
      default:
        break;
    }

    // Draw Mesh
    switch (this.mesh.name) {
      case "air":
        if (DEBUG) point(0, 0, 0);
        break;
      case "box":
        box(1);
        break;
      default:
        model(this.mesh.model);
    }
    pop();
  }

  collapse() {
    // Set Mesh and Angle
    var module = modules[this.options[0]];
    this.mesh = module.getMesh();
    this.angle = module.angle;

    // Collapse Slot
    this.collapsed = true;
  }

  getNeighbours() {
    // Find neighbouring slots
    for (const slot of grid.slots) {
      var val_x = slot.x - this.x;
      var val_y = slot.y - this.y;
      var val_z = slot.z - this.z;
      var side = "";

      // Check Axis and side of Neighbour
      if (abs(val_x) == 1 && val_y == 0 && val_z == 0) {
        // Back or Front Neighbour
        side = val_x < 0 ? "back" : "front";
      } else if (abs(val_y) == 1 && val_x == 0 && val_z == 0) {
        // Down or Up Neighbour
        side = val_y < 0 ? "down" : "up";
      } else if (abs(val_z) == 1 && val_x == 0 && val_y == 0) {
        // Left or Right Neighbour
        side = val_z < 0 ? "left" : "right";
      }

      // Add (Direct) Neighbour
      if (side!="") {
        this.neighbours[side] = slot;
      }
    }
  }

  getValidEdges(side) {
    var validEdges = [];
    // Loop trough all the options
    for (const option of this.options) {
      // Collect all the Edges of a side
      var edge = modules[option].getEdge(side);
      if (!validEdges.includes(edge))
        validEdges.push(edge);
    }
    return validEdges;
  }

  propegate(newOptions) {
    // Set new Options
    this.options = newOptions;

    // Collapse when there is only 1 option left
    if (this.options.length == 1) this.collapse();

    // Loop Through neighbours
    for (const [key, nb] of Object.entries(this.neighbours)) {
      // Skip already collapsed Neighbours
      if (nb.collapsed) continue;
      // Get Valid Edges of ALL this options
      var validEdges = this.getValidEdges(key);
      var validOptions = [];
      // Loop Neighbouring Slots and options
      for (var option of nb.options) {
        for(const adjacent of modules[option].getAdjacent(key)){
          // When Edge matches Adjacent add to new options
          if (validEdges.includes(adjacent)){
            if (!validOptions.includes(option)) {
              validOptions.push(option);
              break;
            }
          }
        }
      }
      // Check if there are options left
      if (validOptions.length==0)
        // Redraw grid
        startOver()
      else {
        // Update Neighbour options
        if (validOptions.length<nb.options.length)
          nb.options =validOptions;
      }
    }
  }
}
