// assets/index-gCVK5XnX 27 — math
// Lines 56043-56368 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var RJ = ({ phiOf: e, thetaOf: t, point: n, normal: r }) =>
  PJ(kJ, AJ, n, {
    normal: (e, t, n, i) => r(e, t, i),
    uvAt: (n, r) => NG(...FG(e(n), t(n, r))),
    keep: (n, r) => TG(e(n + 0.5), (t(n, r) + t(n + 1, r + 1)) / 2) > 0.9,
  });
function zJ({ phiOf: e, edgeAt: t, point: n, normal: r }) {
  let i = (e, t, r) =>
      n(e * 2, t * 2, r)
        .sub(uG)
        .multiplyScalar(dG)
        .add(uG),
    a = [1, -1].map((e) =>
      PJ(kJ / 2, AJ / 2, i, {
        normal: (t, n, i, a) => r(t * 2, n * 2, a).multiplyScalar(e),
      }),
    );
  a.push(
    PJ(kJ, 6, (n, r, i) => IJ((r, i, a) => yG(e(n), t(n) - r, i, a))(r, i), {
      facing: `column`,
      wrapI: !0,
    }),
  );
  let o = (e, t) => {
    let [n, r] = wG(1, e - 0.001),
      [i, a] = wG(1, e + 0.001),
      [o, s] = wG(1, e),
      c = Math.hypot(i - n, a - r) || 1;
    return [o + ((a - r) / c) * t, s - ((i - n) / c) * t];
  };
  return (
    a.push(
      PJ(
        jJ,
        6,
        (e, t, n) => IJ((t, n, r) => yG(...o((e / jJ) * TAU, t), n, r))(t, n),
        { facing: `column`, wrapI: !0 },
      ),
    ),
    a
  );
}
function BJ() {
  let e = wJ,
    t = (e, t, n, r) => yG(...wG(e * TJ(t), t), n, r),
    n = (e.outer + e.inner) / 2,
    r = (e.back + e.front) / 2,
    i = PJ(
      jJ,
      16,
      (i, a, o) => {
        let s = (i / jJ) * TAU,
          c = (a / 16) * TAU,
          l = Math.cos(c),
          u = Math.sin(c),
          d = n + ((e.outer - e.inner) / 2) * Math.sign(l) * Math.abs(l) ** 0.6,
          f = r + ((e.front - e.back) / 2) * Math.sign(u) * Math.abs(u) ** 0.6;
        return t(d, s, f, o);
      },
      { facing: `column`, wrapI: !0, wrapJ: !0 },
    ),
    a = e.inner + 0.04,
    o = PJ(
      jJ,
      6,
      (n, r, i) => {
        let o = (r / 6) * a;
        return t(o, (n / jJ) * TAU, e.lens + e.bulge * (1 - (o / a) ** 2), i);
      },
      { facing: (e, t, n, r) => r.subVectors(n, uG), wrapI: !0 },
    ),
    s = CG.width * EJ.from,
    c = (e) => Math.PI + s + (e / 64) * (TAU - 2 * s);
  return {
    frame: i,
    lens: o,
    strap: PJ(
      64,
      2,
      (e, t, n) => yG(c(e), CG.theta + (t - 1) * EJ.half, EJ.k, n),
      {
        facing: (e, t, n, r) => r.subVectors(n, uG),
        uvAt: (e, t) => NG(...PG(AG, e / 64, t / 2)),
      },
    ),
  };
}
function VJ() {
  let e = DJ,
    t = new M(),
    n = (e) => (e / MJ) * 2 - 1,
    r = new Map(),
    i = (t) => {
      let i = r.get(t);
      if (!i) {
        let a = yG(
            Math.PI + n(t) * e.half,
            e.theta + e.droop * n(t) ** 2,
            1,
            new M(),
          ),
          o = bG(a, new M()),
          s = new M(o.x, 0, o.z)
            .normalize()
            .multiplyScalar(0.35)
            .add(KV)
            .normalize()
            .multiplyScalar(Math.cos(e.tilt))
            .addScaledVector(GV, Math.sin(e.tilt)),
          c = 1 - Math.abs(n(t)),
          l =
            e.length *
            Math.sqrt(Math.max(0, 1 - n(t) ** 8)) *
            (1 + e.point * c * c);
        r.set(t, (i = { root: a, n: o, out: s, len: l, c }));
      }
      return i;
    },
    a = (t, n, r) => {
      let { root: a, n: o, out: s, len: c, c: l } = i(t);
      return r
        .copy(a)
        .addScaledVector(o, 0.002)
        .addScaledVector(s, c * n)
        .addScaledVector(
          GV,
          e.curl * n * n + e.ridge * l * l * Math.sin(n * Math.PI * 0.6),
        );
    },
    o = (e, t, n) => {
      let r = a(Math.max(0, e - 0.25), t, new M()).sub(
          a(Math.min(MJ, e + 0.25), t, new M()),
        ),
        i = a(e, Math.min(1, t + 0.02), new M()).sub(
          a(e, Math.max(0, t - 0.02), new M()),
        );
      return (n.crossVectors(r, i).normalize(), n.y < 0 ? n.negate() : n);
    },
    s = (r) => (i, s, c) => {
      let l = s / NJ,
        u =
          (e.thick / 2) *
          Math.sqrt(Math.max(0, 1 - n(i) ** 8)) *
          Math.sqrt(Math.max(0, 1 - l ** 6));
      return a(i, l, c).addScaledVector(o(i, l, t), r * u);
    },
    c = (e) => (t, n, r, i) => o(t, n / NJ, i).multiplyScalar(e),
    l = PJ(MJ, NJ, s(1), {
      facing: c(1),
      uvAt: (e, t) => NG(...PG(kG, e / MJ, t / NJ)),
    }),
    u = PJ(MJ, NJ, s(-1), { facing: c(-1), uvAt: () => NG(...jG) }),
    d = [];
  for (let e of [MJ * 0.1, MJ * 0.9]) {
    let t = 0.2,
      n = s(1)(e, t * NJ, new M()),
      r = o(e, t, new M()),
      i = a(Math.min(MJ, e + 1), t, new M())
        .sub(a(Math.max(0, e - 1), t, new M()))
        .normalize(),
      c = new M().crossVectors(i, r).normalize();
    d.push(
      new jo(0.0058, 14, 5, 0, TAU, 0, Math.PI / 2)
        .scale(1, 0.4, 1)
        .applyMatrix4(new N().makeBasis(i, r, c).setPosition(n)),
    );
  }
  return { top: l, under: u, screws: mergeGeometry(d) };
}
function HJ() {
  let e = LJ(),
    { frame: t, lens: n, strap: r } = BJ(),
    { top: i, under: a, screws: o } = VJ();
  return {
    paint: mergeGeometry([RJ(e), r, i, a]),
    rubber: mergeGeometry(zJ(e)),
    frame: t,
    lens: n,
    screws: o,
  };
}
var UJ = null,
  WJ = null;
function GJ() {
  let e = new fa(0.019, 0.022, 0.03, 14)
      .rotateX(-Math.PI / 2)
      .translate(iJ.x, iJ.y, iJ.z + 0.015),
    t = new nS({ roughness: 0.4, metalness: 0.3 });
  return (
    (t.colorNode = tslVec3(0.04, 0.04, 0.045)),
    (t.emissiveNode = tslVec3(1, 0.93, 0.8)
      .mul(rJ.mul(14))
      .mul(tslSmoothstep(0.6, 0.95, YB.z.negate()))),
    { geometry: e, material: t }
  );
}
function KJ(e) {
  let t = (UJ ??= HJ()),
    n = new Hn();
  return (
    n.add(
      addMesh(t.paint, e.paint),
      addMesh(t.rubber, e.rubber, !1),
      addMesh(t.frame, e.goggles, !1),
      addMesh(t.lens, e.lens, !1),
      addMesh(t.screws, e.chrome, !1),
      addMesh((WJ ??= GJ()).geometry, WJ.material, !1),
    ),
    n
  );
}
var qJ = 0.54,
  JJ = 0.19,
  YJ = 0.48000000000000004,
  LIMB_LENGTHS = { upper: 0.29, fore: 0.25, thigh: 0.45, shin: 0.44 },
  ZJ = LIMB_LENGTHS.upper + LIMB_LENGTHS.fore,
  QJ = { out: 0.1, drop: 0.03 },
  $J = 0.07,
  eY = 0.0165 + 0.0105,
  tY = new M(0, 0.051000000000000004, 0.1),
  nY = {
    arm: 1.05,
    elbow: 0.75,
    armOut: 0.2,
    thigh: 1.2,
    knee: 1.05,
    legOut: 0.06,
  },
  rY = new M(),
  iY = new M(),
  aY = new M(),
  oY = new M(),
  sY = new M(),
  cY = new M(),
  lY = new N(),
  uY = new M(),
  dY = new M(),
  fY = new M(),
  pY = new M(),
  mY = new M(),
  hY = new M(),
  gY = new M(),
  _Y = new M(),
  vY = new M(),
  yY = new M(),
  bY = new M(),
  xY = new M();
function SY(e, t, n) {
  let r = [],
    i = e.length - 1;
  for (let a = 0; a < i; a++) {
    let o = t + (n - t) * (a / i),
      s = t + (n - t) * ((a + 1) / i);
    (r.push(makeTube(e[a], e[a + 1], o, s, 10)),
      r.push(new jo(s, 10, 6).translate(e[a + 1].x, e[a + 1].y, e[a + 1].z)));
  }
  return mergeGeometry(r);
}
function CY(e) {
  let t = [],
    n = (e, t, n = eY) => new M(e, Math.cos(t) * n, -Math.sin(t) * n),
    r = Math.PI / 180;
  [-0.028, -0.0095, 0.0095, 0.027].forEach((e, i) => {
    let a = [1, 1.06, 1, 0.86][i],
      o = [];
    for (let t = 0; t <= 6; t++) o.push(n(e, (38 + (t / 6) * 205 * a) * r));
    (t.push(SY(o, 0.0105, 0.0085)),
      t.push(new jo(0.0115, 10, 8).translate(...n(e, 38 * r).toArray())));
  });
  let i = new jo(1, 16, 10).scale(0.05, 0.016, 0.05);
  (i.rotateX(-0.45),
    i.translate(0, 0.033, 0.026),
    t.push(i),
    t.push(
      new jo(1, 12, 8)
        .scale(0.045, 0.02, 0.035)
        .rotateX(0.9)
        .translate(0, -0.004, 0.03900000000000001),
    ));
  let a = [];
  for (let e = 0; e <= 5; e++) {
    let t = e / 5;
    a.push(
      n(-0.04 + t * 0.012, (130 + t * 95) * r, 0.029000000000000005).add(
        new M(0, 0, 0.01 * (1 - t)),
      ),
    );
  }
  (t.push(SY(a, 0.0125, 0.0095)),
    t.push(
      new fa(0.036, 0.034, 0.05, 14)
        .rotateX(Math.PI / 2 - 0.5)
        .translate(0, 0.045, 0.075),
    ));
  let o = aH(mergeGeometry(t));
  if (e) {
    o.scale(-1, 1, 1);
    let e = o.index;
    for (let t = 0; t < e.count; t += 3) {
      let n = e.getX(t + 1);
      (e.setX(t + 1, e.getX(t + 2)), e.setX(t + 2, n));
    }
  }
  return o;
}
function wY(e) {
  let t = new Hn();
  return (
    t.add(
      addMesh(
        mergeGeometry([
          new jo(1, 18, 12, 0, TAU, 0, Math.PI * 0.62)
            .rotateX(Math.PI / 2)
            .scale(0.072, 0.11, 0.06)
            .translate(0, 0.045, 0.02),
          new jo(1, 16, 12, 0, TAU, 0, Math.PI * 0.55)
            .rotateX(Math.PI / 2)
            .scale(0.058, 0.14, 0.045)
            .translate(0, 0.2, 0.025),
        ]),
        e.pads,
      ),
    ),
    t
  );
}
