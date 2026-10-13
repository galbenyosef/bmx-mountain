// assets__index-gCVK5XnX 03 — math
// Lines 47817-47906 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var _I = class {
  path;
  cell;
  x0;
  z0;
  w;
  h;
  cells;
  constructor(e, t, n) {
    ((this.path = e), (this.cell = t));
    let [r, i, a, o] = vI(e);
    ((this.x0 = r - n),
      (this.z0 = i - n),
      (this.w = Math.ceil((a - r + 2 * n) / t)),
      (this.h = Math.ceil((o - i + 2 * n) / t)));
    let s = Array.from({ length: this.w * this.h }, () => []);
    for (let r = 0; r < e.length - 1; r++) {
      let i = e[r],
        a = e[r + 1],
        o = Math.floor((Math.min(i.x, a.x) - n - this.x0) / t),
        c = Math.floor((Math.max(i.x, a.x) + n - this.x0) / t),
        l = Math.floor((Math.min(i.z, a.z) - n - this.z0) / t),
        u = Math.floor((Math.max(i.z, a.z) + n - this.z0) / t);
      for (let e = Math.max(0, l); e <= Math.min(this.h - 1, u); e++)
        for (let t = Math.max(0, o); t <= Math.min(this.w - 1, c); t++)
          s[e * this.w + t].push(r);
    }
    this.cells = s.map((e) => Int32Array.from(e));
  }
  locate(e, t, n, r) {
    let i = Math.floor((e - this.x0) / this.cell),
      a = Math.floor((t - this.z0) / this.cell);
    if (i < 0 || a < 0 || i >= this.w || a >= this.h) return !1;
    let o = this.cells[a * this.w + i],
      s = r * r,
      c = -1,
      l = 0,
      u = this.path;
    for (let n = 0; n < o.length; n++) {
      let r = o[n],
        i = u[r],
        a = u[r + 1],
        d = a.x - i.x,
        f = a.z - i.z,
        p = Y(((e - i.x) * d + (t - i.z) * f) / (d * d + f * f)),
        m = i.x + d * p,
        h = i.z + f * p,
        g = (e - m) ** 2 + (t - h) ** 2;
      g < s &&
        ((s = g),
        (c = (r + p) * dI),
        (l = (e - m) * -OF(i.tz, a.tz, p) + (t - h) * OF(i.tx, a.tx, p)));
    }
    return c < 0 ? !1 : ((n.s = c), (n.u = l), !0);
  }
};
function vI(e) {
  let t = 1 / 0,
    n = 1 / 0,
    r = -1 / 0,
    i = -1 / 0;
  for (let a of e)
    ((t = Math.min(t, a.x)),
      (n = Math.min(n, a.z)),
      (r = Math.max(r, a.x)),
      (i = Math.max(i, a.z)));
  return [t, n, r, i];
}
function yI(e, t) {
  if (t <= 0) return e[0];
  let n = e.length - 1;
  if (t >= n) return e[n];
  let r = Math.floor(t);
  return OF(e[r], e[r + 1], t - r);
}
function bI(e, t, n, r = 0) {
  let i = Y(t / dI, 0, e.length - 1.001),
    a = Math.floor(i),
    o = i - a,
    s = e[a],
    c = e[a + 1],
    l = OF(s.tx, c.tx, o),
    u = OF(s.tz, c.tz, o),
    d = Math.hypot(l, u) || 1;
  ((n.tx = l / d),
    (n.tz = u / d),
    (n.x = OF(s.x, c.x, o)),
    (n.z = OF(s.z, c.z, o)),
    r && ((n.x -= n.tz * r), (n.z += n.tx * r)));
}
