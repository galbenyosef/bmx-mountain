// assets/index-gCVK5XnX 29 — copy
// Lines 56698-56906 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function bX(e, t) {
  let n = sX;
  for (let e = 0; e < 15; e++) t(e, n[e]);
  (e.root.position.set(0, 0, 0), e.root.quaternion.identity());
  let r = KY.subVectors(n[cq.chest], n[cq.pelvis]).normalize(),
    i = qY.subVectors(n[cq.shR], n[cq.shL]);
  i.addScaledVector(r, -i.dot(r)).normalize();
  let a = JY.crossVectors(i, r);
  (fX.setFromRotationMatrix(UY.makeBasis(i, r, a)),
    e.torso.position.copy(n[cq.pelvis]),
    e.torso.quaternion.copy(fX),
    e.head.position.copy(n[cq.head]),
    e.head.quaternion.copy(fX));
  let o = YY.copy(a).negate();
  for (let t of [-1, 1]) {
    let r = n[t < 0 ? cq.shL : cq.shR],
      a = n[t < 0 ? cq.elL : cq.elR],
      o = n[t < 0 ? cq.haL : cq.haR],
      s = MY(e, t, r, a, o, i),
      c = t < 0 ? e.handL : e.handR;
    (HY.subVectors(a, o).normalize(),
      BY.copy(s).addScaledVector(HY, -s.dot(HY)).normalize(),
      VY.crossVectors(HY, BY),
      c.quaternion.setFromRotationMatrix(UY.makeBasis(BY, VY, HY)));
    let l = LY.set(t < 0 ? -tY.x : tY.x, tY.y, tY.z).applyQuaternion(
      c.quaternion,
    );
    c.position
      .copy(zY.subVectors(a, o).setLength(XJ.fore).negate().add(a))
      .sub(l);
  }
  for (let t of [-1, 1]) {
    let r = n[t < 0 ? cq.hipL : cq.hipR],
      i = n[t < 0 ? cq.knL : cq.knR],
      a = n[t < 0 ? cq.ftL : cq.ftR],
      s = NY(e, t, r, i, a, o),
      c = t < 0 ? e.footL : e.footR;
    (VY.subVectors(i, a).normalize(),
      HY.copy(s).addScaledVector(VY, -s.dot(VY)).negate(),
      HY.lengthSq() < 1e-6 && HY.copy(o).negate(),
      HY.normalize(),
      BY.crossVectors(VY, HY),
      c.quaternion.setFromRotationMatrix(UY.makeBasis(BY, VY, HY)),
      c.position
        .copy(zY.subVectors(a, i).setLength(XJ.shin).add(i))
        .add(LY.set(0, -0.015, 0).applyQuaternion(c.quaternion)));
  }
}
function xX(e, t, n, r) {
  let i = e.clone().addScaledVector(t, qJ),
    a = Array.from({ length: 15 }, () => new M());
  (a[cq.pelvis].copy(e), a[cq.chest].copy(i), AY(i, t, a[cq.head]));
  for (let e of [-1, 1]) {
    let o = OY(i, t, FY, e, new M()),
      s = n(e);
    (a[e < 0 ? cq.shL : cq.shR].copy(o),
      a[e < 0 ? cq.elL : cq.elR].copy(
        PY(o, s, XJ.upper, XJ.fore, o.clone().add(r(e)), new M()),
      ),
      a[e < 0 ? cq.haL : cq.haR].copy(s));
  }
  return a;
}
var SX = (() => {
    let e = 0.2,
      t = new M(0, 0.12, 0),
      n = xX(
        t,
        new M(0, Math.cos(e), Math.sin(e)),
        (e) => new M(e * 0.17, 0.23, -0.27),
        (e) => new M(e * 0.35, -0.2, 0.3),
      );
    for (let e of [-1, 1]) {
      let r = kY(t, e, new M()),
        i = r.clone().add(new M(e * 0.03, 0.04, -0.446)),
        a = i.clone().add(new M(0, -0.43, -0.09).setLength(XJ.shin));
      (n[e < 0 ? cq.hipL : cq.hipR].copy(r),
        n[e < 0 ? cq.knL : cq.knR].copy(i),
        n[e < 0 ? cq.ftL : cq.ftR].copy(a));
    }
    return n;
  })(),
  CX = new M(0, 0.95, 0.55),
  wX = new qt().setFromAxisAngle(FY, Math.PI / 2),
  TX = (() => {
    let e = 0.2,
      t = new M(0, 0.5, 0),
      n = xX(
        t,
        new M(0, Math.cos(e), -Math.sin(e)),
        (e) => new M(e * 0.17, 0.33, -0.1),
        (e) => new M(e * 0.4, -0.1, 0.3),
      );
    for (let e of [-1, 1])
      (n[e < 0 ? cq.hipL : cq.hipR].copy(kY(t, e, new M())),
        n[e < 0 ? cq.knL : cq.knR].set(e * 0.13, 0.06, -0.12),
        n[e < 0 ? cq.ftL : cq.ftR].set(e * 0.13, 0.06, 0.32));
    return n;
  })();
function EX(e, t, n, r) {
  return (pX.setFromAxisAngle(GV, n), r.copy(TX[e]).applyQuaternion(pX).add(t));
}
function DX(e, t, n) {
  (pX.setFromAxisAngle(GV, n),
    bX(e, (e, n) => n.copy(SX[e]).applyQuaternion(pX).add(t)));
}
function OX(e, t, n) {
  (pX.setFromAxisAngle(GV, n),
    e.root.position
      .set(0, -J.wheelbase / 2, 0.03)
      .add(CX)
      .applyQuaternion(pX)
      .add(t),
    e.root.quaternion.copy(pX).multiply(wX),
    AU(e, 0, 0, 0, 0, Math.PI / 2));
}
var kX = XJ.thigh + XJ.shin + $J + QJ.drop,
  AX = (e) => Math.min(1.6, 0.25 + 0.27 * e);
function jX(e, t, n, r, i, a) {
  let o = X(0, 0.6, r),
    s = Y((r - 2.2) / 2.5),
    c = AX(r) * o,
    l = (0.1 + 0.12 * s) * o,
    u = 0.04 + 0.16 * s;
  mX.setFromAxisAngle(GV, t);
  let d = (t, n, r, i) => i.set(t, 0, r).applyQuaternion(mX).add(e).setY(n),
    f = 1 / 0;
  for (let e of [-1, 1]) {
    let t = n + (e > 0 ? Math.PI : 0),
      r = a[e < 0 ? cq.ftL : cq.ftR];
    d(e * 0.11, 0, -(c / 2) * Math.sin(t), r);
    let o = i(r.x, r.z);
    ((f = Math.min(f, o)), (r.y = o + $J + l * Math.max(0, Math.cos(t))));
  }
  let p = d(
      0.02 * Math.sin(n) * o,
      f + kX - 0.06 - 0.07 * s + (0.02 + 0.03 * s) * Math.cos(2 * n) * o,
      0,
      a[cq.pelvis],
    ),
    m = KY.set(0, Math.cos(u), -Math.sin(u)).applyQuaternion(mX),
    h = qY.set(1, 0, 0).applyQuaternion(mX),
    g = a[cq.chest].copy(p).addScaledVector(m, qJ);
  AY(g, m, a[cq.head]);
  for (let t of [-1, 1]) {
    let r = n + (t > 0 ? Math.PI : 0),
      i = a[t < 0 ? cq.hipL : cq.hipR].copy(p).addScaledVector(h, t * QJ.out);
    i.y -= QJ.drop;
    let o = a[t < 0 ? cq.ftL : cq.ftR];
    (d(0, 0, -1, $Y)
      .setY(i.y - 0.3)
      .sub(e)
      .setY(0)
      .add(i),
      PY(i, o, XJ.thigh, XJ.shin, $Y, a[t < 0 ? cq.knL : cq.knR]));
    let l = OY(g, m, h, t, a[t < 0 ? cq.shL : cq.shR]),
      u = -(c * (0.4 - 0.25 * s)) * Math.sin(r + Math.PI),
      f = a[t < 0 ? cq.haL : cq.haR];
    (f.copy(l).addScaledVector(h, t * (0.07 + 0.03 * s)),
      (f.y -= 0.49 - 0.2 * s),
      d(0, 0, u - 0.04 - 0.12 * s, oX)
        .sub(e)
        .setY(0),
      f.add(oX),
      $Y
        .copy(l)
        .addScaledVector(h, t * 0.3)
        .add(d(0, 0, 0.5, oX).sub(e).setY(-0.2)),
      PY(l, f, XJ.upper, XJ.fore, $Y, a[t < 0 ? cq.elL : cq.elR]));
  }
}
function MX() {
  return {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    pitch: 0,
    roll: 0,
    steer: 0,
    bars: 0,
    whip: 0,
    spin: 0,
    crank: 0,
    crouch: 0,
    hands: 0,
    style: CH.None,
    styleSide: 1,
    styled: 0,
    mode: kH.Ride,
    pedal: 0,
    wobble: 0,
    pump: 0,
    lift: 0,
    bail: 0,
    speed: 0,
    compF: 0,
    compR: 0,
    bx: 0,
    by: 0,
    bz: 0,
    bqx: 0,
    bqy: 0,
    bqz: 0,
    bqw: 1,
    chair: -1,
    seat: 0,
  };
}
