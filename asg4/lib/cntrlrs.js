var FOV = document.getElementById("FOV");

function addUIControllers() {
  FOV.addEventListener(
    "change",
    function () {
      g_FOV = FOV.value;
      renderShapes();
    },
    false
  );
  FOV.addEventListener(
    "input",
    function () {
      g_FOV = FOV.value;
      renderShapes();
    },
    false
  );
}
