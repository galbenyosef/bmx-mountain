// assets/index-gCVK5XnX 47 — mul
// Lines 62806-63147 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var i3 = tslFn(() => {
    let e = tslNormalize(IU()).toVar(),
      t = GW(e).toVar();
    t3(e, t);
    let n = e.y.greaterThan(0.004),
      r = GW(tslVec3(0, 1, -0.001)),
      i = tslDot(e, hW),
      a = GW(tslNormalize(tslVec3(hW.x.negate(), 0.12, hW.z.negate()))),
      o = tslSmoothstep(0.004, 0.14, e.y),
      s = GW(tslNormalize(tslVec3(e.x, 0.03, e.z))),
      c = tslMax(e.y, 0.004),
      l = Q4(n3(7500, e, c)).mul(n.select(1, 0)),
      u = gW.mul(dV(tslMax(i, 0), 5).mul(6).add(2.2)).add(r.mul(0.6));
    t.assign(tslMix(t, tslMix(s, u, o), l.mul(0.55).mul(o)));
    let d = r3(n3(2200, e, c), n, i, r, a),
      f = HB(d.density.mul(1.4), 1).mul(tslMix(0.5, 1, o));
    (tslIf(_W.greaterThan(0), () => {
      let n = _W
        .mul(tslSmoothstep(0.02, 0.3, e.y))
        .mul(l.mul(0.8).add(f).oneMinus().max(0));
      t.addAssign($4(G4.mul(e)).mul(n));
    }),
      t.assign(tslMix(t, tslMix(s, d.colour, o), f)));
    let p = tslVec3(0.12, 0.11, 0.07).mul(gW.g.mul(1.4).add(r.g.mul(2)));
    return (t.assign(tslMix(t, p, tslSmoothstep(-0.08, 0, e.y).oneMinus())), t);
  }),
  a3 = class {
    mesh;
    constructor() {
      let e = new Wy({ side: 1, depthWrite: !1 });
      ((e.colorNode = i3()),
        (e.fog = !1),
        (this.mesh = new wi(new jo(3e4, 64, 32), e)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 10));
    }
    update(e) {
      this.mesh.position.copy(e);
    }
    withoutDisc(e) {
      W4.value = 0;
      try {
        return e();
      } finally {
        W4.value = 1;
      }
    }
  },
  o3 = 0.0035,
  s3 = [
    ...new Set([
      ...Array.from({ length: 24 }, (e, t) => t),
      3.33,
      3.67,
      4.33,
      4.67,
      5.33,
      5.67,
      18.33,
      18.67,
      19.33,
      19.67,
      20.33,
      20.67,
    ]),
  ].sort((e, t) => e - t),
  c3 = 64,
  l3 = _Q ? 100 : 150,
  u3 = l3 * 0.5,
  d3 = (e) => e.backend.isWebGPUBackend === !0,
  f3 = (function (e) {
    return (
      (e[(e.NearShadow = 1)] = `NearShadow`),
      (e[(e.FarShadow = 2)] = `FarShadow`),
      (e[(e.Shadows = 3)] = `Shadows`),
      (e[(e.Eye = 4)] = `Eye`),
      e
    );
  })({}),
  p3 = class {
    best;
    scale;
    time = 0;
    frames = 0;
    slow = 0;
    calm = 0;
    ceiling = 1 / 0;
    constructor(e) {
      ((this.best = e), (this.scale = e));
    }
    adapt(e) {
      if (
        ((this.time += e),
        this.frames++,
        e > 1 / 45 && this.slow++,
        this.time < 3)
      )
        return !1;
      let t = this.slow / this.frames,
        n = this.frames / this.time;
      this.time = this.frames = this.slow = 0;
      let r = this.scale;
      return (
        t > 0.25
          ? ((r = Math.max(0.55, this.scale * 0.85)),
            (this.calm = 0),
            (this.ceiling = this.scale))
          : n > 57 && t < 0.02
            ? ++this.calm >= 4 &&
              this.scale < Math.min(this.best, this.ceiling * 0.97) &&
              ((r = Math.min(this.best, this.ceiling * 0.97, this.scale * 1.1)),
              (this.calm = 0))
            : (this.calm = 0),
        Math.abs(r - this.scale) < 0.01 ? !1 : ((this.scale = r), !0)
      );
    }
  },
  m3 = class e {
    gl;
    scene = new Zn();
    camera;
    sun;
    sky;
    pipeline;
    blur = tslUniform(0);
    fringe = tslUniform(0);
    night = tslUniform(0);
    skyNow = F4();
    envs = [];
    envFrom = null;
    envTo = null;
    envBlend = tslUniform(0);
    hemisphere = null;
    exposure = new U4();
    resolution;
    constructor(e) {
      ((this.gl = new TF({
        canvas: e,
        antialias: !1,
        powerPreference: `high-performance`,
        reversedDepthBuffer: !0,
      })),
        (this.resolution = new p3(
          Math.min(window.devicePixelRatio || 1, _Q ? 0.85 : 1),
        )),
        (this.camera = new xs(74, innerWidth / innerHeight, 0.1, 4e4)),
        (this.scene.matrixAutoUpdate = !1),
        (this.scene.matrixWorldAutoUpdate = !1));
    }
    static async create(t) {
      let n = new e(t);
      return (await n.init(), n);
    }
    async init() {
      let e = this.gl;
      (await e.init(),
        e.library.addLight(v4, m4),
        (e.toneMapping = 6),
        (e.toneMappingExposure = 0.42),
        (e.shadowMap.enabled = !0),
        (this.sky = new a3()),
        this.scene.add(this.sky.mesh),
        (this.scene.fogNode = qW()),
        this.addSun(),
        d3(e)
          ? this.bakeSkyLight()
          : this.scene.add((this.hemisphere = new ls(0, 0, Math.PI * 1.2))),
        this.setTime(0, 0),
        (this.pipeline = this.post()),
        this.resize());
    }
    addSun() {
      ((this.sun = new m4()),
        (this.sun.castShadow = !0),
        this.sun.shadow.mapSize.setScalar(_Q ? 1024 : 2048),
        (this.sun.shadow.camera.far = l3),
        (this.sun.shadow.bias = -5e-4),
        (this.sun.shadow.normalBias = 0.05),
        this.scene.add(this.sun));
      let e = this.sun.shadow;
      (this.camera.layers.enable(4),
        e.getCamera(0).layers.enable(1),
        e.getCamera(0).layers.enable(3),
        e.getCamera(1).layers.enable(2),
        e.getCamera(1).layers.enable(3));
    }
    bakeSkyLight() {
      let e = new Px(this.gl),
        t = new Zn();
      t.add(this.sky.mesh.clone());
      for (let n of s3) {
        let r = P4(N4(n), this.skyNow);
        (HW(r.sun, r.moon, E4, r.byMoon, r.night),
          UW(this.gl, !1, !0),
          this.envs.push(
            this.sky.withoutDisc(() =>
              e.fromScene(t, 0.04, 1, 1e5, { size: c3 }),
            ).texture,
          ));
      }
      (e.dispose(),
        (this.envFrom = aV(this.envs[0])),
        (this.envTo = aV(this.envs[1])),
        (this.scene.environmentNode = tslMix(
          this.envFrom,
          this.envTo,
          this.envBlend,
        )));
    }
    setTime(e, t) {
      let n = P4(e, this.skyNow);
      (HW(n.sun, n.moon, E4, n.byMoon, n.night), G4.value.copy(n.stars));
      let r = gW.value;
      n.byMoon && r.multiplyScalar(n.moonlight);
      let i = Math.max(r.r, r.g, r.b, 1e-6);
      if (
        (this.sun.color.setRGB(r.r / i, r.g / i, r.b / i),
        (this.sun.intensity = 22 * i),
        this.sun.position.copy(hW.value),
        (this.sun.shadow.camera.far = lerp(l3, u3, n.night)),
        (this.gl.toneMappingExposure = this.exposure.adapt(n, t)),
        (this.night.value = n.night),
        (rJ.value = n.night),
        UW(this.gl, !!this.hemisphere),
        this.envs.length && this.blendSkyLight(n.hour),
        this.hemisphere)
      ) {
        let e = WW(0, Math.PI / 2, this.hemisphere.color);
        this.hemisphere.groundColor
          .setRGB(0.16, 0.13, 0.08)
          .multiplyScalar(e.g * 2.5 + r.g * 0.3 * i);
      }
    }
    blendSkyLight(e) {
      let t = s3.length,
        n = t - 1;
      for (; n > 0 && s3[n] > e;) n--;
      let r = s3[(n + 1) % t] + (n + 1 === t ? 24 : 0);
      ((this.envFrom.value = this.envs[n]),
        (this.envTo.value = this.envs[(n + 1) % t]),
        (this.envBlend.value = (e - s3[n]) / (r - s3[n])));
    }
    post() {
      let e = new EF(this.gl),
        t = rV(this.scene, this.camera);
      (t.setMRT(KB({ output: tV, normal: nV(ZB), velocity: zV })),
        (t.getTexture(`normal`).type = d));
      let n = t.getTextureNode(`output`);
      this.exposure.meter(n);
      let r = t.getTextureNode(`depth`),
        i = t.getTextureNode(`normal`),
        a = _Q ? n : this.occluded(n, r, i),
        o = t.getTextureNode(`velocity`),
        s = _Q ? V2(a) : n4(a, r, o, this.camera),
        c = _Q ? s : this.speedBlur(s.getTextureNode(), r, o);
      return ((e.outputNode = this.grade(mB(c))), e);
    }
    occluded(e, t, n) {
      let r = _V((e) => PV(n.sample(e))),
        i = T2(t, r, this.camera);
      ((i.resolutionScale = 0.5),
        (i.radius.value = 0.6),
        (i.distanceExponent.value = 1.2),
        (i.useTemporalFiltering = !0));
      let a = z2(i.getTextureNode(), t, r, this.camera).r;
      return tslVec4(e.rgb.mul(tslMix(tslFloat(1), a, 0.85)), 1);
    }
    speedBlur(e, t, n) {
      let r = tslSmoothstep(
          0.03,
          0.05,
          this.gl.reversedDepthBuffer ? t.r : t.r.oneMinus(),
        ).oneMinus(),
        i = n.xy.mul(this.blur).mul(r);
      return H2(e, i.mul(HB(tslFloat(1), tslFloat(0.006).div(tslMax(tslLength(i), 1e-5)))), tslInt(8));
    }
    grade(e) {
      let t = P2(e, 0.32, 0.55, 6),
        n = yV.sub(0.5),
        r = n.mul(
          this.fringe.mul(tslSmoothstep(0.15, 0.7, tslLength(n.mul(tslVec2(1.6, 1))))).mul(o3 / 0.5),
        ),
        i = (
          _Q ? e.rgb : tslVec3(e.sample(yV.add(r)).r, e.g, e.sample(yV.sub(r)).b)
        ).add(t.rgb),
        a = LB(i);
      ((i = tslMix(tslVec3(a), i, 1.12)),
        (i = i.mul(
          tslMix(tslVec3(1), tslVec3(0.93, 0.98, 1.08), tslSmoothstep(0, 0.6, a).oneMinus().mul(0.5)),
        )),
        (i = tslMix(
          i,
          tslMix(tslVec3(a).mul(tslVec3(0.42, 0.62, 1.08)), i.mul(tslVec3(0.6, 0.78, 1.08)), 0.35),
          this.night,
        )));
      let o = tslSmoothstep(0.45, 1.25, tslLength(yV.sub(0.5).mul(tslVec2(1.6, 1))))
        .mul(0.42)
        .oneMinus();
      return tslVec4(i.mul(o), 1);
    }
    resize() {
      ((this.camera.aspect = innerWidth / innerHeight),
        this.camera.updateProjectionMatrix(),
        this.gl.setPixelRatio(this.resolution.scale),
        this.gl.setSize(innerWidth, innerHeight, !1));
    }
    render(e) {
      (this.sky.update(this.camera.position),
        this.scene.updateMatrixWorld(),
        this.pipeline.render(),
        this.exposure.measure(this.gl, e),
        this.resolution.adapt(e) && this.resize());
    }
  },
  h3 = 62,
  g3 = 8,
  _3 = 1200,
  v3 = 2400,
  y3 = 0.2,
  b3 = 0.5,
  x3 = 4,
  S3 = {
    [vL.Pine]: {
      preset: c2,
      tweak: (e) => {
        ((e.branch.sections = { 0: 10, 1: 6, 2: 4, 3: 3 }),
          (e.branch.segments = { 0: 7, 1: 3, 2: 3, 3: 3 }),
          (e.branch.children = { ...e.branch.children, 0: 70 }),
          (e.leaves.count = Math.round(e.leaves.count * 1.4)),
          (e.leaves.size *= 1.15));
      },
    },
    [vL.Aspen]: {
      preset: s2,
      tweak: (e) => {
        ((e.branch.sections = { 0: 8, 1: 5, 2: 4, 3: 3 }),
          (e.branch.segments = { 0: 6, 1: 4, 2: 3, 3: 3 }),
          (e.leaves.count = Math.round(e.leaves.count * 1.8)),
          (e.leaves.size *= 1.35));
      },
    },
  };
