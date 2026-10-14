// assets/index-gCVK5XnX 25 — clone
// Lines 55367-55694 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function Jq(e, t) {
  if (t <= e[0][0]) return e[0][1];
  for (let n = 1; n < e.length; n++) {
    let [r, i] = e[n];
    if (t <= r) {
      let [a, o] = e[n - 1];
      return o + ((i - o) * (t - a)) / Math.max(1e-6, r - a);
    }
  }
  return e[e.length - 1][1];
}
function Yq(e, t) {
  let n = [],
    r = [],
    i = 0,
    a = (e, t) => {
      (n.length && (i += e.distanceTo(n[n.length - 1].p)),
        n.push({ p: e.clone(), t: t.clone().normalize(), s: i }));
    },
    o = (e, t, n) => {
      let r = t.clone().sub(e),
        i = Math.max(1, Math.ceil(r.length() / Oq));
      for (let o = +!n; o <= i; o++) a(e.clone().lerp(t, o / i), r);
    },
    s = e[0];
  for (let c = 1; c < e.length - 1; c++) {
    let l = e[c],
      u = t[c - 1];
    if (u === 0) {
      (o(s, l, n.length === 0), r.push(i), (s = l));
      continue;
    }
    let d = l.clone().addScaledVector(l.clone().sub(s).normalize(), -u),
      f = l.clone().addScaledVector(e[c + 1].clone().sub(l).normalize(), u);
    o(s, d, n.length === 0);
    let p = Math.ceil((2 * u) / Oq) + 2;
    for (let e = 1; e <= p; e++) {
      let t = e / p;
      (a(
        d
          .clone()
          .multiplyScalar((1 - t) ** 2)
          .addScaledVector(l, 2 * t * (1 - t))
          .addScaledVector(f, t * t),
        l
          .clone()
          .sub(d)
          .multiplyScalar(1 - t)
          .add(f.clone().sub(l).multiplyScalar(t)),
      ),
        (e === p / 2 || (p % 2 == 1 && e === (p + 1) / 2)) && r.push(i));
    }
    s = f;
  }
  return (o(s, e[e.length - 1], n.length === 0), { line: n, joints: r });
}
function Xq(e, t, n) {
  let r = t;
  for (let t of n) {
    if (e < t.s - t.spread) return [[r, 1]];
    if (e <= t.s + t.spread) {
      let n = smoothstep(t.s - t.spread, t.s + t.spread, e);
      return [
        [t.a, (1 - n) ** 2],
        [t.half, 2 * n * (1 - n)],
        [t.b, n * n],
      ];
    }
    r = t.b;
  }
  return [[r, 1]];
}
var Zq = class {
  bones = [];
  inverses = [];
  pos = [];
  uvs = [];
  index = [];
  skinIndex = [];
  skinWeight = [];
  seams = [];
  bone(e) {
    let t = this.bones.indexOf(e);
    return (
      t < 0 &&
        (e.updateMatrix(),
        (t = this.bones.push(e) - 1),
        this.inverses.push(e.matrix.clone().invert())),
      t
    );
  }
  tube(e, t, n, r = Dq.limb, i = !1) {
    let [a, o, s, c] = qG[e],
      l = this.pos.length / 3,
      u = r + 1;
    t.forEach((e, t) => {
      this.seams.push([this.pos.length / 3, this.pos.length / 3 + r]);
      for (let i = 0; i <= r; i++) {
        let l = (i / r) * Math.PI * 2,
          u = Math.cos(l),
          d = Math.sin(l),
          f = e.w * Math.sign(d) * Math.abs(d) ** (2 / e.n),
          p =
            u > 0
              ? -e.front * u ** (2 / e.n)
              : e.back * (-u) ** (2 / e.n) -
                e.seam * Math.exp(-((f / Aq) ** 2));
        (Kq.copy(e.at).addScaledVector(e.x, f).addScaledVector(e.z, p),
          this.vertex(
            Kq,
            a + (1 - i / r) * s,
            o + kq + e.v * (c - 2 * kq),
            n(Kq, t),
          ));
      }
    });
    for (let e = 0; e < t.length - 1; e++)
      for (let t = 0; t < r; t++) {
        let n = l + e * u + t;
        this.index.push(n, n + u, n + 1, n + 1, n + u, n + u + 1);
      }
    if (i) {
      let e = t[0];
      Kq.copy(e.at).addScaledVector(e.z, (e.back - e.front) / 2);
      let i = this.pos.length / 3;
      this.vertex(Kq, a + s / 2, o + kq, n(Kq, 0));
      for (let e = 0; e < r; e++) this.index.push(i, l + e + 1, l + e);
    }
  }
  limb(e, t, n, r, i, a, o) {
    let { line: s, joints: c } = Yq(
        n,
        t.map((e) => Mq[e]),
      ),
      l = s[s.length - 1].s,
      u = (e) => (e === `end` ? l : c[t.indexOf(e)]),
      d = t.map((e, t) => ({
        s: c[t],
        spread: jq[e],
        a: a[2 * t],
        half: a[2 * t + 1],
        b: a[2 * t + 2],
      })),
      f = Qq(
        s,
        i,
        r.map(([e, t, n]) => [u(e) + t, n]),
        [[0, 0], ...t.map((e, t) => [c[t], JG[e]]), [l, 1]],
        o,
      );
    this.tube(e, f, (e, t) => Xq(t < s.length ? s[t].s : l, a[0], d));
  }
  blob(e, t, n, r, i, a, o, s, c) {
    let l = new jo(1, Dq.limb, 12),
      u = l.getAttribute(`position`),
      d = this.pos.length / 3,
      [f, p, m, h] = qG[e];
    for (let e = 0; e < u.count; e++)
      (Kq.copy(t)
        .addScaledVector(n, u.getX(e) * a.x)
        .addScaledVector(r, u.getY(e) * a.y)
        .addScaledVector(i, u.getZ(e) * a.z),
        this.vertex(Kq, f + o * m, p + kq + s * (h - 2 * kq), c));
    let g = l.index;
    for (let e = 0; e < g.count; e++) this.index.push(d + g.getX(e));
    l.dispose();
  }
  vertex(e, t, n, r) {
    (this.pos.push(e.x, e.y, e.z), this.uvs.push(t, n));
    let i = r
        .filter(([, e]) => e > 1e-4)
        .sort((e, t) => t[1] - e[1])
        .slice(0, 4),
      a = i.reduce((e, [, t]) => e + t, 0);
    for (let e = 0; e < 4; e++)
      (this.skinIndex.push(i[e]?.[0] ?? 0),
        this.skinWeight.push(i[e] ? i[e][1] / a : 0));
  }
  geometry() {
    let e = new Xr();
    (e.setAttribute(`position`, new Fr(new Float32Array(this.pos), 3)),
      e.setAttribute(`uv`, new Fr(new Float32Array(this.uvs), 2)),
      e.setAttribute(`skinIndex`, new Fr(new Uint16Array(this.skinIndex), 4)),
      e.setAttribute(
        `skinWeight`,
        new Fr(new Float32Array(this.skinWeight), 4),
      ),
      e.setIndex(this.index),
      e.computeVertexNormals());
    let t = e.getAttribute(`normal`);
    for (let [e, n] of this.seams)
      (Kq.set(
        t.getX(e) + t.getX(n),
        t.getY(e) + t.getY(n),
        t.getZ(e) + t.getZ(n),
      ).normalize(),
        t.setXYZ(e, Kq.x, Kq.y, Kq.z),
        t.setXYZ(n, Kq.x, Kq.y, Kq.z));
    return e;
  }
};
function Qq(e, { x: t, y: n, z: r }, i, a, o) {
  let s = [];
  Gq.setFromUnitVectors(n, e[0].t);
  let c = t.clone().applyQuaternion(Gq),
    l = r.clone().applyQuaternion(Gq),
    u = e[0].t;
  for (let t of e)
    (Gq.setFromUnitVectors(u, t.t),
      c.applyQuaternion(Gq),
      l.applyQuaternion(Gq),
      (u = t.t),
      s.push(qq(t.p, c.clone(), l.clone(), Jq(i, t.s), Jq(a, t.s))));
  if (o) {
    let t = s[s.length - 1],
      n = e[e.length - 1].t,
      r = t.w - Vq.thick;
    (s.push({ ...t, w: r, front: r, back: r }),
      s.push({
        ...t,
        at: t.at.clone().addScaledVector(n, -Vq.up),
        w: r,
        front: r,
        back: r,
      }));
  }
  return s;
}
function $q(e) {
  let t = e.matrix.elements;
  return {
    x: new M(t[0], t[1], t[2]).normalize(),
    y: new M(t[4], t[5], t[6]).normalize(),
    z: new M(t[8], t[9], t[10]).normalize(),
  };
}
function eJ(e, t, n) {
  let r = new Zq(),
    i = r.bone(e.torso),
    a = r.bone(e.head),
    o = [],
    s = [];
  for (let t of [-1, 1]) {
    let a = tJ(r, e, t, i, n);
    (o.push(a.knee), s.push(...a.near));
  }
  nJ(r, e, i, a, s);
  let c = new wi(r.geometry(), t);
  return (
    (c.castShadow = !0),
    (c.receiveShadow = !0),
    (c.userData.skin = { bones: r.bones, inverses: r.inverses }),
    { skin: c, knees: o }
  );
}
function tJ(e, t, n, r, i) {
  let a = n < 0 ? t.upperArmL : t.upperArmR,
    o = n < 0 ? t.foreArmL : t.foreArmR,
    s = n < 0 ? t.thighL : t.thighR,
    c = n < 0 ? t.shinL : t.shinR,
    l = e.bone(a),
    u = e.bone(o),
    d = e.bone(s),
    f = e.bone(c),
    p = (e, n) => {
      let r = new Hq(e, n);
      return (t.root.add(r), r);
    },
    m = e.bone(p(t.torso, a)),
    h = e.bone(p(a, o)),
    g = e.bone(p(t.torso, s)),
    _ = p(s, c),
    v = e.bone(_),
    y = $q(t.torso),
    b = o.position.clone().addScaledVector($q(o).y, i.fore),
    x = a.position
      .clone()
      .addScaledVector(y.x, -n * Bq.shoulder)
      .addScaledVector(y.y, -0.02);
  e.limb(
    `sleeve`,
    [`shoulder`, `elbow`],
    [x, a.position, o.position, b],
    Iq,
    $q(a),
    [r, m, l, h, u],
    !0,
  );
  let S = $q(s),
    C = {
      x: S.z.clone().multiplyScalar(-n),
      y: S.y,
      z: S.x.clone().multiplyScalar(n),
    },
    w = s.position;
  e.limb(
    `thigh`,
    [`hip`],
    [
      w.clone().addScaledVector(S.y, -Bq.hip),
      w,
      w.clone().addScaledVector(S.y, zq),
    ],
    Lq,
    C,
    [r, g, d],
    !0,
  );
  let T = c.position.clone().addScaledVector($q(c).y, i.shin);
  return (
    e.limb(
      `sock`,
      [`knee`],
      [c.position.clone().addScaledVector(S.y, -Bq.knee), c.position, T],
      Rq,
      C,
      [d, v, f],
      !1,
    ),
    {
      knee: _,
      near: [
        { at: a.position.clone(), bone: m, share: 0.5, from: 0.03, to: 0.1 },
        { at: s.position.clone(), bone: g, share: 0.4, from: 0.05, to: 0.14 },
      ],
    }
  );
}
