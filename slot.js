class Slot {
  constructor(x, y, z, opt) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.collapsed = false;
    this.options = opt;
    this.neighbours = {};
    
    this.color = color(0,0,0);
  }

  draw() {
    // Only Draw if Slot is fully collapsed
    if (!this.collapsed) return;

    var module = this.options[0];

    // Adding a wave effect for the water
    var y = this.y;
    if (!startWave && module.mesh.name=="water") {
      y = this.y + map(sin(sinWater),-1,1,0,0.3);
      sinWater += 0.04;
    }

    // Translate and Rotate
    translate(this.x, y, this.z);
    push();
    rotateY(module.angle*90);

    // Draw Mesh
    fill(this.color);
    switch (module.mesh.name) {
      case "air":
      if (DEBUG) point(0, 0, 0);
        break;
      case "box":
        box(1);
        break;
      default:
        model(module.mesh.model);
    }
    pop();
  }
  
  setColor() {
    // Set Colors based on Y-Axis
    if (this.y==-grid.r) this.color = color(152,210,234);
    else if (this.y==-grid.r+1) this.color = color(253,228,161);
    else if (this.y>=-grid.r+4) this.color = color(245,248,251);
    else this.color = color(187,216,158);
  }

  collapse() {
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
        side = val_x < 0 ? "2" : "0";
      } else if (abs(val_y) == 1 && val_x == 0 && val_z == 0) {
        // Down or Up Neighbour
        side = val_y < 0 ? "5" : "4";
      } else if (abs(val_z) == 1 && val_x == 0 && val_y == 0) {
        // Left or Right Neighbour
        side = val_z < 0 ? "1" : "3";
      }

      // Add (Direct) Neighbour
      if (side!="") {
        this.neighbours[side] = slot;
      }
    }
  }

  getValidConnections(side){
    var validConnections = [];
    // Loop through all the options
    this.options.forEach(option=>{
      // Loop throuhg all the connctions of a side
      option.connections[side].forEach(connection =>{
        // Add it to the array
        if (!validConnections.includes(connection))
          validConnections.push(connection)
      })
    })
    return validConnections;
  }

  propegate(newOptions) {
    // Set new Options
    this.options = newOptions;

    // Collapse when there is only 1 option left
    if (this.options.length == 1) this.collapse();

    // Loop Through neighbours that ar not Collapsed
    for (const [key, nb] of Object.entries(this.neighbours).filter((a) => !a[1].collapsed)) {
     // Get Valid Connections of ALL this options
      var validConnections = this.getValidConnections(key);
      var validOptions = [];

      // Loop through options of Neighbour
      for (var i = nb.options.length - 1; i >= 0; i--) {
        // If Option is a valid Connection it is a valid Option
        if(validConnections.includes(nb.options[i])) {
          validOptions.push(nb.options[i])
        }
      }
      // Check if there are options left
      if (validOptions.length==0)
        // Redraw grid
        startOver()
      else {
        // Propegate Neighbour options
        if (validOptions.length<nb.options.length)
          nb.propegate(validOptions);
      }
    }
  }
}
