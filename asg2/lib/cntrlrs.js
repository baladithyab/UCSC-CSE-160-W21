var TailAngle = document.getElementById("tailangleS"),
  UpperRightAngle = document.getElementById("upperrightS"),
  UpperLeftAngle = document.getElementById("upperleftS"),
  LeftForeAngle = document.getElementById("leftforeS"),
  RightForeAngle = document.getElementById("rightforeS");

function addUIControllers() {
  TailAngle.addEventListener(
    "change",
    function () {
      g_tailAng = TailAngle.value;
      renderShapes();
    },
    false
  );
  TailAngle.addEventListener(
    "input",
    function () {
      g_tailAng = TailAngle.value;
      renderShapes();
      // console.log(g_tailAng);
    },
    false
  );
  UpperRightAngle.addEventListener(
    "change",
    function () {
      g_upperrightAng = UpperRightAngle.value;
      renderShapes();
    },
    false
  );
  UpperRightAngle.addEventListener(
    "input",
    function () {
      g_upperrightAng = UpperRightAngle.value;
      renderShapes();
      // console.log(g_tailAng);
    },
    false
  );
  UpperLeftAngle.addEventListener(
    "change",
    function () {
      g_upperleftAng = UpperLeftAngle.value;
      renderShapes();
    },
    false
  );
  UpperLeftAngle.addEventListener(
    "input",
    function () {
      g_upperleftAng = UpperLeftAngle.value;
      renderShapes();
      // console.log(g_tailAng);
    },
    false
  );

  LeftForeAngle.addEventListener(
    "change",
    function () {
      g_leftforeAng = LeftForeAngle.value;
      renderShapes();
    },
    false
  );
  LeftForeAngle.addEventListener(
    "input",
    function () {
      g_leftforeAng = LeftForeAngle.value;
      renderShapes();
      // console.log(g_tailAng);
    },
    false
  );

  RightForeAngle.addEventListener(
    "change",
    function () {
      g_rightforeAng = RightForeAngle.value;
      renderShapes();
    },
    false
  );
  RightForeAngle.addEventListener(
    "input",
    function () {
      g_rightforeAng = RightForeAngle.value;
      renderShapes();
      // console.log(g_tailAng);
    },
    false
  );
}
