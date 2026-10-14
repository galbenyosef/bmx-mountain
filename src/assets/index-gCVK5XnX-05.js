// assets/index-gCVK5XnX 05 — math
// Lines 48287-48614 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function UI(e) {
  let t = 0;
  for (; t < PI && !(e(t) < 0 && e(t) < e(t - NI));) t += NI;
  return Y(Math.atan(e(t - 0.5) - e(t + 0.5)) - wI, TI, EI);
}
function WI(e, t) {
  let n = 1.6,
    r = Math.min(3.2, (2 * e) / t - n),
    i = n / 2 + e / t - r / 2;
  return {
    at: (a) => {
      if (a < n) return e - (t * a * a) / (2 * n);
      if (a < i) return e - (t * n) / 2 - t * (a - n);
      let o = a - i;
      return Math.max(
        0,
        e - (t * n) / 2 - t * (i - n) - t * o + (t * o * o) / (2 * r),
      );
    },
    length: i + r,
  };
}
var GI = [
    [
      [138, -505],
      [147, -440],
      [155, -380],
    ],
    [[146, -265]],
    [
      [166, -150],
      [188, -40],
      [206, 80],
      [222, 200],
      [234, 320],
      [238, 420],
      [236, 500],
      [232, 535],
    ],
  ],
  KI = 0.45,
  qI = 1.35,
  JI = 0.35,
  YI = 0.9,
  XI = 3.2,
  ZI = 1.4,
  QI = 0.9,
  $I = 0.3,
  eL = 0.28,
  tL = 0.09,
  nL = 0.14,
  rL = 0.22,
  iL = 34,
  aL = 9,
  oL = 0.75,
  sL = { s: 0, u: 0 },
  cL = new XF(303),
  lL = (e) => (e < 0 ? 0 : 1),
  uL = class {
    trail;
    path;
    length;
    bed;
    water;
    pool;
    half;
    rise;
    fromTrail;
    over;
    index;
    constructor(e) {
      ((this.trail = e), (this.path = gI(dL(e), 6)));
      let t = this.path.length;
      ((this.length = (t - 1) * dI),
        (this.fromTrail = Float32Array.from(this.path, (t) =>
          e.locate(t.x, t.z, sL, 30) ? Math.abs(sL.u) : 30,
        )),
        (this.over = this.fromTrail.map((e) => 1 - X(SI - 1.5, SI + 0.5, e))));
      let n = (e) =>
        [0, 1].map((t) =>
          Float32Array.from(this.path, (n, r) => e(r * dI, r, t)),
        );
      ((this.half = n((e, t, n) => {
        let r = 1 + YI * (1 - X(SI, SI + 10, this.fromTrail[t])),
          i =
            OF(KI, qI, X(0, 700, e)) * r * (1 + JI * cL.noise(e / 11, n * 7.3)),
          a = Y((e - (this.length - iL)) / iL),
          o = aL * (1 + 0.25 * cL.fbm(e / 9, n * 5.1 + 20, 2));
        return a > 0
          ? Math.max(
              0.2,
              i * (1 - a) ** 2,
              o * Math.sqrt(Math.max(0, 1 - (2 * a - 1) ** 2)),
            )
          : i;
      })),
        (this.rise = n(
          (e, t, n) => ZI * (1 + 0.4 * cL.noise(e / 8 + 40, n * 3.7)),
        )),
        (this.pool = Float32Array.from(
          this.path,
          (e, t) =>
            $I * X(0, 0.6, cL.noise((t * dI) / 14, 11.5)) * (1 - this.over[t]),
        )),
        (this.bed = new Float32Array(t)),
        (this.water = new Float32Array(t)),
        (this.index = new _I(this.path, 16, 28.900000000000002)));
    }
    settle(e) {
      let t = this.path.length,
        n = fI(
          this.path.map((t) => e(t.x, t.z)),
          6,
          18,
        );
      for (let e = 0; e < t; e++) {
        let t = this.path[e];
        this.fromTrail[e] < 6.1 && this.trail.locate(t.x, t.z, sL, 6.1)
          ? (n[e] = this.trail.surface(sL.s, Y(sL.u, -xI, xI)) - 0.03)
          : (n[e] -= this.depth(e));
      }
      for (let e = 1; e < t; e++) n[e] = Math.min(n[e], n[e - 1]);
      let r = Math.round((this.length - iL) / dI),
        i = n[r] + oL;
      for (let e = 0; e < t; e++) {
        this.bed[e] = e > r ? n[r] : n[e];
        let t = 1 - X(SI, SI + 6, this.fromTrail[e]);
        this.water[e] = Math.max(i, this.bed[e] + OF(eL, 0.12, t));
      }
    }
    nearest(e, t, n) {
      let r = 1 / 0;
      for (let i = 0; i < this.path.length; i += 8) {
        let a = this.path[i],
          o = (a.x - e) ** 2 + (a.z - t) ** 2;
        o >= r || ((r = o), (n.x = a.x), (n.z = a.z), (n.t = i * dI));
      }
      return ((n.y = this.waterAt(n.t)), Math.sqrt(r));
    }
    locate(e, t, n, r) {
      return this.index.locate(e, t, n, r);
    }
    pointAt(e, t, n = 0) {
      bI(this.path, e, t, n);
    }
    halfWidth(e, t) {
      return yI(this.half[lL(t)], e / dI);
    }
    reach(e, t) {
      return this.halfWidth(e, t) + XI;
    }
    bedAt(e) {
      return yI(this.bed, e / dI);
    }
    waterAt(e) {
      return yI(this.water, e / dI);
    }
    overTrail(e) {
      return yI(this.over, e / dI);
    }
    flowAt(e) {
      let t = (this.bedAt(e - 3) - this.bedAt(e + 3)) / 6;
      return (
        (0.4 + 6 * Math.sqrt(Math.max(0, t))) *
        (1 - X(this.length - iL, this.length - iL + 8, e) * 0.85)
      );
    }
    channel(e, t, n) {
      let r = this.halfWidth(e, t),
        i = Math.abs(t),
        a = this.bedAt(e);
      return i <= r
        ? a - (nL * r + yI(this.pool, e / dI)) * (1 - (i / r) ** 2)
        : OF(a, n, X(r, r + this.riseAt(e, t), i));
    }
    riseAt(e, t) {
      return yI(this.rise[lL(t)], e / dI);
    }
    top(e) {
      let t = Y(Math.round(e / dI), 0, this.path.length - 1);
      return Math.max(this.waterAt(e) + 0.12, this.bedAt(e) + this.depth(t));
    }
    gully(e, t) {
      return this.top(e) + rL * Math.max(0, Math.abs(t) - this.reach(e, t));
    }
    depth(e) {
      return QI * X(SI, SI + 14, this.fromTrail[e]);
    }
  };
function dL(e) {
  let t = [...GI[0]];
  e.features
    .flatMap((e) => e.creek ?? [])
    .forEach((n, r) => t.push(...fL(e, n), ...GI[r + 1]));
  let n = t[t.length - 1],
    r = t[t.length - 2],
    i = Math.hypot(n[0] - r[0], n[1] - r[1]);
  return (
    t.push([n[0] + ((n[0] - r[0]) / i) * iL, n[1] + ((n[1] - r[1]) / i) * iL]),
    t
  );
}
function fL(e, t) {
  let n = { x: 0, z: 0, tx: 0, tz: 0 },
    r = (r) => (e.pointAt(t, n, r), [n.x, n.z]),
    i = uI(...r(14)) > uI(...r(-14)) ? 1 : -1;
  return [r(13 * i), r(0), r(-13 * i)];
}
var pL = new XF(101),
  mL = new XF(202),
  hL = [lI(70), lI(160)],
  gL = [lI(220), lI(330)],
  _L = 520,
  vL = (function (e) {
    return ((e[(e.Pine = 0)] = `Pine`), (e[(e.Aspen = 1)] = `Aspen`), e);
  })({});
function yL(e) {
  return 0.9 + e.tint * 0.3;
}
function bL(e) {
  return e.h * yL(e) * (e.species === 0 ? 0.0205 : 0.0108);
}
var xL = Array.from({ length: 4 }, (e, t) => new XF(t * 17 + 3)),
  SL = 0.62,
  CL = 0.8;
function wL(e, t, n, r) {
  let i = xL[e];
  return (
    1 +
    i.fbm(t * 1.3 + n * 0.7, r * 1.3 - n * 0.5, 3) * 0.32 +
    i.noise(t * 4, r * 4 + n * 3) * 0.05
  );
}
function TL(e) {
  return {
    shape: Math.floor(e.seed * 4),
    cy: e.y - e.size * 0.15,
    sx: e.size,
    sy: e.size * (0.7 + e.seed * 0.5),
    sz: e.size * (0.8 + ((e.seed * 7) % 1) * 0.4),
  };
}
function EL(e, t, n, r) {
  if (n >= _L || r >= 1.1) return 0;
  let i = X(0.4, 0.62, pL.fbm(e / 340 + 4, t / 340 - 2, 4) * 0.5 + 0.5);
  return (
    (i *= 0.35 + 0.65 * X(hL[0], hL[1], n)),
    (i *= 1 - X(430, _L, n)),
    i * (1 - X(0.75, 1.1, r))
  );
}
function DL(e, t, n) {
  return n >= gL[1]
    ? 0
    : X(0.52, 0.66, mL.fbm(e / 210 - 9, t / 210 + 3, 3) * 0.5 + 0.5) *
        (1 - X(gL[0], gL[1], n));
}
function OL(e, t, n, r) {
  if (r <= 0.25 && n <= 350) return 0;
  let i = pL.fbm(e / 60, t / 60, 3) * 0.5 + 0.5,
    a = X(0.55, 0.95, r + (i - 0.5) * 0.5),
    o = X(420, 560, n + i * 60) * 0.8;
  return Math.max(a, o);
}
function kL(e, t, n, r) {
  return n <= 515
    ? 0
    : X(560, 620, n + mL.fbm(e / 45, t / 45, 3) * 40) * (1 - X(0.9, 1.4, r));
}
function AL(e, t, n, r) {
  let i = Math.floor((2 * e) / t);
  for (let a = 0; a < i; a++)
    for (let o = 0; o < i; o++) r(-e + (o + n()) * t, -e + (a + n()) * t);
}
function jL(e, t) {
  let n = [],
    r = HF(77);
  return (
    AL(t, 5.5, r, (t, i) => {
      let a = r(),
        o = r(),
        s = r(),
        c = r() * DF,
        l = r(),
        u = e.height(t, i),
        d = e.slope(t, i);
      if (
        a >
          Math.max(
            EL(t, i, u, d),
            0.025 * (1 - X(0.7, 1, d)) * (1 - X(470, _L, u)),
          ) *
            0.9 ||
        e.trailDistance(t, i, 30) < 8 + 5 * pL.noise(t / 9, i / 9) ** 2 ||
        e.liftClearance(t, i) < 3 * pL.noise(t / 7 + 40, i / 7) ** 2 ||
        e.stuntClearance(t, i) < 3.5 + 2 * pL.noise(t / 6 - 30, i / 6) ** 2 ||
        e.creekClearance(t, i) < 0.6 + 2.5 * pL.noise(t / 5 + 70, i / 5) ** 2
      )
        return;
      let f = l < DL(t, i, u),
        p = 1 - 0.45 * X(380, 500, u),
        m = f ? 9 + s * 7 : 10 + s * s * 14;
      n.push({ x: t, y: u, z: i, h: m * p, rot: c, species: +!!f, tint: o });
    }),
    n
  );
}
function ML(e, t) {
  let n = [],
    r = HF(91);
  return (
    AL(t, 9, r, (t, i) => {
      let a = r(),
        o = r(),
        s = r() * DF,
        c = r(),
        l = e.height(t, i),
        u = e.slope(t, i);
      a > 0.012 + 0.35 * OL(t, i, l, u) * (1 - kL(t, i, l, u) * 0.7) ||
        e.trailDistance(t, i, 26) < 9 ||
        e.liftClearance(t, i) < 0 ||
        e.stuntClearance(t, i) < 5 ||
        e.creekClearance(t, i) < 1 ||
        n.push({ x: t, y: l, z: i, size: 0.5 + o * o * 2.8, rot: s, seed: c });
    }),
    n
  );
}
