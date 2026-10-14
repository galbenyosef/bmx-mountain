// assets/index-gCVK5XnX 20 — mul
// Lines 53850-54197 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var qU = 6371e3,
  JU = 6471e3,
  YU = [55e-7, 13e-6, 224e-7],
  XU = 15e-6,
  ZU = XU * 1.1,
  QU = [65e-8, 188e-8, 85e-9],
  $U = 25e3,
  eW = 15e3,
  tW = 8e3,
  nW = 1200,
  rW = 0.8,
  iW = Math.acos(qU / 6371600),
  aW = 0.009,
  oW = 16,
  sW = 6,
  cW = 0.002,
  lW = -0.02,
  uW = 0.04,
  dW = tslUniform(new M(0, 1, 0)),
  fW = tslUniform(new Yn(1, 1, 1)),
  pW = tslUniform(new M(0, -1, 0)),
  mW = tslUniform(new Yn(0, 0, 0)),
  hW = tslUniform(new M(0, 1, 0)),
  gW = tslUniform(new Yn(1, 1, 1)),
  _W = tslUniform(0),
  vW = tslUniform(1),
  yW = tslUniform(0),
  bW = tslUniform(19e-5),
  xW = 420,
  SW = 256,
  CW = 128,
  wW = tslUniform(new M(0, 1, 0)),
  TW = tslUniform(22),
  EW = tslUniform(0),
  DW = tslUniform(0),
  OW = (e, t) => {
    let n = e.mul(t);
    return n.negate().add(wV(tslMax(n.mul(n).sub(e.sub(JU).mul(e.add(JU))), 0)));
  },
  kW = (e) =>
    e
      .mul(e)
      .add(1)
      .mul(3 / (16 * Math.PI)),
  AW = (e) =>
    e
      .mul(e)
      .add(1)
      .mul(((3 / (8 * Math.PI)) * (1 - rW * rW)) / 2.64)
      .div(dV(e.mul(-2 * rW).add(1.6400000000000001), 1.5)),
  jW = (e) =>
    tslFloat(1)
      .sub(tslAbs(e.sub($U)).div(eW))
      .max(0);
function MW(e, t, n, r) {
  let i = tslDot(e.div(t), r),
    a = t.mul(i),
    o = i.lessThan(0).and(
      a
        .mul(a)
        .sub(n.mul(t.add(qU)))
        .greaterThan(0),
    ),
    s = OW(t, i).div(sW),
    c = tslFloat(0).toVar(),
    l = tslFloat(0).toVar(),
    u = tslFloat(0).toVar();
  return (
    Yz(sW, ({ i: t }) => {
      let n = tslLength(e.add(r.mul(s.mul(tslFloat(t).add(0.5))))).sub(qU);
      (c.addAssign(bB(n.div(-8e3)).mul(s)),
        l.addAssign(bB(n.div(-1200)).mul(s)),
        u.addAssign(jW(n).mul(s)));
    }),
    { shadowed: o, r: c, m: l, o: u }
  );
}
var NW = tslFn(([e, t]) => {
    let n = 6371600,
      r = e.y.mul(n),
      i = r.mul(r).sub(764556e4),
      a = bV(
        i.greaterThan(0).and(r.lessThan(0)),
        r.negate().sub(wV(tslMax(i, 0))),
        OW(tslFloat(n), e.y),
      ).div(oW),
      o = tslDot(e, t),
      s = tslFloat(0).toVar(),
      c = tslFloat(0).toVar(),
      l = tslFloat(0).toVar(),
      u = tslVec3(0).toVar(),
      d = tslVec3(0).toVar(),
      f = tslVec3(...YU);
    return (
      Yz(oW, ({ i: r }) => {
        let i = e.mul(a.mul(tslFloat(r).add(0.5))).add(tslVec3(0, n, 0)),
          o = tslLength(i),
          p = o.sub(qU),
          m = bB(p.div(-8e3)).mul(a),
          h = bB(p.div(-1200)).mul(a);
        (s.addAssign(m), c.addAssign(h), l.addAssign(jW(p).mul(a)));
        let g = MW(i, o, p, t),
          _ = tslVec3(...QU)
            .mul(l.add(g.o))
            .mul(DW),
          v = bB(f.mul(s.add(g.r)).add(c.add(g.m).mul(ZU)).add(_).negate()).mul(
            bV(g.shadowed, 0, 1),
          );
        (u.addAssign(v.mul(m)), d.addAssign(v.mul(h)));
      }),
      f
        .mul(u)
        .mul(kW(o))
        .add(d.mul(AW(o).mul(XU)))
    );
  }),
  PW = new mn(SW, CW, {
    type: v,
    depthBuffer: !1,
    generateMipmaps: !1,
    magFilter: s,
    minFilter: s,
  });
((PW.texture.wrapS = t), (PW.texture.wrapT = n));
var FW = tslTexture(PW.texture),
  IW = new Wy({ depthTest: !1, depthWrite: !1 });
((IW.fog = !1),
  (IW.colorNode = tslFn(() => {
    let e = tslUv().y.mul(2).sub(1),
      t = tslMax(
        SV(e)
          .mul(e)
          .mul(e)
          .mul(Math.PI / 2),
        -0.02,
      ),
      n = tslUv().x.sub(0.5).mul(TAU),
      r = tslVec3(tslSin(n).mul(hB(t)), tslSin(t), hB(n).mul(hB(t)).negate()),
      i = tslVec3(0).toVar();
    return (
      tslIf(TW.greaterThan(1e-4), () => {
        i.addAssign(NW(r, wW).mul(TW));
      }),
      tslIf(EW.greaterThan(0).and(pW.y.greaterThan(-0.3)), () => {
        i.addAssign(NW(r, pW).mul(EW));
      }),
      tslVec4(i, 1)
    );
  })()));
var LW = new Gw(IW),
  RW = new M(0, -2, 0),
  zW = null,
  BW = !1;
function VW(e, t) {
  let n = 6371600,
    r = n * -e.y + Math.sqrt(Math.max(0, (n * e.y) ** 2 - -127655444e4)),
    i = r / 64,
    a = 0,
    o = 0;
  for (let t = 0; t < 64; t++) {
    let s = ((t + 0.5) / 64) * r,
      c = Math.hypot(e.x * s, n + e.y * s, e.z * s) - qU;
    ((a += Math.exp(-c / tW) * i), (o += Math.exp(-c / nW) * i));
  }
  let s = smoothstep(-iW - aW, -iW + aW, Math.asin(clamp(e.y, -1, 1)));
  return t.setRGB(...YU.map((e) => s * Math.exp(-(e * a + ZU * o))));
}
function HW(e, t, n, r, i) {
  (dW.value.copy(e), pW.value.copy(t));
  let a = Math.asin(clamp(e.y, -1, 1)) - lW,
    o = Math.hypot(e.x, e.z) || 1;
  (a < 0
    ? wW.value.set(
        (e.x / o) * Math.cos(lW),
        Math.sin(lW),
        (e.z / o) * Math.cos(lW),
      )
    : wW.value.copy(e),
    (TW.value = 22 * Math.exp(Math.min(0, a) / uW)),
    (DW.value = smoothstep(0.03, -0.01, e.y)),
    (EW.value = 22 * n),
    VW(e, fW.value),
    VW(t, mW.value).multiplyScalar(n),
    hW.value.copy(r ? t : e),
    gW.value.copy(r ? mW.value : fW.value),
    (_W.value = i),
    (vW.value = 1 - 0.8 * i));
}
function UW(e, t, n = !1) {
  if (!n && RW.distanceTo(dW.value) < cW) return;
  RW.copy(dW.value);
  let r = e.getRenderTarget();
  (e.setRenderTarget(PW),
    LW.render(e),
    e.setRenderTarget(r),
    t &&
      !BW &&
      ((BW = !0),
      e.readRenderTargetPixelsAsync(PW, 0, 0, SW, CW).then((e) => {
        ((zW = e), (BW = !1));
      })));
}
function WW(e, t, n) {
  if (!zW) return n.setRGB(0, 0, 0);
  let r = 0.5 + 0.5 * Math.sign(t) * Math.sqrt(Math.abs(t) / (Math.PI / 2)),
    i = clamp(Math.floor((e / TAU + 0.5) * SW), 0, 255),
    a = (clamp(Math.floor(r * CW), 0, 127) * SW + i) * 4;
  return n.setRGB(
    jr.fromHalfFloat(zW[a]),
    jr.fromHalfFloat(zW[a + 1]),
    jr.fromHalfFloat(zW[a + 2]),
  );
}
var GW = tslFn(([e]) => {
    let t = aB(e.x, e.z.negate().sub(1e-5)),
      n = iB(e.y.clamp(-1, 1)),
      r = tslFloat(0.5).add(
        tslFloat(0.5)
          .mul(SV(n))
          .mul(wV(tslAbs(n).div(Math.PI / 2))),
      );
    return FW.sample(tslVec2(t.div(TAU).add(0.5), r)).rgb;
  }),
  KW = tslFn(([e, t]) => {
    let n = t.sub(lB),
      r = tslLength(n),
      i = n.div(tslMax(r, 0.001)),
      a = n.y.div(xW),
      o = tslAbs(a)
        .greaterThan(1e-4)
        .select(bB(a.negate()).oneMinus().div(a), tslFloat(1)),
      s = bB(
        bW
          .mul(bB(lB.y.sub(lI(40)).div(xW).negate()))
          .mul(r)
          .mul(o)
          .negate(),
      ).oneMinus(),
      c = tslNormalize(tslVec3(i.x, tslMax(i.y, 0).mul(0.5).add(0.02), i.z)),
      l = dV(tslMax(tslDot(i, hW), 0), 12)
        .mul(0.06)
        .mul(s);
    return tslMix(e, GW(c).add(gW.mul(l)), s);
  }),
  qW = tslFn(() => tslVec4(KW(tV.rgb, uV), tV.a)),
  JW = () => dV(tslMax(tslDot(tslNormalize(IU()), hW), 0), 4).mul(vW),
  YW = `"Arial Black", "Helvetica Neue", Arial, sans-serif`;
function XW(e, t) {
  let n = document.createElement(`canvas`);
  return ((n.width = e), (n.height = t), n.getContext(`2d`));
}
function ZW(e, t = !0) {
  let n = new oa(e.canvas);
  return (t && (n.colorSpace = Ye), (n.anisotropy = 8), n);
}
var QW = { x: 0, y: 0.02, z: 0.01, rx: 0.12, ry: 0.128, rz: 0.15 },
  $W = { x: 0, y: -0.03, z: 0.035, rx: 0.108, ry: 0.098, rz: 0.125 },
  eG = { x: 0, y: -0.075, z: -0.035, rx: 0.108, ry: 0.07, rz: 0.15 },
  tG = { x: 0, y: 0.062, z: 0.115, rx: 0.088, ry: 0.02, rz: 0.046 },
  nG = { z: -0.178, angle: 0.6, round: 0.014 },
  rG = Math.sin(nG.angle),
  iG = Math.cos(nG.angle),
  aG = {
    y: -0.08,
    z: -0.176,
    ny: 0.3 / Math.hypot(0.3, 1),
    nz: -1 / Math.hypot(0.3, 1),
  },
  oG = 0.116,
  sG = { angle: 0.35, out: 0.124 },
  cG = Math.sin(sG.angle),
  lG = Math.cos(sG.angle),
  uG = new M(0, 0, 0.005),
  dG = 0.9;
function fG(e, t, n, r) {
  let i = (e - r.x) / r.rx,
    a = (t - r.y) / r.ry,
    o = (n - r.z) / r.rz,
    s = Math.sqrt(i * i + a * a + o * o),
    c = Math.sqrt(
      (i * i) / (r.rx * r.rx) +
        (a * a) / (r.ry * r.ry) +
        (o * o) / (r.rz * r.rz),
    );
  return c > 1e-9 ? (s * (s - 1)) / c : -r.rx;
}
function pG(e, t, n) {
  let r = Math.max(n - Math.abs(e - t), 0) / n;
  return Math.min(e, t) - (r * r * n) / 4;
}
var mG = (e, t, n) => -pG(-e, -t, n);
function hG(e, t, n) {
  let r = pG(fG(e, t, n, QW), fG(e, t, n, $W), 0.04),
    i = Math.sqrt(e * e + nG.round * nG.round),
    a = mG(fG(e, t, n, eG), i * rG - (n - nG.z) * iG, 0.02);
  return (
    (a = mG(a, (t - aG.y) * aG.ny + (n - aG.z) * aG.nz, 0.012)),
    mG(
      pG(pG(r, a, 0.035), fG(e, t, n, tG), 0.015),
      mG(Math.abs(e) - oG, Math.abs(e) * lG - t * cG - sG.out, 0.03),
      0.04,
    )
  );
}
function gG(e, t, n) {
  let r = Math.sin(t);
  return n.set(r * Math.sin(e), Math.cos(t), r * Math.cos(e));
}
function _G(e, t, n) {
  let r = e - uG.x,
    i = t - uG.y,
    a = n - uG.z;
  return [
    wrap(Math.atan2(r, a), TAU),
    Math.acos(i / Math.sqrt(r * r + i * i + a * a)),
  ];
}
function vG(e) {
  let t = (t) => hG(uG.x + e.x * t, uG.y + e.y * t, uG.z + e.z * t),
    n = 0.03,
    r = 0.32,
    i = t(n),
    a = t(r),
    o = 0;
  for (let e = 0; e < 40; e++) {
    let e = (n * a - r * i) / (a - i),
      s = t(e);
    if (Math.abs(s) < 1e-7 || r - n < 1e-7) return e;
    s < 0
      ? ((n = e), (i = s), o < 0 && (a /= 2), (o = -1))
      : ((r = e), (a = s), o > 0 && (i /= 2), (o = 1));
  }
  return (n + r) / 2;
}
function yG(e, t, n, r) {
  return (gG(e, t, r), r.multiplyScalar(vG(r) * n).add(uG));
}
function bG(e, t) {
  let n = 2e-4;
  return t
    .set(
      hG(e.x + n, e.y, e.z) - hG(e.x - n, e.y, e.z),
      hG(e.x, e.y + n, e.z) - hG(e.x, e.y - n, e.z),
      hG(e.x, e.y, e.z + n) - hG(e.x, e.y, e.z - n),
    )
    .normalize();
}
var xG = (e) => -0.128 + 0.034 * smoothstep(-0.15, -0.035, e) - 0.008 * smoothstep(0.04, 0.16, e);
