// assets__cover.worker-DrUDywG9 01 — math
// Lines 1-1291 of readable/assets__cover.worker-DrUDywG9.pretty.js (statement-aligned).
(function () {
  let e = Math.PI * 2,
    t = (e, t = 0, n = 1) => (e < t ? t : e > n ? n : e),
    n = (e, t, n) => e + (t - e) * n,
    r = (e, t) => ((e % t) + t) % t,
    i = (e, n, r) => {
      let i = t((r - e) / (n - e));
      return i * i * (3 - 2 * i);
    },
    a = (e, t) => Math.atan2(-e, -t);
  function o(e) {
    let t = e >>> 0;
    return () => {
      t = (t + 1831565813) >>> 0;
      let e = t;
      return (
        (e = Math.imul(e ^ (e >>> 15), e | 1)),
        (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
        ((e ^ (e >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  let s = 0.5 * (Math.sqrt(3) - 1),
    c = (3 - Math.sqrt(3)) / 6,
    l = new Float32Array([
      1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1,
    ]);
  var u = class {
    perm = /* @__PURE__ */ new Uint8Array(512);
    constructor(e) {
      let t = o(e),
        n = /* @__PURE__ */ new Uint8Array(256);
      for (let e = 0; e < 256; e++) n[e] = e;
      for (let e = 255; e > 0; e--) {
        let r = Math.floor(t() * (e + 1)),
          i = n[e];
        ((n[e] = n[r]), (n[r] = i));
      }
      for (let e = 0; e < 512; e++) this.perm[e] = n[e & 255];
    }
    noise(e, t) {
      let n = this.perm,
        r = (e + t) * s,
        i = Math.floor(e + r),
        a = Math.floor(t + r),
        o = (i + a) * c,
        u = e - (i - o),
        d = t - (a - o),
        f = +(u > d),
        p = 1 - f,
        m = u - f + c,
        h = d - p + c,
        g = u - 1 + 2 * c,
        _ = d - 1 + 2 * c,
        v = i & 255,
        y = a & 255,
        b = 0,
        x = 0.5 - u * u - d * d;
      if (x > 0) {
        let e = (n[v + n[y]] & 7) * 2;
        ((x *= x), (b += x * x * (l[e] * u + l[e + 1] * d)));
      }
      let S = 0.5 - m * m - h * h;
      if (S > 0) {
        let e = (n[v + f + n[y + p]] & 7) * 2;
        ((S *= S), (b += S * S * (l[e] * m + l[e + 1] * h)));
      }
      let C = 0.5 - g * g - _ * _;
      if (C > 0) {
        let e = (n[v + 1 + n[y + 1]] & 7) * 2;
        ((C *= C), (b += C * C * (l[e] * g + l[e + 1] * _)));
      }
      return 70 * b;
    }
    fbm(e, t, n) {
      let r = 0,
        i = 1,
        a = 0;
      for (let o = 0; o < n; o++) {
        ((r += i * this.noise(e, t)), (a += i), (i *= 0.5));
        let n = e * 1.6 - t * 1.2;
        ((t = (e * 1.2 + t * 1.6) * 1.015), (e = n * 1.015));
      }
      return r / a;
    }
    ridged(e, t, n) {
      let r = 0,
        i = 0.5,
        a = 1,
        o = 0;
      for (let s = 0; s < n; s++) {
        let n = 1 - Math.abs(this.noise(e, t));
        ((n *= n),
          (n *= a),
          (a = Math.min(1, n * 2)),
          (r += n * i),
          (o += i),
          (i *= 0.5));
        let s = e * 1.6 - t * 1.2;
        ((t = (e * 1.2 + t * 1.6) * 1.01), (e = s * 1.01));
      }
      return r / o;
    }
  };
  let d = { x: -40, z: -860, h: 680 },
    f = new u(7),
    p = new u(19),
    m = new u(41);
  function h(e, n, r) {
    let i = t(0.5 + (0.5 * (n - e)) / r);
    return n * i + e * (1 - i) + r * i * (1 - i) * 0.5;
  }
  function g(e, n) {
    let r = (e - d.x) / 1.35,
      a = n - d.z,
      o = Math.atan2(a, r),
      s = Math.hypot(r, a),
      c =
        f.fbm(Math.cos(o) * 1.7 + 11, Math.sin(o) * 1.7 - 4, 3) *
        60 *
        i(60, 400, s),
      l = Math.max(0, s + c);
    return (
      360 * t(1 - l / 2100) ** 1.15 -
      100 * t((l - 430) / 1070) ** 1.2 +
      (d.h - 360) * t(1 - l / 900) ** 1.8
    );
  }
  function _(e, t, n) {
    if (n <= 0) return 0;
    let r = 0.5 + 0.5 * i(3e3, -5e3, t),
      a = e + m.fbm(e / 9e3 + 5, t / 9e3, 3) * 2500,
      o = t + m.fbm(e / 9e3, t / 9e3 + 9, 3) * 2500,
      s = 0.5 + 0.5 * m.fbm(a / 11e3, o / 11e3, 3),
      c = p.ridged(a / 5200 + 3.1, o / 5200 - 1.7, 5) ** 1.6;
    return n * r * (s * 1700 + c * 3e3 * (0.4 + 0.8 * s) + 200);
  }
  function v(e, t, n) {
    return n <= 0 ? 0 : n * (0.5 + 0.5 * m.fbm(e / 900 + 7, t / 900, 4)) * 260;
  }
  function y(e) {
    let t = 395 - e;
    return t > 0 ? e - 0.25 * t * i(0, 40, t) : e;
  }
  function b(e, t) {
    let n = g(e, t),
      r = i(500, 1500, Math.abs(e - 80));
    n = h(n, v(e, t, r), 1 + 120 * r);
    let a = Math.hypot(e, t * 0.85),
      o = i(1800, 5200, a) * (1 - i(16e3, 24e3, a));
    n = h(n, _(e, t, o), 1 + 300 * o);
    let s = 12 + Math.max(0, -t) * 0.02 + Math.max(0, t - 1100) * 0.01;
    n = h(n, s, 30);
    let c = i(0, 400, n),
      l = 6 + 8 * c + 40 * i(300, 560, n);
    return (
      (n = y(n)),
      (n += f.fbm(e / 260, t / 260, 4) * l),
      (n += p.fbm(e / 38, t / 38, 3) * (1.2 + 1.5 * c)),
      n
    );
  }
  let x = 0.5;
  function S(e, t, n, r = 1, i = !0) {
    let a = e.length,
      o = [];
    for (let e = -n; e <= n; e += r) o.push(Math.exp(-(e * e) / (2 * t * t)));
    let s = new Float64Array(a);
    for (let t = 0; t < a; t++) {
      let c = 0,
        l = 0;
      for (let s = -n, u = 0; s <= n; s += r, u++) {
        let n = t + s;
        if (n < 0 || n >= a) {
          if (!i) continue;
          n = n < 0 ? 0 : a - 1;
        }
        ((c += e[n] * o[u]), (l += o[u]));
      }
      s[t] = c / l;
    }
    return s;
  }
  let C = (e, t) => Math.hypot(t[0] - e[0], t[1] - e[1]) ** 0.5 || 1e-4;
  function w(e, t, n, r, i) {
    let a = 0 + C(e, t),
      o = a + C(t, n),
      s = o + C(n, r),
      c = a + (o - a) * i,
      l = [0, 0];
    for (let i = 0; i < 2; i++) {
      let u = ((a - c) / (a - 0)) * e[i] + ((c - 0) / (a - 0)) * t[i],
        d = ((o - c) / (o - a)) * t[i] + ((c - a) / (o - a)) * n[i],
        f = ((s - c) / (s - o)) * n[i] + ((c - o) / (s - o)) * r[i],
        p = ((o - c) / (o - 0)) * u + ((c - 0) / (o - 0)) * d,
        m = ((s - c) / (s - a)) * d + ((c - a) / (s - a)) * f;
      l[i] = ((o - c) / (o - a)) * p + ((c - a) / (o - a)) * m;
    }
    return l;
  }
  function T(e, t) {
    let r = [],
      i = 0,
      a = 0;
    for (let o = 1; o < e.length; o++) {
      let [s, c] = e[o - 1],
        [l, u] = e[o],
        d = Math.hypot(l - s, u - c);
      for (; a <= i + d;) {
        let e = d > 0 ? (a - i) / d : 0;
        (r.push([n(s, l, e), n(c, u, e)]), (a += t));
      }
      i += d;
    }
    return r;
  }
  function ee(e, t) {
    let n = [],
      r = e.length - 1,
      i = [
        [2 * e[0][0] - e[1][0], 2 * e[0][1] - e[1][1]],
        ...e,
        [2 * e[r][0] - e[r - 1][0], 2 * e[r][1] - e[r - 1][1]],
      ];
    for (let e = 1; e < i.length - 2; e++) {
      let t = Math.max(
        8,
        Math.ceil(
          Math.hypot(i[e + 1][0] - i[e][0], i[e + 1][1] - i[e][1]) / 0.1,
        ),
      );
      for (let r = 0; r < t; r++)
        n.push(w(i[e - 1], i[e], i[e + 1], i[e + 2], r / t));
    }
    n.push(e[r]);
    let a = T(n, x),
      o = Math.round(t / x);
    if (o > 0) {
      let e = (e) =>
          S(
            a.map((t) => t[e]),
            o,
            3 * o,
          ),
        t = e(0),
        n = e(1);
      a = T(
        Array.from(t, (e, t) => [e, n[t]]),
        x,
      );
    }
    let s = a.map(([e, t]) => ({ x: e, z: t, tx: 0, tz: 0, k: 0 })),
      c = s.length;
    for (let e = 0; e < c; e++) {
      let t = s[Math.max(0, e - 2)],
        n = s[Math.min(c - 1, e + 2)],
        r = Math.hypot(n.x - t.x, n.z - t.z) || 1;
      ((s[e].tx = (n.x - t.x) / r), (s[e].tz = (n.z - t.z) / r));
    }
    let l = new Float32Array(c);
    for (let e = 6; e < c - 6; e++) {
      let t = s[e - 6],
        n = s[e + 6],
        r = t.tx * n.tz - t.tz * n.tx,
        i = t.tx * n.tx + t.tz * n.tz;
      l[e] = Math.atan2(r, i) / (12 * x);
    }
    let u = S(l, 8, 16, 1, !1);
    for (let e = 0; e < c; e++) s[e].k = u[e];
    return s;
  }
  var te = class {
    path;
    cell;
    x0;
    z0;
    w;
    h;
    cells;
    constructor(e, t, n) {
      ((this.path = e), (this.cell = t));
      let [r, i, a, o] = ne(e);
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
    locate(e, r, i, a) {
      let o = Math.floor((e - this.x0) / this.cell),
        s = Math.floor((r - this.z0) / this.cell);
      if (o < 0 || s < 0 || o >= this.w || s >= this.h) return !1;
      let c = this.cells[s * this.w + o],
        l = a * a,
        u = -1,
        d = 0,
        f = this.path;
      for (let i = 0; i < c.length; i++) {
        let a = c[i],
          o = f[a],
          s = f[a + 1],
          p = s.x - o.x,
          m = s.z - o.z,
          h = t(((e - o.x) * p + (r - o.z) * m) / (p * p + m * m)),
          g = o.x + p * h,
          _ = o.z + m * h,
          v = (e - g) ** 2 + (r - _) ** 2;
        v < l &&
          ((l = v),
          (u = (a + h) * x),
          (d = (e - g) * -n(o.tz, s.tz, h) + (r - _) * n(o.tx, s.tx, h)));
      }
      return u < 0 ? !1 : ((i.s = u), (i.u = d), !0);
    }
  };
  function ne(e) {
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
  function E(e, t) {
    if (t <= 0) return e[0];
    let r = e.length - 1;
    if (t >= r) return e[r];
    let i = Math.floor(t);
    return n(e[i], e[i + 1], t - i);
  }
  function re(e, r, i, a = 0) {
    let o = t(r / x, 0, e.length - 1.001),
      s = Math.floor(o),
      c = o - s,
      l = e[s],
      u = e[s + 1],
      d = n(l.tx, u.tx, c),
      f = n(l.tz, u.tz, c),
      p = Math.hypot(d, f) || 1;
    ((i.tx = d / p),
      (i.tz = f / p),
      (i.x = n(l.x, u.x, c)),
      (i.z = n(l.z, u.z, c)),
      a && ((i.x -= i.tz * a), (i.z += i.tx * a)));
  }
  let D = {
      step: 1 / 240,
      mass: 82,
      pitchInertia: 11,
      g: 9.81,
      airG: 8.4,
      wheelbase: 0.98,
      wheelRadius: 0.254,
      bodyLift: 0.04,
      spring: 15500,
      damper: 1450,
      rebound: 3600,
      travel: 0.3,
      pedalForce: 360,
      pedalPower: 720,
      brake: 5.2,
      crrDirt: 0.016,
      crrGrass: 0.055,
      crrRough: 0.08,
      crrWater: 0.3,
      dragUp: 0.312,
      dragTuck: 0.24,
      gripDirt: 1.45,
      gripGrass: 0.95,
      gripRock: 0.8,
      steerRate: 9,
      maxYawRate: 3,
      railAim: 3,
      railHold: 1.2,
      railOut: 0.6,
      crouchRate: 5,
      uncrouchRate: 15,
      hop: 3.3,
      lipPop: 1.2,
      popLate: 0.12,
      pump: 16,
      spinRate: 8.4,
      flipRate: 6.8,
      spinAccel: 60,
      flipAccel: 60,
      spinStop: 55,
      flipStop: 50,
      tuck: 0.4,
      levelling: 3,
      intent: 0.7,
      consume: 0.35,
      leanPitch: 0.3,
      leanYaw: 0.3,
      catchPitch: 1.9,
      catchYaw: 1.7,
      catchRate: 7,
      catchFakie: 1,
      hopTime: 0.6,
      barspinTime: 0.42,
      tailwhipTime: 0.5,
      styleOut: 3,
      styleBack: 8,
      whipFrom: 0.8,
      cleanNose: 0.42,
      noseIn: 0.95,
      cleanBack: 0.6,
      loopOut: 1.2,
      cleanYaw: 0.42,
      sideways: 1.15,
      cleanSide: 0.3,
      laidDown: 0.8,
      stompPitch: 0.16,
      stompYaw: 0.14,
      absorbWindow: 0.35,
      absorbImpact: 0.55,
      absorbSlack: 0.12,
      sweetReach: 2.2,
      keepPerfect: 1.05,
      keepStomped: 1.02,
      keepCased: 0.88,
      keepFlat: 0.9,
      stressFade: 0.4,
      airTurn: 0.3,
      revertRate: 11,
      revertKeep: 0.9,
      hardImpact: 11,
      landImpact: 16,
      glance: 4,
      manualPitch: 0.36,
      manualPoints: 60,
      manualMin: 3,
      shimmyFrom: 18,
      shimmyRange: 10,
    },
    O = 2.9,
    k = 0.1,
    A = (9 * Math.PI) / 180,
    ie = (10 * Math.PI) / 180,
    ae = (32 * Math.PI) / 180,
    j = 0.4,
    M = 0.05,
    N = [
      [-357, -521],
      [-328, -500],
      [-300, -480],
      [-268, -457],
      [-246, -424],
      [-200, -404],
      [-155, -385],
      [-96, -392],
      [-27, -381],
      [41, -371],
      [86, -349],
      [131, -327],
      [170, -319],
      [208, -312],
      [234, -284],
      [221, -249],
      [168, -222],
      [114, -195],
      [69, -156],
      [24, -117],
      [18, -98],
      [35, -63],
      [58, 0],
      [80, 63],
      [103, 126],
      [115, 163],
      [127, 199],
      [139, 249],
      [158, 298],
      [178, 350],
      [163, 385],
      [127, 404],
      [105, 436],
      [106, 476],
      [106, 515],
      [93, 563],
      [80, 611],
      [91, 660],
      [101, 708],
    ],
    P = [
      { kind: `rollers`, at: 74, count: 3, pitch: 14, height: 0.4 },
      {
        kind: `table`,
        at: 170.5,
        speed: 21.5,
        height: 1.6,
        angle: 24,
        carry: 3.05,
      },
      {
        kind: `table`,
        at: 310.5,
        speed: 24.1,
        height: 1.6,
        angle: 18,
        carry: 2.2,
      },
      {
        kind: `table`,
        at: 382.5,
        speed: 24.4,
        height: 1.7,
        angle: 18,
        carry: 3,
      },
      {
        kind: `table`,
        at: 465.5,
        speed: 25.3,
        height: 1.7,
        angle: 19,
        carry: 3.25,
      },
      {
        kind: `rollers`,
        at: 545.5,
        count: 3,
        pitch: 20,
        height: 0.6,
        creek: !0,
      },
      {
        kind: `table`,
        at: 752.5,
        speed: 29.4,
        height: 1.6,
        angle: 15,
        carry: 2.95,
        trench: { open: 6, dig: 1.1 },
        creek: !0,
      },
      {
        kind: `double`,
        at: 1006,
        speed: 30.1,
        height: 1.5,
        angle: 15,
        carry: 2,
        rocks: !0,
      },
      {
        kind: `step`,
        at: 1098,
        speed: 30.2,
        height: 1.8,
        angle: 14,
        carry: 2.35,
        deck: 0.8,
      },
      {
        kind: `table`,
        at: 1190,
        speed: 29.4,
        height: 1.4,
        angle: 15,
        carry: 2.15,
      },
      {
        kind: `table`,
        at: 1563.5,
        speed: 26.1,
        height: 1.7,
        angle: 20,
        carry: 2.2,
      },
    ];
  var F = class {
    path;
    length;
    finish;
    ground;
    base;
    feat;
    bank;
    features = [];
    index;
    constructor(e = P) {
      this.path = ee(N, 9);
      let t = Float32Array.from(this.path, (e) => b(e.x, e.z)),
        n = this.profile(t),
        r = Math.min(this.path.length, 3256);
      ((this.path = this.path.slice(0, r)),
        (this.ground = t.slice(0, r)),
        (this.base = n.slice(0, r)));
      let i = this.path.length;
      ((this.length = (i - 1) * x),
        (this.feat = new Float32Array(Math.ceil(this.length / k) + 2)));
      for (let t of e) this.build(t);
      ((this.finish = this.length - 12),
        (this.bank = this.banking()),
        (this.index = new te(this.path, 16, 40)));
    }
    at(e) {
      return this.path[t(Math.round(e / x), 0, this.path.length - 1)];
    }
    pointAt(e, t, n = 0) {
      re(this.path, e, t, n);
    }
    baseAt(e) {
      return E(this.base, e / x);
    }
    featureAt(e) {
      return E(this.feat, e / k);
    }
    bankAt(e) {
      return E(this.bank, e / x);
    }
    bermAt(e, n) {
      let r = this.bankAt(e);
      if (r === 0) return 0;
      let i = t(((r > 0 ? -n : n) + O) / (2 * O));
      return Math.abs(r) * 2 * O * (0.2 * i + i ** 3 - 0.48 * i ** 5);
    }
    surface(e, t) {
      return this.baseAt(e) + this.featureAt(e) + this.bermAt(e, t);
    }
    jumpClearing(e) {
      let t = 0;
      for (let n of this.features)
        n.kind !== `rollers` &&
          (t = Math.max(
            t,
            i(n.lip - 15, n.lip - 5, e) * (1 - i(n.end + 10, n.end + 25, e)),
          ));
      return t;
    }
    bendSpeed(e, t, n) {
      let r = 0;
      for (let n = e; n < e + t; n += 2)
        r = Math.max(r, Math.abs(this.at(n).k));
      return Math.sqrt((n * D.g) / Math.max(r, 1e-4));
    }
    featureOf(e) {
      for (let t of this.features) if (e >= t.start && e <= t.end) return t;
      return null;
    }
    locate(e, t, n, r) {
      return this.index.locate(e, t, n, r);
    }
    grade(e) {
      return (this.baseAt(e + 2) - this.baseAt(e - 2)) / 4;
    }
    profile(e) {
      let n = e.length,
        r = Float32Array.from(S(e, 60, 120, 2)),
        i = Float32Array.from(r);
      for (let e = 0; e < 300; e++) {
        for (let e = 0; e < n; e++) i[e] += 0.3 * (r[e] - i[e]);
        for (let e = 1; e < n; e++)
          i[e] = t(i[e], i[e - 1] - 0.21, i[e - 1] - 0.015);
      }
      let a = Float32Array.from(i);
      for (let e = 4; e < n - 4; e++)
        a[e] =
          (i[e - 4] + i[e - 2] * 2 + i[e] * 3 + i[e + 2] * 2 + i[e + 4]) / 9;
      let o = (a[162] - a[160]) / (2 * x),
        s = a[161] - o * 10;
      for (let e = 0; e < 161; e++) {
        let t = Math.max(0, e * x - 60.5);
        a[e] = s + (o / 40) * t * t;
      }
      return a;
    }
    add(e, t) {
      let n = Math.round(e / k);
      n >= 0 &&
        n < this.feat.length &&
        (this.feat[n] =
          t < 0 ? Math.min(this.feat[n], t) : Math.max(this.feat[n], t));
    }
    build(t) {
      if (t.kind !== `rollers`) return this.jump(t);
      let { at: n, count: r, pitch: i, height: a } = t;
      for (let t = 0; t <= r * i; t += k)
        this.add(n + t, (a * (1 - Math.cos((e * t) / i))) / 2);
      let o = t.creek ? n + i : void 0;
      this.features.push({
        kind: `rollers`,
        start: n,
        end: n + r * i,
        lip: n,
        knuckle: n,
        sweet: 0,
        slope: 0,
        speed: 0,
        creek: o,
      });
    }
    jump(e) {
      let { at: t, height: n, speed: r } = e,
        i = e.deck ?? n,
        a = (e.angle * Math.PI) / 180,
        o = (2 * n) / Math.tan(a),
        s = t + o,
        c = this.flight(s, r, n, a),
        l = (e) =>
          (c[Math.min(c.length - 1, Math.round(e / M))] ?? -99) + n - i,
        u = I(l),
        d = L(i, Math.tan(u)),
        f = 0.35 * d.length,
        p = d.at(f) - i,
        m = 0;
      for (let e = 0; e < 90; e += M)
        if (l(e + f) <= p) {
          m = e;
          break;
        }
      m += e.carry;
      let h = o + m + d.length,
        g = o + m / 2,
        _ = [o + 1.5, o + m - 7],
        v = this.deck(e, o, g, _);
      for (let e = 0; e <= h; e += k) {
        let r;
        if (e < o) {
          let t = e / o;
          r = n * t * t;
        } else r = e < o + m ? v(e) : d.at(e - o - m);
        this.add(t + e, r);
      }
      let y = t + _[0] + (n + j) / 1,
        b = t + _[1] - (n + j) / 1;
      this.features.push({
        kind: e.kind,
        start: t,
        end: t + h,
        lip: s,
        knuckle: s + m,
        sweet: f,
        slope: u,
        speed: r,
        creek: e.creek ? t + g : void 0,
        gap: e.kind === `double` && b > y ? [y, b] : void 0,
        rocks: e.rocks,
      });
    }
    flight(e, t, n, r) {
      let i = Math.sqrt(Math.max(1, t * t - 2 * D.g * n)),
        a = r * 0.83 - Math.atan(-this.grade(e)),
        o = [],
        s = 0,
        c = 0,
        l = i * Math.cos(a),
        u = i * Math.sin(a),
        d = D.dragUp / D.mass,
        f = 0.002;
      for (let t = 0; t <= 90;) {
        let n = Math.hypot(l, u);
        ((l -= d * n * l * f), (u -= (D.airG + d * n * u) * f));
        let r = s + l * f,
          i = c + u * f;
        for (; t <= r && t <= 90;)
          (o.push(
            c +
              ((i - c) * (t - s)) / (r - s) -
              (this.baseAt(e + t) - this.baseAt(e)),
          ),
            (t += M));
        if (((s = r), (c = i), l < 0.5)) break;
      }
      return o;
    }
    deck(e, n, r, i) {
      let { at: a, height: o, trench: s } = e,
        c = e.deck ?? o,
        l = (e) => this.baseAt(a + r) - this.baseAt(a + e) - (s?.dig ?? 0);
      return (a) =>
        e.kind === `step`
          ? Math.max(c, o - (a - n) * 1.2)
          : e.kind === `double`
            ? t(o - Math.min(a - i[0], i[1] - a) * 1, -0.4, o)
            : s
              ? Math.min(o, l(a) + Math.max(0, Math.abs(a - r) - s.open / 2))
              : o;
    }
    flatOut() {
      let e = this.path.length,
        t = new Float32Array(e),
        n = 25;
      for (let r = 0; r < e; r++) {
        let i = Math.sqrt(n);
        t[r] = i;
        let a = (this.base[Math.min(e - 1, r + 1)] - this.base[r]) / x,
          o = Math.min(D.pedalForce, D.pedalPower / Math.max(1, i)) / D.mass,
          s =
            (-D.g * a) / Math.hypot(1, a) -
            D.crrDirt * D.g +
            o -
            (D.dragUp / D.mass) * i * i;
        n = Math.max(4, n + 2 * s * x);
      }
      return t;
    }
    banking() {
      let e = this.path.length,
        t = new Float32Array(e),
        n = this.flatOut();
      for (let r = 0; r < e; r++) {
        let e = this.path[r].k,
          a = Math.min(0.85, (n[r] * n[r] * Math.abs(e)) / D.g),
          o = i(1 / 140, 1 / 60, Math.abs(e)),
          s = 0;
        for (let e = -16; e <= 16; e += 4)
          s = Math.max(s, this.featureAt((r + e) * x));
        ((o *= 1 - i(0.05, 0.4, s)), (t[r] = Math.sign(e) * a * o));
      }
      return Float32Array.from(S(t, 16, 48, 2, !1));
    }
  };
  function I(e) {
    let n = 0;
    for (; n < 90 && !(e(n) < 0 && e(n) < e(n - M));) n += M;
    let r = Math.atan(e(n - 0.5) - e(n + 0.5));
    return t(r - A, ie, ae);
  }
  function L(e, t) {
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
  new u(303);
  let R = new u(101),
    z = new u(202),
    B = [y(70), y(160)],
    V = [y(220), y(330)];
  Array.from({ length: 4 }, (e, t) => new u(t * 17 + 3));
  function oe(e, t, n, r) {
    if (n >= 520 || r >= 1.1) return 0;
    let a = R.fbm(e / 340 + 4, t / 340 - 2, 4) * 0.5 + 0.5,
      o = i(0.4, 0.62, a);
    return (
      (o *= 0.35 + 0.65 * i(B[0], B[1], n)),
      (o *= 1 - i(430, 520, n)),
      o * (1 - i(0.75, 1.1, r))
    );
  }
  function se(e, t, n) {
    if (n >= V[1]) return 0;
    let r = z.fbm(e / 210 - 9, t / 210 + 3, 3) * 0.5 + 0.5;
    return i(0.52, 0.66, r) * (1 - i(V[0], V[1], n));
  }
  function ce(e, t, n, r) {
    if (r <= 0.25 && n <= 350) return 0;
    let a = R.fbm(e / 60, t / 60, 3) * 0.5 + 0.5,
      o = i(0.55, 0.95, r + (a - 0.5) * 0.5),
      s = i(420, 560, n + a * 60) * 0.8;
    return Math.max(o, s);
  }
  function le(e, t, n, r) {
    if (n <= 515) return 0;
    let a = z.fbm(e / 45, t / 45, 3);
    return i(560, 620, n + a * 40) * (1 - i(0.9, 1.4, r));
  }
  function ue(e, t, n, r, i, a) {
    let o = (e) => (e - a) * t,
      s = e[o(i) + Math.min(t - 1, r + 1)] - e[o(i) + Math.max(0, r - 1)],
      c = e[o(Math.min(t - 1, i + 1)) + r] - e[o(Math.max(0, i - 1)) + r];
    return Math.hypot(s, c) / (2 * n);
  }
  function de(e, t) {
    let {
        j0: n,
        j1: r,
        n: a,
        cell: o,
        h: s,
        hFrom: c,
        trailDist: l,
        creekDist: u,
        pads: d,
      } = e,
      f = r - n,
      p = {
        cover: new Uint8Array(f * a * 4),
        grass: new Uint8Array(f * a),
        cover2: new Uint8Array(f * a * 4),
      },
      { cover: m, grass: h, cover2: g } = p;
    for (let e = n; e < r; e++) {
      let r = -1024 + e * o;
      for (let f = 0; f < a; f++) {
        let p = -1024 + f * o,
          _ = (e - n) * a + f,
          v = s[(e - c) * a + f],
          y = ue(s, a, o, f, e, c),
          b = l[_],
          x = d[_],
          S = Math.max(1 - i(5.1, 11.1, b), i(0.4, 0.9, x)),
          C = oe(p, r, v, y) * i(-4, 6, t.clearance(p, r)),
          w = ce(p, r, v, y),
          T = le(p, r, v, y);
        ((m[_ * 4] = S * 255),
          (m[_ * 4 + 1] = C * 255),
          (m[_ * 4 + 2] = w * 255),
          (m[_ * 4 + 3] = T * 255),
          (h[_] =
            255 *
            (i(6.199999999999999, 7.699999999999999, b) * i(0.3, 1.6, u[_])) *
            (1 - i(0.2, 0.6, x)) *
            (1 - C * 0.75) *
            (1 - i(0.25, 0.6, w)) *
            (1 - i(0.2, 0.5, T)) *
            (1 - i(0.55, 0.9, y))),
          (g[_ * 4] = se(p, r, v) * 255),
          (g[_ * 4 + 1] = h[_]),
          (g[_ * 4 + 2] = b),
          (g[_ * 4 + 3] = 255 * (1 - i(0, 3, u[_]))));
      }
    }
    return p;
  }
  let H = 2.6,
    U = 0.55,
    W = 1.2,
    G = { back: 8, front: 20, left: 9.5, right: 9, blend: 10 },
    fe = [
      { a: -1.6, v: 0 },
      { a: 12.8, v: 0 },
    ],
    K = 5.6 / 2,
    q = Math.PI * K,
    J = { a: -2, v: -8.2, along: 3.2, across: 2.4, high: 2.7 },
    Y = { back: -4.2, front: 14.5, above: 0.35, tall: 1.5 },
    X = 0.25,
    Z = 0.02,
    Q = { x: 0, z: 0 },
    $ = { u: 0, v: 0 };
  var pe = class {
    bottom = { x: 0, z: 0 };
    top = { x: 0, z: 0 };
    dx;
    dz;
    rx;
    rz;
    length;
    towers = [];
    bottomY = 0;
    topY = 0;
    chairs = 0;
    loadD;
    unloadD;
    period = 0;
    loop;
    profile = /* @__PURE__ */ new Float32Array();
    dAt = /* @__PURE__ */ new Float32Array();
    tAt = /* @__PURE__ */ new Float32Array();
    constructor(e) {
      let t = { x: 0, z: 0, tx: 0, tz: 0 };
      e.pointAt(e.length - 0.01, t);
      let n = {
        x: t.x + t.tx * 12 - t.tz * 12,
        z: t.z + t.tz * 12 + t.tx * 12,
      };
      (e.pointAt(70.5, t), (this.top.x = t.x + 4), (this.top.z = t.z - 42));
      let r = 0,
        i = -1,
        a = n.x,
        o = n.z;
      for (let e = 0; e < 4; e++) {
        let e = Math.hypot(this.top.x - a, this.top.z - o);
        ((r = (this.top.x - a) / e),
          (i = (this.top.z - o) / e),
          (a = n.x - r * 5 + i * K),
          (o = n.z - i * 5 - r * K));
      }
      ((this.bottom.x = a),
        (this.bottom.z = o),
        (this.dx = r),
        (this.dz = i),
        (this.rx = -i),
        (this.rz = r),
        (this.length = Math.hypot(this.top.x - a, this.top.z - o)),
        (this.loop = 2 * this.length + 2 * q),
        (this.loadD = 5),
        (this.unloadD = this.length - 7));
    }
    world(e, t, n) {
      return (
        (n.x = this.bottom.x + this.dx * e + this.rx * t),
        (n.z = this.bottom.z + this.dz * e + this.rz * t),
        n
      );
    }
    pad(e, t) {
      let { u: n, v: r } = this.local(e, t),
        a = n < this.length / 2,
        o = a ? n : this.length - n,
        s = Math.max(-G.back - o, o - G.front, -G.left - r, r - G.right, 0);
      return { w: 1 - i(0, G.blend, s), top: !a };
    }
    clearance(e, t) {
      let { u: n, v: r } = this.local(e, t),
        i = n < 0 ? -n : n > this.length ? n - this.length : 0,
        a = Math.hypot(i, r) - 9,
        o = this.pad(e, t).w > 0 ? -1 : 1 / 0;
      return Math.min(a, o);
    }
    loading() {
      let e = this.world(this.loadD, K, { x: 0, z: 0 });
      return {
        x: e.x,
        y: this.bottomY - H - U,
        z: e.z,
        yaw: a(this.dx, this.dz),
      };
    }
    stationAt(e, t, n, r) {
      let i = this.world(e ? this.length - t : t, n, { x: 0, z: 0 });
      return (
        (r.x = i.x),
        (r.z = i.z),
        (r.y = (e ? this.topY : this.bottomY) - H - U),
        r
      );
    }
    solids() {
      let e = (e, t, n, r, i) => ({
          x: e,
          z: t,
          r,
          bottom: n - 1,
          top: i,
          what: `Hit the chairlift`,
        }),
        t = this.towers.map((t) => e(t.x, t.z, t.y, 0.45, t.y + t.h + 1)),
        n = { x: 0, y: 0, z: 0 };
      for (let r of [!1, !0]) {
        let i = r ? this.topY : this.bottomY;
        for (let a of fe)
          (this.stationAt(r, a.a, a.v, n),
            t.push(e(n.x, n.z, n.y, 0.42, i + Y.above + Y.tall)));
        for (let i of [-0.8, 0.8])
          (this.stationAt(r, J.a + i, J.v, n),
            t.push(e(n.x, n.z, n.y, 1.35, n.y + J.high)));
      }
      return t;
    }
    build(e) {
      ((this.bottomY = this.groundAt(e, this.loadD, K) + U + H),
        (this.topY = this.groundAt(e, this.unloadD, K) + U + H),
        this.placeTowers(e),
        this.raiseCable(e),
        this.lay(),
        this.time());
    }
    placeTowers(e) {
      let t = this.length - 14 - 22,
        n = Math.max(1, Math.round((t - 36) / 100));
      this.towers = [];
      for (let r = 0; r <= n; r++) {
        let i = this.towerSpot(e, 36 + ((t - 36) * r) / n);
        i !== null &&
          !this.towers.some((e) => Math.abs(e.u - i) < 30) &&
          this.towers.push(this.tower(e, i));
      }
    }
    raiseCable(e) {
      let t = this.length,
        n = (t) =>
          Math.max(
            this.groundAt(e, t, K),
            this.groundAt(e, t, -2.8),
            this.groundAt(e, t, 0),
          );
      for (let r = 0; r < 80; r++) {
        (this.towers.sort((e, t) => e.u - t.u), this.lay());
        let r = 0,
          i = 0;
        for (let e = 14; e <= t - 14; e += 2) {
          let a = Math.min(e - 14, t - 14 - e),
            o =
              Math.min(7.5, 3.1500000000000004 + a * 0.13) -
              (this.cableY(e) - n(e));
          o > r && ((r = o), (i = e));
        }
        if (r < 0.05) return;
        let a =
          Math.min(
            ...this.towers.map((e) => Math.abs(e.u - i)),
            i - 14,
            t - 14 - i,
          ) > 35 && r > 1.5
            ? this.towerSpot(e, i)
            : null;
        if (a !== null && !this.towers.some((e) => Math.abs(e.u - a) < 25)) {
          this.towers.push(this.tower(e, a));
          continue;
        }
        let o = !1;
        for (let e of this.towers) {
          let t = Math.abs(e.u - i);
          t < 100 * 1.1 &&
            e.h < 30 &&
            ((e.h = Math.min(30, e.h + r * (1 - t / (100 * 1.1)) + 0.25)),
            (o = !0));
        }
        if (!o) return;
      }
    }
    groundAt(e, t, n) {
      return (this.world(t, n, Q), e.height(Q.x, Q.z));
    }
    towerSpot(e, t) {
      let n = (t) =>
        t < 24 || t > this.length - 14 - 10
          ? !1
          : (this.world(t, 0, Q),
            e.trailDistance(Q.x, Q.z, 40) > 9 &&
              e.trailDistance(Q.x + this.rx * 2.8, Q.z + this.rz * 2.8, 40) >
                7 &&
              e.trailDistance(Q.x - this.rx * 2.8, Q.z - this.rz * 2.8, 40) >
                7);
      for (let e = 0; e < 40; e += 2)
        for (let r of [t + e, t - e]) if (n(r)) return r;
      return null;
    }
    tower(e, t) {
      return (
        this.world(t, 0, Q),
        { u: t, x: Q.x, z: Q.z, y: e.height(Q.x, Q.z), h: 9 }
      );
    }
    cableY(e) {
      return E(this.profile, e);
    }
    chairD(e, t) {
      let n = this.period,
        i = r(t + (e * n) / this.chairs, n);
      return E(this.dAt, i / Z);
    }
    nextChair(e, t) {
      let [n, i, a] = this.due(e, t);
      return { chair: r(-i, this.chairs), at: n + i * a };
    }
    arrival(e, t, n) {
      let [i, a, o] = this.due(t, n);
      return i + (a + r(-e - a, this.chairs)) * o;
    }
    due(e, t) {
      let n = this.period / this.chairs,
        r = E(this.tAt, e / X);
      return [r, Math.ceil((t - r) / n - 1e-6), n];
    }
    chairAt(e, t, n) {
      return this.gripAt(this.chairD(e, t), n);
    }
    seatAt(e, t, n, r) {
      this.chairAt(e, n, r);
      let i = (t - 3 / 2) * 0.62,
        a = -Math.sin(r.yaw),
        o = -Math.cos(r.yaw);
      return ((r.x += -o * i), (r.z += a * i), (r.y -= H), r);
    }
    local(e, t) {
      let n = e - this.bottom.x,
        r = t - this.bottom.z;
      return (
        ($.u = n * this.dx + r * this.dz),
        ($.v = n * this.rx + r * this.rz),
        $
      );
    }
    lay() {
      let e = this.length,
        t = [
          [0, this.bottomY, !1],
          [14, this.bottomY, !1],
          ...this.towers.map((e) => [e.u, e.y + e.h, !0]),
          [e - 14, this.topY, !1],
          [e, this.topY, !1],
        ],
        r = Math.ceil(e) + 1;
      this.profile = new Float32Array(r);
      let i = 0;
      for (let a = 0; a < r; a++) {
        let r = Math.min(a, e);
        for (; i < t.length - 2 && t[i + 1][0] < r;) i++;
        let [o, s] = t[i],
          [c, l] = t[i + 1],
          u = c - o,
          d = u > 0 ? (r - o) / u : 0,
          f = r > 14 && r < e - 14;
        this.profile[a] = n(s, l, d) - (f ? 0.012 * u * 4 * d * (1 - d) : 0);
      }
    }
    speedAt(e) {
      let t = this.length;
      if ((e >= t && e < t + q) || e >= 2 * t + q) return W;
      let r = e < t ? e : 2 * t + q - e,
        a = i(14, 26, r) * i(14, 26, t - r);
      return n(W, 7, a);
    }
    time() {
      let e = Math.ceil(this.loop / X) + 1;
      this.tAt = new Float32Array(e);
      for (let t = 1; t < e; t++) {
        let e = (t - 0.5) * X;
        this.tAt[t] =
          this.tAt[t - 1] + X / this.speedAt(Math.min(e, this.loop - 0.001));
      }
      ((this.period = this.tAt[e - 1] * (this.loop / ((e - 1) * X))),
        (this.chairs = Math.max(1, Math.round(this.period / 7))));
      let t = Math.ceil(this.period / Z) + 1;
      this.dAt = new Float32Array(t);
      let n = 0;
      for (let r = 0; r < t; r++) {
        let t = r * Z;
        for (; n < e - 2 && this.tAt[n + 1] < t;) n++;
        let i = this.tAt[n + 1] - this.tAt[n],
          a = i > 0 ? Math.min(1, (t - this.tAt[n]) / i) : 0;
        this.dAt[r] = Math.min(this.loop, (n + a) * X);
      }
    }
    gripAt(e, t) {
      let n = this.length,
        r,
        i,
        o,
        s,
        c;
      if (e < n)
        ((r = e), (i = K), (o = this.dx), (s = this.dz), (c = this.cableY(r)));
      else if (e < n + q) {
        let t = (e - n) / K;
        ((r = n + Math.sin(t) * K),
          (i = Math.cos(t) * K),
          (o = this.dx * Math.cos(t) - this.rx * Math.sin(t)),
          (s = this.dz * Math.cos(t) - this.rz * Math.sin(t)),
          (c = this.topY));
      } else if (e < 2 * n + q)
        ((r = n - (e - n - q)),
          (i = -2.8),
          (o = -this.dx),
          (s = -this.dz),
          (c = this.cableY(r)));
      else {
        let t = (e - 2 * n - q) / K;
        ((r = -Math.sin(t) * K),
          (i = -Math.cos(t) * K),
          (o = -this.dx * Math.cos(t) + this.rx * Math.sin(t)),
          (s = -this.dz * Math.cos(t) + this.rz * Math.sin(t)),
          (c = this.bottomY));
      }
      return (
        this.world(r, i, Q),
        (t.x = Q.x),
        (t.y = c),
        (t.z = Q.z),
        (t.yaw = a(o, s)),
        t
      );
    }
  };
  onmessage = (e) => {
    let t = de(e.data, new pe(new F()));
    postMessage(t, {
      transfer: [t.cover.buffer, t.grass.buffer, t.cover2.buffer],
    });
  };
})();
