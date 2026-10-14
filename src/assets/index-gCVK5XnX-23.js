// assets/index-gCVK5XnX 23 — mul
// Lines 54870-54937 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function eq(e, t = $K(e), n = ``) {
  let r = HF(GF(e)),
    i = QK[kF(t, QK.length)],
    a = i.shirt === IG;
  return {
    frame: ZK(i.frame),
    rims: ZK(XK(r, [1118740, zG, 1118740, BG])),
    tyreWall: ZK(XK(r, [1710618, 1710618, 9136709, 14275780])),
    grips: ZK(XK(r, [1118481, i.accent, i.accent, LG])),
    shirt: ZK(i.shirt),
    pants: ZK(XK(r, [2303532, 3883602, 5917242, 1780288, 4869946])),
    gloves: ZK(XK(r, [IG, i.accent, LG, 2763306])),
    helmet: ZK(i.helmet),
    stripe: ZK(
      i.accent === i.helmet ? (i.shirt === i.helmet ? IG : i.shirt) : i.accent,
    ),
    skin: ZK(XK(r, [15845285, 14262394, 11696722, 8213046, 5913126, 15251604])),
    lens: ZK(XK(r, [13784362, 3832544, 14263089, 10134702, 9065174])),
    accent: ZK(i.accent),
    trim: ZK(a ? UG : XK(r, [IG, 1843760, 2365978, 1713184])),
    socks: ZK(XK(r, [15921386, 15921386, IG, 9080726])),
    shoes: ZK(XK(r, [IG, UG, 7031342, RG, 3817290])),
    number: 1 + Math.floor(r() * 98),
    name: n,
  };
}
var tq = {
    pads: [1908258, 0.42, 0.15],
    sole: [14207142, 0.9, 0],
    plateBack: [15328989, 0.5, 0],
    chrome: [14080220, 0.18, 1],
    black: [1579291, 0.5, 0.4],
  },
  nq = (e, t, n) => new nS({ color: e, roughness: t, metalness: n }),
  rq = (e, t) => new nS({ map: e, roughness: t }),
  iq = 0.012,
  aq = 8;
function oq(e, t) {
  let n = new nS({ map: e });
  ((n.roughnessNode = DV(cK()).g), (n.normalNode = cB(DV(cK()).r, Z(aq))));
  let r = sV,
    i = MU(r.xy.mul(9).add(yW.mul(14)))
      .add(MU(r.zy.mul(13).sub(yW.mul(19))).mul(0.6))
      .sub(0.8),
    a = FV().x.greaterThan(0.75).and(FV().y.lessThan(0.5));
  return ((n.positionNode = r.add(YB.mul(i.mul(t).mul(bV(a, 0, iq))))), n);
}
function sq(e, t) {
  return {
    cloth: oq(aK(e), t),
    pads: hH(tq.pads),
    shoe: nq(e.shoes, 0.75, 0),
    sole: hH(tq.sole),
    helmet: YK(e),
    goggles: nq(e.stripe, 0.55, 0),
    plate: rq(fK(e), 0.45),
    plateBack: hH(tq.plateBack),
    paint: nq(e.frame, 0.32, 0.35),
    chrome: hH(tq.chrome),
    black: hH(tq.black),
    rubber: hH(pH.rubber),
    wall: nq(e.tyreWall, 0.85, 0),
    rim: nq(e.rims, 0.3, 0.8),
    grips: nq(e.grips, 0.8, 0),
    gloves: nq(e.gloves, 0.7, 0),
    lens: nq(e.lens, 0.06, 1),
  };
}
