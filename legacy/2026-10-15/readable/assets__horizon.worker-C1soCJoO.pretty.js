(function () {
  let e = Math.PI * 2,
    t = (e, t = 0, n = 1) => (e < t ? t : e > n ? n : e),
    n = (e, n, r) => {
      let i = t((r - e) / (n - e));
      return i * i * (3 - 2 * i);
    };
  function r(e) {
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
  let i = 0.5 * (Math.sqrt(3) - 1),
    a = (3 - Math.sqrt(3)) / 6,
    o = new Float32Array([
      1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1,
    ]);
  var s = class {
    perm = /* @__PURE__ */ new Uint8Array(512);
    constructor(e) {
      let t = r(e),
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
        r = (e + t) * i,
        s = Math.floor(e + r),
        c = Math.floor(t + r),
        l = (s + c) * a,
        u = e - (s - l),
        d = t - (c - l),
        f = +(u > d),
        p = 1 - f,
        m = u - f + a,
        h = d - p + a,
        g = u - 1 + 2 * a,
        _ = d - 1 + 2 * a,
        v = s & 255,
        y = c & 255,
        b = 0,
        x = 0.5 - u * u - d * d;
      if (x > 0) {
        let e = (n[v + n[y]] & 7) * 2;
        ((x *= x), (b += x * x * (o[e] * u + o[e + 1] * d)));
      }
      let S = 0.5 - m * m - h * h;
      if (S > 0) {
        let e = (n[v + f + n[y + p]] & 7) * 2;
        ((S *= S), (b += S * S * (o[e] * m + o[e + 1] * h)));
      }
      let C = 0.5 - g * g - _ * _;
      if (C > 0) {
        let e = (n[v + 1 + n[y + 1]] & 7) * 2;
        ((C *= C), (b += C * C * (o[e] * g + o[e + 1] * _)));
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
  let c = { x: -40, z: -860, h: 680 },
    l = new s(7),
    u = new s(19),
    d = new s(41);
  function f(e, n, r) {
    let i = t(0.5 + (0.5 * (n - e)) / r);
    return n * i + e * (1 - i) + r * i * (1 - i) * 0.5;
  }
  function p(e, r) {
    let i = (e - c.x) / 1.35,
      a = r - c.z,
      o = Math.atan2(a, i),
      s = Math.hypot(i, a),
      u =
        l.fbm(Math.cos(o) * 1.7 + 11, Math.sin(o) * 1.7 - 4, 3) *
        60 *
        n(60, 400, s),
      d = Math.max(0, s + u);
    return (
      360 * t(1 - d / 2100) ** 1.15 -
      100 * t((d - 430) / 1070) ** 1.2 +
      (c.h - 360) * t(1 - d / 900) ** 1.8
    );
  }
  function m(e, t, r) {
    if (r <= 0) return 0;
    let i = 0.5 + 0.5 * n(3e3, -5e3, t),
      a = e + d.fbm(e / 9e3 + 5, t / 9e3, 3) * 2500,
      o = t + d.fbm(e / 9e3, t / 9e3 + 9, 3) * 2500,
      s = 0.5 + 0.5 * d.fbm(a / 11e3, o / 11e3, 3),
      c = u.ridged(a / 5200 + 3.1, o / 5200 - 1.7, 5) ** 1.6;
    return r * i * (s * 1700 + c * 3e3 * (0.4 + 0.8 * s) + 200);
  }
  function h(e, t, n) {
    return n <= 0 ? 0 : n * (0.5 + 0.5 * d.fbm(e / 900 + 7, t / 900, 4)) * 260;
  }
  function g(e) {
    let t = 395 - e;
    return t > 0 ? e - 0.25 * t * n(0, 40, t) : e;
  }
  function _(e, t) {
    let r = p(e, t),
      i = n(500, 1500, Math.abs(e - 80));
    r = f(r, h(e, t, i), 1 + 120 * i);
    let a = Math.hypot(e, t * 0.85),
      o = n(1800, 5200, a) * (1 - n(16e3, 24e3, a));
    r = f(r, m(e, t, o), 1 + 300 * o);
    let s = 12 + Math.max(0, -t) * 0.02 + Math.max(0, t - 1100) * 0.01;
    r = f(r, s, 30);
    let c = n(0, 400, r),
      d = 6 + 8 * c + 40 * n(300, 560, r);
    return (
      (r = g(r)),
      (r += l.fbm(e / 260, t / 260, 4) * d),
      (r += u.fbm(e / 38, t / 38, 3) * (1.2 + 1.5 * c)),
      r
    );
  }
  new s(303);
  let v = new s(101),
    y = new s(202),
    b = [g(70), g(160)];
  (g(220), g(330), Array.from({ length: 4 }, (e, t) => new s(t * 17 + 3)));
  function x(e, t, r, i) {
    if (r >= 520 || i >= 1.1) return 0;
    let a = v.fbm(e / 340 + 4, t / 340 - 2, 4) * 0.5 + 0.5,
      o = n(0.4, 0.62, a);
    return (
      (o *= 0.35 + 0.65 * n(b[0], b[1], r)),
      (o *= 1 - n(430, 520, r)),
      o * (1 - n(0.75, 1.1, i))
    );
  }
  function S(e, t, r, i) {
    if (i <= 0.25 && r <= 350) return 0;
    let a = v.fbm(e / 60, t / 60, 3) * 0.5 + 0.5,
      o = n(0.55, 0.95, i + (a - 0.5) * 0.5),
      s = n(420, 560, r + a * 60) * 0.8;
    return Math.max(o, s);
  }
  function C(e, t, r, i) {
    if (r <= 515) return 0;
    let a = y.fbm(e / 45, t / 45, 3);
    return n(560, 620, r + a * 40) * (1 - n(0.9, 1.4, i));
  }
  function w(e) {
    let t = Math.cos(e),
      n = Math.sin(e),
      r = 1018 / Math.max(Math.abs(t), Math.abs(n));
    return [t * r, n * r];
  }
  function T() {
    let n = 56943,
      r = new Float32Array(n * 3),
      i = new Float32Array(n * 4);
    for (let n = 0; n <= 110; n++) {
      let a = ((1 + (n / 110) * 60) ** 1.6 - 1) / (61 ** 1.6 - 1);
      for (let o = 0; o <= 512; o++) {
        let [s, c] = w((o / 512) * e),
          l = Math.hypot(s, c),
          u = l + (26e3 - l) * a,
          d = (s / l) * u,
          f = (c / l) * u,
          p = n * 513 + o,
          m = _(d, f) - (n === 0 ? 1.5 : 0);
        ((r[p * 3] = d), (r[p * 3 + 1] = m), (r[p * 3 + 2] = f));
        let h = 4 + u * 0.01,
          g =
            Math.hypot(_(d + h, f) - _(d - h, f), _(d, f + h) - _(d, f - h)) /
            (2 * h);
        ((i[p * 4 + 1] = x(d, f, m, g) * 0.9 + 0.1 * (1 - Math.min(1, g))),
          (i[p * 4 + 2] = Math.max(S(d, f, m, g), t((m - 1300) / 500))),
          (i[p * 4 + 3] = Math.max(
            C(d, f, m, g),
            t((m - 1500) / 300) * (1 - t((g - 0.9) * 2)),
          )));
      }
    }
    return { pos: r, cover: i };
  }
  onmessage = () => {
    let e = T();
    postMessage(e, { transfer: [e.pos.buffer, e.cover.buffer] });
  };
})();
