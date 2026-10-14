// assets/index-gCVK5XnX 19 — add
// Lines 53523-53849 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function wU(e, t, n = 10) {
  let r = [];
  for (let i = 0; i < e.length - 1; i++) r.push($V(e[i], e[i + 1], t, t, n));
  for (let i = 1; i < e.length - 1; i++)
    r.push(new jo(t, n, 6).translate(e[i].x, e[i].y, e[i].z));
  return tH(r);
}
function TU(e, t, n) {
  let r = new Wa(),
    i = -e / 2,
    a = -t / 2;
  (r.moveTo(i + n, a),
    r.lineTo(i + e - n, a),
    r.quadraticCurveTo(i + e, a, i + e, a + n),
    r.lineTo(i + e, a + t - n),
    r.quadraticCurveTo(i + e, a + t, i + e - n, a + t),
    r.lineTo(i + n, a + t),
    r.quadraticCurveTo(i, a + t, i, a + t - n),
    r.lineTo(i, a + n),
    r.quadraticCurveTo(i, a, i + n, a));
  let o = new ko(r, 6),
    s = o.getAttribute(`position`),
    c = o.getAttribute(`uv`);
  for (let n = 0; n < s.count; n++)
    c.setXY(n, (s.getX(n) - i) / e, (s.getY(n) - a) / t);
  return o;
}
function EU(e, t) {
  let n = new Hn(),
    r = new Mo(J.wheelRadius - 0.03, 0.03, 10, 40).rotateY(Math.PI / 2);
  n.add(eH(r, e.rubber));
  let i = new Mo(J.wheelRadius - 0.052, 0.012, 6, 40).rotateY(Math.PI / 2);
  n.add(eH(i, e.wall, !1));
  let a = new Mo(J.wheelRadius - 0.062, 0.011, 6, 36).rotateY(Math.PI / 2);
  n.add(eH(a, e.rim, !1));
  let o = HF(t),
    s = [],
    c = J.wheelRadius - 0.07;
  for (let e = 0; e < 36; e++) {
    let t = (e / 36) * DF,
      n = e % 2 == 0 ? 1 : -1,
      r = t + n * 0.5,
      i = new M(n * 0.035, Math.sin(r) * 0.022, Math.cos(r) * 0.022),
      a = new M(0, Math.sin(t) * c, Math.cos(t) * c);
    s.push($V(i, a, 0.0011 + o() * 1e-4, 0.0011, 3));
  }
  return (
    n.add(eH(tH(s), e.chrome, !1)),
    n.add(eH(new fa(0.018, 0.018, 0.1, 10).rotateZ(Math.PI / 2), e.black, !1)),
    n
  );
}
function DU(e) {
  let t = new Hn(),
    n = new Hn();
  t.add(n);
  let { rearWheel: r, cranks: i, pedalL: a, pedalR: o } = OU(n, e),
    s = new Hn();
  (s.position.copy(bU.headBottom), t.add(s));
  let { frontWheel: c, bars: l } = kU(s, e);
  return {
    root: t,
    frame: n,
    front: s,
    bars: l,
    frontWheel: c,
    rearWheel: r,
    cranks: i,
    pedalL: a,
    pedalR: o,
  };
}
function OU(e, t) {
  let n = bU,
    r = n.headTop.clone().lerp(n.headBottom, 0.25),
    i = tH([
      $V(n.headBottom, n.headTop, 0.022),
      $V(r, n.seatCluster, 0.016),
      $V(n.headBottom.clone().lerp(n.headTop, 0.2), n.bb, 0.019),
      $V(n.bb, n.seatCluster, 0.016),
      $V(n.bb.clone().setX(0.05), n.rearHub.clone().setX(0.055), 0.011),
      $V(n.bb.clone().setX(-0.05), n.rearHub.clone().setX(-0.055), 0.011),
      $V(
        n.seatCluster.clone().setX(0.035),
        n.rearHub.clone().setX(0.055),
        0.009,
      ),
      $V(
        n.seatCluster.clone().setX(-0.035),
        n.rearHub.clone().setX(-0.055),
        0.009,
      ),
      new fa(0.026, 0.026, 0.075, 12)
        .rotateZ(Math.PI / 2)
        .translate(n.bb.x, n.bb.y, n.bb.z),
    ]);
  (e.add(eH(i, t.paint)),
    e.add(eH($V(n.seatCluster, n.seat, 0.012), t.chrome)),
    e.add(
      eH(
        new ua(0.035, 0.16, 4, 10)
          .rotateX(Math.PI / 2)
          .scale(1, 0.55, 1)
          .translate(n.seat.x, n.seat.y + 0.02, n.seat.z),
        t.black,
      ),
    ));
  let a = EU(t, 2);
  (a.position.copy(n.rearHub),
    e.add(a),
    e.add(
      eH(
        new fa(0.06, 0.06, 0.006, 25)
          .rotateZ(Math.PI / 2)
          .translate(0.055, n.bb.y, n.bb.z),
        t.chrome,
        !1,
      ),
    ),
    e.add(
      eH(
        tH([
          $V(
            new M(0.055, n.bb.y + 0.058, n.bb.z),
            new M(0.055, 0.025, n.rearHub.z),
            0.004,
            0.004,
            4,
          ),
          $V(
            new M(0.055, n.bb.y - 0.058, n.bb.z),
            new M(0.055, -0.025, n.rearHub.z),
            0.004,
            0.004,
            4,
          ),
        ]),
        t.black,
        !1,
      ),
    ));
  let o = new Hn();
  o.position.copy(n.bb);
  let s = (e) =>
    $V(
      new M(e * 0.07, 0, 0),
      new M(e * 0.07, -n.crankLength, 0),
      0.012,
      0.012,
      8,
    );
  o.add(eH(tH([s(1), s(-1).rotateX(Math.PI)]), t.black));
  let c = new fa(0.05, 0.05, 0.1, 6).rotateZ(Math.PI / 2).scale(1, 0.25, 1),
    l = new Vn();
  (l.position.set(0.12, -n.crankLength, 0), l.add(eH(c, t.black)));
  let u = new Vn();
  return (
    u.position.set(-0.12, n.crankLength, 0),
    u.add(eH(c, t.black)),
    o.add(l, u),
    e.add(o),
    { rearWheel: a, cranks: o, pedalL: u, pedalR: l }
  );
}
function kU(e, t) {
  let n = bU,
    r = (e) => e.clone().sub(n.headBottom),
    i = r(n.frontHub),
    a = tH([
      $V(r(n.headBottom).setX(0.045), i.clone().setX(0.05), 0.012, 0.01),
      $V(r(n.headBottom).setX(-0.045), i.clone().setX(-0.05), 0.012, 0.01),
      new fa(0.03, 0.03, 0.03, 12).rotateZ(Math.PI / 2),
      $V(r(n.headTop), r(n.stem), 0.016),
    ]);
  e.add(eH(a, t.chrome));
  let o = EU(t, 1);
  (o.position.copy(i), e.add(o));
  let s = new Hn();
  e.add(s);
  let c = r(n.stem);
  s.add(
    eH(
      new fa(0.03, 0.03, 0.06, 10)
        .rotateZ(Math.PI / 2)
        .scale(1, 1, 1.2)
        .translate(c.x, c.y, c.z),
      t.black,
    ),
  );
  let l = r(n.gripL),
    u = r(n.gripR),
    d = (e) => [
      c.clone().add(new M(e * 0.06, 0, 0)),
      c.clone().add(new M(e * 0.11, 0, 0.01)),
      new M(e * 0.24, l.y - 0.03, l.z - 0.015),
      new M(e * 0.27, l.y, l.z),
      new M(e * 0.39, l.y, l.z + 0.012),
    ];
  s.add(
    eH(
      tH([
        wU(d(-1).reverse().concat(d(1)), 0.011, 10),
        $V(
          new M(-0.19, c.y + 0.13, c.z + 0.04),
          new M(0.19, c.y + 0.13, c.z + 0.04),
          0.0095,
        ),
      ]),
      t.chrome,
    ),
  );
  let f = (e) =>
    new fa(0.0165, 0.0165, 0.13, 12)
      .rotateZ(Math.PI / 2)
      .translate(e.x, e.y, e.z);
  s.add(
    eH(
      tH([
        f(l.clone().add(new M(-0.045, 0, 0.004))),
        f(u.clone().add(new M(0.045, 0, 0.004))),
      ]),
      t.grips,
    ),
  );
  let p = TU(0.2, 0.15, 0.03),
    m = new M(0, c.y + 0.115, c.z - 0.03);
  return (
    s.add(
      eH(
        p.clone().rotateY(Math.PI).rotateX(-0.22).translate(m.x, m.y, m.z),
        t.plate,
        !1,
      ),
    ),
    s.add(
      eH(
        p
          .clone()
          .rotateX(-0.22)
          .translate(m.x, m.y, m.z + 0.002),
        t.plateBack,
        !1,
      ),
    ),
    { frontWheel: o, bars: s }
  );
}
function AU(e, t, n, r, i, a) {
  (e.front.quaternion.setFromAxisAngle(xU, -t),
    e.bars.quaternion.setFromAxisAngle(xU, -n),
    CU.setFromAxisAngle(xU, r),
    e.frame.quaternion.copy(CU),
    e.frame.position
      .copy(bU.headBottom)
      .sub(SU.copy(bU.headBottom).applyQuaternion(CU)),
    (e.frontWheel.rotation.x = -i),
    (e.rearWheel.rotation.x = -i),
    (e.cranks.rotation.x = -a),
    (e.pedalL.rotation.x = a),
    (e.pedalR.rotation.x = a));
}
var jU = qz(([e]) => SB(CV(yB(e, LV(127.1, 311.7))).mul(43758.5453))),
  MU = qz(([e]) => {
    let t = xB(e),
      n = SB(e),
      r = n.mul(n).mul(Z(3).sub(n.mul(2))),
      i = jU(t),
      a = jU(t.add(LV(1, 0))),
      o = jU(t.add(LV(0, 1))),
      s = jU(t.add(LV(1, 1)));
    return UB(UB(i, a, r.x), UB(o, s, r.x), r.y);
  }),
  NU = (e, t, n) => LV(e.x.mul(t).sub(e.y.mul(n)), e.x.mul(n).add(e.y.mul(t)));
function PU(e, t) {
  let n = Z(0),
    r = 0.5,
    i = 0,
    a = e;
  for (let e = 0; e < t; e++)
    ((n = n.add(MU(a).mul(r))),
      (i += r),
      (r *= 0.5),
      (a = NU(a, 1.6, 1.2).add(3.1)));
  return n.div(i);
}
function FU(e, t, n, r, i = r) {
  ((e.alphaTestNode = Z(n)),
    (e.maskNode = i),
    (e.maskShadowNode = r.and(t.greaterThan(n))));
}
var IU = () => uV.sub(lB),
  LU = (e) => eV(uB.mul(RV(e, 0)).xyz),
  RU = () => LU($(0, 1, 0)),
  zU = () => KB({ normal: nV(RU()) });
function BU(e) {
  ((e.polygonOffset = !0),
    (e.polygonOffsetFactor = -1),
    (e.polygonOffsetUnits = -2));
}
function VU(e, t = 0) {
  ((e.polygonOffset = !0),
    (e.polygonOffsetFactor = 1),
    (e.polygonOffsetUnits = t));
}
function HU(e) {
  let t = dV(eB(e), $(4));
  return t.div(t.x.add(t.y).add(t.z));
}
var UU = (e, t, n, r) => t.mul(e.x).add(n.mul(e.y)).add(r.mul(e.z)),
  WU = () => AB(vV.xy),
  GU = new $i();
function KU(e, t) {
  let n = new N(),
    r = MV(n)
      .onObjectUpdate(({ camera: e }) => {
        let t = lH(e, GU).planes,
          r = n.elements;
        for (let e = 0; e < 4; e++)
          ((r[e] = t[e].normal.x),
            (r[4 + e] = t[e].normal.y),
            (r[8 + e] = t[e].normal.z),
            (r[12 + e] = t[e].constant));
        return n;
      })
      .mul(RV(e, 1));
  return HB(HB(r.x, r.y), HB(r.z, r.w)).greaterThan(Z(t).negate());
}
