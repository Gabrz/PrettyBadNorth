class Mesh {
  constructor(meshName) {
    this.name = meshName;
    this.model = new p5.Geometry(1, 1, function createGeometry() {
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
          case "convex":
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
        case "concave":
          this.vertices.push(
            // new p5.Vector(0.5, 0.5, -0.5),
            // new p5.Vector(-0.5, 0.5, 0.5),
            // new p5.Vector(0.5, -0.5, 0.5)
            
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
}

function getMeshes(meshName) {
  // Add Meshes to Lookup table
  var meshArr = [];
  meshArr.push(meshes[meshName]);
  
  if (["convex", "concave"].includes(meshName)) {
    meshArr.push(meshes[meshName+1]);
  }
  
  return meshArr
}

function initMeshes() {
  // Add Meshes to Lookup table
  meshes.air = new Mesh("air");
  meshes.box = new Mesh("box");
  meshes.water = new Mesh("water");
  meshes.slope = new Mesh("slope");
  meshes.convex = new Mesh("convex");
  meshes.convex1 = new Mesh("convex1");
  meshes.concave = new Mesh("concave");
  meshes.concave1 = new Mesh("concave1");
}