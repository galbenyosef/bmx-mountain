// assets/index-gCVK5XnX 64 — mul
// Lines 67507-67840 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function S9(e, t, n) {
  let r = clamp(t / v9, 0, e.length / 3 - 1.001),
    i = Math.floor(r),
    a = r - i;
  return n.set(
    lerp(e[i * 3], e[i * 3 + 3], a),
    lerp(e[i * 3 + 1], e[i * 3 + 4], a),
    lerp(e[i * 3 + 2], e[i * 3 + 5], a),
  );
}
function C9(e, t) {
  if (e) {
    let e = Math.floor(t / 7),
      n = t - e * 7;
    return (
      0.12 +
      0.55 *
        (hash01(e * 31 + 5) < 0.45 ? smoothstep(0, 0.15, n) * (1 - smoothstep(1.1, 1.4, n)) : 0) *
        Math.sin(n * 2.4 * TAU)
    );
  }
  let n = Math.floor(t / 4),
    r = t - n * 4;
  return hash01(n * 13 + 7) < 0.3 && r > 2.5
    ? 0.08
    : 0.1 + 0.55 * Math.sin(r * 4 * TAU);
}
function w9(e, t, n, r, i, a) {
  let o = tslUv().x,
    s = i
      .mul(tslSmoothstep(0, 1, o.abs()).mul(0.6).add(1))
      .mul(o.abs().greaterThan(0).select(1, 0)),
    c = SV(o),
    l = hB(s),
    u = tslSin(s),
    d = tslVec3(
      e.x.mul(l).sub(c.mul(e.y).mul(u)),
      c.mul(e.x).mul(u).add(e.y.mul(l)),
      e.z,
    ),
    f = hB(r.z),
    p = tslSin(r.z),
    m = tslVec3(d.x.mul(f).sub(d.y.mul(p)), d.x.mul(p).add(d.y.mul(f)), d.z),
    h = hB(r.y),
    g = tslSin(r.y),
    _ = tslVec3(m.x, m.y.mul(h).sub(m.z.mul(g)), m.y.mul(g).add(m.z.mul(h))),
    v = hB(r.x),
    y = tslSin(r.x),
    b = tslVec3(_.x.mul(v).add(_.z.mul(y)), _.y, _.z.mul(v).sub(_.x.mul(y)));
  return a ? b : b.mul(n).add(t);
}
function Uee() {
  let e = [],
    t = [],
    n = [],
    r = (r, i, a, o = 1) => {
      let s = (i[2] - r[2]) * (a[0] - r[0]) - (i[0] - r[0]) * (a[2] - r[2]);
      for (let c of s * o >= 0 ? [r, i, a] : [r, a, i])
        (e.push(c[0], c[1], c[2]), t.push(c[3] ?? 0), n.push(0, o, 0));
    },
    i = (e, t, n, i) => {
      (r(e, t, n), r(e, n, i));
    };
  for (let e of [-1, 1]) {
    (i(
      [e * 0.035, 0, -0.07, e * 0.07],
      [e * 0.27, 0.01, -0.07, e * 0.54],
      [e * 0.27, 0.01, 0.1, e * 0.54],
      [e * 0.035, 0, 0.07, e * 0.07],
    ),
      i(
        [e * 0.27, 0.01, -0.07, e * 0.54],
        [e * 0.5, 0.005, 0.03, e],
        [e * 0.47, 0.005, 0.11, e * 0.94],
        [e * 0.27, 0.01, 0.1, e * 0.54],
      ));
    let t = (t) => {
      (r([0, 0, -0.24], [e * 0.04, t * 0.02, -0.1], [0, t * 0.045, -0.08], t),
        r(
          [0, t * 0.045, -0.08],
          [e * 0.04, t * 0.02, -0.1],
          [e * 0.035, t * 0.015, 0.08],
          t,
        ),
        r(
          [0, t * 0.045, -0.08],
          [e * 0.035, t * 0.015, 0.08],
          [0, t * 0.02, 0.14],
          t,
        ));
    };
    (t(1), t(-1), r([0, 0, 0.1], [e * 0.1, 0, 0.3], [0, 0, 0.3]));
  }
  let a = new Ns();
  (a.setAttribute(`position`, new zr(e, 3)),
    a.setAttribute(`normal`, new zr(n, 3)));
  let o = t.flatMap((e) => [e, 0]);
  return (a.setAttribute(`uv`, new zr(o, 2)), a);
}
var T9 = 400,
  E9 = 64,
  D9 = 3,
  O9 = new M(),
  k9 = new M();
function Wee(e, t) {
  let n = tslAttribute(`puffA`, `vec4`),
    r = tslAttribute(`puffB`, `vec4`),
    i = new Wy({ transparent: !0, depthWrite: !1 });
  i.positionNode = n.xyz.add(e.mul(oV.x.mul(n.w))).add(t.mul(oV.y.mul(n.w)));
  let a = tslLength(tslUv().sub(0.5)).mul(2),
    o = valueNoise(tslUv().mul(3.5).add(r.z.mul(37)))
      .mul(0.6)
      .add(0.4),
    s = tslMix(
      tslSmoothstep(1, 0.15, a.add(o.mul(0.35).sub(0.15))),
      tslSmoothstep(0.6, 0.78, valueNoise(tslUv().mul(7).add(r.z.mul(53)))).mul(tslSmoothstep(1, 0.35, a)),
      r.y,
    ),
    c = n.xyz.sub(lB),
    l = dV(tslMax(tslDot(tslNormalize(c), hW), 0), 6),
    u = tslVec3(0.35, 0.42, 0.55),
    d = tslMix(
      tslVec3(...mH.dust).mul(gW.mul(tslFloat(0.9).add(l.mul(5))).add(u)),
      tslVec3(0.8, 0.85, 0.88).mul(gW.mul(tslFloat(0.5).add(l.mul(4))).add(u.mul(1.2))),
      r.y,
    ),
    f = tslSmoothstep(0.4, 1.6, tslLength(c));
  return (
    (i.colorNode = tslVec4(d, s.mul(r.x).mul(f))),
    (i.alphaTest = 0.004),
    (i.mrtNode = zU()),
    i
  );
}
var Gee = class {
    mesh;
    puffs = [];
    next = 0;
    a;
    b;
    carry = 0;
    right = tslUniform(new M(1, 0, 0));
    up = tslUniform(new M(0, 1, 0));
    constructor() {
      let e = QV();
      ((this.a = makeBuffer(T9, 4)),
        (this.b = makeBuffer(T9, 4)),
        e.setAttribute(`puffA`, this.a),
        e.setAttribute(`puffB`, this.b),
        (e.instanceCount = 0),
        (this.mesh = new wi(e, Wee(this.right, this.up))),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 5));
    }
    puff(e, t, n, r, i = 1.4, a = 0) {
      let o = {
        p: e.clone(),
        v: t.clone(),
        age: 0,
        life: i * (0.7 + Math.random() * 0.6),
        size: n * (0.7 + Math.random() * 0.6),
        grow: a ? 0.3 : 1.5 + Math.random(),
        alpha: r,
        seed: Math.random(),
        wet: a,
      };
      this.puffs.length < T9
        ? this.puffs.push(o)
        : (this.puffs[this.next++ % T9] = o);
    }
    burst(e, t, n, r, i) {
      for (let a = 0; a < n; a++)
        (O9.set(randSpread(2.5), Math.random() * 1.2, randSpread(2.5)).addScaledVector(t, 0.25),
          k9.set(e.x + randSpread(0.6), e.y + 0.05, e.z + randSpread(0.6)),
          this.puff(k9, O9, r, i));
    }
    land(e, t, n) {
      let r = Math.hypot(t.x, t.z) || 1,
        i = t.x / r,
        a = t.z / r,
        o = Math.round(6 + n * 2.5),
        s = 1.5 + n * 0.2;
      for (let t = 0; t < o; t++) {
        let t = randSpread(2) * s,
          o = r * (0.2 + Math.random() * 0.4);
        (O9.set(
          i * o - a * t,
          0.3 + Math.random() * (0.4 + n * 0.08),
          a * o + i * t,
        ),
          k9.set(e.x + randSpread(0.6), e.y + 0.05, e.z + randSpread(0.6)),
          this.puff(k9, O9, 0.7 + n * 0.05, 0.45, 2.4));
      }
    }
    stream(e, t, n, r, i, a) {
      for (this.carry += e * r; this.carry >= 1;)
        (--this.carry,
          O9.set(randSpread(0.6), 0.4 + Math.random() * 0.4, randSpread(0.6)).addScaledVector(
            n,
            0.15,
          ),
          this.puff(t, O9, i, a, 1.1));
    }
    spray(e, t, n) {
      let r = Math.hypot(t.x, t.z) || 1,
        i = -t.z / r,
        a = t.x / r;
      for (let o = 0; o < n; o++) {
        let n =
          (Math.random() < 0.5 ? -1 : 1) * (1 + Math.random() * (1 + r * 0.15));
        (O9.set(
          i * n,
          1.2 + Math.random() * (1.5 + r * 0.1),
          a * n,
        ).addScaledVector(t, 0.35 + Math.random() * 0.3),
          k9.set(e.x + randSpread(0.3), e.y + 0.05, e.z + randSpread(0.3)),
          this.puff(k9, O9, 0.25 + Math.random() * 0.3, 0.9, 0.7, 1));
      }
    }
    update(e, t) {
      (this.right.value.setFromMatrixColumn(t.matrixWorld, 0),
        this.up.value.setFromMatrixColumn(t.matrixWorld, 1));
      let n = this.a.array,
        r = this.b.array,
        i = 0;
      for (let t of this.puffs) {
        if (((t.age += e), t.age >= t.life)) continue;
        ((this.puffs[i] = t),
          t.v.multiplyScalar(Math.exp(-e * (t.wet ? 0.9 : 2.2))),
          (t.v.y += e * (t.wet ? -PHYSICS.g : 0.25)),
          (t.v.x += e * 0.3),
          t.p.addScaledVector(t.v, e));
        let a = t.age / t.life;
        ((n[i * 4] = t.p.x),
          (n[i * 4 + 1] = t.p.y),
          (n[i * 4 + 2] = t.p.z),
          (n[i * 4 + 3] = t.size * (1 + t.grow * a)),
          (r[i * 4] = t.alpha * Math.min(1, a * 8) * (1 - a) * (1 - a)),
          (r[i * 4 + 1] = t.wet),
          (r[i * 4 + 2] = t.seed),
          i++);
      }
      ((this.puffs.length = i),
        (this.next = 0),
        cH(this.mesh, i, this.a, this.b));
    }
  },
  Kee = class {
    ground;
    mesh;
    clods = [];
    a;
    b;
    constructor(e) {
      this.ground = e;
      let t = uH(new Do(1, 0));
      ((this.a = makeBuffer(E9, 4)),
        (this.b = makeBuffer(E9, 4)),
        t.setAttribute(`clodA`, this.a),
        t.setAttribute(`clodB`, this.b),
        (t.instanceCount = 0));
      let n = tslAttribute(`clodA`, `vec4`),
        r = tslAttribute(`clodB`, `vec4`),
        i = new nS({ roughness: 0.95, flatShading: !0 });
      ((i.positionNode = gV(sV.mul(tslVec3(1, 0.7, 0.85)).mul(n.w), r.xyz).add(
        n.xyz,
      )),
        (i.colorNode = tslVec3(...mH.clod).mul(r.w)),
        (this.mesh = new wi(t, i)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.receiveShadow = !0),
        (this.mesh.visible = !1));
    }
    throw(e, t, n, r) {
      for (let i = 0; i < n; i++)
        (this.clods.length >= E9 && this.clods.shift(),
          this.clods.push({
            p: e.clone().add(k9.set(randSpread(0.5), 0.1, randSpread(0.5))),
            v: t
              .clone()
              .multiplyScalar(0.3 + Math.random() * 0.4)
              .add(O9.set(randSpread(4), 1.5 + Math.random() * 3, randSpread(4))),
            r: new M(Math.random() * 6, Math.random() * 6, Math.random() * 6),
            spin: new M(randSpread(30), randSpread(30), randSpread(30)),
            size: r * (0.5 + Math.random()),
            shade: 0.7 + Math.random() * 0.5,
            age: 0,
          }));
    }
    update(e) {
      let t = this.a.array,
        n = this.b.array,
        r = 0;
      for (let i of this.clods) {
        if (((i.age += e), i.age >= D9)) continue;
        ((this.clods[r] = i),
          (i.v.y -= PHYSICS.g * e),
          i.p.addScaledVector(i.v, e),
          i.r.addScaledVector(i.spin, e));
        let a = this.ground.height(i.p.x, i.p.z) + i.size * 0.6;
        i.p.y < a &&
          ((i.p.y = a),
          (i.v.y = Math.abs(i.v.y) * 0.3),
          (i.v.x *= 0.55),
          (i.v.z *= 0.55),
          i.spin.multiplyScalar(0.5));
        let o = i.size * Math.min(1, (D9 - i.age) * 2);
        (t.set([i.p.x, i.p.y, i.p.z, o], r * 4),
          n.set([i.r.x, i.r.y, i.r.z, i.shade], r * 4),
          r++);
      }
      ((this.clods.length = r), cH(this.mesh, r, this.a, this.b));
    }
  },
  A9 = 4e3,
  qee = 0.3,
  Jee = {
    [SURFACE.Trail]: 0.16,
    [SURFACE.Dirt]: 0.3,
    [SURFACE.Grass]: 0,
    [SURFACE.Forest]: 0.22,
    [SURFACE.Rock]: 0,
    [SURFACE.Wood]: 0,
    [SURFACE.Water]: 0,
  },
  Yee = 0.028,
  j9 = [0.42, 0.26],
  M9 = 3,
  N9 = 0.015,
  P9 = new M(),
  F9 = new M(),
  I9 = new M(),
  L9 = new M(),
  Xee = [0, 1, 0];
