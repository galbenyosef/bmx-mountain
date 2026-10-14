// assets/index-gCVK5XnX 42 — mul
// Lines 60768-61109 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function m2(e, t, n) {
  let r = (e, t) => {
    let r = new Wy();
    r.colorNode = e;
    let i = new Wy({ side: 2 });
    return ((i.colorNode = t), (i.opacityNode = n), (i.alphaTest = f2), [r, i]);
  };
  return { colour: r(e, t), normal: r(nV(QB), nV(QB)) };
}
function h2(e, t, n) {
  let r = tslAttribute(`tree`, `vec4`),
    i = tslAttribute(`look`, `vec4`),
    a = tslAttribute(`fade`, `float`),
    o = new nS({ roughness: 0.82, side: 2 }),
    s = r.xyz,
    c = tslNormalize(lB.xz.sub(s.xz).add(tslVec2(1e-4, 0))),
    l = tslVec3(c.y, 0, c.x.negate()),
    u = r.w,
    d = oV;
  o.positionNode = s.add(l.mul(d.x.mul(u).mul(i.y))).add(tslVec3(0, d.y.mul(u), 0));
  let f = xB(SB(aB(c.x, c.y).sub(i.x).div(TAU)).mul(l2).add(0.5)).mod(l2),
    p = tslUv(),
    m = n ? p.y.oneMinus() : p.y,
    h = tslVec2(f.add(p.x), i.z.add(m)).div(tslVec2(l2, e.rows)),
    g = tslTexture(e.colour.texture, h),
    _ = h.mul(tslVec2(e.colour.width, e.colour.height)),
    v = tslMax(FB(tslMax(tslLength(_B(_)), tslLength(vB(_)))), 0),
    y = g.a.mul(v.mul(0.32).add(1));
  ((o.colorNode = tslVec4(g.rgb.mul(i.w), y)),
    FU(o, y, 0.5, a.greaterThanEqual(WU())));
  let b = PV(tslTexture(e.normal.texture, h).rgb),
    x = hB(i.x),
    S = tslSin(i.x);
  return (
    (o.normalNode = LU(
      tslNormalize(tslVec3(b.x.mul(x).add(b.z.mul(S)), b.y, b.z.mul(x).sub(b.x.mul(S)))),
    )),
    (o.emissiveNode = g.rgb.mul(i.w).mul(gW).mul(JW().mul(t))),
    o
  );
}
var g2 = class {
    mesh;
    fade;
    tree;
    look;
    constructor(e, t, n, r) {
      let i = QV(-0.5, u2, 0, d2);
      ((this.tree = makeBuffer(t, 4)),
        (this.look = makeBuffer(t, 4)),
        (this.fade = makeBuffer(t, 1)),
        i.setAttribute(`tree`, this.tree),
        i.setAttribute(`look`, this.look),
        i.setAttribute(`fade`, this.fade),
        (i.instanceCount = t),
        (this.mesh = addMesh(i, h2(e, n, r))),
        (this.mesh.frustumCulled = !1));
    }
    set(e, t, n, r, i, a, o, s, c, l) {
      let u = this.tree.array,
        d = this.look.array;
      ((u[e * 4] = t),
        (u[e * 4 + 1] = n),
        (u[e * 4 + 2] = r),
        (u[e * 4 + 3] = i),
        (d[e * 4] = a),
        (d[e * 4 + 1] = o),
        (d[e * 4 + 2] = s),
        (d[e * 4 + 3] = c),
        this.setFade(e, l));
    }
    setFade(e, t) {
      this.fade.array[e] = t;
    }
    show(e) {
      cH(this.mesh, e);
    }
    commit(e) {
      ((this.fade.needsUpdate = !0),
        e || ((this.tree.needsUpdate = !0), (this.look.needsUpdate = !0)));
    }
  },
  _2 = new Gw(),
  v2 = new j(),
  y2 = [60, 300, 180, 240, 120, 0],
  b2 = [0, 0.5, 0.25, 0.75],
  x2,
  S2 = class extends Rc {
    static get type() {
      return `GTAONode`;
    }
    constructor(e, t, n) {
      (super(`float`),
        (this.depthNode = e),
        (this.normalNode = t),
        (this.resolutionScale = 1),
        (this.updateBeforeType = Xz.FRAME),
        (this._aoRenderTarget = new mn(1, 1, { depthBuffer: !1, format: ee })),
        (this._aoRenderTarget.texture.name = `GTAONode.AO`),
        (this.radius = tslUniform(0.25)),
        (this.thickness = tslUniform(1)),
        (this.distanceExponent = tslUniform(1)),
        (this.distanceFallOff = tslUniform(1)),
        (this.scale = tslUniform(1)),
        (this.samples = tslUniform(16)),
        (this.useTemporalFiltering = !1),
        (this._resolution = tslUniform(new j())),
        (this._noiseTexture = C2()),
        (this._noiseNode = tslTexture(this._noiseTexture)),
        (this._cameraProjectionMatrix = tslUniform(n.projectionMatrix)),
        (this._cameraProjectionMatrixInverse = tslUniform(n.projectionMatrixInverse)),
        (this._cameraNear = mV(`near`, `float`, n)),
        (this._cameraFar = mV(`far`, `float`, n)),
        (this._temporalDirection = tslUniform(0)),
        (this._temporalOffset = tslUniform(0)),
        (this._resolutionScale = tslUniform(0)),
        (this._ao = null),
        (this._currentSamples = -1),
        (this._sharedContext = null),
        (this._material = new _y()),
        (this._material.name = `GTAO`),
        (this._textureNode = iV(this, this._aoRenderTarget.texture)));
    }
    getTextureNode() {
      return this._textureNode;
    }
    setSize(e, t) {
      ((e = Math.round(this.resolutionScale * e)),
        (t = Math.round(this.resolutionScale * t)),
        (this._resolutionScale.value = this.resolutionScale),
        this._resolution.value.set(e, t),
        this._aoRenderTarget.setSize(e, t));
    }
    updateBefore(e) {
      let { renderer: t } = e;
      if (
        ((x2 = tT.resetRendererState(t, x2)), this.useTemporalFiltering === !0)
      ) {
        let t = e.frameId;
        ((this._temporalDirection.value = y2[t % 6] / 360),
          (this._temporalOffset.value = b2[t % 4]));
      } else
        ((this._temporalDirection.value = 0), (this._temporalOffset.value = 1));
      this.samples.value !== this._currentSamples &&
        ((this._currentSamples = this.samples.value),
        (this._material.contextNode = pB(this._sharedContext)),
        (this._material.fragmentNode = this._ao()),
        (this._material.needsUpdate = !0));
      let n = t.getDrawingBufferSize(v2);
      (this.setSize(n.width, n.height),
        (_2.material = this._material),
        (_2.name = `AO`),
        t.setClearColor(16777215, 1),
        t.setRenderTarget(this._aoRenderTarget),
        _2.render(t),
        tT.restoreRendererState(t, x2));
    }
    setup(e) {
      let t = tslUv(),
        n = (t) =>
          e.renderer.logarithmicDepthBuffer === !0
            ? HV(
                IB(t, this._cameraNear, this._cameraFar),
                this._cameraNear,
                this._cameraFar,
              )
            : t,
        r = (e) => n(this.depthNode.sample(e).r),
        i = (e) => {
          let t = this.depthNode.gather().sample(e),
            r = HB(HB(t.x, t.y), HB(t.z, t.w));
          return n(r);
        },
        a = (e) => this._noiseNode.sample(e),
        o = (e) =>
          this.normalNode === null
            ? wB(e, this.depthNode.value, this._cameraProjectionMatrixInverse)
            : this.normalNode.sample(e).rgb.normalize();
      return (
        (this._ao = tslFn(() => {
          let e = this._resolutionScale
            .lessThan(1)
            .select(i(t), r(t))
            .toConst();
          e.greaterThanEqual(1).discard();
          let n = EB(t, e, this._cameraProjectionMatrixInverse).toConst(),
            s = o(t).toConst(),
            c = this.radius,
            l = c.reciprocal().toConst(),
            u = tslNormalize(n.xyz.negate()).toConst(),
            d = this._cameraProjectionMatrix.mul(tslVec4(n, 1)).toConst(),
            f = kV(this._noiseNode, 0),
            p = tslVec2(t.x, t.y.oneMinus());
          p = p.mul(this._resolution.div(f));
          let m = tslVec3(a(p).xyz.mul(2).sub(1).xy, 0).normalize(),
            h = zB(m, tslVec3(m.y.mul(-1), m.x, 0), tslVec3(0, 0, 1)),
            g = this.samples.value,
            _ = g < 30 ? 3 : 5,
            v = Math.ceil(g / _),
            y = 1 / v,
            b = tslFloat(0).toVar(),
            x = this._temporalDirection.mul(0.02),
            S = AB(vV.add(this._temporalOffset)).add(
              pV(t.add(x).mul(2).sub(1)),
            );
          return (
            Yz(
              { start: tslInt(0), end: tslInt(_), type: `int`, condition: `<` },
              ({ i: e }) => {
                let t = tslFloat(e)
                    .div(_)
                    .mul($z)
                    .add(this._temporalDirection)
                    .toConst(),
                  i = h.mul(tslVec3(hB(t), tslSin(t), 0)).toConst(),
                  a = this._cameraProjectionMatrix
                    .mul(tslVec4(i, 0))
                    .mul(c)
                    .toConst(),
                  o = tslNormalize(gB(i, u)).toConst(),
                  f = gB(o, u).toConst(),
                  p = s.sub(o.mul(tslDot(s, o))).toConst(),
                  m = p.length().toConst(),
                  g = p.div(tslMax(m, tslFloat(1e-4))).toConst(),
                  x = tslDot(g, f).toConst(),
                  C = dB(tslDot(g, u), 0, 1).toConst(),
                  w = x
                    .greaterThanEqual(0)
                    .select(tslFloat(1), tslFloat(-1))
                    .mul(tB(C))
                    .toConst(),
                  T = gB(g, o).toConst(),
                  E = tslDot(u, T).toConst(),
                  D = tslVec2(E, E.negate()).toVar();
                Yz(
                  { end: tslInt(v), type: `int`, name: `j`, condition: `<` },
                  ({ j: e }) => {
                    let t = tslFloat(e).add(1).add(S).mul(y).toConst(),
                      i = t.mul(t),
                      o = a.mul(i).toConst(),
                      s = TB(d.add(o)).toConst(),
                      c = EB(
                        s,
                        r(s).toConst(),
                        this._cameraProjectionMatrixInverse,
                      )
                        .toConst()
                        .sub(n)
                        .toConst(),
                      f = c.length().toConst(),
                      p = tslDot(u, c).div(tslMax(f, tslFloat(1e-4))),
                      m = HB(f.mul(l), 1),
                      h = m.mul(m);
                    tslIf(tslAbs(c.z).lessThan(this.thickness), () => {
                      D.x.assign(tslMix(tslMax(D.x, p), D.x, h));
                    });
                    let g = TB(d.sub(o)).toConst(),
                      _ = EB(
                        g,
                        r(g).toConst(),
                        this._cameraProjectionMatrixInverse,
                      )
                        .toConst()
                        .sub(n)
                        .toConst(),
                      v = _.length().toConst(),
                      b = tslDot(u, _).div(tslMax(v, tslFloat(1e-4))),
                      x = HB(v.mul(l), 1),
                      C = x.mul(x);
                    tslIf(tslAbs(_.z).lessThan(this.thickness), () => {
                      D.y.assign(tslMix(tslMax(D.y, b), D.y, C));
                    });
                  },
                );
                let O = tB(D.y).toConst(),
                  ee = tB(D.x).negate().toConst(),
                  te = hB(O.mul(2).sub(w)).negate().add(C).add(O.mul(2).mul(x)),
                  ne = hB(ee.mul(2).sub(w))
                    .negate()
                    .add(C)
                    .add(ee.mul(2).mul(x)),
                  re = te.add(ne).mul(0.25);
                b.addAssign(m.mul(re));
              },
            ),
            b.assign(dB(b.div(_), 0, 1)),
            b.assign(dV(b, this.scale)),
            b
          );
        })),
        (this._sharedContext = e.getSharedContext()),
        (this._currentSamples = this.samples.value),
        (this._material.contextNode = pB(e.getSharedContext())),
        (this._material.fragmentNode = this._ao()),
        (this._material.needsUpdate = !0),
        this._textureNode
      );
    }
    dispose() {
      (super.dispose(),
        this._aoRenderTarget.dispose(),
        this._noiseTexture.dispose(),
        this._material.dispose());
    }
  };
function C2(e = 5) {
  let n = Math.floor(e) % 2 == 0 ? Math.floor(e) + 1 : Math.floor(e),
    r = w2(n),
    i = r.length,
    a = new Uint8Array(i * 4);
  for (let e = 0; e < i; ++e) {
    let t = r[e],
      n = (2 * Math.PI * t) / i,
      o = new M(Math.cos(n), Math.sin(n), 0).normalize();
    ((a[e * 4] = (o.x * 0.5 + 0.5) * 255),
      (a[e * 4 + 1] = (o.y * 0.5 + 0.5) * 255),
      (a[e * 4 + 2] = 127),
      (a[e * 4 + 3] = 255));
  }
  let o = new Li(a, n, n);
  return ((o.wrapS = t), (o.wrapT = t), (o.needsUpdate = !0), o);
}
function w2(e) {
  let t = Math.floor(e) % 2 == 0 ? Math.floor(e) + 1 : Math.floor(e),
    n = t * t,
    r = Array(n).fill(0),
    i = Math.floor(t / 2),
    a = t - 1;
  for (let e = 1; e <= n;) {
    if (
      (i === -1 && a === t
        ? ((a = t - 2), (i = 0))
        : (a === t && (a = 0), i < 0 && (i = t - 1)),
      r[i * t + a] !== 0)
    ) {
      ((a -= 2), i++);
      continue;
    }
    ((r[i * t + a] = e++), a++, i--);
  }
  return r;
}
