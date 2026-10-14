// assets/index-gCVK5XnX 08 — math
// Lines 49110-49392 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function gR(e, t, n) {
  let r = { x: 0, z: 0, tx: 0, tz: 0 };
  return (
    e.pointAt(t, r, n),
    {
      x: r.x,
      z: r.z,
      ax: r.tx,
      az: r.tz,
      cx: -r.tz,
      cz: r.tx,
      ground: e.baseAt(t),
    }
  );
}
var _R = (e) => gR(e, lR, Pee);
function vR(e, t) {
  let n = Math.max(0, Math.abs(e - lR) - Lee),
    r = Math.max(0, t - 11, -t - 4);
  return (1 - X(0, hR, n)) * (1 - X(0, hR, r));
}
var yR = 7,
  bR = -30,
  xR = 0.04999999999999999,
  SR = (e, t) => (n, r, i, a) => ({
    a0: n,
    a1: r,
    c0: i,
    c1: a,
    y0: e,
    y1: e,
    bottom: xR,
    what: t,
  }),
  CR = SR(uR, `Hit the deck`),
  wR = SR(1.5, `Hit the railing`),
  TR = [
    {
      a0: -7,
      a1: yR,
      c0: 0,
      c1: 12,
      y0: 3.85,
      y1: 3.85,
      bottom: bR,
      what: `Hit the lodge`,
    },
    {
      a0: -7,
      a1: 10,
      c0: -2.4,
      c1: 0,
      y0: uR,
      y1: uR,
      bottom: bR,
      what: `Hit the porch`,
    },
    {
      a0: -11.5,
      a1: -7,
      c0: -2.4,
      c1: -0.4,
      y0: 0,
      y1: uR,
      bottom: bR,
      what: `Hit the ramp`,
    },
    {
      a0: -1.2,
      a1: 1.2,
      c0: -3.2,
      c1: -2.4,
      y0: uR / 2,
      y1: uR / 2,
      bottom: bR,
      what: `Hit the steps`,
    },
    CR(yR, 10, 0, 15),
    CR(-10, yR, 12, 15),
    CR(-10, -7, 0, 12),
    wR(9.92, 10, 0, 15),
    wR(-10, 10, 14.92, 15),
    wR(-10, -9.92, 0, 15),
  ],
  ER = xI + 0.7,
  DR = 0.24,
  OR = 3.5,
  kR = (e) => gR(e, RI, 0);
function AR(e, t, n, r, i) {
  return (
    (i.x = e.x + e.ax * t + e.cx * n),
    (i.z = e.z + e.az * t + e.cz * n),
    (i.y = e.ground + r),
    i
  );
}
var jR = class {
    size;
    cells = new Map();
    near = [];
    constructor(e) {
      this.size = e;
    }
    at(e, t) {
      return this.cells.get(this.key(this.index(e), this.index(t)));
    }
    around(e, t) {
      let n = this.near;
      n.length = 0;
      let r = this.index(e),
        i = this.index(t);
      for (let e = r - 1; e <= r + 1; e++)
        for (let t = i - 1; t <= i + 1; t++) {
          let r = this.cells.get(this.key(e, t));
          r && n.push(r);
        }
      return n;
    }
    add(e, t, n, r = 0) {
      let [i, a, o, s] = [
        this.index(t - r),
        this.index(t + r),
        this.index(n - r),
        this.index(n + r),
      ];
      for (let t = i; t <= a; t++)
        for (let n = o; n <= s; n++) {
          let r = this.key(t, n),
            i = this.cells.get(r);
          (i || this.cells.set(r, (i = [])), i.push(e));
        }
    }
    index(e) {
      return Math.floor(e / this.size);
    }
    key(e, t) {
      return e * 4096 + t;
    }
  },
  MR = 1.45,
  NR = (e) => ({
    x: e.x,
    z: e.z,
    r: bL(e),
    bottom: e.y - 1,
    top: e.y + e.h * 0.6,
    what: `Hit a tree`,
  });
function PR(e) {
  let t = TL(e);
  return {
    x: e.x,
    z: e.z,
    r: MR * Math.max(t.sx, t.sz),
    bottom: t.cy - t.sy * CL * MR,
    top: t.cy + t.sy * SL * MR,
    what: `Hit a rock`,
    rock: {
      cy: t.cy,
      cos: Math.cos(e.rot),
      sin: Math.sin(e.rot),
      sx: t.sx,
      sy: t.sy,
      sz: t.sz,
      shape: t.shape,
    },
  };
}
var FR = class {
  hash = new jR(8);
  add(e) {
    this.hash.add(e, e.x, e.z);
  }
  at(e, t, n, r) {
    let i = null;
    for (let a of this.hash.around(e, n))
      for (let o of a) {
        if (t + r < o.bottom || t - r > o.top) continue;
        let a = e - o.x,
          s = n - o.z,
          c = Math.hypot(a, s);
        if (c > o.r + r) continue;
        let l = o.rock ? IR(o.rock, a, t, s, r) : o.r + r - c;
        l <= 0 ||
          (i && l <= i.depth) ||
          (i = {
            o,
            nx: c > 1e-6 ? a / c : 1,
            nz: c > 1e-6 ? s / c : 0,
            depth: l,
          });
      }
    return i;
  }
};
function IR(e, t, n, r, i) {
  let a = (t * e.cos - r * e.sin) / e.sx,
    o = (t * e.sin + r * e.cos) / e.sz,
    s = (n - e.cy) / e.sy > 0 ? SL : CL,
    c = (n - e.cy) / e.sy / s,
    l = Math.hypot(a, c, o) || 1e-6,
    u = wL(e.shape, a / l, c / l, o / l),
    d = Math.hypot((a / l) * e.sx, (c / l) * e.sy * s, (o / l) * e.sz);
  return (u - l) * d + i;
}
var LR = 0.18,
  RR = 0.07,
  zR = 24,
  BR = 0.08,
  VR = 40,
  HR = class {
    pivotY;
    half;
    lo;
    hi;
    angle;
    rate = 0;
    load = 0;
    others = 0;
    slam = 0;
    x = 0;
    z = 0;
    inertia;
    constructor(e, t, n, r) {
      ((this.pivotY = e),
        (this.half = t),
        (this.lo = n),
        (this.hi = r),
        (this.angle = n),
        (this.inertia = (zR * (2 * t) ** 2) / 12));
    }
    top(e) {
      return this.pivotY - e * Math.tan(this.angle);
    }
    press(e, t) {
      this.load += t * e;
    }
    weigh(e, t) {
      this.others += t * e;
    }
    clearOthers() {
      this.others = 0;
    }
    step(e) {
      let t = this.load + this.others - zR * J.g * BR - VR * this.rate;
      if (
        ((this.load = 0),
        (this.rate += (t / this.inertia) * e),
        (this.angle += this.rate * e),
        this.angle > this.hi || this.angle < this.lo)
      ) {
        let e = this.angle > this.hi ? this.hi : this.lo;
        ((this.slam = Math.max(this.slam, Math.abs(this.rate) * this.half)),
          (this.angle = e),
          (this.rate = -this.rate * 0.15),
          Math.abs(this.rate) * this.half < 0.05 && (this.rate = 0));
      }
    }
  };
function UR(e, t) {
  return {
    ...e,
    seesaw: null,
    solid: { what: t, soft: !0 },
    joinedBefore: !1,
    joinedAfter: !1,
  };
}
function WR(e, t, n) {
  let r = e.seesaw
    ? e.seesaw.top(t)
    : e.y0 + ((e.y1 - e.y0) * (t + e.half)) / (2 * e.half);
  return (
    e.log > 0 && (r -= e.log - Math.sqrt(Math.max(0, e.log * e.log - n * n))),
    r + n * e.tilt
  );
}
var GR = { a: 0, l: 0 };
function KR(e, t, n) {
  let r = t - e.x,
    i = n - e.z;
  return ((GR.a = r * e.ax + i * e.az), (GR.l = -r * e.az + i * e.ax), GR);
}
