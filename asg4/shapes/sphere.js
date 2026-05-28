class Sphere {
  constructor() {
    this.type = "sphere";
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 15.0;
    // this.segments = 3;
    this.matrix = new Matrix4();
    this.normmatrix = new Matrix4();
    let pts = this.genPts();
    this.verts = this.genVerts(pts);
    this.texnum = -3;
  }

  genPts() {
    let cartPts = new Array(this.size);
    for (var i = 0; i <= this.size; i++) {
      let lat = (Math.PI * i) / this.size;
      cartPts[i] = new Array(this.size);
      for (var j = 0; j <= this.size; j++) {
        let lng = (2 * Math.PI * j) / this.size;
        cartPts[i][j] = this.convertToCart(lat, lng);
      }
    }
    return cartPts;
  }

  convertToCart(lat, lng) {
    let x = Math.sin(lat) * Math.cos(lng);
    let y = Math.sin(lat) * Math.sin(lng);
    let z = Math.cos(lat);
    return [x, y, z];
  }

  genVerts(pts) {
    let color = this.color;
    let verts = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        // console.log(pts[i][j]);
        verts = verts.concat(pts[i][j]);
        verts = verts.concat([1.0, 0.0]);
        // verts.concat(pts[i][j]); //Normals
        verts = verts.concat([color[0], color[1], color[2]]);

        verts = verts.concat(pts[i][j + 1]);
        verts = verts.concat([0.0, 0.0]);
        // verts.concat(pts[i][j+1]); //Normals
        verts = verts.concat([color[0], color[1], color[2]]);
        // console.log(verts);
        verts = verts.concat(pts[i + 1][j]);
        verts = verts.concat([1.0, 1.0]);
        // verts.concat(pts[i+1][j]); //Normals
        verts = verts.concat([color[0], color[1], color[2]]);

        verts = verts.concat(pts[i][j + 1]);
        verts = verts.concat([0.0, 0.0]);
        // verts.concat(pts[i][j+1]); //Normals
        verts = verts.concat([color[0], color[1], color[2]]);

        verts = verts.concat(pts[i + 1][j + 1]);
        verts = verts.concat([0.0, 1.0]);
        // verts.concat(pts[i+1][j+1]); //Normals
        verts = verts.concat([color[0], color[1], color[2]]);

        verts = verts.concat(pts[i + 1][j]);
        verts = verts.concat([1.0, 1.0]);
        // verts.concat(pts[i+1][j]); //Normals
        verts = verts.concat([color[0], color[1], color[2]]);
      }
    }
    // console.log(typeof verts);
    return verts;
  }

  render() {
    let color = this.color;
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object");
      return -1;
    }

    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);
    gl.uniform1i(u_TexNum, this.texnum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    this.normmatrix.setInverseOf(this.matrix).transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, this.normmatrix.elements);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.verts),
      gl.DYNAMIC_DRAW
    );

    let FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 8 * FLOAT_SIZE, 0);
    gl.enableVertexAttribArray(a_Normal);

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
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // console.log(this.verts);
    gl.drawArrays(gl.TRIANGLES, 0, this.verts.length / 8);

    // var d = Math.PI / 20; //segments
    // var dd = Math.PI / 20; //segment sizes

    // for (var t = 0; t < Math.PI; t += d) {
    //   for (var r = 0; r < 2 * Math.PI; r += d) {
    //     var p1 = [
    //       Math.sin(t) * Math.cos(r),
    //       Math.sin(t) * Math.sin(r),
    //       Math.cos(t),
    //     ];

    //     var p2 = [
    //       Math.sin(t + dd) * Math.cos(r),
    //       Math.sin(t + dd) * Math.sin(r),
    //       Math.cos(t + dd),
    //     ];
    //     var p3 = [
    //       Math.sin(t) * Math.cos(r + dd),
    //       Math.sin(t) * Math.sin(r + dd),
    //       Math.cos(t),
    //     ];
    //     var p4 = [
    //       Math.sin(t + dd) * Math.cos(r + dd),
    //       Math.sin(t + dd) * Math.sin(r + dd),
    //       Math.cos(t + dd),
    //     ];

    //     var v = [];
    //     v = v.concat(p1);
    //     v = v.concat(p2);
    //     v = v.concat(p4);

    //     gl.uniform4f(
    //       u_FragColor,
    //       this.color[0],
    //       this.color[1],
    //       this.color[2],
    //       1
    //     );
    //     drawTriangle3D(v, v);

    //     v = [];
    //     v = v.concat(p1);
    //     v = v.concat(p4);
    //     v = v.concat(p3);

    //     drawTriangle3D(v, v);
    //   }
    // }
  }
}
