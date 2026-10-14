// assets/index-gCVK5XnX 38 — math
// Lines 59505-59851 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var r0 = (e, t) => [
    e[1] * t[2] - e[2] * t[1],
    e[2] * t[0] - e[0] * t[2],
    e[0] * t[1] - e[1] * t[0],
  ],
  i0 = (e) => {
    let t = Math.hypot(...e) || 1;
    return [e[0] / t, e[1] / t, e[2] / t];
  },
  a0 = (e) =>
    [16, 8, 0].map((t) => {
      let n = ((e >> t) & 255) / 255;
      return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
    }),
  o0 = {
    back: a0(4008474),
    coat: a0(8215612),
    flank: a0(10518362),
    belly: a0(14208962),
    white: a0(15789026),
    leg: a0(7297609),
    muzzle: a0(3812902),
    nose: a0(1183760),
    eye: a0(723208),
    hoof: a0(2498588),
    innerEar: a0(12887187),
    earRim: a0(3351833),
  },
  s0 = (e, t, n) => {
    let r = Y(n);
    return [
      e[0] + (t[0] - e[0]) * r,
      e[1] + (t[1] - e[1]) * r,
      e[2] + (t[2] - e[2]) * r,
    ];
  },
  c0 = 0.01,
  l0 = [-0.2, -0.015, -1.12],
  u0 = 41,
  d0 = 148,
  f0 = 190,
  p0 = 4,
  m0 = (e, t, n) => (n * d0 + t) * u0 + e;
function h0(e) {
  let t = new Float32Array(6068 * f0).fill(1),
    n = new Uint8Array(6068 * f0),
    r = e.map((e, t) => t),
    i = (p0 * c0 * Math.sqrt(3)) / 2,
    a = [],
    o = [],
    s = new Float64Array(e.length);
  for (let c = 0; c < 189; c += p0)
    for (let l = 0; l < 147; l += p0)
      for (let u = 0; u < 40; u += p0) {
        let d = l0[0] + (u + p0 / 2) * c0,
          f = l0[1] + (l + p0 / 2) * c0,
          p = l0[2] + (c + p0 / 2) * c0,
          m = t0(e, r, d, f, p),
          h = Math.min(u + p0, 40),
          g = Math.min(l + p0, 147),
          _ = Math.min(c + p0, 189);
        if (Math.abs(m) > i + 0.01) {
          if (m < 0)
            for (let e = c; e <= _; e++)
              for (let r = l; r <= g; r++)
                for (let i = u; i <= h; i++)
                  n[m0(i, r, e)] || (t[m0(i, r, e)] = -1);
          continue;
        }
        n0(e, d, f, p, 2 * i, s, o);
        for (let r = c; r <= _; r++)
          for (let i = l; i <= g; i++)
            for (let a = u; a <= h; a++) {
              let s = m0(a, i, r);
              n[s] ||
                ((t[s] = t0(
                  e,
                  o,
                  l0[0] + a * c0,
                  l0[1] + i * c0,
                  l0[2] + r * c0,
                )),
                (n[s] = 1));
            }
        for (let e = c; e < _; e++)
          for (let t = l; t < g; t++)
            for (let n = u; n < h; n++) a.push(m0(n, t, e));
      }
  return { value: t, cells: a };
}
function g0(e, t) {
  let n = new Int32Array(6068 * f0).fill(-1),
    r = [],
    i = new Float64Array(8);
  for (let a of t) {
    let t = a % u0,
      o = Math.floor(a / u0) % d0,
      s = Math.floor(a / 6068),
      c = 0;
    for (let n = 0; n < 8; n++)
      ((i[n] = e[m0(t + (n & 1), o + ((n >> 1) & 1), s + (n >> 2))]),
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
        l0[0] + (t + l / f) * c0,
        l0[1] + (o + u / f) * c0,
        l0[2] + (s + d / f) * c0,
      ));
  }
  return { pos: r, vertexOf: n };
}
function _0(e, t, n) {
  let r = [],
    i = (e, t, n, i, a) => {
      e < 0 ||
        t < 0 ||
        n < 0 ||
        i < 0 ||
        (a ? r.push(e, t, n, e, n, i) : r.push(e, n, t, e, i, n));
    };
  for (let r of t) {
    let t = r % u0,
      a = Math.floor(r / u0) % d0,
      o = Math.floor(r / 6068),
      s = e[r] < 0;
    (a > 0 &&
      o > 0 &&
      s !== e[m0(t + 1, a, o)] < 0 &&
      i(
        n[m0(t, a - 1, o - 1)],
        n[m0(t, a, o - 1)],
        n[r],
        n[m0(t, a - 1, o)],
        s,
      ),
      t > 0 &&
        o > 0 &&
        s !== e[m0(t, a + 1, o)] < 0 &&
        i(
          n[m0(t - 1, a, o - 1)],
          n[m0(t - 1, a, o)],
          n[r],
          n[m0(t, a, o - 1)],
          s,
        ),
      t > 0 &&
        a > 0 &&
        s !== e[m0(t, a, o + 1)] < 0 &&
        i(
          n[m0(t - 1, a - 1, o)],
          n[m0(t, a - 1, o)],
          n[r],
          n[m0(t - 1, a, o)],
          s,
        ));
  }
  return r;
}
function v0(e) {
  let { value: t, cells: n } = h0(e),
    { pos: r, vertexOf: i } = g0(t, n);
  return { pos: r, idx: _0(t, n, i) };
}
var y0 = class {
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
          _ = i0(a ? [n[0] - a[0], n[1] - a[1], n[2] - a[2]] : r0(h, g));
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
  },
  b0 = 0.012,
  x0 = 0.4,
  S0 = [0.39, 0.84],
  C0 = Math.hypot(-R1[2] - S0[0], R1[1] - S0[1]),
  w0 = [(-R1[2] - S0[0]) / C0, (R1[1] - S0[1]) / C0];
function T0(e, t, n, r, i, a) {
  let o = -r,
    s = Math.abs(t),
    c = -i[0] * Math.sign(t);
  switch (e) {
    case Z1.Hoof:
      return o0.hoof;
    case Z1.Tail:
      return s0(
        o0.back,
        o0.white,
        Math.max(X(0.3, -0.2, i[2]), X(0.024, 0.038, s)),
      );
    case Z1.Leg: {
      let e = X(0.2, 0.8, c),
        t = s0(o0.coat, o0.leg, X(0.42, 0.3, n));
      return (
        (t = s0(t, o0.belly, e * (0.4 + 0.5 * X(0.45, 0.6, n)))),
        s0(t, o0.white, X(0.075, 0.06, n) * 0.7)
      );
    }
    case Z1.Head: {
      let e = o + R1[2],
        t = n - R1[1],
        c = (e * B1 - t * V1) / 0.33,
        l = -i[2] * V1 + i[1] * B1,
        u = -i[2] * B1 - i[1] * V1,
        d = s0(
          o0.coat,
          o0.back,
          X(0.2, 0.85, l) * X(0.05, 0.25, c) * X(0.8, 0.55, c) * 0.75,
        ),
        f = Math.hypot(s - a, n - W1[1], r - W1[2]);
      return (
        (d = s0(d, o0.belly, X(0.018, 0.02, f) * X(0.025, 0.022, f) * 0.75)),
        (d = s0(d, o0.white, X(0.7, 0.75, c) * X(0.86, 0.81, c))),
        (d = s0(d, o0.muzzle, X(0.84, 0.9, c))),
        (d = s0(d, o0.nose, X(0.92, 0.97, c) * X(-0.4, 0.3, u + l))),
        s0(d, o0.white, X(0.45, 0.6, c) * X(-0.35, -0.7, l) * X(0.95, 0.88, c))
      );
    }
    case Z1.Neck: {
      let e = ((o - S0[0]) * w0[0] + (n - S0[1]) * w0[1]) / C0,
        t = -i[2] * -w0[1] + i[1] * w0[0],
        r = s0(o0.coat, o0.back, X(0.3, 0.9, t) * 0.75);
      return (
        (r = s0(r, o0.flank, X(0, -0.6, t) * 0.7)),
        s0(
          r,
          o0.white,
          X(0.62, 0.7, e) *
            X(0.97, 0.9, e) *
            X(-0.35, -0.7, t) *
            X(0.05, 0.03, s),
        )
      );
    }
    default: {
      let e = s0(o0.coat, o0.back, X(0.25, 0.85, i[1]));
      return (
        (e = s0(e, o0.back, X(0.95, 0.99, i[1]) * X(0.03, 0.01, s) * 0.6)),
        (e = s0(e, o0.flank, X(0.25, -0.3, i[1]) * X(-0.75, -0.45, i[1]))),
        (e = s0(e, o0.belly, X(-0.5, -0.8, i[1]) * X(0.75, 0.6, n))),
        (e = s0(
          e,
          o0.belly,
          X(0.3, 0.8, c) * X(-0.3, -0.45, o) * X(0.8, 0.65, n),
        )),
        s0(
          e,
          o0.white,
          X(-0.52, -0.6, o) *
            X(0.92, 0.84, n) *
            X(0.55, 0.6, n) *
            X(0.09, 0.06, s),
        )
      );
    }
  }
}
function E0(e, t, n) {
  let r = Math.floor(e),
    i = Math.floor(t),
    a = Math.floor(n),
    o = X(0, 1, e - r),
    s = X(0, 1, t - i),
    c = X(0, 1, n - a),
    l = (e, t, n) => {
      let r =
        Math.imul(e, 668265261) ^
        Math.imul(t, 374761393) ^
        Math.imul(n, 2654435761);
      return (
        (r = Math.imul(r ^ (r >>> 15), 2246822507)),
        ((r ^ (r >>> 13)) >>> 0) / 4294967296
      );
    },
    u = (e) =>
      OF(
        OF(l(r, i, e), l(r + 1, i, e), o),
        OF(l(r, i + 1, e), l(r + 1, i + 1, e), o),
        s,
      );
  return OF(u(a), u(a + 1), c);
}
