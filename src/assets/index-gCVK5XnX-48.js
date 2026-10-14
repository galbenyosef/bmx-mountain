// assets/index-gCVK5XnX 48 — mul
// Lines 63148-63303 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function C3(e, t) {
  let n = new a2();
  (n.copy(S3[e].preset), (n.seed = t), S3[e].tweak(n));
  let r = new o2(n);
  r.generate();
  let i = r.branchGeometry,
    a = r.leafGeometry;
  a.computeBoundingBox();
  let o =
      a.boundingBox.max.y - (a.boundingBox.max.y - a.boundingBox.min.y) * 0.04,
    s = i.getAttribute(`position`);
  for (let e = 0; e < s.count; e++) s.getY(e) > o && s.setY(e, o);
  i.computeBoundingBox();
  let c = Math.min(i.boundingBox.min.y, a.boundingBox.min.y),
    l = 1 / (Math.max(i.boundingBox.max.y, a.boundingBox.max.y) - c);
  for (let e of [i, a]) (e.translate(0, -c, 0), e.scale(l, l, l));
  a.computeBoundingBox();
  let u = a.boundingBox.getCenter(new M()),
    d = a.getAttribute(`position`),
    f = a.getAttribute(`normal`),
    p = new M(),
    m = new M(),
    h = new M(1, 0.6, 1);
  for (let e = 0; e < d.count; e++)
    (p.fromBufferAttribute(d, e).sub(u).multiply(h).normalize(),
      m.fromBufferAttribute(f, e),
      m.dot(p) < 0 && m.negate(),
      m.lerp(p, 0.7).normalize(),
      f.setXYZ(e, m.x, m.y, m.z));
  let g = 0;
  for (let e of [i, a]) {
    let t = e.getAttribute(`position`);
    for (let e = 0; e < t.count; e++)
      g = Math.max(g, Math.hypot(t.getX(e), t.getZ(e)));
  }
  return { bark: i, leaves: a, reach: g };
}
function w3(e) {
  let t = new Ns();
  for (let [n, r] of Object.entries(e.attributes)) t.setAttribute(n, r);
  return (t.setIndex(e.index), t);
}
var T3 = oB(`place`, `vec4`),
  E3 = oB(`facing`, `vec4`);
function D3() {
  return qz(() => {
    let e = oV,
      t = E3.x,
      n = E3.y,
      r = T3.w,
      i = $(
        t.mul(e.x).add(n.mul(e.z)),
        r.mul(e.y),
        t.mul(e.z).sub(n.mul(e.x)),
      ).add(T3.xyz);
    cV.assign(i);
    let a = JB;
    YB.assign(
      eV(
        $(
          t.mul(a.x).add(n.mul(a.z)),
          a.y.mul(t.mul(t).add(n.mul(n))).div(r),
          t.mul(a.z).sub(n.mul(a.x)),
        ),
      ),
    );
    let o = DB(E3.z).mul(DF),
      s = e.y.mul(e.y).mul(16),
      c = CV(yW.mul(0.31).add(o)).mul(0.4).add(0.6),
      l = CV(yW.mul(1.3).add(o))
        .add(CV(yW.mul(2.9).add(o.mul(1.7))).mul(0.4))
        .mul(0.012),
      u = CV(yW.mul(1.1).add(o.mul(1.3))).mul(0.008);
    return i.add($(l, 0, u).mul(s).mul(c));
  })();
}
var O3 = MV(new M(1e6, 0, 0)),
  k3 = MV(new M(1e6, 0, 0));
function A3(e) {
  let t = uV,
    n = t.sub(O3),
    r = n.y.clamp(0, 1.7),
    i = MB(n.sub($(0, r, 0))).lessThan(1.3),
    a = DB(t.xz.mul(1.7).floor()).sub(0.5),
    o = jB(
      t.xz
        .add(ZF)
        .div(2)
        .round()
        .clamp(0, oz - 1),
    ),
    s = OV(b$.value, o).b.mul(255),
    c = OV(e, o).r;
  return IV(
    s
      .lessThan(Z(SI + 0.8).add(a.mul(1.4)))
      .and(t.y.sub(c).lessThan(Z(6).add(a.mul(1.2))))
      .or(i)
      .select(Z(0), Z(1)),
  ).greaterThan(0.5);
}
function j3() {
  let e = uV,
    t = k3,
    n = O3.add($(0, 0.9, 0)).sub(t),
    r = e.sub(t).dot(n).div(n.dot(n)).clamp(0, 1);
  return IV(
    MB(e.sub(t.add(n.mul(r))))
      .lessThan(DB(e.xz.mul(2.3).floor()).mul(0.5).add(0.8))
      .select(Z(0), Z(1)),
  ).greaterThan(0.5);
}
function M3() {
  return IV(E3.w).greaterThan(WU().oneMinus().sub(1e-4));
}
function N3() {
  let e = (e, t) => {
      let n = g$(`bark_${e}`, FV().mul(LV(1, 0.5)), x3);
      return { barkColour: n.colour.mul($(...t)), barkNormal: n.normal };
    },
    t = (e, t) => {
      let n = DV(m$(`tex/leaf_${e}.webp`, !0, x3, !1), FV());
      return { leafColour: n.rgb.mul($(...t)), leafAlpha: n.a };
    };
  return [
    {
      ...e(`pine`, [0.75, 0.7, 0.66]),
      ...t(`pine`, [0.55, 0.68, 0.48]),
      glow: 0.5,
    },
    {
      ...e(`birch`, [1, 0.97, 0.9]),
      ...t(`aspen`, [1.45, 0.92, 0.28]),
      glow: 0.9,
    },
  ];
}
function P3(e, t) {
  let n = new nS({ roughness: 0.92 });
  ((n.colorNode = e.barkColour),
    (n.normalNode = e.barkNormal),
    (n.positionNode = D3()));
  let r = M3().and(A3(t));
  return ((n.maskNode = r.and(j3())), (n.maskShadowNode = r), n);
}
function F3(e, t) {
  let n = new nS({ roughness: 0.75, side: 2 });
  n.colorNode = RV(e.leafColour, e.leafAlpha);
  let r = M3().and(A3(t));
  return (
    FU(n, e.leafAlpha, f2, r, r.and(j3())),
    (n.positionNode = D3()),
    (n.emissiveNode = e.leafColour.mul(gW).mul(JW().mul(e.glow))),
    n
  );
}
