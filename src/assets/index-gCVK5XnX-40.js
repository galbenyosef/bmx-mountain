// assets/index-gCVK5XnX 40 — mul
// Lines 60197-60264 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function Z0() {
  let e = new nS(),
    t = uV,
    n = $B,
    r = tslLength(IU()),
    i = t.xz,
    { n: a, gully: o, across: s } = X0(n, i),
    c = a.y.oneMinus(),
    l = t.y,
    u = fbmNoise(i.div(900), 3),
    d = fbmNoise(tslVec2(tslDot(i, s).div(18), l.div(300)), 3),
    f = tslMix(
      tslVec3(0.1, 0.095, 0.09),
      tslVec3(0.34, 0.31, 0.27),
      u.mul(0.4).add(d.mul(0.6)),
    ).mul(o.mul(0.7).add(0.55)),
    p = u.mul(500).add(1250),
    m = o.oneMinus().mul(0.5).add(0.5),
    h = tslSmoothstep(p, p.add(160), l.add(m.mul(260))).mul(
      tslSmoothstep(0.66, 0.36, c.sub(m.mul(0.12))),
    ),
    g = tslSmoothstep(1050, 850, l.add(u.mul(200)))
      .mul(tslSmoothstep(0.55, 0.3, c))
      .mul(
        tslSmoothstep(0.35, 0.6, fbmNoise(i.div(400), 3))
          .mul(0.6)
          .add(0.4),
      ),
    _ = tslSmoothstep(500, lI(250), l).mul(tslSmoothstep(0.35, 0.15, c)),
    v = f;
  ((v = tslMix(v, tslVec3(0.32, 0.27, 0.11).mul(u.mul(0.5).add(0.75)), _)),
    (v = tslMix(
      v,
      tslMix(
        tslVec3(0.025, 0.045, 0.02),
        tslVec3(0.3, 0.17, 0.03),
        tslSmoothstep(0.62, 0.78, fbmNoise(i.div(300).add(4), 3)).mul(0.5),
      ),
      g,
    )),
    (v = tslMix(v, tslVec3(0.86, 0.89, 0.94), h)));
  let y = M$(t, n, r, tslAttribute(`cover`, `vec4`), tslVec4(0.3, 0, 1, 0), 1),
    b = tslSmoothstep(2400, 1600, r);
  return (
    (e.colorNode = tslMix(v, y.color, b)),
    (e.roughnessNode = tslMix(tslMix(0.88, 0.6, h), y.roughness, b)),
    (e.normalNode = LU(tslNormalize(tslMix(a, y.normal, b)))),
    e
  );
}
async function Q0() {
  let { pos: e, cover: t } = await BF(
    () =>
      new Worker(
        new URL(
          new URL(`horizon.worker-C1soCJoO.js`, import.meta.url).href,
          `` + import.meta.url,
        ),
        { type: `module` },
      ),
    null,
    Y0,
  );
  return new wi(
    fH({ position: new Fr(e, 3), cover: new Fr(t, 4) }, ZV(111, 513)),
    Z0(),
  );
}
