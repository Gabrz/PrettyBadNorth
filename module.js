class Module {
  constructor(moduleName, angle) {
    this.name = moduleName;
    this.angle = angle * 90;

    // Add Mesh(es)
    this.meshes = getMeshes(this.name.split("_")[0]);

    // Prepare Edges and Adjacentcies
    this.edges = {};
    switch (moduleName) {
      case "box":
        this.edges = {
          up: "1111",
          right: "1111",
          front: "1111",
          down: "1111",
          left: "1111",
          back: "1111",
        };
        this.adjacent = {
          up: ["1111","0000"],
          right: ["1111","1100"],
          front: ["1111","1100"],
          down: ["1111"],
          left: ["1111","1100"],
          back: ["1111","1100"],
        };
        break;
      case "air":
        this.edges = {
          up: "0000",
          right: "0000",
          front: "0000",
          down: "0000",
          left: "0000",
          back: "0000",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0000","0011"],
          front: ["0000","0011"],
          down: ["0000", "1111"],
          left: ["0000","0011"],
          back: ["0000","0011"],
        };
        break;
      case "slope_f":
        this.edges = {
          up: "0000",
          right: "0111",
          front: "0011",
          down: "1111",
          left: "1011",
          back: "1100",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["1011"],
          front: ["0000"],
          down: ["1111"],
          left: ["0111"],
          back: ["1111"],
        };
        break;
      case "slope_l":
        this.edges = {
          up: "0000",
          right: "1100",
          front: "0111",
          down: "1111",
          left: "0011",
          back: "1011",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["1111"],
          front: ["1011"],
          down: ["1111"],
          left: ["0000"],
          back: ["0111"],
        };
        break;
      case "slope_b":
        this.edges = {
          up: "0000",
          right: "1011",
          front: "1100",
          down: "1111",
          left: "0111",
          back: "0011",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0111"],
          front: ["1111"],
          down: ["1111"],
          left: ["1011"],
          back: ["0000"],
        };
        break;
      case "slope_r":
        this.edges = {
          up: "0000",
          right: "0011",
          front: "1011",
          down: "1111",
          left: "1100",
          back: "0111",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0000"],
          front: ["0111"],
          down: ["1111"],
          left: ["1111"],
          back: ["1011"],
        };
        break;
      case "convex_f":
        this.edges = {
          up: "0000",
          right: "0111",
          front: "0011",
          down: "1111",
          left: "0011",
          back: "1011",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["1011"],
          front: ["0000"],
          down: ["1111"],
          left: ["0000"],
          back: ["0111"],
        };
        break;
      case "convex_l":
        this.edges = {
          up: "0000",
          right: "1011",
          front: "0111",
          down: "1111",
          left: "0011",
          back: "0011",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0111"],
          front: ["1011"],
          down: ["1111"],
          left: ["0000"],
          back: ["0000"],
        };
        break;
      case "convex_b":
        this.edges = {
          up: "0000",
          right: "0011",
          front: "1011",
          down: "1111",
          left: "0111",
          back: "0011",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0000"],
          front: ["0111"],
          down: ["1111"],
          left: ["1011"],
          back: ["0000"],
        };
        break;
      case "convex_r":
        this.edges = {
          up: "0000",
          right: "0011",
          front: "0011",
          down: "1111",
          left: "1011",
          back: "0111",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0000"],
          front: ["0000"],
          down: ["1111"],
          left: ["0111"],
          back: ["1011"],
        };
        break;
      case "concave_f":
        this.edges = {
          up: "0000",
          right: "1011",
          front: "1100",
          down: "1111",
          left: "1100",
          back: "0111",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["0111"],
          front: ["1111"],
          down: ["1111"],
          left: ["1111"],
          back: ["1011"],
        };
        break;
      case "concave_l":
        this.edges = {
          up: "0000",
          right: "0111",
          front: "1011",
          down: "1111",
          left: "1100",
          back: "1100",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["1011"],
          front: ["0111"],
          down: ["1111"],
          left: ["1111"],
          back: ["1111"],
        };
        break;
      case "concave_b":
        this.edges = {
          up: "0000",
          right: "1100",
          front: "0111",
          down: "1111",
          left: "1011",
          back: "1100",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["1111"],
          front: ["1011"],
          down: ["1111"],
          left: ["0111"],
          back: ["1111"],
        };
        break;
      case "concave_r":
        this.edges = {
          up: "0000",
          right: "1100",
          front: "1100",
          down: "1111",
          left: "0111",
          back: "1011",
        };
        this.adjacent = {
          up: ["0000"],
          right: ["1111"],
          front: ["1111"],
          down: ["1111"],
          left: ["1011"],
          back: ["0111"],
        };
        break;
      case "water":
        this.edges = {
          up: "9997",
          right: "9997",
          front: "9997",
          down: "9997",
          left: "9997",
          back: "9997",
        };
        this.adjacent = {
          up: ["0000","1111"],
          right: ["9997"],
          front: ["9997"],
          down: ["9997"],
          left: ["9997"],
          back: ["9997"],
        };
        break;
      default:
        this.edges = {
          up: "9999",
          right: "9999",
          front: "9999",
          down: "9999",
          left: "9999",
          back: "9999",
        };
        this.adjacent = {
          up: ["9998"],
          right: ["9998"],
          front: ["9998"],
          down: ["9998"],
          left: ["9998"],
          back: ["9998"],
        };
    }
  }

  getMesh() {
    // Randomize for a chance of an alternative Mesh
    return random(this.meshes);
  }

  getEdge(side) {
    // Return the Edge of a Side
    return this.edges[side];
  }

  getAdjacent(side) {
    // Flip the side
    var opposite = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
      front: "back",
      back: "front",
    }[side];
    // Return the Adjacent of a Side
    return this.adjacent[opposite];
  }
}

function initModules() {
  // Add Modules to Lookup table
  modules.air=(new Module("air", 0));
  modules.box=(new Module("box", 0));
  modules.water=(new Module("water", 0));
  modules.slope_f=(new Module("slope_f", 0));
  modules.slope_l=(new Module("slope_l", 1));
  modules.slope_b=(new Module("slope_b", 2));
  modules.slope_r=(new Module("slope_r", 3));
  modules.convex_f=(new Module("convex_f", 1));
  modules.convex_l=(new Module("convex_l", 2));
  modules.convex_b=(new Module("convex_b", 3));
  modules.convex_r=(new Module("convex_r", 0));
  modules.concave_f=(new Module("concave_f", 2));
  modules.concave_l=(new Module("concave_l", 3));
  modules.concave_b=(new Module("concave_b", 0));
  modules.concave_r=(new Module("concave_r", 1));
}