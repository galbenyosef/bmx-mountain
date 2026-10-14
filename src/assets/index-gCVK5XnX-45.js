// assets/index-gCVK5XnX 45 — math
// Lines 62081-62619 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var Z2 = new Gw(),
  Q2 = new j(),
  $2,
  e4 = class extends Rc {
    static get type() {
      return `TRAANode`;
    }
    constructor(e, t, n, r) {
      (super(`vec4`),
        (this.isTRAANode = !0),
        (this.updateBeforeType = Dc.FRAME),
        (this.beautyNode = e),
        (this.depthNode = t),
        (this.velocityNode = n),
        (this.camera = r),
        (this.depthThreshold = 5e-4),
        (this.edgeDepthDiff = 0.001),
        (this.maxVelocityLength = 128),
        (this.useSubpixelCorrection = !0),
        (this._jitterIndex = 0),
        (this._invSize = tslUniform(new j())),
        (this._historyRenderTarget = new mn(1, 1, {
          depthBuffer: !1,
          type: v,
          depthTexture: new sa(),
        })),
        (this._historyRenderTarget.texture.name = `TRAANode.history`),
        (this._resolveRenderTarget = new mn(1, 1, {
          depthBuffer: !1,
          type: v,
        })),
        (this._resolveRenderTarget.texture.name = `TRAANode.resolve`),
        (this._resolveMaterial = new _y()),
        (this._resolveMaterial.name = `TRAA.resolve`),
        (this._textureNode = iV(this, this._resolveRenderTarget.texture)),
        (this._originalProjectionMatrix = new N()),
        (this._cameraNearFar = tslUniform(new j())),
        (this._cameraWorldMatrix = tslUniform(new N())),
        (this._cameraWorldMatrixInverse = tslUniform(new N())),
        (this._cameraProjectionMatrixInverse = tslUniform(new N())),
        (this._previousCameraWorldMatrix = tslUniform(new N())),
        (this._previousCameraProjectionMatrixInverse = tslUniform(new N())),
        (this._previousDepthNode = tslTexture(new sa(1, 1))),
        (this._needsPostProcessingSync = !1),
        (this._velocityNode = null));
    }
    getTextureNode() {
      return this._textureNode;
    }
    setSize(e, t) {
      (this._historyRenderTarget.setSize(e, t),
        this._resolveRenderTarget.setSize(e, t),
        this._invSize.value.set(1 / e, 1 / t));
    }
    setViewOffset(e, t) {
      (this.camera.updateProjectionMatrix(),
        this._originalProjectionMatrix.copy(this.camera.projectionMatrix),
        this._velocityNode.setProjectionMatrix(this._originalProjectionMatrix));
      let n = {
          fullWidth: e,
          fullHeight: t,
          offsetX: 0,
          offsetY: 0,
          width: e,
          height: t,
        },
        r = t4[this._jitterIndex];
      this.camera.setViewOffset(
        n.fullWidth,
        n.fullHeight,
        n.offsetX + r[0] - 0.5,
        n.offsetY + r[1] - 0.5,
        n.width,
        n.height,
      );
    }
    clearViewOffset() {
      (this.camera.clearViewOffset(),
        this._velocityNode.setProjectionMatrix(null),
        this._jitterIndex++,
        (this._jitterIndex %= t4.length));
    }
    updateBefore(e) {
      let { renderer: t } = e;
      (this._previousCameraWorldMatrix.value.copy(
        this._cameraWorldMatrix.value,
      ),
        this._previousCameraProjectionMatrixInverse.value.copy(
          this._cameraProjectionMatrixInverse.value,
        ),
        this._cameraNearFar.value.set(this.camera.near, this.camera.far),
        this._cameraWorldMatrix.value.copy(this.camera.matrixWorld),
        this._cameraWorldMatrixInverse.value.copy(
          this.camera.matrixWorldInverse,
        ),
        this._cameraProjectionMatrixInverse.value.copy(
          this.camera.projectionMatrixInverse,
        ));
      let n = this.beautyNode.isRTTNode
          ? this.beautyNode.renderTarget
          : this.beautyNode.passNode.renderTarget,
        r = n.texture.width,
        i = n.texture.height;
      (this._needsPostProcessingSync === !0 &&
        (this.setViewOffset(r, i), (this._needsPostProcessingSync = !1)),
        ($2 = tT.resetRendererState(t, $2)));
      let a =
        this._historyRenderTarget.width !== r ||
        this._historyRenderTarget.height !== i;
      (this.setSize(r, i),
        a === !0 &&
          (t.initRenderTarget(this._historyRenderTarget),
          t.initRenderTarget(this._resolveRenderTarget),
          t.copyTextureToTexture(n.texture, this._historyRenderTarget.texture)),
        t.setRenderTarget(this._resolveRenderTarget),
        (Z2.material = this._resolveMaterial),
        (Z2.name = `TRAA`),
        Z2.render(t),
        t.setRenderTarget(null),
        t.copyTextureToTexture(
          this._resolveRenderTarget.texture,
          this._historyRenderTarget.texture,
        ));
      let o = t.getDrawingBufferSize(Q2);
      if (
        this._historyRenderTarget.height === o.height &&
        this._historyRenderTarget.width === o.width
      ) {
        let e = this.depthNode.value;
        (t.copyTextureToTexture(e, this._historyRenderTarget.depthTexture),
          (this._previousDepthNode.value =
            this._historyRenderTarget.depthTexture));
      }
      tT.restoreRendererState(t, $2);
    }
    setup(e) {
      (e.renderPipeline &&
        !e.context.renderPipelineState.viewOffsetOwner &&
        ((e.context.renderPipelineState.viewOffsetOwner = this),
        (this._needsPostProcessingSync = !0),
        Qz(() => {
          let t = e.renderer.getDrawingBufferSize(Q2);
          this.setViewOffset(t.width, t.height);
        }),
        Zz(() => {
          this.clearViewOffset();
        })),
        e.renderer.reversedDepthBuffer === !0 &&
          (this._historyRenderTarget.depthTexture.type = _),
        (this._velocityNode =
          e.context.velocity === void 0 ? zV : e.context.velocity));
      let t = tslFn(([e, t, n, r]) => {
          let i = [
              [-1, -1],
              [-1, 1],
              [1, -1],
              [1, 1],
              [1, 0],
              [0, -1],
              [0, 1],
              [-1, 0],
            ],
            a = t.toVar(),
            o = t.pow2().toVar();
          for (let [t, n] of i) {
            let r = this.beautyNode.offset(jB(t, n)).load(e).max(0);
            (a.addAssign(r), o.addAssign(r.pow2()));
          }
          let s = tslFloat(i.length + 1),
            c = a.div(s),
            l = o.div(s).sub(c.pow2()).max(0).sqrt().mul(r),
            u = c.sub(l),
            d = c.add(l);
          return U2(c.clamp(u, d), n, u, d);
        }),
        n = tslFn(([e, t]) => {
          let n = e.mul(t).fract().abs(),
            r = tslMax(n, n.oneMinus());
          return r.x.mul(r.y).oneMinus().div(0.75);
        }).setLayout({
          name: `subpixelCorrection`,
          type: `float`,
          inputs: [
            { name: `velocityUV`, type: `vec2` },
            { name: `textureSize`, type: `ivec2` },
          ],
        }),
        r = tslTexture(this._historyRenderTarget.texture),
        i = tslFn(() => {
          let e = tslUv(),
            i = this.beautyNode.size(),
            a = e.mul(i),
            o = G2(this.depthNode, a, this._cameraNearFar),
            s = o.get(`closestDepth`),
            c = o.get(`closestPositionTexel`),
            l = o.get(`farthestDepth`),
            u = this.velocityNode.load(c).xy.mul(tslVec2(0.5, -0.5)),
            d = e.sub(u),
            f = K2(
              this._previousDepthNode,
              d,
              this._previousCameraProjectionMatrixInverse,
              this._previousCameraWorldMatrix,
              this._cameraWorldMatrixInverse,
              this._cameraNearFar,
              this.camera,
            ),
            p = d.greaterThanEqual(0).all().and(d.lessThanEqual(1).all()),
            m = l.sub(s).greaterThan(this.edgeDepthDiff),
            h = s.sub(f).greaterThan(this.depthThreshold),
            g = p.and(m.or(h.not())),
            _ = this.beautyNode.sample(e),
            v = r.sample(d),
            y = e.sub(d).mul(i).length().div(this.maxVelocityLength).saturate(),
            b = tslFloat(0.05).toVar();
          (this.useSubpixelCorrection && b.addAssign(n(u, i).mul(0.25)),
            b.assign(g.select(b.add(y).saturate(), 1)));
          let x = tslMix(0.5, 1, y.oneMinus().pow2());
          return W2(_, t(a, _, v, x), b);
        });
      return (
        (this._resolveMaterial.contextNode = pB(e.getSharedContext())),
        (this._resolveMaterial.colorNode = i()),
        this._textureNode
      );
    }
    dispose() {
      (super.dispose(),
        this._historyRenderTarget.dispose(),
        this._resolveRenderTarget.dispose(),
        this._resolveMaterial.dispose());
    }
  },
  t4 = q2(32),
  n4 = (e, t, n, r) => new e4(mB(e), t, n, r),
  r4 = new N(),
  i4 = new N(),
  a4 = new M(),
  o4 = new M(),
  s4 = new M(),
  c4 = [new M(), new M(), new M(), new M()],
  l4 = [new M(), new M(), new M(), new M()],
  u4 = [new M(), new M(), new M(), new M(), new M(), new M(), new M(), new M()],
  d4 = 2,
  f4 = 0.1,
  p4 = class extends ps {
    constructor() {
      (super(new Es(-5, 5, 5, -5, 0.5, 500)),
        (this.isSunLightShadow = !0),
        this.mapSize.set(1024, 1024),
        (this._cameras = []),
        (this._matrices = []),
        (this._frustums = []),
        (this._cascadeSplits = [, , ,].fill(0)),
        (this._cascadeData = []),
        (this._viewportCount = d4),
        this._frameExtents.set(2, 1));
      for (let e = 0; e < d4; e++)
        (this._cameras.push(new Es()),
          this._matrices.push(new N()),
          this._frustums.push(new $i()),
          this._cascadeData.push(new pn()));
      for (; this._viewports.length < d4;) this._viewports.push(new pn());
    }
    getCamera(e = 0) {
      return this._cameras[e];
    }
    getMatrix(e = 0) {
      return this._matrices[e];
    }
    getFrustum(e = 0) {
      return this._frustums[e];
    }
    updateMatrices(e, t) {
      if (t === void 0) return;
      let n = Math.min(0.25, (Math.ceil(this.radius) + 1) / this.mapSize.x),
        r = Math.min(0.25, (Math.ceil(this.radius) + 1) / this.mapSize.y);
      for (let e = 0; e < d4; e++)
        this._viewports[e].set(e + n, r, 1 - 2 * n, 1 - 2 * r);
      let i = this.mapSize.x * (1 - 2 * n),
        a = this.mapSize.y * (1 - 2 * r),
        o = Math.min(i, a),
        s = this.camera,
        c = t.near,
        l = Math.max(c + 1e-6, Math.min(s.far, t.far)),
        u = this._cascadeSplits;
      u[0] = c;
      for (let e = 1; e < d4; e++) {
        let t = e / d4,
          n = c + (l - c) * t,
          r = c > 0 ? c * (l / c) ** +t : n;
        u[e] = (n + r) * 0.5;
      }
      ((u[d4] = l),
        a4.setFromMatrixPosition(e.matrixWorld).negate().normalize(),
        o4.set(0, 1, 0),
        Math.abs(o4.dot(a4)) > 0.99 && o4.set(0, 0, 1),
        r4.lookAt(s4.set(0, 0, 0), a4, o4),
        i4.copy(r4).transpose().multiply(t.matrixWorld));
      let d = t.reversedDepth ? 1 : t.coordinateSystem === 2001 ? 0 : -1,
        f = t.projectionMatrixInverse,
        p = -1 / 0;
      for (let e = 0; e < 4; e++) {
        let n = e === 0 || e === 1 ? 1 : -1,
          r = e === 0 || e === 3 ? 1 : -1,
          i = c4[e].set(n, r, d).applyMatrix4(f),
          a = l4[e];
        (t.isPerspectiveCamera === !0
          ? a.copy(i).multiplyScalar(l / c)
          : a.set(i.x, i.y, -l),
          i.applyMatrix4(i4),
          a.applyMatrix4(i4),
          (p = Math.max(p, i.z, a.z)));
      }
      p += l;
      let m = s.near;
      for (let e = 0; e < d4; e++) {
        let t = e === 0 ? u[0] : this._cascadeData[e - 1].z,
          n = u[e + 1],
          r = n - f4 * (n - u[e]);
        this._cascadeData[e].set(e === 0 ? -1e10 : t, n, r, 0);
        let d = (t - c) / (l - c),
          f = (n - c) / (l - c);
        s4.set(0, 0, 0);
        for (let e = 0; e < 4; e++)
          (u4[e * 2].lerpVectors(c4[e], l4[e], d),
            u4[e * 2 + 1].lerpVectors(c4[e], l4[e], f),
            s4.add(u4[e * 2]).add(u4[e * 2 + 1]));
        s4.multiplyScalar(1 / 8);
        let h = 0,
          g = 1 / 0;
        for (let e = 0; e < 8; e++)
          ((h = Math.max(h, u4[e].distanceToSquared(s4))),
            (g = Math.min(g, u4[e].z)));
        let _ = Math.sqrt(h);
        if (o > 1) {
          _ /= 1 - 1 / o;
          let e = (2 * _) / i,
            t = (2 * _) / a;
          ((s4.x = Math.round(s4.x / e) * e),
            (s4.y = Math.round(s4.y / t) * t));
        }
        ((s4.z = p + m), s4.applyMatrix4(r4));
        let v = this._cameras[e];
        (v.position.copy(s4),
          v.quaternion.setFromRotationMatrix(r4),
          (v.left = -_),
          (v.right = _),
          (v.top = _),
          (v.bottom = -_),
          (v.near = m),
          (v.far = p - g + 2 * m),
          (v.coordinateSystem = s.coordinateSystem),
          (v._reversedDepth = s.reversedDepth),
          v.updateProjectionMatrix(),
          v.updateMatrixWorld(),
          this._updateMatrix(
            v,
            this._matrices[e],
            this._frustums[e],
            this._viewports[e],
          ));
      }
    }
  },
  m4 = class extends cs {
    constructor(e, t) {
      (super(e, t),
        (this.isSunLight = !0),
        (this.type = `SunLight`),
        this.position.copy(Vn.DEFAULT_UP),
        this.updateMatrix(),
        (this.shadow = new p4()));
    }
    dispose() {
      (super.dispose(), this.shadow.dispose());
    }
    copy(e) {
      return (super.copy(e), (this.shadow = e.shadow.clone()), this);
    }
    toJSON(e) {
      let t = super.toJSON(e);
      return ((t.object.shadow = this.shadow.toJSON()), t);
    }
  },
  h4 = !1,
  g4 = class extends lO {
    static get type() {
      return `SunShadowNode`;
    }
    constructor(e, t = null) {
      (super(e, t), (this._atlasSize = new j()));
      let n = this.shadow;
      this._filterShadow = {
        mapSize: this._atlasSize,
        get radius() {
          return n.radius;
        },
      };
    }
    setupRenderTarget(e, t) {
      let n = e.getFrameExtents(),
        r = e.mapSize.width * n.x,
        i = e.mapSize.height * n.y,
        a = new sa(r, i);
      ((a.name = `SunShadowDepthTexture`),
        (a.compareFunction = t.renderer.reversedDepthBuffer ? 518 : 515));
      let o = t.createRenderTarget(r, i);
      return (
        (o.texture.name = `SunShadowMap`),
        (o.texture.type = e.mapType),
        (o.depthTexture = a),
        { shadowMap: o, depthTexture: a }
      );
    }
    _setupCascades(e, t) {
      e.observer.hasNode = !0;
      let { shadow: n, shadowMap: r } = this,
        i = r.depthTexture,
        a = mV(`intensity`, `float`, n).setGroup(hV),
        o = mV(`normalBias`, `float`, n).setGroup(hV),
        s = tslVec4(xV.add(QB.mul(o)), 1).toVar(),
        c = lV.z.negate().toVar(),
        l = tslFloat(1).toVar(`shadowValue`);
      for (let a = n.getViewportCount() - 1; a >= 0; a--) {
        let o = tslUniform(`mat4`)
            .setGroup(hV)
            .onRenderUpdate(() => n.getMatrix(a)),
          u = tslUniform(`vec4`)
            .setGroup(hV)
            .onRenderUpdate(() => n._cascadeData[a]);
        tslIf(c.greaterThanEqual(u.x).and(c.lessThan(u.y)), () => {
          let n = this.setupShadowCoord(e, o.mul(s)),
            a = this.setupShadowFilter(e, {
              filterFn: t,
              shadowTexture: r.texture,
              depthTexture: i,
              shadowCoord: n,
              shadow: this._filterShadow,
              depthLayer: this.depthLayer,
            });
          l.assign(tslMix(a, l, tslSmoothstep(u.z, u.y, c)));
        });
      }
      return tslMix(1, l, a);
    }
    setupShadow(e) {
      let { renderer: t, camera: n } = e,
        { light: r, shadow: a } = this,
        o = t.shadowMap.type;
      o === 3 &&
        (h4 === !1 &&
          (console.warn(
            `THREE.SunShadowNode: VSM is not supported, falling back to PCF.`,
          ),
          (h4 = !0)),
        (o = 1));
      let c = a.filterNode || this.getShadowFilterFn(o) || null;
      if (c === null)
        throw Error(`THREE.SunShadowNode: Shadow map type not supported.`);
      let { depthTexture: l, shadowMap: u } = this.setupRenderTarget(a, e),
        d = t.hasCompatibility(ut.TEXTURE_COMPARE);
      (o === 1 && d
        ? ((l.minFilter = s), (l.magFilter = s))
        : ((l.minFilter = i), (l.magFilter = i)),
        (this.shadowMap = u),
        (a.map = u),
        this._atlasSize.set(u.width, u.height),
        (a.camera.coordinateSystem = n.coordinateSystem),
        (a.camera._reversedDepth = t.reversedDepthBuffer));
      let f = tslFn((e) => this._setupCascades(e, c))().toVar(),
        p = `${r.type} Shadow [ ${r.name || `ID: ` + r.id} ]`;
      return f.toInspector(`${p} / Depth`, () => tslTexture(l).r.oneMinus());
    }
    renderShadow(e) {
      let { shadow: t, shadowMap: n, light: r } = this,
        { renderer: i, scene: a, camera: o } = e;
      t.updateMatrices(r, o);
      let s = t.mapSize.width,
        c = t.mapSize.height,
        l = t.getFrameExtents(),
        u = s * l.x,
        d = c * l.y;
      (n.setSize(u, d), this._atlasSize.set(u, d));
      let f = a.name;
      ((a.name = `Shadow Map [ ${r.name || `ID: ` + r.id} ]`),
        (i.autoClear = !1),
        i.clear());
      let p = t.getViewportCount();
      for (let e = 0; e < p; e++) {
        let r = t.getViewport(e);
        (n.viewport.set(s * r.x, n.height - c * (r.y + r.w), s * r.z, c * r.w),
          i.render(a, t.getCamera(e)));
      }
      a.name = f;
    }
    vsmPass() {}
  },
  _4 = (e, t) => new g4(e, t),
  v4 = class extends wO {
    static get type() {
      return `SunLightNode`;
    }
    constructor(e = null) {
      super(e);
    }
    setupShadowNode() {
      return _4(this.light);
    }
    setupDirect() {
      let e = this.colorNode;
      return {
        lightDirection: uB.transformDirection(NB(this.light)),
        lightColor: e,
      };
    }
  },
  y4 = 720,
  b4 = 16.5,
  x4 = (45 * Math.PI) / 180,
  S4 = (20 * Math.PI) / 180,
  C4 = (-16 * Math.PI) / 180,
  w4 = 0.2,
  T4 = (81 * Math.PI) / 180,
  E4 = 0.02,
  D4 = [
    [-3, 0],
    [-1.5, -0.4],
    [3, -0.9],
    [12, -1.25],
    [30, -1.7],
    [65, -2],
  ],
  O4 = new N().makeRotationY(T4),
  k4 = new N().makeRotationX(-(Math.PI / 2 - x4)),
  A4 = new N(),
  j4 = new N(),
  M4 = (e) => wrap(b4 + (e / y4) * 24, 24),
  N4 = (e) => (wrap(e - b4, 24) / 24) * y4;
