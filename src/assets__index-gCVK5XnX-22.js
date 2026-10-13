// assets__index-gCVK5XnX 22 — math
// Lines 54531-54869 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function xK(e, t, n) {
  if (!bK) {
    bK = new Float32Array((yK.cols + 1) * (yK.rows + 1));
    for (let e = 0; e <= yK.rows; e++)
      for (let t = 0; t <= yK.cols; t++)
        bK[e * (yK.cols + 1) + t] = vG(
          gG((t / yK.cols) * DF, (e / yK.rows) * OG, n),
        );
  }
  let r = kF(e / DF, 1) * yK.cols,
    i = Math.min(Math.max(t / OG, 0), 1) * yK.rows,
    a = Math.min(Math.floor(r), yK.cols - 1),
    o = Math.min(Math.floor(i), yK.rows - 1),
    s = r - a,
    c = i - o,
    l = (e, t) => bK[(o + t) * (yK.cols + 1) + a + e],
    u =
      (l(0, 0) * (1 - s) + l(1, 0) * s) * (1 - c) +
      (l(0, 1) * (1 - s) + l(1, 1) * s) * c;
  return gG(e, t, n).multiplyScalar(u).add(uG);
}
function SK(e, t = 512) {
  let n = new Float32Array(t + 1),
    r = new M();
  for (let i = 0; i <= t; i++) {
    let a = (i / t) * DF,
      o = 0.02,
      s = OG;
    for (let t = 0; t < 16; t++) {
      let t = (o + s) / 2;
      e(xK(a, t, r)) > 0 ? (o = t) : (s = t);
    }
    n[i] = (o + s) / 2;
  }
  return n;
}
function CK(e, t, n, r) {
  let i = t.length - 1;
  ((e.fillStyle = r), e.beginPath());
  for (let n = 0; n <= i; n++) e.lineTo((n / i) * EG, (t[n] / OG) * 768);
  for (let t = i; t >= 0; t--)
    e.lineTo((t / i) * EG, n ? (n[t] / OG) * 768 : 768);
  (e.closePath(), e.fill());
}
var wK = { axis: 0, sign: -1 },
  TK = { axis: 0, sign: 1 },
  EK = { axis: 1, sign: 1 },
  DK = { axis: 2, sign: -1 },
  OK = { axis: 2, sign: 1 },
  kK = [
    [2, 1],
    [0, 2],
    [0, 1],
  ],
  AK = (e, t) =>
    e.axis === 0
      ? [{ axis: 0, sign: -e.sign }, t]
      : [e, t.map(([e, t]) => [-e, t])];
function jK(e, t, n) {
  let r = [0, 0, 0],
    [i, a] = kK[e.axis];
  ((r[i] = t), (r[a] = n));
  let o = uG.getComponent(e.axis),
    s = (t) => ((r[e.axis] = t), hG(r[0], r[1], r[2]));
  if (s(o) >= 0) return null;
  let c = o,
    l = e.sign * 0.35;
  for (let e = 0; e < 18; e++) {
    let e = (c + l) / 2;
    s(e) < 0 ? (c = e) : (l = e);
  }
  return ((r[e.axis] = (c + l) / 2), _G(r[0], r[1], r[2]));
}
function MK(e, t) {
  let n = [];
  for (let r = 0; r < t.length; r++) {
    let [i, a] = t[r],
      [o, s] = t[(r + 1) % t.length],
      c = Math.max(1, Math.ceil(Math.hypot(o - i, s - a) / 0.0015));
    for (let t = 0; t < c; t++) {
      let r = jK(e, i + ((o - i) * t) / c, a + ((s - a) * t) / c);
      if (!r) continue;
      let l = FG(...r);
      (n.length && (l[0] += Math.round((n[n.length - 1][0] - l[0]) / EG) * EG),
        n.push(l));
    }
  }
  return n;
}
function NK(e, t, n) {
  let r = Math.min(...t),
    i = Math.max(...t);
  for (let t of [-EG, 0, EG])
    i + t < 0 ||
      r + t > 2048 ||
      (e.save(), e.translate(t, 0), n(), e.restore());
}
function PK(e, t, n, r, i) {
  let a = Math.atan2(r - t, n - e),
    o = [];
  for (let e = 0; e <= 12; e++) {
    let t = a - Math.PI / 2 + (e / 12) * Math.PI;
    o.push([n + Math.cos(t) * i, r + Math.sin(t) * i]);
  }
  for (let n = 0; n <= 12; n++) {
    let r = a + Math.PI / 2 + (n / 12) * Math.PI;
    o.push([e + Math.cos(r) * i, t + Math.sin(r) * i]);
  }
  return o;
}
function FK(e, t, n, r, i, a, o) {
  let s = 0.002,
    c = jK(t, n, r),
    l = jK(t, n + s, r),
    u = jK(t, n, r + s);
  if (!c || !l || !u) return;
  let d = FG(...c),
    f = (e) => [e[0] + Math.round((d[0] - e[0]) / EG) * EG, e[1]],
    p = f(FG(...l)),
    m = f(FG(...u)),
    h = [(p[0] - d[0]) / s / 1e3, (p[1] - d[1]) / s / 1e3],
    g = [(m[0] - d[0]) / s / 1e3, (m[1] - d[1]) / s / 1e3],
    _ = i[0] * h[0] + i[1] * g[0],
    v = i[0] * h[1] + i[1] * g[1],
    y = -(a[0] * h[0] + a[1] * g[0]),
    b = -(a[0] * h[1] + a[1] * g[1]);
  NK(e, [d[0] - 200, d[0] + 200], () => {
    (e.save(), e.transform(_, v, y, b, d[0], d[1]), o(), e.restore());
  });
}
var IK = `BMX MOUNTAIN`;
function LK(e, t) {
  ((e.font = `italic 900 ${t}px ${YW}`),
    (e.textAlign = `center`),
    (e.textBaseline = `middle`));
}
function RK(e, t) {
  (LK(e, t),
    (e.lineJoin = `round`),
    (e.lineWidth = t * 0.22),
    (e.strokeStyle = mK),
    e.strokeText(IK, 0, 0),
    (e.fillStyle = hK),
    e.fillText(IK, 0, 0));
}
function zK(e, t) {
  let n = t / 20;
  e.beginPath();
  for (let [t, r] of [
    [-10, 6],
    [-3.5, -6],
    [0.5, -0.5],
    [4, -4],
    [10, 6],
  ])
    e.lineTo(t * n, r * n);
  (e.closePath(),
    (e.lineJoin = `round`),
    (e.lineWidth = 2.4 * n),
    (e.strokeStyle = mK),
    e.stroke(),
    (e.fillStyle = hK),
    e.fill());
}
var BK = (e) => -0.088 + 0.03 * X(-0.12, 0.16, e),
  VK = (e) => -0.088 + 0.085 * X(-0.17, 0.15, e),
  HK = (e) => 0.016 * Math.sin(Math.PI * Y((e + 0.15) / 0.29)) ** 0.8,
  UK = [
    [EK, PK(-0.026, -0.088, -0.03, -0.038, 0.0055)],
    [EK, PK(-0.031, -0.014, -0.033, 0.042, 0.0055)],
    [EK, PK(-0.064, -0.07, -0.074, -0.02, 0.005)],
    [OK, PK(-0.014, 0.041, -0.04, 0.043, 0.0042)],
    [OK, PK(-0.05, 0.044, -0.068, 0.05, 0.0038)],
    [
      DK,
      [
        [0, -0.068],
        [-0.017, -0.069],
        [-0.012, -0.094],
        [0, -0.095],
      ],
    ],
    [
      DK,
      [
        [-0.03, -0.071],
        [-0.041, -0.073],
        [-0.036, -0.098],
        [-0.025, -0.096],
      ],
    ],
  ];
function WK(e) {
  let t = (e) => SK((t) => t.y - e(t.z)),
    n = (n, r, i) => CK(e, t(r), t(n), i);
  (CK(e, t(BK), null, pK),
    n(
      (e) => BK(e) + 0.0025,
      (e) => BK(e) + 0.0055,
      mK,
    ),
    n(
      (e) => VK(e) - HK(e),
      (e) => VK(e) + HK(e),
      pK,
    ));
  let r = (e) => 0.0014 * Math.min(1, HK(e) / 0.006);
  (n(
    (e) => VK(e) - HK(e) - 0.0035 - r(e),
    (e) => VK(e) - HK(e) - 0.0035 + r(e),
    mK,
  ),
    FK(
      e,
      wK,
      0.035,
      0.045,
      [Math.cos(0.1), Math.sin(0.1)],
      [-Math.sin(0.1), Math.cos(0.1)],
      () => RK(e, 11),
    ),
    FK(
      e,
      TK,
      0.035,
      0.045,
      [-Math.cos(0.1), -Math.sin(0.1)],
      [-Math.sin(0.1), Math.cos(0.1)],
      () => RK(e, 11),
    ),
    FK(e, OK, 0, -0.033, [1, 0], [0, 1], () => RK(e, 9)),
    FK(e, DK, 0, -0.05, [-1, 0], [0, 1], () => zK(e, 22)));
}
function GK(e) {
  let t = kG,
    n = (e) => t.y0 + e * (t.y1 - t.y0);
  ((e.fillStyle = mK),
    e.fillRect(t.x0, n(0.7), t.x1 - t.x0, n(0.75) - n(0.7)),
    (e.fillStyle = pK),
    e.fillRect(t.x0, n(0.78), t.x1 - t.x0, t.y1 - n(0.78)),
    e.save(),
    e.translate((t.x0 + t.x1) / 2, n(0.42)),
    e.scale(7, 2),
    RK(e, 9),
    e.restore());
  let r = AG;
  ((e.fillStyle = mK),
    e.fillRect(r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0),
    (e.fillStyle = pK));
  for (let t of [r.y0 + 4, r.y1 - 8]) e.fillRect(r.x0, t, r.x1 - r.x0, 4);
  (LK(e, 12), (e.fillStyle = hK));
  for (let t = r.x0 + 220; t < r.x1; t += 440)
    (e.save(),
      e.translate(t, (r.y0 + r.y1) / 2),
      e.scale(3.25, 1.53),
      e.fillText(IK, 0, 0),
      e.restore());
  ((e.fillStyle = mK),
    e.fillRect(jG[0] - 8, jG[1] - 8, 16, 16),
    (e.fillStyle = pK),
    e.fillRect(MG[0] - 8, MG[1] - 8, 16, 16));
}
function KK(e) {
  let t = XW(EG / 2, DG / 2);
  ((t.fillStyle = ZG),
    t.fillRect(0, 0, EG / 2, DG / 2),
    t.scale(0.5, 0.5),
    (e.globalCompositeOperation = `destination-out`));
  for (let [n, r] of UK)
    for (let [i, a] of [[n, r], AK(n, r)]) {
      let n = MK(i, a),
        r = n.map((e) => e[0]),
        o = (e) => {
          e.beginPath();
          for (let [t, r] of n) e.lineTo(t, r);
          e.closePath();
        };
      (NK(t, r, () => {
        for (let e = 7; e >= 1; e--)
          (o(t),
            (t.lineWidth = e * 2.2),
            (t.strokeStyle = `rgba(255,255,255,0.1)`),
            t.stroke());
      }),
        NK(e, r, () => {
          (o(e), e.fill());
        }));
    }
  e.beginPath();
  for (let t = 0; t <= 256; t++) e.lineTo(...FG(...wG(1, (t / 256) * DF)));
  return (e.closePath(), e.fill(), t);
}
var qK = null;
function JK() {
  let e = XW(EG, DG);
  ((e.fillStyle = gK), e.fillRect(0, 0, EG, DG), WK(e), GK(e));
  let t = KK(e);
  return { design: ZW(e, !1), height: ZW(t, !1) };
}
function YK(e) {
  let t = (qK ??= JK()),
    n = DV(t.design),
    r = new iS(),
    i = UB(MV(e.helmet), MV(e.stripe), n.r);
  ((i = UB(i, fB(IG), n.g)), (r.colorNode = UB(i, fB(LG), n.b)));
  let a = FV().y.lessThan(_K);
  return (
    (r.roughnessNode = bV(a, Z(0.85), Z(0.34))),
    (r.clearcoatNode = bV(a, Z(0), Z(1))),
    (r.clearcoatRoughnessNode = Z(0.07)),
    (r.normalNode = cB(DV(t.height).r, Z(vK))),
    (r.maskNode = n.a.greaterThan(0.5)),
    (r.maskShadowNode = r.maskNode),
    r
  );
}
var XK = (e, t) => t[Math.floor(e() * t.length)],
  ZK = (e) => new Yn(e),
  QK = [
    { shirt: 13115932, accent: LG, helmet: LG, frame: IG },
    { shirt: 1925080, accent: 15905039, helmet: 1925080, frame: zG },
    { shirt: IG, accent: 14217743, helmet: 14217743, frame: 14217743 },
    { shirt: RG, accent: HG, helmet: HG, frame: RG },
    { shirt: 2068298, accent: LG, helmet: IG, frame: 2068298 },
    { shirt: 16738847, accent: IG, helmet: 16738847, frame: IG },
    { shirt: 6959800, accent: 2078409, helmet: 2078409, frame: 6959800 },
    { shirt: 1287080, accent: 16734751, helmet: RG, frame: 16734751 },
    { shirt: 15909391, accent: IG, helmet: IG, frame: 15909391 },
    { shirt: 14692458, accent: RG, helmet: 14692458, frame: RG },
    { shirt: VG, accent: 16742943, helmet: 16742943, frame: VG },
    { shirt: 6272752, accent: IG, helmet: LG, frame: 6272752 },
    { shirt: 8002088, accent: BG, helmet: BG, frame: 8002088 },
    { shirt: 8048954, accent: VG, helmet: VG, frame: 8048954 },
    { shirt: 6975352, accent: HG, helmet: IG, frame: HG },
    { shirt: 9132587, accent: 15786688, helmet: 15786688, frame: 9132587 },
  ];
function $K(e) {
  return GF(e) % QK.length;
}
