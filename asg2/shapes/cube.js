class Cube {
  constructor() {
    this.type = "cube";
    // this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    // this.size = 5.0;
    // this.segments = 3;
    this.matrix = new Matrix4();
  }

  render() {
    let color = this.color;

    let vertices = new Float32Array([
      // Front
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      color[0],
      color[1],
      color[2],
      1,
      0,
      0,
      color[0],
      color[1],
      color[2],
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      0,
      1,
      0,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      color[0],
      color[1],
      color[2],

      // Top
      0,
      1,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,

      // Back
      0,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      0,
      0,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      0,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,

      // Botton
      0,
      0,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      0,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      0,
      0,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,

      // Right
      1,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,

      // Left
      0,
      0,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      0,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      0,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
    ]);

    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      6 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);
    // gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6);
  }
}
// var xy = this.position;
// var rgba = this.color;
// var size = this.size;

// // Pass the color of a point to u_FragColor variable
// gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

// gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
// drawTriangle3D([0, 0, 0, 1, 1, 0, 1, 0, 0]);
// drawTriangle3D([0, 0, 0, 0, 1, 0, 1, 1, 0]);
// gl.uniform4f(
//   u_FragColor,
//   rgba[0] * 0.9,
//   rgba[1] * 0.9,
//   rgba[2] * 0.9,
//   rgba[3]
// );
// drawTriangle3D([0, 1, 0, 0, 1, 1, 1, 1, 1]);
// drawTriangle3D([0, 1, 0, 1, 1, 1, 1, 1, 0]);
// gl.uniform4f(
//   u_FragColor,
//   rgba[0] * 0.75,
//   rgba[1] * 0.75,
//   rgba[2] * 0.75,
//   rgba[3]
// );
// drawTriangle3D([0, 0, 0, 0, 1, 0, 0, 1, 1]);
// drawTriangle3D([0, 0, 0, 0, 0, 1, 0, 1, 1]);
// gl.uniform4f(
//   u_FragColor,
//   rgba[0] * 0.8,
//   rgba[1] * 0.8,
//   rgba[2] * 0.8,
//   rgba[3]
// );
// drawTriangle3D([0, 0, 0, 1, 0, 0, 1, 0, 1]);
// drawTriangle3D([0, 0, 0, 0, 0, 1, 1, 0, 1]);
// gl.uniform4f(
//   u_FragColor,
//   rgba[0] * 0.8,
//   rgba[1] * 0.8,
//   rgba[2] * 0.8,
//   rgba[3]
// );
// drawTriangle3D([1, 0, 0, 1, 1, 0, 1, 1, 1]);
// drawTriangle3D([1, 0, 0, 1, 0, 1, 1, 1, 1]);
// gl.uniform4f(
//   u_FragColor,
//   rgba[0] * 0.65,
//   rgba[1] * 0.65,
//   rgba[2] * 0.65,
//   rgba[3]
// );
// drawTriangle3D([0, 0, 1, 0, 1, 1, 1, 1, 1]);
// drawTriangle3D([0, 0, 1, 1, 0, 1, 1, 1, 1]);
