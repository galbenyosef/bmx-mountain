// assets/index-gCVK5XnX 02 — math
// Lines 47503-47816 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function BF(e, t, n) {
  return typeof Worker > `u`
    ? Promise.resolve(n())
    : new Promise((r) => {
        let i = e(),
          a = (e) => {
            (i.terminate(), r(e));
          };
        ((i.onmessage = (e) => a(e.data)),
          (i.onerror = () => a(n())),
          i.postMessage(t));
      });
}
async function VF(e, t) {
  let n =
    typeof Worker > `u` ? 1 : Y((navigator.hardwareConcurrency || 4) - 1, 2, 8);
  await Promise.all(
    Array.from({ length: n }, (r, i) =>
      t(Math.floor((i * e) / n), Math.floor(((i + 1) * e) / n)),
    ),
  );
}
function HF(e) {
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
function UF(e) {
  let t = Math.imul(e | 0, 2654435761) ^ 1540483477;
  return (
    (t ^= t >>> 15),
    (t = Math.imul(t, 2246822507)),
    (t ^= t >>> 13),
    (t >>> 0) / 4294967296
  );
}
var WF = (e) => (Math.random() - 0.5) * e;
function GF(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return t >>> 0;
}
function KF(e) {
  let t = GF(e);
  return (
    (t ^= t >>> 16),
    (t = Math.imul(t, 2246822507)),
    (t ^= t >>> 13),
    t >>> 0
  );
}
var qF = 0.5 * (Math.sqrt(3) - 1),
  JF = (3 - Math.sqrt(3)) / 6,
  YF = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1]),
  XF = class {
    perm = new Uint8Array(512);
    constructor(e) {
      let t = HF(e),
        n = new Uint8Array(256);
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
        r = (e + t) * qF,
        i = Math.floor(e + r),
        a = Math.floor(t + r),
        o = (i + a) * JF,
        s = e - (i - o),
        c = t - (a - o),
        l = +(s > c),
        u = 1 - l,
        d = s - l + JF,
        f = c - u + JF,
        p = s - 1 + 2 * JF,
        m = c - 1 + 2 * JF,
        h = i & 255,
        g = a & 255,
        _ = 0,
        v = 0.5 - s * s - c * c;
      if (v > 0) {
        let e = (n[h + n[g]] & 7) * 2;
        ((v *= v), (_ += v * v * (YF[e] * s + YF[e + 1] * c)));
      }
      let y = 0.5 - d * d - f * f;
      if (y > 0) {
        let e = (n[h + l + n[g + u]] & 7) * 2;
        ((y *= y), (_ += y * y * (YF[e] * d + YF[e + 1] * f)));
      }
      let b = 0.5 - p * p - m * m;
      if (b > 0) {
        let e = (n[h + 1 + n[g + 1]] & 7) * 2;
        ((b *= b), (_ += b * b * (YF[e] * p + YF[e + 1] * m)));
      }
      return 70 * _;
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
  },
  ZF = 1024,
  QF = { x: -40, z: -860, h: 680 },
  $F = 12,
  eI = 395,
  tI = new XF(7),
  nI = new XF(19),
  rI = new XF(41);
function iI(e, t, n) {
  let r = Y(0.5 + (0.5 * (t - e)) / n);
  return t * r + e * (1 - r) + n * r * (1 - r) * 0.5;
}
function aI(e, t) {
  let n = (e - QF.x) / 1.35,
    r = t - QF.z,
    i = Math.atan2(r, n),
    a = Math.hypot(n, r),
    o =
      tI.fbm(Math.cos(i) * 1.7 + 11, Math.sin(i) * 1.7 - 4, 3) *
      60 *
      X(60, 400, a),
    s = Math.max(0, a + o);
  return (
    360 * Y(1 - s / 2100) ** 1.15 -
    100 * Y((s - 430) / 1070) ** 1.2 +
    (QF.h - 360) * Y(1 - s / 900) ** 1.8
  );
}
function oI(e, t, n) {
  if (n <= 0) return 0;
  let r = 0.5 + 0.5 * X(3e3, -5e3, t),
    i = e + rI.fbm(e / 9e3 + 5, t / 9e3, 3) * 2500,
    a = t + rI.fbm(e / 9e3, t / 9e3 + 9, 3) * 2500,
    o = 0.5 + 0.5 * rI.fbm(i / 11e3, a / 11e3, 3),
    s = nI.ridged(i / 5200 + 3.1, a / 5200 - 1.7, 5) ** 1.6;
  return n * r * (o * 1700 + s * 3e3 * (0.4 + 0.8 * o) + 200);
}
function sI(e, t, n) {
  return n <= 0 ? 0 : n * (0.5 + 0.5 * rI.fbm(e / 900 + 7, t / 900, 4)) * 260;
}
function cI(e, t, n, r) {
  let i = new Float32Array((t - e) * n);
  for (let a = e; a < t; a++)
    for (let t = 0; t < n; t++)
      i[(a - e) * n + t] = uI(-1024 + t * r, -1024 + a * r);
  return i;
}
function lI(e) {
  let t = eI - e;
  return t > 0 ? e - 0.25 * t * X(0, 40, t) : e;
}
function uI(e, t) {
  let n = aI(e, t),
    r = X(500, 1500, Math.abs(e - 80));
  n = iI(n, sI(e, t, r), 1 + 120 * r);
  let i = Math.hypot(e, t * 0.85),
    a = X(1800, 5200, i) * (1 - X(16e3, 24e3, i));
  n = iI(n, oI(e, t, a), 1 + 300 * a);
  let o = $F + Math.max(0, -t) * 0.02 + Math.max(0, t - 1100) * 0.01;
  n = iI(n, o, 30);
  let s = X(0, 400, n),
    c = 6 + 8 * s + 40 * X(300, 560, n);
  return (
    (n = lI(n)),
    (n += tI.fbm(e / 260, t / 260, 4) * c),
    (n += nI.fbm(e / 38, t / 38, 3) * (1.2 + 1.5 * s)),
    n
  );
}
var dI = 0.5;
function fI(e, t, n, r = 1, i = !0) {
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
var pI = (e, t) => Math.hypot(t[0] - e[0], t[1] - e[1]) ** 0.5 || 1e-4;
function mI(e, t, n, r, i) {
  let a = 0 + pI(e, t),
    o = a + pI(t, n),
    s = o + pI(n, r),
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
function hI(e, t) {
  let n = [],
    r = 0,
    i = 0;
  for (let a = 1; a < e.length; a++) {
    let [o, s] = e[a - 1],
      [c, l] = e[a],
      u = Math.hypot(c - o, l - s);
    for (; i <= r + u;) {
      let e = u > 0 ? (i - r) / u : 0;
      (n.push([OF(o, c, e), OF(s, l, e)]), (i += t));
    }
    r += u;
  }
  return n;
}
function gI(e, t) {
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
      Math.ceil(Math.hypot(i[e + 1][0] - i[e][0], i[e + 1][1] - i[e][1]) / 0.1),
    );
    for (let r = 0; r < t; r++)
      n.push(mI(i[e - 1], i[e], i[e + 1], i[e + 2], r / t));
  }
  n.push(e[r]);
  let a = hI(n, dI),
    o = Math.round(t / dI);
  if (o > 0) {
    let e = (e) =>
        fI(
          a.map((t) => t[e]),
          o,
          3 * o,
        ),
      t = e(0),
      n = e(1);
    a = hI(
      Array.from(t, (e, t) => [e, n[t]]),
      dI,
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
    l[e] = Math.atan2(r, i) / (12 * dI);
  }
  let u = fI(l, 8, 16, 1, !1);
  for (let e = 0; e < c; e++) s[e].k = u[e];
  return s;
}
