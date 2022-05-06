class Mesh {
  constructor(meshName,sockets) {
    this.name = meshName;
    this.sockets = sockets;
    this.model = getModel(meshName);
  }

  getAllSockets(angle) {
    var sockets = [];
    this.sockets.forEach((socket,i) =>{
      sockets[i] = this.getSocket(angle,i);
    })
    return sockets;
  }

  getSocket(angle,side){
    var len = 4;
    if (side<len)
      // Rotate Front, Left, Back and Right
      return this.sockets[(side-angle+len)%len];
    else
      // TODO Rotate Top and Bottom?
      return this.sockets[side];
  }
}

function initMeshes() {
  // Return all Meshes
  return [        // FRONT, LEFT, BACK, RIGHT, UP, DOWN
    new Mesh("air", ["000","000","000","000","000","000"]),
    //new Mesh("air0", ["000","000","000","000","000","222"]),
    //new Mesh("air1", ["222","000","000","000","000","000"]),
    //new Mesh("air2", ["222","000","000","000","000","222"]),
    new Mesh("box", ["222","222","222","222","222","222"]),
    new Mesh("slope", ["000","210","222","012","000","222"]),
    new Mesh("convex0", ["000","210","012","000","000","222"]),
    new Mesh("convex1", ["000","210","012","000","000","222"]),
    new Mesh("concave0", ["012","210","222","222","000","222"]),
    new Mesh("concave1", ["012","210","222","222","000","222"]),
    new Mesh("water", ["998","998","998","998","998","998"])
  ]
}

function getModel(meshName){
  return new p5.Geometry(1, 1, function createGeometry() {
    switch (meshName) {
      // Build the different Meshes
      case "slope":
        this.vertices.push(
          new p5.Vector(-0.5, 0.5, 0.5),
          new p5.Vector(0.5, -0.5, 0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, -0.5, -0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, -0.5, 0.5)
        );
        this.computeFaces();
        break;
      case "water":
        this.vertices.push(
          new p5.Vector(-0.5, 0.5, 0.5),
          new p5.Vector(0.5, 0.5, 0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, 0.5, -0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, 0.5, 0.5)
        );
        this.computeFaces();
        break;
        case "convex0":
        var ver = this.vertices.push(
          new p5.Vector(0.5, -0.5, -0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(-0.5, -0.5, 0.5)
        );
        this.faces.push([0, 1, 2]);
        break;
      case "convex1":
        this.vertices.push(
          new p5.Vector(-0.5, -0.5, 0.5),
          new p5.Vector(0.5, -0.5, 0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, -0.5, -0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, -0.5, 0.5)
        );
        this.computeFaces();
        break;
      case "concave0":
        this.vertices.push(
          new p5.Vector(-0.5, 0.5, 0.5),
          new p5.Vector(0.5, 0.5, 0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, -0.5, -0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(0.5, 0.5, 0.5)
        );
        this.computeFaces();
        break;
      case "concave1":
        this.vertices.push(
          new p5.Vector(0.5, 0.5, 0.5),
          new p5.Vector(0.5, -0.5, -0.5),
          new p5.Vector(-0.5, 0.5, 0.5),
          new p5.Vector(-0.5, 0.5, -0.5),
          new p5.Vector(-0.5, 0.5, 0.5),
          new p5.Vector(0.5, -0.5, -0.5)
        );
        this.computeFaces();
        break;
      default:
        break;          
    }
    this.computeNormals();
    this.gid = meshName;
  });
}