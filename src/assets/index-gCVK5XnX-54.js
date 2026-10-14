// assets/index-gCVK5XnX 54 — float32array
// Lines 64784-65006 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function W6(e) {
  let t = new Do(1, 2),
    n = t.getAttribute(`position`),
    r = new M();
  for (let t = 0; t < n.count; t++)
    (r.fromBufferAttribute(n, t),
      r.multiplyScalar(wL(e, r.x, r.y, r.z)),
      (r.y *= r.y > 0 ? SL : CL),
      n.setXYZ(t, r.x, r.y, r.z));
  return (t.computeVertexNormals(), t);
}
function G6(e) {
  let t = e[0].getAttribute(`position`).count,
    n = new Float32Array(t * e.length * 2 * 4);
  return (
    e.forEach((r, i) => {
      for (let [a, o] of [
        [i, `position`],
        [i + e.length, `normal`],
      ]) {
        let e = r.getAttribute(o);
        for (let r = 0; r < t; r++)
          n.set([e.getX(r), e.getY(r), e.getZ(r), 0], (a * t + r) * 4);
      }
    }),
    _$(n, t, e.length * 2, i, E, _)
  );
}
function K6(e) {
  let t = new nS(),
    n = (e) => oB(`rock${e}`, `vec4`),
    r = BB(n(0), n(1), n(2), n(3)),
    i = oB(`rockLook`, `vec2`),
    a = i.x.toInt(),
    o = (t) => OV(e, jB(kB(BV), t)).xyz;
  t.positionNode = qz(() => {
    let e = r.mul(o(a)).xyz;
    return (cV.assign(e), YB.assign(AV(o(a.add(4)), r)), e);
  })();
  let s = O$(a$.boulder, 2.2, 0.3);
  return (
    (t.colorNode = IV(i.y).mul(s.color)),
    (t.roughnessNode = s.roughness),
    (t.normalNode = s.normal),
    t
  );
}
function q6(e, t) {
  let n = (e) => Math.floor(e.z / V6) * 1e4 + Math.floor(e.x / V6),
    r = [...e].sort((e, t) => n(e) - n(t)),
    i = r.length,
    a = [0, 1, 2, 3].map(() => new Float32Array(i * 4));
  a.push(new Float32Array(i * 2));
  let o = new Float32Array(i * 4),
    s = [],
    c = new N(),
    l = new qt(),
    u = new M(),
    d = new M(),
    f = new Hr();
  return (
    r.forEach((e, i) => {
      let p = TL(e);
      (l.setFromAxisAngle(GV, e.rot),
        u.set(p.sx, p.sy, p.sz),
        d.set(e.x, p.cy, e.z),
        c.compose(d, l, u));
      for (let e = 0; e < 4; e++)
        a[e].set(c.elements.slice(e * 4, e * 4 + 4), i * 4);
      ((a[4][i * 2] = p.shape),
        (a[4][i * 2 + 1] = 0.85 + ((e.seed * 13) % 1) * 0.3),
        f.copy(t[p.shape].boundingSphere).applyMatrix4(c),
        o.set([...f.center.toArray(), f.radius], i * 4));
      let m = s[s.length - 1];
      m && n(r[m.first]) === n(e)
        ? ((m.end = i + 1), m.ball.union(f))
        : s.push({ first: i, end: i + 1, ball: f.clone() });
    }),
    { data: a, balls: o, cells: s }
  );
}
function J6(e, t, n, { data: r, balls: i, cells: a }) {
  let o = i.length / 4,
    s = uH(t),
    c = r.map((e, t) => dH(o, t < 4 ? 4 : 2));
  (c.forEach((e, t) => s.setAttribute(t < 4 ? `rock${t}` : `rockLook`, e)),
    (s.instanceCount = 0));
  let l = eH(s, n, e !== f3.Eye);
  return (
    l.layers.set(e),
    (l.frustumCulled = !1),
    (l.onBeforeRender = (e, t, n) => {
      lH(n, H6);
      let o = 0;
      for (let e of a)
        if (H6.intersectsSphere(e.ball)) {
          for (let t = e.first; t < e.end; t++)
            if (
              (U6.center.fromArray(i, t * 4),
              (U6.radius = i[t * 4 + 3]),
              H6.intersectsSphere(U6))
            ) {
              for (let e = 0; e < c.length; e++) {
                let n = c[e].itemSize,
                  i = c[e].array;
                for (let a = 0; a < n; a++) i[o * n + a] = r[e][t * n + a];
              }
              o++;
            }
        }
      s.instanceCount = o;
      for (let e of c) sH(e, o);
    }),
    l
  );
}
function Y6(e, t = !0) {
  let n = Array.from({ length: 4 }, (e, t) => W6(t)),
    r = K6(G6(n));
  for (let e of n) e.computeBoundingSphere();
  let i = q6(e, n);
  return (t ? [f3.Eye, f3.NearShadow, f3.FarShadow] : [f3.Eye]).map((e) =>
    J6(e, n[0], r, i),
  );
}
var X6 = { high: 1, driven: 0.15, foot: 0.017, top: 0.013 },
  Z6 = 0.07,
  Q6 = 0.85,
  $6 = 0.06,
  e8 = 0.06,
  t8 = 10,
  n8 = 0.7,
  r8 = 0.24,
  i8 = new Yn(13112846),
  a8 = new Yn(RG);
function o8() {
  let e = new nS({ roughness: 0.4, side: 2 }),
    t = FV().x.add(FV().y.mul(e8)).div(r8),
    n = CB(t),
    r = Q(n.negate().add(0.25), n.add(0.25), eB(SB(t).sub(0.5)));
  return ((e.colorNode = UB(gH(a8), gH(i8), r)), e);
}
function s8(e, t, n) {
  return e.map((e) => {
    let r = new M(t() - 0.5, 0, t() - 0.5).multiplyScalar(Z6),
      i = new M(e.x, e.y - X6.driven, e.z),
      a = (e) => i.clone().addScaledVector(GV, e).addScaledVector(r, e);
    return (
      n.push($V(i, a(X6.driven + X6.high), X6.foot, X6.top, 6)),
      a(X6.driven + Q6)
    );
  });
}
var c8 = new M(),
  l8 = new M(),
  u8 = new M(),
  d8 = new M(),
  f8 = new M(),
  p8 = new M();
function m8(e, t, n) {
  let r = 0;
  for (let i = 1; i < e.length; i++) {
    let a = c8.copy(e[i - 1]),
      o = l8.copy(e[i]),
      s = a.distanceTo(o),
      c = (t() - 0.5) * 2 * n8;
    d8.subVectors(o, a).normalize();
    for (let e = 0; e <= t8; e++) {
      let t = e / t8,
        i = u8.lerpVectors(a, o, t);
      ((i.y -= $6 * 4 * t * (1 - t)),
        f8.copy(GV).addScaledVector(d8, -d8.y).normalize(),
        f8.applyAxisAngle(d8, c * Math.sin(Math.PI * t)),
        p8.crossVectors(d8, f8));
      let l = n.pos.length / 3;
      for (let e of [-0.5, 0.5])
        (n.pos.push(
          i.x + f8.x * e * e8,
          i.y + f8.y * e * e8,
          i.z + f8.z * e * e8,
        ),
          n.nor.push(p8.x, p8.y, p8.z),
          n.uvs.push(r + s * t, e + 0.5));
      e > 0 && n.idx.push(l - 2, l, l - 1, l - 1, l, l + 1);
    }
    r += s;
  }
}
var h8 = class {
    group = new Hn();
    constructor(e) {
      let t = HF(53),
        n = [],
        r = { pos: [], nor: [], uvs: [], idx: [] };
      for (let i of e) m8(s8(i, t, n), t, r);
      if (!n.length) return;
      let i = new Xr();
      (i.setAttribute(`position`, new Fr(new Float32Array(r.pos), 3)),
        i.setAttribute(`normal`, new Fr(new Float32Array(r.nor), 3)),
        i.setAttribute(`uv`, new Fr(new Float32Array(r.uvs), 2)),
        i.setIndex(r.idx),
        this.group.add(eH(tH(n), hH(pH.wood)), eH(i, o8())));
    }
  },
  g8 = 32,
  _8 = (oz - 1) / g8,
  v8 = [1, 2, 4, 8],
  y8 = [140, 380, 850],
  b8 = 12,
  x8 = [8, 4, 2],
  S8 = [3, 2, 1],
  C8 = 5e3;
function w8() {
  let e = new nS(),
    t = j$(MB(IU()));
  return (
    (e.colorNode = t.color),
    (e.roughnessNode = t.roughness),
    (e.normalNode = LU(t.normal)),
    VU(e, 2),
    e
  );
}
