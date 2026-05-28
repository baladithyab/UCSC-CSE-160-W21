class Camera {
  constructor() {
    this.eye = new Vector3([0, 4, -1]);
    this.at = new Vector3([0, 4, 3]);
    this.up = new Vector3([0, 1, 0]);
    this.moveSpeed = 0.2;
    this.rotateSpeed = 2;
  }

  moveForward() {
    var d = new Vector3([0, 0, 0]);

    d.set(this.at);
    d.sub(this.eye);
    d.normalize();
    d.mul(this.moveSpeed);

    this.eye.add(d);
    this.at.add(d);
  }

  moveBackwards() {
    var d = new Vector3([0, 0, 0]);

    d.set(this.at);
    d.sub(this.eye);
    d.normalize();
    d.mul(this.moveSpeed);

    this.eye.sub(d);
    this.at.sub(d);
  }

  moveLeft() {
    var f = new Vector3([0, 0, 0]);

    f.set(this.at);
    f.sub(this.eye);

    var d = Vector3.cross(this.up, f);

    d.normalize();
    d.mul(this.moveSpeed);

    this.eye.add(d);
    this.at.add(d);
  }

  moveRight() {
    var f = new Vector3([0, 0, 0]);

    f.set(this.at);
    f.sub(this.eye);

    var d = Vector3.cross(this.up, f);

    d.normalize();
    d.mul(this.moveSpeed);

    this.eye.sub(d);
    this.at.sub(d);
  }

  moveUp() {
    let d = new Vector3([0, 1, 0]);
    d.mul(this.moveSpeed);

    this.eye.add(d);
    this.at.add(d);
  }

  moveDown() {
    let d = new Vector3([0, 1, 0]);
    d.mul(this.moveSpeed);

    this.eye.sub(d);
    this.at.sub(d);
  }

  panLeft() {
    var d = new Vector3([0, 0, 0]);

    d.set(this.at);
    d.sub(this.eye);

    var rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(this.rotateSpeed, 0, 1, 0);

    var d_prime = rotationMatrix.multiplyVector3(d);

    this.at.set(this.eye);
    this.at.add(d_prime);
  }

  panRight() {
    var d = new Vector3([0, 0, 0]);

    d.set(this.at);
    d.sub(this.eye);

    var rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(-this.rotateSpeed, 0, 1, 0);

    var d_prime = rotationMatrix.multiplyVector3(d);

    this.at.set(this.eye);
    this.at.add(d_prime);
  }

  mousePanTilt(horizontal, vertical) {
    // console.log(horizontal, vertical);
    // console.log(document.pointerLockElement);
    var d = new Vector3([0, 0, 0]);

    d.set(this.at);
    d.sub(this.eye);

    var axis = Vector3.cross(this.up, d).elements;

    var rotationMatrix = new Matrix4();
    rotationMatrix.rotate(vertical, axis[0], axis[1], axis[2]);
    rotationMatrix.rotate(-horizontal, 0, 1, 0);

    var d_prime = rotationMatrix.multiplyVector3(d);

    this.at.set(this.eye);
    this.at.add(d_prime);
  }
}
