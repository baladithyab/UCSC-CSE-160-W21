// From ColoredPoint.js (c) 2012 matsuda

// Vertex shader program
var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform float u_Size;
uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotateMatrix;
varying vec3 v_Color;
attribute vec3 a_Color;
  void main() {
    v_Color = a_Color;
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    gl_PointSize = u_Size;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
  uniform vec4 u_FragColor;
  varying vec3 v_Color;
  void main() {
    gl_FragColor = vec4(v_Color,1);
  }
  `;

let canvas;
let gl;
let a_Position;
let a_Color;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
var g_tailAng;
var g_upperleftAng = 45;
var g_leftforeAng;
var g_upperrightAng;
var g_rightforeAng;
var g_globalAngleX = -10;
var g_globalAngleY = 10;
var g_globRotMatX = new Matrix4().rotate(g_globalAngleX, 1, 0, 0);
var g_globRotMatY = new Matrix4().rotate(g_globalAngleY, 0, 1, 0);
var bufarr = new bufferarray(10);
var g_startTime = performance.now();
var g_seconds = performance.now() / 1000.0 - g_startTime;
let mouseX = null;
let mouseY = null;
let scalefact = 1;
var animation = true;

function main() {
  // var ree = new bufferarray(3);
  getCnvsGL();
  GLSLinit();
  addUIControllers();

  canvas.onmousedown = TiltPan;
  canvas.onmousemove = TiltPan;
  canvas.onmouseup = function () {
    // strokeBufferCount = strokeBuffer;
    mouseX = null;
    mouseY = null;
  };
  canvas.ontouchstart = TiltPan;
  canvas.ontouchend = TiltPan;
  canvas.onwheel = Zoom;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // renderShapes();
  requestAnimationFrame(tick);
}

function ClearCanvas() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  g_shapes = [];
}

function Zoom(ev) {
  scalefact += ev.deltaY > 0 ? -0.25 : 0.25;

  renderShapes();
}

function TiltPan(ev) {
  if (ev.buttons == 1) {
    [x, y] = converttoGLCoords(ev);
    if (mouseX != null && mouseY != null) {
      var diffx = y - mouseY;
      var diffy = x - mouseX;
      mouseX = x;
      mouseY = y;
      // if (x - mouseX > 0) {
      //   console.log("Right:", diffx);
      // } else {
      //   console.log("Left:", diffx);
      // }
      // if (y - mouseY > 0) {
      //   console.log("Up:", diffy);
      // } else {
      //   console.log("Down:", diffy);
      // }

      g_globalAngleX += diffx * 100;
      g_globalAngleY -= diffy * 100;

      g_globalAngleX %= 360;
      g_globalAngleY %= 360;

      if (g_globalAngleX < 0) {
        g_globalAngleX = 360 - g_globalAngleX;
      }
      if (g_globalAngleY < 0) {
        g_globalAngleY = 360 - g_globalAngleY;
      }
    } else {
      mouseX = x;
      mouseY = y;
    }

    g_globRotMatX = new Matrix4().rotate(g_globalAngleX, 1, 0, 0);

    g_globRotMatY = new Matrix4().rotate(g_globalAngleY, 0, 1, 0);

    renderShapes();
  }
}

function toggleAnimation() {
  if (animation == true) {
    animation = false;
  } else {
    animation = true;
    requestAnimationFrame(tick);
    // g_startTime = performance.now();
  }
  // console.log(animation);
}

function tick() {
  g_seconds = performance.now() / 1000.0 - g_startTime;

  if (animation == true) {
    renderShapes(true);
    requestAnimationFrame(tick);
  } else {
    renderShapes(false);
  }
}

function renderShapes(update) {
  var startTime = performance.now();

  var globRot = new Matrix4()
    .scale(scalefact, scalefact, scalefact)
    .multiply(g_globRotMatX)
    .multiply(g_globRotMatY);

  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globRot.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var charmander = new Charmander();
  if (update) {
    charmander.updateAng();
  }
  charmander.render();

  // var cube = new Cube();
  // cube.render();

  var duration = performance.now() - startTime;
  // console.log("fps: " + Math.floor(10000 / duration));
  document.getElementById("fps").innerHTML =
    "fps:" + Math.floor(10000 / duration);
}

function converttoGLCoords(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  return [x, y];
}

function getCnvsGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById("webgl");

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });

  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(
    gl.SRC_ALPHA,
    gl.ONE_MINUS_SRC_ALPHA,
    gl.ONE,
    gl.ONE_MINUS_SRC_ALPHA
  );

  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }
}

function GLSLinit() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  // NOTE: idk why but diabling this makes things work out
  // // Get the storage location of u_FragColor
  // u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  // if (!u_FragColor) {
  //   console.log("Failed to get the storage location of u_FragColor");
  //   return;
  // }

  u_Size = gl.getUniformLocation(gl.program, "u_Size");
  if (!u_Size) {
    console.log("Failed to get the storage location of u_Size");
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if (!u_Size) {
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(
    gl.program,
    "u_GlobalRotateMatrix"
  );
  if (!u_Size) {
    console.log("Failed to get the storage location of u_GlobalRotateMatrix");
    return;
  }

  a_Color = gl.getAttribLocation(gl.program, "a_Color");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Color");
    return;
  }

  var identityMat = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityMat.elements);
}

// console.log("clicked");
// if (strokeBuffer == strokeBufferCount) {
//   // console.log("clicked++");
//   [x, y] = converttoGLCoords(ev);
//   var hex = setColorHextoRGB();
//   var shape;
//   switch (g_shape) {
//     case "point":
//       console.log("point");
//       shape = new Point();
//       break;
//     case "triangle":
//       console.log("tri");
//       shape = new Triangle();
//       break;
//     case "circle":
//       shape = new Circle();
//       console.log("circ");
//       shape.segments = g_seg;
//       break;
//     default:
//       console.log("Shape Mismatch", g_shape);
//       break;
//   }
//   shape.position = [x, y, 0.0];
//   shape.color = [hex[0] / 255, hex[1] / 255, hex[2] / 255, hex[3] / 100];
//   shape.size = g_size;
//   g_shapes.push(shape);
//   renderShapes();
//   strokeBufferCount = 1;
// } else {
//   // console.log("clicked++", strokeBuffer);
//   strokeBufferCount++;
// }
