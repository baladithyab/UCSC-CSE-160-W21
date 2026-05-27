var hex_div = document.getElementById("hexdiv"),
  r = document.getElementById("RS"),
  g = document.getElementById("GS"),
  b = document.getElementById("BS"),
  a = document.getElementById("AS"),
  r_out = document.getElementById("RI"),
  g_out = document.getElementById("GI"),
  b_out = document.getElementById("BI"),
  a_out = document.getElementById("AI"),
  hex_out = document.getElementById("HC"),
  sz = document.getElementById("SS"),
  sz_out = document.getElementById("SI"),
  sb = document.getElementById("SegS"),
  sb_out = document.getElementById("SegI"),
  bs = document.getElementById("BufS"),
  bs_out = document.getElementById("BufI");

function setColorRGBtoHex() {
  var r_hex = parseInt(r.value, 10).toString(16),
    g_hex = parseInt(g.value, 10).toString(16),
    b_hex = parseInt(b.value, 10).toString(16),
    hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
  //   hex_div.style.backgroundColor = hex;
  hex_out.value = hex;
}

function setColorHextoRGB() {
  var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_out.value);

  return [
    parseInt(hex[1], 16),
    parseInt(hex[2], 16),
    parseInt(hex[3], 16),
    a.value,
  ];
  //   hex_div.style.backgroundColor = hex_out.value;
}

function pad(n) {
  return n.length < 2 ? "0" + n : n;
}

function addUIControllers() {
  hex_out.addEventListener(
    "input",
    function () {
      var hex = setColorHextoRGB();
      r_out.value = hex[0];
      g_out.value = hex[1];
      b_out.value = hex[2];

      r.value = r_out.value;
      g.value = g_out.value;
      b.value = b_out.value;
    },
    false
  );

  hex_out.addEventListener(
    "change",
    function () {
      var hex = setColorHextoRGB();
      r_out.value = hex[0];
      g_out.value = hex[1];
      b_out.value = hex[2];

      r.value = r_out.value;
      g.value = g_out.value;
      b.value = b_out.value;
    },
    false
  );

  r.addEventListener(
    "change",
    function () {
      setColorRGBtoHex();
      r_out.value = r.value;
    },
    false
  );

  r.addEventListener(
    "input",
    function () {
      setColorRGBtoHex();
      r_out.value = r.value;
    },
    false
  );

  r_out.addEventListener(
    "input",
    function () {
      setColorRGBtoHex();
      r.value = r_out.value;
    },
    false
  );

  r_out.addEventListener(
    "change",
    function () {
      setColorRGBtoHex();
      r.value = r_out.value;
    },
    false
  );

  g.addEventListener(
    "change",
    function () {
      setColorRGBtoHex();
      g_out.value = g.value;
    },
    false
  );

  g.addEventListener(
    "input",
    function () {
      setColorRGBtoHex();
      g_out.value = g.value;
    },
    false
  );

  g_out.addEventListener(
    "input",
    function () {
      setColorRGBtoHex();
      g.value = g_out.value;
    },
    false
  );

  g_out.addEventListener(
    "change",
    function () {
      setColorRGBtoHex();
      g.value = g_out.value;
    },
    false
  );

  b.addEventListener(
    "change",
    function () {
      setColorRGBtoHex();
      b_out.value = b.value;
    },
    false
  );

  b.addEventListener(
    "input",
    function () {
      setColorRGBtoHex();
      b_out.value = b.value;
    },
    false
  );

  b_out.addEventListener(
    "input",
    function () {
      setColorRGBtoHex();
      b.value = b_out.value;
    },
    false
  );

  b_out.addEventListener(
    "change",
    function () {
      setColorRGBtoHex();
      b.value = b_out.value;
    },
    false
  );

  a.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      a_out.value = a.value;
    },
    false
  );

  a_out.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      a.value = a_out.value;
    },
    false
  );

  sz.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      sz_out.value = sz.value;
      g_size = sz.value;
    },
    false
  );

  sz_out.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      sz.value = sz_out.value;
      g_size = sz_out.value;
    },
    false
  );

  a.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      a_out.value = a.value;
    },
    false
  );

  a_out.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      a.value = a_out.value;
    },
    false
  );

  sz.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      sz_out.value = sz.value;
      g_size = sz.value;
    },
    false
  );

  sz_out.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      sz.value = sz_out.value;
      g_size = sz_out.value;
    },
    false
  );

  var rad = document.getElementsByName("shape");
  for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener("change", function () {
      // prev ? console.log(prev.value) : null;
      if (this !== g_shape) {
        g_shape = this.value;
      }
      console.log(this.value);
    });
  }

  sb.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      sb_out.value = sb.value;
      g_seg = sb.value;
    },
    false
  );

  sb_out.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      sb.value = sb_out.value;
      g_seg = sb_out.value;
    },
    false
  );

  bs.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      bs_out.value = bs.value;
      strokeBuffer = bs.value;
    },
    false
  );

  bs_out.addEventListener(
    "input",
    function () {
      // setColorRGBtoHex();
      bs.value = bs_out.value;
      strokeBuffer = bs_out.value;
    },
    false
  );

  sb.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      sb_out.value = sb.value;
      g_seg = sb.value;
    },
    false
  );

  sb_out.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      sb.value = sb_out.value;
      g_seg = sb_out.value;
    },
    false
  );

  bs.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      bs_out.value = bs.value;
      strokeBuffer = bs.value;
    },
    false
  );

  bs_out.addEventListener(
    "change",
    function () {
      // setColorRGBtoHex();
      bs.value = bs_out.value;
      strokeBuffer = bs_out.value;
    },
    false
  );
}
