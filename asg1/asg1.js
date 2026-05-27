// From ColoredPoint.js (c) 2012 matsuda

// Vertex shader program
var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
  `;

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
var g_shapes = [];
var g_shape = "point";
var g_size = document.getElementById("SS").value;
var g_seg = document.getElementById("SegS").value;
var strokeBuffer = document.getElementById("BufS").value;
var strokeBufferCount = strokeBuffer;

function main() {
  getCnvsGL();
  GLSLinit();
  addUIControllers();
  // console.log(g_shape, g_size);
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = click;
  canvas.onmouseup = function () {
    strokeBufferCount = strokeBuffer;
  };
  canvas.ontouchstart = click;
  canvas.ontouchend = click;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function ClearCanvas() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  g_shapes = [];
}

function click(ev) {
  if (ev.buttons == 1) {
    // console.log("clicked");
    if (strokeBuffer == strokeBufferCount) {
      // console.log("clicked++");
      [x, y] = converttoGLCoords(ev);
      var hex = setColorHextoRGB();
      var shape;

      switch (g_shape) {
        case "point":
          console.log("point");
          shape = new Point();
          break;
        case "triangle":
          console.log("tri");
          shape = new Triangle();
          break;
        case "circle":
          shape = new Circle();
          console.log("circ");
          shape.segments = g_seg;
          break;
        default:
          console.log("Shape Mismatch", g_shape);
          break;
      }

      shape.position = [x, y, 0.0];
      shape.color = [hex[0] / 255, hex[1] / 255, hex[2] / 255, hex[3] / 100];
      shape.size = g_size;

      g_shapes.push(shape);

      renderShapes();
      strokeBufferCount = 1;
    } else {
      // console.log("clicked++", strokeBuffer);
      strokeBufferCount++;
    }
  }
}

function renderShapes() {
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  // console.log(g_shapes);

  var len = g_shapes.length;
  for (var i = 0; i < len; i++) {
    // console.log(g_shapes[i]);
    g_shapes[i].render();
  }
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

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, "u_Size");
  if (!u_Size) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }
}
