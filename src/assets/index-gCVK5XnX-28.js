// assets/index-gCVK5XnX 28 — copy
// Lines 56369-56697 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function TY(e) {
  let t = new Hn();
  return (
    t.add(
      addMesh(
        new ua(0.046, 0.15, 6, 12)
          .rotateX(Math.PI / 2)
          .scale(1, 0.72, 1)
          .translate(0, 0.004, -0.035),
        e.shoe,
      ),
    ),
    t.add(
      addMesh(
        new ua(0.05, 0.17, 4, 12)
          .rotateX(Math.PI / 2)
          .scale(1.02, 0.28, 1)
          .translate(0, -0.03, -0.035),
        e.sole,
        !1,
      ),
    ),
    t.add(
      addMesh(
        new la(0.032, 0.008, 0.08).translate(0, 0.036, -0.075),
        e.plateBack,
        !1,
      ),
    ),
    t
  );
}
function EY(e) {
  let t = new Hn(),
    n = KJ({
      paint: e.helmet,
      rubber: e.rubber,
      goggles: e.goggles,
      lens: e.lens,
      chrome: e.chrome,
    }),
    r = {
      root: t,
      torso: new Hn(),
      head: n,
      upperArmL: new Vn(),
      upperArmR: new Vn(),
      foreArmL: new Vn(),
      foreArmR: new Vn(),
      handL: addMesh(CY(!0), e.gloves),
      handR: addMesh(CY(!1), e.gloves),
      thighL: new Vn(),
      thighR: new Vn(),
      shinL: wY(e),
      shinR: wY(e),
      footL: TY(e),
      footR: TY(e),
    };
  for (let e of Object.keys(r)) e !== `root` && t.add(r[e]);
  DY(r);
  let { skin: i, knees: a } = eJ(r, e.cloth, LIMB_LENGTHS);
  t.add(i);
  for (let t of a) t.add(addMesh(new jo(0.062, 14, 10), e.pads));
  return r;
}
function DY(e) {
  let t = fY.set(0, 1, 0),
    n = pY.set(1, 0, 0),
    r = mY.set(0, 1, 0);
  (e.torso.position.copy(r), e.torso.quaternion.identity());
  let i = hY.copy(r).addScaledVector(t, qJ);
  (AY(i, t, e.head.position), e.head.quaternion.identity());
  let a = (e, t, n, r) =>
    r.set(
      n * Math.sin(t),
      -Math.cos(e) * Math.cos(t),
      -Math.sin(e) * Math.cos(t),
    );
  for (let o of [-1, 1]) {
    let s = OY(i, t, n, o, gY),
      c = _Y.copy(s).addScaledVector(a(nY.arm, nY.armOut, o, rY), LIMB_LENGTHS.upper);
    MY(
      e,
      o,
      s,
      c,
      vY
        .copy(c)
        .addScaledVector(a(nY.arm + nY.elbow, nY.armOut, o, rY), LIMB_LENGTHS.fore),
      n,
    );
    let l = kY(r, o, yY),
      u = bY.copy(l).addScaledVector(a(nY.thigh, nY.legOut, o, rY), LIMB_LENGTHS.thigh);
    NY(
      e,
      o,
      l,
      u,
      xY
        .copy(u)
        .addScaledVector(a(nY.thigh - nY.knee, nY.legOut, o, rY), LIMB_LENGTHS.shin),
      KV,
    );
  }
}
function OY(e, t, n, r, i) {
  return i
    .copy(e)
    .addScaledVector(t, -0.06)
    .addScaledVector(n, r * JJ);
}
function kY(e, t, n) {
  return n.copy(e).add(iY.set(t * QJ.out, -QJ.drop, 0));
}
function AY(e, t, n) {
  return n
    .copy(e)
    .addScaledVector(t, 0.13)
    .add(aY.set(0, 0.03, -0.02));
}
function jY(e, t, n, r, i) {
  sY.subVectors(n, t);
  let a = sY.length() || 1e-4;
  (sY.divideScalar(a),
    cY.copy(r).addScaledVector(sY, -r.dot(sY)),
    cY.lengthSq() < 1e-6 && cY.set(0, 0, 1).addScaledVector(sY, -sY.z),
    cY.normalize(),
    oY.crossVectors(sY, cY),
    e.quaternion.setFromRotationMatrix(lY.makeBasis(oY, sY, cY)),
    e.position.copy(t),
    e.scale.set(1, Math.min(1, a / i), 1));
}
function MY(e, t, n, r, i, a) {
  return (
    uY.copy(a).multiplyScalar(t),
    jY(t < 0 ? e.upperArmL : e.upperArmR, n, r, uY, LIMB_LENGTHS.upper),
    jY(t < 0 ? e.foreArmL : e.foreArmR, r, i, uY, LIMB_LENGTHS.fore),
    uY
  );
}
function NY(e, t, n, r, i, a) {
  let o = uY.subVectors(i, n).normalize(),
    s = dY.subVectors(r, n);
  return (
    s.addScaledVector(o, -s.dot(o)),
    s.lengthSq() < 1e-6 && s.copy(a),
    s.normalize(),
    jY(t < 0 ? e.thighL : e.thighR, n, r, s, LIMB_LENGTHS.thigh),
    jY(t < 0 ? e.shinL : e.shinR, r, i, s, LIMB_LENGTHS.shin),
    s
  );
}
function PY(e, t, n, r, i, a) {
  rY.subVectors(t, e);
  let o = Math.min(rY.length(), n + r - 1e-4),
    s = rY.normalize(),
    c = (n * n - r * r + o * o) / (2 * o),
    l = Math.sqrt(Math.max(0, n * n - c * c));
  return (
    iY.subVectors(i, e),
    aY.copy(s).multiplyScalar(iY.dot(s)),
    iY.sub(aY).normalize(),
    a.copy(e).addScaledVector(s, c).addScaledVector(iY, l)
  );
}
var FY = new M(1, 0, 0),
  IY = new M(0, 0, 1),
  LY = new M(),
  RY = new M(),
  zY = new M(),
  BY = new M(),
  VY = new M(),
  HY = new M(),
  UY = new N(),
  WY = new M(),
  GY = new M(),
  KY = new M(),
  qY = new M(),
  JY = new M(),
  YY = new M(),
  XY = new M(),
  ZY = new M(),
  QY = new M(),
  $Y = new M(),
  eX = new M(),
  tX = new M(),
  nX = new M(),
  rX = new M(),
  iX = new M(),
  aX = new M(),
  oX = new M(),
  sX = Array.from({ length: 15 }, () => new M()),
  cX = new qt(),
  lX = new qt(),
  uX = new qt(),
  dX = new qt(),
  fX = new qt(),
  pX = new qt(),
  mX = new qt(),
  hX = new Tn();
function gX(e, t, n, r, i, a) {
  let o = Math.sqrt(Math.max(1e-4, a * a - i * i)),
    s = n - e,
    c = r - t,
    l = Math.hypot(s, c),
    u = (YJ * YJ + l * l - o * o) / (2 * YJ * l);
  return -Math.acos(clamp(u, -1, 1)) - Math.atan2(c, s);
}
function _X(e, t, n, r, i, a, o, s) {
  let c = t.crouch,
    l = t.style === TRICK.Superman ? t.styled : 0,
    u = t.style === TRICK.CanCan ? t.styled : 0;
  (XY.set(-tY.x, tY.y, tY.z).applyQuaternion(n).add(r),
    ZY.copy(tY).applyQuaternion(n).add(i));
  let d = (XY.y + ZY.y) / 2,
    f = (XY.z + ZY.z) / 2,
    p = Math.max(0, (ZY.x - XY.x) / 2 - JJ),
    m = 0.74 - c * 0.3 + l * 0.12,
    h = ZJ * clamp(0.8 - c * 0.06 + t.reach + l * 0.13, 0.68, 0.95),
    g = clamp(0.5 + c * 0.24 + t.lean + l * 0.8, 0.1, 1.15 + l * 0.35),
    _ = Math.sqrt(Math.max(1e-4, h * h - p * p));
  g = Math.max(g, Math.acos(clamp((_ + d - m) / YJ, -1, 1)));
  let v = m + YJ * Math.cos(g) - d,
    y = f + YJ * Math.sin(g) + Math.sqrt(Math.max(0, _ * _ - v * v)),
    b = clamp(y, 0.1, 0.4 + l * 0.35);
  b !== y && ((y = b), (g = clamp(gX(m, y, d, f, p, h), 0.05, 1.2 + l * 0.35)));
  let x = WY.set(0, m, y);
  uX.setFromAxisAngle(IY, -clamp(t.roll, -0.22, 0.22));
  let S = KY.set(0, Math.cos(g), -Math.sin(g)).applyQuaternion(uX),
    C = clamp(t.twist, -0.35, 0.35);
  lX.setFromAxisAngle(S, C).multiply(uX);
  let w = qY.set(1, 0, 0).applyQuaternion(lX),
    T = JY.crossVectors(w, S).negate(),
    E = GY.copy(x).addScaledVector(S, qJ),
    D = 0;
  for (let e of [-1, 1])
    D = Math.max(D, OY(E, S, w, e, QY).distanceTo(e < 0 ? XY : ZY) - ZJ * 0.96);
  if (D > 0) {
    let e = LY.copy(XY)
      .add(ZY)
      .multiplyScalar(0.5)
      .sub(E)
      .normalize()
      .multiplyScalar(D);
    (x.add(e), E.add(e));
  }
  (e.torso.position.copy(x),
    e.torso.quaternion
      .setFromUnitVectors(GV, S)
      .premultiply(dX.setFromAxisAngle(S, C)),
    AY(E, S, e.head.position),
    e.head.quaternion.setFromEuler(
      hX.set(t.headPitch, t.headYaw, t.headRoll, `YXZ`),
    ));
  for (let a of [-1, 1]) vX(e, t, a, E, S, w, T, a < 0 ? r : i, n, s);
  for (let n of [-1, 1]) yX(e, t, n, x, n < 0 ? a : o, l, u, s);
  (s[BONES.pelvis].copy(x), s[BONES.chest].copy(E), s[BONES.head].copy(e.head.position));
}
function vX(e, t, n, r, i, a, o, s, c, l) {
  let u = OY(r, i, a, n, QY),
    d = tX.copy(s),
    f = n < 0 ? e.handL : e.handR;
  if ((f.quaternion.copy(c), t.hands > 0)) {
    let e = RY.set(0, 0.14, 0.04).add(d),
      r = LY.copy(u)
        .addScaledVector(a, n * 0.42)
        .addScaledVector(i, 0.22)
        .add(zY.set(0, 0.05, -0.08));
    (d.lerp(e.lerp(r, t.wide), t.hands), f.quaternion.slerp(cX, t.hands));
  }
  if (t.flail > 0) {
    let e = t.t * (n < 0 ? 1.1 : 0.93),
      r = LY.copy(u).addScaledVector(a, n * (0.35 + 0.15 * Math.sin(e * 7)));
    ((r.y += 0.25 * Math.sin(e * 9 + n)),
      (r.z += 0.3 * Math.cos(e * 6 + n * 2)),
      d.lerp(r, t.flail),
      f.quaternion.slerp(cX, t.flail));
  }
  f.position.copy(d);
  let p = LY.copy(tY);
  (n < 0 && (p.x = -p.x), p.applyQuaternion(f.quaternion).add(d));
  let m = nX.copy(p);
  $Y.copy(u)
    .addScaledVector(a, n * 0.32)
    .addScaledVector(i, -0.5)
    .addScaledVector(o, 0.3);
  let h = PY(u, m, LIMB_LENGTHS.upper, LIMB_LENGTHS.fore, $Y, eX),
    g = zY.subVectors(m, h).setLength(LIMB_LENGTHS.fore).add(h);
  (f.position.add(RY.subVectors(g, m)),
    m.copy(g),
    MY(e, n, u, h, m, a),
    l[n < 0 ? BONES.shL : BONES.shR].copy(u),
    l[n < 0 ? BONES.elL : BONES.elR].copy(h),
    l[n < 0 ? BONES.haL : BONES.haR].copy(m));
}
function yX(e, t, n, r, i, a, o, s) {
  let c = kY(r, n, rX),
    l = iX.copy(i).add(RY.set(0, 0.055, 0));
  (t.feetOff > 0 &&
    l.lerp(LY.set(n * 0.34, bU.bb.y + 0.22, bU.bb.z + 0.2), t.feetOff),
    t.dab * n > 0 &&
      l.lerp(LY.set(n * 0.45, bU.bb.y - 0.2, bU.bb.z - 0.15), Math.abs(t.dab)));
  let u = n === -t.side ? o : 0;
  if (
    (a > 0 && l.lerp(LY.set(n * 0.1, r.y - 0.1, r.z + 0.86), a),
    u > 0 && l.lerp(LY.set(t.side * 0.66, r.y - 0.08, r.z - 0.42), u),
    t.flail > 0)
  ) {
    let e = t.t * (n < 0 ? 0.87 : 1.07);
    l.lerp(
      LY.set(
        n * (0.22 + 0.12 * Math.sin(e * 6)),
        r.y - 0.55 + 0.2 * Math.sin(e * 8 + n),
        r.z + 0.25 * Math.cos(e * 5),
      ),
      t.flail,
    );
  }
  let d = RY.set(n * (0.14 + 0.3 * Math.max(0, n * t.turn)), 0.1, -0.6);
  d.lerp(LY.set(n * 0.15, -0.7, 0), a).lerp(LY.set(t.side * 0.3, 0.6, -0.3), u);
  let f = PY(c, l, LIMB_LENGTHS.thigh, LIMB_LENGTHS.shin, zY.copy(c).add(d), aX);
  (l.sub(f).setLength(LIMB_LENGTHS.shin).add(f), NY(e, n, c, f, l, KV));
  let p = n < 0 ? e.footL : e.footR;
  (p.position.copy(l).add(RY.set(0, -0.015, 0)),
    p.quaternion.setFromAxisAngle(FY, t.ankle * n),
    s[n < 0 ? BONES.hipL : BONES.hipR].copy(c),
    s[n < 0 ? BONES.knL : BONES.knR].copy(f),
    s[n < 0 ? BONES.ftL : BONES.ftR].copy(l));
}
