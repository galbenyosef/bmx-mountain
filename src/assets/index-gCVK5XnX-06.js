// assets/index-gCVK5XnX 06 — math
// Lines 48615-48745 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function NL(e, t) {
  let n = [],
    r = HF(63),
    i = { x: 0, z: 0, tx: 0, tz: 0 };
  for (let a of e.features)
    if (a.rocks && a.gap)
      for (let o = a.gap[0] + 0.8; o < a.gap[1] - 0.8; o += 1.6 + r() * 1.8) {
        let a = (r() * 2 - 1) * (xI + 1),
          s = r(),
          c = r() * DF,
          l = r();
        (e.pointAt(o, i, a),
          n.push({
            x: i.x,
            y: t.height(i.x, i.z),
            z: i.z,
            size: 0.45 + s * 0.6,
            rot: c,
            seed: l,
          }));
      }
  return n;
}
function PL(e, t) {
  let n = [],
    r = HF(71),
    i = { x: 0, z: 0, tx: 0, tz: 0 };
  for (let a = 2; a < e.length; a += 2 + r() * 6) {
    let o = (r() < 0.5 ? -1 : 1) * (xI - 0.5 + r() * (SI - xI)),
      s = 0.18 + r() ** 2 * 0.35,
      c = r() * DF,
      l = r();
    e.featureAt(a) > 0.05 ||
      (e.pointAt(a, i, o),
      n.push({
        x: i.x,
        y: t.height(i.x, i.z) - s * 0.2,
        z: i.z,
        size: s,
        rot: c,
        seed: l,
      }));
  }
  return n;
}
function FL(e, t) {
  let n = [],
    r = HF(57),
    i = { x: 0, z: 0, tx: 0, tz: 0 };
  for (let a = 4; a < e.length - 4; a += 1.5 + r() * 3.5) {
    let o = r() < 0.5 ? -1 : 1,
      s = r() < 0.3,
      c = r(),
      l = r(),
      u = r() * DF,
      d = r(),
      f = e.halfWidth(a, o),
      p = o * (s ? c * f * 0.7 : f + 0.2 + c * XI * 0.7);
    e.pointAt(a, i, p);
    let { x: m, z: h } = i;
    t.trailDistance(m, h, 20) < 9.1 ||
      f > 3 ||
      n.push({
        x: m,
        y: t.height(m, h),
        z: h,
        size: (s ? 0.25 : 0.35) + l * l * (s ? 0.45 : 0.9),
        rot: u,
        seed: d,
      });
  }
  return n;
}
function IL(e, t, n, r, i, a) {
  let o = (e) => (e - a) * t,
    s = e[o(i) + Math.min(t - 1, r + 1)] - e[o(i) + Math.max(0, r - 1)],
    c = e[o(Math.min(t - 1, i + 1)) + r] - e[o(Math.max(0, i - 1)) + r];
  return Math.hypot(s, c) / (2 * n);
}
function LL(e, t) {
  let {
      j0: n,
      j1: r,
      n: i,
      cell: a,
      h: o,
      hFrom: s,
      trailDist: c,
      creekDist: l,
      pads: u,
    } = e,
    d = r - n,
    f = {
      cover: new Uint8Array(d * i * 4),
      grass: new Uint8Array(d * i),
      cover2: new Uint8Array(d * i * 4),
    },
    { cover: p, grass: m, cover2: h } = f;
  for (let e = n; e < r; e++) {
    let r = -ZF + e * a;
    for (let d = 0; d < i; d++) {
      let f = -ZF + d * a,
        g = (e - n) * i + d,
        _ = o[(e - s) * i + d],
        v = IL(o, i, a, d, e, s),
        y = c[g],
        b = u[g],
        x = Math.max(1 - X(SI - 1, SI + 5, y), X(0.4, 0.9, b)),
        S = EL(f, r, _, v) * X(-4, 6, t.clearance(f, r)),
        C = OL(f, r, _, v),
        w = kL(f, r, _, v);
      ((p[g * 4] = x * 255),
        (p[g * 4 + 1] = S * 255),
        (p[g * 4 + 2] = C * 255),
        (p[g * 4 + 3] = w * 255),
        (m[g] =
          255 *
          (X(SI + 0.1, SI + 1.6, y) * X(0.3, 1.6, l[g])) *
          (1 - X(0.2, 0.6, b)) *
          (1 - S * 0.75) *
          (1 - X(0.25, 0.6, C)) *
          (1 - X(0.2, 0.5, w)) *
          (1 - X(0.55, 0.9, v))),
        (h[g * 4] = DL(f, r, _) * 255),
        (h[g * 4 + 1] = m[g]),
        (h[g * 4 + 2] = y),
        (h[g * 4 + 3] = 255 * (1 - X(0, 3, l[g]))));
    }
  }
  return f;
}
