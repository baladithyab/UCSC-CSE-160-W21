// Vertex shader program
var VSHADER_SOURCE = `
attribute vec3 a_Position;
varying vec3 v_Position;

attribute vec3 a_Normal;
varying vec3 v_Normal;

attribute vec2 a_UV;
varying vec2 v_UV;

uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotateMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjMatrix;
uniform mat4 u_NormalMatrix;

varying vec3 v_Color;
attribute vec3 a_Color;

  void main() {
    v_Normal = vec3(u_NormalMatrix*vec4(a_Normal,1.0));
    v_Color = a_Color;
    v_Position = vec3(u_ModelMatrix*vec4(a_Position,1.0));
    gl_Position = u_ProjMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * vec4(a_Position,1.0);
    v_UV = a_UV;
  }
  `;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
varying vec2 v_UV;
varying vec3 v_Color;
varying vec3 v_Normal;
varying vec3 v_Position;

uniform int u_TexNum;

uniform sampler2D u_dirt;
uniform sampler2D u_mycelium_side;
uniform sampler2D u_mycelium_top;
uniform sampler2D u_mush_stem_inside;
uniform sampler2D u_mush_stem_outside;
uniform sampler2D u_mush_brown;
uniform sampler2D u_skybox;

uniform vec3 u_LightPos;
uniform vec3 u_CamPos;

uniform bool u_LightingOn;
uniform bool u_ColorNormalsOn;
uniform bool u_FlashLight;

uniform vec3 u_FlashlightPos;
uniform vec3 u_FlashlightAt;

void main() {
  vec4 baseColor;

  if (u_ColorNormalsOn) {
    baseColor = vec4((v_Normal + 1.0) / 2.0, 1);
  } else {
    if (u_TexNum == -4) {
      baseColor = u_FragColor;
    } else if (u_TexNum == -3) {
      baseColor = vec4(v_Color, 1);
    } else if (u_TexNum == -2) {
      baseColor = vec4(v_UV, 1, 1);
    } else if (u_TexNum == -1) {
      baseColor = vec4((v_Normal + 1.0) / 2.0, 1);
    } else if (u_TexNum == 0) {
      baseColor = texture2D(u_dirt, v_UV);
    } else if (u_TexNum == 1) {
      baseColor = texture2D(u_mycelium_side, v_UV);
    } else if (u_TexNum == 2) {
      baseColor = texture2D(u_mycelium_top, v_UV);
    } else if (u_TexNum == 3) {
      baseColor = texture2D(u_mush_stem_inside, v_UV);
    } else if (u_TexNum == 4) {
      baseColor = texture2D(u_mush_stem_outside, v_UV);
    } else if (u_TexNum == 5) {
      baseColor = texture2D(u_mush_brown, v_UV);
    } else if (u_TexNum == 6) {
      baseColor = texture2D(u_skybox, v_UV);
    }
  }

  if (u_LightingOn) {
    vec3 N = normalize(v_Normal);
    vec3 L = normalize(u_LightPos - v_Position);
    vec3 R = reflect(-L, N);
    vec3 V = normalize(u_CamPos - v_Position);

    vec3 k_a = vec3(0.15, 0.15, 0.15);
    vec3 k_d = vec3(0.6, 0.7, 0.7);
    vec3 k_s = vec3(0.8, 0.8, 0.8);

    float exponent = 100.0;

    vec3 ambient = k_a * baseColor.rgb;
    vec3 diffuse = k_d * baseColor.rgb * max(0.0, dot(L, N));
    vec3 specular = k_s * baseColor.rgb * pow(max(0.0, dot(R, V)), exponent);

    if (dot(L, N) < 0.0) {
      specular = vec3(0.0, 0.0, 0.0);
    }
    //https://stackoverflow.com/questions/43506820/webgl-spotlight
    if (u_FlashLight) {
      vec3 k_df = vec3(1, 0.8, 0.8);
      vec3 k_sf = vec3(1, 1, 1);

      vec3 Lf = normalize(u_FlashlightPos - v_Position);
      vec3 Rf = reflect(-Lf, N);

      vec3 diffusef = k_df * baseColor.rgb * max(0.0, dot(Lf, N));
      vec3 specularf = k_sf * baseColor.rgb * pow(max(0.0, dot(Rf, V)), exponent);

      if (dot(Lf, N) < 0.0) {
        specularf = vec3(0.0, 0.0, 0.0);
      }

      vec3 flashlightDirection = normalize(u_FlashlightAt - u_FlashlightPos);
      float angle = acos(dot(flashlightDirection, -Lf));
      float cone = radians(45.0);

      if (angle > cone) {
        diffusef = vec3(0.0, 0.0, 0.0);
        specularf = vec3(0.0, 0.0, 0.0);
      } else {
        diffusef = (k_df * baseColor.rgb * max(0.0, dot(Lf, N))) * (cone - angle) / cone;
        specularf = (k_sf * baseColor.rgb * pow(max(0.0, dot(Rf, V)), exponent)) * (cone - angle) / cone;
      }

      gl_FragColor = vec4(ambient + diffuse + specular + diffusef + specularf, baseColor.a);
    } else {
      gl_FragColor = vec4(ambient + diffuse + specular, baseColor.a);
    }
  } else {
    gl_FragColor = baseColor;
  }

}
  `;

let canvas;
let gl;
let keys = {};
let a_Position;
let a_Color;
let a_Normal;
let a_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_ViewMatrix;
let u_ProjMatrix;
let u_NormalMatrix;
let u_LightPos;
let u_FlashlightAt;
let u_FlashlightPos;
let u_ColorNormalsOn;
let u_LightingOn;
let u_FlashLight;
let u_CamPos;
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
var g_NormalsOn = false;
var g_LightingOn = true;
var g_FlashLightOn = true;
var copyVideo = false;
let skytex;
const video = setupVideo();
var world;
var star;
// let ticker = 2;

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

  world = new World();

  star = new Star();
  star.render();

  // let lightPos = new Vector3([0.0, 10.0, 0.0]);

  // gl.uniform3fv(u_LightPos, lightPos.elements);
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
    // renderShapes();
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
  // renderShapes();
}

function toggleAnimation() {
  if (animation == true) {
    animation = false;
    video.pause();
  } else {
    animation = true;
    video.play();
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

function toggleLighting() {
  if (g_LightingOn == true) {
    g_LightingOn = false;
  } else {
    g_LightingOn = true;
  }
}

function toggleNorms() {
  if (g_NormalsOn == true) {
    g_NormalsOn = false;
  } else {
    g_NormalsOn = true;
  }
}

function toggleFlashlight() {
  if (g_FlashLightOn == true) {
    g_FlashLightOn = false;
  } else {
    g_FlashLightOn = true;
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

  u_LightingOn = gl.getUniformLocation(gl.program, "u_LightingOn");
  if (!u_LightingOn) {
    console.log("Failed to get the storage location of u_LightingOn");
    return false;
  }

  u_FlashlightAt = gl.getUniformLocation(gl.program, "u_FlashlightAt");
  if (!u_FlashlightAt) {
    console.log("Failed to get the storage location of u_FlashlightAt");
    return false;
  }

  u_FlashlightPos = gl.getUniformLocation(gl.program, "u_FlashlightPos");
  if (!u_FlashlightPos) {
    console.log("Failed to get the storage location of u_FlashlightPos");
    return false;
  }

  u_FlashLight = gl.getUniformLocation(gl.program, "u_FlashLight");
  if (!u_FlashLight) {
    console.log("Failed to get the storage location of u_FlashLight");
    return false;
  }

  u_ColorNormalsOn = gl.getUniformLocation(gl.program, "u_ColorNormalsOn");
  if (!u_ColorNormalsOn) {
    console.log("Failed to get the storage location of u_ColorNormalsOn");
    return false;
  }

  u_LightPos = gl.getUniformLocation(gl.program, "u_LightPos");
  if (!u_LightPos) {
    console.log("Failed to get the storage location of u_LightPos");
    return false;
  }

  u_CamPos = gl.getUniformLocation(gl.program, "u_CamPos");
  if (!u_CamPos) {
    console.log("Failed to get the storage location of u_CamPos");
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

  a_Normal = gl.getAttribLocation(gl.program, "a_Normal");
  if (a_Normal < 0) {
    console.log("Failed to get the storage location of a_Normal");
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

  u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");
  if (!u_NormalMatrix) {
    console.log("Failed to get the storage location of u_NormalMatrix");
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

  gl.uniform3fv(u_CamPos, g_camera.eye.elements);
  gl.uniform3fv(u_FlashlightPos, g_camera.eye.elements);
  gl.uniform3fv(u_FlashlightAt, g_camera.at.elements);

  gl.uniform1i(u_FlashLight, g_FlashLightOn);
  gl.uniform1i(u_ColorNormalsOn, g_NormalsOn);
  gl.uniform1i(u_LightingOn, g_LightingOn);
  // console.log(g_FlashLightOn);
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

  world.REE_Mode = REE;
  world.render();
  // // var charm = new Charmander();
  // // charm.render();
  var cube = new Cube();
  cube.texnum = 6;
  cube.matrix.translate(-2, 5, 5);
  cube.color = [1, 1, 0, 1];
  cube.renderUV();
  var sphere = new Sphere();
  sphere.texnum = 6;
  sphere.matrix.translate(2, 5, 5);
  sphere.render();
  star.orbit();

  // star.render();

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
