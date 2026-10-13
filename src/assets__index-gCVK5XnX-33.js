// assets__index-gCVK5XnX 33 — math
// Lines 57932-58382 of readable/assets__index-gCVK5XnX.pretty.js (statement-aligned).
var FQ = class {
    enabled = !0;
    padKind = null;
    gamepad = null;
    down = new Set();
    pressedNow = new Set();
    padPrev = [];
    padNow = [];
    spent = new Set();
    navArmed = !0;
    menuState = { toggle: !1, step: 0, choose: !1, back: !1 };
    pointerFreed = !1;
    pointerEl = null;
    looking = { dx: 0, dy: 0, x: 0, y: 0 };
    walking = { x: 0, y: 0, run: !1 };
    axes = [0, 0, 0, 0];
    triggers = [0, 0];
    controls = { ...AH };
    constructor() {
      (addEventListener(`keydown`, (e) => {
        ((this.padKind = null),
          !(!this.enabled || e.metaKey || e.ctrlKey) &&
            (!e.repeat && !this.down.has(e.code) && this.pressedNow.add(e.code),
            this.down.add(e.code),
            (e.code === `Space` || e.code.startsWith(`Arrow`)) &&
              e.preventDefault()));
      }),
        addEventListener(`keyup`, (e) => this.down.delete(e.code)),
        addEventListener(`mousemove`, (e) => {
          this.enabled &&
            (document.pointerLockElement || e.buttons) &&
            ((this.looking.dx += e.movementX),
            (this.looking.dy -= e.movementY));
        }),
        addEventListener(`blur`, () => this.down.clear()));
    }
    capture(e) {
      !gQ &&
        `requestPointerLock` in e &&
        ((this.pointerEl = e),
        e.addEventListener(`pointerdown`, () => this.lock()),
        addEventListener(`keydown`, (e) => {
          this.enabled &&
            !this.pointerFreed &&
            !e.metaKey &&
            !e.ctrlKey &&
            !e.altKey &&
            e.code !== `Escape` &&
            this.lock();
        }),
        document.addEventListener(`pointerlockchange`, () => {
          document.pointerLockElement !== e && (this.pointerFreed = !0);
        }));
    }
    lock() {
      let e = this.pointerEl;
      if (((this.pointerFreed = !1), e && document.pointerLockElement !== e))
        try {
          e.requestPointerLock()?.catch?.(() => {});
        } catch {}
    }
    clear() {
      (this.down.clear(),
        this.pressedNow.clear(),
        this.padNow.forEach((e, t) => e && this.spent.add(t)));
    }
    poll() {
      this.readPad();
      let e = this.controls;
      if (!this.enabled) return Object.assign(e, AH);
      let t = (e) => this.held(e),
        n = +!!t(yQ) - !!t(vQ),
        r =
          Math.abs(this.axes[0]) > DQ
            ? Math.sign(this.axes[0]) * ((Math.abs(this.axes[0]) - DQ) / 0.85)
            : 0;
      e.steer = n || r;
      let i = Math.abs(this.axes[1]) > OQ ? this.axes[1] : 0;
      return (
        (e.fwd = Math.max(+!!t(bQ), this.triggers[1], i < 0 ? -i : 0)),
        (e.back = Math.max(+!!t(xQ), this.triggers[0], i > 0 ? i : 0)),
        (e.crouch = t(SQ) || this.pad(kQ.a)),
        (e.barspin = t(wQ) || this.pad(kQ.x) || this.pad(kQ.rb)),
        (e.tailwhip = t(TQ) || this.pad(kQ.y) || this.pad(kQ.lb)),
        (e.nohand = t(EQ) || this.pad(kQ.b)),
        (e.style =
          AQ.find(([, e, n]) => t([e]) || this.pad(n))?.[0] ?? CH.None),
        e
      );
    }
    pressed(e) {
      return this.enabled
        ? (e === `KeyR` && this.padPressed(kQ.back)) ||
          (e === `Space` && this.padPressed(kQ.a)) ||
          (e === `KeyE` && this.padPressed(kQ.y))
          ? !0
          : this.pressedNow.has(e)
        : !1;
    }
    look(e = !1) {
      let t = this.looking;
      if (!this.enabled) return ((t.x = t.y = 0), t);
      let n = (t) => (!e && this.held(t) ? 1 : 0),
        r = +!e;
      return (
        (t.x = Y(n(yQ) - n(vQ) + r * this.stick(0) + this.stick(2), -1, 1)),
        (t.y = Y(n(bQ) - n(xQ) - r * this.stick(1) - this.stick(3), -1, 1)),
        t
      );
    }
    walk() {
      let e = this.walking,
        t = (e) => (this.enabled && this.held(e) ? 1 : 0),
        n = this.enabled ? this.stick(0) : 0,
        r = this.enabled ? -this.stick(1) : 0;
      ((e.x = t(yQ) - t(vQ) + n), (e.y = t(bQ) - t(xQ) + r));
      let i = Math.hypot(e.x, e.y);
      return (
        i > 1 && ((e.x /= i), (e.y /= i)),
        (e.run = t(CQ) > 0 || Math.hypot(n, r) > 0.92),
        e
      );
    }
    menuPad() {
      let e = this.menuState,
        t = (e) => !!this.padNow[e] && !this.padPrev[e],
        n = this.axes[1];
      return (
        (e.toggle = t(kQ.start)),
        (e.step = t(kQ.up) ? -1 : +!!t(kQ.down)),
        !e.step &&
          this.navArmed &&
          Math.abs(n) > MQ &&
          ((e.step = Math.sign(n)), (this.navArmed = !1)),
        Math.abs(n) < NQ && (this.navArmed = !0),
        (e.choose = t(kQ.a)),
        (e.back = t(kQ.b)),
        e
      );
    }
    endFrame() {
      (this.pressedNow.clear(),
        (this.looking.dx = this.looking.dy = 0),
        (this.padPrev = this.padNow.slice()));
    }
    stick(e) {
      return Math.abs(this.axes[e]) > DQ ? this.axes[e] : 0;
    }
    held(e) {
      return e.some((e) => this.down.has(e));
    }
    pad(e) {
      return !!this.padNow[e] && !this.spent.has(e);
    }
    padPressed(e) {
      return this.pad(e) && !this.padPrev[e];
    }
    readPad() {
      let e = navigator.getGamepads?.() ?? [],
        t = Array.from(e).find((e) => e && e.connected);
      if (!t) {
        ((this.padNow = []),
          this.axes.fill(0),
          (this.triggers[0] = this.triggers[1] = 0),
          (this.padKind = this.gamepad = null));
        return;
      }
      this.padNow = t.buttons.map((e) => e.pressed);
      for (let e = 0; e < 4; e++) this.axes[e] = t.axes[e] ?? 0;
      ((this.padNow.some((e, t) => e && !this.padPrev[t]) ||
        Math.hypot(this.axes[0], this.axes[1]) > jQ) &&
        (this.padKind = PQ(t.id)),
        (this.gamepad = this.padKind ? t : null));
      for (let e of this.spent) this.padNow[e] || this.spent.delete(e);
      (this.enabled || this.padNow.forEach((e, t) => e && this.spent.add(t)),
        (this.triggers[0] = this.spent.has(kQ.lt)
          ? 0
          : (t.buttons[kQ.lt]?.value ?? 0)),
        (this.triggers[1] = this.spent.has(kQ.rt)
          ? 0
          : (t.buttons[kQ.rt]?.value ?? 0)));
    }
  },
  IQ = 30,
  LQ = new M(),
  RQ = new Tn(),
  zQ = new M(),
  BQ = class {
    dust;
    clods;
    sound;
    wet = !1;
    constructor(e, t, n) {
      ((this.dust = e), (this.clods = t), (this.sound = n));
    }
    land(e, t) {
      e.surface > uz.Dirt ||
        (this.dust.land(e.pos, e.vel, t),
        t > 3 && this.clods.throw(e.pos, e.vel, Math.round(t), 0.035));
    }
    crash(e) {
      (this.dust.burst(e.pos, e.vel, 18, 1.4, 0.6),
        this.clods.throw(e.pos, e.vel, 8, 0.04));
    }
    update(e, t, n) {
      let r = n && t.mode === `ride`;
      r && t.contact[1] && t.surface <= uz.Dirt && this.dirt(e, t);
      let i = r && t.surface === uz.Water && (t.contact[0] || t.contact[1]);
      if (i && !this.wet && t.speed > 2) {
        let e = t.modeT < 0.1 ? t.lastImpact : 0;
        (this.sound.splash(t.speed + e),
          this.dust.spray(t.pos, t.vel, Math.round(6 + t.speed + e * 2)));
      }
      (i &&
        this.dust.spray(
          t.pos,
          t.vel,
          Math.floor(t.speed * 3 * e + Math.random()),
        ),
        (this.wet = i));
    }
    dirt(e, t) {
      let { dust: n, clods: r } = this,
        i = LQ.set(0, -0.25, 0.5)
          .applyEuler(RQ.set(t.pitch, t.yaw, 0, `YXZ`))
          .add(t.pos),
        a = Math.max(0, t.speed - 7) * 1.5 + t.skid * 40;
      (a > 0 &&
        n.stream(e, i, t.vel, a, 0.5 + t.skid * 0.5, 0.18 + t.skid * 0.25),
        t.skid > 0.5 &&
          Math.random() < e * 6 * t.skid &&
          r.throw(i, t.vel, 1, 0.025));
      let o = Y((t.carve - 0.8) / 1.2);
      if (o > 0) {
        let a = Math.sign(t.yawRate) * IQ;
        (zQ.set(Math.cos(t.yaw) * a, IQ * 0.4, -Math.sin(t.yaw) * a).add(t.vel),
          n.stream(e, i, zQ, o * 120, 0.65, 0.42),
          Math.random() < e * 10 * o && r.throw(i, zQ, 1, 0.03));
      }
    }
  },
  VQ = 14,
  HQ = 2.5,
  UQ = 1,
  WQ = class {
    lift;
    phase = `off`;
    chair = 0;
    seat = 0;
    spot = { x: 0, y: 0, z: 0, yaw: 0 };
    at = 0;
    armed = !0;
    lastD = 0;
    me = ``;
    constructor(e) {
      this.lift = e;
    }
    arriving(e) {
      if (this.phase !== `off` || e.mode !== `ride`) return !1;
      let t = this.lift.loading(),
        n = this.lift.pad(e.pos.x, e.pos.z),
        r =
          Math.hypot(e.pos.x - t.x, e.pos.z - t.z) < VQ ||
          (n.w > 0.6 && !n.top);
      return (r || (this.armed = !0), r && this.armed);
    }
    queue(e, t, n) {
      let r = [...n],
        i = this.soonest(this.lift.nextChair(this.lift.loadD, t + HQ), t, r);
      ((this.chair = i.chair),
        (this.at = i.at),
        (this.seat = Math.max(0, this.seatOn(this.chair, r))),
        this.stand(e),
        (this.phase = `waiting`),
        (this.armed = !1));
    }
    reset() {
      this.phase = `off`;
    }
    update(e, t, n) {
      let r = this.lift;
      if (this.phase === `waiting`)
        return t < this.at
          ? this.regroup(e, t, n)
          : ((this.phase = `seated`),
            (this.lastD = r.chairD(this.chair, t)),
            r.seatAt(this.chair, this.seat, t, this.spot),
            `seated`);
      if (this.phase !== `seated`) return null;
      r.seatAt(this.chair, this.seat, t, this.spot);
      let i = r.chairD(this.chair, t),
        a = this.lastD;
      if (((this.lastD = i), i >= r.unloadD && i < r.length)) return `top`;
      for (let e of r.towers) if (a < e.u && i >= e.u) return `tower`;
      return null;
    }
    sit(e, t) {
      let n = this.spot;
      (e.pos.set(n.x, n.y + 0.6, n.z),
        e.drawPos.copy(e.pos),
        e.vel.set(0, 0, 0),
        Object.assign(t, {
          mode: kH.Seated,
          chair: this.chair,
          seat: this.seat,
          x: n.x,
          y: n.y,
          z: n.z,
          yaw: n.yaw,
          speed: 0,
          pedal: 0,
        }));
    }
    queued(e) {
      ((e.chair = this.phase === `waiting` ? this.chair : -1),
        (e.seat = this.seat));
    }
    regroup(e, t, n) {
      if (this.at < t + UQ) return null;
      let r = [...n],
        { chair: i, at: a } = this.soonest(
          { chair: this.chair, at: this.at },
          t,
          r,
        ),
        o = r.some(
          (e) => e.chair === i && e.seat === this.seat && e.id < this.me,
        );
      if (i === this.chair && !o) return null;
      let s = this.seatOn(i, r);
      return s < 0
        ? null
        : ((this.chair = i),
          (this.at = a),
          (this.seat = s),
          this.stand(e),
          `moved`);
    }
    soonest(e, t, n) {
      for (let r of n) {
        if (!r.waiting) continue;
        let i = this.lift.arrival(r.chair, this.lift.loadD, t);
        i >= t + UQ &&
          i < e.at &&
          this.seatOn(r.chair, n) >= 0 &&
          (e = { chair: r.chair, at: i });
      }
      return e;
    }
    seatOn(e, t) {
      let n = new Set(t.filter((t) => t.chair === e).map((e) => e.seat)),
        r = KF(this.me || `rider`) % 4,
        i = Array.from({ length: 4 }, (e, t) => (r + t) % 4).filter(
          (e) => !n.has(e),
        );
      return i.find((e) => n.has(e - 1) || n.has(e + 1)) ?? i[0] ?? -1;
    }
    stand(e) {
      (this.lift.seatAt(this.chair, this.seat, this.at, this.spot),
        e.placeAt(
          this.spot.x,
          this.spot.z,
          -Math.sin(this.spot.yaw),
          -Math.cos(this.spot.yaw),
          0,
        ));
    }
  },
  GQ = 16,
  KQ = 3,
  qQ = 3,
  JQ = 0.25,
  YQ = 0.3,
  XQ = 0.01,
  ZQ = 3,
  QQ = 6,
  $Q = 1,
  e$ = () => performance.now() / 1e3,
  t$ = () => Date.now() / 1e3,
  n$ = (e = 0) => new Promise((t) => setTimeout(t, e)),
  r$ = class {
    synced = !0;
    last = e$();
    offset = -this.last;
    gap = t$() - e$();
    samples = new Map();
    now() {
      return e$() + this.offset;
    }
    samplesFrom(e) {
      return this.samples.get(e)?.length ?? 0;
    }
    frame(e, t) {
      let n = e$();
      (t && (this.offset += e - (n - this.last)),
        (this.last = n),
        this.woke(t));
    }
    woke(e) {
      let t = t$() - e$(),
        n = t - this.gap > $Q;
      ((this.gap = t), n && !e && this.unsync());
    }
    lead() {
      (this.samples.clear(), (this.synced = !0));
    }
    pong(e, t, n) {
      let r = e$(),
        i = r - t;
      if (i < 0 || i > qQ) return;
      let a = this.samples.get(e);
      (a || this.samples.set(e, (a = [])),
        a.push({ rtt: i, off: n + i / 2 - r }),
        a.length > GQ && a.shift());
      let o = [...a].sort((e, t) => e.rtt - t.rtt).slice(0, KQ),
        s = o.reduce((e, t) => e + t.off, 0) / o.length,
        c = s - this.offset;
      if (this.synced)
        Math.abs(c) <= JQ
          ? (this.offset += Y(c * YQ, -0.01, XQ))
          : a.length >= QQ && (this.offset = s);
      else {
        if (a.length < ZQ) return;
        ((this.offset = s), (this.synced = !0));
      }
    }
    unsync() {
      (this.samples.clear(), (this.synced = !1));
    }
  },
  i$ = [
    `aerial_grass_rock`,
    `forest_floor`,
    `forrest_ground_01`,
    `rocky_trail`,
    `dirt_floor`,
    `aerial_rocks_02`,
    `mossy_rock`,
    `snow_02`,
  ],
  a$ = {
    meadow: 0,
    leaves: 1,
    needles: 2,
    trail: 3,
    packed: 4,
    cliff: 5,
    boulder: 6,
    snow: 7,
  },
  o$ = _Q ? 512 : 1024;
