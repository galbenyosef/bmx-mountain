// assets__index-gCVK5XnX 30 — math
// Lines 56907-57388 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var NX = new qt(),
  PX = new qt(),
  FX = new M(),
  IX = new M(),
  LX = new qt(),
  RX = new qt(),
  zX = new M(),
  BX = new M(),
  VX = new M(),
  HX = new M(),
  UX = new M(),
  WX = new M(),
  GX = new M(),
  KX = new M(),
  qX = new M(),
  JX = new M(),
  YX = new M(),
  XX = 1.2,
  ZX = 0.95,
  QX = 1.75,
  $X = new M(0, 0.62, 0.15),
  eZ = new M(0, 0, 1),
  tZ = 0.28,
  nZ = 2.6,
  rZ = [0.55, -0.35],
  iZ = -0.22,
  aZ = 6,
  oZ = 15,
  sZ = 0.15,
  cZ = 0.75,
  lZ = [cq.chest, cq.head, cq.shL, cq.shR, cq.elL, cq.elR, cq.haL, cq.haR],
  uZ = 0.9,
  dZ = class {
    world;
    group = new Hn();
    bike;
    rider;
    gripL = new Vn();
    gripR = new Vn();
    crankShown = Math.PI / 2;
    crouch = new IF(170, 0.55);
    reach = new IF(110, 0.7);
    lean = new IF(80, 0.65);
    roll = new IF(60, 0.8);
    twist = new IF(70, 0.7);
    headYaw = new IF(50, 0.9);
    headPitch = new IF(50, 0.9);
    headRoll = new IF(50, 0.9);
    seen = !1;
    last = {
      x: 0,
      y: 0,
      z: 0,
      speed: 0,
      mode: kH.Ride,
      crouch: 0,
      compF: 0,
      compR: 0,
      roll: 0,
    };
    vel = new M();
    acc = new M();
    lastSide = 0;
    lineY = 0;
    lineVy = 0;
    sprint = 0;
    flutter = MV(0);
    upT = -1;
    walk = Array.from({ length: 15 }, () => new M());
    kneelAt = new M();
    kneelYaw = 0;
    lastQ = new qt();
    yawRate = 0;
    pitchRate = 0;
    vy = 0;
    accel = 0;
    flailT = 0;
    ragdoll;
    limp = !1;
    joints = Array.from({ length: 15 }, () => new M());
    before = Array.from({ length: 15 }, () => new M());
    local = Array.from({ length: 15 }, () => new M());
    lastDt = 1 / 60;
    ridingFrames = 0;
    sinceRiding = 1 / 0;
    constructor(e, t, n = !1) {
      ((this.world = t),
        (this.ragdoll = t ? new Eq(t) : null),
        this.ragdoll && (this.ragdoll.follow = n));
      let r = sq(e, this.flutter);
      ((this.bike = DU(r)),
        (this.rider = EY(r)),
        this.group.add(this.bike.root, this.rider.root),
        this.gripL.position.copy(bU.gripL).sub(bU.headBottom),
        this.gripR.position.copy(bU.gripR).sub(bU.headBottom),
        this.bike.bars.add(this.gripL, this.gripR),
        SH(this.group));
    }
    remember(e) {
      let t = this.last;
      ((t.x = e.x),
        (t.y = e.y),
        (t.z = e.z),
        (t.speed = e.speed),
        (t.mode = e.mode),
        (t.crouch = e.crouch),
        (t.compF = e.compF),
        (t.compR = e.compR),
        (t.roll = e.roll));
    }
    observe(e, t) {
      let n = this.last,
        r = mU(e.pitch, e.yaw, e.roll, LX);
      if (!this.seen || t <= 0) {
        (this.remember(e), this.lastQ.copy(r), (this.seen = !0));
        return;
      }
      let i = PF(18, t),
        a = RX.copy(this.lastQ).invert().premultiply(r);
      a.w < 0 && a.set(-a.x, -a.y, -a.z, -a.w);
      let o = 2 * Math.acos(Y(a.w, -1, 1)),
        s = Math.sqrt(Math.max(1e-12, 1 - a.w * a.w)),
        c = zX.set(a.x, a.y, a.z).multiplyScalar(o / s / t);
      if (
        (this.lastQ.copy(r),
        (this.yawRate += (c.y - this.yawRate) * i),
        (this.pitchRate +=
          (c.dot(IX.set(1, 0, 0).applyQuaternion(r)) - this.pitchRate) * i),
        (this.vy += ((e.y - n.y) / t - this.vy) * i),
        (this.accel += ((e.speed - n.speed) / t - this.accel) * PF(6, t)),
        GX.set((e.x - n.x) / t, (e.y - n.y) / t, (e.z - n.z) / t),
        GX.lengthSq() < 2500 &&
          (this.acc.lerp(WX.subVectors(GX, this.vel).divideScalar(t), PF(8, t)),
          this.vel.lerp(GX, i)),
        e.mode === kH.Ride && Math.abs(e.y - this.lineY) < 2)
      ) {
        let n = PF(1 / tZ, t),
          r = this.lineY + this.lineVy * t,
          i = e.y - r;
        ((this.lineY = r + n * i),
          (this.lineVy += ((n * n) / (2 - n)) * (i / t)));
      } else
        ((this.lineY = e.y), (this.lineVy = e.mode === kH.Ride ? 0 : this.vy));
      if (n.mode === kH.Air && e.mode === kH.Ride) {
        let e = Y(-this.vy * 0.55, 0, 4);
        ((this.crouch.v += e),
          (this.reach.v -= e * 0.35),
          (this.lean.v += e * 0.25),
          (this.headPitch.v -= e * 0.4));
      } else if (n.mode === kH.Ride && e.mode === kH.Air) {
        let t = n.crouch > 0.3 && e.crouch < n.crouch;
        ((this.crouch.v -= t ? 5 : 1.5),
          (this.reach.v += t ? 0.6 : 0.3),
          t && (this.lean.v -= 0.6));
      } else if (e.mode === kH.Ride) {
        ((this.reach.v -= Y((e.compF - n.compF) * 6, -0.6, 0.6)),
          (this.crouch.v += Y((e.compR - n.compR) * 8, -0.8, 0.8)));
        let t = this.acc.x * Math.cos(e.yaw) - this.acc.z * Math.sin(e.yaw);
        ((this.roll.v -= Y((t - this.lastSide) * 0.012, -0.3, 0.3)),
          (this.lastSide = t));
      }
      this.remember(e);
    }
    body(e, t) {
      let n = e.mode === kH.Air,
        r = e.mode === kH.Crash,
        i = Y((e.compF + e.compR) / 2 / 0.22, 0, 1) * 0.8 + e.crouch * 0.85,
        a = 0,
        o = 0;
      if (n) {
        let t = this.vy < -2.5;
        ((i = t ? 0.12 + e.crouch * 0.3 : 0.5 + e.crouch * 0.35),
          (a = t ? 0.06 : -0.08),
          (o = Y(-this.pitchRate * 0.06, -0.4, 0.35)),
          (a += Y(this.pitchRate * 0.025, -0.1, 0.12)));
      } else
        ((a =
          Y(-this.accel * 0.025, -0.06, 0.12) -
          Y((e.compF - e.compR) * 0.8, -0.06, 0.12) -
          e.crouch * 0.1),
          (o = e.crouch * 0.18),
          (this.sprint +=
            ((e.pedal ? 1 - X(aZ, oZ, e.speed) : 0) - this.sprint) * PF(4, t)),
          e.pedal &&
            ((o += 0.14 + this.sprint * 0.16),
            (a -= 0.05),
            (i += 0.07 * Math.sin(2 * e.crank) + this.sprint * (iZ - i * 0.5))),
          (i += Y((e.y - this.lineY) * nZ, rZ[1], rZ[0])),
          (o +=
            Y(this.accel * 0.02, -0.25, 0.15) + e.pump * 0.12 - e.lift * 0.4),
          (i += e.pump * 0.3 - e.lift * 0.15),
          (a += e.lift * 0.1));
      let s = e.style === CH.Turndown ? e.styled * e.styleSide : 0,
        c =
          Y(
            this.yawRate * (n ? 0.07 : 0.04),
            n ? -0.6 : -0.25,
            n ? 0.6 : 0.25,
          ) -
          s * 0.35,
        l = Math.atan((e.speed * -this.yawRate) / J.g),
        u = n
          ? 0
          : Y(
              -e.roll * 0.45 +
                Y((l - e.roll) * 0.6, -0.2, 0.2) -
                e.wobble * 0.25 * Math.sin(this.flailT * 13),
              -0.3,
              0.3,
            );
      r ? (this.flailT += t * (2 + Math.min(10, e.speed))) : (this.flailT += t);
      let d = this.gaze(e, n);
      return {
        crouch: Y(this.crouch.step(Y(i, iZ, 1), t), -0.32, 1.1),
        reach: this.reach.step(a, t),
        lean: this.lean.step(o, t),
        roll: this.roll.step(u, t),
        twist: this.twist.step(c, t),
        headYaw: this.headYaw.step(d[0] - s * 0.7, t),
        headPitch: this.headPitch.step(d[1], t),
        headRoll: this.headRoll.step(d[2], t),
        hands: e.hands,
        wide: +(e.bars === 0),
        feetOff:
          e.whip === 0 ? 0 : Math.sin(Math.min(Math.PI, Math.abs(e.whip) / 2)),
        dab: X(0.35, 0.7, e.wobble) * (e.roll > 0 ? 1 : -1),
        turn: Y(l * 2, -1, 1),
        ankle: e.pedal ? Math.sin(e.crank) * 0.25 : 0,
        style: e.style,
        side: e.styleSide,
        styled: e.styled,
        flail: +!!r,
        t: this.flailT,
      };
    }
    gaze(e, t) {
      let n = this.vel,
        r = Math.hypot(n.x, n.z),
        i = WX.set(0, 1, 0).applyQuaternion(this.lastQ).y > 0.3;
      if (r < 1 || !i || Math.abs(this.pitchRate) > 3)
        return [this.yawRate * 0.12, t ? -0.3 : -0.14, 0];
      let a = MF(n.x, n.z) + this.yawRate * (t ? 0 : 0.3),
        o = t ? (this.vy < 0 ? Math.atan2(n.y, r) - 0.3 : -0.1) : -0.18;
      return (
        WX.set(
          -Math.sin(a) * Math.cos(o),
          Math.sin(o),
          -Math.cos(a) * Math.cos(o),
        ),
        WX.applyQuaternion(RX.copy(this.lastQ).invert()),
        [
          Y(MF(WX.x, WX.z), -1.1, 1.1),
          Y(Math.asin(Y(WX.y, -1, 1)), -0.85, 0.45),
          Y(e.roll * 0.7, -0.5, 0.5),
        ]
      );
    }
    ground(e) {
      return this.world ? this.world.height(e.x, e.z) : e.y;
    }
    thrown(e, t) {
      let n = KX.set(this.vel.x, 0, this.vel.z),
        r = n.length();
      if (r < 0.5) return;
      n.divideScalar(r);
      let i = Math.min(1, r / 15),
        a = qX.set(-n.z, 0, n.x).multiplyScalar(e.roll > 0 ? 1 : -1);
      for (let r = 0; r < 15; r++) {
        let o = t[r],
          s = lZ.includes(r);
        switch (e.bail) {
          case MH.Over:
            s
              ? (o.addScaledVector(n, 3 * i).y -= 2 * i)
              : (o.addScaledVector(n, -i).y += 3 * i);
            break;
          case MH.Back:
            s
              ? (o.addScaledVector(n, -3 * i).y -= i)
              : (o.addScaledVector(n, 1.5 * i).y += 2.5 * i);
            break;
          case MH.Side:
            o.addScaledVector(a, (s ? 4 : 2.5) * i);
            break;
          case MH.Stopped:
            s && o.multiplyScalar(0.15).addScaledVector(n, -1.5);
        }
      }
    }
    get settled() {
      return this.upT >= 1.3;
    }
    pose(e, t) {
      let n = e.mode === kH.Crash;
      if ((this.observe(e, t), n || (this.limp = !1), e.mode === kH.Seated))
        return this.seat(e);
      (n && this.ragdoll && !this.limp && this.goLimp(e, this.ragdoll),
        (this.sinceRiding = n ? this.sinceRiding + t : 0),
        t > 0 && (this.lastDt = t),
        (this.flutter.value = X(6, 26, e.speed)));
      let r = this.body(e, t),
        i = this.placeBike(e, t);
      if (e.mode === kH.Walk) return this.walkOff(e);
      if (this.limp && this.ragdoll) return this.lie(e, this.ragdoll, t);
      this.ride(e, r, i, n);
    }
    seat(e) {
      (FX.set(e.x, e.y, e.z),
        DX(this.rider, FX, e.yaw),
        OX(this.bike, FX, e.yaw),
        (this.ridingFrames = 0),
        this.group.updateMatrixWorld(!0));
    }
    goLimp(e, t) {
      let n;
      if (this.ridingFrames >= 2 && this.sinceRiding < 0.3) {
        let e = 1 / Math.max(1 / 240, this.lastDt);
        n = this.joints.map((t, n) =>
          t.clone().sub(this.before[n]).multiplyScalar(e).clampLength(0, 35),
        );
      } else {
        if ((this.pose({ ...e, mode: kH.Ride }, 0), e.bx || e.by || e.bz)) {
          let t = FX.set(e.bx, e.by, e.bz).sub(this.joints[0]);
          for (let e of this.joints) e.add(t);
        }
        n = this.joints.map(() => new M());
      }
      (this.thrown(e, n),
        t.start(this.joints, n),
        e.bail !== MH.Stopped &&
          t.brace(KX.set(this.vel.x, 0, this.vel.z).normalize()),
        (this.limp = !0),
        (this.upT = -1));
    }
    placeBike(e, t) {
      let n = e.pedal
          ? Math.sin(e.crank) * (0.04 + sZ * this.sprint) * Y(1 - e.speed / 18)
          : 0,
        r = (e.compF + e.compR) / 2,
        i = this.bike.root,
        a = mU(e.pitch, e.yaw, e.roll, PX);
      if (
        (i.position
          .set(e.x, e.y, e.z)
          .addScaledVector(IX.set(0, 1, 0).applyQuaternion(a), r),
        mU(
          e.pitch + Math.atan2(e.compF - e.compR, J.wheelbase),
          e.yaw,
          e.roll + 0.08 * Y(AF(e.roll), -0.9, 0.9) + n,
          i.quaternion,
        ),
        e.pedal > 0)
      )
        this.crankShown = e.crank;
      else {
        let e =
          Math.PI / 2 +
          Math.PI * Math.round((this.crankShown - Math.PI / 2) / Math.PI);
        this.crankShown += (e - this.crankShown) * Math.min(1, t * 6);
      }
      JX.copy(i.position);
      let o =
        (e.style === CH.Tabletop ? XX : e.style === CH.Turndown ? ZX : 0) *
        e.styleSide *
        e.styled;
      (e.mode === kH.Air &&
        Math.hypot(this.vel.x, this.vel.z) > 3 &&
        (o += cZ * Math.sin(AF(e.yaw - MF(this.vel.x, this.vel.z)))),
        o !== 0 &&
          (i.position.add(YX.copy($X).applyQuaternion(i.quaternion)),
          i.quaternion.multiply(LX.setFromAxisAngle(eZ, o)),
          i.position.sub(YX.copy($X).applyQuaternion(i.quaternion))));
      let s =
        e.bars + (e.style === CH.Turndown ? QX * e.styleSide * e.styled : 0);
      return (AU(this.bike, e.steer, s, e.whip, e.spin, this.crankShown), a);
    }
    walkOff(e) {
      (FX.set(e.bx, e.by, e.bz),
        jX(
          FX,
          2 * Math.atan2(e.bqy, e.bqw),
          e.crank,
          e.speed,
          (e, t) => this.ground(IX.set(e, 0, t)),
          this.walk,
        ),
        bX(this.rider, (e, t) => t.copy(this.walk[e])),
        this.group.updateMatrixWorld(!0));
    }
    lie(e, t, n) {
      if (
        (t.target.set(e.bx, e.by, e.bz),
        t.update(n),
        this.upT < 0 && t.still > 0.8)
      ) {
        (t.centre(this.kneelAt),
          (this.kneelAt.y = this.ground(this.kneelAt)),
          t.torso(NX));
        let e = qX.set(0, 0, 1).applyQuaternion(NX);
        ((this.kneelYaw = Math.atan2(e.x, e.z)), (this.upT = 0));
      }
      this.upT >= 0 && (this.upT += n);
      let r = this.upT < 0 ? 0 : X(0, uZ, this.upT);
      (bX(this.rider, (e, n) =>
        r > 0
          ? t.at(e, n).lerp(EX(e, this.kneelAt, this.kneelYaw, qX), r)
          : t.at(e, n),
      ),
        this.group.updateMatrixWorld(!0));
    }
    ride(e, t, n, r) {
      let i = this.rider.root;
      (r
        ? (i.position.set(e.bx, e.by, e.bz),
          i.quaternion.set(e.bqx, e.bqy, e.bqz, e.bqw),
          i.position.sub(FX.set(0, 0.8, 0).applyQuaternion(i.quaternion)))
        : (i.position.copy(JX), i.quaternion.copy(n)),
        this.group.updateMatrixWorld(!0));
      let a = i.worldToLocal(this.gripL.getWorldPosition(BX)),
        o = i.worldToLocal(this.gripR.getWorldPosition(VX)),
        s = i.worldToLocal(this.bike.pedalL.getWorldPosition(HX)),
        c = i.worldToLocal(this.bike.pedalR.getWorldPosition(UX)),
        l = i
          .getWorldQuaternion(NX)
          .invert()
          .multiply(this.bike.bars.getWorldQuaternion(PX));
      if (
        (_X(this.rider, t, l, a, o, s, c, this.local),
        i.updateMatrixWorld(!0),
        !r)
      ) {
        for (let e = 0; e < 15; e++)
          (this.before[e].copy(this.joints[e]),
            this.joints[e].copy(this.local[e]).applyMatrix4(i.matrixWorld));
        this.ridingFrames++;
      }
    }
    head(e) {
      return e
        .copy(this.rider.head.position)
        .applyMatrix4(this.rider.root.matrixWorld);
    }
    dispose() {
      (this.group.removeFromParent(),
        this.group.traverse((e) => {
          let t = e;
          if (t.isMesh) {
            t.geometry.dispose();
            for (let e of [t.material].flat()) e.map?.dispose();
          }
        }));
    }
  },
  fZ = 2.3,
  pZ = 0.1,
  mZ = 0.5,
  hZ = 0.35,
  gZ = 2.5,
  _Z = 22,
  vZ = 0.82,
  yZ = -0.22,
  bZ = 0.14,
  xZ = 0.2,
  SZ = 50,
  CZ = 14,
  wZ = 6,
  TZ = 3,
  EZ = 54,
  DZ = [0.02, 0.026, 0.035],
  OZ = 11,
  kZ = 1.4,
  AZ = 0.004,
  jZ = 8,
  MZ = [0, 0.3, -0.3, 0.6, -0.6],
  NZ = new M(),
  PZ = new M(),
  FZ = new M(),
  IZ = new M(),
  LZ = new M(),
  RZ = new M(),
  zZ = [0, 1, 0],
  BZ = new XF(53);
