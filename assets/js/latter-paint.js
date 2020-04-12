window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(loop) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var c = document.getElementById('canv'),
  $ = c.getContext('2d'),
  w = c.width = window.innerWidth*0.2,
  h = c.height = window.innerHeight*0.2,
  p = [],
  m = {
    x: w,
    y: h,
    vx: 5,
    vy: 3
  },
  _int = 45;

for (var i = 0; i < w / _int; i++) {
  for (var j = 0; j < h / _int; j++) {

    var pos = {};
    pos.x = j * _int * 2;
    pos.y = i * _int;
    pos.px = pos.x;
    pos.py = pos.y;
    pos.vx = 0;
    pos.vy = 0;
    pos.ax = 0;
    pos.ay = 0;
    p.push(pos);
  }
}

move = function(m) {
  m.x += m.vx;
  m.y += m.vy;
  if (m.x < 0) {
    m.vx = Math.abs(m.vx);
  } else if (w < m.x) {
    m.vx = -Math.abs(m.vx);
  }
  if (m.y < 0) {
    m.vy = Math.abs(m.vy);
  } else if (h < m.y) {
    m.vy = -Math.abs(m.vy);
  }
}

upd = function() {
  var q;
  var n = p.length;

  for (var i = 0; i < n; i++) {
    var dx = p[i].px - p[i].x,
      dy = p[i].py - p[i].y,
      d = dx * dx + dy * dy;
    p[i].vx = dx * 0.1;
    p[i].vy = dy * 0.1;
  }

  for (var i = 0, n = p.length; i < n; i++) {
    q = p[i]
    var dx = m.x - p[i].px,
      dy = m.y - p[i].py,
      d = dx * dx + dy * dy,
      maxd = 160 * 160;
    if (d < maxd) {
      p[i].vx = dx * (1.0 - d / maxd) * 0.08;
      p[i].vy = dy * (1.0 - d / maxd) * 0.08;
    }

    q.x += q.vx;
    q.y += q.vy;
    if (Math.abs(q.px - q.x) < 0.05) {
      q.x = q.px
    }
    if (Math.abs(q.py - q.y) < 0.05) {
      q.y = q.py
    }
  }

}

disp = function() {
  $.fillStyle = 'hsla(0,0%,5%,1)';
  $.clearRect(0, 0, w/100, h);
  for (var i = 0, n = p.length; i < n; i++) {
    $.fillStyle = 'hsla(' + (i * 6) + ',100%, 50%, 0.95)';
    $.fillRect(p[i].x, p[i].y, 1000, 4);
  }
}

var run = function() {
  move(m)
  upd();
  disp();
  window.requestAnimFrame(run);
}
run();

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);