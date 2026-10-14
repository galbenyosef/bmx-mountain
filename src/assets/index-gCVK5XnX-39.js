// assets/index-gCVK5XnX 39 — math
// Lines 59852-60196 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function D0(e, t, n) {
  let r = E0(e * 9 + 3.1, t * 9, n * 9) - 0.5,
    i = E0(e * 24, t * 24 + 7.7, n * 24) - 0.5,
    a = E0(e * 70, t * 70, n * 14 + 5.3) - 0.5,
    o = (E0(e * 6, t * 6, n * 6 + 1.9) - 0.5) * 0.14,
    s = 1 + r * 0.36 + i * 0.14 + a * 0.2;
  return [s * (1 + o), s, s * (1 - o)];
}
var O0 = [0.02, 0.05, 0.1],
  k0 = 0.35;
function A0(e, t, n, r, i, a) {
  let o = 0;
  for (let s of O0)
    o += Y(t0(e, t, n + a[0] * s, r + a[1] * s, i + a[2] * s) / s);
  return 1 - k0 * (1 - o / O0.length);
}
function j0(e, t, n) {
  let r = t.map((e, t) => t),
    { pos: i, idx: a } = v0(t),
    o = 0.0015,
    s = new Float64Array(t.length),
    c = [],
    l = new Float64Array(L1.Legs + K1.length * 3);
  for (let a = 0; a < i.length / 3; a++) {
    let u = i[a * 3],
      d = i[a * 3 + 1],
      f = i[a * 3 + 2],
      p = n0(t, u, d, f, 0.03, s, c),
      m = (e, n, r) => t0(t, c, e, n, r),
      h = i0([
        m(u + o, d, f) - m(u - o, d, f),
        m(u, d + o, f) - m(u, d - o, f),
        m(u, d, f + o) - m(u, d, f - o),
      ]),
      g = m(u, d, f);
    ((u -= h[0] * g), (d -= h[1] * g), (f -= h[2] * g), l.fill(0));
    let _ = Z1.Body;
    for (let e of c)
      ((l[t[e].bone] += Math.exp(-(s[e] - p) / Math.max(b0, t[e].k * x0))),
        s[e] === p && (_ = t[e].part));
    let v = [...l.keys()].sort((e, t) => l[t] - l[e]).slice(0, 4),
      y = v.reduce((e, t) => e + l[t], 0),
      b = A0(t, r, u, d, f, h),
      x = T0(_, u, d, f, h, n),
      S = D0(u, d, f);
    e.vertex(
      u,
      d,
      f,
      h,
      [x[0] * S[0] * b, x[1] * S[1] * b, x[2] * S[2] * b],
      v,
      v.map((e) => l[e] / y),
    );
  }
  for (let t of a) e.index.push(t);
}
function M0(e) {
  let t = e.map((e, t) => t),
    n = 0;
  for (; t0(e, t, n, W1[1], W1[2]) < 0 && n < 0.12;) n += 0.001;
  return n;
}
function N0(e, t, n) {
  let r = [t * (n - 0.01), W1[1], W1[2]],
    i = 0.02;
  e.sheet(
    7,
    10,
    (e, t) => {
      let n = e * DF,
        a = t * Math.PI;
      return {
        p: [
          r[0] + i * Math.sin(a) * Math.cos(n),
          r[1] + i * Math.cos(a),
          r[2] + i * Math.sin(a) * Math.sin(n),
        ],
        c: o0.eye,
      };
    },
    L1.Head,
    !1,
    r,
  );
}
var P0 = 0.235,
  F0 = 0.07;
function I0(e, t, n) {
  let r = U1(t),
    i = i0([t * 0.95, 0.85, 0.2]),
    a = i0(r0([0, 0.3, -1], i)).map((e) => e * t),
    o = i0(r0(i, a)).map((e) => e * t);
  o[2] > 0 && (o = [-o[0], -o[1], -o[2]]);
  for (let t of [1, -1])
    e.sheet(
      10,
      9,
      (e, n) => {
        let s = e * 2 - 1,
          c = F0 * Math.sin(Math.PI * (0.08 + n * 0.9)) ** 0.6,
          l =
            -0.026 * (1 - s * s) * Math.sin(Math.PI * Math.min(1, n * 1.15)) +
            t * 0.002,
          u = [0, 1, 2].map(
            (e) => r[e] + i[e] * P0 * n + a[e] * s * c + o[e] * l,
          ),
          d = Math.max(X(0.75, 1, Math.abs(s)), X(0.88, 1, n));
        return {
          p: u,
          c:
            t > 0
              ? s0(o0.innerEar, o0.earRim, d)
              : s0(o0.coat, o0.earRim, d * 0.6),
        };
      },
      n,
      t < 0,
      null,
    );
}
function L0() {
  let e = Q1(),
    t = new y0(),
    n = M0(e);
  j0(t, e, n);
  for (let e of [-1, 1]) N0(t, e, n);
  for (let e of [-1, 1]) I0(t, e, e < 0 ? L1.EarL : L1.EarR);
  return t.done();
}
var R0 = [0.5, 0.58, 0, 0.08],
  z0 = [0.25, 0.75, 0, 0.5],
  B0 = {
    gallop: {
      down: 0.3,
      swing: [0.6, 0.62],
      lean: [0.05, -0.1],
      fold: [-1.9, 1.4],
      fetlock: [-0.9, -0.8],
    },
    walk: {
      down: 0.62,
      swing: [0.42, 0.4],
      lean: [0.02, -0.04],
      fold: [-0.9, 0.7],
      fetlock: [-0.5, -0.4],
    },
  },
  V0 = [0, 0, 0];
function H0(e, t, n) {
  let r = +!t,
    i = n.swing[r],
    a,
    o = 0;
  if (e < n.down) a = i * (1 - (2 * e) / n.down);
  else {
    let t = (e - n.down) / (1 - n.down);
    ((a = -i + i * (1 - Math.cos(Math.PI * t))),
      (o = Math.sin(Math.PI * Math.min(1, t * 1.2))));
  }
  return (
    (V0[0] = n.lean[r] + a),
    (V0[1] = n.fold[r] * o),
    (V0[2] = n.fetlock[r] * o),
    V0
  );
}
var U0 = [
  ...G1,
  ...K1.flatMap((e, t) => {
    let n = e.side * (e.front ? q1 : J1);
    return (e.front ? Y1 : X1).map(([e, r], i) => [
      n,
      r,
      -e,
      i === 0 ? L1.Body : L1.Legs + t * 3 + i - 1,
    ]);
  }),
];
function W0(e, t) {
  let n = new nS({ roughness: 1, metalness: 0 });
  ((n.vertexColors = !0),
    (n.maskNode = WU().lessThan(e)),
    (n.maskShadowNode = n.maskNode));
  let r = WB.mul(RV(sV, 1)).xyz,
    i = lB.sub(r),
    a = MB(i);
  return (
    (n.positionNode = GB.mul(
      RV(r.add(i.div(a).mul(HB(a.mul(x1), 4).mul(t))), 1),
    ).xyz),
    (n.castShadowPositionNode = sV),
    n
  );
}
function G0(e) {
  let t = U0.map(() => new Ii());
  U0.forEach(([e, n, r, i], a) => {
    if (i < 0) return;
    let [o, s, c] = U0[i];
    (t[a].position.set(e - o, n - s, r - c), t[i].add(t[a]));
  });
  let n = MV(1),
    r = MV(1),
    i = new Fi(e, W0(n, r));
  return (
    i.add(t[0]),
    i.updateMatrixWorld(!0),
    i.bind(new Bi(t)),
    (i.castShadow = !0),
    (i.receiveShadow = !0),
    (i.frustumCulled = !1),
    (i.visible = !1),
    { mesh: i, bones: t, fade: n, open: r }
  );
}
var K0 = class e {
    group = new Hn();
    rigs;
    constructor(e) {
      let t = new Xr();
      (t.setAttribute(`position`, new Fr(e.position, 3)),
        t.setAttribute(`normal`, new Fr(e.normal, 3)),
        t.setAttribute(`color`, new Fr(e.color, 3)),
        t.setAttribute(`uv`, XV(e.position.length / 3)),
        t.setAttribute(`skinIndex`, new Fr(e.skinIndex, 4)),
        t.setAttribute(`skinWeight`, new Fr(e.skinWeight, 4)),
        t.setIndex(new Fr(e.index, 1)),
        (this.rigs = [G0(t), G0(t)]));
      for (let e of this.rigs) this.group.add(e.mesh);
    }
    static async create() {
      let t = await BF(
        () =>
          new Worker(
            new URL(
              new URL(`deerSkin.worker-DhQg8wxY.js`, import.meta.url).href,
              `` + import.meta.url,
            ),
            { type: `module` },
          ),
        null,
        L0,
      );
      return new e(t);
    }
    update(e) {
      e.forEach((e, t) => this.pose(this.rigs[t], e));
    }
    warm(e) {
      let t = new M(0, -1.2, -9).add(e.position);
      for (let e of this.rigs)
        (e.mesh.position.copy(t), (e.mesh.visible = !0), (e.fade.value = 1));
    }
    pose(e, t) {
      let { mesh: n, bones: r } = e;
      if (((n.visible = t.shown > 0.002), !n.visible)) return;
      ((e.fade.value = t.shown),
        (e.open.value = t.open),
        n.position.set(t.x, t.y, t.z),
        n.rotation.set(t.pitch, t.yaw, 0, `YXZ`),
        n.scale.setScalar(t.size));
      let i = t.gallop ? B0.gallop : B0.walk,
        a = t.gallop ? R0 : z0,
        o = t.pace,
        s = t.stride * DF,
        c = r[L1.Body],
        l = t.gallop ? 0.14 * Math.cos(s - 0.75 * DF) : 0.012 * Math.cos(2 * s);
      ((c.position.y = G1[L1.Body][1] + l * o - 0.03 * t.graze),
        (c.rotation.x =
          (t.gallop ? 0.11 : 0.015) * Math.sin(s) * o - 0.05 * t.graze));
      let u = t.gallop * o;
      (r[L1.Neck].rotation.set(
        -1.95 * t.graze +
          0.04 * t.alert -
          0.35 * u +
          0.08 * Math.sin(s + 1.2) * u,
        t.look * 0.4,
        0,
      ),
        r[L1.Head].rotation.set(
          1.1 * t.graze + 0.1 * t.alert + 0.3 * u,
          t.look * 0.6,
          0,
        ),
        r[L1.EarL].rotation.set(-0.35 * t.alert, 0, -0.4 * t.earL),
        r[L1.EarR].rotation.set(-0.35 * t.alert, 0, 0.4 * t.earR),
        (r[L1.Tail].rotation.x = -1.9 * t.tail),
        K1.forEach((e, n) => {
          let s = H0((t.stride + a[n]) % 1, e.front, i);
          for (let e = 0; e < 3; e++)
            r[L1.Legs + n * 3 + e].rotation.x = s[e] * o;
        }));
    }
  },
  q0 = 26e3;
function J0(e) {
  let t = Math.cos(e),
    n = Math.sin(e),
    r = (ZF - 6) / Math.max(Math.abs(t), Math.abs(n));
  return [t * r, n * r];
}
function Y0() {
  let e = 56943,
    t = new Float32Array(e * 3),
    n = new Float32Array(e * 4);
  for (let e = 0; e <= 110; e++) {
    let r = ((1 + (e / 110) * 60) ** 1.6 - 1) / (61 ** 1.6 - 1);
    for (let i = 0; i <= 512; i++) {
      let [a, o] = J0((i / 512) * DF),
        s = Math.hypot(a, o),
        c = s + (q0 - s) * r,
        l = (a / s) * c,
        u = (o / s) * c,
        d = e * 513 + i,
        f = uI(l, u) - (e === 0 ? 1.5 : 0);
      ((t[d * 3] = l), (t[d * 3 + 1] = f), (t[d * 3 + 2] = u));
      let p = 4 + c * 0.01,
        m =
          Math.hypot(uI(l + p, u) - uI(l - p, u), uI(l, u + p) - uI(l, u - p)) /
          (2 * p);
      ((n[d * 4 + 1] = EL(l, u, f, m) * 0.9 + 0.1 * (1 - Math.min(1, m))),
        (n[d * 4 + 2] = Math.max(OL(l, u, f, m), Y((f - 1300) / 500))),
        (n[d * 4 + 3] = Math.max(
          kL(l, u, f, m),
          Y((f - 1500) / 300) * (1 - Y((m - 0.9) * 2)),
        )));
    }
  }
  return { pos: t, cover: n };
}
function X0(e, t) {
  let n = eV(e.xz.add(1e-4)),
    r = LV(n.y.negate(), n.x),
    i = LV(yB(t, r).div(55), yB(t, n).div(260)),
    a = PU(i, 4),
    o = PU(i.add(LV(0.05, 0)), 4),
    s = PU(t.div(60), 3),
    c = PU(t.add(LV(6, 0)).div(60), 3),
    l = PU(t.add(LV(0, 6)).div(60), 3),
    u = $(r.x, 0, r.y)
      .mul(a.sub(o).mul(14))
      .add($(s.sub(c), 0, s.sub(l)).mul(5));
  return { n: eV(e.add(u)), gully: a, across: r };
}
