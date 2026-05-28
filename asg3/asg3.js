// Worked a bit with Jackson Brazeal

// Vertex shader program
var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec2 a_UV;
varying vec2 v_UV;
uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotateMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjMatrix;

varying vec3 v_Color;
attribute vec3 a_Color;

  void main() {
    v_Color = a_Color;
    gl_Position = u_ProjMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
varying vec2 v_UV;
varying vec3 v_Color;

uniform int u_TexNum;

uniform sampler2D u_dirt;
uniform sampler2D u_mycelium_side;
uniform sampler2D u_mycelium_top;
uniform sampler2D u_mush_stem_inside;
uniform sampler2D u_mush_stem_outside;
uniform sampler2D u_mush_brown;
uniform sampler2D u_skybox;

void main() {
  if (u_TexNum == -3) {gl_FragColor = u_FragColor;}
    else if (u_TexNum == -2) {
      gl_FragColor = vec4(v_Color,1);
    } else if (u_TexNum == -1) {
      gl_FragColor = vec4(v_UV, 1, 1);
    } else if (u_TexNum == 0) {
      gl_FragColor = texture2D(u_dirt, v_UV);
    }else if (u_TexNum == 1) {
      gl_FragColor = texture2D(u_mycelium_side, v_UV);
    }else if (u_TexNum == 2) {
      gl_FragColor = texture2D(u_mycelium_top, v_UV);
    }else if (u_TexNum == 3) {
      gl_FragColor = texture2D(u_mush_stem_inside, v_UV);
    }else if (u_TexNum == 4) {
      gl_FragColor = texture2D(u_mush_stem_outside, v_UV);
    }else if (u_TexNum == 5) {
      gl_FragColor = texture2D(u_mush_brown, v_UV);
    }else if (u_TexNum == 6) {
      gl_FragColor = texture2D(u_skybox, v_UV);
    }
  }
  `;

let canvas;
let gl;
let keys = {};
let a_Position;
let a_Color;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_ViewMatrix;
let u_ProjMatrix;
let u_dirt;
let u_mycelium_side;
let u_mycelium_top;
let u_mush_stem_inside;
let u_mush_stem_outside;
let u_mush_brown;
let u_skybox;
let u_TexNum;

var g_tailAng;
var g_upperleftAng = 45;
var g_leftforeAng;
var g_upperrightAng;
var g_rightforeAng;

var g_camera;
var g_FOV = 90;
var g_globalAngleX = 0;
var g_globalAngleY = 0;
var bufarr = new bufferarray(10);
var g_startTime = performance.now();
var g_seconds = performance.now() / 1000.0 - g_startTime;
let hori;
let veri;
let mouseX = null;
let mouseY = null;
let scalefact = 1;
var animation = true;
var REE = false;
var copyVideo = false;
let skytex;
const video = setupVideo();

function main() {
  // var ree = new bufferarray(3);
  getCnvsGL();
  GLSLinit();
  addUIControllers();

  controlSetup();

  g_camera = new Camera();
  skytex = initVidTexture();

  initTextures();
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // renderShapes();
  requestAnimationFrame(tick);
}

function controlSetup() {
  //https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
  canvas.requestPointerLock =
    // saveVal ||
    canvas.requestPointerLock ||
    canvas.mozExitPointerLock ||
    canvas.webkitExitPointerLock;

  document.exitPointerLock =
    // saveVal ||
    document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;

  document.onpointerlockchange = lockchange;
  document.onmozpointerlockchange = lockchange;
  document.onwebkitpointerlockchange = lockchange;

  //WASD + QE key presses
  document.onkeydown = document.onkeyup = function (e) {
    e = e || event;
    keys[e.keyCode] = e.type == "keydown";
  };

  canvas.onclick = function () {
    if (
      document.pointerLockElement !== canvas &&
      document.mozPointerLockElement !== canvas &&
      document.webkitPointerLockElement !== canvas
    ) {
      canvas.requestPointerLock();
    }
  };
}

function lockchange() {
  if (
    document.pointerLockElement === canvas ||
    document.mozPointerLockElement === canvas ||
    document.webkitPointerLockElement === canvas
  ) {
    canvas.addEventListener("mousemove", TiltPan, false);
    // saveVal();
    // document.onmousemove = TiltPan;
  } else {
    canvas.removeEventListener("mousemove", TiltPan, false);
  }
}

function keypressFilter() {
  //https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
  if (keys[87]) {
    g_camera.moveForward();
  }
  if (keys[83]) {
    g_camera.moveBackwards();
  }
  if (keys[65]) {
    g_camera.moveLeft();
  }
  if (keys[68]) {
    g_camera.moveRight();
  }
  if (keys[81]) {
    g_camera.panLeft();
  }
  if (keys[69]) {
    g_camera.panRight();
  }
  if (keys[16]) {
    g_camera.moveDown();
  }
  if (keys[32]) {
    g_camera.moveUp();
  }
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
  //https://www.html5rocks.com/en/tutorials/pointerlock/intro/
  hori = ev.movementX || ev.mozMovementX || ev.webkitMovementX || 0;
  veri = ev.movementY || ev.mozMovementY || ev.webkitMovementY || 0;
  g_camera.mousePanTilt(hori, veri);

  // }

  // if (ev.buttons == 1) {
  //   [x, y] = converttoGLCoords(ev);
  //   if (mouseX != null && mouseY != null) {
  //     var diffx = y - mouseY;
  //     var diffy = x - mouseX;
  //     mouseX = x;
  //     mouseY = y;
  //     // if (x - mouseX > 0) {
  //     //   console.log("Right:", diffx);
  //     // } else {
  //     //   console.log("Left:", diffx);
  //     // }
  //     // if (y - mouseY > 0) {
  //     //   console.log("Up:", diffy);
  //     // } else {
  //     //   console.log("Down:", diffy);
  //     // }

  //     g_globalAngleX += diffx * 100;
  //     g_globalAngleY -= diffy * 100;

  //     g_globalAngleX %= 360;
  //     g_globalAngleY %= 360;

  //     if (g_globalAngleX < 0) {
  //       g_globalAngleX = 360 - g_globalAngleX;
  //     }
  //     if (g_globalAngleY < 0) {
  //       g_globalAngleY = 360 - g_globalAngleY;
  //     }
  //   } else {
  //     mouseX = x;
  //     mouseY = y;
  //   }
  //   // console.log(ev.movementX, ev.movementY);
  //   // renderShapes();
  // }
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

function toggleREE() {
  if (REE == true) {
    REE = false;
  } else {
    REE = true;
  }
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

  u_TexNum = gl.getUniformLocation(gl.program, "u_TexNum");
  if (!u_TexNum) {
    console.log("Failed to get the storage location of u_TexNum");
    return false;
  }

  u_dirt = gl.getUniformLocation(gl.program, "u_dirt");
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_dirt");
    return false;
  }

  u_mycelium_side = gl.getUniformLocation(gl.program, "u_mycelium_side");
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_mycelium_side");
    return false;
  }

  u_mycelium_top = gl.getUniformLocation(gl.program, "u_mycelium_top");
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_mycelium_top");
    return false;
  }

  u_mush_stem_inside = gl.getUniformLocation(gl.program, "u_mush_stem_inside");
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_mush_stem_inside");
    return false;
  }

  u_mush_stem_outside = gl.getUniformLocation(
    gl.program,
    "u_mush_stem_outside"
  );
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_mush_stem_outside");
    return false;
  }

  u_mush_brown = gl.getUniformLocation(gl.program, "u_mush_brown");
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_mush_brown");
    return false;
  }

  u_skybox = gl.getUniformLocation(gl.program, "u_skybox");
  if (!u_dirt) {
    console.log("Failed to get the storage location of u_skybox");
    return false;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, "a_UV");
  if (a_UV < 0) {
    console.log("Failed to get the storage location of a_UV");
    return;
  }

  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if (!u_ModelMatrix) {
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(
    gl.program,
    "u_GlobalRotateMatrix"
  );
  if (!u_GlobalRotateMatrix) {
    console.log("Failed to get the storage location of u_GlobalRotateMatrix");
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
  if (!u_ViewMatrix) {
    console.log("Failed to get the storage location of u_ViewMatrix");
    return;
  }

  u_ProjMatrix = gl.getUniformLocation(gl.program, "u_ProjMatrix");
  if (!u_ProjMatrix) {
    console.log("Failed to get the storage location of u_ProjMatrix");
    return;
  }

  a_Color = gl.getAttribLocation(gl.program, "a_Color");
  if (a_Color < 0) {
    console.log("Failed to get the storage location of a_Color");
    return;
  }

  var identityMat = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityMat.elements);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, identityMat.elements);
  gl.uniformMatrix4fv(u_ViewMatrix, false, identityMat.elements);
  gl.uniformMatrix4fv(u_ProjMatrix, false, identityMat.elements);
}

function initTextures() {
  // Get the storage location of u_dirt
  var image0 = new Image();
  var image1 = new Image();
  var image2 = new Image();
  var image3 = new Image();
  var image4 = new Image();
  var image5 = new Image();
  if (!image0 || !image1 || !image2 || !image3 || !image4 || !image5) {
    console.log("Failed to create the image object");
    return false;
  }
  // Register the event handler to be called on loading an image
  image0.onload = function () {
    loadTexture(0, image0);
  };
  image1.onload = function () {
    loadTexture(1, image1);
  };
  image2.onload = function () {
    loadTexture(2, image2);
  };
  image3.onload = function () {
    loadTexture(3, image3);
  };
  image4.onload = function () {
    loadTexture(4, image4);
  };
  image5.onload = function () {
    loadTexture(5, image5);
  };

  // Tell the browser to load an image
  image0.src = "assets/dirt.png";
  image1.src = "assets/mycelium_side.png";
  image2.src = "assets/mycelium_top.png";
  image3.src = "assets/mushroom_block_inside.png";
  image4.src = "assets/mushroom_stem.png";
  image5.src = "assets/brown_mushroom_block.png";
  return true;
}

function loadTexture(n, image) {
  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log("Failed to create the texture object");
    return false;
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0

  switch (n) {
    case 0:
      gl.activeTexture(gl.TEXTURE0);
      break;
    case 1:
      gl.activeTexture(gl.TEXTURE1);
      break;
    case 2:
      gl.activeTexture(gl.TEXTURE2);
      break;
    case 3:
      gl.activeTexture(gl.TEXTURE3);
      break;
    case 4:
      gl.activeTexture(gl.TEXTURE4);
      break;
    case 5:
      gl.activeTexture(gl.TEXTURE5);
      break;
  }

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler

  switch (n) {
    case 0:
      gl.uniform1i(u_dirt, 0);
      break;
    case 1:
      gl.uniform1i(u_mycelium_side, 1);
      break;
    case 2:
      gl.uniform1i(u_mycelium_top, 2);
      break;
    case 3:
      gl.uniform1i(u_mush_stem_inside, 3);
      break;
    case 4:
      gl.uniform1i(u_mush_stem_outside, 4);
      break;
    case 5:
      gl.uniform1i(u_mush_brown, 5);
      break;
  }
}

function renderShapes(update) {
  var startTime = performance.now();
  keypressFilter();
  var eye = g_camera.eye.elements;
  var at = g_camera.at.elements;
  var up = g_camera.up.elements;

  var projmat = new Matrix4();
  projmat.setPerspective(g_FOV, canvas.width / canvas.height, 0.1, 10000);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projmat.elements);

  var viewmat = new Matrix4();
  viewmat.setLookAt(
    eye[0],
    eye[1],
    eye[2],
    at[0],
    at[1],
    at[2],
    up[0],
    up[1],
    up[2]
  );
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewmat.elements);

  var globRot = new Matrix4()
    .scale(scalefact, scalefact, scalefact)
    .rotate(g_globalAngleX, 1, 0, 0)
    .rotate(g_globalAngleY, 0, 1, 0);

  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globRot.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var skybox = new Cube();
  skybox.texnum = 6;
  skybox.matrix.scale(1000, 1000, 1000);
  skybox.matrix.translate(-0.5, -0.5, -0.5);
  skybox.renderUV();
  if (copyVideo) {
    updateTex(video);
  }
  var world = new World();
  world.REE_Mode = REE;
  world.render();
  // var cube = new Cube();
  // cube.render();

  var duration = performance.now() - startTime;
  // console.log("fps: " + Math.floor(10000 / duration));
  document.getElementById("fps").innerHTML =
    "fps:" + Math.floor(10000 / duration);
}

function setupVideo() {
  //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL
  const video = document.createElement("video");

  var playing = false;
  var timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;

  video.addEventListener(
    "playing",
    function () {
      playing = true;
      checkReady();
    },
    true
  );

  video.addEventListener(
    "timeupdate",
    function () {
      timeupdate = true;
      checkReady();
    },
    true
  );

  video.src = "assets/galaxyfinal.mp4";
  video.play();

  function checkReady() {
    if (playing && timeupdate) {
      copyVideo = true;
    }
  }
  return video;
}

function initVidTexture() {
  //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL

  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log("Failed to create the texture object");
    return false;
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const width = 1;
  const height = 1;
  const border = 0;
  const pixel = new Uint8Array([135, 206, 250, 255]);

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    border,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixel
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  return texture;
}

function updateTex(video) {
  //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_textures_in_WebGL
  gl.activeTexture(gl.TEXTURE6);
  gl.bindTexture(gl.TEXTURE_2D, skytex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  gl.uniform1i(u_skybox, 6);
}
