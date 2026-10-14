// assets/index-gCVK5XnX 18 — math
// Lines 52217-53522 of readable/assets/index-gCVK5XnX.pretty.js (statement-aligned).
var yU = class {
    terrain;
    ev;
    pos = new M();
    vel = new M();
    yaw = 0;
    pitch = 0;
    roll = 0;
    pitchRate = 0;
    yawRate = 0;
    rollRate = 0;
    lean = 0;
    mode = `ride`;
    modeT = 0;
    steer = 0;
    crouch = 0;
    crank = 0;
    wheelSpin = 0;
    wheelRate = 0;
    pedalling = !1;
    skid = 0;
    carve = 0;
    gripUse = 0;
    pump = 0;
    bail = 0;
    manualT = 0;
    lifting = !1;
    wheelie = !1;
    lift = 0;
    shimmy = 0;
    stress = 0;
    crouchAt = -99;
    heldThrough = !1;
    landingNear = 0;
    comp = [0, 0];
    onBlock = [null, null];
    under = [
      { x: 0, y: 0, z: 0, nx: 0, ny: 1, nz: 0 },
      { x: 0, y: 0, z: 0, nx: 0, ny: 1, nz: 0 },
    ];
    riding = null;
    rodeFrom = 0;
    rodeTo = 0;
    offIt = 0;
    tipped = -1;
    contact = [!1, !1];
    surface = SURFACE.Trail;
    bars = 0;
    whip = 0;
    hands = 0;
    barT = -1;
    whipT = -1;
    style = TRICK.None;
    styleSide = 1;
    styled = 0;
    air = new OH();
    corking = !1;
    airStartY = 0;
    peakHeight = 0;
    airTime = 0;
    airStartS = 0;
    wobble = 0;
    lastJump = 0;
    lastImpact = 0;
    trailS = 0;
    trailU = 0;
    onTrail = !1;
    safeS = zI;
    safeSpeed = 0;
    held = !1;
    offCourse = 0;
    jolt = 0;
    bodyPos = new M();
    bodyRot = new qt();
    bodyVel = new M();
    bodySpin = new M();
    bodyDriven = !1;
    sliding = 0;
    crouchHeld = !1;
    poppedAt = -1;
    flightTime = 1;
    fromLip = !1;
    airGrace = 0;
    rubbing = !1;
    drawPos = new M();
    drawBodyPos = new M();
    prev = {
      pos: new M(),
      bodyPos: new M(),
      bodyRot: new qt(),
      yaw: 0,
      pitch: 0,
      roll: 0,
      steer: 0,
      crank: 0,
      wheelSpin: 0,
      bars: 0,
      whip: 0,
      crouch: 0,
      hands: 0,
      styled: 0,
      compF: 0,
      compR: 0,
    };
    alpha = 1;
    downAt = { fwd: -99, back: -99, left: -99, right: -99 };
    down = { fwd: !1, back: !1, left: !1, right: !1 };
    takeoffAt = -99;
    recover = 0;
    revert = 0;
    revertDir = 0;
    acc = 0;
    lastComp = [0, 0];
    time = 0;
    constructor(e, t) {
      ((this.terrain = e), (this.ev = t));
    }
    place(e, t = 0) {
      let n = { x: 0, z: 0, tx: 0, tz: 0 };
      (this.terrain.trail.pointAt(e, n),
        this.placeAt(n.x, n.z, n.tx, n.tz, t),
        (this.safeS = e));
    }
    placeAt(e, t, n, r, i = 0) {
      this.yaw = headingFromXZ(n, r);
      let a = this.terrain.height(e + n * 0.5, t + r * 0.5),
        o = this.terrain.height(e - n * 0.5, t - r * 0.5),
        s = a - o;
      ((this.pitch = Math.atan2(s, 1)),
        (this.roll = 0),
        this.pos.set(e, (a + o) / 2 + PHYSICS.wheelRadius + PHYSICS.bodyLift, t));
      let c = i / Math.hypot(1, s);
      (this.vel.set(n * c, s * c, r * c),
        (this.pitchRate = this.yawRate = this.rollRate = this.lean = 0),
        (this.corking = !1),
        (this.mode = `ride`),
        (this.modeT = 0),
        (this.steer =
          this.crouch =
          this.bars =
          this.whip =
          this.hands =
          this.styled =
            0),
        (this.barT = this.whipT = -1),
        (this.style = TRICK.None),
        (this.comp[0] = this.comp[1] = 0),
        (this.onBlock[0] = this.onBlock[1] = null),
        (this.riding = null),
        (this.recover = this.revert = this.wobble = this.offCourse = 0),
        (this.safeSpeed = i),
        (this.held = i === 0),
        (this.skid = 0),
        this.remember(),
        (this.alpha = 1),
        this.drawPos.copy(this.pos));
    }
    respawn() {
      let e = this.terrain.trail,
        t = Math.max(zI, this.safeS - 2),
        n = e.features.find((e) => e.kind !== `rollers` && e.lip > t),
        r = n && n.lip - t < 60 ? n.speed - (n.lip - t) / 60 : 0;
      this.place(
        t,
        Math.min(
          Math.max(this.safeSpeed, r),
          e.bendSpeed(t, 50, 0.8 * PHYSICS.gripDirt),
          Math.max(24, r),
        ),
      );
    }
    get outOfBounds() {
      return Math.abs(this.pos.x) > 1e3 || Math.abs(this.pos.z) > 1e3;
    }
    get speed() {
      return this.vel.length();
    }
    takeJolt() {
      let e = this.jolt;
      return ((this.jolt = 0), e);
    }
    bodyQuat(e) {
      return mU(this.pitch, this.yaw, this.roll, e);
    }
    frameQuat(e) {
      return mU(this.pitch, this.yaw + this.whip, this.roll, e);
    }
    centre(e) {
      let t = this.prev,
        n = this.alpha;
      return (
        mU(
          lerpAngle(t.pitch, this.pitch, n),
          lerpAngle(t.yaw, this.yaw, n),
          lerp(t.roll, this.roll, n),
          eU,
        ),
        e.copy(IH).applyQuaternion(eU).add(this.drawPos)
      );
    }
    centreOffset(e) {
      return e.copy(IH).applyQuaternion(this.bodyQuat(eU));
    }
    state(e) {
      let t = this.prev,
        n = this.alpha;
      return (
        (e.x = this.drawPos.x),
        (e.y = this.drawPos.y),
        (e.z = this.drawPos.z),
        (e.yaw = lerpAngle(t.yaw, this.yaw, n)),
        (e.pitch = lerpAngle(t.pitch, this.pitch, n)),
        (e.roll = lerp(t.roll, this.roll, n)),
        (e.steer = lerp(t.steer, this.steer, n)),
        (e.bars = lerpAngle(t.bars, this.bars, n)),
        (e.whip = lerpAngle(t.whip, this.whip, n)),
        (e.spin = lerp(t.wheelSpin, this.wheelSpin, n)),
        (e.crank = lerp(t.crank, this.crank, n)),
        (e.crouch = lerp(t.crouch, this.crouch, n)),
        (e.hands = lerp(t.hands, this.hands, n)),
        (e.style = this.style),
        (e.styleSide = this.styleSide),
        (e.styled = lerp(t.styled, this.styled, n)),
        (e.mode = VH[this.mode]),
        (e.wobble = this.wobble),
        (e.pump = this.pump),
        (e.lift = this.lift),
        (e.bail = this.bail),
        (e.pedal = +!!this.pedalling),
        (e.speed = this.speed),
        (e.compF = lerp(t.compF, this.contact[0] ? this.comp[0] : 0, n)),
        (e.compR = lerp(t.compR, this.contact[1] ? this.comp[1] : 0, n)),
        (e.bx = this.drawBodyPos.x),
        (e.by = this.drawBodyPos.y),
        (e.bz = this.drawBodyPos.z),
        UH.copy(t.bodyRot).slerp(this.bodyRot, n),
        (e.bqx = UH.x),
        (e.bqy = UH.y),
        (e.bqz = UH.z),
        (e.bqw = UH.w),
        e
      );
    }
    remember() {
      let e = this.prev;
      (e.pos.copy(this.pos),
        e.bodyPos.copy(this.bodyPos),
        e.bodyRot.copy(this.bodyRot),
        (e.yaw = this.yaw),
        (e.pitch = this.pitch),
        (e.roll = this.roll),
        (e.steer = this.steer),
        (e.crank = this.crank),
        (e.wheelSpin = this.wheelSpin),
        (e.bars = this.bars),
        (e.whip = this.whip),
        (e.crouch = this.crouch),
        (e.hands = this.hands),
        (e.styled = this.styled),
        (e.compF = this.contact[0] ? this.comp[0] : 0),
        (e.compR = this.contact[1] ? this.comp[1] : 0));
    }
    update(e, t) {
      for (this.acc += Math.min(e, 0.1); this.acc >= PHYSICS.step;)
        ((this.acc -= PHYSICS.step),
          this.remember(),
          this.step(PHYSICS.step, t),
          this.terrain.trials?.step(PHYSICS.step));
      ((this.alpha = this.acc / PHYSICS.step),
        this.drawPos.lerpVectors(this.prev.pos, this.pos, this.alpha),
        this.drawBodyPos.lerpVectors(
          this.prev.bodyPos,
          this.bodyPos,
          this.alpha,
        ));
    }
    step(e, t) {
      if (((this.time += e), (this.modeT += e), this.mode === `crash`))
        return this.tumble(e);
      this.held &&
        (t.fwd > 0 || t.back > 0 || t.steer !== 0 || t.crouch) &&
        (this.held = !1);
      let n = this.mode === `air`;
      (n && this.centreOffset(QH), this.controls(e, t));
      let r = this.frameQuat(UH),
        i = WH.set(0, 0, -1).applyQuaternion(r),
        a = this.legs(i, GH.set(0, 1, 0).applyQuaternion(r), e),
        o = KH.set(0, a.touching > 0 ? -PHYSICS.g : -PHYSICS.airG, 0);
      ((this.pedalling = !1),
        (this.gripUse = this.pump = 0),
        a.force > 0
          ? this.traction(t, i, a, o, e)
          : n &&
            ((this.wheelRate =
              (this.speed / PHYSICS.wheelRadius) * Math.exp(-this.modeT * 0.6)),
            (this.wheelSpin += this.wheelRate * e)));
      let s = (t.crouch ? PHYSICS.dragTuck : PHYSICS.dragUp) / PHYSICS.mass,
        c = this.speed;
      if (
        ((o.x -= this.vel.x * c * s),
        (o.y -= this.vel.y * c * s),
        (o.z -= this.vel.z * c * s),
        this.vel.addScaledVector(o, e),
        this.pos.addScaledVector(this.vel, e),
        this.lifting)
      ) {
        let t =
          (PHYSICS.manualPitch +
            0.04 * Math.sin(this.time * 2.7) -
            (this.pitch - this.slope())) *
          8;
        this.pitchRate += (t - this.pitchRate) * Math.min(1, e * 10);
      } else
        a.touching > 0 &&
          ((this.pitchRate += (a.torque / PHYSICS.pitchInertia) * e),
          (this.pitchRate *= Math.exp(-e * 4)));
      if (n) {
        (this.turn(e), this.pos.add(QH).sub(this.centreOffset($H)));
        let t = this.bodyDown();
        if (t) return this.crash(t);
      } else
        ((this.pitch += this.pitchRate * e), (this.yaw += this.yawRate * e));
      (this.pedalling &&
        (this.crank +=
          ((this.vel.x * i.x + this.vel.y * i.y + this.vel.z * i.z) /
            PHYSICS.wheelRadius /
            2.8) *
          e),
        this.modeChanges(a.touching, e),
        this.stunts(e),
        this.trailCheck(e));
    }
    legs(e, t, n) {
      let r = dU;
      r.force = r.torque = r.nx = r.ny = r.nz = r.touching = 0;
      let i = PHYSICS.wheelbase / 2,
        a = PHYSICS.wheelRadius - this.crouch * 0.02,
        o = this.terrain.trials,
        s = Math.cos(this.pitch);
      for (let c = 0; c < 2; c++) {
        let l = c === 0 ? 1 : -1,
          u = this.pos.x + e.x * i * l - t.x * PHYSICS.bodyLift,
          d = this.pos.y + e.y * i * l - t.y * PHYSICS.bodyLift,
          f = this.pos.z + e.z * i * l - t.z * PHYSICS.bodyLift,
          p = this.terrain.baseHeight(u, f),
          m = null;
        o && o.wheel(u, f, d - PHYSICS.wheelRadius, this.onBlock[c], uU) && uU.y > p
          ? ((p = uU.y),
            (m = uU.block),
            (scratchNormal[0] = uU.nx),
            (scratchNormal[1] = uU.ny),
            (scratchNormal[2] = uU.nz))
          : this.terrain.normal(u, f, scratchNormal, 0.3, !0);
        let h = this.under[c];
        ((h.x = u),
          (h.y = p),
          (h.z = f),
          (h.nx = scratchNormal[0]),
          (h.ny = scratchNormal[1]),
          (h.nz = scratchNormal[2]));
        let g = a - (d - p) * scratchNormal[1],
          _ = this.comp[c];
        if (g > 0) {
          let e = this.vel.y + this.pitchRate * i * l * s,
            t = this.vel.x * scratchNormal[0] + e * scratchNormal[1] + this.vel.z * scratchNormal[2],
            a =
              PHYSICS.spring * Math.min(g, PHYSICS.travel) -
              (t > 0 ? PHYSICS.rebound : PHYSICS.damper) * t;
          (g > PHYSICS.travel &&
            (a += (g - PHYSICS.travel) * PHYSICS.spring * 12 - t * PHYSICS.damper * 6),
            (a = Math.max(0, a)),
            (r.force += a),
            (r.torque += a * i * l * s * scratchNormal[1]),
            (r.nx += scratchNormal[0] * a),
            (r.ny += scratchNormal[1] * a),
            (r.nz += scratchNormal[2] * a),
            (this.contact[c] = !0),
            r.touching++,
            (this.comp[c] = g),
            (this.lastComp[c] = (g - _) / n),
            (this.onBlock[c] = m),
            m?.seesaw && m.seesaw.press(uU.a, a * scratchNormal[1]));
        } else
          ((this.contact[c] = !1),
            (this.comp[c] = Math.max(0, g)),
            (this.lastComp[c] = 0),
            (this.onBlock[c] = null));
      }
      return r;
    }
    traction(e, t, n, r, i) {
      let a = PHYSICS.mass,
        { force: o, nx: s, ny: c, nz: l } = n;
      ((r.x += s / a), (r.y += c / a), (r.z += l / a));
      let u = Math.hypot(s, c, l),
        d = s / u,
        f = c / u,
        p = l / u,
        m = this.revert === 0 ? t.x : -Math.sin(this.revertDir),
        h = this.revert === 0 ? t.y : 0,
        g = this.revert === 0 ? t.z : -Math.cos(this.revertDir),
        _ = m * d + h * f + g * p,
        v = m - _ * d,
        y = h - _ * f,
        b = g - _ * p,
        x = Math.hypot(v, y, b) || 1;
      ((v /= x), (y /= x), (b /= x));
      let S = y * p - b * f,
        C = b * d - v * p,
        w = v * f - y * d,
        T = this.vel.x * v + this.vel.y * y + this.vel.z * b,
        E = this.vel.x * S + this.vel.y * C + this.vel.z * w;
      this.surface =
        this.onBlock[0] || this.onBlock[1]
          ? SURFACE.Wood
          : this.terrain.surface(this.pos.x, this.pos.z);
      let D = zH[this.surface],
        O = 0;
      if (
        ((this.pedalling = e.fwd > 0 && this.contact[1] && T > -0.5),
        this.pedalling &&
          (O +=
            (Math.min(PHYSICS.pedalForce, PHYSICS.pedalPower / Math.max(1, T)) * e.fwd) /
            a),
        e.back > 0 &&
          this.contact[1] &&
          !this.lifting &&
          !this.offLip() &&
          !(this.onFace() && this.meant(`back`)) &&
          Math.abs(T) > 0.05)
      ) {
        let t = PHYSICS.brake * e.back,
          n = (D * o * 0.55) / a;
        ((this.skid = approach(this.skid, +(t > n), i * 6)),
          (O -= Math.sign(T) * Math.min(t, n, Math.abs(T) / i)));
      } else this.skid = approach(this.skid, 0, i * 6);
      if (
        (this.pedalling && this.consume(`fwd`),
        this.onFace() ||
          (this.down.left && this.consume(`left`),
          this.down.right && this.consume(`right`)),
        (O -=
          Math.sign(T) * Math.min((BH[this.surface] * o) / a, Math.abs(T) / i)),
        e.crouch && this.crouch < 0.95 && y < -0.02)
      ) {
        let e = Math.min(4, -y * PHYSICS.pump) * (1 - this.crouch * 0.6);
        ((O += e), (this.pump = e / 4));
      }
      (this.held && (O = -T / i - (r.x * v + r.y * y + r.z * b)),
        (r.x += v * O),
        (r.y += y * O),
        (r.z += b * O));
      let ee = (-E / i) * 0.5,
        te = (D * o) / a,
        ne = clamp(ee, -te, te);
      ((this.gripUse = Math.min(1, Math.abs(ee) / Math.max(te, 1e-6))),
        (r.x += S * ne),
        (r.y += C * ne),
        (r.z += w * ne),
        Math.abs(ee) > te * 1.02 &&
          Math.abs(E) > 1.5 &&
          (this.skid = Math.max(this.skid, Math.min(1, Math.abs(E) / 4))),
        (this.jolt +=
          Math.abs(this.lastComp[0]) * i * 2 +
          Math.abs(this.lastComp[1]) * i * 2),
        (this.wheelRate = T / PHYSICS.wheelRadius),
        (this.wheelSpin += this.wheelRate * i));
    }
    controls(e, t) {
      let n = Math.hypot(this.vel.x, this.vel.z);
      (this.keys(t),
        (this.carve = 0),
        (this.stress = Math.max(0, this.stress - PHYSICS.stressFade * e)),
        this.crouching(t, e),
        this.mode === `ride`
          ? this.rideControls(t, n, e)
          : this.mode === `air` && this.airControls(t, n, e),
        this.spinTricks(e));
      let r =
        t.nohand &&
        this.mode === `air` &&
        (this.style === TRICK.None || this.style === TRICK.CanCan);
      (this.barT < 0 &&
        (this.hands = approach(this.hands, +!!r, e * (t.nohand ? 5 : 9))),
        r &&
          this.hands > 0.9 &&
          !this.air.has(wH.noHander) &&
          this.air.score(wH.noHander),
        this.styleTrick(t, e));
    }
    crouching(e, t) {
      (e.crouch && !this.crouchHeld && (this.crouchAt = this.time),
        !e.crouch &&
          this.crouchHeld &&
          (this.heldThrough
            ? (this.heldThrough = !1)
            : this.mode === `ride`
              ? this.pop()
              : this.mode === `air` &&
                this.fromLip &&
                this.modeT < PHYSICS.popLate &&
                this.pop(!0)),
        (this.crouchHeld = e.crouch),
        (this.crouch = approach(
          this.crouch,
          +!!e.crouch,
          t * (e.crouch ? PHYSICS.crouchRate : PHYSICS.uncrouchRate),
        )));
    }
    rideControls(e, t, n) {
      let r =
          (this.surface === SURFACE.Grass ? PHYSICS.gripGrass : PHYSICS.gripDirt) *
          PHYSICS.g *
          (1 + this.bankHelp(e.steer)),
        i = Math.min(PHYSICS.maxYawRate, r / Math.max(t, 0.5)),
        a = -e.steer * i,
        o = this.railRate(t);
      if (o) {
        let t = Math.sign(e.steer) === -o.turn ? Math.abs(e.steer) : 0,
          n = -o.turn * Math.min(i, o.rate) * (1 - PHYSICS.railOut * t),
          r = e.steer === 0 || t > 0 ? 1 : smoothstep(0.1, 0.35, Math.abs(e.steer));
        a += (n - a) * o.weight * r;
      }
      ((this.shimmy +=
        (clamp((t - PHYSICS.shimmyFrom) / PHYSICS.shimmyRange) * HH[this.surface] -
          this.shimmy) *
        Math.min(1, n * 3)),
        (a += Math.sin(this.time * 8.3) * this.shimmy * 0.35),
        (this.yawRate += (a - this.yawRate) * Math.min(1, n * PHYSICS.steerRate)),
        this.manual(e, t, n),
        (this.carve =
          this.contact[0] || this.contact[1]
            ? Math.abs(this.yawRate * t) / PHYSICS.g
            : 0),
        this.realign(n),
        (this.steer = approach(
          this.steer,
          Math.atan((-this.yawRate * PHYSICS.wheelbase) / Math.max(t, 1.5)),
          n * 3,
        )),
        (this.steer +=
          Math.sin(this.time * 9.1) *
          (this.shimmy * 0.12 + clamp((t - 26) / 4) * 0.02)),
        (this.wobble *= Math.exp(-n * 2.2)));
      let s = clamp(-this.yawRate, -i, i),
        c =
          Math.atan((t * s) / PHYSICS.g) * (this.onFace() ? 0.3 : 1) +
          this.wobble * 0.22 * Math.sin(this.time * 13) +
          this.shimmy * 0.08 * Math.sin(this.time * 8.3 + 1);
      if (
        ((this.roll += (clamp(c, -0.9, 0.9) - this.roll) * Math.min(1, n * 9)),
        this.offLip())
      ) {
        let t = this.flipInput(e);
        (t !== 0 &&
          this.meant(t > 0 ? `back` : `fwd`) &&
          (this.pitchRate = approach(
            this.pitchRate,
            t * PHYSICS.flipRate,
            n * PHYSICS.flipAccel,
          )),
          e.steer !== 0 &&
            this.meant(e.steer > 0 ? `right` : `left`) &&
            (this.yawRate = approach(
              this.yawRate,
              -e.steer * PHYSICS.spinRate,
              n * PHYSICS.spinAccel,
            )));
      }
    }
    realign(e) {
      if (this.recover !== 0) {
        let t = this.recover * Math.min(1, e * 12);
        ((this.yaw += t),
          (this.recover =
            Math.abs(this.recover - t) < 0.001 ? 0 : this.recover - t));
      }
      if (this.revert !== 0) {
        let t =
          Math.sign(this.revert) *
          Math.min(Math.abs(this.revert), PHYSICS.revertRate * e);
        ((this.yaw += t), (this.revert -= t), (this.yawRate = 0));
      }
    }
    airControls(e, t, n) {
      let r = !this.fromLip && this.flightTime < PHYSICS.hopTime,
        i = r ? 0 : e.steer,
        a = t > 1.5 ? headingFromXZ(this.vel.x, this.vel.z) : this.yaw;
      t > 3 &&
        (this.air.whipped = Math.max(
          this.air.whipped,
          Math.abs(wrapAngle(this.yaw - a)),
        ));
      let o = 1 + PHYSICS.tuck * this.crouch,
        s = r ? 0 : this.flipInput(e),
        c = i !== 0 && this.meant(i > 0 ? `right` : `left`),
        l = s !== 0 && this.meant(s > 0 ? `back` : `fwd`),
        u = -i * PHYSICS.spinRate * o,
        d = s * PHYSICS.flipRate * o;
      if (c && l) {
        let e = Math.max(Math.abs(u), Math.abs(d)) / Math.hypot(u, d);
        ((u *= e), (d *= e), (this.corking = !0));
      } else this.uncork();
      (c && (this.yawRate = approach(this.yawRate, u, n * PHYSICS.spinAccel * o)),
        l && (this.pitchRate = approach(this.pitchRate, d, n * PHYSICS.flipAccel * o)),
        c && l
          ? (this.rollRate = approach(this.rollRate, 0, n * PHYSICS.spinAccel * o))
          : this.assist(c, l, i, s, a, t, n),
        (this.steer *= Math.exp(-n * 4)),
        e.barspin &&
          this.barT < 0 &&
          this.whipT < 0 &&
          this.style === TRICK.None &&
          ((this.barT = 0), this.ev.whip()),
        e.tailwhip &&
          this.whipT < 0 &&
          this.barT < 0 &&
          this.style === TRICK.None &&
          ((this.whipT = 0), this.ev.whip()));
    }
    spinTricks(e) {
      if (this.barT >= 0) {
        this.barT += e;
        let t = Math.min(1, this.barT / PHYSICS.barspinTime);
        ((this.bars = TAU * smoothstep(0, 1, t)),
          (this.hands = Math.sin(Math.PI * t)),
          t >= 1 &&
            ((this.barT = -1),
            (this.bars = 0),
            (this.hands = 0),
            this.mode === `air` && this.air.score(wH.barspin)));
      }
      if (this.whipT >= 0) {
        this.whipT += e;
        let t = Math.min(1, this.whipT / PHYSICS.tailwhipTime);
        ((this.whip = TAU * smoothstep(0, 1, t)),
          t >= 1 &&
            ((this.whipT = -1),
            (this.whip = 0),
            this.mode === `air` && this.air.score(wH.tailwhip)));
      }
    }
    styleTrick(e, t) {
      let n = this.mode === `air` && this.barT < 0 && this.whipT < 0;
      if (
        (this.style === TRICK.None &&
          n &&
          e.style !== TRICK.None &&
          (e.style === TRICK.CanCan || this.hands < 0.1) &&
          ((this.style = e.style),
          (this.styleSide =
            e.steer === 0 ? -this.styleSide : Math.sign(e.steer))),
        this.style === TRICK.None)
      )
        return;
      let r = n && e.style === this.style;
      this.styled = approach(this.styled, +!!r, t * (r ? PHYSICS.styleOut : PHYSICS.styleBack));
      let { trick: i } = TH[this.style];
      (r && this.styled > 0.9 && !this.air.has(i) && this.air.score(i),
        !r && this.styled === 0 && (this.style = TRICK.None));
    }
    stunts(e) {
      let t = (this.onBlock[0] ?? this.onBlock[1])?.stunt ?? null,
        n = this.riding;
      if (this.mode === `crash`) {
        this.riding = null;
        return;
      }
      if (t) {
        let e = (this.pos.x - t.x) * t.ax + (this.pos.z - t.z) * t.az;
        t === n
          ? (this.rodeTo = Math.max(this.rodeTo, e))
          : ((this.riding = t),
            (this.rodeFrom = this.rodeTo = e),
            (this.tipped = -1));
        let r = t.blocks[1]?.seesaw;
        (r && (this.tipped = Math.max(this.tipped, r.angle)), (this.offIt = 0));
        return;
      }
      if (
        !n ||
        ((this.offIt += e),
        (this.pos.x - n.x) * n.ax + (this.pos.z - n.z) * n.az < n.total &&
          (this.mode === `air` || this.offIt < 0.25))
      )
        return;
      this.riding = null;
      let r = n.kind !== `seesaw` || this.tipped > 0.03;
      this.rodeFrom < 1.2 &&
        this.rodeTo > n.end - 0.8 &&
        r &&
        this.ev.trick(n.name, n.points);
    }
    groundNormal(e) {
      let t = this.terrain.trials,
        n = this.onBlock[1] ?? this.onBlock[0];
      t && n && t.wheel(this.pos.x, this.pos.z, 1 / 0, n, uU)
        ? ((scratchNormal[0] = uU.nx), (scratchNormal[1] = uU.ny), (scratchNormal[2] = uU.nz))
        : this.terrain.normal(this.pos.x, this.pos.z, scratchNormal, e, !0);
    }
    railRate(e) {
      if (!this.onTrail) return null;
      let t = this.terrain.trail,
        n = t.bankAt(this.trailS),
        r = Math.sign(n),
        i = smoothstep(0.08, 0.25, Math.abs(n));
      if (i === 0) return null;
      let a = t.at(this.trailS),
        o = wrapAngle(headingFromXZ(this.vel.x, this.vel.z) - headingFromXZ(a.tx, a.tz)) * r;
      if (Math.abs(o) > 1) return null;
      let s = Math.max(5, 1 / Math.max(Math.abs(a.k), 1e-4) - r * this.trailU),
        c = (TRAIL_HALF_WIDTH - r * this.trailU) / (2 * TRAIL_HALF_WIDTH);
      return {
        turn: r,
        rate: Math.max(0, e / s + o * PHYSICS.railAim + (c - 2 / 3) * PHYSICS.railHold),
        weight: i,
      };
    }
    bankHelp(e) {
      if (e === 0) return 0;
      this.groundNormal(0.6);
      let t = Math.cos(this.yaw),
        n = -Math.sin(this.yaw);
      return clamp((scratchNormal[0] * t + scratchNormal[2] * n) * Math.sign(e) * 2.2, 0, 1.6);
    }
    pop(e = !1) {
      if (!e && !this.contact[0] && !this.contact[1]) return;
      let t = this.crouch;
      if (t < 0.2) return;
      let n =
          e || (this.contact[1] && !this.contact[0])
            ? 1
            : this.nearLip()
              ? 0.8
              : 0,
        r = n ? PHYSICS.lipPop * t * n : PHYSICS.hop * t;
      if (e) {
        let e = ZH.set(0, 1, 0).applyQuaternion(this.frameQuat(UH));
        ((scratchNormal[0] = e.x), (scratchNormal[1] = e.y), (scratchNormal[2] = e.z));
      } else this.groundNormal(0.4);
      ((this.vel.x += scratchNormal[0] * r),
        (this.vel.y += scratchNormal[1] * r),
        (this.vel.z += scratchNormal[2] * r),
        n || (this.pitchRate += 2.2 * t),
        (this.poppedAt = this.time));
    }
    manual(e, t, n) {
      let r =
        e.back > 0 &&
        (e.crouch || e.fwd > 0) &&
        this.contact[1] &&
        t > PHYSICS.manualMin &&
        !this.byLip(6, 1);
      (r
        ? ((this.manualT += n), (this.wheelie = e.fwd > 0))
        : this.lifting &&
          this.manualT > 1 &&
          this.ev.trick(
            this.wheelie ? `Wheelie` : `Manual`,
            Math.round(this.manualT * PHYSICS.manualPoints),
          ),
        r || (this.manualT = 0),
        (this.lifting = r),
        (this.lift = approach(this.lift, +!!r, n * 4)));
    }
    slope() {
      let e = -Math.sin(this.yaw) * 0.5,
        t = -Math.cos(this.yaw) * 0.5,
        { x: n, z: r } = this.pos;
      return Math.atan2(
        this.terrain.baseHeight(n + e, r + t) -
          this.terrain.baseHeight(n - e, r - t),
        1,
      );
    }
    flipInput(e) {
      return e.back - e.fwd;
    }
    keys(e) {
      (this.key(`fwd`, e.fwd > 0.5),
        this.key(`back`, e.back > 0.5),
        this.key(`left`, e.steer < -0.5),
        this.key(`right`, e.steer > 0.5));
    }
    key(e, t) {
      (t && !this.down[e] && (this.downAt[e] = this.time), (this.down[e] = t));
    }
    meant(e) {
      let t = this.mode === `air` ? this.takeoffAt : this.time;
      return this.downAt[e] > t - PHYSICS.intent;
    }
    consume(e) {
      this.time - this.downAt[e] > PHYSICS.consume && (this.downAt[e] = -99);
    }
    assist(e, t, n, r, i, a, o) {
      let s = this.flightLine(a);
      if (e) return this.alignUp(i, s, o);
      t || this.foldLean();
      let c = Math.cos(this.roll),
        l = Math.sin(this.roll),
        u = this.angleRates(lU),
        d = u.pitch,
        f = u.yaw,
        p = Math.abs(this.roll) < 1;
      if (!t && p) {
        let e =
          s * Math.cos(wrapAngle(this.yaw - i)) +
          r * PHYSICS.leanPitch * (1 - this.landingNear);
        ((d = gU(this.pitch, d, e, PHYSICS.flipRate, PHYSICS.flipStop, PHYSICS.catchPitch, o)),
          (this.pitchRate = (d - l * this.yawRate) / c));
      } else t || (this.pitchRate = approach(this.pitchRate, 0, o * PHYSICS.flipStop));
      if (!t && p && Math.abs(Math.cos(this.pitch)) > 0.5) {
        let e = i - n * PHYSICS.leanYaw,
          t = (f * Math.abs(f)) / (2 * PHYSICS.spinStop),
          r = Math.abs(wrapAngle(this.yaw + t - e)),
          a = r > PHYSICS.catchYaw && Math.PI - r < PHYSICS.catchFakie;
        ((f = gU(
          this.yaw,
          f,
          a ? e + Math.PI : e,
          PHYSICS.spinRate,
          PHYSICS.spinStop,
          a ? PHYSICS.catchFakie : PHYSICS.catchYaw,
          o,
        )),
          this.setAngleRates(
            d,
            f,
            (Math.exp(-o * PHYSICS.levelling) - 1) * (this.roll / o),
          ));
        return;
      }
      ((this.yawRate = approach(this.yawRate, 0, o * PHYSICS.spinStop)),
        (this.rollRate = approach(this.rollRate, 0, o * PHYSICS.spinStop)));
    }
    flightLine(e) {
      let t = Math.atan2(this.vel.y, Math.max(0.5, e));
      for (let e = 1; e <= 6; e++) {
        let n = e * 0.08,
          r = this.pos.x + this.vel.x * n,
          i = this.pos.z + this.vel.z * n,
          a = this.pos.y + this.vel.y * n - 0.5 * PHYSICS.airG * n * n,
          o = this.terrain.height(r, i);
        if (a - PHYSICS.wheelRadius - 0.15 > o) continue;
        let s = -Math.sin(this.yaw),
          c = -Math.cos(this.yaw),
          l = o > this.terrain.baseHeight(r, i) + 0.01,
          u = (e, t) =>
            l ? this.terrain.height(e, t) : this.terrain.baseHeight(e, t),
          d = Math.atan2(
            u(r + s * 0.6, i + c * 0.6) - u(r - s * 0.6, i - c * 0.6),
            1.2,
          );
        return (
          (this.landingNear = clamp(1.25 - n * 2.2, 0, 1)),
          t + (d - t) * this.landingNear
        );
      }
      return ((this.landingNear = 0), t);
    }
    alignUp(e, t, n) {
      let r = this.ownQuat(UH),
        i = iU.set(0, 1, 0).applyQuaternion(r);
      aU.set(Math.sin(e) * Math.sin(t), Math.cos(t), Math.cos(e) * Math.sin(t));
      let a = rU.crossVectors(i, aU),
        o = Math.atan2(a.length(), i.dot(aU)),
        s = o < PHYSICS.catchPitch ? hU(o, PHYSICS.flipRate, PHYSICS.flipStop) : 0;
      (o > 1e-4
        ? a.normalize().multiplyScalar(s).applyQuaternion(r.invert())
        : a.set(0, 0, 0),
        (this.pitchRate = approach(this.pitchRate, a.x, n * PHYSICS.flipStop)),
        (this.rollRate = approach(this.rollRate, a.z, n * PHYSICS.flipStop)));
    }
    foldLean() {
      this.lean !== 0 &&
        (rU
          .set(this.pitchRate, this.yawRate, this.rollRate)
          .applyAxisAngle(LH, this.lean),
        (this.pitchRate = rU.x),
        (this.yawRate = rU.y),
        (this.rollRate = rU.z),
        (this.lean = 0));
    }
    angleRates(e) {
      let t = Math.cos(this.roll),
        n = Math.sin(this.roll),
        r = Math.cos(this.pitch);
      return (
        (e.pitch = t * this.pitchRate + n * this.yawRate),
        (e.yaw =
          (t * this.yawRate - n * this.pitchRate) /
          (Math.sign(r) || 1) /
          Math.max(Math.abs(r), 0.1)),
        (e.roll = -this.rollRate - Math.sin(this.pitch) * e.yaw),
        e
      );
    }
    groundRates() {
      let e = this.angleRates(lU);
      ((this.pitchRate = e.pitch),
        (this.yawRate = e.yaw),
        (this.rollRate = 0),
        (this.lean = 0));
    }
    setAngleRates(e, t, n) {
      let r = Math.cos(this.roll),
        i = Math.sin(this.roll),
        a = Math.cos(this.pitch);
      ((this.pitchRate = r * e - i * a * t),
        (this.yawRate = i * e + r * a * t),
        (this.rollRate = -Math.sin(this.pitch) * t - n));
    }
    ownQuat(e) {
      return this.bodyQuat(e).multiply(oU.setFromAxisAngle(LH, this.lean));
    }
    turn(e) {
      let t = this.ownQuat(UH);
      rU.set(this.pitchRate, this.yawRate, this.rollRate);
      let n = rU.length();
      (n > 1e-9 && t.multiply(tU.setFromAxisAngle(rU.divideScalar(n), n * e)),
        (this.lean *= Math.exp(-e * PHYSICS.levelling)),
        t.multiply(tU.setFromAxisAngle(LH, -this.lean)),
        pU(t, this, lU),
        (this.pitch = lU.pitch),
        (this.yaw = lU.yaw),
        (this.roll = lU.roll),
        this.corking && (this.air.corked += n * e));
    }
    uncork() {
      if (
        !this.corking ||
        ((this.corking = !1), Math.abs(wrapAngle(this.roll)) <= Math.PI / 2)
      )
        return;
      (vU(this), vU(this.prev));
      let e = wrapAngle(this.roll) - this.roll;
      ((this.roll += e), (this.prev.roll += e));
    }
    predictFlight() {
      let e = this.pos,
        t = this.vel,
        n = ZH.set(0, 0, -PHYSICS.wheelbase / 2).applyQuaternion(this.frameQuat(UH));
      for (let r = 0.02; r < 1.5; r += 0.02) {
        let i = e.x + t.x * r,
          a = e.z + t.z * r,
          o = e.y + t.y * r - 0.5 * PHYSICS.airG * r * r - PHYSICS.bodyLift - PHYSICS.wheelRadius;
        for (let e of [1, -1])
          if (o + n.y * e < this.terrain.height(i + n.x * e, a + n.z * e))
            return r;
      }
      return 1.5;
    }
    byLip(e, t) {
      if (!this.onTrail) return !1;
      let n = this.terrain.trail.featureOf(this.trailS);
      return (
        !!n &&
        n.kind !== `rollers` &&
        this.trailS > n.lip - e &&
        this.trailS < n.lip + t
      );
    }
    offLip() {
      return !this.contact[0] && this.byLip(1.2, 0.8);
    }
    onFace() {
      return this.byLip(5, 0.8);
    }
    nearLip() {
      return this.byLip(2.5, 1);
    }
    modeChanges(e, t) {
      if (this.mode === `ride`) {
        if (e === 0) {
          let e = this.nearLip() ? 0.015 : 0.06;
          this.modeT > 0.05 &&
            ((this.airGrace += t), this.airGrace > e && this.takeoff());
        } else this.airGrace = 0;
        this.obstacles();
        return;
      }
      this.mode === `air` &&
        ((this.airTime += t),
        (this.peakHeight = Math.max(
          this.peakHeight,
          this.pos.y - this.airStartY,
        )),
        (this.air.spun += this.yawRate * t),
        (this.air.flipped += this.pitchRate * t),
        e > 0 ? this.landing() : this.obstacles());
    }
    takeoff() {
      ((this.mode = `air`),
        (this.modeT = 0),
        (this.airTime = 0),
        this.air.start(),
        (this.corking = !1),
        (this.airStartY = this.pos.y),
        (this.airStartS = this.trailS),
        (this.peakHeight = 0),
        (this.takeoffAt = this.time));
      let e = this.down.left ? `left` : this.down.right ? `right` : null;
      ((!e || !this.meant(e)) && (this.yawRate *= 0.35),
        this.revert !== 0 &&
          (this.yawRate = Math.sign(this.revert) * PHYSICS.revertRate),
        (this.revert = 0),
        (this.lean = this.roll),
        (this.roll = 0),
        this.setAngleRates(this.pitchRate, this.yawRate, 0),
        (this.roll = this.lean),
        (this.flightTime = this.predictFlight()),
        (this.fromLip = this.nearLip() || this.time - this.poppedAt < 0.35),
        this.ev.takeoff());
    }
    landing() {
      (this.uncork(), this.groundRates());
      let e = this.touchdown();
      if (this.airTime < 0.15 && this.barT < 0 && this.whipT < 0) {
        ((this.mode = `ride`),
          (this.modeT = 0),
          (this.yawRate = 0),
          (this.style = TRICK.None),
          (this.styled = 0));
        return;
      }
      let t =
          (this.airTime < 0.5 ? 0.25 : 0) + (e.absorbed ? PHYSICS.absorbSlack : 0),
        n = e.fakie ? e.pitchErr : -e.pitchErr,
        r = this.barT >= 0 ? this.barT / PHYSICS.barspinTime : 1,
        i = this.whipT >= 0 ? this.whipT / PHYSICS.tailwhipTime : 1,
        a = this.style === TRICK.None ? 0 : this.styled,
        o = this.bailOut(e, n, t, r, i, a);
      if (((this.lastImpact = e.impact), o)) return this.crash(o);
      let s = Math.max(
          smoothstep(PHYSICS.cleanNose, PHYSICS.noseIn + t, n),
          smoothstep(PHYSICS.cleanBack, PHYSICS.loopOut + t, -n),
          smoothstep(PHYSICS.cleanYaw, PHYSICS.sideways + t, Math.abs(e.yawErr)),
          smoothstep(PHYSICS.cleanSide, PHYSICS.laidDown + t, Math.abs(e.side)),
          smoothstep(PHYSICS.hardImpact, PHYSICS.landImpact, e.impact),
          r < 0.9 || i < 0.9 || this.hands > 0.4 || a > 0.4 ? 0.5 : 0,
        ),
        c = s > 0,
        l = this.onTrail ? this.terrain.trail.featureOf(this.trailS) : null,
        u =
          l && l.kind !== `rollers` && Math.abs(this.airStartS - l.lip) < 4
            ? this.trailS - l.knuckle
            : NaN,
        d = u < -0.3,
        f =
          !c &&
          !d &&
          this.airTime > 0.7 &&
          Math.abs(e.pitchErr) < PHYSICS.stompPitch &&
          Math.abs(e.yawErr) < PHYSICS.stompYaw;
      if (
        ((this.stress +=
          s * 0.7 + Math.max(0, e.impact - PHYSICS.hardImpact * 0.6) / PHYSICS.landImpact),
        this.stress >= 1)
      )
        return this.crash(NH);
      let p = f && Math.abs(u - (l?.sweet ?? 0)) < PHYSICS.sweetReach,
        m = d
          ? PHYSICS.keepCased
          : u > (l ? l.end - l.knuckle : 1 / 0)
            ? PHYSICS.keepFlat
            : 1;
      (this.barT >= 0 && this.air.score(wH.barspin),
        this.whipT >= 0 && this.air.score(wH.tailwhip),
        (this.barT = this.whipT = -1),
        (this.bars = this.whip = this.styled = 0),
        (this.style = TRICK.None),
        (this.pitch = wrapAngle(this.pitch)),
        (this.yaw = wrapAngle(this.yaw)),
        (this.pitchRate *= 0.25),
        this.rideAway(e, s, (p ? PHYSICS.keepPerfect : f ? PHYSICS.keepStomped : 1) * m),
        this.callTricks(
          e.fakie,
          s > 0.2 ? `Sketchy` : p ? `Perfect` : f ? `Stomped` : ``,
        ),
        (this.lastJump = this.onTrail
          ? Math.max(0, this.trailS - this.airStartS)
          : 0),
        (this.mode = `ride`),
        (this.modeT = 0),
        this.ev.land(e.impact, p ? 3 : f ? 2 : +(s < 0.2)));
    }
    touchdown() {
      let e = fU,
        t = this.frameQuat(UH),
        n = qH.set(0, 0, -1).applyQuaternion(t);
      this.groundNormal(0.5);
      let r = JH.set(scratchNormal[0], scratchNormal[1], scratchNormal[2]);
      return (
        (e.pitchErr = Math.asin(clamp(n.dot(r), -1, 1))),
        (e.upright = YH.set(0, 1, 0).applyQuaternion(t).dot(r)),
        (e.side = wrapAngle(this.roll)),
        (e.flat = Math.hypot(this.vel.x, this.vel.z)),
        (e.travel = headingFromXZ(this.vel.x, this.vel.z)),
        (e.heading = headingFromXZ(n.x, n.z)),
        (e.yawErr = e.flat > 4 ? wrapAngle(e.heading - e.travel) : 0),
        (e.fakie = Math.abs(e.yawErr) > Math.PI / 2),
        e.fakie && (e.yawErr = wrapAngle(e.yawErr - Math.PI)),
        (e.absorbed =
          this.crouchHeld && this.time - this.crouchAt < PHYSICS.absorbWindow),
        this.crouchHeld && (this.heldThrough = !0),
        (e.impact = -this.vel.dot(r) * (e.absorbed ? PHYSICS.absorbImpact : 1)),
        e
      );
    }
    bailOut(e, t, n, r, i, a) {
      return r < 0.6
        ? `Bars still spinning`
        : i < 0.6
          ? `Frame still whipping`
          : this.hands > 0.75
            ? `No hands on the bars`
            : a > 0.75
              ? TH[this.style].bail
              : e.upright < 0.2
                ? `Upside down`
                : t > PHYSICS.noseIn + n
                  ? `Nosed in`
                  : -t > PHYSICS.loopOut + n
                    ? `Looped out`
                    : Math.abs(e.yawErr) > PHYSICS.sideways + n
                      ? `Landed sideways`
                      : Math.abs(e.side) > PHYSICS.laidDown + n
                        ? `Laid it down`
                        : e.impact > PHYSICS.landImpact
                          ? `Cased it`
                          : ``;
    }
    rideAway(e, t, n) {
      let r = clamp(e.yawErr, -PHYSICS.airTurn, PHYSICS.airTurn),
        i = e.travel + r;
      if (e.fakie) {
        let t = wrapAngle(i - e.heading),
          n = Math.sign(this.air.spun) || Math.sign(t) || 1;
        (Math.sign(t) !== n && (t += n * TAU),
          (this.revert = t),
          (this.revertDir = i),
          (this.recover = 0));
      } else this.recover = -(e.yawErr - r);
      let a =
        n *
        (e.fakie ? PHYSICS.revertKeep : 1) *
        (1 - 0.3 * (1 - Math.cos(e.yawErr - r))) *
        (1 - 0.12 * t);
      this.wobble = t;
      let o = e.flat * a;
      ((this.vel.x = -Math.sin(i) * o),
        (this.vel.z = -Math.cos(i) * o),
        (this.yawRate = 0));
    }
    callTricks(e, t) {
      let n = this.air;
      !e &&
        n.spins === 0 &&
        n.corks < 2 &&
        n.whipped > PHYSICS.whipFrom &&
        n.score(wH.whip);
      let r = n.name(e, t, this.airTime);
      r && this.ev.trick(r, n.worth(e, t, this.airTime, this.peakHeight));
    }
    bodyDown() {
      let e = this.frameQuat(UH);
      if (this.modeT < 0.1 || ZH.set(0, 1, 0).applyQuaternion(e).y > 0.5)
        return null;
      for (let t = 2; t < RH.length; t++) {
        let [n, r, i, a] = RH[t];
        if (
          (ZH.set(i, r, -n).applyQuaternion(e).add(this.pos),
          ZH.y - a < this.terrain.height(ZH.x, ZH.z))
        )
          return t === RH.length - 1 ? `Landed on your head` : `Upside down`;
      }
      return null;
    }
    obstacles() {
      let e = this.frameQuat(UH),
        t = null;
      for (let [n, r, i, a] of RH) {
        ZH.set(i, r, -n).applyQuaternion(e).add(this.pos);
        let o = this.terrain.obstacleAt(ZH.x, ZH.y, ZH.z, a);
        o && (!t || o.depth > t.depth) && (t = o);
      }
      let n = !this.rubbing;
      if (((this.rubbing = !!t), t)) {
        if (
          -(this.vel.x * t.nx + this.vel.z * t.nz) >
          PHYSICS.glance * (t.o.soft ? 1.8 : 1)
        )
          return this.crash(t.o.what);
        if (
          (_U(this.pos, this.vel, t, 1.3),
          n &&
            (this.vel.multiplyScalar(0.9),
            (this.jolt += 2),
            (this.wobble = Math.max(this.wobble, 0.6)),
            (this.stress += 0.35),
            this.stress >= 1))
        )
          return this.crash(NH);
      }
    }
    crash(e) {
      if (this.mode === `crash`) return;
      (this.uncork(),
        this.mode === `air` && this.groundRates(),
        (this.mode = `crash`),
        (this.modeT = 0),
        (this.barT = this.whipT = -1),
        (this.style = TRICK.None),
        (this.styled = 0),
        (this.bail = FH(e)),
        (this.stress = 0),
        (this.lifting = !1),
        (this.lift = this.manualT = 0));
      let t = this.bodyQuat(UH);
      (this.bodyPos.copy(this.pos).add(ZH.set(0, 1.1, 0).applyQuaternion(t)),
        this.bodyVel
          .copy(this.vel)
          .multiplyScalar(0.8)
          .add(ZH.set(0, 1.2, 0)),
        this.bodyRot.copy(t),
        this.prev.bodyPos.copy(this.bodyPos),
        this.prev.bodyRot.copy(this.bodyRot));
      let n = this.speed;
      (this.bodySpin.set(-2 - n * 0.35, randSpread(3), randSpread(4)).applyQuaternion(t),
        this.ev.crash(e));
    }
    tumble(e) {
      (this.bodyDriven || this.tumbleBody(e), this.tumbleBike(e));
    }
    tumbleBody(e) {
      let t = this.bodyPos;
      ((this.bodyVel.y -= PHYSICS.g * e), t.addScaledVector(this.bodyVel, e));
      let n = this.terrain.height(t.x, t.z) + 0.25;
      if (t.y < n) {
        ((t.y = n), this.terrain.normal(t.x, t.z, scratchNormal, 0.5));
        let r =
          this.bodyVel.x * scratchNormal[0] +
          this.bodyVel.y * scratchNormal[1] +
          this.bodyVel.z * scratchNormal[2];
        (r < 0 &&
          ((this.bodyVel.x -= scratchNormal[0] * r * 1.35),
          (this.bodyVel.y -= scratchNormal[1] * r * 1.35),
          (this.bodyVel.z -= scratchNormal[2] * r * 1.35)),
          this.bodyVel.multiplyScalar(Math.exp(-e * 3.5)),
          this.bodySpin.multiplyScalar(Math.exp(-e * 2.5)));
      }
      let r = this.terrain.obstacleAt(t.x, t.y, t.z, 0.3);
      r && _U(t, this.bodyVel, r, 1.3, 0.6);
      let i = this.bodySpin.length();
      i > 1e-4 &&
        this.bodyRot
          .premultiply(
            tU.setFromAxisAngle(ZH.copy(this.bodySpin).divideScalar(i), i * e),
          )
          .normalize();
    }
    tumbleBike(e) {
      ((this.vel.y -= PHYSICS.g * e), this.pos.addScaledVector(this.vel, e));
      let t = this.terrain.obstacleAt(this.pos.x, this.pos.y, this.pos.z, 0.4);
      t && _U(this.pos, this.vel, t, 1.1, 0.4);
      let n = this.terrain.height(this.pos.x, this.pos.z) + 0.12;
      ((this.sliding = 0),
        this.pos.y < n &&
          ((this.pos.y = n),
          (this.vel.y = Math.max(0, this.vel.y) * 0.3),
          this.vel.multiplyScalar(Math.exp(-e * 2.2)),
          (this.roll = approach(this.roll, 1.4, e * 4)),
          (this.sliding = Math.hypot(this.vel.x, this.vel.z))),
        (this.yaw += this.yawRate * e),
        (this.yawRate *= Math.exp(-e * 2)));
    }
    trailCheck(e) {
      this.onTrail = this.terrain.trail.locate(this.pos.x, this.pos.z, cU, 12);
      let t = !this.onTrail || Math.abs(cU.u) > 9.1;
      ((this.offCourse = t && this.mode !== `crash` ? this.offCourse + e : 0),
        this.onTrail &&
          ((this.trailS = cU.s),
          (this.trailU = cU.u),
          this.mode === `ride` &&
            Math.abs(cU.u) < 5.1 &&
            this.modeT > 0.4 &&
            !this.terrain.trail.featureOf(cU.s) &&
            ((this.safeS = cU.s), (this.safeSpeed = this.speed))));
    }
  },
  bU = {
    frontHub: new M(0, 0, -PHYSICS.wheelbase / 2),
    rearHub: new M(0, 0, PHYSICS.wheelbase / 2),
    bb: new M(0, 0.035, 0.13),
    headBottom: new M(0, 0.33, -0.4),
    headTop: new M(0, 0.47, -0.364),
    seatCluster: new M(0, 0.39, 0.05),
    seat: new M(0, 0.47, 0.085),
    stem: new M(0, 0.535, -0.372),
    gripL: new M(-0.33, 0.755, -0.29),
    gripR: new M(0.33, 0.755, -0.29),
    crankLength: 0.175,
  },
  xU = bU.headTop.clone().sub(bU.headBottom).normalize(),
  SU = new M(),
  CU = new qt();
