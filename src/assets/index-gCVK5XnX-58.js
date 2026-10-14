// assets/index-gCVK5XnX 58 — group
// Lines 65892-66233 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function x5(e, t, n) {
  return (
    e.trail.pointAt(t, b5, n),
    { x: b5.x, y: e.baseHeight(b5.x, b5.z), z: b5.z }
  );
}
function S5(e) {
  let t = e.trail.flatOut(),
    n = [];
  for (let r of [-1, 1]) {
    let { risky: i, free: a } = C5(e, r, t),
      o = w5(i),
      s = o.length;
    for (let t = 0; t < s;) {
      if (!(o[t] && a[t])) {
        t++;
        continue;
      }
      let i = t;
      for (; t < s && o[t] && a[t];) t++;
      t - 1 - i >= _5 && n.push(T5(e, i, t - 1, r));
    }
  }
  return n;
}
function C5(e, t, n) {
  let { trail: r, lift: i } = e,
    a = Math.floor(r.length),
    o = new Uint8Array(a),
    s = new Uint8Array(a);
  for (let c = 0; c < a; c++) {
    let a = r.at(c).k,
      l = n[Math.round(c / dI)],
      u = a * t < 0 ? X(f5[0] * J.g, f5[1] * J.g, l * l * Math.abs(a)) : 0,
      d = x5(e, c, t * SI).y - x5(e, c, t * (SI + d5)).y;
    o[c] = +(Math.max(u * X(p5[0], p5[1], d), X(m5[0], m5[1], d)) > 0.5);
    let f = x5(e, c, t * l5);
    s[c] =
      c > y5 &&
      r.jumpClearing(c) < 0.02 &&
      e.stuntClearance(f.x, f.z) > v5.stunt &&
      e.creekClearance(f.x, f.z) > v5.creek &&
      i.pad(f.x, f.z).w === 0 &&
      i.towers.every((e) => Math.hypot(e.x - f.x, e.z - f.z) > v5.tower)
        ? 1
        : 0;
  }
  return { risky: o, free: s };
}
function w5(e) {
  let t = e.length,
    n = new Uint8Array(t),
    r = -1 / 0;
  for (let i = 0; i < t; i++) {
    if (!e[i]) continue;
    let a = i - r <= g5 ? r : i - h5;
    for (let e = Math.max(0, a); e <= Math.min(t - 1, i + h5); e++) n[e] = 1;
    r = i;
  }
  return n;
}
function T5(e, t, n, r) {
  let i = [x5(e, t, r * l5)],
    a = i[0],
    o = 0;
  for (let s = t + 0.25; s < n; s += 0.25) {
    let t = x5(e, s, r * l5);
    ((o += Math.hypot(t.x - a.x, t.y - a.y, t.z - a.z)),
      (a = t),
      o >= u5 && (i.push(t), (o = 0)));
  }
  let s = x5(e, n, r * l5);
  return (o < u5 / 2 && i.length > 1 && i.pop(), i.push(s), i);
}
async function E5(e) {
  let t = d$(d3(e.gl)),
    n = Q0(),
    r = K0.create(),
    i = new HI(),
    a = new bz(i);
  (await a.bake(async (e) => {
    (uQ.progress(0.05 + e * 0.6), await n$());
  }),
    x$(a));
  let o = new T8(a),
    s = new $8(a),
    c = new z8(a),
    l = new Z$(a),
    u = await n,
    d = new p6(a.lift);
  d.update(0);
  let f = new c5(a.trials, (e, t) => a.baseHeight(e, t));
  (uQ.progress(0.8), await n$());
  let p = jL(a, ZF),
    m = [...ML(a, ZF), ...FL(a.creek, a), ...NL(i, a)];
  a.setObstacles(p, m);
  let h = await B3.create(e.gl, p, a),
    g = [...Y6(m), ...Y6(PL(i, a), !1)],
    _ = new i6(a, !_Q),
    v = new B6(i, (e, t) => a.baseHeight(e, t)),
    y = new h8(S5(a)),
    b = [
      o.group,
      s.group,
      c.group,
      l.group,
      u,
      h.group,
      v.group,
      y.group,
      ...g,
      ..._.meshes,
    ];
  for (let e of b)
    e.traverse((e) => {
      (e.updateMatrix(), (e.matrixAutoUpdate = !1));
    });
  return (
    e.scene.add(...b, d.group, f.group),
    await t,
    uQ.progress(0.98),
    {
      trail: i,
      terrain: a,
      ground: o,
      liftMesh: d,
      trialsMesh: f,
      trees: h,
      grass: _,
      deerMesh: await r,
    }
  );
}
async function D5(e, { ground: t, grass: n, trees: r, terrain: i }, a, o, s) {
  let c = e.camera;
  (a.burst(
    new M(0, -0.6, -2.5).applyQuaternion(c.quaternion).add(c.position),
    new M(),
    6,
    1,
    0.5,
  ),
    a.update(1 / 60, c),
    o.throw(
      new M(0, -0.4, -2.5).applyQuaternion(c.quaternion).add(c.position),
      new M(),
      1,
      0.05,
    ),
    o.update(1 / 60));
  for (let e of s) e.warm(c);
  let l = new M(0, 0, -10).applyQuaternion(c.quaternion).add(c.position),
    u = () => r.showAll(l.x, i.height(l.x, l.z), l.z);
  u();
  for (let r = 0; r < 6; r++)
    (c.rotation.set(
      r < 4 ? -0.15 : r === 4 ? -1.2 : 0.6,
      (r * Math.PI) / 2,
      0,
      `YXZ`,
    ),
      c.updateMatrixWorld(),
      t.update(c.position),
      n.update(c),
      r === 0 && u(),
      e.render(1 / 60),
      await n$(),
      uQ.progress(0.985 + r * 0.002));
}
var O5 = [`steer`, `bars`, `whip`, `spin`, `crank`],
  k5 = [
    `crouch`,
    `hands`,
    `styled`,
    `speed`,
    `compF`,
    `compR`,
    `bx`,
    `by`,
    `bz`,
    `wobble`,
    `pump`,
    `lift`,
  ],
  A5 = [`mode`, `pedal`, `chair`, `seat`, `bail`, `style`, `styleSide`],
  j5 = new qt(),
  M5 = new qt(),
  N5 = class {
    scene;
    ground;
    avatar;
    state = MX();
    snaps = [];
    lastHeard = 0;
    visible = !0;
    live = !1;
    seated = null;
    constructor(e, t, n) {
      ((this.scene = e), (this.ground = n), (this.avatar = this.build(t)));
    }
    restyle(e) {
      let t = this.avatar.group.visible;
      (this.avatar.dispose(),
        (this.avatar = this.build(e)),
        (this.avatar.group.visible = t),
        this.live && this.avatar.pose(this.state, 0));
    }
    build(e) {
      let t = new dZ(e, this.ground, !0);
      return (this.scene.add(t.group), t);
    }
    push(e, t) {
      this.lastHeard = t;
      let n = this.snaps,
        r = n.length;
      for (; r > 0 && n[r - 1].t > e.t;) r--;
      if (!(r > 0 && n[r - 1].t === e.t))
        for (n.splice(r, 0, e); n.length > 2 && n[1].t < e.t - 2;) n.shift();
    }
    update(e, t, n) {
      let r = this.snaps,
        i = n - this.lastHeard > 4;
      if (
        ((this.avatar.group.visible = this.visible && !i && r.length > 0),
        !this.avatar.group.visible)
      )
        return;
      let a = r.findIndex((e) => e.t > t);
      a === -1 && (a = r.length);
      let o = this.state;
      if (a === 0) this.copy(r[0], 0);
      else if (a === r.length) {
        let e = r[r.length - 1];
        this.copy(e, e.mode === kH.Crash ? 0 : Y(t - e.t, 0, 0.25));
      } else {
        let e = r[a - 1],
          n = r[a],
          i = n.t - e.t,
          s = i > 0 ? (t - e.t) / i : 0,
          c = s * s,
          l = c * s,
          u = 2 * l - 3 * c + 1,
          d = l - 2 * c + s,
          f = -2 * l + 3 * c,
          p = l - c;
        ((o.x = u * e.x + d * i * e.vx + f * n.x + p * i * n.vx),
          (o.y = u * e.y + d * i * e.vy + f * n.y + p * i * n.vy),
          (o.z = u * e.z + d * i * e.vz + f * n.z + p * i * n.vz),
          mU(e.pitch, e.yaw, e.roll, j5).slerp(
            mU(n.pitch, n.yaw, n.roll, M5),
            s,
          ),
          pU(j5, o, o));
        for (let t of O5) o[t] = jF(e[t], n[t], s);
        for (let t of k5) o[t] = OF(e[t], n[t], s);
        let m = s < 0.5 ? e : n;
        for (let e of A5) o[e] = m[e];
        (j5
          .set(e.bqx, e.bqy, e.bqz, e.bqw)
          .slerp(M5.set(n.bqx, n.bqy, n.bqz, n.bqw), s),
          (o.bqx = j5.x),
          (o.bqy = j5.y),
          (o.bqz = j5.z),
          (o.bqw = j5.w));
      }
      (o.mode === kH.Seated && this.seated?.(o),
        this.avatar.pose(o, e),
        (this.live = !0));
    }
    copy(e, t) {
      let n = this.state;
      (Object.assign(n, e),
        (n.x += e.vx * t),
        (n.y += e.vy * t),
        (n.z += e.vz * t));
    }
    dispose() {
      this.avatar.dispose();
    }
  },
  P5 = 160,
  F5 = 0.42,
  I5 = 20,
  L5 = 2,
  R5 = 0.3,
  z5 = new M();
function B5(e, t, n, r, i) {
  let a = t.position,
    o = e.distanceTo(a);
  if (o > P5 || V5(a, e, o, n)) return null;
  let s = z5.copy(e);
  return (
    (s.y += F5),
    s.applyMatrix4(t.matrixWorldInverse),
    s.z >= 0 ||
    (s.applyMatrix4(t.projectionMatrix),
    Math.abs(s.x) > 1.1 || Math.abs(s.y) > 1.1)
      ? null
      : {
          x: ((s.x + 1) / 2) * r,
          y: ((1 - s.y) / 2) * i,
          scale: Y(1 - (o - I5) / 140),
        }
  );
}
function V5(e, t, n, r) {
  let i = Math.ceil(n / L5);
  for (let n = 1; n < i; n++) {
    let a = n / i,
      o = e.y + (t.y - e.y) * a;
    if (r.height(e.x + (t.x - e.x) * a, e.z + (t.z - e.z) * a) > o + R5)
      return !0;
  }
  return !1;
}
var H5 = {
    state: 1,
    ping: 2,
    pong: 3,
    hears: 4,
    relay: 5,
    relayed: 6,
    hello: 10,
    trick: 12,
    bye: 13,
  },
  U5 = (e) => e === H5.hello || e === H5.trick || e === H5.bye,
  W5 = 2,
  G5 =
    `x.y.z.vx.vy.vz.yaw.pitch.roll.steer.bars.whip.spin.crank.crouch.hands.speed.compF.compR.bx.by.bz.bqx.bqy.bqz.bqw.chair.seat.wobble.pump.lift.bail.style.styleSide.styled`.split(
      `.`,
    ),
  K5 = 12 + G5.length * 4;
function q5(e, t, n, r, i) {
  let a = new DataView(e.buffer, e.byteOffset, K5);
  (a.setUint8(0, H5.state),
    a.setUint8(1, t.mode),
    a.setUint8(2, +!!i | (t.pedal ? W5 : 0)),
    a.setFloat64(4, r, !0));
  let o = { ...t, vx: n.x, vy: n.y, vz: n.z };
  for (let e = 0; e < G5.length; e++) a.setFloat32(12 + e * 4, o[G5[e]], !0);
}
