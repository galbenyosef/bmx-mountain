// assets/index-gCVK5XnX 56 — mul
// Lines 65355-65504 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function Y8() {
  let e = new nS(),
    t = oB(`trail`, `vec4`),
    n = oB(`dir`, `vec2`),
    r = t.x,
    i = t.y,
    a = t.z,
    o = t.w,
    s = eB(i),
    c = uV,
    l = MB(IU()),
    u = w$(c.xz),
    d = y$.sample(u),
    f = b$.sample(u),
    p = LV(i, r),
    m = Q(0.35, 0.65, MU(p.mul(0.07))),
    h = D$(a$.trail, p.div(2.4), m),
    g = D$(a$.packed, p.div(2.2), m),
    _ = Q(0.15, 0.6, a),
    v = PU(p.mul(LV(0.5, 0.13)), 3),
    y = UB(h.c, g.c.mul($(1, 0.92, 0.85)), _),
    b = CV(r.mul(0.021))
      .mul(0.35)
      .add(CV(r.mul(0.057).add(1.3)).mul(0.25)),
    x = bB(i.sub(b).div(0.95).pow(2).negate());
  y = y.mul(x.mul(0.14).oneMinus()).mul(v.mul(0.25).add(0.88));
  let S = Q(25, 120, l).oneMinus(),
    { groove: C, tilt: w } = X8(r, i, b),
    T = S.mul(_.oneMinus());
  y = y.mul(C.mul(T).mul(-0.2).add(1));
  let E = Z8(r, p, o.mul(x).mul(S));
  y = y.mul(E.shade);
  let D = Q8(d, f, p, s, x, C);
  y = UB(y, D.colour, D.weight);
  let O = Q(xI - 1.4, xI, s.add(v.sub(0.5).mul(0.8)));
  y = UB(y, y.mul($(1.18, 1.12, 1.05)), O.mul(0.6));
  let ee = UB(h.r, g.r, _).sub(x.mul(0.08)).sub(C.mul(T).mul(0.12));
  ee = UB(ee, 0.85, D.weight);
  let te = $(n.x, 0, n.y),
    ne = $(n.y.negate(), 0, n.x),
    re = UB(h.n, g.n, _),
    ie = $B,
    ae = ne
      .mul(re.x)
      .add(te.mul(re.y))
      .mul(S.mul(0.9).add(0.1).mul(D.weight.mul(-0.5).add(1))),
    oe = eV(
      ie
        .add(ae)
        .sub(ne.mul(w.mul(T)))
        .sub(te.mul(E.ripple)),
    ),
    se = f.a;
  ((y = y.mul(se.mul(-0.45).add(1))), (ee = UB(ee, 0.28, se.mul(0.7))));
  let ce = M$(c, ie, l, d, f, 0),
    le = Q(xI - 0.1, SI - 0.4, s.add(v.sub(0.5).mul(1.2)));
  return (
    (y = UB(y, ce.color, le)),
    (ee = UB(ee, ce.roughness, le)),
    (oe = eV(UB(oe, ce.normal, le))),
    (e.colorNode = y),
    (e.roughnessNode = ee),
    (e.normalNode = LU(oe)),
    e
  );
}
function X8(e, t, n) {
  let r = [
      n.add(CV(e.mul(0.09).add(0.4)).mul(0.3)).add(0.18),
      n.sub(CV(e.mul(0.067).add(2.1)).mul(0.26)).sub(0.32),
    ],
    i = Z(0),
    a = Z(0);
  for (let e of r) {
    let n = t.sub(e).div(W8),
      r = bB(n.mul(n).negate());
    ((i = VB(i, r)), (a = a.add(n.mul(r).mul((2 * G8) / W8))));
  }
  return { groove: i, tilt: a };
}
function Z8(e, t, n) {
  let r = e.mul(DF / K8).add(MU(t.mul(LV(0.6, 0.15))).mul(2));
  return {
    shade: CV(r).mul(0.16).add(1).mul(n).add(n.oneMinus()),
    ripple: hB(r)
      .mul((q8 * DF) / K8)
      .mul(n),
  };
}
function Q8(e, t, n, r, i, a) {
  let o = Q(0.35, 0.7, e.g),
    s = Q(0.45, 0.75, PU(n.mul(LV(0.9, 0.35)).add(7), 3)),
    c = o
      .mul(VB(Q(1.4, 2.7, r), s.mul(0.6)))
      .mul(i.mul(0.85).oneMinus())
      .mul(a.oneMinus()),
    l = t.r.greaterThan(0.5).select(a$.leaves, a$.needles);
  return { colour: DV(c$, n.div(3.3)).depth(l).rgb, weight: c };
}
var $8 = class {
  group = new Hn();
  constructor(e) {
    let t = e.trail,
      n = Y8(),
      r = { x: 0, z: 0, tx: 0, tz: 0 },
      i = V8.length;
    for (let a = 0; a < t.length; a += U8) {
      let o = Math.min(t.length, a + U8),
        s = Math.ceil((o - a) / H8) + 1,
        c = new Float32Array(s * i * 3),
        l = new Float32Array(s * i * 4),
        u = new Float32Array(s * i * 2);
      for (let n = 0; n < s; n++) {
        let s = Math.min(o, a + n * H8);
        t.pointAt(s, r);
        let d = t.featureAt(s),
          f = e5(t, s);
        for (let t = 0; t < i; t++) {
          let a = V8[t],
            o = n * i + t;
          ((c[o * 3] = r.x - r.tz * a),
            (c[o * 3 + 1] = e.ribbonHeight(s, a)),
            (c[o * 3 + 2] = r.z + r.tx * a),
            l.set([s, a, Math.abs(a) <= 2.9 ? d : 0, f], o * 4),
            (u[o * 2] = r.tx),
            (u[o * 2 + 1] = r.tz));
        }
      }
      let d = fH(
        { position: new Fr(c, 3), trail: new Fr(l, 4), dir: new Fr(u, 2) },
        ZV(s, i),
      );
      this.group.add(eH(d, n));
    }
  }
};
function e5(e, t) {
  let n = (t) => Y((Math.abs(e.at(t).k) * 200 - 1) / (200 / 70 - 1)),
    r = 0;
  for (let e = 4; e <= J8; e += 2) r = Math.max(r, n(t + e) * (1 - e / J8));
  return r * (1 - n(t));
}
var t5 = new N(),
  n5 = new qt(),
  r5 = new M(),
  i5 = new M();
function a5(e, t, n) {
  let r = e.getAttribute(`uv`);
  for (let e = 0; e < r.count; e++) r.setXY(e, r.getX(e) * t, r.getY(e) * n);
}
