// asg0.js
function CtxCanvas() {
  var canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return;
  }
  var ctx = canvas.getContext("2d");
  return [canvas, ctx];
}

function drawVector(v, color) {
  var [canvas, ctx] = CtxCanvas();
  ctx.beginPath();
  ctx.moveTo(200, 200);
  // console.log(JSON.stringify(v));
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
  // ctx.lineWidth = 10;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function angleBetween(v1, v2) {
  return (
    Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude())) *
    (180 / Math.PI)
  );
}
function areaTriangle(v1, v2) {
  return 0.5 * Vector3.cross(v1, v2).magnitude();
}

function handleDrawEvent() {
  var [canvas, ctx] = CtxCanvas();
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)"; // Set a blue color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
  var v1x = document.getElementById("v1x").value;
  var v1y = document.getElementById("v1y").value;
  var v2x = document.getElementById("v2x").value;
  var v2y = document.getElementById("v2y").value;
  // console.log(v1x);
  var v1 = new Vector3([v1x, v1y, 0]);
  var v2 = new Vector3([v2x, v2y, 0]);
  drawVector(v1, "red");
  drawVector(v2, "blue");
  return [canvas, ctx, v1, v2];
}

function handleDrawOpEvent() {
  var [canvas, ctx, v1, v2] = handleDrawEvent();
  // console.log(JSON.stringify(v1));
  var opidx = document.getElementById("op").selectedIndex;
  // console.log(opidx);
  switch (opidx) {
    case 0:
      // console.log("Add");
      v1.add(v2);
      // console.log(JSON.stringify(v1));
      drawVector(v1, "green");
      break;
    case 1:
      // console.log("Angle between");
      console.log("Angle: " + angleBetween(v1, v2));
      break;
    case 2:
      // console.log("Area");
      console.log("Area of the triangle: " + areaTriangle(v1, v2));
      break;
    case 3:
      // console.log("Divide");
      var sclr = document.getElementById("scalar").value;
      // console.log(typeof sclr);
      if (sclr != null && sclr != undefined && sclr != "") {
        v1.div(sclr);
        v2.div(sclr);
        drawVector(v1, "green");
        drawVector(v2, "green");
      } else {
        alert("Scalar cannot be NULL");
      }
      break;
    case 4:
      // console.log("Magnitude");
      // console.log(v1.magnitude());
      console.log("Magnitude v1: " + v1.magnitude());
      console.log("Magnitude v2: " + v2.magnitude());
      break;
    case 5:
      // console.log("Multiply");
      var sclr = document.getElementById("scalar").value;
      // console.log(typeof sclr);
      if (sclr != null && sclr != undefined && sclr != "") {
        v1.mul(sclr);
        v2.mul(sclr);
        drawVector(v1, "green");
        drawVector(v2, "green");
      } else {
        alert("Scalar cannot be NULL");
      }
      break;
    case 6:
      // console.log("Normalize");
      v1.normalize();
      v2.normalize();
      drawVector(v1, "green");
      drawVector(v2, "green");
      break;
    case 7:
      // console.log("Subtract");
      v1.sub(v2);
      drawVector(v1, "green");
      break;
  }
  // console.log("Operation selected");
}

function main() {
  // Retrieve <canvas> element <- (1)
  var [canvas, ctx] = CtxCanvas();
  var v1 = new Vector3([2.25, 2.25, 0]);

  // var drawVector = function (v, color) {
  //   this.beginPath();
  //   this.moveTo(200, 200);
  //   this.lineTo(v.x, v.y);
  //   this.strokeStyle = color;
  //   this.stroke();
  // };

  // Get the rendering context for 2DCG <- (2)
  // console.log(JSON.stringify(v1));
  // Draw a blue rectangle <- (3)
  ctx.fillStyle = "rgba(0, 0, 0, 1.0)"; // Set a blue color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color
  drawVector(v1, "red");
}
