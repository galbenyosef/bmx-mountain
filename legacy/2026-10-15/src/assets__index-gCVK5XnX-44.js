// assets__index-gCVK5XnX 44 — mul
// Lines 61770-62080 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
function L2(e, t, n) {
  let r = [];
  for (let i = 0; i < e; i++) {
    let a = (2 * Math.PI * t * i) / e,
      o = (i / (e - 1)) ** n;
    r.push(new M(Math.cos(a), Math.sin(a), o));
  }
  return r;
}
function R2(e = 64) {
  let n = new F2(),
    r = e * e * 4,
    i = new Uint8Array(r);
  for (let t = 0; t < e; t++)
    for (let r = 0; r < e; r++) {
      let a = t,
        o = r;
      ((i[(t * e + r) * 4] = (n.noise(a, o) * 0.5 + 0.5) * 255),
        (i[(t * e + r) * 4 + 1] = (n.noise(a + e, o) * 0.5 + 0.5) * 255),
        (i[(t * e + r) * 4 + 2] = (n.noise(a, o + e) * 0.5 + 0.5) * 255),
        (i[(t * e + r) * 4 + 3] = (n.noise(a + e, o + e) * 0.5 + 0.5) * 255));
    }
  let a = new Li(i, e, e);
  return ((a.wrapS = t), (a.wrapT = t), (a.needsUpdate = !0), a);
}
var z2 = (e, t, n, r) => new I2(mB(e), qB(t), qB(n), r),
  B2 = class extends Rc {
    static get type() {
      return `FXAANode`;
    }
    constructor(e) {
      (super(`vec4`),
        (this.textureNode = e),
        (this.updateBeforeType = Xz.FRAME),
        (this._invSize = MV(new j())));
    }
    updateBefore() {
      let e = this.textureNode.value;
      this._invSize.value.set(1 / e.image.width, 1 / e.image.height);
    }
    setup() {
      let e = this.textureNode.bias(-100),
        t = e.uvNode || FV(),
        n = Z(6),
        r = Z(8),
        i = NV([1, 1.5, 2, 2, 2, 4]),
        a = Z(0.0312),
        o = Z(0.063),
        s = Z(1),
        c = qz(([t]) => e.sample(t)),
        l = qz(([e]) => yB(c(e).rgb, $(0.3, 0.59, 0.11))),
        u = qz(([e, t, n, r]) => {
          let i = t.add(e.mul(LV(n, r)));
          return l(i);
        }),
        d = (e) => {
          let t = VB(a, o.mul(e.highest));
          return e.contrast.lessThan(t);
        },
        f = (e, t) => {
          let n = l(t),
            r = u(e, t, 0, -1),
            i = u(e, t, 1, 0),
            a = u(e, t, 0, 1),
            o = u(e, t, -1, 0),
            s = u(e, t, 1, -1),
            c = u(e, t, -1, -1),
            d = u(e, t, 1, 1),
            f = u(e, t, -1, 1),
            p = VB(a, i, r, o, n),
            m = HB(a, i, r, o, n);
          return {
            m: n,
            n: r,
            e: i,
            s: a,
            w: o,
            ne: s,
            nw: c,
            se: d,
            sw: f,
            highest: p,
            lowest: m,
            contrast: p.sub(m),
          };
        },
        p = (e) => {
          let t = Z(2).mul(e.s.add(e.e).add(e.n).add(e.w));
          ((t = t.add(e.se.add(e.sw).add(e.ne).add(e.nw))),
            (t = t.mul(1 / 12)),
            (t = eB(t.sub(e.m))),
            (t = dB(t.div(VB(e.contrast, 0)), 0, 1)));
          let n = Q(0, 1, t);
          return n.mul(n).mul(s);
        },
        m = (e, t) => {
          let n = eB(t.s.add(t.n).sub(t.m.mul(2)))
              .mul(2)
              .add(
                eB(t.se.add(t.ne).sub(t.e.mul(2))).add(
                  eB(t.sw.add(t.nw).sub(t.w.mul(2))),
                ),
              ),
            r = eB(t.e.add(t.w).sub(t.m.mul(2)))
              .mul(2)
              .add(
                eB(t.se.add(t.sw).sub(t.s.mul(2))).add(
                  eB(t.ne.add(t.nw).sub(t.n.mul(2))),
                ),
              ),
            i = n.greaterThanEqual(r),
            a = bV(i, t.s, t.e),
            o = bV(i, t.n, t.w),
            s = eB(a.sub(t.m)),
            c = eB(o.sub(t.m)),
            l = bV(i, e.y, e.x).toVar(),
            u = Z().toVar(),
            d = Z().toVar();
          return (
            Jz(s.lessThan(c), () => {
              (l.assign(l.negate()), u.assign(o), d.assign(c));
            }).Else(() => {
              (u.assign(a), d.assign(s));
            }),
            { isHorizontal: i, pixelStep: l, oppositeLuminance: u, gradient: d }
          );
        },
        h = (e, t, a, o) => {
          let s = o.toVar(),
            c = LV().toVar();
          Jz(a.isHorizontal, () => {
            (s.y.addAssign(a.pixelStep.mul(0.5)), c.assign(LV(e.x, 0)));
          }).Else(() => {
            (s.x.addAssign(a.pixelStep.mul(0.5)), c.assign(LV(0, e.y)));
          });
          let u = t.m.add(a.oppositeLuminance).mul(0.5),
            d = a.gradient.mul(0.25),
            f = s.add(c.mul(i.element(0))).toVar(),
            p = l(f).sub(u).toVar(),
            m = eB(p).greaterThanEqual(d).toVar();
          (Yz({ start: 1, end: n }, ({ i: e }) => {
            (Jz(m, () => {
              Kz();
            }),
              f.addAssign(c.mul(i.element(e))),
              p.assign(l(f).sub(u)),
              m.assign(eB(p).greaterThanEqual(d)));
          }),
            Jz(m.not(), () => {
              f.addAssign(c.mul(r));
            }));
          let h = s.sub(c.mul(i.element(0))).toVar(),
            g = l(h).sub(u).toVar(),
            _ = eB(g).greaterThanEqual(d).toVar();
          (Yz({ start: 1, end: n }, ({ i: e }) => {
            (Jz(_, () => {
              Kz();
            }),
              h.subAssign(c.mul(i.element(e))),
              g.assign(l(h).sub(u)),
              _.assign(eB(g).greaterThanEqual(d)));
          }),
            Jz(_.not(), () => {
              h.subAssign(c.mul(r));
            }));
          let v = Z().toVar(),
            y = Z().toVar();
          Jz(a.isHorizontal, () => {
            (v.assign(f.x.sub(o.x)), y.assign(o.x.sub(h.x)));
          }).Else(() => {
            (v.assign(f.y.sub(o.y)), y.assign(o.y.sub(h.y)));
          });
          let b = Z().toVar(),
            x = sB().toVar();
          Jz(v.lessThanEqual(y), () => {
            (b.assign(v), x.assign(p.greaterThanEqual(0)));
          }).Else(() => {
            (b.assign(y), x.assign(g.greaterThanEqual(0)));
          });
          let S = Z().toVar();
          return (
            Jz(x.equal(t.m.sub(u).greaterThanEqual(0)), () => {
              S.assign(0);
            }).Else(() => {
              S.assign(Z(0.5).sub(b.div(v.add(y))));
            }),
            S
          );
        },
        g = qz(([e, t]) => {
          let n = f(t, e),
            r = LV(e).toVar();
          return (
            Jz(d(n).not(), () => {
              let i = p(n),
                a = m(t, n),
                o = VB(i, h(t, n, a, e));
              Jz(a.isHorizontal, () => {
                r.y.addAssign(a.pixelStep.mul(o));
              }).Else(() => {
                r.x.addAssign(a.pixelStep.mul(o));
              });
            }),
            c(r)
          );
        }).setLayout({
          name: `FxaaPixelShader`,
          type: `vec4`,
          inputs: [
            { name: `uv`, type: `vec2` },
            { name: `texSize`, type: `vec2` },
          ],
        });
      return qz(() => g(t, this._invSize))();
    }
  },
  V2 = (e) => new B2(mB(e)),
  H2 = qz(([e, t, n = kB(16)]) => {
    let r = (t) => e.sample(t),
      i = FV(),
      a = r(i).toVar(),
      o = Z(n);
    return (
      Yz({ start: kB(1), end: n, type: `int`, condition: `<=` }, ({ i: e }) => {
        let n = t.mul(Z(e).div(o.sub(1)).sub(0.5));
        a.addAssign(r(i.add(n)));
      }),
      a.divAssign(o),
      a
    );
  }),
  U2 = qz(([e, t, n, r]) => {
    let i = r.rgb.add(n.rgb).mul(0.5).toConst(),
      a = r.rgb.sub(n.rgb).mul(0.5).add(1e-7).toConst(),
      o = t.sub(RV(i, e.a)).toConst(),
      s = o.xyz.div(a).toConst().abs().toConst(),
      c = VB(s.x, s.y, s.z).toConst();
    return c.greaterThan(1).select(RV(i, e.a).add(o.div(c)), t);
  }).setLayout({
    name: `clipAABB`,
    type: `vec4`,
    inputs: [
      { name: `currentColor`, type: `vec4` },
      { name: `historyColor`, type: `vec4` },
      { name: `minColor`, type: `vec4` },
      { name: `maxColor`, type: `vec4` },
    ],
  }),
  W2 = qz(([e, t, n]) => {
    let r = e.mul(Z(1).div(VB(e.r, e.g, e.b).add(1))).toConst(),
      i = t.mul(Z(1).div(VB(t.r, t.g, t.b).add(1))).toConst(),
      a = LB(r.rgb).toConst(),
      o = LB(i.rgb).toConst(),
      s = n.div(a.add(1)).toConst(),
      c = n.oneMinus().div(o.add(1)).toConst();
    return nB(e.mul(s), t.mul(c)).div(VB(s.add(c), 1e-5));
  }).setLayout({
    name: `flickerReduction`,
    type: `vec4`,
    inputs: [
      { name: `currentColor`, type: `vec4` },
      { name: `historyColor`, type: `vec4` },
      { name: `currentWeight`, type: `float` },
    ],
  }),
  G2 = qz(([e, t, n], r) => {
    let i = Z(2).toVar(),
      a = LV(0).toVar(),
      o = Z(-1).toVar();
    for (let s = -1; s <= 1; ++s)
      for (let c = -1; c <= 1; ++c) {
        let l = t.add(LV(s, c)).toVar(),
          u = e.load(l).r;
        (r.renderer.reversedDepthBuffer && (u = u.oneMinus()),
          r.renderer.logarithmicDepthBuffer && (u = Y2(u, n)),
          (u = u.toVar()),
          Jz(u.lessThan(i), () => {
            (i.assign(u), a.assign(l));
          }),
          Jz(u.greaterThan(o), () => {
            o.assign(u);
          }));
      }
    return J2(i, a, o);
  }),
  K2 = qz(([e, t, n, r, i, a, o], s) => {
    let c = e.sample(t).r;
    s.renderer.logarithmicDepthBuffer && (c = Y2(c, a));
    let l = EB(t, c, n),
      u = r.mul(RV(l, 1)).xyz,
      d = i.mul(RV(u, 1)).z;
    return o.isOrthographicCamera ? VV(d, a.x, a.y) : HV(d, a.x, a.y);
  });
function q2(e) {
  return Array.from({ length: e }, (e, t) => [X2(t + 1, 2), X2(t + 1, 3)]);
}
var J2 = EV({
    closestDepth: `float`,
    closestPositionTexel: `vec2`,
    farthestDepth: `float`,
  }),
  Y2 = (e, t) => {
    let { x: n, y: r } = t;
    return HV(IB(e, n, r), n, r);
  };
function X2(e, t) {
  let n = 1,
    r = 0;
  for (; e > 0;) ((n /= t), (r += (e % t) * n), (e = Math.floor(e / t)));
  return r;
}
