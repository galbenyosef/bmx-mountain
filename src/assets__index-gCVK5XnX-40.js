// assets__index-gCVK5XnX 40 — mul
// Lines 60197-60264 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function Z0() {
  let e = new nS(),
    t = uV,
    n = $B,
    r = MB(IU()),
    i = t.xz,
    { n: a, gully: o, across: s } = X0(n, i),
    c = a.y.oneMinus(),
    l = t.y,
    u = PU(i.div(900), 3),
    d = PU(LV(yB(i, s).div(18), l.div(300)), 3),
    f = UB(
      $(0.1, 0.095, 0.09),
      $(0.34, 0.31, 0.27),
      u.mul(0.4).add(d.mul(0.6)),
    ).mul(o.mul(0.7).add(0.55)),
    p = u.mul(500).add(1250),
    m = o.oneMinus().mul(0.5).add(0.5),
    h = Q(p, p.add(160), l.add(m.mul(260))).mul(
      Q(0.66, 0.36, c.sub(m.mul(0.12))),
    ),
    g = Q(1050, 850, l.add(u.mul(200)))
      .mul(Q(0.55, 0.3, c))
      .mul(
        Q(0.35, 0.6, PU(i.div(400), 3))
          .mul(0.6)
          .add(0.4),
      ),
    _ = Q(500, lI(250), l).mul(Q(0.35, 0.15, c)),
    v = f;
  ((v = UB(v, $(0.32, 0.27, 0.11).mul(u.mul(0.5).add(0.75)), _)),
    (v = UB(
      v,
      UB(
        $(0.025, 0.045, 0.02),
        $(0.3, 0.17, 0.03),
        Q(0.62, 0.78, PU(i.div(300).add(4), 3)).mul(0.5),
      ),
      g,
    )),
    (v = UB(v, $(0.86, 0.89, 0.94), h)));
  let y = M$(t, n, r, oB(`cover`, `vec4`), RV(0.3, 0, 1, 0), 1),
    b = Q(2400, 1600, r);
  return (
    (e.colorNode = UB(v, y.color, b)),
    (e.roughnessNode = UB(UB(0.88, 0.6, h), y.roughness, b)),
    (e.normalNode = LU(eV(UB(a, y.normal, b)))),
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
