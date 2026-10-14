(function () {
  let e = Math.PI * 2,
    t = (e, t = 0, n = 1) => (e < t ? t : e > n ? n : e),
    n = (e, t, n) => e + (t - e) * n,
    r = (e, n, r) => {
      let i = t((r - e) / (n - e));
      return i * i * (3 - 2 * i);
    },
    i = /* @__PURE__ */ (function (e) {
      return (
        (e[(e.Root = 0)] = `Root`),
        (e[(e.Body = 1)] = `Body`),
        (e[(e.Neck = 2)] = `Neck`),
        (e[(e.Head = 3)] = `Head`),
        (e[(e.EarL = 4)] = `EarL`),
        (e[(e.EarR = 5)] = `EarR`),
        (e[(e.Tail = 6)] = `Tail`),
        (e[(e.Legs = 7)] = `Legs`),
        e
      );
    })({}),
    a = [0, 1.17, -0.745],
    o = 0.6,
    s = Math.cos(o),
    c = Math.sin(o),
    l = (e, t, n = 0) => [n, a[1] - e * c + t * s, a[2] - (e * s + t * c)],
    u = (e) => l(0.035, 0.085, e * 0.038),
    d = l(0.115, 0.03);
  ([...a], [...u(-1)], [...u(1)]);
  let f = [
      { front: !0, side: -1 },
      { front: !0, side: 1 },
      { front: !1, side: -1 },
      { front: !1, side: 1 },
    ],
    p = /* @__PURE__ */ (function (e) {
      return (
        (e[(e.Body = 0)] = `Body`),
        (e[(e.Neck = 1)] = `Neck`),
        (e[(e.Head = 2)] = `Head`),
        (e[(e.Leg = 3)] = `Leg`),
        (e[(e.Hoof = 4)] = `Hoof`),
        (e[(e.Tail = 5)] = `Tail`),
        e
      );
    })({});
  function m() {
    let e = (e, t, n) => [e, t, -n],
      t = [
        {
          c: e(0, 0.715, 0.3),
          r: [0.135, 0.245, 0.22],
          pitch: -0.08,
          k: 0.08,
          bone: 1,
          part: 0,
        },
        {
          c: e(0, 0.905, 0.24),
          r: [0.06, 0.08, 0.2],
          pitch: -0.1,
          k: 0.07,
          bone: 1,
          part: 0,
        },
        {
          c: e(0, 0.735, 0.02),
          r: [0.15, 0.198, 0.3],
          pitch: -0.07,
          k: 0.08,
          bone: 1,
          part: 0,
        },
        {
          c: e(0, 0.81, -0.25),
          r: [0.125, 0.13, 0.22],
          k: 0.08,
          bone: 1,
          part: 0,
        },
        {
          c: e(0, 0.8, -0.45),
          r: [0.135, 0.158, 0.17],
          pitch: -0.1,
          k: 0.07,
          bone: 1,
          part: 0,
        },
        {
          a: e(0, 0.84, 0.39),
          b: l(-0.005, 0.01),
          ra: 0.135,
          rb: 0.064,
          k: 0.09,
          bone: 2,
          part: 1,
        },
        {
          a: e(0, 0.7, 0.52),
          b: l(0.07, -0.05),
          ra: 0.085,
          rb: 0.048,
          k: 0.05,
          bone: 2,
          part: 1,
        },
        {
          c: l(0.06, 0.035),
          r: [0.066, 0.068, 0.095],
          pitch: -0.6,
          k: 0.035,
          bone: 3,
          part: 2,
        },
        {
          c: l(0.11, -0.02),
          r: [0.054, 0.052, 0.09],
          pitch: -0.6,
          k: 0.03,
          bone: 3,
          part: 2,
        },
        {
          a: l(0.15, 0.005),
          b: l(0.315, -0.012),
          ra: 0.048,
          rb: 0.03,
          k: 0.03,
          bone: 3,
          part: 2,
        },
        {
          c: l(0.33, -0.012),
          r: [0.027, 0.024, 0.022],
          pitch: -0.6,
          k: 0.012,
          bone: 3,
          part: 2,
        },
        {
          a: l(0.12, -0.055),
          b: l(0.3, -0.038),
          ra: 0.032,
          rb: 0.02,
          k: 0.025,
          bone: 3,
          part: 2,
        },
        {
          c: e(0, 0.79, -0.64),
          r: [0.046, 0.105, 0.02],
          pitch: 0.18,
          k: 0.025,
          bone: 6,
          part: 5,
        },
      ];
    return (
      f.forEach((n, r) => {
        let i = n.side,
          a = 7 + r * 3;
        if (n.front) {
          let n = i * 0.078;
          t.push(
            {
              c: e(i * 0.085, 0.7, 0.37),
              r: [0.06, 0.17, 0.105],
              pitch: 0.3,
              k: 0.06,
              bone: 1,
              part: 0,
            },
            {
              a: e(n, 0.6, 0.345),
              b: e(n, 0.32, 0.372),
              ra: 0.048,
              rb: 0.024,
              k: 0.05,
              bone: a,
              part: 3,
            },
            {
              c: e(n, 0.31, 0.38),
              r: [0.023, 0.03, 0.026],
              k: 0.012,
              bone: a + 1,
              part: 3,
            },
            {
              a: e(n, 0.3, 0.379),
              b: e(n, 0.095, 0.385),
              ra: 0.017,
              rb: 0.0145,
              k: 0.012,
              bone: a + 1,
              part: 3,
            },
            {
              c: e(n, 0.082, 0.387),
              r: [0.017, 0.021, 0.02],
              k: 0.012,
              bone: a + 2,
              part: 3,
            },
            {
              a: e(n, 0.075, 0.39),
              b: e(n, 0.04, 0.405),
              ra: 0.0155,
              rb: 0.016,
              k: 0.008,
              bone: a + 2,
              part: 3,
            },
            {
              a: e(n, 0.036, 0.405),
              b: e(n, 0.008, 0.428),
              ra: 0.017,
              rb: 0.011,
              k: 0.004,
              bone: a + 2,
              part: 4,
            },
          );
        } else {
          let n = i * 0.085;
          t.push(
            {
              c: e(i * 0.07, 0.66, -0.46),
              r: [0.072, 0.175, 0.13],
              pitch: -0.12,
              k: 0.06,
              bone: 1,
              part: 0,
            },
            {
              a: e(n, 0.62, -0.33),
              b: e(n, 0.415, -0.49),
              ra: 0.06,
              rb: 0.026,
              k: 0.05,
              bone: a,
              part: 3,
            },
            {
              c: e(n, 0.41, -0.5),
              r: [0.02, 0.034, 0.03],
              k: 0.012,
              bone: a + 1,
              part: 3,
            },
            {
              c: e(n, 0.42, -0.527),
              r: [0.014, 0.027, 0.018],
              pitch: 0.3,
              k: 0.01,
              bone: a + 1,
              part: 3,
            },
            {
              a: e(n, 0.4, -0.49),
              b: e(n, 0.095, -0.442),
              ra: 0.018,
              rb: 0.0145,
              k: 0.012,
              bone: a + 1,
              part: 3,
            },
            {
              c: e(n, 0.084, -0.44),
              r: [0.017, 0.021, 0.02],
              k: 0.012,
              bone: a + 2,
              part: 3,
            },
            {
              a: e(n, 0.077, -0.437),
              b: e(n, 0.04, -0.421),
              ra: 0.0155,
              rb: 0.016,
              k: 0.008,
              bone: a + 2,
              part: 3,
            },
            {
              a: e(n, 0.036, -0.421),
              b: e(n, 0.008, -0.399),
              ra: 0.017,
              rb: 0.011,
              k: 0.004,
              bone: a + 2,
              part: 4,
            },
          );
        }
      }),
      t
    );
  }
  function h(e, t, n, r) {
    if (`c` in e) {
      let [i, a, o] = e.c,
        s = n - a,
        c = r - o,
        l = e.pitch ?? 0,
        u = Math.cos(l),
        d = Math.sin(l),
        f = (t - i) / e.r[0],
        p = (s * u + c * d) / e.r[1],
        m = (-s * d + c * u) / e.r[2],
        h = Math.sqrt(f * f + p * p + m * m),
        g = f / e.r[0],
        _ = p / e.r[1],
        v = m / e.r[2],
        y = Math.sqrt(g * g + _ * _ + v * v);
      return y > 0 ? (h * (h - 1)) / y : -Math.min(...e.r);
    }
    let [i, a, o] = e.a,
      s = e.b[0] - i,
      c = e.b[1] - a,
      l = e.b[2] - o,
      u = t - i,
      d = n - a,
      f = r - o,
      p = s * s + c * c + l * l,
      m = e.ra - e.rb,
      h = p - m * m,
      g = 1 / p,
      _ = u * s + d * c + f * l,
      v = _ - p,
      y = u * p - s * _,
      b = d * p - c * _,
      x = f * p - l * _,
      S = y * y + b * b + x * x,
      C = _ * _ * p,
      w = v * v * p,
      T = Math.sign(m) * m * m * S;
    return Math.sign(v) * h * w > T
      ? Math.sqrt(S + w) * g - e.rb
      : Math.sign(_) * h * C < T
        ? Math.sqrt(S + C) * g - e.ra
        : (Math.sqrt(S * h * g) + _ * m) * g - e.ra;
  }
  function g(e, t, n) {
    let r = Math.max(n - Math.abs(e - t), 0) / n;
    return Math.min(e, t) - r * r * n * 0.25;
  }
  function _(e, t, n, r, i) {
    let a = 1 / 0;
    for (let o = 0; o < t.length; o++) {
      let s = e[t[o]];
      a = a === 1 / 0 ? h(s, n, r, i) : g(a, h(s, n, r, i), s.k);
    }
    return a;
  }
  function v(e, t, n, r, i, a, o) {
    let s = 1 / 0;
    for (let i = 0; i < e.length; i++)
      s = Math.min(s, (a[i] = h(e[i], t, n, r)));
    o.length = 0;
    for (let t = 0; t < e.length; t++) a[t] < s + i + e[t].k && o.push(t);
    return s;
  }
  let y = (e, t) => [
      e[1] * t[2] - e[2] * t[1],
      e[2] * t[0] - e[0] * t[2],
      e[0] * t[1] - e[1] * t[0],
    ],
    b = (e) => {
      let t = Math.hypot(...e) || 1;
      return [e[0] / t, e[1] / t, e[2] / t];
    },
    x = (e) =>
      [16, 8, 0].map((t) => {
        let n = ((e >> t) & 255) / 255;
        return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
      }),
    S = {
      back: x(4008474),
      coat: x(8215612),
      flank: x(10518362),
      belly: x(14208962),
      white: x(15789026),
      leg: x(7297609),
      muzzle: x(3812902),
      nose: x(1183760),
      eye: x(723208),
      hoof: x(2498588),
      innerEar: x(12887187),
      earRim: x(3351833),
    },
    C = (e, n, r) => {
      let i = t(r);
      return [
        e[0] + (n[0] - e[0]) * i,
        e[1] + (n[1] - e[1]) * i,
        e[2] + (n[2] - e[2]) * i,
      ];
    },
    w = 0.01,
    T = [-0.2, -0.015, -1.12],
    E = (e, t, n) => (n * 148 + t) * 41 + e;
  function D(e) {
    let t = /* @__PURE__ */ new Float32Array(1152920).fill(1),
      n = /* @__PURE__ */ new Uint8Array(1152920),
      r = e.map((e, t) => t),
      i = (4 * w * Math.sqrt(3)) / 2,
      a = [],
      o = [],
      s = new Float64Array(e.length);
    for (let c = 0; c < 189; c += 4)
      for (let l = 0; l < 147; l += 4)
        for (let u = 0; u < 40; u += 4) {
          let d = T[0] + (u + 2) * w,
            f = T[1] + (l + 2) * w,
            p = T[2] + (c + 2) * w,
            m = _(e, r, d, f, p),
            h = Math.min(u + 4, 40),
            g = Math.min(l + 4, 147),
            y = Math.min(c + 4, 189);
          if (Math.abs(m) > i + 0.01) {
            if (m < 0)
              for (let e = c; e <= y; e++)
                for (let r = l; r <= g; r++)
                  for (let i = u; i <= h; i++)
                    n[E(i, r, e)] || (t[E(i, r, e)] = -1);
            continue;
          }
          v(e, d, f, p, 2 * i, s, o);
          for (let r = c; r <= y; r++)
            for (let i = l; i <= g; i++)
              for (let a = u; a <= h; a++) {
                let s = E(a, i, r);
                n[s] ||
                  ((t[s] = _(e, o, T[0] + a * w, T[1] + i * w, T[2] + r * w)),
                  (n[s] = 1));
              }
          for (let e = c; e < y; e++)
            for (let t = l; t < g; t++)
              for (let n = u; n < h; n++) a.push(E(n, t, e));
        }
    return { value: t, cells: a };
  }
  function O(e, t) {
    let n = /* @__PURE__ */ new Int32Array(1152920).fill(-1),
      r = [],
      i = /* @__PURE__ */ new Float64Array(8);
    for (let a of t) {
      let t = a % 41,
        o = Math.floor(a / 41) % 148,
        s = Math.floor(a / 6068),
        c = 0;
      for (let n = 0; n < 8; n++)
        ((i[n] = e[E(t + (n & 1), o + ((n >> 1) & 1), s + (n >> 2))]),
          i[n] < 0 && c++);
      if (c === 0 || c === 8) continue;
      let l = 0,
        u = 0,
        d = 0,
        f = 0;
      for (let e = 0; e < 8; e++)
        for (let t of [1, 2, 4]) {
          if (e & t) continue;
          let n = e | t,
            r = i[e],
            a = i[n];
          if (r < 0 == a < 0) continue;
          let o = r / (r - a);
          ((l += (e & 1) + (t === 1 ? o : 0)),
            (u += ((e >> 1) & 1) + (t === 2 ? o : 0)),
            (d += (e >> 2) + (t === 4 ? o : 0)),
            f++);
        }
      ((n[a] = r.length / 3),
        r.push(
          T[0] + (t + l / f) * w,
          T[1] + (o + u / f) * w,
          T[2] + (s + d / f) * w,
        ));
    }
    return { pos: r, vertexOf: n };
  }
  function k(e, t, n) {
    let r = [],
      i = (e, t, n, i, a) => {
        e < 0 ||
          t < 0 ||
          n < 0 ||
          i < 0 ||
          (a ? r.push(e, t, n, e, n, i) : r.push(e, n, t, e, i, n));
      };
    for (let r of t) {
      let t = r % 41,
        a = Math.floor(r / 41) % 148,
        o = Math.floor(r / 6068),
        s = e[r] < 0;
      (a > 0 &&
        o > 0 &&
        s !== e[E(t + 1, a, o)] < 0 &&
        i(n[E(t, a - 1, o - 1)], n[E(t, a, o - 1)], n[r], n[E(t, a - 1, o)], s),
        t > 0 &&
          o > 0 &&
          s !== e[E(t, a + 1, o)] < 0 &&
          i(
            n[E(t - 1, a, o - 1)],
            n[E(t - 1, a, o)],
            n[r],
            n[E(t, a, o - 1)],
            s,
          ),
        t > 0 &&
          a > 0 &&
          s !== e[E(t, a, o + 1)] < 0 &&
          i(
            n[E(t - 1, a - 1, o)],
            n[E(t, a - 1, o)],
            n[r],
            n[E(t - 1, a, o)],
            s,
          ));
    }
    return r;
  }
  function A(e) {
    let { value: t, cells: n } = D(e),
      { pos: r, vertexOf: i } = O(t, n);
    return { pos: r, idx: k(t, n, i) };
  }
  var j = class {
    pos = [];
    normal = [];
    color = [];
    index = [];
    bones = [];
    weights = [];
    vertex(e, t, n, r, i, a, o) {
      (this.pos.push(e, t, n), this.normal.push(...r));
      let s = Math.sin(e * 91.7 + t * 47.3 + n * 63.1) * 4375.5,
        c = 0.94 + 0.12 * (s - Math.floor(s));
      this.color.push(i[0] * c, i[1] * c, i[2] * c);
      for (let e = 0; e < 4; e++)
        (this.bones.push(a[e] ?? 0), this.weights.push(o[e] ?? 0));
    }
    sheet(e, t, n, r, i, a) {
      let o = this.pos.length / 3,
        s = [],
        c = [];
      for (let r = 0; r < e; r++)
        for (let i = 0; i < t; i++) {
          let { p: a, c: o } = n(i / (t - 1), r / (e - 1));
          (s.push(a), c.push(o));
        }
      s.forEach((n, o) => {
        let l = Math.floor(o / t),
          u = o % t,
          d = s[l * t + Math.min(t - 1, u + 1)],
          f = s[l * t + Math.max(0, u - 1)],
          p = s[Math.min(e - 1, l + 1) * t + u],
          m = s[Math.max(0, l - 1) * t + u],
          h = [d[0] - f[0], d[1] - f[1], d[2] - f[2]],
          g = [p[0] - m[0], p[1] - m[1], p[2] - m[2]],
          _ = b(a ? [n[0] - a[0], n[1] - a[1], n[2] - a[2]] : y(h, g));
        (i && !a && (_ = [-_[0], -_[1], -_[2]]),
          this.vertex(n[0], n[1], n[2], _, c[o], [r], [1]));
      });
      for (let n = 0; n < e - 1; n++)
        for (let e = 0; e < t - 1; e++) {
          let r = o + n * t + e;
          i
            ? this.index.push(r, r + t, r + 1, r + 1, r + t, r + t + 1)
            : this.index.push(r, r + 1, r + t, r + 1, r + t + 1, r + t);
        }
    }
    done() {
      return {
        position: new Float32Array(this.pos),
        normal: new Float32Array(this.normal),
        color: new Float32Array(this.color),
        skinIndex: new Uint16Array(this.bones),
        skinWeight: new Float32Array(this.weights),
        index: new Uint32Array(this.index),
      };
    }
  };
  let M = [0.39, 0.84],
    N = Math.hypot(-a[2] - M[0], a[1] - M[1]),
    P = [(-a[2] - M[0]) / N, (a[1] - M[1]) / N];
  function F(e, t, n, i, o, l) {
    let u = -i,
      f = Math.abs(t),
      m = -o[0] * Math.sign(t);
    switch (e) {
      case p.Hoof:
        return S.hoof;
      case p.Tail:
        return C(
          S.back,
          S.white,
          Math.max(r(0.3, -0.2, o[2]), r(0.024, 0.038, f)),
        );
      case p.Leg: {
        let e = r(0.2, 0.8, m),
          t = C(S.coat, S.leg, r(0.42, 0.3, n));
        return (
          (t = C(t, S.belly, e * (0.4 + 0.5 * r(0.45, 0.6, n)))),
          C(t, S.white, r(0.075, 0.06, n) * 0.7)
        );
      }
      case p.Head: {
        let e = u + a[2],
          t = n - a[1],
          p = (e * s - t * c) / 0.33,
          m = -o[2] * c + o[1] * s,
          h = -o[2] * s - o[1] * c,
          g = C(
            S.coat,
            S.back,
            r(0.2, 0.85, m) * r(0.05, 0.25, p) * r(0.8, 0.55, p) * 0.75,
          ),
          _ = Math.hypot(f - l, n - d[1], i - d[2]);
        return (
          (g = C(g, S.belly, r(0.018, 0.02, _) * r(0.025, 0.022, _) * 0.75)),
          (g = C(g, S.white, r(0.7, 0.75, p) * r(0.86, 0.81, p))),
          (g = C(g, S.muzzle, r(0.84, 0.9, p))),
          (g = C(g, S.nose, r(0.92, 0.97, p) * r(-0.4, 0.3, h + m))),
          C(g, S.white, r(0.45, 0.6, p) * r(-0.35, -0.7, m) * r(0.95, 0.88, p))
        );
      }
      case p.Neck: {
        let e = ((u - M[0]) * P[0] + (n - M[1]) * P[1]) / N,
          t = -o[2] * -P[1] + o[1] * P[0],
          i = C(S.coat, S.back, r(0.3, 0.9, t) * 0.75);
        return (
          (i = C(i, S.flank, r(0, -0.6, t) * 0.7)),
          C(
            i,
            S.white,
            r(0.62, 0.7, e) *
              r(0.97, 0.9, e) *
              r(-0.35, -0.7, t) *
              r(0.05, 0.03, f),
          )
        );
      }
      default: {
        let e = C(S.coat, S.back, r(0.25, 0.85, o[1]));
        return (
          (e = C(e, S.back, r(0.95, 0.99, o[1]) * r(0.03, 0.01, f) * 0.6)),
          (e = C(e, S.flank, r(0.25, -0.3, o[1]) * r(-0.75, -0.45, o[1]))),
          (e = C(e, S.belly, r(-0.5, -0.8, o[1]) * r(0.75, 0.6, n))),
          (e = C(
            e,
            S.belly,
            r(0.3, 0.8, m) * r(-0.3, -0.45, u) * r(0.8, 0.65, n),
          )),
          C(
            e,
            S.white,
            r(-0.52, -0.6, u) *
              r(0.92, 0.84, n) *
              r(0.55, 0.6, n) *
              r(0.09, 0.06, f),
          )
        );
      }
    }
  }
  function I(e, t, i) {
    let a = Math.floor(e),
      o = Math.floor(t),
      s = Math.floor(i),
      c = r(0, 1, e - a),
      l = r(0, 1, t - o),
      u = r(0, 1, i - s),
      d = (e, t, n) => {
        let r =
          Math.imul(e, 668265261) ^
          Math.imul(t, 374761393) ^
          Math.imul(n, 2654435761);
        return (
          (r = Math.imul(r ^ (r >>> 15), 2246822507)),
          ((r ^ (r >>> 13)) >>> 0) / 4294967296
        );
      },
      f = (e) =>
        n(
          n(d(a, o, e), d(a + 1, o, e), c),
          n(d(a, o + 1, e), d(a + 1, o + 1, e), c),
          l,
        );
    return n(f(s), f(s + 1), u);
  }
  function L(e, t, n) {
    let r = I(e * 9 + 3.1, t * 9, n * 9) - 0.5,
      i = I(e * 24, t * 24 + 7.7, n * 24) - 0.5,
      a = I(e * 70, t * 70, n * 14 + 5.3) - 0.5,
      o = (I(e * 6, t * 6, n * 6 + 1.9) - 0.5) * 0.14,
      s = 1 + r * 0.36 + i * 0.14 + a * 0.2;
    return [s * (1 + o), s, s * (1 - o)];
  }
  let R = [0.02, 0.05, 0.1];
  function z(e, n, r, i, a, o) {
    let s = 0;
    for (let c of R)
      s += t(_(e, n, r + o[0] * c, i + o[1] * c, a + o[2] * c) / c);
    return 1 - 0.35 * (1 - s / R.length);
  }
  function B(e, t, n) {
    let r = t.map((e, t) => t),
      { pos: a, idx: o } = A(t),
      s = 0.0015,
      c = new Float64Array(t.length),
      l = [],
      u = new Float64Array(i.Legs + f.length * 3);
    for (let i = 0; i < a.length / 3; i++) {
      let o = a[i * 3],
        d = a[i * 3 + 1],
        f = a[i * 3 + 2],
        m = v(t, o, d, f, 0.03, c, l),
        h = (e, n, r) => _(t, l, e, n, r),
        g = b([
          h(o + s, d, f) - h(o - s, d, f),
          h(o, d + s, f) - h(o, d - s, f),
          h(o, d, f + s) - h(o, d, f - s),
        ]),
        y = h(o, d, f);
      ((o -= g[0] * y), (d -= g[1] * y), (f -= g[2] * y), u.fill(0));
      let x = p.Body;
      for (let e of l)
        ((u[t[e].bone] += Math.exp(
          -(c[e] - m) / Math.max(0.012, t[e].k * 0.4),
        )),
          c[e] === m && (x = t[e].part));
      let S = [...u.keys()].sort((e, t) => u[t] - u[e]).slice(0, 4),
        C = S.reduce((e, t) => e + u[t], 0),
        w = z(t, r, o, d, f, g),
        T = F(x, o, d, f, g, n),
        E = L(o, d, f);
      e.vertex(
        o,
        d,
        f,
        g,
        [T[0] * E[0] * w, T[1] * E[1] * w, T[2] * E[2] * w],
        S,
        S.map((e) => u[e] / C),
      );
    }
    for (let t of o) e.index.push(t);
  }
  function V(e) {
    let t = e.map((e, t) => t),
      n = 0;
    for (; _(e, t, n, d[1], d[2]) < 0 && n < 0.12;) n += 0.001;
    return n;
  }
  function H(t, n, r) {
    let a = [n * (r - 0.01), d[1], d[2]],
      o = 0.02;
    t.sheet(
      7,
      10,
      (t, n) => {
        let r = t * e,
          i = n * Math.PI;
        return {
          p: [
            a[0] + o * Math.sin(i) * Math.cos(r),
            a[1] + o * Math.cos(i),
            a[2] + o * Math.sin(i) * Math.sin(r),
          ],
          c: S.eye,
        };
      },
      i.Head,
      !1,
      a,
    );
  }
  function U(e, t, n) {
    let i = u(t),
      a = b([t * 0.95, 0.85, 0.2]),
      o = b(y([0, 0.3, -1], a)).map((e) => e * t),
      s = b(y(a, o)).map((e) => e * t);
    s[2] > 0 && (s = [-s[0], -s[1], -s[2]]);
    for (let t of [1, -1])
      e.sheet(
        10,
        9,
        (e, n) => {
          let c = e * 2 - 1,
            l = 0.07 * Math.sin(Math.PI * (0.08 + n * 0.9)) ** 0.6,
            u =
              -0.026 * (1 - c * c) * Math.sin(Math.PI * Math.min(1, n * 1.15)) +
              t * 0.002,
            d = [0, 1, 2].map(
              (e) => i[e] + a[e] * 0.235 * n + o[e] * c * l + s[e] * u,
            ),
            f = Math.max(r(0.75, 1, Math.abs(c)), r(0.88, 1, n));
          return {
            p: d,
            c:
              t > 0 ? C(S.innerEar, S.earRim, f) : C(S.coat, S.earRim, f * 0.6),
          };
        },
        n,
        t < 0,
        null,
      );
  }
  function W() {
    let e = m(),
      t = new j(),
      n = V(e);
    B(t, e, n);
    for (let e of [-1, 1]) H(t, e, n);
    for (let e of [-1, 1]) U(t, e, e < 0 ? i.EarL : i.EarR);
    return t.done();
  }
  onmessage = () => {
    let e = W();
    postMessage(e, { transfer: Object.values(e).map((e) => e.buffer) });
  };
})();
