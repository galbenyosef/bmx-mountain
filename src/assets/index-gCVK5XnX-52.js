// assets/index-gCVK5XnX 52 — mul
// Lines 64287-64328 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function P6() {
  let e = new nS(),
    t = O$(FOLIAGE.boulder, 1.6, 0.4);
  return (
    (e.colorNode = t.color.mul(0.95)),
    (e.roughnessNode = t.roughness),
    (e.normalNode = t.normal),
    e
  );
}
function F6() {
  let e = new nS({ metalness: 0.55, roughness: 0.48 }),
    t = tslSmoothstep(0.9, 0.97, SB(tslUv().x.div(0.45)));
  return ((e.colorNode = tslVec3(0.16, 0.18, 0.18).mul(t.mul(0.35).oneMinus())), e);
}
function I6() {
  let e = new nS({ roughness: 0.12, metalness: 0.1 });
  e.colorNode = tslVec3(0.03, 0.03, 0.035);
  let t = tslUv(),
    n = tslSmoothstep(0, 0.14, t.x).mul(tslSmoothstep(1, 0.86, t.x)),
    r = tslSmoothstep(0, 0.8, t.y).mul(0.5).add(0.5);
  return (
    (e.emissiveNode = gH(M6).mul(n.mul(0.7).add(0.3)).mul(r).mul(0.9)),
    e
  );
}
function L6(e, t) {
  let n = XW(t, 128);
  return (
    (n.fillStyle = N6.board),
    n.fillRect(0, 0, t, 128),
    (n.strokeStyle = N6.frame),
    (n.lineWidth = 10),
    n.strokeRect(5, 5, t - 10, 118),
    (n.font = `900 78px ${YW}`),
    (n.textAlign = `center`),
    (n.textBaseline = `middle`),
    (n.fillStyle = N6.letters),
    n.fillText(e, t / 2, 68),
    new nS({ map: ZW(n), roughness: 0.8 })
  );
}
