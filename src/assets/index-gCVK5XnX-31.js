// assets/index-gCVK5XnX 31 — math
// Lines 57389-57738 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
function VZ(e, t, n) {
  let r = -Math.sin(e.yaw),
    i = -Math.cos(e.yaw),
    a = t.x - e.x,
    o = t.z - e.z;
  return n.set(a * -i + o * r, t.y - e.y, -(a * r + o * i));
}
function HZ(e, t, n) {
  let r = -Math.sin(e.yaw),
    i = -Math.cos(e.yaw);
  return n.set(e.x + -i * t.x - r * t.z, e.y + t.y, e.z + r * t.x - i * t.z);
}
var UZ = 4.2,
  WZ = 0.95,
  GZ = [0.7, 2.25],
  KZ = 56,
  qZ = 0.003,
  JZ = [2.4, 1.2],
  YZ = [-0.35, 0.3],
  XZ = 6,
  ZZ = 3.4,
  QZ = 1.35,
  $Z = [-0.3, 1],
  eQ = 1.2,
  tQ = 2.2,
  nQ = class {
    cam;
    terrain;
    time = 0;
    heading = new LF();
    dist = new LF(fZ);
    camY = new LF();
    aimY = new LF();
    ahead = new LF(3);
    lead = new LF();
    air = new LF();
    fov = new LF(SZ);
    roll = new LF();
    dip = new IF(80, 0.7);
    trauma = 0;
    buzz = 0;
    dodge = new LF();
    body = new RF();
    bodyVel = new M();
    lastBody = new M();
    onLift = !1;
    liftAt = new RF();
    liftAim = new RF();
    liftYaw = 0;
    liftTilt = 0;
    liftT = 0;
    lookedAt = -1 / 0;
    onFoot = !1;
    footYaw = 0;
    footTilt = 0.2;
    footAt = new RF();
    constructor(e, t) {
      ((this.cam = e), (this.terrain = t));
    }
    snap(e) {
      let t = e.mode === `crash`;
      (this.lastBody.copy(this.body.set(t ? e.drawBodyPos : e.centre(FZ))),
        this.bodyVel.set(0, 0, 0),
        this.heading.set(e.yaw),
        this.dist.set(this.backFor(e)),
        this.air.set(+(e.mode === `air`)),
        this.ahead.set(this.aheadFor(e)),
        this.lead.set(0),
        this.camY.set(this.camYFor(e)),
        this.aimY.set(this.aimYFor(e)),
        this.fov.set(this.fovFor(e)),
        this.roll.set(0),
        (this.dip.x = this.dip.v = 0),
        (this.trauma = this.buzz = 0),
        this.dodge.set(0),
        (this.onLift = !1),
        (this.onFoot = !1),
        this.apply(e));
    }
    get footHeading() {
      return this.footYaw;
    }
    walk(e, t, n, r, i) {
      let a = this.cam;
      (this.onFoot ||
        ((this.onFoot = !0),
        a.getWorldDirection(NZ),
        (this.footYaw = MF(NZ.x, NZ.z)),
        (this.footTilt = Y(-Math.asin(NZ.y), $Z[0], $Z[1])),
        (this.lookedAt = -1 / 0),
        this.footAt.set(a.position)),
        (this.onLift = !1),
        (this.time += e));
      let [o, s] = this.looked(i, e);
      ((this.footYaw = AF(this.footYaw - o)),
        (this.footTilt = Y(this.footTilt + s, $Z[0], $Z[1])),
        r &&
          this.time - this.lookedAt > eQ &&
          (this.footYaw += AF(n - this.footYaw) * PF(tQ, e)));
      let c = FZ.set(t.x, t.y + QZ, t.z),
        l = LZ.set(
          Math.sin(this.footYaw) * Math.cos(this.footTilt),
          Math.sin(this.footTilt),
          Math.cos(this.footYaw) * Math.cos(this.footTilt),
        ),
        u = ZZ;
      for (let e = 0.15; e <= 1; e += 0.15)
        if (
          this.terrain.obstacleAt(
            c.x + l.x * u * e,
            c.y + l.y * u * e,
            c.z + l.z * u * e,
            0.3,
          )
        ) {
          u = Math.max(0.5, u * e - 0.3);
          break;
        }
      let d = RZ.copy(c).addScaledVector(l, u);
      ((d.y = Math.max(d.y, this.ground(d.x, d.z) + 0.3)),
        a.position.copy(this.footAt.to(d, 0.08, e)),
        a.lookAt(c),
        this.roll.to(0, 0.3, e),
        this.shake(),
        this.fov.to(SZ, 0.5, e),
        this.applyFov());
    }
    ride(e, t, n) {
      ((this.onFoot = !1), (this.time += e));
      let r = this.cam,
        i = 0.5 - 0.5 * Math.cos((this.time * DF) / KZ),
        a = OF(GZ[0], GZ[1], i),
        o = Math.asin((0.25 * i) / UZ);
      (this.onLift ||
        ((this.onLift = !0),
        this.liftAt.set(VZ(t, r.position, IZ)),
        this.liftAim.set(
          VZ(t, r.getWorldDirection(NZ).multiplyScalar(10).add(r.position), IZ),
        ),
        (this.liftYaw = a),
        (this.liftTilt = o),
        (this.liftT = 0),
        (this.lookedAt = -1 / 0)),
        (this.liftT += e));
      let [s, c] = this.looked(n, e);
      if (
        ((this.liftYaw += s),
        (this.liftTilt = Y(this.liftTilt + c, YZ[0], YZ[1])),
        this.time - this.lookedAt > XZ)
      ) {
        let t = PF(0.25, e);
        ((this.liftYaw += AF(a - this.liftYaw) * t),
          (this.liftTilt += (o - this.liftTilt) * t));
      }
      let l = this.liftYaw,
        u = this.liftTilt,
        d = IZ.set(
          Math.sin(l) * UZ * Math.cos(u),
          WZ + Math.sin(u) * UZ,
          -Math.cos(l) * UZ * Math.cos(u),
        ),
        f = this.time - this.lookedAt < XZ ? 1 : X(1, 3, this.liftT),
        p = this.liftAt.to(d, OF(1.4, 0.08, f), e),
        m = this.liftAim.to(
          d.set(0, 0.75, Math.cos(l) * 1.2),
          OF(1.1, 0.08, f),
          e,
        );
      (HZ(t, p, r.position),
        r.lookAt(HZ(t, m, NZ)),
        this.roll.to(0, 0.5, e),
        this.fov.to(EZ, 1, e),
        this.applyFov());
    }
    land(e, t = !1) {
      ((this.dip.v -= Math.min(e, 12) * 0.09),
        this.hit(Y((e - 2) / 10) * 0.7),
        t && (this.fov.v += 30));
    }
    hit(e) {
      this.trauma = Math.min(1, this.trauma + e);
    }
    update(e, t) {
      if (((this.onLift = !1), (this.onFoot = !1), e <= 0))
        return this.apply(t);
      this.time += e;
      let n = t.mode === `crash`,
        r = this.air.to(+(t.mode === `air`), 0.18, e),
        i = n
          ? this.body.to(t.drawBodyPos, 0.07, e)
          : this.body.set(t.centre(FZ));
      if (n) {
        let t = PZ.subVectors(i, this.lastBody).divideScalar(e);
        t.lengthSq() < 900 && this.bodyVel.lerp(t, PF(3, e));
      } else this.bodyVel.copy(t.vel);
      this.lastBody.copy(i);
      let a = this.bodyVel,
        o = Math.hypot(a.x, a.z),
        s = MF(a.x, a.z),
        c = o > 1.5 || t.mode !== `ride` ? s : t.yaw;
      ((n && o < 2) || this.heading.turn(c, n ? 0.8 : OF(0.32, 0.85, r), e),
        this.dist.to(this.backFor(t), n ? 0.6 : 0.7, e),
        this.ahead.to(this.aheadFor(t), 0.35, e),
        this.lead.to(n ? 0 : Y(this.heading.v * 2.2, -2, 2) * (1 - r), 0.3, e));
      let l = this.camYFor(t),
        u = l > this.camY.x;
      (this.camY.to(l, n ? 0.25 : OF(0.14, u ? 0.5 : 0.2, r), e),
        this.aimY.to(this.aimYFor(t), n ? 0.12 : OF(0.09, 0.12, r), e),
        this.fov.to(this.fovFor(t), 0.6, e),
        this.roll.to(
          t.mode === `ride` ? t.roll * 0.25 + this.bank(t) * xZ : 0,
          0.22,
          e,
        ));
      let d = Math.min(t.takeJolt(), 30);
      ((this.dip.v -= d * 0.004),
        (this.trauma = Math.max(
          0,
          Math.min(1, this.trauma + d * 0.01) - kZ * e,
        )),
        (this.buzz =
          t.mode === `ride` ? Y((t.speed - 6) / 20) * dz[t.surface] : 0),
        this.dodge.to(this.clearView(t), 0.4, e),
        this.dip.step(0, e),
        this.apply(t));
    }
    looked(e, t) {
      let n = e.dx * qZ + e.x * JZ[0] * t,
        r = -(e.dy * qZ + e.y * JZ[1] * t);
      return ((n || r) && (this.lookedAt = this.time), [n, r]);
    }
    backFor(e) {
      if (e.mode === `crash`)
        return 2.8 + Math.min(this.bodyVel.length(), 20) * 0.05;
      let t =
        e.mode === `air`
          ? mZ +
            Math.min(gZ, hZ * (e.pos.y - this.terrain.height(e.pos.x, e.pos.z)))
          : 0;
      return fZ + Math.min(e.speed, _Z) * pZ + t;
    }
    clearView(e) {
      let t = e.mode === `crash` ? this.body.p : e.centre(FZ),
        n = this.dist.x;
      for (let e of MZ) {
        let r = this.heading.x + e,
          i = !0;
        for (let e = 0.3; e <= 1 && i; e += 0.175) {
          let a = t.x + Math.sin(r) * n * e,
            o = t.z + Math.cos(r) * n * e;
          i = !this.terrain.obstacleAt(a, OF(t.y, this.camY.x, e), o, 0.45);
        }
        if (i) return e;
      }
      return this.dodge.x;
    }
    aheadFor(e) {
      return e.mode === `crash`
        ? 0
        : e.mode === `air`
          ? 2
          : 2.5 + Math.min(e.speed, _Z) * 0.14;
    }
    camYFor(e) {
      if (e.mode === `crash`) return this.body.p.y + 1.3;
      let t = Math.hypot(1, e.carve) - 1;
      return (
        e.centre(FZ).y + vZ + yZ * Y((e.speed - 6) / 14) - bZ * Math.min(t, 1.5)
      );
    }
    bank(e) {
      let t = e.centre(FZ),
        n = this.terrain.normal(t.x, t.z, zZ, 0.6, !0);
      return Math.asin(
        Y(
          n[0] * Math.cos(this.heading.x) - n[2] * Math.sin(this.heading.x),
          -1,
          1,
        ),
      );
    }
    aimYFor(e) {
      return e.mode === `crash`
        ? this.body.p.y
        : e.centre(FZ).y + (e.mode === `air` ? 0.12 : 0.36);
    }
    fovFor(e) {
      let t = e.speed;
      return (
        SZ +
        Y((t - 6) / 14) * CZ +
        Y((t - 20) / 8) * wZ +
        (e.mode === `air` ? TZ : 0)
      );
    }
    ground(e, t) {
      let n = this.terrain,
        r = 1.2;
      return (
        (n.height(e, t) * 2 +
          n.height(e + r, t) +
          n.height(e - r, t) +
          n.height(e, t + r) +
          n.height(e, t - r)) /
        6
      );
    }
    apply(e) {
      let { x: t, z: n } = e.mode === `crash` ? this.body.p : e.centre(FZ),
        r = this.heading.x + this.dodge.x,
        i = Math.sin(r),
        a = Math.cos(r),
        o = this.dist.x,
        s = t + i * o,
        c = n + a * o,
        l = this.ground(s, c) + 0.8,
        u = 0.3,
        d = this.camY.x;
      (d < l + u && (d = l + u * Math.exp((d - l - u) / u)), (d += this.dip.x));
      let f = this.time,
        p = e.mode === `ride` ? 0.01 * Y((e.speed - 8) / 12) : 0,
        m = Math.sin(f * 1.3) * p,
        h = Math.sin(f * 1.7 + 1) * p;
      this.cam.position.set(s + m * a, d + h, c - m * i);
      let g = this.ahead.x,
        _ = this.lead.x;
      (NZ.set(
        t - i * g - a * _,
        this.aimY.x + this.dip.x * 0.6,
        n - a * g + i * _,
      ),
        this.cam.lookAt(NZ),
        this.cam.rotateZ(-this.roll.x),
        this.shake(),
        this.applyFov());
    }
    shake() {
      let e = this.trauma * this.trauma,
        t = this.time,
        n = (n) =>
          BZ.noise(t * OZ, n * 17) * DZ[n] * e +
          BZ.noise(t * jZ, n * 17 + 50) * AZ * this.buzz;
      (this.cam.rotateY(n(0)), this.cam.rotateX(n(1)), this.cam.rotateZ(n(2)));
    }
    applyFov() {
      let e = Y(this.fov.x, 40, 90);
      Math.abs(this.cam.fov - e) <= 0.02 ||
        ((this.cam.fov = e), this.cam.updateProjectionMatrix());
    }
  };
