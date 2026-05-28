class Cube {
  constructor() {
    this.type = "cube";
    // this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    // this.size = 5.0;
    // this.segments = 3;
    this.matrix = new Matrix4();
    this.texnum = 0;

    this.front = 0;
    this.back = 0;
    this.right = 0;
    this.left = 0;
    this.top = 0;
    this.bot = 0;
  }

  setMycelium() {
    this.top = 2;
    this.bot = 0;
    this.left = 1;
    this.right = 1;
    this.front = 1;
    this.back = 1;
  }

  setShroomStem() {
    this.top = 3;
    this.bot = 3;
    this.left = 4;
    this.right = 4;
    this.front = 4;
    this.back = 4;
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

  renderUV() {
    let color = this.color;
    let vertices = new Float32Array([
      // Front1
      0,
      0,
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      1,
      1,
      color[0],
      color[1],
      color[2],
      1,
      0,
      0,
      1,
      0,
      color[0],
      color[1],
      color[2],
      // Front2
      0,
      0,
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      0,
      1,
      0,
      0,
      1,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      1,
      1,
      color[0],
      color[1],
      color[2],

      // Top1
      0,
      1,
      0,
      0,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      //Top2
      0,
      1,
      0,
      0,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      0,
      1,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,

      // Back1
      0,
      1,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      0,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      0,
      0,
      1,
      1,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      // Back2
      0,
      1,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      1,
      1,
      0,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      0,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,

      // Bottom1
      0,
      0,
      0,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      0,
      0,
      1,
      0,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      // Bottom2
      0,
      0,
      0,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      0,
      1,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,

      // Right1
      1,
      0,
      0,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      0,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Right2
      1,
      0,
      0,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,

      // Left1
      0,
      0,
      0,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      0,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Left2
      0,
      0,
      0,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      0,
      1,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
    ]);

    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.texnum);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }

  renderTri() {
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.uniform1i(u_TexNum, this.front);

    //Front face
    drawTriangle3DUV([0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 0, 1, 1, 1, 0]);
    drawTriangle3DUV([0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1]);

    gl.uniform1i(u_TexNum, this.top);
    //Top face
    drawTriangle3DUV([0, 1, 0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1]);
    drawTriangle3DUV([0, 1, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 0]);

    gl.uniform1i(u_TexNum, this.right);
    //Right Face
    drawTriangle3DUV([1, 0, 0, 1, 1, 0, 1, 1, 1], [0, 0, 0, 1, 1, 1]);
    drawTriangle3DUV([1, 0, 0, 1, 0, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1]);

    gl.uniform1i(u_TexNum, this.left);
    //Left Face
    drawTriangle3DUV([0, 0, 0, 0, 0, 1, 0, 1, 1], [1, 0, 0, 0, 0, 1]);
    drawTriangle3DUV([0, 0, 0, 0, 1, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1]);

    gl.uniform1i(u_TexNum, this.bot);
    //Bottom face
    drawTriangle3DUV([0, 0, 0, 1, 0, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1]);
    drawTriangle3DUV([0, 0, 0, 0, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0]);

    gl.uniform1i(u_TexNum, this.back);
    //Back face
    drawTriangle3DUV([0, 0, 1, 0, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1]);
    drawTriangle3DUV([0, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0]);
  }

  renderAll() {
    // this.renderFront();
    this.renderTop();
    // this.renderBack();
    this.renderBot();
    // this.renderRight();
    // this.renderLeft();
    this.renderSides();
  }

  renderSides() {
    let color = this.color;
    let vertices = new Float32Array([
      // Front1
      0,
      0,
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      1,
      1,
      color[0],
      color[1],
      color[2],
      1,
      0,
      0,
      1,
      0,
      color[0],
      color[1],
      color[2],
      // Front2
      0,
      0,
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      0,
      1,
      0,
      0,
      1,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      1,
      1,
      color[0],
      color[1],
      color[2],
      // Back1
      0,
      1,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      0,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      0,
      0,
      1,
      1,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      // Back2
      0,
      1,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      1,
      1,
      0,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      0,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      // Right1
      1,
      0,
      0,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      0,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Right2
      1,
      0,
      0,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Left1
      0,
      0,
      0,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      0,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Left2
      0,
      0,
      0,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      0,
      1,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
    ]);
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.front);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
  renderFront() {
    let color = this.color;
    let vertices = new Float32Array([
      // Front1
      0,
      0,
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      1,
      1,
      color[0],
      color[1],
      color[2],
      1,
      0,
      0,
      1,
      0,
      color[0],
      color[1],
      color[2],
      // Front2
      0,
      0,
      0,
      0,
      0,
      color[0],
      color[1],
      color[2],
      0,
      1,
      0,
      0,
      1,
      color[0],
      color[1],
      color[2],
      1,
      1,
      0,
      1,
      1,
      color[0],
      color[1],
      color[2],
    ]);
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.front);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
  renderTop() {
    let color = this.color;
    let vertices = new Float32Array([
      // Top1
      0,
      1,
      0,
      0,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      //Top2
      0,
      1,
      0,
      0,
      0,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.9,
      color[1] * 0.9,
      color[2] * 0.9,
      1,
      1,
      0,
      1,
      0,
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
    gl.uniform1i(u_TexNum, this.top);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
  renderBack() {
    let color = this.color;
    let vertices = new Float32Array([
      // Back1
      0,
      1,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      0,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      0,
      0,
      1,
      1,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      // Back2
      0,
      1,
      1,
      1,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      1,
      1,
      0,
      1,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
      0,
      1,
      0,
      0,
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
    ]);
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.back);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
  renderBot() {
    let color = this.color;
    let vertices = new Float32Array([
      // Bottom1
      0,
      0,
      0,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      0,
      0,
      1,
      0,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      // Bottom2
      0,
      0,
      0,
      0,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
      1,
      0,
      0,
      1,
      1,
      color[0] * 0.5,
      color[1] * 0.5,
      color[2] * 0.5,
    ]);
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.bot);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
  renderRight() {
    let color = this.color;
    let vertices = new Float32Array([
      // Right1
      1,
      0,
      0,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      0,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Right2
      1,
      0,
      0,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      1,
      1,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      1,
      0,
      1,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
    ]);
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.right);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
  renderLeft() {
    let color = this.color;
    let vertices = new Float32Array([
      // Left1
      0,
      0,
      0,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      0,
      1,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      // Left2
      0,
      0,
      0,
      1,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      1,
      1,
      0,
      1,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
      0,
      0,
      1,
      0,
      0,
      color[0] * 0.7,
      color[1] * 0.7,
      color[2] * 0.7,
    ]);
    // Create a buffer object
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }
    gl.uniform1i(u_TexNum, this.left);
    // console.log(this.texnum);
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

    // Assign the buffer object to a_Position variable and enable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);

    // Assign the buffer object to a_Color variable and enable
    gl.vertexAttribPointer(
      a_UV,
      2,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      3 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_UV);

    gl.vertexAttribPointer(
      a_Color,
      3,
      gl.FLOAT,
      false,
      8 * FLOAT_SIZE,
      5 * FLOAT_SIZE
    );
    gl.enableVertexAttribArray(a_Color);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8);
  }
}
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
