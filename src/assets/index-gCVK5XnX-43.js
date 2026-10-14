// assets/index-gCVK5XnX 43 — mul
// Lines 61110-61769 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var T2 = (e, t, n) => new S2(qB(e), qB(t), n),
  E2 = new Gw(),
  D2 = new j(),
  O2 = new j(1, 0),
  k2 = new j(0, 1),
  A2,
  j2 = tslFn(({ input: e, threshold: t, smoothWidth: n }) => {
    let r = LB(e.rgb),
      i = tslSmoothstep(t, t.add(n), r);
    return tslMix(tslVec4(0), e, i);
  }),
  M2 = class extends Rc {
    static get type() {
      return `BloomNode`;
    }
    constructor(e, t = 1, n = 0, r = 0) {
      (super(`vec4`),
        (this.inputNode = e),
        (this.strength = t.isNode ? t : tslUniform(t)),
        (this.radius = n.isNode ? n : tslUniform(n)),
        (this.threshold = r.isNode ? r : tslUniform(r)),
        (this.smoothWidth = tslUniform(0.01)),
        (this.bloomTintColors = [
          new M(1, 1, 1),
          new M(1, 1, 1),
          new M(1, 1, 1),
          new M(1, 1, 1),
          new M(1, 1, 1),
        ]),
        (this._resolutionScale = 0.5),
        (this.highPassFn = j2),
        (this._renderTargetsHorizontal = []),
        (this._renderTargetsVertical = []),
        (this._nMips = 5),
        (this._renderTargetBright = new mn(1, 1, { depthBuffer: !1, type: v })),
        (this._renderTargetBright.texture.name = `UnrealBloomPass.bright`),
        (this._renderTargetBright.texture.generateMipmaps = !1));
      for (let e = 0; e < this._nMips; e++) {
        let t = new mn(1, 1, { depthBuffer: !1, type: v });
        ((t.texture.name = `UnrealBloomPass.h` + e),
          (t.texture.generateMipmaps = !1),
          this._renderTargetsHorizontal.push(t));
        let n = new mn(1, 1, { depthBuffer: !1, type: v });
        ((n.texture.name = `UnrealBloomPass.v` + e),
          (n.texture.generateMipmaps = !1),
          this._renderTargetsVertical.push(n));
      }
      ((this._compositeMaterial = null),
        (this._highPassFilterMaterial = null),
        (this._separableBlurMaterials = []),
        (this._textureNodeBright = tslTexture(this._renderTargetBright.texture)),
        (this._textureNodeBlur0 = tslTexture(this._renderTargetsVertical[0].texture)),
        (this._textureNodeBlur1 = tslTexture(this._renderTargetsVertical[1].texture)),
        (this._textureNodeBlur2 = tslTexture(this._renderTargetsVertical[2].texture)),
        (this._textureNodeBlur3 = tslTexture(this._renderTargetsVertical[3].texture)),
        (this._textureNodeBlur4 = tslTexture(this._renderTargetsVertical[4].texture)),
        (this._textureOutput = iV(
          this,
          this._renderTargetsHorizontal[0].texture,
        )),
        (this.updateBeforeType = Dc.FRAME));
    }
    getTextureNode() {
      return this._textureOutput;
    }
    setResolutionScale(e) {
      return ((this._resolutionScale = e), this);
    }
    getResolutionScale() {
      return this._resolutionScale;
    }
    setSize(e, t) {
      let n = Math.floor(e * this._resolutionScale),
        r = Math.floor(t * this._resolutionScale);
      this._renderTargetBright.setSize(n, r);
      for (let e = 0; e < this._nMips; e++)
        (this._renderTargetsHorizontal[e].setSize(n, r),
          this._renderTargetsVertical[e].setSize(n, r),
          this._separableBlurMaterials[e].invSize.value.set(1 / n, 1 / r),
          (n = Math.floor(n / 2)),
          (r = Math.floor(r / 2)));
    }
    updateBefore(e) {
      let { renderer: t } = e;
      A2 = tT.resetRendererState(t, A2);
      let n = t.getDrawingBufferSize(D2);
      (this.setSize(n.width, n.height),
        t.setRenderTarget(this._renderTargetBright),
        (E2.material = this._highPassFilterMaterial),
        (E2.name = `Bloom [ High Pass ]`),
        E2.render(t));
      let r = this._renderTargetBright;
      for (let e = 0; e < this._nMips; e++)
        ((E2.material = this._separableBlurMaterials[e]),
          (this._separableBlurMaterials[e].colorTexture.value = r.texture),
          (this._separableBlurMaterials[e].direction.value = O2),
          t.setRenderTarget(this._renderTargetsHorizontal[e]),
          (E2.name = `Bloom [ Blur Horizontal - ${e} ]`),
          E2.render(t),
          (this._separableBlurMaterials[e].colorTexture.value =
            this._renderTargetsHorizontal[e].texture),
          (this._separableBlurMaterials[e].direction.value = k2),
          t.setRenderTarget(this._renderTargetsVertical[e]),
          (E2.name = `Bloom [ Blur Vertical - ${e} ]`),
          E2.render(t),
          (r = this._renderTargetsVertical[e]));
      (t.setRenderTarget(this._renderTargetsHorizontal[0]),
        (E2.material = this._compositeMaterial),
        (E2.name = `Bloom [ Composite ]`),
        E2.render(t),
        tT.restoreRendererState(t, A2));
    }
    setup(e) {
      let t = pB(e.getSharedContext());
      ((this._highPassFilterMaterial =
        this._highPassFilterMaterial || new _y()),
        (this._highPassFilterMaterial.contextNode = t),
        (this._highPassFilterMaterial.fragmentNode = this.highPassFn({
          input: this.inputNode,
          threshold: this.threshold,
          smoothWidth: this.smoothWidth,
        })),
        (this._highPassFilterMaterial.name = `Bloom_highPass`),
        (this._highPassFilterMaterial.needsUpdate = !0));
      let n = [6, 10, 14, 18, 22];
      for (let e = 0; e < this._nMips; e++)
        this._separableBlurMaterials.push(
          this._getSeparableBlurMaterial(t, n[e]),
        );
      let r = rB([1, 0.8, 0.6, 0.4, 0.2]),
        i = NV(this.bloomTintColors),
        a = tslFn(() => {
          let e = N2(r.element(0), this.radius)
              .mul(tslVec4(i.element(0), 1))
              .mul(this._textureNodeBlur0),
            t = N2(r.element(1), this.radius)
              .mul(tslVec4(i.element(1), 1))
              .mul(this._textureNodeBlur1),
            n = N2(r.element(2), this.radius)
              .mul(tslVec4(i.element(2), 1))
              .mul(this._textureNodeBlur2),
            a = N2(r.element(3), this.radius)
              .mul(tslVec4(i.element(3), 1))
              .mul(this._textureNodeBlur3),
            o = N2(r.element(4), this.radius)
              .mul(tslVec4(i.element(4), 1))
              .mul(this._textureNodeBlur4);
          return e.add(t).add(n).add(a).add(o).mul(this.strength);
        });
      return (
        (this._compositeMaterial = this._compositeMaterial || new _y()),
        (this._compositeMaterial.contextNode = t),
        (this._compositeMaterial.fragmentNode = a()),
        (this._compositeMaterial.name = `Bloom_comp`),
        (this._compositeMaterial.needsUpdate = !0),
        this._textureOutput
      );
    }
    dispose() {
      super.dispose();
      for (let e = 0; e < this._renderTargetsHorizontal.length; e++)
        this._renderTargetsHorizontal[e].dispose();
      for (let e = 0; e < this._renderTargetsVertical.length; e++)
        this._renderTargetsVertical[e].dispose();
      (this._renderTargetBright.dispose(),
        this._highPassFilterMaterial !== null &&
          this._highPassFilterMaterial.dispose(),
        this._compositeMaterial !== null && this._compositeMaterial.dispose());
      for (let e = 0; e < this._separableBlurMaterials.length; e++)
        this._separableBlurMaterials[e].dispose();
    }
    _getSeparableBlurMaterial(e, t) {
      let n = [],
        r = t / 3;
      for (let e = 0; e < t; e++)
        n.push((0.39894 * Math.exp((-0.5 * e * e) / (r * r))) / r);
      let i = n[0],
        a = [],
        o = [];
      for (let e = 1; e < t; e += 2) {
        let r = n[e],
          i = e + 1 < t ? n[e + 1] : 0,
          s = r + i;
        (a.push((e * r + (e + 1) * i) / s), o.push(s));
      }
      let s = tslTexture(null),
        c = rB(a),
        l = rB(o),
        u = tslUniform(new j()),
        d = tslUniform(new j(0.5, 0.5)),
        f = tslUv(),
        p = (e) => s.sample(e),
        m = tslFn(() => {
          let e = p(f).rgb.mul(i).toVar();
          return (
            Yz(
              { start: tslInt(0), end: tslInt(a.length), type: `int`, condition: `<` },
              ({ i: t }) => {
                let n = l.element(t),
                  r = d.mul(u).mul(c.element(t)),
                  i = p(f.add(r)).rgb,
                  a = p(f.sub(r)).rgb;
                e.addAssign(nB(i, a).mul(n));
              },
            ),
            tslVec4(e, 1)
          );
        }),
        h = new _y();
      return (
        (h.contextNode = e),
        (h.fragmentNode = m()),
        (h.name = `Bloom_separable`),
        (h.needsUpdate = !0),
        (h.colorTexture = s),
        (h.direction = d),
        (h.invSize = u),
        h
      );
    }
  },
  N2 = tslFn(({ factor: e, radius: t }) => tslMix(e, tslFloat(1.2).sub(e), t), {
    factor: `float`,
    radius: `float`,
    return: `float`,
  }),
  P2 = (e, t, n, r) => new M2(qB(e), t, n, r),
  F2 = class {
    constructor(e = Math) {
      ((this.grad3 = [
        [1, 1, 0],
        [-1, 1, 0],
        [1, -1, 0],
        [-1, -1, 0],
        [1, 0, 1],
        [-1, 0, 1],
        [1, 0, -1],
        [-1, 0, -1],
        [0, 1, 1],
        [0, -1, 1],
        [0, 1, -1],
        [0, -1, -1],
      ]),
        (this.grad4 = [
          [0, 1, 1, 1],
          [0, 1, 1, -1],
          [0, 1, -1, 1],
          [0, 1, -1, -1],
          [0, -1, 1, 1],
          [0, -1, 1, -1],
          [0, -1, -1, 1],
          [0, -1, -1, -1],
          [1, 0, 1, 1],
          [1, 0, 1, -1],
          [1, 0, -1, 1],
          [1, 0, -1, -1],
          [-1, 0, 1, 1],
          [-1, 0, 1, -1],
          [-1, 0, -1, 1],
          [-1, 0, -1, -1],
          [1, 1, 0, 1],
          [1, 1, 0, -1],
          [1, -1, 0, 1],
          [1, -1, 0, -1],
          [-1, 1, 0, 1],
          [-1, 1, 0, -1],
          [-1, -1, 0, 1],
          [-1, -1, 0, -1],
          [1, 1, 1, 0],
          [1, 1, -1, 0],
          [1, -1, 1, 0],
          [1, -1, -1, 0],
          [-1, 1, 1, 0],
          [-1, 1, -1, 0],
          [-1, -1, 1, 0],
          [-1, -1, -1, 0],
        ]),
        (this.p = []));
      for (let t = 0; t < 256; t++) this.p[t] = Math.floor(e.random() * 256);
      this.perm = [];
      for (let e = 0; e < 512; e++) this.perm[e] = this.p[e & 255];
      this.simplex = [
        [0, 1, 2, 3],
        [0, 1, 3, 2],
        [0, 0, 0, 0],
        [0, 2, 3, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 2, 3, 0],
        [0, 2, 1, 3],
        [0, 0, 0, 0],
        [0, 3, 1, 2],
        [0, 3, 2, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 3, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 2, 0, 3],
        [0, 0, 0, 0],
        [1, 3, 0, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 3, 0, 1],
        [2, 3, 1, 0],
        [1, 0, 2, 3],
        [1, 0, 3, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 3, 1],
        [0, 0, 0, 0],
        [2, 1, 3, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 1, 3],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [3, 0, 1, 2],
        [3, 0, 2, 1],
        [0, 0, 0, 0],
        [3, 1, 2, 0],
        [2, 1, 0, 3],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [3, 1, 0, 2],
        [0, 0, 0, 0],
        [3, 2, 0, 1],
        [3, 2, 1, 0],
      ];
    }
    noise(e, t) {
      let n,
        r,
        i,
        a = 0.5 * (Math.sqrt(3) - 1),
        o = (e + t) * a,
        s = Math.floor(e + o),
        c = Math.floor(t + o),
        l = (3 - Math.sqrt(3)) / 6,
        u = (s + c) * l,
        d = s - u,
        f = c - u,
        p = e - d,
        m = t - f,
        h,
        g;
      p > m ? ((h = 1), (g = 0)) : ((h = 0), (g = 1));
      let _ = p - h + l,
        v = m - g + l,
        y = p - 1 + 2 * l,
        b = m - 1 + 2 * l,
        x = s & 255,
        S = c & 255,
        C = this.perm[x + this.perm[S]] % 12,
        w = this.perm[x + h + this.perm[S + g]] % 12,
        T = this.perm[x + 1 + this.perm[S + 1]] % 12,
        E = 0.5 - p * p - m * m;
      E < 0
        ? (n = 0)
        : ((E *= E), (n = E * E * this._dot(this.grad3[C], p, m)));
      let D = 0.5 - _ * _ - v * v;
      D < 0
        ? (r = 0)
        : ((D *= D), (r = D * D * this._dot(this.grad3[w], _, v)));
      let O = 0.5 - y * y - b * b;
      return (
        O < 0
          ? (i = 0)
          : ((O *= O), (i = O * O * this._dot(this.grad3[T], y, b))),
        70 * (n + r + i)
      );
    }
    noise3d(e, t, n) {
      let r,
        i,
        a,
        o,
        s = (e + t + n) * (1 / 3),
        c = Math.floor(e + s),
        l = Math.floor(t + s),
        u = Math.floor(n + s),
        d = 1 / 6,
        f = (c + l + u) * d,
        p = c - f,
        m = l - f,
        h = u - f,
        g = e - p,
        _ = t - m,
        v = n - h,
        y,
        b,
        x,
        S,
        C,
        w;
      g >= _
        ? _ >= v
          ? ((y = 1), (b = 0), (x = 0), (S = 1), (C = 1), (w = 0))
          : g >= v
            ? ((y = 1), (b = 0), (x = 0), (S = 1), (C = 0), (w = 1))
            : ((y = 0), (b = 0), (x = 1), (S = 1), (C = 0), (w = 1))
        : _ < v
          ? ((y = 0), (b = 0), (x = 1), (S = 0), (C = 1), (w = 1))
          : g < v
            ? ((y = 0), (b = 1), (x = 0), (S = 0), (C = 1), (w = 1))
            : ((y = 0), (b = 1), (x = 0), (S = 1), (C = 1), (w = 0));
      let T = g - y + d,
        E = _ - b + d,
        D = v - x + d,
        O = g - S + 2 * d,
        ee = _ - C + 2 * d,
        te = v - w + 2 * d,
        ne = g - 1 + 3 * d,
        re = _ - 1 + 3 * d,
        ie = v - 1 + 3 * d,
        ae = c & 255,
        oe = l & 255,
        se = u & 255,
        ce = this.perm[ae + this.perm[oe + this.perm[se]]] % 12,
        le = this.perm[ae + y + this.perm[oe + b + this.perm[se + x]]] % 12,
        ue = this.perm[ae + S + this.perm[oe + C + this.perm[se + w]]] % 12,
        de = this.perm[ae + 1 + this.perm[oe + 1 + this.perm[se + 1]]] % 12,
        fe = 0.6 - g * g - _ * _ - v * v;
      fe < 0
        ? (r = 0)
        : ((fe *= fe), (r = fe * fe * this._dot3(this.grad3[ce], g, _, v)));
      let pe = 0.6 - T * T - E * E - D * D;
      pe < 0
        ? (i = 0)
        : ((pe *= pe), (i = pe * pe * this._dot3(this.grad3[le], T, E, D)));
      let me = 0.6 - O * O - ee * ee - te * te;
      me < 0
        ? (a = 0)
        : ((me *= me), (a = me * me * this._dot3(this.grad3[ue], O, ee, te)));
      let he = 0.6 - ne * ne - re * re - ie * ie;
      return (
        he < 0
          ? (o = 0)
          : ((he *= he),
            (o = he * he * this._dot3(this.grad3[de], ne, re, ie))),
        32 * (r + i + a + o)
      );
    }
    noise4d(e, t, n, r) {
      let i = this.grad4,
        a = this.simplex,
        o = this.perm,
        s = (Math.sqrt(5) - 1) / 4,
        c = (5 - Math.sqrt(5)) / 20,
        l,
        u,
        d,
        f,
        p,
        m = (e + t + n + r) * s,
        h = Math.floor(e + m),
        g = Math.floor(t + m),
        _ = Math.floor(n + m),
        v = Math.floor(r + m),
        y = (h + g + _ + v) * c,
        b = h - y,
        x = g - y,
        S = _ - y,
        C = v - y,
        w = e - b,
        T = t - x,
        E = n - S,
        D = r - C,
        O = w > T ? 32 : 0,
        ee = w > E ? 16 : 0,
        te = T > E ? 8 : 0,
        ne = w > D ? 4 : 0,
        re = T > D ? 2 : 0,
        ie = +(E > D),
        ae = O + ee + te + ne + re + ie,
        oe = +(a[ae][0] >= 3),
        se = +(a[ae][1] >= 3),
        ce = +(a[ae][2] >= 3),
        le = +(a[ae][3] >= 3),
        ue = +(a[ae][0] >= 2),
        de = +(a[ae][1] >= 2),
        fe = +(a[ae][2] >= 2),
        pe = +(a[ae][3] >= 2),
        me = +(a[ae][0] >= 1),
        he = +(a[ae][1] >= 1),
        ge = +(a[ae][2] >= 1),
        _e = +(a[ae][3] >= 1),
        ve = w - oe + c,
        ye = T - se + c,
        be = E - ce + c,
        xe = D - le + c,
        Se = w - ue + 2 * c,
        Ce = T - de + 2 * c,
        we = E - fe + 2 * c,
        Te = D - pe + 2 * c,
        Ee = w - me + 3 * c,
        De = T - he + 3 * c,
        Oe = E - ge + 3 * c,
        ke = D - _e + 3 * c,
        Ae = w - 1 + 4 * c,
        je = T - 1 + 4 * c,
        Me = E - 1 + 4 * c,
        Ne = D - 1 + 4 * c,
        Pe = h & 255,
        Fe = g & 255,
        Ie = _ & 255,
        Le = v & 255,
        Re = o[Pe + o[Fe + o[Ie + o[Le]]]] % 32,
        ze = o[Pe + oe + o[Fe + se + o[Ie + ce + o[Le + le]]]] % 32,
        Be = o[Pe + ue + o[Fe + de + o[Ie + fe + o[Le + pe]]]] % 32,
        Ve = o[Pe + me + o[Fe + he + o[Ie + ge + o[Le + _e]]]] % 32,
        He = o[Pe + 1 + o[Fe + 1 + o[Ie + 1 + o[Le + 1]]]] % 32,
        Ue = 0.6 - w * w - T * T - E * E - D * D;
      Ue < 0
        ? (l = 0)
        : ((Ue *= Ue), (l = Ue * Ue * this._dot4(i[Re], w, T, E, D)));
      let We = 0.6 - ve * ve - ye * ye - be * be - xe * xe;
      We < 0
        ? (u = 0)
        : ((We *= We), (u = We * We * this._dot4(i[ze], ve, ye, be, xe)));
      let Ge = 0.6 - Se * Se - Ce * Ce - we * we - Te * Te;
      Ge < 0
        ? (d = 0)
        : ((Ge *= Ge), (d = Ge * Ge * this._dot4(i[Be], Se, Ce, we, Te)));
      let Ke = 0.6 - Ee * Ee - De * De - Oe * Oe - ke * ke;
      Ke < 0
        ? (f = 0)
        : ((Ke *= Ke), (f = Ke * Ke * this._dot4(i[Ve], Ee, De, Oe, ke)));
      let qe = 0.6 - Ae * Ae - je * je - Me * Me - Ne * Ne;
      return (
        qe < 0
          ? (p = 0)
          : ((qe *= qe), (p = qe * qe * this._dot4(i[He], Ae, je, Me, Ne))),
        27 * (l + u + d + f + p)
      );
    }
    _dot(e, t, n) {
      return e[0] * t + e[1] * n;
    }
    _dot3(e, t, n, r) {
      return e[0] * t + e[1] * n + e[2] * r;
    }
    _dot4(e, t, n, r, i) {
      return e[0] * t + e[1] * n + e[2] * r + e[3] * i;
    }
  },
  I2 = class extends Rc {
    static get type() {
      return `DenoiseNode`;
    }
    constructor(e, t, n, r) {
      (super(`vec4`),
        (this.textureNode = e),
        (this.depthNode = t),
        (this.normalNode = n),
        (this._noiseTexture = R2()),
        (this.noiseNode = tslTexture(this._noiseTexture)),
        (this.lumaPhi = tslUniform(5)),
        (this.depthPhi = tslUniform(5)),
        (this.normalPhi = tslUniform(5)),
        (this.radius = tslUniform(5)),
        (this.index = tslUniform(0)),
        (this.updateBeforeType = Xz.FRAME),
        (this._resolution = tslUniform(new j())),
        (this._sampleVectors = NV(L2(16, 2, 1))),
        (this._cameraProjectionMatrixInverse = tslUniform(r.projectionMatrixInverse)));
    }
    updateBefore() {
      let e = this.textureNode.value;
      this._resolution.value.set(e.image.width, e.image.height);
    }
    setup() {
      let e = tslUv(),
        t = (e) => this.textureNode.sample(e),
        n = (e) => this.depthNode.sample(e).x,
        r = (e) =>
          this.normalNode === null
            ? wB(e, this.depthNode.value, this._cameraProjectionMatrixInverse)
            : this.normalNode.sample(e).rgb.normalize(),
        i = (e) => this.noiseNode.sample(e),
        a = tslFn(([e, i, a, o]) => {
          let s = t(o).toVar(),
            c = n(o).toVar(),
            l = r(o).toVar(),
            u = s.rgb,
            d = EB(o, c, this._cameraProjectionMatrixInverse).toVar(),
            f = dV(tslMax(tslDot(i, l).toVar(), 0), this.normalPhi).toVar(),
            p = tslAbs(LB(u).sub(LB(e))).toVar(),
            m = tslMax(tslFloat(1).sub(p.div(this.lumaPhi)), 0).toVar(),
            h = tslAbs(tslDot(a.sub(d), i)).toVar(),
            g = tslMax(tslFloat(1).sub(h.div(this.depthPhi)), 0),
            _ = m.mul(g).mul(f);
          return tslVec4(u.mul(_), _);
        }),
        o = tslFn(([e]) => {
          let o = n(e).toVar(),
            s = r(e).toVar(),
            c = t(e).toVar(),
            l = fV(`vec4`);
          return (
            tslIf(o.greaterThanEqual(1).or(tslDot(s, s).equal(0)), () => {
              l.assign(c);
            }).Else(() => {
              let t = tslVec3(c.rgb),
                n = EB(e, o, this._cameraProjectionMatrixInverse).toConst(),
                r = kV(this.noiseNode, 0),
                u = tslVec2(e.x, e.y.oneMinus());
              u = u.mul(this._resolution.div(r));
              let d = i(u).toVar(),
                f = tslVec2(
                  tslSin(d.element(this.index.mod(4).mul(2).mul($z))),
                  hB(d.element(this.index.mod(4).mul(2).mul($z))),
                ),
                p = RB(f.x, f.y.negate(), f.x, f.y),
                m = tslFloat(1).toVar(),
                h = tslVec3(c.rgb).toVar();
              (Yz(
                { start: tslInt(0), end: tslInt(16), type: `int`, condition: `<` },
                ({ i: r }) => {
                  let i = this._sampleVectors.element(r),
                    o = p
                      .mul(i.xy.mul(tslFloat(1).add(i.z.mul(this.radius.sub(1)))))
                      .div(this._resolution),
                    c = e.add(o),
                    l = a(t, s, n, c);
                  (h.addAssign(l.xyz), m.addAssign(l.w));
                },
              ),
                tslIf(m.greaterThan(tslFloat(0)), () => {
                  h.divAssign(m);
                }),
                l.assign(tslVec4(h, c.a)));
            }),
            l
          );
        });
      return tslFn(() => o(e))();
    }
    dispose() {
      (super.dispose(), this._noiseTexture.dispose());
    }
  };
