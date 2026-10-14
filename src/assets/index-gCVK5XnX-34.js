// assets/index-gCVK5XnX 34 — mul
// Lines 58383-58706 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function s$(e) {
  let n = new hn(new Uint8Array(o$ * o$ * 4 * i$.length), o$, o$, i$.length);
  return (
    (n.wrapS = n.wrapT = t),
    (n.magFilter = s),
    (n.minFilter = l),
    (n.generateMipmaps = !0),
    (n.anisotropy = 8),
    e && (n.colorSpace = Ye),
    n
  );
}
var c$ = s$(!0),
  l$ = s$(!1);
async function u$(e) {
  let t = await (await fetch(e)).blob(),
    n = await createImageBitmap(t, {
      colorSpaceConversion: `none`,
      premultiplyAlpha: `none`,
    }),
    r = new OffscreenCanvas(o$, o$).getContext(`2d`, {
      willReadFrequently: !0,
    });
  return (
    r.drawImage(n, 0, 0, o$, o$),
    n.close(),
    r.getImageData(0, 0, o$, o$).data
  );
}
async function d$(e) {
  if (!e) for (let e of [c$, l$]) ((e.generateMipmaps = !1), (e.minFilter = s));
  let t = o$ * o$ * 4;
  (await Promise.all(
    i$.flatMap((e, n) =>
      [`c`, `n`].map(async (r) => {
        let i = await u$(`tex/${e}_${r}.webp`);
        (r === `c` ? c$ : l$).image.data.set(i, n * t);
      }),
    ),
  ),
    (c$.needsUpdate = !0),
    (l$.needsUpdate = !0));
}
var f$ = [],
  p$ = new Map();
function m$(e, n, r = 8, i = !0) {
  let a = `${e} ${n} ${r} ${i}`,
    o = p$.get(a);
  if (o) return o;
  let s = new fn();
  return (
    p$.set(a, s),
    (s.flipY = !1),
    f$.push(
      fetch(e)
        .then((e) => e.blob())
        .then((e) =>
          createImageBitmap(e, {
            imageOrientation: `flipY`,
            premultiplyAlpha: `none`,
          }),
        )
        .then((e) => {
          ((s.image = e), (s.needsUpdate = !0));
        })
        .catch((t) => console.warn(`[textures] couldn't load`, e, t)),
    ),
    n && (s.colorSpace = Ye),
    i && (s.wrapS = s.wrapT = t),
    (s.anisotropy = r),
    s
  );
}
var h$ = () => Promise.all(f$);
function g$(e, t, n = 8) {
  return {
    colour: tslTexture(m$(`tex/${e}_color_1k.webp`, !0, n), t).rgb,
    normal: XB(tslTexture(m$(`tex/${e}_normal_1k.webp`, !1, n), t)),
  };
}
function _$(e, t, n, r, i, a) {
  let o = new Li(e, t, n, i, a);
  return ((o.magFilter = o.minFilter = r), (o.needsUpdate = !0), o);
}
function v$(e, t, n, r) {
  return _$(e, GRID_N, GRID_N, t, n, r);
}
var y$ = tslTexture(new Li(new Uint8Array(4), 1, 1)),
  b$ = tslTexture(new Li(new Uint8Array(4), 1, 1));
function x$(e) {
  ((y$.value = v$(e.cover, s)), (b$.value = v$(e.cover2, s)));
}
var S$ = new WeakMap();
function C$(e) {
  let t = S$.get(e);
  return (t || S$.set(e, (t = v$(e.h, i, ee, _))), t);
}
function w$(e) {
  return e
    .add(WORLD_HALF)
    .div(WORLD_HALF * 2)
    .mul((GRID_N - 1) / GRID_N)
    .add(0.5 / GRID_N);
}
var T$ = (e) => NU(e, 0.27, 0.31),
  E$ = (e) => T$(e).add(0.37);
function D$(e, t, n) {
  let r = E$(t),
    i = tslMix(tslTexture(c$, t).depth(tslInt(e)).rgb, tslTexture(c$, r).depth(tslInt(e)).rgb, n),
    a = tslMix(tslTexture(l$, t).depth(tslInt(e)).rgb, tslTexture(l$, r).depth(tslInt(e)).rgb, n);
  return { c: i, r: a.b, n: tslVec3(a.r.mul(2).sub(1), a.g.mul(2).sub(1), 0) };
}
function O$(e, t, n) {
  let r = uV,
    i = $B,
    a = HU(i),
    o = tslSmoothstep(0.35, 0.65, valueNoise(r.xz.mul(n))),
    s = (n) => D$(e, n.div(t), o),
    c = s(r.zy),
    l = s(r.xz),
    u = s(r.xy);
  return {
    color: UU(a, c.c, l.c, u.c),
    roughness: UU(a, c.r, l.r, u.r),
    normal: LU(
      tslNormalize(
        i.add(
          UU(a, tslVec3(0, c.n.y, c.n.x), tslVec3(l.n.x, 0, l.n.y), tslVec3(u.n.x, u.n.y, 0)),
        ),
      ),
    ),
  };
}
function k$(e, t, n, r, i) {
  return tslFn(() => {
    let a = tslVec4(0).toVar();
    return (
      tslIf(i.lessThan(1), () => {
        a.assign(tslTexture(e, n).depth(tslInt(t)).grad(r.x, r.y));
      }),
      tslIf(i.greaterThan(0), () => {
        a.assign(tslMix(a, tslTexture(e, E$(n)).depth(tslInt(t)).grad(T$(r.x), T$(r.y)), i));
      }),
      a
    );
  })();
}
function A$(e, t, n) {
  let r = n.toVar();
  return (
    e.forEach((n, i) => {
      let a = n.w ? n.w.greaterThan(0) : null;
      for (let t of e.slice(i + 1)) {
        if (!t.w) continue;
        let e = t.w.lessThan(1);
        a = a ? a.and(e) : e;
      }
      let o = () => {
        r.assign(n.w ? tslMix(r, n[t](), n.w) : n[t]());
      };
      a ? tslIf(a, o) : o();
    }),
    r
  );
}
function j$(e) {
  let t = w$(uV.xz);
  return M$(uV, $B, e, y$.sample(t), b$.sample(t), 0);
}
function M$(e, t, n, r, i, a) {
  let o = e.xz,
    s = tslSmoothstep(30, 160, n).oneMinus(),
    c = fbmNoise(o.mul(0.011).add(3), 3),
    l = fbmNoise(o.mul(0.09), 3),
    u = {
      p: e,
      n: t,
      xz: o,
      big: c,
      mid: l,
      edge: l.sub(0.5).mul(0.45),
      steep: t.y.oneMinus(),
      cov: r,
      cov2: i,
      canopy: a,
    },
    d = i.a,
    f = P$(u, `c`, tslVec3(0)).mul(l.mul(0.3).add(0.85)).mul(d.mul(-0.4).add(1)),
    p = P$(u, `r`, tslVec4(0)),
    m = tslNormalize(t.add(p.xyz.mul(s.mul(0.9).add(0.1))));
  return {
    color: f,
    roughness: tslMix(dB(p.w, 0.35, 1), 0.3, d.mul(0.7)),
    normal: m,
  };
}
function N$(e, t) {
  let n = e.toVar();
  return (n.assign(t), n);
}
function P$(e, t, n) {
  return tslFn(() => A$(I$(e, F$(e), t, n), t, n))();
}
function F$({
  p: e,
  n: t,
  xz: n,
  big: r,
  mid: i,
  edge: a,
  steep: o,
  cov: s,
  cov2: c,
}) {
  return {
    dx: N$(tslVec3(0), _B(e)),
    dy: N$(tslVec3(0), vB(e)),
    tileMix: N$(tslFloat(0), tslSmoothstep(0.35, 0.65, valueNoise(n.mul(0.045)))),
    dry: N$(tslFloat(0), tslSmoothstep(0.38, 0.68, r.add(i.sub(0.5).mul(0.35)))),
    aspen: N$(tslFloat(0), tslSmoothstep(0.3, 0.7, c.r)),
    w: N$(tslVec3(0), HU(t)),
    wForest: N$(tslFloat(0), tslSmoothstep(0.35, 0.65, s.g.add(a))),
    wDirt: N$(tslFloat(0), tslSmoothstep(0.3, 0.7, s.r.add(a.mul(1.2)))),
    wRock: N$(tslFloat(0), tslSmoothstep(0.42, 0.62, tslMax(s.b, tslSmoothstep(0.34, 0.52, o)).add(a))),
    wSnow: N$(tslFloat(0), tslSmoothstep(0.4, 0.6, s.a.add(a)).mul(tslSmoothstep(0.35, 0.6, t.y))),
  };
}
function I$({ p: e, xz: t, canopy: n }, r, i, a) {
  let { dx: o, dy: s, tileMix: c, dry: l, aspen: u, w: d } = r,
    f = (e, t, n, r) => ({ uv: e.div(r), g: { x: t.div(r), y: n.div(r) } }),
    p = (e) => f(t, o.xz, s.xz, e),
    m = (e, t) => k$(c$, e, t.uv, t.g, c).rgb,
    h = (e, t) => {
      let n = k$(l$, e, t.uv, t.g, c);
      return tslVec4(n.r.mul(2).sub(1), 0, n.g.mul(2).sub(1), n.b);
    },
    g = {
      w: null,
      c: () =>
        m(FOLIAGE.meadow, p(4.5)).mul(tslMix(tslVec3(0.95, 1.05, 0.75), tslVec3(1.35, 1.1, 0.6), l)),
      r: () => h(FOLIAGE.meadow, p(4.5)),
    },
    _ = () =>
      A$(
        [
          {
            w: null,
            c: () => m(FOLIAGE.needles, p(3.4)),
            r: () => h(FOLIAGE.needles, p(3.4)),
          },
          {
            w: u,
            c: () => m(FOLIAGE.leaves, p(3.2)).mul(tslVec3(1.1, 1, 0.9)),
            r: () => h(FOLIAGE.leaves, p(3.2)),
          },
        ],
        i,
        a,
      ),
    v = () => {
      let e = tslMax(u, tslSmoothstep(0.55, 0.75, fbmNoise(t.mul(0.006).add(9), 3)).mul(0.6));
      return tslMix(tslVec3(0.03, 0.06, 0.025), tslVec3(0.42, 0.24, 0.04), e).mul(
        valueNoise(t.mul(0.05)).mul(0.6).add(0.7),
      );
    },
    y = (t) => f(e[t], o[t], s[t], 9);
  return [
    g,
    { w: r.wForest, c: () => (n ? v() : _()), r: _ },
    { w: r.wDirt, c: () => m(FOLIAGE.packed, p(3)), r: () => h(FOLIAGE.packed, p(3)) },
    {
      w: r.wRock,
      c: () =>
        UU(d, m(FOLIAGE.cliff, y(`zy`)), m(FOLIAGE.cliff, y(`xz`)), m(FOLIAGE.cliff, y(`xy`))),
      r: () => {
        let e = h(FOLIAGE.cliff, y(`zy`)),
          t = h(FOLIAGE.cliff, y(`xz`)),
          n = h(FOLIAGE.cliff, y(`xy`));
        return tslVec4(UU(d, tslVec3(0, e.z, e.x), tslVec3(t.x, 0, t.z), tslVec3(n.x, n.z, 0)), t.w);
      },
    },
    { w: r.wSnow, c: () => m(FOLIAGE.snow, p(6)), r: () => h(FOLIAGE.snow, p(6)) },
  ];
}
var L$ = 128,
  R$ = 1,
  z$ = [0.3, 0.65, 1],
  B$ = [0.2, 0.42, 0.64, 0.82, 1],
  V$ = [2.6, XI],
  H$ = [0, 0.25, 0.5, 0.75, 1],
  U$ = 1.2,
  W$ = 1.6,
  G$ = { s: 0, u: 0 },
  K$ = { x: 0, z: 0, tx: 0, tz: 0 };
function q$() {
  let e = new nS(),
    t = tslAttribute(`under`, `float`),
    n = uV,
    r = tslLength(IU()),
    i = tslSmoothstep(0.35, 0.65, valueNoise(n.xz.mul(0.07))),
    a = D$(FOLIAGE.boulder, n.xz.div(1.1), i),
    o = tslSmoothstep(-0.3, 0.02, t.add(valueNoise(n.xz.mul(1.3)).sub(0.5).mul(0.25))),
    s = j$(r),
    c = $B,
    l = tslSmoothstep(25, 120, r).oneMinus(),
    u = tslNormalize(c.add(tslVec3(a.n.x, 0, a.n.y).mul(l.mul(0.9).add(0.1))));
  return (
    (e.colorNode = tslMix(s.color, a.c.mul(tslVec3(0.5, 0.55, 0.48)), o)),
    (e.roughnessNode = tslMix(s.roughness, 0.24, o)),
    (e.normalNode = LU(tslNormalize(tslMix(s.normal, u, o)))),
    VU(e),
    e
  );
}
function J$(e, t, n, r) {
  let i = tslSmoothstep(4.6, 7, n).mul(tslSmoothstep(0.4, 0.68, e.add(t).mul(0.5))),
    a = tslSmoothstep(2.8, 5, n)
      .mul(tslSmoothstep(0.42, 0.3, r))
      .mul(tslSmoothstep(0.62, 0.85, t.mul(0.7).add(e.mul(0.3)))),
    o = tslSmoothstep(0.14, 0.05, r)
      .mul(tslSmoothstep(0.5, 0.75, t))
      .mul(0.85);
  return tslMax(tslMax(i, a), tslMax(o, tslSmoothstep(0.06, 0, r).mul(0.35)));
}
