class Module {
  constructor(name, angle, mesh) {
    this.name = name;
    this.angle = angle;
    this.mesh = mesh;
    this.connections = {};
  }

  getAllSockets(){
    return this.mesh.getAllSockets(this.angle);
  }

  getSocket(side){
    return this.mesh.getSocket(this.angle,side);
  }

  getOppositeSocket(side){
    // Find the oppposite side
    var oppSide = side;
    switch(side) {
      case 0: // Front
      case 1: // Left
        oppSide += 2;
        break
      case 2: // Back
      case 3: // Right
        oppSide -= 2;
        break;
      case 4: // Up
        oppSide += 1;
        break;
      case 5: // Down
        oppSide -= 1;
        break;
      default: // Unknown
        oppSide = -1;
    }
    // Return the opposite socket and reverse the string
    return this.getSocket(oppSide).split("").reverse().join("");
  }
}

function initModules(){
  // Initialize the meshes
  var meshes = initMeshes();
  // Turn Meshes into Modules
  for(const mesh of meshes){
    // Create Rotated versions
    for (var i=0; i < 4; i++){
      var moduleName = mesh.name+"_"+i
      modules[moduleName] = new Module(moduleName,i,mesh);
      if (["box_0","air_0","water_0"].includes(moduleName))
        // These don't have to be rotated
        break;
    }
  }

  // Create connections between modules based on Sockets
  for (const moduleA of Object.values(modules)) {
    // Loop through all the sockets
    var sockets = moduleA.getAllSockets();
    for (const [i, socket] of sockets.entries()) {
      var connections = [];
      // Loop through modules again to find matching sockets
      for (const moduleB of Object.values(modules)) {
        // If a Matching socket is found store it in an Array
        if (socket == moduleB.getOppositeSocket(i))
          connections.push(moduleB);
      }
      // Add Connections to the module
      moduleA.connections[i] = connections;
    }
  }
}