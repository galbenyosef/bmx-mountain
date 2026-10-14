// assets/index-gCVK5XnX 46 — mul
// Lines 62620-62805 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function P4(e, t) {
  let n = M4(e);
  (A4.makeRotationY(-((n - 12) / 24) * TAU),
    j4.multiplyMatrices(O4, k4).multiply(A4),
    t.sun.set(0, Math.sin(S4), Math.cos(S4)).applyMatrix4(j4));
  let r = Math.PI - w4;
  (t.moon
    .set(-Math.cos(C4) * Math.sin(r), Math.sin(C4), Math.cos(C4) * Math.cos(r))
    .applyMatrix4(j4),
    t.stars.setFromMatrix4(j4).transpose());
  let i = (Math.asin(clamp(t.sun.y, -1, 1)) * 180) / Math.PI;
  ((t.hour = n),
    (t.elevation = i),
    (t.byMoon = i < -3),
    (t.moonlight = smoothstep(-3, -10, i)),
    (t.night = smoothstep(-2, -12, i)));
  let a = 1;
  for (; a < D4.length - 1 && i > D4[a][0];) a++;
  let [o, s] = D4[a - 1],
    [c, l] = D4[a];
  return ((t.exposure = 2 ** lerp(s, l, clamp((i - o) / (c - o)))), t);
}
var F4 = () => ({
    sun: new M(),
    moon: new M(),
    stars: new Xt(),
    hour: 0,
    elevation: 0,
    byMoon: !1,
    moonlight: 0,
    night: 0,
    exposure: 1,
  }),
  I4 = 0.2,
  L4 = 20,
  R4 = 0.42,
  z4 = -1.16,
  B4 = 1.2,
  V4 = 3,
  H4 = -3,
  U4 = class {
    dark = 0;
    seen = z4;
    value = R4;
    target = new mn(1, 1, { type: v, depthBuffer: !1 });
    quad;
    age = 0;
    metering = !1;
    metered = !1;
    meter(e) {
      let t = new Wy({ depthTest: !1, depthWrite: !1 }),
        n = tslFloat(0);
      for (let t = 0; t < 6; t++)
        for (let r = 0; r < 8; r++)
          n = n.add(
            PB(tslMax(LB(e.sample(tslVec2((r + 0.5) / 8, (t + 0.5) / 6)).rgb), 1e-5)),
          );
      ((t.colorNode = tslVec4(n.div(48).add(L4), 0, 0, 1)), (this.quad = new Gw(t)));
    }
    adapt(e, t) {
      let n = (this.dark = smoothstep(V4, H4, e.elevation)),
        r = Math.log(R4) + (z4 - this.seen) * 0.5,
        i = Math.exp(lerp(Math.log(e.exposure), r, n));
      return (
        (this.value =
          n > 0
            ? Math.exp(lerp(Math.log(this.value), Math.log(i), approachExp(B4, t)))
            : i),
        this.value
      );
    }
    measure(e, t) {
      ((this.age += t),
        !(
          this.metering ||
          (this.metered && (this.age < I4 || this.dark <= 0))
        ) &&
          ((this.metered = !0),
          (this.age = 0),
          (this.metering = !0),
          e.setRenderTarget(this.target),
          this.quad.render(e),
          e.setRenderTarget(null),
          e.readRenderTargetPixelsAsync(this.target, 0, 0, 1, 1).then((e) => {
            ((this.seen = jr.fromHalfFloat(e[0]) - L4), (this.metering = !1));
          })));
    }
  },
  W4 = tslUniform(1),
  G4 = tslUniform(new Xt()),
  K4 = 260,
  q4 = 0.09,
  J4 = 0.016,
  Y4 = 250,
  X4 = [0.38, 0.55, -0.74],
  Z4 = tslFn(([e]) => {
    let t = e.mul(32e-5).add(tslVec2(yW.mul(0.0016), yW.mul(5e-4))),
      n = tslFloat(0),
      r = 0.6;
    for (let e = 0; e < 5; e++)
      ((n = n.add(tslAbs(valueNoise(t).mul(2).sub(1)).oneMinus().mul(r))),
        (t = NU(t, 1.7, 1.1).add(3.1)),
        (r *= 0.47));
    let i = tslSmoothstep(0.3, 0.75, valueNoise(e.mul(5e-5).add(7)));
    return tslSmoothstep(tslFloat(0.78).sub(i.mul(0.16)), 1.05, n);
  }),
  Q4 = tslFn(([e]) => {
    let t = NU(e.mul(tslVec2(5e-5, 18e-5)).add(tslVec2(yW.mul(8e-4), 0)), 0.8, 0.6);
    return tslSmoothstep(
      0.52,
      0.8,
      fbmNoise(t.mul(4), 4)
        .mul(0.7)
        .add(fbmNoise(t.mul(13), 3).mul(0.3)),
    ).mul(tslSmoothstep(0.3, 0.6, valueNoise(e.mul(3e-5).add(2))));
  }),
  $4 = tslFn(([e]) => {
    let t = e.mul(K4),
      n = xB(t),
      r = DB(n.x.add(DB(n.y.add(DB(n.z.add(K4)).mul(1e4))).mul(1e4))).mul(1e6),
      i = n.add(
        tslVec3(DB(r), DB(r.add(17.1)), DB(r.add(41.7)))
          .mul(0.6)
          .add(0.2),
      ),
      a = tslLength(CB(t)).max(1e-4),
      o = bB(tslLength(t.sub(i)).div(a.mul(0.9)).pow(2).negate()),
      s = DB(r.add(93.3)),
      c = dV(DB(r.add(7.7)), 5)
        .mul(2.2)
        .add(0.12),
      l = tslMix(tslVec3(0.72, 0.84, 1), tslVec3(1, 0.86, 0.68), DB(r.add(55.1))),
      u = tslSin(yW.mul(DB(r.add(3.3)).mul(6).add(2)).add(s.mul(40)))
        .mul(0.15)
        .add(0.85),
      d = l.mul(o.mul(c).mul(u).mul(s.lessThan(q4).select(1, 0))),
      f = tslDot(e, tslVec3(...X4)),
      p = bB(f.mul(f).div(-0.02)).mul(
        fbmNoise(tslVec2(e.x.add(e.z), e.y.sub(e.z)).mul(5), 4)
          .sub(0.25)
          .max(0),
      );
    return d.mul(0.06).add(tslVec3(0.75, 0.8, 1).mul(p.mul(0.012)));
  }),
  e3 = (e, t) => {
    let n = tslSmoothstep(0.45, 0.65, fbmNoise(tslVec2(e, t).mul(1.6).add(3.7), 3));
    return tslFloat(1)
      .sub(n.mul(0.35))
      .mul(fbmNoise(tslVec2(e, t).mul(7), 2).mul(0.25).add(0.85));
  };
function t3(e, t) {
  let n = tslDot(e, dW),
    r = tslSmoothstep(0.99996, 0.999985, n);
  t.addAssign(
    fW.mul(
      r
        .mul(W4)
        .mul(900)
        .mul(tslSmoothstep(0.99996, 1, n).mul(0.4).add(0.6)),
    ),
  );
  let i = tslDot(e, pW);
  tslIf(i.greaterThan(Math.cos(J4 * 1.1)), () => {
    let n = tslNormalize(gB(pW, tslVec3(0, 1, 0))),
      r = gB(n, pW),
      a = e3(tslDot(e, n).div(J4), tslDot(e, r).div(J4)),
      o = tslSmoothstep(Math.cos(J4 * 1.06), Math.cos(J4), i)
        .mul(W4)
        .mul(Y4)
        .mul(a);
    t.addAssign(mW.mul(o));
  });
}
var n3 = (e, t, n) => lB.xz.add(t.xz.mul(tslFloat(e).sub(lB.y).div(n)));
function r3(e, t, n, r, i) {
  let a = Z4(e).mul(t.select(1, 0)),
    o = bB(
      Z4(e.add(hW.xz.mul(260)))
        .add(Z4(e.add(hW.xz.mul(600))).mul(0.6))
        .mul(-1.6),
    ),
    s = r.mul(0.85).add(i.mul(0.35)),
    c = gW.mul(dV(tslMax(n, 0), 6).mul(7).add(3.4)),
    l = dV(tslMax(n, 0), 18).mul(14).mul(a.oneMinus()).mul(o);
  return { density: a, colour: tslMix(s, c, o.mul(0.9).add(0.05)).add(gW.mul(l)) };
}
