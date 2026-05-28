var tail2buf = new bufferarray(15);
var tail3buf = new bufferarray(15);
var tail4buf = new bufferarray(15);
var tail5buf = new bufferarray(15);
var tail6buf = new bufferarray(15);
var tail7buf = new bufferarray(15);
var tail8buf = new bufferarray(15);
var tail9buf = new bufferarray(15);

class Charmander {
  constructor() {}
  updateAng() {
    TailAngle.value = 45 * Math.sin(g_seconds);
    g_tailAng = 15 * Math.sin(g_seconds);
    UpperRightAngle.value = 15 * Math.sin(g_seconds);
    g_upperleftAng = 15 * Math.sin(g_seconds);
    UpperLeftAngle.value = 15 * Math.sin(g_seconds);
    g_upperrightAng = 15 * Math.sin(g_seconds);
    RightForeAngle.value = 15 * Math.sin(g_seconds);
    g_rightforeAng = 30 * Math.sin(g_seconds);
    LeftForeAngle.value = 15 * Math.sin(g_seconds);
    g_leftforeAng = 30 * Math.sin(g_seconds);
  }
  render() {
    var primaryskin = [254, 65, 0],
      iris = [0, 255, 255],
      bellyclr = [229, 204, 172],
      secondaryskin = [244, 177, 133],
      tailfire = [254, 200, 25],
      tailfire2 = [148, 32, 16];

    //body
    var body = new Cube();
    body.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    body.matrix.scale(0.25, 0.4, 0.25);
    body.matrix.translate(-0.5, -0.5, -0.5);
    body.texnum = -2;
    body.renderUV();

    //belly
    var belly = new Cube();
    belly.color = [bellyclr[0] / 255, bellyclr[1] / 255, bellyclr[2] / 255, 1];
    belly.matrix.scale(0.2, 0.38, 0.25);
    belly.matrix.translate(-0.5, -0.53, -0.51);
    belly.texnum = -2;
    belly.renderUV();

    //neck1
    var neck1 = new Cube();
    neck1.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    neck1.matrix.scale(0.2, 0.2, 0.2);
    neck1.matrix.translate(-0.5, 0.2, -0.5);
    neck1.texnum = -2;
    neck1.renderUV();
    //neck2
    var neck2 = new Cube();
    neck2.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    neck2.matrix.scale(0.1, 0.3, 0.1);
    neck2.matrix.translate(-0.5, 0.1, -0.5);
    neck2.texnum = -2;
    neck2.renderUV();
    //headmain
    var headmain = new Cube();
    headmain.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];

    headmain.matrix.scale(0.2, 0.225, 0.2);
    headmain.matrix.translate(-0.5, 1.35, -0.5);
    headmain.texnum = -2;
    headmain.renderUV();

    //mouthtop
    var mouthtop = new Cube();
    mouthtop.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];

    mouthtop.matrix.scale(0.2, 0.03, 0.2);
    mouthtop.matrix.translate(-0.5, 12, -0.75);
    mouthtop.texnum = -2;
    mouthtop.renderUV();

    //mouthbot
    var mouthbot = new Cube();
    mouthbot.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // mouthbot.matrix.translate(-0.1, 0.3, -0.15);
    mouthbot.matrix.scale(0.2, 0.03, 0.2);
    mouthbot.matrix.translate(-0.5, 10, -0.75);
    mouthbot.texnum = -2;
    mouthbot.renderUV();

    //tooth1
    var tooth1 = new Cube();
    tooth1.color = [1, 1, 1, 1];

    tooth1.matrix.scale(0.03, 0.03, 0.03);
    tooth1.matrix.translate(-3, 11.5, -4.9);
    tooth1.texnum = -2;
    tooth1.renderUV();

    //tooth2
    var tooth2 = new Cube();
    tooth2.color = [1, 1, 1, 1];

    tooth2.matrix.scale(0.03, 0.03, 0.03);
    tooth2.matrix.translate(2.2, 11.5, -4.9);
    tooth2.texnum = -2;
    tooth2.renderUV();

    //tooth3
    var tooth3 = new Cube();
    tooth3.color = [1, 1, 1, 1];

    tooth3.matrix.scale(0.03, 0.03, 0.03);
    tooth3.matrix.translate(-1.5, 10.5, -4.9);
    tooth3.texnum = -2;
    tooth3.renderUV();

    //tooth4
    var tooth4 = new Cube();
    tooth4.color = [1, 1, 1, 1];

    tooth4.matrix.scale(0.03, 0.03, 0.03);
    tooth4.matrix.translate(0.7, 10.5, -4.9);
    tooth4.texnum = -2;
    tooth4.renderUV();

    //eyeleft
    var eyeleft = new Cube();
    eyeleft.color = [1, 1, 1, 1];

    eyeleft.matrix.scale(0.07, 0.09, 0.07);
    eyeleft.matrix.translate(-1.3, 4.45, -1.55);
    eyeleft.texnum = -2;
    eyeleft.renderUV();

    //irisleft
    var irisleft = new Cube();
    irisleft.color = [iris[0] / 255, iris[1] / 255, iris[2] / 255, 1];

    irisleft.matrix.scale(0.04, 0.07, 0.03);
    irisleft.matrix.translate(-1.8, 5.7, -4);
    irisleft.texnum = -2;
    irisleft.renderUV();
    //pupilleft
    var pupilleft = new Cube();
    pupilleft.color = [0, 0, 0, 1];

    pupilleft.matrix.scale(0.02, 0.02, 0.02);
    pupilleft.matrix.translate(-2.6, 20.5, -6.5);
    pupilleft.texnum = -2;
    pupilleft.renderUV();

    //eyeright
    var eyeright = new Cube();
    eyeright.color = [1, 1, 1, 1];

    eyeright.matrix.scale(0.07, 0.09, 0.07);
    eyeright.matrix.translate(0.3, 4.45, -1.55);
    eyeright.texnum = -2;
    eyeright.renderUV();

    //irisright
    var irisright = new Cube();
    irisright.color = [iris[0] / 255, iris[1] / 255, iris[2] / 255, 1];

    irisright.matrix.scale(0.04, 0.07, 0.03);
    irisright.matrix.translate(0.8, 5.7, -4);
    irisright.texnum = -2;
    irisright.renderUV();

    //pupilright
    var pupilright = new Cube();
    pupilright.color = [0, 0, 0, 1];

    pupilright.matrix.scale(0.02, 0.02, 0.02);
    pupilright.matrix.translate(1.6, 20.5, -6.5);
    pupilright.texnum = -2;
    pupilright.renderUV();

    //horn1
    var horn1 = new Cube();
    horn1.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    horn1.matrix.translate(-0.06, 0.43, -0.05);
    horn1.matrix.rotate(45, 1, 0, 0);
    horn1.matrix.scale(0.12, 0.25, 0.12);
    horn1.texnum = -2;
    horn1.renderUV();

    //horn2
    var horn2 = new Cube();
    horn2.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    horn2.matrix.translate(-0.03, 0.45, 0.02);
    horn2.matrix.rotate(45, 1, 0, 0);
    horn2.matrix.scale(0.06, 0.3, 0.06);
    horn2.texnum = -2;
    horn2.renderUV();

    //upperleftarm
    var upperleftarm = new Cube();
    upperleftarm.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    upperleftarm.matrix.setTranslate(0.06, 0.17, -0.05);
    upperleftarm.matrix.rotate(50, 1, 0, 0);
    upperleftarm.matrix.rotate(-g_upperleftAng, 0, 0, 1);
    var leftarmMat = new Matrix4(upperleftarm.matrix);
    upperleftarm.matrix.scale(0.2, 0.1, 0.1);
    upperleftarm.texnum = -2;
    upperleftarm.renderUV();

    //leftforearm
    var leftforearm = new Cube();
    leftforearm.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    leftforearm.matrix = leftarmMat;
    leftforearm.matrix.translate(0.15, 0.05, 0);
    leftforearm.matrix.rotate(-g_leftforeAng, 0, 0, 1);
    // leftforearm.matrix.rotate(-55, 0, 0, 1);
    leftforearm.matrix.scale(0.1, -0.3, 0.1);
    leftforearm.texnum = -2;
    leftforearm.renderUV();

    //upperrightarm
    var upperrightarm = new Cube();
    upperrightarm.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    upperrightarm.matrix.setTranslate(-0.05, 0.17, -0.05);
    upperrightarm.matrix.rotate(50, 1, 0, 0);
    upperrightarm.matrix.rotate(g_upperrightAng, 0, 0, 1);
    var rightarmMat = new Matrix4(upperrightarm.matrix);
    upperrightarm.matrix.scale(-0.2, 0.1, 0.1);
    upperrightarm.texnum = -2;
    upperrightarm.renderUV();

    //leftforearm
    var leftforearm = new Cube();
    leftforearm.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    leftforearm.matrix = rightarmMat;
    leftforearm.matrix.translate(-0.15, 0.05, -0);
    leftforearm.matrix.rotate(g_rightforeAng, 0, 0, 1);
    // leftforearm.matrix.rotate(-55, 0, 0, 1);
    leftforearm.matrix.scale(-0.1, -0.3, 0.1);
    leftforearm.texnum = -2;
    leftforearm.renderUV();

    //rightleg
    var rightleg = new Cube();
    rightleg.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    rightleg.matrix.translate(-0.25, -0.4, -0);
    rightleg.matrix.rotate(45, 0, 1, 0);
    rightleg.matrix.scale(0.13, 0.3, 0.13);
    rightleg.texnum = -2;
    rightleg.renderUV();

    //rightfoot
    var rightfoot = new Cube();
    rightfoot.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    rightfoot.matrix.translate(-0.17, -0.4, 0.08);
    rightfoot.matrix.rotate(45, 0, 1, 0);

    rightfoot.matrix.scale(0.13, 0.03, -0.2);
    rightfoot.texnum = -2;
    rightfoot.renderUV();

    //leftleg
    var leftleg = new Cube();
    leftleg.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    leftleg.matrix.translate(0.05, -0.4, -0);
    leftleg.matrix.rotate(45, 0, 1, 0);

    leftleg.matrix.scale(0.13, 0.3, 0.13);
    leftleg.texnum = -2;
    leftleg.renderUV();

    //leftfoot
    var leftfoot = new Cube();
    leftfoot.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    leftfoot.matrix.translate(0.05, -0.4, -0);
    leftfoot.matrix.rotate(45, 0, 1, 0);

    leftfoot.matrix.scale(0.2, 0.03, 0.13);
    leftfoot.texnum = -2;
    leftfoot.renderUV();

    //tail1
    var tail1 = new Cube();
    tail1.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail1.matrix.rotate(g_tailAng, 0, 1, 0);
    tail1.matrix.scale(0.1, 0.1, 0.1);
    tail1.matrix.translate(-0.5, -2, 1);
    var tail2Ang = tail2buf.push(g_tailAng) * 1.02;
    tail1.texnum = -2;
    tail1.renderUV();

    //tail2
    var tail2 = new Cube();
    tail2.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail2.matrix.rotate(tail2Ang != null ? tail2Ang : null, 0, 1, 0);
    tail2.matrix.rotate(-5, 1, 0, 0);
    tail2.matrix.scale(0.1, 0.1, 0.1);
    tail2.matrix.translate(-0.5, -2.1, 1.5);
    var tail3Ang = tail3buf.push(tail2Ang) * 1.02;
    tail2.texnum = -2;
    tail2.renderUV();

    //tail3
    var tail3 = new Cube();
    tail3.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail3.matrix.rotate(tail3Ang != null ? tail3Ang : null, 0, 1, 0);
    tail3.matrix.rotate(-10, 1, 0, 0);
    tail3.matrix.scale(0.09, 0.09, 0.09);
    tail3.matrix.translate(-0.5, -2.5, 2);
    var tail4Ang = tail4buf.push(tail3Ang) * 1.02;
    tail3.texnum = -2;
    tail3.renderUV();

    //tail4
    var tail4 = new Cube();
    tail4.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail4.matrix.rotate(tail4Ang != null ? tail4Ang : null, 0, 1, 0);
    tail4.matrix.rotate(-13, 1, 0, 0);
    tail4.matrix.scale(0.09, 0.09, 0.09);
    tail4.matrix.translate(-0.5, -2.6, 2.5);
    var tail5Ang = tail5buf.push(tail4Ang) * 1.02;
    tail4.texnum = -2;
    tail4.renderUV();

    //tail5
    var tail5 = new Cube();
    tail5.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail5.matrix.rotate(tail5Ang != null ? tail5Ang : null, 0, 1, 0);
    tail5.matrix.rotate(-17, 1, 0, 0);
    tail5.matrix.scale(0.08, 0.08, 0.08);
    tail5.matrix.translate(-0.5, -3.2, 3.5);
    tail5.matrix.rotate(-20, 1, 0, 0);
    var tail6Ang = tail6buf.push(tail5Ang) * 1.02;
    tail5.texnum = -2;
    tail5.renderUV();

    //tail6
    var tail6 = new Cube();
    tail6.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail6.matrix.rotate(tail6Ang != null ? tail6Ang : null, 0, 1, 0);
    tail6.matrix.rotate(-20, 1, 0, 0);
    tail6.matrix.scale(0.07, 0.07, 0.07);
    tail6.matrix.translate(-0.5, -3.6, 4.6);
    tail6.matrix.rotate(-30, 1, 0, 0);
    var tail7Ang = tail7buf.push(tail6Ang) * 1.02;
    tail6.texnum = -2;
    tail6.renderUV();

    //tail7
    var tail7 = new Cube();
    tail7.color = [
      primaryskin[0] / 255,
      primaryskin[1] / 255,
      primaryskin[2] / 255,
      1,
    ];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail7.matrix.rotate(tail7Ang != null ? tail7Ang : null, 0, 1, 0);
    tail7.matrix.rotate(-50, 1, 0, 0);
    tail7.matrix.scale(0.03, 0.03, 0.15);
    tail7.matrix.translate(-0.5, -12, 1);
    // tail7.matrix.rotate(-45, 1, 0, 0);
    var tail8Ang = tail8buf.push(tail7Ang) * 1.02;
    tail7.texnum = -2;
    tail7.renderUV();

    //tail8
    var tail8 = new Cube();
    tail8.color = [tailfire[0] / 255, tailfire[1] / 255, tailfire[2] / 255, 1];
    // tail1.matrix.rotate(g_tailAng, 1, 0, 0);
    tail8.matrix.rotate(tail7Ang != null ? tail7Ang : null, 0, 1, 0);
    tail8.matrix.rotate(-50, 1, 0, 0);
    tail8.matrix.scale(0.07, 0.07, 0.1);
    tail8.matrix.translate(-0.5, -5.5, 2.5);
    // tail7.matrix.rotate(-45, 1, 0, 0);
    var tail9Ang = tail9buf.push(tail8Ang) * 1.02;
    tail8.texnum = -2;
    tail8.renderUV();
  }
}
