// assets__index-gCVK5XnX 37 — bone
// Lines 59189-59504 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function Q1() {
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
        b: H1(-0.005, 0.01),
        ra: 0.135,
        rb: 0.064,
        k: 0.09,
        bone: 2,
        part: 1,
      },
      {
        a: e(0, 0.7, 0.52),
        b: H1(0.07, -0.05),
        ra: 0.085,
        rb: 0.048,
        k: 0.05,
        bone: 2,
        part: 1,
      },
      {
        c: H1(0.06, 0.035),
        r: [0.066, 0.068, 0.095],
        pitch: -0.6,
        k: 0.035,
        bone: 3,
        part: 2,
      },
      {
        c: H1(0.11, -0.02),
        r: [0.054, 0.052, 0.09],
        pitch: -0.6,
        k: 0.03,
        bone: 3,
        part: 2,
      },
      {
        a: H1(0.15, 0.005),
        b: H1(0.315, -0.012),
        ra: 0.048,
        rb: 0.03,
        k: 0.03,
        bone: 3,
        part: 2,
      },
      {
        c: H1(0.33, -0.012),
        r: [0.027, 0.024, 0.022],
        pitch: -0.6,
        k: 0.012,
        bone: 3,
        part: 2,
      },
      {
        a: H1(0.12, -0.055),
        b: H1(0.3, -0.038),
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
    K1.forEach((n, r) => {
      let i = n.side,
        a = 7 + r * 3;
      if (n.front) {
        let n = i * q1;
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
        let n = i * J1;
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
function $1(e, t, n, r) {
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
function e0(e, t, n) {
  let r = Math.max(n - Math.abs(e - t), 0) / n;
  return Math.min(e, t) - r * r * n * 0.25;
}
function t0(e, t, n, r, i) {
  let a = 1 / 0;
  for (let o = 0; o < t.length; o++) {
    let s = e[t[o]];
    a = a === 1 / 0 ? $1(s, n, r, i) : e0(a, $1(s, n, r, i), s.k);
  }
  return a;
}
function n0(e, t, n, r, i, a, o) {
  let s = 1 / 0;
  for (let i = 0; i < e.length; i++)
    s = Math.min(s, (a[i] = $1(e[i], t, n, r)));
  o.length = 0;
  for (let t = 0; t < e.length; t++) a[t] < s + i + e[t].k && o.push(t);
  return s;
}
