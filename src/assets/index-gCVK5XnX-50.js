// assets/index-gCVK5XnX 50 — mul
// Lines 63630-63945 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function e6({ patch: e, spacing: t, seed: n }) {
  let r = Math.floor(e / t),
    a = Math.ceil(r / K3) ** 2,
    o = new Float32Array(a * K3 * K3 * 4);
  for (let e = 0; e < o.length; e += 4) o.set([1e9, 1e9, 0, 2], e);
  let s = new Float32Array(400);
  for (let e = 0; e < 100; e++) s.set([1 / 0, -1 / 0, 1 / 0, -1 / 0], e * 4);
  let c = new Uint8Array(100),
    l = new Uint16Array(100),
    u = makeRng(n * 31 + 7);
  for (let e = 0; e < r; e++)
    for (let n = 0; n < r; n++) {
      let i = [(n + u()) * t, (e + u()) * t, u(), u()],
        d = Math.floor((e * K3) / r) * K3 + Math.floor((n * K3) / r);
      (o.set(i, (d * a + l[d]++) * 4),
        s.set(
          [
            Math.min(s[d * 4], i[0]),
            Math.max(s[d * 4 + 1], i[0]),
            Math.min(s[d * 4 + 2], i[1]),
            Math.max(s[d * 4 + 3], i[1]),
          ],
          d * 4,
        ),
        i[3] === 0 && (c[d] = 1));
    }
  return { per: a, table: _$(o, a, 100, i, E, _), boxes: s, anywhere: c };
}
function t6(e, t) {
  let n = t.add(WORLD_HALF).div(2),
    r = xB(n).clamp(tslVec2(0), tslVec2(GRID_N - 2)),
    i = SB(n),
    a = (t, n) => OV(e, jB(r.add(tslVec2(t, n)))).r;
  return tslMix(tslMix(a(0, 0), a(1, 0), i.x), tslMix(a(0, 1), a(1, 1), i.x), i.y);
}
function n6(e, t, n, r) {
  let i = tslSin(tslDot(e, tslVec2(0.09, 0.05)).sub(yW.mul(1.7)))
      .mul(0.5)
      .add(0.5),
    a = valueNoise(e.mul(0.04).sub(tslVec2(yW.mul(0.35), yW.mul(0.12))))
      .mul(0.75)
      .add(0.25)
      .mul(i.mul(0.5).add(0.5));
  return {
    x: n.mul(r).mul(a.mul(0.35).add(tslSin(yW.mul(3.1).add(t.mul(40))).mul(0.06))),
    z: n.mul(r).mul(a).mul(0.18),
  };
}
var r6 = (e) => Math.floor(clamp(Math.floor((e + WORLD_HALF) / 2), 0, GRID_N - 2) / q3),
  i6 = class {
    meshes = [];
    cam = tslUniform(new M());
    tiled = [];
    low;
    high;
    green;
    blocks;
    presses = NV(
      Array.from({ length: U3 }, () => new pn(0, 0, -100, 0)),
      `vec4`,
    );
    pressed = 0;
    pressBox = tslUniform(new pn(1 / 0, 1 / 0, -1 / 0, -1 / 0));
    constructor(e, t) {
      let n = C$(e),
        r = v$(e.grass, s, ee),
        i = (this.blocks = Math.ceil((GRID_N - 1) / q3));
      ((this.low = new Float32Array(i * i).fill(1 / 0)),
        (this.high = new Float32Array(i * i).fill(-1 / 0)),
        (this.green = new Uint8Array(i * i)));
      for (let t = 0; t < i; t++)
        for (let n = 0; n < i; n++) {
          let r = t * i + n;
          for (let i = t * q3; i <= Math.min(t * q3 + q3, GRID_N - 1); i++)
            for (let t = n * q3; t <= Math.min(n * q3 + q3, GRID_N - 1); t++) {
              let n = e.h[i * GRID_N + t];
              ((this.low[r] = Math.min(this.low[r], n)),
                (this.high[r] = Math.max(this.high[r], n)),
                (this.green[r] = Math.max(this.green[r], e.grass[i * GRID_N + t])));
            }
        }
      let a = 0;
      for (let e of t ? J3 : Y3) {
        let t = this.field(e, a, n, r);
        (this.tiled.push(t), this.meshes.push(t.mesh), (a = e.far));
      }
    }
    update(e) {
      (this.cam.value.copy(e.position), e.updateMatrixWorld(), lH(e, Z3));
      for (let t of this.tiled) this.pick(t, e.position);
    }
    pick(e, t) {
      let { patch: n, far: r } = e.field,
        i = e.drawn.array,
        a = e.boxes,
        o = 0;
      for (let s = 0; s < 100; s++) {
        let c = a[s * 4],
          l = a[s * 4 + 1],
          u = a[s * 4 + 2],
          d = a[s * 4 + 3];
        for (let a = Math.ceil((t.x - r - l) / n); a * n + c < t.x + r; a++)
          for (let f = Math.ceil((t.z - r - d) / n); f * n + u < t.z + r; f++) {
            let p = c + a * n,
              m = l + a * n,
              h = u + f * n,
              g = d + f * n;
            if (
              Math.hypot(
                Math.max(p - t.x, 0, t.x - m),
                Math.max(h - t.z, 0, t.z - g),
              ) >= r
            )
              continue;
            let _ = Math.hypot(
              Math.max(t.x - p, m - t.x),
              Math.max(t.z - h, g - t.z),
            );
            if (
              _ <= e.inner * 0.8 ||
              (!this.under(p, m, h, g, $3) && !e.anywhere[s])
            )
              continue;
            let v = e.reach * Math.max(1, Math.min(r, _) / 9) + 1.8;
            (Q3.min.set(p - v, $3.x - 0.1, h - v),
              Q3.max.set(m + v, $3.y + 1.2, g + v),
              Z3.intersectsBox(Q3) &&
                o !== i.length &&
                i[o++].set(a * n, f * n, s, 0));
          }
      }
      cH(e.mesh, o * e.per);
    }
    under(e, t, n, r, i) {
      let a = 1 / 0,
        o = -1 / 0,
        s = 0;
      for (let i = r6(n); i <= r6(r); i++)
        for (let n = r6(e); n <= r6(t); n++) {
          let e = i * this.blocks + n;
          ((a = Math.min(a, this.low[e])),
            (o = Math.max(o, this.high[e])),
            (s = Math.max(s, this.green[e])));
        }
      return (i.set(a, o), s > 0);
    }
    press(e, t) {
      let n = this.presses.array,
        r = n[this.pressed];
      if (Math.hypot(e - r.x, t - r.y) < G3) return;
      ((this.pressed = (this.pressed + 1) % U3),
        n[this.pressed].set(e, t, yW.value, 1));
      let i = this.pressBox.value;
      i.set(1 / 0, 1 / 0, -1 / 0, -1 / 0);
      for (let e of n)
        e.w > 0 &&
          i.set(
            Math.min(i.x, e.x - W3),
            Math.min(i.y, e.y - W3),
            Math.max(i.z, e.x + W3),
            Math.max(i.w, e.y + W3),
          );
    }
    pushed(e) {
      let t = tslVec2(0);
      for (let n = 0; n < U3; n++) {
        let r = this.presses.element(n),
          i = e.sub(r.xy),
          a = tslLength(i),
          o = tslMax(yW.sub(r.z), 0),
          s = bB(o.mul(-3.5)).mul(hB(o.mul(7)));
        t = t.add(i.div(tslMax(a, 0.001)).mul(tslSmoothstep(W3, 0.2, a).mul(s).mul(r.w)));
      }
      return t.div(tslMax(1, tslLength(t)));
    }
    field(e, t, n, r) {
      let i = X3(e),
        { per: a, table: o, boxes: s, anywhere: c } = e6(e),
        l = Math.ceil((2 * e.far) / (e.patch / K3)) + 2,
        u = NV(
          Array.from({ length: l * l }, () => new pn()),
          `vec4`,
        );
      i.instanceCount = 0;
      let d = (e.spread + 0.2 + 0.021 * e.wide) * 1.7,
        f = addMesh(
          i,
          this.material(
            { field: e, inner: t, per: a, drawn: u, reach: d },
            o,
            n,
            r,
          ),
          !1,
        );
      return (
        (f.frustumCulled = !1),
        {
          field: e,
          inner: t,
          mesh: f,
          per: a,
          boxes: s,
          anywhere: c,
          drawn: u,
          reach: d,
        }
      );
    }
    material({ field: e, inner: t, per: n, drawn: r, reach: i }, a, o, s) {
      let { far: c } = e,
        l = new nS({ roughness: 0.8, side: 2 }),
        u = r.element(OB.div(jV(n))),
        d = OV(a, jB(tslInt(OB.mod(jV(n))), tslInt(u.z))),
        f = d.xy.add(u.xy),
        p = tslLength(f.sub(this.cam.xz)),
        m = t6(o, f),
        h = tslTexture(s, w$(f)).level(tslFloat(0)).r,
        g = valueNoise(f.mul(0.09))
          .mul(0.7)
          .add(valueNoise(f.mul(0.31)).mul(0.3)),
        _ = tslMix(0.22, 0.85, tslSmoothstep(0.2, 0.8, g)).mul(d.z.mul(0.6).add(0.7)),
        v = TV(d.w, h.mul(g.mul(0.5).add(0.75))),
        y = tslSmoothstep(c * 0.75, c, p).oneMinus(),
        b = t > 0 ? tslSmoothstep(t * 0.8, t, p) : tslFloat(1),
        x = _.mul(v).mul(y).mul(b),
        S = oV,
        C = S.y.mul(S.y),
        w = d.z.mul(TAU),
        T = NU(S.xz, hB(w), tslSin(w)),
        E = n6(f, d.z, C, x),
        D = x
          .mul(0.6)
          .add(1)
          .mul(tslMax(1, p.div(9))),
        O = t > 0 ? tslVec2(0) : tslVec2(0).toVar(),
        ee = this.pressBox,
        te = f.x
          .greaterThan(ee.x)
          .and(f.y.greaterThan(ee.y))
          .and(f.x.lessThan(ee.z))
          .and(f.y.lessThan(ee.w)),
        ne = C.mul(x).mul(0.6),
        re = tslVec3(
          f.x.add(T.x.mul(D)).add(E.x).add(O.x.mul(ne)),
          S.y.mul(x).mul(tslLength(O).mul(-0.45).add(1)).add(m).sub(0.02),
          f.y.add(T.y.mul(D)).add(E.z).add(O.y.mul(ne)),
        ),
        ie = t > 0 ? p.greaterThan(t * 0.8).and(p.lessThan(c)) : p.lessThan(c),
        ae = KU(tslVec3(f.x, m.add(0.55), f.y), tslMax(1, p.div(9)).mul(i).add(1.8)),
        oe = tslSmoothstep(
          0.4,
          0.66,
          valueNoise(f.mul(0.011).add(3))
            .mul(0.6)
            .add(valueNoise(f.mul(0.03)).mul(0.4)),
        ),
        se = tslFloat(0).toVar();
      l.positionNode = tslFn(() => {
        let e = tslVec3(f.x, -1e5, f.y).toVar();
        return (
          tslIf(ie, () => {
            tslIf(ae, () => {
              tslIf(x.greaterThan(0.02), () => {
                (t === 0 && tslIf(te, () => O.assign(this.pushed(f))),
                  e.assign(re),
                  se.assign(oe));
              });
            });
          }),
          e
        );
      })();
      let ce = tslMix(tslVec3(0.16, 0.24, 0.045), tslVec3(0.42, 0.33, 0.09), IV(se)).mul(
          IV(d.w).mul(0.4).add(0.8),
        ),
        le = tslUv().y,
        ue = ce.mul(tslMix(0.36, 1.25, le)).add(tslVec3(0.05, 0.04, 0).mul(le.mul(le)));
      return (
        (l.colorNode = ue),
        (l.normalNode = RU()),
        (l.emissiveNode = ue.mul(gW).mul(JW().mul(1.4).mul(le))),
        l
      );
    }
  },
  a6 = {
    ...pH,
    housing: [13028045, 0.55, 0.2],
    band: [1925048, 0.5, 0.1],
    roof: [3027767, 0.7, 0.3],
    deck: [6052438, 0.85, 0],
    line: [14856986, 0.6, 0],
    glass: [1713712, 0.15, 0.6],
    seat: [2042948, 0.75, 0],
    bar: [14263584, 0.45, 0.4],
  };
function o6(e, t) {
  let [n, r, i] = a6[t];
  return (vH(iH(e, `position`, `normal`), new Yn(n), r, i), e);
}
var s6 = new N(),
  c6 = new qt(),
  l6 = new M();
function u6(e, t, n, r, i, a, o, s) {
  return f6(new la(i, a, o), e, t, n, r, s);
}
function d6(e, t, n, r, i, a = r, o = 10) {
  return o6(
    makeTube(t.clone().applyMatrix4(e), n.clone().applyMatrix4(e), r, a, o),
    i,
  );
}
function f6(e, t, n, r, i, a) {
  return o6(e.translate(n, r, i).applyMatrix4(t), a);
}
