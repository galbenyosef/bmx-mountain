// assets/index-gCVK5XnX 65 — mul
// Lines 67841-67880 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function Zee(e, t, n) {
  let r = new Xr();
  (r.setAttribute(`position`, e),
    r.setAttribute(`normal`, t),
    r.setAttribute(`alpha`, n),
    r.setAttribute(`uv`, XV(A9 * 4)));
  let i = new Uint32Array(A9 * 6);
  for (let e = 0; e < A9; e++)
    i.set(
      [e * 4, e * 4 + 1, e * 4 + 2, e * 4 + 1, e * 4 + 3, e * 4 + 2],
      e * 6,
    );
  (r.setIndex(new Fr(i, 1)), (r.drawRange.count = 6));
  let a = new nS({ transparent: !0, depthWrite: !1, roughness: 0.95, side: 2 });
  ((a.colorNode = RV(...mH.track, oB(`alpha`, `float`))),
    (a.normalNode = LU(oB(`normal`, `vec3`))),
    BU(a));
  let o = new wi(r, a);
  return ((o.frustumCulled = !1), (o.receiveShadow = !0), o);
}
function Qee(e, t, n) {
  let r = QV();
  (r.setAttribute(`spot`, e),
    r.setAttribute(`along`, t),
    r.setAttribute(`across`, n),
    (r.instanceCount = 2));
  let i = new Wy({ transparent: !0, depthWrite: !1 }),
    a = oB(`spot`, `vec4`),
    o = oB(`along`, `vec4`),
    s = oV;
  i.positionNode = a.xyz
    .add(o.xyz.mul(s.y.mul(j9[0] * 2)))
    .add(oB(`across`, `vec3`).mul(s.x.mul(j9[1] * 2)));
  let c = MB(FV().sub(0.5).mul(2));
  ((i.colorNode = RV(0, 0, 0, Q(1, o.w.mul(0.6), c).mul(a.w))),
    (i.mrtNode = zU()),
    BU(i));
  let l = new wi(r, i);
  return ((l.frustumCulled = !1), (l.renderOrder = 4), l);
}
