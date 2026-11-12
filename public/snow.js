/*
Snow Fall - modernized from Robert / Rainbow Arch Scriptmania classic
*/
(function () {
  var snowmax = 35;
  var snowcolor = ["#7799BB", "#88AACC", "#99BBEE", "#AABBDD", "#B0C4DE"];
  var snowtype = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];
  var snowletter = "*";
  var sinkspeed = 0.6;
  var snowmaxsize = 22;
  var snowminsize = 8;

  var snowflakes = [];
  var marginbottom = window.innerHeight;
  var marginright = document.documentElement.clientWidth || window.innerWidth;

  function randomInt(max) {
    return Math.floor(max * Math.random());
  }

  function updateBounds() {
    marginbottom = window.innerHeight;
    marginright = document.documentElement.clientWidth || window.innerWidth;
  }

  function initSnow() {
    updateBounds();
    var sizeRange = snowmaxsize - snowminsize;

    for (var i = 0; i < snowmax; i++) {
      var el = document.createElement("span");
      var size = randomInt(sizeRange) + snowminsize;

      el.textContent = snowletter;
      el.style.position = "fixed";
      el.style.pointerEvents = "none";
      el.style.userSelect = "none";
      el.style.top = "-" + snowmaxsize + "px";
      el.style.left = "0px";
      el.style.fontFamily = snowtype[randomInt(snowtype.length)];
      el.style.fontSize = size + "px";
      el.style.color = snowcolor[randomInt(snowcolor.length)];
      document.body.appendChild(el);

      snowflakes.push({
        el: el,
        size: size,
        sink: (sinkspeed * size) / 5,
        crds: 0,
        lftrght: Math.random() * 15,
        xMv: 0.03 + Math.random() / 10,
        posx: randomInt(Math.max(1, marginright - size)),
        posy: randomInt(Math.max(1, marginbottom - size))
      });
    }

    window.addEventListener("resize", updateBounds);
    setInterval(moveSnow, 50);
  }

  function moveSnow() {
    for (var i = 0; i < snowflakes.length; i++) {
      var flake = snowflakes[i];
      flake.crds += flake.xMv;
      flake.posy += flake.sink;
      var left = flake.posx + flake.lftrght * Math.sin(flake.crds);

      flake.el.style.left = left + "px";
      flake.el.style.top = flake.posy + "px";

      if (flake.posy >= marginbottom - flake.size || left > marginright - 2 * flake.lftrght) {
        flake.posx = randomInt(Math.max(1, marginright - flake.size));
        flake.posy = -flake.size;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnow);
  } else {
    initSnow();
  }
})();
