// assets/index-gCVK5XnX 21 — math
// Lines 54198-54530 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function SG(e) {
  let t = new M(),
    n = 1.2,
    r = 3;
  for (let i = 0; i < 20; i++) {
    let i = (n + r) / 2;
    (yG(e, i, 1, t), t.y > xG(t.z) ? (n = i) : (r = i));
  }
  return (n + r) / 2;
}
var CG = { theta: 1.49, height: 0.29, width: 0.86, dip: 0.08 };
function wG(e, t) {
  let n = Math.cos(t),
    r = Math.sin(t),
    i = CG.width * e * Math.sign(n) * Math.sqrt(Math.abs(n)),
    a = CG.theta + CG.height * e * Math.sign(r) * Math.sqrt(Math.abs(r));
  return (
    r > 0 && (a += CG.dip * e * r * (i / CG.width) ** 2),
    [Math.PI + i, a]
  );
}
var TG = (e, t) =>
    (((e - Math.PI) / CG.width) ** 4 + ((t - CG.theta) / CG.height) ** 4) **
    0.25,
  EG = 2048,
  DG = 1024,
  OG = 2.6,
  kG = { x0: 32, x1: 2016, y0: 776, y1: 952 },
  AG = { x0: 0, x1: 1984, y0: 964, y1: 1016 },
  jG = [2024, 980],
  MG = [2024, 1008],
  NG = (e, t) => [e / EG, 1 - t / DG],
  PG = (e, t, n) => [e.x0 + t * (e.x1 - e.x0), e.y0 + n * (e.y1 - e.y0)],
  FG = (e, t) => [(e / DF) * EG, (t / OG) * 768],
  IG = 1381914,
  LG = 15921906,
  RG = 15263456,
  zG = 13225168,
  BG = 13938487,
  VG = 1780304,
  HG = 14165532,
  UG = 2764083,
  WG = 15855592,
  GG = 16052972,
  KG = 8,
  qG = {
    jersey: [0, 0.5, 1, 0.5],
    sleeve: [0, 0, 0.25, 0.5],
    pelvis: [0.25, 0.25, 0.5, 0.25],
    thigh: [0.25, 0, 0.5, 0.25],
    sock: [0.75, 0.25, 0.25, 0.25],
    neck: [0.75, 0, 0.25, 0.25],
  },
  JG = { shoulder: 0.1, elbow: 0.55, hip: 0.15, knee: 0.2 },
  YG = 1024,
  XG = { w: 256, h: 192 },
  ZG = `rgb(128,128,128)`,
  QG = (e, t = 1) => e.clone().multiplyScalar(t).getStyle(),
  $G = (e) => `#${e.toString(16).padStart(6, `0`)}`;
function eK(e, t) {
  let { width: n, height: r } = e.canvas,
    i = e.getImageData(0, 0, n, r),
    a = i.data;
  for (let e = 0, i = 0; e < r; e++)
    for (let r = 0; r < n; r++, i += 4) {
      let n = 1 + (((r + e) & 1 ? 1 : -1) * 0.5 + (Math.random() - 0.5)) * t;
      ((a[i] *= n), (a[i + 1] *= n), (a[i + 2] *= n));
    }
  e.putImageData(i, 0, 0);
}
function tK(e, t, n, r, i, a, o) {
  (e.save(),
    e.translate(n, r),
    e.transform(1, 0, -0.18, 1, 0, 0),
    (e.font = `900 ${i}px ${YW}`),
    (e.textAlign = `center`),
    (e.textBaseline = `middle`),
    (e.lineJoin = `round`),
    (e.lineWidth = i * 0.12),
    (e.strokeStyle = o),
    e.strokeText(String(t), 0, 0),
    (e.fillStyle = a),
    e.fillText(String(t), 0, 0),
    e.restore());
}
function nK(e, t, n) {
  let [r, i, a, o] = qG[t],
    s = a * YG,
    c = o * YG;
  (e.save(),
    e.translate(r * YG, (1 - i - o) * YG),
    e.beginPath(),
    e.rect(0, 0, s, c),
    e.clip(),
    n(s, c, (e, t) => [e * s, (1 - t) * c]),
    e.restore());
}
function rK(e, t, n, r, i, a) {
  let o = n(0, i)[1];
  ((e.fillStyle = a), e.fillRect(0, o, t, n(0, r)[1] - o));
}
function iK(e, t, n, r, i) {
  ((e.fillStyle = QG(t.shirt)),
    e.fillRect(0, 0, n, r),
    (e.fillStyle = QG(t.accent)));
  for (let [t, n] of [
    [-0.13, 0.05],
    [-0.06, 0.03],
    [0, 0.016],
  ])
    for (let r of [0, 1]) {
      let a = (e, t) => i(e + r, t);
      (e.beginPath(),
        e.moveTo(...a(t, 0.22)),
        e.lineTo(...a(t + n, 0.22)),
        e.lineTo(...a(t + n + 0.2, 0.78)),
        e.lineTo(...a(t + 0.2, 0.78)),
        e.closePath(),
        e.fill());
    }
  for (let a of [0.25, 0.75])
    ((e.fillStyle = QG(t.trim)),
      e.beginPath(),
      e.moveTo(...i(a - 0.055, 0)),
      e.lineTo(...i(a + 0.055, 0)),
      e.lineTo(...i(a + 0.04, 0.78)),
      e.lineTo(...i(a - 0.07, 0.62)),
      e.closePath(),
      e.fill(),
      (e.fillStyle = QG(t.accent)),
      e.fillRect(...i(a + 0.047, 0.78), 0.012 * n, 0.78 * r));
  (rK(e, n, i, 0.84, 1, QG(t.trim)),
    rK(e, n, i, 0.822, 0.84, QG(t.accent)),
    rK(e, n, i, 0.965, 1, QG(t.accent)),
    rK(e, n, i, 0, 0.05, QG(t.trim)));
  let [a, o] = i(0.5, 0.5);
  (tK(e, t.number, a, o, 170, $G(GG), QG(t.trim, 0.6)),
    (e.font = `900 34px ${YW}`),
    (e.textAlign = `center`),
    (e.fillStyle = QG(t.accent)),
    e.fillText(t.name.toUpperCase().slice(0, KG), a, i(0.5, 0.76)[1]));
}
function aK(e) {
  let t = XW(YG, YG);
  return (
    nK(t, `jersey`, (n, r, i) => iK(t, e, n, r, i)),
    nK(t, `sleeve`, (n, r, i) => {
      let a = JG.shoulder;
      (rK(t, n, i, 0, 1, QG(e.shirt)),
        rK(t, n, i, 0, a + 0.05, QG(e.trim)),
        rK(t, n, i, a + 0.05, a + 0.062, QG(e.accent)),
        rK(t, n, i, a + 0.08, a + 0.087, QG(e.accent)),
        rK(t, n, i, 0.93, 1, QG(e.accent)));
    }),
    nK(t, `pelvis`, (n, r, i) => {
      (rK(t, n, i, 0, 1, QG(e.pants)),
        rK(t, n, i, 0.86, 1, QG(e.pants, 0.8)),
        (t.fillStyle = QG(e.pants, 0.72)));
      for (let e of [0.25, 0.75])
        t.fillRect(...i(e - 0.004, 0.86), n * 0.008, r * 0.86);
    }),
    nK(t, `thigh`, (n, r, i) => {
      (rK(t, n, i, 0, 1, QG(e.pants)),
        (t.fillStyle = QG(e.pants, 0.72)),
        t.fillRect(...i(0.496, 1), n * 0.008, r),
        rK(t, n, i, 0.96, 1, QG(e.pants, 0.85)));
    }),
    nK(t, `sock`, (n, r, i) => {
      let a = JG.knee;
      (rK(t, n, i, 0, 1, QG(e.socks)),
        rK(t, n, i, a + 0.17, a + 0.2, QG(e.accent)),
        rK(t, n, i, a + 0.42, a + 0.45, QG(e.accent)));
    }),
    nK(t, `neck`, (n, r, i) => rK(t, n, i, 0, 1, QG(e.skin))),
    eK(t, 0.05),
    ZW(t)
  );
}
var oK = {
    jersey: [0.78, 1],
    sleeve: [0.78, 1],
    pelvis: [0.88, 0.6],
    thigh: [0.88, 1],
    sock: [0.92, 0],
    neck: [0.62, 0],
  },
  sK = null;
function cK() {
  if (sK) return sK;
  let e = XW(YG, YG);
  return (
    (e.fillStyle = ZG),
    e.fillRect(0, 0, YG, YG),
    uK(e),
    dK(e),
    (sK = ZW(e, !1))
  );
}
function lK(e, t, n, r) {
  let i = () => {
    (e.beginPath(), e.moveTo(...t[0]));
    for (let n = 1; n < t.length - 1; n++)
      e.quadraticCurveTo(
        t[n][0],
        t[n][1],
        (t[n][0] + t[n + 1][0]) / 2,
        (t[n][1] + t[n + 1][1]) / 2,
      );
    e.lineTo(...t[t.length - 1]);
  };
  ((e.lineCap = `round`),
    (e.filter = `blur(${n}px)`),
    (e.lineWidth = n * 3),
    (e.strokeStyle = `rgba(255,255,255,${0.3 * r})`),
    i(),
    e.stroke(),
    (e.filter = `blur(${n * 0.5}px)`),
    (e.lineWidth = n),
    (e.strokeStyle = `rgba(0,0,0,${0.7 * r})`),
    i(),
    e.stroke());
}
function uK(e) {
  let t = HF(31),
    n = (n, r, i, a, o, s, c, l) => {
      for (let u = 0; u < o; u++) {
        let d = a + (u - (o - 1) / 2) * s + (t() - 0.5) * s * 0.5,
          f = r + (i - r) * t() * 0.25,
          p = i - (i - r) * t() * 0.25,
          m = (t() - 0.5) * s * 1.2,
          h = t() * 6,
          g = [];
        for (let e = 0; e <= 6; e++) {
          let t = e / 6;
          g.push(
            n(
              f + (p - f) * t,
              d + m * (t - 0.5) + Math.sin(t * 7 + h) * s * 0.12,
            ),
          );
        }
        lK(
          e,
          g,
          c * (0.7 + 0.6 * t()),
          l * (0.6 + 0.4 * t()) * Math.sin((Math.PI * (u + 0.5)) / o),
        );
      }
    };
  (nK(e, `jersey`, (e, t, r) => {
    n(r, 0.36, 0.64, 0.17, 5, 0.06, 13, 0.9);
    for (let e of [0, 1]) n(r, e - 0.12, e + 0.12, 0.2, 4, 0.06, 11, 0.7);
    for (let e of [0.25, 0.75]) n(r, e - 0.06, e + 0.06, 0.7, 4, 0.035, 8, 0.8);
  }),
    nK(e, `sleeve`, (e, t, r) => {
      for (let e of [0, 1]) n(r, e - 0.3, e + 0.3, JG.elbow, 5, 0.035, 8, 1);
      (n(r, 0.25, 0.75, JG.elbow, 3, 0.05, 8, 0.5),
        n(r, 0, 1, 0.88, 3, 0.025, 6, 0.7),
        n(r, 0.2, 0.8, JG.shoulder + 0.12, 2, 0.05, 9, 0.4));
    }),
    nK(e, `pelvis`, (t, r, i) => {
      for (let t of [-1, 1])
        for (let n of [0, 1])
          for (let r = 0; r < 4; r++) {
            let a = t * (0.04 + r * 0.035) + n;
            lK(
              e,
              [i(a * 0.4 + n * 0.6, 0.08), i(a, 0.35), i(a + t * 0.04, 0.62)],
              9,
              0.8,
            );
          }
      n(i, 0, 1, 0.84, 2, 0.04, 7, 0.4);
    }),
    nK(e, `thigh`, (r, i, a) => {
      for (let t of [0, 1])
        for (let n = 0; n < 4; n++) {
          let r = -0.12 + n * 0.07 + t;
          lK(
            e,
            [a(r, JG.hip - 0.05), a(r + 0.08, 0.35), a(r + 0.18, 0.6)],
            10,
            0.7,
          );
        }
      for (let e of [0.25, 0.75])
        n(a, e - 0.14, e + 0.14, 0.86, 4, 0.04, 9, 0.9);
      for (let n = 0; n < 6; n++) {
        let r = n / 6 + t() * 0.05;
        lK(e, [a(r, 0.3), a(r + 0.02, 0.6), a(r - 0.01, 0.92)], 22, 0.35);
      }
    }),
    nK(e, `sock`, (e, t, r) => {
      for (let e of [0.25, 0.75])
        n(r, e - 0.12, e + 0.12, JG.knee, 3, 0.03, 6, 0.7);
      n(r, 0, 1, 0.92, 3, 0.02, 5, 0.6);
    }));
}
function dK(e) {
  let t = YG,
    n = e.getImageData(0, 0, t, t),
    r = n.data;
  for (let e of Object.keys(qG)) {
    let [n, i, a, o] = qG[e],
      [s, c] = oK[e];
    for (let e = Math.round((1 - i - o) * t); e < Math.round((1 - i) * t); e++)
      for (let i = Math.round(n * t); i < Math.round((n + a) * t); i++) {
        let n = (e * t + i) * 4;
        ((r[n + 1] = s * 255), (r[n + 2] = c * 255));
      }
  }
  e.putImageData(n, 0, 0);
}
function fK(e) {
  let t = XW(XG.w, XG.h);
  return (
    (t.fillStyle = $G(WG)),
    t.fillRect(0, 0, XG.w, XG.h),
    (t.fillStyle = QG(e.accent)),
    t.fillRect(0, 0, XG.w, 30),
    tK(t, e.number, XG.w / 2, 112, 128, $G(IG), $G(IG)),
    eK(t, 0.03),
    ZW(t)
  );
}
var pK = `#f00`,
  mK = `#0f0`,
  hK = `#00f`,
  gK = `#000`,
  _K = 1 - 960 / DG,
  vK = 1.5,
  yK = { cols: 128, rows: 64 },
  bK = null;
