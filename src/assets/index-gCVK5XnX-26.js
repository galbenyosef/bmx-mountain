// assets/index-gCVK5XnX 26 — mul
// Lines 55695-56042 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function nJ(e, t, n, r, i) {
  let a = $q(t.torso),
    o = (e) => t.torso.position.clone().addScaledVector(a.y, e),
    s = (e, t) =>
      e.map(([n, r, i, s, c = 0]) => ({
        at: o(n),
        x: a.x,
        z: a.z,
        w: r,
        front: i,
        back: s,
        seam: c,
        n: t,
        v: (n - e[0][0]) / (e[e.length - 1][0] - e[0][0]),
      })),
    c = (e) => {
      let t = [],
        r = 1;
      for (let n of i) {
        let i = n.share * (1 - X(n.from, n.to, e.distanceTo(n.at)));
        (i > 0 && t.push([n.bone, i]), (r -= i));
      }
      return (t.push([n, r]), t);
    };
  (e.tube(`jersey`, s(Pq, 2.6), c, Dq.torso),
    e.tube(`pelvis`, s(Nq, 2.4), c, Dq.torso, !0),
    e.blob(
      `pelvis`,
      o(-0.085).addScaledVector(a.z, 0.01),
      a.x,
      a.y,
      a.z,
      new M(0.07, 0.05, 0.085),
      0.5,
      0,
      [[n, 1]],
    ));
  let l = Array.from({ length: 6 }, (e, t) => {
    let n = t / 5;
    return qq(
      o(OF(Fq.from, Fq.to, n)).addScaledVector(a.z, 0.004),
      a.x,
      a.z,
      OF(Fq.r[0], Fq.r[1], n),
      n,
    );
  });
  e.tube(
    `neck`,
    l,
    (e, t) => {
      let i = X(1, 4, t);
      return [
        [n, 1 - i],
        [r, i],
      ];
    },
    Dq.neck,
  );
}
var rJ = MV(0),
  iJ = new M(0, 0.118, -0.118),
  aJ = new M(0, 0.14, -1).normalize(),
  oJ = new Yn(16773596),
  sJ = 120,
  cJ = 80,
  lJ = 0.42,
  uJ = 0.75,
  dJ = 3,
  fJ = 70,
  pJ = 0.4,
  mJ = 0.07,
  hJ = 0.012,
  gJ = 40,
  _J = 900,
  vJ = new M(),
  yJ = new M();
function bJ() {
  let e = oB(`lampAt`, `vec3`),
    t = lB.sub(e),
    n = MB(t),
    r = t.div(n),
    i = eV(gB($(0, 1, 0), r)),
    a = gB(r, i),
    o = VB(Z(mJ), n.mul(hJ)),
    s = oV,
    c = new Wy({ transparent: !0, depthWrite: !1, blending: 2 });
  c.positionNode = e
    .add(r.mul(VB(o, 0.12)))
    .add(i.mul(s.x.mul(o)))
    .add(a.mul(s.y.mul(o)));
  let l = yB(oB(`lampAim`, `vec3`), r),
    u = Q(-0.1, 0.35, l)
      .mul(0.15)
      .add(Q(0.55, 0.97, l).mul(0.85)),
    d = yB(FV().sub(0.5), FV().sub(0.5)).mul(4),
    f = bB(d.mul(-90))
      .mul(gJ)
      .add(bB(d.mul(-14)).mul(1.5))
      .add(bB(d.mul(-3)).mul(0.25))
      .mul(Q(1, 0.6, d))
      .mul(u)
      .mul(Q(_J, _J * 0.6, n))
      .mul(rJ);
  return (
    (c.colorNode = RV(gH(oJ).mul(f), HB(f, 1))),
    (c.fog = !1),
    (c.alphaTestNode = Z(0.004)),
    (c.mrtNode = zU()),
    c
  );
}
function xJ(e, t, n) {
  (t.copy(iJ).applyMatrix4(e.matrixWorld),
    n.copy(aJ).transformDirection(e.matrixWorld));
}
var SJ = class {
    light = new Cs(oJ, 0, cJ, lJ, uJ, 1.3);
    constructor() {
      ((this.light.target = new Vn()), this.light.add(this.light.target));
    }
    update(e, t = 1) {
      ((this.light.intensity = sJ * rJ.value * t),
        !(this.light.intensity <= 0) &&
          (xJ(e, this.light.position, vJ),
          this.light.target.position.copy(vJ).multiplyScalar(10),
          this.light.updateMatrixWorld()));
    }
  },
  CJ = class {
    most;
    beams = Array.from({ length: dJ }, () => ({
      lamp: new SJ(),
      head: null,
      k: 0,
    }));
    glare;
    at;
    aim;
    dist = new Map();
    near = [];
    constructor(e) {
      this.most = e;
      let t = QV(-1, 1, -1, 1);
      ((this.at = dH(e, 3).setUsage(ot)),
        (this.aim = dH(e, 3).setUsage(ot)),
        t.setAttribute(`lampAt`, this.at),
        t.setAttribute(`lampAim`, this.aim),
        (t.instanceCount = 0),
        (this.glare = new wi(t, bJ())),
        (this.glare.frustumCulled = !1),
        (this.glare.renderOrder = 6));
    }
    get objects() {
      return [...this.beams.map((e) => e.lamp.light), this.glare];
    }
    warm(e) {
      (yJ.set(0, 0, -6).applyMatrix4(e.matrixWorld),
        this.at.array.set([yJ.x, yJ.y, yJ.z]),
        this.aim.array.set([0, 0, 1]),
        this.show(1));
    }
    update(e, t, n) {
      this.dist.clear();
      let r = 0;
      if (rJ.value > 0) {
        let e = this.at.array,
          i = this.aim.array;
        for (let a of t) {
          if (r === this.most) break;
          (a.updateWorldMatrix(!0, !1),
            xJ(a, yJ, vJ),
            yJ.toArray(e, r * 3),
            vJ.toArray(i, r * 3),
            this.dist.set(a, yJ.distanceTo(n.position)),
            r++);
        }
      }
      (this.show(r), this.follow(e));
    }
    follow(e) {
      let t = this.dist,
        n = this.near;
      n.length = 0;
      for (let [e, r] of t) r < fJ && n.push(e);
      (n.sort((e, n) => t.get(e) - t.get(n)),
        (n.length = Math.min(n.length, dJ)));
      for (let r of this.beams)
        (r.head && !t.has(r.head) && (r.k = 0),
          (r.k = NF(r.k, r.head && n.includes(r.head) ? 1 : 0, e / pJ)),
          r.k === 0 && (r.head = null));
      for (let e of n) {
        let t = this.beams.find((e) => e.head === null);
        t && !this.beams.some((t) => t.head === e) && (t.head = e);
      }
      for (let e of this.beams)
        e.head
          ? e.lamp.update(e.head, e.k * (1 - X(fJ * 0.7, fJ, t.get(e.head))))
          : (e.lamp.light.intensity = 0);
    }
    show(e) {
      cH(this.glare, e, this.at, this.aim);
    }
  },
  wJ = {
    outer: 0.96,
    inner: 0.74,
    back: 0.93,
    front: 1.014,
    lens: 0.99,
    bulge: 0.016,
    nose: 0.4,
    noseWidth: 0.32,
  },
  TJ = (e) =>
    1 -
    wJ.nose *
      Math.exp(
        -((kF(e - Math.PI / 2 + Math.PI, DF) - Math.PI) ** 2) /
          wJ.noseWidth ** 2,
      ),
  EJ = { half: 0.13, k: 1.018, from: 0.92 },
  DJ = {
    theta: 1.12,
    droop: 0.22,
    half: 1.18,
    length: 0.054,
    point: 0.2,
    tilt: 0.68,
    ridge: 0.006,
    curl: 0.004,
    thick: 0.005,
  },
  OJ = { on: [0.022, 1.003], over: [-0.06, 0.97], liner: [0, dG] },
  kJ = 128,
  AJ = 80,
  jJ = 128,
  MJ = 48,
  NJ = 10;
function PJ(e, t, n, r) {
  let i = (e + 1) * (t + 1),
    a = new Float32Array(i * 3),
    o = new Float32Array(i * 3),
    s = new Float32Array(i * 2),
    c = new M(),
    l = new M(),
    u = new M(),
    d = new M(),
    f = new M(),
    p = new M(),
    m = new M(),
    h = (t, n) => n * (e + 1) + t,
    g = (e, t) => t.fromArray(a, e * 3);
  for (let i = 0; i <= t; i++)
    for (let t = 0; t <= e; t++)
      (n(t, i, c).toArray(a, h(t, i) * 3),
        r.uvAt && s.set(r.uvAt(t, i), h(t, i) * 2));
  let _ = [];
  if (r.facing === `column`)
    for (let n = 0; n <= e; n++) {
      let e = new M();
      for (let r = 0; r <= t; r++) e.add(g(h(n, r), l));
      _.push(e.divideScalar(t + 1));
    }
  let v = (e, t, n, r) => (r ? kF(e + t, n) : Math.min(Math.max(e + t, 0), n));
  for (let n = 0; n <= t; n++)
    for (let i = 0; i <= e; i++)
      (g(h(i, n), c),
        r.normal
          ? r.normal(i, n, c, m)
          : (d.subVectors(
              g(h(v(i, 1, e, r.wrapI), n), l),
              g(h(v(i, -1, e, r.wrapI), n), u),
            ),
            f.subVectors(
              g(h(i, v(n, 1, t, r.wrapJ)), l),
              g(h(i, v(n, -1, t, r.wrapJ)), u),
            ),
            m.crossVectors(d, f),
            r.facing === `column`
              ? p.subVectors(c, _[i])
              : r.facing(i, n, c, p),
            m.lengthSq() < 1e-16 && m.copy(p),
            m.normalize(),
            m.dot(p) < 0 && m.negate()),
        m.toArray(o, h(i, n) * 3));
  let y = [];
  for (let n = 0; n < t; n++)
    for (let t = 0; t < e; t++) {
      if (r.keep && !r.keep(t, n)) continue;
      let i = h(t, n),
        a = i + 1,
        s = i + e + 1,
        c = s + 1;
      (d.subVectors(g(c, l), g(i, u)),
        f.subVectors(g(s, l), g(a, u)),
        m.crossVectors(d, f));
      let p = 0;
      for (let e of [i, a, s, c])
        p += m.x * o[e * 3] + m.y * o[e * 3 + 1] + m.z * o[e * 3 + 2];
      p >= 0 ? y.push(i, a, s, a, c, s) : y.push(i, s, a, a, s, c);
    }
  let b = new Xr();
  return (
    b.setAttribute(`position`, new Fr(a, 3)),
    b.setAttribute(`normal`, new Fr(o, 3)),
    b.setAttribute(`uv`, new Fr(s, 2)),
    b.setIndex(y),
    b
  );
}
function FJ(e, t, n, r) {
  let i = 1 - r;
  return [
    i * i * e[0] + 2 * i * r * t[0] + r * r * n[0],
    i * i * e[1] + 2 * i * r * t[1] + r * r * n[1],
  ];
}
var IJ = (e) => (t, n) => {
  let [r, i] = FJ(OJ.on, OJ.over, OJ.liner, t / 6);
  return e(r, i, n);
};
function LJ() {
  let e = new M(),
    t = new M(),
    n = (e) => (e / kJ) * DF,
    r = Array.from({ length: 129 }, (e, t) => SG(n(t))),
    i = (e) => {
      let t = kF(e, kJ),
        n = Math.floor(t);
      return r[n] + (r[n + 1] - r[n]) * (t - n);
    },
    a = (e, t) => i(e) * (t / AJ),
    o = new Float32Array(31347),
    s = new Float32Array(31347);
  for (let r = 0; r <= AJ; r++)
    for (let i = 0; i <= kJ; i++) {
      let c = (r * 129 + i) * 3;
      (yG(n(i), a(i, r), 1, e).toArray(o, c), bG(e, t).toArray(s, c));
    }
  return {
    phiOf: n,
    edgeAt: i,
    thetaOf: a,
    point: (e, t, n) => n.fromArray(o, (t * 129 + e) * 3),
    normal: (e, t, n) => n.fromArray(s, (t * 129 + e) * 3),
  };
}
