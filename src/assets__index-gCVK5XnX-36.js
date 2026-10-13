// assets__index-gCVK5XnX 36 — math
// Lines 59034-59188 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function j1(e) {
  let t = e.trail,
    n = HF(131),
    r = [];
  for (let i = v1; i < t.length - 30; i += 4)
    for (let a of [-1, 1]) {
      let o = a * (16 + n() * 40),
        s = n() < 0.5,
        c = (n() - 0.5) * 0.8;
      t.pointAt(i, T1, o);
      let { x: l, z: u } = T1;
      if (
        !P1(e, l, u) ||
        !F1(e, i, l, u) ||
        r.some((e) => Math.hypot(e.x - l, e.z - u) < y1)
      )
        continue;
      t.pointAt(i - C1[C1.length - 1], T1);
      let d = M1(e, l, u, MF(T1.tx, T1.tz) + (s ? Math.PI : 0) + c),
        f = I1(e, l, u, d, MF(-T1.tz * a, T1.tx * a));
      r.push({ x: l, z: u, yaw: d, route: f, open: N1(e, f) });
    }
  return r;
}
function M1(e, t, n, r) {
  let i = e.height(t + 1, n) - e.height(t - 1, n),
    a = e.height(t, n + 1) - e.height(t, n - 1);
  if (Math.hypot(i, a) <= 0.05) return r;
  let o = MF(-a, i);
  return Math.abs(AF(o - r)) < Math.PI / 2 ? o : o + Math.PI;
}
function N1(e, t) {
  let n = 0;
  for (
    ;
    n < g1 && e.surface(t[(n / _1) * 2], t[(n / _1) * 2 + 1]) === uz.Grass;
  )
    n += _1;
  return n;
}
function P1(e, t, n) {
  let r = e.surface(t, n);
  return (r !== uz.Grass && r !== uz.Forest) ||
    e.slope(t, n) > 0.5 ||
    e.trailDistance(t, n, 60) < 14 ||
    e.liftClearance(t, n) < 6 ||
    e.stuntClearance(t, n) < 12 ||
    e.creekClearance(t, n) < 4
    ? !1
    : !e.obstacleAt(t, e.height(t, n) + 0.9, n, 2.5);
}
function F1(e, t, n, r) {
  let i = e.height(n, r) + 0.9;
  for (let a of C1) {
    e.trail.pointAt(t - a, E1);
    let o = e.height(E1.x, E1.z) + 1.7,
      s = Math.hypot(n - E1.x, r - E1.z);
    for (let t = 2; t < s - 3; t += 1.5) {
      let a = 1 - t / s,
        c = OF(E1.x, n, a),
        l = OF(E1.z, r, a),
        u = OF(o, i, a),
        d =
          t < Math.min(s * 0.1, 4) - 0.5
            ? 0.2
            : e.surface(c, l) === uz.Grass
              ? b1
              : 0.3;
      if (e.height(c, l) > u - d || e.obstacleAt(c, u, l, 1.8)) return !1;
    }
  }
  return !0;
}
function I1(e, t, n, r, i) {
  let a = Math.round(g1 / _1) + 1,
    o = new Float32Array(362),
    s = r;
  for (let r = 0; r < a; r++) {
    ((o[r * 2] = t), (o[r * 2 + 1] = n));
    let a = r * _1 < 3 ? 0.55 : 0.16,
      c = i + Math.sin(r * 0.07) * 0.35;
    for (let r of [2.5, 5]) {
      let i = t - Math.sin(s) * r,
        a = n - Math.cos(s) * r,
        o = e.obstacleAt(i, e.height(i, a) + 1, a, 0.9);
      if (o) {
        c = MF(-Math.sin(s) + o.nx * 2, -Math.cos(s) + o.nz * 2);
        break;
      }
    }
    (e.trailDistance(t, n, 30) < 16 && (c = i),
      (s += Y(AF(c - s), -a, a)),
      (t -= Math.sin(s) * _1),
      (n -= Math.cos(s) * _1));
  }
  return o;
}
var L1 = (function (e) {
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
  R1 = [0, 1.17, -0.745],
  z1 = 0.6,
  B1 = Math.cos(z1),
  V1 = Math.sin(z1),
  H1 = (e, t, n = 0) => [n, R1[1] - e * V1 + t * B1, R1[2] - (e * B1 + t * V1)],
  U1 = (e) => H1(0.035, 0.085, e * 0.038),
  W1 = H1(0.115, 0.03),
  G1 = [
    [0, 0, 0, -1],
    [0, 0.76, 0, 0],
    [0, 0.88, -0.42, 1],
    [...R1, 2],
    [...U1(-1), 3],
    [...U1(1), 3],
    [0, 0.89, 0.62, 1],
  ],
  K1 = [
    { front: !0, side: -1 },
    { front: !0, side: 1 },
    { front: !1, side: -1 },
    { front: !1, side: 1 },
  ],
  q1 = 0.078,
  J1 = 0.085,
  Y1 = [
    [0.36, 0.78],
    [0.38, 0.31],
    [0.386, 0.082],
  ],
  X1 = [
    [-0.36, 0.8],
    [-0.49, 0.405],
    [-0.44, 0.084],
  ],
  Z1 = (function (e) {
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
