class Star {
  constructor() {
    this.lightPos = new Vector3([0.0, 18, 0.0]);
    this.body = new Sphere();
    this.body.color = [1, 1, 1];
    this.body.matrix.translate(0.0, 20, 0.0);
  }

  orbit() {
    this.lightPos.elements[0] +=
      Math.sin(g_seconds + 5) + Math.cos(g_seconds + 5);
    this.lightPos.elements[1] +=
      Math.sin(g_seconds + 5) + Math.sin(g_seconds + 5);
    this.lightPos.elements[2] += Math.cos(g_seconds + 5);

    this.body.matrix.translate(
      Math.sin(g_seconds + 5) + Math.cos(g_seconds + 5),
      Math.sin(g_seconds + 5) + Math.sin(g_seconds + 5),
      Math.cos(g_seconds + 5)
    );
    this.render();
  }

  render() {
    this.body.render();
    gl.uniform3fv(u_LightPos, this.lightPos.elements);
  }
}
