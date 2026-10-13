// assets__index-gCVK5XnX 04 — math
// Lines 47907-48286 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var xI = 2.9,
  SI = 6.1,
  CI = 0.1,
  wI = (9 * Math.PI) / 180,
  TI = (10 * Math.PI) / 180,
  EI = (32 * Math.PI) / 180,
  DI = 0.35,
  OI = 1,
  kI = 0.4,
  AI = 1.5,
  jI = 7,
  MI = 1.2,
  NI = 0.05,
  PI = 90,
  FI = 0.85,
  II = [
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
  LI = [
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
    { kind: `table`, at: 382.5, speed: 24.4, height: 1.7, angle: 18, carry: 3 },
    {
      kind: `table`,
      at: 465.5,
      speed: 25.3,
      height: 1.7,
      angle: 19,
      carry: 3.25,
    },
    { kind: `rollers`, at: 545.5, count: 3, pitch: 20, height: 0.6, creek: !0 },
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
  ],
  RI = 70.5,
  zI = 67.5,
  BI = 1627.5,
  VI = 10,
  HI = class {
    path;
    length;
    finish;
    ground;
    base;
    feat;
    bank;
    features = [];
    index;
    constructor(e = LI) {
      this.path = gI(II, 9);
      let t = Float32Array.from(this.path, (e) => uI(e.x, e.z)),
        n = this.profile(t),
        r = Math.min(this.path.length, Math.round(BI / dI) + 1);
      ((this.path = this.path.slice(0, r)),
        (this.ground = t.slice(0, r)),
        (this.base = n.slice(0, r)));
      let i = this.path.length;
      ((this.length = (i - 1) * dI),
        (this.feat = new Float32Array(Math.ceil(this.length / CI) + 2)));
      for (let t of e) this.build(t);
      ((this.finish = this.length - 12),
        (this.bank = this.banking()),
        (this.index = new _I(this.path, 16, 40)));
    }
    at(e) {
      return this.path[Y(Math.round(e / dI), 0, this.path.length - 1)];
    }
    pointAt(e, t, n = 0) {
      bI(this.path, e, t, n);
    }
    baseAt(e) {
      return yI(this.base, e / dI);
    }
    featureAt(e) {
      return yI(this.feat, e / CI);
    }
    bankAt(e) {
      return yI(this.bank, e / dI);
    }
    bermAt(e, t) {
      let n = this.bankAt(e);
      if (n === 0) return 0;
      let r = Y(((n > 0 ? -t : t) + xI) / (2 * xI));
      return Math.abs(n) * 2 * xI * (0.2 * r + r ** 3 - 0.48 * r ** 5);
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
            X(n.lip - 15, n.lip - 5, e) * (1 - X(n.end + 10, n.end + 25, e)),
          ));
      return t;
    }
    bendSpeed(e, t, n) {
      let r = 0;
      for (let n = e; n < e + t; n += 2)
        r = Math.max(r, Math.abs(this.at(n).k));
      return Math.sqrt((n * J.g) / Math.max(r, 1e-4));
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
      let t = e.length,
        n = Float32Array.from(fI(e, 60, 120, 2)),
        r = 0.03 * dI,
        i = 0.42 * dI,
        a = Float32Array.from(n);
      for (let e = 0; e < 300; e++) {
        for (let e = 0; e < t; e++) a[e] += 0.3 * (n[e] - a[e]);
        for (let e = 1; e < t; e++) a[e] = Y(a[e], a[e - 1] - i, a[e - 1] - r);
      }
      let o = Float32Array.from(a);
      for (let e = 4; e < t - 4; e++)
        o[e] =
          (a[e - 4] + a[e - 2] * 2 + a[e] * 3 + a[e + 2] * 2 + a[e + 4]) / 9;
      let s = Math.round(80.5 / dI),
        c = (o[s + 1] - o[s - 1]) / (2 * dI),
        l = o[s] - c * VI;
      for (let e = 0; e < s; e++) {
        let t = Math.max(0, e * dI - 60.5);
        o[e] = l + (c / 40) * t * t;
      }
      return o;
    }
    add(e, t) {
      let n = Math.round(e / CI);
      n >= 0 &&
        n < this.feat.length &&
        (this.feat[n] =
          t < 0 ? Math.min(this.feat[n], t) : Math.max(this.feat[n], t));
    }
    build(e) {
      if (e.kind !== `rollers`) return this.jump(e);
      let { at: t, count: n, pitch: r, height: i } = e;
      for (let e = 0; e <= n * r; e += CI)
        this.add(t + e, (i * (1 - Math.cos((DF * e) / r))) / 2);
      let a = e.creek ? t + r : void 0;
      this.features.push({
        kind: `rollers`,
        start: t,
        end: t + n * r,
        lip: t,
        knuckle: t,
        sweet: 0,
        slope: 0,
        speed: 0,
        creek: a,
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
          (c[Math.min(c.length - 1, Math.round(e / NI))] ?? -99) + n - i,
        u = UI(l),
        d = WI(i, Math.tan(u)),
        f = DI * d.length,
        p = d.at(f) - i,
        m = 0;
      for (let e = 0; e < PI; e += NI)
        if (l(e + f) <= p) {
          m = e;
          break;
        }
      m += e.carry;
      let h = o + m + d.length,
        g = o + m / 2,
        _ = [o + AI, o + m - jI],
        v = this.deck(e, o, g, _);
      for (let e = 0; e <= h; e += CI) {
        let r;
        if (e < o) {
          let t = e / o;
          r = n * t * t;
        } else r = e < o + m ? v(e) : d.at(e - o - m);
        this.add(t + e, r);
      }
      let y = t + _[0] + (n + kI) / OI,
        b = t + _[1] - (n + kI) / OI;
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
      let i = Math.sqrt(Math.max(1, t * t - 2 * J.g * n)),
        a = r * 0.83 - Math.atan(-this.grade(e)),
        o = [],
        s = 0,
        c = 0,
        l = i * Math.cos(a),
        u = i * Math.sin(a),
        d = J.dragUp / J.mass,
        f = 0.002;
      for (let t = 0; t <= PI;) {
        let n = Math.hypot(l, u);
        ((l -= d * n * l * f), (u -= (J.airG + d * n * u) * f));
        let r = s + l * f,
          i = c + u * f;
        for (; t <= r && t <= PI;)
          (o.push(
            c +
              ((i - c) * (t - s)) / (r - s) -
              (this.baseAt(e + t) - this.baseAt(e)),
          ),
            (t += NI));
        if (((s = r), (c = i), l < 0.5)) break;
      }
      return o;
    }
    deck(e, t, n, r) {
      let { at: i, height: a, trench: o } = e,
        s = e.deck ?? a,
        c = (e) => this.baseAt(i + n) - this.baseAt(i + e) - (o?.dig ?? 0);
      return (i) =>
        e.kind === `step`
          ? Math.max(s, a - (i - t) * MI)
          : e.kind === `double`
            ? Y(a - Math.min(i - r[0], r[1] - i) * OI, -0.4, a)
            : o
              ? Math.min(a, c(i) + Math.max(0, Math.abs(i - n) - o.open / 2))
              : a;
    }
    flatOut() {
      let e = this.path.length,
        t = new Float32Array(e),
        n = 25;
      for (let r = 0; r < e; r++) {
        let i = Math.sqrt(n);
        t[r] = i;
        let a = (this.base[Math.min(e - 1, r + 1)] - this.base[r]) / dI,
          o = Math.min(J.pedalForce, J.pedalPower / Math.max(1, i)) / J.mass,
          s =
            (-J.g * a) / Math.hypot(1, a) -
            J.crrDirt * J.g +
            o -
            (J.dragUp / J.mass) * i * i;
        n = Math.max(4, n + 2 * s * dI);
      }
      return t;
    }
    banking() {
      let e = this.path.length,
        t = new Float32Array(e),
        n = 8 / dI,
        r = this.flatOut();
      for (let i = 0; i < e; i++) {
        let e = this.path[i].k,
          a = Math.min(FI, (r[i] * r[i] * Math.abs(e)) / J.g),
          o = X(1 / 140, 1 / 60, Math.abs(e)),
          s = 0;
        for (let e = -n; e <= n; e += 4)
          s = Math.max(s, this.featureAt((i + e) * dI));
        ((o *= 1 - X(0.05, 0.4, s)), (t[i] = Math.sign(e) * a * o));
      }
      let i = 8 / dI;
      return Float32Array.from(fI(t, i, 3 * i, 2, !1));
    }
  };
