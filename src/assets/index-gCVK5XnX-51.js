// assets/index-gCVK5XnX 51 — push
// Lines 63946-64286 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var p6 = class {
  lift;
  group = new Hn();
  chairs;
  spot = { x: 0, y: 0, z: 0, yaw: 0 };
  constructor(e) {
    this.lift = e;
    let t = yH(),
      n = [];
    for (let t of e.towers) n.push(...this.tower(t.x, t.y, t.z, t.y + t.h));
    for (let e of [!1, !0]) n.push(...this.station(e));
    let r = eH(tH(n, _H), t),
      i = eH(tH([this.cable(tR), this.cable(-tR)], _H), t, !1);
    ((this.chairs = new Yi(this.chair(), t, e.chairs)),
      (this.chairs.castShadow = this.chairs.receiveShadow = !0),
      (this.chairs.frustumCulled = !1));
    for (let e of [r, i]) ((e.matrixAutoUpdate = !1), this.group.add(e));
    this.group.add(this.chairs);
  }
  update(e) {
    let t = this.spot;
    for (let n = 0; n < this.lift.chairs; n++)
      (this.lift.chairAt(n, e, t),
        c6.setFromAxisAngle(GV, t.yaw),
        this.chairs.setMatrixAt(n, s6.compose(l6.set(t.x, t.y, t.z), c6, qV)));
    this.chairs.instanceMatrix.needsUpdate = !0;
  }
  tower(e, t, n, r) {
    let i = this.lift,
      a = nH(e, n, i.dx, i.dz),
      o = [
        u6(a, 0, t - 0.25, 0, 1.8, 1.2, 1.8, `concrete`),
        d6(
          a,
          new M(0, t + 0.3, 0),
          new M(0, r - 0.8, 0),
          0.42,
          `steel`,
          0.28,
          14,
        ),
      ];
    o.push(u6(a, 0, r - 0.95, 0, RL + 1.3, 0.38, 0.38, `steel`));
    for (let e of [-1, 1]) {
      (o.push(u6(a, e * tR, r - 0.68, 0, 0.16, 0.3, 0.16, `steel`)),
        o.push(u6(a, e * tR, r - 0.5, 0, 0.2, 0.18, 2.6, `darkSteel`)));
      for (let t of [-0.9, -0.3, 0.3, 0.9]) {
        let n = new fa(0.19, 0.19, 0.1, 14).rotateZ(Math.PI / 2);
        o.push(f6(n, a, e * tR, r - 0.2, t, `rubber`));
      }
    }
    for (let e of [-0.18, 0.18])
      o.push(
        d6(
          a,
          new M(e, t + 1.5, 0.45),
          new M(e, r - 1.2, 0.45),
          0.025,
          `darkSteel`,
          0.025,
          5,
        ),
      );
    return o;
  }
  station(e) {
    let t = this.lift,
      n = t.stationAt(e, 0, 0, { x: 0, y: 0, z: 0 }),
      r = e ? t.topY : t.bottomY,
      i = n.y,
      a = e ? 1 : -1,
      o = nH(n.x, n.z, a * t.dx, a * t.dz),
      s = [],
      c = r + iR.above;
    for (let e of eR)
      (s.push(
        d6(
          o,
          new M(a * e.v, i - 0.5, e.a),
          new M(a * e.v, c, e.a),
          0.42,
          `steel`,
          0.42,
          14,
        ),
      ),
        s.push(u6(o, a * e.v, i + 0.05, e.a, 1.4, 0.3, 1.4, `concrete`)));
    let l = iR.front - iR.back,
      u = (iR.front + iR.back) / 2,
      d = 2 * (tR + 1.1);
    (s.push(u6(o, 0, c + iR.tall / 2, u, d, iR.tall, l, `housing`)),
      s.push(u6(o, 0, c + iR.tall * 0.35, u, d + 0.06, 0.28, l + 0.06, `band`)),
      s.push(u6(o, 0, c + iR.tall + 0.1, u, d + 0.6, 0.2, l + 0.6, `roof`)),
      s.push(
        f6(
          new Mo(tR, 0.13, 10, 48).rotateX(Math.PI / 2),
          o,
          0,
          r + 0.2,
          0,
          `darkSteel`,
        ),
      ));
    for (let e = 0; e < 3; e++) {
      let t = (e * Math.PI) / 3;
      s.push(
        d6(
          o,
          new M(Math.sin(t) * tR, r + 0.2, Math.cos(t) * tR),
          new M(-Math.sin(t) * tR, r + 0.2, -Math.cos(t) * tR),
          0.05,
          `steel`,
        ),
      );
    }
    for (let e of [-1, 1])
      s.push(u6(o, e * tR, r + 0.24, 7, 0.12, 0.12, 14, `darkSteel`));
    let f = e ? t.length - t.unloadD : t.loadD;
    (s.push(u6(o, a * tR, i, f, 4.2, 0.08, 8, `deck`)),
      s.push(u6(o, a * tR, i + 0.045, f, 3.6, 0.02, 0.12, `line`)));
    let p = a * rR.v;
    (s.push(
      u6(
        o,
        p,
        i + rR.high / 2 - 0.2,
        rR.a,
        rR.across,
        rR.high + 0.4,
        rR.along,
        `wood`,
      ),
    ),
      s.push(
        u6(
          o,
          p,
          i + rR.high + 0.12,
          rR.a,
          rR.across + 0.5,
          0.25,
          rR.along + 0.5,
          `roof`,
        ),
      ),
      s.push(
        u6(
          o,
          a * (rR.v - Math.sign(rR.v) * (rR.across / 2 + 0.01)),
          i + 1.6,
          rR.a,
          0.04,
          0.9,
          rR.along * 0.7,
          `glass`,
        ),
      ));
    for (let e of [-1, 1])
      s.push(
        u6(
          o,
          p,
          i + 1.6,
          rR.a + e * (rR.along / 2 + 0.01),
          rR.across * 0.6,
          0.9,
          0.04,
          `glass`,
        ),
      );
    return s;
  }
  cable(e) {
    let t = this.lift,
      n = [],
      r = { x: 0, z: 0 };
    for (let i = 0; i <= t.length; i += 3)
      (t.world(i, e, r), n.push(new M(r.x, t.cableY(i), r.z)));
    return o6(new No(new Ca(n), n.length * 2, 0.028, 5, !1), `cable`);
  }
  chair() {
    let e = new N(),
      t = (e, t, n) => new M(e, t, n),
      n = -zL,
      r = n + 1.1,
      i = (4 * KL) / 2 + 0.05,
      a = [
        u6(e, 0, 0, 0, 0.22, 0.3, 0.55, `darkSteel`),
        d6(e, t(0, -0.12, 0), t(0, r, 0), 0.05, `steel`),
        d6(e, t(0, r, 0), t(0, r, 0.32), 0.05, `steel`),
        d6(e, t(-i, r, 0.32), t(i, r, 0.32), 0.04, `steel`),
      ];
    for (let o of [-1, 1])
      (a.push(d6(e, t(o * i, r, 0.32), t(o * i, n - 0.08, 0.3), 0.04, `steel`)),
        a.push(
          d6(
            e,
            t(o * i, n - 0.08, 0.3),
            t(o * i, n - 0.08, -0.45),
            0.035,
            `steel`,
          ),
        ),
        a.push(
          d6(
            e,
            t(o * i, r, 0.32),
            t(o * (i - 0.06), n + 0.48, -0.5),
            0.03,
            `steel`,
          ),
        ),
        a.push(
          d6(
            e,
            t(o * (i - 0.06), n + 0.48, -0.5),
            t(o * (i - 0.06), n - 0.42, -0.58),
            0.025,
            `steel`,
          ),
        ));
    a.push(u6(e, 0, n - 0.05, -0.15, 2 * i - 0.1, 0.1, 0.56, `seat`));
    let o = new la(2 * i - 0.1, 0.5, 0.07).rotateX(-0.18);
    (a.push(f6(o, e, 0, n + 0.38, 0.27, `seat`)),
      a.push(
        d6(
          e,
          t(-(i - 0.06), n + 0.48, -0.5),
          t(i - 0.06, n + 0.48, -0.5),
          0.032,
          `bar`,
        ),
      ),
      a.push(
        d6(
          e,
          t(-(i - 0.06), n - 0.42, -0.58),
          t(i - 0.06, n - 0.42, -0.58),
          0.03,
          `bar`,
        ),
      ));
    for (let i = 0; i < 4; i++) {
      let o = (i - 3 / 2) * KL;
      (a.push(
        d6(
          e,
          t(o, r, 0.32),
          t(o, n + 0.98, 0.55),
          0.022,
          `darkSteel`,
          0.022,
          6,
        ),
      ),
        a.push(u6(e, o, n + 0.93, 0.56, 0.05, 0.12, 0.05, `darkSteel`)));
    }
    return tH(a, _H);
  }
};
function m6(e, t, n) {
  let r = g$(e, t),
    i = new nS({ roughness: n });
  return (
    (i.colorNode = r.colour.mul(oB(`color`, `vec3`))),
    (i.normalNode = r.normal),
    i
  );
}
var h6 = new Yn(1, 1, 1),
  g6 = new N(),
  _6 = new qt(),
  v6 = new M(),
  y6 = new M(),
  b6 = (e) => Math.max(1, Math.round(e / 0.2)),
  x6 = [`position`, `normal`, `uv`, `color`];
function S6(e, t) {
  return (
    oH(e, `color`, t.toArray()),
    iH(e, ...x6),
    e.index ? e.toNonIndexed() : e
  );
}
function C6(e, t = 1 / 1.2, n = 0) {
  let r = e.getAttribute(`position`),
    i = e.getAttribute(`normal`),
    a = new Float32Array(r.count * 2);
  for (let e = 0; e < r.count; e++) {
    let o = Math.abs(i.getX(e)),
      s = Math.abs(i.getY(e)),
      c = Math.abs(i.getZ(e)),
      l = r.getX(e),
      u = r.getY(e),
      d = r.getZ(e),
      f,
      p;
    (s > o && s > c
      ? ([f, p] = [l, d])
      : o > c
        ? ([f, p] = [u, d])
        : ([f, p] = [l, u]),
      (a[e * 2] = (f + n) * t),
      (a[e * 2 + 1] = (p + n * 1.7) * t));
  }
  return (e.setAttribute(`uv`, new Fr(a, 2)), e);
}
var w6 = class {
    r;
    constructor(e) {
      this.r = e;
    }
    shade(e = 1) {
      let t = (0.8 + this.r() * 0.28) * e;
      return new Yn(
        t * (1 + (this.r() - 0.5) * 0.06),
        t,
        t * (1 - this.r() * 0.06),
      );
    }
    board(e, t, n, r, i, a = this.shade()) {
      let o = C6(new la(r, i, t.distanceTo(n)), 1 / 1.2, this.r() * 9);
      return (
        y6.subVectors(n, t).normalize(),
        _6.setFromUnitVectors(KV, y6),
        o.applyMatrix4(
          g6.compose(v6.addVectors(t, n).multiplyScalar(0.5), _6, qV),
        ),
        o.applyMatrix4(e),
        S6(o, a)
      );
    }
  },
  T6 = 7,
  E6 = (fR - dR) / T6,
  D6 = 0.9,
  O6 = 0.31,
  k6 = 0.85,
  A6 = new Yn(0.86, 0.62, 0.42),
  j6 = new Yn(0.42, 0.3, 0.22),
  M6 = new Yn(1, 0.62, 0.3),
  N6 = { board: `#2a1d14`, frame: `#5a4028`, letters: `#efe4cf` };
